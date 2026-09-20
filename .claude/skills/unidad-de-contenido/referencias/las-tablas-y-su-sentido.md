# Qué significa cada tabla hoy, y cómo se relacionan

`mapa-de-la-unidad.md` dice **dónde** poner cada dato. Este archivo dice **qué
significa** y **por qué esa tabla y no otra**. Sin esto, dar de alta contenido es
tachar casillas; con esto, se entiende qué se está afirmando.

---

## 1. El modelo en un párrafo

El producto no da una nota: **nombra el error**. Para eso necesita afirmar cuatro
cosas distintas sobre un mismo contenido, y cada una vive en su tabla porque cada
una **se equivoca de manera distinta**:

| Afirmación | Tabla | Si está mal |
|---|---|---|
| «esto existe como contenido enseñable» | `modules` | no hay dónde colgar nada |
| «esto es más difícil que aquello» | `modules.band_min/max` + `questions.difficulty` | el test se agota o mide otra cosa |
| «esto hay que saberlo antes» | `module_prerequisites` | el estudiante queda sin camino |
| «así es como te equivocás» | `misconceptions` + `questions.error_*` | vuelve a ser una nota |
| «esto te lo arregla» | `resources` + `resource_misconceptions` | el plan es una biblioteca |

Y una quinta, aparte de las demás porque **no es contenido sino acceso**:

| «esto se puede rendir, y en qué orden» | `test_configs` | los ítems no llegan a nadie |

---

## 2. El diagrama de relaciones

```
                     ┌──────────────────────────────────────────┐
                     │  modules                                 │
                     │  slug · title · track · order_index      │
                     │  band_min · band_max   ← la escala       │
                     └───┬───────────┬──────────────┬───────────┘
                         │           │              │
     ┌───────────────────┘           │              └──────────────┐
     │ module_id                     │ module_id                   │ module_id
     ▼                               ▼                             ▼ (opcional)
┌──────────────────┐        ┌─────────────────┐          ┌──────────────────┐
│ questions        │        │ resources       │          │ misconceptions   │
│ topic ←──────┐   │        │ type · title    │          │ slug · name      │
│ difficulty   │   │        │ published       │          │ description      │
│ correct_opt  │   │        └────────┬────────┘          └────────┬─────────┘
│ error_a..d   │   │                 │                            │
│ misconcep_*_id──────────────────────────────────────────────────┘
└──────┬───────┘   │                 │  resource_misconceptions   │
       │           │                 └────────────┬───────────────┘
       │           │                              ▼   (VACÍA hoy)
       │           │
       │           │        ┌────────────────────────────────────┐
       │           └────────│ test_configs                       │
       │      topic = topic │ topic (PK) · prerequisite_topic    │
       │                    │ min_theta · min/max_items · active │
       │                    └──────────────────┬─────────────────┘
       │                                       │ deriva el acceso de
       ▼                                       ▼
┌──────────────────────────────────────────────────────────────────┐
│ tests   — el histórico. NO se reescribe: es evidencia (G-4)      │
│ user_id · topic · theta · test(jsonb) · origin · stop_reason     │
└──────────────────────────────────────────────────────────────────┘

        module_prerequisites : modules → modules  (VACÍA hoy)
        module_id · prerequisite_module_id · strength · rationale
```

**Leé el diagrama así:** `modules` es el centro y **todo cuelga de su `slug`**.
`test_configs` es el único que **no** cuelga de ahí — cuelga de `questions.topic`.
Esa es la junta floja del esquema, y la sección 4 la explica.

---

## 3. Qué significa cada tabla **hoy**, no en el diseño

Tres estados posibles, y conviene saber en cuál está cada una antes de escribirle:

- **🟢 Portante** — algo la lee y el producto cambia si la tocás.
- **🟡 Ambigua** — la lee algo, pero su semántica no es la que el nombre sugiere.
- **🔴 Vacía** — existe, está bien diseñada, y **nadie la lee todavía**.

### 🟢 `modules` — el contenido enseñable

La unidad de **enseñanza**, no de evaluación. Su `slug` es la clave de todo el
resto. `track` agrupa por eje.

**Lo que NO significa:** no es lo que el estudiante rinde (eso es `test_configs`)
ni lo que el motor usa para elegir ítems (eso es `questions.topic` + `difficulty`).
Hoy un módulo es **un casillero para agrupar y para mostrar el plan**.

### 🟢 `modules.band_min` / `band_max` — la escala

**Qué afirma:** «un estudiante con θ en este rango es alguien que está trabajando
este contenido». Es lo que convierte un número en una frase.

**Dos cosas que hay que tener juntas o se entiende mal:**

