# TERMINOLOGY

Última actualización: **2026-08-13** (vocabulario del panel: control, alojamiento, LED, placa,
visor, grabado, señal; hito, era y medalla de la línea del tiempo) · 2026-08-12 (eje
de fluidez λ, `t_rel`, banda de fluidez y cuadrante θ × λ; θ inicial corregida a `-1.0`; aviso en
"Frecuencia (λ)" porque la implementación no usa la fórmula del libro)

Glosario del proyecto. Incluye términos del dominio (psicometría, PAES), del producto y del código.
**Si un término aparece en el código con un nombre distinto al del negocio, aquí se registran ambos.**

---

## Dominio: psicometría e IRT

**IRT / TRI — Item Response Theory / Teoría de Respuesta al Ítem**
Familia de modelos psicométricos que relacionan la probabilidad de responder correctamente un ítem
con la habilidad del examinado y las propiedades del ítem. Es el enfoque de las pruebas
estandarizadas y el fundamento del diagnóstico de este producto.

**θ (theta) — habilidad estimada**
Parámetro continuo que representa el nivel del estudiante, en logits. En este proyecto se acota a
`[-3, 3]` y **arranca en `-1.0`** desde el 2026-08-11 (antes `0.0`; ver [[DECISIONS]] D-39: el test
abre por ítems más fáciles que la media del banco, no por el centro de la escala). En el código:
`:theta` en `app-db`, `theta` en `student_profiles`.
No es una nota ni un puntaje PAES: es una **estimación** en escala logística.

**b — dificultad del ítem**
Parámetro del ítem en la misma escala que θ. En la base de datos es `questions.difficulty`.
En el modelo 1PL, cuando `θ = b`, la probabilidad de acierto es 0,5.

**1PL / Modelo de Rasch**
Modelo IRT de un parámetro: `P(correcto | θ, b) = 1 / (1 + e^-(θ-b))`. Solo la dificultad
distingue a los ítems (no se modela discriminación ni azar). Implementado en
`universo.components.tetha/probability-1pl`. Ver [[../adr/ADR-004-irt-1pl-map-y-regla-de-parada]].

**MAP — Maximum A Posteriori**
Método de estimación que combina la verosimilitud de las respuestas con un **prior** sobre θ. Aquí
el prior es N(0, 1) (precisión 1.0), lo que **encoge θ hacia 0 cuando hay pocas respuestas** y evita
estimaciones extremas al inicio del test. Funciones: `map-first-derivative`, `map-second-derivative`.

**Newton-Raphson**
Método iterativo para encontrar el máximo del posterior: `θ' = θ − f'(θ)/f''(θ)`. Una iteración por
respuesta (`newton-raphson-iteration`).

**Δθ máximo (`max-theta-step`)**
Límite de 0,4 logits al cambio de θ entre ítems consecutivos. Motivo: que la experiencia no salte de
"muy fácil" a "imposible" por una sola respuesta. Función: `limit-theta-step`.

**Información de Fisher — I(θ)**
Cantidad de información que las respuestas aportan sobre θ. En 1PL, `I(θ) = Σ P(1−P) = −f''(θ)`.
Función: `universo.irt.progress/fisher-information`.

**SE(θ) — error estándar de la estimación**
`SE = 1/√I(θ)`. Mide la precisión de θ: más bajo = más preciso. Cuando no hay información, es `##Inf`.
Es el criterio de parada del test.

**Regla de parada (`stop-reason`)**
El diagnóstico termina cuando: `n ≥ 12` → `:max-items`; `n ≥ 5` y `SE ≤ 0,35` → `:precision`; o no
quedan ítems → `:exhausted`. Configurable vía `default-stop-config`.

**Estabilidad de θ (`stability`)**
Varianza de los últimos 3 valores de `theta-history`; se considera estable si es `< 0,15`. Producida
por `universo.profile/build`.

**Banda de θ (`theta_band`)**
Discretización de θ en cuatro niveles usada para agrupar cohortes:

