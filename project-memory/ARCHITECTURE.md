# ARCHITECTURE

Última actualización: **2026-08-28** (el cuarto eje del temario existe: `modules` pasa de 20 a **26
módulos PAES**, los 26 con banda explícita; `questions` gana **`active`** —que no existía— y
`next_question` la respeta; `misconceptions` deja de estar vacío para el producto con 159 filas; y
`test_configs` explica por qué cuatro bancos estuvieron aplicados e inalcanzables). · Antes:
**2026-08-13** (identidad Braun/Rams, línea del tiempo, `site_settings`) · Verificado
contra `src/`, `supabase/`, `shadow-cljs.edn`, `index.html` y
`project-memory/graph/GRAPH_REPORT.md`

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
│    components.tetha · irt.progress · irt.effort · irt.fluency · motor ·    │
│    profile · topics · slots.logic · timeline                              │
│    access · catalog · misconceptions · editor · history                   │
└──────────────────────────────┬────────────────────────────────────────────┘
                               │ HTTPS + JWT del usuario (supabase-js)
                               ▼
┌───────────────────────────────────────────────────────────────────────────┐
│ SUPABASE  (proyecto jmnqklhxcdccvdhuuiji)                                  │
│                                                                           │
│  Auth (email/password + Google OAuth, activo desde 2026-08-17) ─▶ auth.users │
│                                                                           │
│  PostgreSQL + ROW LEVEL SECURITY  ← único límite de autorización          │
│    profiles · questions · tests · guestbook · visitor · contacto           │
│    modules · student_profiles · resources · misconceptions                 │
│    class_slots · enrollments · notifications · email_outbox                │
│    test_configs (parada IRT + prerequisitos por banco)                     │
│    site_settings (apariencia por defecto, una sola fila)                  │
│    funciones public.is_admin() · normalize_topic()                         │
│    RPC security definer: next_question · score_answer · track_visitor      │
│                                                                           │
│  Triggers:                                                                │
│    enrollments  → ¿activos ≥ min_enrollments? → class_slots.confirmed      │
│    enrollments  → rechaza si el cupo llegó a capacity                      │
│    class_slots confirmado → notifications (una por inscrito)               │
│    class_slots cancelado  → notifications (aviso a los inscritos)          │
│    notifications → email_outbox (pending)                                  │
│    profiles → protect_last_admin                                          │
│    questions/tests/test_configs → topic canónico (ADR-017)                │
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
| Lectura | `universo.subs` | Suscripciones globales de UI (`:current-page`, `:current-section`, `:transitioning`) y **`:complete-navigation`**, el único punto donde se escribe la URL (ADR-026) |
| Router | `universo.router` (puro) + `universo.events.router` | Traducción `sección ↔ path` y acceso al History API. Ver la nota de arquitectura debajo de esta tabla y ADR-026 |
| Ruteo | `universo.views` + `universo.home` | `views/pages` solo resuelve `:home`. El **ruteo real** es por *sección* dentro de `home/main-content` (`case current-section`) |
| Layout | `universo.home` | Nav fija (links según `:auth/ready?`, `logged-in?`, `admin?`, botón de tema), contenido con transición de opacidad, footer con contacto |
| Panel de instrumento | `src/css/app.css` (bloque «PANEL DE INSTRUMENTO») | **Cinco clases de componente** —`.control`, `.alojamiento`, `.led`, `.placa`, `.visor`, `.grabado`— definidas una sola vez (ADR-023). No son utilidades sueltas a propósito: repetirlas a mano diverge al tercer componente. El relieve es funcional, no decorativo: sobre el panel gris el LED da 1.04 de contraste y el naranja 1.68, así que el bisel y el alojamiento son lo que los vuelve visibles |
| Fondo de página | `src/css/app.css` (`.fondo-graticule`) | El graticule de instrumento de la home: divisiones, dos ejes y ticks, con el origen en `0% 100%`. CSS puro, sin JS. **Las alfas están medidas contra `.grabado`** (techo 0.086 claro / 0.0445 oscuro) — ver [[../adr/ADR-031-fondo-como-plano-de-medida]] *(2026-08-23)*. Regla que trae el mismo ADR: **toda sección declara su propio fondo**; una transparente hereda lo que haya debajo, y así el CV acumuló 52 textos bajo AA |
| Tema | `universo.events.theme` + `src/css/app.css` | Claro/oscuro (`:theme` en `app-db`, `:theme/init`/`:theme/toggle`, persistido en `localStorage`, clase `dark` en `<html>` aplicada antes de `app.js` vía script inline en `index.html`). El tema oscuro de los ~15 componentes se cubre con un mapeo global de clases en `app.css` (`.dark .clase-existente`), no con `dark:` por elemento — ver [[../adr/ADR-012-tema-oscuro-mapeo-css-global]] *(2026-08-05)* |

