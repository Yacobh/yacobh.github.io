# BUSINESS_CONTEXT

Última actualización: **2026-08-16** (pivote de modelo de negocio: licencia institucional B2B como
línea principal y cinco vectores de valor G-1…G-5 — [[../adr/ADR-025-motor-de-valor-b2b-y-cinco-vectores]],
D-47…D-51; §1.1 nueva: churn anual del 100% como forma del mercado, D-52; §4.2 nueva: el funnel apunta al canal equivocado, R-31). Antes: 2026-08-13 (origen corregido — D-45; publicidad descartada — D-46)

> **Este archivo describe el negocio; [[TESIS_DE_CRECIMIENTO]] describe cómo crece.** Los cinco
> vectores G-1…G-5 y toda la aritmética del plan viven **allá y solo allá** — aquí se referencian.
> Si este archivo contradice a la tesis en materia de modelo de negocio, gana la tesis.

## 1. Contexto

En Chile el acceso a la educación superior se define por la **PAES** (Prueba de Acceso a la
Educación Superior). **Matemática 1 (M1)** cubre números, álgebra y funciones, geometría y
probabilidad, y es la prueba obligatoria para la mayoría de las carreras. La preparación se
concentra en preuniversitarios pagados que agrupan por curso y avanzan a un ritmo único.

**Academia Integral** es un **proyecto personal del profesor Jacobo Córdova**, en **Iquique,
región de Tarapacá**. La propuesta es aplicar psicometría (IRT) para personalizar el punto de
partida de cada estudiante y agrupar a los estudiantes por **nivel real de habilidad**, no por
curso ni por colegio.

**Origen (corregido 2026-08-13, D-45 / [[../adr/ADR-024-raiz-en-la-tesis-2010]]).** El proyecto **no
nació en 2025 ni en Chile**: viene de la tesis de grado del owner (**UNEXPO, Venezuela, 2010**) y de
la línea **Sistema Llovizna**, que llegó hasta una ponencia en el II Congreso Venezolano de Ciencia,
Tecnología e Innovación (2013). El **convenio con la UNAP** (oct–nov 2025, terminado, sin alianza ni
marca vigente — [[OPEN_QUESTIONS]] Q-01, [[DECISIONS]] D-18) fue un **episodio de financiamiento**,
no el origen: el primer commit del repo es del **2025-05-03**, anterior al convenio. El copy
publicado todavía dice lo contrario; corregirlo está pendiente de decisión del owner (Q-30, X-09).

Lo que de esa historia importa para dimensionar el producto —el nombre, la escala que ya se intentó,
el diferencial y el patrón de tres etapas sin llegar a estudiantes— está en
[[RAIZ_SISTEMA_LLOVIZNA]], que se mantiene breve a propósito.

**Patrón que conviene tener presente antes de cualquier plan de financiamiento o contratación:** van
**dos intentos institucionales sin fondos** (2012–13 Estado venezolano; 2025 convenio UNAP) y **un
intento de equipo en 2012** que no se sostuvo. Lo que sostuvo el proyecto dieciséis años fue el
trabajo de una sola persona: [[RISKS]] R-01 no es un estado transitorio del MVP, es el patrón
histórico — y el proyecto **ya intentó salir de él**. Lo que nunca se logró, en ninguna etapa, es
llegar a los estudiantes de forma **sostenida** ([[RISKS]] R-19).

**La objeción de fondo a esta propuesta de valor, presente en todo material de captación:** *¿para
qué medir, si el estudiante puede decir qué no entiende?* Es la primera pregunta que se hace
cualquiera —ya se la hacían en 2011— y la respuesta existe desde la tesis de 2010: el estudiante que
no sabe qué le falta no puede decirlo, la presión social hace que ni siquiera pregunte, y nombrar las
dudas no las prioriza. **Publicada en el FAQ el 2026-08-13** ([[BACKLOG]] T-75, Q-31).

