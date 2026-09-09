-- Configuración de los dos bancos del track `electrotecnia`.
--
-- ⚠ APLICAR ÚLTIMA, después de 062, 063 y 064. Es la migración que **publica**
-- el track, y la única de la cadena con una consecuencia visible para gente que
-- no pidió nada de esto.
--
-- ═══════════════════════════════════════════════════════════════════════════
-- LO QUE HAY QUE ENTENDER ANTES DE APLICARLA: `active = true`
-- ═══════════════════════════════════════════════════════════════════════════
-- La policy `test_configs_select` de 020 es:
--
--     using (active = true or public.is_admin())
--
-- No hay ningún mecanismo para mostrarle un banco a **un** estudiante. Con
-- `active = true`, los dos bancos de Electrotecnia aparecen en el selector de
-- evaluaciones de **todos** los usuarios, incluidos los que entraron a preparar
-- PAES M1 y nunca van a rendir electrotecnia.
--
-- Es una decisión explícita del owner (2026-09-09), no un descuido: el
-- destinatario del track es un alumno real que entra con su cuenta normal, y
-- apagarlo —como se hizo con `cuantica` en 040— lo dejaría sin poder rendirlo.
-- El costo aceptado es el ruido en el selector de los demás. Ver
-- adr/ADR-035-track-electrotecnia.md y project-memory/RISKS.
--
-- **Para apagarlo** (revierte solo la visibilidad, no borra nada):
--   update public.test_configs set active = false, updated_at = now()
--    where topic in ('electrotecnia', 'electrotecnia_ca');
--
-- ═══════════════════════════════════════════════════════════════════════════
-- Los parámetros y por qué
-- ═══════════════════════════════════════════════════════════════════════════
-- **5 / 12 / 0,35** son los mismos de 020 y 059. Cambiarlos es otra decisión
-- (T-111, T-117) y no corresponde tomarla acá, sobre un banco del que todavía
-- no hay una sola respuesta.
--
-- **`max_items` muy por debajo del banco.** `next_question` (024, reescrita en
-- 057) elige por cercanía a θ dentro de una ventana de dificultad; si el test
-- pudiera consumir el banco entero, los últimos ítems quedarían lejos de θ, la
-- ventana no los alcanzaría y el RPC devolvería vacío. Con 74 y 42 ítems
-- respectivamente contra `max_items = 12`, la holgura es enorme.
--
-- **`min_response_seconds = 3`**, contra el 2 de PAES (032). NO es una
-- calibración y conviene decirlo: la de 032 salió de 195 respuestas reales, y
-- acá no hay ninguna. El 3 es un criterio — un ítem de este banco no se lee, se
-- entiende y se decide en menos de eso. En la práctica casi no interviene: el
-- umbral efectivo es `max(min_response_seconds, largo_del_enunciado / 20)`.
--
-- **`max_minutes = null`.** Estudiar no es rendir.
--
-- **Umbrales de fluidez en su default (3 y 6, migración 041).** El precedente de
-- `mq_momento_angular` sugiere que 3 es alto para ítems que exigen una
-- derivación, pero 041 dejó escrito que bajarlos sin datos es exactamente el
-- error que esa migración documenta. Se revisa cuando haya respuestas.
--
-- **`prior_sd` y `guessing_c` en null**, o sea los defaults del cliente (048).
-- Un banco nuevo no es el lugar para estrenar parámetros del estimador.
--
-- ═══════════════════════════════════════════════════════════════════════════
-- El encadenamiento: `electrotecnia` → `electrotecnia_ca`
-- ═══════════════════════════════════════════════════════════════════════════
-- `electrotecnia` es el punto de entrada y no tiene prerrequisito: recorre el
-- curso completo, de la ley de Ohm al trifásico, y devuelve un perfil de todo el
-- temario en una sesión.
--
-- `electrotecnia_ca` tiene a `electrotecnia` como prerrequisito, **sin
-- `min_theta`**. O sea que exige *haber rendido* el general, no aprobarlo
-- (ADR-013). Exigir un θ mínimo sería inventar un umbral sobre una escala que
-- todavía no está calibrada: las `difficulty` de 063 y 064 son una hipótesis
-- autoral, no una medición.
--
-- Se insertan las dos filas y **después** se hace el UPDATE del prerrequisito:
-- la auto-FK `prerequisite_topic → topic` exige que el padre exista y no tiene
-- `on update cascade` (lección de 029 y de 040).

