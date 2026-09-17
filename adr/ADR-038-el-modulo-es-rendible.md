# ADR-038: El módulo es rendible — el eje ubica, el módulo mide

## Estado

**Aprobada** — decidida por el owner el 2026-09-17. **Sin implementar**: no hay
migración escrita ni código. Este ADR fija el diseño; la implementación es T-149.

## Fecha

2026-09-17

## Contexto

Hasta hoy **la unidad que el estudiante rinde es el eje**. Existen exactamente
cuatro tests del producto, creados por `059`:

```
numeros  (sin prerrequisito)
   ├── algebra
   ├── geometria        prerequisite_topic = 'numeros',  min_theta = NULL
   └── probabilidad
```

Cada uno son 5–12 ítems que barren `[-3, +3]` y cubren **seis módulos**. De ahí
salen tres problemas que el proyecto venía tratando como si fueran distintos, y
que son **el mismo defecto visto desde tres lados**: la unidad rendible es
demasiado grande para 12 ítems.

| | Síntoma | Medido |
|---|---|---|
| **T-117** | banda correcta en θ = 2,0 | **37 %** — dos de cada tres estudiantes avanzados quedan en la banda equivocada, y la banda decide el cupo |
| **T-111** | parada por precisión | **0 de 17** tests pararon por `:precision`; 15 por `max_items`, 2 por abandono. El umbral `0.35` es inalcanzable: el piso del SE con 12 ítems es ≈0,73 |
| — | qué pasa después del diagnóstico | **nada**. El estudiante recibe θ, λ, su mapa de errores y una lista de recursos. `test_configs` no tiene ninguna fila por debajo del eje |

El tercero es el que motivó esta decisión, y viene del owner en estos términos:
**una persona que no sabe sumar tiene que poder entrar, encontrar tests a su
altura, y que el sistema la vaya llevando.**

La segunda mitad **no existe**: no hay test de módulo, no hay reevaluación
dirigida, no hay criterio de avance, y `module_prerequisites` —creada por `045`
justo para eso— está **vacía y ningún namespace la lee**.

Y la primera mitad **tampoco funciona del todo, y eso está medido**. El banco de
`numeros` tiene 15 ítems en `difficulty ≤ −2,5` y 31 en `≤ −2,0`, así que el piso
existe; pero **R-44** (🔺 alto) dice qué pasó con estudiantes reales el
2026-09-10: **dos de doce quedaron en θ = −3,00 exacto, que es el clamp del
estimador y no una estimación**, y un tercero en −2,93. No fue click-through —uno
rindió los 12 ítems en **16,5 minutos**, el test más largo de la sesión, con una
sola respuesta desestimada. **Trabajaron; el motor no los midió, chocó contra su
límite inferior.**

R-44 deja tres causas posibles sin decidir. **Esta decisión ataca la (b) con
aritmética**, y conviene verla escrita porque es el argumento más fuerte a favor:

> `test_configs.initial_theta` es **−1,0** por defecto (`048`), y `limit-theta-step`
> acota `|Δθ| ≤ 0,4` logits entre ítems consecutivos (ADR-004). Ir de −1,0 a −3,0
> son 2,0 logits: **mínimo 5 ítems solo para viajar**, y solo si cada paso es el
> máximo. De 12 ítems, el estudiante más débil gasta **el 42 % del test llegando a
> su propio nivel**, y mide con los 7 que quedan.

**Un test de módulo no tiene que viajar**: arranca dentro de la banda donde el
ubicador ya puso al estudiante. Si el ubicador lo dejó en `aritmetica/numeros`
`[−3,0, −1,6]`, el test de ese módulo parte de su centro (−2,3) y **los 6 ítems
son todos medición**. Eso no arregla R-44 por sí solo —la causa (a), cobertura
insuficiente en el extremo bajo, sigue abierta y se mide aparte— pero le quita
encima el costo del viaje.

