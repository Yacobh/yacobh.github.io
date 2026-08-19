# CLAUDE.md — Academia Integral (repo `yacobh.github.io`)

> **Project Memory First (PMF).** La memoria del proyecto vive en `project-memory/`, versionada
> en Git y escrita en Markdown. Este archivo es el punto de entrada para Claude Code CLI.
> Si algo aquí contradice `project-memory/`, gana `project-memory/` y hay que corregir este
> archivo en el mismo commit.

---

## 1. Resumen ejecutivo

**Academia Integral** es una plataforma web de preparación para la **PAES de Matemática 1**
(Chile). Aplica un **diagnóstico adaptativo basado en Teoría de Respuesta al Ítem (IRT, modelo
1PL/Rasch)** para estimar la habilidad del estudiante (θ), detectar los **errores conceptuales
concretos** que comete, generar un **plan de estudio personalizado** y ubicarlo en un **grupo de
estudio (cupo) de su misma banda de nivel**, online o presencial en Iquique. Desde el 2026-08-12 el
perfil tiene un **segundo eje, la fluidez (λ)**, que separa "sabe" de "sabe y automatizó"
(ver [[adr/ADR-019-eje-de-fluidez-en-vez-de-estilos-de-aprendizaje]]), y desde el 2026-08-13 la
identidad visual es el **lenguaje Braun / Dieter Rams** sobre un panel de instrumento
([[adr/ADR-022-lenguaje-braun-rams]], [[adr/ADR-023-panel-de-instrumento]]).

> ### ⭐ 2026-08-16 — el proyecto cambió de modelo de negocio
>
> **El producto está esencialmente terminado; el negocio no está empezado.** El modelo anterior
> (clases a $10.000 CLP/hora) tiene un techo aritmético de **≈ USD 16.000/año** que no depende de la
> ejecución. Por [[adr/ADR-025-motor-de-valor-b2b-y-cinco-vectores]] (D-47…D-51) se adoptaron
> **cinco vectores de valor**, cuyo archivo canónico es
> **[[project-memory/TESIS_DE_CRECIMIENTO]]**:
>
> | | Vector | En una frase |
> |---|---|---|
> | **G-1** | Licencia institucional **B2B** como línea principal | Se le vende al colegio la parte del producto que **no consume horas del profesor** |
> | **G-2** | **Calibrar** el banco y convertirlo en el activo defendible | Hoy `difficulty` es autoral: el argumento psicométrico del pitch no está respaldado por datos |
> | **G-3** | Ingreso **desacoplado de las horas** del fundador | Clases grabadas por cuadrante θ×λ + red de profesores con comisión |
> | **G-4** | Se vende **progreso medido (Δθ)**, no acceso | El histórico de perfiles **nunca se sobrescribe**: es el producto |
> | **G-5** | **Distribución medida** (CAC/LTV) y búsqueda de capital | Tres intentos históricos murieron acá; sin esto no hay negocio |
>
> **Orden decidido:** G-2 y G-5 primero y en paralelo → G-1 → G-4 → G-3. Fases **F12–F16** en
> [[project-memory/ROADMAP]], tareas **T-76…T-89** en la épica **E8** de [[project-memory/BACKLOG]].
>
> **Tres reglas para cualquier agente que trabaje aquí a partir de ahora:**
>
> 1. **Los números del plan son supuestos, no hechos.** Precio de licencia, tamaño de mercado y
>    disposición a pagar están en [[project-memory/ASSUMPTIONS]] **A-31…A-35**, todos sin validar.
>    No citarlos como ciertos en ningún material; se validan con **T-80**.
> 2. **No se vende B2B antes de calibrar** (G-2 es precondición dura de G-1) y **no se firma un
>    contrato institucional antes de cerrar F9** (respaldo T-07, staging T-09, RLS T-11) — con datos
>    de menores de un colegio eso deja de ser buena práctica y pasa a ser requisito contractual
>    ([[project-memory/RISKS]] R-28).
> 3. **El riesgo dominante ahora es R-30:** convertir el pivote en más construcción de producto y
>    terminar otra vez con un producto mejor y cero clientes. Si un mes de trabajo es solo código, el
>    riesgo se está materializando.