-- -----------------------------------------------------------------------------
-- 0. Guardas: no publicar lo que nadie puede rendir
-- -----------------------------------------------------------------------------
-- Es la lección literal de T-125: 414 ítems estuvieron aplicados y sin fila de
-- config, o sea inalcanzables. El defecto simétrico —una config sin banco— es
-- peor todavía: el estudiante ve la evaluación, entra, y el diagnóstico se queda
-- sin preguntas. Estas guardas hacen que la migración falle ruidosamente en vez
-- de dejar eso pasar en silencio.
do $$
declare
  n_modulos int;
  n_general int;
  n_ca      int;
begin
  select count(*) into n_modulos
    from public.modules where track = 'electrotecnia';
  if n_modulos < 12 then
    raise exception
      'Faltan los módulos del track: hay % y se esperan 12. Aplicar 062 antes que esta.',
      n_modulos;
  end if;

  select count(*) into n_general
    from public.questions where topic = 'electrotecnia' and coalesce(active, true);
  select count(*) into n_ca
    from public.questions where topic = 'electrotecnia_ca' and coalesce(active, true);

  -- El piso es `max_items` con holgura, no el tamaño nominal del banco: lo que
  -- se está protegiendo es que el test no se quede sin preguntas, no que las
  -- migraciones se hayan aplicado enteras.
  if n_general < 20 then
    raise exception
      'El banco `electrotecnia` tiene % ítems activos y max_items sera 12. Aplicar 063 antes que esta.',
      n_general;
  end if;
  if n_ca < 20 then
    raise exception
      'El banco `electrotecnia_ca` tiene % ítems activos y max_items sera 12. Aplicar 064 antes que esta.',
      n_ca;
  end if;

  raise notice 'Guardas OK: % módulos, % ítems en electrotecnia, % en electrotecnia_ca.',
    n_modulos, n_general, n_ca;
end
$$;

-- -----------------------------------------------------------------------------
-- 1. Las dos configuraciones, sin prerrequisito todavía
-- -----------------------------------------------------------------------------
-- `do nothing` y no `do update`: si alguna de las dos filas ya existe, alguien
-- la creó o la ajustó a mano desde el panel, y reaplicar esta migración no tiene
-- por qué pisar esa decisión. Es el mismo criterio de 059.
insert into public.test_configs
  (topic, display_name, min_items, max_items, se_threshold,
   min_response_seconds, max_minutes, active)
values
  ('electrotecnia',
   'Electrotecnia · Diagnóstico general',      5, 12, 0.35, 3, null, true),
  ('electrotecnia_ca',
   'Electrotecnia · Corriente alterna ★',      5, 12, 0.35, 3, null, true)
on conflict (topic) do nothing;

-- -----------------------------------------------------------------------------
-- 2. El prerrequisito, ahora que el padre existe
-- -----------------------------------------------------------------------------
update public.test_configs
   set prerequisite_topic = 'electrotecnia',
       updated_at = now()
 where topic = 'electrotecnia_ca'
   and prerequisite_topic is distinct from 'electrotecnia';

