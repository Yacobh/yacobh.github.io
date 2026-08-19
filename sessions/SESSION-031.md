# SESSION-031

## Fecha

2026-08-18

## Participantes

- Humano: Jacobo Córdova (planteó el problema y se retiró a mitad de sesión, autorizando continuar
  hasta terminar)
- Agente / modelo: Claude Code CLI (Opus 5)

## Objetivo de la sesión

El owner pidió **un mecanismo de escape para cuando el estudiante no sabe** («no sé» / «no
entiendo»), y con él una lista larga: engancharlo con misconceptions y recursos, mejorar la
experiencia de edición de recursos, incentivos para profesores (incluido grabar video con prefetch),
un mapa de prerrequisitos manipulable, y una opinión sobre por qué la UI «se ve demasiado por
defecto».

**El objetivo se acotó a propósito** tras leer la memoria: se entregó el diseño completo de todo lo
pedido, pero se **implementó solo lo que puede validarse sin datos inventados** — el escape mínimo y
los arreglos baratos del editor. La razón está abajo, en Notas.

## Contexto de entrada

- Rama: `main` → se creó `escape-no-se`
- Commit inicial: `cb9b3fb`
- Estado del árbol al empezar: **limpio**
- Documentos de la memoria leídos: `CLAUDE.md`, `HANDOFF`, `AGENT_INSTRUCTIONS`, `BACKLOG`
  (T-90…T-95), `RISKS` (R-30…R-33), `DECISIONS` (D-54…D-56), `OPEN_QUESTIONS` (Q-35…Q-37),
  `supabase/SCHEMA.md`, ADR-013, ADR-014, **ADR-015**, ADR-019, ADR-022, ADR-023, ADR-025
- Bloqueos vigentes al empezar: ninguno técnico. **R-30 activo** (riesgo dominante: construir
  producto en vez de distribución), **T-90 y T-91 abiertas en P0**

## Actividades realizadas

1. **Lectura y verificación contra el código, no contra la documentación.** Varias afirmaciones del
   pedido se contrastaron con `src/` y `supabase/migrations/`. Tres hallazgos que cambiaron el
   diseño:
   - El mecanismo del escape **ya estaba construido**: el peso por respuesta de ADR-014 entra en las
     dos derivadas de `tetha` y por herencia en la información de Fisher. No había que inventarlo.
   - `score_answer` (024) **rechaza por diseño** cualquier alternativa que no sea A–D, así que el
     escape **no puede ni debe** pasar por el servidor. Eso lo volvió cliente puro y sin migración.
   - `upsert-resource!` **ya devolvía la fila guardada** (`.select("*").single()`) y el panel la
     tiraba para ir a buscarla otra vez con una recarga completa de la sección.
2. **Diseño entregado al owner** (memo con las cinco áreas: escape, enganche con
   misconceptions/recursos, editor, incentivos y video, mapa, y la opinión de UI/UX).
3. **T-96 — escape del estudiante**, implementado con ADR-029.
4. **T-97 — los cinco arreglos baratos del panel de recursos**, con D-58.
5. **Migración `045` escrita y NO aplicada**: `module_prerequisites`, `resource_misconceptions` y
   `resources.entry_level`. Aditiva e idempotente. **Sin seed a propósito.**
6. **Lo que se decidió NO hacer, y es lo más importante de esta lista:** no se sembró el grafo de
   prerrequisitos, no se fijó el umbral de tasa de escape, y no se construyeron el mapa (T-101) ni
   la migración visual (T-100). Los dos primeros porque **habrían sido datos inventados**; los dos
   últimos porque el owner no estaba para revisarlos y habrían entrado como varios cientos de líneas
   sin una sola mirada humana. Ver Notas.

### Lo que no funcionó