T-117 ya había anotado «encadenar diagnósticos por eje» como una de las tres
salidas. **Se hizo** (`049`…`060`, aplicadas el 2026-08-28) y nadie midió si
movió el 37 %. Esta decisión es el siguiente escalón de la misma idea: si dividir
en cuatro ayudó, dividir en veintiséis ayuda más, **porque cada test aporta sus
propios ítems concentrados en una banda angosta** en vez de repartir 12 sobre
seis logits.

### La restricción que hace que esto necesite un ADR

El esquema **no permite** un test de módulo tal como está. Verificado en el
código el 2026-09-17:

```sql
-- 057_questions_active_y_next_question.sql, copia exacta de 024 + una línea
create or replace function public.next_question(
  p_topic text, p_theta double precision, p_narrow double precision,
  p_wide double precision, p_answered bigint[] default '{}'::bigint[])
...
  where q.topic = p_topic        -- ← NO filtra por módulo
```

`test_configs` tiene `topic` como **primary key**, y los 100 ítems de `numeros`
comparten `topic = 'numeros'` y se distinguen **solo por `module_id`**. Con el
esquema de hoy, una fila de `test_configs` para `aritmetica/enteros` serviría
**los 100 ítems del eje**, no los 18 del módulo.

Es la **Junta 1** del esquema, y `020` la declaró a propósito en su cabecera:
se eligió `topic` como clave porque el mapeo `topic → module-slug` era parcial y
`topic` era *«el único identificador real y completo de un banco de preguntas»*.
Eso era cierto en su momento. Dejó de serlo cuando `050`…`056` empezaron a
escribir `module_id` en todos los ítems nuevos.

## Decisión

**El eje ubica. El módulo mide.**

```
numeros  (ubicador, 5–12 ítems, [-3, +3])        ← «¿dónde estoy?»
   │  θ ubica al estudiante en un módulo vía modules.band_min/band_max
   ▼
aritmetica/numeros      [-3,0 · -1,6]   test de módulo, 4–8 ítems
aritmetica/enteros      [-2,4 · -1,0]   ← prerrequisito duro: aritmetica/numeros
aritmetica/fracciones   [-1,8 · -0,4]   ← prerrequisito duro: aritmetica/enteros
   …                                       ← el camino sale de module_prerequisites
```

Se implementa con **tres cambios aditivos y compatibles hacia atrás**:

### 1. `test_configs` separa la identidad del test de su banco de ítems

```sql
alter table public.test_configs
  add column if not exists item_topic text,
  add column if not exists module_id  uuid references public.modules (id);
```

| columna | qué significa |
|---|---|
| `topic` (PK, ya existe) | **la identidad del test**. Es lo que se escribe en `tests.topic` y lo que referencia `prerequisite_topic` |
| `item_topic` (nuevo, nullable) | **de qué banco salen los ítems**. `null` → el mismo `topic` |
| `module_id` (nuevo, nullable) | **restringe a ese módulo**. `null` → el banco entero |

Un test de módulo es entonces:
`topic = 'aritmetica/enteros'`, `item_topic = 'numeros'`,
`module_id = <id de aritmetica/enteros>`.

**Las cuatro filas de hoy quedan con las dos columnas en `null` y se comportan
exactamente igual.** Ése es el punto: la migración no cambia el comportamiento de
nada que ya exista.

### 2. `next_question` gana una sobrecarga de 6 argumentos

```sql
create or replace function public.next_question(
  p_topic text, p_theta double precision, p_narrow double precision,
  p_wide double precision, p_answered bigint[] default '{}'::bigint[],
  p_module_id uuid default null)
...
  where q.topic = p_topic
    and (p_module_id is null or q.module_id = p_module_id)   -- ← la única línea nueva
```

Misma estructura, mismo `security definer`, mismos permisos. **La versión de 5
argumentos se conserva intacta** — es el mismo patrón de convivencia de
sobrecargas que `061` ya verificó contra un PostgREST real.

`next_question` **ya devuelve** `module_id`, `module_slug`, `module_title` y
`module_track`: el `left join` con `modules` está escrito desde `024`. Falta el
`where`, no la estructura.

### 3. El cliente pasa lo que la config dice

