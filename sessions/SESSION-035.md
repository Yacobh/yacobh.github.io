# SESSION-035

## Fecha

2026-08-19

## Participantes

- Humano: Jacobo Córdova (aprobó la revisión: «sí, revisa las claves de los cuatro bancos»)
- Agente / modelo: Claude Code CLI (Opus 5)

## Objetivo de la sesión

Cerrar **T-105**: revisar ítem por ítem la clave de los cuatro bancos activos —`diagnostico` (64),
`numbers_v1` (178), `paes_m1` (44) y `polinomios` (20), 306 ítems— comparando cada enunciado con la
alternativa marcada como correcta. La tarea venía de la sesión anterior, donde catalogar destapó
tres claves invertidas en `diagnostico` y quedó explícito que **no había ninguna razón para suponer
limpios a los otros tres bancos**.

## Contexto de entrada

- Rama: `escape-no-se`, con siete commits sin publicar.
- Host de desarrollo corriendo en `localhost:3000` con la sesión de administrador abierta.
- Nota de T-105 para quien la tomara: empezar por los ítems de resultado negativo o de dos pasos.

## Método

Dos pasadas, porque ninguna sola alcanza:

1. **Evaluador de expresiones** escrito en la consola: normaliza el LaTeX (`\frac`, `\times`,
   `\div`, `\sqrt`, potencias, multiplicación implícita `)(`), evalúa el enunciado y lo compara con
   cada alternativa. Cubrió los **81 ítems aritméticos**. Se usó como **filtro, no como juez**: solo
   señala candidatos, y cada uno se verificó a mano — de los primeros cuatro que marcó, tres eran
   falsos positivos suyos (tomaba un número suelto del enunciado como si fuera el resultado).
2. **Lectura humana de los 225 restantes**, conceptuales y de contexto. Ningún parser responde «¿en
   qué paso de este desarrollo está el error?» ni juzga una definición de polinomio homogéneo.

Un tercer chequeo, barato y agregado, resultó ser el que más rindió: **contar `correct_option` por
banco**.

## Qué se hizo

### 1. El hallazgo estructural: la clave está en A en 293 de 306 ítems

`numbers_v1` (178), `paes_m1` (44) y `polinomios` (20) al **100 %** —242 entre los tres— más 51 de
los 64 de `diagnostico` (80 %): **293 de 306, el 96 %**. **Ningún ítem de ningún banco tiene la clave
en D.**

> ⚠️ **Corrección de la cifra, hecha al verificar la 047 aplicada.** El primer registro de este
> hallazgo (commit `2a6f217`, y con él ADR-030, R-35, L-45 y T-105) decía «242 de 306». **242 es la
> suma de los tres bancos que están al 100 %**, dejando fuera los 51 de `diagnostico` que también
> tienen la clave en A. El total correcto es **293**. La tabla por banco siempre estuvo bien; lo
> que estaba mal era la suma, y el error subestimaba el problema.

La UI ya rotaba las alternativas (`shift = id mod 4`) y la posición visible salía repartida
(79/78/74/75), que es la razón por la que esto llevaba meses invisible. Pero una rotación cíclica
sobre una clave constante deja la posición de la correcta en `4 − (id mod 4)`: una fórmula pública
con la que se acierta el 100 % del banco sin leer un enunciado. Y θ manda banda → cupo → plan, y es
el activo que G-2 quiere calibrar.

Se reemplazó por una permutación Fisher-Yates sembrada por el id, en un namespace puro nuevo
(`universo.opciones`), con 8 tests. Verificado sobre el banco real: aparecen las 24 disposiciones y
la correcta cae 72/80/81/73. → **ADR-030 / D-61**, [[../project-memory/RISKS]] **R-35**,
[[../project-memory/LESSONS_LEARNED]] **L-45**.

**Se decidió NO permutar el dato en la base**: arrastra `error_*` y `misconception_*_id` sobre 293
filas y es contenido del owner. El riesgo queda abierto y dicho: el cliente es inspeccionable y
cualquier otro consumidor del banco ve el sesgo intacto.

### 2. Cuatro claves más apuntaban a la alternativa equivocada

Corregidas desde el panel y verificadas releyendo la fila desde la base:

| Ítem | Banco | Enunciado | Correcto | Estaba |
|---|---|---|---|---|
| #56 | diagnostico | `(−4) − (−2)` | **−2** (A) | C |
| #109 | diagnostico | `5 − 2(3 − x) = 7` | **x = 4** (C) | A |
| #394 | paes_m1 | dobleces de 40×20 hasta 2,5×20 | **4** (C) | A (6) |
| #407 | paes_m1 | ¿en qué paso está el error? | **Paso 4** (D) | A |

#56 repite el patrón de #54/#27/#29: la clave señala el resultado con el signo invertido.

### 3. Tres ítems no tenían ninguna alternativa correcta

- **#386**: `3.990/3 + 1.390/2 = 2.025`, la alternativa decía `2.023`.
- **#387**: `3 × (1/2 + 1/3) = 2,5`, la alternativa decía «**3** círculos completos y medio».
- **#411**: `(a+b)² − (a²−b²) = 2ab + 2b²`, la alternativa decía `2ab + b²`.