-- =============================================================================
-- VERIFICACIÓN
-- =============================================================================
-- ── 1. Las dos filas existen y están publicadas ─────────────────────────────
--   select topic, display_name, min_items, max_items, se_threshold,
--          min_response_seconds, prerequisite_topic, active
--     from public.test_configs
--    where topic like 'electrotecnia%' order by topic;
--   -- 2 filas · active = true en las dos · `electrotecnia_ca` con prerrequisito
--
-- ── 2. El banco alcanza para la configuración ───────────────────────────────
--   -- ESTA ES LA CONSULTA QUE HAY QUE MIRAR SI UN TEST «SE QUEDA SIN
--   -- PREGUNTAS»: max_items debe ser holgadamente menor que el banco activo.
--   select c.topic, c.max_items,
--          count(q.id) filter (where coalesce(q.active, true)) as banco_activo
--     from public.test_configs c
--     left join public.questions q on q.topic = c.topic
--    where c.topic like 'electrotecnia%'
--    group by c.topic, c.max_items order by c.topic;
--   -- electrotecnia 12 / 74 · electrotecnia_ca 12 / 42
--
-- ── 3. Ningún ítem quedó sin módulo ─────────────────────────────────────────
--   select topic, count(*) from public.questions
--    where topic like 'electrotecnia%' and module_id is null group by topic;
--   -- 0 filas. Una fila acá significa un `module_slug` mal escrito en el JSON,
--   -- y el `left join` lo dejó pasar en silencio (T-119).
--
-- ── 4. Ninguna idea errónea quedó sin resolver ──────────────────────────────
--   select count(*) from public.misconceptions where slug like 'et/%';
--   -- 60 (54 de 063 + 6 de 064)
--
--   -- Ítems con las cuatro ideas erróneas en null. Medido sobre la cadena
--   -- aplicada en orden: **1** en `electrotecnia` y **0** en `electrotecnia_ca`
--   -- (el único es un ítem donde los cuatro distractores son errores factuales
--   -- aislados, que 027 dice explícitamente que no hay que catalogar).
--   select topic, count(*) from public.questions
--    where topic like 'electrotecnia%'
--      and misconception_a_id is null and misconception_b_id is null
--      and misconception_c_id is null and misconception_d_id is null
--    group by topic;
--   -- Si en `electrotecnia_ca` salen los 42, 064 se aplicó antes que 063 y
--   -- todos los slugs reutilizados quedaron sin resolver.
--
-- ── 5. El contenido del producto no se movió ────────────────────────────────
--   select count(*) from public.questions where topic not like 'electrotecnia%';
--   -- el mismo número que antes de aplicar 063 y 064
--   select count(*) from public.test_configs where topic not like 'electrotecnia%';
--   -- el mismo número que antes de aplicar esta
--
-- ── 6. Prueba de humo del RPC en los dos bancos y en tres alturas de θ ──────
--   select * from public.next_question('electrotecnia',    -2.0, 0.5, 1.5, '{}');
--   select * from public.next_question('electrotecnia',     0.0, 0.5, 1.5, '{}');
--   select * from public.next_question('electrotecnia',     2.0, 0.5, 1.5, '{}');
--   select * from public.next_question('electrotecnia_ca',  0.0, 0.5, 1.5, '{}');
--   select * from public.next_question('electrotecnia_ca',  2.0, 0.5, 1.5, '{}');
--   -- las cinco devuelven fila, y el módulo que traen corresponde a esa altura
--   -- de la escala (magnitudes/kirchhoff abajo, trifásico arriba)
--
-- =============================================================================
-- REVERSIÓN COMPLETA DEL TRACK
-- =============================================================================
-- Apagar la visibilidad sin borrar nada (lo primero que hay que probar):
--   update public.test_configs set active = false, updated_at = now()
--    where topic like 'electrotecnia%';
--
-- Borrado completo, en este orden (respeta las FK):
--   update public.test_configs set prerequisite_topic = null
--    where topic like 'electrotecnia%';
--   delete from public.test_configs where topic like 'electrotecnia%';
--   delete from public.questions     where topic like 'electrotecnia%';
--   delete from public.misconceptions where slug like 'et/%';
--   delete from public.modules       where track = 'electrotecnia';  -- cascade a resources
--   -- y restaurar los dos checks como indica el pie de 062.
--
-- ⚠ `delete from public.questions` borra ítems que pueden estar referenciados
-- por `tests`: si alguien ya rindió el diagnóstico, ese delete falla o se lleva
-- histórico por delante. Con un test rendido, la reversión correcta es
-- `active = false` en `questions` y en `test_configs`, no el borrado.
