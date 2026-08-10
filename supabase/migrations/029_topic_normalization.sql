-- T-51 · Higiene de `questions.topic` y backfill de `module_id`.
--
-- ⚠ APLICAR DESPUÉS DE 028: la fusión de filas de `test_configs` copia
-- `min_response_seconds`, que 028 crea.
--
-- EL PROBLEMA (medido el 2026-08-09): 26 topics distintos en un campo de texto
-- libre, sin tabla propia y sin restricción, donde varios son el mismo banco
-- escrito de dos formas: `factorización`/`factorizacion`,
-- `términos_semejantes`/`terminos_semejantes`, `división_algebraica`/
-- `division_algebraica`, `Polinomios`/`polinomios`. El sistema los trata como
-- bancos SEPARADOS y no avisa: cada variante tiene su propia fila en
-- `test_configs`, su propio historial en `tests` (que es de donde
-- `universo.access` deriva qué desbloqueó el estudiante) y su propio conjunto
-- de ítems para la selección adaptativa. Un test podía "agotar el banco" con 6
-- preguntas mientras las otras 2 estaban a un acento de distancia.
--
-- Además, 199 de 387 preguntas (51 %) tienen `module_id = null`, y sin módulo
-- no hay déficit accionable ni recursos que ofrecer: la mitad del banco no
-- puede alimentar "Mi plan".
--
-- QUÉ HACE ESTA MIGRACIÓN
--   1. Define `public.normalize_topic()` — minúsculas, sin acentos, sin bordes.
--   2. Fusiona las variantes en `test_configs` (cuidando la auto-FK de
--      prerequisitos) y normaliza `questions.topic` y `tests.topic`.
--   3. Rellena `questions.module_id` donde se puede saber SIN INVENTAR.
--   4. Deja triggers que mantienen la forma canónica de aquí en adelante, para
--      que el problema no se reconstruya solo con el próximo ítem cargado a
--      mano desde el panel.
--
-- POR QUÉ TRIGGER Y NO CHECK: un `check` rechazaría el guardado y le dejaría
-- al admin un error que no sabe arreglar por haber escrito "Álgebra". El
-- trigger normaliza en silencio, que es lo que el admin quiere que pase.
--
-- QUÉ NO HACE, A PROPÓSITO: no le asigna módulo a `diagnostico` (84 ítems) ni
-- a `PAES_M1` (44) — son bancos MEZCLADOS, con ítems de varios módulos, así
-- que cualquier asignación por topic sería un dato falso con apariencia de
-- dato bueno. Esos 128 ítems necesitan clasificación por ítem (contenido, no
-- SQL) y quedan visibles en la consulta de verificación del final.
--
-- Idempotente: se puede correr dos veces sin efecto adicional (R-02, se aplica
-- contra producción sin staging).

-- -----------------------------------------------------------------------------
-- 1. Forma canónica
-- -----------------------------------------------------------------------------
-- Espejo exacto de `universo.topics/normalize`. Si cambia una, cambia la otra
-- en el mismo commit.
--
-- Deliberadamente mínimo: NO unifica `_` con `-` ni con espacios. El fallo
-- medido fue de acento y mayúscula; fusionar más que eso podría juntar dos
-- bancos genuinamente distintos, y eso no se deshace.
create or replace function public.normalize_topic(t text)
returns text
language sql
immutable
as $$
  -- Se quitan los acentos ANTES de bajar a minúsculas, y se listan las dos
  -- cajas: `lower()` sobre caracteres acentuados depende de la collation de la
  -- base, y esta función tiene que dar el mismo resultado que su espejo en
  -- ClojureScript pase lo que pase en el servidor.
  select nullif(
           btrim(lower(translate(btrim(t),
                                 'áéíóúüñÁÉÍÓÚÜÑ',
                                 'aeiouunAEIOUUN'))),
           '');
$$;

comment on function public.normalize_topic(text) is
  'Forma canónica de questions.topic (T-51): minúsculas, sin acentos, sin bordes en blanco. Espejo de universo.topics/normalize.';

-- -----------------------------------------------------------------------------
-- 2. Fusión de variantes
-- -----------------------------------------------------------------------------
-- Orden obligado por la auto-FK `test_configs.prerequisite_topic → topic`, que
-- no tiene ON UPDATE CASCADE: primero se crea la fila canónica, después se
-- repuntan los prerequisitos hacia ella, y recién entonces se pueden borrar
-- las variantes (para ese momento ya nadie las referencia).