| Banda | Rango | Etiqueta visible |
|-------|-------|------------------|
| `inicial` | θ < 0 | Inicial |
| `basico` | 0 ≤ θ < 1 | Básico |
| `intermedio` | 1 ≤ θ < 2 | Intermedio |
| `avanzado` | θ ≥ 2 | Avanzado |

Definida en `universo.profile/theta-band` y en el `check` de `class_slots.theta_band`.
**Ojo:** los valores en base de datos van **sin acento** (`basico`); la etiqueta con acento se
produce con `band-label`.

**Distractor**
Alternativa incorrecta de un ítem de selección múltiple. En este producto cada distractor debe
corresponder a una idea errónea identificable, no a un relleno.

**Misconception — idea errónea**
El error conceptual concreto detrás de haber elegido un distractor determinado. Se almacena como
texto en `questions.error_a` … `error_d` y se muestra al estudiante como explicación.
Es **el diferencial del producto**: no "te equivocaste", sino *por qué*.

**Déficit (`deficits`)**
Agrupación de errores por módulo: `{:module-slug … :errors N :total M}`. Ordenados por tasa de error
descendente. Producidos por `universo.profile/deficits-from-responses`. Son el insumo del plan.

**Calibración**
Estimar los parámetros de los ítems (aquí, `difficulty`) a partir de respuestas reales, en lugar de
asignarlos a criterio. **Pendiente en este proyecto** ([[OPEN_QUESTIONS]] Q-05, [[RISKS]] R-17).

**Respuesta no esforzada** (*response time effort*, Wise & Kong)
Respuesta emitida en menos tiempo del que toma leer el enunciado: no informa sobre habilidad, es
equivalente a una moneda al aire. Incluirla **corrompe** θ, así que se descarta. Implementado en
`universo.irt.effort` (ADR-014 Fase 1, T-44): el umbral de cada ítem es
`max(min_response_seconds, largo_del_enunciado / 20)` y por debajo la respuesta recibe **peso 0**.

**Peso de una respuesta (`w`)**
Factor 1.0 o 0.0 que multiplica el aporte de una respuesta a la log-verosimilitud **y a la
información de Fisher**. Que entre en las dos cosas es lo que hace que descartar evidencia **suba el
SE** en vez de dejarlo mentir. Se calcula una sola vez, al registrar la respuesta, y se guarda con
ella dentro de `tests.test`.

**Intensidad temporal de un ítem (β_i)**
Cuánto tarda típicamente un ítem en ser respondido, estimado como el promedio de `ln(tiempo)` sobre
quienes lo respondieron. Es el parámetro que [[BACKLOG]] T-59 quiere aprender de los datos en vez de
fijar por criterio. **No estimable hoy:** ningún ítem tiene suficientes respuestas con tiempo real.

**Velocidad de una persona (τ)**
Segundo rasgo latente del marco de van der Linden, separado de la habilidad θ:
`ln T_ij = β_i − τ_j + ε`, que tiene la misma forma aditiva persona−ítem que `logit P = θ_j − b_i`.
Permite el perfil *"sabe pero lento"* (θ alto, τ bajo), que desaparecería si el tiempo se fundiera
dentro de θ. **No implementado** (ADR-014 Fase 2, T-45).

**Fluidez (λ) — Eje 2 del perfil**
Cuánto le **cuesta** al estudiante llegar al resultado correcto, no si llega. Implementado en
`universo.irt.fluency` el 2026-08-12 ([[../adr/ADR-019-eje-de-fluidez-en-vez-de-estilos-de-aprendizaje]]).
Distingue dos personas que θ deja idénticas: la que resuelve bien **y de inmediato** (herramienta
automatizada) de la que resuelve bien **tras pelearla** (la tiene, pero le cuesta cada vez).
⚠️ Conserva el nombre del libro pero **no** su fórmula (`n_respuestas / Δt_sesión`); ver "Frecuencia
(λ)" más abajo.

