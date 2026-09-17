# El mapa de la unidad: todos los lugares donde hay que poner información

> ## ⚠️ Re-verificá esta lista antes de usarla
>
> Es **L-22** hecha procedimiento: la memoria de este proyecto ya dijo «tres
> lugares» cuando eran cinco. Esta tabla envejece cada vez que alguien agrega una
> tabla o un `def`. Corré esto primero, desde la raíz del repo:
>
> ```bash
> # ¿Qué tablas participan de una unidad?
> grep -rln "module_id\|module_slug\|modules (slug)" supabase/migrations/ | sort
>
> # ¿Qué `def` del cliente enumera módulos, tracks o topics a mano?
> grep -rn "^(def \(module-slugs\|product-tracks\|explicit-topic->module-slug\|catch-all-topics\|track-order\)" src/
>
> # ¿Qué columnas de questions llegan al cliente? (fuente de verdad, no el schema)
> grep -n -A8 "question-select-cols" src/universo/db/crud.cljs
> ```
>
> **Si el código y esta tabla no coinciden, gana el código** y esta tabla se
> corrige en el mismo commit.
>
> Verificado por última vez: **2026-09-17**.

---

Todos los lugares de abajo **fallan en silencio**. Ninguno da error, ninguno
rompe el build, ninguno enciende un auditor. Ésa es la razón de que exista este
archivo.

## A. En la base de datos

### A1 · `modules` — la fila de la unidad

`001_mvp_schema.sql:9`, ampliada por `042` y `046`.

| columna | regla |
|---|---|
| `slug` | `not null unique`. Formato `track/nombre`, minúsculas, sin acentos: `aritmetica/enteros`. **Es la clave con la que todo lo demás la referencia.** |
| `title` | `not null`. Prosa, para el estudiante |
| `track` | `not null` + **CHECK enumerado** — ver A2 |
| `order_index` | `not null default 0`. Orden curricular. Dejá huecos de 10 en 10 |
| `band_min` / `band_max` | `numeric`, agregadas por `046`. **Obligatorias de hecho** — ver A3 |
| `historical_blurb` | Opcional. Contexto histórico (042) |

**Si no lo hacés:** no existe la unidad. Es el único lugar que sí es obvio.

### A2 · `modules_track_check` — la constraint del track

⚠️ **El lugar que más veces sorprende.** `001:14` creó
`check (track in ('aritmetica','algebra','geometria'))`. Cada track nuevo tuvo
que **dropear y recrear la constraint** (`033:62-69` lo hizo para `cuantica`).

```sql
do $$
declare c record;
begin
  for c in select conname from pg_constraint
            where conrelid = 'public.modules'::regclass
              and contype = 'c' and pg_get_constraintdef(oid) ilike '%track%'
  loop execute format('alter table public.modules drop constraint %I', c.conname); end loop;
end $$;

alter table public.modules
  add constraint modules_track_check
  check (track in ('aritmetica','algebra','geometria','cuantica','probabilidad','electrotecnia','<el nuevo>'));
```

⚠️ `001:129` tiene **una segunda copia** del mismo enum, en otra tabla. Buscala
antes de dar por cerrado el track:
`grep -n "track in (" supabase/migrations/*.sql`

**Si no lo hacés:** el `insert` de A1 falla con `23514 check constraint violation`.
Es el único de toda la lista que **sí** da error. Agradecelo.

### A3 · `band_min` / `band_max` — la banda explícita

`046:41`. **Obligatorias en la práctica**, aunque el esquema las deje nullable.

`bands/band-for` (`bands.cljs:108`) prefiere la explícita sobre la derivada y
marca `:origen`. Sin explícita, la unidad cae en `bands/default-bands`, que
reparte los centros de **todos** los módulos del producto entre `-2.4` y `+2.4`.

⚠️ **Crear una unidad sin banda mueve las bandas de todas las demás.** Medido: al
pasar de 18 a 24 módulos el paso bajó de 0,28 a 0,21 logits y
`geometria/pitagoras` se fue de `[1,95, 2,85]` a `[0,70, 1,60]`. Nadie lo tocó.

Regla vigente (T-118, aprobada 2026-08-28, migraciones `049`/`051`/`053`/`055`/`060`
**aplicadas**): **con diagnósticos por eje, cada eje reparte sus módulos a lo
largo de todo `[-3, 3]`**, con bandas que **se solapan a propósito**.

**Si no lo hacés:** la unidad recibe una banda inventada por el orden curricular,
y mueve las de todos los demás. En silencio.

### A4 · `module_prerequisites` — el camino