-- Quién gana cuando dos variantes tienen configuraciones distintas: la que
-- respalda MÁS PREGUNTAS. Es la que el admin configuró mirando el banco real,
-- y es la que suele traer la cadena de prerequisitos de verdad. Dejar ganar
-- por defecto a la que ya estaba bien escrita sería arbitrario y puede tirar a
-- la basura un prerequisito configurado — que no es una preferencia estética
-- sino quién puede rendir el test.
-- Sin `on commit drop`: el SQL Editor de Supabase no garantiza que todo el
-- script corra en una sola transacción, y con autocommit la tabla se
-- destruiría antes del siguiente statement. Vive lo que dure la sesión y se
-- borra explícitamente al final del bloque.
drop table if exists t51_ganadora;
create temporary table t51_ganadora as
select canon, topic, display_name, min_items, max_items, se_threshold,
       max_minutes, min_response_seconds, active, prerequisite_topic, min_theta
from (
  select tc.*,
         public.normalize_topic(tc.topic) as canon,
         row_number() over (
           partition by public.normalize_topic(tc.topic)
           order by (select count(*) from public.questions q where q.topic = tc.topic) desc,
                    tc.topic asc
         ) as rn
  from public.test_configs tc
  where public.normalize_topic(tc.topic) is not null
) v
where rn = 1;

-- (a) Crear (o adoptar) la fila canónica con la configuración de la ganadora.
--     Sin el prerequisito todavía: la FK exige que la fila apuntada exista, y
--     en este momento puede que aún no.
insert into public.test_configs
  (topic, display_name, min_items, max_items, se_threshold,
   max_minutes, min_response_seconds, active)
select canon, display_name, min_items, max_items, se_threshold,
       max_minutes, min_response_seconds, active
from t51_ganadora
on conflict (topic) do update
  set display_name = excluded.display_name,
      min_items = excluded.min_items,
      max_items = excluded.max_items,
      se_threshold = excluded.se_threshold,
      max_minutes = excluded.max_minutes,
      min_response_seconds = excluded.min_response_seconds,
      active = excluded.active;

-- (b) Recién ahora, con todas las canónicas creadas, el prerequisito de la
--     ganadora. El CASE cubre el caso degenerado en que un topic queda como
--     prerequisito de sí mismo tras normalizar (`X` exigía `x`), que el check
--     `prerequisite_topic <> topic` rechazaría; `min_theta` cae con él porque
--     el otro check exige que no haya umbral sin prerequisito.
update public.test_configs tc
set prerequisite_topic =
      case when public.normalize_topic(g.prerequisite_topic) = tc.topic
           then null
           else public.normalize_topic(g.prerequisite_topic) end,
    min_theta =
      case when public.normalize_topic(g.prerequisite_topic) = tc.topic
           then null
           else g.min_theta end
from t51_ganadora g
where tc.topic = g.canon;

-- (c) Banco e historial. `tests.topic` se normaliza junto con `questions`
--     porque `universo.access` cruza uno contra otro para decidir qué tiene
--     desbloqueado el estudiante: normalizar solo un lado le borraría avances
--     ya conseguidos.
update public.questions
set topic = public.normalize_topic(topic)
where public.normalize_topic(topic) is distinct from topic;

update public.tests
set topic = public.normalize_topic(topic)
where topic is not null
  and public.normalize_topic(topic) is distinct from topic;

-- (d) Borrar las variantes ya vacías de significado. Primero se les quita el
--     prerequisito: la FK es `on delete restrict` y se evalúa fila por fila,
--     así que si una variante a borrar apunta a otra variante a borrar, el
--     orden interno del DELETE podría hacerlo fallar. Sin referencias entre
--     ellas, el borrado es seguro sea cual sea el orden.
update public.test_configs
set prerequisite_topic = null, min_theta = null
where public.normalize_topic(topic) is distinct from topic
  and prerequisite_topic is not null;

delete from public.test_configs tc
where public.normalize_topic(tc.topic) is distinct from tc.topic;

drop table if exists t51_ganadora;