**Competencia adyacente: Kahoot! y AhaSlides.** Hacen con el teléfono lo que la tesis describía con
hardware, pero **no son competencia directa**: miden al grupo para animar la clase; no estiman
habilidad por persona, no nombran el error conceptual y no producen un plan — los tres pilares de
esta propuesta. Encuadre ante un colegio que ya conoce Kahoot: *"Kahoot mide a la clase; esto mide a
cada estudiante y le dice qué estudiar"*. Ver [[RAIZ_SISTEMA_LLOVIZNA]] §2.5. **Desde el 2026-08-16
esa frase dejó de ser una analogía y es el encuadre de venta de G-1** ([[TESIS_DE_CRECIMIENTO]] §2).

### 1.1 🔺 La forma del mercado: churn anual del 100% por construcción

**Hecho estructural, registrado el 2026-08-16.** Es la restricción de mercado más importante del
proyecto y no estaba escrita en ninguna parte.

> El mercado de preparación PAES son **~250.000 personas al año** (A-32, sin verificar contra DEMRE)
> y **se renueva íntegramente cada temporada**: el estudiante rinde la prueba y se va para siempre.

No es una tasa de retención mala que se pueda mejorar con producto. Es la **forma** del mercado:

- **Churn anual = 100 %, por definición.** Se recompra la base completa de clientes todos los años.
- **No hay LTV que componga.** Cada peso de CAC se amortiza en una sola temporada, no en cinco.
- **No hay boca a boca que se acumule dentro de la cohorte**, porque la cohorte desaparece.
- **La demanda es estacional y estrecha** (R-19), y esa ventana es la única del año.

**La consecuencia práctica es dura y conviene tenerla presente antes de cualquier idea nueva de
monetización:** todo modelo de ingreso que dependa de **volumen de visitantes** —publicidad,
freemium masivo, contenido monetizado por tráfico— **necesita retención compuesta para funcionar, y
este mercado la prohíbe**. La aritmética completa está en [[TESIS_DE_CRECIMIENTO]] §3.1, y es la
razón principal de D-52.

**El contraste que ordena toda la estrategia:** el estudiante se va; **el colegio permanece**. Es la
misma medición, vendida a un cliente que renueva. Por eso G-1 no es una preferencia comercial: es la
única forma conocida de que este producto tenga LTV.

## 2. Objetivos de negocio

> **Reordenados el 2026-08-16 (D-47…D-51).** Los objetivos B-01…B-07 siguen vigentes, pero dejaron
> de ser el marco: ahora **sirven** a los cinco vectores de valor **G-1…G-5** definidos en
> [[TESIS_DE_CRECIMIENTO]]. La columna nueva dice a cuál. Los objetivos B-08…B-11 son nuevos y
> nacen del pivote.

| # | Objetivo | Cómo se materializa en el producto | Sirve a |
|---|----------|------------------------------------|---------|
| B-01 | Captar estudiantes de la región y online con una oferta gratuita y diferenciada | Landing de conversión con CTA único "Comenzar mi diagnóstico" | G-5 |
| B-02 | Reducir a cero la fricción de entrada | Solo email; el diagnóstico corre en el navegador, móvil o desktop, ~20 min | G-5 |
| B-03 | Demostrar valor **antes** de pedir compromiso | El perfil (θ + errores) y el plan se entregan inmediatamente y sin costo | G-5 |
| B-04 | Convertir estudiantes diagnosticados en **cohortes viables** | Cupos por banda con `min_enrollments`; el grupo no arranca sin masa crítica | G-3 |
| B-05 | Operar con costo marginal ≈ 0 | GitHub Pages + Supabase free tier + Resend free tier | G-1 |
| B-06 | Construir un activo reutilizable: el **banco de ítems calibrado** | `questions` con `difficulty` y `error_a..d` mapeados a misconceptions | **G-2** |
| B-07 | Credibilidad académica del método frente al estudiante y su familia (ya no se apoya en un respaldo institucional vigente, ver D-18) | Método IRT explícito, datos de θ y déficits por cohorte. **Desde 2026-08-13** hay además respaldo propio que no depende de ninguna institución vigente: tesis aprobada (UNEXPO, 2010) y ponencia en el II Congreso Venezolano de Ciencia, Tecnología e Innovación (2013). Cautelas y decisión de si se comunica: Q-30 | G-2, G-5 |
| **B-08** | **Vender al que puede pagar sin consumir horas del profesor: la institución** | Licencia anual por establecimiento sobre diagnóstico + mapa de errores agregado + panel docente (rol `profesor`, por construir) | **G-1** |
| **B-09** | **Convertir el banco en un activo auditado, no en una afirmación** | Calibración estadística sobre respuestas reales + reporte técnico publicable; `difficulty` estimada en vez de asignada | **G-2** |
| **B-10** | **Que ninguna línea de ingreso nueva dependa de una hora más del fundador** | Clases grabadas por cuadrante θ×λ + red de profesores con comisión sobre grupos ya clasificados | **G-3** |
| **B-11** | **Vender evidencia de mejora (Δθ), no acceso** | Histórico versionado de perfiles + re-diagnóstico + Δθ por estudiante y por cohorte, siempre con su error asociado | **G-4** |