`crud/next-question` toma `item-topic` y `module-id` de la fila de
`test_configs` que ya viaja en `[:test :configs]`, y los manda como `p_topic` y
`p_module_id`. `universo.access` **no se toca**: `tests.topic` es una columna de
texto sin FK (`021`), así que un test de módulo escribe `aritmetica/enteros` ahí
y `best-theta-by-topic` / `unlocked-topics` lo encadenan sin cambio alguno.

### Reglas que esta decisión fija

1. **Toda unidad nueva nace rendible.** `rendible: true` es el default de la skill
   `unidad-de-contenido`.
2. **Un test de módulo es corto: 4–8 ítems.** Los 12 son del ubicador, que barre
   seis logits. Pedirle 12 a un módulo de 1,4 logits es pedirle el trabajo de un eje.
3. **El orden entre módulos lo manda `module_prerequisites`, no `min_theta`.**
   `test_configs.prerequisite_topic` sigue existiendo para la cadena
   ubicador → módulo; el camino **entre** módulos es el grafo.
4. **El θ del ubicador y el θ de un módulo no son la misma medición** y no se
   promedian. El del ubicador dice *dónde empezar*; el del módulo dice *si esto
   ya está*.
5. **El empate de `next_question` se rompe con `random()`.** El `order by` termina
   hoy en la distancia a θ, y con empate exacto Postgres devuelve una fila
   arbitraria —en la práctica siempre la misma—. Se agrega `random()` como último
   criterio. Ver §Empates más abajo.
6. **Los umbrales de fluidez se fijan por módulo**, aprovechando que viven en
   `test_configs` y que esta decisión crea 26 filas. Ver §Fluidez más abajo.
7. **Un test de módulo arranca en el centro de la banda de su módulo**, no en el
   `initial_theta` global de −1,0. Es lo que le quita encima el costo del viaje
   (ver R-44 arriba). Se guarda en `test_configs.initial_theta` de esa fila, que
   ya existe desde `048`: **no hace falta columna nueva para esto.**
8. **`universo.motor/version` NO sube.** Modelo, prior y regla de parada no
   cambian: cambia qué ítems entran al test y desde dónde arranca, y las dos cosas
   ya viven en `test_configs` (ADR-034 exige exactamente eso: los parámetros no se
   hardcodean). Un θ de módulo es comparable con otro θ de módulo del mismo motor.

### Empates: `random()` como último criterio

Salió de preguntar para qué sirve `order_index` en `questions`, y la respuesta fue
que para nada —es el rango de dificultad dentro del módulo con otro nombre: **2
inversiones en 476 pares consecutivos**— pero la pregunta destapó un defecto que
sí es real.

`next_question` ordena por distancia a θ y corta con `limit 1`. **Con empate
exacto de `difficulty`, Postgres devuelve una fila arbitraria**, y en la práctica
estable: la misma, para todos los estudiantes, siempre. Empates exactos medidos
sobre los JSON de los bancos:

| banco | ítems en empate exacto de `difficulty` |
|---|---|
| electrotecnia | **49 de 74** (66 %) |
| geometria | 28 · probabilidad 20 · numeros 17 · algebra 8 |

**Por qué importa, y pega en G-2:** de cada par empatado, uno acumula respuestas y
el otro **puede no salir nunca**. Calibrar pide ~30 respuestas por ítem; el
compañero de empate se queda en cero para siempre y el banco es efectivamente más
chico que su conteo. `p_answered` lo tapa dentro de una sesión, no entre personas.

```sql
  order by
    (abs(...) > coalesce(p_narrow, 0)),
    abs(...),
    random()          -- ← nuevo: reparte los empates en vez de fijarlos
  limit 1;
```

⚠️ **Dato que acota el alcance, y es la razón de que esto vaya acá y no en su
propio ADR:** los empates son **todos entre módulos, ninguno dentro del mismo
módulo** (numeros 0/8, geometria 0/13, electrotecnia 0/22). Es consecuencia del
solapamiento deliberado de bandas. **El filtro por `module_id` de esta decisión
elimina el empate en los tests de módulo**: el problema le queda solo al ubicador,
que es un test por estudiante y no veintiséis. `random()` es la red para ése.

