# LESSONS_LEARNED

Última actualización: **2026-08-28** — **L-52 y L-53 nuevas** (la explicación obvia de un sesgo puede ser falsa tres veces seguidas y solo la medición lo dice; un test que compara dos configuraciones puede estar midiendo la salvaguarda en vez de la configuración). · Antes: **2026-08-24** — **L-50 y L-51 nuevas** (un auditor mide lo que le declararon, no lo que pertenece al sistema; una utilidad de Tailwind que no se genera falla en silencio). · Antes: **2026-08-23 (segunda pasada)** — **L-49 nueva** (un formulario devuelve `""` donde la base tenía `null`: sin coercionar antes de comparar, «guardar sin cambios» escribe). · Antes: **2026-08-23** — **L-47 y L-48 nuevas** (un auditor de paleta no ve el fondo heredado; un glifo ausente en la fuente se sustituye en silencio). · Antes: **2026-08-17** (**L-42**, un proveedor OAuth **crea cuentas también en la
ruta de login** — el gate legal no va donde está el formulario sino donde nace la cuenta; y
**L-43**, si Google Cloud te pide datos tributarios para configurar OAuth, te desviaste de camino.
Antes ese mismo día: **L-41**, una copia que nadie mira diverge — la pregunta útil
no es cómo acordarse de sincronizar sino a qué archivo apunta quien la mira; **L-22 reescrita**:
el número de lugares del copy no se recuerda, se mide — al aplicarle su propia regla resultó que
no hay un número único, depende de qué copy. Antes, 2026-08-16, 6ª pasada: **L-40**, el DOM que devuelve `javascript_tool`
puede estar desactualizado — la captura de pantalla y `location` sí son fiables. 4ª pasada: **L-39**, un piloto sin encuadre comercial produce datos y no clientes — la lección del piloto UNAP; y **L-22 corregida**: el copy estaba en cinco lugares, no tres. 3ª pasada: **L-38**, mirar la forma del mercado antes de proponer un modelo de ingreso — churn 100% anual, D-52) — **L-36 y L-37**, las dos más caras del proyecto y ambas
detectadas por el owner: el funnel estaba construido para el canal que nunca funcionó, y se
automatizó la formación de cohortes para una demanda que nunca llegó. Antes: 2026-08-12 (cuatro
lecciones de la sesión del eje de fluidez: datos preexistentes, UI que se esconde sola, predecir
sobre la memoria del usuario, verificación visual de ramas no publicadas)

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

## CSS y Tailwind

### L-35 · Retrofit de tema oscuro: mapear clases existentes en CSS, no anotar `dark:` por elemento — y los `<input>` no tienen fondo propio
**Síntoma:** cubrir un tema oscuro completo pareciendo requerir cientos de ediciones de `dark:clase`
repartidas en ~15 componentes (uno de 1172 líneas); y, ya con el mapeo global aplicado, los campos
de formulario (`login.cljs`, `cuenta.cljs`, `guestbook.cljs`, `admin.cljs`…) seguían viéndose
blancos sobre fondo oscuro pese a que el resto de la pantalla ya se veía bien.
**Causa:** (1) el vocabulario de color de la app es consistente (grises/slate para superficies y
texto, índigo como acento, rojo/verde/ámbar/azul para alertas, siempre en el mismo patrón fondo
claro + texto saturado + borde claro) — eso hace viable sobrescribir por **nombre de clase** en vez
de por elemento. (2) los `<input>`/`<textarea>`/`<select>` de texto de la app nunca tuvieron una
clase `bg-*` propia: su fondo blanco venía del estilo por defecto del navegador, no de Tailwind, así
que ninguna regla que remapee `.bg-white` los alcanza — hay que apuntar directo al selector de tipo
de elemento (`input[type="email"]`, etc.), excluyendo checkbox/radio a propósito.
**Regla:** para un retrofit de tema oscuro sobre una app grande con vocabulario de color consistente,
preferir remapear `.dark .clase-existente { … }` en un CSS central (gana por especificidad sobre la
`.clase` de Tailwind, sin `!important` ni orden especial) en vez de anotar `dark:` en cada elemento.
Al hacerlo, no olvidar los elementos de formulario sin clase de fondo explícita — grep
`:input {\|:textarea {\|:select {` en los componentes para encontrarlos todos de una vez. Decisión
completa (incluidas las excepciones que sí llevan `dark:` directo) en
[[../adr/ADR-012-tema-oscuro-mapeo-css-global]].

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

### L-42 · Un proveedor OAuth crea cuentas **también** en la ruta de login

**2026-08-17, al conectar el login con Google (T-92).**

`/ingresar` y `/registrarse` existen como rutas separadas justamente porque hacen cosas distintas:
una autentica a quien ya existe, la otra crea a alguien nuevo. Por eso la declaración de edad de
D-21 vivía **solo** en `/registrarse`, dentro del `<form>`.

Un botón de "Continuar con Google" rompe esa separación sin avisar: **Supabase da de alta al usuario
que entra por OAuth y todavía no existe**, así que el botón crea cuentas desde cualquier ruta donde
se lo ponga. Un botón social en `/ingresar` es una vía de registro disfrazada de login.

Puesto donde lo pone cualquier tutorial —al lado del formulario, debajo del submit— el resultado es
que la mitad de las altas nuevas nunca ven la declaración. Sobre un público mayoritariamente menor
de edad y con la Ley 21.719 encima, eso no es deuda de UX.

