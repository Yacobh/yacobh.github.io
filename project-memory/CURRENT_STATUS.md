# CURRENT_STATUS

**Fecha de corte: 2026-08-13** · Rama `ui-identidad-y-linea-del-tiempo` sobre `main` @ `988c37e`
*(el cuerpo histórico de este archivo arranca en el corte del 2026-07-26, commit `48bf525`, rama
`cursor/mvp-operable-funnel`; las notas de sesión de más abajo son la capa vigente)*

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

> **Edición rápida de dificultad en el panel admin (2026-08-09, sesión posterior a T-01/T-47).**
> Pedido explícito del owner tras medir en T-50 que `enteros` tiene `difficulty` en escala 10–90
> (ningún ítem alcanzable). El editor completo de preguntas exigía abrir una por una para tocar un
> solo campo; se agregó edición en línea en Admin → Preguntas: la columna `b` de la tabla es un
> input editable, con una barra "Guardar cambios / Descartar" que aparece al haber ediciones
> pendientes (varias filas se pueden editar y guardar juntas). Nuevo `crud/patch-admin-question!`
> actualiza solo `difficulty`, sin reemplazar la fila completa como hace `update-admin-question!`
> (necesario para no vaciar enunciado/opciones en una edición parcial). Clases Tailwind nuevas
> reusan el vocabulario ámbar ya mapeado en `src/css/app.css` (ADR-012); no se agregó CSS nuevo.
> `clj -M:test` 42/162/0, `shadow-cljs release app` 0 warnings, `clj-kondo` sin hallazgos nuevos.
> Rama `t-50-edicion-rapida-dificultad`, pusheada; PR pendiente de que el owner lo abra desde el
> link directo (`gh` no está instalado en esta máquina) y lo mergee.
>
> **T-50 cerrado (2026-08-09, el owner, con la herramienta de arriba).** Con la edición en línea ya
> disponible, el owner recalibró **todos** los topics fuera de rango (no solo `enteros`),
> reorganizando los ítems por dificultad relativa y editando directo en Admin → Preguntas. Probó el
> diagnóstico después: entrega preguntas correctamente, ya no hay topics muertos. **No verificado
> por el agente** (sin credenciales de admin ni acceso al proyecto Supabase real; cierre por reporte
> del owner, mismo patrón que T-03/T-25/T-36). **Esto no es calibración empírica** (T-29, R-17,
> siguen abiertos): son valores reescalados/reordenados a mano para ser alcanzables y consistentes
> entre sí, no estimados con datos de respuesta real. Ver `sessions/SESSION-012.md`,
> [[BACKLOG]] T-50, [[RISKS]] R-17, [[OPEN_QUESTIONS]] Q-05.

> **T-02 cerrado: pipeline de email de cohorte en producción (2026-08-09).** A diferencia de la
> mayoría de los cierres recientes (T-03/T-25/T-36/T-50), **este lo verificó el agente en vivo**,
> no solo el owner: CLI de Supabase instalada (D-34, mismo bloqueo de CLT de Xcode que D-33) y
> vinculada al proyecto real; secrets seteados (`RESEND_API_KEY`, `EMAIL_FROM` en el dominio
> verificado `mail.jacobocordova.com`); función desplegada con `--no-verify-jwt` (la CLI v2.113.0
> eliminó `functions invoke`, se usó `curl` directo al endpoint HTTPS — `supabase/functions/
> README.md` corregido). Dos niveles de prueba real: (1) fila manual en `email_outbox` → `sent` →
> email recibido en bandeja principal; (2) cadena completa con datos reales (cupo desechable,
> `min_enrollments=1`, inscripción real) → `class_slots.confirmed` → `notifications` →
> **dos** filas en `email_outbox` (estudiante + `slot_confirmed_admin` al owner, hallazgo no
> documentado antes) → ambas `sent` → ambos correos recibidos en bandeja principal. Datos de
> prueba borrados después. Cron programado con `pg_cron`/`pg_net` (el dashboard de este proyecto
> no tiene la pestaña Schedules de Edge Functions) — registrado y `active`, sin confirmar todavía
> una ejecución automática (no bloqueante, la función ya se probó manualmente). [[RISKS]] R-12
> mitigado. Ver [[BACKLOG]] T-02, `sessions/SESSION-013.md`.

> **Auditoría de memoria + limpieza técnica menor (2026-08-09, misma fecha, sesión posterior a
> T-02).** El owner pidió una revisión de `project-memory/` en busca de desincronizaciones
> acumuladas por varias sesiones, y aprovechar para limpiar deuda técnica menor.
>
> **Hallazgo urgente resuelto primero:** el árbol de trabajo tenía un cambio sin commitear en
> `project-memory/AVISO_PRIVACIDAD_BORRADOR.md` que revertía el archivo de "PUBLICADO" (estado
> real, el aviso sigue en producción en `universo.components.privacidad` sin cambios) a
> "BORRADOR (no publicado)", con el checklist original respondido de nuevo a mano — parecía
> trabajo del owner sobre una copia vieja del documento, sin darse cuenta de que ya estaba
> resuelto. **Descartado con `git restore`** a pedido explícito del owner tras confirmarlo.
>
> **Limpieza de ramas (T-18, Q-20, R-21 — todas cerradas):** la deuda de ramas había crecido de
> 12 locales/11 remotas (última medición) a **27 locales / 24 remotas**. Se auditó cada una con
> `git rev-list --count main..<rama>`: todas menos dos estaban en 0 commits propios (ya
> mergeadas). Las dos con contenido (`Dashboard-pro`, commit de nov-2025 sobre un fondo visual muy
> anterior al MVP actual; `visual-fixes`, un commit local sin pushear de jul-2026 sobre validación
> del guestbook que quedó superado por la implementación real que sí llegó a producción) se
> revisaron a mano antes de confirmar con el owner que también se podían borrar. **Borradas las 26
> ramas locales y 22 remotas restantes** (`git branch -D` + `git push origin --delete`). Hoy el
> repositorio tiene solo `main` en local y en `origin`.
>
> **Tres inconsistencias técnicas menores resueltas (X-04/X-05/X-06, T-13/T-16 cerradas):**
> - `src/universo/user.cljs` — estaba en `.gitignore` y trackeado a la vez; resultó ser código
>   roto (`go`/`<!`/`get-table` sin ningún `require`), no compilado ni referenciado desde ningún
>   lado. Borrado el archivo, limpiada la entrada de `.gitignore`.
> - `shadow-cljs`: `package.json` decía `^2.19.2`, `deps.edn` ya usaba `3.0.4`. Alineado a
>   `^3.0.4` en `package.json`, `npm install` corrido.
> - KaTeX: CDN en `index.html`/`public/index.html` servía `0.16.9`, npm ya pedía `^0.16.22`.
>   Alineado el CDN a `0.16.22` en ambos archivos.
>
> **Verificado tras los cambios:** `clj -M:test` → 42/162/0/0 (sin cambios respecto al último
> corte). `npx shadow-cljs release app` real (no solo la suite de tests) → build limpio, 223
> archivos/151 compilados/0 warnings — confirma que el bump de versión de shadow-cljs no rompe el
> build de producción. `npm run build:css` → sin cambios en el CSS. El bundle recompilado
> (`public/js/app.js`) cambia por diferencias internas de minificación entre versiones de
> shadow-cljs/Closure Compiler, no por cambios de comportamiento — mismo patrón ya documentado en
> [[LESSONS_LEARNED]] L-30.
>
> Trabajo hecho en la rama `chore-limpieza-tecnica-y-memoria`, **sin mergear a `main` todavía** —
> pendiente de que el owner revise y apruebe (incluye borrado de archivo y recompilación del
> bundle, no es solo texto). `project-memory/RISKS.md` (R-13 refrescado, R-21 cerrado),
> `project-memory/OPEN_QUESTIONS.md` (Q-20 y X-04/X-05/X-06 cerradas) y `project-memory/BACKLOG.md`
> (T-13, T-16, T-18 cerradas) actualizados en la misma sesión.

