-- Reparación del eje de probabilidad: alinear la base con el temario M1
--
-- POR QUÉ EXISTE ESTA MIGRACIÓN. `055` y `056` se aplicaron el 2026-08-28 en su
-- versión original, antes de que el owner precisara dos reglas de contenido:
--
--   1. varianza y desviación estándar NO entran en el temario M1 de Admisión
--      2027, y el banco traía 12 ítems de esas medidas;
--   2. los cuartiles se calculan con la posición localizadora P = k·n/4
--      (convención DEMRE), y tres explicaciones enseñaban otro método.
--
-- `056` es idempotente por `(topic, question)`: reaplicarla inserta los 14 ítems
-- nuevos, pero **no toca** los 100 que ya entraron. Esta migración es ese delta.
--
-- ORDEN: `055` (versión nueva) → `056` (versión nueva) → `057` → **`058`**.
-- `055` crea `probabilidad/conteo` y corrige la banda de `probabilidad/posicion`;
-- `056` inserta los 14 ítems nuevos; `057` crea `questions.active` y hace que
-- `next_question` la respete; `058` arregla lo ya cargado.
--
-- SOBRE UNA BASE LIMPIA ESTA MIGRACIÓN NO HACE NADA: todos sus `update` quedan
-- en 0 filas si `055`/`056` nuevas se aplicaron desde cero. Es segura de correr
-- igual.
--
-- LO QUE **NO** HACE, A PROPÓSITO: repermutar alternativas. Al agregar dos ítems,
-- la rotación de claves del JSON movió las letras de 50 ítems ya cargados.
-- `tests` guarda la respuesta del estudiante **por letra**, así que repermutar en
-- la base cambiaría el significado del histórico. Se hizo al revés: el JSON se
-- fijó al orden que ya está aplicado (`contenido/items/probabilidad.json`), y
-- acá viajan solo los cambios de contenido reales.
--
-- ⚠️ Los 12 ítems fuera de temario se marcan `active = false`, NO se borran: el
-- histórico de `tests` puede referenciarlos (mismo criterio que T-122). Para que
-- eso signifique algo hace falta **`057`**, que crea la columna y hace que
-- `next_question` la respete — antes de `057` no existía ninguna forma de retirar
-- un ítem sin borrarlo. Por eso `057` es precondición dura de esta migración, y
-- la guarda de abajo lo verifica.

-- -----------------------------------------------------------------------------
-- 0. Guardas
-- -----------------------------------------------------------------------------
do $$
begin
  if not exists (select 1 from information_schema.columns
                  where table_schema = 'public' and table_name = 'questions'
                    and column_name = 'active') then
    raise exception 'Falta `questions.active`: aplicar primero 057_questions_active_y_next_question.sql';
  end if;
  if not exists (select 1 from public.modules where slug = 'probabilidad/conteo') then
    raise exception 'Falta `probabilidad/conteo`: aplicar primero la versión nueva de 055';
  end if;
end $$;

-- -----------------------------------------------------------------------------
-- 1. Ítems ya cargados que cambian de módulo, de dificultad o de explicación
-- -----------------------------------------------------------------------------
-- Los cinco de rango se mudan a `probabilidad/posicion`, que es donde vive la
-- dispersión que sí entra en M1. Los tres de cuartiles y percentiles pasan a
-- explicarse con la posición localizadora.

-- probabilidad/posicion · En los datos ordenados $2$, $4$, $6$, $8$, $10$, $12$, $14$, $16$, ¿cu
update public.questions set
  error_a = $it$Correcto. $P = \dfrac{1 \cdot 8}{4} = 2$ es entero, así que $Q_1$ es el promedio de los datos de las posiciones $2$ y $3$: $(4+6) \div 2 = 5$.$it$,
  error_b = $it$Ese es el dato de la posición $2$. Como $P$ dio entero, hay que promediarlo con el de la posición $3$.$it$,
  error_d = $it$Ese es el dato de la posición $4$, que sale de partir los $8$ datos por la mitad. La posición del primer cuartil es $\dfrac{1 \cdot 8}{4} = 2$.$it$
 where topic = $it$probabilidad$it$ and question = $it$En los datos ordenados $2$, $4$, $6$, $8$, $10$, $12$, $14$, $16$, ¿cuál es $Q_1$?$it$;

