# DEPENDENCIES

Última actualización: **2026-07-26**

Cuatro tipos: **externas** (servicios de terceros), **de librería** (código), **internas**
(acoplamientos del propio sistema) y **humanas / organizacionales**.

---

## 1. Dependencias externas (servicios)

| Servicio | Uso | Criticidad | Autenticación | Qué pasa si cae | Plan B |
|----------|-----|-----------|---------------|-----------------|--------|
| **Supabase** — PostgreSQL | Todo el estado del sistema | **Crítica** | anon key + JWT del usuario | La aplicación es inutilizable | Datos portables con `pg_dump` (Postgres estándar); requiere reescribir la capa de auth y PostgREST |
| **Supabase** — Auth | Registro, login, sesiones, OAuth | **Crítica** | anon key | Nadie puede entrar; la landing pública sigue | Ninguno inmediato |
| **Supabase** — RLS | **Único** mecanismo de autorización | **Crítica** | — | Riesgo de exposición o bloqueo de datos | Ninguno: es el diseño (ADR-002) |
| **Supabase** — Edge Functions | Envío de emails de cohorte | Media | `service_role` (env de la función) | El outbox queda `pending`; notificaciones in-app siguen | Invocación manual; degradación explícita ya implementada |
| **Resend** | Email transaccional | Media | `RESEND_API_KEY` (Supabase secret) | Filas `failed` con `last_error`; reintento manual | Cambiar de proveedor solo requiere tocar la Edge Function |
| **GitHub Pages** | Hosting del sitio | **Crítica** | — | Sitio caído | Cualquier hosting estático (los artefactos ya están construidos) |
| **GitHub (repo)** | Código + fuente de verdad de la memoria PMF | **Crítica** | credenciales del owner | Se pierde el flujo de trabajo y el historial remoto | Clon local; PMF es Markdown portable |
| **DNS `jacobocordova.com`** | Dominio de producción | Alta | registrador (no documentado) | El sitio queda accesible solo por `*.github.io` | `CNAME` reversible |
| **jsDelivr CDN** | CSS de KaTeX 0.16.9 | Baja | — | Fórmulas sin estilo, legibles | Servir KaTeX desde el propio bundle |
| **API de IP / geolocalización** | `ip.cljs`, `geo.cljs` para tracking | Baja | — | Tracking incompleto | Prescindible (ver Q-19) |
| **Google OAuth** (vía Supabase) | Login social | Baja | configurado en Supabase | Solo se cae ese botón | Login por email/contraseña |

> **Concentración de riesgo:** cinco de las dependencias críticas son de un único proveedor
> (Supabase). Aceptado explícitamente en [[../adr/ADR-002-supabase-como-unico-backend]]; riesgo
> R-15.

## 2. Dependencias de librería

### Clojure / ClojureScript (`deps.edn`, `shadow-cljs.edn`)

| Dependencia | Versión | Rol | Nota |
|-------------|---------|-----|------|
| `org.clojure/clojure` | 1.12.0 | Host | |
| `org.clojure/clojurescript` | 1.12.38 | Lenguaje de la app | |
| `reagent/reagent` | 1.2.0 | Componentes React | Atada a React 17 |
| `re-frame/re-frame` | 1.4.3 | Estado, eventos, efectos, suscripciones | Núcleo de la arquitectura del cliente |
| `thheller/shadow-cljs` | 3.0.4 | Compilador y dev server | ⚠️ `package.json` declara `^2.19.2` (T-13) |
| `binaryage/devtools` | 1.0.7 | Solo desarrollo | |
| `nrepl/nrepl` | 1.0.0 | REPL / editor | |
| `cljs.core.async` | (con ClojureScript) | `go`/`<!` en `db.crud` | Estilo de I/O de toda la capa de datos |

### npm (`package.json`)

