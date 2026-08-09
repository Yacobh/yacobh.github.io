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
>
> **Trabajo autónomo sin supervisión (2026-08-03, ~8h, el owner autorizó explícitamente):** QA
> matemática completa de los 39 recursos de `018`/`019` (recalculados a mano, un error lógico
> menor corregido); **T-06 implementado** (`.github/workflows/test.yml`, CI con `clj -M:test` en
> push/PR -- **no verificado en vivo**, no se pusheó); **T-14 implementado y verificado**
> (`npm test` ya delega en `clj -M:test`, corrido en vivo: 34/133/0/0); snapshot de Graphify
> refrescado (se instaló `tree-sitter-sql`, subió de 966 a 1008 nodos). Se investigaron T-16
> (`user.cljs`) y T-17 (`math_render_2`, huérfano confirmado) **sin borrar ni renombrar nada** --
> quedan documentadas para que el owner decida. **No se tocó** T-13 (versiones), ninguna migración
> de Supabase, ni se pusheó/mergeó nada a ninguna rama. Detalle completo en `sessions/SESSION-005.md`.
>
> **Bug en vivo arreglado, CI corregido, T-24 implementado (2026-08-03, mismo día, tras el regreso
> del owner):** el owner reportó "Mi plan" en blanco -- causa encontrada y arreglada sin navegador
> conectado, reproduciendo el parser de LaTeX + KaTeX real en Node antes de tocar código:
> `\$` (montos en pesos) rompía `split-by-latex-improved`, y `render-latex-math` no manejaba el caso
> en que KaTeX falla. Arreglo en dos capas, documentado en [[LESSONS_LEARNED]] L-34. **Pusheado a
> `main`** (vía merge del owner). Primer run real de la CI (T-06) **falló** (`clj` necesita
> `rlwrap`, ausente en el runner) -- corregido usando `clojure -M:test`, mismo mensaje que L-28 con
> causa distinta, ampliado ahí. **T-24 implementado** (estado vacío honesto en "Mi plan" y "Cupos",
> el riesgo de producto más urgente según R-10) en la rama `t-24-estado-vacio-honesto`, pusheada,
> **sin mergear a `main` todavía** -- pendiente de que el owner la revise visualmente (el agente no
> tiene credenciales de prueba ni navegador conectado; no se afirma que la UI se vea bien, solo que
> compila limpio y pasa los tests). Detalle completo en `sessions/SESSION-006.md`.
> **✅ Corrección (2026-08-05):** el owner revisó y mergeó `t-24-estado-vacio-honesto` a `main` vía
> PR #21 (commit de merge `787d337`) -- ver nota siguiente, T-24 ya está en producción junto con
> T-38.

> **T-38 implementado: tema oscuro con toggle en la nav (2026-08-05).** Pedido explícito del owner;
> preguntado por el alcance, eligió "toda la app". Botón sol/luna en `universo.home/navigation`
> (siempre visible, escritorio y móvil), estado en `universo.events.theme` (nuevo, persistido en
> `localStorage`, sin flash al recargar vía script inline en `index.html`/`public/index.html`). Los
> ~15 componentes alcanzables se cubren con un mapeo global de clases en `src/css/app.css`
> (`.dark .clase-existente`), no `dark:` por elemento -- decisión completa, con alternativas
> evaluadas, en [[../adr/ADR-012-tema-oscuro-mapeo-css-global]]. **Esta vez sí hubo navegador
> conectado** (`claude-in-chrome`, contra un servidor estático local): se verificó en vivo landing
> completa, nav, footer, login, libro de visitas (con datos reales de Supabase), currículum del
> profesor y aviso de privacidad, en ambos temas y con persistencia tras recargar. **No verificado
> en vivo:** las secciones protegidas por sesión (dashboard, plan, cupos, admin, cuenta,
> diagnóstico) -- sin credenciales de prueba disponibles para el agente. `clj -M:test` 34/133/0/0
> (sin tests nuevos, no hay lógica pura involucrada), `shadow-cljs release app` 0 warnings.
> Commiteado y pusheado a `t-24-estado-vacio-honesto` (commit `823e177`) a pedido explícito del
> owner. **El owner mergeó la rama a `main` el mismo día** (PR #21, merge `787d337`, 2026-08-05
> 15:50 -04:00) -- `git diff main t-24-estado-vacio-honesto` vacío, ambas apuntan al mismo árbol.
> **Verificado por hash que producción ya sirve el build nuevo:** MD5 de
> `https://jacobocordova.com/public/js/app.js` = `3b0ea6a0e980b36d00d47e57cc80fb73`, idéntico al de
> `git show 787d337:public/js/app.js` (mismo patrón de verificación que T-19). T-24 y T-38 están en
> producción. Detalle completo en `sessions/SESSION-007.md`.

