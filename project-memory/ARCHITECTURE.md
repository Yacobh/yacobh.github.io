# ARCHITECTURE

Última actualización: **2026-07-29** · Verificado contra `src/`, `supabase/`, `shadow-cljs.edn`,
`index.html` y `project-memory/graph/GRAPH_REPORT.md`

---

## 1. Arquitectura general

**Patrón:** SPA cliente-pesado + BaaS. No existe servidor propio ni capa intermedia.

```
┌───────────────────────────────────────────────────────────────────────────┐
│ NAVEGADOR                                                                 │
│                                                                           │
│  index.html (SEO, JSON-LD, KaTeX CSS)                                     │
│      └─ public/js/app.js  (bundle shadow-cljs, VERSIONADO en Git)          │
│           └─ universo.core/init!                                          │
│                ├─ dispatch-sync [:initialize-db]   → universo.db          │
│                ├─ dispatch [:auth/init]            → events.auth          │
│                ├─ tracker/start-tracking!          → visitor_tracker      │
│                └─ mount-root → views/main-panel → home                    │
│                                                                           │
│  ┌──── re-frame ─────────────────────────────────────────────────────┐    │
│  │  events/*  ──(reg-event-fx)──▶ reg-fx (I/O)                       │    │
│  │      │                              │                            │    │
│  │      ▼                              ▼                            │    │
│  │   app-db  ◀────── dispatch ───── callbacks async                  │    │
│  │      │                                                            │    │
│  │      └── subs/* ──▶ components/* (Reagent) ──▶ DOM                │    │
│  └───────────────────────────────────────────────────────────────────┘    │
│                                                                           │
│  Lógica pura (sin I/O, testeada):                                         │
│    components.tetha · irt.progress · profile · slots.logic                │
│    access · catalog                                                       │
└──────────────────────────────┬────────────────────────────────────────────┘
                               │ HTTPS + JWT del usuario (supabase-js)
                               ▼
┌───────────────────────────────────────────────────────────────────────────┐
│ SUPABASE  (proyecto jmnqklhxcdccvdhuuiji)                                  │
│                                                                           │
│  Auth (email/password; Google OAuth definido pero sin UI) ──▶ auth.users  │
│                                                                           │
│  PostgreSQL + ROW LEVEL SECURITY  ← único límite de autorización          │
│    profiles · questions · tests · guestbook · visitor · contacto           │
│    modules · student_profiles · resources                                 │
│    class_slots · enrollments · notifications · email_outbox                │
│    función public.is_admin()                                              │
│                                                                           │
│  Triggers:                                                                │
│    enrollments  → ¿activos ≥ min_enrollments? → class_slots.confirmed      │
│    class_slots confirmado → notifications (una por inscrito)               │
│    notifications → email_outbox (pending)                                  │
│    profiles → protect_last_admin                                          │
│                                                                           │
│  Edge Function `send-enrollment-emails` (Deno, service_role)               │
│    lee email_outbox pending (25 max) → Resend → sent | failed              │
└──────────────────────────────┬────────────────────────────────────────────┘
                               ▼
                        Resend API (email transaccional)
```

**Consecuencias de esta arquitectura** (aceptadas):

- Toda la lógica de negocio del cliente es *inspeccionable* por el usuario final: nada secreto
  puede vivir en el bundle.
- La seguridad se juega **entera** en RLS. Un error de policy es un incidente de datos.
- El despliegue es un `git push` de artefactos estáticos: no hay build server que pueda fallar,
  pero tampoco hay validación automática.

---

## 2. Componentes principales

### 2.1 Núcleo de la aplicación

| Componente | Namespace | Responsabilidad |
|-----------|-----------|-----------------|
| Bootstrap | `universo.core` | Inicializa `app-db`, sesión, tracking y monta React. Requiere todos los `events/*` (si un ns de eventos no se requiere aquí, sus handlers no existen) |
| Estado | `universo.db` | `default-db`: forma completa y documentada del `app-db` (auth, admin, landing, visitor, dashboard, student-profile, plan, slots, notifications, test, bookings) |
| Lectura | `universo.subs` | Suscripciones globales de UI (`:current-page`, `:current-section`, `:transitioning`) |
| Ruteo | `universo.views` + `universo.home` | `views/pages` solo resuelve `:home`. El **ruteo real** es por *sección* dentro de `home/main-content` (`case current-section`) |
| Layout | `universo.home` | Nav fija (links según `:auth/ready?`, `logged-in?`, `admin?`, botón de tema), contenido con transición de opacidad, footer con contacto |
| Tema | `universo.events.theme` + `src/css/app.css` | Claro/oscuro (`:theme` en `app-db`, `:theme/init`/`:theme/toggle`, persistido en `localStorage`, clase `dark` en `<html>` aplicada antes de `app.js` vía script inline en `index.html`). El tema oscuro de los ~15 componentes se cubre con un mapeo global de clases en `app.css` (`.dark .clase-existente`), no con `dark:` por elemento — ver [[../adr/ADR-012-tema-oscuro-mapeo-css-global]] *(2026-08-05)* |