## 3. Propuesta de valor

> "Prepara la PAES de Matemática estudiando solo lo que te falta."

Cuatro pilares, tal como se comunican hoy en la landing (`src/universo/components/landing.cljs`):

1. **Mide lo que importa** — IRT, el mismo enfoque psicométrico de las pruebas estandarizadas: la
   dificultad se adapta y la estimación es precisa con muchas menos preguntas.
2. **Ataca la causa, no el síntoma** — cada alternativa incorrecta está asociada a un error
   conceptual específico; el plan explica *por qué* se equivocó.
3. **Contenido con estructura** — progresión clásica (aritmética → álgebra → geometría), alineada
   a módulos tipo Baldor.
4. **Grupos por nivel** — nadie queda atrás ni se aburre esperando.

### 3.1 Propuesta de valor por segmento (desde 2026-08-16)

El pivote a B2B (G-1) obliga a distinguir **quién usa** de **quién paga**. Son distintos, y el
material de venta también:

| Segmento | Qué recibe | Qué le duele hoy |
|---|---|---|
| **Estudiante** (usa, no paga) | Diagnóstico honesto en ~20 min, mapa de errores nombrados, plan priorizado, y su Δθ en el tiempo | No sabe por dónde empezar y estudia lo que ya domina |
| **Apoderado** (influye) | Visibilidad del nivel real desde el día 1 y evidencia medida de que mejoró | Paga preuniversitario sin saber si sirve |
| **Colegio / sostenedor** (**paga** — G-1) | Diagnóstico aplicado a un nivel completo en una hora de clase; **mapa de errores agregado por curso**; panel docente; Δθ de la cohorte al cierre del semestre | Sabe *que* el curso está mal en matemática, no sabe *en qué* ni qué hacer el lunes |
| **Profesor de la red** (opera — G-3) | Grupos ya diagnosticados, homogéneos por banda y con el mapa de errores encima | Preparar clase para un curso de nivel disperso es caro y solitario |

**La frase que vende al colegio no es la del estudiante.** Al estudiante se le dice *"estudia solo
lo que te falta"*; al colegio se le dice *"22 de tus 34 estudiantes de 4º B confunden el signo al
despejar en inecuaciones, y aquí está el material para eso"*. Es el mismo dato, agregado.

## 4. Recorrido del usuario (funnel)

```
Landing (pública)
  └─ CTA "Comenzar mi diagnóstico"
       └─ Login / registro (email+password -- Google OAuth existe en el código pero sin botón en la UI)
            └─ Diagnóstico adaptativo IRT  (~20 min, 5–12 ítems)
                 └─ Perfil: θ, banda, déficits, misconceptions
                      └─ "Mi plan": errores explicados + recursos por módulo
                           └─ "Cupos": grupos de su banda (online / presencial Iquique)
                                └─ Inscripción (enrollment: pending)
                                     └─ ¿se alcanzó min_enrollments?
                                          ├─ no → "faltan N inscritos"
                                          └─ sí → cupo confirmed
                                                   ├─ notificación in-app
                                                   └─ email (outbox → Resend)
```

Puntos de fuga conocidos, **no instrumentados**:

- Landing → login (requiere crear cuenta antes de ver valor).
- Login → diagnóstico completo (~20 min sin calculadora es exigente).
- Perfil → inscripción (si no hay cupos publicados en su banda, la pantalla queda vacía).

### 4.2 🔺 Hallazgo del 2026-08-16: este funnel sirve a un canal que nunca produjo un usuario

