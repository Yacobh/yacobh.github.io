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
-- **El umbral es el que es porque el reintento es la remediación** (decisión del
-- owner, 2026-09-20): *«si un estudiante no pasa un test lo puede volver a
-- repetir, esa es la idea»*. No quedarse corto es lo que dispara volver a
-- estudiar el módulo, y el profesor está en el aula para acompañarlo.
--
-- El mecanismo existe y está verificado en el código, no supuesto:
--   · `electronica_notacion` no tiene prerrequisito ⇒ **siempre** se puede
--     volver a rendir;
--   · `access/best-theta-by-topic` toma el **máximo** histórico ⇒ una mejora
--     queda, y un intento peor no borra al mejor;
--   · `:test/retake` («Rendir de nuevo», desde el tablero) ya está construido.
--
-- ⚠️ **PERO UN REINTENTO SIRVE CASI LOS MISMOS ÍTEMS, Y ESO ES ARITMÉTICA.**
-- `next_question` excluye los ítems ya respondidos **dentro del test en curso**
-- (`answered-ids` sale de `[:test :questions]`), **no** los de intentos
-- anteriores. Con un banco de **12** ítems y `max_items = 8`, dos intentos
-- comparten como mínimo `8 + 8 − 12 = ` **4 ítems**, y en la práctica más,
-- porque los dos arrancan en el mismo `initial_theta` y el primer ítem servido
-- es siempre el mismo.
--
-- Y el estudiante **vio la explicación correcta** de cada ítem al responderlo
-- (capa 0), así que el segundo intento mide en parte memoria y no dominio.
--
-- ✅ **Resuelto el 2026-09-20 (T-164): los cinco bancos pasaron de 12 a 16
-- ítems**, que es exactamente `2 × max_items`. Con eso `8 + 8 − 16 = 0`: **un
-- reintento puede no repetir ni un solo ítem**. Sigue sin estar garantizado —la
-- selección es por cercanía a θ y los dos intentos arrancan en el mismo
-- `initial_theta`, así que el primer ítem tiende a repetirse— pero deja de ser
-- una imposibilidad aritmética. El arreglo completo es que `next_question`
-- excluya lo respondido en intentos anteriores, y va con T-149 (R-47).
--
-- **Si aun así apareciera el caso de R-44** —un alumno clavado en el clamp de
-- −3,00 habiendo trabajado, que es lo que se midió con dos de doce— la
-- corrección es cambiar dos números de la tabla de abajo y reaplicar (idempotente
-- por `topic`): bajar de `-2.4` a `-2.7` en las dos filas que cuelgan de
-- `electronica_notacion`. Ojo con la diferencia: si el alumno **no sabe**, el
-- umbral está haciendo su trabajo; si el motor **no lo pudo medir**, no.
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
-- **17**. Medido sobre `test_configs`: los activos pasan de **18 a 23**.
--
-- ✅ **Decidido por el owner el 2026-09-20: que los vean.** Es la misma decisión
-- que D-66/ADR-035 tomó para `electrotecnia`, por la misma razón —el
-- destinatario es un alumno y no un admin— y ahora para un curso entero. El
-- arreglo de fondo sigue siendo **T-129** (visibilidad por usuario), que esto
-- vuelve más urgente y no menos.
--
-- Apagarlo, si alguna vez hace falta, es un `update` de una línea:
--   update public.test_configs set active = false where topic like 'electronica\_%';

-- -----------------------------------------------------------------------------
-- 1. Guarda: no se crea una config sin banco detrás
-- -----------------------------------------------------------------------------
-- Copia de la guarda de `065`, con el piso adaptado. **12 y no 20**: `065`
-- protegía dos bancos que cubren doce módulos; acá cada banco es **un módulo de
-- 1,2 logits**, y la regla de cobertura es ≥6 ítems por cada 1,0 logit, o sea
-- ~8. Pero el piso **no** sale de la cobertura sino del reintento.
--
-- ⭐ **16 = `2 × max_items`, y es el número que hace que un reintento pueda ser
-- enteramente nuevo.** Con 12 no alcanzaba, y eso es aritmética: dos intentos de
-- 8 sobre un banco de 12 comparten al menos `8 + 8 − 12 = 4` ítems. Como el
-- reintento es **el mecanismo de remediación del track** (D-73), un banco por
-- debajo de `2 × max_items` hace que el umbral se abra por memoria. Ver R-47.
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
    having count(q.id) < 16
  loop
    raise exception
      'Guarda: el banco «%» tiene % ítems activos y el mínimo es 16. '
      'Una config sin banco deja al estudiante sin preguntas a mitad del test. '
      '¿Faltan aplicar 072..076?',
      falta.topic, falta.n;
  end loop;

  raise notice 'Guardas OK: 5 módulos y los cinco bancos con 16 ítems o más.';
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