1. **Las bandas NO seleccionan ítems.** `next_question` filtra por `topic` y
   `|difficulty − θ|`; el módulo no entra en la consulta. La banda sirve para
   **leer** θ (perfil, plan, cohorte), no para **producir** el test.
2. **Explícita o derivada, y la derivada contamina.** Sin `band_min`, el módulo
   cae en `bands/default-bands`, que reparte los centros entre **todos** los
   módulos del producto: crear uno mueve los demás. Por eso la regla es
   **explícita siempre**.

⚠️ **Con bandas por eje, el θ de números y el de geometría no son comparables.**
Es a propósito (T-118): la escala común entre ejes siempre fue hipótesis
editorial, nunca medición. Se puede decir «nivel 2 en números»; **no** «nivel 2
en general».

### 🟡 `modules.historical_*` — el otro eje, y está a medio llenar

**Qué afirma:** «este contenido es el momento en que alguien resolvió por primera
vez este problema». Es el único eje del sistema que **no** es θ, y el único que
cruza tracks: Euclides, Ohm y Planck caen en la misma línea aunque vivan en
`geometria`, `electrotecnia` y `cuantica`.

**Cuidado con confundirlo con el camino.** `module_prerequisites` dice *qué hay
que saber antes*; `historical_year` dice *cuándo se descubrió*. A veces coinciden
y **eso es una coincidencia, no un diseño**: el orden histórico no es un orden de
aprendizaje. La línea del tiempo es un **relato**; la ruta la sigue mandando A4.

**Estado real (2026-09-18):** `042` es la única migración que escribe
`historical_year` y puebla 20 slugs. **33 de 53 módulos no tienen año y por lo
tanto no existen en la línea** — incluidos los 15 de cuántica, cuyo blurb `042`
menciona explícitamente como motivo para existir. Ver A10 del mapa y M12.

### 🟢 `questions` — la evidencia

Lo único que el proyecto trata como **activo defendible** (ADR-005, ADR-015):
`correct_option` y `error_a..d` no viajan al cliente hasta que el estudiante
responde.

Dos columnas hacen dos trabajos que conviene no confundir:

| | qué decide |
|---|---|
| `topic` | **a qué test pertenece** el ítem → `test_configs`, `next_question` |
| `module_id` | **a qué contenido pertenece** → perfil, déficit, plan, recursos |

Hoy los 100 ítems de `numeros` tienen **el mismo `topic`** y **seis `module_id`
distintos**. Un ítem puede tener `topic` sin `module_id` (queda en
`unknown/<topic>` y no produce plan) — es el estado de 51 % del banco viejo.

### 🟢 `misconceptions` — el error nombrado

**Es el producto.** La tesis del proyecto es que un error nombrado vale más que
una nota, y ésta es la tabla donde eso vive.

**Tres registros distintos que no hay que mezclar:**

| | para quién | dónde |
|---|---|---|
| `misconceptions.name` | **el profesor** y los reportes agregados | panel, mapa de errores |
| `misconceptions.description` | **el autor del próximo ítem** | criterio de cuándo usarla |
| `questions.error_a..d` | **el estudiante**, en el momento | feedback del diagnóstico |

El estudiante **nunca** lee un `name`. Si escribís el `name` pensando en él, el
reporte del profesor queda infantilizado; si escribís el `error_*` pensando en el
profesor, el estudiante no entiende nada.

⚠️ El `error_*` de **la alternativa correcta** es el «Bonus»: confirma y cierra el
razonamiento, y **no habla de ningún error**, porque quien lo lee acertó.

### 🟢 `resources` — el material

Cuelga de `module_id`, y ahí está su límite: **un módulo agrupa muchos recursos y
muchas ideas erróneas**, así que servir «los recursos del módulo donde fallaste»
es lo más fino que se puede hoy. Eso es la **capa 1** de «Mi plan», y es genérica
**por estructura**, no por falta de contenido.

⚠️ `published` es `false` por default y la policy lo esconde sin avisar.

### 🟢 `test_configs` — el acceso, no el contenido

La única tabla de esta lista que **no habla de contenido**. Responde dos
preguntas: *¿esto se puede rendir?* y *¿en qué orden?*

- `prerequisite_topic = null` → **es un diagnóstico**, abierto a todos.
- Con prerrequisito → se desbloquea al **haber rendido** ese topic, y si hay
  `min_theta`, al haberlo alcanzado.

⚠️ **No hay tabla de accesos otorgados.** El avance se **deriva** del histórico
real de `tests` (`universo.access`). Consecuencia útil: no se puede corromper el
permiso de alguien sin corromper su histórico. Consecuencia incómoda: **borrar un
test le quita el acceso a lo que había desbloqueado.**

