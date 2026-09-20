-- `test_configs` del track `electronica`: cinco tests de módulo, encadenados.
--
-- Es la migración que hace **rendible** el track. Hasta acá `071` creó el lugar
-- y `072`–`076` trajeron los 60 ítems, pero sin una fila en `test_configs` esos
-- ítems **no llegan a nadie**: es el defecto que T-125 midió, 414 ítems
-- inalcanzables durante meses porque sus cuatro bancos no tenían config.
--
-- ── UN TEST POR MÓDULO, NO UN TEST DE EJE ──────────────────────────────────
-- `test_configs.topic` es **primary key** y `next_question` filtra
-- `where q.topic = p_topic` **sin mirar `module_id`** (ADR-038 está aprobado y
-- **sin implementar**, T-149). O sea que un banco de eje —como los dos de
-- `electrotecnia`— no puede servir el test de un solo módulo: serviría los 116
-- ítems del track entero.
--
-- Por eso cada módulo de `electronica` tiene su propio `topic` en `questions`,
-- copiando lo que `040` hizo con `cuantica`. Y eso es justo lo que este curso
-- necesita: un alumno con fallas de base tiene que poder ver **qué** repasar, no
-- un θ global del track.
--
-- Cuando T-149 se implemente, este track migra sin dolor: sus `topic` ya son por
-- módulo, así que lo que cambiará es de dónde salen los ítems (`item_topic` +
-- `module_id`), no la identidad de los tests ni el historial de `tests.topic`.
--
-- ── ⭐ `initial_theta` EXPLÍCITO, QUE ES LO QUE `065` NO HIZO ────────────────
-- `065` dejó los dos bancos de `electrotecnia` con `initial_theta` en null, o
-- sea el **−1,0** por defecto de `048`. Para este curso eso sería un error caro,
-- y ADR-038 ya escribió la aritmética:
--
--   con `initial_theta = −1,0` y `|Δθ| ≤ 0,4` por ítem, llegar a −2,8 cuesta
--   **mínimo 5 ítems solo de viaje**. En un test de 8, **más de la mitad se
--   gasta en llegar al nivel del alumno** — y el costo lo paga justo el más
--   débil, que es todo este curso.
--
-- Es también la causa (b) de **R-44**, donde dos estudiantes reales quedaron
-- clavados en θ = −3,00: el *clamp* del estimador, no una medición.
--
-- Cada fila arranca en el **centro de la banda de su módulo** (`071`), así el
-- test no viaja y **los 8 ítems son medición**.
--
-- ── LA CADENA, Y POR QUÉ `capacitores` CUELGA DE LA RAÍZ ───────────────────
--
--     electronica_notacion      (sin prerrequisito)
--        ├── electronica_ohm
--        │      ├── electronica_potencia
--        │      └── electronica_kirchhoff
--        └── electronica_capacitores
--
-- `C = Q/V` no necesita la ley de Ohm para nada; lo que sí necesita —y mucho—
-- es saber qué es un µF y qué es un nF. Efecto práctico en un curso con fallas
-- de base: **un alumno trabado en Ohm igual puede avanzar en capacitores** en
-- vez de quedarse sin nada que rendir.
--
-- Tiene que decir **lo mismo** que `module_prerequisites` de `071`. Esa tabla es
-- el camino documentado (hoy no la lee ningún namespace); ésta es el mecanismo
-- que de verdad corre, porque `universo.access/unlocked-topics` la lee.
--
-- ── ⚠️ `min_theta`: SE EXIGE ALCANZAR EL CENTRO DE LA BANDA PREVIA ─────────
-- Decisión del owner del 2026-09-19, **en contra del default**: los cuatro ejes
-- del producto usan `min_theta = null` —basta *haber rendido*— y acá la cadena
-- exige alcanzar el centro de la banda del prerrequisito.
--
-- ⚠️ **Hay un riesgo medido que el owner todavía no vio cuando lo decidió, y
-- conviene mirarlo antes de aplicar esta migración.** El centro de
-- `notacion_cientifica` es **−2,4** y el estimador **clampea en −3,0**. **R-44**
-- midió que **dos de doce estudiantes reales** quedaron clavados en −3,00
-- exacto **habiendo trabajado** (uno rindió 12 ítems en 16,5 minutos). Un alumno
-- así **no alcanza −2,4 y no abre ningún otro módulo del track**. En un curso
-- correctivo eso es lo contrario de lo que se busca.
--
-- Lo que **sí** lo acota: `electronica_notacion` no tiene prerrequisito, así que
-- siempre puede volver a rendirse, y `access/best-theta-by-topic` toma el
-- **máximo** histórico. Nadie queda sin nada que hacer; queda con **una sola**
-- cosa que hacer.
--
-- **Si eso pasa, la corrección es cambiar dos números de la tabla de abajo** y
-- reaplicar (la migración es idempotente por `topic`): bajar de `-2.4` a `-2.7`
-- —el tercio inferior de la banda— en las dos filas que cuelgan de
-- `electronica_notacion`. Es la diferencia entre «no automatizó los prefijos» y
-- «el motor no lo pudo medir».
--
-- ── LA PARADA: 4 / 8, Y UN UMBRAL QUE NO SE VA A DISPARAR ─────────────────
-- `min_items = 4`, `max_items = 8`. Es el rango que ADR-038 propone para un test
-- de módulo, y más angosto que el 5/12 de `065` porque cada test cubre **un solo
-- módulo de 1,2 logits** y ya no tiene que viajar.
--
-- `se_threshold = 0.35` se deja por coherencia con los otros seis bancos, **y no
-- se va a disparar nunca**: con el motor v2 el piso del SE ronda 0,73 y **0 de
-- 17 tests reales pararon por precisión** (T-111, R-38, Q-42). La parada real va
-- a ser `max_items`. Se escribe sabiéndolo, no copiándolo: este curso es la
-- primera oportunidad de ver si un test que **no viaja** mueve ese piso, porque
-- es la primera vez que los 8 ítems son todos medición.
--
-- ── ⚠️ `active = true`: TODO ESTUDIANTE DE PAES VA A VER ESTOS CINCO BANCOS ──
-- La policy `test_configs_select` de `020` es `active = true or is_admin()`: o
-- lo ve todo el mundo autenticado, o solo los admin. **No hay estado
-- intermedio**, y ésa es exactamente la situación que ADR-035 documentó para
-- `electrotecnia`.
--
-- Hoy un estudiante de PAES ve **12 bancos** que no le sirven; con esto ve
-- **17**. Es **R-42**, y el destinatario de este track es un curso entero, así
-- que deja de ser un problema de higiene. **La alternativa está una línea más
-- abajo**: poner `false` y que los rinda solo el admin hasta que exista T-129
-- (visibilidad por usuario). Con `false`, los alumnos **no pueden rendirlo**.