> **Nota de arquitectura (actualizada 2026-08-16, T-05):** ~~no hay router de URL~~. **Sí hay
> router**, con History API y fallback `404.html` de GitHub Pages
> ([[../adr/ADR-026-router-de-url-con-history-api]]). La sección sigue siendo el estado autoritativo
> (`:ui/current-section`, `case` en `home/main-content`); **la URL es su reflejo**, nunca al revés.
>
> - `universo.router` (puro) traduce `sección ↔ path` y decide qué hacer con la URL de entrada
>   (`entry` → `:section` | `:pending` | `:not-found`).
> - `universo.events.router` es el **único** namespace que toca `window.history`
>   (`:router/push`, `:router/replace`, `:router/listen`, `:router/init`, `:router/popstate`).
> - La URL se escribe en **un solo punto**, `:complete-navigation` (`universo.subs`), que corre
>   *después* de `guard-section`. El router jamás escribe `:ui/current-section`: siempre despacha
>   `:navigate-to`, así que `/admin` escrito a mano —o alcanzado con el botón atrás— pasa por el
>   mismo guard que un clic.
> - Un deep link a ruta protegida queda en `[:router :pending]` hasta que `:auth/init` resuelve
>   (la sesión de Supabase se rehidrata de forma asíncrona); sin sesión sobrevive como
>   `:redirect-after-login`.
>
> Rutas: `/` `·` `/ingresar` `·` `/registrarse` `·` `/diagnostico` `·` `/tablero` `·` `/plan` `·`
> `/cupos` `·` `/cuenta` `·` `/admin` `·` `/libro-de-visitas` `·` `/profesor` `·` `/privacidad`.
> **`/ingresar` y `/registrarse` son dos rutas, no dos modos**: `login-form` sirve las dos y deriva
> cuál mostrar de `:current-section` (el estado del formulario sobrevive al cambio porque
> `main-content` monta el mismo componente en ambas ramas). El intent `:auth/login-mode` que hacía
> ese trabajo antes **se eliminó**.
> Limitación heredada del hosting: **todas salvo `/` responden HTTP 404** (A-07', T-94).

### 2.2 Motor IRT (el corazón del producto)

Tres namespaces puros + un ns de eventos:

| Namespace | Contenido | Test |
|-----------|-----------|------|
| `universo.components.tetha` | Modelo 1PL/Rasch: `probability-1pl`, derivadas de la log-verosimilitud, score y Hessiano MAP con prior N(0,1), `newton-raphson-iteration`, `clamp-theta` `[-3,3]`, `limit-theta-step` (Δθ ≤ 0,4) | `tetha_test.cljs` |
| `universo.irt.progress` | `fisher-information` (`I(θ) = −f''(θ)`), `standard-error` (`1/√I`), `closest-question` (argmin `|b−θ|`), ventanas de selección (±1, ±2), `stop-reason` (min 5, max 12, SE ≤ 0,35), `progress-points` para el gráfico | `progress_test.cljs` |
| `universo.irt.effort` | Filtro de respuestas no esforzadas (ADR-014 Fase 1): `min-response-seconds` (umbral `max(piso, largo/20)`), `response-weight` (1.0 / 0.0), `weigh-response`, `weight-of`. El peso se calcula al registrar la respuesta y viaja en `tests.test`; sin `:weight` cuenta como 1.0 | `effort_test.cljs` |
| `universo.irt.fluency` | **Eje 2 — fluidez (λ)**, ADR-019: `usable?` (correcta + con tiempo + esforzada), `relative-time` (`t_rel` = segundos observados / `effort/reading-seconds` del enunciado), `classify` (mediana de `t_rel`, banda `:fluida`/`:media`/`:laboriosa`, `min-responses` = 4), `thresholds-from-config` (cortes por banco, `041`), `profile-for` (cruce 2×2 con la banda de θ), `calibration-report` (deciles para recalibrar). **No mide estilos de aprendizaje** — el Eje 3 de VISION §3.3 se descarta (D-41) | `fluency_test.cljs` |
| `universo.topics` | Forma canónica de `questions.topic` (**espejo de `public.normalize_topic()`**, ADR-017): `normalize`, `same-topic?`, `duplicate-groups`, `module-slug-for` (equivalencia explícita → sufijo único del slug), `track-for`, `unmapped` | `topics_test.cljs` |
| `universo.profile` | `theta-band`, `band-label`, `deficits-from-responses`, `misconceptions-from`, `dominant-track`, `build` (perfil completo + estabilidad de θ). El mapeo topic → módulo lo delega en `universo.topics` | `profile_test.cljs` |
| `universo.timeline` | **Línea del tiempo histórica** (ADR-021): `era-of` y `eras` (espejo del check de `042`), `medal-for` (espejo de `profile/theta-band`: oro θ≥2, plata θ≥1, bronce rendido), `best-theta-by-module`, `milestones` (cruza módulos con el historial), `by-era`, `progress`. Reutiliza `access/best-theta-by-topic` y `topics/module-slug-for` | `timeline_test.cljs` |
| `universo.catalog` | Catálogo de evaluaciones: `topic-label` (precedencia `test_configs.display_name` → diccionario `topic-labels` → topic con guiones bajos como espacios), `count-by-topic` (preguntas por banco), `counts-truncated?` (detecta respuesta recortada de PostgREST) | `catalog_test.cljs` |
| `universo.misconceptions` | **Catálogo de ideas erróneas** (`027`): `health-from-usage` (única definición del veredicto; `health` la envuelve), `split-experimento` / `del-experimento?` (separa el producto de las 77 de cuántica, Q-40), `slug-valid?` (**espejo del check `^[a-z0-9]+([-/][a-z0-9]+)*$`**), `suggest-slug`, `matches?`, `usage-index` (id → cuántos distractores la referencian), `with-usage`, `health` (`:vacio`/`:disperso`/`:sano`). `health` es la heurística de `027` hecha función: el catálogo debe crecer **mucho más lento** que el banco. `items-por-misconception-saludable` = 5 es criterio editorial **sin validar con datos** | `misconceptions_test.cljs` |
| `universo.history` | **Agrupación del historial del tablero** (D-60): `group-attempts` (por forma canónica del topic, así `términos_semejantes` y `terminos_semejantes` no son dos evaluaciones), `attempt-points` (puntos graficables; un intento sin θ no es punto pero **sí cuenta** como intento), `totals`. Calcula **Δθ desde el primer intento**, que es la única medida de progreso que el producto promete (G-4) | `history_test.cljs` |
| `universo.editor` | **Reglas de los paneles de edición** (T-103): `modules-by-track`, `module-label`, `renderable?` (¿la vista previa aporta algo?), `question-missing-fields` / `question-draft-valid?`. Existe para que la vista pueda decir *qué* falta con **el mismo criterio** que usa el evento para decidir si guarda. Desde ADR-032 además: `campos-en-vivo` (qué se puede editar durante el diagnóstico), `coercionar-campo` y `campos-editados` (diff coercionado para el patch parcial — **en blanco es nulo**, no `""`) | `editor_test.cljs` |
| `universo.motor` | **Versión y parámetros del estimador de θ** (ADR-034): `version` (2), `legacy-version` (1), `default-guessing-c` (0,25), `default-prior-sd` (2,0), `prior-precision`/`guessing-c` (con guardas: un σ ≤ 0 o un c fuera de [0,1) caen al default en vez de degenerar el posterior) y `falta-la-columna-de-version?`, que detecta que `048` no está aplicada para poder reintentar el guardado sin la columna. **Se sube `version` en el mismo commit que cambia modelo, prior o regla de parada**: un θ solo significa algo junto a las reglas que lo produjeron | `motor_test.cljs` |
| `universo.reintento` | **Deshacer la última respuesta** (ADR-032): `puede-reintentar?`, `deshacer-ultima`. Poda `:responses` y `:theta-history` **juntos**, devuelve θ al valor previo —o a `:theta-initial`, el θ de arranque del banco, si se deshace la primera—, recalcula la parada y reinstala el mismo ítem parcheado. La pregunta **no** sale de `:questions`: sacarla la devolvería al pozo de candidatas de `next_question`, que podría entregar otra. Es seguro porque nada se persiste por ítem — `tests` se escribe entera en `:test/complete` | `reintento_test.cljs` |
| `universo.events.test` | Orquestación con I/O: `normalize-question`, `resolve-topic` (alias de topics), fetch de candidatos por ventana de dificultad, prefetch, registro de respuesta, evaluación de la parada, persistencia | — |

**Invariantes que impone la base, no el cliente** (además de RLS):

| Objeto | Qué garantiza |
|--------|---------------|
| `public.normalize_topic(text)` + triggers en `questions`, `tests`, `test_configs` | `topic` siempre canónico: sin acentos, minúsculas, sin bordes (ADR-017, `029`). **Espejo duplicado a propósito** en `universo.topics/normalize` |
| `check` de `misconceptions.slug` (`027`) | El slug es minúsculas, dígitos y `-`/`/`: sin acentos ni mayúsculas, la lección de T-51 hecha regla. **Espejo duplicado a propósito** en `misconceptions/slug-valid?`, para avisar antes de guardar en vez de que el único aviso sea un error de Postgres |
| `on delete set null` en `questions.misconception_*_id` (`027`) | Borrar una misconception no queda bloqueado por los ítems que la referencian: vuelven a "sin catalogar". Reorganizar la taxonomía tiene que ser barato o no se reorganiza (D-59) |
| `enforce_slot_capacity` (`011`) | No se puede superar `class_slots.capacity` al inscribirse. Espejo puro: `slots.logic/capacity-reached?` |
| `confirm_slot_if_threshold` (`001`) | El cupo se confirma al llegar a `min_enrollments`. Espejo: `slots.logic/should-confirm-slot?` |
| `profiles_protect_last_admin` (`006`) | No se puede degradar al último admin |
| `notify_slot_cancelled` (`012`) | Avisa a los inscritos cuando el admin cancela un cupo |

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
| Perfil | `events/profile.cljs` + `universo.profile` | Construye el perfil puro y lo materializa en `student_profiles` (θ, `theta_band`, `profile` JSONB). Desde ADR-019 `profile/build` recibe `:fluency-thresholds` (los del banco, vía `:stop-config`) y agrega `:fluency` + `:fluency-profile` |
| Plan | `events/plan.cljs` + `components/plan.cljs` | Capa 0 (errores explicados) desde las respuestas; capa 1 = `resources` publicados de los `deficit-slugs`. Además muestra la **tarjeta del eje de fluidez** (2×2 θ × λ) |
| Fluidez | `universo.irt.fluency` + `events/plan.cljs` | El eje se **recalcula en el cliente** desde el último test (`:plan/fetch-last-test!`) cuando el perfil guardado no trae `:fluency` — todo diagnóstico anterior a ADR-019 quedó sin él. No reinterpreta θ ni ningún resultado previo: usa `:time-ms`/`:weight`/`:question-text`, que ADR-014 Fase 1 ya guardaba en `tests.test` y nadie leía. Con menos de `min-responses` correctas usables la tarjeta muestra un tercer estado explícito ("todavía no alcanza"), en vez de desaparecer |
| Cupos | `events/slots.cljs` + `components/slots.cljs` + `universo.slots.logic` | `slots.logic` es el **espejo puro** de reglas que la DB también impone: filtro por banda, conteo activo, faltantes, confirmación |
| Cuenta | `events/account.cljs` + `components/cuenta.cljs` | Sección propia (`:cuenta`, protegida por sesión): editar `full_name`/`phone` en `profiles` y solicitar eliminación de cuenta (inserta una `notifications` con `kind = 'account_deletion_request'`; el admin la atiende desde `components/admin.cljs`, pestaña Usuarios) |
| Línea del tiempo | `universo.timeline` + `components/timeline.cljs` + subs en `events/dashboard.cljs` | Barra fija al pie del **tablero** (no de toda la app). Los módulos se cargan una vez (catálogo) y se cruzan con el historial del estudiante; el detalle de cada hito es el **único lugar de la app donde se muestra `modules.historical_blurb`**. Si ningún módulo tiene año —`042` sin aplicar— no se dibuja nada: es una ausencia de despliegue, no un estado del estudiante (ADR-021) |
| UI compartida | `events/ui.cljs` + `components/ui.cljs` | Piezas transversales (2026-07-29): `ui/spinner`/`ui/loading-block` (spinner único con `role="status"`, usado por dashboard, plan, cupos, cuenta, diagnóstico, guestbook y admin) y `ui/confirm-dialog` (diálogo de confirmación global vía `[:confirm/ask {...}]`, reemplaza `js/confirm` nativo; montado una sola vez en `home.cljs`) |

> **Duplicación deliberada:** la regla de confirmación existe en el trigger SQL (fuente de verdad)
> y en `slots.logic/should-confirm-slot?` (para que la UI pueda anticipar sin round-trip). Si se
> cambia una, hay que cambiar la otra. Documentado como riesgo R-08.

### 2.4 Panel de administración

`components/admin.cljs` + `admin_questions.cljs` + `admin_misconceptions.cljs` +
`admin_test_configs.cljs` + `events/admin.cljs`. **Diez pestañas** (2026-08-18): resumen, usuarios,
diagnósticos, preguntas, **ideas erróneas**, configuración de tests, recursos, cupos + rosters,
moderación, contacto y apariencia. Cada pestaña tiene su propio `:loading?`/`:error` en
`[:admin :status <tab>]` para no contaminar a las demás y permitir caché entre cambios de pestaña.

**Los dos editores no están al mismo nivel y conviene saberlo antes de tocarlos.** El de recursos y
el del banco recibieron el mismo tratamiento (borrador en `app-db`, ⌘/Ctrl+Enter y Esc, validación
que dice *qué* falta antes de guardar); el de recursos además tiene vista previa con la **misma**
función que dibuja el recurso en «Mi plan». Lo que sigue distinto: `admin_questions.cljs` usa
utilidades sueltas e indigo en vez de las primitivas del panel Braun (ADR-023) — mismo problema que
[[BACKLOG]] T-100 registra para el diagnóstico.

**Hay un tercer editor, y no vive en el panel** (ADR-032): `components/test_editor.cljs` +
`events/editor_vivo.cljs` editan el ítem **durante** el diagnóstico, desde la pestaña «Editar ítem»
del panel de la capa cero. Alcance acotado a propósito (las cuatro explicaciones con su idea
errónea, el enunciado, `difficulty` y `module_id`) y **patch parcial** de solo lo que cambió
(`editor/campos-editados` → `crud/patch-admin-question-fields!`), nunca la fila entera. Los campos
de formulario son los mismos del panel: salieron a `components/campos.cljs` para que no existan dos
vistas previas de LaTeX que se desincronizan.

**De dónde salen los catálogos que usan los selectores:** `modules` y `misconceptions` los carga la
pestaña que los necesita **si están vacíos** (`:admin/fetch-modules-only`,
`:admin/fetch-misconceptions-only`). Antes los módulos los cargaba solo la pestaña de recursos, así
que un selector de módulo en otra pestaña aparecía vacío sin explicación.

Es el componente más grande del sistema y el de mayor riesgo de mantenimiento ([[RISKS]] R-07).

### 2.5 Acceso a datos

| Namespace | Rol |
|-----------|-----|
| `universo.supabase` | Cliente `createClient(url, anon-key)` + auth (`sign-in`, `sign-up`, `sign-out`, `get-session`, `current-user-id`, `on-auth-state-change`, `sign-in-with-google`). **`sign-in-with-google` está conectada desde 2026-08-17** (T-92): la llama `components/login.cljs` y su `redirectTo` es **una sola URL fija**, `origin + (router/section->path :dashboard)`, no `window.location.href` |
| `universo.db.crud` | **Capa de datos canónica** (1.500 líneas al 2026-08-18): todas las queries y mutaciones, con `core.async` (`go`/`<!`) devolviendo `{:success bool :data … :error …}`. Todo id `uuid` pasa por `uuid-or-nil` y viaja como string — parsearlo a número no falla ruidosamente (L-44) |
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
| `questions` | opciones A–D, `correct_option`, `error_a..error_d`, `difficulty`, `topic`, `order_index`, `module_id` (FK opcional), `misconception_a_id..d_id` (`027`), `active` (`057`) | **El activo del proyecto**: banco IRT con misconceptions. `correct_option` y `error_*` **nunca viajan al cliente** (ADR-015). `topic` lo mantiene canónico un **trigger** (`029`, ADR-017). Su DDL **no está versionado** — preexiste a `001` (T-48). **`active`** (migración `057`, 2026-08-28) retira un ítem de `next_question` sin borrarlo: hasta entonces esa columna **no existía** y no había forma de retirar contenido sin perderlo (L-54). Tamaño medido el 2026-08-28: **910 filas** antes de los 14 últimos ítems del eje de probabilidad, de las cuales **414 son de los cuatro bancos nuevos** (`049`…`056`) y 12 están inactivas; 128 sin `module_id` (T-60) |
| `tests` | `test` (JSON del diagnóstico), `topic`, `theta` (columnas propias desde ADR-013), `engine_version`, `email-user`, `user_id` | Histórico de diagnósticos; `topic`/`theta` alimentan `universo.access/unlocked-topics`. **`engine_version`** (ADR-034, migración `048`, backfill a 1) dice con qué reglas se calculó ese θ: **θ de versiones distintas no son comparables**, así que todo cálculo de Δθ tiene que agrupar por esta columna ([[RISKS]] R-40) |
| `test_configs` | `topic` (PK), `display_name` (nullable), `min_items`, `max_items`, `se_threshold`, `max_minutes`, `prerequisite_topic` (self-FK nullable), `min_theta`, `active`, `min_response_seconds`, `fluency_fluida_max`, `fluency_media_max`, `initial_theta`, `prior_sd`, `guessing_c` | Config de parada IRT + cadena de prerequisitos por banco (ADR-013). Sin prerequisito = diagnóstico, siempre accesible. **Una fila por banco, y ninguna migración de banco la crea**: los cuatro bancos de `050`/`052`/`054`/`056` estuvieron aplicados y **inalcanzables** hasta `059` (2026-08-28, T-125) — 414 ítems que nadie podía rendir. `059` los publica encadenados desde `numeros`. `display_name` es el nombre que ve el estudiante (T-42, migración `022`); null = fallback en `universo.catalog/topic-label`. `min_response_seconds` es el piso del umbral de esfuerzo (T-44, migración `028`), no una regla de parada. Las dos columnas `fluency_*` son los cortes del eje λ por banco (ADR-019, migración **`041`, aplicada 2026-08-13**), `not null default 3`/`6` con check que impide invertirlas; el fallback de `fluency/thresholds-from-config` a `default-thresholds` sigue vigente para configs viejas o nulas. `prior_sd` y `guessing_c` son los dos parámetros del modelo (ADR-034, migración **`048`**), nullable = los defaults de `universo.motor` (σ = 2, c = 0,25); **no se mueven por separado** — modelar el azar sin soltar el prior es una regresión medida. **`topic` se mantiene canónico por trigger** (ADR-017, migración `029`) |
| `modules` | `slug` (único), `title`, `track` (`aritmetica`\|`algebra`\|`geometria`\|`probabilidad`\|`cuantica`), `band_min`/`band_max` (`046`), `order_index`, `historical_blurb`, `historical_year`, `historical_era`, `historical_figure` | Skills atómicas alineadas a Baldor. **26 módulos PAES**: 18 de `002`, + `algebra/inecuaciones` y `aritmetica/operaciones_fundamentales` (`031`, D-37), + los **6 del eje de probabilidad y estadística** (`055`, 2026-08-28, que cerró T-119: el cuarto eje del temario existía en el check de `track` desde `046` pero no tenía un solo módulo). Más 15 de cuántica (`033`, ADR-018), que no son producto. **Los 26 tienen banda explícita** (`049`, `051`, `053`, `055`, `060`): con un diagnóstico por eje, cada eje reparte sus módulos en todo `[-3, 3]`, y una banda explícita además **deja de moverse** cuando se agrega un módulo nuevo, que es lo que le pasa a la derivada. Las tres columnas `historical_*` de ubicación temporal son de `042` (ADR-021), con `check` de vocabulario y de coherencia año↔era; `historical_year` es nullable a propósito: un módulo sin año no aparece en la línea en vez de recibir una fecha inventada |
| `misconceptions` | `slug` (único, con check de formato), `name`, `description`, `module_id` | Catálogo curado de errores conceptuales con identidad propia (`027`, T-57). **Ya no está vacío para el producto** (2026-08-28): a las 77 filas de cuántica —prefijo `mq/`, T-61, Q-40— se sumaron **159 del producto** con los cuatro bancos nuevos (47 de números, 34 de álgebra, 33 de geometría, 45 de probabilidad). Cada una tiene que estar **usada por algún ítem**: `verificar_items.py` falla si se declara una que ningún distractor expone. `null` en `questions.misconception_*_id` = "sin catalogar". RLS **solo admin en las cuatro operaciones**: a un estudiante le devuelve cero filas, no un error. Se cura desde el panel, no por migración (D-59) |
| `student_profiles` | `theta`, `theta_band`, `profile` JSONB | Materialización del perfil (una por estudiante) |
| `resources` | `module_id`, tipo (`text`/`video_url`/`audio_url`/`exercise`), `published` | Capa 1 del plan |
| `class_slots` | `theta_band`, `track`, `modality`, `starts_at`, `location_or_link`, `capacity`, `min_enrollments`, `status`, `title` | Cupos de cohorte |
| `enrollments` | estudiante ↔ cupo, `status` (`pending`/`confirmed`/…) | |
| `notifications` | destinatario + mensaje | Banner in-app |
| `email_outbox` | `to_email`, `subject`, `body`, `kind`, `meta`, `status` (`pending`/`sent`/`failed`), `attempts`, `last_error`, `sent_at` | Índice parcial sobre `pending` |
| `site_settings` | `id` (booleano fijo en `true`), `theme_default` (`claro`/`oscuro`/`sistema`), `updated_at`, `updated_by` | Configuración global, **una sola fila** garantizada por un `check` sobre la PK (`043`, ADR-022). Lectura pública a propósito: el visitante anónimo necesita el valor antes de autenticarse. Escritura solo admin |
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
  "misconceptions": [{"question-id": "...", "selected": "B", "explanation": "..."}],
  "fluency": {"n": 8, "t-rel": 2.19, "lambda": 0.456, "band": "fluida", "enough?": true},
  "fluency-profile": {"id": "consolidado", "titulo": "Consolidado", "descripcion": "…", "accion": "…"}
}
```

`universo.profile/build` produce además `:stability {:theta-variance … :stable? …}` cuando hay
≥ 3 puntos en `theta-history`. **Contrato acoplado**: cualquier cambio en `profile/build` cambia
la forma del JSONB persistido. Es un contrato implícito, sin validación de esquema
([[RISKS]] R-09).

`:fluency` / `:fluency-profile` son **aditivas** (ADR-019, 2026-08-12): los perfiles guardados
antes simplemente no las traen, y no se recalculan hacia atrás en la base — el cliente las
recalcula al vuelo desde el último test para poder mostrar la tarjeta. Consecuencia práctica del
JSONB: al releer, `"fluida"` vuelve como **string**, no como keyword; `fluency/profile-for` acepta
las dos formas a propósito, porque si no el cuadrante se vería al terminar el test y desaparecería
al recargar la página.

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

### 4.1.b Vuelta del login con Google (T-92, desde 2026-08-17)

**No hay ruta de callback propia ni código de arranque especial**: el regreso de Google reutiliza
el mecanismo de deep link a sección protegida de T-05.

```
[botón "Continuar con Google"]           (solo habilitado con la declaración D-21 marcada)
  → signInWithOAuth {:redirectTo origin + "/tablero"}
  → accounts.google.com → supabase.co/auth/v1/callback
  → GET https://jacobocordova.com/tablero#access_token=…
      · /tablero no es un archivo en GitHub Pages ⇒ lo sirve 404.html (ADR-026/ADR-027),
        que arranca la MISMA aplicación
      · [:router/init] ve :dashboard (protegida) y aún sin sesión ⇒ [:router :pending] :dashboard
      · supabase-js parsea el fragmento de forma asíncrona (detectSessionInUrl)
      · [:auth/get-session] resuelve ⇒ [:auth/session-established user false]
      · post-session-target ve `pending` ⇒ [:navigate-to :dashboard {:history :replace}]
