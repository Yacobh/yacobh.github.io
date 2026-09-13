-- T-130 · El mapa de errores de un curso.
--
-- ⚠ ESTE ARCHIVO NO ES UNA MIGRACIÓN. Son consultas de **solo lectura**: no
-- crean, no modifican y no borran nada. Se pegan en el SQL Editor de Supabase
-- y se corren de a un bloque. Viven versionadas para que el resultado sea
-- reproducible y para no reescribirlas la próxima vez (mismo criterio que
-- `T-59_calibracion_tiempos.sql` y `verificacion_esquema.sql`).
--
-- ── PARA QUÉ ────────────────────────────────────────────────────────────────
-- El 2026-09 el owner aplicó el eje de números a su 4º medio, presencial en
-- clase. El panel de administración muestra **seis columnas** —estudiante,
-- fecha, tema, θ, aciertos, estado— y **las filas no son clickeables**, así que
-- la pregunta que justificaba la sesión entera quedó sin responder: *¿dónde se
-- equivocaron?*
--
-- El dato **sí está**. Cada respuesta guarda la alternativa elegida y el texto
-- de la idea errónea de ese distractor. Lo que falta es la pantalla, y esa es
-- T-133. Mientras tanto, esto.
--
-- El entregable es la **consulta 2**: el ranking de ideas erróneas del curso.
-- *"22 de 34 estudiantes confunden el signo al despejar en inecuaciones"* es
-- accionable para el profesor el lunes siguiente; *"el 4º B sacó 55 %"* no.
-- Ver [[../../project-memory/TESIS_DE_CRECIMIENTO]] G-1 y [[BACKLOG]] T-82.
--
-- ── FORMA DEL JSONB (`tests.test`) ──────────────────────────────────────────
-- Lo escribe `clj->js` sobre el mapa de ClojureScript, así que las claves
-- conservan el nombre del keyword **con guion**:
--
--   { "responses": [ { "question-id": 123,
--                      "selected-option": "b",      -- la que marcó
--                      "correct-option":  "d",
--                      "correct?": false,
--                      "selected-error": "Cambia el signo al…",  -- capa 0
--                      "module-slug": "algebra/inecuaciones",
--                      "difficulty": 0.5,
--                      "time-ms": 4200,
--                      "weight": 1.0,               -- ADR-014, 0.0 = descartada
--                      "escape": "enunciado",       -- ADR-029, o ausente
--                      "question-text": "…" }, … ],
--     "theta": 0.8, "theta-history": [...], "stop-reason": "max-items", … }
--
-- Ojo con dos columnas: `email-user` lleva **guion** y hay que citarla
-- (`t."email-user"`), y `test` se castea a `::jsonb` defensivamente.
--
-- ── DOS GUARDAS QUE NO SON OPCIONALES ───────────────────────────────────────
--
-- 1. **Excluir los tracks que no son producto.** `cuantica` (`mq_%`) y
--    `electrotecnia` comparten el motor pero no el temario. El conteo crudo de
--    `questions` dejó de significar «el banco del producto» (ver [[../../CLAUDE]]
--    §4). Acá da igual mientras fijes un `topic`, pero si lo dejas abierto,
--    importa.
--
-- 2. **Excluir las corridas del owner.** Desde ADR-032 depurar un ítem
--    significa rendirlo, así que cada depuración deja una fila indistinguible
--    de la de un estudiante real, **concentrada justo en los ítems que más se
--    depuraron**. Mezclarlas sesga el mapa hacia la facilidad en correlación
--    con la variable de interés ([[RISKS]] R-37). `tests.origin` todavía no
--    existe (es [[BACKLOG]] T-110); mientras tanto se excluye por `user_id`, y
--    por eso queda **escrito acá y versionado**, no recordado de memoria.
--
-- ── LÍMITES QUE HAY QUE DECIR ANTES DE LEER LOS NÚMEROS ─────────────────────
--
-- · **Los abandonos no están.** Un test que se cerró a mitad **no deja
--   ninguna fila** (el único `insert` ocurre en `:test/complete`). Así que
--   «cuántos de N terminaron» se responde contra la lista de curso, no contra
--   esta tabla. Es [[BACKLOG]] T-134.
-- · **`time-ms` es casi todo 0 en el histórico** (9 % útil al 2026-08, T-59).
--   En los tests nuevos sí registra, pero revisa la consulta 1 antes de creerle
--   a cualquier promedio de tiempo.
-- · **`difficulty` es autoral, no calibrada** ([[RISKS]] R-17). θ ordena bien a
--   los estudiantes entre sí; su valor absoluto todavía no significa lo que
--   dirá cuando el banco esté calibrado (G-2).