**Tiempo relativo (`t_rel`)**
`t_rel = segundos observados / segundos de lectura del enunciado`, siendo el divisor el mismo
`effort/reading-seconds` que ya usa el filtro de esfuerzo. `t_rel = 3` significa "tardó tres veces
lo que toma leerlo". Es **el estadístico que se usa de verdad**: adimensional, comparable entre
ítems de largos distintos, y explicable en una frase. λ se define como su recíproco (`λ = 1/t_rel`)
solo para conservar la dirección del libro ("λ alta = más fluido").

**Banda de fluidez**
Discretización de la **mediana** de `t_rel` sobre las respuestas *usables* (correctas, con tiempo
medido y con peso 1.0): `:fluida` (`t_rel` ≤ 3), `:media` (≤ 6), `:laboriosa` (> 6). Mediana y no
promedio porque el test es autoadministrado: un ítem de 8 minutos —alguien fue a buscar agua— arruina
cualquier promedio. **Los cortes 3 y 6 son autorales y están sin calibrar** ([[RISKS]] R-24,
[[BACKLOG]] T-65); desde la migración `041` son configurables por banco.

**Cuadrante θ × λ (`fluency-profile`)**
Cruce de la banda de θ (colapsada a alto/bajo) con la de fluidez (colapsada a fluida/no fluida), en
cuatro perfiles con **acciones distintas**: *Consolidado*, *Sabe pero le cuesta* (→ práctica de
fluidez, **no** más teoría), *Rápido sin base* y *En construcción*. La acción es la razón de existir
del eje: sin ella el cuadrante sería una etiqueta bonita. `:media` cae del lado "no fluida" a
propósito — ante la duda, ofrecer práctica de fluidez no le hace daño a nadie.

**Hito (línea del tiempo)**
Un módulo ubicado en el año en que su contenido apareció por primera vez en una forma reconocible
(ADR-021). No es "la unidad 4": `algebra/expresiones` es 1591, Viète escribiendo letras para lo
conocido y lo desconocido. Vive en `modules.historical_year` / `historical_era` /
`historical_figure` (migración `042`). Un módulo **sin año no es un hito** y no aparece en la línea.

**Era**
Agrupación de hitos para repartir el espacio de la línea: `antiguedad` (…500), `medieval`
(501–1400), `renacimiento` (1401–1650), `moderna` (1651–1899), `contemporanea` (1900…). Existe
porque el eje **no puede ser lineal**: entre el papiro de Moscú (−1850) y John Bell (1964) hay 3800
años, pero 14 de los 35 hitos caen entre 1900 y 1964. El corte de 1900 es el cuanto de Planck.

**Medalla**
Estado de un hito para un estudiante: `:oro` (θ ≥ 2), `:plata` (θ ≥ 1), `:bronce` (rendido) o
apagado (sin rendir). **Es una lectura del θ que ya existe, no una recompensa nueva**: no otorga
nada ni cambia el plan. Los cortes son espejo de la banda de θ — si divergieran, alguien vería
"Avanzado" en su perfil y plata en la línea por el mismo test.

**Media geométrica vs. media simple (en tiempos)**
El tiempo es multiplicativo, no aditivo: una respuesta de 300 s no es "un poco más" que una de 5 s.
La media simple la arrastra un solo valor extremo — medido en este proyecto: el ítem 361 tiene media
78,7 s y mediana 4,8 s. Por eso los estimadores de tiempo usan mediana o `exp(promedio de ln t)`.

---

## Interfaz: el panel de instrumento

Vocabulario de ADR-022 y ADR-023. Son **cinco clases** definidas una sola vez en `src/css/app.css`,
no utilidades sueltas: si se repiten a mano divergen al tercer componente.

**Panel**
La superficie de la página: gris medio, plana y callada. No es la hoja blanca de un documento, es la
carcasa de un aparato. Consecuencia medida que ordena todo lo demás: **sobre el panel no resalta
nada** (el LED da 1.04 de contraste, el naranja 1.68), así que el contraste lo tiene que poner el
control, no el fondo.

**Control (`.control`)**
Algo que se puede accionar. Bisel con filo claro arriba y sombra abajo; se hunde al presionar. El
relieve **no es adorno**: es lo único que delimita un botón sobre un panel que no contrasta.

