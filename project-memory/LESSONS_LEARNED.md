# LESSONS_LEARNED

Última actualización: **2026-07-26**

Trampas ya pisadas en **este** repositorio, con su causa y la regla que evita repetirlas. Extraídas
del código, los comentarios de las migraciones, `PROJECT_SUMMARY.md` y el historial de commits.

> Cuando algo cueste más de 15 minutos de depuración, agregarlo aquí. Una lección son tres cosas:
> **síntoma → causa → regla**.

---

## ClojureScript y shadow-cljs

### L-01 · El namespace debe coincidir con la ruta del archivo
**Síntoma:** el build falla con un error de namespace, o el ns "no existe".
**Causa:** shadow-cljs exige la correspondencia exacta. Guion en el namespace = guion **bajo** en el
archivo: `universo.slots.logic` → `src/universo/slots/logic.cljs`; `universo.visitor-tracker` →
`src/universo/visitor_tracker.cljs`.
**Regla:** al crear un ns, crear el archivo por la ruta traducida, nunca al revés.

### L-02 · Un efecto de re-frame recibe **un solo** argumento
**Síntoma:** el `reg-fx` recibe `nil` o un valor inesperado cuando se pasan varios datos.
**Causa:** `reg-fx` se invoca con un único valor.
**Regla:** para pasar varios datos usar un mapa (`{:id … :payload …}`) o un vector, y destructurarlo
dentro del efecto.

### L-03 · Un `reg-event-*` en un namespace que nadie requiere **no existe**
**Síntoma:** un `dispatch` no hace nada; solo aparece un warning en consola.
**Causa:** los handlers se registran como efecto secundario de cargar el namespace. Si el ns no está
en el grafo de `universo.core`, nunca se carga.
**Regla:** todo `events/*` nuevo debe agregarse al `:require` de `src/universo/core.cljs`. Si un
dispatch "no hace nada", revisar esto **primero**.
**Evidencia:** `universo.test-subs` está requerido pero comentado con `#_` en `core.cljs`.

### L-04 · Warnings `:infer-warning` en `events/auth.cljs` son conocidos y benignos
**Síntoma:** `clj -M:test` imprime advertencias "Cannot infer target type" en `auth.cljs:172` y
`:193` al acceder a `.-user` de la sesión de Supabase.
**Causa:** los objetos JS de supabase-js no tienen externs/tipos que ClojureScript pueda inferir.
**Regla:** no confundirlos con fallos. La suite igual reporta `0 failures, 0 errors`. Si molestan,
anotar el tipo (`^js`) en lugar de silenciar globalmente los warnings.

### L-05 · No editar `public/js/app.js` a mano
**Síntoma:** cambios que desaparecen al recompilar, o comportamiento en producción que no coincide
con ningún fuente.
**Causa:** es un artefacto generado que además está versionado en Git.
**Regla:** siempre `npx shadow-cljs release app` y commitear el resultado.
**Estado hoy:** hay un `app.js` modificado sin commitear cuyo origen no está verificado
([[BACKLOG]] T-08, [[RISKS]] R-13).

### L-06 · Una clase de Tailwind nueva no existe en producción sin rebuild de CSS
**Síntoma:** el estilo funciona en `watch` pero no en el sitio publicado.
**Causa:** Tailwind purga por contenido; `public/css/app.css` es un artefacto generado.
**Regla:** `npm run build:css` antes de publicar cuando cambien clases. Cuidado especial con clases
construidas dinámicamente con `str`: Tailwind no las detecta si no aparecen literalmente en el
código (patrón usado en `landing.cljs` y `home.cljs` — mantener las clases como literales
completos).

### L-07 · El runtime de desarrollo no se versiona
**Síntoma:** commits enormes con miles de archivos en `public/js/cljs-runtime/`.
**Causa:** artefactos de desarrollo trackeados por error.
**Regla:** ya resuelto en `.gitignore` (commit `3680cb4`); no revertirlo. Solo el bundle
`release` (`app.js`) y el CSS se versionan.

### L-08 · `.gitignore` no destrackea lo ya trackeado
**Síntoma:** `src/universo/user.cljs` aparece en `.gitignore` **y** en `git ls-files`.
**Causa:** ignorar solo afecta a archivos no trackeados.
**Regla:** para dejar de versionar algo ya trackeado hace falta `git rm --cached <archivo>` además
de la entrada en `.gitignore` ([[BACKLOG]] T-16).