-- ===========================================================================
-- 0. PREPARACIÓN — los tres datos que necesitas para llenar los parámetros
-- ===========================================================================
-- Córrela primero y anota los valores; el resto de los bloques los usa.

-- 0.a · ¿Cuál es tu `user_id`? (para excluir tus propias corridas)
select id, email
from auth.users
where email = 'jacobocordova@gmail.com';   -- ← EDITA si usaste otra cuenta

-- 0.b · ¿Qué se rindió y cuándo? Las últimas dos semanas, por tema y día.
select t.topic,
       date(t.created_at)              as dia,
       count(*)                        as tests,
       count(distinct t."email-user")  as personas
from public.tests t
where t.created_at >= now() - interval '21 days'
group by 1, 2
order by 2 desc, 3 desc;

-- 0.c · ¿Quiénes rindieron ese tema? (para armar la lista del curso)
select t."email-user"       as correo,
       count(*)             as intentos,
       max(t.created_at)    as ultimo,
       max(t.theta)         as mejor_theta
from public.tests t
where t.topic = 'numeros'                      -- ← EDITA
  and t.created_at >= '2026-09-01'             -- ← EDITA
group by 1
order by 3 desc;


-- ===========================================================================
-- EL CTE `grupo` — se repite en cada consulta. Edítalo UNA vez y pégalo.
-- ===========================================================================
-- Los parámetros están todos acá arriba a propósito: si quedan repartidos por
-- las seis consultas, tarde o temprano una queda con la fecha vieja y el
-- resultado miente sin avisar.
--
--   with grupo as (
--     select t.id                  as test_id,
--            t.created_at          as fecha,
--            t."email-user"        as correo,
--            t.user_id             as user_id,
--            t.topic               as topic,
--            t.theta               as theta,
--            t.engine_version      as motor,
--            t.test::jsonb         as j
--     from public.tests t
--     where t.topic = 'numeros'                        -- ← EDITA: el banco
--       and t.created_at >= '2026-09-01'               -- ← EDITA: desde
--       and t.created_at <  '2026-10-01'               -- ← EDITA: hasta
--       -- Guarda 1: los tracks que no son producto.
--       and t.topic not like 'mq\_%'
--       and t.topic not like 'electrotecnia%'
--       -- Guarda 2: R-37, fuera las corridas de depuración del owner.
--       and t.user_id <> '00000000-0000-0000-0000-000000000000'::uuid  -- ← EDITA (0.a)
--       -- Opcional: acota a la lista del curso, si la tienes.
--       -- and t."email-user" in ('alumno1@…', 'alumno2@…')
--   )


-- ===========================================================================
-- 1. ¿A quién estoy mirando? Un renglón por intento
-- ===========================================================================
-- Empieza siempre acá: si el número de personas no coincide con el curso que
-- estuvo en la sala, cualquier porcentaje de más abajo está mal repartido.
with grupo as (
  select t.id as test_id, t.created_at as fecha, t."email-user" as correo,
         t.user_id, t.topic, t.theta, t.engine_version as motor,
         t.test::jsonb as j
  from public.tests t
  where t.topic = 'numeros'
    and t.created_at >= '2026-09-01'
    and t.created_at <  '2026-10-01'
    and t.topic not like 'mq\_%'
    and t.topic not like 'electrotecnia%'
    and t.user_id <> '00000000-0000-0000-0000-000000000000'::uuid
)
select correo,
       fecha::date                                            as dia,
       round(theta::numeric, 2)                               as theta,
       jsonb_array_length(coalesce(j -> 'responses','[]'))    as items,
       (select count(*) from jsonb_array_elements(coalesce(j -> 'responses','[]')) e
         where (e.value ->> 'correct?')::boolean)             as aciertos,
       (select count(*) from jsonb_array_elements(coalesce(j -> 'responses','[]')) e
         where e.value ? 'escape')                            as escapes,
       (select count(*) from jsonb_array_elements(coalesce(j -> 'responses','[]')) e
         where coalesce((e.value ->> 'weight')::double precision, 1) = 0)
                                                              as descartadas,
       j ->> 'stop-reason'                                    as parada,
       round(extract(epoch from
             (to_timestamp((j ->> 'end-time')::double precision / 1000)
            - to_timestamp((j ->> 'start-time')::double precision / 1000)))::numeric / 60, 1)
                                                              as minutos,
       motor
