# GRAPHIFY_INTEGRATION_GUIDE

Última actualización: **2026-07-26**

Cómo usar **Graphify** como *Repository Knowledge Graph* dentro del framework **Project Memory
First**.

> **Regla de gobernanza número 3:** Graphify es una **herramienta de análisis técnico**, no la fuente
> de verdad. Sus artefactos son **evidencia**; la interpretación oficial vive en [[ARCHITECTURE]] y en
> los ADRs.

---

## 1. Qué es y qué produce

Graphify analiza el repositorio y construye un grafo de conocimiento con:

- **Nodos** — archivos, tablas, conceptos documentados, símbolos.
- **Aristas** — relaciones (`references`, `conceptually_related_to`, imports…), marcadas como
  `EXTRACTED` (leídas del código) o `INFERRED` (razonadas por el modelo, con nivel de confianza).
- **Comunidades** — grupos densamente conectados ≈ subsistemas.
- **God nodes** — nodos con más conexiones ≈ abstracciones centrales.
- **Hiperaristas** — relaciones entre más de dos nodos ≈ flujos o procesos completos.
- **Knowledge gaps** — nodos aislados, comunidades débiles: posibles huecos de documentación.

Artefactos:

| Archivo | Qué es | Para qué |
|---------|--------|----------|
| `GRAPH_REPORT.md` | Reporte legible: resumen, god nodes, comunidades, hiperaristas, conexiones sorprendentes, huecos, preguntas sugeridas | Revisión arquitectónica amplia, onboarding |
| `graph.json` | El grafo completo (~86 KB) | Insumo de `query` / `path` / `explain`; diffs entre versiones |
| `graph.html` | Visualización interactiva (~90 KB) | Explorar visualmente; mostrar el sistema a alguien |

---

## 2. Dónde viven los artefactos

```
graphify-out/                     ← directorio de TRABAJO de la herramienta (no versionado)
├── graph.json                       vivo, lo actualiza `graphify update .`
├── GRAPH_REPORT.md
├── graph.html
├── manifest.json                    hashes por archivo (control de incrementalidad)
├── cache/  ·  2026-07-26/           caché y respaldos automáticos
└── .graphify_*                      metadatos internos

project-memory/graph/             ← SNAPSHOT versionado en Git (la memoria)
├── GRAPH_REPORT.md                  copia citable, atada a un commit
├── graph.json
└── graph.html
```

**Por qué dos lugares** ([[DECISIONS]] D-14): `graphify-out/` es reproducible y cambia
constantemente; versionarlo llenaría el historial de ruido binario-ish. El snapshot en
`project-memory/graph/` es lo que un lector futuro puede **citar**: "al commit `48bf5254` el grafo
tenía 105 nodos y estas comunidades". Es memoria, no herramienta.

**Cómo refrescar el snapshot:**

```bash
graphify update .                 # re-extrae lo que cambió (AST, sin costo de API)
graphify cluster-only . --no-label # re-agrupa y regenera GRAPH_REPORT.md + graph.html
cp graphify-out/{GRAPH_REPORT.md,graph.json,graph.html} project-memory/graph/
```

`--no-label` evita la llamada a un LLM para nombrar comunidades (quedan como "Community N"). Sin esa
bandera, los nombres son más útiles pero hay costo de API; decide según el momento.

---

## 3. Cuándo ejecutar Graphify

| Momento | Comando | Por qué |
|---------|---------|---------|
| **Antes** de un cambio estructural | `graphify query "…"` / `path` / `explain` | Ver qué toca el cambio antes de tocarlo |
| **Después** de modificar código | `graphify update .` | Mantener el grafo al día (lo exige `../CLAUDE.md` §13) |
| Al **cerrar sesión** con cambios de código | `update` + `cluster-only` + copiar snapshot | Que la memoria y el grafo apunten al mismo commit |
| **Onboarding** de alguien nuevo | leer `GRAPH_REPORT.md` + abrir `graph.html` | Mapa rápido del repositorio |
| **Revisión arquitectónica** amplia | `GRAPH_REPORT.md` completo | God nodes, ciclos, comunidades débiles |
| **Duda puntual** sobre una relación | `graphify path "A" "B"` | Subgrafo mínimo en vez de grep masivo |

**Cuándo NO ejecutarlo:** para responder una pregunta sobre una función ClojureScript concreta (no
está en el grafo, ver §6) o para verificar el estado del proyecto (eso es [[CURRENT_STATUS]]).

---

## 4. Comandos útiles

