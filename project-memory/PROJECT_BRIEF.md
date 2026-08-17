# PROJECT_BRIEF

Última actualización: **2026-08-16** (pivote de negocio: G-1…G-5, [[TESIS_DE_CRECIMIENTO]]; más tarde: tres canales de distribución disponibles en §7, y **S-18 cumplido** — el copy publicado ya no miente sobre el origen, D-53) ·
Fuente: código, migraciones SQL, landing y `PROJECT_SUMMARY.md`

> Este archivo describe el **alcance del producto tal como está implementado**. Lo que el producto
> debe llegar a ser **comercialmente** está en [[TESIS_DE_CRECIMIENTO]] (decidido el 2026-08-16,
> [[../adr/ADR-025-motor-de-valor-b2b-y-cinco-vectores]]); lo que debe llegar a ser
> **pedagógicamente** está en [[VISION_LIBRO_PROYECTO]]. **Nada de esos dos documentos está
> implementado salvo donde se indique explícitamente** — este archivo sigue siendo la única
> descripción de lo que hoy funciona.
>
> **Cambio de eje del 2026-08-16.** El producto implementado es B2C: un estudiante individual se
> diagnostica y recibe un plan. El negocio decidido es **B2B con embudo B2C**: la institución paga
> por el diagnóstico agregado de su matrícula. Todo lo institucional (rol `profesor`, agregación por
> curso, aislamiento por establecimiento, histórico de θ) está **por construir** — épica **E8** de
> [[BACKLOG]]. Ver §5 y §6.
>
> **Y tiene una raíz anterior al código.** Este producto es la continuación de la tesis de grado del
> owner en Ingeniería Electrónica (**UNEXPO, Venezuela, 2010**): un sistema de respuesta en el aula
> que ya planteaba el aula como planta, la evaluación como muestreo y la distinción medición ≠
> evaluación. Lo que aquí se llama MVP es la **recomendación no implementada de esa tesis**
> —individualizar la evaluación— ejecutada sobre otra capa tecnológica. Ver [[RAIZ_SISTEMA_LLOVIZNA]] y
> [[../adr/ADR-024-raiz-en-la-tesis-2010]] (2026-08-13).

## 1. Nombre del proyecto

**Academia Integral** — plataforma de diagnóstico adaptativo y preparación PAES Matemática 1.

> **El nombre es de julio de 2010**, no de esta etapa: es el título del blog con que el owner
> documentó el proyecto raíz, con justificación escrita en 2012. Dieciséis años y tres reescrituras
> técnicas después, sobrevivió. Ver [[RAIZ_SISTEMA_LLOVIZNA]] §2.1 y [[OPEN_QUESTIONS]] Q-23.

- Repositorio: `Yacobh/yacobh.github.io` (GitHub)
- Dominio de producción: <https://jacobocordova.com>
- Nombre interno del código / namespace raíz: `universo` (nombre histórico; ver [[TERMINOLOGY]])
- Versión declarada: `1.1.0-mvp`

## 2. Descripción

Aplicación web de página única (SPA) en ClojureScript que:

1. Aplica un **diagnóstico adaptativo** de matemática basado en **Teoría de Respuesta al Ítem**
   (modelo 1PL/Rasch con estimación MAP), seleccionando cada ítem según la habilidad estimada (θ)
   del estudiante y deteniéndose cuando la precisión es suficiente.
2. Construye un **perfil de aprendizaje de dos ejes**: θ (error estándar, banda de nivel, track
   dominante, **déficits por módulo** y **misconceptions** — la idea errónea detrás de cada
   alternativa incorrecta elegida) y **fluidez λ** (cuánto le cuesta llegar al resultado,
   normalizado por el tiempo de lectura del enunciado). El cruce de ambos separa a quien "sabe y
   automatizó" de quien "sabe pero le cuesta", y les da recomendaciones distintas
   ([[../adr/ADR-019-eje-de-fluidez-en-vez-de-estilos-de-aprendizaje]], 2026-08-12).
3. Genera un **plan de estudio** en dos capas: capa 0 (explicación del error concreto, desde
   `questions.error_a..d`) y capa 1 (recursos por módulo: lectura, video, ejercicio).