> **Nota de arquitectura:** no hay router de URL. La navegación es estado en `app-db`
> (`:ui/current-section`), sin history API ni deep links. Consecuencia: no se puede compartir un
> enlace a "Mi plan"; recargar vuelve a la landing. Ver [[BACKLOG]] T-05.

### 2.2 Motor IRT (el corazón del producto)

Tres namespaces puros + un ns de eventos:

| Namespace | Contenido | Test |
|-----------|-----------|------|
| `universo.components.tetha` | Modelo 1PL/Rasch: `probability-1pl`, derivadas de la log-verosimilitud, score y Hessiano MAP con prior N(0,1), `newton-raphson-iteration`, `clamp-theta` `[-3,3]`, `limit-theta-step` (Δθ ≤ 0,4) | `tetha_test.cljs` |
| `universo.irt.progress` | `fisher-information` (`I(θ) = −f''(θ)`), `standard-error` (`1/√I`), `closest-question` (argmin `|b−θ|`), ventanas de selección (±1, ±2), `stop-reason` (min 5, max 12, SE ≤ 0,35), `progress-points` para el gráfico | `progress_test.cljs` |
| `universo.profile` | `theta-band`, `band-label`, `deficits-from-responses`, `misconceptions-from`, `dominant-track`, `build` (perfil completo + estabilidad de θ) | `profile_test.cljs` |
| `universo.catalog` | Catálogo de evaluaciones: `topic-label` (precedencia `test_configs.display_name` → diccionario `topic-labels` → topic con guiones bajos como espacios), `count-by-topic` (preguntas por banco), `counts-truncated?` (detecta respuesta recortada de PostgREST) | `catalog_test.cljs` |
| `universo.events.test` | Orquestación con I/O: `normalize-question`, `resolve-topic` (alias de topics), fetch de candidatos por ventana de dificultad, prefetch, registro de respuesta, evaluación de la parada, persistencia | — |

**Flujo de una respuesta:**

```
usuario elige alternativa
  → registra response {question-id, selected-option, correct?, time-ms, difficulty}
  → θ' = clamp(limit-step(θ, newton-raphson(θ, responses)))
  → push θ' a theta-history
  → SE(θ') = 1/√I(θ')
  → stop-reason(responses, θ')  ─── nil ──▶ instalar pregunta prefetched
                                └── :precision | :max-items | :exhausted
                                        └─▶ construir perfil → guardar tests + student_profiles
```

**Decisiones de diseño relevantes** (ver [[../adr/ADR-004-irt-1pl-map-y-regla-de-parada]]):
1PL en lugar de 2PL/3PL (no hay datos para calibrar discriminación ni azar); MAP con prior N(0,1)
para evitar θ divergente con pocos ítems; Δθ acotado para que la experiencia no salte de "muy
fácil" a "imposible"; parada por SE en lugar de número fijo de preguntas.

### 2.3 Perfil, plan y cupos

