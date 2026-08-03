# TECH_STACK

Última actualización: **2026-07-26** · Verificado contra `deps.edn`, `shadow-cljs.edn`,
`package.json`, `tailwind.config.js`, `postcss.config.js`

## 1. Resumen

| Capa | Tecnología | Versión | Fuente |
|------|-----------|---------|--------|
| Lenguaje (host) | Clojure | 1.12.0 | `deps.edn` |
| Lenguaje (app) | ClojureScript | 1.12.38 | `deps.edn` |
| Compilador / dev server | shadow-cljs | **3.0.4** (deps.edn) / **^2.19.2** (package.json devDep) ⚠️ | `deps.edn`, `package.json` |
| UI | Reagent | 1.2.0 | `deps.edn`, `shadow-cljs.edn` |
| Estado / eventos | re-frame | 1.4.3 | `deps.edn`, `shadow-cljs.edn` |
| Runtime UI | React / React-DOM | ^17.0.2 | `package.json` |
| Estilos | Tailwind CSS | ^3.4.17 | `package.json` |
| CSS toolchain | PostCSS ^8.5.4 + Autoprefixer ^10.4.21 | | `postcss.config.js` |
| Matemática | KaTeX | ^0.16.22 (npm) / 0.16.9 (CSS por CDN) ⚠️ | `package.json`, `index.html` |
| Cliente backend | `@supabase/supabase-js` | ^2.49.8 | `package.json` |
| Backend | Supabase (PostgreSQL + Auth + RLS + Edge Functions) | proyecto `jmnqklhxcdccvdhuuiji` | `src/universo/supabase.cljs` |
| Edge runtime | Deno (Supabase Edge Functions) | `supabase-js@2.49.1` vía esm.sh | `supabase/functions/send-enrollment-emails/index.ts` |
| Email | Resend (API REST) | — | misma Edge Function |
| Hosting | GitHub Pages | rama `main`, raíz del repo | `CNAME` |
| DevTools | binaryage/devtools 1.0.7, nREPL 1.0.0 | | `deps.edn` |
| Editor / tooling local | Calva, clj-kondo, LSP, Cursor (plugin Supabase) | | `.calva/`, `.clj-kondo/`, `.lsp/`, `.cursor/settings.json` |
| Grafo del repo | Graphify | CLI en `/opt/anaconda3/bin/graphify` | `.claude/settings.json` |

⚠️ **Inconsistencias de versión conocidas** (no rompen hoy, pero deben resolverse — [[BACKLOG]] T-13):
- `shadow-cljs` aparece como 3.0.4 en `deps.edn` y `^2.19.2` en `package.json`. El build por
  `clojure -M:shadow-cljs` usa el de `deps.edn`; el de npm solo importa si se invoca
  `npx shadow-cljs`. Dos versiones distintas del mismo compilador en el mismo repo.
- KaTeX: el CSS se carga desde CDN en 0.16.9 mientras el paquete npm es ^0.16.22.

## 2. Builds (`shadow-cljs.edn`)

```clojure
:source-paths ["src" "test"]

:builds
 {:app  {:target :browser
         :output-dir "./public/js"
         :asset-path "/js"
         :modules {:app {:entries [universo.core]}}
         :devtools {:after-load universo.core/mount-root}}
  :test {:target :node-test
         :output-to "out/test.js"
         :ns-regexp "-test$"
         :autorun true}}

:dev-http {3000 {:root "public"}}
```

- **Punto de entrada único:** `universo.core`. Todo namespace no alcanzable desde ahí no llega al
  bundle (ver [[ARCHITECTURE]] §3 sobre código no alcanzable).
- **Tests:** `:node-test` descubre cualquier ns terminado en `-test`. Salida en `out/test.js`
  (ignorado por Git).
- **Dev server:** `http://localhost:3000` sirviendo `public/`.

## 3. Comandos

