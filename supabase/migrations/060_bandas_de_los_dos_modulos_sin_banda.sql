-- Los dos módulos que quedaron sin banda explícita.
--
-- QUÉ CIERRA. `049`, `051`, `053` y `055` le dieron banda explícita a 24 de los
-- **26** módulos del producto. Los dos que faltaban son los que creó `031`
-- (D-37) para darles módulo canónico a dos topics sueltos:
--
--   · `aritmetica/operaciones_fundamentales` (`order_index` 15)
--   · `algebra/inecuaciones`                 (`order_index` 125)
--
-- Mientras no tengan banda explícita, `bands/band-for` les calcula una
-- **derivada**, y esa se recalcula sobre **todos** los módulos del producto: cada
-- vez que se agrega uno, estos dos se mueven solos. Ya pasó el 2026-08-28 con
-- `055`, que al sumar seis módulos corrió el paso de 0,28 a 0,19 logits.
--
-- DE DÓNDE SALEN ESTOS NÚMEROS. Del mismo criterio que las cuatro migraciones
-- anteriores: **el orden curricular es la hipótesis de dificultad**
-- (`bands/curricular-order`). Cada uno se interpola entre sus dos vecinos de eje:
--
--   aritmetica/numeros        10  [-3,0 · -1,6]
--   → operaciones_fundamentales 15  [-2,7 · -1,3]   ← interpolado
--   aritmetica/enteros        20  [-2,4 · -1,0]
--
--   algebra/ecuaciones       120  [-2,2 · -0,6]
--   → inecuaciones           125  [-1,7 ·  0,0]     ← interpolado
--   algebra/sistemas         130  [-1,2 ·  0,6]
--
-- El ancho es el de sus vecinos y las bandas **se solapan a propósito**, igual
-- que en todo el resto del reparto.
--
-- ⚠️ Sigue siendo **hipótesis autoral**, no medición (R-17, Q-05). La diferencia
-- con la banda derivada no es que sea más cierta: es que **deja de moverse sola**.
--
-- No es precondición de nada y no toca ítems: solo dos `update`.

update public.modules set band_min = -2.7, band_max = -1.3
 where slug = 'aritmetica/operaciones_fundamentales';

update public.modules set band_min = -1.7, band_max =  0.0
 where slug = 'algebra/inecuaciones';

-- -----------------------------------------------------------------------------
-- Verificación
-- -----------------------------------------------------------------------------
--   -- Los 26 módulos del producto con banda explícita, ninguno derivado:
--   select track,
--          count(*) filter (where band_min is not null) as con_banda,
--          count(*) as modulos
--     from public.modules
--    where track in ('aritmetica', 'algebra', 'geometria', 'probabilidad')
--    group by track order by track;
--   -- aritmetica 7 de 7 · algebra 6 de 6 · geometria 7 de 7 · probabilidad 6 de 6
--
--   -- Y que cada eje siga cubriendo la escala sin huecos:
--   select track, slug, order_index, band_min, band_max
--     from public.modules
--    where track in ('aritmetica', 'algebra')
--    order by track, order_index;
--
-- Reversión:
--   update public.modules set band_min = null, band_max = null
--    where slug in ('aritmetica/operaciones_fundamentales', 'algebra/inecuaciones');
--   (vuelve la banda derivada, con su inestabilidad)