```

> **Consecuencia para quien agregue otro proveedor social (Apple, Microsoft):** la fila en
> `profiles` la crea el trigger `handle_new_user()` sobre `auth.users` (migración `008`), así que no
> hay que tocar nada de datos; pero **Supabase da de alta al usuario que no existe**, o sea que todo
> botón social es también un registro. Ver [[../adr/ADR-028-toda-entrada-social-pasa-por-d-21]].

### 4.2 Diagnóstico

```
[:landing/start] → (si no hay sesión) login, recordando destino
                 → [:navigate-to :diagnostic-test]
[:test/open-selection] → get-distinct-topics → :test/topics-loaded
[:test/start topic] → resolve-topic (alias) → reset del estado del test → fetch-next-question
   (la config del banco viaja en :stop-config, incluidos min_response_seconds
    y los cortes de fluidez de 041 vía fluency/thresholds-from-config)
   fetch-candidates(θ, topic, answered-ids, ±1 → ±2) → closest-question
   → normalize-question → :current-question
usuario responde
   → response registrada → nueva θ (MAP + clamps) → theta-history
   → prefetch de la siguiente mientras se muestra el feedback
   → stop-reason ⇒ fin
       → profile/build → insert tests → upsert student_profiles
```

**La pantalla mientras tanto** (ADR-032): `:questions` y `:feedback` renderizan el **mismo**
escenario (`diagnostic-test/test-stage`). En `:feedback` la pregunta no se desmonta —se congela, con
la alternativa elegida marcada— y el panel de la capa cero entra al costado (columna derecha en `lg`,
hoja inferior debajo, sin backdrop). Para un admin ese panel tiene una segunda pestaña que edita el
ítem en el acto, y un «volver a servir» que deshace la última respuesta (`universo.reintento`) y lo
muestra otra vez ya corregido:

```
[:test/answer] → score_answer → [:test/answer-scored] → [:test/show-feedback]
                                                          (cierra el editor: arranca en «Respuesta»)