-- probabilidad/posicion · Con los mismos datos $2$, $4$, $6$, $8$, $10$, $12$, $14$, $16$, ¿cuál
update public.questions set
  error_a = $it$Ese es el dato de la posición $6$. Como $P$ dio entero, se promedia con el de la posición $7$.$it$,
  error_b = $it$Ese es el dato de la posición $7$, la otra mitad del promedio que falta hacer.$it$,
  error_d = $it$Correcto. $P = \dfrac{3 \cdot 8}{4} = 6$ es entero, así que $Q_3$ es el promedio de los datos de las posiciones $6$ y $7$: $(12+14) \div 2 = 13$.$it$
 where topic = $it$probabilidad$it$ and question = $it$Con los mismos datos $2$, $4$, $6$, $8$, $10$, $12$, $14$, $16$, ¿cuál es $Q_3$?$it$;

-- probabilidad/posicion · En una lista ordenada de $100$ notas, ¿qué lugar ocupa aproximadamente
update public.questions set
  error_d = $it$Correcto. Con $100$ datos la posición es $P = \dfrac{25 \cdot 100}{100} = 25$: el corte queda entre el dato $25$ y el $26$.$it$
 where topic = $it$probabilidad$it$ and question = $it$En una lista ordenada de $100$ notas, ¿qué lugar ocupa aproximadamente el percentil $25$?$it$;

-- probabilidad/posicion · El **rango** de un conjunto de datos es:
update public.questions set
  module_id = (select id from public.modules where slug = $it$probabilidad/posicion$it$),
  difficulty = -0.68,
  order_index = 180
 where topic = $it$probabilidad$it$ and question = $it$El **rango** de un conjunto de datos es:$it$;

-- probabilidad/posicion · ¿Cuál es el rango de los datos $4$, $9$, $2$ y $15$?
update public.questions set
  module_id = (select id from public.modules where slug = $it$probabilidad/posicion$it$),
  difficulty = -0.6,
  order_index = 190
 where topic = $it$probabilidad$it$ and question = $it$¿Cuál es el rango de los datos $4$, $9$, $2$ y $15$?$it$;

