# SESSION-037

## Fecha

2026-08-23

## Participantes

- Humano: Jacobo Córdova
- Agente / modelo: Claude Code CLI (Opus 5)

## Objetivo de la sesión

Dos cosas, pedidas juntas: **(a)** evaluar el motor IRT tal como está implementado —estimación,
θ inicial, viabilidad de 3PL— y las opciones de roles (admin / editor / profesor); y **(b)**
implementar la edición de preguntas **durante** el diagnóstico, moviendo la capa cero de un modal que
oscurece la pantalla a un panel al costado, con la respuesta y la explicación editables por quien
tenga permisos.

El objetivo no cambió. La evaluación (a) se entregó como diagnóstico y quedó registrada en RISKS /
OPEN_QUESTIONS / BACKLOG **sin tocar el motor**: son decisiones de producto, no de código.

## Contexto de entrada

- Rama: `main`
- Commit inicial: `c67c202`
- Estado del árbol al empezar: limpio
- Documentos de la memoria leídos: `CLAUDE.md`, `ADR-004`, `ADR-015`, `ADR-029`, `ADR-030`,
  `ADR-031`, `supabase/migrations/{020,024,025,040,046}`, `supabase/admin_rls.sql`,
  `supabase/SCHEMA.md`
- Bloqueos vigentes al empezar: ninguno

## Actividades realizadas

1. **Lectura del motor IRT completo** (`components/tetha.cljs`, `irt/progress.cljs`, `irt/effort.cljs`,
   `irt/escape.cljs`, `events/test.cljs`) contra ADR-004. Salieron tres hallazgos: la parada por
   precisión es inalcanzable por aritmética (R-38), el estimador y el θ inicial del código no son los
   que describe el ADR (X-10), y el θ que se reporta es el valor capado y no el MAP convergido.
2. **Evaluación de 3PL**: descartado por requisitos de calibración (~1.000 respuestas por ítem, `c`
   apenas identificable). Se propuso en su lugar **1PL con `c = 0.25` fijo** —una constante, no un
   parámetro— como corrección barata del sesgo por adivinanza (T-114).
3. **Evaluación de roles**: hoy `profiles.role ∈ {user, admin}` y todas las policies usan
   `is_admin()`. Se decidió **no** partir el rol en esta sesión (bus factor = 1) y dejar escrito el
   camino barato para cuando exista una segunda persona (T-113).
4. **Diseño de la capa cero al costado**, con tres opciones presentadas al owner (panel lateral /
   acordeón inline / modal sin backdrop). Elegido el panel lateral.
5. **Implementación**: lógica pura primero (`universo.reintento`, `editor/campos-editados`), después
   los eventos (`events/editor_vivo.cljs`, `:test/reintentar-ultimo`), después la vista.
6. **Extracción de `components/campos.cljs`**: los campos de formulario del banco estaban privados
   dentro de `admin_questions.cljs` y el editor en vivo necesitaba **los mismos** con otro
   `on-change`. Se sacaron a un namespace compartido en vez de duplicarlos.
7. Tests, lint, build, los cuatro auditores, y actualización de la memoria.

**Lo que no funcionó, y por qué está acá:**

- **Primer intento del layout con `grid-template-columns` animado**: descartado antes de escribirlo.
  La interpolación de `grid-template-columns` no es fiable entre navegadores, y el enunciado
  *saltaría* al aparecer el panel. La solución que quedó es panel `fixed` + `padding` en el
  escenario, que sí transiciona.
- **Primer intento del diff de campos**: comparaba borrador contra fila **sin coercionar**. El primer
  test lo tumbó: abrir el editor y cerrarlo sin tocar nada proponía escribir `""` en las columnas que
  estaban en `null`. Corregido en `editor/coercionar-campo`; la lección quedó en L-49.
- **Un `reg-sub` escrito como `:<- [...] :open?`**: una keyword como función de cómputo recibe **dos**
  argumentos en re-frame, así que `(:open? m [:editor-vivo/estado])` devolvería el vector de consulta
  como valor por defecto — verdadero siempre. Corregido a `(fn [m _] ...)` antes de compilar.
- **Verificación en vivo del flujo de edición: no se pudo.** Requiere una sesión de admin real; se
  verificó que el bundle arranca sin errores de consola sirviendo la raíz en local, y nada más.

