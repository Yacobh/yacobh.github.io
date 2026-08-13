# HANDOFF

**Fecha del handoff: 2026-08-13 (tarde)** · Rama `main`, con la identidad visual nueva mergeada ·
⏳ **una migración sin aplicar: `043`** (`site_settings`). Hasta que se aplique, la pestaña
**Apariencia** del panel admin muestra un error al cargar — degrada, no rompe.

> Este documento existe para que **una persona o un agente de IA sin acceso al historial de
> conversaciones** pueda continuar el proyecto. Si solo puedes leer un archivo, lee este.

---

## Executive Summary

**Academia Integral** es una plataforma web para preparar la **PAES de Matemática 1** (prueba de
admisión universitaria en Chile). Un estudiante entra, hace un **diagnóstico adaptativo basado en
Teoría de Respuesta al Ítem** (~20 min, 5–12 preguntas), y obtiene: su nivel estimado (θ), la lista
de **errores conceptuales concretos** que comete, un **plan de estudio** priorizado y la posibilidad
de **inscribirse en un grupo de estudio de su mismo nivel**, online o presencial en Iquique. El
grupo se confirma automáticamente al alcanzar un mínimo de inscritos.

Es un **proyecto personal** del profesor **Jacobo Córdova**, quien es además el único desarrollador
-- originado en 2025 a partir de un convenio de desarrollo con la Universidad Arturo Prat, ya
terminado y sin alianza institucional vigente (ver [[DECISIONS]] D-18). El diagnóstico, el perfil y
el plan son gratuitos; las clases de los cupos tendrán costo (ver más abajo).

**Técnicamente:** SPA en **ClojureScript + re-frame** compilada con shadow-cljs, servida por
**GitHub Pages** en <https://jacobocordova.com>, con **Supabase** (PostgreSQL + Auth + RLS + Edge
Functions) como único backend. No hay servidor propio: el navegador habla directo con Supabase y
**toda la autorización se hace con Row Level Security**.

**Estado (2026-08-10): el go-live está cerrado.** El funnel funciona de punta a punta, hay contenido
publicado, el email de cohorte está verificado en producción y existe un primer cupo real con sala de
videollamada. **Lo que sigue no es construir, es difundir** — y hay reloj: la PAES se rinde a fin de
año ([[RISKS]] R-19).

---

## Business Goals

1. Que un estudiante pase de "no sé por dónde partir" a un plan concreto **en una sola sesión**.
2. Reemplazar la nota por un **mapa de errores**: cada alternativa incorrecta está asociada a una
   idea errónea nombrable, y el plan explica *por qué* se equivocó.
3. Formar **cohortes por banda de nivel** (no por curso), viables gracias a un mínimo de inscritos.
4. Operar con costo de infraestructura ≈ $0 (free tiers).
5. Construir un activo reutilizable: el **banco de ítems** con dificultades y explicaciones de error.

No hay ingresos operativos todavía (sin pasarela de pago en el MVP), pero **ya hay una decisión de
precio tomada** (D-19/D-26): las clases de los cupos costarán $10.000 CLP/hora, con la primera
gratis. El diagnóstico/perfil/plan siguen gratis. Detalle: [[BUSINESS_CONTEXT]] §5.

---

## Functional Scope

**Operativo hoy:**

- Registro/login (email+contraseña), sesión rehidratada, secciones protegidas. Google OAuth existe
  como función (`sign-in-with-google`) pero **sin botón en la UI** -- no es una opción real hoy.
- **Diagnóstico adaptativo IRT**: selección de ítem por cercanía a θ, feedback inmediato con
  explicación del error, prefetch de la siguiente pregunta, parada por precisión.
- **Perfil de dos ejes**: θ (error estándar, banda `inicial`/`basico`/`intermedio`/`avanzado`,
  track, déficits por módulo ordenados por tasa de error, misconceptions, estabilidad de θ) **y
  fluidez λ** (ADR-019): cuánto le cuesta llegar al resultado, normalizado por el tiempo de lectura
  del enunciado. El cruce θ × λ da cuatro perfiles con acciones distintas — el caso que lo motiva es
  distinguir "sabe pero le cuesta" de "sabe y automatizó", que hasta agosto de 2026 recibían la
  misma recomendación.