from grupo
order by fecha;

-- Y el resumen de una línea, que es lo que se dice en voz alta:
with grupo as (
  select t.id as test_id, t."email-user" as correo, t.theta, t.user_id, t.topic, t.created_at
  from public.tests t
  where t.topic = 'numeros'
    and t.created_at >= '2026-09-01' and t.created_at < '2026-10-01'
    and t.topic not like 'mq\_%' and t.topic not like 'electrotecnia%'
    and t.user_id <> '00000000-0000-0000-0000-000000000000'::uuid
)
select count(*)                                      as intentos,
       count(distinct correo)                        as estudiantes,
       round(avg(theta)::numeric, 2)                 as theta_medio,
       round(stddev_samp(theta)::numeric, 2)         as desviacion,
       round(min(theta)::numeric, 2)                 as theta_min,
       round(max(theta)::numeric, 2)                 as theta_max
from grupo;


-- ===========================================================================
-- 2. ⭐ EL ENTREGABLE — ranking de ideas erróneas del curso
-- ===========================================================================
-- Esta es la consulta que justifica el archivo. Lee: *"N de M estudiantes
-- cometen este error"*.
--
-- Tres filtros y por qué:
--   · `correct? = false` — la idea errónea es la del distractor elegido; en una
--     respuesta correcta el campo no significa nada.
--   · `not (e.value ? 'escape')` — un escape (ADR-029) es «no sé», no es haber
--     caído en una idea errónea. Contarlo acá inventaría un error que el
--     estudiante nunca cometió.
--   · `weight > 0` — ADR-014 / T-44: una respuesta clickeada en dos segundos no
--     es evidencia de nada. La columna `desestimadas` te dice cuántas se
--     dejaron fuera, para que el filtro no sea invisible.
with grupo as (
  select t.id as test_id, t."email-user" as correo, t.test::jsonb as j,
         t.user_id, t.topic, t.created_at
  from public.tests t
  where t.topic = 'numeros'
    and t.created_at >= '2026-09-01' and t.created_at < '2026-10-01'
    and t.topic not like 'mq\_%' and t.topic not like 'electrotecnia%'
    and t.user_id <> '00000000-0000-0000-0000-000000000000'::uuid
),
r as (
  select g.correo,
         e.value ->> 'selected-error'  as idea_erronea,
         e.value ->> 'module-slug'     as modulo,
         (e.value ->> 'correct?')::boolean as correcta,
         coalesce((e.value ->> 'weight')::double precision, 1) as peso,
         e.value ? 'escape'            as fue_escape
  from grupo g
  cross join lateral jsonb_array_elements(coalesce(g.j -> 'responses','[]'::jsonb)) as e(value)
),
total as (select count(distinct correo) as n from grupo)
select r.idea_erronea,
       r.modulo,
       count(distinct r.correo)                                  as estudiantes,
       (select n from total)                                     as de_un_total_de,
       round(100.0 * count(distinct r.correo) / nullif((select n from total),0), 0)
                                                                 as pct,
       count(*)                                                  as veces,
       repeat('█', greatest(1, (count(distinct r.correo) * 30
              / nullif((select n from total),0))::int))           as barra
from r
where r.correcta is false
  and r.fue_escape is false
  and r.peso > 0
  and coalesce(r.idea_erronea, '') <> ''
group by 1, 2
order by estudiantes desc, veces desc;

-- Cuántas respuestas quedaron fuera por los filtros de arriba (para decirlo).
-- Las categorías son **excluyentes y suman el total**: si no suman, algún
-- filtro de la consulta de arriba no es el que crees.
with grupo as (
  select t.id as test_id, t.test::jsonb as j, t.user_id, t.topic, t.created_at
  from public.tests t
  where t.topic = 'numeros'
    and t.created_at >= '2026-09-01' and t.created_at < '2026-10-01'
    and t.topic not like 'mq\_%' and t.topic not like 'electrotecnia%'
    and t.user_id <> '00000000-0000-0000-0000-000000000000'::uuid
),
r as (
  select (e.value ->> 'correct?')::boolean as correcta,
         coalesce((e.value ->> 'weight')::double precision, 1) as peso,
         e.value ? 'escape' as fue_escape,
         coalesce(e.value ->> 'selected-error','') as idea
  from grupo g
  cross join lateral jsonb_array_elements(coalesce(g.j -> 'responses','[]'::jsonb)) as e(value)
)
select count(*)                                              as respuestas,
       count(*) filter (where correcta)                      as correctas,
       count(*) filter (where not correcta and fue_escape)   as escapes,
       count(*) filter (where not correcta and not fue_escape
                          and peso = 0)                      as desestimadas_por_esfuerzo,
       count(*) filter (where not correcta and not fue_escape
                          and peso > 0 and idea = '')        as sin_idea_catalogada,
       count(*) filter (where not correcta and not fue_escape
                          and peso > 0 and idea <> '')       as usadas_en_el_ranking
