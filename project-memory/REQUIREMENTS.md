# REQUIREMENTS

Última actualización: **2026-08-12** (RF-3.8–3.11 y RF-4.7–4.8: eje de fluidez; RF-2.2 corregido:
θ inicial es −1,0 desde D-39)

> Este documento es **reconstruido desde el código, las migraciones y la landing**, no desde un
> documento de requisitos original (no existe). Cada requisito indica su evidencia. Lo que no está
> evidenciado va a §7 "Información faltante" o a [[OPEN_QUESTIONS]].

Leyenda de estado: ✅ implementado y testeado · 🟡 implementado sin test automatizado ·
⚠️ implementado pero no verificado en producción · ⛔ no implementado

---

## 1. Requerimientos funcionales

### RF-1 — Autenticación y sesión

| ID | Requisito | Estado | Evidencia |
|----|-----------|--------|-----------|
| RF-1.1 | El usuario puede registrarse e iniciar sesión con email y contraseña | 🟡 | `universo.supabase/sign-up`, `sign-in`; `components/login.cljs` |
| RF-1.2 | El usuario puede iniciar sesión con Google (OAuth), volviendo a la URL actual | ⛔ | `universo.supabase/sign-in-with-google` existe pero no tiene ningún llamador en `components/login.cljs` ni en ningún otro componente -- código muerto, no una función parcial |
| RF-1.3 | La sesión se rehidrata al cargar la página; la UI espera `:auth/ready?` antes de decidir qué mostrar | ✅ | `events/auth.cljs`, `test/universo/events/auth_test.cljs` |
| RF-1.4 | Las secciones `dashboard`, `diagnostic-test`, `admin`, `plan`, `cupos` exigen sesión válida | ✅ | `events/auth.cljs` `protected-sections` |
| RF-1.5 | Al intentar entrar a una sección protegida sin sesión, se recuerda el destino y se redirige tras el login | ✅ | `:auth/redirect-after-login` en `db.cljs` |
| RF-1.6 | El usuario puede cerrar sesión desde el menú | 🟡 | `:auth/logout`, `home.cljs` |
| RF-1.7 | La UI reacciona a cambios de sesión externos (SIGNED_IN / SIGNED_OUT / TOKEN_REFRESHED) | 🟡 | `on-auth-state-change` en `events/auth.cljs` |

### RF-2 — Diagnóstico adaptativo (IRT)

| ID | Requisito | Estado | Evidencia |
|----|-----------|--------|-----------|
| RF-2.1 | El estudiante elige la evaluación (topic) entre los topics distintos del banco | 🟡 | `:test/open-selection`, `crud/get-distinct-topics` |
| RF-2.2 | θ inicial = **−1,0**: el test abre por ítems más fáciles que la media del banco, no por el centro de la escala (antes 0,0) | ✅ | `:test/start` en `events/test.cljs` ([[DECISIONS]] D-39, 2026-08-11). ⚠️ `db/default-db` y `test_subs` siguen en `0.0`; hoy no se contradicen porque `:test/start` pisa el valor |
| RF-2.3 | Cada ítem se elige entre las preguntas no respondidas del topic con dificultad en `[θ−1, θ+1]`, ampliando a `±2` si no hay candidatos, escogiendo la de dificultad más cercana a θ | 🟡 | `irt/progress.cljs` `closest-question`, `selection-half-width(-wide)`; `events/test.cljs` |
| RF-2.4 | θ se re-estima tras cada respuesta con Newton-Raphson sobre el posterior MAP (prior N(0,1), precisión 1.0) | ✅ | `components/tetha.cljs`, `test/universo/components/tetha_test.cljs` |
| RF-2.5 | θ se acota a `[-3, 3]` y el salto entre ítems a `|Δθ| ≤ 0,4` | ✅ | `clamp-theta`, `limit-theta-step` + tests |
| RF-2.6 | El test se detiene por precisión (`n ≥ 5` y `SE(θ) ≤ 0,35`), por máximo (`n = 12`) o por agotamiento de ítems | ✅ | `irt/progress.cljs` `stop-reason`, `progress_test.cljs` |
| RF-2.7 | `SE(θ) = 1/√I(θ)` con `I(θ)` = información de Fisher del modelo 1PL | ✅ | `irt/progress.cljs` |
| RF-2.8 | Tras responder, se muestra feedback inmediato con la explicación del error de la alternativa elegida | 🟡 | `components/feedback_modal.cljs`, `normalize-question` (`:errors`) |
| RF-2.9 | La siguiente pregunta se precarga mientras se muestra el feedback | 🟡 | `:test/fetch-next-question` mode `:prefetch` |
| RF-2.10 | Se registra por respuesta: id de pregunta, alternativa elegida, correcto?, tiempo en ms y dificultad | 🟡 | `:test.responses` en `db.cljs` |
| RF-2.11 | Se guarda el historial de θ para graficar la evolución | 🟡 | `:theta-history`, `components/irt_chart.cljs`, `progress-points` |
| RF-2.12 | El resultado del test se persiste en `tests` asociado al `user_id` | 🟡 | `db/crud.cljs`, migración de RLS de `tests` |
| RF-2.13 | El estudiante puede repetir el diagnóstico más adelante | 🟡 | sin restricción en código; comunicado en la FAQ |
| RF-2.14 | Las expresiones matemáticas se renderizan con KaTeX | 🟡 | `components/math_render.cljs`, CSS de KaTeX en `index.html` |