admin → [:editor-vivo/abrir qid] → fetch fila completa (RLS: solo admin, 025)
      → [:editor-vivo/campo k v] …
      → [:editor-vivo/guardar {:reintentar? true}]
           → campos-editados (solo lo que cambió) → patch_admin_question_fields
           → [:test/reintentar-ultimo {:parche …}]
                → responses.pop · theta-history.pop · θ ← previo (o :theta-initial)
                → stop-reason recalculada · mismo ítem, parcheado, otra vez en pantalla
```

### 4.3 Confirmación de cohorte (el flujo más acoplado a la DB)

```
estudiante se inscribe            (cliente: insert enrollments)
   └─ trigger cuenta activos (pending|confirmed) del cupo
        └─ si activos ≥ min_enrollments y status = 'open'
             └─ class_slots.status := 'confirmed'
                  └─ insert notifications (una por inscrito + una `slot_confirmed_admin` al owner)
                       └─ trigger notifications_enqueue_email → insert email_outbox (pending)
                            └─ Edge Function (cron / invoke) → Resend
                                 ├─ 2xx → status 'sent', sent_at
                                 └─ error → status 'failed', attempts+1, last_error
```

El cliente muestra el resultado esperado con `slots.logic/after-enrollment` sin esperar al trigger.

**Hallazgo verificado en producción (T-02, 2026-08-09):** el mismo trigger
`confirm_slot_if_threshold` (`001_mvp_schema.sql:302`) que confirma el cupo inserta **dos**
notifications: una `slot_confirmed` por inscrito y una `slot_confirmed_admin` al owner.
`enqueue_email_from_notification()` (`005_email_outbox.sql`) reconoce ambos `kind`, así que cada
confirmación de cupo encola dos filas en `email_outbox`, no una.

### 4.4 Plan

```
[:plan/load] → lee student_profiles.profile → deficit-slugs
             → resources where module.slug in deficit-slugs AND published = true
             → capa 0 (misconceptions del perfil) + capa 1 (resources) ordenadas por prioridad
             → [:plan/fetch-last-test!] → tests (último del estudiante)
                  → respuestas con :time-ms/:weight/:question-text  ─┐
                  → test_configs del topic de ese test              ─┤
                                                                    ▼
                       fluency/classify → banda λ → profile-for(θ, λ) → tarjeta 2×2