Es un **proyecto personal del profesor Jacobo Córdova**. Su **raíz es la tesis de grado del owner en
Ingeniería Electrónica (UNEXPO, Puerto Ordaz, 2010)**: un sistema de respuesta en el aula que ya
planteaba el aula como planta y la evaluación como muestreo, y cuya recomendación final
—individualizar la evaluación— es lo que este producto ejecuta. En **2012** esa línea se llamó
**"Sistema Llovizna"** y se postuló a financiamiento estatal venezolano sin éxito; ese documento ya
especificaba la recomendación automática de recursos que hoy es la capa 1 de "Mi plan". El
**convenio con la Universidad
Arturo Prat** (a honorarios, alcance acotado, oct–nov 2025, **ya terminado**) fue un **episodio de
financiamiento, no el origen**: el primer commit del repo es del 2025-05-03, anterior al convenio. No
hay alianza institucional ni autorización de marca vigente hoy (ver
[[project-memory/RAIZ_SISTEMA_LLOVIZNA]], [[adr/ADR-024-raiz-en-la-tesis-2010]],
[[project-memory/OPEN_QUESTIONS]] Q-01/Q-30, [[project-memory/DECISIONS]] D-18/D-45). El
diagnóstico, el perfil y el plan **no tienen costo**; las clases sí ($10.000 CLP/hora, D-32), y la
**publicidad está descartada** como fuente de ingresos (D-46).

> ✅ **El copy publicado ya está corregido** (D-53, 2026-08-16): nombra a la UNEXPO, sin la ponencia
> de 2013, y la UNAP salió del FAQ de costo. **X-09 y Q-30 cerradas.** Si vuelves a tocar copy de
> cara al público, **no hay un número único de lugares: depende de qué copy** (verificado con `grep`
> el 2026-08-17, tras ADR-027):
>
> | Copy | Dónde vive |
> |---|---|
> | FAQ | `index.html` (JSON-LD `FAQPage`) + `landing.cljs` |
> | Origen del proyecto | `index.html` (`<noscript>`) + `home.cljs` (footer) |
> | Descripción / meta / Open Graph | `index.html` (`<head>`) + `landing.cljs` |
>
> Se cambian **todos en el mismo commit** y **la lista se re-verifica con `grep` cada vez** en vez de
> confiar en esta tabla (L-22 — la memoria ya dijo "tres" cuando eran cinco). Ojo con el falso
> positivo de `resume.cljs`: menciona la UNEXPO y la UNAP como **experiencia docente real**, no como
> origen del producto; ahí no se toca.
>
> ✅ **`docs/tesis.md` y `docs/sistema_llovizna.md` ya están commiteados y redactados**
> (R-26 cerrado 2026-08-13): la cédula, el teléfono y la fecha de nacimiento del owner quedaron como
> `xxxxx` antes del primer commit. No los rellenes.

- Sitio en producción: <https://jacobocordova.com> (GitHub Pages + `CNAME`)
- Estado: **MVP operable**, checklist de go-live parcialmente completo
- Detalle: [[project-memory/PROJECT_BRIEF]] · [[project-memory/CURRENT_STATUS]]

## 2. Objetivos del proyecto

**De producto (logrados y operativos):**

1. Que un estudiante pase de "no sé por dónde partir" a un plan concreto en **una sesión (~20 min)**.
2. Sustituir la nota por un **mapa de errores** (misconception nombrable por cada distractor).
3. Formar **cohortes por banda de θ** con confirmación automática al alcanzar el mínimo de inscritos.
4. Mantener costo de infraestructura ≈ 0 (GitHub Pages + Supabase free tier).

**De negocio (decididos el 2026-08-16, ninguno alcanzado):**

5. **Calibrar el banco** con respuestas reales y publicar el reporte técnico que sostiene la
   afirmación psicométrica (G-2). Es precondición de todo lo demás.
6. **Medir el funnel** hasta poder responder con datos cuánto cuesta traer un cliente y cuánto deja
   (G-5). Sin esto, ninguna afirmación de negocio es defendible.