> **La regla general, que sirve más allá de OAuth:** un gate legal no se coloca donde está el
> formulario, se coloca **donde nace la cuenta**. Si un camino nuevo puede crear un usuario, hereda
> todas las condiciones del alta, aunque entre por la puerta que decía "iniciar sesión".

Aplicado en [[../adr/ADR-028-toda-entrada-social-pasa-por-d-21]] (D-56). Vale igual para Apple,
Microsoft o Google Workspace cuando se agreguen.

### L-44 · Coercionar un id `uuid` con `parseInt` no falla ruidosamente: devuelve un número plausible o `null`

**Síntoma (2026-08-18):** ninguno visible. Ese es el punto. `question-payload` (`db.crud`) convertía
`:module_id` con `js/parseInt` desde antes de que existiera este registro, y nadie lo notó.

**Causa:** `modules.id` es `uuid` desde `001`, pero el código lo trataba como entero. `parseInt`
sobre un uuid **no devuelve `NaN` de forma confiable**: devuelve los dígitos iniciales si el uuid
empieza por dígito (`"8f14e45f-…"` → `8`) y `NaN` si empieza por letra. Y `NaN` no viaja como error:
`clj->js` + la serialización JSON lo mandan como `null`. O sea que el mismo bug tiene **dos**
desenlaces según el uuid que toque — el guardado revienta contra la columna uuid, o el módulo se
borra en silencio.

**Por qué sobrevivió tanto:** no lo tapó la falta de tests, lo tapó **la falta de un consumidor que
mirara el resultado**. Nadie revisa el `module_id` de un ítem después de guardarlo, y el síntoma —un
ítem sin módulo— es indistinguible del estado normal de un tercio del banco (T-60). Un fallo cuyo
resultado se confunde con el estado esperado no se reporta nunca.

**Regla:** un id que en la base es `uuid` viaja como **string, sin parsear**, y lo único que se
normaliza es el vacío (`""`, `"null"` → `nil`). En este repo eso es `crud/uuid-or-nil`, y se usa en
las dos rutas que mandan uuid (`question-payload` y `misconception-payload`). Corolario general:
antes de escribir una coerción numérica sobre un campo que viene de la base, **mirar el tipo en la
migración**, no la forma del valor en el formulario.

**Dónde:** `src/universo/db/crud.cljs`, commit `3e0ef20`. Ver [[BACKLOG]] T-60, `sessions/SESSION-032.md`.

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

### L-36 · El funnel estaba construido para el canal que nunca funcionó
**Fecha:** 2026-08-16. **Detectada por el owner**, revisando el producto tras el pivote (ADR-025).

**Síntoma:** el proyecto tiene landing, SEO, JSON-LD, sitemap, registro con email+contraseña,
cupos, `min_enrollments`, triggers de confirmación y cola de correo — toda una máquina para captar
al **estudiante solitario y automotivado que llega por Google**. De la landing no ha llegado
prácticamente nadie.

**Causa, y es el dato que lo prueba:** los **252 diagnósticos** rendidos —los únicos usuarios
reales en 16 años de proyecto— son casi todos `@estudiantesunap.cl`, del piloto UNAP de oct–nov
2025. Llegaron porque **una institución puso el producto frente a una audiencia cautiva**. Ese dato
estaba en [[CURRENT_STATUS]] desde el 2026-08-09, anotado como "hallazgo colateral", y nadie
extrajo su consecuencia: *el único canal que funcionó jamás no tiene funnel, y el funnel que existe
sirve a un canal que nunca produjo un usuario.*

**Agravante de diseño:** el funnel actual pide **máximo compromiso antes de entregar valor** —
crear cuenta, luego 20 minutos de matemática sin calculadora— y la recompensa por ese esfuerzo es
**un inventario de los propios déficits**, seguido a veces de una pantalla de cupos vacía. Cada
flecha es una fuga y las tres primeras son severas.

**Regla:** antes de optimizar un funnel, verificar **por dónde llegaron de verdad los usuarios que
existieron**, no por dónde se diseñó que llegaran. Si el canal real es institucional, el funnel
correcto no tiene registro, no dura 20 minutos, y su pantalla de recompensa **es la del profesor,
no la del estudiante**.

**Relacionado:** [[RISKS]] R-31, [[BUSINESS_CONTEXT]] §4.2, [[BACKLOG]] T-90/T-91, [[OPEN_QUESTIONS]] Q-37.

### L-37 · Se construyó maquinaria de cohortes para una demanda que nunca llegó
**Fecha:** 2026-08-16.

**Síntoma:** `class_slots` con `capacity` y `min_enrollments`, trigger de confirmación automática,
trigger de control de capacidad (`011`), `notifications`, `email_outbox`, Edge Function con Resend,
cron cada 5 min, trigger de aviso de cancelación (`012`), preferencia de canal de contacto (`013`).
Todo escrito, aplicado, verificado end-to-end en producción — y **cero cupos han confirmado nunca**,
porque nunca hubo tres estudiantes inscritos. Ver [[RISKS]] R-11, activado desde 2026-08-09.

**Causa:** el sistema resuelve un problema de **escala** (cómo confirmar grupos automáticamente
cuando hay muchos) construido en un momento de **cero demanda**. Es correcto, elegante y prematuro.
El mismo trabajo hecho a mano —el owner mirando una lista y escribiendo un correo— habría bastado
para los primeros cincuenta estudiantes y habría costado dos órdenes de magnitud menos.