```

El fetch del último test es **best-effort**: si falla, no se muestra la tarjeta de fluidez y el
resto de "Mi plan" funciona igual.

---

## 5. Integraciones

| Integración | Tipo | Autenticación | Falla si… | Degradación |
|-------------|------|---------------|-----------|-------------|
| **Supabase PostgREST** | REST desde el navegador | JWT del usuario (anon key + sesión) | La app queda inutilizable | Ninguna: dependencia dura |
| **Supabase Auth** | REST | anon key | No se puede entrar | La landing pública sigue visible |
| **Google OAuth** *(activa desde 2026-08-17)* | Redirect vía Supabase | Client ID/Secret en el dashboard de Supabase + credenciales OAuth 2.0 en Google Cloud | El botón falla si el proveedor se deshabilita o si `https://jacobocordova.com/tablero` sale de la allowlist de Redirect URLs — **este segundo caso falla en silencio**: Supabase sustituye el destino por la Site URL en vez de dar error | Login por email sigue disponible como camino completo |
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
6. `questions`: SELECT/INSERT/UPDATE/DELETE solo para admin (`007`). **El estudiante no lee esta
   tabla**: obtiene los ítems por los RPC `next_question`/`score_answer` (`024`/`026`, ver §2.4).
   Desde `057`, `next_question` filtra además por `coalesce(q.active, true)`: un ítem inactivo
   deja de servirse sin borrarse.
   Hasta el 2026-08-09 una policy permisiva creada desde el dashboard anulaba esta regla por OR y
   dejaba el banco descargable; eliminada en `025`
   ([[../adr/ADR-015-item-sin-respuesta-en-el-cliente]], R-16 cerrado).
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
- ~~**Enumeración de `questions`**~~ — ✅ **cerrada 2026-08-09.** La sospecha de Q-12 se confirmó:
  una policy permisiva creada desde el dashboard dejaba el banco completo legible para cualquier
  cuenta autenticada. Resuelto con [[../adr/ADR-015-item-sin-respuesta-en-el-cliente]]: el cliente
  ya no lee la tabla y los ítems llegan por `next_question`/`score_answer`.
  **Residual aceptado:** sondear `score_answer` alternativa por alternativa permite reconstruir la
  clave con `N` llamadas autenticadas y registrables — se eliminó la exfiltración masiva, no el
  sondeo.