**Lo que `random()` cuesta:** la secuencia de ítems deja de ser reproducible para
un mismo θ. Es aceptable —`p_answered` ya hacía la sesión irrepetible, y el editor
en vivo (ADR-032) trabaja sobre el ítem que está en pantalla, no sobre el que
vendría—. **No se descartó `order_index` como desempate por ser peor**, sino por
ser **lo mismo que ya ordena**: desempatar por el rango de dificultad cuando la
dificultad ya empató no reparte nada, solo fija el sesgo con otro nombre.

### Fluidez: los umbrales de λ pasan a ser por módulo

`fluency_fluida_max` y `fluency_media_max` (`041`) viven en `test_configs`, o sea
**por banco**. Esta decisión crea 26 filas de `test_configs`, así que **cada módulo
puede tener sus propios cortes de λ sin una sola columna nueva**.

No es cosmético. λ no compara segundos crudos: normaliza por el **tiempo de
lectura** del enunciado (`effort/reading-seconds` = `largo / 20`), y
`t_rel = observados / lectura`. El problema es que **ese normalizador es plano
justo donde vive la mayoría**. Medido sobre los 100 ítems de `numeros`:

| tramo de `difficulty` | n | largo mediano | normalizador |
|---|---|---|---|
| [−3, −2) | 15 | 43 car. | **2,15 s** |
| [−2, −1) | 28 | 55 car. | **2,75 s** |
| [−1, 0) | 21 | 45 car. | **2,25 s** |
| [0, +1) | 17 | 52 car. | **2,60 s** |
| [+1, +2) | 12 | 98 car. | 4,90 s |
| [+2, +3) | 6 | 124 car. | 6,17 s |

La correlación global entre dificultad y largo es `r = +0,51`, pero **los cuatro
tramos de abajo son indistinguibles**: para **81 de 100 ítems** el normalizador es
una constante de ~2,4 s. Consecuencia: `$\frac{3}{4}+\frac{2}{5}$` se «lee» en
~1 s y se resuelve en 30, así que da `t_rel ≈ 30` y cae en **`:laboriosa`** por
más fluido que sea el estudiante — y ésos son exactamente los ítems del piso del
banco, los del estudiante al que el producto existe para ayudar.

**Un umbral por banco de 6 logits no puede ser correcto para los dos extremos. Uno
por módulo de 1,4 logits sí puede.** Con esto **T-116** (recalibrar los cortes
contra el motor v2) gana el lugar donde hacerse, y **Q-47** —el filtro de esfuerzo
borrando la evidencia de λ— gana un umbral por módulo en vez de uno global.