-- -----------------------------------------------------------------------------
-- 1. Guarda: no se crea una config sin banco detrás
-- -----------------------------------------------------------------------------
-- Copia de la guarda de `065`, con el piso adaptado. **12 y no 20**: `065`
-- protegía dos bancos que cubren doce módulos; acá cada banco es **un módulo de
-- 1,2 logits**, y la regla de cobertura es ≥6 ítems por cada 1,0 logit, o sea
-- ~8. Con `max_items = 8`, 12 deja margen para que un reintento no sirva
-- exactamente los mismos ítems.
--
-- Es T-125 al revés: una config sin banco deja al estudiante **sin preguntas a
-- mitad del diagnóstico**, que es peor que no ofrecerle el test.
do $$
declare
  falta record;
  n_modulos integer;
begin
  select count(*) into n_modulos
    from public.modules where track = 'electronica';
  if n_modulos <> 5 then
    raise exception
      'Guarda: se esperaban 5 módulos de electronica y hay %. ¿Falta aplicar 071?',
      n_modulos;
  end if;

  for falta in
    select t.topic, count(q.id) as n
      from (values ('electronica_notacion'), ('electronica_ohm'),
                   ('electronica_potencia'), ('electronica_capacitores'),
                   ('electronica_kirchhoff')) as t(topic)
      left join public.questions q
             on q.topic = t.topic and coalesce(q.active, true)
     group by t.topic
    having count(q.id) < 12
  loop
    raise exception
      'Guarda: el banco «%» tiene % ítems activos y el mínimo es 12. '
      'Una config sin banco deja al estudiante sin preguntas a mitad del test. '
      '¿Faltan aplicar 072..076?',
      falta.topic, falta.n;
  end loop;

  raise notice 'Guardas OK: 5 módulos y los cinco bancos con 12 ítems o más.';