from r;


-- ===========================================================================
-- 3. Los ítems que más fallaron
-- ===========================================================================
-- Sirve para dos cosas distintas y conviene no confundirlas: para el profesor,
-- qué contenido reforzar; para el autor del banco, qué ítem está mal escrito.
-- Un ítem con acierto ≈ 25 % (el azar en cuatro alternativas) y todos los
-- estudiantes marcando **la misma** alternativa incorrecta suele ser lo
-- segundo, no lo primero.
with grupo as (
  select t.id as test_id, t."email-user" as correo, t.test::jsonb as j,
         t.user_id, t.topic, t.created_at
  from public.tests t
  where t.topic = 'numeros'
    and t.created_at >= '2026-09-01' and t.created_at < '2026-10-01'
    and t.topic not like 'mq\_%' and t.topic not like 'electrotecnia%'
    and t.user_id <> '00000000-0000-0000-0000-000000000000'::uuid
),
r as (
  select e.value ->> 'question-id'   as question_id,
         left(e.value ->> 'question-text', 90) as enunciado,
         e.value ->> 'module-slug'   as modulo,
         (e.value ->> 'difficulty')::double precision as dificultad,
         (e.value ->> 'correct?')::boolean as correcta,
         e.value ->> 'selected-option' as marcada,
         e.value ->> 'correct-option'  as era
  from grupo g
  cross join lateral jsonb_array_elements(coalesce(g.j -> 'responses','[]'::jsonb)) as e(value)
)
select question_id,
       modulo,
       round(dificultad::numeric, 2)                        as dificultad_autoral,
       count(*)                                             as veces_servido,
       count(*) filter (where correcta)                     as aciertos,
       round(100.0 * count(*) filter (where correcta) / count(*), 0) as pct_acierto,
       mode() within group (order by marcada)
         filter (where not correcta)                        as distractor_favorito,
       max(era)                                             as correcta_era,
       enunciado
from r
group by question_id, modulo, dificultad, enunciado
having count(*) >= 2
order by pct_acierto asc, veces_servido desc;


-- ===========================================================================
-- 4. Déficit por módulo — dónde poner la próxima clase
-- ===========================================================================
-- Es el mismo cálculo que hace `universo.profile/deficits-from-responses` en el
-- cliente, pero agregado sobre el curso en vez de sobre una persona. Cuando
-- exista T-133 esta consulta queda de respaldo, no de fuente.
with grupo as (
  select t.id as test_id, t."email-user" as correo, t.test::jsonb as j,
         t.user_id, t.topic, t.created_at
  from public.tests t
  where t.topic = 'numeros'
    and t.created_at >= '2026-09-01' and t.created_at < '2026-10-01'
    and t.topic not like 'mq\_%' and t.topic not like 'electrotecnia%'
    and t.user_id <> '00000000-0000-0000-0000-000000000000'::uuid
),
r as (
  select g.correo,
         coalesce(e.value ->> 'module-slug', '(sin módulo)') as modulo,
         (e.value ->> 'correct?')::boolean as correcta
  from grupo g
  cross join lateral jsonb_array_elements(coalesce(g.j -> 'responses','[]'::jsonb)) as e(value)
)
select modulo,
       count(distinct correo)                                        as estudiantes,
       count(*)                                                      as respuestas,
       count(*) filter (where correcta)                              as aciertos,
       round(100.0 * count(*) filter (where correcta) / count(*), 0) as pct_acierto,
       repeat('█', greatest(0, (30 - 30 * count(*) filter (where correcta)
                                     / count(*))::int))              as deficit
from r
group by modulo
order by pct_acierto asc;


