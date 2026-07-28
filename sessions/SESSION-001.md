# SESSION-001

## Fecha

2026-07-26

## Participantes

- Humano: Jacobo Córdova
- Agente / modelo: Claude Code CLI (Opus 5, 1M context)

## Objetivo de la sesión

Analizar completamente el proyecto y generar la estructura de **Project Memory First (PMF)**:
convertir todo el conocimiento disponible en una memoria persistente, versionada y reutilizable,
integrando Markdown + Git como fuente de verdad, Claude Code CLI como agente de ejecución, Obsidian
como workspace humano y Graphify como grafo del repositorio.

El objetivo no cambió durante la sesión.

## Contexto de entrada

- **Rama:** `cursor/mvp-operable-funnel`
- **Commit inicial:** `48bf525` ("Restaurar el editor de preguntas en el panel de administración")
- **Estado del árbol al empezar:** sucio — `public/js/app.js` modificado (+73/−24) sin commitear;
  `.claude/`, `.cursor/`, `graphify-out/` y `CLAUDE.md` sin trackear (el `CLAUDE.md` previo, con solo
  las reglas de graphify, nunca se había commiteado)
- **Documentos de memoria leídos:** ninguno existía. La documentación disponible era
  `PROJECT_SUMMARY.md`, `README.md`, `supabase/SCHEMA.md`, `supabase/CONTENT.md`,
  `supabase/functions/README.md` y `src/universo/components/mathacademy/ARCHIVE.md`
- **Bloqueos vigentes al empezar:** desconocidos (no había registro)

## Actividades realizadas

1. **Exploración del repositorio:** estructura de archivos, `deps.edn`, `shadow-cljs.edn`,
   `package.json`, `.gitignore`, `CNAME`, `robots.txt`, `sitemap.xml`, `.claude/settings.json`,
   `.cursor/settings.json`.
2. **Lectura de la documentación existente:** `PROJECT_SUMMARY.md`, `supabase/SCHEMA.md`,
   `supabase/CONTENT.md`, `supabase/functions/README.md`.
3. **Análisis del código fuente:** entrada (`core.cljs`), estado (`db.cljs`), ruteo (`views.cljs`,
   `home.cljs`), motor IRT (`components/tetha.cljs`, `irt/progress.cljs`), perfil (`profile.cljs`),
   cupos (`slots/logic.cljs`), eventos de diagnóstico y auth, capa de datos (`db/supabase.cljs`,
   `supabase.cljs`), landing (`components/landing.cljs`), `index.html`.
4. **Análisis de las migraciones SQL:** `admin_rls.sql`, `guestbook_tri_state.sql` y las siete
   migraciones `001`–`007`, más la Edge Function `send-enrollment-emails/index.ts`.
5. **Verificación del estado real** (no solo documentado):
   - `clj -M:test` → **34 tests / 129 assertions / 0 failures, 0 errors**
   - `git log`, `git branch -a`, `git diff --stat`, `git ls-files`
   - grep de requires para determinar qué namespaces son alcanzables desde `core.cljs`
6. **Graphify:** verificación del grafo existente y regeneración del reporte y la visualización con
   `graphify cluster-only . --no-label` → 105 nodos, 147 aristas, 13 comunidades. Snapshot copiado a
   `project-memory/graph/`.
7. **Generación de la estructura PMF completa** (ver "Archivos modificados").

**Lo que no funcionó / hallazgos por el camino:**

- `graphify explain "IRT diagnostic test and theta estimation"` y
  `graphify query "core entry point routing and view dispatch"` devolvieron **"No matching nodes
  found"** pese a que ambas cosas existen en el código. Investigado: el manifest de Graphify indexa
  33 archivos (Markdown, SQL, JSON, HTML, TS, PNG y el `app.js` compilado) y **ningún `.cljs`**. Es una
  limitación estructural que quedó documentada como riesgo R-20, lección L-23 y tarea T-32, con
  advertencias en `CLAUDE.md` §13, `ARCHITECTURE` §11 y `GRAPHIFY_INTEGRATION_GUIDE` §6.
- Varias comunidades del grafo (0, 2, 5, 6) son ruido: secciones de `package.json` y el runtime
  compilado de shadow-cljs. Documentado para que nadie las interprete como subsistemas.

## Archivos revisados