### RF-3 — Perfil de aprendizaje

| ID | Requisito | Estado | Evidencia |
|----|-----------|--------|-----------|
| RF-3.1 | Al cerrar el diagnóstico se construye el perfil con θ, SE, banda, track, déficits y misconceptions | ✅ | `universo.profile/build`, `profile_test.cljs` |
| RF-3.2 | La banda se deriva de θ: `< 0 inicial`, `[0,1) basico`, `[1,2) intermedio`, `≥ 2 avanzado` | ✅ | `profile/theta-band` + test |
| RF-3.3 | Los déficits se agrupan por `module-slug` y se ordenan por tasa de error descendente, incluyendo solo módulos con al menos un error | ✅ | `profile/deficits-from-responses` + test |
| RF-3.4 | Cada misconception guarda pregunta, alternativa elegida, módulo y explicación | ✅ | `profile/misconceptions-from` + test |
| RF-3.5 | Si hay ≥ 3 puntos de θ, se calcula estabilidad (varianza de los últimos 3; `stable?` si `< 0,15`) | ✅ | `profile/build` + test |
| RF-3.6 | El perfil se materializa en `student_profiles` (θ, `theta_band`, `profile` JSONB) | 🟡 | `events/profile.cljs`, `001_mvp_schema.sql` |
| RF-3.7 | Un topic sin mapeo conocido produce `unknown/<topic>` en lugar de fallar | ✅ | `profile/module-slug-for` |
| RF-3.8 | El perfil incluye un **segundo eje, fluidez (λ)**: mediana del tiempo relativo (`segundos observados / segundos de lectura`) sobre las respuestas correctas, medidas y esforzadas | ✅ | `universo.irt.fluency/classify`, `fluency_test.cljs`, ADR-019 |
| RF-3.9 | Con menos de 4 respuestas usables **no se asigna banda de fluidez**: se informa la medición sin etiquetar | ✅ | `fluency/min-responses`, `classify` (`:enough?`) + test |
| RF-3.10 | El cruce banda de θ × banda de λ produce uno de cuatro perfiles, cada uno con una **acción distinta** | ✅ | `fluency/profiles`, `profile-for` + test |
| RF-3.11 | Los cortes de fluidez son **configurables por banco** (`test_configs.fluency_fluida_max` / `fluency_media_max`); sin config se usan los defaults del código | ✅ | `fluency/thresholds-from-config`, migración `041` aplicada 2026-08-13 |

### RF-4 — Mi plan

