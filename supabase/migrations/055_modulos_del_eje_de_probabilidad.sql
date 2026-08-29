-- Módulos del cuarto eje: probabilidad y estadística.
--
-- Cierra T-119. La migración `046` amplió el check de `track` para admitir
-- `probabilidad`, pero **nadie creó los módulos**: el cuarto eje del temario
-- DEMRE tenía cero módulos y cero ítems, y sin módulos `module_id` queda en null
-- y el plan de estudio no puede recomendar nada para ese eje.
--
-- La lista de contenidos NO se infirió del código: es decisión de contenido del
-- owner, aprobada el 2026-08-28 sobre el temario PAES M1 (§6 de `CLAUDE.md`:
-- si un dato falta, no se inventa).
--
-- Las bandas van explícitas y desde el nacimiento, por la misma razón que
-- `049`, `051` y `053`: con **un diagnóstico por eje**, cada eje reparte sus
-- módulos a lo largo de todo `[-3, 3]`, porque «difícil» tiene que significar
-- «difícil dentro de este eje». Acá no hay que corregir bandas derivadas después
-- porque los módulos todavía no existen — se crean ya repartidos.
--
-- El `order_index` sigue la numeración por eje de `002`: aritmética 10…60,
-- álgebra 110…150, geometría 210…270, y este eje **310…360**.
-- Las bandas **se solapan a propósito**.
--
-- ⚠️ **Varianza y desviación estándar NO entran en el temario M1 de Admisión
-- 2027** (owner, 2026-08-28). Por eso el módulo 340 es de **conteo** y no de
-- medidas de dispersión: lo que queda de dispersión en M1 —el rango y el rango
-- intercuartílico— vive en `probabilidad/posicion`, junto a los cuartiles y el
-- diagrama de cajón que lo hacen visible.
--
-- ⚠️ **Precondición de `056`.**
--
-- ⚠️⚠️ **ORDEN DE APLICACIÓN: `051` y `053` van ANTES que esta.**
--
-- Crear estos seis módulos cambia las bandas **derivadas** de todos los módulos
-- que todavía no tengan banda explícita, porque `bands/default-bands` reparte los
-- centros entre **todos** los módulos del producto: pasar de 18 a 24 achica el
-- paso de 0,28 a 0,21 logits y corre hacia abajo a los 18 anteriores. Medido:
--
--   módulo                18 módulos          24 módulos
--   algebra/expresiones   [-1,16 · -0,26]  →  [-1,60 · -0,70]
--   geometria/basica      [ 0,26 ·  1,16]  →  [-0,55 ·  0,35]
--   geometria/pitagoras   [ 1,95 ·  2,85]  →  [ 0,70 ·  1,60]
--
-- Números ya no se ve afectado (`049` le puso bandas explícitas y esas mandan),
-- pero álgebra y geometría sí, mientras `051` y `053` sigan sin aplicar: el eje
-- de geometría entero terminaría bajo θ = 1,6. Aplicando `051` y `053` primero,
-- los 18 módulos quedan con banda explícita y esta migración no mueve a nadie.
--
-- ⚠️ Las bandas siguen siendo **hipótesis autoral**, no medición (R-17, Q-05).
-- La validez solo puede venir de calibrar con respuestas reales (G-2).

insert into public.modules (slug, title, track, order_index, historical_blurb, band_min, band_max)
values
  ('probabilidad/datos', 'Tablas, gráficos y frecuencias', 'probabilidad', 310,
   'Contar y ordenar lo observado es el primer paso de toda estadística: de los registros de cosechas a la tabla de frecuencias.',
   -3.0, -1.6),
  ('probabilidad/tendencia-central', 'Media, mediana y moda', 'probabilidad', 320,
   'Resumir muchos datos en un solo número: el promedio nació de la astronomía, la mediana de la necesidad de resistir a los valores extremos.',
   -2.4, -1.0),
  ('probabilidad/posicion', 'Cuartiles, percentiles, diagrama de cajón y rango', 'probabilidad', 330,
   'Galton y Pearson midieron poblaciones enteras por posición relativa; el diagrama de cajón de Tukey (1970) hizo visible esa idea.',
   -1.6, 0.0),
  ('probabilidad/conteo', 'Principio multiplicativo y diagramas de árbol', 'probabilidad', 340,
   'Contar sin enumerar es el paso que hace posible el cálculo de probabilidades: sin él, cada problema exigiría escribir todos los casos.',
   -0.8, 0.8),
  ('probabilidad/azar', 'Probabilidad clásica y regla de Laplace', 'probabilidad', 350,
   'La correspondencia Pascal–Fermat (1654) sobre un juego de dados fundó el cálculo de probabilidades.',
   0.0, 1.8),
  ('probabilidad/reglas', 'Unión, intersección e independencia', 'probabilidad', 360,
   'Kolmogórov axiomatizó en 1933 lo que los jugadores usaban hace siglos: unión, intersección y condicionamiento.',
   1.2, 3.0)
on conflict (slug) do update
  set title            = excluded.title,
      track            = excluded.track,
      order_index      = excluded.order_index,
      historical_blurb = excluded.historical_blurb,
      band_min         = excluded.band_min,
      band_max         = excluded.band_max;

-- -----------------------------------------------------------------------------
-- Verificación
-- -----------------------------------------------------------------------------
--   select slug, order_index, band_min, band_max from public.modules
--    where track = 'probabilidad' order by order_index;
--   -- seis filas, de -3.0 a 3.0, con bandas que se solapan
--
--   -- El eje deja de estar vacío para `bands/product-modules`:
--   select track, count(*) from public.modules group by track order by track;
--
-- Reversión: delete from public.modules where track = 'probabilidad';
--            (seguro solo mientras ningún ítem los referencie; si `056` ya está
--             aplicada, borrar primero los ítems de topic 'probabilidad')
