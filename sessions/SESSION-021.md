# SESSION-021

## Fecha

2026-08-12

## Participantes

- Humano: Jacobo Córdova
- Agente / modelo: Claude Code CLI (Opus 5)

## Objetivo de la sesión

El owner abrió con una preocupación de producto, no de código: la página se ve **genérica**, se
parece a otras que ve promocionadas en Facebook, y sospecha que ideas propias del proyecto —los
`traits`, el estilo de aprendizaje— se fueron perdiendo porque "la IA no las comprende y le da el
mismo código a todos". Preguntó además si sus ideas originales están expuestas a que otro las tome.

El objetivo se volvió: **verificar cuál parte de esa preocupación es cierta y cuál no**, y actuar
sobre lo que sí lo es. De ahí salieron dos decisiones del owner (eje λ y split del repo) y este
trabajo.

## Contexto de entrada

- Rama: `experimento-cuantica`
- Commit inicial: `6ed3b5e`
- Estado del árbol: limpio
- Bloqueos: ninguno. **Falsa alarma inicial**: el owner reportó que no podía ver el panel admin; se
  empezó a diagnosticar como regresión de SESSION-020 y resultó ser una caída de internet suya.
  No había bug.

## Actividades realizadas

1. **Verificación de las tres sospechas del owner**, antes de opinar nada:
   - *"Me copian las ideas"* → **falso por esa vía**, pero se encontró algo real: el repositorio es
     **público** (`visibility: public` vía API de GitHub), y expone toda la estrategia.
   - *"La página se ve genérica"* → **cierto, y medible**: el orden de secciones de `landing.cljs`
     es exactamente la plantilla canónica (hero → cómo funciona → por qué → modalidades →
     testimonios → FAQ → CTA). Se revisó la página renderizada en Chrome.
   - *"Se perdieron los traits"* → **cierto y verificable**: `:traits` aparece en **un solo lugar**
     de todo el repo (`db.cljs:136`). Nada lo calcula, lo lee ni lo testea.
2. **Hallazgo colateral que importa:** el diferenciador declarado en VISION §3.1 (matemática como
   narrativa histórica) existe en la base —`modules.historical_blurb`, `resources.historical_context`—
   y **no aparece en ninguna parte de la landing**. Solo se ve como una línea en cursiva dentro de
   una tarjeta, después de rendir un diagnóstico.
3. **Eje de fluidez (λ)** — el trabajo principal. Ver ADR-019.
4. **Split del repo: preparado y después descartado por el owner en la misma sesión** (D-42).
   El procedimiento se escribió, se leyó, y el owner decidió mantener el repositorio público. Se
   revirtió `docs/SPLIT_MEMORIA_PRIVADA.md` y T-64; la decisión y su razonamiento quedan en D-42
   en vez de perderse con el archivo.
5. Anotación del stub `:traits` (D-41) y actualización de la memoria.

**Lo que se descartó y por qué:**

- **No se implementó el Eje 3 (estilos de aprendizaje)**, aunque VISION lo declara diferenciador.
  Es la decisión más discutible de la sesión y está argumentada entera en ADR-019: la hipótesis de
  emparejamiento no tiene respaldo, y es el único componente que alguien informado podría usar para
  desarmar la credibilidad del resto del producto, que sí es defendible.
- **λ no se definió como "respuestas por minuto"**, que es la letra de VISION §3.3: confunde
  velocidad con largo de enunciado. Se normaliza por `effort/reading-seconds`, reusando la constante
  que ya existía en vez de inventar una segunda.
- **El split del repo se preparó y se descartó.** Crear el repo privado era acción del owner, y al
  ver el procedimiento decidió que no: la visibilidad le sirve para financiamiento, el PMF solo en
  local es peor riesgo, y el foso está en Supabase y no acá (D-42). El documento se borró; el
  razonamiento quedó registrado, que es lo que importa conservar.

## Archivos revisados

- `src/universo/irt/effort.cljs` (de donde sale la normalización por tiempo de lectura)
- `src/universo/irt/progress.cljs`, `src/universo/profile.cljs`, `src/universo/db.cljs`
- `src/universo/components/plan.cljs`, `landing.cljs` (estructura de secciones)
- `project-memory/VISION_LIBRO_PROYECTO.md` §3.1 y §3.3 (los tres ejes, la narrativa histórica)
- `test/universo/irt/effort_test.cljs`, `test/universo/profile_test.cljs` (estilo de tests)

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `src/universo/irt/fluency.cljs` | **Nuevo.** El eje λ: medida, bandas, cruce θ × λ y `calibration-report` |
| `test/universo/irt/fluency_test.cljs` | **Nuevo.** 14 tests |
| `src/universo/profile.cljs` | `build` agrega `:fluency` y `:fluency-profile` |
| `test/universo/profile_test.cljs` | 3 tests nuevos, incluido el caso «sabe pero lento» |
| `src/universo/components/plan.cljs` | `fluency-card` + `fluency-grid` (el 2×2), primero en «Mi plan» |
| `src/universo/db.cljs` | `:traits` anotado como stub muerto (D-41) |
| `adr/ADR-019-…` | **Nuevo.** La decisión y por qué no se hace el Eje 3 |
| `project-memory/DECISIONS.md` | Fila ADR-019 + D-41 + D-42 |
| `project-memory/BACKLOG.md` | T-63 (hecho). T-64 se creó y se revirtió en la misma sesión |
| `project-memory/CURRENT_STATUS.md` | Dos notas: eje λ y repositorio público (como decisión, D-42) |
| `public/js/app.js`, `public/css/app.css` | Recompilados |

