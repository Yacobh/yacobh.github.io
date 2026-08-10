-- T-59 · Exploración de los tiempos de respuesta ya acumulados.
--
-- ⚠ ESTE ARCHIVO NO ES UNA MIGRACIÓN. Son consultas de **solo lectura**: no
-- crean, no modifican y no borran nada. Se pegan en el SQL Editor de Supabase
-- y se corren de a una. Viven versionadas para que el resultado sea
-- reproducible y para no reescribirlas la próxima vez.
--
-- Para qué: ADR-014 difirió el modelo empírico de tiempos con la premisa de
-- que el proyecto tenía "cero estudiantes reales". Esa premisa se cayó el
-- 2026-08-09 (80 usuarios, 252 diagnósticos rendidos), y la instrumentación de
-- `time-ms` es de 2025-09-09, o sea **anterior** al piloto UNAP. Estas
-- consultas responden si esos datos existen de verdad y sirven.
--
-- Forma del JSONB (`tests.test`): lo escribe `clj->js` sobre el mapa de
-- ClojureScript, así que las claves conservan el nombre del keyword con guion:
--   { "responses": [ { "question-id": 123, "time-ms": 4200, "correct?": true,
--                      "difficulty": 0.5, "question-text": "…" }, … ],
--     "theta": 0.8, "theta-history": [...], "start-time": 1699…, … }
-- `time-ms` es el DELTA por pregunta, no un par de timestamps: no se puede
-- reconstruir si el estudiante se levantó a la mitad.

-- ---------------------------------------------------------------------------
-- Vista de trabajo: una fila por respuesta. Las 4 consultas la reusan.
-- ---------------------------------------------------------------------------
-- (No crea nada: es un CTE que hay que repetir en cada consulta. Se deja acá
--  arriba para copiar/pegar.)
--
--   with r as (
--     select t.id            as test_id,
--            t.topic         as topic,
--            t.theta         as theta_test,
--            (e.value ->> 'question-id')                       as question_id,
--            nullif(e.value ->> 'time-ms','')::double precision as time_ms,
--            (e.value ->> 'correct?')::boolean                  as correcta,
--            length(coalesce(e.value ->> 'question-text',''))    as largo
--     from public.tests t
--     cross join lateral jsonb_array_elements(
--       coalesce(t.test::jsonb -> 'responses', '[]'::jsonb)) as e(value)
--   )

-- ===========================================================================
-- 1. ¿Existen los datos? Cobertura de `time-ms` en el histórico
-- ===========================================================================
-- Lo que decide si T-59 es viable hoy o hay que esperar. Si `con_tiempo_util`
-- es una fracción chica, el resto de las consultas no significa nada.
with r as (
  select t.id as test_id,
         nullif(e.value ->> 'time-ms','')::double precision as time_ms
  from public.tests t
  cross join lateral jsonb_array_elements(
    coalesce(t.test::jsonb -> 'responses', '[]'::jsonb)) as e(value)
)
select (select count(*) from public.tests)                       as tests_en_total,
       count(distinct test_id)                                   as tests_con_respuestas,
       count(*)                                                  as respuestas,
       count(time_ms)                                            as con_campo_tiempo,
       count(*) filter (where time_ms > 0)                       as con_tiempo_util,
       round(100.0 * count(*) filter (where time_ms > 0)
             / nullif(count(*), 0), 1)                           as pct_util
from r;

-- ===========================================================================
-- 2. ¿Cómo se distribuye el tiempo? ¿Se ve la moda de clickeo rápido?
-- ===========================================================================
-- ADR-014 §Seguimiento predice una distribución **bimodal**: una moda
-- izquierda de respuestas no esforzadas y otra de respuestas reales. Si la
-- moda izquierda no aparece, el filtro de T-44 puede estar de más. El umbral
-- honesto va en el valle entre las dos, no en un número elegido a mano.
with r as (
  select nullif(e.value ->> 'time-ms','')::double precision / 1000.0 as seg
  from public.tests t
  cross join lateral jsonb_array_elements(
    coalesce(t.test::jsonb -> 'responses', '[]'::jsonb)) as e(value)
)
select count(*) as n,
       round(min(seg)::numeric, 2)  as min_s,
       round((percentile_cont(0.01) within group (order by seg))::numeric, 2) as p01,
       round((percentile_cont(0.05) within group (order by seg))::numeric, 2) as p05,
       round((percentile_cont(0.10) within group (order by seg))::numeric, 2) as p10,
       round((percentile_cont(0.25) within group (order by seg))::numeric, 2) as p25,
       round((percentile_cont(0.50) within group (order by seg))::numeric, 2) as mediana,
       round((percentile_cont(0.75) within group (order by seg))::numeric, 2) as p75,
       round((percentile_cont(0.95) within group (order by seg))::numeric, 2) as p95,
       round(max(seg)::numeric, 2)  as max_s
from r
where seg > 0;