**El patrón mayor del que esto es un caso:** tres intentos históricos, los tres muertos en
distribución, y en los tres la respuesta fue **construir más producto**. En esta vuelta: los cupos,
el eje de fluidez, la identidad Braun, el panel de instrumento. Todo bien hecho; nada de eso era el
cuello de botella. Es exactamente [[RISKS]] R-30.

**Regla:** antes de automatizar un proceso, contar cuántas veces ocurrió. **Si ocurrió cero veces,
la automatización no es infraestructura: es postergación disfrazada de trabajo.** Hacerlo a mano
hasta que duela es la señal correcta para automatizar.

**Matiz honesto:** esto **no** es un argumento para borrar los cupos. Están construidos, funcionan y
no molestan. Es un argumento sobre **qué se construye después**.

### L-38 · Antes de proponer un modelo de ingreso, mirar la forma del mercado
**Fecha:** 2026-08-16. Registrada **para que no se vuelva a proponer**, que es su único propósito.

**Síntoma:** vuelve periódicamente la idea de un producto que escale sin las horas del profesor y se
monetice por **volumen** — publicidad, freemium masivo, contenido por tráfico. Es una intuición
sana (el acoplamiento ingreso ↔ horas **sí** es el problema, G-3) atornillada al mecanismo
equivocado.

**Causa:** el mercado PAES son ~250.000 personas al año que **se renuevan íntegramente cada
temporada** — el estudiante rinde y se va. **Churn del 100 % anual, por construcción.** Los modelos
por volumen viven de retención compuesta; acá no existe. Nunca va a existir, por mucho producto que
se agregue.

**Regla:** antes de evaluar cualquier modelo de ingreso nuevo, responder dos preguntas en este
orden: **(1) ¿el cliente vuelve el año que viene?** y **(2) ¿cuánta gente hay en total?** Si el
churn es 100 % y el mercado es finito, cualquier modelo por volumen se cae por aritmética antes de
llegar a la discusión de producto. **El estudiante se va; el colegio permanece.**

**Regla derivada, más general:** cuando aparezca una idea de monetización, calcular primero **cuánto
mercado se necesita**, no cuánto producto. Si el número supera el mercado total, la conversación
sobre features es irrelevante.

**Dónde está la aritmética completa:** [[TESIS_DE_CRECIMIENTO]] §3.1. **Decisión:** D-52.
**Hecho estructural:** [[BUSINESS_CONTEXT]] §1.1.

### L-39 · Un piloto sin encuadre comercial produce datos, no clientes
**Fecha:** 2026-08-16. Extraída del propio historial del proyecto, no de una hipótesis.

**Síntoma:** el piloto UNAP (oct–nov 2025) produjo **252 diagnósticos de estudiantes reales** — los
únicos usuarios en 16 años de proyecto — y **cero ingresos recurrentes**. Terminó el convenio y
terminó todo: quedaron los datos y no quedó un cliente.

**Causa:** estaba encuadrado como **convenio de desarrollo** —le pagaron al owner por *construir*—
y no como **venta de un producto**. Un convenio de desarrollo termina; una licencia se renueva. Y en
2012, con el Estado venezolano, pasó lo mismo: acceso sin conversión.

**El cuello nunca fue conseguir la puerta.** Fue que cruzarla no dejaba un cliente que renovara.
Eso importa especialmente ahora que hay **tres canales disponibles** (liceo, Cpech, UNAP) y la
tentación de repetir el patrón es máxima: son relaciones personales, y con relaciones personales es
natural decir *"te lo presto para que lo pruebes"*.

**Regla:** **encuadre comercial desde el minuto uno, aunque el piloto sea gratis.** *"Te lo presto
para probar"* produce datos. *"Te lo presto para probar, y si funciona conversamos de una licencia
en marzo"* produce un cliente. **Es la misma hora de trabajo y dos desenlaces distintos.** Todo
piloto debe nombrar, antes de empezar: qué se mide, cuándo se revisa, y qué pasa después si funciona.

**Relacionado:** [[RISKS]] R-32, [[BACKLOG]] T-87/T-90/T-93, [[TESIS_DE_CRECIMIENTO]] G-1.

### L-40 · El DOM que devuelve `javascript_tool` puede estar desactualizado; la captura de pantalla no
**Fecha:** 2026-08-16 (T-05, SESSION-027). Costó cerca de una hora.

**Síntoma:** verificando el router en Chrome, `document.querySelector('main h1').textContent` y
`querySelectorAll('button')` describían la **landing** en una URL que ya era `/ingresar`, con la nav
en su estado "sesión no lista". Sobre esa lectura se construyó una teoría entera de un bug en el
orden de los eventos de re-frame: que `:complete-navigation` escribía la URL pero no la sección, lo
cual es **imposible** en re-frame (el efecto `:db` se aplica antes que los demás, por diseño).

**Causa:** la lectura del DOM llegaba de un snapshot viejo de la página. Las lecturas que **sí**
eran fiables en la misma llamada: `location.pathname`, `history.length`,
`performance.getEntriesByType('navigation')`, el estado leído de un átomo de la aplicación, y sobre
todo la **captura de pantalla**, que mostró desde el principio el formulario de login correcto.

**Cómo se resolvió:** exportando temporalmente `universo.core/dbg` (un `^:export` que imprime
`:ui`, `:router` y `:auth` desde `re-frame.db/app-db`), recompilando, mirando el estado real —que
era el correcto desde el primer intento— y **quitando el export antes de commitear**.

**Reglas:**
1. Cuando la lectura del DOM contradiga una invariante conocida del framework, **sospechar de la
   lectura antes que del framework**. Contrastar con una captura de pantalla, que es barata.
