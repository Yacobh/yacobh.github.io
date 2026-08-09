# SESSION-015

## Fecha

2026-08-09

## Participantes

- Humano: Jacobo Córdova
- Agente / modelo: Claude Code CLI (Opus 5)

## Objetivo de la sesión

El owner pidió un análisis estratégico de los recursos de aprendizaje: qué dice la documentación,
si hay plan de mejora, y si se puede usar IA para fabricarlos, con la visión de largo plazo como
norte. Del análisis salió un defecto de producto concreto y el owner pidió arreglarlo primero;
ese arreglo (T-53) es el trabajo de código de esta sesión.

## Contexto de entrada

- Rama: `main` @ `d31449c` (tras el merge de SESSION-014).
- Estado del árbol al empezar: limpio.
- Documentos leídos: `VISION_LIBRO_PROYECTO.md`, `adr/ADR-005-banco-de-items-en-vez-de-cms.md`,
  `supabase/CONTENT.md`, `BACKLOG.md` épica E5 completa, `AGENT_INSTRUCTIONS.md`.
- Código leído: `components/plan.cljs`, `events/plan.cljs`, `db/crud.cljs` (recursos),
  `profile.cljs` (construcción de déficits), `001_mvp_schema.sql` (tabla `resources`),
  `018_baldor_resources.sql`.
- `clj -M:test` de partida: **42 tests / 162 assertions / 0 failures**.

## Actividades realizadas

1. **Análisis estratégico de contenido** (entregado en conversación, no como documento):
   - ADR-005 define dos capas con prioridad: capa 0 (`error_*`, el diferencial) y capa 1
     (`resources`). Acepta explícitamente no tener versionado, previsualización ni editor.
   - Estado medido del contenido: 61 recursos (58 publicados), tipos ~40 `text` / 1 `exercise` /
     1 `video_url`, cobertura 11 de 18 módulos (geometría sin fuente).
   - Dos brechas estructurales identificadas: (a) los recursos cuelgan de un módulo, **no de una
     misconception**, así que no hay puente entre el diagnóstico y el remedio; (b) casi no hay
     práctica (1 solo `exercise`), pese a que la visión §3.1 la pone como paso 4 de cada unidad.
   - Sobre IA: la recomendación fue usarla **en el pipeline de autoría** (offline, revisada,
     versionada como migración — patrón ya probado en `018`/`019` + auditoría de T-01), y **no en
     runtime**, porque ADR-002 no deja dónde poner una API key sin Edge Function nueva y costo por
     estudiante, lo que rompería el objetivo de infra ≈ $0.
2. **Hallazgo que motivó el trabajo de código:** siguiendo la ruta real de los recursos se
   encontró que "Recursos recomendados" mostraba la biblioteca completa. Detalle de los tres
   defectos encadenados en [[../project-memory/BACKLOG]] T-53.
3. **T-53 implementado** (rama `fix-recursos-plan-sin-personalizar`):
   - `universo.plan` (namespace puro nuevo) con `resources-for-deficits` →
     `{:kind :personalized|:general :resources [...]}`, orden por severidad del déficit.
   - `:plan/resources` pasa de leer estado a derivarlo en la suscripción — **esto elimina una
     carrera** entre `[:profile/load]` y `[:plan/load-resources]`, que se despachan en paralelo
     desde `:plan/enter` y hacían que el filtrado dependiera de cuál respuesta llegara primero.
   - UI: título distinto + aviso ámbar explícito cuando no se pudo personalizar.
   - Limpieza asociada: borradas `crud/fetch-resources-for-modules` (ignoraba su parámetro, sin
     llamadores tras el cambio) y la clave muerta `:plan :deficit-slugs` de `default-db`.

**Decisión de diseño que vale explicar:** se evaluó dejar la sección vacía cuando no hay
coincidencias (opción más "pura"), y se descartó. El defecto no era mostrar material, era
**presentarlo como recomendación personalizada**. Rotularlo honestamente conserva el valor sin
mentir, y es coherente con T-24.

## Archivos revisados