**El funnel de arriba no está "incompleto": está dirigido a la persona equivocada.** Lo levantó el
owner revisando el producto, y el dato lo confirma:

> Los **252 diagnósticos** rendidos —los únicos usuarios reales en 16 años— son casi todos
> `@estudiantesunap.cl`, del piloto UNAP de oct–nov 2025. Llegaron porque **una institución puso el
> producto frente a una audiencia cautiva**. De la landing no ha llegado prácticamente nadie.

Es decir: **el único canal que funcionó jamás no tiene funnel, y el funnel que existe sirve a un
canal que nunca produjo un usuario.** El dato estaba en [[CURRENT_STATUS]] desde el 2026-08-09
anotado como "hallazgo colateral"; su consecuencia no se había extraído.

A los tres puntos de fuga de arriba hay que sumarles el diagnóstico estructural: el funnel **pide
máximo compromiso antes de entregar valor** (cuenta → 20 min de matemática sin calculadora) y la
recompensa por ese esfuerzo es **un inventario de los propios déficits**.

Registrado como [[RISKS]] **R-31** y [[LESSONS_LEARNED]] **L-36**. Rediseño: [[BACKLOG]] T-91,
precedido por la validación en aula T-90.

**Lectura para el pivote:** esto **refuerza** G-1 en vez de debilitarlo. La evidencia empírica del
propio proyecto dice que la distribución de este producto es institucional. Lo que falta no es
convencer a más estudiantes: es construir la puerta de entrada del aula.

El funnel B2C se conserva —genera los datos que alimentan la calibración (G-2) y los testimonios—
pero deja de ser donde se invierte esfuerzo de captación.

### 4.1 Funnel B2B institucional (G-1) — por construir

```
Contacto con colegio (venta directa, marzo)
  └─ Piloto acotado gratuito: un nivel completo diagnosticado en una hora de clase
       └─ Entrega del mapa de errores agregado por curso (el momento de la verdad)
            └─ Reunión con UTP + sostenedor: qué haría el profesor con esto
                 └─ Licencia anual por establecimiento
                      └─ Re-diagnóstico de cierre de semestre → Δθ de la cohorte (G-4)
                           └─ Renovación
```

**Nada de este funnel está construido.** Requiere rol `profesor` (hoy inexistente, ver
[[PROJECT_BRIEF]] §6), agregación por curso, aislamiento por establecimiento e histórico de θ. Es
el contenido de la épica **E8** en [[BACKLOG]].

## 5. Modelo económico

> **Reescrito el 2026-08-16** (D-47…D-51, [[../adr/ADR-025-motor-de-valor-b2b-y-cinco-vectores]]).
> El modelo anterior —clases a $10.000 CLP/hora como única línea— tenía un techo aritmético de
> ≈ USD 16.000/año que no dependía de la ejecución. La aritmética completa está en
> [[TESIS_DE_CRECIMIENTO]] §1 y §3.

**Mix objetivo, decidido:** ~60 % licencia institucional B2B · ~30 % suscripción B2C ·
~10 % clases premium y comisión de la red de profesores.

- **Línea principal — licencia institucional (G-1, B-08).** El colegio, sostenedor o
  preuniversitario paga una licencia anual por su matrícula de enseñanza media. Se le vende la
  parte del producto con **costo marginal cero**: diagnóstico, mapa de errores agregado, panel
  docente y Δθ de cohorte. Un alumno más cuesta ~$0; un colegio más cuesta una reunión.
  **Ciclo de compra: marzo** (año escolar), no noviembre.
- **Línea de embudo — B2C.** El diagnóstico, el perfil y el plan **siguen gratuitos** (D-01): son la
  puerta de entrada, el generador de datos de calibración y la fuente de testimonios. Sobre eso se
  evaluará una suscripción de temporada (marzo–noviembre). **Nada de esto está implementado ni
  tiene precio decidido** — es supuesto, ver [[ASSUMPTIONS]] A-35 y [[OPEN_QUESTIONS]] Q-33.