⚠️ **Esto mitiga, no resuelve.** La causa raíz es que se usa *cuánto se tarda en
leer* como proxy de *cuánto se tarda en resolver*, y eso es una propiedad del ítem,
no del módulo. **El arreglo de fondo es `expected_seconds` por ítem: ADR-039.**
Esta decisión es lo que se puede hacer sin esquema nuevo, y no se debe presentar
como más que eso.

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|---|---|
| **A · Un `topic` por módulo** — reescribir `questions.topic` de `numeros` a `aritmetica/enteros` en los 402 ítems | Cero código nuevo, y por eso era tentadora. Pero **borra el ubicador**: sin un banco `numeros` de 100 ítems no hay test de eje, y un estudiante que no sabe dónde está necesita ese primer paso antes de que tenga sentido ofrecerle un módulo. Además toca `questions.topic`, que `tests.topic` referencia y `universo.access` usa para desbloquear — y la regla del proyecto es que la consolidación es **hacia adelante**: el histórico no se reescribe. Duplicar los ítems para tener las dos granularidades multiplica el banco por dos y rompe la idempotencia por `(topic, question)` |
| **No hacer nada y alargar el diagnóstico del eje** | Medido: 20 ítems dan 70 % de banda correcta y 30 dan 79 %, contra 37 % con 12. Funciona, y choca de frente con el objetivo de una sesión de ~20 minutos. Y **no resuelve el tercer problema**: sigue sin haber nada que rendir después |
| **Mover los cortes de banda** (2ª salida de T-117) | Medido y descartado como solución única: con 3 bandas mal puestas `intermedio` sube a 85 % pero `basico` cae a 41 %. **El lugar del corte pesa más que la cantidad**, pero no crea un camino |
| **Cambiar la PK de `test_configs` a un surrogate `id`** | Más limpio en abstracto. `prerequisite_topic` es FK a `test_configs(topic)` y `tests.topic` guarda strings: cambiar la PK obliga a migrar las dos y a tocar `universo.access`. `item_topic` + `module_id` consigue lo mismo **sin tocar ninguna clave** |
| **Filtrar por módulo en el cliente** | El cliente no lee `questions` (ADR-015): el ítem viaja sin `correct_option` ni `error_*` y la selección ocurre en SQL a propósito. Filtrar arriba significaría traer el banco entero, que es exactamente lo que `024` vino a eliminar |
| **Desempatar por `order_index`** en vez de `random()` | Medido: `order_index` **es** el rango de dificultad dentro del módulo (2 inversiones en 476 pares consecutivos). Desempatar por él cuando la dificultad ya empató no reparte nada — fija el mismo sesgo con otro nombre, y encima con apariencia de criterio |
| **Desempatar por el ítem menos servido** (lo que más ayudaría a G-2) | Es la opción correcta en el largo plazo y hoy no se puede: no hay conteo de respuestas por ítem. Está enterrado en el `jsonb` de `tests.test`, que además guarda estado de UI (T-144). `random()` consigue la mitad del beneficio en una línea; el conteo se reconsidera cuando exista la vista que T-130 empezó |

## Consecuencias

**Positivas**

- **El estudiante tiene qué hacer después del diagnóstico.** Es lo que se pidió, y
  es lo que convierte un ubicador en un recorrido.
- **Más ítems sin alargar la sesión.** Cada test de módulo aporta 4–8 ítems
  concentrados en ~1,4 logits, en vez de 12 repartidos sobre 6. Ataca la raíz
  común de T-111 y T-117 sin romper el objetivo de los 20 minutos.
- **`module_prerequisites` deja de estar vacía**, y con ella el «no sé
  resolverlo» de ADR-029 gana destino: una arista `duro` es a dónde retroceder.
- **Δθ por módulo (G-4).** Rendir dos veces el mismo módulo da una diferencia
  medida sobre una escala angosta, que es mucho más defendible que un Δθ de eje.
- **Aditiva y reversible.** Las cuatro filas actuales quedan con `null` en las dos
  columnas nuevas y se comportan igual. La reversión es `drop column` y volver a
  la sobrecarga de 5 argumentos.
- **Le quita a R-44 el costo del viaje.** Un test que arranca en el centro de la
  banda del módulo no gasta 5 de sus ítems bajando desde −1,0. No cierra R-44
  —la cobertura del extremo bajo se mide aparte— pero ataca una de sus tres
  causas con aritmética, no con una hipótesis.
- **Precondición de G-1 que se paga sola:** un panel docente por módulo es mucho
  más vendible a un colegio que uno por eje.

**Negativas / costos aceptados**

- ⚠️ **El selector pasa de 4 filas a ~30**, y hoy ya muestra ~14 bancos viejos
  como si fueran diagnósticos. **T-138 (agrupar y describir) y T-122 (retirar los
  bancos muertos) dejan de ser mejoras de UX y pasan a ser precondiciones duras.**
  Sin ellas, esta decisión empeora T-143 en vez de mejorarlo.
- **Hay que escribir 26 filas de `test_configs` y el grafo de prerrequisitos
  completo.** Es trabajo de contenido, no de código, y no lo puede hacer un agente
  solo: el orden entre módulos es una decisión pedagógica del owner.
- **Cobertura de ítems por módulo.** Hacen falta ~6 ítems por tramo de 1,0 logit.
  Números tiene 16–18 por módulo y alcanza; **en los ejes con bandas más anchas
  hay que medirlo antes de prometerlo** (métrica M3 de la skill).