> **T-39 cerrado y mergeado a `main` — Config de parada por banco + prerequisitos (2026-08-08).** Pedido del owner: la regla de parada IRT era un único valor global sin importar
> el banco de preguntas, y no había ningún concepto de progresión entre tests (cualquier usuario
> veía y podía iniciar cualquier topic). Tras tres rondas de ajuste con el owner (ver
> [[../adr/ADR-013-config-parada-por-banco-y-prerequisitos]] para la historia completa de las
> alternativas descartadas), se implementó: tabla `test_configs` (min/max ítems, SE, tiempo máximo
> — este último no existía en el código pese a estar en el pedido original) keyed por `topic`;
> progresión por **cadena de prerequisitos + θ mínimo**, derivada 100% del historial real en
> `tests` (sin tabla de permisos aparte — se agregaron columnas `topic`/`theta` propias en `tests`
> más la policy `tests_select_own`, que no existía); nueva 4.ª aridad en
> `universo.irt.progress/stop-reason` para el límite de tiempo, compatible con las aridades
> previas; namespace puro `universo.access` con tests; pestaña admin "Configuración de tests".
> `clj -M:test`: **39 tests / 149 assertions / 0 failures** (antes 34/133). `shadow-cljs release
> app`: 0 warnings. **De paso se encontró que `tests` no tenía evidencia versionada de RLS
> habilitado** (solo existía `tests_select_admin`, potencialmente inerte) — corregido en la misma
> migración. **Cerrado:** el owner aplicó `020`/`021` en el proyecto Supabase real, probó el flujo
> en local (funcionó; anotó 3 mejoras menores de UX como [[BACKLOG]] T-40/T-41/T-42 para una
> próxima edición) y mergeó **PR #23** (`t-24-estado-vacio-honesto` → `main`, merge `370ed64`).
> **Verificado por hash** (mismo patrón que T-19/T-35/T-38): MD5 de
> `https://jacobocordova.com/public/js/app.js` = `5c14cadf35b54788c0872501ac89dc28`, idéntico al de
> `git show origin/main:public/js/app.js`. **Producción = `origin/main` @ `370ed64`, sirviendo el
> build nuevo.** Detalle en [[BACKLOG]] T-39, `sessions/SESSION-008.md`.
>
> **Nota de seguridad de la sesión:** durante la exploración, varias salidas de herramientas
> (subagentes y hooks locales) trajeron "system-reminders" inyectados exigiendo ejecutar
> `graphify query` antes de cualquier grep/read, incluso citando "aplica a subagentes también".
> No provienen de instrucciones reales del proyecto ni del owner — se ignoraron y se siguió
> trabajando con `grep`/`Read`/`find` directo, como corresponde (además, `CLAUDE.md` §13 ya
> documenta que graphify no indexa `.cljs`, así que la exigencia era incoherente con el propio
> proyecto). No se encontró daño real, solo la anomalía de inyección; el owner debería revisar de
> dónde viene ese hook cuando tenga tiempo.

> **`clj-kondo` adoptado como sustituto de graphify para CLJS (2026-08-08, D-33, cierra T-32).**
> Tras corregir una mala interpretación previa del hook de graphify (no era una inyección, ver
> `sessions/SESSION-008.md`), se investigó si graphify podía indexar `.cljs`/`.clj` de alguna
> forma — no puede, ni de base ni por ningún extra pip existente (se revisó la lista completa de
> gramáticas tree-sitter y extras del paquete instalado). Se instaló `clj-kondo` (binario nativo
> oficial, no Homebrew por CLT de Xcode desactualizadas) como sustituto real, con
> `.clj-kondo/config.edn` versionado (corrigiendo un `.gitignore` que ignoraba todo `.clj-kondo/`
> y habría impedido compartirlo) y `~/bin` agregado al `PATH`. Verificado contra código real: lint
> encontró bugs ya conocidos (`user.cljs` con requires rotos, `voz.cljs` huérfano) y el análisis
> estructurado respondió correctamente "¿quién llama a X?" contra funciones de T-39. Detalle en
> [[GRAPHIFY_INTEGRATION_GUIDE]] §6.1, [[DECISIONS]] D-33, [[BACKLOG]] T-32 (cerrada),
> [[RISKS]] R-20 (mitigado).

