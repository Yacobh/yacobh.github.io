# HANDOFF

**Fecha del handoff: 2026-07-26** · Commit `48bf525` · Rama `cursor/mvp-operable-funnel`

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

Es una **iniciativa académica** de la Universidad Arturo Prat (UNAP) con el profesor **Jacobo
Córdova**, quien es además el único desarrollador. El diagnóstico, el perfil y el plan son gratuitos.

**Técnicamente:** SPA en **ClojureScript + re-frame** compilada con shadow-cljs, servida por
**GitHub Pages** en <https://jacobocordova.com>, con **Supabase** (PostgreSQL + Auth + RLS + Edge
Functions) como único backend. No hay servidor propio: el navegador habla directo con Supabase y
**toda la autorización se hace con Row Level Security**.

**Estado:** el funnel completo funciona. Lo que falta para abrir a estudiantes reales **no es
código**: es contenido pedagógico publicado y verificar el envío de emails.

---

## Business Goals

1. Que un estudiante pase de "no sé por dónde partir" a un plan concreto **en una sola sesión**.
2. Reemplazar la nota por un **mapa de errores**: cada alternativa incorrecta está asociada a una
   idea errónea nombrable, y el plan explica *por qué* se equivocó.
3. Formar **cohortes por banda de nivel** (no por curso), viables gracias a un mínimo de inscritos.
4. Operar con costo de infraestructura ≈ $0 (free tiers).
5. Construir un activo reutilizable: el **banco de ítems** con dificultades y explicaciones de error.

No hay ingresos ni pasarela de pago, y no está previsto agregarlos en el MVP. Detalle:
[[BUSINESS_CONTEXT]].

---

## Functional Scope

**Operativo hoy:**

- Registro/login (email+contraseña y Google OAuth), sesión rehidratada, secciones protegidas.
- **Diagnóstico adaptativo IRT**: selección de ítem por cercanía a θ, feedback inmediato con
  explicación del error, prefetch de la siguiente pregunta, parada por precisión.
- **Perfil**: θ, error estándar, banda (`inicial`/`basico`/`intermedio`/`avanzado`), track, déficits
  por módulo ordenados por tasa de error, misconceptions, estabilidad de θ.
- **Mi plan**: capa 0 (errores explicados) + capa 1 (recursos publicados por módulo).
- **Cupos**: listado filtrado por banda, inscripción, "faltan N inscritos", confirmación automática,
  notificación in-app.
- **Panel admin**: usuarios y roles (con salvaguardas), tests, moderación tri-state del guestbook,
  CRUD de preguntas, recursos y cupos con roster.
- **Landing pública** con SEO completo (Open Graph, JSON-LD, sitemap), testimonios reales tomados
  del guestbook aprobado, formulario de contacto.

**Excluido a propósito:** pagos, rol "profesor" separado de admin, asistencia/notas/certificación,
backend propio, app nativa, otras materias PAES, internacionalización, y el producto archivado
"MathAcademy". Detalle: [[PROJECT_BRIEF]] §6.

Requisitos con evidencia línea por línea: [[REQUIREMENTS]].

---

## Technical Scope