4. Publica **cupos de clases** (online o presencial en Iquique) segmentados por banda de θ, con
   confirmación automática del grupo al alcanzar un **mínimo de inscritos**, notificación in-app
   y email.
5. Ofrece un **panel de administración** para gestionar usuarios/roles, banco de preguntas,
   recursos, cupos, listas de inscritos, tests y moderación del libro de visitas.

## 3. Objetivo general

**Objetivo de producto (vigente y operativo).** Que un estudiante que se prepara para la PAES de
Matemática 1 sepa, **en una sola sesión de ~20 minutos y sin costo**, cuál es su nivel real, qué
errores concretos está cometiendo, qué estudiar primero y con qué grupo hacerlo.

**Objetivo de negocio (decidido 2026-08-16, por construir).** Que ese mismo diagnóstico, aplicado a
un curso completo y agregado para su profesor, sea un producto que un colegio pague todos los años
— porque le muestra **en qué** falla su curso y **cuánto mejoró** (Δθ) al cierre del semestre.

Los dos objetivos usan **el mismo motor y el mismo banco**. La diferencia es quién mira el
resultado y quién paga. Ver [[TESIS_DE_CRECIMIENTO]] G-1 y G-4.

## 4. Problema que resuelve

| Problema | Cómo lo aborda |
|----------|----------------|
| El estudiante no sabe por dónde empezar y estudia lo que ya domina | El diagnóstico adaptativo concentra los ítems alrededor de su θ |
| Un puntaje o nota no dice **qué** corregir | Cada distractor está mapeado a una idea errónea nombrable (capa 0) |
| Los preuniversitarios cobran y agrupan por curso, no por nivel real | Iniciativa académica sin costo, agrupación por banda de θ |
| Un curso genérico deja atrás a unos y aburre a otros | Cupos por banda `inicial / basico / intermedio / avanzado` |
| Un grupo con 2 inscritos no es viable | `class_slots.min_enrollments` + confirmación automática por trigger |
| Producir contenido pedagógico completo es caro | El valor se concentra en el **banco de ítems**, no en un CMS |

## 5. Alcance (en el MVP actual)

**Incluido y operativo:**

- Registro/login con email + contraseña (Supabase Auth); rehidratación de sesión. `sign-in-with-google`
  existe en `universo.supabase` pero no está conectado a ningún botón de la UI (`components/login.cljs`
  solo ofrece email/contraseña) — es código muerto, no una opción real para el estudiante hoy.
- Protección de secciones privadas (`:dashboard :diagnostic-test :admin :plan :cupos`).
- Diagnóstico adaptativo IRT 1PL con selección de ítem por cercanía a θ, prefetch de la siguiente
  pregunta, feedback inmediato con explicación del error y regla de parada por precisión.
- Cálculo y materialización del perfil (`student_profiles`: θ, banda, `profile` JSONB), con el
  segundo eje de **fluidez (λ)** y el cuadrante θ × λ (ADR-019).
- "Mi plan": déficits ordenados + explicación de errores + recursos publicados por módulo +
  tarjeta del cuadrante de fluidez.
- "Cupos": listado filtrado por la banda del estudiante, inscripción, estado
  `open → confirmed`, faltantes para confirmar, notificación in-app.
- Cola de email (`email_outbox`) + Edge Function con Resend.
- Panel admin: resumen, usuarios y roles, tests, moderación tri-state del guestbook, editor de
  preguntas, recursos y cupos con roster.
- Landing pública orientada a conversión, con SEO (metadatos, Open Graph, JSON-LD, sitemap).
- Libro de visitas moderado (testimonios) y formulario de contacto.
- Página de perfil del profesor (`:jacobocordova`).

**Incluido pero incompleto** (ver [[CURRENT_STATUS]] y [[BACKLOG]]):

- Contenido: falta al menos un recurso publicado por cada módulo prioritario.
- Email de cohorte: migración `005` + Edge Function existen; falta verificar despliegue y secret
  en el proyecto Supabase real.

**Comprometido y no empezado** (decidido 2026-08-16, épica **E8** de [[BACKLOG]]) — es la distancia
entre el producto que existe y el negocio que se decidió:

| Capacidad | Vector | Por qué es bloqueante |
|---|---|---|
| **Calibración estadística del banco** + reporte técnico publicable | G-2 | Precondición dura de toda venta institucional |
| **Instrumentación del funnel**, CAC y LTV | G-5 | Sin esto ninguna afirmación de negocio es defendible |
| **Rol `profesor`** y panel docente con vista por curso | G-1 | Es literalmente lo que compra un colegio |
| **Agregación por curso** del mapa de errores | G-1 | El entregable del piloto: "22 de 34 confunden el signo" |
| **Aislamiento multi-tenant** por establecimiento (policies RLS) | G-1 | Requisito contractual, no funcionalidad |
| **Histórico versionado de θ** + Δθ con su error | G-4 | El producto que se renueva; resuelve Q-07 |
| **Pasarela de pago** | G-1, premium | Sin cobro no hay ingreso, ni B2B ni B2C (T-04) |
| **Clases grabadas por cuadrante θ×λ** y red de profesores | G-3 | Único camino a margen sin horas del fundador |

## 6. Exclusiones (fuera de alcance, decidido)

> **Revisadas el 2026-08-16 a la luz de [[TESIS_DE_CRECIMIENTO]].** Dos exclusiones se levantaron y
> el resto sigue vigente. Se conserva el texto original tachado en vez de borrarlo (regla de
> gobernanza: no se borra contexto histórico).

- ~~Pagos / cobro de cualquier tipo~~ **Ya no excluido (D-19/D-26, 2026-07-28/30):** el
  diagnóstico, perfil y plan **siguen gratis**, pero las clases de los cupos **tendrán costo**:
  $10.000 CLP por hora, salvo la primera videollamada tras el diagnóstico, que es gratuita. Es una
  **decisión tomada**, no solo una intención -- lo que falta es implementarla (no hay pasarela de
  pago en el MVP todavía; ver [[BACKLOG]] T-04 y [[OPEN_QUESTIONS]] Q-02). **Ampliado el
  2026-08-16 (D-47):** el cobro principal ya no es la clase sino la **licencia institucional
  anual**; las clases quedan como línea premium.
- ~~**Rol "profesor"** distinto de `admin`. Solo existen `user` y `admin`.~~ **Ya no excluido
  (D-47, 2026-08-16):** el rol `profesor` con panel por curso es el entregable central de G-1 — es
  lo que compra el colegio. Sigue **sin implementar**; pasa de exclusión a tarea de la épica E8.
- **Asistencia, notas o certificación** de las clases. Sigue excluido. *(Reevaluar si un colegio lo
  pide como requisito de compra — [[OPEN_QUESTIONS]] Q-35.)*
- **Backend propio / API intermedia.** El cliente habla directo con Supabase
  (ver [[../adr/ADR-002-supabase-como-unico-backend]]). **Sigue vigente y no se reabre con el
  pivote:** el multi-tenant institucional se construye con policies RLS, no con un backend nuevo.
- **App móvil nativa.** Es una web responsive; hay `site.webmanifest` pero no un PWA offline.
- **MathAcademy** (`src/universo/components/mathacademy*`, `improved_math_academy.cljs`):
  archivado, fuera del build. Ver `src/universo/components/mathacademy/ARCHIVE.md` y
  [[../adr/ADR-008-archivar-mathacademy]].
- **Módulos experimentales** no alcanzables desde `core.cljs`: `jardin`, `particulas`, `physics`,
  `voz`, `battery`, `geo`, `animations`, `test_subs`. Se conservan como laboratorio personal, no
  son parte del producto.
- **Otras materias PAES** (Lenguaje, Ciencias, Historia) y **Matemática 2**. **Sigue excluido
  ahora, con fecha de revisión:** es consecuencia natural de G-2 (un banco calibrado hace portable
  el motor) y está en la escalera de [[TESIS_DE_CRECIMIENTO]] §3 recién para 2029. **Precondición
  dura: que el primer mercado funcione.** Abrir materias antes es el error que repetiría el patrón
  histórico de agregar producto sin resolver distribución ([[RISKS]] R-19, R-30).
- **Internacionalización.** Producto en español de Chile (`es-CL`). Misma lógica que la anterior:
  postergada, no descartada.