> **T-53: los "recursos recomendados" no estaban personalizados (2026-08-09, misma fecha, sesión
> posterior).** El owner preguntó por la estrategia de contenido y el rol de la IA en producirlo;
> al auditar cómo se implementan los recursos apareció un defecto de producto: **"Mi plan" mostraba
> la biblioteca completa bajo el título "Recursos recomendados"**. Tres defectos encadenados (el
> efecto recibía `nil` en vez de los módulos; `crud/fetch-resources-for-modules` ignoraba su
> parámetro; y un fallback devolvía todas las filas cuando el filtro quedaba vacío), más una
> carrera entre la carga del perfil y la de recursos que el fallback tapaba.
>
> Arreglado con un namespace puro nuevo (`universo.plan`) que devuelve `:personalized` o
> `:general`, y moviendo el cruce a la suscripción (elimina la carrera). La UI ahora rotula
> distinto el material no personalizado en vez de presentarlo como recomendación — mismo criterio
> de honestidad que T-24. `clj -M:test` **45/178/0** (antes 42/162), `release app` 0 warnings,
> `clj-kondo` limpio. **No verificado en vivo** (sección protegida, sin credenciales de
> estudiante).
>
> **Consecuencia que conviene tener presente:** hasta cerrar **T-51** (51 % de las preguntas sin
> `module_id`), la mayoría de los estudiantes verá la rama `:general`. No es una regresión: es el
> estado real que el fallback ocultaba. **T-51 es ahora el bloqueo real de la capa 1**, por encima
> de producir más contenido. Ver [[BACKLOG]] T-53, `sessions/SESSION-015.md`.
>
> **Cierre de la sesión — ADR-016 y estrategia de contenido (2026-08-09).** Del análisis de
> recursos salió una decisión y tres tareas nuevas:
> - **[[../adr/ADR-016-ia-en-el-pipeline-de-autoria-no-en-runtime]] (D-35):** la IA produce
>   contenido pedagógico **solo en el pipeline de autoría** — migración con `published = false` →
>   auditoría rehaciendo cada cuenta → publicación humana — y **nunca en runtime**, porque ADR-002
>   no deja dónde poner una API key y el costo por estudiante rompe el objetivo de infra ≈ $0.
>   Formaliza lo que ya se había hecho de facto en `018`/`019` + T-01, y de paso resuelve el "sin
>   versionado de contenido" que ADR-005 había aceptado como costo.
> - **T-54** (atar `resources` a misconceptions, no solo a módulos) y **T-55** (capa de práctica
>   reutilizando el banco de ítems, con la restricción dura de ADR-015): ambas **requieren ADR
>   propio** y siguen **sin decidir** — se registran como tareas, no como decisiones.
> - **T-56** (los 7 módulos de `geometria` sin ninguna fuente) y **T-27** actualizada como primer
>   lote bajo ADR-016, priorizable ahora con los 252 diagnósticos reales.
>
> **Orden recomendado:** T-51 antes que cualquier producción de contenido nueva; T-54 mientras el
> modelo siga siendo barato de cambiar (58 recursos). El go-live sigue dependiendo solo de T-04.

> # ⭐ **T-04 CERRADO — cae el último bloqueo de go-live (2026-08-09)**
>
> **El owner creó la sala de Jitsi y publicó el primer cupo real: sábado 2026-08-15, 10:30, con
> enlace verdadero, y borró todos los cupos demo.** Con esto la plataforma queda operativa de punta
> a punta para un estudiante externo: diagnóstico adaptativo → perfil → plan → cupo real →
> confirmación automática por trigger → email verificado.
>
> Ningún bloqueo de F8 (Go-live) queda abierto. Lo que sigue **ya no es construir, es difundir**.
>
> **Matices honestos, para no leer esto con más optimismo del que corresponde:**
> - Se publicó **un** cupo, no uno por banda. Los estudiantes de otras bandas verán el estado vacío
>   de T-24 en "Cupos" — es falta de oferta, no de interés. Tenerlo presente al mirar métricas.
> - Banda, `capacity` y `min_enrollments` del cupo **no verificados por el agente** (sin
>   credenciales). Por D-27 deberían ser 12 y 3; conviene confirmarlo antes de difundir el enlace.
> - **Se activa [[RISKS]] R-11**: con `min_enrollments = 3`, si no llegan 3 inscritos el cupo no se
>   confirma. La cancelación es manual (D-31) y el aviso al inscrito ya existe (T-25).
> - **[[RISKS]] R-19 (estacionalidad) pasa a ser el riesgo dominante.** La PAES se rinde a fin de
>   año: la ventana de captación son las próximas ~12 semanas. No hay una segunda oportunidad este
>   ciclo.
>
> **T-58 arreglado en la misma sesión (bug encontrado mientras se ejecutaba T-04).** Al cambiar de
> pestaña y volver, el panel de admin borraba lo que se estuviera editando. No era una recarga:
> `@supabase/supabase-js` emite `TOKEN_REFRESHED` al recuperar visibilidad la pestaña, `:auth/listen`
> lo trataba como login nuevo, `:auth/session-established` limpiaba `role`/`admin?`, y `admin-panel`
> caía a su rama `(nil? role)` — desmontando el subárbol y con él los `r/atom` de los formularios.
> Arreglado **en el origen** con el predicado puro `session-refresh?` + el handler
> `:auth/session-event`, lo que además desactiva el `:admin/enter` que `:auth/profile-loaded`
> re-disparaba. `clj -M:test` **46/186/0**. **No verificado en vivo** (sin credenciales de admin).
>
> **Conversación de arquitectura de la sesión (sin código, registrada como tickets):** se analizó
> cómo se implementa la retroalimentación del diagnóstico. Dos hallazgos de diseño:
> (a) el **lazo interno** (θ ← respuesta ← selección de ítem) es control retroalimentado real y está
> bien hecho, pero el **lazo externo está abierto**: el sistema mide y prescribe, y nunca vuelve a
> medir si la prescripción sirvió; (b) la **misconception no es una entidad** — es texto libre en
> `questions.error_a..d`, sin identidad, así que no se puede contar, enlazar a recursos ni comparar
> entre diagnósticos. De ahí salieron **T-57** (modelar la misconception como entidad, con modelo
> relacional propuesto y camino de migración; **prerequisito de T-54**) y el detalle de por qué se
> descarta JSONB para eso (la lección de T-51: texto libre sin restricción ya produjo 26 topics
> duplicados por acento). Detalle en `sessions/SESSION-016.md`.

