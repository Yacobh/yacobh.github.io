-- Bandas explícitas para los seis módulos del eje de números.
--
-- Aprobado por el owner el 2026-08-28 (T-118). Puramente aditiva: escribe
-- `band_min`/`band_max` en seis filas de `modules`. No crea ni borra nada.
--
-- ── Por qué hace falta ──────────────────────────────────────────────────────
-- `universo.bands/default-bands` reparte los centros de banda de **los 18
-- módulos del producto** a lo largo de [-2.4, 2.4] en orden curricular. Con 18
-- módulos eso da un paso de 0,28 logits, y el resultado medido es que **el eje
-- de números entero cabe en [-2,85, -0,54]**.
--
-- Eso es correcto para UN diagnóstico que recorra los cuatro ejes, donde
-- «difícil» significa «más adelante en la progresión». Es incorrecto para la
-- cadena por eje que se adoptó —números primero, y con él como prerequisito
-- álgebra, geometría y probabilidad—, porque un estudiante que rinde números y
-- llega arriba se queda sin ítems que servir.
--
-- **No es hipotético.** El 2026-08-28 el owner rindió el diagnóstico de
-- `enteros` (banda derivada [-2,57, -1,67]): paró en **8 preguntas** por
-- `:exhausted` con θ = 1,29, o sea 1,83 logits sobre el techo de su banda. El
-- motor no falló; no había nada que servir.
--
-- ── Qué afirma este reparto ─────────────────────────────────────────────────
-- Que **dentro del eje de números** hay contenido fácil y contenido difícil, y
-- que el eje completo cubre la escala. «Difícil» pasa a significar «difícil en
-- números», que es lo que el estudiante efectivamente rinde.
--
-- Las bandas **se solapan a propósito**: dentro de un mismo contenido hay ítems
-- fáciles y difíciles, y bandas disjuntas afirmarían que el ítem más difícil de
-- enteros es más fácil que el más trivial de fracciones, que es falso.
--
-- ⚠️ **La consecuencia que hay que aceptar:** con cada eje cubriendo [-3, 3], el
-- θ de números y el de geometría **dejan de ser comparables entre sí**. No es
-- una pérdida real —la escala común entre ejes siempre fue una hipótesis
-- editorial y nunca una medición (ver el docstring de `universo.bands`)— y las
-- cohortes se arman con el θ de un solo eje, que sí es consistente. Lo que deja
-- de poder afirmarse es «este estudiante está en nivel 2 en general».
--
-- ⚠️ Sigue siendo una **hipótesis autoral**, igual que `questions.difficulty`
-- (R-17, Q-05). Lo que gana el banco es coherencia, no validez psicométrica. La
-- validez solo puede venir de calibrar con respuestas reales (G-2), y cuando eso
-- ocurra estas bandas son la hipótesis **contra la que se contrasta**.

update public.modules set band_min = -3.0, band_max = -1.6 where slug = 'aritmetica/numeros';
update public.modules set band_min = -2.4, band_max = -1.0 where slug = 'aritmetica/enteros';
update public.modules set band_min = -1.8, band_max = -0.4 where slug = 'aritmetica/fracciones';
update public.modules set band_min = -1.0, band_max =  0.6 where slug = 'aritmetica/potencias';
update public.modules set band_min = -0.2, band_max =  1.6 where slug = 'aritmetica/proporciones';
update public.modules set band_min =  0.6, band_max =  3.0 where slug = 'aritmetica/porcentajes';

-- -----------------------------------------------------------------------------
-- Verificación
-- -----------------------------------------------------------------------------
--   select slug, band_min, band_max
--     from public.modules
--    where track = 'aritmetica'
--    order by order_index;
--   -- las seis filas con banda, de -3.0 a 3.0, solapándose
--
--   -- Ningún módulo de otro eje quedó tocado (siguen con banda derivada):
--   select count(*) from public.modules
--    where track <> 'aritmetica' and band_min is not null;
--   -- 0 filas, salvo que alguien haya fijado una banda a mano antes
--
-- En el panel, estas bandas aparecen con origen «explícita» y no «derivada»,
-- que es la distinción que `universo.bands/band-for` mantiene a propósito.
--
-- Reversión (vuelve a la banda derivada del orden curricular):
--   update public.modules set band_min = null, band_max = null
--    where track = 'aritmetica';