- **Mi plan**: capa 0 (errores explicados) + capa 1 (recursos publicados por módulo) + tarjeta del
  cuadrante de fluidez.
- **Cupos**: listado filtrado por banda, inscripción, "faltan N inscritos", confirmación automática,
  notificación in-app.
- **Panel admin**: usuarios y roles (con salvaguardas), tests, moderación tri-state del guestbook,
  CRUD de preguntas, recursos y cupos con roster.
- **Landing pública** con SEO completo (Open Graph, JSON-LD, sitemap), testimonios reales tomados
  del guestbook aprobado, formulario de contacto.

**Excluido a propósito:** rol "profesor" separado de admin, asistencia/notas/certificación,
backend propio, app nativa, otras materias PAES, internacionalización, y el producto archivado
"MathAcademy". (Los pagos **ya no están excluidos** -- D-19/D-26 fijó $10.000 CLP/hora por clase,
falta implementar el cobro.) Detalle: [[PROJECT_BRIEF]] §6.

Requisitos con evidencia línea por línea: [[REQUIREMENTS]].

---

## Technical Scope

```
Navegador: index.html → public/js/app.js (bundle) → universo.core/init!
  re-frame: events/* → app-db → subs → components (Reagent/React 17)
  Lógica pura testeada: components.tetha · irt.progress · irt.effort · irt.fluency
                        profile · topics · slots.logic · catalog · access · timeline
  I/O centralizado: universo.db.crud
        │ supabase-js con JWT del usuario
        ▼
Supabase PostgreSQL con RLS (único control de autorización) + is_admin()
  triggers: min_enrollments → cupo confirmed → notifications → email_outbox
        ▼
Edge Function (Deno) send-enrollment-emails → Resend
```

- **Stack:** ClojureScript 1.12.38, re-frame 1.4.3, Reagent 1.2.0, React 17, Tailwind 3.4.17,
  KaTeX, shadow-cljs 3.0.4, `@supabase/supabase-js` ^2.49.8.
- **Tablas:** `profiles`, `questions`, `tests`, `guestbook`, `visitor`, `contacto` (previas) +
  `modules`, `student_profiles`, `resources`, `class_slots`, `enrollments`, `notifications`,
  `email_outbox` (MVP).
- **Migraciones:** scripts SQL en `supabase/migrations/`, aplicados **a mano** en el SQL Editor, en
  el orden de `supabase/SCHEMA.md` -- esa es la lista que se mantiene al día, no se duplica el número
  aquí. No hay `db push`. **Al 2026-08-13 queda una pendiente: `043`** (`site_settings`). `041` y
  `042` se aplicaron y se verificaron contra la base real (`SCHEMA.md` §Verificación).
  ⚠️ Pero el esquema **no se puede reconstruir desde cero** con esas migraciones: `public.questions`
  y `public.is_admin()` preexisten y no están versionados (T-48).
- **Deploy:** GitHub Pages sobre `main`. **El bundle `public/js/app.js` está versionado en Git**: sin
  `npx shadow-cljs release app` + commit, un cambio de código **no llega a producción**.
- **Tests:** `clj -M:test` → **83 tests / 454 assertions / 0 failures** (verificado 2026-08-13).
- **Verificación de UI:** tres scripts en `scripts/` (tema oscuro, contraste, móvil). No hay CI que
  los corra: se ejecutan a mano, como los tests.
- **No hay:** staging, monitoreo, analytics, backups propios verificados, router de URL. CI sí existe
  (`.github/workflows/test.yml`, T-06).

Detalle: [[ARCHITECTURE]] · [[TECH_STACK]] · [[DEPENDENCIES]].

---

## Current State

