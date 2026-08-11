-- EXPERIMENTO · Configuración de los 15 bancos de Mecánica Cuántica.
--
-- ⚠ APLICAR ÚLTIMA, después de 033-039. Es la migración que **enciende** el
-- experimento, y la única con una salvaguarda que hay que entender antes de
-- tocarla.
--
-- ═══════════════════════════════════════════════════════════════════════════
-- LA SALVAGUARDA: `active = false` en las 15 filas
-- ═══════════════════════════════════════════════════════════════════════════
-- La policy `test_configs_select` de 020 es:
--
--     using (active = true or public.is_admin())
--
-- Con `active = false`, estos 15 bancos **no existen** para ningún estudiante
-- de PAES: no aparecen en el selector de evaluaciones ni en ninguna consulta
-- que haga el cliente. Solo los ve `public.is_admin()`, que es exactamente la
-- cuenta del autor, que es quien va a rendirlos.
--
-- **Si alguna vez se pone `active = true` en alguna de estas filas, un
-- estudiante de PAES M1 va a ver "Mecánica Cuántica" en su selector.** No hay
-- otra barrera: `questions` no tiene columna `published` y `next_question`
-- (024) es `security definer`, así que sirve cualquier topic que se le pida.
-- Es un riesgo aceptado y documentado (ver ADR-018 y RISKS R-17), no un
-- descuido.
--
-- ═══════════════════════════════════════════════════════════════════════════
-- Los parámetros y por qué
-- ═══════════════════════════════════════════════════════════════════════════
--
-- **`max_items` es siempre menor que el banco**, con al menos 2 ítems de holgura.
-- Motivo concreto: `next_question` (024) elige por cercanía a θ dentro de una
-- ventana de dificultad. Si el test puede consumir el banco entero, los últimos
-- ítems disponibles quedan lejos de θ, la ventana no los alcanza y el RPC
-- devuelve vacío. Con holgura, la selección adaptativa sigue teniendo de dónde
-- elegir hasta el final. Un banco del mismo tamaño que el test, además, no es
-- un diagnóstico adaptativo: es un cuestionario fijo con pasos extra.
--
-- **`min_items = 4`** en todos. Por debajo de eso el error estándar de θ no baja
-- lo suficiente como para que la estimación signifique algo.
--
-- **`se_threshold`**: 0,35 (el valor global del proyecto) salvo en
-- `mq_momento_angular`, que baja a 0,30. Es el único banco lo bastante grande
-- (15 ítems) como para sostener una parada más exigente, y es el tema que el
-- profesor marcó como de máxima prioridad: ahí conviene medir más fino aunque
-- cueste más preguntas.
--
-- **`min_response_seconds = 3`**, contra el 2 de PAES (ver 032). NO es una
-- calibración: es un criterio, y conviene decirlo. La calibración de 032 salió
-- de 195 respuestas reales del histórico PAES; acá no hay ni una respuesta
-- todavía. El 3 sale de que un ítem de este banco no se puede leer, entender y
-- decidir en menos de eso. En la práctica casi no interviene: el umbral efectivo
-- es `max(min_response_seconds, largo_del_enunciado / 20)`, y estos enunciados
-- con LaTeX rondan los 200-400 caracteres, o sea 10-20 s por la regla
-- proporcional. El piso solo actúa en los pocos ítems cortos.
--
-- **`max_minutes = null`** (sin límite). Estudiar no es rendir: cortar por
-- tiempo agrega una variable que acá no aporta nada.
--
-- **`min_theta = null` en todos.** Exigir un θ mínimo para desbloquear sería
-- inventar un umbral sobre una escala de dificultad que todavía no está
-- calibrada -- los `difficulty` de 035-038 son una apuesta inicial, no una
-- medición. Un prerequisito sin `min_theta` solo exige **haber rendido** el
-- banco anterior (ADR-013), que es lo que se quiere: ordenar el estudio, no
-- poner un examen de admisión.
--
-- ═══════════════════════════════════════════════════════════════════════════
-- La cadena de prerequisitos, y por qué `mq_momento_angular` NO tiene
-- ═══════════════════════════════════════════════════════════════════════════
-- La progresión natural del curso pondría momento angular después de orígenes,
-- formalismo, postulados e incertidumbre. **Se decidió lo contrario a propósito:
-- `mq_momento_angular` es un punto de entrada libre.** Es el tema del examen y
-- el que cubren los apuntes de origen; obligar a rendir cuatro bancos antes de
-- llegar a él convertiría una herramienta de estudio en una carrera de
-- obstáculos. El objetivo acá es aprobar un examen concreto, no recorrer el
-- temario en orden.
--
-- Los prerequisitos que sí quedan son los que evitan estudiar algo sin tener la
-- herramienta que ese algo usa:
--
--     (libres) origenes · formalismo · postulados · incertidumbre · schrodinger
--     (libre)  momento_angular  ←── entrada directa al tema del examen
--       schrodinger → pozos, oscilador
--       momento_angular → armonicos_esfericos, espin, suma_momentos
--         armonicos_esfericos → hidrogeno → perturbaciones
--         espin → identicas, interpretacion
--
-- Se insertan primero las 15 filas sin prerequisito y **después** se hace el
-- UPDATE: la auto-FK `prerequisite_topic → topic` no tiene `on update cascade`
-- y exige que el padre exista, así que hacerlo en dos pasos vuelve la migración
-- independiente del orden del `values` (lección de 029).