**Alojamiento (`.alojamiento`)**
El hueco oscuro y hundido donde vive un LED. Sin él, un LED sobre el panel claro es invisible; dentro,
llega a 7.20 de contraste. Es la razón por la que en la referencia de Braun ningún diodo está sobre
la carcasa.

**LED (`.led`, `.led--on`)**
Indica **estado**, nunca acción: encendido significa "esto es verdad ahora" — un hito descubierto, un
nivel alcanzado. Cian. Apagado no desaparece: se ve como un diodo sin corriente, porque el estado
vacío también informa.

**Placa (`.placa`)**
Un módulo montado sobre el panel (una tarjeta). Se delimita con **luz** —filo claro arriba, sombra
proyectada abajo— y no con color: el borde de color no alcanzaba (2.08 de contraste).

**Visor (`.visor`)**
Superficie clara propia, **igual en ambos temas**, para contenido que trae sus propios colores y no
puede reaccionar al tema: la gráfica IRT, que pinta el SVG con literales por una razón documentada.
Es lo que permite que un solo juego de colores funcione en claro y en oscuro.

**Grabado (`.grabado`)**
Leyenda impresa en la carcasa: mismo material, un tono más oscuro, nunca un color. **Dentro de un
alojamiento o un visor va iluminada, no grabada** — la distinción costó tres rondas de corrección:
una etiqueta grabada sobre su propio fondo es invisible, y aun con contraste AA (5.50) seguía sin
leerse por tamaño y sombra.

**Señal (`senal-*`)**
El naranja Braun. Marca **acción**: hay una sola por pantalla. Los cortes no son libres — relleno en
400, texto o regla sobre fondo claro en 700 — y están declarados en `scripts/audit_contraste.py`.

---

## Dominio: educación chilena

**PAES — Prueba de Acceso a la Educación Superior**
Sistema de pruebas de admisión universitaria en Chile, sucesor de la PSU. Se rinde hacia fin de año.

**Matemática 1 (M1)**
Prueba obligatoria de la PAES que cubre números, álgebra y funciones, geometría y probabilidad. **Es
el único alcance del producto** (M2 está fuera).

**Baldor**
Referencia al *Álgebra de Baldor*, texto clásico latinoamericano. Aquí se usa como **criterio de
descomposición del contenido en skills atómicas** (los `modules`), no como fuente literal de
material. De ahí "módulos Baldor-aligned" en las migraciones.

**Track**
Área temática de un módulo. Solo tres valores permitidos: `aritmetica`, `algebra`, `geometria`
(check en `modules.track`).

**Módulo (`modules`)**
Skill atómica identificada por `slug` con formato `track/tema`, p. ej. `aritmetica/fracciones`.
Tiene `title`, `order_index` y `historical_blurb`.

**`historical_blurb`**
Párrafo breve de contexto histórico del módulo (de dónde viene el concepto). Recurso pedagógico y
diferenciador de tono, sembrado en `002` y enriquecido en `004`.

**Capa 0 / Capa 1**
Las dos capas de contenido pedagógico ([[../adr/ADR-005-banco-de-items-en-vez-de-cms]]):

- **Capa 0** — las explicaciones de error en `questions.error_a..d`. Es lo que aparece en el
  feedback del diagnóstico y en la primera parte de "Mi plan". Barata de producir, alto valor.
- **Capa 1** — los `resources` por módulo (`text`, `video_url`, `audio_url`, `exercise`). Material
  de estudio propiamente tal.

---

## Producto

**Academia Integral**
Nombre comercial y de marca del producto. Aparece en la landing, el JSON-LD y el footer.

**Universo**
Nombre **interno** del código: el namespace raíz es `universo.*`. Es un nombre histórico anterior al
producto actual; no aparece de cara al usuario. **No confundir**: `universo.profile` es código de
Academia Integral.

**Funnel MVP**
El recorrido operable completo: `Login → Diagnóstico IRT → Perfil → Mi plan → Cupos → Inscripción →
Confirmación → Notificación`.