2. Para depurar estado de re-frame en un bundle de `release`, el camino corto es un `^:export`
   temporal sobre `re-frame.db/app-db`. Es minutos, no horas — y hay que acordarse de sacarlo y
   recompilar (`grep` del nombre en `public/js/app.js` lo confirma).

**Relacionado:** [[../adr/ADR-026-router-de-url-con-history-api]], [[BACKLOG]] T-05, L-30.

### L-41 · Una copia que nadie mira diverge; revisa a qué archivo apunta el que la mira
**Fecha:** 2026-08-17 (T-12, ADR-027).

**Síntoma:** `index.html` y `public/index.html` eran copias, con la regla de sincronizarlas escrita
y vigente en `CLAUDE.md` §9. Aun así el `<noscript>` de la copia se quedó atrás —le faltaban dos
párrafos, uno de ellos el que nombra a la UNEXPO— y **nadie lo notó durante meses**.

**Causa, que no es "se nos olvidó":** el servidor de desarrollo servía `public/index.html` y **nunca**
el archivo que se publica. El mecanismo que en teoría detecta una divergencia —usar el producto en
local— estaba apuntando al archivo equivocado. El original solo se miraba en producción, es decir,
**después** de publicarlo. Con esa asimetría, la copia podía envejecer indefinidamente sin señal.

**Regla:** cuando algo esté duplicado a la fuerza, la pregunta útil no es *"¿cómo me acuerdo de
sincronizar?"* —esa regla ya existía y falló— sino **"¿cuál de las copias mira alguien, y con qué
frecuencia?"**. Si la respuesta es "la que no se publica", la divergencia es cuestión de tiempo.
Dos salidas, en este orden: **eliminar la copia** (ADR-027 apuntó dev a la raíz, así que en local se
ve el archivo real), y si es irreducible —`index.html` / `404.html` difieren a propósito—
**versionar la comprobación** en vez de repetir la convención (`scripts/audit_html.py`).

**Corolario, de L-29:** un audit que no encuentra nada es indistinguible de uno que no funciona.
`audit_html.py` se probó rompiendo el archivo de cuatro formas distintas antes de creerle.

**Relacionado:** [[../adr/ADR-027-un-solo-index-html]], L-22, L-29, [[ARCHITECTURE]] §10-bis.

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

### L-22 · El mismo texto en varios lugares divergirá — y el número de lugares **no se recuerda, se mide**
**Causa:** la FAQ vive en `index.html` (JSON-LD), `public/index.html` y `landing.cljs`.
**Corrección del 2026-08-16:** al ejecutar D-53 resultó que la afirmación de origen estaba en
**cinco** lugares, no tres: `index.html` (JSON-LD **y** bloque `noscript`), `public/index.html`
(JSON-LD), `landing.cljs` (FAQ) y **`home.cljs` (footer)** — este último no figuraba en ninguna
nota. La memoria repitió "los tres lugares" durante semanas sin que nadie lo verificara.
**Actualización del 2026-08-17 (T-12 / ADR-027), y el número era la parte equivocada de la
lección.** Al eliminar `public/index.html` se escribió "ahora son cuatro" y, al aplicar la propia
regla de esta lección —re-verificar con `grep`—, resultó falso: **no hay un número único, depende de
qué copy.** Medido:

| Copy | Dónde vive |
|---|---|
| FAQ | `index.html` (JSON-LD `FAQPage`) + `landing.cljs` |
| Origen del proyecto | `index.html` (`<noscript>`) + `home.cljs` (footer) |
| Descripción / meta / Open Graph | `index.html` (`<head>`) + `landing.cljs` |

El JSON-LD **no** lleva la frase de origen y `landing.cljs` **tampoco** — contra lo que decían las
dos versiones anteriores de esta nota.

**Regla:** un cambio de copy se aplica en todos sus lugares **en el mismo commit**, y **la lista se
re-verifica con `grep` cada vez**. No confiar en el número que dice la memoria: ya estuvo mal dos
veces (dijo tres cuando eran cinco; dijo cuatro cuando la pregunta estaba mal planteada) y cambia
cada vez que se toca la estructura de archivos. Comprobación de cierre:
`grep -rn "<frase vieja>" index.html 404.html src/` debe devolver cero.
**Ojo con los falsos positivos:** `resume.cljs` también menciona a la UNAP, pero ahí es **experiencia
docente real** y no se toca. No todo lo que hace match es el mismo hecho.

---

### L-43 · Si Google Cloud pide datos tributarios para configurar OAuth, te desviaste de camino

**2026-08-17, durante T-92.** Configurando el proveedor de Google, el owner terminó en un formulario
de **información fiscal de Chile** (estado tributario, exención de Impuesto Adicional, si está
inscrito como contribuyente de IVA) con la advertencia *"después de este paso, no podrás realizar
cambios"*.

**Ese formulario no tiene nada que ver con OAuth.** Es de Google Payments y aparece al crear una
**cuenta de facturación**. Nada de lo que necesita un login social es facturable:

| Paso | ¿Requiere facturación? |
|---|---|
| Crear el proyecto | No |
| Pantalla de consentimiento | No |
| Credenciales OAuth 2.0 | No |
| Publicar la app con scopes básicos (`email`, `profile`, `openid`) | No |

Se llega ahí por un banner de "activar cuenta" o del trial gratuito, no por el flujo correcto
(*APIs y servicios → Pantalla de consentimiento → Credenciales*).