## Archivos revisados

- `src/universo/components/tetha.cljs`, `src/universo/irt/{progress,effort,escape,fluency}.cljs`
- `src/universo/events/test.cljs`, `src/universo/events/admin.cljs`, `src/universo/events/auth.cljs`
- `src/universo/components/{feedback_modal,diagnostic_test,admin_questions}.cljs`
- `src/universo/db/crud.cljs`, `src/universo/editor.cljs`, `src/universo/access.cljs`
- `supabase/migrations/{020,024,025,040,046}*.sql`, `supabase/admin_rls.sql`, `supabase/SCHEMA.md`
- `adr/ADR-004`, `scripts/audit_movil.py`, `tailwind.config.js`

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `src/universo/reintento.cljs` | **Nuevo.** Deshacer la última respuesta: poda `:responses` y `:theta-history` juntos, θ ← previo o `:theta-initial`, recalcula la parada, reinstala el ítem parcheado |
| `src/universo/events/editor_vivo.cljs` | **Nuevo.** Abrir/cargar/editar/guardar el ítem en vivo, con patch parcial y refresco de la explicación visible |
| `src/universo/components/test_editor.cljs` | **Nuevo.** Pestaña «Editar ítem»: dificultad + módulo, enunciado, y los cuatro distractores con la elegida abierta |
| `src/universo/components/campos.cljs` | **Nuevo.** Campos de formulario del banco (`input-class`, `field`, `latex-editor`, `misconception-select`), extraídos de `admin_questions` |
| `src/universo/components/feedback_modal.cljs` | Deja de ser un modal: `panel-shell` (columna `lg` / hoja inferior, sin backdrop), pestañas, y se van `question-section`, `options-section` y `modal-overlay` |
| `src/universo/components/diagnostic_test.cljs` | `test-stage` (las dos columnas), `question-component` con `congelada?`, alternativas ya juzgadas, y θ/b visibles solo para admin |
| `src/universo/components/admin_questions.cljs` | Usa `components/campos` en vez de sus copias privadas |
| `src/universo/editor.cljs` | `campos-en-vivo`, `coercionar-campo`, `campos-editados` |
| `src/universo/db/crud.cljs` | `fetch-admin-question` (una fila por id, para el editor en vivo) |
| `src/universo/events/test.cljs` | `:theta-initial`, `:test/reintentar-ultimo`, sub `:test/puede-reintentar?`, cierre del editor en `:test/show-feedback` |
| `src/universo/core.cljs` | Requiere `universo.events.editor-vivo` |
| `scripts/audit_movil.py` | `test_editor.cljs` y `campos.cljs` registrados como pantallas de edición |
| `test/universo/reintento_test.cljs` | **Nuevo.** 6 tests sobre la invariante de deshacer |
| `test/universo/editor_test.cljs` | Tests de `campos-editados` (diff, coerción, «en blanco es nulo») |
| `public/js/app.js`, `public/css/app.css` | Artefactos recompilados (ADR-003) |
| Memoria | `CLAUDE.md`, `ADR-032` (nuevo), `DECISIONS`, `CURRENT_STATUS`, `BACKLOG`, `RISKS`, `OPEN_QUESTIONS`, `ARCHITECTURE`, `LESSONS_LEARNED` |

## Comandos ejecutados y resultados

```
clj-kondo --lint src test    → 0 errores, 0 warnings nuevos
clj -M:test                  → 169 tests / 2607 assertions / 0 failures / 0 errors
npx shadow-cljs release app  → Build completed, 0 warnings
npm run build:css            → ok (verificadas las utilidades arbitrarias: 30rem, 78vh, transition-[padding])
python3 scripts/audit_contraste.py   → ✓ 40/40 pares
python3 scripts/audit_movil.py       → ✓ sin problemas en pantallas del estudiante
python3 scripts/audit_dark_theme.py  → ✓ sin texto oscuro sin mapear
python3 scripts/audit_html.py        → ✓ index/404 alineados
graphify update .            → 3430 nodos, 8319 aristas, 224 comunidades
```

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| La capa cero se muestra al lado, no encima; el admin edita el ítem sin salir del test; no se crea el rol `editor` | **ADR-032** | [[../project-memory/DECISIONS]] D-63 |
| No adoptar 3PL; evaluar 1PL con `c = 0.25` fijo | No (queda como tarea) | [[../project-memory/BACKLOG]] T-114 |
| No resolver en silencio las divergencias con ADR-004 | No | [[../project-memory/OPEN_QUESTIONS]] X-10, T-112 |