**Diagnóstico**
El test adaptativo. En el código: sección `:diagnostic-test`, estado `:test` en `app-db`, componente
`components/diagnostic_test.cljs`. **No es una evaluación calificada** y así se comunica.

**Perfil (de aprendizaje)**
Resultado del diagnóstico: θ, SE, banda, track, déficits, misconceptions, estabilidad. Se materializa
en `student_profiles.profile` (JSONB). **No confundir con `profiles`** (tabla de cuentas y roles).

**Mi plan**
La sección que muestra los déficits priorizados con capa 0 + capa 1. Sección `:plan`.

**Cupo (`class_slots`)**
Una instancia de clase publicada: banda, track, modalidad, fecha/hora, lugar o enlace, capacidad,
mínimo de inscritos, estado, título. En la UI, sección `:cupos`.

**Modalidad (`modality`)**
`online` (videollamada) o `presencial` (Iquique).

**`min_enrollments` — mínimo de inscritos**
Umbral que un cupo debe alcanzar para pasar de `open` a `confirmed`. Es la regla que hace viable una
cohorte ([[../adr/ADR-006-cohortes-por-banda-con-minimo-de-inscritos]]).

**Estado de cupo (`status`)**
`open` (abierto a inscripción) · `confirmed` (alcanzó el mínimo, el grupo va) · otros estados de
cierre/cancelación. El estudiante solo ve `open` y `confirmed`.

**Inscripción (`enrollments`)**
Relación estudiante ↔ cupo, con `status`. Se consideran **activos** los `pending` y `confirmed`.

**Roster**
Lista de inscritos de un cupo, visible para el admin.

**Outbox (`email_outbox`)**
Cola de correos pendientes de envío, con `status` (`pending`/`sent`/`failed`), `attempts` y
`last_error`. Patrón *transactional outbox*: la DB encola, un proceso aparte envía
([[../adr/ADR-007-email-outbox-con-edge-function]]).

**Guestbook / libro de visitas**
Firmas públicas moderadas. Su moderación es **tri-state**: `is_approved = null` pendiente,
`true` aprobado (visible como testimonio en la landing), `false` papelera.

**MathAcademy**
Producto anterior/paralelo dentro del mismo repositorio, **archivado** y fuera del build. Ver
`src/universo/components/mathacademy/ARCHIVE.md` y
[[../adr/ADR-008-archivar-mathacademy]].

---

## Código y arquitectura

**re-frame**
Framework de arquitectura del cliente. Vocabulario:

- **`app-db`** — el átomo único con **todo** el estado de la aplicación. Su forma canónica está en
  `universo.db/default-db`.
- **evento (`reg-event-db` / `reg-event-fx`)** — la única forma de cambiar el estado. `-db` para
  cambios puros, `-fx` cuando además hay efectos.
- **efecto (`reg-fx`)** — la frontera con el mundo exterior (Supabase, `js/Date`, timers).
- **suscripción (`reg-sub`)** — lectura derivada del `app-db`; lo único que consumen los componentes.
- **`dispatch` / `dispatch-sync`** — enviar un evento (asíncrono / inmediato, este último solo para
  la inicialización).

**Reagent**
Envoltorio ClojureScript de React. Los componentes son funciones que devuelven **Hiccup**
(`[:div {:class "…"} …]`).

**Namespace puro**
Namespace sin I/O ni estado: solo funciones de datos a datos. Aquí: `universo.profile`,
`universo.slots.logic`, `universo.irt.progress`, `universo.components.tetha`. Son los namespaces con
tests ([[../adr/ADR-009-logica-pura-testeable]]).

**Espejo (regla espejo)**
Regla de negocio implementada **dos veces a propósito**: en SQL (fuente de verdad) y en
ClojureScript puro (para que la UI pueda anticipar el resultado sin esperar al servidor). Caso
principal: la confirmación de cupo. Si se cambia una, hay que cambiar la otra ([[RISKS]] R-08).