| ID | Requisito | Estado | Evidencia |
|----|-----------|--------|-----------|
| RF-4.1 | El plan muestra los déficits ordenados por prioridad | 🟡 | `components/plan.cljs`, `events/plan.cljs` |
| RF-4.2 | Capa 0: por cada error se muestra la explicación del distractor (`questions.error_*`) | 🟡 | `feedback_modal` / `plan.cljs` |
| RF-4.3 | Capa 1: se listan los `resources` **publicados** de los módulos deficitarios | 🟡 | `events/plan.cljs`, `resources.published` |
| RF-4.4 | Si el estudiante no tiene perfil, el plan invita a hacer el diagnóstico | 🟡 | `plan.cljs` estado vacío |
| RF-4.5 | Los recursos soportan tipos texto, video (URL), audio (URL) y ejercicio | 🟡 | `001_mvp_schema.sql`, `supabase/CONTENT.md` |
| RF-4.6 | Cada módulo puede aportar contexto histórico (`modules.historical_blurb`) | 🟡 | `002`, `004` |
| RF-4.7 | El plan muestra la **tarjeta del cuadrante θ × λ** con la acción del perfil; si no hay evidencia suficiente lo dice explícitamente en vez de ocultarse | ✅ | `components/plan.cljs` `fluency-card`/`fluency-grid` |
| RF-4.8 | Para perfiles guardados antes de ADR-019, la fluidez se **recalcula desde el último test**; θ y el resto del perfil no se reinterpretan | ✅ | `:plan/fetch-last-test!` en `events/plan.cljs` |

### RF-5 — Cupos e inscripción

| ID | Requisito | Estado | Evidencia |
|----|-----------|--------|-----------|
| RF-5.1 | El estudiante ve solo cupos de **su** `theta_band` y en estado `open` o `confirmed` | ✅ | `slots/logic.cljs` `filter-slots-for-band`, `logic_test.cljs` |
| RF-5.2 | Sin banda (sin diagnóstico) no se muestra ningún cupo y se explica por qué | ✅ | `filter-slots-for-band` con `band = nil` → `[]` |
| RF-5.3 | Cada cupo indica modalidad (online/presencial), fecha/hora, lugar o enlace, capacidad y mínimo | 🟡 | `components/slots.cljs`, `class_slots` |
| RF-5.4 | El estudiante se inscribe en un cupo; el enrollment queda `pending` | 🟡 | `events/slots.cljs`, `enrollments` |
| RF-5.5 | Se cuentan como activos los enrollments `pending` y `confirmed` | ✅ | `slots/logic.cljs` `active-enrollment-count` + test |
| RF-5.6 | Se muestra cuántos inscritos faltan para confirmar el grupo | ✅ | `remaining-to-confirm` + test |
| RF-5.7 | Al alcanzar `min_enrollments`, el cupo pasa de `open` a `confirmed` (trigger en DB; espejo puro en cliente) | ✅ | trigger en `001_mvp_schema.sql`; `should-confirm-slot?`, `after-enrollment` + tests |
| RF-5.8 | La confirmación genera una notificación in-app para cada inscrito | 🟡 | `notifications`, banner en UI |
| RF-5.9 | El estudiante puede ver sus inscripciones y su estado | 🟡 | `:slots.enrollments` |
| RF-5.10 | La inscripción respeta la capacidad del cupo | ⚠️ | `class_slots.capacity` existe; **verificar** que hay check/trigger que impida sobrepasarla ([[OPEN_QUESTIONS]] Q-04) |

### RF-6 — Notificaciones y email de cohorte

| ID | Requisito | Estado | Evidencia |
|----|-----------|--------|-----------|
| RF-6.1 | Un trigger sobre `notifications` encola un email en `email_outbox` | 🟡 | `005_email_outbox.sql` |
| RF-6.2 | La Edge Function `send-enrollment-emails` drena hasta 25 filas `pending` por invocación y las marca `sent`/`failed` con `attempts` y `last_error` | ⚠️ | `supabase/functions/send-enrollment-emails/index.ts` |
| RF-6.3 | Sin `RESEND_API_KEY` la function responde 503 y el outbox queda `pending` (las notificaciones in-app siguen funcionando) | ⚠️ | mismo archivo |
| RF-6.4 | El envío puede programarse por cron (cada ~5 min) desde el dashboard de Supabase | ⛔ | documentado en `supabase/functions/README.md`, no verificado |

### RF-7 — Panel de administración