-- probabilidad/posicion · ¿Cuál de estos dos conjuntos tiene mayor dispersión: $A = \{5, 5, 5, 5
update public.questions set
  error_a = $it$Correcto. En $A$ el rango es $0$; en $B$ los datos van de $1$ a $9$.$it$,
  module_id = (select id from public.modules where slug = $it$probabilidad/posicion$it$),
  difficulty = 0.0,
  order_index = 220
 where topic = $it$probabilidad$it$ and question = $it$¿Cuál de estos dos conjuntos tiene mayor dispersión: $A = \{5, 5, 5, 5\}$ o $B = \{1, 4, 6, 9\}$?$it$;

-- probabilidad/posicion · El **rango** es especialmente sensible a:
update public.questions set
  error_b = $it$Correcto. Como solo usa el máximo y el mínimo, un único dato lejano lo dispara. El rango intercuartílico no tiene ese problema, porque deja fuera los extremos.$it$,
  module_id = (select id from public.modules where slug = $it$probabilidad/posicion$it$),
  difficulty = -0.1,
  order_index = 210
 where topic = $it$probabilidad$it$ and question = $it$El **rango** es especialmente sensible a:$it$;

-- probabilidad/posicion · Un conjunto de datos tiene rango $0$. ¿Qué se puede afirmar?
update public.questions set
  module_id = (select id from public.modules where slug = $it$probabilidad/posicion$it$),
  difficulty = -0.35,
  order_index = 200
 where topic = $it$probabilidad$it$ and question = $it$Un conjunto de datos tiene rango $0$. ¿Qué se puede afirmar?$it$;
-- -----------------------------------------------------------------------------
-- 2. Los 12 ítems de varianza y desviación estándar salen de circulación
-- -----------------------------------------------------------------------------
-- Después del paso 1, lo único que sigue apuntando a `probabilidad/dispersion`
-- son exactamente esos 12. Se marcan inactivos y se les deja el módulo que
-- heredó su contenido, para no dejarlos con `module_id` en null (T-51).

update public.questions
   set active = false,
       module_id = (select id from public.modules where slug = 'probabilidad/posicion')
 where topic = 'probabilidad'
   and module_id = (select id from public.modules where slug = 'probabilidad/dispersion');

-- -----------------------------------------------------------------------------
-- 3. El módulo `probabilidad/dispersion` se retira
-- -----------------------------------------------------------------------------
-- Ya no le apunta ningún ítem. Se borra para que la lista de módulos quede
-- idéntica a la que declara la versión nueva de `055`, y para que
-- `bands/product-modules` no reparta bandas hacia un módulo vacío.

delete from public.modules where slug = 'probabilidad/dispersion';

-- -----------------------------------------------------------------------------
-- 4. Catálogo de ideas erróneas
-- -----------------------------------------------------------------------------
-- Las dos que sobreviven cambian de módulo junto con el rango. `056` las inserta
-- con `on conflict (slug) do nothing`, así que reaplicarla no las habría movido.

update public.misconceptions
   set module_id = (select id from public.modules where slug = 'probabilidad/posicion')
 where slug in ('dispersion/rango-mal-calculado', 'dispersion/confunde-nivel-con-dispersion');

update public.misconceptions
   set name = 'Confunde el nivel del grupo con su dispersión',
       description = 'Usar cuando deduce el nivel del grupo de cuánto se dispersa, o al revés: mismo promedio no implica misma dispersión.'
 where slug = 'dispersion/confunde-nivel-con-dispersion';

-- Las tres de varianza/desviación (`dispersion/desviacion-sin-raiz`,
-- `dispersion/dispersion-cambia-al-sumar-constante`, `dispersion/desviacion-negativa`)
-- se dejan en el catálogo A PROPÓSITO: son las que explican los 12 ítems
-- inactivos, y borrarlas pondría en null sus `misconception_*_id` (la FK es
-- `on delete set null`), o sea perdería el porqué de cada distractor. Quedan
-- huérfanas respecto del banco activo, y así se ven en el panel.

-- -----------------------------------------------------------------------------
-- Verificación (correr después de aplicar 055, 056, 057 y 058)
-- -----------------------------------------------------------------------------
--   -- 102 activos y 12 inactivos:
--   select active, count(*) from public.questions
--    where topic = 'probabilidad' group by active;
--
--   -- Ningún ítem activo menciona varianza ni desviación estándar:
--   select count(*) from public.questions
--    where topic = 'probabilidad' and active
--      and (question ilike '%varianza%' or question ilike '%desviaci%'
--           or option_a ilike '%varianza%' or option_a ilike '%desviaci%'
--           or option_b ilike '%varianza%' or option_b ilike '%desviaci%'
--           or option_c ilike '%varianza%' or option_c ilike '%desviaci%'
--           or option_d ilike '%varianza%' or option_d ilike '%desviaci%');
--   -- 0
--
--   -- Los seis módulos del eje, sin `dispersion` y con `conteo`:
--   select m.slug, m.order_index, m.band_min, m.band_max,
--          count(q.id) filter (where q.active) as activos
--     from public.modules m
--     left join public.questions q on q.module_id = m.id
--    where m.track = 'probabilidad' group by 1,2,3,4 order by m.order_index;
--   -- datos 17 · tendencia-central 17 · posicion 24 · conteo 12 · azar 16 · reglas 16
--
--   -- Ningún ítem del eje sin módulo:
--   select count(*) from public.questions
--    where topic = 'probabilidad' and module_id is null;   -- 0
--
-- Reversión: no la hay automática, y a propósito. Para volver atrás hay que
-- reaplicar la versión original de `055`/`056` desde el commit `6dc4762` y poner
-- `active = true` en los 12 ítems. Nada se borró salvo el módulo vacío.