---

## Supabase, RLS y migraciones

### L-09 · `profiles_update_own` impide cambiar roles (UPDATE afecta 0 filas)
**Síntoma:** el botón "Hacer admin" del panel "funciona" pero no cambia nada.
**Causa:** la policy original solo permite que cada usuario se actualice **a sí mismo y sin cambiar
de rol**, así que el UPDATE no afecta filas — **sin error**, solo 0 filas.
**Solución:** `006_admin_role_management.sql` agrega `profiles_update_admin` (las policies
permisivas se combinan con OR).
**Regla:** en Postgres con RLS, "0 filas afectadas" es el síntoma típico de una policy que no
autoriza. **Nunca** interpretar la ausencia de error como éxito: verificar el conteo de filas y
mostrarlo en la UI (el panel ya lo hace).

### L-10 · Un admin podía quedarse sin administradores
**Síntoma:** riesgo de dejar la instalación sin ningún admin al degradarse a sí mismo.
**Causa:** faltaba una salvaguarda.
**Solución:** doble protección — `id <> auth.uid()` en la policy (un admin solo modifica a otros) y
el trigger `profiles_protect_last_admin`.
**Regla:** el traspaso de rol se hace **promoviendo primero** a la otra cuenta. Toda operación
destructiva sobre permisos necesita su salvaguarda a nivel de datos, no de UI.

### L-11 · `false` no puede significar dos cosas
**Síntoma:** en el guestbook, `is_approved = false` significaba a la vez "pendiente de moderación"
y "rechazado", así que no se podía distinguir la cola de la papelera.
**Solución:** tri-state (`null` pendiente / `true` aprobado / `false` papelera) + migración que
convirtió los `false` históricos en `null`.
**Regla:** si un booleano necesita tres estados, no es un booleano. Y al cambiar la semántica de una
columna existente, **migrar los datos históricos en la misma migración**.

### L-12 · Las migraciones deben ser idempotentes
**Causa:** se aplican **a mano** sobre producción, a veces parcialmente, y puede ser necesario
re-ejecutarlas.
**Regla:** `create table if not exists`, `create index if not exists`,
`drop policy if exists` antes de `create policy`, upsert por clave natural (los seeds usan `slug`),
`update … where … in (…)` en lugar de updates masivos. Todo el `supabase/` sigue esta práctica: no
romperla.

### L-13 · El orden de las migraciones no es opcional
**Síntoma:** una migración falla por funciones o tablas inexistentes.
**Causa:** `001` requiere `public.is_admin()` de `admin_rls.sql`; `005` requiere `notifications` de
`001`; `006` y `007` requieren `is_admin()`.
**Regla:** aplicar en el orden de `supabase/SCHEMA.md` §"Orden de aplicación". Al agregar una
migración nueva, documentar allí sus precondiciones.

### L-14 · La UI no es un control de acceso
**Regla:** `:auth/admin?` y `protected-sections` mejoran la experiencia; la seguridad la da RLS.
Toda tabla nueva se crea con `enable row level security` **y sus policies en la misma migración** —
si no, o queda abierta o queda inaccesible, y ambos casos se descubren tarde.

---

## IRT y dominio

### L-15 · Sin prior, θ divergía con pocas respuestas
**Síntoma:** con 1–2 respuestas, la estimación de máxima verosimilitud se va a ±∞ (todas correctas o
todas incorrectas no tienen máximo finito).
**Solución:** estimación **MAP** con prior N(0,1), que encoge θ hacia 0 cuando hay poca información.
**Regla:** no quitar el prior "para que sea más preciso": es lo que hace que el test funcione desde
el primer ítem.

### L-16 · Saltos de θ arruinan la experiencia
**Síntoma:** una sola respuesta llevaba el test de ítems muy fáciles a imposibles.
**Solución:** `limit-theta-step` con `max-theta-step = 0.4`.
**Regla:** la estimación estadísticamente óptima no siempre es la mejor experiencia. Si se ajusta
este parámetro, revisar también la regla de parada (afecta cuántos ítems hacen falta para converger).