| ID | Requisito | Estado | Evidencia |
|----|-----------|--------|-----------|
| RF-7.1 | Solo usuarios con `profiles.role = 'admin'` acceden al panel; el control real es RLS vía `public.is_admin()` | 🟡 | `admin_rls.sql`, `events/auth.cljs` |
| RF-7.2 | Resumen con contadores (usuarios, tests, guestbook) | 🟡 | `:admin.overview`, índices en `006` |
| RF-7.3 | Listado, búsqueda y paginación de usuarios; promover/degradar rol | 🟡 | `events/admin.cljs`, policy `profiles_update_admin` (`006`) |
| RF-7.4 | Un admin no puede quitarse el rol a sí mismo (`id <> auth.uid()`) y no se puede quedar sin ningún admin (trigger `profiles_protect_last_admin`) | 🟡 | `006_admin_role_management.sql` |
| RF-7.5 | Listado, búsqueda y paginación de tests | 🟡 | `events/admin.cljs` |
| RF-7.6 | Moderación tri-state del guestbook: `null` pendiente, `true` aprobado, `false` papelera, con borrado permanente | 🟡 | `guestbook_tri_state.sql`, `events/admin.cljs` |
| RF-7.7 | CRUD del banco de preguntas con filtro por topic y ordenamiento | 🟡 | `components/admin_questions.cljs`, `007_questions_admin_rls.sql` |
| RF-7.8 | CRUD de recursos por módulo, con publicar/despublicar | 🟡 | `events/admin.cljs`, `resources` |
| RF-7.9 | CRUD de cupos y visualización del roster de inscritos | 🟡 | `:admin.slots`, `:admin.rosters` |
| RF-7.10 | Si un UPDATE de rol afecta 0 filas (falta la migración `006`), la UI muestra un aviso explícito | 🟡 | documentado en `supabase/SCHEMA.md` |

### RF-8 — Landing pública, testimonios y contacto

| ID | Requisito | Estado | Evidencia |
|----|-----------|--------|-----------|
| RF-8.1 | Landing con hero, 4 pasos, 4 pilares, FAQ desplegable y CTA único al diagnóstico | 🟡 | `components/landing.cljs` |
| RF-8.2 | Los testimonios son entradas **aprobadas** del libro de visitas | 🟡 | `events/landing.cljs`, `guestbook.is_approved = true` |
| RF-8.3 | Cualquier visitante puede firmar el libro de visitas; queda pendiente de moderación | 🟡 | `db/supabase.cljs` `add-guestbook-entry` |
| RF-8.4 | Formulario de contacto que persiste en `contacto` con estados de carga/éxito/error | 🟡 | `events/contacto.cljs` |
| RF-8.5 | SEO: title/description, canonical, Open Graph, Twitter Card, JSON-LD (`EducationalOrganization`, `Course`, `FAQPage`), `sitemap.xml`, `robots.txt` | 🟡 | `index.html` |
| RF-8.6 | Contenido `<noscript>` describiendo la oferta | 🟡 | `index.html` |
| RF-8.7 | Página pública de perfil del profesor | 🟡 | `components/resume.cljs` |

### RF-9 — Tracking de visitantes

| ID | Requisito | Estado | Evidencia |
|----|-----------|--------|-----------|
| RF-9.1 | Al cargar la app se registra la visita (IP, ciudad, país, idioma, navegador, SO) | 🟡 | `visitor_tracker.cljs`, `ip.cljs`, `geo.cljs` |
| RF-9.2 | Se puede capturar el nivel de batería del dispositivo | 🟡 | `battery.cljs` (no alcanzable desde `core.cljs` hoy) |

---

## 2. Requerimientos no funcionales