- **`graphify query` no sirvió para orientarse en este trabajo.** La consulta sobre el escape
  devolvió 286 nodos, truncados a 79, y casi todos eran símbolos minificados de `public/js/app.js`
  (`Zj()`, `Qj()`, `.then()`). El límite ya está documentado —el grafo no indexa `.cljs`— pero vale
  anotar que sobre preguntas de lógica de negocio **el ruido del bundle compilado domina el
  resultado**. Se avanzó leyendo `src/` dirigidamente, como manda `GRAPHIFY_INTEGRATION_GUIDE` §6.
- **Se insertaron D-57/D-58 en el lugar equivocado** de la tabla de `DECISIONS.md` (antes de D-56,
  rompiendo el orden ascendente). Corregido en la misma sesión.
- **El publicador de artifacts estuvo caído toda la sesión** (error de sobrecarga, ~6 reintentos):
  el memo de diseño quedó escrito pero **no publicado**. El contenido se entregó en la conversación.

## Segunda mitad: verificación en vivo, y dos fallos que solo aparecieron ahí

El owner levantó `localhost:3000` y abrió sesión de **admin** en un Chrome controlado por el agente.
Esta parte cambió conclusiones, así que se anota aparte en vez de reescribir lo de arriba.

### El owner reportó dos síntomas y los dos eran reales

**«Parece que se quitó el cuadro de fluidez».** Cierto. `fluency-card` solo muestra el estado
«todavía no alcanza» si `(pos? n)`, y un escape es `:correct? false`, así que no aporta a `n`. Con
cero aciertos, `n = 0` y la tarjeta **desaparecía entera y en silencio** — exactamente el agujero que
D-44 mandaba no tener. Antes del escape ese caso exigía no acertar ni una pregunta y era raro; el
escape lo volvió trivial de alcanzar. Arreglado: `insuficiente?` también se enciende con escapes, y
los nombra.

**«La dificultad parece no bajar».** Era peor: **subía.** Y lo dejó grabado el propio histórico.

### El fallo de fondo: el peso 0.0 no alcanzaba, y el error tenía el signo peor posible

La premisa equivocada fue dar por bueno que peso 0.0 ⇒ θ no se mueve. El peso impide aportar a la
**verosimilitud**, pero `calculate-theta` reestima el **MAP completo** y lo acerca a su valor
convergido en pasos de `max-theta-step` (0,4). Con poca evidencia real ese valor convergido *es la
media del prior*, θ = 0 — así que cada escape arrastraba θ **hacia arriba**, justo para quien venía
por debajo, que es quien escapa.

Evidencia, del test `294` en producción (`mq_armonicos_esfericos`, seis escapes seguidos y **ninguna**
respuesta real):

```
θ: -1,0 → 0,0
dificultades servidas: -0,8 · -0,3 · 0,2 · 0,7 · 1,1 · 1,5
```

El motor le ponía el test **más difícil** a quien acababa de declarar seis veces que no entendía nada.

**Por qué el test unitario no lo atrapó, que es la lección reusable:** `escape-no-mueve-theta` se
escribió con **dos respuestas correctas previas**. Ahí el MAP ya había convergido y θ efectivamente
no se movía, así que el test pasaba. La trampa solo existe **sin evidencia real**, que es el caso que
no se probó. Ahora hay regresión explícita
(`reestimar-con-solo-escapes-arrastra-theta-hacia-el-prior`) que simula el bucle real —una
reestimación por respuesta— en vez de una sola llamada con todas.

Arreglo: `escape/freeze-theta?`. Ante un escape θ **se conserva tal cual**, no se reestima.
Reverificado en vivo sobre `numbers_v1`:

| escapes seguidos | θ | objetivo | dificultad servida |
|---|---|---|---|
| 0 | -1,00 | -1,00 | **-1,1** |
| 1 | -1,00 | -2,10 | **-2,1** |
| 2 | -1,00 | -3,00 | **-3,0** (piso) |

### El hallazgo que vale más que los dos arreglos: la escala de dificultad

