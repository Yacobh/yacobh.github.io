# Los cuatro ejes, sus módulos y a qué dificultad apuntar

## El conflicto de bandas, y cómo se resuelve

**Léelo antes de asignar un solo `difficulty`.** Si lo ignoras, vas a reproducir
exactamente el defecto que motivó esta skill.

`universo.bands/default-bands` reparte los centros de banda de **los 18 módulos
del producto** a lo largo de `[-2.4, 2.4]`, en orden curricular. Con 18 módulos
eso da un paso de 0,28 logits y un semiancho de 0,45, y produce esto:

| módulo | centro | banda derivada |
|---|---|---|
| aritmetica/numeros | −2,40 | [−2,85, −1,95] |
| aritmetica/enteros | −2,12 | [−2,57, −1,67] |
| aritmetica/fracciones | −1,84 | [−2,29, −1,39] |
| aritmetica/potencias | −1,55 | [−2,00, −1,10] |
| aritmetica/proporciones | −1,27 | [−1,72, −0,82] |
| aritmetica/porcentajes | −0,99 | [−1,44, −0,54] |
| … | … | … |
| geometria/pitagoras | +2,40 | [+1,95, +2,85] |

**El eje de números entero cabe en [−2,85, −0,54].**

Eso es coherente con **un solo diagnóstico que recorra los cuatro ejes**, donde
«difícil» significa «más adelante en la progresión». Pero el diseño que se adoptó
es **un diagnóstico por eje, encadenados** (números primero, y con él como
prerequisito los otros tres). Y ahí ese reparto es directamente incorrecto:

- Un estudiante que rinde el diagnóstico de números y llega a θ = 1,3 **se queda
  sin ítems**, porque el eje completo termina en −0,54. Es literalmente lo que
  pasó el 2026-08-28: el diagnóstico de `enteros` paró en 8 preguntas por
  `:exhausted`, con θ = 1,29 y el banco 1,83 logits más abajo.
- Y afirma algo falso: que el ítem de números más difícil que existe es más fácil
  que el de geometría más trivial.

### La regla

**Con diagnósticos por eje, cada eje reparte sus módulos a lo largo de todo
`[-3, 3]`.** «Difícil» pasa a significar **difícil dentro de ese eje**, que es lo
que el estudiante realmente rinde.

Eso se declara con `modules.band_min` / `band_max` **explícitas** — `bands/band-for`
ya prefiere la explícita sobre la derivada, y marca el origen para que en el panel
se distinga «esto lo decidió alguien» de «esto salió del orden».

**Consecuencia que hay que aceptar y escribir:** el θ de números y el de geometría
dejan de ser comparables entre sí. No es una pérdida real —la escala común entre
ejes siempre fue una hipótesis editorial, nunca una medición— y **las cohortes se
arman con el θ de números**, un solo eje y una sola escala, que es consistente.
Lo que **no** se puede decir es «este estudiante está en nivel 2 en general».

## Reparto por eje

Seis módulos por eje repartidos en `[-3, 3]`, con bandas que se solapan (el
solapamiento es deliberado: dentro de un mismo contenido hay ítems fáciles y
difíciles, y bandas disjuntas desviarían al test adaptativo).

### Eje 1 — Números  ·  `topic: numeros`

| módulo | banda explícita | ítems objetivo |
|---|---|---|
| `aritmetica/numeros` | [−3,0, −1,6] | 16 |
| `aritmetica/enteros` | [−2,4, −1,0] | 18 |
| `aritmetica/fracciones` | [−1,8, −0,4] | 18 |
| `aritmetica/potencias` | [−1,0, +0,6] | 16 |
| `aritmetica/proporciones` | [−0,2, +1,6] | 16 |
| `aritmetica/porcentajes` | [+0,6, +3,0] | 16 |

**Cobertura mínima: 6 ítems por cada tramo de 1,0 logit entre −3 y +3.** Es el
objetivo que verifica `verificar_items.py` y el que impide que el test se agote.

### Eje 2 — Álgebra  ·  `topic: algebra`

Cinco módulos (`algebra/expresiones`, `ecuaciones`, `sistemas`, `polinomios`,
`funciones`) repartidos igual a lo largo de `[-3, 3]`.

⚠️ Hoy `polinomios` tiene **18 de sus 20 ítems dentro de 0,045 logits**: no es una
escala, es una constante con ruido. Ese banco no se amplía, **se rehace**.

### Eje 3 — Geometría  ·  `topic: geometria`

Siete módulos (`basica`, `angulos`, `triangulos`, `circulo`, `areas`,
`volumenes`, `pitagoras`). No hay banco identificable hoy.

### Eje 4 — Probabilidad y estadística  ·  `topic: probabilidad`

Seis módulos, creados por `055` con su banda explícita desde el nacimiento
(aprobados por el owner el 2026-08-28 sobre el temario PAES M1):

| módulo | banda explícita | ítems |
|---|---|---|
| `probabilidad/datos` | [−3,0, −1,6] | 17 |
| `probabilidad/tendencia-central` | [−2,4, −1,0] | 17 |
| `probabilidad/posicion` | [−1,6, −0,2] | 17 |
| `probabilidad/dispersion` | [−0,8, +0,8] | 17 |
| `probabilidad/azar` | [ 0,0, +1,8] | 16 |
| `probabilidad/reglas` | [+1,2, +3,0] | 16 |

⚠️ **Crear módulos nuevos cambia las bandas derivadas de todos los demás.**
`default-bands` reparte los centros entre **todos** los módulos del producto: al
pasar de 18 a 24, el paso baja de 0,28 a 0,21 logits y los 18 anteriores se
corren hacia abajo (`geometria/pitagoras`, de `[1,95, 2,85]` a `[0,70, 1,60]`).
Por eso `051` y `053` se aplican **antes** que `055`: con banda explícita, un
módulo deja de depender del reparto.

## Orden de trabajo

1. **Números** — es donde el owner dice que la gente se cae, y el único eje con
   banco previo aprovechable (`numbers_v1`, 178 ítems ya revisados en T-105).
2. **Álgebra** — segundo eslabón de la cadena; `polinomios` hay que rehacerlo.
3. **Geometría**.
4. **Probabilidad** — desbloqueada: `055` crea sus seis módulos y `056` trae sus
   primeros 100 ítems.

## Consolidación del banco de números

Se decidió **un solo banco** para el eje. Los bancos y fragmentos actuales
(`numbers_v1` 178, `enteros` 10, `fracciones`, `potencias`, `operaciones_*`…) se
consolidan bajo un `topic` único.

**Lo que no se hace:** reescribir el `topic` de las filas de `tests` ya rendidas.
Ese histórico se conserva como está — es evidencia, y `universo.access` lo usa
para desbloquear. La consolidación es hacia adelante.
