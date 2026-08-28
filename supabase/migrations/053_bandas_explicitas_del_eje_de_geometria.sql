-- Bandas explícitas para los siete módulos del eje de geometría.
--
-- Tercer eje con el mismo criterio de `049` (números) y `051` (álgebra),
-- aprobado por el owner el 2026-08-28: con **un diagnóstico por eje**, cada eje
-- reparte sus módulos a lo largo de todo `[-3, 3]`, porque «difícil» tiene que
-- significar «difícil dentro de este eje».
--
-- Sin esto, `bands/default-bands` reparte los 18 módulos del producto juntos y
-- deja el eje de geometría entero **por encima de θ = 0,26**: un estudiante que
-- todavía no llega ahí no encontraría ningún ítem lo bastante fácil, que es el
-- mismo defecto que en números apareció por el otro extremo.
--
-- El orden es el curricular que declara `002` (`order_index` 210…270): conceptos
-- básicos, ángulos, triángulos, circunferencia, áreas, volúmenes y Pitágoras.
-- Las bandas **se solapan a propósito**.
--
-- ⚠️ **Precondición de `054`.**
--
-- ⚠️ Sigue siendo **hipótesis autoral**, no medición (R-17, Q-05). La validez
-- solo puede venir de calibrar con respuestas reales (G-2).

update public.modules set band_min = -3.0, band_max = -1.8 where slug = 'geometria/basica';
update public.modules set band_min = -2.6, band_max = -1.3 where slug = 'geometria/angulos';
update public.modules set band_min = -2.1, band_max = -0.7 where slug = 'geometria/triangulos';
update public.modules set band_min = -1.5, band_max =  0.0 where slug = 'geometria/circulo';
update public.modules set band_min = -0.8, band_max =  0.8 where slug = 'geometria/areas';
update public.modules set band_min =  0.0, band_max =  1.7 where slug = 'geometria/volumenes';
update public.modules set band_min =  0.8, band_max =  3.0 where slug = 'geometria/pitagoras';

-- -----------------------------------------------------------------------------
-- Verificación
-- -----------------------------------------------------------------------------
--   select slug, band_min, band_max from public.modules
--    where track = 'geometria' order by order_index;
--   -- siete filas con banda, de -3.0 a 3.0, solapándose
--
-- Reversión:
--   update public.modules set band_min = null, band_max = null
--    where track = 'geometria';
