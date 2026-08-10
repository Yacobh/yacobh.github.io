-- T-51 (cierre del backfill) · Dos módulos nuevos y las últimas 4 preguntas.
--
-- ⚠ APLICAR DESPUÉS DE 030.
--
-- Las tres ambigüedades que `030` dejó a propósito sin resolver las decidió el
-- profesor el 2026-08-10, y dos de ellas se resuelven **creando módulo**, no
-- forzando el ítem dentro de uno que no le corresponde:
--
--   · `inecuaciones` (2 ítems)              → **`algebra/inecuaciones`** (módulo nuevo)
--   · `operaciones_fundamentales` (1 ítem)  → **`aritmetica/operaciones_fundamentales`** (nuevo)
--   · `ecuaciones cuadraticas` (1 ítem)     → `algebra/ecuaciones` (módulo existente)
--
-- Los 18 módulos de `002_seed_modules.sql` pasan a ser **20**. `order_index` se
-- elige dejando hueco: `operaciones_fundamentales` va en 15 (entre numeración,
-- 10, y enteros, 20 — el orden de Baldor, donde las cuatro operaciones vienen
-- justo después de la numeración) e `inecuaciones` en 125 (después de
-- ecuaciones lineales, 120, y antes de sistemas, 130).
--
-- ⚠ CONSECUENCIA A TENER PRESENTE: los dos módulos nuevos nacen **sin ningún
-- recurso publicado**. Un estudiante cuyo déficit principal caiga ahí va a ver
-- el estado vacío de T-24 en "Mi plan". Es preferible a que vea material de
-- otro tema rotulado como suyo (mismo criterio de honestidad de T-53), pero es
-- contenido pendiente: se suma a T-56 y a T-27 bajo ADR-016.
--
-- Espejo de `universo.topics/module-slugs` y de
-- `universo.topics/explicit-topic->module-slug`: los tres cambios van juntos.
--
-- Idempotente: upsert por slug y solo toca `module_id is null`.

insert into public.modules (slug, title, track, order_index, historical_blurb)
values
  ('aritmetica/operaciones_fundamentales', 'Operaciones fundamentales', 'aritmetica', 15,
   'Sumar, restar, multiplicar y dividir por escrito es una técnica, no un hecho natural: los algoritmos que hoy se enseñan llegaron a Europa con la numeración posicional hindú-arábiga y desplazaron al ábaco recién entre los siglos XIII y XVI.'),
  ('algebra/inecuaciones', 'Inecuaciones', 'algebra', 125,
   'Comparar magnitudes necesitó notación propia, distinta de la igualdad: los signos < y > aparecen en la obra póstuma de Thomas Harriot (1631), y el paso de "cuánto vale" a "entre qué valores está" es el que abre el camino a los intervalos.')
on conflict (slug) do update
  set title = excluded.title,
      track = excluded.track,
      order_index = excluded.order_index,
      historical_blurb = excluded.historical_blurb;

-- `inecuaciones` y `operaciones_fundamentales` NO necesitan equivalencia
-- explícita: una vez que el módulo existe, el topic coincide exactamente con
-- el sufijo del slug y la regla de coincidencia por sufijo de `029` los
-- resuelve sola. Se dejan igual en el `values` por claridad de lectura y
-- porque hace la migración independiente del orden en que se apliquen las
-- reglas.
with mapeo (topic, slug) as (
  values
    ('inecuaciones',              'algebra/inecuaciones'),
    ('operaciones_fundamentales', 'aritmetica/operaciones_fundamentales'),
    ('ecuaciones cuadraticas',    'algebra/ecuaciones')
)
update public.questions q
set module_id = m.id
from mapeo x
join public.modules m on m.slug = x.slug
where q.module_id is null
  and public.normalize_topic(q.topic) = x.topic;

-- -----------------------------------------------------------------------------
-- Después de esta migración deberían quedar **128** ítems sin `module_id`:
-- exactamente `diagnostico` (84) + `paes_m1` (44), los dos bancos MEZCLADOS.
-- Ese resto no lo cierra ninguna migración: necesita clasificación por ítem,
-- que es contenido (ADR-016) y no SQL.
--
-- Verificación:
--
--   select topic, count(*) as sin_modulo
--     from public.questions
--    where module_id is null
--    group by topic
--    order by sin_modulo desc;
--
--   select count(*) filter (where module_id is null) as sin_modulo,
--          count(*) as total
--     from public.questions;
--
--   select slug, title, track, order_index from public.modules order by order_index;
