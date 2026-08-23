# SESSION-036

## Fecha

2026-08-23

## Participantes

- Humano: Jacobo Córdova
- Agente / modelo: Claude Code CLI (Opus 5)

## Objetivo de la sesión

Explorar un fondo de página «con visión científica» para la home. **El objetivo se amplió a mitad de
sesión**: al aplicar el mismo criterio al CV (`/profesor`) apareció un defecto de contraste real y
extendido, y la sesión pasó a ser mitad identidad visual, mitad corrección de accesibilidad.

## Contexto de entrada

- Rama: `main`
- Commit inicial: `678b042` — «Corregir la cifra del sesgo: son 293 de 306, no 242»
- Estado del árbol al empezar: **limpio**
- Documentos de la memoria leídos: `CLAUDE.md`, `adr/ADR-022`, `adr/ADR-023`,
  `project-memory/LESSONS_LEARNED` (vía grafo), `tailwind.config.js`, `src/css/app.css`
- Bloqueos vigentes al empezar: ninguno para esta tarea

## Actividades realizadas

1. **Se rechazó la idea original tal como venía.** El owner pidió símbolos matemáticos flotantes;
   eso es exactamente lo que ADR-022 descartó como decoración. Se reencuadró: el fondo tiene que ser
   un dato, no un adorno.
2. **Se prototiparon seis retículas** en una página de comparación con los tokens reales
   (`panel-300` / `panel-800`) y una `.placa` con sus sombras textuales. Publicadas como Artifact.
   El owner eligió **V2, graticule de osciloscopio**.
3. **Se detectó un bug en la propia propuesta antes de implementarla:** `background-position: center`
   sobre un contenedor `min-h-screen` que crece = el eje cae a mitad del documento, no de la
   pantalla. Se construyó un segundo Artifact interactivo para explorar origen, números y animación.
4. **Se midieron las alfas contra `.grabado` y las del prototipo reprobaban AA** (4.47 claro /
   4.05 oscuro). Se recalcularon: 0.065/0.038 claro, 0.042/0.024 oscuro.
5. Implementado `.fondo-graticule` en `app.css` + una clase en `home.cljs:290`. **ADR-031 / D-62.**
6. **CV (`/profesor`)**: se escribió un auditor de contraste en JS que recorre el DOM y compone las
   capas de fondo reales. **52 fallos en claro, 12 en oscuro.** Causa: tres secciones sin fondo
   propio. Corregido con `bg-white` explícito + cuatro tokens subidos a `-600`. **Resultado 0 y 0.**
7. Cambiado «Docente» → «Profesor de Ciencias»; agregadas dos entradas de docencia (Colegio Luis
   Cruz Martínez 2026, CPech 2018–2026).
8. Integrado el **logo oficial de Clojure** desde el SVG del owner, con opacidad medida (0.22).

### Lo que NO funcionó (para que no se repita)

- **Los dos pilares `∫` en el CV: implementados y retirados en la misma sesión.** Al owner le
  «encerraron» la página. Y arrastraron un error de juicio propio: para darles margen se puso el CV
  en `max-w-5xl`, y al quitar los pilares **no se quitó el ancho**, dejando un marco sin función. El
  owner tuvo que pedirlo aparte. *Lección: cuando se retira la causa, se retira el andamiaje que
  existía solo para ella, en el mismo movimiento.*
- **Primer intento de mejorar el watermark de Clojure: quedó cortado.** Se le puso `right: -12%`
  para que sangrara, pero el contenedor tiene `overflow-hidden`: en vez de sangrar, guillotinado.
- **Primera versión del auditor de contraste dio 52 falsos positivos mezclados con los reales**,
  porque trataba cualquier `background-image` como opaco y el hero es un degradado. Hubo que separar
  «medible» de «bajo gradiente, revisar a mano».
- **`python3 -m http.server` no sirve para revisar rutas del SPA**: todo lo que no sea `/` da 404.
  Hubo que escribir un server con fallback (queda en el scratchpad, no en el repo).

## Archivos revisados

- `src/universo/components/resume.cljs` (430 líneas, leído entero — es el CV)
- `src/universo/home.cljs` (fondo de página, logotipo, nav)
- `src/css/app.css` (bloque del panel, mapeo global de tema oscuro)
- `tailwind.config.js` (escalas `grafito`, `senal`, `panel`, `led`)
- `adr/ADR-022`, `adr/ADR-023` (los que restringen esta decisión)
- `scripts/audit_contraste.py` (para entender **qué no cubre**)
- `src/universo/components/feedback_modal.cljs:52` (el criterio de animación ya escrito)
- `src/universo/animations.cljs` — **código muerto**, nadie lo requiere (grep confirmado)

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `src/css/app.css` | + bloque `.fondo-graticule` y su variante `.dark` (68 líneas, casi todo el porqué de las alfas) |
| `src/universo/home.cljs` | + clase `fondo-graticule` en la raíz (línea ~290); comentario reescrito (describía el degradado de ADR-020, ya eliminado) |
| `src/universo/components/resume.cljs` | «Profesor de Ciencias»; `bg-white` en 3 secciones; 4 tokens a `-600`; 2 entradas de docencia; logo oficial de Clojure |
| `public/js/app.js`, `public/css/app.css` | Artefactos recompilados (CLAUDE.md §9) |

