-- 086 · Retirar de circulación los ítems duplicados dentro de un mismo banco (T-106)
-- ===========================================================================
-- Migración de contenido: la puede aplicar `claude_ddl` si el owner lo pide
-- (ADR-040), o el owner en el SQL Editor. No borra nada.
--
-- ── El problema ────────────────────────────────────────────────────────────
-- El test elige por cercanía de dificultad, y las copias de un enunciado
-- tienen la misma dificultad. Un enunciado con cinco copias tiene cinco veces
-- más probabilidad de salir, y **puede salir dos veces en la misma sesión**:
-- `p_answered` excluye ids, no enunciados. El modelo cuenta la segunda como
-- evidencia nueva, y no lo es.
--
-- Medido el 2026-09-23 con `claude_ro` sobre los ítems activos (enunciado
-- normalizado sin espacios ni mayúsculas): 19 grupos dentro de un mismo banco,
-- **27 copias sobrantes**, más el par 36/112 de `diagnostico`, que es la misma
-- ecuación con otra redacción.
--
-- ── Criterio ───────────────────────────────────────────────────────────────
-- - Se conserva la copia de **id menor** y se desactivan las demás. En los 19
--   grupos **ninguna copia tiene idea errónea catalogada** (0 en todas, que era
--   la advertencia de T-106), así que elegir una no pierde catálogo.
-- - En 36/112 se conserva **36**: 66 respuestas contra 0 en 112 desde que
--   existe el conteo.
-- - **No se tocan los duplicados entre bancos distintos** (262 `numbers_v1` /
--   542 `numeros`, 12 `ecuaciones cuadraticas` / 36 `diagnostico`): no salen en
--   el mismo test, y retirarlos es T-122.
-- - `active = false` y no `delete`: el histórico de `tests` los referencia.
--
-- Cada `update` exige además el topic esperado: si un id no es lo que esta
-- migración cree, la fila no se toca.
-- ===========================================================================

update public.questions q
   set active = false
  from (values
    -- paes_m1: tres enunciados, 5 + 5 + 3 copias
    (377::bigint, 'paes_m1'), (379, 'paes_m1'), (381, 'paes_m1'), (383, 'paes_m1'),  -- se queda 375
    (378, 'paes_m1'), (380, 'paes_m1'), (382, 'paes_m1'), (384, 'paes_m1'),          -- se queda 376
    (417, 'paes_m1'), (418, 'paes_m1'),                                              -- se queda 416
    -- numbers_v1
    (182, 'numbers_v1'),  -- 119
    (183, 'numbers_v1'),  -- 120
    (184, 'numbers_v1'),  -- 134
    (185, 'numbers_v1'),  -- 135
    (186, 'numbers_v1'),  -- 136
    (187, 'numbers_v1'),  -- 137
    (188, 'numbers_v1'),  -- 138
    -- polinomios
    (216, 'polinomios'),  -- 189
    (218, 'polinomios'),  -- 191
    (219, 'polinomios'),  -- 192
    (220, 'polinomios'),  -- 193
    (223, 'polinomios'),  -- 196
    (224, 'polinomios'),  -- 197
    -- otros fragmentos del eje de álgebra
    (198, 'factorizacion'), (209, 'factorizacion'),  -- 162
    (217, 'terminos_semejantes'),                    -- 190
    (214, 'ecuaciones_simples'),                     -- 167
    -- diagnostico: la misma ecuación que 36
    (112, 'diagnostico')
  ) as r(id, topic)
 where q.id = r.id
   and q.topic = r.topic
   and q.active;

-- ---------------------------------------------------------------------------
-- Verificación
-- ---------------------------------------------------------------------------
--   -- (a) Ningún enunciado repetido dentro de un banco activo. Esperado: 0 filas.
--   select topic, lower(regexp_replace(question, '\s+', '', 'g')), count(*)
--     from public.questions
--    where active and topic not like 'mq\_%'
--    group by 1, 2 having count(*) > 1;
--
--   -- (b) Exactamente estas 28 quedaron inactivas.
--   select count(*) from public.questions
--    where not active and id in (377,379,381,383,378,380,382,384,417,418,
--      182,183,184,185,186,187,188,216,218,219,220,223,224,198,209,217,214,112);
--
-- Reversión:
--   update public.questions set active = true
--    where id in (377,379,381,383,378,380,382,384,417,418,
--      182,183,184,185,186,187,188,216,218,219,220,223,224,198,209,217,214,112);