| Área | Estado |
|------|--------|
| Funnel completo (login → diagnóstico → perfil → plan → cupo) | ✅ operativo |
| Motor IRT (1PL + MAP + parada por SE) | ✅ implementado y testeado |
| Eje de fluidez λ (ADR-019) | ✅ en producción (2026-08-12), configurable por banco desde `041` (2026-08-13); 🟡 umbrales **sin calibrar** — siguen en el 3/6 autoral (T-65) |
| Panel de administración | ✅ operativo |
| Contenido pedagógico | 🟡 58/61 recursos publicados (T-01); faltan geometría (T-56) y los 2 módulos creados en `031` |
| Banco de ítems | 🟡 387 ítems, topics canónicos; **128 sin `module_id`** (bancos mezclados, T-60) |
| Email de cohorte | ✅ desplegado y **verificado en vivo** en producción (T-02) |
| Cupos reales | ✅ uno publicado (2026-08-15) con Jitsi; falta oferta en las demás bandas |
| Landing y SEO | ✅ (sin analytics — T-20) |
| Identidad visual | ✅ lenguaje Braun/Rams sobre panel de instrumento (ADR-022, ADR-023). 38/38 pares WCAG. 🟡 **sin verificación visual** (T-67) |
| Línea del tiempo histórica | ✅ 35 hitos, medallas derivadas de `tests` (ADR-021); `042` aplicada |
| Memoria del proyecto (PMF) | ✅ operativa; auditada 2026-08-10 |
| CI | 🟡 existe (T-06); staging / respaldos / monitoreo ⛔ |
| Árbol de trabajo | ✅ limpio; `experimento-cuantica` mergeada a `main` (PR #36) — nada sin publicar |
| Track experimental de cuántica | ✅ 123 ítems `mq_` cargados y **aislados** (`active = false`); no es producto (ADR-018) |
| ¿Está el MVP en producción? | ✅ sí, verificado por hash contra `origin/main` |

Detalle por fase: [[CURRENT_STATUS]] · [[ROADMAP]].

---

## Completed Work

- **F0 Base técnica:** SPA desplegada con dominio propio, Supabase Auth con rehidratación de sesión,
  `profiles` + `is_admin()` + RLS, rutas protegidas con redirección post-login.
- **F1 Motor IRT:** modelo 1PL/Rasch, estimación MAP con prior N(0,1), Newton-Raphson, clamp θ a
  `[-3,3]`, límite `|Δθ| ≤ 0,4`, información de Fisher, `SE = 1/√I`, regla de parada (min 5 / max 12
  / SE ≤ 0,35), selección por cercanía con ventana ±1 ampliable a ±2, prefetch, gráfico de evolución.
- **F2 Perfil y plan:** `universo.profile/build` completo con déficits, misconceptions y estabilidad;
  materialización en `student_profiles.profile` (JSONB); módulos Baldor sembrados con contexto
  histórico; UI de plan en dos capas.
- **F3 Cohortes:** `class_slots` por banda + modalidad + capacidad + mínimo; `enrollments` con RLS;
  filtro puro por banda con tests; trigger de confirmación; notificaciones in-app; roster en admin.
- **F4 Panel admin:** usuarios y roles con doble salvaguarda (`id <> auth.uid()` + trigger de último
  admin), tests, moderación tri-state, CRUD de preguntas (restaurado en `48bf525`), recursos y cupos.
- **F5 Email (parcial):** tabla `email_outbox` con índice parcial, trigger de encolado, Edge Function
  en Deno con Resend (25 filas/invocación, `attempts`, `last_error`, degradación 503 sin API key).
- **F6 Captación:** landing rehecha orientada a conversión, testimonios reales, SEO completo con
  JSON-LD de gratuidad acotada.
- **F7 PMF:** `project-memory/` completo, 10 ADRs, plantilla y primer session log, 11 prompts,
  `CLAUDE.md` reescrito, snapshot de Graphify versionado.

---

## Pending Work

**Ya no hay bloqueantes de go-live: los seis que había están cerrados** (T-01, T-02, T-03, T-04,
T-08, T-19). Lo que importa ahora, en orden:

| # | Pendiente | Tipo | Tarea |
|---|-----------|------|-------|
| 1 | **Difundir el cupo del 2026-08-15** y revisarlo el día 14 (si no hay 3 inscritos, no se confirma) | Negocio | R-19, R-11 |
| 2 | **Calibrar los umbrales de fluidez con datos** (`fluency/calibration-report`), no con criterio: el 3,0/6,0 es autoral, igual que el `3` de `028` antes de `032`. Que `041` esté aplicada no calibra nada — solo mueve la decisión a un lugar editable | Producto | T-65 |
| 3 | Correr el **bloque H** de `supabase/queries/verificacion_esquema.sql`: confirma el check y los valores de `041`, que la verificación externa no alcanza a ver | Técnico | T-65 |
| 4 | Instrumentar el embudo: el sitio recibe tráfico y no se mide nada | Producto | T-20 |
| 5 | Clasificar los 128 ítems de `diagnostico`/`paes_m1` sin módulo (33 % del banco) | Contenido | T-60 |
| 6 | Versionar el DDL real del esquema: hoy el repo no puede reconstruirlo | Técnico | T-48 |

*Cerrados desde el handoff anterior:* T-44/T-51 mergeados y en producción (X-01 resuelta, la frase
del FAQ ya es verdadera) y T-59 verificado — **el cronómetro sí registra**; lo que falta ahí es
volumen de datos, no instrumentación.

**Importante a corto plazo:** la banda del estudiante no está protegida en la base (T-49), respaldo
probado (T-07), staging (T-09), router de URL (T-05), duplicación de `index.html` (T-12).

Backlog completo con criterios de terminado: [[BACKLOG]].

---

## Known Risks

Los cinco que importan (lista completa en [[RISKS]]):

1. **R-01 Bus factor = 1.** Una sola persona es owner, desarrollador, autor del contenido y
   operador. Esta memoria es la mitigación principal.
2. **R-02 Se desarrolla contra la base de producción.** No hay staging: cada migración y cada cambio
   de policy se prueba en vivo. Todas las migraciones son idempotentes por esta razón — **mantenerlo
   así**.
3. **R-14 RLS es el único control de autorización.** Una policy permisiva de más expone datos de
   estudiantes; una restrictiva de más rompe el producto en silencio (en Postgres eso se ve como
   "0 filas afectadas", no como error).
4. **R-06 Datos personales de menores sin aviso de privacidad.** Se recolecta email, IP,
   ciudad/país, dispositivo y respuestas de un público mayoritariamente menor de edad, con respaldo
   universitario visible. Este riesgo **se activa al abrir a público real**.
5. **R-19 Estacionalidad — hoy el riesgo dominante.** La PAES se rinde a fin de año: la ventana de
   captación son estas semanas y no hay una segunda oportunidad este ciclo. El producto está listo;
   lo que falta es que alguien lo use.

Además: R-11 (si no llegan 3 inscritos el cupo no se confirma), R-03 (sin respaldo verificado),
R-13 (bundle desalineado del fuente), R-17 (`difficulty` reescalada a mano, **no** calibrada
empíricamente ⇒ θ posiblemente sesgada). **R-10 ("Mi plan" vacío) se cerró** con T-01.

---

## Open Questions

Las que hay que responder antes de avanzar (lista completa en [[OPEN_QUESTIONS]]):

- **Q-07** ¿Qué pasa al repetir el diagnóstico: sobrescribir, versionar o histórico? La FAQ
  **promete** ver "cómo se movió tu nivel", lo que exige un histórico que `student_profiles` hoy no
  guarda. Bloquea T-26 y mantiene viva la contradicción X-02
- **Q-06** ¿Los topics del banco cubren los ejes reales de la PAES M1? El mapeo mecánico ya está
  resuelto (T-51); lo que queda es la pregunta de contenido
- **Q-05** ¿Están calibradas las dificultades? Se reescalaron a mano en T-50, que **no** es
  calibración empírica (T-29 sigue abierta)
- **Q-10** ¿Qué define un "módulo prioritario"? La lista dice basarse en déficits reales, sin
  respaldo en el repo

Respondidas hace poco y útiles para no re-abrirlas: **Q-02** (precio, $10.000 CLP/hora), **Q-04**
(sí, `011` lo controla en la base), **Q-12** (era una policy abierta; cerrada por ADR-015),
**Q-13** (producción = `origin/main`, verificado por hash), **Q-26** (solo el 9 % de las respuestas
tiene tiempo real: el cronómetro no medía).

**Contradicciones vivas** (no resolver en silencio): **X-01** la FAQ dice que el tiempo de respuesta
influye en la estimación — el código de T-44 ya lo hace verdad, pero **no está publicado**;
**X-02** la FAQ promete mostrar "cómo se movió tu nivel", que sigue sin existir. Ver
[[OPEN_QUESTIONS]] §Contradicciones.

---

## Critical Decisions

Diecinueve ADRs explican por qué el sistema es como es (detalle en `../adr/`). Los diez fundacionales:

| ADR | Decisión | Por qué importa saberlo |
|-----|----------|-------------------------|
| ADR-001 | ClojureScript + re-frame + shadow-cljs | Todo cambio de UI pasa por eventos y suscripciones; no se toca el DOM ni se llama a Supabase desde componentes |
| ADR-002 | Supabase como único backend, RLS como límite de seguridad | No existe lugar donde poner lógica "de servidor" ni secretos. La anon key en el bundle es pública **a propósito** |
| ADR-003 | GitHub Pages con el bundle versionado en Git | Compilar y commitear `app.js` **es** el deploy |
| ADR-004 | IRT 1PL + MAP N(0,1) + Δθ ≤ 0,4 + parada por SE | No quitar el prior ni los límites: sin ellos θ diverge o el test salta de nivel |
| ADR-005 | Contenido como banco de ítems (capa 0), no CMS | El valor está en `questions.error_*`, no en construir un gestor de contenidos |
| ADR-006 | Cohortes por banda con mínimo de inscritos | La confirmación la decide un trigger en la DB; el cliente solo la anticipa |
| ADR-007 | Email por outbox + Edge Function | Sin API key el sistema **degrada**, no falla: la cola queda pendiente |
| ADR-008 | Archivar MathAcademy | El código sigue en `src/` pero fuera del build; no extenderlo |
| ADR-009 | Reglas de negocio en namespaces puros | Toda regla nueva va a un ns puro con test, no dentro de un handler |
| ADR-010 | Project Memory First | Actualizar la memoria es parte de terminar una tarea, no un extra |

Y los nueve posteriores, que tocan lo que se está trabajando hoy:

| ADR | Decisión | Por qué importa saberlo |
|-----|----------|-------------------------|
| ADR-011 | La visión del Libro es el norte; el MVP es una fase | Explica por qué hay tickets que apuntan más allá del alcance actual |
| ADR-012 | Tema oscuro por mapeo global de CSS | No agregar `dark:` por elemento: el mapeo vive en `src/css/app.css` |
| ADR-013 | Config de parada por banco + prerequisitos derivados del historial | No hay tabla de permisos: el acceso se calcula desde `tests` |
| ADR-014 | El tiempo de respuesta es un eje **separado** de θ, en tres fases | No meter el tiempo dentro del 1PL: destruye el perfil "sabe pero lento" |
| ADR-015 | El cliente **no lee `questions`** | El ítem viaja sin respuesta; corrige el servidor. No reabrir esa policy |
| ADR-016 | La IA produce contenido solo en el pipeline de autoría, nunca en runtime | No hay dónde poner una API key (ADR-002) y rompería el costo ≈ $0 |
| ADR-017 | `topic` canónico garantizado por trigger en la base | La regla está duplicada a propósito en `universo.topics/normalize`: si cambia una, cambia la otra |
| ADR-018 | Track experimental de Mecánica Cuántica sobre el mismo motor | Es 100 % datos y **no es producto**: aislado con `active = false` y prefijo `mq_`. Toda métrica del banco PAES necesita `where topic not like 'mq\_%'` |
| ADR-019 | El segundo eje del perfil mide **fluidez (λ)**, no estilos de aprendizaje | El Eje 3 de VISION §3.3 no se implementa: la hipótesis de los "canales de aprendizaje" no tiene respaldo empírico y sería el flanco más fácil de atacar del producto (D-41) |

---

## Immediate Next Steps

1. **Verificar la realidad antes de tocar nada:** `git status`, `git log main..HEAD --oneline`,
   `clj -M:test` (esperado: 74/410/0). Comprobar si sigue habiendo migraciones sin aplicar
   (`supabase/SCHEMA.md` lleva la lista; al 2026-08-13 no hay ninguna ⏳).
2. **Confirmar `041` del todo** con el bloque H de `supabase/queries/verificacion_esquema.sql`: las
   columnas ya se verificaron desde fuera, pero el check y los valores por banco solo se ven desde
   el SQL Editor.
3. **Calibrar los umbrales de fluidez con datos** (T-65): correr `fluency/calibration-report` sobre
   el histórico y reemplazar el 3,0/6,0 autoral por cortes medidos. Es la misma deuda que `032`
   saldó para `min_response_seconds` — un número puesto a mano puede estar del lado equivocado.
4. **Instrumentar el embudo** (T-20): hay tráfico y no se mide nada.
5. **Clasificar los bancos mezclados** (T-60): 128 ítems, el 33 % del banco, sin módulo.
6. **Endurecimiento**: `000_baseline` del esquema (T-48), proteger `theta_band` (T-49), respaldo
   probado (T-07), staging (T-09).

**Antes de empezar, y en serio:** lee [[AGENT_INSTRUCTIONS]]. Al terminar, cierra la sesión con
`../prompts/session-close-memory-update.md` — actualizar [[CURRENT_STATUS]] y crear el
`sessions/SESSION-XXX.md` es parte del trabajo.

---

## Recommended Reading Order

**Para retomar el proyecto (30–45 min):**

1. `../CLAUDE.md` — reglas de trabajo y comandos
2. `HANDOFF.md` — este archivo
3. [[CURRENT_STATUS]] — estado real, bloqueos, próximos pasos
4. [[PROJECT_BRIEF]] — alcance y exclusiones
5. [[ARCHITECTURE]] — cómo está construido y por qué
6. [[DECISIONS]] + el ADR que toque tu tarea
7. [[AGENT_INSTRUCTIONS]] — obligatorio antes de modificar código
8. [[OPEN_QUESTIONS]] — para no re-asumir lo ya marcado como incierto

**Según la tarea:**

- Tocar el diagnóstico → [[TERMINOLOGY]] §IRT, `../adr/ADR-004-irt-1pl-map-y-regla-de-parada`,
  `src/universo/components/tetha.cljs`, `src/universo/irt/progress.cljs`
- Tocar base de datos o policies → `supabase/SCHEMA.md`, la migración correspondiente,
  [[RISKS]] R-14, [[LESSONS_LEARNED]] L-09..L-14
- Tocar cupos → `../adr/ADR-006-cohortes-por-banda-con-minimo-de-inscritos`,
  `src/universo/slots/logic.cljs`, [[RISKS]] R-08
- Tocar contenido pedagógico → `supabase/CONTENT.md`, `../adr/ADR-005-banco-de-items-en-vez-de-cms`
- Cambio estructural amplio → `graph/GRAPH_REPORT.md` + [[GRAPHIFY_INTEGRATION_GUIDE]]
- Navegar como humano → [[OBSIDIAN_WORKSPACE_GUIDE]]
- Planificar → [[ROADMAP]], [[BACKLOG]], [[RISKS]]

**Contexto histórico:** `PROJECT_SUMMARY.md` es la documentación anterior a esta memoria. Contiene
información desactualizada (describe módulos previos al MVP como parte del producto). Úsalo solo como
referencia histórica; ante cualquier discrepancia, **gana `project-memory/`** ([[OPEN_QUESTIONS]] X-07).

---

Relacionado: [[INDEX]] · [[CURRENT_STATUS]] · [[AGENT_INSTRUCTIONS]] · [[ARCHITECTURE]] · [[BACKLOG]]