- **Línea premium — clases.** D-32 sigue vigente: **$10.000 CLP/hora**, con la primera videollamada
  gratis tras el diagnóstico. **Cambia su rol, no su precio:** deja de ser el motor del negocio y
  pasa a ser producto premium y mecanismo de conversión y confianza. Sigue sin pasarela de pago
  implementada ([[BACKLOG]] T-04, [[OPEN_QUESTIONS]] Q-02).
- **Costos directos hoy:** $0 en el tier actual (GitHub Pages, Supabase free, Resend free, dominio
  `jacobocordova.com`). **A escala dejan de ser $0**, pero siguen siendo marginales: el costo de
  esta trayectoria son **personas** (venta y calibración), no infraestructura. Ver [[RISKS]] R-27.
- **Costo real dominante hoy:** el **tiempo del profesor** para (a) escribir y calibrar ítems con
  sus `error_*`, (b) publicar recursos, (c) dictar las clases de los cupos confirmados. **G-3
  existe para desmontar exactamente (c)**, que es la parte que no se amortiza.
- **Riesgo económico:** el cuello de botella es humano, no técnico. Ver [[RISKS]] R-01. **No es
  nuevo:** la tesis de 2010 ya identificaba ese mismo cuello — muestrear más seguido *"ameritaría por
  parte del profesor una cantidad de trabajo superior"* ([[RAIZ_SISTEMA_LLOVIZNA]] §3). Es la restricción
  estructural del proyecto, no una limitación de esta etapa — y por primera vez tiene un plan
  estructural en vez de una mitigación por disciplina ([[TESIS_DE_CRECIMIENTO]] G-3).
- **Capital externo: se busca** (decidido 2026-08-16). CORFO / Start-Up Chile / semilla, con la
  memoria del proyecto como material de due diligence. Tesis de inversión y uso de fondos en
  [[TESIS_DE_CRECIMIENTO]] §4. Antecedente que no se oculta: **dos intentos previos de
  financiamiento sin éxito** (2012–13 Venezuela, 2025 UNAP).
- **Publicidad: descartada como fuente de ingresos (D-46, 2026-08-13).** No por preferencia estética:
  contradice el aviso de privacidad ya publicado, sube [[RISKS]] R-06 con menores y la Ley 21.719 a
  la vuelta, y la aritmética no da (haría falta decenas de miles de vistas para igualar una hora de
  clase, en un producto de ~20 min por persona y sin analítica). Vías admitidas si se busca ingreso
  de terceros: **patrocinio nombrado sin tracking** o **B2B a colegios**. Evaluación completa en
  [[OPEN_QUESTIONS]] Q-28.

> **Nota deliberada sobre la gratuidad:** el commit `b6ae903` acotó la gratuidad en el JSON-LD al
> *diagnóstico, perfil y plan de estudio*; los cupos se publican por separado. No afirmar que las
> clases son gratuitas sin confirmarlo con el owner ([[OPEN_QUESTIONS]] Q-02).

## 6. Métricas propuestas (aún no instrumentadas)

| # | Métrica | Fuente posible | Estado |
|---|---------|----------------|--------|
| M-01 | Visitantes únicos de la landing | `visitor` (tracking propio) | parcial, sin reporte |
| M-02 | Tasa landing → cuenta creada | `auth.users` vs `visitor` | no medida |
| M-03 | Tasa de finalización del diagnóstico | `tests` / `student_profiles` | no medida |
| M-04 | Distribución de θ y de bandas | `student_profiles.theta_band` | consultable a mano |
| M-05 | Top de módulos deficitarios | `student_profiles.profile->deficits` | consultable a mano |
| M-06 | Tasa perfil → inscripción | `enrollments` vs `student_profiles` | no medida |
| M-07 | Cupos confirmados / publicados | `class_slots.status` | consultable a mano |
| M-08 | Emails enviados vs fallidos | `email_outbox.status` | consultable a mano |
| M-09 | Repetición del diagnóstico y movimiento de θ | `tests` histórico + `theta-history` | no medida |

### 6.1 Métricas de negocio del pivote (2026-08-16) — ninguna medida todavía

Las de arriba miden **uso**. Estas miden **negocio**, y sin ellas ninguna afirmación de
[[TESIS_DE_CRECIMIENTO]] §3 es defendible ante un colegio o un fondo. Son el contenido de G-5.