7. **Vender la primera licencia institucional** a un colegio: diagnóstico de su matrícula, mapa de
   errores por curso y panel docente (G-1). Es el hito que define el año.
8. **Entregar Δθ** —evidencia medida de mejora, con su error asociado— al estudiante y a la cohorte
   (G-4). El histórico de perfiles nunca se sobrescribe.
9. **Construir una línea de ingreso que no dependa de una hora del fundador** (G-3), y salir de bus
   factor = 1.

Detalle y aritmética: [[project-memory/TESIS_DE_CRECIMIENTO]].
Objetivos de negocio completos (B-01…B-11): [[project-memory/BUSINESS_CONTEXT]] §2.

## 3. Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Lenguaje frontend | ClojureScript 1.12.38 |
| Estado / eventos | re-frame 1.4.3 (Reagent 1.2.0, React 17) |
| Build | shadow-cljs 3.0.4 (`deps.edn`), target `:browser` |
| Estilos | Tailwind CSS 3.4.17 + PostCSS + Autoprefixer |
| Matemática | KaTeX 0.16 (CDN para CSS, npm para render) |
| Backend | Supabase (PostgreSQL + Auth + RLS + Edge Functions) |
| Email | Supabase Edge Function (Deno) + Resend |
| Hosting | GitHub Pages sobre `main`, dominio propio vía `CNAME` |
| Tests | `shadow-cljs :node-test` vía `clj -M:test` |

Versiones exactas y notas de riesgo: [[project-memory/TECH_STACK]] · [[project-memory/DEPENDENCIES]].

## 4. Arquitectura general

```
Navegador (SPA ClojureScript/re-frame)
  index.html → public/js/app.js → universo.core/init!
      │
      ├── router (URL ↔ sección, ADR-026) → 404.html como fallback de GitHub Pages
      ├── views → home → components/{landing,login,diagnostic-test,plan,slots,dashboard,admin,...}
      ├── events/{auth,test,profile,plan,slots,admin,dashboard,landing,contacto,router}
      └── lógica pura: profile · slots.logic · components.tetha · topics
                       irt.progress · irt.effort · irt.fluency (eje λ, ADR-019)
                       misconceptions (catálogo de 027, T-57)
      │
      ▼  @supabase/supabase-js (JWT del usuario)
Supabase PostgreSQL  ── RLS es el único límite de seguridad ──
  profiles · questions · tests · test_configs · modules · misconceptions
  student_profiles · resources
  class_slots · enrollments · notifications · email_outbox · guestbook · visitor · contacto
      │
      ▼ trigger min_enrollments → notifications → email_outbox
Edge Function `send-enrollment-emails` (Deno) → Resend
```

**No hay backend propio.** El cliente habla directo con Supabase; toda autorización se hace con
Row Level Security y `public.is_admin()`. Detalle completo, flujos de datos e infraestructura:
[[project-memory/ARCHITECTURE]].

## 5. Convenciones de desarrollo

- **Namespaces = ruta de archivo.** `universo.slots.logic` → `src/universo/slots/logic.cljs`
  (guion en el ns = guion bajo en el archivo). shadow-cljs falla si no coinciden.
- **Lógica pura primero.** Toda regla de negocio nueva (IRT, bandas, filtros de cupos, perfil) va
  a un namespace puro y testeable (`universo.profile`, `universo.slots.logic`,
  `universo.irt.progress`, `universo.irt.effort`, `universo.irt.fluency`, `universo.topics`,
  `universo.router`, `universo.components.tetha`, `universo.misconceptions`), **no** dentro de un
  `reg-event-fx`.
- **Navegación:** si agregas una sección, agrégala al `case` de `home/main-content` **y** a la tabla
  de `universo.router` (y a `protected-sections` si es privada). La sección es el estado
  autoritativo y la URL su reflejo: el router **nunca** escribe `[:ui :current-section]` — despacha
  `:navigate-to`, para que todo pase por `guard-section` (ADR-026).
- **re-frame ortodoxo:** `reg-event-db` para estado puro, `reg-event-fx` + `reg-fx` para I/O,
  `reg-sub` para lectura. Ningún componente llama a Supabase directamente.