### L-17 · Ventana de selección con plan B
**Síntoma:** con bancos pequeños no había ítems en `[θ−1, θ+1]` y el test terminaba antes de tiempo.
**Solución:** ampliar a `±2` (`selection-half-width-wide`) antes de declarar `:exhausted`.
**Regla:** cualquier selección adaptativa necesita un fallback cuando el banco es escaso. El tamaño
del banco es una precondición del algoritmo, no un detalle.

### L-18 · Un topic sin mapeo no falla: se degrada
**Causa:** `profile/module-slug-for` devuelve `unknown/<topic>` cuando no hay mapeo.
**Consecuencia real:** el perfil se construye igual, pero el déficit **no tiene módulo** y por lo
tanto **no hay recursos que mostrar**: "Mi plan" queda vacío sin ningún error visible.
**Regla:** una degradación silenciosa es peor que un error cuando afecta al valor entregado. Al
agregar topics al banco, actualizar `topic->module-slug` (T-28) y considerar registrar los
`unknown/*` para detectarlos.

---

## Producto

### L-19 · Dos productos en un repositorio diluyen el foco
**Síntoma:** MathAcademy y el funnel de diagnóstico competían por la portada y por el tiempo de
desarrollo.
**Solución:** archivar MathAcademy (`ARCHIVE.md`), dejar el funnel único en `home` y simplificar
`views/pages` a `:home`.
**Regla:** un funnel a la vez. Antes de agregar una segunda experiencia, preguntar qué CTA pierde.

### L-20 · Las promesas del copy son requisitos
**Síntoma:** la FAQ afirma que el tiempo de respuesta influye en la estimación (no lo hace) y que
repetir el diagnóstico muestra cómo se movió el nivel (no hay histórico).
**Regla:** cada afirmación de la landing y del JSON-LD es un requisito verificable. Al escribir copy,
comprobar que el código lo cumple; si no lo cumple, es un ítem de backlog o hay que cambiar el texto
([[OPEN_QUESTIONS]] X-01, X-02).

### L-21 · Acotar las afirmaciones en datos estructurados
**Síntoma:** el JSON-LD declaraba gratuidad de forma amplia, incluyendo implícitamente las clases.
**Solución:** commit `b6ae903` acotó `isAccessibleForFree` al diagnóstico, perfil y plan.
**Regla:** los datos estructurados son públicos, indexados y difíciles de desdecir. Solo afirmar lo
que está decidido.

### L-22 · El mismo texto en tres lugares divergirá
**Causa:** la FAQ vive en `index.html` (JSON-LD), `public/index.html` y `landing.cljs`.
**Regla:** mientras no se resuelva la duplicación (T-12), un cambio de copy se aplica en **los tres
lugares en el mismo commit**.

---

## Proceso y agentes de IA

### L-23 · Graphify no ve el ClojureScript
**Síntoma:** `graphify query "IRT diagnostic test"` y `graphify explain` devuelven "No matching
nodes found", pese a que el motor IRT existe y son ~10 000 líneas.
**Causa:** el manifest solo indexa Markdown, SQL, JSON, HTML, TS/JS y el `app.js` compilado. Ningún
`.cljs`.
**Regla:** el grafo sirve para el esquema de datos y la documentación. Para lógica ClojureScript,
orientarse con [[ARCHITECTURE]] y leer `src/` dirigidamente. **No concluir "no existe" a partir de
un grafo vacío** ([[GRAPHIFY_INTEGRATION_GUIDE]] §6).

### L-24 · El conocimiento en chats de IA se pierde
**Síntoma:** el proyecto dependía de `PROJECT_SUMMARY.md` (parcialmente desactualizado) y de
conversaciones no versionadas. Ninguna sesión nueva podía retomar sin re-descubrir todo.
**Solución:** Project Memory First ([[../adr/ADR-010-adopcion-project-memory-first]]).
**Regla:** lo que no está en Markdown versionado, no existe. Cerrar toda sesión relevante con
`prompts/session-close-memory-update.md`.