### 4. Siete ítems tenían dos alternativas correctas a la vez

Todos por lo mismo: la fracción simplificada y la equivalente sin simplificar convivían como
opciones (#59, #61, #66, #226, #247, #273, #317).

**Las explicaciones probaron que no era descuido.** En #66 el distractor está anotado «También
equivalente pero no simplificada» y en #247 «No se simplificó la fracción»: el autor tenía en mente
«en su mínima expresión» y no lo escribió en el enunciado. Por eso el arreglo fue **precisar el
enunciado en vez de tocar los distractores** — así las explicaciones y las misconceptions ya
escritas siguen calzando. En #61 fue al revés: la clave era `2/4` y la simplificada `1/2` figuraba
como error, así que se movió la clave a `1/2` y se reescribió la explicación de `2/4`.

### 5. Migración 047, escrita y verificada pero **sin aplicar**

**76 ítems guardan los comandos LaTeX con la barra duplicada** (`\\frac`, `20\\%`): KaTeX no los
interpreta y el estudiante ve el comando en crudo — el mismo daño que los delimitadores faltantes
que T-103 destapó. El arreglo masivo desde el navegador quedó bloqueado (76 filas de una vez, con
razón), así que se dejó como `supabase/migrations/047_arreglar_escapes_latex_dobles.sql`, que es de
todos modos el flujo del proyecto (CLAUDE.md §9).

La regla colapsa `\\` a `\` **solo** cuando lo sigue una letra o `%`, porque un `\\` suelto es un
salto de fila legítimo dentro de `\begin{cases}`. El único ítem con un entorno (#359) se excluye por
id en vez de confiar en la expresión regular. Verificada contra un PostgreSQL 14 desechable:
convierte los cuatro casos, deja intacto el ítem que ya estaba bien, arregla los dos casos especiales
(#299, #359) y es idempotente.

### 6. La 047 falló en producción al primer intento, por una columna que no existe

El owner la corrió y devolvió `42703: column "explanation" does not exist`. **`questions` no tiene
`explanation`**: sus columnas de texto son `question`, `option_a..d` y `error_a..d`.

Lo importante no es el error sino que **la migración sí se había probado** contra un PostgreSQL
desechable y había pasado: la tabla de prueba se escribió copiando las columnas que la migración iba
a tocar, así que confirmaba el supuesto en vez de refutarlo. Es la segunda migración seguida que
falla así (la `046` fue por `track` en `resources`). → **L-46**.

Rehecha la prueba con las columnas reales, tomadas de `question-select-cols`: aplica limpio, corrige
`question`/`option_*`/`error_*`, **no toca el banco de cuántica** (el `where` filtra por topic), deja
intacto lo que ya estaba bien y sigue siendo idempotente.

## Estado al cierre

- `clj -M:test` → **161 tests / 2568 assertions / 0 failures** (eran 153/852).
- Las cuatro auditorías (`dark_theme`, `contraste`, `movil`, `html`) pasan.
- **Release compilado** con el watch ya detenido: `public/js/app.js` sin rastro de
  `shadow.cljs.devtools.client`, más `npm run build:css`.
- **047 corregida y re-verificada**, pendiente de que el owner la aplique.

## Decisiones tomadas

- **D-61 / ADR-030** — las alternativas se barajan con una permutación sembrada por el id, no con
  una rotación; el `:value` nunca cambia, para no romper la corrección del servidor (ADR-015).

## Aprendizajes

- **L-46** — un PostgreSQL de prueba cuya tabla se arma copiando las columnas que la migración va a
  tocar confirma el supuesto en vez de verificarlo. La definición sale de la fuente real, y para
  `questions` —que preexiste al esquema versionado— esa fuente es el `select` que ya corre en
  producción.
- **L-45** — una rotación no es un barajado, y el histograma de posiciones no distingue las dos: es
  justamente el estadístico que una rotación pasa sin problema. Para propiedades de aleatoriedad hay
  que preguntar si existe una fórmula que prediga el resultado, no si los conteos salen parejos.
- El chequeo que más rindió en toda la sesión fue el más barato: contar `correct_option` por banco.
  Llevaba meses disponible y nadie lo había corrido, porque la aplicación se veía bien.

## Pendientes que se abren

- **T-106** (P1, nueva) — `paes_m1` tiene **13 de sus 44 ítems duplicados**: tres enunciados
  repetidos 5, 5 y 3 veces. En un test adaptativo eso multiplica por cinco la probabilidad de que
  salga ese enunciado y estima θ con información repetida.
- Aplicar la **047** (corregida; el primer intento falló por `explanation`).
- **#389 es irrespondible**: pregunta por un gráfico que la plataforma no puede mostrar.
- **#361, #363 y #365** (logaritmos, ecuación con radical, cubo de binomio) exceden el temario de
  M1, como los 20 que ya se movieron a `fuera_de_temario_m1`.
- **R-35 sigue abierto**: el dato en `questions` sigue con la clave en A.