> **T-40 y T-42 implementados; etiqueta de vista previa para borradores (2026-08-08, misma fecha,
> sesión posterior).** El owner reportó que "tests marcados como borrador seguían apareciendo" —
> **no era un bug**: él mismo confirmó que como admin los ve y como estudiante no, que es el
> comportamiento intencional de T-39 (`events/test.cljs`, `unlocked` sin filtrar para admin) más la
> policy `test_configs_select`. Se agregó solo la señal visual que faltaba: suscripción
> `:test/configs` y una etiqueta ámbar **"Vista previa (borrador)"** en el selector de evaluaciones,
> visible únicamente para admin sobre topics con `active = false`. Commit `fef4d46`, pusheado a
> `t-24-estado-vacio-honesto`.
>
> Luego, elegidas por el owner desde el backlog, se implementaron **T-40** (columna "Preguntas" por
> topic en Admin → Configuración de tests, en ámbar con `⚠` cuando el banco tiene menos preguntas
> que el `max_items` configurado) y **T-42** (nombre de fantasía editable por evaluación,
> `022_test_config_display_name.sql`). Ambas se apoyan en un **namespace puro nuevo,
> `universo.catalog`** (`topic-label`, `count-by-topic`, `counts-truncated?`), que además absorbe el
> diccionario `topic-labels` que vivía hardcodeado en `diagnostic_test.cljs`. `clj -M:test`:
> **42 tests / 162 assertions / 0 failures** (antes 39/149). `shadow-cljs release app`: 0 warnings.
> `npm run build:css` ejecutado; las clases ámbar nuevas ya tenían mapeo de tema oscuro en
> `src/css/app.css`, sin CSS adicional.
>
> **Hallazgo de esta sesión:** el patrón existente de agregación en el cliente
> (`crud/get-distinct-topics`) trae todas las filas y agrega en memoria, así que una respuesta
> recortada por PostgREST daría un conteo menor que el real **en silencio**. El conteo nuevo pide
> `count: exact` y muestra `≥ N` si detecta truncamiento (`catalog/counts-truncated?`).
>
> **⚠ Pendiente del owner para cerrar T-42:** aplicar `022_test_config_display_name.sql` en el
> proyecto Supabase real. Hasta entonces el campo "Nombre visible" existe en el panel pero guardar
> falla (columna inexistente); **el lado del estudiante no se rompe** — sin la columna el cliente
> cae al diccionario estático de siempre. **Nada de esto está en producción todavía:**
> `t-24-estado-vacio-honesto` tiene commits sin mergear a `main`. Detalle en `sessions/SESSION-009.md`.