-- -----------------------------------------------------------------------------
-- 3. Backfill de `module_id`
-- -----------------------------------------------------------------------------
-- Regla 1 — equivalencias explícitas: topics cuyo nombre no coincide con el
-- sufijo de su módulo. Espejo de `universo.topics/explicit-topic->module-slug`.
-- Una entrada para un topic inexistente es un no-op, así que la tabla puede
-- ser generosa; lo que no puede es contener una equivalencia dudosa.
with mapeo (topic, slug) as (
  values
    ('numbers_v1',          'aritmetica/numeros'),
    ('numbers',             'aritmetica/numeros'),
    ('algebra',             'algebra/ecuaciones'),
    ('ecuaciones',          'algebra/ecuaciones'),
    ('ecuaciones_lineales', 'algebra/ecuaciones'),
    ('geometria',           'geometria/basica'),
    ('factorizacion',       'algebra/polinomios'),
    ('productos_notables',  'algebra/expresiones'),
    ('terminos_semejantes', 'algebra/expresiones'),
    ('division_algebraica', 'algebra/expresiones'),
    ('raices',              'aritmetica/potencias'),
    ('pitagoras',           'geometria/pitagoras')
)
update public.questions q
set module_id = m.id
from mapeo x
join public.modules m on m.slug = x.slug
where q.module_id is null
  and public.normalize_topic(q.topic) = x.topic;

-- Regla 2 — coincidencia por sufijo: `triangulos` → `geometria/triangulos`.
-- Solo cuando la coincidencia es única (`count = 1`); con dos módulos
-- candidatos no se elige ninguno. Es lo que evita tener que listar a mano los
-- topics que ya se llaman igual que su módulo.
with candidatos as (
  select q.id as question_id,
         m.id as module_id,
         count(*) over (partition by q.id) as n
  from public.questions q
  join public.modules m
    on split_part(m.slug, '/', 2) = public.normalize_topic(q.topic)
  where q.module_id is null
    and public.normalize_topic(q.topic) not in ('diagnostico', 'paes_m1')
)
update public.questions q
set module_id = c.module_id
from candidatos c
where c.question_id = q.id
  and c.n = 1;

-- -----------------------------------------------------------------------------
-- 4. Que no vuelva a pasar
-- -----------------------------------------------------------------------------
-- El origen del problema no fue un error puntual sino que nada impedía
-- escribir la variante. Estos triggers son la lección de T-51 hecha regla, el
-- mismo criterio que el check de slug en 027_misconceptions.sql.

create or replace function public.normalize_topic_trigger()
returns trigger
language plpgsql
as $$
begin
  new.topic := public.normalize_topic(new.topic);
  return new;
end;
$$;

drop trigger if exists questions_normalize_topic on public.questions;
create trigger questions_normalize_topic
  before insert or update of topic on public.questions
  for each row execute function public.normalize_topic_trigger();

drop trigger if exists tests_normalize_topic on public.tests;
create trigger tests_normalize_topic
  before insert or update of topic on public.tests
  for each row execute function public.normalize_topic_trigger();

-- `test_configs` normaliza además el prerequisito: sin esto, un admin podría
-- apuntar a "Álgebra" y la FK fallaría con un mensaje incomprensible cuando la
-- fila real se llama "algebra".
create or replace function public.normalize_test_config_topics()
returns trigger
language plpgsql
as $$
begin
  new.topic := public.normalize_topic(new.topic);
  new.prerequisite_topic := public.normalize_topic(new.prerequisite_topic);
  if new.prerequisite_topic = new.topic then
    new.prerequisite_topic := null;
    new.min_theta := null;
  end if;
  return new;
end;
$$;

drop trigger if exists test_configs_normalize_topics on public.test_configs;
create trigger test_configs_normalize_topics
  before insert or update on public.test_configs
  for each row execute function public.normalize_test_config_topics();

-- -----------------------------------------------------------------------------
-- 5. Verificación (correr a mano después de aplicar)
-- -----------------------------------------------------------------------------
-- (i) No debe quedar ningún topic fuera de forma canónica:
--
--   select 'questions' as t, topic from public.questions
--    where public.normalize_topic(topic) is distinct from topic
--   union all
--   select 'tests', topic from public.tests
--    where topic is not null and public.normalize_topic(topic) is distinct from topic
--   union all
--   select 'test_configs', topic from public.test_configs
--    where public.normalize_topic(topic) is distinct from topic;
--
-- (ii) Qué queda sin módulo, que es el pendiente real de T-51 (esperado:
--      `diagnostico` y `paes_m1`, más cualquier topic sin equivalencia). Si
--      aparece un topic que SÍ tiene módulo evidente, agregarlo al mapeo de
--      arriba y a `universo.topics/explicit-topic->module-slug` juntos:
--
--   select topic, count(*) as sin_modulo
--     from public.questions
--    where module_id is null
--    group by topic
--    order by sin_modulo desc;
--
-- (iii) Conteo global de avance:
--
--   select count(*) filter (where module_id is null) as sin_modulo,
--          count(*) as total
--     from public.questions;