| Paquete | Versión | Rol |
|---------|---------|-----|
| `@supabase/supabase-js` | ^2.49.8 | Cliente del backend (auth + PostgREST) |
| `react`, `react-dom` | ^17.0.2 | Runtime de Reagent |
| `katex` | ^0.16.22 | Render de matemática |
| `tailwindcss` | ^3.4.17 | Estilos (dev) |
| `postcss` | ^8.5.4 | Pipeline CSS (dev) |
| `autoprefixer` | ^10.4.21 | Prefijos CSS (dev) |
| `shadow-cljs` | ^2.19.2 | ⚠️ duplicado/desalineado con `deps.edn` |

### Edge Function (Deno)

| Import | Versión | Nota |
|--------|---------|------|
| `@supabase/supabase-js` vía `esm.sh` | 2.49.1 | Versión distinta a la del cliente (^2.49.8). No es problema hoy (procesos separados), pero es un desalineamiento a vigilar |
| API de Resend | REST directa (`https://api.resend.com/emails`) | Sin SDK: menos superficie de dependencia |

### Herramientas de desarrollo (no versionadas en el build)

`graphify` (CLI en `/opt/anaconda3/bin/graphify`, invocado por los hooks de `.claude/settings.json`),
`clj-kondo`, `clojure-lsp`, Calva, Cursor con plugin Supabase, `supabase` CLI (solo para
`functions deploy` y `secrets set`), Claude Code CLI.

> **Dependencia de entorno local:** los hooks de `.claude/settings.json` apuntan a una ruta absoluta
> (`/opt/anaconda3/bin/graphify`). En otra máquina los hooks fallarán. Documentado para quien clone
> el repo.

## 3. Dependencias internas (acoplamientos)

| Dependencia | Descripción | Consecuencia de romperla |
|-------------|-------------|--------------------------|
| `universo.core` → todos los `events/*` | `core.cljs` es el registro central: si un ns de eventos no se requiere ahí, sus `reg-event-*` no se registran | El `dispatch` falla **en silencio** (re-frame solo emite un warning en consola) |
| `universo.db/default-db` → `subs` y componentes | La forma del `app-db` es un contrato implícito | Un `nil` inesperado en la UI, sin error claro |
| Componentes → `subs` → `app-db` | Ningún componente accede a datos directamente | Si un componente llama a Supabase, se pierde la testabilidad y el flujo re-frame |
| Todo I/O → `universo.db.crud` | Punto único de acceso a datos | Duplicar queries fuera de `crud` fragmenta el contrato con la DB |
| `events/profile` → `universo.profile/build` → `student_profiles.profile` JSONB | La forma del JSONB es la salida de una función pura, sin validación de esquema | Un cambio en `build` rompe lectores antiguos sin aviso (R-09) |
| `slots.logic` ↔ trigger SQL de confirmación | Regla duplicada a propósito (espejo optimista en cliente) | La UI promete algo que la DB no hace (R-08) |
| `profile/theta-band` ↔ `check` de `class_slots.theta_band` | Bandas definidas en dos lenguajes | Cupos invisibles o rechazos de inserción |
| `irt.progress` → `components.tetha` | La información de Fisher se calcula con la segunda derivada del modelo | Cambiar el modelo (a 2PL) obliga a revisar SE y la regla de parada |
| `events/test` → `normalize-question` → forma de `questions` | Traducción de columnas SQL a mapas del dominio (`error_a` → `:errors {:A …}`) | Renombrar una columna rompe el feedback sin romper la query |
| `events/test/resolve-topic` → `topic-aliases` | Los topics de UI se traducen a los identificadores reales de Supabase | Un topic nuevo sin alias cae al default `numbers_V1` |
| `profile/topic->module-slug` → `modules.slug` | Mapeo parcial; lo no mapeado cae en `unknown/*` | Déficits sin módulo ⇒ sin recursos ⇒ plan vacío (T-28) |
| `home/main-content` → secciones | El ruteo es un `case` sobre `:ui/current-section` | Agregar sección implica tocar `home.cljs`, `db.cljs` y `protected-sections` si es privada |
| `index.html` ↔ `public/index.html` | Duplicación de HTML y JSON-LD | Divergencia de SEO (R-05, T-12) |
| `public/js/app.js` ↔ `src/**/*.cljs` | El bundle versionado debe recompilarse a mano | Producción distinta del código (R-13) |
| Migraciones SQL en orden | `001` requiere `is_admin()` de `admin_rls.sql`; `005` requiere `notifications` de `001`; `006`/`007` requieren `is_admin()` | Aplicar fuera de orden falla o deja el sistema a medias |