> **T-57 paso 1: catálogo de misconceptions creado (2026-08-10).** Misión encargada por el owner
> antes de irse a trabajar. `supabase/migrations/027_misconceptions.sql` crea la tabla
> `misconceptions` (con `slug` único y check de formato — la lección de T-51 hecha regla, validado
> contra 13 casos) y las cuatro columnas `questions.misconception_a_id`…`_d_id`, nullable. RLS solo
> admin en las cuatro operaciones. **Puramente aditiva**: no mueve datos, no toca `error_a..d`, no
> cambia comportamiento; `null` = "sin catalogar". Sin seed a propósito.
> **⏳ Pendiente: que el owner aplique `027`** (el agente no aplica migraciones, [[../CLAUDE]] §9).
> No se tocó ningún `.cljs`, así que el bundle no cambia. `clj -M:test` sigue en 46/186/0.
> Detalle en `sessions/SESSION-017.md`, `supabase/SCHEMA.md`.
>
> **Hallazgo colateral — ✅ resuelto el mismo día, era falsa alarma.** Se observó que
> `022_test_config_display_name.sql` no tenía marca de aplicada en `SCHEMA.md` mientras `023`–`026`
> sí, y se advirtió que "Nombre visible" podría estar fallando al guardar. **El owner verificó y la
> columna `test_configs.display_name` existe: `022` estaba aplicada desde el 2026-08-08.** Lo que
> faltaba era la marca en la documentación. **[[BACKLOG]] T-42 queda cerrada** — su único pendiente
> era exactamente esa migración.
>
> Se deja constancia en vez de borrar la nota (regla de gobernanza): durante dos días la memoria
> hizo creer que había un fallo que no existía. La marca de "aplicada" en `SCHEMA.md` es el único
> registro de qué hay realmente en la base; omitirla tiene costo.
>
> **⚠ Sigue pendiente y ahora importa más:** las dos afirmaciones falsas del FAQ (X-01 "el tiempo de
> respuesta también se considera en la estimación"; X-02 "te muestra cómo se movió tu nivel") **están
> publicadas en los tres lugares** y el sitio ya empezó a recibir tráfico tras el go-live. ADR-014
> ya había prescrito el plan de respaldo para esta situación exacta: *"primero que sea verdad,
> después dejarla publicada"*. Corrección estimada: ~15 minutos.

> **T-44 y T-51 implementados (2026-08-10, sesión posterior a T-57 paso 1).** El owner aplicó `027`
> (tabla `misconceptions` creada y vacía, confirmado) y encargó los dos tickets, autorizando trabajo
> autónomo. Ambos van en la rama `t-44-t-51-tiempo-y-topics`, **sin mergear a `main`**.
>
> **T-44 — el tiempo de respuesta ya entra en la estimación.** Fase 1 de ADR-014: namespace puro
> nuevo `universo.irt.effort` que decide un peso por respuesta (umbral
> `max(piso_configurado, largo_enunciado / 20)`), aplicado en las dos derivadas de
> `components.tetha` y heredado por `irt.progress/fisher-information` — de modo que descartar una
> respuesta **sube el SE** en vez de dejarlo mentir, que es el punto que el ADR marcaba como fácil de
> olvidar. El peso se calcula una sola vez al registrar la respuesta y viaja dentro de `tests.test`
> (D-36), así que recalibrar el umbral en la Fase 2 no reescribe la historia. Migración `028`
> (`test_configs.min_response_seconds`, `not null default 3`) + campo en Admin → Configuración de
> tests. **Decisión que no estaba en el ticket:** `:time-ms = 0` **no** descarta la respuesta, porque
> la UI manda 0 cuando el cronómetro no arrancó — es el centinela de "no medido", no de "respondió al
> instante".
>
> **T-51 — los topics duplicados dejan de existir, y de poder volver a existir.** `029` normaliza
> `questions.topic`, `tests.topic` y `test_configs.topic` (sin acentos, minúsculas), fusiona las
> filas de configuración cuidando la auto-FK de prerequisitos, rellena `module_id` por equivalencia
> explícita y por coincidencia única de sufijo, y deja **triggers** en las tres tablas para que el
> defecto no se reconstruya con el próximo ítem cargado a mano ([[../adr/ADR-017-topic-canonico-por-trigger]],
> D-36 acompaña a T-44). Del lado del cliente, `universo.topics` (puro, con tests) reemplaza los dos
> diccionarios literales que vivían en `profile.cljs`.
>
> **Verificado contra un PostgreSQL 14 real, no solo revisado.** Se montó una base desechable con un
> fixture que reproduce el desorden medido el 2026-08-09 y se aplicaron `028`/`029` de verdad:
> 0 topics fuera de forma canónica, FK íntegra, idempotente en la segunda corrida, triggers
> normalizando altas nuevas. **La prueba encontró un defecto real**: la primera versión hacía ganar
> a la fila que ya estaba bien escrita, y eso borraba un prerequisito configurado (θ mínimo incluido)
> — no es cosmética, define quién puede rendir el test. Corregido para que gane la variante con más
> preguntas, con su configuración y su prerequisito.
>
> `clj -M:test` **57 tests / 292 assertions / 0 failures** (antes 46/186). `shadow-cljs release app`
> 0 warnings, bundle recompilado; `npm run build:css` sin cambios (se reusó vocabulario de clases ya
> existente). `clj-kondo` limpio en todo lo tocado.
>
> **⏳ Lo que falta y depende del owner:** aplicar **`028` y después `029`** (en ese orden), correr
> las tres consultas de verificación del final de `029`, y mergear/publicar. **Hasta que eso pase, la
> frase de la FAQ sobre el tiempo de respuesta (X-01) sigue siendo falsa en el sitio.**
>
> **Lo que T-51 deja abierto a propósito:** los 128 ítems de `diagnostico` (84) y `PAES_M1` (44) son
> bancos **mezclados** y siguen sin `module_id`. Asignarles módulo por su topic sería inventar el
> dato; necesitan clasificación por ítem, que es contenido (ADR-016) y no SQL. Por eso T-51 queda
> `en curso` y no `hecho`. Detalle en `sessions/SESSION-018.md`.
>
> **Revisión del owner a T-44 → se abre T-59 y se corrige una premisa de ADR-014 (2026-08-10).** El
> owner cuestionó que el umbral de esfuerzo dependa de dos constantes elegidas por el autor (piso de
> 3 s, 20 caracteres/segundo): sostener números inventados es mantenimiento permanente, y propuso
> que cada ítem **aprenda cuánto tarda** a partir de los tests rendidos. **Tiene razón, y la revisión
> destapó algo más grande:** ADR-014 difirió el modelo empírico con la premisa *"el proyecto tiene
> cero estudiantes reales"* — y esa premisa **se cayó al día siguiente de escribirse** (T-01 midió
> 80 usuarios y 252 diagnósticos el 2026-08-09), con la instrumentación de `time-ms` datando de
> **2025-09-09**, anterior al piloto UNAP. La precondición de ≥30 tests de la Fase 2 probablemente
> está cumplida hace casi un año, y nadie lo notó porque el ADR se escribió sobre una foto vieja.
>
> **Medición real tras aplicar `028`/`029` (2026-08-10).** El owner las aplicó y verificó:
> **0 topics fuera de forma canónica** en las tres tablas, e ítems sin `module_id` de 199 → **156**.
> De esos 156, 28 sí eran mapeables y fallaron por falta de equivalencias, no por la normalización
> — se cerraron con `030` (11 equivalencias) y `031` (dos **módulos nuevos** decididos por el
> profesor: `algebra/inecuaciones` y `aritmetica/operaciones_fundamentales`, D-37; los módulos pasan
> de 18 a 20). Verificado sobre la distribución real: **156 → 128**, idempotente. Los 128 restantes
> son `diagnostico` (84) y `paes_m1` (44), los bancos mezclados. **Se corrigió una afirmación propia
> del mismo día:** se había escrito que la decisión de ADR-017 de no unificar espacios "se había
> caído"; se midió y **no hay ningún banco partido por espacio vs. guion bajo**, así que la decisión
> se sostiene y el hueco era solo de mapeo. Los dos módulos nuevos nacen **sin recursos publicados**.
>
> Decidido (opción (a) del owner): **T-44 se mergea igual** —es la capa de caso frío que hace falta
> para ítems sin datos, que siempre habrá bajo ADR-016— y el trabajo empírico se abre como **T-59**
> (`P1`). ADR-014 lleva ahora una nota de corrección explícita en §Contexto; el párrafo original no
> se borra. Consultas de solo lectura listas y **validadas contra un Postgres real** en
> `supabase/queries/T-59_calibracion_tiempos.sql` → [[OPEN_QUESTIONS]] Q-26.