**Por qué vale la pena tenerlo escrito:** era un paso **irreversible** con consecuencias
tributarias reales, a punto de completarse por inercia, para obtener algo que es gratis. La señal de
alarma es barata de recordar: *si te piden datos de facturación para algo que sabes que cuesta $0,
párate y vuelve atrás en vez de rellenar el formulario.*

**Regla adicional para el agente:** las respuestas de un formulario tributario dependen de la
situación real de la persona, no del proyecto. Se explica **qué es** el formulario y **por qué
probablemente no hace falta**; no se sugiere qué marcar.

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
**Dato:** la suite completa (58 tests / 332 assertions al 2026-08-10) corre en un solo comando y cubre justamente
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
**Recurrencia (2026-08-03, GitHub Actions):** el mismo mensaje exacto apareció en el primer run real
de `.github/workflows/test.yml` (T-06) -- ahí la causa no es Homebrew, es que el runner de GitHub
nunca tuvo `rlwrap` instalado. Mismo síntoma, causa distinta (entorno que nunca tuvo la dependencia,
no una que se la sacaron). Solución en CI: usar `clojure -M:test` en vez de `clj -M:test` -- `clojure`
es el mismo CLI sin la capa de `rlwrap`, y no la necesita para uso no interactivo. **Regla ampliada:**
en cualquier entorno no interactivo (CI, scripts), preferir `clojure` sobre `clj` directamente, en vez
de depender de que `rlwrap` esté instalado.

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

## Un `left join` por slug al sembrar contenido falla en silencio

**Fecha:** 2026-08-11 (SESSION-019, migraciones `033`–`040`)

**Qué pasó:** el patrón cómodo para sembrar contenido relacionado es un CTE con `values` y un
`left join` que resuelve las FK por slug legible:

```sql
left join public.misconceptions xa on xa.slug = i.mis_a
```

La primera corrida de `035` insertó los 36 ítems sin una sola queja. **Seis de los slugs
referenciados no existían** en el catálogo de `034`: el `left join` los resolvió como `null` y la
columna quedó vacía. Ningún error, ninguna advertencia, ninguna fila rechazada — exactamente el
mismo modo de fallo que [[../adr/ADR-017-topic-canonico-por-trigger]] describe para los topics
duplicados por acento.

**Por qué no se usa `join` a secas:** porque entonces la fila entera desaparece del insert. Se
perdería el ítem completo por un slug mal escrito en **un** distractor, que es peor.

**Regla:** después de cualquier siembra de contenido con FK resueltas por slug, correr el **control
cruzado** — los slugs referenciados en el archivo contra los que existen en la tabla:

```bash
grep -ho '\$qm\$mq/[a-z0-9/-]*\$qm\$' supabase/migrations/03[5-8]*.sql \
  | sed 's/\$qm\$//g' | sort -u > /tmp/refs.txt
psql -tAc "select slug from public.misconceptions order by 1" > /tmp/cat.txt
comm -23 /tmp/refs.txt /tmp/cat.txt   # referenciados pero inexistentes -> debe estar vacío
```

Y dejar la versión SQL del control en la batería de verificación de la migración, para que no
dependa de que alguien se acuerde. La de `040` incluye además el chequeo espejo (entradas del
catálogo que nadie usa), que detecta el error inverso: un slug que se escribió bien en el catálogo
y mal en el ítem aparece en **las dos** listas.

**Generalización:** todo `left join` que resuelve una referencia opcional convierte "no encontré
esto" en "esto no estaba especificado". Cuando esas dos cosas significan algo distinto —y acá lo
significan: `null` es "sin catalogar a propósito"— el join no puede ser la única verificación.

## Una funcionalidad nueva no existe para los datos que ya estaban

**Fecha:** 2026-08-12 (SESSION-021, ADR-019)

**Qué pasó:** el eje de fluidez se implementó, se testeó (14 tests nuevos, todos verdes) y se
publicó. Al abrir «Mi plan» con una cuenta real **no se veía nada**. El motivo no era un bug: el
eje se escribía al *construir* el perfil, y todos los perfiles guardados eran anteriores. La
funcionalidad estaba perfecta para estudiantes que todavía no existían.

**Regla:** al agregar un campo derivado al perfil (o a cualquier entidad materializada), decidir
**explícitamente** qué pasa con las filas ya guardadas — backfill, recálculo al vuelo, o "solo
desde ahora, y se dice". Ninguna de las tres es incorrecta; no elegir sí lo es. Acá se eligió
recalcular en el cliente desde `tests`, que ya tenía los datos crudos (D-44).

## Una funcionalidad que se esconde sola es peor que no tenerla

**Fecha:** 2026-08-12 (SESSION-021)

**Qué pasó:** `fluency/min-responses = 4` hace que con menos evidencia no se asigne banda — correcto
como estadística. Pero la UI traducía "sin banda" a "no renderizar la tarjeta", así que el
estudiante al que peor le fue (3 correctas de 10) **no veía que el eje existiera**, ni por qué.

**Regla:** un umbral de datos insuficientes es un **estado de la UI**, no una condición de
renderizado. Mostrar "todavía no alcanza: tenés 3 respuestas, hacen falta 4" cuesta lo mismo que
ocultar y no deja al usuario creyendo que la funcionalidad no existe. Mismo espíritu que L-18 (un
topic sin mapeo se degrada, no falla).

## No predecir sobre lo que el usuario recuerda cuando la base tiene el número exacto

**Fecha:** 2026-08-12 (SESSION-021)