Con la sesión de admin se midió la distribución real de `questions.difficulty` (387 ítems, excluido
el track `mq_`):

| topic | n | mín | p25 | mediana | máx |
|---|---|---|---|---|---|
| `numbers_v1` | 178 | -3,0 | -2,1 | -1,8 | 2,9 |
| `diagnostico` | 84 | -3,0 | -2,88 | 1,01 | 3,0 |
| `paes_m1` | 44 | -1,8 | -1,2 | -0,5 | 0,9 |
| `polinomios` | 20 | -1,7 | -1,685 | -1,675 | 3,0 |

**`polinomios` tiene 18 de sus 20 ítems dentro de 0,045 logits.** Eso no es una escala de dificultad,
es una constante con ruido: en ese banco el retroceso del escape es imperceptible **por
construcción**, y ninguna cantidad de código lo arregla. `paes_m1` toca fondo en -1,8, así que admite
un solo escalón.

Es [[../project-memory/RISKS]] R-17 y [[../project-memory/OPEN_QUESTIONS]] Q-05 en su forma más
concreta, y es el argumento más fuerte aparecido hasta ahora de que **G-2 (calibrar) es precondición
dura y no una tarea más**: mientras `difficulty` sea autoral, «bajar la dificultad» es una operación
sobre etiquetas que nadie validó.

### Cómo se verificó, para poder repetirlo

Sin credenciales compartidas: el owner inició sesión él mismo en un Chrome que el agente controla, y
el agente consultó con **su** token. Las consultas de banco e histórico fueron de solo lectura. Se
corrió un diagnóstico real en `numbers_v1` con cuatro escapes y **se abandonó sin completarlo**, así
que no dejó fila en `tests`. La evidencia salió de una línea de log añadida a propósito:

```
[test] topic=… modo=… θ=… objetivo=… escapes-seguidos=… dificultad-servida=…
```

Sirve para distinguir «la lógica falla» de «el banco no tiene ítems más fáciles», que fue justo la
duda de esta sesión.

## Archivos revisados

- `src/universo/events/test.cljs`, `src/universo/components/diagnostic_test.cljs`,
  `src/universo/components/feedback_modal.cljs`
- `src/universo/irt/effort.cljs`, `irt/progress.cljs`, `irt/fluency.cljs`,
  `src/universo/components/tetha.cljs` — para confirmar la semántica del peso 0.0
- `src/universo/profile.cljs`, `src/universo/topics.cljs`, `src/universo/access.cljs`
- `src/universo/components/admin.cljs`, `src/universo/events/admin.cljs`,
  `src/universo/events/slots.cljs`, `src/universo/db/crud.cljs`, `src/universo/db.cljs`
- `supabase/migrations/001_mvp_schema.sql` (DDL y RLS de `modules` y `resources`),
  `024_questions_rpc.sql`, `027_misconceptions.sql`