## Comandos ejecutados y resultados

```
clj-kondo --lint …          → 0 errors (tras corregir 3 reales, ver abajo)
clj -M:test                 → 72 tests / 401 assertions / 0 failures
                              (venía de 69/387)
npx shadow-cljs release app → 227 files, 0 warnings
npm run build:css           → Done in 443ms
curl api.github.com/repos/Yacobh/yacobh.github.io → visibility: public
git log --oneline -- project-memory/ | wc -l      → 51 de 169 commits
```

**clj-kondo encontró 3 errores reales**, no de estilo: `[:span.text-[10px].…]` — el corchete de un
valor arbitrario de Tailwind dentro de la forma abreviada de keyword rompe el reader de
ClojureScript. Los tests pasaban igual, así que sin el linter esto habría llegado al bundle. Se
reemplazaron por clases estándar.

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| El Eje 2 mide fluidez; el Eje 3 (estilos de aprendizaje) no se implementa | **Sí** | [[../adr/ADR-019-eje-de-fluidez-en-vez-de-estilos-de-aprendizaje]] |
| `:traits` se conserva anotado como muerto, no se borra ni se implementa | No | [[../project-memory/DECISIONS]] D-41 |
| El repositorio **se mantiene público**; el split se prepara y se descarta | No | [[../project-memory/DECISIONS]] D-42 |

## Riesgos identificados

| Riesgo | Severidad | Registrado en |
|--------|-----------|---------------|
| Umbrales de fluidez autorales, sin calibrar (mismo patrón que el 3 de `028`) | Medio | ADR-019 §Consecuencias; se cruza con T-59 |
| Toda la estrategia del proyecto es legible por cualquiera | Bajo, **aceptado** | D-42. No se abre riesgo en RISKS: dejó de ser un pendiente para pasar a ser una decisión con razones registradas |
| El cuadrante `:rapido-sin-base` puede ser un artefacto de adivinación | Bajo | ADR-019; el texto de acción lo dice explícitamente |

## Bloqueos

Ninguno.

## Preguntas abiertas nuevas

| Pregunta | Registrada en |
|----------|---------------|
| VISION §3.3 declara el Eje 3 como diferenciador y ADR-019 decide no construirlo — ¿se corrige VISION? | ADR-019 §Seguimiento. **Pendiente de llevar a OPEN_QUESTIONS** |

## Supuestos aplicados

1. **La preocupación del owner sobre lo genérico es de diseño visual, no de contenido.** El texto de
   la landing es bueno y dice cosas que la competencia no puede decir; lo que se repite es la
   estructura y la paleta. Se le dijo explícitamente.
2. **La fluidez se mide solo sobre respuestas correctas.** Discutible —se podría querer medir
   velocidad en general— pero promediar tiempos de incorrectas no tiene interpretación.

## Próximos pasos

1. **Ver la tarjeta de fluidez con un diagnóstico real.** No se verificó visualmente (ver Pendientes).
3. Con datos acumulados, correr `fluency/calibration-report` y reemplazar los umbrales autorales.
4. **La conversación de diseño quedó abierta.** El owner eligió empezar por λ, pero el diagnóstico
   de por qué la página se ve genérica está hecho y sin actuar: estructura de plantilla en
   `landing.cljs`, paleta por defecto, y la narrativa histórica invisible pese a existir en la base.

## Pendientes

- **La tarjeta de fluidez no se vio renderizada.** Compila, pasa el linter, los 72 tests están en
  verde y las cadenas están en `app.js` — pero «Mi plan» está detrás del login y esta sesión no
  tiene credenciales. Es el segundo cambio de UI seguido que se entrega sin verificación visual.

- La tensión VISION §3.3 vs ADR-019 no se registró todavía en `OPEN_QUESTIONS.md`.
- Nada del diagnóstico de diseño de la landing se implementó.

## Actualizaciones requeridas en Project Memory

- [x] `project-memory/CURRENT_STATUS.md`
- [x] `project-memory/BACKLOG.md` (T-63, T-64)
- [x] `project-memory/DECISIONS.md` (ADR-019, D-41)
- [x] `adr/ADR-019-…` (nuevo)
- [ ] `project-memory/RISKS.md` — no hace falta, ver §Riesgos
- [ ] `project-memory/ARCHITECTURE.md` — **candidato real**: `universo.irt.fluency` es un namespace
      nuevo en la capa de lógica pura y el diagrama de §4 no lo lista. No agregado en esta sesión