- **El θ de un módulo y el de otro no son comparables entre sí**, igual que ya
  pasa entre ejes desde T-118. Se puede decir «cerraste enteros»; **no** «estás en
  nivel 2 en general». No es pérdida nueva: la escala común siempre fue hipótesis
  editorial, nunca medición.
- **Más tests rendidos = más filas en `tests`**, que hoy guardan el mapa `:test`
  entero del `app-db` (T-144). El costo por fila se multiplica por ~7.

## Riesgos

| Riesgo | Mitigación | Ref. |
|---|---|---|
| Se publica el bundle antes que la migración y el cliente pide una RPC de 6 argumentos que no existe | **Migración primero, siempre.** Medido el 2026-09-16: al revés PostgREST responde `404 PGRST202` y se pierde la fila entera. El cliente manda `p_module_id` solo si la config lo trae, igual que el reintento de `motor/falta-la-columna-de-version?` | [[../project-memory/RISKS]] R-39 |
| El selector se vuelve ilegible con ~30 filas y el estudiante va al lugar equivocado | T-138 y T-122 **como precondición**, no como seguimiento. Ya pasó con menos filas: 16 de 40 tests fueron a bancos muertos. Es la misma familia que R-42 (un banco ajeno en el selector), agravada por volumen | R-42, T-143, T-138 |
| Un θ en el clamp se reporta como si fuera una medición, ahora por módulo y no solo por eje | R-44 ya lo prohíbe: se informa *«por debajo del rango medible de este banco»*. Multiplicar los tests multiplica las ocasiones de incumplirlo | R-44 |
| Un módulo con pocos ítems para en `:exhausted` a la primera | Métrica M3 antes de crear la fila de `test_configs`. `verificar_unidad.py` ya falla si `items_objetivo` no cubre la banda | T-111 |
| Esto es más construcción de producto y el proyecto sigue sin clientes | **Es el riesgo real de esta decisión y hay que decirlo.** La mitigación es de orden: T-131 (el café con el colega, con la pantalla delante) **no espera** a esto | R-30 |
| Se promete «tests adaptativos por contenido» antes de que existan las 26 filas | El copy no cambia hasta que la migración esté aplicada y verificada. Precedente: T-111, donde el copy afirma una precisión que la regla no alcanza | R-38 |

## Seguimiento

**Se reconsidera si**, con los módulos de números rendibles y ~30 tests reales:

1. **La banda correcta no sube.** Es la razón de ser de la decisión. Si un test de
   módulo de 6 ítems no mejora sobre los 12 del eje, el problema no era la
   granularidad y hay que volver a T-117 salida 2 (mover los cortes).
2. **La tasa de `:exhausted` sube.** Significa que los bancos por módulo son
   demasiado finos para la cobertura que hay, y la salida es escribir ítems, no
   más módulos.
3. **El estudiante no encadena.** Si rinde el ubicador y no toma ningún módulo, el
   problema es de presentación (T-138) o de que el camino no se ve (T-101), no del
   esquema.

**Lo que hay que medir antes de declarar esto un éxito** es el punto 1, y se mide
con la consulta de S3 de `metricas-de-la-unidad.md`, con `origin = 'student'` y la
lista de exclusión de T-145.

**Queda explícitamente fuera de este ADR** y se decide aparte:
- qué se hace con `se_threshold`, que sigue siendo inalcanzable (**T-111**, Q-42);
- si `min_theta` deja de ser `NULL` en la cadena (hoy basta *haber rendido*);
- el mapa de prerrequisitos visible y manipulable (**T-101**).

---

Relacionado: [[../project-memory/ARCHITECTURE]] · [[../project-memory/DECISIONS]] ·
[[ADR-004-irt-1pl-map-y-regla-de-parada]] · [[ADR-015-item-sin-respuesta-en-el-cliente]] ·
[[ADR-029-escape-como-tercera-categoria-de-respuesta]] ·
[[ADR-034-azar-fijo-prior-suelto-y-version-del-motor]] ·
[[../project-memory/BACKLOG]] T-101, T-111, T-117, T-118, T-122, T-138, T-143 ·
`.claude/skills/unidad-de-contenido/referencias/las-tablas-y-su-sentido.md` §5
