-- Bandas explícitas para los cinco módulos del eje de álgebra.
--
-- Mismo criterio que `049` hizo con números, aprobado por el owner el
-- 2026-08-28: con **un diagnóstico por eje**, cada eje reparte sus módulos a lo
-- largo de todo `[-3, 3]`, porque «difícil» tiene que significar «difícil dentro
-- de este eje», que es lo que el estudiante efectivamente rinde.
--
-- Sin esto, `bands/default-bands` reparte los 18 módulos del producto juntos y
-- el eje de álgebra queda comprimido en `[-1,16, +0,87]`: un estudiante fuerte
-- se queda sin ítems, que es el defecto que `049` corrigió para números después
-- de que el diagnóstico de `enteros` parara en 8 preguntas por `:exhausted`.
--
-- Las bandas **se solapan a propósito**: dentro de un mismo contenido hay ítems
-- fáciles y difíciles, y bandas disjuntas afirmarían que el ejercicio más
-- difícil de ecuaciones es más fácil que el más trivial de sistemas.
--
-- ⚠️ **Precondición de `052`**, igual que `049` lo era de `050`.
--
-- ⚠️ Sigue siendo una **hipótesis autoral**, no una medición (R-17, Q-05). Lo
-- que gana el banco es coherencia; la validez solo puede venir de calibrar con
-- respuestas reales (G-2), y estas bandas son la hipótesis a contrastar.
--
-- ⚠️ **Consecuencia ya aceptada en `049`:** con cada eje cubriendo la escala
-- completa, el θ de álgebra no es comparable con el de números ni con el de
-- geometría. Las cohortes se arman con el θ de un solo eje.

update public.modules set band_min = -3.0, band_max = -1.5 where slug = 'algebra/expresiones';
update public.modules set band_min = -2.2, band_max = -0.6 where slug = 'algebra/ecuaciones';
update public.modules set band_min = -1.2, band_max =  0.6 where slug = 'algebra/sistemas';
update public.modules set band_min = -0.4, band_max =  1.6 where slug = 'algebra/polinomios';
update public.modules set band_min =  0.6, band_max =  3.0 where slug = 'algebra/funciones';

-- -----------------------------------------------------------------------------
-- Verificación
-- -----------------------------------------------------------------------------
--   select slug, band_min, band_max from public.modules
--    where track = 'algebra' order by order_index;
--   -- cinco filas con banda, de -3.0 a 3.0, solapándose
--
-- Reversión (vuelve a la banda derivada del orden curricular):
--   update public.modules set band_min = null, band_max = null
--    where track = 'algebra';