`045:40`. **Tabla creada, vacía, y hoy nadie la lee.**

| columna | regla |
|---|---|
| `module_id` / `prerequisite_module_id` | PK compuesta, FK a `modules` |
| `strength` | `'duro'` (bloquea, y es a donde manda un escape) o `'blando'` (línea fina en el mapa, el escape la ignora) |
| `rationale` | Por qué existe la arista. **Para el profesor.** Es lo que evita un grafo lleno de dependencias que nadie recuerda haber decidido |

El check `module_prerequisites_no_self` impide `A→A`, pero **no impide un ciclo
largo** (`A→B→A`): eso se valida en el cliente. `verificar_unidad.py` lo chequea.

**Si no lo hacés:** el «no sé resolverlo» del estudiante (ADR-029) no tiene
destino, y la unidad queda sin lugar en el camino. Es exactamente el estado de
hoy para las 26 unidades: **la tabla está vacía**.

### A5 · `misconceptions` — el catálogo de ideas erróneas

`027:49`.

| columna | regla |
|---|---|
| `slug` | `unique`, check `^[a-z0-9]+([-/][a-z0-9]+)*$`. Sin acentos, sin mayúsculas, sin espacios |
| `name` | `not null`, no vacío. Prosa **para el profesor y los reportes**, nunca para el estudiante |
| `description` | Criterio editorial: **cuándo usarla y cuándo no**. Es lo único que evita un catálogo de duplicados con nombres distintos |
| `module_id` | Opcional, pista de módulo |

Lo que el estudiante lee es `questions.error_*`, **nunca** el `name`.

**Si no lo hacés:** los distractores de la unidad no tienen a qué apuntar, y el
mapa de errores —que es el producto, no la nota— no dice nada de esta unidad.
Modo de fallo conocido: `064` dejó ítems **sin ninguna idea errónea, en silencio**
(ver T-127).

### A6 · `questions` — los ítems

⚠️ `questions` **preexiste al esquema versionado**: no hay `create table` del
cual leer sus columnas. La fuente de verdad es **`question-select-cols` en
`src/universo/db/crud.cljs:597`** (L-46: suponer lo contrario hizo fallar `047`
con `42703: column "explanation" does not exist`).

Contrato completo, reglas duras y el defecto que pagó cada una:
**`.claude/skills/banco-de-items/referencias/contrato-de-datos.md`**. Lo esencial:

- `module_id` se resuelve por `slug` con un `left join` en la migración.
  **Un slug mal escrito no da error: deja `module_id` en `null`.** La migración
  generada trae la consulta que lo detecta — corrigela.
- `difficulty` en logits, en `[-3, 3]`, misma escala que θ.
- Cobertura: **≥ 6 ítems por cada tramo de 1,0 logit** dentro de la banda.
  El motor sirve el ítem con `b` más cercano a θ en `[θ−1, θ+1]` y amplía a
  `[θ−2, θ+2]` antes de declarar agotado el banco.

**Si no lo hacés bien:** el test se agota. Pasó el 2026-08-28: `enteros` paró en
8 preguntas por `:exhausted` con θ = 1,29, el banco 1,83 logits más abajo.

### A7 · `resources` — el material

`001_mvp_schema.sql:88`.

| columna | regla |
|---|---|
| `module_id` | FK a `modules`, `on delete cascade` |
| `type` | CHECK: `'text'`, `'video_url'`, `'audio_url'`, `'pdf_url'`, `'exercise'` |
| `title` | `not null` |
| `body` / `media_url` | Contenido o enlace |
| `published` | **`not null default false`** — ⚠️ un recurso sin `published = true` **no lo ve nadie**, y la policy `resources_select_published` lo esconde sin avisar |
| `order_index` | Orden dentro del módulo |

**Si no lo hacés:** «Mi plan» devuelve `:kind :general` — la biblioteca completa
rotulada como «esto es todo lo que hay», que es justo lo que
`plan/resources-for-deficits` existe para no disfrazar de recomendación.

### A8 · `resource_misconceptions` — de la idea errónea al material

`045:94`. **Tabla creada, vacía, y hoy nadie la lee.** Muchos a muchos a
propósito. Columna `rank` = orden de preferencia; hoy es criterio del autor, y
está dicho.

**Si no lo hacés:** la capa 1 de «Mi plan» sigue siendo genérica **por
estructura**, no por falta de contenido — un módulo agrupa muchos recursos y
muchas ideas erróneas, y sin esta tabla no hay forma de ir del error concreto al
material concreto. Es T-54.

### A9 · `test_configs` — solo si la unidad es rendible