| ID | RNF | Objetivo / regla | Estado |
|----|-----|------------------|--------|
| RNF-01 | **Seguridad** | RLS activa en toda tabla; ninguna autorización en el cliente. Anon key pública por diseño; secretos solo en Supabase secrets | 🟡 verificado a mano |
| RNF-02 | **Privacidad** | Recolección mínima; el diagnóstico no es registro académico | ⚠️ sin política de privacidad publicada ([[RISKS]] R-06) |
| RNF-03 | **Rendimiento del diagnóstico** | El siguiente ítem debe estar disponible sin espera perceptible → prefetch durante el feedback | 🟡 |
| RNF-04 | **Duración del diagnóstico** | ~20 min, 5–12 ítems | ✅ por configuración |
| RNF-05 | **Responsive / móvil** | Debe funcionar en teléfono (Tailwind, menú móvil, `viewport`) | 🟡 |
| RNF-06 | **Accesibilidad** | `aria-label`, `aria-expanded`, `aria-hidden`, foco visible, HTML semántico | 🟡 parcial, sin auditoría |
| RNF-07 | **Costo** | Infraestructura ≈ $0 (free tiers) | ✅ |
| RNF-08 | **Disponibilidad** | Best-effort; sin SLA, sin monitoreo, sin alertas | ⛔ |
| RNF-09 | **Mantenibilidad** | Reglas de negocio en namespaces puros con tests; acceso a datos centralizado en `db.crud` | ✅ |
| RNF-10 | **Testabilidad** | `clj -M:test` en verde antes de commitear | ✅ manual |
| RNF-11 | **Idioma** | Todo el producto en `es-CL`; documentación en español | ✅ |
| RNF-12 | **SEO** | Indexable, con datos estructurados coherentes con lo que ofrece el producto | 🟡 |
| RNF-13 | **Trazabilidad de decisiones** | Toda decisión relevante en ADR ([[DECISIONS]]) | ✅ desde 2026-07-26 |
| RNF-14 | **Portabilidad de datos** | Todo el estado vive en Postgres (Supabase); exportable con `pg_dump` | 🟡 sin backup propio ([[RISKS]] R-03) |
| RNF-15 | **Tamaño del bundle** | `public/js/app.js` versionado; vigilar crecimiento del artefacto en Git | ⚠️ |

---

## 3. Reglas de negocio

| ID | Regla | Dónde se impone |
|----|-------|-----------------|
| RN-01 | Banda de θ: `< 0 → inicial`, `[0,1) → basico`, `[1,2) → intermedio`, `≥ 2 → avanzado` | `profile/theta-band` (cliente) + `class_slots.theta_band` (check en SQL) |
| RN-02 | θ acotado a `[-3, 3]` | `tetha/clamp-theta` |
| RN-03 | `|Δθ|` entre ítems ≤ 0,4 logits | `tetha/limit-theta-step` |
| RN-04 | Prior de θ: N(0, 1) (precisión 1.0) — encoge θ hacia 0 con pocas respuestas | `tetha/prior-mean`, `prior-precision` |
| RN-05 | Parada del diagnóstico: `n ≥ 12` → `:max-items`; `n ≥ 5 ∧ SE ≤ 0,35` → `:precision`; sin ítems → `:exhausted` | `irt/progress/stop-reason` |
| RN-06 | Un estudiante solo ve cupos de su banda, en estado `open` o `confirmed` | `slots/logic/filter-slots-for-band` + RLS |
| RN-07 | Enrollments activos = `pending` ∪ `confirmed` | `slots/logic/active-enrollment-count` |
| RN-08 | Un cupo `open` con `min_enrollments > 0` pasa a `confirmed` cuando los activos alcanzan el mínimo | Trigger SQL (**fuente de verdad**) + `slots/logic/should-confirm-slot?` (espejo) |
| RN-09 | La confirmación de cupo genera notificación in-app y encola un email | Triggers en `001` y `005` |
| RN-10 | Solo `role = 'admin'` administra; un admin no puede degradarse a sí mismo | `admin_rls.sql`, `006_admin_role_management.sql` |
| RN-11 | Nunca puede quedar el sistema sin admin | Trigger `profiles_protect_last_admin` (`006`) |
| RN-12 | Guestbook: `null` = pendiente, `true` = aprobado (visible), `false` = papelera | `guestbook_tri_state.sql` |
| RN-13 | Solo se muestran `resources` con `published = true` | `events/plan.cljs` + RLS |
| RN-14 | Solo se muestran testimonios aprobados | `events/landing.cljs` |
| RN-15 | Un módulo pertenece a exactamente un track: `aritmetica`, `algebra` o `geometria` | check en `modules.track` |
| RN-16 | El diagnóstico se hace **sin calculadora**; el tiempo de respuesta se registra | Comunicado en FAQ; `time-ms` en responses. **No se fuerza técnicamente** |
| RN-17 | Cada distractor debe tener una idea errónea nombrable, no un "incorrecto" genérico | `supabase/CONTENT.md` (regla editorial) |

---

## 4. Casos de uso