### L-25 · La documentación duplicada se contradice
**Síntoma:** `PROJECT_SUMMARY.md` describe una estructura de módulos anterior al MVP (presenta
`jardin`, `voz`, `physics` como parte del producto) que ya no corresponde.
**Regla:** un hecho, un archivo. Los demás documentos lo referencian con `[[ENLACE]]`. Al detectar
una contradicción, registrarla en [[OPEN_QUESTIONS]] en lugar de resolverla en silencio (X-07).

### L-26 · Verificar lo que está en producción antes de afirmarlo
**Síntoma:** el trabajo del MVP vive en `cursor/mvp-operable-funnel`, no necesariamente mergeado a
`main` (la rama que sirve GitHub Pages), y con el bundle sin commitear.
**Regla:** antes de decir "está en producción": `git log main..HEAD`, confirmar que el bundle está
recompilado y commiteado, y revisar el sitio real ([[BACKLOG]] T-19).

### L-27 · Correr los tests es barato; no correrlos, caro
**Dato:** la suite completa (34 tests / 133 assertions) corre en un solo comando y cubre justamente
las reglas que más duelen si se rompen (IRT, bandas, filtros de cupos).
**Regla:** `clj -M:test` antes de cada commit. Sin CI, ese comando **es** la red de seguridad
([[RISKS]] R-04).

### L-28 · `brew cleanup` automático puede desinstalar dependencias en uso
**Síntoma:** tras `brew install rtk`, `clj -M:test` empezó a fallar con
`Please install rlwrap for command editing or use "clojure" instead.`
**Causa:** Homebrew corre `brew cleanup` tras cada instalación y "autoremueve" fórmulas que cree sin
uso por falta de dependientes declarados; `rlwrap` no tenía ningún paquete de Homebrew que lo
listara como dependencia (lo usa `clj`, un script fuera del control de versiones de Homebrew), así
que lo marcó como huérfano y lo borró.
**Regla:** después de cualquier `brew install`/`brew cleanup`, correr `clj -M:test` (o el comando
más sensible a herramientas de línea de comandos) antes de seguir. Ver [[RTK_INTEGRATION_GUIDE]] §6.

### L-29 · Un filtro de compresión de salida no debe truncar por conteo de líneas si la señal está al final
**Síntoma:** el primer filtro `.rtk/filters.toml` para `clj -M:test` (con `max_lines = 60`) ocultaba
la línea de resultado (`Ran N tests… / N failures, N errors.`) porque esa línea aparece al **final**
de la salida cruda y el corte por conteo de líneas actúa desde el principio.
**Causa:** un tope de líneas es ciego al *dónde* está la señal; solo sirve cuando la señal está al
principio o distribuida uniformemente.
**Regla:** al configurar un filtro de salida (rtk u otro), preferir recortar el **ruido identificado**
(patrones conocidos) por sobre truncar por posición/tamaño, salvo que se haya verificado dónde cae
la señal. Verificar siempre el resultado filtrado contra una corrida real antes de confiar en el
ahorro reportado. Detalle: [[RTK_INTEGRATION_GUIDE]] §4.

### L-30 · Un `shadow-cljs watch`/`tailwind --watch` en background ensucia `git checkout`/`merge`
**Síntoma:** al hacer `git checkout main` y luego `git merge --ff-only visual-fixes` para publicar
T-03/T-35, `public/js/app.js` y `public/css/app.css` aparecían "modificados" en `git status`
segundos después de un checkout limpio, y un `git merge --ff-only` llegó a abortar con
"Your local changes... would be overwritten by merge".
**Causa:** procesos `shadow-cljs watch app` y `tailwindcss --watch` corriendo en background (fuera
del control de esta sesión) detectan que `git checkout`/`merge` cambió archivos `.cljs`/CSS fuente
y recompilan automáticamente — pero producen un **build de desarrollo sin minificar** (~8,5 MB,
muy distinto en tamaño y contenido al build de release que sí debe commitearse, ver
[[../adr/ADR-003-github-pages-artefacto-versionado]]), no el `release` que exige el proyecto.
**Regla:** antes de cualquier commit o merge que toque `public/js/app.js`/`public/css/app.css`,
correr `git status` inmediatamente antes del commit (no solo al principio); si aparecen sucios sin
que uno mismo haya editado el fuente, es el watcher — `git restore public/css/app.css
public/js/app.js` para volver al build de release ya commiteado antes de continuar. No asumir que
un `git status` limpio sigue siéndolo unos comandos después si hay watchers activos. Ver
[[BACKLOG]] T-08.