- `tailwind.config.js`, `src/css/app.css` — para la opinión de UI/UX
- `src/universo/voz.cljs`, `animations.cljs` — **ninguno está en el build** (nadie los requiere)

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `src/universo/irt/escape.cljs` | **nuevo** · namespace puro del escape |
| `src/universo/resources.cljs` | **nuevo** · lógica pura de la lista de recursos del panel |
| `src/universo/events/test.cljs` | evento `:test/escape`; se factorizó `register-response` para que la vía corregida y la del escape no diverjan; sub `:test/escape-summary` |
| `src/universo/components/diagnostic_test.cljs` | los dos botones de escape |
| `src/universo/components/feedback_modal.cljs` | variante de escape del modal (icono, cabecera neutra, nota) |
| `src/universo/profile.cljs` | `:escape` aditivo, nil cuando no hubo |
| `src/universo/events/slots.cljs` | recursos: guardado optimista, toggle optimista y reversible, borrador en `app-db`, duplicar, consultas en paralelo; se fusionó `:admin/cancel-edit-resource` |
| `src/universo/components/admin.cljs` | formulario contra el borrador de `app-db`, ⌘/Ctrl+Enter y Esc, botón Duplicar |
| `src/universo/db.cljs` | `:resource-draft` y `:resource-saving?` en `default-db` |
| `test/universo/irt/escape_test.cljs` | **nuevo** · 13 casos |
| `test/universo/resources_test.cljs` | **nuevo** · 8 casos |
| `supabase/migrations/045_…sql` | **nuevo** · ⏳ **pendiente de aplicar** |
| `supabase/SCHEMA.md` | entrada 47 para `045` |
| `scripts/audit_contraste.py` | dos pares nuevos declarados |
| `adr/ADR-029-…md` | **nuevo** |
| `project-memory/DECISIONS.md` | D-57, D-58 |
| `project-memory/RISKS.md` | R-34 |
| `project-memory/OPEN_QUESTIONS.md` | Q-38, Q-39 |
| `project-memory/BACKLOG.md` | T-96 y T-97 hechas; T-98…T-102 abiertas |
| `public/js/app.js`, `public/css/app.css` | artefactos recompilados |

## Comandos ejecutados y resultados

```
clj -M:test                 → 123 tests / 627 assertions / 0 failures / 0 errors
npx shadow-cljs release app → Build completed. (233 files, 0 warnings)
npm run build:css           → Done in 501ms
python3 scripts/audit_contraste.py   → 40/40 pares cumplen (2 nuevos declarados)
python3 scripts/audit_movil.py       → sin problemas en pantallas del estudiante
python3 scripts/audit_dark_theme.py  → sin texto oscuro sin mapear en componentes alcanzables
python3 scripts/audit_html.py        → index.html y 404.html arrancan igual
graphify update .           → 3048 nodos, snapshot copiado a project-memory/graph/
```

⚠️ **Ojo con el bundle:** `shadow-cljs watch app` escribe en `./public/js`, el **mismo** directorio
que el `release`. Después de una sesión de verificación en local, `public/js/app.js` queda siendo el
build de **desarrollo**. Hay que volver a correr `release app` antes de commitear o se publica el
bundle equivocado. Pasó en esta sesión y se corrigió.

Los cinco `:infer-warning` de `events/auth.cljs` siguen apareciendo: son los conocidos
([[../project-memory/LESSONS_LEARNED]]), no rompen el build.

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| El escape es una tercera categoría de respuesta, con peso 0.0, y son dos botones | **Sí, ADR-029** | `DECISIONS` D-57 |
| No fijar ningún umbral de tasa de escape hasta tener datos de T-90 | Dentro de ADR-029 | `OPEN_QUESTIONS` Q-39 |
| El panel no recarga la sección para reflejar el cambio de una fila | No (no cambia arquitectura) | `DECISIONS` D-58 |
| `resource_misconceptions` nace **admin-only**, y el camino al estudiante irá por una RPC `security definer` | Criterio heredado de 027 / ADR-015 | cabecera de `045`, `SCHEMA.md` |

## Riesgos identificados

| Riesgo | Severidad | Registrado en |
|--------|-----------|---------------|
| El escape se usa como salida fácil y diluye la evidencia del banco | Media (se reactiva **alta** si el escape pasa a tener peso positivo) | `RISKS` R-34 |

## Bloqueos

- **Decisión (humana):** el grafo de prerrequisitos (Q-38) es pedagógico y solo lo puede responder
  el profesor. Bloquea T-98, y con ella el destino real del escape y el mapa (T-101).
- **Dato (humano + campo):** el umbral de tasa de escape (Q-39) sale de T-90.
- **Acceso:** el agente no tiene credenciales de una cuenta de **estudiante**, así que el escape
  **no se probó en vivo**. Tampoco se aplicó `045`: las migraciones se aplican a mano.