-- -----------------------------------------------------------------------------
-- 1. Las 15 configuraciones, sin prerequisitos todavía
-- -----------------------------------------------------------------------------
insert into public.test_configs
  (topic, display_name, min_items, max_items, se_threshold,
   min_response_seconds, max_minutes, active)
values
  ('mq_origenes',            'MC · Orígenes de la teoría cuántica',      4,  4, 0.35, 3, null, false),
  ('mq_formalismo',          'MC · Formalismo y notación de Dirac',      4,  6, 0.35, 3, null, false),
  ('mq_postulados',          'MC · Postulados y medida',                 4,  6, 0.35, 3, null, false),
  ('mq_incertidumbre',       'MC · Conmutadores e incertidumbre',        4,  6, 0.35, 3, null, false),
  ('mq_schrodinger',         'MC · Ecuación de Schrödinger',             4,  4, 0.35, 3, null, false),
  ('mq_pozos',               'MC · Pozos, barreras y efecto túnel',      4,  6, 0.35, 3, null, false),
  ('mq_oscilador',           'MC · Oscilador armónico',                  4,  6, 0.35, 3, null, false),
  ('mq_momento_angular',     'MC · Momento angular ★',                   4, 12, 0.30, 3, null, false),
  ('mq_armonicos_esfericos', 'MC · Armónicos esféricos',                 4,  6, 0.35, 3, null, false),
  ('mq_espin',               'MC · Espín y matrices de Pauli',           4,  8, 0.35, 3, null, false),
  ('mq_suma_momentos',       'MC · Suma de momentos angulares',          4,  8, 0.35, 3, null, false),
  ('mq_hidrogeno',           'MC · Átomo de hidrógeno',                  4,  6, 0.35, 3, null, false),
  ('mq_perturbaciones',      'MC · Perturbaciones y variacional',        4,  6, 0.35, 3, null, false),
  ('mq_identicas',           'MC · Partículas idénticas',                4,  4, 0.35, 3, null, false),
  ('mq_interpretacion',      'MC · Medida, EPR y Bell',                  4,  4, 0.35, 3, null, false)
on conflict (topic) do update
  set display_name         = excluded.display_name,
      min_items            = excluded.min_items,
      max_items            = excluded.max_items,
      se_threshold         = excluded.se_threshold,
      min_response_seconds = excluded.min_response_seconds,
      max_minutes          = excluded.max_minutes,
      active               = excluded.active,
      updated_at           = now();

-- -----------------------------------------------------------------------------
-- 2. La cadena de prerequisitos, ahora que los 15 padres existen
-- -----------------------------------------------------------------------------
update public.test_configs t
set prerequisite_topic = v.prereq, updated_at = now()
from (values
  ('mq_pozos',               'mq_schrodinger'),
  ('mq_oscilador',           'mq_schrodinger'),
  ('mq_armonicos_esfericos', 'mq_momento_angular'),
  ('mq_espin',               'mq_momento_angular'),
  ('mq_suma_momentos',       'mq_momento_angular'),
  ('mq_hidrogeno',           'mq_armonicos_esfericos'),
  ('mq_perturbaciones',      'mq_hidrogeno'),
  ('mq_identicas',           'mq_espin'),
  ('mq_interpretacion',      'mq_espin')
) as v(topic, prereq)
where t.topic = v.topic;