> **T-59 medido: el problema no es falta de estudiantes, es que el cronómetro no medía (2026-08-10).**
> Se corrieron las consultas contra el proyecto real: **2178 respuestas en 209 tests, y solo 195
> (9 %) con `time-ms > 0`**. El campo está siempre presente y casi siempre en 0. **Corrige la
> inferencia con la que se abrió T-59:** que la instrumentación datara de 2025-09-09 hacía esperar
> que los tiempos estuvieran ahí; se marcó como pendiente de verificar y la verificación dio que no.
> Consecuencias: **0 de 387 ítems tienen ≥30 respuestas** con tiempo (nada calibrable); el
> **promedio simple queda refutado con los datos del propio proyecto** (ítem 361: media 78,7 s vs
> mediana 4,8 s); ρ(θ, tiempo) **no calculable** (n = 17). T-59 pasa a `bloqueado` **por
> instrumentación**, que no se arregla esperando → consulta 6 del archivo de queries, para saber si
> el cronómetro registra hoy. **Q-26 respondida.**
>
> **Lo que sí se pudo hacer con esas 195 respuestas:** corregir el piso de esfuerzo de **3 s a 2 s**
> con evidencia (`032`). El barrido mostró que con piso 3 las respuestas descartadas acertaban 34 %
> cuando el azar es 25 % — se estaba tirando conocimiento. Y una **tercera corrección al agente**:
> la conjetura de que el campo del panel de T-44 sobraba era falsa; con enunciado mediano de 50
> caracteres, el piso manda en **234 de 387 ítems**, y que fuera configurable es lo que permitió que
> el arreglo sea un `update` de una línea.
>
> **Backfill de T-51 cerrado hasta donde llega sin clasificar contenido:** `030` + `031` llevan los
> ítems sin `module_id` de 156 a **128** (solo `diagnostico` y `paes_m1`), con dos módulos nuevos
> decididos por el profesor (D-37). Ver `sessions/SESSION-018.md`.

> **Las tres migraciones aplicadas; auditoría de memoria (2026-08-10, cierre).** El owner aplicó
> `030`, `031` y `032`. **Por primera vez desde que se lleva este registro no queda ninguna migración
> pendiente**: repositorio y base alineados. Estado medido: ítems sin `module_id` **199 → 128**,
> módulos **18 → 20**, piso de esfuerzo **3 s → 2 s**.
>
> A pedido del owner se revisó toda `project-memory/` buscando desincronizaciones. Corregidas:
> - **`HANDOFF.md` estaba congelado en el 2026-07-26** — el archivo que existe para retomar el
>   proyecto sin contexto decía que el árbol estaba sucio, que no se sabía qué había en producción,
>   que faltaba publicar contenido y verificar el email, y listaba como bloqueantes seis tareas ya
>   cerradas. Reescritas sus secciones de estado, pendientes, riesgos, preguntas y próximos pasos.
> - **Conteo de tests desactualizado** en cuatro archivos (`AGENT_INSTRUCTIONS` decía 34/133 como
>   "estado de referencia" contra el que comparar; también `PROJECT_BRIEF`, `LESSONS_LEARNED` y la
>   tabla de este archivo). Ahora **58/332**, verificado en vivo.
> - **`TECH_STACK` y `DEPENDENCIES` seguían marcando con ⚠️ el desajuste de versiones de
>   shadow-cljs y KaTeX que T-13 cerró el 2026-08-09.** Verificado contra `package.json` e
>   `index.html` antes de corregir: ambos están alineados.
> - **`ARCHITECTURE`** no tenía `test_configs`, `misconceptions`, `normalize_topic()` ni los
>   triggers de canonicalización; se agregó además una tabla de **invariantes que impone la base**
>   (capacidad, confirmación, último admin, topic canónico) con su espejo puro cuando lo hay.
> - **`TERMINOLOGY`** no tenía el vocabulario que ADR-014 pedía reflejar: respuesta no esforzada,
>   peso `w`, intensidad temporal β, velocidad τ, y por qué se usa media geométrica y no simple.
> - **`RISKS` R-17** ahora distingue lo que T-44 mitiga (respuestas al azar) de lo que no (el
>   parámetro `b` sin calibrar), y advierte que T-29 hereda el problema de cobertura de datos.
>
> **T-51 cerrada** con una nota explícita: su criterio decía "todo ítem tiene `module_id`" y 128 no
> lo tienen, así que esa mitad **se trasladó a T-60** (clasificar los bancos mezclados) en vez de
> darla por cumplida.