- **Publicidad como fuente de ingresos.** Excluida por D-46 y **no reabierta** por el pivote — el
  B2B era, ya en esa decisión, una de las dos vías admitidas de ingreso de terceros.

## 7. Stakeholders

| Rol | Quién | Interés / responsabilidad |
|-----|-------|---------------------------|
| Owner / desarrollador / profesor | **Jacobo Córdova** (`jacobocordova@gmail.com`) | Decide producto, escribe el código, dicta el contenido pedagógico. Único responsable técnico. **Autor de la tesis raíz de 2010** ([[RAIZ_SISTEMA_LLOVIZNA]]): la continuidad conceptual del proyecto depende de una sola persona, igual que la técnica ([[RISKS]] R-01). |
| Origen intelectual del proyecto | **UNEXPO**, Vicerrectorado Puerto Ordaz (Venezuela), 2010 | Institución donde el owner presentó el trabajo de grado que es la raíz de este producto. Vínculo **histórico y terminado**; no hay relación vigente ni autorización de marca. No se menciona en producción todavía — la redacción está sin decidir ([[OPEN_QUESTIONS]] Q-30). |
| Episodio de financiamiento (no es el origen) | **Universidad Arturo Prat (UNAP)**, Iquique | Convenio de desarrollo a honorarios, oct–nov 2025, **ya terminado**; sin alianza institucional ni autorización de marca vigente. **Corregido 2026-08-13 (D-45):** el repositorio arranca el **2025-05-03**, cinco meses antes del convenio — la UNAP financió una etapa, no originó el proyecto. Hoy el copy publicado todavía dice lo contrario (D-18): ver X-09. |
| Estudiantes | Postulantes a la PAES M1, principalmente Iquique / región de Tarapacá y online en Chile | Usuarios finales: hacen el diagnóstico, siguen el plan, se inscriben en cupos. **Usan el producto; desde el pivote de 2026-08-16 no son quienes principalmente lo pagan.** |
| **Colegios y sostenedores** (cliente objetivo) | Establecimientos con enseñanza media, decisión de compra típicamente en UTP + sostenedor | **Cliente que paga la licencia anual (G-1).** Compra el diagnóstico aplicado a su matrícula, el mapa de errores por curso y el Δθ de la cohorte. Ciclo de compra: **marzo** |
| **🆕 Canales disponibles hoy** (revelado por el owner 2026-08-16) | **(1) Liceo** donde el owner es profesor de electrónica — una profesora de matemática **ya ofreció** su 4º medio · **(2) Cpech**, sede donde el owner trabaja, con relación con la dirección y el software ya mencionado · **(3) UNAP**, que podría reactivarse | **Corrige la premisa central de toda la memoria anterior**, que asumía cero acceso a distribución. **T-90 deja de ser una llamada en frío.** Pero acceso ≠ distribución: el piloto UNAP ya fue acceso y no dejó cliente ([[LESSONS_LEARNED]] L-39). **Precondición dura antes de usarlos: [[RISKS]] R-32** (propiedad intelectual y conflicto de interés con los empleadores) |
| **Profesores de la red** (rol inexistente todavía) | Profesores independientes de matemática | **G-3:** reciben grupos ya diagnosticados y homogéneos; la plataforma cobra comisión. Es el mecanismo que desacopla el ingreso de las horas del fundador |
| **Inversionistas y fondos públicos** (sin conversación abierta) | CORFO, Start-Up Chile, fondos de innovación educativa, inversión semilla | Decidido el 2026-08-16 buscar capital externo. La memoria del proyecto es el material de due diligence; la tesis y el uso de fondos están en [[TESIS_DE_CRECIMIENTO]] §4 |
| Administradores de plataforma | Cuentas con `profiles.role = 'admin'` | Cargan preguntas y recursos, publican cupos, moderan testimonios, gestionan roles. |
| Proveedores | Supabase, GitHub Pages, Resend, jsDelivr (CDN KaTeX) | Servicios de los que depende la operación. Ver [[DEPENDENCIES]]. |
| Agentes de IA | Claude Code CLI y otros | Ejecutan cambios técnicos bajo [[AGENT_INSTRUCTIONS]]. |