| Componente | Namespaces | Notas |
|-----------|-----------|-------|
| Perfil | `events/profile.cljs` + `universo.profile` | Construye el perfil puro y lo materializa en `student_profiles` (θ, `theta_band`, `profile` JSONB) |
| Plan | `events/plan.cljs` + `components/plan.cljs` | Capa 0 (errores explicados) desde las respuestas; capa 1 = `resources` publicados de los `deficit-slugs` |
| Cupos | `events/slots.cljs` + `components/slots.cljs` + `universo.slots.logic` | `slots.logic` es el **espejo puro** de reglas que la DB también impone: filtro por banda, conteo activo, faltantes, confirmación |
| Cuenta | `events/account.cljs` + `components/cuenta.cljs` | Sección propia (`:cuenta`, protegida por sesión): editar `full_name`/`phone` en `profiles` y solicitar eliminación de cuenta (inserta una `notifications` con `kind = 'account_deletion_request'`; el admin la atiende desde `components/admin.cljs`, pestaña Usuarios) |
| UI compartida | `events/ui.cljs` + `components/ui.cljs` | Piezas transversales (2026-07-29): `ui/spinner`/`ui/loading-block` (spinner único con `role="status"`, usado por dashboard, plan, cupos, cuenta, diagnóstico, guestbook y admin) y `ui/confirm-dialog` (diálogo de confirmación global vía `[:confirm/ask {...}]`, reemplaza `js/confirm` nativo; montado una sola vez en `home.cljs`) |

> **Duplicación deliberada:** la regla de confirmación existe en el trigger SQL (fuente de verdad)
> y en `slots.logic/should-confirm-slot?` (para que la UI pueda anticipar sin round-trip). Si se
> cambia una, hay que cambiar la otra. Documentado como riesgo R-08.

### 2.4 Panel de administración

`components/admin.cljs` (1060 líneas) + `components/admin_questions.cljs` + `events/admin.cljs`
(738 líneas). Pestañas: overview, usuarios/roles, tests, guestbook, preguntas, recursos, cupos +
rosters. Cada pestaña tiene su propio `:loading?`/`:error` en `[:admin :status <tab>]` para no
contaminar a las demás y permitir caché entre cambios de pestaña.

Es el componente más grande del sistema y el de mayor riesgo de mantenimiento ([[RISKS]] R-07).

### 2.5 Acceso a datos

| Namespace | Rol |
|-----------|-----|
| `universo.supabase` | Cliente `createClient(url, anon-key)` + auth (`sign-in`, `sign-up`, `sign-out`, `get-session`, `current-user-id`, `on-auth-state-change`; también `sign-in-with-google`, definida pero **sin ningún llamador** — `components/login.cljs` no la usa, es código muerto hoy) |
| `universo.db.crud` | **Capa de datos canónica** (975 líneas): todas las queries y mutaciones, con `core.async` (`go`/`<!`) devolviendo `{:success bool :data … :error …}` |
| `universo.db.supabase` | API delgada legada basada en promises, solo guestbook. Su propio docstring dice *"Preferir universo.db.crud en código nuevo"* |

### 2.6 Código no alcanzable desde `core.cljs`

Verificado por grep de requires: los siguientes namespaces **no** entran al bundle porque nadie
los requiere desde el grafo de `universo.core`:

`components.mathacademy`, `components.improved-math-academy`, `components.mathacademy.events`,
`components.mathacademy.subs`, `components.supabase-test`, `components.tailwind`,
`animations`, `battery`, `jardin`, `particulas`, `physics`, `voz`, `test-subs` (requerido pero
**comentado** con `#_` en `core.cljs`), `universo.user`.

`geo` e `ip` sí participan (vía `visitor_tracker`). Además existe
`src/universo/components/math_render_2`: un **archivo sin extensión**, no compilable.

Tratamiento: son laboratorio personal / código archivado, no producto. No borrarlos sin decisión
explícita, pero tampoco extenderlos. Ver [[PROJECT_BRIEF]] §6 y [[BACKLOG]] T-17.

---

## 3. Modelo de datos

### 3.1 Tablas

