# Métricas de una unidad

Cómo saber si una unidad está **completa** y si está **sana**, con consultas, no
a ojo. Es la misma cultura que los seis `audit_*.py` del repo: el color y el
tamaño se verifican con un script, no mirando.

> ⚠️ **Toda consulta del banco PAES excluye los tracks que no son el producto.**
> El conteo crudo de `questions` dejó de significar «el banco del producto»:
> ```sql
> where topic not like 'mq\_%' and topic not like 'electrotecnia%'
> ```

> ⚠️ **`difficulty` es `real` y `band_min`/`band_max` son `numeric`. Compararlos
> directamente miente.** Medido el 2026-09-17 contra un PostgreSQL 14.18: un ítem
> guardado con `difficulty = -2.7` en una banda que empieza en `-2.7` sale
> **fuera de banda**, porque el `float4` se promueve a un valor apenas menor.
> Las dos filas que devolvió la consulta eran falsos positivos.
>
> **Toda comparación entre las dos columnas lleva cast explícito:**
> ```sql
> q.difficulty::numeric(4,2) < m.band_min    -- no: q.difficulty < m.band_min
> ```
> No es cosmético: sin el cast, **todo ítem que caiga justo en un borde de banda
> aparece como defecto**, y los bordes son donde el reparto pone ítems a propósito.

> ⚠️ **Toda consulta sobre respuestas reales excluye la depuración.** `067` agregó
> `tests.origin`: **70 de 345 filas (20 %) eran corridas del owner**, concentradas
> justo en los ítems más editados. Y `origin = 'student'` es **necesario y no
> suficiente** (T-145): quedan dentro cuentas de prueba. La lista de exclusión va
> **escrita y versionada** en `supabase/queries/`, no recordada de memoria (L-59).

---

## 1. Métricas de completitud — antes de aplicar

Se responden con **una consulta cada una** y la respuesta correcta es siempre
cero filas. Son el equivalente SQL de la tabla del mapa.

### M1 · Ningún módulo sin banda explícita

```sql
select slug, track, order_index, band_min, band_max
  from public.modules
 where (band_min is null or band_max is null)
   and track <> 'cuantica'        -- ← ver el aviso de abajo
 order by track, order_index;
```
**Esperado: 0 filas.** Un módulo sin banda depende del reparto derivado, y ese
reparto se mueve cada vez que alguien crea otro módulo.

> ⚠️ **Sin el `track <> 'cuantica'` esta consulta miente, y se comprobó corriéndola
> contra producción el 2026-09-18: devolvía 15 filas** y parecía contradecir a
> `CURRENT_STATUS`. **Las 15 eran todas de `cuantica`**, que está fuera de
> `bands/product-tracks` a propósito (ADR-018) y por eso **no recibe banda
> derivada ni la necesita**. Los 26 módulos del producto y los 12 de
> electrotecnia sí tienen banda explícita, o sea que la memoria estaba bien y la
> consulta estaba mal. Es el mismo descuido que la nota de arriba sobre excluir
> los tracks ajenos, ahora del lado de `modules` en vez de `questions`.

### M2 · Ninguna banda inválida

```sql
select slug, band_min, band_max
  from public.modules
 where band_min is not null
   and (band_min < -3 or band_max > 3 or band_min >= band_max);
-- (M2 compara numeric con numeric: acá no hace falta cast.)
```
**Esperado: 0 filas.** θ vive en `[-3, 3]`.

### M3 · Cobertura de ítems dentro de la banda

La que decide si el test se agota. Por módulo y por tramo de 1,0 logit:

```sql
with tramos as (
  select m.slug, m.band_min, m.band_max,
         generate_series(
           floor(m.band_min)::int,
           ceil(m.band_max)::int - 1
         ) as tramo
    from public.modules m
   where m.band_min is not null
)
select t.slug, t.tramo as desde, t.tramo + 1 as hasta,
       count(q.id) as items
  from tramos t
  left join public.questions q
    on q.module_id = (select id from public.modules where slug = t.slug)
   and coalesce(q.active, true)
   and q.difficulty::numeric(4,2) >= t.tramo
   and q.difficulty::numeric(4,2) <  t.tramo + 1   -- cast: ver el aviso de arriba
 group by 1,2,3
having count(q.id) < 6
 order by items, t.slug;
```
**Esperado: 0 filas.** Un tramo con menos de 6 ítems es donde el diagnóstico se
va a cortar. El motor sirve el ítem con `b` más cercano a θ en `[θ−1, θ+1]` y
amplía a `[θ−2, θ+2]` antes de declarar agotado el banco.

### M4 · Ningún ítem huérfano de módulo

```sql
select topic, count(*) as sin_modulo
  from public.questions
 where module_id is null and coalesce(active, true)
 group by topic order by 2 desc;
```
Un `module_slug` mal escrito en la migración **deja `module_id` en null en
silencio** — es el modo de fallo de T-119 y **no hay guarda que lo impida**.

### M5 · Ningún distractor sin idea errónea

```sql
select q.topic, count(*) as sin_misconception
  from public.questions q
 where coalesce(q.active, true)
   and (q.misconception_a_id is null and q.misconception_b_id is null
    and q.misconception_c_id is null and q.misconception_d_id is null)
 group by 1 order by 2 desc;
```
⚠️ Es el modo de fallo de `064`: ítems sin ninguna idea errónea, **en silencio**.
Sin esto el mapa de errores —que es el producto— no dice nada de esa unidad.

### M6 · Ninguna idea errónea huérfana de recurso

```sql
select mc.slug, mc.name
  from public.misconceptions mc
  left join public.resource_misconceptions rm on rm.misconception_id = mc.id
 where rm.misconception_id is null
 order by mc.slug;
```
⚠️ **Hoy devuelve el catálogo entero**: `resource_misconceptions` está vacía
(T-54). Es la razón estructural de que la capa 1 de «Mi plan» sea genérica.

### M7 · Ningún módulo sin recurso publicado

```sql
select m.slug, count(r.id) filter (where r.published) as publicados
  from public.modules m
  left join public.resources r on r.module_id = m.id
 group by 1 having count(r.id) filter (where r.published) = 0
 order by 1;
```
⚠️ Ojo con `published`: es `false` por default y la policy lo esconde sin avisar.

### M8 · Ningún ítem inalcanzable

```sql
select q.topic,
       count(*) filter (where coalesce(q.active, true)) as items_activos,
       c.topic is not null as tiene_config,
       c.active as config_activa
  from public.questions q
  left join public.test_configs c on c.topic = q.topic
 group by q.topic, c.topic, c.active
 order by 2 desc;
```
Medido: los cuatro bancos nuevos tuvieron **414 ítems inalcanzables** hasta que
`059` les creó su fila (T-125). Un banco sin `test_configs` **no existe** para el
estudiante.

### M9 · Ningún eslabón muerto en la cadena

```sql
select c.topic, c.active, c.prerequisite_topic,
       p.active as prerrequisito_activo, c.min_theta
  from public.test_configs c
  left join public.test_configs p on p.topic = c.prerequisite_topic
 where c.active
   and (p.topic is not null and not p.active);
```
**Esperado: 0 filas.** Un prerrequisito inactivo deja inalcanzable a todo lo que
cuelga de él.

### M10 · Ningún banco duplicado en el selector

```sql
select c.topic, c.display_name, c.active, c.prerequisite_topic,
       count(q.id) filter (where coalesce(q.active, true)) as items
  from public.test_configs c
  left join public.questions q on q.topic = c.topic
 where c.active
 group by 1,2,3,4
 order by items asc;
```
Revisá los de arriba: **un banco activo con pocos ítems y sin prerrequisito es un
diagnóstico falso** compitiendo con el bueno. Medido el 2026-09-10: `diagnostico`
(10), `ecuaciones_simples` (5) y `polinomios` (1) se llevaron **16 de 40 tests**,
mientras `geometria` y `algebra` recibieron **uno cada uno** (T-122, T-143).

