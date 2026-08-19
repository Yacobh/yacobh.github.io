# CURRENT_STATUS

**Fecha de corte: 2026-08-19** · Rama **`escape-no-se`** (sin mergear, sin pushear)

> ## 🆕 2026-08-19 — T-105 cerrada: los cuatro bancos revisados, y el banco resultó estar sesgado
>
> **Los 306 ítems activos quedaron revisados uno por uno** (`diagnostico` 64, `numbers_v1` 178,
> `paes_m1` 44, `polinomios` 20): un evaluador de expresiones resolvió los 81 aritméticos y los 225
> conceptuales se leyeron a mano.
>
> ⚠️ **El hallazgo no fue una clave suelta, fue el banco entero: la respuesta correcta está en la
> letra A en 293 de los 306 ítems** —los tres bancos que no son `diagnostico` al 100 %— y **ningún
> ítem tiene la clave en D**. La UI rotaba las alternativas y la posición visible salía repartida
> (79/78/74/75), que es por qué nadie lo vio; pero una rotación cíclica sobre una clave constante
> deja la posición de la correcta en `4 − (id mod 4)`, o sea que se puede acertar el banco completo
> sin leer un enunciado. Mitigado con una permutación sembrada (`universo.opciones`,
> **ADR-030 / D-61**); **el dato en `questions` sigue sesgado** → [[RISKS]] **R-35** abierto.
>
> **Cuatro claves más apuntaban a la alternativa equivocada** (#56, #109, #394, #407), **tres ítems
> no tenían ninguna alternativa correcta** (#386, #387, #411) y **siete tenían dos a la vez** (la
> fracción simplificada y la no simplificada como opciones). Todos corregidos y verificados contra
> la base. Detalle en [[BACKLOG]] T-105 y `sessions/SESSION-035.md`.
>
> 🔜 **Queda una cosa pendiente del owner:** aplicar
> `supabase/migrations/047_arreglar_escapes_latex_dobles.sql` (76 ítems escriben `\\frac` y KaTeX no
> lo interpreta). **Su primer intento falló** con `42703: column "explanation" does not exist` —
> `questions` no tiene esa columna— pese a haber sido probada contra un PostgreSQL desechable: la
> tabla de prueba se había armado copiando las columnas que la migración tocaba, o sea confirmando
> el supuesto en vez de verificarlo (**L-46**, segunda vez seguida tras la `046`). Ya está corregida
> y re-verificada con las columnas reales. El release **sí** se compiló, con el watch detenido.
>
> 🆕 **T-106 (P1)**: `paes_m1` tiene 13 de sus 44 ítems duplicados; tres enunciados repetidos 5, 5 y
> 3 veces. En un test adaptativo eso multiplica su probabilidad de salir y estima θ con información
> repetida.

> ## 🆕 2026-08-18 (cierre) — el tablero dejó de ser una lista cronológica, y X-02 se cerró
>
> **`main` @ `56b00cb`.** El tablero listaba los 44 intentos en orden cronológico plano; ahora hay
> **una tarjeta por evaluación** (19 sobre esos mismos 44 intentos) con θ actual, **Δθ desde el
> primer intento**, mejor θ, **sparkline de θ contra el tiempo** y **botón «Rendir de nuevo»**. Los
> intentos individuales no se perdieron: viven dentro del `<details>` de su evaluación.
>
> ✅ **X-02 cerrada — ya no hay ninguna afirmación falsa publicada.** La FAQ promete ver «cómo se
> movió tu nivel» al repetir el diagnóstico y hasta hoy el producto no lo mostraba. Ahora sí, con Δθ
> calculado desde `tests`, que guarda una fila por intento. **Ojo con lo que NO significa:**
> `student_profiles` se sigue sobrescribiendo, así que el histórico de *perfiles* (misconceptions,
> fluidez) todavía no se versiona como manda D-50 — esa es la mitad que le queda a **T-26**, que
> pasa de `bloqueado` a `a medias`.
>
> ⚠️ **Lo que deliberadamente NO se hizo: un gráfico global de θ** (D-60). Habría sido más vistoso y
> falso: uniría en una línea niveles estimados contra bancos con calibraciones distintas y sin
> validar (R-17, Q-05). Hay una serie por evaluación, con escala vertical propia, y el tablero **se
> lo explica al estudiante en pantalla**. Cuando G-2 cierre y las escalas estén calibradas, ese
> gráfico global pasa a ser correcto y hay que volver.
>
> De paso: θ y nota dejaron de mostrarse crudos (`0.06443610732100741`, `33.33333333333333`), y la
> tarjeta «Evaluaciones» dejó de decir 44 cuando 44 eran los **intentos**.
>
> Verificación: **141 tests / 781 assertions / 0 failures**, `clj-kondo` 0/0, `release` 0 warnings,
> los cuatro `audit_*.py` en verde —`audit_movil` cazó el botón nuevo con objetivo táctil bajo 44 px—
> claro y oscuro, y «Rendir de nuevo» probado contra la base real (arrancar sin responder **no** deja
> fila). Detalle en [[../sessions/SESSION-034]].

---

> ## 2026-08-18 (noche) — `escape-no-se` está en `main`, y el panel de edición dejó de ser el cuello de botella
>
> **`main` @ `a29396d`.** El merge (`09ae9a0`) trae el escape del estudiante, el editor de recursos y
> la capa de datos del catálogo; encima va el trabajo de panel de esta sesión.
>
> **Se revisó el panel usándolo**, con la cuenta de admin contra el host local y la **base real**. El
> diagnóstico en una frase: **el editor de recursos ya tenía el tratamiento de D-58 y el del banco
> no**, siendo el flujo más frecuente. Tres huecos, los tres vistos en pantalla y no deducidos:
>
> 1. **El editor de preguntas no tenía campo de módulo.** De `module_id` salen «Mi plan» y el
>    material del escape, un tercio del banco no lo tiene (T-60) y **no había forma de arreglarlo
>    desde el panel**. Ahora la hay.
> 2. **El catálogo de ideas erróneas no tenía interfaz** — `027` seguía sin lector en la práctica.
>    Ahora es la pestaña **«Ideas erróneas»** (T-103 cerrada) y cada distractor puede apuntar a una
>    idea errónea desde el editor de preguntas.
> 3. **Fricción**: quince campos con los botones solo arriba, nueve vistas previas que repetían el
>    texto, y un «no se puede guardar» que no decía qué faltaba. Los tres, corregidos.
>
> ✅ **Verificado en vivo, no deducido:** el arreglo de `module_id` (`3e0ef20`) **funciona contra la
> base real** — se asignó módulo al ítem #31, se guardó y persistió; con el `parseInt` anterior ese
> guardado habría reventado. El catálogo soporta alta y baja (se creó una entrada de prueba y se
> borró; quedó en 77).
>
> ⚠️ **Q-40 dejó de ser una nota:** el panel muestra **77 ideas y las 77 son del experimento de
> cuántica**. El veredicto decía «Catálogo sano» cuando el producto tiene **cero** distractores
> catalogados. El banner ahora lo declara. Qué hacer con esas 77 **sigue sin decidirse**.
>
> **Lo que falta y no se hizo:** no hay panel de Módulos (**T-104**, nueva) — los 35 módulos solo
> existen por SQL; el catálogo del producto sigue vacío a propósito (el paso 2 de T-57 empieza con
> una consulta del owner); y `admin_questions.cljs` sigue en indigo y utilidades sueltas en vez de
> las primitivas del panel (mismo problema que T-100).
>
> Verificación: **136 tests / 761 assertions / 0 failures**, `clj-kondo` 0/0, `release app` 0
> warnings, los cuatro `audit_*.py` en verde —`audit_dark_theme` **falló primero** y por eso el verde
> nuevo quedó mapeado en `app.css` (ADR-012)— y revisado en tema claro y oscuro. Detalle en
> [[../sessions/SESSION-033]].

---

> ## 2026-08-18 (tarde) — el catálogo de misconceptions ya tiene capa de datos, y un uuid que se parseaba como entero
>
> **Misma rama `escape-no-se`.** Dos commits: `a672fec` (cableado) y `3e0ef20` (arreglo).
>
> **El catálogo de `027` llevaba desde el 2026-08-10 aplicado y sin un solo lector**: la tabla
> existía, las cuatro columnas del vínculo existían, y el cliente no sabía de ninguna de las dos.
> Ahora hay capa de datos: `universo.misconceptions` (puro, con test) y
> `fetch-misconceptions` / `upsert-misconception!` / `delete-misconception!` en `db.crud`.
>
> **Lo que hace que esto no sea un CRUD más:** `health` convierte en instrumento la única regla que
> decide si el catálogo sirve — *tiene que crecer mucho más lento que el banco, o es la misma lista
> de strings con otra forma*. La escribió la propia migración `027` y hasta hoy vivía solo como
> comentario.
>
> **Una salvaguarda que vale la pena conocer antes de tocar el editor:** `question-payload` manda los
> cuatro `misconception_*_id` **solo si la clave viene en el draft**. Como `update-admin-question!`
> reemplaza la fila entera y `:admin/edit-question` arma el draft sin esas claves, incluirlas siempre
> habría descatalogado los cuatro distractores de cada ítem que se guardara — en silencio.
>
> **🐛 Bug preexistente encontrado y arreglado: `module_id` es uuid, no entero.** `question-payload`
> le hacía `js/parseInt`, que sobre un uuid devuelve los dígitos iniciales o `NaN` → o el guardado
> falla contra la columna uuid, o el módulo se borra sin aviso. **Bastaba abrir y guardar cualquier
> ítem con módulo asignado.** Candidato a explicar parte del 33 % del banco sin `module_id` (T-60),
> aunque eso **no está medido**.
>
> ⚠️ **Nadie llama todavía a las tres funciones nuevas**: faltan eventos, subs y la pestaña del panel
> (**T-103**, nueva). Hasta entonces `027` sigue sin lector en la práctica. Y el paso 2 de T-57
> (catalogar el módulo más fallado) sigue esperando una consulta del owner al proyecto real.
>
> **Otra vez L-30:** un `shadow-cljs watch app` en background sobrescribió `public/js/app.js` con el
> build de desarrollo (9,18 MB, con `devtools` dentro) al guardar el fuente. Se detuvo el watch, se
> restauró y se recompiló con `release` **una vez por commit**, para que ninguno quede con el
> artefacto desfasado de su propio fuente.
>
> Verificación: **130 tests / 716 assertions / 0 failures**, `clj-kondo` 0/0, `release app` con 0
> warnings, `graphify update .` corrido. Sin `build:css` ni `audit_*.py`: no se tocó una sola clase
> de UI. Detalle en [[../sessions/SESSION-032]].
>
> **Nuevo en la memoria:** D-59 (el catálogo se cura desde el panel, no por migración), Q-40 (qué
> hacer con las 77 entradas `mq/` de cuántica cuando el panel liste el catálogo) y L-44.

---

> ## 2026-08-18 (mañana) — T-96 y T-97: el estudiante ya puede decir «no sé», y el editor dejó de recargarse entero
>
> **Rama `escape-no-se`, partiendo de `cb9b3fb`. No se tocó `main`.**
>
> **T-96 — el escape.** El diagnóstico tiene dos botones nuevos: «No entiendo el enunciado» y «No sé
> cómo resolverlo». Son **dos y no uno** porque son diagnósticos opuestos en accionabilidad: un
> error tiene una idea errónea nombrable que corregir, un «no sé» tiene un hueco de prerrequisito, y
> «no entiendo el enunciado» es lo único de los tres que habla **del ítem** — o sea, revisión de
> banco gratis, que es insumo de G-2. Ver [[../adr/ADR-029-escape-como-tercera-categoria-de-respuesta]]
> (D-57).
>
> **Lo que hizo que esto fuera barato:** el mecanismo ya estaba construido. El peso por respuesta de
> ADR-014 entra en las dos derivadas de `tetha` y por herencia en la información de Fisher, así que
> un escape con `:weight 0.0` **no mueve θ, no baja el SE** —no se puede terminar el test
> escapando— y **sí** cuenta para `max-items`, así que tampoco se vuelve infinito. Queda fuera del
> eje de fluidez sin decir nada, porque `fluency/usable?` ya exigía correcta **y** peso positivo.
>
> **Y no requiere migración ni toca RLS:** `score_answer` (024) rechaza por diseño cualquier cosa
> que no sea A–D, y un escape no es una alternativa. Es cliente puro.
>
> **🔧 Corregido el mismo día, tras revisión del owner.** La primera versión del escape **no bajaba
> la dificultad ni mostraba ningún recurso**: registraba el problema y no hacía nada al respecto. El
> error de razonamiento fue dar por bueno que «con `:correct? false` el motor adaptativo ya sirve
> ítems más fáciles solo» — eso vale para la alternativa de peso 1.0, que se descartó; **con peso
> 0.0 θ no se mueve y `next_question` seguía sirviendo la misma banda de dificultad**. Ahora:
> - **El retroceso es explícito** (`escape/selection-theta`): el ítem se busca con un θ **objetivo**
>   que baja un escalón por cada escape seguido y se reinicia solo al responder de verdad. θ sigue
>   sin tocarse — es la separación entre *estimar* y *mostrar*. Se resuelve eligiendo qué número
>   mandarle a `next_question`, así que **tampoco necesitó migración**, y el escalón reusa
>   `progress/selection-half-width` en vez de declarar una constante nueva.
> - **El modal entrega material**: los recursos publicados del módulo del ítem, con
>   `plan/resource-card` — la misma tarjeta de «Mi plan», no una variante.
> - ⚠️ **Es el módulo del ítem, no el prerrequisito** (Q-38 sigue abierta), y **se dice en la UI**.
>   El estado vacío también es honesto: con un tercio del banco sin `module_id` (T-60) va a ocurrir.
>
> ⚠️ **Dos cosas que NO se decidieron, a propósito.** No se fijó umbral de tasa de escape ([[OPEN_QUESTIONS]]
> Q-39) ni se sembró el grafo de prerrequisitos (Q-38). Los dos habrían sido números y contenido
> **inventados**, y este proyecto ya se equivocó dos veces así — `min_response_seconds` en 3 s que
> los datos bajaron a 2 s (T-59) y los cortes de fluidez, todavía sin calibrar (T-65). Salen de
> **T-90** y del profesor, respectivamente.
>
> **T-97 — el panel de recursos.** Cada guardado recargaba módulos **y** todos los recursos, en
> serie, para reflejar el cambio de una fila — cuando `upsert-resource!` ya devolvía la fila guardada
> y se estaba tirando. Ahora el guardado y el publicar/despublicar son optimistas y reversibles, las
> dos consultas de la sección van en paralelo, el borrador vive en `app-db` (antes, cambiar de
> pestaña borraba veinte minutos de LaTeX **sin aviso**), hay ⌘/Ctrl+Enter y Esc, y hay Duplicar.
> Ver D-58.
>
> **Migración `045` escrita y ⏳ SIN APLICAR:** `module_prerequisites`, `resource_misconceptions` y
> `resources.entry_level`. Aditiva e idempotente, **sin seed a propósito**. No rompe nada mientras no
> se aplique: nada la lee todavía.
>
> Verificación: **121 tests / 619 assertions / 0 failures / 0 errors**, `release app` con 0
> warnings, `build:css`, los cuatro `audit_*.py` en verde (contraste **40/40**, con los dos pares
> nuevos declarados) y `graphify update .` corrido.
>
> ### 🔬 Verificado en vivo el 2026-08-18, y apareció un fallo de signo invertido
>
> El owner abrió sesión de admin en un Chrome controlado y se probó contra `localhost:3000`.
> **Encontrado: el escape hacía el test más DIFÍCIL, no más fácil.**
>
> El peso 0.0 impide aportar a la verosimilitud, pero `calculate-theta` **reestima el MAP completo** y
> lo acerca a su valor convergido en pasos de 0,4. Con poca evidencia real ese valor *es la media del
> prior* (θ = 0), así que cada escape arrastraba θ **hacia arriba** — precisamente para quien venía
> por debajo, que es quien escapa. Medido en el test `294` (`mq_armonicos_esfericos`, seis escapes y
> ninguna respuesta real): θ de **-1,0 → 0,0** y dificultades servidas
> **-0,8 · -0,3 · 0,2 · 0,7 · 1,1 · 1,5**.
>
> **Arreglado** con `escape/freeze-theta?`: ante un escape θ **se conserva tal cual**, no se
> reestima. Reverificado en vivo sobre `numbers_v1` — θ constante en -1,00 mientras la dificultad
> bajaba **-1,1 → -2,1 → -3,0 (piso)**.
>
> **Segundo hallazgo, y es de contenido, no de código.** Se midió la distribución de `difficulty` del
> banco: `numbers_v1` (178 ítems, mín -3,0) tiene recorrido real; **`paes_m1` toca fondo en -1,8** y
> **`polinomios` tiene 18 de sus 20 ítems dentro de 0,045 logits**. En ese último banco el retroceso
> es imperceptible por construcción — un rango de 0,045 **no es una escala de dificultad, es una
> constante con ruido**. Es [[RISKS]] R-17 / Q-05 en su forma más concreta y refuerza que **G-2 es
> precondición**: mientras `difficulty` sea autoral, «bajar la dificultad» opera sobre etiquetas que
> nadie validó.
>
> **Tercer arreglo:** la tarjeta de fluidez **desaparecía entera** tras un test con muchos escapes.
> `insuficiente?` exigía `(pos? n)` y un escape no aporta a `n`, así que con cero aciertos no se
> mostraba nada — el agujero que D-44 mandaba no tener. Ahora se enciende también con escapes y los
> nombra explícitamente.
>
> ⚠️ **Sigue pendiente probarlo con una cuenta que NO sea admin.** Todo lo verificado fue con sesión
> de admin, que ve todos los bancos (incluidos los `mq_` inactivos) y salta el filtro de
> prerrequisitos de `universo.access`. Detalle completo en [[../sessions/SESSION-031]].
>
> **Nuevo en el backlog:** T-98 (sembrar el grafo, bloqueada por Q-38), **T-99 (ítems sembrados — lo
> único que avanza G-2 directamente)**, T-100 (migrar el diagnóstico y «Mi plan» al lenguaje del
> panel: hoy usan **cero** primitivas del panel y 25 `rounded-*`), T-101 (el mapa), T-102 (el resto
> del editor). Riesgo nuevo: [[RISKS]] **R-34**.

---

**Fecha de corte anterior: 2026-08-17** · Rama `main`

> ## 🔑 2026-08-17 — T-92: login con Google conectado (código), **pendiente de configurar**
>
> **Rama `t-56-geometria`.** `sign-in-with-google` existía en `supabase.cljs` desde F0 y **ningún
> botón la llamaba**. Ahora sí. Las tres piezas que suelen romper esto ya estaban resueltas y no
> hubo que construirlas: la rehidratación de sesión (`getSession` + `onAuthStateChange`), la fila
> en `profiles` (trigger `handle_new_user()`, migración `008`) y el aterrizaje del callback.
>
> **Lo que sí hubo que decidir fue D-21.** Supabase **da de alta** al usuario que entra por OAuth y
> no existe, así que el botón de Google crea cuentas — también en `/ingresar`. Puesto sin más, se
> salta la declaración de edad de la Ley 21.719 en silencio, sobre un público mayoritariamente
> menor de edad ([[RISKS]] R-06). Solución: la declaración se extrajo a un bloque reutilizable, va
> **antes** del botón en las dos rutas, y el botón está **inhabilitado hasta que esté marcada**.
>
> **Segundo cambio:** el `redirectTo` era `window.location.href` —una URL distinta por cada ruta de
> origen, y cada una hay que declararla en Supabase o el login falla en silencio—. Ahora es **una
> sola URL fija**, `origin + /tablero`, tomada de la tabla de `universo.router`. El aterrizaje
> reutiliza el mecanismo de deep link de T-05 sin código nuevo (`404.html` → `pending` →
> `:auth/session-established`), verificado en local contra un servidor que imita el fallback de
> GitHub Pages.
>
> ⚠️ **Ojo con el orden de despliegue (BL-06):** el botón ya está en el bundle. Si `app.js` se
> publica **antes** de configurar Google Cloud y Supabase, los visitantes ven un botón que falla.
> Configurar primero, publicar después — o publicar y configurar en la misma ventana.
>
> Verificación: **97 tests / 530 assertions / 0 failures**, los cuatro `audit_*.py` en verde,
> `release app` + `build:css` corridos.

> ## 🧹 2026-08-17 — T-12 cerrada: un solo `index.html`, y dev prueba lo que se publica
>
> **Rama `t-12-html-unico`.** El ticket pedía resolver la duplicación `index.html` /
> `public/index.html`. Al medirlo apareció que **el riesgo ya se había materializado**: normalizando
> el prefijo de rutas, el `<head>` completo (meta, Open Graph, JSON-LD entero, script de tema) era
> **idéntico byte a byte**, pero el `<noscript>` de la copia se había quedado sin dos párrafos,
> incluido el que nombra a la UNEXPO (corrección de origen de D-53).
>
> **Y el porqué importa más que el hallazgo:** en desarrollo se servía la copia y **nunca** el
> archivo que se publica. El mecanismo que debería haber detectado la divergencia —usar el producto
> en local— apuntaba al archivo equivocado, así que la copia podía envejecer sin señal. → L-41.
>
> **Decisión: [[../adr/ADR-027-un-solo-index-html]] (D-55), opción (a) del ticket.**
> `public/index.html` eliminado; `:dev-http {3000 {:root "." :push-state/index "index.html"}}` y
> `:asset-path "/public/js"`. Desarrollo y producción sirven **el mismo archivo**.
>
> El par que sobrevive —`index.html` / `404.html`— **difiere a propósito** (ADR-026: sin SEO,
> `noindex`, rutas absolutas), así que no se fusiona: se audita. **`scripts/audit_html.py`** es el
> cuarto audit versionado y comprueba lo que sí debe coincidir (script de tema, bundle/CSS/manifest
> resolviendo al mismo archivo, versión de KaTeX, favicons, `noindex`, existencia de lo
> referenciado). **Probado contra cuatro casos que deben fallar** antes de creerle (§10-bis), con
> `404.html` restaurado byte a byte después de cada prueba.
>
> **Lo que había que verificar de verdad y se verificó:** `:asset-path` con un `watch` real — `/`
> sirve el `index.html` de producción (JSON-LD y "UNEXPO" presentes), los deep links `/plan`,
> `/registrarse` y `/no-existe` resuelven por push-state, y los módulos del build de desarrollo
> cargan desde `/public/js/cljs-runtime/`. Confirmado además en Chrome.
>
> `clj -M:test` **97 / 530 / 0** · `clj-kondo` 0/0 · los **cuatro** audits en verde.
>
> **No se recompiló el bundle, a propósito:** en esta rama no cambió ninguna fuente ClojureScript y
> se verificó que `:asset-path` no queda embebido en el build de `release`. Un recompilado solo
> habría reasignado símbolos del minificador — 1,2 MB de diff sin diferencia funcional.
>
> **Efecto colateral, con una corrección de la memoria de regalo:** al anotar que el copy "baja de
> cinco lugares a cuatro" se aplicó la propia regla de L-22 —re-verificar con `grep`— y resultó que
> **la pregunta estaba mal planteada: no hay un número único, depende de qué copy**. El JSON-LD no
> lleva la frase de origen y `landing.cljs` tampoco, contra lo que decían las dos versiones
> anteriores de la nota. L-22 reescrita con el mapa medido. Además, `CLAUDE.md` §1 tenía dos avisos ya vencidos (el copy "todavía dice se originó en
> 2025", cerrado por D-53; y "antes de commitear `docs/`", cerrado con R-26) — corregidos, porque
> uno de ellos apuntaba al archivo que esta rama elimina.
>
> **Cierra:** T-12. **Reduce:** A-09 (de tres HTML a dos, y verificables). **Desbloquea:** T-94.

**Corte anterior: 2026-08-16** · Rama `main`
*(el cuerpo histórico de este archivo arranca en el corte del 2026-07-26, commit `48bf525`, rama
`cursor/mvp-operable-funnel`; las notas de sesión de más abajo son la capa vigente)*

> ## 🧭 2026-08-16 (6ª pasada) — T-05 cerrado: el sitio tiene URLs de verdad
>
> **Rama `t-05-router-url`, sin mergear a `main`.** Primera sesión de código desde el pivote.
>
> Hasta hoy la navegación era **solo** `[:ui :current-section]` en `app-db`: la barra de direcciones
> decía `jacobocordova.com/` en las nueve pantallas, no había deep links, cualquier F5 devolvía a la
> landing y ninguna herramienta de analítica podía distinguir una pantalla de otra. Eso último es lo
> que importa ahora: **T-20 (instrumentar el funnel) es parte de G-5** y no se puede hacer sin URLs.
>
> **Decisión: [[../adr/ADR-026-router-de-url-con-history-api]] (D-54).** Router de History API con
> `404.html` como fallback de GitHub Pages, y una asimetría deliberada que es la salvaguarda:
>
> > **La sección escribe la URL; la URL nunca escribe la sección.** `:complete-navigation` es el
> > único punto que toca la barra de direcciones, y corre *después* de `guard-section`. El router,
> > al arrancar o en el botón atrás, siempre despacha `:navigate-to` — nunca `assoc` directo. Por
> > eso escribir `/admin` a mano, o llegar ahí con el botón atrás, pasa por el mismo guard que un
> > clic (verificado en vivo).
>
> Rutas: `/` · `/ingresar` · `/diagnostico` · `/tablero` · `/plan` · `/cupos` · `/cuenta` ·
> `/admin` · `/libro-de-visitas` · `/profesor` · `/privacidad`. En español porque la URL es copy
> (L-20). Namespace **puro** `universo.router` + `universo.events.router` para el History API, más
> dos funciones puras nuevas en `events/auth.cljs` (`post-session-target`, `post-clear-target`) que
> resuelven el caso difícil: **un deep link a ruta protegida no se puede decidir al arrancar**,
> porque la sesión de Supabase se rehidrata de forma asíncrona y decidir ahí mandaría al login a
> quien sí tiene sesión.
>
> **Verificación:** `clj -M:test` **96 tests / 523 assertions / 0 failures** (antes 83/454) ·
> `clj-kondo` 0 errores / 0 warnings · `npx shadow-cljs release app` 0 warnings, `app.js` en 1,2 MB
> (L-30 comprobada antes de commitear) · las tres auditorías (`contraste`, `dark_theme`, `movil`) en
> verde · `npm run build:css` corrido, sin clases nuevas.
>
> **Verificado en vivo en Chrome**, contra un servidor local que simula el fallback de GitHub Pages
> (devuelve `404.html` con status 404 para rutas inexistentes): deep links sin sesión a `/plan`,
> `/cupos` y `/diagnostico` → `/ingresar` conservando el destino; `/privacidad`, `/profesor`,
> `/libro-de-visitas` montan directo; `/Libro-De-Visitas/` y `/index.html` se normalizan;
> `/no-existe` → 404 del SPA sin tocar la URL; atrás/adelante correctos, una sola entrada de
> historial por destino; y **forward hacia `/admin` sin sesión aterriza en `/ingresar`**.
>
> **No verificado, y es el mismo límite de siempre:** el camino **con sesión iniciada** (deep link a
> `/plan` o `/admin` estando logueado, y el redirect post-login). El agente no tiene credenciales de
> prueba. La lógica está cubierta por tests puros, pero no se ejerció contra Supabase real —
> **eso lo tiene que probar el owner antes de mergear**.
>
> **Consecuencia aceptada y anotada en el ADR:** bajo el fallback de GitHub Pages **todas las rutas
> salvo `/` responden HTTP 404**. La aplicación funciona igual, pero las rutas públicas no son
> indexables; por eso el `sitemap.xml` **no** creció (declarar una URL que responde 404 es peor que
> no declararla). Queda como [[BACKLOG]] **T-94** y como [[ARCHITECTURE]] **A-07'**.
>
> **Hallazgo de la sesión, útil para la próxima que use `claude-in-chrome`:** las lecturas del DOM
> vía `javascript_tool` (`querySelectorAll`, `innerText`) devolvieron durante un buen rato un
> **snapshot desactualizado** de la página, que hizo perseguir un bug inexistente. Las lecturas de
> `location.pathname`, de átomos de la app y las **capturas de pantalla** sí eran fiables. Anotado en
> [[LESSONS_LEARNED]] L-40.
>
> **Cierra:** T-05, A-07. **Habilita:** T-20 (analítica por página, vector G-5). **Abre:** T-94.
>
> ### 2ª pasada, el mismo día — el owner probó y preguntó por `/ingresar`
>
> *"Ingresar y registrarse están en el mismo deep link, ¿está bien eso?"* — **no lo estaba.** Era la
> única pieza de navegación que había quedado fuera de T-05, y justo el paso más caro del embudo:
> el registro no sobrevivía a un refresh, y "cuántos llegaron al registro" contra "cuántos volvieron
> a entrar" —*la* pregunta de CAC para G-5— eran el mismo evento de página.
>
> **`:registro` → `/registrarse` es ahora ruta propia.** `login-form` sirve las dos y **deriva** el
> modo de `:current-section`; como `main-content` monta el mismo componente en ambas ramas, React
> reconcilia y **el correo ya escrito sobrevive al cambio**. Los enlaces "Regístrate" / "Inicia
> sesión" pasan a ser `<a href>` reales.
>
> **Deuda retirada de paso:** `:auth/login-mode`, `:auth/set-login-mode` y la clave
> `[:auth :login-mode]` de `default-db` **se eliminaron**. Eran un intent de un solo uso para abrir
> el formulario en modo registro; con la ruta como fuente del modo, sobraban. Un estado menos que
> sincronizar.
>
> **Guarda de cumplimiento comprobada en el navegador:** la declaración de edad de `login.cljs`
> (D-21, Ley 21.719, R-06) se muestra en `/registrarse`. Una ruta directa al registro es
> exactamente donde se podía haber perdido — es la misma guarda que T-92 anota para el botón de
> Google.
>
> `clj -M:test` **97 tests / 530 assertions / 0 failures** · `clj-kondo` 0/0 · `release app` 0
> warnings · las tres auditorías en verde. Verificado en vivo: deep link a `/registrarse`, alternar
> en los dos sentidos conservando el correo, botón atrás, y el CTA principal de la landing
> aterrizando en `/registrarse`. Detalle en el **Anexo** de
> [[../adr/ADR-026-router-de-url-con-history-api]].

> ## ⭐ 2026-08-16 — Pivote de modelo de negocio (solo documentación, cero cambios de código)
>
> **Diagnóstico que motivó la sesión.** El producto está esencialmente terminado (F8 cerrada, funnel
> verificado end-to-end, 74→83 tests en verde, infra a $0) y **el negocio no está empezado**. El
> modelo de ingreso vigente hasta hoy —clases a $10.000 CLP/hora (D-32)— tiene un techo aritmético
> de **1.500 h/año × $10.000 ≈ CLP 15M ≈ USD 16.000/año**, y solo si el fundador deja de programar,
> escribir ítems y calibrar. El desbalance de fondo: **se cobra por lo que tiene costo marginal alto
> (las horas del profesor) y se regala lo que tiene costo marginal cero (diagnóstico, mapa de
> errores, plan)** — que además ya está construido y verificado.
>
> **Decisión ([[../adr/ADR-025-motor-de-valor-b2b-y-cinco-vectores]], D-47…D-51).** Cinco vectores de
> valor, archivo canónico **[[TESIS_DE_CRECIMIENTO]]**:
>
> - **G-1** licencia institucional **B2B** como línea principal (el B2C queda como embudo, marca y
>   fuente de datos; las clases quedan como línea premium).
> - **G-2** **calibrar** el banco y convertirlo en el activo defendible, con reporte técnico
>   publicable. **Precondición dura de G-1.**
> - **G-3** ingreso **desacoplado de las horas** del fundador (grabadas por cuadrante θ×λ + red de
>   profesores con comisión).
> - **G-4** se vende **Δθ**, no acceso. **Resuelve Q-07 y cierra P-01: el histórico versionado
>   nunca se sobrescribe** — es el producto.
> - **G-5** **distribución medida** (CAC/LTV) y **búsqueda de capital** (CORFO / Start-Up Chile /
>   semilla). Precondición dura, no fase posterior.
>
> **Orden:** G-2 y G-5 en paralelo → G-1 → G-4 → G-3.
>
> **Qué cambió en la memoria:** archivo nuevo [[TESIS_DE_CRECIMIENTO]] y ADR-025 · [[BUSINESS_CONTEXT]]
> (objetivos B-08…B-11, funnel B2B, modelo económico, métricas M-10…M-16, precedencia de documentos)
> · [[PROJECT_BRIEF]] (rol `profesor` deja de ser exclusión, criterios S-11…S-18) · [[ROADMAP]]
> (fases **F12–F16**, F9 a requisito contractual, F11 postergada) · [[BACKLOG]] (**épica E8**,
> T-76…T-89) · [[RISKS]] (**R-27…R-30**; R-30 pasa a ser el riesgo dominante y subsume R-19/R-01) ·
> [[OPEN_QUESTIONS]] (**Q-32…Q-36**; Q-07 respondida; Q-05 y Q-30 suben a bloqueantes) ·
> [[ASSUMPTIONS]] (**A-31…A-35**, los más frágiles de la memoria) · [[DECISIONS]] · [[../CLAUDE]] ·
> [[INDEX]].
>
> **Lo más importante que hay que recordar de esta sesión:** el riesgo dominante ya no es R-19
> (estacionalidad) sino **R-30 — convertir el pivote en más construcción de producto y terminar
> otra vez con un producto mejor y cero clientes**. Es lo que pasó las tres veces anteriores.
>
> **Sin cambios de código, sin recompilar, sin tocar `app.js`.** Lo pendiente de código previo a
> esta sesión sigue igual (ver más abajo).

> ## 🔺 2026-08-16 (2ª pasada) — El owner detectó que el funnel apunta al canal equivocado
>
> Revisando el producto tras el pivote, el owner planteó que no cree que el funnel esté bien
> planteado. **Tenía razón, y el dato lo confirma:**
>
> Los **252 diagnósticos** —los únicos usuarios reales en 16 años— son casi todos
> `@estudiantesunap.cl`, del piloto UNAP. Llegaron porque **una institución puso el producto frente
> a una audiencia cautiva**. De la landing no llegó prácticamente nadie. Es decir: **el único canal
> que funcionó jamás no tiene funnel, y el funnel que existe (landing, SEO, registro, cupos) sirve
> a un canal que nunca produjo un usuario.** El dato estaba anotado desde el 2026-08-09 como
> "hallazgo colateral" y nadie había extraído su consecuencia.
>
> Se registraron **dos hallazgos**, ambos del owner:
>
> - **[[LESSONS_LEARNED]] L-36 / [[RISKS]] R-31** — el funnel pide máximo compromiso antes de
>   entregar valor (cuenta → 20 min sin calculadora) y la recompensa es un inventario de los propios
>   déficits. Falta la puerta de entrada del aula, que es justo lo que se le vende a un colegio.
> - **[[LESSONS_LEARNED]] L-37** — la maquinaria de cohortes (`min_enrollments`, triggers, outbox,
>   cron, cancelación) se construyó para una demanda que nunca llegó: **cero cupos han confirmado**.
>   Correcta, elegante y prematura. Caso concreto de R-30.
>
> **Tareas nuevas: [[BACKLOG]] T-90 y T-91**, ambas P0. T-90 (aplicar el diagnóstico en **un** curso
> real y observar) es la tarea más barata y más informativa del backlog entero: cero pesos, una
> hora, y confirma o refuta R-31 con evidencia. **T-90 va antes que T-91, y antes que rediseñar
> nada.** Pregunta de diseño abierta: **Q-37 / P-17** (entrar sin cuenta sin romper RLS).
>
> **Lectura estratégica: esto refuerza G-1, no lo debilita.** La evidencia empírica del propio
> proyecto dice que la distribución de este producto es institucional.

> ## 🔺 2026-08-16 (3ª pasada) — La forma del mercado: churn del 100 % anual (D-52)
>
> El owner preguntó si sería viable un producto **sin clases en vivo**, con el contenido **grabado o
> automatizado en texto**, cuyo ingreso se conduzca por **número de visitantes**. La evaluación
> destapó un hecho estructural que **no estaba escrito en ninguna parte de la memoria**:
>
> > El mercado PAES son **~250.000 personas al año** (A-32) y **se renueva íntegramente cada
> > temporada**. **Churn del 100 % anual, por construcción** — no por mala retención.
>
> Los modelos por volumen viven de retención compuesta, y este mercado la prohíbe. La aritmética
> (en [[TESIS_DE_CRECIMIENTO]] §3.1) es contundente: **publicidad** exigiría alcanzar a cada persona
> que rinde la PAES entre 2 y 6 veces solo para igualar el techo actual de clases; **freemium
> masivo** exigiría ~2× el mercado nacional para la meta grande. Se suma un tercer factor de 2026:
> contenido de texto que *explica* compite con un LLM gratuito y mejor.
>
> **Registrado:** hecho estructural en [[BUSINESS_CONTEXT]] §1.1 · aritmética en
> [[TESIS_DE_CRECIMIENTO]] §3.1 · **D-52** · [[LESSONS_LEARNED]] **L-38** · nota en A-32.
>
> **El corolario importa más que la negativa, y reencuadra G-3:** el producto que el owner describió
> —cero horas en vivo, contenido grabado y automatizado— **es exactamente lo que compra un colegio**.
> No es una alternativa a G-1: **es G-1 bien entregado**, es decir, G-3 metido dentro de G-1. El
> mismo trabajo de contenido rinde **tres órdenes de magnitud distinto** según a quién se le cobra:
> ~CLP 2 por página vista, o CLP 2.400.000 por colegio/año.
>
> **Distancia medida a ese producto:** código 2–4 semanas · contenido **4–7×** (de 58 recursos a
> ~250–400, con la auditoría de ADR-016 como cuello) · tráfico, un muro. Dato útil: la **capa 0**
> (`questions.error_a..d`) **ya es** enseñanza automatizada en texto; falta profundidad, no
> mecanismo.

> ## 🔺 2026-08-16 (4ª pasada) — Google Auth es gratis, y Q-37 estaba mal planteada
>
> El owner preguntó si el Google Auth mencionado en F0 se puede hacer en capa gratuita. **Sí, $0 en
> las tres capas** (Google Cloud, Supabase Auth, infra). Con scopes básicos no hace falta la
> evaluación de seguridad de Google; sí hay que **publicar la app** (en "Testing" el tope son 100
> usuarios).
>
> **Estado verificado en código:** `sign-in-with-google` existe en `supabase.cljs:21` y **nadie la
> llama** — código muerto confirmado. Pero la plomería está: `events/auth.cljs` tiene `getSession` +
> `onAuthStateChange`, y **el `profiles` lo crea el trigger `handle_new_user()`** sobre `auth.users`
> (migración `008`, `security definer`) — así que un usuario que entre por Google obtiene su fila
> sin tocar nada. Era el bug más probable y no existe. Tarea: **T-92** (P1).
>
> **⚠️ Guarda de cumplimiento anotada en T-92:** un botón de Google junto al formulario **evitaría
> la declaración de edad de `login.cljs:141-157`**, que es **D-21**, atada a la Ley 21.719 y a R-06,
> sobre público mayoritariamente menor de edad. La declaración va **antes** del botón.
>
> **Y el hallazgo que importa más que la pregunta: Q-37 estaba escrita con un solo criterio.**
>
> > **La entrada anónima rompe G-4.** Δθ exige reconocer al **mismo estudiante en marzo y en
> > octubre**; una sesión anónima no sobrevive a eso. Optimizar la fricción al máximo destruye el
> > vector que sostiene el ingreso.
>
> Q-37 se reescribió con **dos** criterios (fricción **e** identidad estable) y una **cuarta
> opción**: **cuenta Google del colegio** (Workspace for Education), que es la única que reúne
> fricción casi nula + identidad estable + **el dominio del correo como llave de multi-tenant**
> (toca Q-36/P-16). Contrapesos anotados: no cierra R-31 por sí sola, y el admin de Workspace del
> colegio puede bloquear apps de terceros — eso es **un paso más en la venta** (T-87), no un detalle
> técnico.
>
> **Sigue sin decidirse a propósito (P-17): no antes de T-90.** Una hora de clase dice si los
> estudiantes tienen cuenta del colegio, y esa observación elige la opción.

> ## ⭐ 2026-08-16 (5ª pasada) — Hay distribución, y el sitio dejó de mentir
>
> **Dos cosas grandes, y la primera cambia la premisa de toda la memoria anterior.**
>
> ### 1. El owner tiene tres canales disponibles hoy
>
> Toda la memoria estaba escrita sobre *"ningún colegio contactado"* y *"depende de que alguien
> externo llegue al sitio"*. Es falso:
>
> - **Liceo** donde el owner es profesor de electrónica: una profesora de matemática **ya le ofreció
>   su 4º medio**. Eso es **T-90 literalmente** — deja de ser una llamada en frío.
> - **Cpech**, sede donde trabaja: relación con la dirección, y ya les mencionó que construye
>   software. Es la cuña "academia comercial", más rápida que un colegio subvencionado.
> - **UNAP**: podría reactivarse. Ya corrió el piloto que produjo los 252 diagnósticos.
>
> **Pero acceso ≠ distribución, y el propio historial lo prueba.** El piloto UNAP también fue acceso:
> produjo 252 diagnósticos reales y **cero clientes**, porque estaba encuadrado como *convenio de
> desarrollo* (le pagaron por construir) y no como *venta*. 2012 fue igual. **El cuello nunca fue
> conseguir la puerta: fue que cruzarla no dejaba un cliente que renovara.** → [[LESSONS_LEARNED]]
> **L-39**: encuadre comercial desde el minuto uno, aunque el piloto sea gratis.
>
> **⚠️ Y aparece el riesgo peor calibrado del proyecto: [[RISKS]] R-32.** Dos de los tres canales son
> sus **empleadores**. Si hay cláusula de cesión de PI en el contrato de Cpech y demuestra el producto
> como empleado, se discute la titularidad de dieciséis años de trabajo. **T-93 (leer el contrato) es
> P0 y bloqueante**, cuesta media hora. Y en el liceo: que UTP lo sepa, y hacer T-90 como
> **observación, no como despliegue de datos de menores** en su propio lugar de trabajo.
>
> ### 2. ✅ Q-30 respondida y X-09 cerrada — el copy corregido está publicado (D-53)
>
> Decisión del owner: *"no dejemos que la página mienta ni un día más"*. Dos definiciones: **se
> nombra a la UNEXPO** (biografía factual y verificable, no un aval — la distinción que faltó con la
> UNAP), **sin** la ponencia de 2013; y **la UNAP sale del FAQ de costo**, quedando solo en
> `resume.cljs` como experiencia docente, que es donde corresponde.
>
> **Estaba en CINCO lugares, no en tres como repetía la memoria** — `index.html` (JSON-LD y
> `noscript`), `public/index.html` (JSON-LD), `landing.cljs` y **`home.cljs` (footer)**, este último
> sin figurar en ninguna nota. Corregido en [[LESSONS_LEARNED]] **L-22**.
>
> **Efecto colateral: el precio de D-32 quedó publicado por primera vez** en el FAQ de costo — Q-02
> dejaba pendiente "dónde mostrarlo". **No se tocó `isAccessibleForFree` ni se agregó markup de
> `Offer`.**
>
> **Verificación de esta pasada:** `clj -M:test` **83 tests / 454 assertions / 0 failures, 0 errors**
> · `npx shadow-cljs release app` **0 warnings** · JSON-LD válido en ambos `index.html` · las tres
> auditorías (`contraste`, `dark_theme`, `movil`) en verde · `grep` de la frase vieja = **0**.
>
> **L-30 pagó dividendos:** `public/js/app.js` estaba en **8,6 MB** (build de desarrollo dejado por
> un `watch`) contra 1,2 MB en HEAD. Se detectó **antes** de commitear y el `release` lo dejó en
> 1,2 MB. Sin esa lección se habría publicado un bundle sin minificar.
>
> **Cierra:** Q-30, X-09, **S-18**. **Desbloquea:** la marca personal como canal (G-5) y reabrir con
> la UNAP sin que el sitio cuente una historia falsa sobre ellos.

> ### 🌱 Se corrigió el origen del proyecto (2026-08-13, sin cambios de código salvo T-75)
>
> El owner aportó las fuentes de la etapa venezolana del proyecto y quedó claro que **el relato
> publicado era falso**: no *"se originó en 2025 a partir de un convenio con la UNAP"* — el primer
> commit del repo es del **2025-05-03**, cinco meses *antes* del convenio. La raíz es su **tesis de
> grado (UNEXPO, 2010)** y la línea **Sistema Llovizna**, que llegó hasta una **ponencia oral en el
> II Congreso Venezolano de Ciencia, Tecnología e Innovación (Caracas, nov. 2013)**.
>
> **Lo que esto cambia para el producto de hoy** — el detalle está en [[RAIZ_SISTEMA_LLOVIZNA]], que
> se mantiene corto a propósito: no es un archivo histórico, solo lo que informa una decisión:
>
> - **"Academia Integral" es el nombre de 2010**, no de esta etapa. Reencuadra Q-23: el que debe
>   justificarse es el nombre nuevo del [[VISION_LIBRO_PROYECTO]], no el publicado.
> - **La visión de largo plazo no es nueva:** es la ambición de 2012 (base de datos nacional,
>   contenido de profesores, multi-aula) reformulada. Ya se intentó a esa escala y no se sostuvo. La
>   pregunta útil no es si volver a ser tan ambiciosos, sino **qué cambió desde entonces**.
> - **Tres etapas, un mismo cuello de botella:** nunca fue la idea ni la capacidad técnica, fue
>   llegar a los estudiantes y sostenerlo con una sola persona (R-19 + R-01). Agregar producto sin
>   resolver eso repite el patrón por cuarta vez.
> - **Credibilidad:** la ponencia de 2013 es respaldo propio que no depende de ninguna institución
>   vigente — el vacío que D-18 dejó en B-07. Cautelas en Q-30 (es de 2013, con encuadre político
>   venezolano).
> - **Kahoot/AhaSlides** validaron el mecanismo del CRS con el teléfono, **no** este producto: miden
>   al grupo, no estiman θ ni producen un plan. Encuadre para colegios en [[RAIZ_SISTEMA_LLOVIZNA]] §2.5.
> - ✅ **T-75 implementada:** la objeción de fondo —*"¿para qué medir si puedo preguntar?"*— ya está
>   respondida en el FAQ, en los tres lugares. `clj -M:test` **83/454/0**, `release app` sin
>   warnings, audits en verde, `app.js` commiteado.
>
> **Pendiente y es del owner: Q-30** — el copy publicado todavía dice *"se originó en 2025…"*
> (contradicción X-09). **T-74:** archivar el blog, única fuente fuera del control del proyecto.
>
> **Criterio adoptado:** la raíz es **contexto, no mandato**. Este producto es otro y puede llegar a
> respuestas distintas a propósito; el precedente es D-41.

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
> ⚠️ **Superado el mismo día:** el owner probó la paleta en local, pidió menos luz en el pergamino
> y después otra dirección entera — el lenguaje **Braun / Dieter Rams**
> ([[../adr/ADR-022-lenguaje-braun-rams]]). Lo que sigue describe la pasada intermedia; el mecanismo
> (tokens, escala `indigo` redefinida, audits) es el mismo, la paleta y la forma no.
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
| Verificación de UI | ✅ tres scripts versionados en `scripts/`: tema oscuro, contraste (38 pares) y móvil. Los tres probados contra un caso que debe fallar |
| Identidad visual | ✅ **panel de instrumento** (ADR-023, sobre el lenguaje Braun de ADR-022): página gris medio, física solo en los controles, LEDs para estado y naranja para acción. **38/38 pares WCAG**, tema oscuro y móvil en verde. ✅ **verificada por el owner en teléfono** el 2026-08-13, más las cinco rondas de corrección que salieron de su propio uso |
| Línea del tiempo | 🟡 implementada y testeada (ADR-021); `042` aplicada (35/0). Falta verla funcionando con una cuenta con historial |
| Apariencia configurable | 🟡 `site_settings` (`043`, **sin aplicar**) + pestaña «Apariencia» en el panel: el admin fija qué ve un visitante nuevo, la preferencia local de cada persona gana |
| Perfil del estudiante | ✅ dos ejes: θ (IRT) y **fluidez λ** (ADR-019), con la tarjeta 2×2 en «Mi plan», en producción desde el 2026-08-12. Umbrales de λ **sin calibrar** (T-65) |
| Contenido pedagógico | 🟡 58/61 recursos publicados (T-01); faltan los 2 módulos nuevos de `031` y los 7 de geometría (T-56) |
| Banco de ítems | 🟡 387 ítems PAES; topics canónicos y 259 con módulo, **128 sin módulo** (bancos mezclados, T-60). Además 123 ítems `mq_` del track experimental, **aislados** (`active = false`) — las métricas necesitan `where topic not like 'mq\_%'` |
| Migraciones | ✅ **ninguna pendiente** — `033`–`043` aplicadas y verificadas. `042` el 2026-08-13 (35 ubicados / 0 sin ubicar) y `043` el mismo día: la pestaña **Apariencia** dejó de dar error, que era su síntoma exacto |
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

> **Verificado con `git log` el 2026-08-18.** Antes de esa fecha esta sección estaba congelada en el
> 2026-07-26 y listaba seis commits de julio como "recientes". La distinción que importa acá no es
> cuál es más nuevo, sino **cuál está publicado**: `main` es lo que sirve GitHub Pages en
> jacobocordova.com; todo lo demás no existe para nadie.

**En `main` — esto SÍ está en producción** (`56b00cb`, 2026-08-18):

| Commit | Qué hizo |
|--------|----------|
| `56b00cb` | Tablero agrupado por evaluación, θ vs tiempo y «Rendir de nuevo» (D-60) |
| `a29396d` | Editor del banco usable + pestaña «Ideas erróneas» (T-103) |
| `09ae9a0` | **Merge** de `escape-no-se`: escape del estudiante, editor de recursos y catálogo |
| `cb9b3fb` | Cerrar la bitácora de la sesión y registrar ADR-028 |
| `1fd5e4c` | Cerrar T-92 con la configuración verificada y anotar R-33 |
| `a7312ee` | Conectar el login con Google sin saltarse la declaración de edad (D-56) |
| `e5f2f57` | Agregar la migración de recursos de geometría (T-56) |
| `60d7272` | Dejar un solo `index.html` y auditar el par que sobrevive (T-12, ADR-027) |
| `0e6e312` | Sacar el registro de `/ingresar` y darle su propia ruta (T-05, ADR-026) |

**Lo que traía `escape-no-se`, ya mergeado en `09ae9a0` y publicado:**

| Commit | Qué hizo |
|--------|----------|
| `29db48d` | Cerrar la bitácora de SESSION-032 y registrar D-59, Q-40, T-103 y L-44 |
| `3e0ef20` | Arreglar `module_id` en el editor de preguntas: es uuid, no entero |
| `a672fec` | Cablear el catálogo de misconceptions contra Supabase (`027`) |
| `be13f2c` | Arreglar tres bugs del panel encontrados usándolo de verdad |
| `af8709b` | Actualizar la bitácora con la verificación en vivo y sus dos hallazgos |
| `6d8a3c8` | Congelar θ en el escape: el prior lo empujaba hacia arriba |
| `14e32cd` | Hacer que el escape baje la dificultad y entregue material |
| `7f723e2` | Cerrar SESSION-031 y registrar ADR-029, R-34 y Q-38/Q-39 |
| `0c8a9b3` | Recompilar el bundle y el CSS con el escape y el editor |
| `cb0bd4f` | Agregar la migración `045` (prerrequisitos + recursos por misconception) — **sin aplicar** |
| `0bfad2e` | Dejar de recargar la sección entera al guardar un recurso (D-58) |
| `04f8c1b` | Agregar el escape del estudiante al diagnóstico (ADR-029) |

**Historia anterior (conservada), hasta SESSION-001 el 2026-07-26:**

| Commit | Qué hizo |
|--------|----------|
| `48bf525` | Restaurar el editor de preguntas en el panel de administración |
| `b6ae903` | Acotar la gratuidad en JSON-LD y sincronizar los datos estructurados |
| `c5ee6bc` | Encolar emails de cupo, enriquecer contenido Baldor y archivar MathAcademy |
| `6cf0dc9` | Filtrar cupos por banda con lógica pura (`slots.logic`) y corregir la lista vacía |
| `38fbb96` | Rehacer la portada para captación y mejorar el panel de administración |
| `b40e741` | Funnel MVP operable: perfil de diagnóstico, plan y cupos híbridos |

En esa sesión (**2026-07-26**) se adoptó **Project Memory First**: creación de `project-memory/`,
`adr/`, `sessions/`, `prompts/`, reescritura de `CLAUDE.md` y primer snapshot del grafo de Graphify.
Ver `sessions/SESSION-001.md`.

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
| BL-06 | ~~Login con Google sin proveedor configurado~~ -- **resuelto 2026-08-17** (T-92): credenciales creadas, proveedor habilitado en Supabase y `https://jacobocordova.com/tablero` en la allowlist. Verificado en producción hasta el selector de cuenta de Google | Acceso/operación | — |

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

> **Verificado con `git` el 2026-08-18 (noche).** Reemplaza el estado del 2026-08-09 —que decía que
> en local y en `origin` solo quedaba `main`— y el cuadro de esa misma tarde, que daba `escape-no-se`
> como no mergeada: **ya está en `main` y publicada.**

```
Rama actual  : main @ 56b00cb == origin/main  (GitHub Pages, dominio jacobocordova.com)
Árbol        : limpio
Último merge : 09ae9a0 — escape-no-se (13 commits), con commit de merge
Ramas locales (7): main · escape-no-se · respaldo-pre-squash · t-05-router-url ·
                   t-12-html-unico · t-56-geometria · lint/clj-kondo-cero-warnings
Ramas remotas (4): origin/{main, t-05-router-url, t-56-geometria, lint/clj-kondo-cero-warnings}
Ya mergeadas a main (borrables): escape-no-se · t-05-router-url · t-12-html-unico ·
                   t-56-geometria · lint/clj-kondo-cero-warnings
Sin mergear  : respaldo-pre-squash (respaldo deliberado del 2026-08-13: el estado previo al
                   squash de la poda de memoria)
```

✅ **Resuelto lo que este mismo cuadro marcaba como lo más grave esa tarde:** el trabajo de las tres
últimas sesiones ya no vive solo en un disco. `main` está publicada y **la migración `045` fue
aplicada por el owner el 2026-08-18**, así que el esquema y el código vuelven a estar alineados.

⚠️ **La deuda de ramas creció a cinco mergeadas sin borrar.** Ninguna aporta nada ya; el barrido
sigue pendiente.

⚠️ **La deuda de ramas volvió, en pequeño.** T-18 la dejó en 1 local / 1 remota el 2026-08-09 y R-21
se cerró con eso; hoy son **7 locales / 4 remotas**, y **cinco de ellas ya están mergeadas a `main`**
(incluida `escape-no-se`). No es la escala de 27/24 que motivó T-18, pero confirma que la limpieza no
se mantiene sola.

**Bundle:** el `public/js/app.js` de `56b00cb` corresponde a un `npx shadow-cljs release app` real
(1.366.993 bytes, sin `shadow.cljs.devtools.client` dentro). Sigue vigente la
advertencia de [[LESSONS_LEARNED]] **L-30** sobre watchers de `shadow-cljs`/`tailwind` en background
que ensucian `public/js/app.js`/`app.css` con un build de desarrollo sin cambio de fuente real —
**volvió a pasar el 2026-08-18** (ver SESSION-032). Verificar `git status` antes de cualquier commit
que toque esos dos archivos.

---

### Histórico de esta sección (no borrar: explica de dónde vienen las reglas de arriba)

> Estado del 2026-08-09, superado por el cuadro de arriba:

```
Rama actual  : chore-limpieza-tecnica-y-memoria (creada desde main @ 68a6d97, sin mergear todavía)
Rama deploy  : main  (GitHub Pages, dominio jacobocordova.com) @ 68a6d97
Ramas totales: solo `main` en local y en origin -- las 26 locales / 22 remotas restantes se
               borraron el 2026-08-09 (T-18, ver nota de sesión al inicio de este archivo)
Árbol de trabajo: limpio en main; en chore-limpieza-tecnica-y-memoria hay cambios sin mergear
               (borrado de user.cljs, versiones alineadas, bundle recompilado, memoria actualizada)
```

> Y su nota sobre el bundle, del mismo día: «No se recompiló `public/js/app.js` de una sesión
> anterior sin cambio de fuente esta vez: el cambio en el bundle de esta sesión corresponde a un
> `npx shadow-cljs release app` real, motivado por el bump de versión (X-05)».

**Tooling del agente (2026-07-27):** `graphify` (ya estaba) y **`rtk`** (nuevo, instalado hoy) como
compresores de contexto; **Obsidian** con vault pre-configurado (`.obsidian/`, gitignorado, no
versionado por diseño). Detalle: [[RTK_INTEGRATION_GUIDE]], [[GRAPHIFY_INTEGRATION_GUIDE]],
[[OBSIDIAN_WORKSPACE_GUIDE]], [[DECISIONS]] D-17.

**Deuda de ramas — resuelta 2026-08-09, y vuelta a crecer desde entonces:** llegó a 27 locales / 24
remotas antes de limpiarse, y **al 2026-08-09** el repositorio quedó únicamente con `main` en local y
en `origin`. **Eso ya no es cierto:** al 2026-08-18 son 7 locales / 4 remotas — el cuadro verificado
está arriba, y manda sobre esta frase. Ver [[BACKLOG]] T-18 (cerrada), [[RISKS]] R-21 (cerrado
suponiendo que la limpieza se mantendría sola, cosa que no ocurrió).

**Resuelto (2026-07-29):** `cursor/mvp-operable-funnel` **sí** está mergeada a `main` (verificado
por `git log` y por hash contra producción, ver T-19 arriba). La duda vigente ahora es la rama
`visual-fixes`, no esa — ver T-35. Siempre verificar `git log main..HEAD` antes de prometer que algo
está en producción; no asumir que el estado descrito acá sigue vigente sin repetir el check.

---

Relacionado: [[HANDOFF]] · [[BACKLOG]] · [[RISKS]] · [[ROADMAP]] · [[OPEN_QUESTIONS]] ·
`../sessions/SESSION-001.md`