- **Herramienta:** el publicador de artifacts estuvo caído toda la sesión.

## Preguntas abiertas nuevas

| Pregunta | Registrada en |
|----------|---------------|
| ¿Cuál es el grafo de prerrequisitos entre los 20 módulos? | `OPEN_QUESTIONS` Q-38 |
| ¿Qué tasa de escape marca un perfil como poco confiable? (y ¿debe el escape tener peso positivo?) | `OPEN_QUESTIONS` Q-39 |

## Supuestos aplicados

Ninguno nuevo en `ASSUMPTIONS.md`. **Es deliberado:** los dos lugares donde habría hecho falta
suponer algo —el grafo de prerrequisitos y el umbral de escape— se dejaron como preguntas abiertas
en vez de como supuestos, porque los dos tienen una fuente concreta y barata para responderlos
(el profesor, y T-90).

Sí quedó **sin verificar** una cifra citada al owner en la discusión de video: los límites vigentes
del tier gratuito de Supabase (almacenamiento y egreso). Se le dijo explícitamente que hay que
comprobarlos antes de comprometer nada.

## Próximos pasos

1. **Pasada con cuenta de estudiante** (no admin) y **merge + publicar**. Lo segundo importa por una
   razón concreta: si T-90 se hace contra producción, producción tiene que llevar este código —
   `main` todavía sirve el bundle sin escape.
2. **T-90** — la hora de clase. Ahora la sesión mide algo: tasa de escape, reparto entre
   `:enunciado` y `:resolucion`, y qué ítems concentran marcas de enunciado.
3. **T-99** — ítems sembrados. **Subió de prioridad con lo medido hoy**: la escala de `difficulty`
   no está validada, y es lo único del backlog nuevo que avanza **G-2** directamente.
4. **Responder Q-38** y sembrar el grafo con una migración `046` (T-98). Desbloquea el destino real
   del escape y, con él, T-101.
5. **T-100** — migrar el diagnóstico y «Mi plan» al lenguaje del panel.
6. **T-101** — el mapa, ya con datos.

## Pendientes

- **Rama `escape-no-se` con 7 commits, sin pushear y sin mergear.** `main` no se tocó. El árbol
  quedó limpio.
- **Probar con una cuenta que NO sea admin.** Todo lo verificado fue con sesión de admin, que ve
  **todos** los bancos (incluidos los `mq_` inactivos de ADR-018) y **salta el filtro de
  prerrequisitos** de `universo.access`. Un estudiante real ve otro catálogo y otro camino de
  entrada. Es lo único que separa a T-96 de estar cerrada del todo.
- **`045` sin aplicar.** No rompe nada: nada la lee todavía.
- **Tres filas de prueba en producción** — tests `294`, `295` y `296`, todas de bancos `mq_` y con la
  conducta **vieja** (θ subiendo). Si se va a calibrar desde `tests`, conviene borrarlas.
- **`ARCHITECTURE.md` no se actualizó.** Correspondería: tres namespaces puros nuevos o tocados
  (`universo.irt.escape`, `universo.resources`) y dos tablas en `045`. Queda para cuando `045` se
  aplique, que es cuando la arquitectura cambia de verdad.
- **`REQUIREMENTS.md` sin el RF del escape** y **`TERMINOLOGY.md` sin la entrada «escape»**.
- El memo de diseño **sí se publicó** finalmente como artifact, tras varios reintentos.

## Actualizaciones requeridas en Project Memory