| # | Métrica | Vector | Por qué importa |
|---|---------|--------|-----------------|
| M-10 | **CAC** por canal (B2B directo, B2C orgánico, B2C pagado) | G-5 | Sin esto no se sabe si crecer destruye o crea valor |
| M-11 | **LTV** por segmento (licencia institucional vs. suscriptor B2C) | G-5 | El par CAC/LTV es la única prueba de que el modelo funciona |
| M-12 | **Δθ medio por cohorte** entre diagnóstico inicial y de cierre, con su SE | G-4 | Es el producto que se vende y el argumento de renovación |
| M-13 | Tasa de renovación de licencia institucional | G-1 | La métrica que decide si el B2B es negocio o proyecto |
| M-14 | Ítems con parámetros estimados sobre respuestas reales / total del banco | G-2 | Mide el avance del activo defendible |
| M-15 | Ingreso que **no** depende de una hora del fundador / ingreso total | G-3 | Mide directamente si R-01 se está resolviendo |
| M-16 | Pipeline B2B: colegios contactados → piloto → propuesta → contrato | G-1 | Convierte la venta en proceso medible, no en suerte |

Tarea de instrumentación: [[BACKLOG]] T-20 (funnel) y la épica **E8** (métricas de negocio). Hasta
entonces, cualquier afirmación cuantitativa sobre uso **o sobre negocio** es un supuesto
([[ASSUMPTIONS]]). **Esto aplica especialmente a los números de [[TESIS_DE_CRECIMIENTO]] §3**, que
están marcados como hipótesis, no como proyección validada.

## 7. Restricciones de negocio

- La UNAP se menciona en producción solo como **nota histórica de origen** (footer/FAQ, no como
  badge activo -- D-18); el tono y las afirmaciones deben ser **defendibles académicamente** (no
  prometer puntajes ni resultados garantizados) y no dar a entender un respaldo institucional
  vigente que no existe.
- Público **menor de edad** en su mayoría (estudiantes de enseñanza media): la recolección de
  datos personales debe ser mínima y justificada. Hoy se recolecta email, IP, ciudad/país,
  idioma, navegador, SO y nivel de batería. Ver [[RISKS]] R-06 y [[OPEN_QUESTIONS]] Q-03.
- El diagnóstico **no es una nota ni un registro académico** — así se comunica en la FAQ y debe
  seguir siendo cierto.
- Los cupos presenciales dependen de disponibilidad de sala en Iquique (hoy "sala a confirmar" en
  los datos demo).
- Estacionalidad fuerte: la demanda B2C se concentra en los meses previos a la PAES (rendición en
  noviembre/diciembre en Chile). **Desde el 2026-08-16 esta restricción se ataca en vez de
  aceptarse:** el ciclo de compra institucional (G-1) es **marzo**, con el año escolar, lo que
  convierte R-19 de riesgo estructural en calendario comercial ([[TESIS_DE_CRECIMIENTO]] G-5).
- **Vender a instituciones cambia el régimen de datos.** Un colegio subiendo su matrícula implica
  datos de menores a escala, bajo Ley 21.719 en plena vigencia desde el **2026-12-01**. Antes del
  primer contrato institucional, [[ROADMAP]] F9 (respaldo probado T-07, staging T-09, verificación
  de RLS T-11) deja de ser buena práctica y pasa a ser **requisito contractual**. Ver [[RISKS]]
  R-06 y R-28.
- **No se vende B2B antes de calibrar** (G-2 es precondición dura de G-1). Afirmar rigor
  psicométrico ante un jefe de UTP con `difficulty` autoral es la forma más rápida de perder la
  credibilidad que B-07 protege. Ver [[RISKS]] R-17 y R-29.

## 8. Comunicación oficial y mensajes clave

Estos textos existen en tres lugares (`index.html` JSON-LD FAQ, `public/index.html` y
`landing.cljs`). **Si cambia uno, deben cambiar los tres** — es una de las duplicaciones activas
del repositorio ([[RISKS]] R-05):

- Costo: "El diagnóstico, tu perfil y el plan de estudio no tienen costo. Es un proyecto personal
  del profesor Jacobo Córdova, que se originó en 2025 a partir de un convenio de desarrollo con la
  Universidad Arturo Prat." (copy vigente desde D-18, 2026-07-28)