| Tabla | Claves / campos relevantes | Notas |
|-------|---------------------------|-------|
| `profiles` | `id` (FK `auth.users`), `email`, `role` (`user`\|`admin`) | Base del control de acceso. Índices en `role` y `email` |
| `questions` | opciones A–D, `correct_option`, `error_a..error_d`, `difficulty`, `topic`, `order_index`, `module_id` (FK opcional) | **El activo del proyecto**: banco IRT con misconceptions |
| `tests` | `test` (JSON del diagnóstico), `topic`, `theta` (columnas propias desde ADR-013), `email-user`, `user_id` | Histórico de diagnósticos; `topic`/`theta` alimentan `universo.access/unlocked-topics` |
| `test_configs` | `topic` (PK), `display_name` (nullable), `min_items`, `max_items`, `se_threshold`, `max_minutes`, `prerequisite_topic` (self-FK nullable), `min_theta`, `active` | Config de parada IRT + cadena de prerequisitos por banco (ADR-013). Sin prerequisito = diagnóstico, siempre accesible. `display_name` es el nombre que ve el estudiante (T-42, migración `022`); null = fallback en `universo.catalog/topic-label` |
| `modules` | `slug` (único), `title`, `track` (`aritmetica`\|`algebra`\|`geometria`), `order_index`, `historical_blurb` | Skills atómicas alineadas a Baldor |
| `student_profiles` | `theta`, `theta_band`, `profile` JSONB | Materialización del perfil (una por estudiante) |
| `resources` | `module_id`, tipo (`text`/`video_url`/`audio_url`/`exercise`), `published` | Capa 1 del plan |
| `class_slots` | `theta_band`, `track`, `modality`, `starts_at`, `location_or_link`, `capacity`, `min_enrollments`, `status`, `title` | Cupos de cohorte |
| `enrollments` | estudiante ↔ cupo, `status` (`pending`/`confirmed`/…) | |
| `notifications` | destinatario + mensaje | Banner in-app |
| `email_outbox` | `to_email`, `subject`, `body`, `kind`, `meta`, `status` (`pending`/`sent`/`failed`), `attempts`, `last_error`, `sent_at` | Índice parcial sobre `pending` |
| `guestbook` | firma pública, `is_approved` tri-state (`null`/`true`/`false`) | Fuente de los testimonios |
| `visitor` | IP, ciudad, país, idioma, navegador, SO | Tracking |
| `contacto` | mensajes del formulario | |

### 3.2 Forma de `student_profiles.profile` (JSONB)

```json
{
  "theta": 0.42,
  "se": 0.31,
  "theta_band": "basico",
  "track": "aritmetica",
  "topic": "enteros",
  "deficits": [{"module-slug": "aritmetica/enteros", "errors": 3, "total": 4}],
  "misconceptions": [{"question-id": "...", "selected": "B", "explanation": "..."}]
}
```

`universo.profile/build` produce además `:stability {:theta-variance … :stable? …}` cuando hay
≥ 3 puntos en `theta-history`. **Contrato acoplado**: cualquier cambio en `profile/build` cambia
la forma del JSONB persistido. Es un contrato implícito, sin validación de esquema
([[RISKS]] R-09).

### 3.3 Bandas de θ

| Banda | Rango de θ |
|-------|-----------|
| `inicial` | θ < 0 |
| `basico` | 0 ≤ θ < 1 |
| `intermedio` | 1 ≤ θ < 2 |
| `avanzado` | θ ≥ 2 |

Definidas dos veces: `universo.profile/theta-band` (cliente) y el `check` de
`class_slots.theta_band` (SQL). Deben mantenerse sincronizadas.

---

## 4. Flujos de datos

### 4.1 Arranque

```
init! → [:initialize-db] (sync)
      → [:auth/init] → get-session → :auth/session-established | :auth/session-cleared
                     → carga profiles.role → :auth {:admin? :role}
                     → :auth/ready? true  (hasta aquí el nav muestra "…")
      → start-tracking! → ip/geo → insert visitor
      → mount-root
```

### 4.2 Diagnóstico

```
[:landing/start] → (si no hay sesión) login, recordando destino
                 → [:navigate-to :diagnostic-test]
[:test/open-selection] → get-distinct-topics → :test/topics-loaded
[:test/start topic] → resolve-topic (alias) → reset del estado del test → fetch-next-question
   fetch-candidates(θ, topic, answered-ids, ±1 → ±2) → closest-question
   → normalize-question → :current-question
usuario responde
   → response registrada → nueva θ (MAP + clamps) → theta-history
   → prefetch de la siguiente mientras se muestra el feedback
   → stop-reason ⇒ fin
       → profile/build → insert tests → upsert student_profiles
```

### 4.3 Confirmación de cohorte (el flujo más acoplado a la DB)

```
estudiante se inscribe            (cliente: insert enrollments)
   └─ trigger cuenta activos (pending|confirmed) del cupo
        └─ si activos ≥ min_enrollments y status = 'open'
             └─ class_slots.status := 'confirmed'
                  └─ insert notifications (una por inscrito)
                       └─ trigger notifications_enqueue_email → insert email_outbox (pending)
                            └─ Edge Function (cron / invoke) → Resend
                                 ├─ 2xx → status 'sent', sent_at
                                 └─ error → status 'failed', attempts+1, last_error
```