> **Resuelto (D-18, 2026-07-28):** el vínculo con UNAP fue un convenio a honorarios de alcance
> acotado (oct–nov 2025), ya terminado, sin autorización de marca ni alianza institucional
> vigente. Ver [[OPEN_QUESTIONS]] Q-01 (respondida) y [[DECISIONS]] D-18.
>
> **Corregido (D-45 / [[../adr/ADR-024-raiz-en-la-tesis-2010]], 2026-08-13):** D-18 acertó al bajar a
> la UNAP de respaldo vigente a nota histórica, pero al hacerlo fijó el convenio como **origen**, y
> no lo es. La raíz es la tesis UNEXPO de 2010 ([[RAIZ_SISTEMA_LLOVIZNA]]). El copy público sigue diciendo
> *"se originó en 2025…"*: corregirlo es Q-30 y depende del owner.

## 8. Criterios de éxito

### Producto (MVP)

| # | Criterio | Estado 2026-07-26 |
|---|----------|-------------------|
| S-01 | Un estudiante completa login → diagnóstico → perfil → plan → inscripción a un cupo sin intervención manual | ✅ operativo |
| S-02 | El diagnóstico termina en ≤ 12 ítems y ≥ 5, con SE(θ) ≤ 0,35 cuando hay ítems suficientes | ✅ implementado (`irt.progress/default-stop-config`) |
| S-03 | Cada módulo prioritario tiene al menos un recurso publicado | ✅ 58/61 publicados, 2026-08-09 (T-01) |
| S-04 | Un cupo que alcanza `min_enrollments` pasa a `confirmed` y genera notificación in-app | ✅ trigger + UI |
| S-05 | El estudiante recibe email al confirmarse su grupo | ⚠️ código listo, despliegue no verificado |
| S-06 | Un estudiante nunca ve datos de otro (RLS) | ✅ verificado según checklist de go-live |

### Técnico

| # | Criterio | Estado |
|---|----------|--------|
| S-07 | `clj -M:test` en verde | ✅ 74 tests / 410 assertions / 0 failures (2026-08-12) |
| S-08 | Reglas de negocio críticas en namespaces puros con test | ✅ `profile`, `slots.logic`, `irt.progress`, `tetha` |
| S-09 | Costo de infraestructura ≈ 0 | ✅ GitHub Pages + Supabase free tier |
| S-10 | Cualquier sesión nueva puede continuar el proyecto leyendo `project-memory/` | ✅ desde este framework (2026-07-26) |

### Negocio (sin instrumentar)

No existen métricas de negocio medidas hoy (no hay analytics conectado). Las métricas propuestas
están en [[BUSINESS_CONTEXT]] §6 y §6.1, y su instrumentación es una tarea abierta ([[BACKLOG]]
T-20 y épica E8).

**Criterios de «listo para promocionar» (decididos 2026-08-17, L-1…L-5).** Los S-11…S-18 de más
abajo son criterios de **éxito del negocio** e incluyen *"primer contrato pagado"*. Antes que
ellos hay una barrera más chica y más urgente, que el owner decidió definir explícitamente para que
*"una semana más de producto"* tuviera condición de término y no fuera una fecha móvil:

> **¿Puedo mandar tráfico a esto sin quemarlo?**

Los cinco son **verificables**, no de opinión — mismo criterio que los audits de
[[ARCHITECTURE]] §10-bis.

| # | Criterio | Cómo se verifica | Estado |
|---|----------|------------------|--------|
| **L-1** | **El sitio no afirma nada falso.** Único pendiente: **X-02**, la FAQ promete ver *"cómo se movió tu nivel"* al repetir el diagnóstico y no hay histórico | Las afirmaciones del FAQ contrastadas contra el código, una por una | ⛔ pendiente — dos vías: implementar el histórico (T-26, que además es G-4/D-50) o ajustar el copy. **Recomendación registrada: implementar** — es la única promesa que genera una segunda visita |
| **L-2** | **Nadie termina el diagnóstico sin material que estudiar.** Hoy **7 de 18 módulos (todo `geometria`) no tienen recurso**: si el déficit principal cae ahí, el estudiante recibe la capa 0 y nada más | Consulta: ≥1 recurso **publicado** por módulo, 18/18 | 🔧 **en curso 2026-08-17** (T-56) |
| **L-3** | **El owner confía en el θ que entrega el diagnóstico** | Con los **252 diagnósticos ya rendidos**: % de acierto real por ítem, contrastado contra el orden de `difficulty` fijado a mano (T-50). No es la calibración completa de G-2 (S-11), es saber si el orden actual se sostiene | ⛔ pendiente |
| **L-4** | **Se puede saber si la promoción funcionó** | Una sesión de tráfico produce eventos por página distinguibles (T-20). Desbloqueado por el router de ADR-026 | ⛔ pendiente |
| **L-5** | **La fricción del registro es una decisión, no un pendiente** | R-31 y Q-37 cerradas como *"aceptado a propósito, se revisa con datos de T-20"* | ⛔ pendiente |