`PROJECT_SUMMARY.md`, `README.md`, `CLAUDE.md`, `deps.edn`, `shadow-cljs.edn`, `package.json`,
`.gitignore`, `CNAME`, `robots.txt`, `sitemap.xml`, `index.html`, `public/index.html`,
`.claude/settings.json`, `.cursor/settings.json`,
`src/universo/{core,db,views,home,subs,supabase,profile}.cljs`,
`src/universo/db/{crud,supabase}.cljs` (parcial),
`src/universo/components/{tetha,landing}.cljs`, `src/universo/irt/progress.cljs`,
`src/universo/slots/logic.cljs`, `src/universo/events/{test,auth}.cljs` (parcial),
`supabase/{SCHEMA,CONTENT}.md`, `supabase/functions/README.md`,
`supabase/functions/send-enrollment-emails/index.ts`, `supabase/admin_rls.sql`,
`supabase/guestbook_tri_state.sql`, `supabase/migrations/001`–`007`,
`graphify-out/{GRAPH_REPORT.md,manifest.json}`.

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `CLAUDE.md` | Reescrito como punto de entrada PMF (13 secciones: resumen, objetivos, stack, arquitectura, convenciones, seguridad, testing, despliegue, referencias, reglas de memoria, orden de lectura, graphify). Se conservaron las reglas de graphify originales, ampliadas con la limitación de `.cljs` |
| `project-memory/INDEX.md` | **Nuevo** — mapa de contenidos |
| `project-memory/HANDOFF.md` | **Nuevo** — continuidad sin el chat original |
| `project-memory/PROJECT_BRIEF.md` | **Nuevo** |
| `project-memory/BUSINESS_CONTEXT.md` | **Nuevo** |
| `project-memory/REQUIREMENTS.md` | **Nuevo** — 9 grupos de RF con evidencia, 15 RNF, 17 reglas de negocio, 8 casos de uso, criterios de aceptación |
| `project-memory/TECH_STACK.md` | **Nuevo** |
| `project-memory/ARCHITECTURE.md` | **Nuevo** — componentes, modelo de datos, 4 flujos, integraciones, infra, seguridad, 10 riesgos arquitectónicos, relación con Graphify |
| `project-memory/CURRENT_STATUS.md` | **Nuevo** |
| `project-memory/ROADMAP.md` | **Nuevo** — F0–F11 reconstruidas + propuestas, 11 hitos |
| `project-memory/BACKLOG.md` | **Nuevo** — 7 épicas, 33 tareas con criterios de terminado |
| `project-memory/RISKS.md` | **Nuevo** — 22 riesgos activos + 7 cerrados |
| `project-memory/DECISIONS.md` | **Nuevo** — índice de ADRs, 16 decisiones menores, 10 decisiones pendientes |
| `project-memory/OPEN_QUESTIONS.md` | **Nuevo** — 20 preguntas + 7 contradicciones detectadas |
| `project-memory/ASSUMPTIONS.md` | **Nuevo** — 29 supuestos con forma de validarlos |
| `project-memory/DEPENDENCIES.md` | **Nuevo** — externas, librería, internas, humanas |
| `project-memory/TERMINOLOGY.md` | **Nuevo** — glosario de IRT, PAES, producto, código y metodología |
| `project-memory/LESSONS_LEARNED.md` | **Nuevo** — 27 lecciones (síntoma → causa → regla) |
| `project-memory/AGENT_INSTRUCTIONS.md` | **Nuevo** — 11 secciones de reglas obligatorias |
| `project-memory/OBSIDIAN_WORKSPACE_GUIDE.md` | **Nuevo** |
| `project-memory/GRAPHIFY_INTEGRATION_GUIDE.md` | **Nuevo** |
| `project-memory/graph/{GRAPH_REPORT.md,graph.json,graph.html}` | **Nuevo** — snapshot versionado del grafo al commit `48bf5254` |
| `adr/ADR-TEMPLATE.md` | **Nuevo** |
| `adr/ADR-001`…`ADR-010` | **Nuevos** — 9 retroactivos + ADR-010 (adopción de PMF) |
| `sessions/SESSION_TEMPLATE.md` | **Nuevo** |
| `sessions/SESSION-001.md` | **Nuevo** — este archivo |
| `prompts/*.md` | **Nuevos** — 11 prompts (bootstrap, cierre de memoria, y 9 por tipo de tarea) |
| `docs/README.md` | **Nuevo** — qué va en `docs/` |

**Código de la aplicación: sin cambios.** Esta sesión fue exclusivamente de documentación.

## Comandos ejecutados y resultados

```
clj -M:test                        → Ran 34 tests containing 129 assertions.
                                     0 failures, 0 errors.
                                     (con :infer-warning conocidos en events/auth.cljs:172,193)
git log --oneline -30              → OK; 48bf525 en HEAD
git branch -a                      → 12 ramas locales, 11 remotas
git diff --stat                    → public/js/app.js | 97 +++--- (73 ins, 24 del)
git ls-files src/universo/user.cljs → trackeado (aunque esté en .gitignore)
graphify cluster-only . --no-label → 105 nodos, 147 aristas, 13 comunidades.
                                     GRAPH_REPORT.md, graph.json y graph.html regenerados
cp graphify-out/{…} project-memory/graph/ → snapshot versionado
```