El cliente muestra el resultado esperado con `slots.logic/after-enrollment` sin esperar al trigger.

### 4.4 Plan

```
[:plan/load] → lee student_profiles.profile → deficit-slugs
             → resources where module.slug in deficit-slugs AND published = true
             → capa 0 (misconceptions del perfil) + capa 1 (resources) ordenadas por prioridad
```

---

## 5. Integraciones

| Integración | Tipo | Autenticación | Falla si… | Degradación |
|-------------|------|---------------|-----------|-------------|
| **Supabase PostgREST** | REST desde el navegador | JWT del usuario (anon key + sesión) | La app queda inutilizable | Ninguna: dependencia dura |
| **Supabase Auth** | REST | anon key | No se puede entrar | La landing pública sigue visible |
| **Google OAuth** *(no activa)* | Redirect vía Supabase | Config en el dashboard de Supabase | N/A — no hay botón en la UI que la dispare (`sign-in-with-google` sin llamador) | Login por email es el único camino real |
| **Supabase Edge Function** | HTTP (invoke/cron) | `service_role` (env de la function) | No se envían emails | Notificaciones in-app siguen; outbox queda `pending` |
| **Resend** | REST | `RESEND_API_KEY` (Supabase secret) | Emails `failed` con `last_error` | Reintento manual re-invocando |
| **CDN jsDelivr (KaTeX CSS)** | `<link>` | — | Fórmulas sin estilo | Contenido legible pero feo |
| **GitHub Pages** | Hosting estático | — | Sitio caído | Ninguna |
| **API de IP/geo** (`ip.cljs`, `geo.cljs`) | REST | — | Tracking incompleto | La app funciona igual |

---

## 6. Infraestructura

| Elemento | Detalle |
|----------|---------|
| Frontend | GitHub Pages, rama `main`, servido desde la raíz del repo |
| Dominio | `jacobocordova.com` vía `CNAME`; canonical y JSON-LD apuntan ahí |
| Backend | Supabase managed (región no documentada — [[OPEN_QUESTIONS]] Q-11) |
| Edge Function | Deno managed por Supabase; cron opcional desde el dashboard |
| Entornos | **Uno solo: producción.** No hay staging ni proyecto Supabase de desarrollo |
| Migraciones | Manuales en el SQL Editor, en el orden de `supabase/SCHEMA.md` |
| Backups | Los de Supabase por defecto en el plan usado; **sin respaldo propio verificado** |
| Observabilidad | Logs de Edge Functions en el dashboard; `js/console` en el cliente. Sin métricas, sin alertas |
| Secretos | `RESEND_API_KEY`, `EMAIL_FROM` como Supabase secrets; `SUPABASE_SERVICE_ROLE_KEY` inyectado por la plataforma |

> **Riesgo estructural:** desarrollar contra el proyecto Supabase de producción es la práctica
> actual. Todo `alter table` o cambio de policy se prueba en vivo. Ver [[RISKS]] R-02.

---

## 7. Seguridad

### 7.1 Modelo

```
Identidad:    Supabase Auth (auth.users) → JWT en el cliente
Autorización: RLS por tabla, con public.is_admin() para el rol admin
UI:           :auth/admin? y protected-sections son UX, NO controles de seguridad
```

### 7.2 Reglas vigentes

1. Toda tabla tiene `enable row level security`. Sin policy → sin acceso.
2. `public.is_admin()` resuelve el rol desde `profiles`; se usa en las policies de admin.
3. `profiles_update_own`: cada usuario se actualiza a sí mismo **sin** cambiar de rol.
4. `profiles_update_admin` (`006`): un admin actualiza perfiles **ajenos** (`id <> auth.uid()`),
   salvaguarda deliberada para no quedarse sin administradores.
5. Trigger `profiles_protect_last_admin`: impide degradar al último admin.
6. `questions`: SELECT/INSERT/UPDATE/DELETE solo para admin (`007`).
7. `guestbook`: lectura pública de aprobados; insert público; delete solo admin.
8. Estudiante: solo su `student_profiles` y sus `enrollments`.

### 7.3 Manejo de secretos

