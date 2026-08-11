-- T-44 / T-59 · Bajar el piso de esfuerzo de 3 s a 2 s, con datos.
--
-- ⚠ APLICAR DESPUÉS DE 028 (que creó la columna con default 3).
--
-- POR QUÉ: `028` fijó el piso en 3 s por criterio del autor, como el propio
-- ADR-014 admitía ("el umbral de la Fase 1 es heurístico hasta tener datos").
-- El 2026-08-10 se midió contra las 195 respuestas del histórico que tienen
-- tiempo real, barriendo el piso de 0 a 10 s y mirando **la tasa de acierto de
-- las respuestas descartadas**:
--
--   piso 0 s → 11 % descartadas, 18 % de acierto
--   piso 1 s → 15 % descartadas, 21 % de acierto
--   piso 2 s → 28 % descartadas, 27 % de acierto
--   piso 3 s → 35 % descartadas, 34 % de acierto   ← el valor de 028
--   piso 4 s → 42 % descartadas, 42 % de acierto
--
-- Con cuatro alternativas, responder al azar acierta 25 %. Mientras las
-- descartadas aciertan cerca de ese 25 %, el filtro está tirando ruido —que es
-- justo su trabajo—; en cuanto suben claramente por encima, está tirando
-- conocimiento. **El 3 quedaba del lado equivocado de esa línea; el 2 no.**
--
-- Se elige el valor conservador a propósito: descartar de más sesga θ sin
-- dejar rastro, mientras que conservar una respuesta dudosa solo agrega algo
-- de ruido que la regla de parada por SE ya compensa pidiendo más ítems.
--
-- ⚠ LO QUE ESTE NÚMERO **NO** ES: una calibración sólida. Las 195 respuestas
-- son el **9 %** del histórico (2178 respuestas en 209 tests; el resto tiene
-- `time-ms = 0`, ver T-59) y provienen casi seguro de tests recientes, no de
-- una muestra representativa de estudiantes. Es una corrección de un número
-- inventado por otro apoyado en la única evidencia disponible, no el modelo
-- empírico por ítem que T-59 propone. Revisar cuando haya tiempos de verdad.
--
-- Solo mueve las filas que siguen en el valor por defecto de `028`: si un
-- admin ya configuró un piso propio para su banco, se respeta.

alter table public.test_configs
  alter column min_response_seconds set default 2;

update public.test_configs
set min_response_seconds = 2
where min_response_seconds = 3;

comment on column public.test_configs.min_response_seconds is
  'Piso en segundos del umbral de esfuerzo (ADR-014 Fase 1). Umbral efectivo por ítem = max(este valor, largo_enunciado / 20). Bajo el umbral la respuesta no aporta a θ ni a la información de Fisher. 0 = solo aplica la regla proporcional. Default 2 s calibrado contra el histórico en 032 (T-59).';