```bash
# Dependencias JS
npm install

# Desarrollo (watch + hot reload de re-frame vía :after-load)
clojure -M:shadow-cljs watch app

# REPL de navegador
npx shadow-cljs browser-repl

# Tests (34 tests / 133 assertions al 2026-07-26)
clj -M:test

# CSS en watch
npm run watch:css      # tailwindcss -i src/css/app.css -o public/css/app.css --watch

# Build de producción
npx shadow-cljs release app    # → public/js/app.js  (VERSIONADO en Git)
npm run build:css              # → public/css/app.css minificado

# Grafo del repositorio
graphify update .              # incremental, sin costo de API
graphify cluster-only .        # regenera GRAPH_REPORT.md + graph.html
```

> `npm test` ahora delega en `clj -M:test` (T-14, 2026-08-03) -- antes fallaba por diseño con
> "Error: no test specified". Ambos comandos son equivalentes hoy.

## 4. Estructura de `src/`

```
src/
├── css/app.css                     # entrada de Tailwind
└── universo/
    ├── core.cljs                   # init!, mount-root, requires de todos los events
    ├── db.cljs                     # default-db (forma completa del app-db)
    ├── subs.cljs                   # suscripciones globales (:current-page, :current-section…)
    ├── views.cljs                  # dispatch de página → home
    ├── home.cljs                   # layout: nav + main-content + footer, ruteo por sección
    ├── supabase.cljs               # cliente Supabase + auth (URL y anon key públicas)
    ├── visitor_tracker.cljs        # tracking de visita
    ├── ip.cljs / geo.cljs          # IP y geolocalización (usados por el tracker)
    ├── profile.cljs                # PURO: responses+questions → perfil
    ├── db/
    │   ├── crud.cljs               # (975 líneas) acceso a datos centralizado
    │   └── supabase.cljs           # API delgada legada (guestbook)
    ├── events/
    │   ├── auth.cljs               # sesión, rutas protegidas, roles
    │   ├── test.cljs               # motor del diagnóstico (fetch, respuesta, prefetch, parada)
    │   ├── profile.cljs            # construir y materializar student_profiles
    │   ├── plan.cljs               # cargar recursos por déficits
    │   ├── slots.cljs              # cupos, inscripción, notificaciones
    │   ├── admin.cljs              # (738 líneas) todo el panel admin
    │   ├── dashboard.cljs          # métricas del tablero
    │   ├── landing.cljs            # testimonios, CTA
    │   └── contacto.cljs           # formulario de contacto
    ├── irt/progress.cljs           # PURO: Fisher info, SE, stop rule, serie de progreso
    ├── slots/logic.cljs            # PURO: filtro por banda, conteo activo, confirmación
    └── components/
        ├── tetha.cljs              # PURO: modelo 1PL, MAP, Newton-Raphson, clamps
        ├── landing.cljs            # landing pública (425 líneas)
        ├── login.cljs / auth.cljs
        ├── diagnostic_test.cljs    # UI del diagnóstico
        ├── feedback_modal.cljs     # feedback + explicación del error
        ├── math_render.cljs        # KaTeX
        ├── irt_chart.cljs          # evolución de θ
        ├── plan.cljs / slots.cljs
        ├── dashboard.cljs
        ├── admin.cljs (1060) / admin_questions.cljs
        ├── guestbook.cljs / contacto.cljs / resume.cljs
        └── mathacademy*            # ARCHIVADO, fuera del build
```

Total ClojureScript: **~10 290 líneas** en `src/`.

**Archivos más grandes** (candidatos naturales a refactor — [[BACKLOG]] T-15):
`components/admin.cljs` (1060), `db/crud.cljs` (975), `events/admin.cljs` (738),
`components/resume.cljs` (515), `events/test.cljs` (485), `events/slots.cljs` (458),
`components/landing.cljs` (425).

## 5. Tests

```
test/
├── core_test.cljs
├── universo/profile_test.cljs
├── universo/slots/logic_test.cljs
├── universo/irt/progress_test.cljs
├── universo/components/tetha_test.cljs
├── universo/events/auth_test.cljs
├── universo/events/dashboard_test.cljs
└── universo/events/slots_test.cljs
```