### 🟢 `tests` — la evidencia del estudiante, y el producto de G-4

**Nunca se reescribe.** El histórico de perfiles es lo que permite entregar Δθ, y
Δθ es lo que se vende (G-4). Por eso la consolidación de bancos es **hacia
adelante**: los `topic` viejos de `tests` se conservan como están.

⚠️ `tests.test` guarda hoy **el mapa `:test` entero del `app-db`**, mezclando el
diagnóstico con estado de UI (T-144). Antes de sacar una clave, buscá quién la
lee: `:questions` parecía residuo y resultó ser lo que hace posible T-132.

### 🔴 `module_prerequisites` — el camino (VACÍA)

Creada por `045`, **cero filas, y ningún namespace la lee**.

**Qué significa la que falta:** es la diferencia entre *«estás en nivel 2»* y
*«te falta esto, y antes de eso, esto»*. Es lo que convierte un diagnóstico en un
recorrido, y es **el dato que hace falta para que el sistema lleve al estudiante**.

Su `strength` no es decorativo:
- `duro` = bloquea, y **es a donde manda un escape** (el «no sé resolverlo» de
  ADR-029). Sin aristas duras, el escape del estudiante no tiene destino.
- `blando` = ayuda pero no bloquea; línea fina en el mapa, ignorada por el escape.

Sin esa distinción el grafo se vuelve una maraña donde todo depende de todo.

### 🔴 `resource_misconceptions` — del error al material (VACÍA)

Creada por `045`, **cero filas, y nadie la lee**. Es la **capa 2** que no existe:
ir de *la idea errónea concreta* al *material concreto*, en vez de del módulo a
todos sus recursos.

Muchos a muchos a propósito: un recurso puede atacar varias ideas erróneas
relacionadas, y una idea errónea puede tener dos materiales (un texto y un video,
o dos explicaciones para dos maneras de no entenderlo).

`rank` es hoy **criterio del autor**, y está dicho en la migración. Es el lugar
donde más adelante entra el ranking por **eficacia medida** (*¿el siguiente
intento sobre esta misconception salió bien?*).

### 🟡 `universo.topics` — el parche que traduce `topic` a módulo

No es una tabla, es un `def` en el cliente, y está acá porque **es donde se
rompe la cadena**. Existe porque el banco viejo tiene `topic` pero no
`module_id`, y alguien tiene que adivinar el módulo a partir del nombre.

Un módulo nuevo que no esté en ese `def` produce déficits `unknown/*` y un plan
sin personalizar. Es lo que le pasa hoy a `probabilidad/*` y a `electrotecnia/*`.

---

## 4. Las tres juntas flojas

Lo que hay que entender para no escribir contenido que «está bien» y no funciona.

### Junta 1 · `test_configs` cuelga de `topic`, todo lo demás cuelga de `module_id`

```
questions.topic  ──→ test_configs   (qué se rinde)
questions.module_id ──→ modules     (qué se aprende)
```

**Las dos jerarquías son independientes y no tienen por qué coincidir**, y hoy no
coinciden: un `topic` (`numeros`) contiene seis módulos.

`020` lo dice explícitamente en su cabecera: se eligió `topic` porque el mapeo
`topic → module-slug` es parcial y `topic` era *«el único identificador real y
completo de un banco de preguntas»*.

**Consecuencia directa:** para que un módulo sea rendible hay que cerrar esta
junta. Ver sección 5.

### Junta 2 · `module_id` nullable

Un `module_slug` mal escrito en una migración **no da error**: deja `module_id`
en `null`, el ítem sigue sirviéndose, y el déficit sale como `unknown/<topic>`.
Es el modo de fallo de T-119 y **no hay guarda en la base que lo impida**. Por eso
la migración generada trae la consulta que lo detecta.

### Junta 3 · La capa 2 está diseñada y vacía

`resources` cuelga de módulo; `misconceptions` identifica el error. **El puente
existe (`resource_misconceptions`) y no tiene tráfico.** Mientras siga vacía,
todo el contenido nuevo que escribas va a llegar al estudiante por la capa 1
—genérica, por módulo— por más fino que sea el diagnóstico.

**Llenarla es barato y no necesita código nuevo para escribirse.** Necesita código
para leerse (T-54).

---

## 5. Qué cambia cuando el módulo pasa a ser rendible

**Decidido por el owner el 2026-09-17.** Y choca de frente con la Junta 1:

```
next_question(p_topic, p_theta, p_narrow, p_wide, p_answered)
  ...  where q.topic = p_topic     ← NO filtra por módulo
test_configs.topic  primary key    ← la PK es el topic
```