- **Acceso a datos centralizado** en `universo.db.crud`. `universo.db.supabase` es una API delgada
  legada (solo guestbook); `universo.supabase` expone el cliente y auth.
- **Estado de UI por sección** en `app-db` (ver `universo.db/default-db`): cada pestaña de admin
  tiene su propio `:loading?`/`:error` para no contaminar a las demás.
- **Comentarios en español**, explicando el *por qué* (invariantes, salvaguardas), no el *qué*.
- **UI:** el color y el tamaño se verifican con los tres `scripts/audit_*.py`, no a ojo. Toda clase
  de color nueva se mapea en `src/css/app.css` (ADR-012) y todo par nuevo se declara en
  `audit_contraste.py`. Las piezas del panel (`.control`, `.alojamiento`, `.led`, `.placa`,
  `.visor`, `.grabado`) se reutilizan en vez de rehacerse con utilidades sueltas (ADR-023).
- Commits en español, imperativo, una intención por commit.
- No introducir dependencias npm/maven nuevas sin registrar la decisión (§9).

Comandos:

```bash
clojure -M:shadow-cljs watch app     # dev (http://localhost:3000)
npm run watch:css                    # Tailwind en watch
npx shadow-cljs release app          # build de producción → public/js/app.js
npm run build:css                    # CSS minificado → public/css/app.css
clj -M:test                          # suite de tests (node-test)
clj-kondo --lint src test             # lint + análisis de namespaces/vars CLJS (complemento de graphify, ver §13)

python3 scripts/audit_dark_theme.py   # texto oscuro / fondo claro sin mapear en el tema oscuro
python3 scripts/audit_contraste.py    # los 38 pares de la paleta contra su umbral WCAG
python3 scripts/audit_movil.py        # objetivos táctiles, padding fijo, texto diminuto
python3 scripts/audit_html.py         # index.html y 404.html arrancan igual (ADR-027)
```

## 6. Convenciones de documentación

- Fuente de verdad: **Markdown en `project-memory/`**, versionado en Git.
- Un hecho vive en **un solo archivo**. Los demás lo referencian con `[[ENLACE]]`.
- Enlaces internos estilo Obsidian `[[ARCHIVO]]` — compatibles con Markdown plano y con Git.
- Nombres de archivo en `MAYUSCULA_CON_GUION_BAJO.md` para memoria, `ADR-XXX-slug.md` para ADRs,
  `SESSION-XXX.md` para sesiones. Sin espacios ni acentos en nombres de archivo.
- Fechas siempre absolutas (`2026-07-26`), nunca "la semana pasada".
- Si un dato falta, **no se inventa**: se registra en [[project-memory/OPEN_QUESTIONS]].
- Contradicciones detectadas → [[project-memory/OPEN_QUESTIONS]], no se resuelven en silencio.

## 7. Reglas de seguridad

1. **RLS es el único límite de autorización.** Cualquier tabla nueva se crea con
   `enable row level security` y sus policies **en la misma migración**. Sin policy = sin acceso.
2. La **anon key** de Supabase y la URL del proyecto están intencionalmente en el bundle
   (`src/universo/supabase.cljs`): son públicas por diseño. **Nunca** poner allí
   `service_role`, `RESEND_API_KEY` ni ningún secreto.
3. Secretos de servidor solo como **Supabase secrets** (`supabase secrets set ...`), consumidos
   por Edge Functions vía `Deno.env.get`.
4. Nunca confiar en checks de UI (`:auth/admin?`) como control de acceso: son UX. El control real
   es la policy SQL.
5. Antes de cambiar policies: verificar el caso "estudiante ve solo lo suyo" y
   "no queda ningún admin" (trigger `profiles_protect_last_admin`).
6. Datos personales presentes: email, IP, ciudad/país, batería, user-agent (`visitor`,
   `contacto`, `guestbook`). No ampliar la recolección sin registrar la decisión y el riesgo.

## 8. Reglas de testing

- Toda función pura nueva o modificada necesita test en `test/` (`*_test.cljs`, ns terminado en
  `-test`; el build `:test` los descubre con `:ns-regexp "-test$"`).
- `clj -M:test` debe cerrar en **0 failures / 0 errors** antes de commitear. Estado de referencia
  al 2026-08-12: **74 tests / 410 assertions / 0 failures**.
