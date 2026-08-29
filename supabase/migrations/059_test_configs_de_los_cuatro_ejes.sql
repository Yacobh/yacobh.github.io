-- Los cuatro bancos nuevos pasan a ser diagnósticos que alguien puede rendir.
--
-- EL DEFECTO QUE CIERRA (T-125). Ninguna de las migraciones de banco —`050`,
-- `052`, `054`, `056`— crea la fila de `test_configs` de su topic, y esa tabla
-- (`020`, [[../adr/ADR-013-config-parada-por-banco-y-prerequisitos]]) es la que
-- arma el selector y la regla de parada. Se sembró una vez, en `020`, con los
-- topics que existían entonces; los topics nuevos no aparecen solos.
--
-- Medido en producción el 2026-08-28:
--
--   topic         items  tiene_config
--   algebra        100        0
--   geometria      100        0
--   numeros        100        0
--   probabilidad   114        0
--
-- O sea **414 ítems aplicados que ningún estudiante podía rendir**. Es el riesgo
-- R-30 en su forma más literal: más producto, cero uso.
--
-- DECISIONES DEL OWNER (2026-08-28), que no las toma un agente:
--
--   · los cuatro entran **publicados** (`active = true`);
--   · **encadenados**: `numeros` es prerrequisito de los otros tres, sin `min_theta`
--     —basta con haberlo rendido—, que es la progresión que ya sostiene el reparto
--     de bandas por eje (`049`, `051`, `053`, `055`).
--
-- Los parámetros de parada son los mismos que `020` le dio a todos los bancos:
-- 5 ítems mínimo, 12 máximo, umbral de error 0,35. **No se tocan acá**: cambiar la
-- regla de parada es otra decisión, con su propia evidencia (T-111, T-117).
--
-- ⚠️ **ORDEN: esta migración va DESPUÉS de `057` y `058`.** Publicar el banco de
-- probabilidad antes de `058` pondría los 12 ítems de varianza y desviación
-- estándar —que no entran en el temario M1 de Admisión 2027— delante de un
-- estudiante. La guarda de abajo se niega a correr si eso no está resuelto.
--
-- ⚠️ **Consecuencia conocida y aceptada: van a convivir bancos duplicados.** El
-- estudiante verá el diagnóstico nuevo de números junto a `numbers_v1`, y el de
-- álgebra junto a `polinomios` y sus fragmentos. Retirarlos es T-122, y ahora se
-- puede hacer de verdad: `057` creó `questions.active`.
--
-- ⚠️ **Y los 414 ítems no están revisados pedagógicamente** (T-120, T-121, T-123,
-- T-124 siguen abiertas). El owner decidió publicar igual; queda escrito acá para
-- que la decisión tenga fecha y dueño.

-- -----------------------------------------------------------------------------
-- 0. Guardas
-- -----------------------------------------------------------------------------
do $$
declare
  fuera_de_temario int;
begin
  if not exists (select 1 from information_schema.columns
                  where table_schema = 'public' and table_name = 'questions'
                    and column_name = 'active') then
    raise exception 'Falta `questions.active`: aplicar 057 y 058 antes de publicar los bancos';
  end if;

  select count(*) into fuera_de_temario
    from public.questions
   where topic = 'probabilidad'
     and coalesce(active, true)
     and (question ilike '%varianza%' or question ilike '%desviaci%'
          or option_a ilike '%varianza%' or option_a ilike '%desviaci%'
          or option_b ilike '%varianza%' or option_b ilike '%desviaci%'
          or option_c ilike '%varianza%' or option_c ilike '%desviaci%'
          or option_d ilike '%varianza%' or option_d ilike '%desviaci%');

  if fuera_de_temario > 0 then
    raise exception 'Quedan % ítems de varianza/desviación activos en `probabilidad`: aplicar 058 antes de publicar (no entran en el temario M1 de Admisión 2027)', fuera_de_temario;
  end if;
end $$;

-- -----------------------------------------------------------------------------
-- 1. Números — la puerta de entrada
-- -----------------------------------------------------------------------------
-- Va primero y en su propia sentencia: los otros tres lo referencian por FK.

insert into public.test_configs (topic, display_name, min_items, max_items, se_threshold, active)
values ('numeros', 'Números', 5, 12, 0.35, true)
on conflict (topic) do nothing;

-- -----------------------------------------------------------------------------
-- 2. Los otros tres ejes, encadenados a números
-- -----------------------------------------------------------------------------
insert into public.test_configs
  (topic, display_name, min_items, max_items, se_threshold, prerequisite_topic, active)
values
  ('algebra',      'Álgebra',                    5, 12, 0.35, 'numeros', true),
  ('geometria',    'Geometría',                  5, 12, 0.35, 'numeros', true),
  ('probabilidad', 'Probabilidad y estadística', 5, 12, 0.35, 'numeros', true)
on conflict (topic) do nothing;

-- `do nothing` y no `do update`: si alguna fila ya existiera, sus parámetros los
-- puso alguien a propósito y esta migración no tiene por qué pisarlos. Después de
-- aplicar, la consulta de verificación muestra en qué quedó cada una.

-- -----------------------------------------------------------------------------
-- Verificación
-- -----------------------------------------------------------------------------
--   select c.topic, c.display_name, c.active, c.prerequisite_topic,
--          c.min_items, c.max_items, c.se_threshold,
--          count(q.id) filter (where coalesce(q.active, true)) as items_servibles
--     from public.test_configs c
--     left join public.questions q on q.topic = c.topic
--    where c.topic in ('numeros', 'algebra', 'geometria', 'probabilidad')
--    group by 1,2,3,4,5,6,7 order by c.prerequisite_topic nulls first, c.topic;
--   -- cuatro filas · numeros sin prerequisito · los otros tres con 'numeros'
--   -- items_servibles: 100 / 100 / 100 / 102
--
--   -- Y que la cadena no tenga un eslabón apagado (un prerrequisito inactivo
--   -- dejaría a los otros tres inalcanzables):
--   select c.topic, c.active, p.topic as prerreq, p.active as prerreq_activo
--     from public.test_configs c
--     left join public.test_configs p on p.topic = c.prerequisite_topic
--    where c.topic in ('numeros', 'algebra', 'geometria', 'probabilidad');
--
-- Reversión (deja de mostrarlos sin borrar nada):
--   update public.test_configs set active = false
--    where topic in ('numeros', 'algebra', 'geometria', 'probabilidad');