> # ⭐ **T-44 y T-51 en producción — X-01 resuelta (2026-08-10)**
>
> El owner mergeó **PR #34** (`t-44-t-51-tiempo-y-topics` → `main`, merge `c8ecc2d`) y publicó el
> bundle. **Verificado por hash** con el patrón de T-19/T-35/T-38: MD5
> `ef97d814d66efd61d08d90711431aca9`, idéntico en `origin/main` y en
> `https://jacobocordova.com/public/js/app.js`, con `age: 0` (el CDN ya propagó). `clj -M:test` en
> `main`: **58 / 332 / 0**.
>
> **La afirmación falsa más vieja del proyecto dejó de serlo.** La FAQ decía desde siempre que "el
> tiempo de respuesta también se considera en la estimación" mientras el 1PL lo ignoraba por
> completo (X-01, registrada desde la adopción de PMF). Se confirmó en vivo que **la frase sigue
> publicada** — y ahora es cierta: bajo el umbral de esfuerzo la respuesta no aporta ni a θ ni a la
> información de Fisher. No se borró el copy, se cambió el sistema, que es lo que ADR-014 había
> prescrito.
>
> **Estado consolidado de la jornada:** ninguna migración pendiente (hasta `032`); ítems sin
> `module_id` 199 → 128; módulos 18 → 20; topics canónicos garantizados por trigger; suite de 46/186
> a 58/332; memoria auditada y `HANDOFF` reescrito.
>
> **⚠ Queda una sola afirmación falsa publicada: X-02** ("te muestra cómo se movió tu nivel").
> Depende de Q-07/T-26, que siguen sin decidir. La materia prima existe —`tests` guarda un intento
> por fila y `universo.access` ya agrega por topic—; lo que falta es decidir la semántica del
> re-diagnóstico, no instrumentar nada.

> **Cronómetro verificado (2026-08-10, cierre de jornada).** El owner confirmó que el diagnóstico
> **sí registra `time-ms` hoy**: no hay bug vivo, los ceros del histórico son de tests anteriores al
> arreglo del flujo (`9e622d9`, 2026-07-18). **T-59 vuelve a estar bloqueado por volumen de datos**,
> no por instrumentación.
>
> Lo bueno: cada diagnóstico que se rinda de ahora en adelante es dato utilizable sin trabajo extra,
> así que **difundir el cupo construye también el dataset**. Lo malo e irreversible: las 2178
> respuestas históricas no sirven para tiempos y nunca van a servir.
>
> **Hallazgo de escala que conviene tener presente antes de invertir en T-59:** las 195 respuestas
> útiles se reparten en 84 ítems a 2,3 por ítem. Llegar a 30 respuestas por ítem en los 387 del banco
> exigiría ~1.200–1.400 diagnósticos completos — otro orden de magnitud de tráfico. Por eso T-59 se
> replanteó como una **escalera jerárquica** (constante → distribución global → por topic → por ítem)
> en vez de saltar al extremo caro; el umbral global ya es alcanzable con los datos actuales, y la
> capa autoral de T-44 pasa a ser el piso permanente, no un parche transitorio.

> **Experimento paralelo entregado (2026-08-11, rama `experimento-cuantica`).** Un track de
> **Mecánica Cuántica** montado sobre el mismo motor IRT, para uso personal del autor en su examen
> universitario: migraciones `033`–`040` con 15 módulos, 77 misconceptions, **123 ítems** con sus 4
> explicaciones cada uno, 32 recursos y 15 configuraciones de banco. **No es contenido del producto
> y no cambia el estado del MVP PAES**: es 100 % datos, no toca ClojureScript, no recompila el
> bundle, y `clj -M:test` sigue igual. Está aislado del estudiante por `test_configs.active = false`
> ([[RISKS]] R-23) y `published = false` en los recursos. Ver [[../adr/ADR-018-track-experimental-cuantica]],
> [[BACKLOG]] T-61 y [[../supabase/SCHEMA]] §Track experimental.
>
> **✅ Aplicadas en producción por el owner el 2026-08-11.** Antes se habían verificado contra un
> PostgreSQL 14 desechable (aplicación limpia, idempotencia, contenido PAES intacto, reversión
> probada). Que `034` corriera **cierra la contradicción de T-57**: `027` sí estaba aplicada.
> ⏳ Falta correr la batería de control del final de `040`.
>
> **Consecuencia práctica, ya vigente:** las consultas de métricas sobre el banco PAES necesitan
> `where topic not like 'mq\_%'`. Sin ese filtro, `questions` cuenta **510** en vez de 387.

> **Diagnóstico: θ inicial baja de 0,0 a −1,0 (2026-08-11).** Cambio del owner en
> `universo.events.test`, publicado en esta sesión. El test ahora arranca por ítems **más fáciles**
> que la media del banco en vez de por el centro de la escala. `next_question` elige por cercanía a
> θ, así que esto cambia la trayectoria de estimación de **todos** los estudiantes, no solo la
> primera pregunta. Registrado como [[DECISIONS]] D-39, con la inconsistencia que deja abierta
> (`db/default-db` y `test_subs` siguen en 0.0).

> **Editor de recursos con vista previa lateral (2026-08-11).** Admin → Recursos pasa a dos columnas
> desde `lg`: formulario a la izquierda, y a la derecha la tarjeta del recurso **tal como la ve el
> estudiante**, en vivo. La previa reusa `plan/resource-card`, la misma función de "Mi plan", para
> que no pueda mentir ([[DECISIONS]] D-40). Deja a la vista un hecho que estaba oculto: el cuerpo se
> renderiza con `math/latex`, que **no** entiende encabezados `##`, listas `-` ni tablas de Markdown.