- Reglas espejo de la base de datos (ej. confirmación de cupo) se testean en el namespace puro
  (`universo.slots.logic`) **y** se documenta que la fuente de verdad es el trigger SQL.
- Los warnings `:infer-warning` de `events/auth.cljs` son conocidos y no rompen el build
  (ver [[project-memory/LESSONS_LEARNED]]).
- No hay CI: la ejecución de tests es **manual y obligatoria**. Ver [[project-memory/RISKS]] (R-04).

## 9. Reglas de despliegue

- Producción = rama **`main`** servida por GitHub Pages desde la raíz del repo.
- **El artefacto compilado `public/js/app.js` está versionado en Git**: un cambio en
  ClojureScript no llega a producción hasta que se compile con `npx shadow-cljs release app`
  y se commitee el `app.js` resultante. Ver [[adr/ADR-003-github-pages-artefacto-versionado]].
- `npm run build:css` antes de publicar si cambiaron clases Tailwind (Tailwind purga por
  contenido; una clase nueva sin rebuild no existe en producción).
- Las migraciones SQL se aplican **a mano** en el SQL Editor de Supabase, en el orden de
  `supabase/SCHEMA.md`. No hay `supabase db push` en el flujo actual.
- Edge Functions: `supabase functions deploy send-enrollment-emails` + secret `RESEND_API_KEY`.
- **Hay dos HTML en producción y ninguno es copia del otro** (ADR-027 cerró T-12; `public/index.html`
  ya no existe y el dev server sirve la raíz, así que en local ves el archivo que se publica):
  - `index.html` (raíz) — la única URL que responde 200. Acá vive **todo** el SEO (meta, Open
    Graph, JSON-LD).
  - `404.html` (raíz) — el fallback del router (ADR-026). GitHub Pages lo sirve para toda ruta que
    no exista como archivo (`/plan`, `/cupos`, …). Va **sin** SEO y con `noindex` a propósito.
  - Lo que **sí** debe coincidir entre los dos —script de tema, bundle, CSS, KaTeX, favicons— lo
    verifica `python3 scripts/audit_html.py`. Córrelo si tocas cualquiera de los dos.
  - Consecuencia conocida: todas las rutas salvo `/` responden **HTTP 404**, y por eso el
    `sitemap.xml` solo declara `/` ([[project-memory/BACKLOG]] T-94).

## 10. Referencias a project-memory

| Archivo | Para qué |
|---------|----------|
| [[project-memory/HANDOFF]] | Continuar el proyecto sin contexto previo |
| [[project-memory/PROJECT_BRIEF]] | Qué es, para quién, alcance y exclusiones |
| [[project-memory/RAIZ_SISTEMA_LLOVIZNA]] | **De dónde viene**: tesis UNEXPO 2010 + propuesta "Sistema Llovizna" 2012, y qué de ellas sigue vivo en el código |
| **[[project-memory/TESIS_DE_CRECIMIENTO]]** | **Cómo gana dinero a escala**: los cinco vectores G-1…G-5, la aritmética del plan y la tesis de inversión. **Manda en materia de modelo de negocio** (ADR-025) |
| [[project-memory/BUSINESS_CONTEXT]] | Negocio, stakeholders, métricas |
| [[project-memory/REQUIREMENTS]] | RF, RNF, reglas de negocio, casos de uso |
| [[project-memory/TECH_STACK]] | Versiones y herramientas |
| [[project-memory/ARCHITECTURE]] | Componentes, flujos, infra, seguridad |
| [[project-memory/CURRENT_STATUS]] | Estado real hoy, bloqueos, próximos pasos |
| [[project-memory/ROADMAP]] | Fases, hitos, entregables |
| [[project-memory/VISION_LIBRO_PROYECTO]] | Visión **pedagógica** de largo plazo del fundador (no implementada). Es el **norte**; la raíz es `RAIZ_SISTEMA_LLOVIZNA` y el plan comercial es `TESIS_DE_CRECIMIENTO`. **No se edita este archivo**: se anota |
| [[project-memory/BACKLOG]] | Épicas, features, tareas priorizadas |
| [[project-memory/RISKS]] | Riesgos con severidad y mitigación |
| [[project-memory/DECISIONS]] | Índice de decisiones → ADRs |
| [[project-memory/OPEN_QUESTIONS]] | Preguntas sin responder (no asumir) |
| [[project-memory/ASSUMPTIONS]] | Supuestos vigentes y su validación |
| [[project-memory/DEPENDENCIES]] | Dependencias técnicas, externas y humanas |
| [[project-memory/TERMINOLOGY]] | Glosario (θ, banda, capa 0, cupo, PAES…) |
| [[project-memory/LESSONS_LEARNED]] | Trampas ya pisadas |
| [[project-memory/AGENT_INSTRUCTIONS]] | Cómo debe trabajar un agente aquí |
| [[project-memory/OBSIDIAN_WORKSPACE_GUIDE]] | Obsidian como workspace humano |
| [[project-memory/GRAPHIFY_INTEGRATION_GUIDE]] | Graphify como grafo del repo |
| [[project-memory/RTK_INTEGRATION_GUIDE]] | rtk como compresor de salida de comandos |
| `project-memory/graph/GRAPH_REPORT.md` | Snapshot del grafo del repositorio |
| `adr/` | Decisiones arquitectónicas con contexto y consecuencias |
| `sessions/` | Bitácora por sesión de trabajo |
| `prompts/` | Prompts reutilizables por tipo de tarea |