`020_test_configs.sql:17`. **Keyed por `topic`, no por módulo.** Si la unidad no
tiene su propio `topic`, no lleva fila: se rinde dentro del test de su eje.

| columna | regla |
|---|---|
| `topic` | PK. Debe existir en `questions.topic` o el test sale vacío |
| `display_name` | Lo que ve el estudiante en el selector |
| `min_items` / `max_items` | `> 0`, `max >= min`. Hoy 5 / 12 en los cuatro ejes |
| `se_threshold` | `> 0`. Hoy `0.35` y ⚠️ **inalcanzable**: con el motor v2 el piso del SE con 12 ítems es ≈0,73. **0 de 17 tests pararon por precisión** (T-111, R-38) |
| `prerequisite_topic` | FK a `test_configs(topic)`, `on delete restrict`. `null` = **es un diagnóstico, siempre abierto a todos** |
| `min_theta` | `between -3 and 3`, y solo si hay `prerequisite_topic`. ⚠️ **`NULL` en los cuatro ejes hoy**: basta *haber rendido* números, no haber alcanzado nada |
| `max_minutes` | Opcional |
| `active` | ⚠️ `test_configs_select` (020) solo admite `active = true` **o admin**. **No hay estado intermedio** — ver R-42 y ADR-035 |
| `initial_theta` | `048`. θ de arranque, −1.0 por defecto |

⚠️ **Un eslabón inactivo deja inalcanzable a todo lo que cuelga de él.** `059`
trae la consulta que lo verifica; correla.

⚠️ **`020` sembró una fila por cada topic que existía**, sin prerrequisito. Por
eso el selector muestra hoy ~14 bancos viejos como si fueran diagnósticos. Medido
el 2026-09-10: **16 de 40 tests cayeron ahí** (T-122, T-143, T-138).

**Si no lo hacés:** los ítems existen y **no llegan a nadie**. Medido: los cuatro
bancos nuevos tuvieron **414 ítems inalcanzables** hasta que `059` los creó
(T-125).

---

## B. En el cliente ClojureScript

> ⚠️ Los tres de abajo son `def` **escritos a mano**. El grafo de graphify **no
> indexa `.cljs`** (CLAUDE.md §13): no los vas a encontrar con `graphify query`.
> Se buscan con `grep` sobre `src/`.
>
> Y **todo cambio acá exige `npx shadow-cljs release app` + commit de
> `public/js/app.js`** (ADR-003), o no llega a producción.

### B1 · `universo.topics/module-slugs` — ⭐ **el que se olvidó**

`src/universo/topics.cljs:64`. Set literal de slugs. Hoy tiene **20**: aritmética
(7), álgebra (6), geometría (7). **No están los seis `probabilidad/*`** que creó
`055`, ni ninguno de electrotecnia.

`suffix-match` (`topics.cljs:~133`) resuelve `enteros → aritmetica/enteros`
**buscando dentro de este set**. Un slug que no esté acá es invisible para él.

**Si no lo hacés — la cadena completa, verificada:**

```
crud/question-select-cols (crud.cljs:597)
  trae module_id (uuid) pero NO module_slug
     ↓
profile/module-slug-for (profile.cljs:36-48)
  busca :module-slug → nil
  busca :module_slug → nil
  cae a topics/module-slug-for "<topic>"  → nil  (no está en el set)
     ↓
déficit = "unknown/<topic>"
     ↓
plan/resources-for-deficits (plan.cljs:43)
  cruza déficits con recursos POR SLUG → sin coincidencia
     ↓
{:kind :general}  — la biblioteca entera, rotulada «esto es todo lo que hay»
```

**El estudiante rinde, el sistema mide bien su θ, y «Mi plan» no puede
personalizarse.** Todo en verde. Estado actual de `probabilidad` (102 ítems) y
`electrotecnia` (116 ítems).

### B2 · `universo.topics/explicit-topic->module-slug`

`topics.cljs:81`. Solo para topics **cuyo nombre no coincide** con el sufijo de su
módulo (`numbers_v1 → aritmetica/numeros`). Si el topic se llama igual que el
sufijo, `suffix-match` lo resuelve solo y **no hay que agregar nada** — eso es lo
que evita que la tabla envejezca.

⚠️ El comentario del archivo lo dice y vale respetarlo: *«una entrada para un
topic que no existe es inofensiva; una entrada equivocada escribe un `module_id`
falso»*. Acá solo van equivalencias **ciertas por definición**.

Mirá también `catch-all-topics` (`topics.cljs:125`): `diagnostico` y `paes_m1` son
bancos mezclados y devuelven `nil` **a propósito** — `nil` es la respuesta honesta
y deja el hueco visible.