- [ ] `project-memory/OPEN_QUESTIONS.md` — **pendiente**, la tensión con VISION §3.3
- [ ] `project-memory/VISION_LIBRO_PROYECTO.md` — no se tocó a propósito: es el documento del
      fundador, y corregirlo es decisión suya, no del agente
- [x] `project-memory/graph/`

## Notas

- **Lo más valioso de la sesión puede no ser el código.** Tres sospechas del owner: una falsa (que
  le copien vía IA), una cierta y no vista (repo público), y una cierta y verificable (el stub
  muerto). Verificarlas una por una, en vez de contestarlas de memoria, es lo que produjo T-64 y
  ADR-019.
- **El hallazgo que quedó sin usar:** la narrativa histórica ya está escrita en la base —20 módulos
  con `historical_blurb`, decenas de recursos con `historical_context`, incluidos los 15 que se
  escribieron para el track de cuántica— y un visitante no ve nada de eso. Es contenido pagado y
  guardado que no está trabajando. Es probablemente el cambio de mayor impacto por menor esfuerzo
  que tiene el proyecto hoy.
- Sobre "la IA le da el mismo código a todos": lo que converge es el **default**, no el código de
  nadie. La landing de este proyecto y las de Facebook comparten plantilla porque las dos partieron
  del mismo molde, no porque una copie a la otra. Lo que no se puede copiar —387 ítems calibrados
  con misconceptions nombradas y 252 diagnósticos— ya está protegido por RLS y ADR-015.

---

Relacionado: [[SESSION-020]] · [[../adr/ADR-019-eje-de-fluidez-en-vez-de-estilos-de-aprendizaje]] ·
[[../project-memory/BACKLOG]] T-63, T-64 · [[../project-memory/CURRENT_STATUS]] ·
`../docs/SPLIT_MEMORIA_PRIVADA.md`

## Addendum — verificación con datos reales (mismo día)

El owner rindió `mq_momento_angular` (cerrando el pendiente de T-61) y reportó **3 aciertos de 10**.
De ahí salieron dos correcciones que la implementación original necesitaba y que ninguna cantidad de
tests unitarios habría revelado:

1. **El eje no existía para ningún perfil ya guardado.** `:fluency` solo se escribe al construir el
   perfil, así que todo diagnóstico anterior a ADR-019 quedaba sin eje hasta volver a rendir. Se
   agregó el recálculo desde `tests.test`, que ya guardaba `:time-ms`, `:weight` y `:question-text`
   por ADR-014 Fase 1 (`:plan/fetch-last-test!`). **No contradice el "no reinterpretar hacia atrás"
   de ADR-014**: no se toca θ ni ningún resultado previo, se calcula un eje nuevo sobre datos que ya
   estaban y que nadie leía.
2. **Con 3 correctas de 10, la tarjeta desaparecía en silencio.** `min-responses` es 4, así que el
   eje se ocultaba entero justo para quien peor le fue, sin decir qué faltaba. Se agregó un tercer
   estado explícito ("todavía no alcanza", con cuántas correctas hay y cuántas faltan). Una
   funcionalidad que se esconde sola es peor que no tenerla: nadie se entera de que existe.

**Queda abierto y sin decidir:** si `min-responses = 4` es el número correcto para bancos difíciles,
o si el eje debería medirse de otra forma cuando la tasa de acierto es baja. Es la misma clase de
número autoral que ADR-019 ya reconoce sin calibrar.

**Verificado por el owner (2026-08-12).** La tarjeta funciona. Sobre su test de `mq_momento_angular`:
8 respuestas usables y `t_rel` mediana **2,19** → banda `:fluida`. La predicción del agente («vas a
ver el estado insuficiente, tenés 3 correctas») **fue incorrecta**: el owner había contado 7 malas de
10, pero los datos daban 8 usables. Conviene no predecir sobre lo que el usuario recuerda cuando la
base tiene el número exacto.

**Un hallazgo de esa verificación**, en [[../project-memory/BACKLOG]] T-65: la primera evidencia de
que el umbral `:fluida` = 3,0 puede ser demasiado generoso para ítems conceptuales. La sospecha
inicial de un bug en la regla de parada (15 respuestas contra `max_items = 12`) **quedó descartada**:
el owner había subido `max_items` desde el panel. Vale como recordatorio de no escalar una anomalía
a bug antes de preguntar por la configuración.

**Nota de método:** cinco intentos de verificación visual fallaron porque el owner usa **Comet** y la
extensión solo controla Chrome; además estaba mirando
`jacobocordova.com` (producción, servida desde `main`, que **no tiene** `irt/fluency`) mientras el
agente controlaba una pestaña en `127.0.0.1`. La sesión de Supabase vive por origen y no viaja entre
las dos. Para verificar UI de una rama no publicada hay que entrar **en la pestaña del servidor
local**, no en producción.

---

Relacionado: [[SESSION-020]] · [[../adr/ADR-019-eje-de-fluidez-en-vez-de-estilos-de-aprendizaje]] ·
[[../project-memory/BACKLOG]] T-63, T-64 · [[../project-memory/CURRENT_STATUS]] ·
`../docs/SPLIT_MEMORIA_PRIVADA.md`