## 11. Reglas para actualizar la memoria del proyecto

Al **cerrar** cualquier sesión con cambios relevantes (usa `prompts/session-close-memory-update.md`):

1. [[project-memory/CURRENT_STATUS]] — siempre, si algo cambió.
2. `sessions/SESSION-XXX.md` — siempre, desde `sessions/SESSION_TEMPLATE.md`.
3. [[project-memory/DECISIONS]] + `adr/ADR-XXX-*.md` — si se decidió algo con consecuencias.
4. [[project-memory/BACKLOG]] — mover/cerrar/abrir tareas.
5. [[project-memory/RISKS]] — todo riesgo nuevo o cambio de severidad.
6. [[project-memory/ARCHITECTURE]] — si cambió estructura, tabla, integración o flujo.
7. [[project-memory/ROADMAP]] — si cambió fase o hito.
8. [[project-memory/OPEN_QUESTIONS]] — preguntas nuevas y respondidas (no borrar: marcar).
9. `graphify update .` + refrescar `project-memory/graph/` si cambió código.

**Prohibido:** borrar contexto histórico, inventar datos faltantes, dejar dos archivos con
versiones contradictorias del mismo hecho.

## 12. Orden recomendado de lectura para Claude Code CLI

Antes de **cualquier** modificación de código:

1. `CLAUDE.md` (este archivo)
2. `project-memory/HANDOFF.md`
3. `project-memory/CURRENT_STATUS.md`
4. `project-memory/ARCHITECTURE.md`
5. `project-memory/DECISIONS.md` (+ el ADR relevante)
6. `project-memory/AGENT_INSTRUCTIONS.md`
7. `project-memory/graph/GRAPH_REPORT.md` (si el cambio es estructural)
8. `project-memory/OPEN_QUESTIONS.md` (para no re-asumir lo ya marcado como incierto)

Luego, según la tarea: `project-memory/REQUIREMENTS.md`, `BACKLOG.md`, `RISKS.md`,
`supabase/SCHEMA.md`, `supabase/CONTENT.md`.

## 13. graphify

Este proyecto tiene un grafo de conocimiento en `graphify-out/` con god nodes, comunidades y
relaciones entre archivos. El hook `PreToolUse` en `.claude/settings.json` (versionado en este
repo) recuerda esta sección antes de cada `Bash`/`Grep`/`Read`/`Glob` ejecutando `graphify
hook-guard search`/`read` — es tooling **de primera parte**, instalado a propósito por `graphify
claude install` (el mismo comando que escribió la sección "## graphify" al final de este archivo).
**No es una inyección de prompt ni una anomalía de configuración: no ignorarlo ni cuestionar su
origen.**