**Qué pasó:** dos veces en la misma sesión. (1) El agente predijo "vas a ver el estado insuficiente,
tenés 3 correctas" a partir de lo que el owner recordaba de su test; los datos daban **8 respuestas
usables** y la tarjeta mostró banda `:fluida`. (2) Una fila con 15 respuestas contra `max_items = 12`
se escaló a "posible bug de la regla de parada": el owner había subido `max_items` desde el panel.

**Regla:** antes de anunciar un resultado o declarar un bug, preguntar por la **configuración** y
mirar el dato, no la memoria de nadie. Una anomalía numérica tiene casi siempre una explicación de
configuración antes que una de lógica.

## Verificar UI de una rama no publicada exige mirar el servidor local, no producción

**Fecha:** 2026-08-12 (SESSION-021)

**Qué pasó:** cinco intentos de verificación visual fallidos. El owner miraba `jacobocordova.com`
—producción, servida desde `main`, que en ese momento **no** tenía el eje— mientras el agente
controlaba una pestaña en `127.0.0.1`. Además el navegador del owner es **Comet**, y la extensión
de automatización solo controla Chrome. La sesión de Supabase vive **por origen** y no viaja entre
los dos.

**Regla:** al pedir verificación visual de trabajo no publicado, decir explícitamente la URL
(`127.0.0.1:3000`, no el dominio) y confirmar en qué navegador está el humano antes de intentar
automatizar nada.

---

Relacionado: [[AGENT_INSTRUCTIONS]] · [[RISKS]] · [[DECISIONS]] · [[OPEN_QUESTIONS]] · [[TECH_STACK]]

### L-45 · Una rotación no es un barajado, y la evidencia de que «se ve bien repartido» no distingue las dos

**2026-08-19, revisando las claves del banco (T-105).** `question-component` rotaba las alternativas
con `shift = (mod (:id question) 4)`. Medida sobre los 306 ítems reales, la posición visible de la
respuesta correcta salía 79/78/74/75 — prácticamente uniforme. Cualquier revisión que se hubiera
detenido en esa medición habría concluido que el barajado funcionaba.

No funcionaba. Una rotación cíclica preserva el orden relativo, así que con la clave constante en la
letra A —293 de 306 ítems— la posición mostrada es exactamente `4 − (id mod 4)`. Uniforme y
completamente predecible **son cosas distintas**, y el histograma de posiciones no las separa: es
justo el estadístico que una rotación pasa sin problema.

**La generalización, que es lo que hay que llevarse:** cuando se verifica una propiedad de
aleatoriedad, medir la distribución marginal no basta. Lo que falla es la *estructura* —la
correlación entre la semilla y el resultado—, y para verla hay que preguntar si existe una fórmula
que prediga el resultado, no si los conteos salen parejos. El test que hoy protege esto no cuenta
posiciones: comprueba que las disposiciones **no** sean rotaciones (`rompe-el-orden-relativo`).

**Y el corolario incómodo:** el sesgo de fondo llevaba meses en la base y no lo destapó la
aplicación, que se veía bien, sino contar `correct_option` por banco — una consulta de una línea que
nadie había hecho. Cuando un dato es el activo del negocio (acá θ, y por G-2 la calibración),
conviene mirarlo agregado y no solo a través de la interfaz que lo consume.

- **Relacionado:** [[RISKS]] R-35, [[../adr/ADR-030-barajar-las-alternativas]], [[BACKLOG]] T-105.

### L-46 · El PostgreSQL de prueba solo sirve si la tabla de prueba tiene las columnas de la real

**Dos migraciones seguidas fallaron en producción por lo mismo**, con dos días de diferencia:

| | Migración | Error | Causa |
|---|---|---|---|
| 2026-08-18 | `046` | `42703: column "track" does not exist` | se asumió que `resources` tenía `track` porque `class_slots` sí lo tiene |
| 2026-08-19 | `047` | `42703: column "explanation" does not exist` | se asumió que `questions` tenía `explanation` |

La segunda duele más porque la 047 **sí se había probado** contra un PostgreSQL desechable, y pasó.
Pasó porque la tabla de prueba se escribió a mano copiando las columnas que la migración iba a
tocar: si la migración menciona `explanation`, el `create table` de prueba también, y entonces la
prueba confirma la suposición en vez de refutarla. **Un banco de pruebas construido desde el mismo
supuesto que se quiere verificar no verifica nada.**

**Cómo se evita, en concreto:** el `create table` del ensayo se arma desde la definición real —
`question-select-cols` en `universo.db.crud` para `questions`, la migración que creó la tabla, o un
`\d` contra la base— **nunca desde la lista de columnas que la migración va a escribir**. Y ojo con
`questions` en particular: **preexiste al esquema versionado** (SCHEMA.md dice que el esquema no
arranca en `001`), así que no hay ningún `create table questions` en `supabase/migrations/` del que
leerla. Ahí la fuente más cercana a la verdad es el `select` que el cliente ya usa en producción.

**Señal barata para detectarlo antes:** si el JS del panel lee un campo y sale `undefined` en vez de
error, la columna puede no existir — un `select` de Supabase falla ruidosamente, pero leer una clave
ausente de un mapa no. Fue exactamente el caso: `q.explanation` era `undefined` en el bucle de
corrección y se saltaba en silencio.

- **Relacionado:** [[BACKLOG]] T-105, `supabase/migrations/047_arreglar_escapes_latex_dobles.sql`,
  `supabase/SCHEMA.md`, [[L-44]].

### L-47 · Un auditor de paleta no ve el fondo que un elemento **hereda**