> **Segundo eje del perfil: fluidez (λ) — 2026-08-12.** `universo.irt.fluency` mide cuánto le
> cuesta al estudiante llegar al resultado, normalizado por el tiempo de lectura del enunciado, y lo
> cruza con θ en cuatro perfiles con acciones distintas. El caso que motiva todo: **«sabe pero le
> cuesta» ya no es el mismo estudiante que «sabe y automatizó»** — el primero necesita práctica de
> fluidez, no más teoría, y hasta hoy el sistema les recomendaba lo mismo. Se ve en «Mi plan» como
> una tarjeta con el 2×2. Cero cambios de esquema: reusa `time-ms` y `:weight` de ADR-014.
> Ver [[../adr/ADR-019-eje-de-fluidez-en-vez-de-estilos-de-aprendizaje]] y [[BACKLOG]] T-63.
>
> **Y una decisión que conviene tener presente:** el **Eje 3 de VISION §3.3 (estilos de aprendizaje)
> no se va a implementar.** No por prioridad: la hipótesis de emparejar enseñanza con "canal
> preferente" no tiene respaldo empírico, y es el único componente del producto que un colegio o un
> competidor podría usar para desarmar la credibilidad del resto. El stub `:traits` de
> `universo.db/default-db` —que aparecía en un solo lugar del repo y nadie leía— queda anotado como
> muerto (D-41). Esto deja una tensión abierta con VISION, que lo declaraba diferenciador.

> **El repositorio se mantiene público, y ahora es una decisión y no un descuido (2026-08-12).**
> Se verificó que es público (`visibility: public`), lo que expone `project-memory/`, `adr/`,
> `sessions/` y `prompts/`. Se evaluó moverlo a privado y **el owner decidió que no** (D-42): la
> visibilidad ayuda de cara a financiamiento externo, tener el PMF solo en local es un riesgo peor
> que el que se evita, y el foso real —banco de ítems calibrado y diagnósticos— no está acá: vive en
> Supabase bajo RLS, cerrado por ADR-015. Se revisará cuando exista una versión estable reconstruible
> desde cero en un repo más compacto.
>
> Dato para esa revisión futura, que no cambia con el tiempo: **mover archivos no despublica el
> pasado.** 51 de los 169 commits tocan `project-memory/`; despublicar de verdad exigiría reescribir
> el historial.