-- =============================================================================
-- BATERÍA DE CONTROL DEL EXPERIMENTO
-- =============================================================================
-- Correr entera después de aplicar 033-040. Cada consulta trae al lado el
-- resultado esperado; cualquier desviación es un problema real, no ruido.
--
-- ── 1. Nada de esto es visible para un estudiante ───────────────────────────
--   select count(*) from public.test_configs
--    where topic like 'mq\_%' and active;                              -- 0
--   select count(*) from public.resources r
--     join public.modules m on m.id = r.module_id
--    where m.track = 'cuantica' and r.published;                       -- 0
--
-- ── 2. Nada de esto tocó el contenido PAES ──────────────────────────────────
--   select count(*) from public.questions where topic not like 'mq\_%';  -- 387
--   select count(*) from public.modules  where track <> 'cuantica';      -- 20
--   select count(*) from public.misconceptions where slug not like 'mq/%';-- 0
--   select count(*) from public.test_configs where topic not like 'mq\_%';
--     -- el número que hubiera antes de aplicar esto: no debe cambiar
--
-- ── 3. Integridad del contenido nuevo ───────────────────────────────────────
--   select count(*) from public.modules where track = 'cuantica';        -- 15
--   select count(*) from public.misconceptions where slug like 'mq/%';   -- 77
--   select count(*) from public.questions where topic like 'mq\_%';      -- 123
--   select count(*) from public.resources r join public.modules m
--     on m.id = r.module_id where m.track = 'cuantica';                  -- 32
--
--   -- Ningún ítem sin módulo (delataría un slug mal escrito en el VALUES):
--   select id, topic from public.questions
--    where topic like 'mq\_%' and module_id is null;                    -- 0 filas
--
--   -- Ninguna misconception sin módulo:
--   select slug from public.misconceptions
--    where slug like 'mq/%' and module_id is null;                      -- 0 filas
--
--   -- La alternativa CORRECTA nunca lleva misconception:
--   select id, topic, correct_option from public.questions
--    where topic like 'mq\_%'
--      and ((correct_option='A' and misconception_a_id is not null)
--        or (correct_option='B' and misconception_b_id is not null)
--        or (correct_option='C' and misconception_c_id is not null)
--        or (correct_option='D' and misconception_d_id is not null));   -- 0 filas
--
--   -- correct_option siempre en A..D:
--   select distinct correct_option from public.questions
--    where topic like 'mq\_%';                                          -- A,B,C,D
--
-- ── 4. El banco alcanza para la configuración ───────────────────────────────
--   -- ESTA ES LA CONSULTA QUE HAY QUE MIRAR SI UN TEST "SE QUEDA SIN
--   -- PREGUNTAS": max_items debe ser estrictamente menor que el banco.
--   select c.topic, c.max_items, count(q.id) as banco,
--          count(q.id) - c.max_items as holgura
--     from public.test_configs c
--     left join public.questions q on q.topic = c.topic
--    where c.topic like 'mq\_%'
--    group by c.topic, c.max_items
--    order by holgura;                                    -- holgura >= 2 siempre
--
-- ── 5. La cadena de prerequisitos es un DAG sin huérfanos ───────────────────
--   select topic, prerequisite_topic from public.test_configs
--    where topic like 'mq\_%' order by prerequisite_topic nulls first, topic;
--   -- 6 sin prerequisito (origenes, formalismo, postulados, incertidumbre,
--   -- schrodinger, momento_angular) y 9 con uno. La FK garantiza que ningún
--   -- prerequisito apunte a un topic inexistente.
--
-- ── 6. Salud del catálogo de misconceptions (heurística de 027) ─────────────
--   select mc.slug, count(distinct q.id) as items
--     from public.misconceptions mc
--     left join public.questions q
--       on mc.id in (q.misconception_a_id, q.misconception_b_id,
--                    q.misconception_c_id, q.misconception_d_id)
--    where mc.slug like 'mq/%'
--    group by mc.slug having count(distinct q.id) <= 1 order by mc.slug;
--   -- Hoy devuelve 32 filas, y está documentado en la cabecera de 034: la
--   -- solución es agregar ítems al topic correspondiente, no borrar la
--   -- misconception. Si esta lista NO baja al crecer el banco, ahí sí hay que
--   -- revisar si esas entradas están de más.
--
-- =============================================================================
-- REVERSIÓN COMPLETA DEL EXPERIMENTO
-- =============================================================================
-- En este orden (respeta las FK). Deja la base exactamente como estaba:
--
--   delete from public.test_configs where topic like 'mq\_%';
--   delete from public.questions     where topic like 'mq\_%';
--   delete from public.misconceptions where slug like 'mq/%';
--   delete from public.modules       where track = 'cuantica';  -- cascade a resources
--   alter table public.modules drop constraint modules_track_check;
--   alter table public.modules add constraint modules_track_check
--     check (track in ('aritmetica', 'algebra', 'geometria'));
--
-- Nota: el `delete from test_configs` funciona en un solo statement porque
-- todos los prerequisitos de estos bancos son internos al propio conjunto y el
-- `on delete restrict` se evalúa al final del statement, no fila por fila.
-- Si diera error de FK, correr antes:
--   update public.test_configs set prerequisite_topic = null
--    where topic like 'mq\_%';