## Riesgos identificados

| Riesgo | Severidad | Registrado en |
|--------|-----------|---------------|
| Las corridas de depuración del admin contaminan la calibración del banco | Alta (a partir de G-2) | RISKS R-37, BACKLOG T-110 |
| La parada por precisión del diagnóstico nunca se dispara, y hay copy apoyado en ella | Media hoy, alta en un pitch | RISKS R-38, BACKLOG T-111 |

## Bloqueos

**Verificación en vivo (acceso).** El flujo completo —abrir el editor, guardar, «volver a servir»—
necesita una sesión de admin real, que esta sesión no podía crear. Lo desbloquea el owner en un
minuto: rendir el diagnóstico con su cuenta.

## Preguntas abiertas nuevas

| Pregunta | Registrada en |
|----------|---------------|
| ¿Qué se hace con la parada por precisión, que es inalcanzable? | OPEN_QUESTIONS Q-42 |
| ADR-004 describe un estimador y un θ inicial que el código ya no usa | OPEN_QUESTIONS X-10 |

## Supuestos aplicados

- **La hoja inferior es el equivalente móvil aceptable de «al lado».** Debajo de `lg` no hay espacio
  para dos columnas legibles; se asumió que no oscurecer ya resuelve la parte que molestaba. No está
  verificado con el owner en un teléfono.
- **30rem de ancho de panel** es suficiente para el formulario de edición. Elegido, no medido.

## Próximos pasos

1. **Verificar en vivo con la cuenta de admin** (bloqueo de arriba): responder un ítem, abrir «Editar
   ítem», guardar, «volver a servir», y confirmar que θ vuelve al valor previo y el ítem reaparece
   corregido.
2. Commitear y `git push` — nada de esto está en producción hasta entonces (ADR-003 + GitHub Pages).
3. **T-110** antes de cualquier trabajo de calibración: distinguir las corridas de admin en `tests`.
4. **T-111**: medir cómo paran los diagnósticos ya rendidos y decidir el umbral o el copy.
5. **T-112**: ADR nuevo con el estimador real; evaluar de paso reportar el MAP sin capar al cerrar.

## Pendientes

- La verificación en vivo (punto 1 de arriba). **Nada más quedó a medias**: el código compila, pasa
  los tests y los cuatro auditores.

## Actualizaciones requeridas en Project Memory

- [x] `project-memory/CURRENT_STATUS.md`
- [x] `project-memory/BACKLOG.md`
- [x] `project-memory/RISKS.md`
- [x] `project-memory/DECISIONS.md`
- [x] `adr/ADR-032-capa-cero-al-lado-y-editor-en-vivo.md` (nuevo)
- [x] `project-memory/ARCHITECTURE.md`
- [ ] `project-memory/ROADMAP.md` — no aplica (no cambió fase ni hito)
- [ ] `project-memory/REQUIREMENTS.md` — no aplica
- [x] `project-memory/OPEN_QUESTIONS.md`
- [ ] `project-memory/ASSUMPTIONS.md` — los dos supuestos de arriba son de UI y viven en este archivo
- [x] `project-memory/LESSONS_LEARNED.md`
- [ ] `project-memory/TERMINOLOGY.md` — no aplica
- [x] `project-memory/graph/`

## Notas

**Para quien siga:** el namespace `universo.components.feedback-modal` **ya no dibuja ningún modal**.
Se conservó el nombre a propósito —renombrarlo tocaría todos sus usos sin cambiar comportamiento— así
que no busques un `modal-overlay`: es `panel-shell`.

**Sobre el orden del trabajo:** los tres hallazgos del motor IRT (R-38, X-10, T-114) son de la misma
familia que R-17 —`difficulty` sin calibrar— y **ninguno se arregla con más código**. Los tres se
deciden mirando los tests ya rendidos, que están en la base desde el primero. Esa medición es media
tarde y desbloquea las tres.

---

Relacionado: [[../project-memory/CURRENT_STATUS]] · [[../adr/ADR-032-capa-cero-al-lado-y-editor-en-vivo]] ·
[[../project-memory/RISKS]] R-37/R-38