- Requisito: "Solo una cuenta con tu correo… toma alrededor de 20 minutos."
- Calculadora: "No… El tiempo de respuesta también se considera en la estimación."
- Mal resultado: "No es una nota ni queda en ningún registro académico."
- Modalidad: "Ambas… Los cupos presenciales se realizan en Iquique."
- Cupo pendiente: "Cada grupo necesita un mínimo de inscritos para funcionar."
- Repetir diagnóstico: "Sí, y es recomendable."

## 9. Los tres documentos de dirección, y cuál manda

Desde el 2026-08-16 hay **tres** documentos que hablan de hacia dónde va el proyecto. No compiten;
responden preguntas distintas, y el orden de precedencia está decidido:

| Documento | Responde | Estatus |
|---|---|---|
| [[RAIZ_SISTEMA_LLOVIZNA]] | **De dónde viene** (tesis UNEXPO 2010 → Llovizna 2012 → ponencia 2013) | Histórico, cerrado (D-45) |
| [[VISION_LIBRO_PROYECTO]] | **Hacia dónde apunta pedagógicamente** — el norte del fundador | Norte confirmado (ADR-011); **no se edita** |
| **[[TESIS_DE_CRECIMIENTO]]** | **Cómo gana dinero a escala** — G-1…G-5, aritmética, tesis de inversión | **Vigente y mandante en negocio** (ADR-025) |

**Regla de precedencia:** en materia de **modelo de negocio, precios y prioridad comercial** manda
[[TESIS_DE_CRECIMIENTO]]. En materia de **pedagogía y contenido** manda [[VISION_LIBRO_PROYECTO]].
Donde se cruzan, la tesis fija el *cuándo* y el libro el *qué*.

### 9.1 Tensiones con el Libro del Proyecto: estado al 2026-08-16

| Tensión registrada | Estado |
|---|---|
| Sin ingresos vs. pago por clase o paquete | ✅ **Resuelta** por D-19/D-26/D-32 y ahora reencuadrada: pago por clase existe, pero **como línea premium**, no como motor (D-47) |
| Una sola materia vs. expansión multi-materia y multi-país | 🟡 **Confirmada como dirección, postergada en el tiempo**: es consecuencia de G-2 (un banco calibrado hace portable el motor), y su precondición es que el primer mercado funcione ([[TESIS_DE_CRECIMIENTO]] §5) |
| Cuatro bandas de θ vs. tres "grupos de conocimiento" | 🟡 Sigue abierta — Q-22. **Gana urgencia con G-1:** lo que un colegio ve en el panel docente tiene que ser una sola nomenclatura, no dos |
| Iniciativa académica vs. startup con tesis de inversión | ✅ **Resuelta a favor del libro** (2026-08-16): se busca capital externo y la memoria se escribe como material de inversión. Ver [[TESIS_DE_CRECIMIENTO]] §4 |
| Uso de fondos propuesto en el libro (§7) | ⚠️ **Reemplazado** por [[TESIS_DE_CRECIMIENTO]] §4, que lo reparte según G-1…G-5. El texto del libro no se edita; queda anotado allá |
| Eje 3 (estilos de aprendizaje) como diferenciador competitivo | ⛔ Descartado desde 2026-08-12 (D-41). **No reaparece con el pivote** — sería el punto más fácil de atacar en una due diligence |

**Q-21 quedó respondida** (ADR-011: el libro es el norte) y **P-03 quedó cerrada** (D-19/D-26/D-32 +
D-47). Lo que sigue abierto es Q-22 (nomenclatura de bandas) y las preguntas nuevas del pivote,
**Q-32…Q-36** en [[OPEN_QUESTIONS]].

---

Relacionado: [[TESIS_DE_CRECIMIENTO]] · [[../adr/ADR-025-motor-de-valor-b2b-y-cinco-vectores]] ·
[[PROJECT_BRIEF]] · [[REQUIREMENTS]] · [[RISKS]] · [[ROADMAP]] · [[OPEN_QUESTIONS]] ·
[[VISION_LIBRO_PROYECTO]]