### M11 · Ningún slug del cliente desactualizado — ⭐

**Es mitad SQL y mitad `grep`**, porque cruza la base con un `def` del cliente.
Con acceso a la base (ADR-040) se automatiza — guardá esto como script y corrélo:

```bash
set -a && . ./.env && set +a
psql "$SUPABASE_DB_URL_RO" -tAc "select slug from modules order by slug;" > /tmp/slugs.txt
python3 scripts/comparar_module_slugs.py /tmp/slugs.txt
```

**Si un slug está en `modules` y no en `module-slugs`**, sus déficits salen como
`unknown/<topic>` y «Mi plan» no puede personalizarse.

⚠️ **Medido contra producción el 2026-09-18: 53 módulos en la base, 20 en el
`def`, 33 faltando** — 6 de `probabilidad`, 12 de `electrotecnia`, 15 de
`cuantica`. Cerrado por **T-152**: entraron los 18 del producto; `cuantica` queda
afuera a propósito (ADR-018).

⚠️ **Esta métrica sobreestima el daño, y hay que decirlo al leerla.** Un slug
faltante **solo** importa si la respuesta llega sin `module-slug`, y
`events/test.cljs:35` lo copia de `next_question` para cada ítem. Medido: **0 %
de las respuestas del motor v1 lo traen y 100 % de las de v2**, o sea que desde
el 2026-08-28 `profile/module-slug-for` lo encuentra en el primer `or` y nunca
llega al fallback. Un faltante acá es **latente**, no activo. Antes de escribir
«N personas afectadas», medilo:

```sql
select engine_version,
       count(*) filter (where resp->>'module-slug' is not null) as con_slug,
       count(*) as respuestas
  from (select t.engine_version, jsonb_array_elements(t.test->'responses') as resp
          from tests_sin_identidad t where t.origin='student') r
 group by 1 order by 1;
```

⚠️ **Y agregar el slug no siempre es el arreglo.** `module-slugs` alimenta
`suffix-match`, que compara el **topic** con lo que va después de la `/`:
`probabilidad/datos` ↔ topic `probabilidad` **no** coincide, así que agregarlo no
resuelve nada. Si el topic es un **banco de eje que abarca varios módulos**, lo
correcto es `catch-all-topics` — `nil` como decisión escrita, en vez de
inventarle un módulo. Eso fue lo que realmente cerró T-152.

### M12 · Ningún módulo caído de la línea del tiempo

```sql
select track,
       count(*)                                          as modulos,
       count(*) filter (where historical_year is null)   as sin_year,
       count(*) filter (where historical_blurb is null
                           or btrim(historical_blurb) = '') as sin_blurb,
       count(*) filter (where historical_figure is null) as sin_figura
  from public.modules
 group by track
 order by sin_year desc, track;
```
**Esperado: `sin_year` = 0, o cada caso explicado.** `timeline/milestones`
descarta el módulo sin año y no avisa: ese número **es** cuánto de la línea del
tiempo está vacía. Un `sin_blurb` con año es peor todavía — hito en la línea con
la tarjeta en blanco.

La fila incoherente no puede existir (`modules_historical_era_coherente` la
rechaza con 23514), así que no hay métrica para eso: lo impide el esquema.