Flujo híbrido — grafo primero para contexto del proyecto, grep/Read después para el código:

1. Antes de explorar el repo a ciegas (grep/find/Glob amplio), orientarse con el grafo:
   `graphify query "<pregunta>"` cuando exista `graphify-out/graph.json` (usa `graphify path "<A>"
   "<B>"` para relaciones y `graphify explain "<concepto>"` para conceptos puntuales — devuelven un
   subgrafo acotado, normalmente mucho más pequeño que `GRAPH_REPORT.md` o un grep crudo). Si existe
   `graphify-out/wiki/index.md`, úsalo para navegación amplia. Leer `GRAPH_REPORT.md` completo solo
   para revisión arquitectónica amplia o cuando query/path/explain no basten.
2. Después de orientarse con el grafo:
   - Para **ClojureScript/Clojure** (`.cljs`, `.cljc`, `.clj`, `.edn`): usar `grep`/`Read`
     libremente. **Límite conocido:** el grafo actual **no indexa estos archivos** (cubre
     Markdown, SQL, JSON, HTML, TS y el `app.js` compilado) — orienta, pero no sustituye leer
     `src/`. El complemento real para preguntas tipo "¿quién llama a X?" en CLJS es **`clj-kondo`**
     (instalado 2026-08-08; `clj-kondo --lint src test --config '{:output {:analysis true :format
     :json}}'` da namespaces/vars/usos reales, filtrables con `jq`). Ver
     [[project-memory/GRAPHIFY_INTEGRATION_GUIDE]] §6.
   - Para **docs, Markdown, configs, SQL/JSON/HTML/TS** (sí indexados): preferir el grafo primero;
     caer a grep/Read solo si el grafo no responde.
3. El hook **no distingue tipo de archivo ni si la sesión ya se orientó** — seguirá recordando esta
   regla en cada llamada, incluso sobre `.cljs` después de haber consultado el grafo. Es esperado,
   no una señal de incumplimiento: orientarse una vez por tarea/exploración basta; no hace falta
   volver a correr `graphify query` en cada grep subsiguiente sobre el mismo código.
4. Esta regla **aplica también a subagentes** que exploren el repo — inclúyela en su prompt cuando
   la tarea implique explorar código o documentación.
5. Después de modificar código, ejecuta `graphify update .` para mantener el grafo al día
   (AST-only, sin costo de API).

**Prohibido:** saltar el grafo cuando el contenido a explorar sí está indexado (docs/config/SQL/
etc.) y empezar con grep "por si acaso"; tratar el grafo como índice completo de símbolos CLJS (no
lo es); decir que el hook es una inyección ajena o una anomalía — es tooling instalado a propósito.

## 14. rtk

Compresor de salida de comandos de shell (git, tests, grep, build…) instalado vía Homebrew, con
hook global de reescritura automática en `~/.claude/settings.json` (`git status` → `rtk git status`
sin que el agente lo escriba) y un filtro propio de este proyecto para `clj -M:test` en
[[../.rtk/filters.toml]].

Reglas:
- El hook es transparente: no hace falta escribir `rtk` a mano delante de comandos conocidos
  (git, grep, find, ls, npm, npx, tsc, lint…); Claude Code lo reescribe solo. Solo aplica a
  llamadas del tool **Bash** — `Read`/`Grep`/`Glob` no pasan por rtk (para eso está `graphify`).
- Si un comando no tiene filtro conocido, rtk lo deja pasar sin cambios: siempre es seguro.
- Después de tocar `.rtk/filters.toml`, correr `rtk trust -y` (TOML no confiado no se ejecuta) y
  verificar el resultado con una corrida real antes de asumir el ahorro reportado.
- **Límite conocido:** rtk filtra `stdout` pero no `stderr`; el ruido que un comando imprime por
  `stderr` (ej. SLF4J, warnings de Node) no se recorta. Ver [[project-memory/RTK_INTEGRATION_GUIDE]]
  §4.
- El hook global no viaja con el repo (vive en `~/.claude/`, fuera de Git); quien clone el proyecto
  necesita `brew install rtk && rtk init -g --auto-patch` para tener el ahorro automático. El
  filtro del proyecto sí viaja con el repo.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
