# CURRENT_STATUS

**Fecha de corte: 2026-07-26** · Commit `48bf525` · Rama `cursor/mvp-operable-funnel`

> ⚠️ **Nota 2026-07-29:** el cuerpo de este archivo (secciones 1–9) sigue describiendo el corte del
> 26-07. Desde entonces se mergeó a `main` (commit `4998785`, PR #15 "Configuracion") el trabajo de
> UNAP/privacidad/pricing y la sección "Configuración de cuenta" (nombre, teléfono, solicitud de
> eliminación — migraciones `009`/`010`), y hoy se hizo una pasada de pulido visual (ver abajo). No
> se reescribió todo el archivo para no inventar certeza sobre partes no re-verificadas en esta
> sesión (contenido pedagógico, email de cohorte, cupos reales) — verificar esos puntos antes de
> asumirlos vigentes.
>
> **Pulido visual y fluidez (2026-07-29, rama `main`, commit base `4998785`):** nuevo kit de UI
> compartido `universo.components.ui` + `universo.events.ui` (spinner unificado con `role="status"`,
> diálogo de confirmación global que reemplaza los 10 `js/confirm()` nativos del panel admin y de
> Configuración de cuenta); color de marca unificado a indigo (antes mezclaba blue/indigo en
> login, cuenta, guestbook y el diagnóstico); overlay real (backdrop) para el modal de feedback del
> diagnóstico, que antes se renderizaba sin fondo; estados de carga agregados donde faltaban
> (`cuenta.cljs`, `plan.cljs`, `slots.cljs`); guestbook distingue error de fetch vs. lista vacía;
> accesibilidad puntual (`role="alert"` en banners de login, label del textarea de contacto, focus
> rings en preguntas del admin); código muerto eliminado (`math_render.cljs` parser duplicado,
> tres borradores de `clojure-watermark` en `resume.cljs`). `clj -M:test` sigue en
> **34 tests / 129 assertions / 0 failures**. Ver [[DECISIONS]] D-24/D-25.
>
> **Rama `visual-fixes` (2026-07-29):** un commit (`520ff79` "minor fixes") sobre `4998785`, árbol
> limpio, `git log main..visual-fixes` = solo ese commit. La preocupación de BL-04/T-08 sobre
> `public/js/app.js` sin commitear **ya no aplica tal como está descrita**: hoy no hay cambios sin
> commitear en ninguna rama activa (verificar igual antes de publicar, T-08 sigue abierta como
> checklist de recompilación de rutina).
>
> **T-03 revisada e implementada (2026-07-29):** se leyó `001_mvp_schema.sql` completo para
> responder Q-04. **Confirmado: `class_slots.capacity` no se controlaba en la base de datos** — el
> único trigger sobre `enrollments` (`enrollments_confirm_threshold`, `AFTER INSERT/UPDATE OF
> status`) confirma el cupo al llegar a `min_enrollments` pero corre después del insert y no
> rechaza nada; la policy `enrollments_insert_own` solo exige `user_id = auth.uid()`; el único
> límite era de UI (`components/slots.cljs` ocultaba el botón sin respaldo en datos). Se agregó:
> - `supabase/migrations/011_enrollments_capacity_check.sql` — trigger `BEFORE INSERT OR UPDATE OF
>   status` que rechaza con `raise exception 'Cupo lleno'` si el cupo ya alcanzó `capacity`.
> - `universo.slots.logic/capacity-reached?` — espejo puro, con test.
> - `components/slots.cljs` refactorizado para usar la función pura en vez de calcular `full?`
>   inline.
> - `clj -M:test`: **34 tests / 133 assertions / 0 failures** (antes 129).
>
> **Cerrado (2026-07-29):** commit `0fd5f79` pusheado a `origin/visual-fixes`, y el owner confirma
> haber aplicado `011_enrollments_capacity_check.sql` en el proyecto Supabase real. [[BACKLOG]] T-03
> pasa a `hecho`. El agente no verificó en vivo la inscripción N+1 (sin acceso al proyecto real) —
> el cierre se basa en el reporte del owner. Detalle en [[OPEN_QUESTIONS]] Q-04 (respondida).
>
> **T-19 cerrada (2026-07-29):** `git log main..cursor/mvp-operable-funnel` vacío — esa rama quedó
> completamente mergeada a `main` (PR #14/#15). Verificado además por hash:
> `https://jacobocordova.com/public/js/app.js` (el `index.html` real referencia `./public/js/app.js`)
> tiene MD5 `da3cd5e1de8717d10bbc9bf602baf1c1`, idéntico byte a byte a
> `git show origin/main:public/js/app.js`. **Producción = `origin/main` @ `4998785`, sin desfase.**
> Q-13 queda respondida.
>
> **T-35 cerrada (2026-07-29):** `visual-fixes` mergeada a `main` (fast-forward `4998785` → `db724f3`)
> y pusheada a `origin/main`. `clj -M:test` verde antes del push. `main` y `visual-fixes` apuntan al
> mismo commit. **Al momento del push, GitHub Pages/CDN todavía servía el hash anterior**
> (`da3cd5e1...`) — esperable, la propagación toma unos minutos (`cache-control: max-age=600` en el
> `index.html`); re-verificar por hash antes de dar por sentado que el sitio ya sirve el build nuevo.
>
> **Hallazgo operativo (→ [[LESSONS_LEARNED]] L-30):** hay procesos `shadow-cljs watch app` y
> `tailwindcss --watch` corriendo en background en la máquina de desarrollo que, al detectar que
> `git checkout`/`merge` cambia archivos `.cljs`/CSS fuente, recompilan automáticamente un **build
> de desarrollo sin minificar** (~8,5 MB) y sobreescriben `public/js/app.js`/`app.css` en el árbol
> de trabajo — sin que haya ningún cambio de fuente real pendiente. Pasó dos veces durante el merge
> de T-35 y se corrigió con `git restore public/css/app.css public/js/app.js` antes de cada commit.
> Verificar `git status` **inmediatamente antes** de cualquier commit que toque esos dos archivos,
> no solo al principio de la tarea.
>
> **T-25 y T-36 implementadas (2026-07-30):** tras una ronda de decisiones de negocio con el owner
> (precio, capacidad de cupos, Jitsi, WhatsApp, cancelación manual — ver D-26 a D-31, ADR-011), se
> implementó código para T-25 (`012_slot_cancellation_notification.sql`, trigger que avisa a los
> inscritos cuando el admin cancela un cupo) y T-36 (`013_profile_contact_preference.sql` +
> selector en "Configuración de cuenta" + visibilidad en el roster del admin con enlace `wa.me`).
> `clj -M:test` en verde (34/133), build de release recompilado. **2026-07-30 (más tarde):** el
> owner confirmó haber aplicado `012` y `013` en el proyecto Supabase real; se pusheó a `main`.
> No se probó en navegador contra datos reales (no verificado en vivo por el agente).
>
> **Incidente resuelto: `visitor` no recibía filas desde 2026-07-19 (2026-07-30).** Diagnosticado en
> conjunto con el owner (ver [[LESSONS_LEARNED]] L-31 para el detalle técnico completo): `visitor`
> tiene policy `INSERT` pero ninguna `SELECT`, y `visitor_tracker.cljs` pedía de vuelta la fila
> insertada (`returning? true` default) — bajo RLS eso revierte **todo el insert**, no solo el
> retorno. Se descartó abrir una policy SELECT (expondría IP/ciudad/país de todos los visitantes) y
> en su lugar se agregó `014_visitor_track_rpc.sql` (función `security definer` que inserta y
> devuelve solo el `id`, necesario como FK real en `guestbook.visitor_id`). De paso se corrigió un
> bug en `visitor-saved?` que hacía que el tracker se disparara en cada carga de página en vez de
> una vez por visitante. **Cerrado:** el owner aplicó `014` en el proyecto real y confirmó que
> `visitor` vuelve a recibir filas.
>
> **Flujo de comentarios mejorado (2026-07-31):** pedido explícito del owner tras el fix de
> `visitor` ("se ve poco profesional"). Cambios: (1) `015_visitor_select_admin.sql` — el panel de
> moderación del guestbook (`admin.cljs`, `guestbook-panel`) ahora muestra país/ciudad/idioma/
> timezone de cada visitante (join cliente `guestbook.id_visitor → visitor.id`, mismo patrón que
> `fetch-slot-roster`); (2) `guestbook.cljs` rediseñado — layout de dos columnas (formulario +
> lista) en vez de una sola columna centrada, tarjetas con avatar-inicial, copy de aseguramiento
> ("Revisamos cada mensaje a mano antes de publicarlo"); (3) el correo pasa a ser **obligatorio**
> si no hay sesión (antes opcional), y si hay sesión se autocompleta y bloquea con el correo de la
> cuenta; (4) footer (`home.cljs`) cambia de gris a gradiente indigo oscuro (D-24) y reparte mejor
> el ancho (`Academia Integral` ahora ocupa 2/4 columnas, antes 1/3, porque su párrafo lo necesita).
> Verificado en navegador (dev server + Chrome): footer, formulario y validación (nombre/correo/
> mensaje requeridos) se ven y funcionan bien en desktop; el panel admin **no** se probó en vivo
> (requiere login real, sin credenciales en esta sesión). `clj -M:test` 34/133, `shadow-cljs release
> app` en 0 warnings, build recompilado. Dos bugs de sintaxis de ClojureScript encontrados y
> corregidos en el camino — ver [[LESSONS_LEARNED]] L-32 (orden de definición) y L-33 (`/` en
> sintaxis abreviada de clases). **Cerrado:** el owner aplicó `015`.
>
> **Bug relacionado encontrado y corregido (2026-07-31):** al probar el formulario de contacto del
> footer, el owner reportó el mismo error de RLS que `visitor` (L-31), pero en `contacto` —
> `events/contacto.cljs` llamaba a `insert-data-table!` sin `{:returning? false}`. Corregido con el
> mismo fix mínimo que ya usa `guestbook` (no necesitaba RPC: nada lee el id generado). Auditados
> todos los demás llamadores de `insert-data-table!`: `guestbook`, `notifications` y `tests` ya
> estaban bien: el único otro caso roto es código muerto sin ruta (`supabase_test.cljs`, T-23), sin
> impacto. Ver [[LESSONS_LEARNED]] L-31 (actualizada).
> **Ambos hallazgos resueltos (2026-07-31):** el owner pidió cerrar los dos. (1) `extra` deja de
> guardar el app-db completo — `events/contacto.cljs` arma un contexto curado (sección visitada, si
> hay sesión y con qué correo), y se agrega `contacto.id_visitor` para sumar también el contexto de
> `visitor` (país/ciudad/idioma/timezone), igual que ya se hace en `guestbook`. (2) Nueva pestaña
> **Contacto** en el panel de admin (`components/admin.cljs`, `contacto-panel`, solo lectura) +
> policy `contacto_select_admin` (`016_contacto_admin.sql`) — antes nadie podía leer esa tabla.
> `fetch-admin-guestbook`/`fetch-admin-contacto` comparten ahora `db/crud.attach-visitor-context` en
> vez de duplicar el join cliente-servidor. `clj -M:test` 34/133, `shadow-cljs release app` en
> 0 warnings. **No verificado en vivo** (requiere login de admin real, sin credenciales en esta
> sesión) — solo revisión de código + compilación limpia. **Pendiente:** aplicar `016` en el
> proyecto Supabase real.
>
> **Contenido Baldor como índice, no transcripción (2026-08-02):** el owner subió los PDF de
> Aritmética y Álgebra de Baldor al scratchpad (uso personal, no versionados en el repo — el libro
> sigue con derechos de autor vigentes). Se generaron `018_baldor_resources.sql` (20 recursos,
> track `aritmetica`) y `019_baldor_algebra_resources.sql` (19 recursos, track `algebra` + cierre
> del hueco de enteros con signo dejado por `018`) — 39 recursos redactados desde cero, usando la
> numeración de Baldor solo como referencia bibliográfica en el título. Cubre 11 de los 18 módulos
> (`aritmetica` + `algebra`); los 7 de `geometria` siguen sin fuente (no se subió ese volumen).
> Ambas migraciones quedaron con `published = false`. **Aplicadas por el owner el 2026-08-02**
> (confirmado); falta revisar el contenido pedagógico y publicar selectivamente desde
> Admin → Recursos. No mueve el checklist de go-live (§3) hasta que eso ocurra. Detalle en
> [[BACKLOG]] T-01 y `supabase/SCHEMA.md`.
>
> **Auditoría de coherencia de la memoria + revisión de precio (2026-08-02, cierre de sesión):**
> a pedido del owner, se revisó toda `project-memory/` buscando desincronizaciones entre lo
> documentado y (a) el código real, (b) decisiones ya tomadas que no se habían propagado. Se
> corrigieron ~25 archivos: **Google OAuth** descrito como funcional cuando es código muerto sin
> UI (`sign-in-with-google` sin llamador); **UNAP** seguía descrita como iniciativa académica
> activa en varios archivos pese a que D-18 (2026-07-28) ya la había bajado a nota histórica de un
> convenio terminado (owner confirmó que D-18 sigue vigente); la **decisión de precio** (D-19/D-26)
> no se había propagado a `PROJECT_BRIEF`/`BUSINESS_CONTEXT`/`VISION_LIBRO_PROYECTO` (que decía
> explícitamente "no se marca como resuelta" sobre una tensión ya resuelta); conteo de tests
> desactualizado (129 → **133**, verificado en vivo con `clj -M:test`); lista de migraciones
> duplicada y desactualizada en `TECH_STACK`/`HANDOFF` (reemplazada por puntero a
> `supabase/SCHEMA.md`); y los propios conteos de recursos de `018`/`019` que el agente había
> sumado mal (19, no 21; 39, no 41; 7 módulos de geometría sin fuente, no 6). Además, el owner
> revisó el precio de D-26 ($6.000 CLP/hora) y lo subió a **$10.000 CLP/hora** (D-32, 2026-08-02):
> el número anterior se había anclado contra el piso de clases 1:1 en vez del comparable correcto
> (preuniversitario grupal). **P-11** (¿abrir épica de negocio para roadmapear la visión de largo
> plazo?) se presentó al owner, que decidió dejarla pendiente por ahora. Detalle completo en
> `sessions/SESSION-004.md`.

> Este archivo es el "dónde estamos" canónico. **Se actualiza en toda sesión con cambios.**
> Si contradice a cualquier otro documento, este gana para "estado"; [[ARCHITECTURE]] gana para
> "cómo está construido".

---

## 1. Estado general

**Fase: MVP operable, en cierre de go-live.**

El funnel completo funciona de punta a punta: un estudiante puede registrarse, hacer el
diagnóstico adaptativo, obtener su perfil (θ, banda, déficits, misconceptions), ver su plan e
inscribirse en un cupo de su banda, con confirmación automática del grupo y notificación in-app.
El panel de administración permite operar todo el ciclo (preguntas, recursos, cupos, roles,
moderación).

Lo que falta para declarar go-live no es código: es **contenido** (recursos publicados por módulo)
y **verificación de operación** (envío de email en el proyecto Supabase real).

| Dimensión | Estado |
|-----------|--------|
| Funcionalidad del funnel | ✅ operativa |
| Panel admin | ✅ operativo |
| Tests | ✅ `34 tests / 129 assertions / 0 failures` (`clj -M:test`) |
| Contenido pedagógico | 🟡 módulos y blurbs sembrados; faltan recursos publicados |
| Email de cohorte | ⚠️ código y migración listos; despliegue/secret no verificados |
| Documentación / memoria | ✅ PMF adoptado hoy (2026-07-26) |
| CI / staging / monitoreo | ⛔ inexistentes |
| Estado del árbol de trabajo | ⚠️ sucio: `public/js/app.js` modificado sin commit |

---

## 2. Avance por fase

| Fase | Objetivo | Avance | Notas |
|------|----------|--------|-------|
| **F0 — Base técnica** | SPA + Supabase + auth + RLS | **100 %** | `admin_rls.sql`, sesión rehidratada, rutas protegidas |
| **F1 — Motor IRT** | Diagnóstico adaptativo con parada por precisión | **100 %** | 1PL + MAP, Δθ acotado, SE ≤ 0,35, prefetch |
| **F2 — Perfil y plan** | θ → banda → déficits → plan en 2 capas | **95 %** | Falta contenido publicado (capa 1) |
| **F3 — Cohortes** | Cupos por banda, inscripción, confirmación | **95 %** | Falta verificar control de `capacity` (Q-04) |
| **F4 — Admin** | Operar contenido, cupos, usuarios, moderación | **100 %** | Editor de preguntas restaurado en `48bf525` |
| **F5 — Email de cohorte** | Aviso por correo al confirmar grupo | **60 %** | `005` + Edge Function escritos; despliegue no verificado |
| **F6 — Captación** | Landing + SEO | **90 %** | Landing rehecha (`38fbb96`), JSON-LD acotado (`b6ae903`); sin analytics |
| **F7 — Memoria del proyecto** | PMF operativo | **100 %** | Este framework, 2026-07-26 |
| **F8 — Endurecimiento** | CI, staging, backups, monitoreo | **5 %** | Solo tests manuales |

---

## 3. Checklist de go-live

Del `PROJECT_SUMMARY.md` histórico, verificado y actualizado:

- [x] Migraciones MVP aplicadas en Supabase (`admin_rls`, `001`–`004`)
- [x] Seed de módulos Baldor ejecutado (`002`)
- [x] Cuenta admin creada (`profiles.role = 'admin'`)
- [x] 2–3 cupos demo (online + presencial) en bandas distintas (`003`)
- [x] RLS verificado (estudiante solo ve su perfil / sus enrollments)
- [x] `006_admin_role_management.sql` aplicada (gestión de roles desde el panel)
- [x] `007_questions_admin_rls.sql` aplicada (CRUD admin de preguntas)
- [ ] **Al menos un recurso publicado por módulo prioritario** (`004` + Admin → Recursos)
- [ ] **`005_email_outbox.sql` aplicada + Edge Function desplegada con `RESEND_API_KEY`**
- [x] `011_enrollments_capacity_check.sql` aplicada (control de capacidad en inscripciones, T-03) —
  aplicada por el owner el 2026-07-29, sin verificación en vivo por parte del agente
- [x] `012_slot_cancellation_notification.sql` aplicada (aviso al cancelar un cupo, T-25) —
  aplicada por el owner el 2026-07-30, sin verificación en vivo por parte del agente
- [x] `013_profile_contact_preference.sql` aplicada (canal de contacto preferido, T-36) —
  aplicada por el owner el 2026-07-30, sin verificación en vivo por parte del agente
- [ ] Cupos reales (no demo) publicados con fecha, sala de Jitsi y mínimo/capacidad definidos (D-27)
- [ ] Recompilar (`shadow-cljs release app` + `build:css`) y publicar en `main`

> Los ítems `006` y `007` se marcan como aplicados porque el panel depende de ellos y está
> operativo; si un entorno nuevo falla al promover un admin o al editar preguntas, esa es la causa.

---

## 4. Últimos cambios (historia reciente)

| Commit | Qué hizo |
|--------|----------|
| `48bf525` | Restaurar el editor de preguntas en el panel de administración |
| `b6ae903` | Acotar la gratuidad en JSON-LD y sincronizar los datos estructurados |
| `c5ee6bc` | Encolar emails de cupo, enriquecer contenido Baldor y archivar MathAcademy |
| `6cf0dc9` | Filtrar cupos por banda con lógica pura (`slots.logic`) y corregir la lista vacía |
| `38fbb96` | Rehacer la portada para captación y mejorar el panel de administración |
| `b40e741` | Funnel MVP operable: perfil de diagnóstico, plan y cupos híbridos |

Trabajo de esta sesión (**2026-07-26**): adopción de **Project Memory First** — creación de
`project-memory/`, `adr/`, `sessions/`, `prompts/`, reescritura de `CLAUDE.md` y snapshot del grafo
de Graphify. Ver `sessions/SESSION-001.md`.

---

## 5. Últimas decisiones

Registradas hoy de forma retroactiva (las decisiones son previas; su documentación es nueva):

- **ADR-001** ClojureScript + re-frame + shadow-cljs
- **ADR-002** Supabase como único backend; RLS como límite de seguridad
- **ADR-003** GitHub Pages con `public/js/app.js` versionado
- **ADR-004** IRT 1PL + MAP N(0,1) + Δθ ≤ 0,4 + parada por SE ≤ 0,35
- **ADR-005** Banco de ítems (capa 0) en vez de CMS
- **ADR-006** Cohortes por banda de θ con mínimo de inscritos
- **ADR-007** Email por outbox + Edge Function (Resend)
- **ADR-008** Archivar MathAcademy; funnel único en home
- **ADR-009** Lógica de negocio en namespaces puros testeados
- **ADR-010** Adopción de Project Memory First *(decisión de hoy)*

Índice completo en [[DECISIONS]].

---

## 6. Bloqueos

| # | Bloqueo | Tipo | Quién desbloquea |
|---|---------|------|------------------|
| BL-01 | **Contenido pedagógico**: no hay recursos publicados por módulo prioritario ni `error_*` enriquecidos en todos los ítems. Es trabajo humano de autoría, no de código | Humano | Jacobo Córdova |
| BL-02 | **Verificación del envío de email**: requiere acceso al proyecto Supabase (aplicar `005`, `functions deploy`, `secrets set RESEND_API_KEY`) | Acceso/operación | Jacobo Córdova |
| BL-03 | **Cupos reales**: fechas y enlaces de videollamada no están definidos (los datos actuales son demo con `meet.example.com`). Por D-27, los cupos reales son 100% virtuales por ahora (Jitsi/Meet) -- ya no depende de sala física en Iquique ni de UNAP (ver D-18) | Negocio | Jacobo Córdova |
| BL-04 | **Árbol sucio**: `public/js/app.js` tiene 73 inserciones y 24 borrados sin commitear. No se sabe con certeza si corresponde al fuente actual | Técnico | Recompilar y commitear, o descartar |
| BL-05 | **Preguntas abiertas de producto** sin responder (capacidad, repetición de diagnóstico, privacidad) | Decisión | Ver [[OPEN_QUESTIONS]] |

---

## 7. Riesgos activos (top 5)

Detalle y lista completa en [[RISKS]].

| ID | Riesgo | Severidad |
|----|--------|-----------|
| R-01 | Un solo responsable técnico y de contenido (bus factor = 1) | **Alta** |
| R-02 | Se desarrolla contra la base de producción; sin staging | **Alta** |
| R-03 | Sin respaldo propio verificado de la base de datos | **Alta** |
| R-06 | Datos personales de menores sin política de privacidad publicada | **Alta** |
| R-04 | Sin CI: nada impide publicar con tests rojos o sin recompilar | Media-alta |

---

## 8. Próximos pasos inmediatos

En orden de ejecución recomendado:

1. **Resolver el árbol sucio** (BL-04): decidir si `public/js/app.js` se recompila y commitea o se
   descarta. Regla: recompilar desde el fuente actual y commitear, nunca editar el bundle a mano.
2. **Publicar contenido mínimo** (BL-01, [[BACKLOG]] T-01): al menos un recurso publicado por cada
   módulo prioritario de `supabase/CONTENT.md`.
3. **Cerrar el email de cohorte** (BL-02, T-02): aplicar `005`, desplegar la function, setear el
   secret, invocarla una vez y verificar `email_outbox.status = 'sent'`.
4. ~~Verificar el control de capacidad en la inscripción (Q-04, T-03)~~ — **hecho 2026-07-29**, ver
   nota al inicio de este archivo.
5. **Publicar cupos reales** (BL-03, T-04) y retirar/marcar los demo de `003`.
6. **Responder las preguntas abiertas de producto** ([[OPEN_QUESTIONS]] Q-02, Q-07, Q-08).
7. **Endurecimiento mínimo** (T-06, T-07): un workflow de GitHub Actions que corra `clj -M:test`, y
   un respaldo manual documentado de la base.
8. **Mergear `visual-fixes` a `main` y republicar** (T-35, nuevo 2026-07-29): incluye el trabajo de
   este paso 4 (T-03) y una unificación de estilos previa, ninguno de los dos en producción todavía.

> Regla PMF: antes de empezar cualquiera de estos pasos, leer [[AGENT_INSTRUCTIONS]]; al
> terminarlo, actualizar este archivo y crear/actualizar el `sessions/SESSION-XXX.md`.

---

## 9. Estado del repositorio

> ⚠️ El bloque original de esta sección describía el corte del 26-07 (rama
> `cursor/mvp-operable-funnel`, árbol sucio). Reemplazado 2026-07-29 con el estado verificado hoy:

```
Rama actual  : visual-fixes (2 commits sobre main: 520ff79, 0fd5f79)
Rama deploy  : main  (GitHub Pages, dominio jacobocordova.com)
Producción   : confirmada por hash = origin/main @ 4998785 (ver nota T-19 arriba)
Árbol de trabajo: limpio
visual-fixes → main: NO mergeada (T-35)
```

**Tooling del agente (2026-07-27):** `graphify` (ya estaba) y **`rtk`** (nuevo, instalado hoy) como
compresores de contexto; **Obsidian** con vault pre-configurado (`.obsidian/`, gitignorado, no
versionado por diseño). Detalle: [[RTK_INTEGRATION_GUIDE]], [[GRAPHIFY_INTEGRATION_GUIDE]],
[[OBSIDIAN_WORKSPACE_GUIDE]], [[DECISIONS]] D-17.

**Deuda de ramas:** 12 ramas locales y 11 remotas (`01-re-flow`, `Dashboard-pro`, `clean`,
`dashboard`, `dashboard2`, `develop`, `develop-pbx-01`, `explanation`, `guestbook-admin`, `mvp`,
`test-selection`, `unifiying-re-frame`). Ninguna documentada. Ver [[BACKLOG]] T-18.

**Resuelto (2026-07-29):** `cursor/mvp-operable-funnel` **sí** está mergeada a `main` (verificado
por `git log` y por hash contra producción, ver T-19 arriba). La duda vigente ahora es la rama
`visual-fixes`, no esa — ver T-35. Siempre verificar `git log main..HEAD` antes de prometer que algo
está en producción; no asumir que el estado descrito acá sigue vigente sin repetir el check.

---

Relacionado: [[HANDOFF]] · [[BACKLOG]] · [[RISKS]] · [[ROADMAP]] · [[OPEN_QUESTIONS]] ·
`../sessions/SESSION-001.md`