- **θ no es un registro confiable**: se calcula y se escribe desde el cliente, y
  `student_profiles_update_own` permite al estudiante reescribir su propia `theta_band`. No debe
  condicionar nada consecuente (precio, certificación) sin resolverlo antes ([[BACKLOG]] T-49).

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
| [[../adr/ADR-011-vision-libro-como-norte-estrategico]] | La visión del libro es norte estratégico, no alcance del MVP |
| [[../adr/ADR-012-tema-oscuro-mapeo-css-global]] | Tema oscuro por mapeo global de clases en `app.css`, no `dark:` por elemento |
| [[../adr/ADR-013-config-parada-por-banco-y-prerequisitos]] | Regla de parada configurable por banco (`test_configs`) + prerequisitos |
| [[../adr/ADR-014-tiempo-de-respuesta-como-eje-separado]] | El tiempo entra como **peso** de la respuesta, no como parámetro del modelo IRT |
| [[../adr/ADR-015-item-sin-respuesta-en-el-cliente]] | `correct_option` y `error_*` nunca viajan al cliente (RPC `score_answer`) |
| [[../adr/ADR-016-ia-en-el-pipeline-de-autoria-no-en-runtime]] | La IA genera contenido en el pipeline de autoría, nunca en runtime |
| [[../adr/ADR-017-topic-canonico-por-trigger]] | `topic` canónico por trigger en la DB, con espejo puro en `universo.topics` |
| [[../adr/ADR-018-track-experimental-cuantica]] | Track experimental de Mecánica Cuántica sobre el mismo motor, aislado por `active = false` |
| [[../adr/ADR-019-eje-de-fluidez-en-vez-de-estilos-de-aprendizaje]] | El segundo eje del perfil mide **fluidez (λ)**, no estilos de aprendizaje |
| [[../adr/ADR-020-identidad-visual-por-tokens]] | La identidad visual vive en tokens de Tailwind; se redefine la escala `indigo` en vez de reescribir los componentes |
| [[../adr/ADR-021-linea-del-tiempo-historica]] | Línea del tiempo histórica en el tablero, con medallas derivadas de `tests` en vez de una tabla de logros |
| [[../adr/ADR-022-lenguaje-braun-rams]] | La identidad es el lenguaje Braun/Rams: una escala neutra y un color de señal; la apariencia por defecto se configura en `site_settings` (`043`) |
| [[../adr/ADR-023-panel-de-instrumento]] | Panel de instrumento: la física vive en los controles (`.control`, `.alojamiento`, `.led`, `.placa`, `.grabado` en `app.css`), no en la superficie |
| [[../adr/ADR-031-fondo-como-plano-de-medida]] | El fondo es un plano de medida (graticule, `.fondo-graticule`), y **ninguna sección hereda su fondo** |