- [x] `project-memory/CURRENT_STATUS.md`
- [x] `project-memory/BACKLOG.md`
- [x] `project-memory/RISKS.md`
- [x] `project-memory/DECISIONS.md`
- [x] `adr/ADR-029-escape-como-tercera-categoria-de-respuesta.md` (nuevo)
- [ ] `project-memory/ARCHITECTURE.md` — ver "Pendientes"
- [ ] `project-memory/ROADMAP.md` — no cambió ninguna fase
- [ ] `project-memory/REQUIREMENTS.md` — corresponde un RF del escape; no se hizo
- [x] `project-memory/OPEN_QUESTIONS.md`
- [ ] `project-memory/ASSUMPTIONS.md` — ninguno nuevo, a propósito
- [ ] `project-memory/LESSONS_LEARNED.md`
- [ ] `project-memory/TERMINOLOGY.md` — «escape» merece entrada; no se hizo
- [ ] `project-memory/graph/` (snapshot de Graphify)

## Notas

**Por qué esta sesión implementó menos de lo que el owner pidió, y a propósito.**

El pedido era amplio: escape, enganche, editor, incentivos, video, mapa, transiciones, voces. Todo
eso es **construcción de producto**, y `RISKS` R-30 está registrado como el riesgo dominante
justamente porque ese patrón —agregar producto sin resolver distribución— ya mató el proyecto tres
veces. **T-90 cuesta una hora, cero pesos, y el curso ya está ofrecido.**

Se le dijo al owner en una frase y se siguió trabajando, que es lo correcto. Pero el orden se
invirtió a favor suyo: **el escape mínimo se construyó para que T-90 mida algo**, en vez de construir
el mapa y el video para una sesión que todavía no ocurrió. Varias de las decisiones que faltan
—cuánta gente escapa, si el bloqueo es el enunciado o la matemática, cuál es el umbral de
confianza— **son literalmente las observaciones que T-90 existe para recoger**.

**Dos cosas que se dejaron sin hacer estando el owner ausente, y por qué.** Habría alcanzado el
tiempo para escribir el mapa (T-101) y la migración visual (T-100). No se hicieron porque habrían
entrado varios cientos de líneas sin ninguna revisión humana, y en el caso del mapa sobre una tabla
**vacía**, cuyo contenido es una decisión que el agente no puede tomar. Entregar código no revisado
que dibuja datos que no existen es exactamente la forma que toma R-30 dentro de una sesión.

**Un hallazgo que conviene no perder.** La identidad visual de ADR-022/023 está construida, es
buena, y **no llegó al diagnóstico ni a «Mi plan»** — las dos pantallas que más se ven. La medición
está en T-100. Y la razón de que eso se sienta *insulso* en vez de *equivocado* es que
`tailwind.config.js` redefine `indigo` como grafito: los cientos de `bg-indigo-600` heredados salen
grises, no morados. La neutralización evitó que se viera mal, y dejó gris sobre blanco con esquinas
redondeadas y sombra suave.

**Contradicción menor detectada, no corregida:** `CLAUDE.md` §8 dice «74 tests / 410 assertions
(2026-08-12)» y `HANDOFF.md` dice «83 / 454 (2026-08-13)». Hoy son **123 / 627**. Gana el más
reciente por la regla de precedencia, pero conviene que `CLAUDE.md` deje de llevar un número que
envejece en cada sesión.

**La lección que más vale de esta sesión, y no es de código.** El agente entregó T-96 «verificado»
con 117 tests en verde, cuatro auditorías OK y un ADR escrito — y el rasgo central de la
funcionalidad estaba **invertido**. Lo detectó el owner mirando la pantalla, y la causa raíz se
encontró en el histórico de `tests`, no en el código. Dos consecuencias concretas:

1. **«Los tests pasan» no es «funciona».** El test unitario del escape pasaba porque estaba escrito
   sobre el caso cómodo (con evidencia real previa); el fallo vivía en el caso vacío, que es
   justamente el del estudiante que escapa desde la primera pregunta.
2. **La verificación en vivo no era un extra pendiente, era parte del trabajo.** Costó unos minutos
   con una sesión ya abierta y cambió dos conclusiones. Para el diagnóstico y el editor —los dos
   flujos centrales— conviene tratarla como obligatoria antes de dar una tarea por cerrada.