### L-31 · `INSERT ... RETURNING` bajo RLS revierte todo el insert si falta la policy SELECT
**Síntoma:** `visitor` dejó de recibir filas desde 2026-07-19, en silencio (sin ningún cambio de
código ni de policy visible como causa directa). El único rastro era un `console.error` que nadie
mira en producción.
**Causa:** `db/insert-data-table!` (default `returning? true`) ejecuta `.insert(...).select("*")
.single()`, que PostgREST traduce a una única sentencia `INSERT ... RETURNING *`. Bajo RLS, el
`RETURNING` está sujeto a la policy **SELECT** de la tabla — si no hay ninguna (como en `visitor`,
que solo tenía policy de `INSERT`), Postgres no solo omite la fila del resultado: **revierte la
sentencia completa**, con el mismo código de error (`42501`) que una policy de INSERT mal
configurada. El mensaje ("new row violates row-level security policy") es indistinguible entre
ambas causas sin probarlo directamente en SQL.
**Cómo se diagnosticó:** reproducir el mismo patrón exacto del cliente
(`insert ... returning *` como el rol que usa la app) directamente en el SQL Editor — un
`insert` simple sin `returning` funcionaba bien, aislando el problema al `RETURNING`, no al
`INSERT` en sí.
**Regla:** cualquier tabla que reciba escrituras de `anon`/`authenticated` vía `insert-data-table!`
con el default (`returning? true`) **necesita una policy SELECT** que cubra esa fila, o hay que
pasar `{:returning? false}` explícitamente (como ya hace `guestbook`). Si además se necesita el
`id` generado de vuelta (p. ej. como FK, como pasa con `visitor.id` → `guestbook.visitor_id`) y la
tabla guarda datos que no deberían quedar expuestos por SELECT abierto, usar una función `security
definer` que inserte y devuelva solo lo necesario (ver `014_visitor_track_rpc.sql`) en vez de abrir
una policy SELECT amplia. El docstring de `insert-data-table!` ya advertía de esto desde `7d1d307`
(2026-07-19) — la advertencia estaba escrita, pero `visitor_tracker.cljs` no se actualizó cuando
esa función cambió de comportamiento.
**Recurrencia (2026-07-31):** el mismo bug apareció en `events/contacto.cljs` (`contacto`), reportado
por el owner al probar el formulario del footer. Auditados todos los llamadores de
`insert-data-table!`: `guestbook`, `notifications` y `tests` ya pasaban `{:returning? false}`;
`contacto` no. El único otro caso roto es `supabase_test.cljs` (código muerto, sin ruta — T-23), sin
impacto real. **Corolario:** cuando se agregue una tabla nueva o se toque `insert-data-table!` de
nuevo, auditar TODOS sus llamadores (`grep insert-data-table!`), no solo el que motivó el cambio.

### L-32 · Un `defn` de ClojureScript que llama a otro definido más abajo compila con warning, no error
**Síntoma:** al agregar `fetch-admin-guestbook` en `crud.cljs` y `visitor-context-label` en
`admin.cljs`, `clj -M:test` (build `:test`, distinto de `:app`) seguía en verde — el problema solo
apareció al levantar `shadow-cljs watch app` para el build `:app` y mirar el log: warning
`:undeclared-var` (`Use of undeclared Var .../visitor-context-label`), porque la función se llamaba
desde otra definida **antes** en el mismo archivo.
**Causa:** ClojureScript compila top-a-abajo; una `defn` que referencia un var declarado más abajo
en el mismo namespace compila igual (es solo un warning, no aborta el build) pero falla en
**runtime** al invocarse — y el build de `:test` no necesariamente ejercita ese código path, así
que los tests pueden quedar en verde con un bug real sin detectar.
**Regla:** después de editar `.cljs`, no confiar solo en `clj -M:test` — revisar también la salida
de `shadow-cljs release app` (o `watch app`) buscando `WARNING #N` antes de dar el cambio por
terminado; `0 warnings` en esa salida es la señal real de que no hay funciones fuera de orden.
Definir funciones auxiliares nuevas cerca del principio del archivo (junto a otras utilidades como
`format-date-time`), no justo antes de donde se usan por primera vez.