```bash
graphify query "¿cómo se relacionan class_slots y notifications?"   # subgrafo acotado
graphify explain "email_outbox"                                     # nodo + vecinos
graphify path "Tabla modules" "Tabla resources"                     # camino más corto
graphify update .                                                   # actualizar (incremental)
graphify update . --force                                           # tras borrar código (menos nodos)
graphify cluster-only . --no-label                                  # re-agrupar sin costo de API
graphify diagnose multigraph                                        # riesgo de colapso de aristas
```

En este repositorio, los hooks de `.claude/settings.json` **exigen** a los agentes usar `graphify`
antes de `Bash|Grep` y `Read|Glob`. Cúmplelo, con la advertencia del §6 muy presente.

---

## 5. Estado del snapshot actual

Al **2026-07-26**, commit `48bf5254`:

```
105 nodos · 147 aristas · 13 comunidades (11 mostradas, 2 delgadas omitidas)
92 % EXTRACTED · 8 % INFERRED (12 aristas, confianza media 0.74) · 0 % AMBIGUOUS
Ciclos de importación: ninguno
Costo de tokens: 0 (modo cluster-only sin etiquetado)
```

**God nodes:**

| # | Nodo | Aristas | Lectura |
|---|------|---------|---------|
| 1 | `Schema Supabase — Academia Integral MVP` | 16 | El esquema es el centro del sistema: coherente con "el estado vive en Postgres" |
| 2 | `Universo Project Summary` | 11 | La doc histórica es un hub de navegación — señal de que había que reemplazarla por PMF |
| 3 | `index.html — Landing PAES` | 9 | La landing concentra SEO, JSON-LD y marca |
| 4 | `Funnel MVP Operable` | 6 | El funnel existe como concepto documentado, no solo como código |
| 5 | `Tabla class_slots` / `Tabla modules` | 6 | Las dos tablas más conectadas del MVP |

**Hiperaristas** (confirman los flujos de [[ARCHITECTURE]] §4):

1. *Funnel MVP*: `questions` → `student_profiles` → `resources` → `class_slots` → `enrollments` →
   `notifications` (0.90)
2. *Pipeline de email de cohorte*: confirmación → `notifications` → `email_outbox` → Resend (0.90)
3. *Set de iconos de marca* referenciado por ambos landings (0.85)

**Knowledge gaps reportados:** 27 nodos aislados (`autoprefixer`, `postcss`, `shadow-cljs`,
`tailwindcss`, `@supabase/supabase-js`…) y 2 comunidades delgadas. **Interpretación:** en su mayoría
son entradas de `package.json` sin relaciones semánticas reales — un artefacto de la extracción, no un
hueco de documentación. Las comunidades 0, 5 y 6 son literalmente las secciones de `package.json`.

**Aristas inferidas que el reporte pide verificar:** las de `index.html` hacia
`Supabase Backend` y `shadow-cljs / Tailwind Build Pipeline` provienen de `PROJECT_SUMMARY.md`. Son
plausibles pero indirectas: `index.html` no importa nada de eso. **Veredicto: no usarlas como
evidencia.**

---

## 6. ⚠️ Limitación crítica: el grafo no indexa ClojureScript

**Esto es lo más importante de este documento.**

El manifest actual (`graphify-out/manifest.json`) indexa **33 archivos**: Markdown, SQL, JSON, HTML,
TS, PNG y el `app.js` compilado. **Ningún `.cljs`.**

Consecuencia: **las ~10 290 líneas de ClojureScript que contienen todo el producto —el motor IRT, el
perfil, la lógica de cupos, los eventos, los componentes— son invisibles para el grafo.**

Evidencia reproducible:

```bash
$ graphify explain "IRT diagnostic test and theta estimation"
No node matching '...' found.
$ graphify query "core entry point routing and view dispatch"
No matching nodes found.
```

Ambas cosas **existen** en el código (`universo.components.tetha`, `universo.core`).

**Reglas que se derivan:**

1. **"No matching nodes found" NO significa "no existe".** Significa "no está indexado". Nunca
   concluyas que una funcionalidad falta a partir de un grafo vacío (L-23).
2. **Para lógica ClojureScript**, el mapa es [[ARCHITECTURE]] §2 (componentes) y [[TECH_STACK]] §4
   (estructura de `src/`), y luego se lee `src/` de forma dirigida.
3. **Para lo que el grafo SÍ cubre bien** —esquema de datos, migraciones, documentación, landing y
   SEO, Edge Function— es genuinamente útil y ahorra búsquedas.