- `project-memory/VISION_LIBRO_PROYECTO.md`, `adr/ADR-005-banco-de-items-en-vez-de-cms.md`,
  `supabase/CONTENT.md`, `project-memory/BACKLOG.md` (E5), `project-memory/AGENT_INSTRUCTIONS.md`
- `src/universo/components/plan.cljs`, `src/universo/events/plan.cljs`, `src/universo/db/crud.cljs`,
  `src/universo/profile.cljs`, `src/universo/catalog.cljs` (como referencia de estilo)
- `supabase/migrations/001_mvp_schema.sql`, `018_baldor_resources.sql`, `src/css/app.css`

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `src/universo/plan.cljs` | **Nuevo** — lógica pura del cruce déficits × recursos |
| `test/universo/plan_test.cljs` | **Nuevo** — 3 tests / 16 assertions |
| `src/universo/events/plan.cljs` | `:plan/resources` derivado en la suscripción; handler guarda filas crudas; fx sin la rama muerta |
| `src/universo/components/plan.cljs` | Título según `:kind` + aviso cuando el material no está personalizado |
| `src/universo/db/crud.cljs` | Borrada `fetch-resources-for-modules` |
| `src/universo/db.cljs` | Borrada `:plan :deficit-slugs`; comentario de qué son `:resources` |
| `public/js/app.js` | Recompilado (`release app`) |
| `project-memory/BACKLOG.md` | T-53 nueva, `hecho` |
| `project-memory/CURRENT_STATUS.md` | Nota de sesión |

## Comandos ejecutados y resultados

```
clj -M:test (antes)         → 42 tests / 162 assertions / 0 failures
clj -M:test (después)       → 45 tests / 178 assertions / 0 failures
clj-kondo --lint src test   → 16 warnings, todos preexistentes en código archivado;
                              0 en los archivos tocados
npx shadow-cljs release app → Build completed (224 files, 19 compiled, 0 warnings)
npm run build:css           → sin cambios (las clases ámbar ya existían, con mapeo oscuro)
graphify update .           → ejecutado al cierre
```

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| **La IA produce contenido solo en el pipeline de autoría, nunca en runtime** | **Sí → ADR-016** | [[../adr/ADR-016-ia-en-el-pipeline-de-autoria-no-en-runtime]], [[../project-memory/DECISIONS]] D-35 |
| Rotular el material no personalizado en vez de ocultarlo | No (aplica el criterio ya establecido en T-24) | `BACKLOG.md` T-53, este log |
| Derivar el cruce en la suscripción en vez de filtrar en el handler | No (es re-frame ortodoxo, ya exigido por [[../project-memory/AGENT_INSTRUCTIONS]] §2) | `events/plan.cljs`, comentario en el código |
| No tocar el modelo de datos (recurso ↔ misconception) en este arreglo | Pendiente → **requiere ADR propio** | [[../project-memory/BACKLOG]] T-54 (abierta) |

**Por qué solo un ADR y no tres:** de las tres decisiones estratégicas propuestas al owner, únicamente
la del pipeline de IA estaba efectivamente **decidida** (y además ya se practicaba de facto en
`018`/`019` + T-01, así que el ADR documenta algo ocurrido, no una intención). Atar recursos a
misconceptions y construir la capa de práctica siguen **sin decidir**: escribirlas como ADR habría
sido inventar una decisión del owner, contra [[../project-memory/AGENT_INSTRUCTIONS]] §0.2. Quedaron
como T-54 y T-55, ambas marcadas "requiere ADR".

## Riesgos identificados

| Riesgo | Severidad | Registrado en |
|--------|-----------|---------------|
| Ninguno nuevo | — | — |

R-10 sigue cerrado (el plan nunca queda sin contenido: capa 0 siempre se muestra). Lo que cambia
es que la debilidad de la capa 1 ahora es **visible** en vez de estar enmascarada.

## Bloqueos

Ninguno técnico. El bloqueo de producto que este arreglo deja al descubierto es **T-51** (mapeo de
`topic`/`module_id`), que ahora determina si la capa 1 sirve de algo.

## Preguntas abiertas nuevas