-- Histograma por segundo para los primeros 20 s (acá se ve el valle, si existe)
with r as (
  select nullif(e.value ->> 'time-ms','')::double precision / 1000.0 as seg
  from public.tests t
  cross join lateral jsonb_array_elements(
    coalesce(t.test::jsonb -> 'responses', '[]'::jsonb)) as e(value)
)
select floor(seg)::int as segundo, count(*) as respuestas,
       repeat('█', greatest(1, (count(*) * 40 / max(count(*)) over ())::int)) as barra
from r
where seg > 0 and seg < 20
group by 1
order by 1;

-- ===========================================================================
-- 3. El parámetro que T-59 quiere aprender: tiempo típico por ítem (β_i)
-- ===========================================================================
-- Tres estimadores a propósito, para ver cuánto se separan:
--   media       — la que propusiste; sensible a los extremos
--   mediana     — robusta, no la mueve un click al azar
--   media_geom  — exp(promedio de ln t); es el β_i de ADR-014 Fase 2, y es el
--                 natural porque el tiempo es multiplicativo, no aditivo
-- Si media y mediana se separan mucho en un ítem, ese ítem tiene outliers y el
-- promedio simple ahí miente.
with r as (
  select (e.value ->> 'question-id') as question_id,
         nullif(e.value ->> 'time-ms','')::double precision as time_ms
  from public.tests t
  cross join lateral jsonb_array_elements(
    coalesce(t.test::jsonb -> 'responses', '[]'::jsonb)) as e(value)
)
select r.question_id,
       count(*)                                                          as n,
       round((avg(time_ms) / 1000.0)::numeric, 1)                        as media_s,
       round(((percentile_cont(0.5) within group (order by time_ms))
              / 1000.0)::numeric, 1)                                     as mediana_s,
       round((exp(avg(ln(time_ms))) / 1000.0)::numeric, 1)               as media_geom_s,
       round((stddev_samp(time_ms) / 1000.0)::numeric, 1)                as desv_s
from r
where time_ms > 0
group by r.question_id
having count(*) >= 5
order by n desc
limit 40;

-- ¿Cuántos ítems tienen ya suficientes respuestas para calibrarse solos?
-- Define el N mínimo del ticket y cuántos ítems seguirán necesitando el piso
-- autoral de T-44 como caso frío.
with r as (
  select (e.value ->> 'question-id') as question_id,
         nullif(e.value ->> 'time-ms','')::double precision as time_ms
  from public.tests t
  cross join lateral jsonb_array_elements(
    coalesce(t.test::jsonb -> 'responses', '[]'::jsonb)) as e(value)
  where nullif(e.value ->> 'time-ms','')::double precision > 0
)
select count(*) filter (where n >= 30) as items_con_30_o_mas,
       count(*) filter (where n >= 10) as items_con_10_o_mas,
       count(*) filter (where n >= 5)  as items_con_5_o_mas,
       count(*)                        as items_con_algun_dato,
       (select count(*) from public.questions) as items_en_el_banco
from (select question_id, count(*) as n from r group by question_id) x;

-- ===========================================================================
-- 4. ⭐ ¿El umbral autoral de T-44 es razonable? Contrastarlo con los datos
-- ===========================================================================
-- Aplica retroactivamente la regla de T-44 —descartar si
-- `time < max(3 s, largo_del_enunciado / 20)`— al histórico completo, y dice
-- qué fracción de respuestas reales habría descartado.
--
-- Cómo leerlo:
--   ~1–5 %   el umbral es conservador y plausible, como pretendía ADR-014
--   > 15 %   está descartando estudiantes legítimos: hay que bajarlo
--   ~0 %     no está haciendo nada; o no hay clickeo al azar, o quedó corto
--
-- Ojo: `question-text` viaja dentro del JSONB de cada respuesta, así que el
-- largo es el que se le mostró a ESE estudiante, no el actual del ítem.
with r as (
  select t.id as test_id,
         t.theta as theta_test,
         nullif(e.value ->> 'time-ms','')::double precision as time_ms,
         length(coalesce(e.value ->> 'question-text', ''))  as largo,
         (e.value ->> 'correct?')::boolean                  as correcta
  from public.tests t
  cross join lateral jsonb_array_elements(
    coalesce(t.test::jsonb -> 'responses', '[]'::jsonb)) as e(value)
),
evaluadas as (
  select *,
         1000.0 * greatest(3.0, largo / 20.0) as umbral_ms
  from r
  where time_ms > 0
)
select count(*)                                                as respuestas,
       count(*) filter (where time_ms < umbral_ms)             as se_descartarian,
       round(100.0 * count(*) filter (where time_ms < umbral_ms)
             / nullif(count(*), 0), 2)                         as pct_descartado,
       -- Control de validez: una respuesta no esforzada debería acertar cerca
       -- del azar (25 % con 4 alternativas). Si las descartadas aciertan mucho
       -- más que eso, el umbral está comiéndose respuestas buenas.
       round(100.0 * count(*) filter (where time_ms < umbral_ms and correcta)
             / nullif(count(*) filter (where time_ms < umbral_ms), 0), 1)
                                                               as pct_acierto_descartadas,
       round(100.0 * count(*) filter (where time_ms >= umbral_ms and correcta)
             / nullif(count(*) filter (where time_ms >= umbral_ms), 0), 1)
                                                               as pct_acierto_conservadas