### B3 · `universo.bands/product-tracks` — solo si el track es del producto

`bands.cljs:54`. Hoy `#{"aritmetica" "algebra" "geometria" "probabilidad"}`.

⚠️ **Es el único `def` que nombra tracks, y agregar uno mueve las bandas
derivadas de los 26 módulos del producto.** `cuantica` está afuera a propósito:
medido, con los 35 módulos mezclados cada banda quedaba en 0,17 logits y 15 eran
de cuántica.

**La regla vigente (CLAUDE.md §4):** un track nuevo lleva **banda explícita en
todos sus módulos** y así entra **sin tocar este `def` y sin recompilar el
bundle**. Tocá `product-tracks` solo si el track pasa a ser parte de la
progresión PAES, y sabiendo que mueve a todos los demás.

Mirá de paso `track-order` (`bands.cljs:33`), que fija el orden curricular entre
tracks.

---

## C. En el repositorio

### C1 · `contenido/items/<topic>.json` — la fuente de verdad de los ítems

**El JSON manda, el `.sql` es un artefacto generado.** Un cambio hecho en el SQL
se pierde y deja de estar verificado. Se corrige el JSON, se vuelve a verificar y
se regenera.

```bash
python3 scripts/verificar_items.py contenido/items/<topic>.json
python3 scripts/generar_migracion_items.py contenido/items/<topic>.json
```

### C2 · `contenido/unidades/<slug>.json` — la unidad

Lo que crea esta skill. `plantilla-unidad.json` es el molde.

```bash
python3 scripts/verificar_unidad.py contenido/unidades/<slug>.json
```

### C3 · `supabase/SCHEMA.md` — la migración con su estado

Numerada tras la última de `supabase/migrations/`, con **✅ aplicada + fecha** o
**⏳ pendiente de aplicar**. Las migraciones se aplican **a mano** en el SQL
Editor: no hay `supabase db push` en el flujo.

### C4 · `supabase/CONTENT.md` — el contenido pedagógico

Si la unidad trae recursos o cambia la capa 0.

### C5 · `test/universo/*_test.cljs`

Toda función pura nueva o modificada necesita test. `clj -M:test` en **0 failures
/ 0 errors** antes de commitear.

⚠️ **L-59, y es la trampa específica de este mapa:** un fixture escrito **de
memoria** repite la suposición en vez de contradecirla. Si agregás un caso a
`topics_test.cljs`, leé el `def` real, no lo que creés que dice.

### C6 · `project-memory/` — CLAUDE.md §11

`CURRENT_STATUS` · `sessions/SESSION-XXX.md` · `BACKLOG` · `RISKS` si hay riesgo
nuevo · `DECISIONS` + `adr/ADR-XXX-*.md` si se decidió algo con consecuencias ·
`OPEN_QUESTIONS` con lo que no se pudo responder · `graphify update .`

---

## La tabla, para tachar

| # | Lugar | ¿Aplica? | Si falta, falla así |
|---|---|---|---|
| A1 | `modules` | siempre | no existe la unidad |
| A2 | `modules_track_check` | track nuevo | **error `23514`** (el único ruidoso) |
| A3 | `band_min`/`band_max` | **siempre** | banda inventada + mueve a todas las demás |
| A4 | `module_prerequisites` | siempre | el escape no tiene destino; sin camino |
| A5 | `misconceptions` | siempre | sin mapa de errores, en silencio |
| A6 | `questions` | siempre | test agotado (`:exhausted`) |
| A7 | `resources` | siempre | plan `:general`; `published=false` esconde |
| A8 | `resource_misconceptions` | siempre | plan genérico por estructura |
| A9 | `test_configs` | si es rendible | **ítems inalcanzables** |
| B1 | `topics/module-slugs` | **slug nuevo** | ⭐ `unknown/*`, plan sin personalizar |
| B2 | `explicit-topic->module-slug` | topic ≠ sufijo | ídem B1 |
| B3 | `bands/product-tracks` | track del producto | mueve las bandas de los 26 |
| C1 | `contenido/items/*.json` | si hay ítems | el SQL deja de ser reproducible |
| C2 | `contenido/unidades/*.json` | siempre | no hay qué verificar |
| C3 | `supabase/SCHEMA.md` | siempre | nadie sabe si está aplicada |
| C4 | `supabase/CONTENT.md` | si hay recursos | contenido sin registrar |
| C5 | tests + `release app` + `app.js` | si tocaste `.cljs` | **no llega a producción** |
| C6 | `project-memory/` | siempre | el próximo agente lo reinventa |