**No se ejecutó** `shadow-cljs release app` ni `build:css`: no hubo cambios de código y el estado del
bundle es un pendiente a resolver deliberadamente por el owner (T-08).

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| Adoptar Project Memory First con la jerarquía Git > Claude Code > Obsidian > Graphify | Sí | `adr/ADR-010-adopcion-project-memory-first.md` |
| Documentar retroactivamente 9 decisiones estructurales ya tomadas de facto en el código | Sí (ADR-001..009) | `adr/`, marcadas como reconstruidas |
| El snapshot versionado del grafo vive en `project-memory/graph/`; `graphify-out/` queda como directorio de trabajo | No (menor) | `DECISIONS.md` D-14 |
| La documentación de la memoria se escribe en español | No (menor) | `DECISIONS.md` D-15 |
| Enlaces internos estilo `[[ARCHIVO]]` en toda la memoria | No (menor) | `DECISIONS.md` D-16 |

## Riesgos identificados

Se documentaron **22 riesgos activos**. Los identificados o precisados en esta sesión:

| Riesgo | Severidad | Registrado en |
|--------|-----------|---------------|
| Bus factor = 1 (owner es desarrollador, autor de contenido y operador) | Alta | RISKS R-01 |
| Se desarrolla contra la base de producción; sin staging | Alta | R-02 |
| Sin respaldo propio verificado de la base de datos | Alta | R-03 |
| Datos personales de menores sin aviso de privacidad publicado | Alta | R-06 |
| RLS es el único control de autorización, sin verificación automatizada | Alta | R-14 |
| "Mi plan" vacío por falta de contenido publicado | Alta | R-10 |
| Bundle publicado potencialmente desalineado del fuente (estado actual) | Media-alta | R-13 |
| Graphify no indexa `.cljs`: el grafo es ciego a la lógica principal | Media | R-20 |
| Deuda de ramas (12 locales / 11 remotas sin documentar) | Media | R-21 |
| Estacionalidad PAES: ventana de captación estrecha | Media-alta | R-19 |

## Bloqueos

Ninguno para esta sesión (era de documentación). Los bloqueos **del proyecto** quedaron registrados en
`CURRENT_STATUS.md` §6:

- **BL-01** Contenido pedagógico sin publicar — humano (owner)
- **BL-02** Envío de email sin verificar — requiere acceso al proyecto Supabase
- **BL-03** Cupos reales sin definir — negocio/logística
- **BL-04** Árbol sucio (`public/js/app.js`) — técnico
- **BL-05** Preguntas de producto sin responder — decisión del owner

## Preguntas abiertas nuevas

Se registraron **20 preguntas** y **7 contradicciones**. Las más importantes:

| Pregunta | Registrada en |
|----------|---------------|
| ¿Las clases de los cupos tienen costo? | OPEN_QUESTIONS Q-02 |
| ¿La inscripción respeta `capacity`? | Q-04 |
| ¿Están calibradas las `difficulty` del banco? | Q-05 |
| ¿Todos los `topic` están mapeados a un módulo? | Q-06 |
| ¿Qué semántica tiene repetir el diagnóstico (la FAQ promete histórico)? | Q-07 |
| ¿Qué policy usa el estudiante para leer `questions`? | Q-12 |
| ¿Qué versión está realmente en producción? | Q-13 |
| ¿La fase F11 propuesta refleja la intención del owner? | Q-14 |

**Contradicciones detectadas:** la FAQ afirma que el tiempo de respuesta influye en la estimación (el
modelo 1PL no lo usa); la FAQ promete ver la evolución del nivel al repetir el diagnóstico (sin
histórico); `007` restringe `questions` a admin pero el estudiante debe leerlas; `.gitignore` ignora un
archivo trackeado; shadow-cljs y KaTeX con versiones desalineadas; `PROJECT_SUMMARY.md` describe una
estructura previa al MVP. Todas en `OPEN_QUESTIONS.md` §Contradicciones.

## Supuestos aplicados

Se registraron **29 supuestos** en `ASSUMPTIONS.md`. Los aplicados **en esta sesión** para poder
documentar:

- **A-25:** la reconstrucción histórica de fases y ADRs refleja la intención original del owner.
  Los nueve ADRs retroactivos están marcados como tales y Q-14 pide validación explícita.