from evaluadas;

-- ¿Cuál de las dos reglas manda en la práctica? (piso vs. largo / 20)
-- Al validar estas consultas contra un fixture apareció que con enunciados de
-- 40–200 caracteres la parte proporcional (2–10 s) domina al piso de 3 s casi
-- siempre — o sea, el piso configurable por banco de T-44 casi no actuaría.
-- Si eso se confirma con los enunciados reales, el campo del panel de admin
-- sobra y hay que sacarlo. Esta consulta lo responde.
select count(*)                                                  as items,
       round(avg(length(question))::numeric, 0)                   as largo_medio,
       round((percentile_cont(0.5) within group (order by length(question)))::numeric, 0) as largo_mediano,
       min(length(question))                                      as largo_min,
       max(length(question))                                      as largo_max,
       count(*) filter (where length(question) / 20.0 > 3.0)      as items_donde_manda_el_largo,
       count(*) filter (where length(question) / 20.0 <= 3.0)     as items_donde_manda_el_piso
from public.questions
where question is not null;

-- Barrido del piso de 0 a 10 s, para elegirlo con datos en vez de a ojo. La columna que importa es `pct_acierto_descartadas`: mientras siga
-- cerca de 25 % (azar con 4 alternativas), el piso está descartando ruido; en
-- cuanto sube claramente por encima, empezó a descartar conocimiento.
with r as (
  select nullif(e.value ->> 'time-ms','')::double precision as time_ms,
         length(coalesce(e.value ->> 'question-text', ''))  as largo,
         (e.value ->> 'correct?')::boolean                  as correcta
  from public.tests t
  cross join lateral jsonb_array_elements(
    coalesce(t.test::jsonb -> 'responses', '[]'::jsonb)) as e(value)
),
pisos as (select generate_series(0, 10) as piso)
select p.piso as piso_segundos,
       count(*) filter (where r.time_ms < 1000.0 * greatest(p.piso, r.largo / 20.0))
                                                              as descartadas,
       round(100.0 * count(*) filter (where r.time_ms < 1000.0 * greatest(p.piso, r.largo / 20.0))
             / nullif(count(*), 0), 2)                        as pct,
       round(100.0 * count(*) filter (where r.time_ms < 1000.0 * greatest(p.piso, r.largo / 20.0)
                                        and r.correcta)
             / nullif(count(*) filter (where r.time_ms < 1000.0 * greatest(p.piso, r.largo / 20.0)), 0), 1)
                                                              as pct_acierto_descartadas
from pisos p cross join r
where r.time_ms > 0
group by p.piso
order by p.piso;

-- ===========================================================================
-- 5. ¿Tiempo y nivel están relacionados? (la pregunta que decide el ponderado)
-- ===========================================================================
-- Si el tiempo por ítem no depende del nivel de quien lo respondió, el
-- promedio simple basta y el "promedio ponderado por nivel" no aporta. Si sí
-- depende, hay que descontar la velocidad de la persona antes de estimar el
-- tiempo del ítem — y ahí recién tiene sentido el modelo de ADR-014 Fase 2.
--
-- Es la correlación ρ que la Fase 3 del ADR usa como criterio de corte: si sale
-- cercana a cero, esa fase NO se implementa y se documenta el resultado
-- negativo en vez de forzar el modelo.
with r as (
  select t.theta as theta_test,
         nullif(e.value ->> 'time-ms','')::double precision as time_ms
  from public.tests t
  cross join lateral jsonb_array_elements(
    coalesce(t.test::jsonb -> 'responses', '[]'::jsonb)) as e(value)
  where t.theta is not null
)
select count(*)                                        as n,
       round(corr(theta_test, ln(time_ms))::numeric, 3) as rho_theta_vs_ln_tiempo,
       round(corr(theta_test, time_ms)::numeric, 3)     as rho_theta_vs_tiempo
from r
where time_ms > 0;

-- Y la versión legible: tiempo típico por banda de θ
with r as (
  select case when t.theta >= 2.0 then 'avanzado'
              when t.theta >= 1.0 then 'intermedio'
              when t.theta >= 0.0 then 'basico'
              else 'inicial' end                            as banda,
         nullif(e.value ->> 'time-ms','')::double precision as time_ms
  from public.tests t
  cross join lateral jsonb_array_elements(
    coalesce(t.test::jsonb -> 'responses', '[]'::jsonb)) as e(value)
  where t.theta is not null
)
select banda, count(*) as respuestas,
       round(((percentile_cont(0.5) within group (order by time_ms)) / 1000.0)::numeric, 1) as mediana_s,
       round((exp(avg(ln(time_ms))) / 1000.0)::numeric, 1) as media_geom_s
from r
where time_ms > 0
group by banda
order by case banda when 'inicial' then 1 when 'basico' then 2
                    when 'intermedio' then 3 else 4 end;