**`db.crud`**
`universo.db.crud`: capa **canónica** de acceso a datos. Todas las funciones devuelven
`{:success bool :data … :error …}` sobre `core.async`.

**RLS — Row Level Security**
Mecanismo de PostgreSQL que filtra filas por usuario mediante policies. En este proyecto es el
**único** control de autorización.

**`is_admin()`**
Función SQL que indica si el usuario actual tiene `profiles.role = 'admin'`. Se usa en las policies
de administración.

**Sección (`:current-section`)**
Unidad de navegación de la SPA (`:main`, `:login`, `:diagnostic-test`, `:dashboard`, `:plan`,
`:cupos`, `:admin`, `:guestbook`, `:jacobocordova`). **No hay URLs**: la navegación es estado
([[ARCHITECTURE]] §2.1).

**`protected-sections`**
Conjunto de secciones que exigen sesión: `:dashboard :diagnostic-test :admin :plan :cupos`.
Es **UX, no seguridad** — la seguridad es RLS.

**Prefetch**
Cargar la siguiente pregunta mientras el estudiante lee el feedback de la actual, para que no haya
espera al continuar. Estado: `:prefetched-question`, `:prefetching?`.

**`normalize-question`**
Traduce una fila de `questions` (columnas SQL) al mapa del dominio (`:options`, `:errors {:A …}`,
`:difficulty`, `:module-slug`).

**Topic / alias de topic**
`questions.topic` es el identificador real del banco (p. ej. `numbers_V1`). La UI usa etiquetas
legibles ("Números"), traducidas por `topic-aliases` en `events/test.cljs`. Además
`profile/topic->module-slug` mapea topic → módulo; lo no mapeado cae en `unknown/*`.

**Bundle (`public/js/app.js`)**
El artefacto compilado por shadow-cljs. **Está versionado en Git y es el mecanismo de despliegue**
([[../adr/ADR-003-github-pages-artefacto-versionado]]).

---

## Visión de negocio (Libro del Proyecto — no implementado)

Términos introducidos por [[VISION_LIBRO_PROYECTO]], el documento de visión de largo plazo del
fundador. **Ninguno de estos existe en el código hoy**; se registran para que no se confundan con
los términos ya implementados de arriba, que cubren un concepto relacionado pero distinto.

**Academia Online de Matemáticas**
Nombre usado en el "Libro del Proyecto" para la visión de negocio ampliada. **No confundir** con
**Academia Integral**, el nombre comercial ya implementado y publicado (PAES Matemática 1, UNAP).
Relación entre ambos nombres sin aclarar — ver [[OPEN_QUESTIONS]] Q-23.

**Motor Adaptativo**
Nombre que usa el libro para el mecanismo de selección de dificultad. En el código, el mecanismo
equivalente es el motor IRT 1PL/MAP (`universo.components.tetha`, `universo.irt.progress`) — más
específico de lo que el libro describe.

**Grupo de Conocimiento**
Clasificación estática del estudiante al momento del diagnóstico inicial, en tres niveles
(básico/medio/avanzado) según dificultad `[-3, 3]`. Distinto de la **banda de θ** ya implementada
(cuatro niveles: `inicial/basico/intermedio/avanzado`, ver "Dominio: psicometría e IRT" arriba).

**Grupo de Aprendizaje**
Clasificación dinámica propuesta, que evolucionaría con el ritmo, la frecuencia (λ) y el estilo de
aprendizaje observado. No tiene tabla, evento ni concepto equivalente en el código.

**Frecuencia (λ) — Eje 2** *(definición del libro; ver abajo la implementada)*
`λ = n_respuestas / Δt_sesión`, en respuestas por minuto. Se propuso como segundo eje de
clasificación, junto al conocimiento (θ).

> ⚠️ **El eje se implementó el 2026-08-12 con otra definición.** Se conserva el nombre y la
> dirección ("λ alta = más fluido"), pero la medida **no** es una frecuencia de sesión: es por ítem
> y normalizada por el largo del enunciado. Ver "Fluidez (λ)" en el bloque de psicometría e IRT y
> [[../adr/ADR-019-eje-de-fluidez-en-vez-de-estilos-de-aprendizaje]]. Una frecuencia de sesión
> mediría sobre todo cuántas pausas hizo la persona, no cuánto le cuesta cada ítem.