```
Navegador: index.html → public/js/app.js (bundle) → universo.core/init!
  re-frame: events/* → app-db → subs → components (Reagent/React 17)
  Lógica pura testeada: components.tetha · irt.progress · profile · slots.logic
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
- **Migraciones:** 9 scripts SQL en `supabase/`, aplicados **a mano** en el SQL Editor, en el orden
  de `supabase/SCHEMA.md`. No hay `db push`.
- **Deploy:** GitHub Pages sobre `main`. **El bundle `public/js/app.js` está versionado en Git**: sin
  `npx shadow-cljs release app` + commit, un cambio de código **no llega a producción**.
- **Tests:** `clj -M:test` → **34 tests / 129 assertions / 0 failures** (verificado 2026-07-26).
- **No hay:** CI, staging, monitoreo, analytics, backups propios verificados, router de URL.

Detalle: [[ARCHITECTURE]] · [[TECH_STACK]] · [[DEPENDENCIES]].

---

## Current State

| Área | Estado |
|------|--------|
| Funnel completo (login → diagnóstico → perfil → plan → cupo) | ✅ operativo |
| Motor IRT (1PL + MAP + parada por SE) | ✅ implementado y testeado |
| Panel de administración | ✅ operativo |
| Contenido pedagógico | 🟡 módulos y blurbs sembrados; **faltan recursos publicados** |
| Email de cohorte | ⚠️ código y migración listos; **despliegue no verificado** |
| Landing y SEO | ✅ (sin analytics) |
| Memoria del proyecto (PMF) | ✅ creada hoy |
| CI / staging / respaldos / monitoreo | ⛔ inexistentes |
| Árbol de trabajo | ⚠️ **sucio**: `public/js/app.js` con +73/−24 sin commitear |
| ¿Está el MVP en producción? | ❓ **por verificar**: `cursor/mvp-operable-funnel` puede no estar mergeada a `main` |

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

**Bloqueantes para abrir a estudiantes reales:**

| # | Pendiente | Tipo | Tarea |
|---|-----------|------|-------|
| 1 | Publicar ≥ 1 recurso por módulo prioritario | Contenido (humano) | T-01 |
| 2 | Aplicar `005`, desplegar la Edge Function, setear `RESEND_API_KEY`, verificar un envío real | Operación | T-02 |
| 3 | Verificar que la inscripción respete `capacity` | Técnico | T-03 |
| 4 | Publicar cupos reales (fecha, sala/enlace, mínimo) y retirar los demo | Negocio | T-04 |
| 5 | Recompilar el bundle, dejar el árbol limpio y publicar en `main` | Técnico | T-08 |
| 6 | Verificar qué versión sirve realmente el dominio | Técnico | T-19 |

**Importante a corto plazo:** aviso de privacidad (T-10), CI con `clj -M:test` (T-06), respaldo de
base de datos probado (T-07), completar el mapeo `topic → module-slug` (T-28), estados vacíos
honestos en plan y cupos (T-24), router de URL (T-05).

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
5. **R-10 "Mi plan" vacío.** El mecanismo funciona pero sin recursos publicados el estudiante ve una
   pantalla pobre justo en el momento de mayor expectativa.

Además: R-03 (sin respaldo verificado), R-13 (bundle desalineado del fuente), R-17 (`difficulty`
posiblemente no calibrada ⇒ θ sesgada).

---

## Open Questions

Las que hay que responder antes de avanzar (lista completa en [[OPEN_QUESTIONS]]):

- **Q-02** ¿Las clases de los cupos tienen costo? (define copy, JSON-LD y T-04)
- **Q-04** ¿La inscripción respeta `capacity`? (cierra F3)
- **Q-07** ¿Qué pasa al repetir el diagnóstico: sobrescribir, versionar o histórico? La FAQ **promete**
  ver "cómo se movió tu nivel", lo que exige histórico que hoy probablemente no existe
- **Q-12** ¿Qué policy usa el estudiante para leer `questions`? Si es amplia, el banco de ítems es
  descargable
- **Q-13** ¿Qué versión está realmente en producción?
- **Q-05 / Q-06** ¿Están calibradas las dificultades? ¿Están mapeados todos los topics a módulos?

**Contradicciones documentadas** (no resolver en silencio): la FAQ dice que el tiempo de respuesta
influye en la estimación (el modelo 1PL no lo usa); `007` restringe `questions` a admin pero el
estudiante debe leerlas; `.gitignore` ignora un archivo que está trackeado; versiones desalineadas de
shadow-cljs y KaTeX. Ver [[OPEN_QUESTIONS]] §Contradicciones.

---

## Critical Decisions

Diez decisiones que explican por qué el sistema es como es (detalle en `../adr/`):

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

---

## Immediate Next Steps

1. **Verificar la realidad antes de tocar nada:** `git status`, `git log main..HEAD --oneline`,
   `clj -M:test`. Decidir qué hacer con el `public/js/app.js` modificado (T-08, T-19).
2. **Responder Q-04** leyendo los triggers de `supabase/migrations/001_mvp_schema.sql` y, si falta el
   control de capacidad, agregarlo con su test espejo en `universo.slots.logic` (T-03).
3. **Cerrar el pipeline de email** (T-02): aplicar `005`, `functions deploy`, `secrets set`, invocar
   y comprobar que una fila de `email_outbox` pasa a `sent`.
4. **Contenido mínimo** (T-01): al menos un recurso publicado por módulo prioritario de
   `supabase/CONTENT.md`. Es el paso que más cambia la experiencia del estudiante.
5. **Cupos reales** (T-04) una vez definidos Q-02 y Q-09.
6. **Endurecimiento mínimo**: CI con `clj -M:test` (T-06) y un respaldo de base de datos probado
   (T-07). Antes de abrir a público real: aviso de privacidad (T-10).

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