**El CV tenía 52 textos por debajo de AA con los cuatro auditores en verde.** No es que el audit
fallara: es que mide otra cosa. `audit_contraste.py` verifica **pares escritos a mano** —este color de
texto sobre este color de fondo— y su propia cabecera lo dice: «Solo los pares de la paleta de marca,
escritos a mano abajo. No inspecciona el DOM ni descubre combinaciones nuevas».

El fallo real era de otra naturaleza: `text-gray-400` estaba **bien declarado** y `bg-panel-300`
también. El problema es que nadie declaró el fondo de la sección intermedia, así que el texto terminó
sobre un gris que ningún par contemplaba. Contraste medido: **1.22**.

**La forma de encontrarlo fue medir lo que el navegador realmente compone**, no lo que el código
declara: recorrer los nodos con texto propio, subir por los ancestros acumulando
`background-color` semitransparentes hasta el primer opaco, y recién ahí calcular. Ese recorrido es
el que hay que automatizar (T-107).

**Dos trampas al escribir ese medidor**, ambas pisadas:

1. **Tratar cualquier `background-image` como opaco** llena el reporte de falsos positivos: el hero
   del CV es un degradado y salía «1.00 sobre gris» cuando en realidad es texto blanco sobre casi
   negro. Hay que separar «medible» de «bajo gradiente, revisar a mano».
2. **`color: transparent` no es un fallo**: es `bg-clip-text`, y el glifo lo pinta el degradado. Si
   no se excluye, el título del CV aparece eternamente como el peor caso del reporte.

**Regla que queda:** toda sección declara su propio fondo. Una sección sin `bg-*` hereda lo que haya
debajo, y lo que haya debajo puede cambiar sin que nadie toque esa sección.

**Relacionado:** [[../adr/ADR-031-fondo-como-plano-de-medida]], [[RISKS]] R-36, [[BACKLOG]] T-107.

### L-50 · Tres auditores en verde no significan que la pieza pertenezca al sistema

La capa cero del diagnóstico pintaba `bg-green-50 border-green-600 text-green-900` — verde **de
fábrica** de Tailwind dentro de una pantalla construida con la paleta Braun. Los tres auditores
habían pasado por ese código y los tres dijeron que sí:

| Auditor | Qué pregunta | Por qué no lo vio |
|---|---|---|
| `audit_contraste.py` | ¿los pares **declarados** cumplen WCAG? | Nadie declaró ese par: no existía para el script |
| `audit_dark_theme.py` | ¿cada clase tiene mapeo oscuro? | `bg-green-50` **sí** tenía mapeo. Estaba bien atendida; era la equivocada |
| `audit_movil.py` | ¿los tamaños sirven en un teléfono? | No mira color |

Ninguno preguntaba **si el color pertenece al sistema**, que es una pregunta distinta de si contrasta
y de si tiene modo oscuro. El defecto lo encontró el owner mirando la pantalla, que es exactamente lo
que los auditores existen para evitar.

**La regla:** cuando aparezca un defecto que los auditores no vieron, la corrección no termina en el
defecto. Hay que preguntarse **qué clase de pregunta** ninguno estaba haciendo, y si esa pregunta se
puede automatizar. Acá se podía: `audit_paleta.py`, con línea base por archivo para que la deuda
heredada no lo vuelva ruido que nadie corre.

**El corolario incómodo:** un auditor con línea base **congela** la deuda, no la paga. Que el script
esté en verde con 92 usos de color de fábrica en el embudo significa «no empeoró», no «está bien».

### L-52 · La explicación obvia de un sesgo puede ser falsa, y serlo tres veces seguidas

**2026-08-28, ADR-034.** Buscando por qué θ salía sesgado se probaron tres explicaciones, cada una
razonable y cada una defendida por un documento o por la literatura. **Las tres eran falsas:**

| Hipótesis | De dónde salía | Qué dijo la medición |
|---|---|---|
| El tope de paso de 0,4 frena a los fuertes | T-112 / X-10, con aritmética correcta | Quitarlo mueve θ **0,00–0,06 logits**: el tope no llega a apretar |
| Hay que apuntar los ítems al corte de banda | Teoría de tests de clasificación | 78 % contra 79 %: **no ayudó** |
| El agujero del banco entre −1 y 0 rompe el test | El histograma medido, que es alarmante | Rinde igual que un banco uniforme y denso |

Lo que resultó ser la causa —el prior encogiendo contra un azar no modelado— no era la hipótesis
más vistosa y **no se le ocurrió a nadie primero**: apareció al comparar configuraciones.

**La aritmética de T-112 no estaba mal, estaba incompleta.** «Con paso 0,4 hacen falta ≥7 ítems para
viajar de −1,0 a +1,5» es cierto sobre la *capacidad* del tope. Lo que faltaba era preguntar si el
tope **llega a usarse**, y no llegaba. Una cota superior correcta no dice nada sobre lo que pasa.

**La regla:** antes de arreglar un defecto numérico, medir la explicación. Cuesta una simulación —
media hora— y acá evitó tres cambios inútiles, uno de los cuales (quitar el tope) habría sacado una
salvaguarda **justo** cuando el arreglo real la volvía necesaria.

**Y el corolario que da confianza:** la causa verdadera sobrevivió a cuatro simulaciones distintas,
con banco uniforme y con banco real, con y sin tope. Esa insistencia es la única razón para creerle
— no la elegancia de la explicación.

### L-53 · Un test que compara dos configuraciones puede estar midiendo la salvaguarda