| Secreto | Dónde vive | ¿Público? |
|---------|-----------|-----------|
| URL del proyecto Supabase | `src/universo/supabase.cljs` (bundle) | Sí, por diseño |
| **anon key** | `src/universo/supabase.cljs` (bundle) | Sí, por diseño — es una clave pública cuyo poder lo limita RLS |
| `service_role` | Solo en el entorno de la Edge Function | **No.** Jamás en el cliente |
| `RESEND_API_KEY` | Supabase secret | No |
| `EMAIL_FROM` | Supabase secret (opcional) | No |

`.gitignore` bloquea `.env*`. No existe `.env.example` porque el cliente no consume variables de
entorno hoy.

### 7.4 Datos personales

Se almacenan: email, IP, ciudad, país, idioma, navegador, SO, nivel de batería (`visitor`),
mensajes de contacto, firmas del guestbook (nombre, mensaje, email, teléfono) y resultados de
diagnóstico. El público objetivo es mayoritariamente **menor de edad**.

**2026-07-28:** hay Aviso de Privacidad publicado (`universo.components.privacidad`, enlazado
desde el footer) y consentimiento explícito al registrarse (`login.cljs`: checkbox obligatorio +
declaración de tener 14 años o más / autorización de representante). `profiles` ahora también
guarda `full_name` y `phone` (`010`), editables por el propio usuario desde la sección
**Configuración de cuenta** (`:cuenta`, sección protegida, `components/cuenta.cljs`) — separada
del tablero, enlazada desde la navegación. Esa misma sección concentra la eliminación de cuenta:
autoservicio que crea una notificación (`kind = 'account_deletion_request'` en `notifications`);
el admin la ve como alerta en Admin → Usuarios y la marca atendida, pero **el borrado real en
`auth.users` sigue siendo manual** (requiere `service_role`, fuera del cliente por diseño de
seguridad). Retención: la política publicada dice 12 meses de inactividad, pero **no hay job que
la ejecute todavía** ([[BACKLOG]] T-34). Ver [[RISKS]] R-06 y [[OPEN_QUESTIONS]] Q-03/Q-08.

### 7.5 Superficie de ataque conocida

- **Escritura pública en `guestbook`** y `contacto`: sin captcha ni rate limit → spam posible.
  Mitigación actual: moderación (`is_approved` empieza en `null`).
- **Tracking de visitantes** inserta desde el cliente: un actor puede inflar `visitor`.
- **Enumeración de `questions`**: si alguna policy permitiera SELECT a `authenticated` no-admin,
  el banco de ítems (el activo del proyecto) quedaría expuesto. `007` lo restringe a admin, pero
  el diagnóstico necesita leer preguntas — **verificar qué policy usa el flujo del estudiante**
  ([[OPEN_QUESTIONS]] Q-12).

---

## 8. Dependencias arquitectónicas

- **shadow-cljs `:modules {:app {:entries [universo.core]}}`** — un solo módulo, sin code
  splitting. Todo el bundle se descarga siempre.
- **`universo.core` como registro central de handlers** — si un ns de eventos no se requiere ahí,
  sus `reg-event-*` no existen en runtime y el dispatch falla en silencio.
- **`universo.db/default-db` como contrato de forma** — los `subs` asumen esa estructura; agregar
  una sección de UI implica agregar su nodo aquí.
- **`db.crud` como único punto de I/O** — mantenerlo así es lo que hace testeable el resto.
- **Triggers de Postgres como fuente de verdad de la confirmación de cohorte** — el cliente es un
  espejo optimista.
- Detalle completo en [[DEPENDENCIES]].

---

## 9. Decisiones técnicas relevantes

| ADR | Decisión |
|-----|----------|
| [[../adr/ADR-001-clojurescript-re-frame-shadow-cljs]] | ClojureScript + re-frame + shadow-cljs como stack de frontend |
| [[../adr/ADR-002-supabase-como-unico-backend]] | Supabase como único backend; RLS como límite de seguridad |
| [[../adr/ADR-003-github-pages-artefacto-versionado]] | GitHub Pages con `public/js/app.js` versionado en Git |
| [[../adr/ADR-004-irt-1pl-map-y-regla-de-parada]] | IRT 1PL + MAP N(0,1) + Δθ acotado + parada por SE |
| [[../adr/ADR-005-banco-de-items-en-vez-de-cms]] | El contenido es banco de ítems (capa 0), no un CMS |
| [[../adr/ADR-006-cohortes-por-banda-con-minimo-de-inscritos]] | Cohortes por banda de θ con confirmación por mínimo |
| [[../adr/ADR-007-email-outbox-con-edge-function]] | Email por tabla outbox + Edge Function (Resend) |
| [[../adr/ADR-008-archivar-mathacademy]] | Archivar MathAcademy y dejar un funnel único |
| [[../adr/ADR-009-logica-pura-testeable]] | Reglas de negocio en namespaces puros y testeados |
| [[../adr/ADR-010-adopcion-project-memory-first]] | Adopción de Project Memory First |