---

## 10. Riesgos arquitectónicos

| # | Riesgo | Detalle |
|---|--------|---------|
| A-01 | **RLS como único control** | Un error de policy expone datos de estudiantes. No hay defensa en profundidad ni auditoría automática de policies |
| A-02 | **Un solo entorno** | Se desarrolla y prueba contra la base de producción |
| A-03 | **Deploy manual del bundle** | Se puede publicar código fuente sin recompilar el `app.js`, o commitear un `app.js` que no corresponde al fuente. Al 2026-08-12 el árbol está limpio y `main` trae el bundle con el eje de fluidez; el riesgo es de proceso, no un pendiente abierto |
| A-04 | **Reglas duplicadas cliente/DB** | Bandas de θ y confirmación de cupo viven en dos lugares |
| A-05 | **Contrato JSONB implícito** | `profile` se persiste sin esquema; un cambio en `profile/build` rompe lectores antiguos silenciosamente |
| A-06 | **Componentes monolíticos** | `admin.cljs` (1060), `crud.cljs` (975), `events/admin.cljs` (738) concentran riesgo de regresión |
| A-07 | ✅ ~~**Sin router de URL**~~ | **Resuelto 2026-08-16** (T-05, [[../adr/ADR-026-router-de-url-con-history-api]]): hay router de History API con fallback `404.html`. Queda el resto de A-07' abajo |
| A-07' | **Todas las rutas salvo `/` responden HTTP 404** | Es cómo funciona el fallback de GitHub Pages. La aplicación funciona igual, pero las rutas públicas no son indexables y el `sitemap.xml` solo declara `/` (T-94) |
| A-08 | **Sin code splitting** | El bundle crece de forma monótona; el estudiante en móvil descarga también todo el panel admin |
| A-09 | **Duplicación de HTML — reducida y verificable** | **2026-08-17 ([[../adr/ADR-027-un-solo-index-html]]):** `public/index.html` eliminado (había divergido en su `<noscript>`); desarrollo sirve la raíz, igual que Pages. Quedan **dos** documentos, `index.html` y `404.html`, que difieren **a propósito** (ADR-026) y por eso no se fusionan: su sincronía la verifica `scripts/audit_html.py`. Se cierra del todo solo si el proyecto deja GitHub Pages |
| A-10 | **Grafo de conocimiento parcial** | Graphify no indexa `.cljs`: el análisis automático no ve la lógica principal |