## 4. Dependencias humanas y organizacionales

| Dependencia | Detalle | Riesgo |
|-------------|---------|--------|
| **Jacobo Córdova** | Owner, único desarrollador, autor del contenido, operador de infraestructura, profesor de las clases | R-01 (bus factor = 1). Es la dependencia más crítica del proyecto |
| **UNAP** | Respaldo institucional visible en producción; posible proveedor de salas en Iquique | Q-01: vínculo formal no documentado |
| **Contenido pedagógico** | El valor del producto depende de ítems bien escritos con `error_*` reales. Es trabajo humano no delegable a la herramienta | Bloqueo actual del go-live (T-01, T-27) |
| **Credenciales y accesos** | Supabase, GitHub, Resend, DNS: en manos de una sola persona, sin respaldo documentado | Pérdida de acceso = pérdida del proyecto |
| **Agentes de IA** | Claude Code CLI (y otros) ejecutan cambios técnicos | Dependen de que la memoria esté al día (A-26) |

---

## 5. Orden de arranque de un entorno nuevo

Secuencia mínima para levantar el sistema desde cero (útil para staging, T-09):

1. Crear proyecto Supabase; anotar URL y anon key.
2. Aplicar en orden: `admin_rls.sql` → `guestbook_tri_state.sql` → `001` → `002` → `003` (opcional)
   → `004` → `005` → `006` → `007`.
3. Marcar la cuenta admin: `update public.profiles set role = 'admin' where email = '…';`
4. Configurar Google OAuth en el dashboard (opcional).
5. `supabase secrets set RESEND_API_KEY=…` y `EMAIL_FROM=…`; `supabase functions deploy
   send-enrollment-emails`; programar el cron.
6. Ajustar `supabase-url` y `supabase-anon-key` en `src/universo/supabase.cljs`
   (**hoy están hardcodeados** — configurar un entorno alternativo requiere una decisión, P-06).
7. `npm install`; `npm run build:css`; `npx shadow-cljs release app`.
8. Publicar `index.html`, `public/` y el bundle.
9. Cargar contenido: módulos (ya sembrados por `002`/`004`), preguntas con `error_*`, recursos,
   cupos.

## 6. Actualización de dependencias

No hay automatización (sin Dependabot/Renovate). Al actualizar:

1. Cambiar la versión en `deps.edn` **y** `package.json` si aplica a ambos (caso shadow-cljs).
2. `npm install` / limpiar `.cpcache` si hace falta.
3. `clj -M:test` → debe quedar en 0 failures.
4. `npx shadow-cljs release app` → verificar que compila sin errores nuevos.
5. Probar a mano el funnel completo (login → diagnóstico → plan → cupos).
6. Registrar en `sessions/SESSION-XXX.md`; si la actualización es mayor (React 18, Tailwind 4,
   supabase-js 3, shadow-cljs mayor) → **ADR**.

Actualizaciones que sabemos que son **mayores** y requieren ADR: React 17 → 18+ (Reagent 1.2 está
atada a 17), Tailwind 3 → 4 (cambia la configuración), `supabase-js` 2 → 3.

---

Relacionado: [[TECH_STACK]] · [[ARCHITECTURE]] · [[RISKS]] · [[BACKLOG]] · [[ASSUMPTIONS]]