### CU-01 — Estudiante nuevo obtiene su plan
**Actor:** estudiante · **Precondición:** hay preguntas publicadas en al menos un topic.
1. Entra a la landing y pulsa "Comenzar mi diagnóstico".
2. Crea cuenta con email/contraseña (Google OAuth no está disponible en la UI hoy, ver RF-1.2).
3. Elige la evaluación disponible.
4. Responde ítems; tras cada uno ve si acertó y la explicación si falló.
5. El sistema detiene el test por precisión o por máximo de ítems.
6. Ve su perfil: θ, banda, déficits ordenados, errores explicados.
7. Entra a "Mi plan" y ve los recursos publicados de sus módulos deficitarios.

**Postcondición:** fila en `tests`, fila/actualización en `student_profiles`.
**Alternativas:** si no hay ítems suficientes, el test termina con `:exhausted` y el perfil se
construye con lo respondido.

### CU-02 — Estudiante se inscribe en un grupo
**Precondición:** el estudiante tiene `student_profiles.theta_band`; existe un `class_slot` `open`
en esa banda.
1. Entra a "Cupos" y ve solo los de su banda.
2. Elige modalidad y horario y se inscribe.
3. Ve "faltan N inscritos" o "grupo confirmado".
4. Al confirmarse, recibe notificación in-app y (si el envío está operativo) un email.

**Excepción:** sin diagnóstico previo la lista está vacía y se le invita a hacer el diagnóstico.

### CU-03 — Admin publica un cupo
**Precondición:** cuenta con `role = 'admin'`; migraciones `001` y `006` aplicadas.
1. Admin → Cupos → nuevo cupo.
2. Define banda, track, modalidad, fecha/hora, lugar o enlace, capacidad, mínimo de inscritos, título.
3. Publica con `status = 'open'`.
4. Consulta el roster a medida que llegan inscripciones.

### CU-04 — Admin mejora el contenido de un ítem
1. Admin → Preguntas, filtra por topic.
2. Edita `error_a..error_d` con la idea errónea concreta de cada distractor (1–2 frases, KaTeX si hace falta).
3. Verifica que `module_id` apunte al módulo Baldor correcto.
4. Guarda. El cambio aparece en el feedback del diagnóstico y en la capa 0 del plan.

### CU-05 — Admin promueve a otro usuario a admin
1. Admin → Usuarios, busca por email.
2. Pulsa "Hacer admin".
3. Si la migración `006` no está aplicada, el UPDATE afecta 0 filas y la UI muestra un aviso.

### CU-06 — Admin modera el libro de visitas
1. Admin → Guestbook, filtro "pendientes" (`is_approved is null`).
2. Aprueba (aparece como testimonio en la landing) o envía a papelera.
3. Desde papelera puede borrar permanentemente.

### CU-07 — Operador drena la cola de email
1. `supabase functions invoke send-enrollment-emails` (o cron cada 5 min).
2. La function toma hasta 25 filas `pending` y las marca `sent` o `failed`.
3. Si falta `RESEND_API_KEY`, responde 503 y no consume la cola.

### CU-08 — Nueva sesión de IA continúa el proyecto
1. Lee `CLAUDE.md` y `project-memory/HANDOFF.md`.
2. Lee `CURRENT_STATUS.md`, `ARCHITECTURE.md`, `DECISIONS.md`, `AGENT_INSTRUCTIONS.md`.
3. Consulta `graph/GRAPH_REPORT.md` si el cambio es estructural.
4. Trabaja; al cerrar, actualiza la memoria según `prompts/session-close-memory-update.md`.

---

## 5. Restricciones

| ID | Restricción | Origen |
|----|-------------|--------|
| C-01 | Sin backend propio: solo cliente + Supabase | [[../adr/ADR-002-supabase-como-unico-backend]] |
| C-02 | Hosting estático (GitHub Pages): sin SSR, sin rutas de servidor, sin variables de entorno en build | [[../adr/ADR-003-github-pages-artefacto-versionado]] |
| C-03 | El artefacto `public/js/app.js` se compila y commitea a mano | ADR-003 |
| C-04 | Migraciones SQL aplicadas manualmente en el SQL Editor, en orden documentado | `supabase/SCHEMA.md` |
| C-05 | Sin CI/CD ni entorno de staging | [[RISKS]] R-04 |
| C-06 | Un solo desarrollador; el tiempo humano es el recurso escaso | [[RISKS]] R-01 |
| C-07 | Free tiers de Supabase y Resend (límites de filas, requests y emails/día) | [[DEPENDENCIES]] |
| C-08 | Namespace ClojureScript debe coincidir con la ruta del archivo | shadow-cljs |
| C-09 | Producto solo en español de Chile | [[BUSINESS_CONTEXT]] |
| C-10 | Sin rol "profesor" separado de admin en el MVP; las clases de los cupos **sí** tendrán pago ($10.000 CLP/hora, D-19/D-26 -- ya no excluido, falta implementar el cobro) | [[PROJECT_BRIEF]] §6 |