4. Los nodos derivados de `public/js/app.js` (`evalFetch()`, `fetch()`, `loadPending()`, "FIXME:
   check status"…) son del **runtime compilado de shadow-cljs**, no código del proyecto. La comunidad
   2 completa es ruido: **ignórala**.

Tarea abierta: [[BACKLOG]] T-32 (extender la cobertura a `.cljs` o documentar definitivamente que no
es posible). Riesgo asociado: R-20.

---

## 7. Cómo usar `GRAPH_REPORT.md` antes de un cambio importante

Procedimiento para un cambio estructural (esquema, integración, flujo):

1. **Localiza el área** en el reporte: ¿aparece como god node? ¿en qué comunidad está?
2. **Sigue las hiperaristas** que lo incluyen: te dicen el proceso completo del que participa. Si vas
   a tocar `class_slots`, la hiperarista del funnel te avisa que `enrollments` y `notifications`
   están en el mismo flujo.
3. **Consulta `graphify explain "<nodo>"`** para ver los vecinos directos.
4. **Cruza con la memoria:** ¿hay un ADR sobre esto ([[DECISIONS]])? ¿un riesgo ([[RISKS]])? ¿una
   pregunta abierta ([[OPEN_QUESTIONS]])?
5. **Completa con `src/`** lo que el grafo no ve (§6).
6. **Decide y documenta**: si la decisión es relevante, ADR antes de implementar.

Ejemplo real, "quiero agregar control de capacidad al inscribirse" (T-03):

- El grafo sitúa `class_slots` y `enrollments` en la misma hiperarista del funnel → el cambio afecta
  al flujo completo, no a una tabla aislada.
- El reporte no muestra la lógica del cliente → hay que leer `src/universo/slots/logic.cljs` y
  `src/universo/events/slots.cljs`.
- [[RISKS]] R-08 avisa que la regla está duplicada cliente/DB → hay que tocar las dos.
- [[OPEN_QUESTIONS]] Q-04 dice que ni siquiera está verificado si el control existe → primero leer el
  trigger de `001`.

Eso es el uso correcto: **el grafo acota el radio de impacto; la memoria dice qué está decidido; el
código dice qué pasa hoy.**

---

## 8. Relacionar hallazgos de Graphify con ARCHITECTURE.md

[[ARCHITECTURE]] §11 contiene el resumen oficial de lo que el grafo mostró, incluida su limitación.
Cómo mantener esa relación sana:

| Hallazgo del grafo | Qué hacer en la memoria |
|--------------------|-------------------------|
| Un **god node** que [[ARCHITECTURE]] no menciona como componente principal | O el documento está incompleto (agregarlo) o el nodo es un artefacto (anotarlo como ruido conocido) |
| Una **hiperarista** que describe un flujo no documentado | Agregar el flujo a [[ARCHITECTURE]] §4 |
| Un **ciclo de importación** | Riesgo técnico → [[RISKS]] + probablemente ADR para romperlo |
| Una **comunidad de baja cohesión** que corresponde a un módulo real | Candidato a refactor → [[BACKLOG]] |
| Un **nodo aislado** que debería estar conectado | Hueco de documentación → escribirlo, o registrar la pregunta |
| Una **conexión sorprendente** `EXTRACTED` | Acoplamiento no documentado → [[DEPENDENCIES]] §3 |
| Una **conexión sorprendente** `INFERRED` | **Verificar antes de creerla.** Si es falsa, anotarlo aquí para no re-descubrirlo |

**Regla de oro:** el grafo puede *provocar* una actualización de la memoria, pero nunca la
*sustituye*. Un hallazgo sin interpretación escrita en la memoria se pierde en la siguiente
regeneración del grafo.

---

## 9. Cuándo un hallazgo de Graphify justifica un ADR

Crea un ADR si el grafo revela:

1. **Una dependencia crítica no documentada** (algo que rompe si se toca y nadie lo sabía).
2. **Un ciclo de importación** — romperlo cambia la estructura.
3. **Un god node con demasiada responsabilidad** y decides descomponerlo (o decides **no** hacerlo:
   eso también es una decisión que merece registro).
4. **Un acoplamiento entre subsistemas** que se creían independientes.
5. **Un patrón implícito** que conviene volver explícito y obligatorio (p. ej. "todo I/O pasa por
   `db.crud`", que hoy es ADR-009).

**No** crees un ADR por: un nodo aislado, una comunidad de baja cohesión sin plan de acción, o una
arista inferida no verificada. Eso va a [[BACKLOG]] o a [[OPEN_QUESTIONS]].

---

## 10. Graphify para onboarding técnico

Ruta de 30 minutos para alguien nuevo (humano o agente):

1. **[[HANDOFF]]** — qué es el proyecto y dónde está (10 min). *Primero la memoria, siempre.*
2. **`project-memory/graph/graph.html`** — abrir en el navegador y explorar el grafo (5 min): da la
   escala y la forma del repositorio de un vistazo.
3. **`GRAPH_REPORT.md`** §God Nodes y §Hyperedges (5 min) — cuáles son las piezas centrales.
4. **[[ARCHITECTURE]]** §1–§4 (10 min) — la interpretación oficial, incluyendo todo lo que el grafo no
   ve.
5. Luego, según la tarea, `graphify explain "<lo que toque>"` + lectura dirigida de `src/`.

**Advertencia obligatoria para el onboarding:** decir explícitamente que el grafo no incluye el
ClojureScript. Sin esa advertencia, quien empiece por el grafo concluirá que el proyecto es
"documentación + SQL", que es exactamente al revés de donde está la complejidad.

---

## 11. Graphify para revisión de impacto antes de modificar código

Checklist previo a un cambio no trivial:

- [ ] `graphify query "<área que voy a tocar>"` — ¿qué nodos aparecen?
- [ ] ¿El nodo está en alguna **hiperarista**? Entonces el cambio afecta a un flujo completo.
- [ ] ¿Es un **god node**? Entonces el radio de impacto es amplio: más pruebas, cambio más pequeño.
- [ ] `graphify path "<lo que cambio>" "<lo que temo romper>"` — ¿hay camino? ¿de qué largo?
- [ ] ¿Alguna arista involucrada es `INFERRED`? **Verifícala leyendo el código antes de confiar.**
- [ ] ¿Qué parte del impacto es ClojureScript y por lo tanto **invisible** en el grafo? Esa parte se
      revisa a mano con [[ARCHITECTURE]] §2 y §8 (dependencias internas).
- [ ] ¿Hay una regla **espejo** (cliente + SQL) en juego? ([[RISKS]] R-08)
- [ ] `clj -M:test` antes y después.

---

## 12. Cómo evitar que Graphify reemplace la documentación oficial

Cinco reglas:

1. **El grafo se regenera; la memoria se escribe.** Un `GRAPH_REPORT.md` nuevo borra el anterior. Un
   hallazgo que solo vive en el reporte tiene fecha de caducidad.
2. **El grafo describe, no decide.** Puede mostrar que dos módulos están acoplados; no puede decir si
   eso es un problema, si fue intencional, o qué se decidió al respecto. Eso son los ADRs.
3. **El grafo no tiene contexto de negocio.** No sabe que "Mi plan" vacío es el riesgo de producto más
   urgente, ni que el contenido pedagógico es el cuello de botella.
4. **El grafo tiene puntos ciegos** y este los tiene grandes (§6). Presentarlo como el mapa completo
   del sistema sería directamente engañoso.
5. **Nunca cites el grafo en lugar de la memoria.** En un session log escribe "el grafo muestra X, lo
   registré en [[ARCHITECTURE]] §N", no solo "ver GRAPH_REPORT".

**Precedencia definitiva:** [[ARCHITECTURE]] > `GRAPH_REPORT.md`. Si difieren, o el documento está
desactualizado (corrígelo) o el grafo está mal (anótalo aquí en §5 como ruido conocido).

---

## 13. Mantenimiento

| Frecuencia | Acción |
|-----------|--------|
| Tras cada cambio de código | `graphify update .` |
| Al cerrar una sesión con cambios de código | `update` + `cluster-only` + copiar snapshot a `project-memory/graph/` |
| Tras un refactor que **borra** código | `graphify update . --force` (si no, se niega a escribir un grafo con menos nodos) |
| Cada vez que se refresca el snapshot | Verificar que el commit del reporte coincida con `HEAD` |
| Al actualizar la herramienta | Revisar si ya indexa `.cljs` (T-32) y actualizar §6 |

**Verificación de frescura:**

```bash
git rev-parse HEAD
head -15 project-memory/graph/GRAPH_REPORT.md   # línea "Built from commit:"
```

Si no coinciden, el snapshot está viejo: refréscalo o adviértelo explícitamente antes de usarlo.

**Nota de portabilidad:** los hooks de `.claude/settings.json` invocan
`/opt/anaconda3/bin/graphify` (ruta absoluta de la máquina del owner). En otra máquina fallarán;
quien clone el repositorio deberá ajustar esa ruta ([[DEPENDENCIES]] §2).

---

Relacionado: [[ARCHITECTURE]] §11 · [[OBSIDIAN_WORKSPACE_GUIDE]] §10 · [[AGENT_INSTRUCTIONS]] §10 ·
[[RISKS]] R-20 · [[BACKLOG]] T-31, T-32 · `graph/GRAPH_REPORT.md`