Ninguna formal en [[../project-memory/OPEN_QUESTIONS]]. De las tres decisiones estratégicas
propuestas al owner, una se tomó (ADR-016) y las otras dos quedaron como tareas que **requieren ADR
antes de implementarse**: T-54 (recursos ↔ misconceptions) y T-55 (capa de práctica). No se
registran como preguntas abiertas porque no son dudas sobre el estado del proyecto sino decisiones
de diseño pendientes, y el backlog es donde este proyecto las lleva.

## Supuestos aplicados

Ninguno. Los números de contenido (61 recursos, tipos, cobertura) salen de `BACKLOG` T-01 y del
conteo directo sobre las migraciones, no de estimación.

## Próximos pasos

1. Que el owner revise y mergee `fix-recursos-plan-sin-personalizar` (sin pushear ni mergear por
   [[../project-memory/AGENT_INSTRUCTIONS]] §1.7).
2. **T-51** — es ahora el bloqueo real de la capa 1, por encima de producir más contenido. Ninguna
   de las tareas de contenido nuevas (T-54/T-55/T-56) rinde antes de cerrar esta.
3. **T-54** (recursos ↔ misconceptions): escribir el ADR mientras el modelo sea barato de cambiar.
4. **T-27** como primer lote bajo ADR-016, midiendo antes los 3 topics más fallados con los 252
   diagnósticos reales.
5. **T-04** sigue siendo el único bloqueo de go-live (F8), independiente de todo lo anterior.

## Pendientes

- Verificación visual de "Mi plan" en ambas ramas (`:personalized` y `:general`) con una cuenta de
  estudiante real — el agente no tiene credenciales.
- El análisis estratégico se entregó en conversación; **no** quedó como documento en
  `project-memory/`. Si el owner quiere conservarlo, corresponde ADR o nota propia.

## Actualizaciones requeridas en Project Memory

- [x] `project-memory/CURRENT_STATUS.md`
- [x] `project-memory/BACKLOG.md` — T-53 (hecha), T-54, T-55, T-56 (nuevas); T-27 actualizada con
      ADR-016 y el criterio de priorización por datos reales
- [ ] `project-memory/RISKS.md` — no aplica, sin riesgo nuevo ni cambio de severidad. Los riesgos
      propios de ADR-016 (alucinación histórica, lote sin auditar) viven en el ADR, que es donde
      corresponde por ser específicos de esa decisión
- [x] `project-memory/DECISIONS.md` — D-35 + fila de ADR-016 en el índice
- [x] `adr/ADR-016-ia-en-el-pipeline-de-autoria-no-en-runtime.md` (nuevo)
- [ ] `project-memory/ARCHITECTURE.md` — evaluado; el flujo de datos no cambia (mismas tablas y
      misma consulta), cambia dónde se decide el filtrado. Si se ata recurso ↔ misconception, ahí sí
- [ ] `project-memory/ROADMAP.md` — no aplica
- [ ] `project-memory/REQUIREMENTS.md` — evaluado; RF-4 describe el plan en dos capas y sigue siendo
      cierto
- [ ] `project-memory/OPEN_QUESTIONS.md` — no aplica
- [ ] `project-memory/ASSUMPTIONS.md` — no aplica
- [ ] `project-memory/LESSONS_LEARNED.md` — evaluado; el patrón "parámetro ignorado que aparenta
      filtrar" ya está cubierto por T-43 y ahora por T-53
- [ ] `project-memory/TERMINOLOGY.md` — no aplica
- [x] `project-memory/graph/` — `graphify update .` ejecutado

## Notas

El defecto llevaba tiempo en producción y era invisible por construcción: no rompía nada, no daba
error, y el estudiante veía una lista larga de material — que parece *más* producto, no menos. Es
el mismo tipo de fallo silencioso que el bug del embudo de T-47 (`:landing/start` sin cargar el
catálogo), encontrado también por lectura de la ruta completa y no por una prueba. Vale la pena
tenerlo presente: en este proyecto los defectos caros no se ven como errores, se ven como
funcionalidad mediocre.

---

Relacionado: [[../project-memory/CURRENT_STATUS]] · [[../project-memory/BACKLOG]] T-53 · T-51 ·
[[../adr/ADR-005-banco-de-items-en-vez-de-cms]] · `../prompts/session-close-memory-update.md`