---

## 6. Criterios de aceptación (por área)

**Diagnóstico**
- [ ] Con 5 respuestas correctas seguidas en ítems de dificultad creciente, θ sube de forma
      monótona pero nunca más de 0,4 por ítem.
- [ ] Con respuestas alternadas, el test no termina antes del ítem 5.
- [ ] El test nunca supera 12 ítems.
- [ ] Ninguna pregunta se repite dentro del mismo test.
- [ ] Si el topic tiene menos de 5 ítems, el test cierra con `:exhausted` y aun así produce perfil.

**Perfil / plan**
- [ ] θ = 0,42 ⇒ banda `basico`.
- [ ] θ = −0,01 ⇒ banda `inicial` (borde inferior).
- [ ] θ = 2,0 ⇒ banda `avanzado` (borde superior).
- [ ] Un módulo sin errores no aparece en déficits.
- [ ] Los déficits se ordenan por tasa de error, no por conteo absoluto.
- [ ] El plan solo lista recursos con `published = true`.

**Cupos**
- [ ] Estudiante `basico` no ve cupos `intermedio`.
- [ ] Estudiante sin banda ve lista vacía con mensaje explicativo.
- [ ] Cupo con `min_enrollments = 3` y 2 activos muestra "falta 1".
- [ ] Al inscribirse el tercero, el cupo pasa a `confirmed` y se crea notificación.
- [ ] Cupos `cancelled`/`closed` no se muestran al estudiante.

**Admin / seguridad**
- [ ] Un usuario `user` que llama a la tabla `profiles` de otro obtiene 0 filas.
- [ ] Un `user` no puede insertar ni actualizar `questions`.
- [ ] Un admin no puede quitarse su propio rol.
- [ ] El sistema nunca queda sin admin.
- [ ] Un estudiante solo ve sus propios `enrollments` y su propio `student_profiles`.

**Email**
- [ ] Sin `RESEND_API_KEY`: 503 y la cola intacta.
- [ ] Con la key: filas pasan a `sent` y `sent_at` queda poblado.
- [ ] Un fallo de Resend deja `failed`, incrementa `attempts` y guarda `last_error`.

---

## 7. Información faltante

Lo siguiente **no está determinado** por el repositorio. No asumir; ver [[OPEN_QUESTIONS]].

1. **Q-04** ¿Hay control de capacidad al inscribirse, o un cupo puede sobrepasar `capacity`?
2. **Q-05** ¿Cuántas preguntas hay hoy en `questions` por topic, y están calibradas sus
   `difficulty` con datos reales o asignadas a criterio?
3. **Q-06** ¿Los topics del banco (`numbers_V1`, `algebra`, …) cubren los ejes reales de la PAES M1?
   El mapeo `topic → module-slug` de `universo.profile` es parcial y todo lo no mapeado cae en
   `unknown/*`.
4. **Q-07** ¿Qué debe pasar si un estudiante repite el diagnóstico: se sobrescribe su perfil, se
   versiona, o se guarda histórico? Hoy `student_profiles` es materialización única.
5. **Q-08** ¿Existe requisito de aviso de privacidad / consentimiento para estudiantes menores de
   edad, dado el respaldo institucional?
6. **Q-09** ¿Cuál es el criterio de negocio para `capacity` y `min_enrollments` por defecto?
   (los datos demo usan 6–8 y 3).
7. **Q-10** ¿Hay definición de "módulo prioritario" además de la lista de `supabase/CONTENT.md`?

---

Relacionado: [[PROJECT_BRIEF]] · [[ARCHITECTURE]] · [[TERMINOLOGY]] · [[BACKLOG]] ·
[[OPEN_QUESTIONS]] · [[ASSUMPTIONS]]