-- ===========================================================================
-- 5. Los escapes — «no sé», que es un dato y no un hueco
-- ===========================================================================
-- ADR-029 agregó el escape como **tercera categoría de respuesta**: el
-- estudiante declara que no entiende el enunciado o que no sabe resolverlo, en
-- vez de adivinar. Se captura desde el 2026-08-18 y **nunca se ha mirado**.
--
-- Un ítem con muchos `enunciado` es un problema de redacción, no de contenido:
-- se arregla escribiendo mejor, no enseñando más.
with grupo as (
  select t.id as test_id, t."email-user" as correo, t.test::jsonb as j,
         t.user_id, t.topic, t.created_at
  from public.tests t
  where t.topic = 'numeros'
    and t.created_at >= '2026-09-01' and t.created_at < '2026-10-01'
    and t.topic not like 'mq\_%' and t.topic not like 'electrotecnia%'
    and t.user_id <> '00000000-0000-0000-0000-000000000000'::uuid
),
r as (
  select g.correo,
         e.value ->> 'escape'       as tipo,
         e.value ->> 'question-id'  as question_id,
         e.value ->> 'module-slug'  as modulo,
         left(e.value ->> 'question-text', 80) as enunciado
  from grupo g
  cross join lateral jsonb_array_elements(coalesce(g.j -> 'responses','[]'::jsonb)) as e(value)
  where e.value ? 'escape'
)
select tipo, count(*) as veces, count(distinct correo) as estudiantes
from r group by tipo order by veces desc;

-- Y en qué ítems concretos se rindieron:
with grupo as (
  select t.id as test_id, t."email-user" as correo, t.test::jsonb as j,
         t.user_id, t.topic, t.created_at
  from public.tests t
  where t.topic = 'numeros'
    and t.created_at >= '2026-09-01' and t.created_at < '2026-10-01'
    and t.topic not like 'mq\_%' and t.topic not like 'electrotecnia%'
    and t.user_id <> '00000000-0000-0000-0000-000000000000'::uuid
)
select e.value ->> 'question-id'  as question_id,
       e.value ->> 'escape'       as tipo,
       e.value ->> 'module-slug'  as modulo,
       count(*)                   as veces,
       left(max(e.value ->> 'question-text'), 90) as enunciado
from grupo g
cross join lateral jsonb_array_elements(coalesce(g.j -> 'responses','[]'::jsonb)) as e(value)
where e.value ? 'escape'
group by 1, 2, 3
order by veces desc;


-- ===========================================================================
-- 6. La distribución de θ del curso — para armar grupos por banda
-- ===========================================================================
-- Es lo que se proyecta en la sala: no una nota, sino dónde está cada uno en la
-- escala y cuánta dispersión hay. Una desviación grande dentro de un mismo
-- curso es el argumento entero del producto: **un curso no es un nivel**.
--
-- Las bandas replican `universo.profile/theta-band`. Si alguna vez cambian los
-- cortes en el código, esta consulta queda mintiendo: la fuente de verdad es
-- `src/universo/profile.cljs`, no este archivo.
with grupo as (
  select t."email-user" as correo, t.theta, t.created_at,
         t.user_id, t.topic
  from public.tests t
  where t.topic = 'numeros'
    and t.created_at >= '2026-09-01' and t.created_at < '2026-10-01'
    and t.topic not like 'mq\_%' and t.topic not like 'electrotecnia%'
    and t.user_id <> '00000000-0000-0000-0000-000000000000'::uuid
),
ultimo as (
  select distinct on (correo) correo, theta
  from grupo
  where theta is not null
  order by correo, created_at desc
)
select case
         when theta >= 2.0 then '4 · avanzado   (θ ≥ 2,0)'
         when theta >= 1.0 then '3 · intermedio (1,0 … 2,0)'
         when theta >= 0.0 then '2 · básico     (0 … 1,0)'
         else                   '1 · inicial    (θ < 0)'
       end                                       as banda,
       count(*)                                  as estudiantes,
       round(min(theta)::numeric, 2)             as min,
       round(max(theta)::numeric, 2)             as max,
       repeat('█', count(*)::int)                as histograma
from ultimo
group by 1
order by 1;


-- ===========================================================================
-- Qué hacer con esto
-- ===========================================================================
-- 1. Pega el resultado de la consulta 2 en `sessions/SESSION-042.md`.
-- 2. Llévalo impreso o proyectado al curso ([[BACKLOG]] T-131) y anota las tres
--    observaciones que pide T-90: cuántos de N terminaron, qué cara pone el
--    profesor, qué preguntan los estudiantes.
-- 3. Lo que NO se puede responder con este archivo —cuántos empezaron y no
--    terminaron— es T-134, y necesita migración.