Los 100 ítems de `numeros` comparten `topic` y se distinguen **solo** por
`module_id`. Con el esquema de hoy, **un `test_configs` de módulo serviría los 100
ítems del eje**, no los 18 del módulo.

Hay dos formas de cerrarlo, y **es una decisión de arquitectura que pide un ADR**
(el próximo libre es **ADR-038**; 036 y 037 están reservados por T-134 y T-139):

| | **A · Un `topic` por módulo** | **B · `test_configs` gana `module_id`** |
|---|---|---|
| Qué se toca | `questions.topic` de los 402 ítems | migración + sobrecarga de `next_question` + cliente + bundle |
| Código nuevo | **ninguno** — `test_configs`, `next_question` y `access` ya funcionan | RPC nueva, `crud`, `events/test` |
| El diagnóstico de eje | **desaparece**, salvo que se dupliquen los ítems | **se conserva** |
| Histórico de `tests` | los `topic` viejos cambian de significado | intacto |
| Cadena de prerrequisitos | 26 filas de `test_configs` encadenadas a mano | igual, pero con el eje arriba |

**Recomendado: B**, por tres razones concretas:

1. **El ubicador tiene que seguir existiendo.** Un estudiante que no sabe dónde
   está necesita primero los 12 ítems del eje que lo ubican; recién después tiene
   sentido ofrecerle el módulo que le toca. A borra ese primer paso.
2. **No tocar `questions.topic`.** `tests.topic` lo referencia, `universo.access`
   lo usa para desbloquear, y la regla del proyecto es que la consolidación es
   **hacia adelante**: el histórico no se reescribe.
3. **`next_question` ya devuelve `module_id`, `module_slug`, `module_title` y
   `module_track`** — el `left join` con `modules` está escrito desde `024`.
   Falta el `where`, no la estructura.

**Lo que B habilita, y es exactamente lo que se pidió:**

```
numeros  (ubicador, 12 ítems, [-3, +3])   ← «¿dónde estoy?»
   │  θ ubica al estudiante en un módulo vía band_min/band_max
   ▼
aritmetica/numeros      [-3,0 · -1,6]   test de módulo, 6-8 ítems
aritmetica/enteros      [-2,4 · -1,0]   ← prereq duro: numeros
aritmetica/fracciones   [-1,8 · -0,4]   ← prereq duro: enteros
   ...                                     ← el camino sale de
                                              module_prerequisites
```

Y **cierra la Junta 1 sin romper nada**: el eje sigue colgando de `topic`, el
módulo pasa a colgar de `module_id`, y las dos jerarquías dejan de competir.

### ⚠️ Corrección (2026-09-20): la tabla de arriba compara **para el producto**, no para un track nuevo

Esa comparación supone que se están convirtiendo los **26 módulos que ya
existen**, y con ese supuesto B gana. **Para un track que nace de cero, A no
tiene ninguno de sus dos costos:**

| Costo de A | En el producto | En un track nuevo |
|---|---|---|
| Tocar `questions.topic` de los ítems | 402 ítems, y `tests.topic` los referencia | **cero** — los ítems se escriben con su topic propio desde el principio |
| Perder el ubicador del eje | grave: el estudiante no sabe dónde está | **no aplica** si el track no tiene eje, sino una cadena corta con su propia puerta de entrada |

**Y A ya está en producción dos veces:** `040` (los 15 módulos de `cuantica`) y
`077` (los 5 de `electronica`, aplicado el 2026-09-20 y funcionando). En los dos
casos el `topic` de `questions` es el del módulo y `test_configs` lo referencia
directo; no hizo falta esperar ADR-038.

**La regla, entonces:**

- **Track del producto PAES** → **B**, y hasta T-149 la migración de
  `test_configs` se deja escrita y sin aplicar.
- **Track nuevo, chico y encadenado** → **A**, se aplica hoy, y cuando T-149
  llegue migra a `item_topic` + `module_id` **sin tocar la identidad de los
  tests ni el histórico de `tests.topic`**, porque sus `topic` ya son por módulo.

`scripts/verificar_unidad.py` distingue los dos casos desde el 2026-09-20: antes
avisaba «no se puede aplicar hasta ADR-038» a toda unidad rendible, y eso eran
**cinco falsos positivos** sobre un track que ya estaba en producción.

⚠️ **Lo que B pide como contrapartida:** cada módulo necesita ~9-15 ítems en su
banda (6 por tramo de 1,0 logit). Hoy hay ~16-18 por módulo en números, así que
alcanza; en los ejes con bandas más anchas, **no**. Medilo con M3 antes de
prometerlo.