> ⚠️ **El resultado ya se puede anticipar desde el historial de migraciones, y
> es malo** (2026-09-18). `042` es la **única** migración del repo que menciona
> `historical_year` — verificado con
> `grep -ln "historical_year" supabase/migrations/*.sql` — y puebla
> **exactamente 20 slugs**: los 7 de `aritmetica`, 6 de `algebra` y 7 de
> `geometria`. Como ninguna migración posterior la toca:
>
> | módulos | año | en la línea |
> |---|---|---|
> | 20 PAES (`002`) | sí, los pone `042` | **sí** |
> | 15 `cuantica` (`033`) | no | no |
> | 6 `probabilidad` (`055`) | no | no |
> | 12 `electrotecnia` (`062`) | no | no |
>
> **33 de 53 módulos están fuera de la línea del tiempo**, y 6 de ellos son del
> producto. Lo más llamativo es cuántica: el propio preámbulo de `042` dice que
> existen *«20 módulos PAES **y 15 de cuántica** con contexto histórico
> escrito»* y después **no le da año a ninguno de los 15**. El blurb está
> escrito, pagado y sigue sin verse — que es literalmente el problema que `042`
> venía a resolver.
>
> Corré la consulta igual: confirma el conteo contra la base en vez de contra el
> `grep`, y es la línea base de la que falta.

---

## 2. Métricas de salud — después de que alguien la rinda

Éstas **necesitan respuestas reales** y son las que convierten una hipótesis
editorial en dato. Son el camino a **G-2**.

### S1 · ¿Cuántas respuestas lleva cada ítem?

```sql
-- Calibrar pide ~30 respuestas por ítem. Medí cuánto falta.
-- Requiere desanidar tests.test; ver supabase/queries/ para la forma exacta.
```
⚠️ **Hoy hay 0 ítems con 30 respuestas.** Ése es el estado real de G-2, y es la
razón por la que `difficulty` sigue siendo **hipótesis editorial, no medición**
(R-17). Ningún material de cara al cliente puede decir otra cosa.

### S2 · ¿Por qué paran los tests de esta unidad?

`:precision` / `:max-items` / `:exhausted` / `null` (abandono).

Línea base real del 2026-09-10 sobre 17 tests de `numeros`:
**15 por `max_items`, 2 por abandono, 0 por precisión.** Si tu unidad da
`:exhausted`, el banco tiene un hueco → volvé a M3.

⚠️ El abandono **por botón sí deja fila** (`parada = null`); lo invisible es solo
cerrar la pestaña (T-134).

### S3 · ¿La banda estimada es la correcta?

La métrica que más importa y la peor del proyecto: **en θ = 2,0 la banda correcta
es 37 %** — dos de cada tres estudiantes avanzados quedan en la banda equivocada,
y la banda decide el cupo, o sea con quién estudian (T-117).

Medido: el techo no es el estimador sino **12 ítems** (20 ítems → 70 %, 30 → 79 %).
Y **el lugar del corte pesa más que la cantidad**: con 3 bandas mal puestas,
`intermedio` sube a 85 % pero `basico` cae a 41 %.

### S4 · ¿Los distractores discriminan?

Un distractor que **nadie elige nunca** no está midiendo nada y ocupa el lugar de
uno que sí. Uno que elige **todo el mundo** puede ser un ítem mal escrito, no una
idea errónea — precedente: T-105 encontró 3 ítems sin ninguna alternativa correcta
y 7 con dos.

### S5 · ¿La `difficulty` editorial coincide con la observada?

Proporción de aciertos por ítem contra su `b` declarado. Un ítem marcado `-2,5`
que acierta el 30 % **no es fácil**. Es la señal más barata de que una hipótesis
editorial está mal, y **no necesita las 30 respuestas de S1**.

---

## 3. Lo que NO se puede medir todavía, y hay que decirlo

| Pregunta | Por qué no |
|---|---|
| ¿Los recursos sirven? | `resource_misconceptions.rank` es criterio del autor, no eficacia medida. Está dicho en `045` |
| ¿Cuánto mejora el estudiante? | Δθ es **G-4** y pide histórico de perfiles que nunca se sobrescriba, más un segundo intento |
| ¿Cuáles NO lo hicieron? | Un test abandonado cerrando la pestaña **no deja fila** (T-134) |
| ¿Esta fila es de un estudiante real? | `origin` separa depuración, no cuentas de prueba (T-145) |
| ¿El θ de números es comparable al de geometría? | **No, y es a propósito.** Con bandas por eje cada uno tiene su escala. Se puede decir «nivel 2 en números»; **no** «nivel 2 en general» |