> # ⭐ **Cierre del 2026-08-12: el eje de fluidez está en producción**
>
> `experimento-cuantica` se mergeó a `main` (**PR #36**, merge `52afdae`). `git diff main
> experimento-cuantica` está vacío y el árbol limpio: lo que se ve en <https://jacobocordova.com>
> incluye el eje λ. (Durante la sesión no era así, y eso hizo fallar cinco intentos de verificación
> visual: el owner miraba producción mientras el agente controlaba `127.0.0.1`. Ver
> [[../sessions/SESSION-021]], nota de método.)
>
> **Verificado con datos reales, no solo con tests.** El owner rindió `mq_momento_angular` y de ahí
> salieron dos correcciones que ningún test unitario habría mostrado:
> 1. el eje **no existía para ningún perfil ya guardado** (`:fluency` solo se escribía al construir
>    el perfil) → se agregó el recálculo desde `tests.test` en `:plan/fetch-last-test!`, usando
>    datos que ADR-014 Fase 1 ya guardaba. **No contradice el "no reinterpretar hacia atrás"**: no
>    toca θ ni ningún resultado previo;
> 2. con pocas correctas **la tarjeta desaparecía en silencio** (`min-responses` = 4) → tercer
>    estado explícito que dice cuántas faltan. Una funcionalidad que se esconde sola es peor que no
>    tenerla.
>
> Resultado medido del owner: 8 respuestas usables, `t_rel` mediana **2,19** → banda `:fluida`.
> Ese número es la primera evidencia de que el corte `:fluida` = 3,0 puede ser **demasiado generoso
> para ítems conceptuales** ([[BACKLOG]] T-65).
>
> **Migración `041` — ✅ aplicada el 2026-08-13.** Hace configurables por banco los cortes de fluidez
> (`test_configs.fluency_fluida_max` / `fluency_media_max`, `not null default 3`/`6` con check que
> impide invertirlos), editables en Admin → Configuración de tests. Se había probado contra un
> PostgreSQL 14 desechable, y tras aplicarla **se verificó entera contra la base real de
> producción**: columnas, tipos, `not null`, defaults `3`/`6`, el check que impide invertir las
> bandas y los valores de los 37 bancos. Detalle en [[../supabase/SCHEMA]] §Verificación; repetible
> con el bloque H de `supabase/queries/verificacion_esquema.sql`.
>
> **Los 37 bancos quedaron en 3/6**, así que el comportamiento observable **no cambió**: nadie recibe
> hoy una clasificación distinta de la de ayer. `041` no calibra, habilita calibrar.
> **Lo que a propósito NO se hizo:** bajar el corte de `mq_momento_angular` a 2,0/4,5. El `update`
> está escrito y **comentado** dentro de la migración: aplicarlo por un único test rendido por una
> sola persona sería fijar un número por criterio y presentarlo como medición — exactamente el error
> que ADR-019 documenta.
>
> **Falsa alarma cerrada (T-65):** las 15 respuestas contra `max_items = 12` **no eran un bug** de
> la regla de parada; el owner había subido `max_items` desde el panel. Recordatorio de no escalar
> una anomalía a bug antes de preguntar por la configuración.

> # 🎨 **UI: identidad propia y línea del tiempo (2026-08-13, rama `ui-identidad-y-linea-del-tiempo`)**
>
> **El bug de las letras negras tenía una causa de fondo, no una clase suelta.** El mapeo de ADR-012
> estaba bien (164 clases usadas, 91 mapeadas); lo que faltaba era que **el tema oscuro nunca definió
> un color de texto base**, así que todo elemento sin `text-*` explícita heredaba el negro del
> navegador. Por eso fallaba en "algunas partes" y era imposible de encontrar revisando componentes.
> Segundo hallazgo: las `<option>` no heredan el color del `<select>`, y el panel usa desplegables
> por todos lados.
>
> **Y la razón de que se viera genérica era literal:** `tailwind.config.js` tenía
> `theme: { extend: {} }` — cero tokens propios. El índigo, los grises, los radios y la tipografía
> eran los valores de fábrica de Tailwind. No es que la IA reparta el mismo código: **nunca se
> definió una identidad y quedó el default**. Cualquier proyecto que instale Tailwind y no configure
> nada llega al mismo lugar.
>
> Se aplicó la paleta **"tinta y pergamino"** que eligió el owner, redefiniendo la escala `indigo`
> con los valores del azul tinta: los cientos de `bg-indigo-600` ya escritos cambiaron de color **sin
> editar un solo `.cljs`** (verificado en el CSS compilado: `rgb(58 79 122)`). Ver
> [[../adr/ADR-020-identidad-visual-por-tokens]], que cierra **T-41** tras cinco días parada por
> falta de especificación.
>
> **La línea del tiempo pone a trabajar el contenido histórico** que SESSION-021 había marcado como
> muerto: 35 módulos ubicados en el año en que su matemática apareció, con medallas derivadas del
> mejor θ en `tests` — **funcionan retroactivamente**, quien ya rindió las ve encendidas la primera
> vez que abre el tablero. Cero tablas nuevas. Ver [[../adr/ADR-021-linea-del-tiempo-historica]].
>
> **Estado real, sin adornos:**
>
> | | |
> |---|---|
> | `clj -M:test` | ✅ 83 tests / 454 assertions / 0 failures (eran 74/410) |
> | Compilación | ✅ bundle y CSS recompilados, 0 warnings |
> | Contraste | ✅ 15/15 pares WCAG, 12 en AAA (`scripts/audit_contraste.py`) |
> | Tema oscuro | ✅ sin clases de texto sin mapear (`scripts/audit_dark_theme.py`) |
> | **Verificación visual** | ⛔ **ninguna pantalla se miró con ojos** — T-67, R-25 |
> | Migración `042` | ⏳ escrita y probada, **sin aplicar**: los años son contenido y los audita el profesor (ADR-016) |
> | Rama | ⏳ sin mergear a `main` |
>
> Las dos últimas filas se implican: **sin `042` aplicada la línea no se dibuja**, así que tampoco se
> puede verificar en vivo todavía.

> Este archivo es el "dónde estamos" canónico. **Se actualiza en toda sesión con cambios.**
> Si contradice a cualquier otro documento, este gana para "estado"; [[ARCHITECTURE]] gana para
> "cómo está construido".

---

## 1. Estado general

**Fase: go-live cerrado (2026-08-09). Lo que sigue no es construir, es difundir.**

El funnel completo funciona de punta a punta: un estudiante puede registrarse, hacer el
diagnóstico adaptativo, obtener su perfil (θ, banda, déficits, misconceptions), ver su plan e
inscribirse en un cupo de su banda, con confirmación automática del grupo y notificación in-app.
El panel de administración permite operar todo el ciclo (preguntas, recursos, cupos, roles,
moderación).

**Ningún bloqueo de F8 (Go-live) queda abierto:** contenido publicado (T-01, 58/61 recursos), email
verificado en producción (T-02) y primer cupo real con sala de Jitsi (T-04). El riesgo dominante
pasó a ser **R-19 (estacionalidad)**: la PAES se rinde a fin de año y la ventana de captación son
las próximas semanas.

| Dimensión | Estado |
|-----------|--------|
| Funcionalidad del funnel | ✅ operativa |
| Panel admin | ✅ operativo |
| Tests | ✅ `83 tests / 454 assertions / 0 failures` (`clj -M:test`, 2026-08-13) |
| Identidad visual | 🟡 paleta propia "tinta y pergamino" por tokens (ADR-020), con contraste WCAG verificado; **sin revisión visual** (T-67, R-25) y sin mergear |
| Línea del tiempo | 🟡 implementada y testeada (ADR-021); espera que el owner audite los años de `042` y la aplique |
| Perfil del estudiante | ✅ dos ejes: θ (IRT) y **fluidez λ** (ADR-019), con la tarjeta 2×2 en «Mi plan», en producción desde el 2026-08-12. Umbrales de λ **sin calibrar** (T-65) |
| Contenido pedagógico | 🟡 58/61 recursos publicados (T-01); faltan los 2 módulos nuevos de `031` y los 7 de geometría (T-56) |
| Banco de ítems | 🟡 387 ítems PAES; topics canónicos y 259 con módulo, **128 sin módulo** (bancos mezclados, T-60). Además 123 ítems `mq_` del track experimental, **aislados** (`active = false`) — las métricas necesitan `where topic not like 'mq\_%'` |
| Migraciones | ✅ **ninguna pendiente** — `033`–`042` aplicadas y verificadas contra la base real (ver [[../supabase/SCHEMA]]); `042` la aplicó el owner el 2026-08-13 tras auditar los años: **35 ubicados / 0 sin ubicar** |
| Email de cohorte | ✅ desplegado y verificado en producción (T-02, 2026-08-09) |
| Documentación / memoria | ✅ PMF operativo desde 2026-07-26; auditada el 2026-08-10, actualizada el 2026-08-12 |
| CI | 🟡 `.github/workflows/test.yml` existe (T-06); staging y monitoreo ⛔ inexistentes |
| Analítica del embudo | ⛔ inexistente (T-20) — el sitio ya recibe tráfico sin medición |
| Estado del árbol de trabajo | ✅ limpio; `experimento-cuantica` **mergeada a `main`** (PR #36, `52afdae`, 2026-08-12) — sin ramas con trabajo sin publicar |

---

## 2. Avance por fase

| Fase | Objetivo | Avance | Notas |
|------|----------|--------|-------|
| **F0 — Base técnica** | SPA + Supabase + auth + RLS | **100 %** | `admin_rls.sql`, sesión rehidratada, rutas protegidas |
| **F1 — Motor IRT** | Diagnóstico adaptativo con parada por precisión | **100 %** | 1PL + MAP, Δθ acotado, SE ≤ 0,35, prefetch; parada + tiempo configurables por banco y progresión por prerequisitos (T-39, ADR-013, en producción) |
| **F2 — Perfil y plan** | θ → banda → déficits → plan en 2 capas | **95 %** | Contenido publicado (T-01) y recomendación personalizada arreglada (T-53). El techo real hoy son los 128 ítems sin módulo (T-60), no el contenido |
| **F3 — Cohortes** | Cupos por banda, inscripción, confirmación | **100 %** | Control de `capacity` en la base (T-03, `011`); primer cupo real publicado (T-04). Falta oferta en las demás bandas, que es operación y no código |
| **F4 — Admin** | Operar contenido, cupos, usuarios, moderación | **100 %** | Editor de preguntas restaurado en `48bf525` |
| **F5 — Email de cohorte** | Aviso por correo al confirmar grupo | **100 %** | Desplegado y verificado en producción (T-02, 2026-08-09): envío real confirmado, cron activo |
| **F6 — Captación** | Landing + SEO | **90 %** | Landing rehecha (`38fbb96`), JSON-LD acotado (`b6ae903`); sin analytics |
| **F7 — Memoria del proyecto** | PMF operativo | **100 %** | Este framework, 2026-07-26 |
| **F8 — Endurecimiento** | CI, staging, backups, monitoreo | **20 %** | CI existe (T-06); sin staging (T-09), sin respaldo probado (T-07), sin monitoreo. El esquema tampoco se puede reconstruir desde el repo (T-48) |

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
- [x] **`005_email_outbox.sql` aplicada + Edge Function desplegada con `RESEND_API_KEY`** —
  cerrado 2026-08-09 (T-02), **verificado en vivo por el agente**: envío manual y cadena completa
  (cupo confirmado → notification → outbox → sent) probados con datos reales, entrega confirmada
  a bandeja principal. Cron vía `pg_cron`/`pg_net` (el dashboard de este proyecto no ofrece
  Schedules de Edge Functions)
- [x] `011_enrollments_capacity_check.sql` aplicada (control de capacidad en inscripciones, T-03) —
  aplicada por el owner el 2026-07-29, sin verificación en vivo por parte del agente
- [x] `012_slot_cancellation_notification.sql` aplicada (aviso al cancelar un cupo, T-25) —
  aplicada por el owner el 2026-07-30, sin verificación en vivo por parte del agente
- [x] `013_profile_contact_preference.sql` aplicada (canal de contacto preferido, T-36) —
  aplicada por el owner el 2026-07-30, sin verificación en vivo por parte del agente
- [x] **Cupos reales (no demo) publicados con fecha, sala de Jitsi y mínimo/capacidad definidos
  (D-27)** — cerrado 2026-08-09 (T-04): un cupo real para el sábado 2026-08-15 10:30 con enlace de
  Jitsi verdadero; demos borrados. Pendiente parcial: cupos para las bandas restantes
- [x] Recompilar (`shadow-cljs release app` + `build:css`) y publicar en `main` — rutina cumplida en
  cada sesión, verificada por hash contra producción

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
| BL-02 | ~~Verificación del envío de email~~ -- **resuelto 2026-08-09** (T-02, verificado en vivo de punta a punta) | Acceso/operación | Jacobo Córdova |
| BL-03 | ~~Cupos reales~~ -- **resuelto 2026-08-09** (T-04): primer cupo real publicado para el sábado 2026-08-15 10:30 con enlace de Jitsi verdadero, demos borrados. **Era el último bloqueo de go-live** | Negocio | — |
| BL-04 | ~~Árbol sucio~~ -- **resuelto 2026-07-29** (T-08) y reverificado limpio el 2026-08-09; ver nota de sesión al inicio de este archivo | Técnico | — |
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

Reescrito por segunda vez el 2026-08-09, **tras cerrar T-04**. Por primera vez en el proyecto no
hay ningún bloqueo de go-live abierto, así que la lista cambia de naturaleza: deja de ser técnica.

1. **Conseguir el primer estudiante externo.** Es el paso 1 y no tiene ticket porque no es código:
   difundir el cupo del 2026-08-15 por los canales que existan (marca personal, WhatsApp, contactos
   del piloto UNAP). **R-19 manda:** la PAES se rinde a fin de año, quedan ~12 semanas de ventana y
   no hay segunda oportunidad este ciclo.
2. **Confirmar en el panel** la banda, `capacity` y `min_enrollments` del cupo publicado antes de
   difundirlo (D-27 dice 12 y 3; no verificado por el agente).
3. **Probar el funnel completo con una cuenta de estudiante real**, de punta a punta. Nunca se hizo
   en una sola pasada: T-01, T-24, T-38, T-53 y T-58 quedaron todos "no verificados en vivo" por
   falta de credenciales. Media hora del owner cierra esa deuda de verificación acumulada.
4. **Instrumentar el funnel** (T-20, F10 está en 0 %): sin esto, si no llega nadie no habrá forma de
   saber en qué paso se cayeron. Es la causa #1 del pre-mortem, y hoy es invisible por construcción.
5. **T-51** cuando se retome contenido — es el bloqueo real de la capa 1 (ver T-53).
6. **Endurecimiento** (T-07 respaldo probado; T-06 hecho pero sin verificar en vivo) y **T-34**
   (retención automática), que es una promesa pública hoy incumplida y su plazo legal es el
   1/12/2026.

> Regla PMF: antes de empezar cualquiera de estos pasos, leer [[AGENT_INSTRUCTIONS]]; al
> terminarlo, actualizar este archivo y crear/actualizar el `sessions/SESSION-XXX.md`.

---

## 9. Estado del repositorio

> Reemplazado 2026-08-09 con el estado verificado en esta sesión (limpieza de ramas + memoria):

```
Rama actual  : chore-limpieza-tecnica-y-memoria (creada desde main @ 68a6d97, sin mergear todavía)
Rama deploy  : main  (GitHub Pages, dominio jacobocordova.com) @ 68a6d97
Ramas totales: solo `main` en local y en origin -- las 26 locales / 22 remotas restantes se
               borraron el 2026-08-09 (T-18, ver nota de sesión al inicio de este archivo)
Árbol de trabajo: limpio en main; en chore-limpieza-tecnica-y-memoria hay cambios sin mergear
               (borrado de user.cljs, versiones alineadas, bundle recompilado, memoria actualizada)
```

> No se recompiló `public/js/app.js` de una sesión anterior sin cambio de fuente esta vez: el
> cambio en el bundle de esta sesión corresponde a un `npx shadow-cljs release app` real, motivado
> por el bump de versión (X-05). Sigue vigente la advertencia de [[LESSONS_LEARNED]] L-30 sobre
> watchers de `shadow-cljs`/`tailwind` en background que pueden ensuciar `public/js/app.js`/
> `app.css` con un build de desarrollo sin que haya cambio de fuente real — verificar `git status`
> antes de cualquier commit que toque esos dos archivos.

**Tooling del agente (2026-07-27):** `graphify` (ya estaba) y **`rtk`** (nuevo, instalado hoy) como
compresores de contexto; **Obsidian** con vault pre-configurado (`.obsidian/`, gitignorado, no
versionado por diseño). Detalle: [[RTK_INTEGRATION_GUIDE]], [[GRAPHIFY_INTEGRATION_GUIDE]],
[[OBSIDIAN_WORKSPACE_GUIDE]], [[DECISIONS]] D-17.

**Deuda de ramas — resuelta 2026-08-09:** llegó a crecer a 27 locales / 24 remotas antes de
limpiarse. Hoy el repositorio tiene únicamente `main` en local y en `origin`. Ver [[BACKLOG]] T-18
(cerrada), [[RISKS]] R-21 (cerrado).

**Resuelto (2026-07-29):** `cursor/mvp-operable-funnel` **sí** está mergeada a `main` (verificado
por `git log` y por hash contra producción, ver T-19 arriba). La duda vigente ahora es la rama
`visual-fixes`, no esa — ver T-35. Siempre verificar `git log main..HEAD` antes de prometer que algo
está en producción; no asumir que el estado descrito acá sigue vigente sin repetir el check.

---

Relacionado: [[HANDOFF]] · [[BACKLOG]] · [[RISKS]] · [[ROADMAP]] · [[OPEN_QUESTIONS]] ·
`../sessions/SESSION-001.md`