---

## 10. Riesgos arquitectónicos

| # | Riesgo | Detalle |
|---|--------|---------|
| A-01 | **RLS como único control** | Un error de policy expone datos de estudiantes. No hay defensa en profundidad ni auditoría automática de policies |
| A-02 | **Un solo entorno** | Se desarrolla y prueba contra la base de producción |
| A-03 | **Deploy manual del bundle** | Se puede publicar código fuente sin recompilar el `app.js`, o commitear un `app.js` que no corresponde al fuente. Hoy mismo hay un `public/js/app.js` modificado sin commit |
| A-04 | **Reglas duplicadas cliente/DB** | Bandas de θ y confirmación de cupo viven en dos lugares |
| A-05 | **Contrato JSONB implícito** | `profile` se persiste sin esquema; un cambio en `profile/build` rompe lectores antiguos silenciosamente |
| A-06 | **Componentes monolíticos** | `admin.cljs` (1060), `crud.cljs` (975), `events/admin.cljs` (738) concentran riesgo de regresión |
| A-07 | **Sin router de URL** | Impide deep links, analytics por página y recuperación de estado al recargar |
| A-08 | **Sin code splitting** | El bundle crece de forma monótona; el estudiante en móvil descarga también todo el panel admin |
| A-09 | **Duplicación de `index.html`** | Raíz y `public/` pueden divergir en SEO y JSON-LD |
| A-10 | **Grafo de conocimiento parcial** | Graphify no indexa `.cljs`: el análisis automático no ve la lógica principal |

Priorizados con impacto/probabilidad en [[RISKS]].

---

## 11. Relación con Graphify

`project-memory/graph/GRAPH_REPORT.md` es el **snapshot versionado** del grafo del repositorio
(`graphify-out/` es el directorio de trabajo vivo, no versionado).

Estado del snapshot al **2026-07-26** (commit `48bf5254`): **105 nodos · 147 aristas ·
13 comunidades**; 92 % de aristas extraídas, 8 % inferidas; sin ciclos de importación.

**God nodes** (mayor conectividad = abstracciones centrales *según la documentación*):

1. `Schema Supabase — Academia Integral MVP` (16 aristas)
2. `Universo Project Summary` (11)
3. `index.html — Landing PAES Matemática 1` (9)
4. `Funnel MVP Operable (Login → Diagnóstico → Perfil → Plan → Cupos → Inscripción)` (6)
5. `Tabla class_slots` / `Tabla modules` (6)

**Hiperaristas detectadas** — coinciden con los flujos de §4, lo que valida el modelo mental:

- *Funnel MVP*: `questions` → `student_profiles` → `resources` → `class_slots` → `enrollments` → `notifications`
- *Pipeline de email de cohorte*: confirmación → `notifications` → `email_outbox` → Resend
- *Set de iconos de marca* referenciado por ambos landings

**Limitación crítica que debe conocerse antes de confiar en el grafo:** el manifest solo indexa
Markdown, SQL, JSON, HTML, TS/JS y el `app.js` compilado. **Ningún archivo `.cljs` está en el
grafo.** Por lo tanto el grafo describe bien el *esquema de datos y la documentación*, y no dice
nada de la lógica ClojureScript (≈10 290 líneas). Ver [[GRAPHIFY_INTEGRATION_GUIDE]] §6.

Regla operativa: usar Graphify para **orientarse** (qué tablas y documentos se relacionan, qué
tocaría un cambio de esquema) y `src/` para **decidir**. Este archivo (`ARCHITECTURE.md`) es la
fuente de verdad arquitectónica; el grafo es evidencia de apoyo.

---

Relacionado: [[TECH_STACK]] · [[REQUIREMENTS]] · [[RISKS]] · [[DECISIONS]] ·
[[GRAPHIFY_INTEGRATION_GUIDE]] · `supabase/SCHEMA.md`