**Control Retroalimentado**
Marco conceptual del libro: el estudiante es medido continuamente y el sistema ajusta contenido,
dificultad y ritmo en consecuencia. Es una descripción de alto nivel de lo que el motor IRT ya
hace; el libro no propone un mecanismo técnico distinto.

**Freemium**
Modelo de negocio propuesto para el mediano plazo del libro (acceso básico gratis, funciones
avanzadas de pago). Ese modelo específico sigue sin implementar, pero el modelo actual **ya no
carece de tramo de pago**: D-19/D-26 (2026-07-28/30) fijaron que las clases de los cupos cuestan
$10.000 CLP/hora (primera gratis) -- es pago por clase, no freemium, pero es un primer tramo de
pago real, ya decidido.

**MAU — Monthly Active Users**
Métrica de usuarios activos mensuales citada en el libro. No instrumentada (ver
[[BUSINESS_CONTEXT]] §6, sin analytics conectado).

**NPS — Net Promoter Score**
Métrica de lealtad ("¿qué tan probable es que recomiendes esto?") propuesta como métrica de
negocio en el libro. No instrumentada.

**BaaS — Backend as a Service**
Término genérico que usa el libro para describir el rol de Supabase en la arquitectura. Ya
documentado con más precisión en [[ARCHITECTURE]] y [[TECH_STACK]].

---

## Metodología y herramientas

**PMF — Project Memory First**
La metodología de este repositorio: la memoria del proyecto (Markdown versionado en Git) es la
fuente de verdad; Obsidian y Graphify son capas complementarias.
Ver [[../adr/ADR-010-adopcion-project-memory-first]].

**Project Memory**
El contenido de `project-memory/` + `adr/` + `sessions/` + `prompts/`.

**ADR — Architecture Decision Record**
Documento inmutable que registra una decisión: contexto, decisión, alternativas, consecuencias,
riesgos y seguimiento. Un ADR no se edita para cambiar la decisión: se **reemplaza** por otro.

**Session log (`SESSION-XXX.md`)**
Bitácora de una sesión de trabajo: objetivo, actividades, archivos, decisiones, riesgos, próximos
pasos y qué se actualizó en la memoria.

**Handoff**
`HANDOFF.md`: el documento que permite a una persona o agente nuevo continuar el proyecto sin
acceso al historial de conversaciones.

**Obsidian**
Aplicación de notas usada como **Knowledge Workspace** (navegación, Graph View, Canvas) sobre los
mismos archivos Markdown. **No es** fuente de verdad ([[OBSIDIAN_WORKSPACE_GUIDE]]).

**Graphify**
Herramienta CLI que construye un **grafo de conocimiento del repositorio** (nodos, aristas,
comunidades, god nodes) y genera `GRAPH_REPORT.md`, `graph.json` y `graph.html`. Herramienta de
análisis, **no** fuente de verdad ([[GRAPHIFY_INTEGRATION_GUIDE]]).

**God node**
En Graphify, nodo con más conexiones: candidato a abstracción central del sistema.

**Comunidad (Graphify)**
Grupo de nodos densamente interconectados detectado automáticamente; aproxima un subsistema.

**Hiperarista (Graphify)**
Relación entre **más de dos** nodos, que representa un flujo o proceso completo (p. ej. el funnel
MVP como un solo hecho).

**`graphify update` / `cluster-only`**
`update`: re-extrae archivos cambiados y actualiza el grafo (AST, sin costo de API).
`cluster-only`: re-agrupa el grafo existente y regenera reporte y visualización.

---

Relacionado: [[ARCHITECTURE]] · [[REQUIREMENTS]] · [[PROJECT_BRIEF]] · `supabase/SCHEMA.md` ·
`supabase/CONTENT.md`