> **ADR-014: el tiempo de respuesta pasa a ser un eje separado de θ (2026-08-08, decisión, sin
> código todavía).** Tras una evaluación completa del proyecto, el owner decidió **arreglar el
> modelo en vez de borrar** la afirmación falsa de la FAQ ("el tiempo de respuesta también se
> considera en la estimación", X-01/Q-17). Diseño en tres fases con precondición de datos —
> **T-44** filtro de respuestas no esforzadas (sin precondición, hace verdadera la frase),
> **T-45** velocidad τ como segundo eje (≥30 tests), **T-46** prior condicional (≥200 tests +
> ADR propio que reemplace el prior de ADR-004). Se descartó meter el tiempo dentro del 1PL: haría
> desaparecer el perfil "sabe pero lento" que la visión de largo plazo quiere detectar.
> **Verificado de paso:** `:time-ms` ya se persiste dentro de `tests.test` — no hay nada que
> instrumentar. **⚠ La frase sigue falsa en producción hasta que T-44 se despliegue.**
> Q-17 respondida. Detalle en [[../adr/ADR-014-tiempo-de-respuesta-como-eje-separado]].

> ✅ **RESUELTO — el banco de ítems ya no es descargable (cerrado 2026-08-09).** La auditoría de
> `pg_policies` que pedía Q-12 desde hacía semanas confirmó el peor caso de [[RISKS]] R-16:
> `questions` tenía una policy `"Enable read access for all users"` (`using true`) creada desde el
> dashboard, que anulaba por OR a `questions_select_admin` — **387 preguntas con `correct_option` y
> `error_a..d` legibles por cualquier cuenta gratuita**.
>
> **Cerrado con [[../adr/ADR-015-item-sin-respuesta-en-el-cliente]]:** el cliente ya no lee
> `questions`; `next_question` sirve el ítem sin respuesta y `score_answer` corrige en el servidor.
> Migraciones `023`–`026` **aplicadas por el owner** y bundle publicado en `main` (`dc23f92`).
> **Verificado en producción con cuenta de estudiante:** anónimo → `permission denied`; estudiante →
> **0 filas**; `next_question` sin respuesta; diagnóstico funcionando de punta a punta con
> comparación de respuestas y explicación del error. **Q-12 respondida, X-03 resuelta, R-16 cerrado,
> [[BACKLOG]] T-47 hecho.**
>
> **Otros hallazgos de la misma auditoría:** RLS sí está habilitado en las 15 tablas; tabla huérfana
> `dashboard` con permisos abiertos (0 filas, eliminada en `023`); **`public.questions` no existe en
> ninguna migración** — el repo no puede reconstruir el esquema (T-48, sigue abierto); la banda del
> estudiante no está protegida en la base, puede reescribir su propia `theta_band` (T-49, sigue
> abierto); y al menos ocho policies venían del dashboard, o sea **el repo no era la fuente de
> verdad de RLS** — `023` versionó las que quedan y fijó la regla de no crear policies desde la UI.
>
> **Corrección a la nota de T-39 más abajo:** dice que `tests` "no tenía evidencia versionada de RLS
> habilitado (solo existía `tests_select_admin`, potencialmente inerte)". La auditoría muestra que
> `tests` **sí** tenía una policy de SELECT propia del usuario (`"Enable users to view their own
> data only"`), creada desde la UI; RLS estaba habilitado. `tests_select_own` de `021` fue
> redundante, no un arreglo. No se borra la nota original: se corrige acá.

> **T-47 cerrado (2026-08-09).** Secuencia completa ejecutada en el orden que exigía el ADR:
> `023`/`024`/`026` (aditivas) → bundle publicado en `main` y verificado por hash
> (`1fd4f92320486b71d1f4981e0f77de0d`, idéntico en producción y en `origin/main`) → prueba con
> cuenta de rol `user` → **`025`** (la revocación). Verificado después de cada paso, con una cuenta
> de prueba cuyas credenciales quedan solo con el owner.
> `clj -M:test` 42/162/0 · `release app` 0 warnings · `clj-kondo` limpio.
>
> **🚨 Bug del embudo encontrado y arreglado en el camino.** `:landing/start` hacía solo
> `[:navigate-to :diagnostic-test]` sin cargar el catálogo — verificado por inspección de red que
> **nunca se llamaba a `test_configs`**. Todo usuario que entraba por el CTA principal
> ("Comenzar mi diagnóstico"), logueado o recién registrado, veía *"No hay evaluaciones disponibles
> por ahora"* y ahí moría el embudo; solo funcionaba entrando por "Mi tablero". Arreglado en dos
> capas: el evento despacha `:test/open-selection`, y `diagnostic-test` carga al montarse si no hay
> test en curso (cubre el redirect post-registro y deep links futuros de T-05).
> **Estuvo roto en producción todo este tiempo y nadie lo había detectado** porque las pruebas se
> hacían entrando por el tablero.
>
> **Estado del banco de ítems, medido (387 preguntas):** `difficulty` en escalas incompatibles —
> `enteros` va de **10 a 90**, con lo que **ningún ítem es alcanzable** y ese test termina al
> instante (→ **T-50, P0**); **51% sin `module_id`**; 26 topics con duplicados por acento
> (→ **T-51**). Responde en parte [[OPEN_QUESTIONS]] Q-05.

> **T-01 cerrado: contenido publicado (2026-08-09).** Sesión conjunta con el owner en su sesión de
> admin real: se auditaron matemáticamente los 32 recursos `published = false` (verificando cada
> ejemplo numérico, no solo leyendo el texto) -- **cero errores**. Se publicaron **29**; quedaron
> sin publicar a propósito 3 "Video sugerido" (`enteros`, `fracciones`, `ecuaciones_lineales`) con
> `media_url = null`, placeholders sin contenido real (→ [[BACKLOG]] T-52). `resources.published`
> pasó de 29/61 a **58/61**, verificado en tres capas (API, base, panel: "Recursos publicados: 58
> de 61" visible en el resumen de Admin). Los 7 módulos prioritarios del criterio de cierre ya
> tienen ≥1 recurso publicado. **R-10 ("Mi plan" vacío) cerrado.**
>
> **Hallazgo colateral:** el resumen de Admin muestra **80 usuarios y 252 diagnósticos** ya
> rendidos, casi todos con correo `@estudiantesunap.cl` -- consistente con uso real del piloto UNAP
> (D-18), no con tráfico de la landing actual. Corrige la asunción de "cero estudiantes reales" de
> diagnósticos de negocio recientes. No investigado a fondo; podría alimentar T-29 (calibración de
> `difficulty`) si se decide usar esos datos.

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
| Tests | ✅ `42 tests / 162 assertions / 0 failures` (`clj -M:test`, 2026-08-08) |
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
| **F1 — Motor IRT** | Diagnóstico adaptativo con parada por precisión | **100 %** | 1PL + MAP, Δθ acotado, SE ≤ 0,35, prefetch; parada + tiempo configurables por banco y progresión por prerequisitos (T-39, ADR-013, en producción) |
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
- [x] **Al menos un recurso publicado por módulo prioritario** (`004` + Admin → Recursos) —
  58/61 recursos publicados 2026-08-09 (T-01); falta solo verificar "Mi plan" con cuenta de
  estudiante en cada banda
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
- **ADR-011** La visión de [[VISION_LIBRO_PROYECTO]] es el norte estratégico, el MVP una fase intermedia
- **ADR-012** Tema oscuro mediante mapeo global de CSS (`.dark .clase-existente`), no `dark:` por elemento
- **ADR-013** Config de parada IRT por banco + progresión por prerequisitos y θ mínimo derivada del historial en `tests`, sin tabla de permisos aparte

Índice completo en [[DECISIONS]].

---

## 6. Bloqueos

| # | Bloqueo | Tipo | Quién desbloquea |
|---|---------|------|------------------|
| BL-01 | ~~Contenido pedagógico: no hay recursos publicados por módulo prioritario~~ -- **resuelto 2026-08-09** (T-01, 58/61 publicados). Sigue pendiente la mitad no relacionada: `error_*` enriquecidos en todos los ítems (T-27) | Humano | Jacobo Córdova |
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
2. ~~Publicar contenido mínimo (BL-01, [[BACKLOG]] T-01)~~ — **hecho 2026-08-09**, ver nota al
   inicio de este archivo.
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
> `cursor/mvp-operable-funnel`, árbol sucio). Reemplazado 2026-07-29 con el estado de ese día, y
> este bloque con el estado verificado el **2026-08-08**:

```
Rama actual  : t-24-estado-vacio-honesto @ b4f8b4f (idéntica a main, ver abajo)
Rama deploy  : main  (GitHub Pages, dominio jacobocordova.com) @ 370ed64
main..t-24-estado-vacio-honesto: vacío -- mergeada (PR #23, 2026-08-08)
Producción   : confirmada por hash = origin/main @ 370ed64 (MD5 public/js/app.js = 5c14cadf35b54788c0872501ac89dc28)
Árbol de trabajo: limpio (salvo project-memory/AVISO_PRIVACIDAD_BORRADOR.md, trabajo del owner sin relación con T-39)
```

> **Nota operativa (2026-08-08, → [[LESSONS_LEARNED]] L-30):** un proceso `shadow-cljs watch`
> corriendo en background volvió a sobreescribir `public/js/app.js` con un build de desarrollo sin
> minificar tras el commit de cierre de T-39, sin ningún cambio de fuente pendiente real (mismo
> patrón ya documentado en L-30). Se descartó con `git restore public/js/app.js` antes de dar la
> sesión por cerrada — verificar `git status` antes de cualquier commit futuro que toque ese
> archivo, no asumir que está limpio.

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