Estado al **2026-07-26**: `Ran 34 tests containing 133 assertions. 0 failures, 0 errors.`

Cobertura concentrada en la **lógica pura** (IRT, perfil, bandas, cupos) y en algunos handlers
puros de eventos. **Sin cobertura:** componentes de UI, `db/crud.cljs` (I/O real),
`events/admin.cljs`, `events/test.cljs` (efectos), Edge Function, policies RLS.

## 6. Base de datos (Supabase / PostgreSQL)

Detalle en `supabase/SCHEMA.md`. Resumen:

**Previas al MVP:** `profiles`, `questions`, `tests`, `guestbook`, `visitor`, `contacto`.
**MVP:** `modules`, `student_profiles`, `resources`, `class_slots`, `enrollments`,
`notifications`, `email_outbox`.

**Orden obligatorio de aplicación:** ver `supabase/SCHEMA.md` §"Orden de aplicación" -- es la
**única** lista mantenida (ya va por `019` al 2026-08-02); no se duplica aquí para no
desincronizarse cada vez que se agrega una migración, como ya pasó una vez con esta misma sección.

> Sin `supabase` CLI en el flujo de migración: se ejecutan a mano en el SQL Editor. La CLI se usa
> solo para `functions deploy` y `secrets set`.

## 7. Artefactos y qué se versiona

| Ruta | ¿En Git? | Nota |
|------|----------|------|
| `public/js/app.js` | **Sí** | Bundle de producción. Es el mecanismo de deploy (ADR-003) |
| `public/css/app.css` | Sí | Salida de Tailwind |
| `public/js/cljs-runtime/`, `manifest.edn`, `*.js.map` | No | Ignorados |
| `node_modules/`, `.shadow-cljs/`, `.cpcache/`, `out/` | No | Ignorados |
| `.clj-kondo/`, `.lsp/`, `.calva/` | No | Ignorados |
| `.env*` | No | Ignorados (`!.env.example` permitido; no existe hoy) |
| `src/universo/user.cljs` | **Sí, aunque `.gitignore` lo lista** ⚠️ | Fue trackeado antes de ignorarse; `.gitignore` no destrackea. Ver [[BACKLOG]] T-16 |
| `graphify-out/` | No versionado hoy (untracked) | El snapshot versionado vive en `project-memory/graph/` |
| `src/universo/components/math_render_2` | Sí | **Archivo sin extensión** (7,7 KB), no compilable. Ver [[BACKLOG]] T-17 |
| `avatar.html` | Sí | Utilidad suelta para generar un avatar; no parte de la app |
| `compile-test.clj` | Sí | Script suelto de prueba de compilación |

## 8. Configuración de agentes en el repo

- `.claude/settings.json` — hooks `PreToolUse` que fuerzan usar `graphify` antes de
  `Bash|Grep` y `Read|Glob` (`graphify hook-guard search|read`).
- `.cursor/settings.json` — plugin Supabase habilitado.
- `CLAUDE.md` — punto de entrada de Claude Code CLI (reescrito bajo PMF el 2026-07-26).

## 9. Lo que **no** hay

- Sin CI (`.github/` no existe), sin pipeline de build ni de tests.
- Sin entorno de staging: `main` es producción.
- Sin linter/formatter en el flujo obligatorio (clj-kondo está instalado localmente, no forzado).
- Sin monitoreo, logging centralizado ni alertas.
- Sin analytics conectado (Google Analytics aparece solo como "potencial" en la doc antigua).
- Sin gestión de dependencias automatizada (Dependabot/Renovate).
- Sin `.env.example` ni documentación de variables de entorno del cliente (no las usa: la config
  de Supabase está inline en `src/universo/supabase.cljs`).

---

Relacionado: [[ARCHITECTURE]] · [[DEPENDENCIES]] · [[RISKS]] · [[BACKLOG]] ·
[[../adr/ADR-001-clojurescript-re-frame-shadow-cljs]]