Priorizados con impacto/probabilidad en [[RISKS]].

---

## 10-bis. Verificación versionada (`scripts/`)

El proyecto no tiene CI que corra sobre cada push (T-06 existe pero sin verificar), así que las
comprobaciones que importan viven como scripts en el repo, en la misma línea que
`supabase/queries/verificacion_esquema.sql`: **un hallazgo que no se versiona se pierde.**

| Script | Qué comprueba | Modo de fallo que ataja |
|--------|---------------|-------------------------|
| `audit_dark_theme.py` | Texto oscuro (tono ≥ 600) y **fondo claro (≤ 200) sin mapear** en `app.css` | El riesgo que ADR-012 anticipó: un componente queda sin tema oscuro **sin aviso** |
| `audit_contraste.py` | 38 pares de la paleta contra su umbral WCAG, más las combinaciones **prohibidas** con su número | "Se ve mejor" no es verificable y no sobrevive a la siguiente opinión |
| `audit_movil.py` | Objetivos táctiles, padding fijo, texto diminuto, tablas sin scroll, anchos fijos | Se diseña en pantalla grande: nada avisa cuando algo no entra en 360 px |
| `audit_html.py` | Que `index.html` y `404.html` **arranquen igual**: script de tema, bundle/CSS/manifest resolviendo al mismo archivo, versión de KaTeX, favicons, `noindex` en el fallback | Los dos difieren a propósito en el SEO (ADR-026), así que no se pueden diffear crudos. Si el bundle o el script de tema se desincronizan, **la raíz sigue funcionando** —que es lo que uno prueba— y todas las demás rutas quedan rotas en silencio (ADR-027) |

**Los cuatro se probaron contra un caso que debería fallar antes de creerles**, y no es ceremonia: el
audit de móvil tenía un falso negativo silencioso en su primera versión —capturaba `"button"` como
si fuera la lista de clases— y daba todas las pantallas del panel por buenas. Un chequeo que no
encuentra nada es indistinguible de uno que funciona.

**Lo que ninguno cubre**, y está dicho en cada docstring: no ven lo que no está escrito (un elemento
sin clase de color), no ven una clase del sistema encima de otra, no ven estilos inline, y **no
dicen cuándo algo está bien** — solo cuándo está mal. Un par puede aprobar AA y seguir sin leerse
por tamaño y sombra; pasó, y por eso la verificación visual (T-67) no es reemplazable.

---

## 11. Relación con Graphify

`project-memory/graph/GRAPH_REPORT.md` es el **snapshot versionado** del grafo del repositorio
(`graphify-out/` es el directorio de trabajo vivo, no versionado).

Estado del snapshot al **2026-08-12** (commit `5207882a`): **1 560 nodos · 1 898 aristas ·
144 comunidades** sobre 141 archivos; **100 % de aristas extraídas**, ninguna inferida.

> **No leer el tamaño como crecimiento del proyecto.** El snapshot del 2026-08-10 marcaba 2 376
> nodos porque el manifest indexó `public/js/app.js`, el bundle minificado, y sus símbolos ofuscados
> (`v()`, `K()`, `C()`…) coparon los god nodes. El de hoy es más chico y más útil: el núcleo vuelve a
> ser la documentación y el esquema.

**God nodes** (mayor conectividad = abstracciones centrales *según la documentación*):

1. `Schema Supabase — Academia Integral MVP` (28 aristas)
2. `SESSION-021` (20) — la sesión del eje de fluidez
3. `SESSION-018` / `SESSION-019` (19)
4. Las sesiones fundacionales `SESSION-001`…`004` (18 cada una)

Que las sesiones aparezcan tan conectadas es esperable y sano: son el tejido que enlaza decisiones,
tareas y riesgos entre sí. El esquema de Supabase en el primer lugar confirma lo que dice §1 — el
modelo de datos **es** la arquitectura de este sistema.

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