### L-33 · Un `/` dentro de la sintaxis abreviada de clases con puntos rompe el keyword de Clojure
**Síntoma:** clases con modificador de opacidad de Tailwind (`text-indigo-100/70`) escritas como
`:p.text-sm.text-indigo-100/70` no se aplicaban — Reagent no lanzaba error, simplemente el elemento
no tenía la clase esperada.
**Causa:** en un keyword de Clojure, `/` separa namespace de nombre (`:ns/name`). El lector procesa
`:p.text-sm.text-indigo-100/70` como un keyword namespaced **antes** de que Reagent vea el string
para parsear tag/clases — `(name kw)` devuelve solo `"70"`, y todo lo anterior al `/` se pierde en
silencio (namespace ignorado). No hay excepción; el bug es puramente visual.
**Regla:** cualquier clase de Tailwind con `/` (modificadores de opacidad `bg-black/50`,
`text-white/70`, fracciones `w-1/2`, etc.) **no puede ir en la sintaxis abreviada** `:div.clase`;
tiene que ir en un mapa `{:class "..."}` explícito, junto con el resto de las clases del elemento si
hace falta. Verificar visualmente (screenshot) cualquier clase nueva con `/`, ya que el compilador
no la va a señalar.

### L-34 · Un `$` suelto en texto plano (ej. montos en pesos) puede dejar "Mi plan" en blanco
**Síntoma (2026-08-03):** al entrar a "Mi plan" (visible como admin, `resources_select_published`
permite `published = true or is_admin()`), la pantalla se ponía completamente en blanco, sin ningún
mensaje de error visible.
**Causa:** `math-render/split-by-latex-improved` (`components/math_render.cljs`) busca el carácter
`$` para abrir/cerrar bloques de matemática **sin saber que puede venir escapado** (`\$`, el escape
estándar de LaTeX para un peso literal). Contenido con un monto como `\$8.000` en texto plano hacía
que el parser interpretara ese `$` como el inicio (o cierre) de un bloque matemático, arrastrando
párrafos enteros como si fueran LaTeX. Cuando la cadena resultante era inválida para KaTeX (ej.
terminaba en una barra invertida suelta), `render-latex-math` reventaba: `throwOnError: false` hace
que KaTeX devuelva un `<span class="katex-error">` **sin** el nodo `.katex-mathml` que la función
esperaba, y `(.-outerHTML mathml-part)` sobre un `querySelector` que dio `nil` lanzaba una
excepción de JS sin capturar. Sin error boundary en React, eso vacía **todo** el árbol de la app,
no solo el recurso con el problema.
**Cómo se diagnosticó:** se extrajo el `body` real (ya des-escapado) de los 39 recursos nuevos de
`018`/`019`, se corrió el parser + KaTeX real (Node, con el `katex` de `node_modules`) fuera del
navegador, y se confirmó qué fragmentos producían `katex-error` sin `.katex-mathml` — dos recursos
lo reproducían exactamente.
**Solución (doble, defensa en profundidad):**
1. `split-by-latex-improved` ahora reconoce `\$` como peso literal (nunca abre/cierra matemática),
   consistente con la convención de LaTeX.
2. `render-latex-math` ya no asume que `.katex-mathml` existe: si KaTeX no pudo parsear la
   expresión, se muestra el HTML de error de KaTeX en vez de lanzar una excepción -- **un error de
   LaTeX no debe poder dejar la página en blanco**, sin importar de dónde venga el contenido
   inválido.
**Regla:** cualquier contenido con montos en pesos (`error_*`, `resources.body`, o cualquier campo
que pase por `math/latex`) debe escapar el signo peso como `\$`, nunca escribirlo suelto. Y
`render-latex-math` es el lugar correcto para blindar contra *cualquier* LaTeX inválido -- no hay
forma de garantizar que todo el contenido futuro (incluido el que escriba el profesor a mano desde
Admin → Recursos) esté siempre bien formado.

---

Relacionado: [[AGENT_INSTRUCTIONS]] · [[RISKS]] · [[DECISIONS]] · [[OPEN_QUESTIONS]] · [[TECH_STACK]]