- Las migraciones `006` y `007` se asumen **aplicadas** en producción porque el panel de administración
  (edición de preguntas, gestión de roles) está operativo. Registrado en `CURRENT_STATUS.md` §3 con esa
  justificación.
- Los namespaces no alcanzables desde `core.cljs` se asumen fuera del bundle (A-22), verificado por
  grep de requires pero no inspeccionando el bundle.

## Próximos pasos

1. **Owner: validar la reconstrucción** — revisar `ROADMAP.md` (F0–F11) y los ADRs retroactivos, y
   corregir lo que no corresponda a la intención real (Q-14).
2. **Responder las preguntas de producto** Q-02, Q-04, Q-07, Q-09 — desbloquean T-03, T-04, T-26.
3. **T-19 / T-08:** verificar qué hay en producción y resolver el árbol sucio (recompilar el bundle o
   descartar los cambios).
4. **T-03:** leer los triggers de `001_mvp_schema.sql` y verificar el control de `capacity`.
5. **T-02:** cerrar el pipeline de email (aplicar `005`, desplegar la function, secret, cron, verificar
   una fila `sent`).
6. **T-01:** publicar al menos un recurso por módulo prioritario — es el paso que más cambia la
   experiencia del estudiante.
7. **T-06 / T-07 / T-10:** CI con `clj -M:test`, respaldo probado y aviso de privacidad antes de abrir
   a público real.

## Pendientes

- **`project-memory/` y el resto de la estructura PMF están sin commitear.** Falta `git add` + commit
  (el owner decide el mensaje y si va en esta rama o en `main`).
- **`public/js/app.js` sigue modificado sin commitear.** No se tocó a propósito: decidir si se
  recompila y commitea o se descarta es del owner (T-08).
- **`PROJECT_SUMMARY.md` no se modificó.** Convive con la memoria nueva y contiene datos
  desactualizados (X-07, T-33). Se decidió no tocarlo en esta sesión para no destruir información sin
  decisión explícita del owner.
- **Los Canvas de Obsidian** sugeridos en `OBSIDIAN_WORKSPACE_GUIDE` §5 (arquitectura, roadmap, funnel)
  no se crearon: requieren la aplicación.
- **`docs/` queda casi vacío** (solo su `README.md`): es el lugar previsto para diagramas,
  procedimientos operativos (respaldo, T-07) y consultas de métricas (T-21).

## Actualizaciones requeridas en Project Memory

- [x] `project-memory/CURRENT_STATUS.md` — creado con el estado verificado al 2026-07-26
- [x] `project-memory/BACKLOG.md` — 33 tareas derivadas del análisis
- [x] `project-memory/RISKS.md` — 22 riesgos activos + 7 cerrados
- [x] `project-memory/DECISIONS.md` — índice + decisiones menores + pendientes
- [x] `adr/ADR-001`…`ADR-010` — 10 ADRs + plantilla
- [x] `project-memory/ARCHITECTURE.md`
- [x] `project-memory/ROADMAP.md`
- [x] `project-memory/REQUIREMENTS.md`
- [x] `project-memory/OPEN_QUESTIONS.md`
- [x] `project-memory/ASSUMPTIONS.md`
- [x] `project-memory/LESSONS_LEARNED.md`
- [x] `project-memory/TERMINOLOGY.md`
- [x] `project-memory/graph/` — snapshot al commit `48bf5254`
- [ ] Commit de todo lo anterior — **pendiente, lo decide el owner**

## Notas

- **El hallazgo más importante de la sesión** no está en el código: es que el proyecto está a tres
  tareas humanas (contenido, email, cupos reales) de poder abrir a estudiantes, y a la vez tiene dos
  riesgos altos sin mitigar que se activan justo al abrir (privacidad de menores y ausencia de respaldo
  verificado). El orden recomendado en `ROADMAP` F8 refleja eso.
- **El motor IRT está mejor construido de lo que la documentación previa sugería.** Las salvaguardas
  (prior MAP, límite de paso, ventana ampliable, parada por SE) están todas justificadas en los
  comentarios del propio código; por eso ADR-004 pudo reconstruirse con confianza. Su debilidad no es
  el algoritmo, es la calidad de las `difficulty` de entrada (R-17).
- **Advertencia para la próxima sesión:** los hooks de `.claude/settings.json` exigen usar `graphify`
  antes de leer archivos, pero el grafo no indexa `.cljs`. Cumple el hook y luego lee `src/` guiado por
  `ARCHITECTURE.md` §2 — un "No matching nodes found" no significa que el código no exista.

---

Relacionado: [[../project-memory/CURRENT_STATUS]] · [[../adr/ADR-010-adopcion-project-memory-first]] ·
[[../project-memory/HANDOFF]]