**2026-08-28.** El primer test del prior configurable comparaba σ = 1 contra σ = 3 corriendo seis
aciertos seguidos por la cadena real del estimador. Devolvía `1.4 == 1.4` y fallaba.

No era un bug del código: **el tope de paso saturaba en las dos configuraciones**. Seis ítems × 0,4
desde −1,0 dan 1,4 tanto si el MAP quedó en 1,5 como si quedó en 3,0. El test decía comparar priors
y en realidad comparaba el tope contra sí mismo.

Se partió en dos —el MAP sin tope por un lado, el tope por otro— porque son cosas distintas: el
modelo y la salvaguarda que se le aplica encima al resultado.

**La regla:** cuando un test que compara dos configuraciones da igualdad exacta, sospechar que hay
un límite aguas abajo aplanando las dos ramas, antes de concluir que la configuración no tiene
efecto. La igualdad *exacta* entre dos caminos numéricos distintos casi nunca es una coincidencia.

### L-51 · Una utilidad de Tailwind que no se genera falla en silencio

`lg:max-h-[calc(100vh-6rem)]` no apareció nunca en el CSS compilado: `calc` sin espacios alrededor
del signo **no es CSS válido**, y en una clase arbitraria de Tailwind el espacio se escribe `_` —
`calc(100vh_-_6rem)`. Y `lg:grid-cols-[minmax(0,1fr)_26rem]` sí se generaba, pero con la coma
escapada como `\2c`, así que buscarla en el CSS con el nombre que uno escribió tampoco la encuentra.

Las dos veces el síntoma es el mismo y es el peor posible: **nada avisa**. No hay error de build ni
warning; la clase simplemente no existe y el navegador la ignora. El riel se cae debajo del enunciado
y uno culpa al flex.

**La regla:** una utilidad arbitraria (`[...]`) no está lista hasta haberla visto **en
`public/css/app.css`**, no en la documentación. Y ante la duda, prefiere dos utilidades triviales
—un ancho fijo y un `flex-1`— a una arbitraria ingeniosa: la que se verifica de un vistazo gana.

**Bonus de la misma pasada:** el extractor de Tailwind lee **los comentarios**. Un `;;` explicando
«esto ya no usamos `grid-cols-[...]`» le hace generar esa regla igual.

### L-49 · El formulario devuelve `""` donde la base tenía `null`, y un diff ingenuo lo escribe

Al escribir el editor en vivo (ADR-032) el diff de campos comparaba el borrador contra la fila
original **tal cual**. El borrador convierte los `nil` en `""` a propósito —un `<textarea :value nil>`
en React se vuelve no controlado y deja de responder al estado—, así que **abrir el editor y cerrarlo
sin tocar nada** proponía escribir `""` en las tres o cuatro columnas que estaban en nulo.

No lo encontró la revisión: lo encontró el **primer test** que escribí para esa función, el que
afirmaba «abrir y cerrar sin tocar nada no escribe una sola columna». Falló con
`{:error_b "", :error_d ""}` — y el docstring que yo mismo acababa de escribir ya prometía que eso no
pasaba.

**La regla:** un diff entre un formulario y una fila se hace **sobre los valores coercionados**, no
sobre los que trae cada lado. La coerción es del campo, no del origen: `""` y `"null"` de un
`<select>` son `nil`; un `<input type=number>` vacío es `nil` y no `0`; un texto en blanco es `nil`.

**Por qué importa más que el ruido:** un `error_c` vacío y un `error_c` nulo no son lo mismo para
quien lea la tabla después —«no tiene explicación» contra «tiene una explicación en blanco»— y esa
diferencia es justo la que `027` usa para saber qué distractores faltan por catalogar. El daño no se
ve el día que ocurre: se ve el día que se cuenta.

**Dónde vive la regla:** `universo.editor/coercionar-campo` + `campos-editados`, con sus tests.

### L-48 · Un glifo que la fuente no tiene se sustituye en silencio, y el resultado cambia por máquina

El watermark del CV llevaba **más de una sesión viéndose «mal»** sin que nadie supiera por qué. La
causa: la lambda se pintaba como **texto** con `font-family: Georgia, serif`, y **Georgia no trae el
bloque griego** en la mayoría de los sistemas. El navegador no avisa: cae a la primera fuente
instalada que sí tenga λ. Otro grosor, otra inclinación, otra métrica — y **distinta en cada
máquina**, que es por qué «centrarla» nunca funcionaba: no era siempre la misma letra.

**Cómo reconocerlo:** un carácter fuera de Latin-1 (griego, matemático, flechas, CJK) puesto con una
`font-family` concreta y que se ve «raro» o desalineado sin explicación. No es CSS: es fallback de
fuente.

**Las dos salidas, y cuándo usar cada una:**

| Salida | Cuándo |
|---|---|
| Dibujarlo como trazo/path SVG | Cuando tiene que ser **idéntico** en todas partes y es un elemento gráfico |
| Dejarlo como glifo | Cuando tiene que **coincidir con otro texto** de la app |

El proyecto tiene un caso de cada uno y conviene no confundirlos: la **λ** se dibuja (es una forma), y
el **∫** del logotipo **se deja como glifo** — está en las grotescas del sistema y dibujarlo lo haría
diferir del logotipo de la nav, que es exactamente lo que no se quiere.

**Bonus de la misma sesión:** un SVG bajado de Wikimedia puede traer `width`/`height` **sin
`viewBox`** (el de Clojure es así). Sin agregarlo no escala: se recorta al tamaño nativo.

**Relacionado:** `src/universo/components/resume.cljs`, `sessions/SESSION-036.md`.