## Comandos ejecutados y resultados

```
clj -M:test                 → 161 tests / 2568 assertions / 0 failures / 0 errors
npx shadow-cljs release app → Build completed, 0 warnings
npm run build:css           → Done
graphify update .           → 3316 nodos, 8182 edges, 216 comunidades
python3 scripts/audit_*.py  → 4/4 OK (contraste: 40/40 pares)
auditor DOM ad-hoc (JS)     → CV: 52→0 fallos en claro, 12→0 en oscuro
```

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| El fondo es un plano de medida (graticule, origen inferior-izquierda, alfas medidas) y **ninguna sección hereda su fondo** | Sí | [[../adr/ADR-031-fondo-como-plano-de-medida]], [[../project-memory/DECISIONS]] D-62 |
| Sin números, sin rótulo y sin animación en el fondo, por ahora | Dentro de ADR-031 | ADR-031 §Decisión 3 y 4 |
| Los pilares `∫` se descartan tras verlos | Dentro de ADR-031 | ADR-031 §Alternativas |

## Riesgos identificados

| Riesgo | Severidad | Registrado en |
|--------|-----------|---------------|
| Otra página tiene fondo heredado sin verificar y ningún auditor lo detecta | Media | RISKS R-36 |

## Bloqueos

Ninguno. Todo lo pendiente es decisión del owner, no impedimento técnico.

## Preguntas abiertas nuevas

| Pregunta | Registrada en |
|----------|---------------|
| ¿En qué ciudad son las dos entradas nuevas de docencia? | OPEN_QUESTIONS Q-41 — **respondida el mismo día: Iquique, Chile** |

## Supuestos aplicados

- **A-37**: las dos entradas nuevas de docencia son en Chile. Se puso el país y **no la ciudad**
  porque el owner no la dio y CLAUDE.md §6 prohíbe inventar datos faltantes.
  **Resuelto antes de cerrar la sesión:** el owner respondió **Iquique, Chile**; aplicado en
  `resume.cljs`, Q-41 marcada como respondida y A-37 validado.

## Próximos pasos

1. ~~**Commitear**~~ ✅ hecho. **Falta `git push origin main`** para que llegue a producción.
2. **T-107** — auditor de contraste sobre el DOM renderizado. Es la brecha que dejó pasar 52 fallos.
3. ~~**Q-41** — pedir la ciudad y corregir las dos tarjetas.~~ ✅ hecho antes del cierre: Iquique, Chile.
4. **T-108** — animar el fondo solo cuando haya un Δθ que comunicar.

## Pendientes

- ~~**Nada está commiteado.**~~ ✅ Commiteado a `main` al cerrar. **Sin pushear.** El árbol tenía 5 archivos de código modificados
  (`src/css/app.css`, `src/universo/home.cljs`, `src/universo/components/resume.cljs`,
  `public/js/app.js`, `public/css/app.css`) más los nuevos de memoria. **Falta el `git push`**: el
  cambio no está en producción hasta que se empuje a `origin/main` (GitHub Pages sirve esa rama).
- `src/universo/animations.cljs` sigue en el repo. Es código muerto confirmado; **no se borró porque
  el owner no lo pidió** y borrar código no solicitado no corresponde. → T-109.
- El snapshot de `project-memory/graph/` se refrescó; `graphify-out/` no se versiona.

## Actualizaciones requeridas en Project Memory

- [x] `project-memory/CURRENT_STATUS.md`
- [x] `project-memory/BACKLOG.md`
- [x] `project-memory/RISKS.md`
- [x] `project-memory/DECISIONS.md`
- [x] `adr/ADR-031-fondo-como-plano-de-medida.md` (nuevo)
- [x] `project-memory/ARCHITECTURE.md`
- [ ] `project-memory/ROADMAP.md` — no aplica, no cambió fase ni hito
- [ ] `project-memory/REQUIREMENTS.md` — no aplica
- [x] `project-memory/OPEN_QUESTIONS.md`
- [x] `project-memory/ASSUMPTIONS.md`
- [x] `project-memory/LESSONS_LEARNED.md`
- [ ] `project-memory/TERMINOLOGY.md` — no aplica
- [x] `project-memory/graph/` (snapshot de Graphify)

## Notas

- **`CLAUDE.md` tenía tres cifras desactualizadas** que se verificaron y corrigieron en esta sesión:
  §5 decía «los 38 pares» (son **40**), §8 decía «74 tests / 410 assertions» (son **161 / 2568**), y
  `CURRENT_STATUS` decía rama `escape-no-se` sin mergear (**ya está mergeada en `main`**). Es la
  regla de PMF: si `CLAUDE.md` contradice la realidad, se corrige en el mismo commit.
- Dos Artifacts publicados como material de decisión (privados, no son parte del repo): el banco de
  seis retículas y el laboratorio interactivo del graticule.
- El SVG del logo de Clojure vive en `~/Documents/Llovizna/Clojure_logo.svg`, **fuera del repo**. Los
  paths quedaron embebidos en `resume.cljs`, así que el CV no depende de ese archivo.

---

Relacionado: [[../project-memory/CURRENT_STATUS]] · [[../project-memory/AGENT_INSTRUCTIONS]] ·
[[../adr/ADR-031-fondo-como-plano-de-medida]] · `../prompts/session-close-memory-update.md`