end
$$;

-- -----------------------------------------------------------------------------
-- 2. Las cinco configuraciones
-- -----------------------------------------------------------------------------
-- `initial_theta` = centro de la banda del módulo (071).
-- `min_theta`     = centro de la banda del PRERREQUISITO (ver la nota de arriba).
insert into public.test_configs
  (topic, display_name, min_items, max_items, se_threshold,
   min_response_seconds, max_minutes, initial_theta,
   prerequisite_topic, min_theta, active)
values
  ('electronica_notacion',
   'Electrónica · Notación científica y prefijos',
   4, 8, 0.35, 3, null, -2.4,
   null, null, true),

  ('electronica_ohm',
   'Electrónica · Ley de Ohm',
   4, 8, 0.35, 3, null, -2.2,
   'electronica_notacion', -2.4, true),

  ('electronica_capacitores',
   'Electrónica · Capacitancia y capacitores',
   4, 8, 0.35, 3, null, -1.6,
   'electronica_notacion', -2.4, true),

  ('electronica_potencia',
   'Electrónica · Potencia y energía',
   4, 8, 0.35, 3, null, -1.8,
   'electronica_ohm', -2.2, true),

  ('electronica_kirchhoff',
   'Electrónica · Leyes de Kirchhoff',
   4, 8, 0.35, 3, null, -1.2,
   'electronica_ohm', -2.2, true)

on conflict (topic) do update
  set display_name         = excluded.display_name,
      min_items            = excluded.min_items,
      max_items            = excluded.max_items,
      se_threshold         = excluded.se_threshold,
      min_response_seconds = excluded.min_response_seconds,
      max_minutes          = excluded.max_minutes,
      initial_theta        = excluded.initial_theta,
      prerequisite_topic   = excluded.prerequisite_topic,
      min_theta            = excluded.min_theta,
      active               = excluded.active;

-- -----------------------------------------------------------------------------
-- Verificación (correr a mano después de aplicar; no es parte de la migración)
-- -----------------------------------------------------------------------------
-- -- (a) Las cinco filas, con su cadena y sus umbrales.
-- select topic, prerequisite_topic, min_theta, initial_theta,
--        min_items, max_items, active
--   from public.test_configs
--  where topic like 'electronica\_%' order by initial_theta;
--   → esperado: 5 filas · una sola con prerequisite_topic nulo (la raíz)
--
-- -- (b) ⭐ Cada test arranca donde vive su contenido, no en el −1,0 por defecto.
-- select c.topic, c.initial_theta, m.band_min, m.band_max
--   from public.test_configs c
--   join public.modules m on m.slug = replace(
--        replace(replace(replace(replace(c.topic,
--          'electronica_notacion','electronica/notacion_cientifica'),
--          'electronica_ohm','electronica/ley_de_ohm'),
--          'electronica_potencia','electronica/potencia'),
--          'electronica_capacitores','electronica/capacitores'),
--          'electronica_kirchhoff','electronica/leyes_de_kirchhoff')
--  where c.topic like 'electronica\_%';
--   → esperado: initial_theta entre band_min y band_max en las cinco
--
-- -- (c) Los ítems ya son alcanzables (lo que T-125 midió al revés).
-- select q.topic, count(*) as items, min(q.difficulty), max(q.difficulty)
--   from public.questions q
--  where q.topic like 'electronica\_%' and coalesce(q.active, true)
--  group by 1 order by 1;
--   → esperado: 5 filas de 12 ítems cada una, dentro de la banda de su módulo
--
-- -- (d) ⚠️ Cuántos bancos ve ahora un estudiante de PAES (R-42).
-- select count(*) from public.test_configs where active;
--   → antes de esta migración: 18 · después: 23
--
-- -----------------------------------------------------------------------------
-- Reversión
-- -----------------------------------------------------------------------------
-- -- Apagar, que es reversible y conserva el historial de `tests`:
-- update public.test_configs set active = false where topic like 'electronica\_%';
--
-- -- O borrar las filas, si el track no va a existir:
-- delete from public.test_configs where topic like 'electronica\_%';
-- -- ⚠️ No borrar si algún alumno ya rindió: `tests.topic` referencia este valor
-- -- (es texto sin FK, 021) y `universo.access` lo usa para desbloquear.