**Origen y encuadre (2026-08-17).** El owner argumentó —con razón— que la lectura de R-30 era
injusta en un punto: los tres "intentos" históricos que ese riesgo usa como evidencia fueron
**financiamiento estatal (2012, nunca se lanzó)** y un **convenio de desarrollo (UNAP, 2025, le
pagaron por construir)**. **Ninguno fue un intento de promoción de este producto**, así que
*"murió tres veces en distribución"* sobreestima la evidencia: lo correcto es *"tres veces no se
llegó a intentar"*. Se suman dos cambios de condiciones reales: el owner es hoy desarrollador
senior (antes tenía poca experiencia de programación) y trabaja asistido. **La decisión es suya y
está tomada:** una semana más de producto contra estos criterios, y después promoción.
**Lo que R-30 sigue cubriendo** no es la semana, es que la semana no tenga condición de término —
que es precisamente lo que esta tabla resuelve.

**Alcance declarado de la semana:** L-1 y L-2 son los únicos que un desconocido nota, y son la
prioridad. L-3, L-4 y L-5 pueden quedar fuera de la semana **si se dice explícitamente**.

---

**Criterios de éxito del pivote (decididos 2026-08-16, ninguno alcanzado).** Estos son los que
importan ahora: los técnicos ya están todos en verde y no es ahí donde el proyecto está detenido.

| # | Criterio | Vector | Estado |
|---|----------|--------|--------|
| S-11 | El banco tiene parámetros **estimados sobre respuestas reales**, con reporte técnico escrito | G-2 | ⛔ no iniciado |
| S-12 | El funnel está instrumentado de punta a punta y hay un **CAC medido** en al menos un canal | G-5 | ⛔ no iniciado (F10 en 0 %) |
| S-13 | Un profesor externo ve el mapa de errores de **su curso** en un panel y dice qué haría con él | G-1 | ⛔ rol `profesor` no existe |
| S-14 | **Primer piloto institucional** ejecutado en un colegio real (aunque sea gratuito) | G-1 | ⛔ ningún colegio contactado |
| S-15 | **Primer contrato institucional pagado** | G-1 | ⛔ |
| S-16 | Un estudiante ve su **Δθ** entre dos diagnósticos, con su error asociado | G-4 | ⛔ Q-07 recién respondida (D-50), sin implementar |
| S-17 | Existe al menos **una línea de ingreso cuyo margen no depende de una hora del fundador** | G-3 | ⛔ |
| S-18 | El copy publicado dice la verdad sobre el origen del proyecto (Q-30 resuelta) | G-5 | ✅ **cumplido 2026-08-16** (D-53): copy corregido en los 5 lugares y publicado; cierra X-09 |

**Actualización 2026-08-16:** **S-18 cumplido** (el sitio ya no miente sobre su origen), y
**S-14 (primer piloto institucional) dejó de depender de conseguir un colegio** — hay tres canales
disponibles, uno de ellos ya ofrecido. Ver §7 y [[RISKS]] R-32.

**Lectura honesta de esta tabla:** el producto está terminado y el negocio no está empezado. Ese es
exactamente el diagnóstico de [[TESIS_DE_CRECIMIENTO]] §1, y la razón de que S-11 y S-12 (las dos
precondiciones duras) vayan antes que todo lo demás.

---

Relacionado: [[BUSINESS_CONTEXT]] · [[REQUIREMENTS]] · [[ARCHITECTURE]] · [[CURRENT_STATUS]] ·
[[ROADMAP]] · [[HANDOFF]]
