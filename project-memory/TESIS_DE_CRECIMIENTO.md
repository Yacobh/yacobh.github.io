# TESIS_DE_CRECIMIENTO

Última actualización: **2026-08-16** (creación; misma fecha: **§3.1** — por qué no existe un modelo por volumen en este mercado, D-52) · Decisión de origen:
[[../adr/ADR-025-motor-de-valor-b2b-y-cinco-vectores]] · [[DECISIONS]] D-47 … D-51

> **Qué es este archivo.** Es el **archivo canónico de los cinco vectores de valor (G-1 … G-5)**
> y de la aritmética que los sostiene. Todo el resto de la memoria los referencia; ninguno los
> redefine. Si otro documento contradice a este en materia de modelo de negocio, gana este y hay
> que corregir el otro en el mismo commit (misma regla que [[../CLAUDE]] tiene con `project-memory/`).
>
> **Qué NO es.** No es [[VISION_LIBRO_PROYECTO]] — ese es el norte pedagógico y narrativo escrito
> por el fundador, y se conserva sin editar. No es [[RAIZ_SISTEMA_LLOVIZNA]] — esa es la raíz
> histórica. Este archivo es **el plan para que el proyecto gane dinero a escala**, decidido el
> 2026-08-16.
>
> **Estatus de los números.** La dirección (G-1 … G-5) está **decidida**. Los precios, las metas
> por año y el tamaño de mercado son **supuestos sin validar** — están marcados uno por uno y
> registrados en [[ASSUMPTIONS]] y [[OPEN_QUESTIONS]]. No citarlos como hechos ante un colegio,
> un inversionista ni un fondo público sin validarlos antes.

---

## 1. El problema que esta tesis resuelve

El proyecto llega al 2026-08-16 con un producto técnico serio y **un modelo de negocio que le pone
techo**:

| Activo real (verificado en la memoria) | Fuente |
|---|---|
| Motor IRT 1PL/MAP funcionando en producción, con regla de parada por precisión | [[../adr/ADR-004-irt-1pl-map-y-regla-de-parada]] |
| Segundo eje de perfil: fluidez λ, con umbrales por banco | [[../adr/ADR-019-eje-de-fluidez-en-vez-de-estilos-de-aprendizaje]], D-43 |
| Banco de **387 ítems**, cada distractor mapeado a un error conceptual nombrable | D-12, [[CURRENT_STATUS]] |
| **252 diagnósticos** rendidos y **80 usuarios**, con `time-ms` instrumentado | [[CURRENT_STATUS]], Q-26 |
| Funnel completo operativo: landing → diagnóstico → perfil → plan → cupo → email | [[ROADMAP]] F8 ✅ |
| Costo de infraestructura ≈ $0 | B-05 |
| Raíz verificable de 16 años: tesis UNEXPO 2010 + ponencia nacional 2013 | [[RAIZ_SISTEMA_LLOVIZNA]], D-45 |

Contra eso, el modelo de ingreso vigente hasta hoy (D-19/D-26/D-32: **clases a $10.000 CLP/hora**)
tiene un techo aritmético que no depende de la ejecución:

```
1.500 horas facturables/año (máximo optimista de una persona)
  × $10.000 CLP/hora
  = $15.000.000 CLP/año  ≈ USD 16.000/año
```

Y ese máximo supone que el fundador **deja de programar, de escribir ítems y de calibrar** — es
decir, que deja de construir el activo que hace valioso al negocio. Para llegar a **USD 1.000.000
≈ CLP 950.000.000/año** (supuesto de tipo de cambio ~950 CLP/USD, A-31) por esa vía harían falta
**95.000 horas de clase al año**. No hay plan de marketing que corrija esa aritmética.

**El diagnóstico, entonces, no es "falta difusión".** Es que se está cobrando por lo único que
tiene costo marginal alto (las horas del profesor) y regalando lo único que tiene costo marginal
cero (el diagnóstico, el mapa de errores y el plan). Los cinco vectores invierten esa relación.

**Advertencia histórica que no se puede omitir de este plan:** van **tres intentos** de llevar
esta idea a escala (2012–13 Estado venezolano, 2012 equipo, 2025 convenio UNAP) y los tres
murieron en el mismo punto — **llegar a los estudiantes de forma sostenida** ([[RISKS]] R-19,
[[BUSINESS_CONTEXT]] §1). G-5 existe precisamente porque ese patrón es el riesgo dominante, no
un pendiente menor.

---

## 2. Los cinco vectores de valor (G-1 … G-5)

### G-1 · Cambiar quién paga: licencia institucional B2B como línea principal

**Decisión (D-47).** El ingreso principal pasa a ser la **licencia anual institucional**: un
colegio, sostenedor o preuniversitario paga por usar el diagnóstico, el mapa de errores y el panel
docente sobre su propia matrícula. El B2C se conserva como embudo, marca y fuente de datos, no
como motor de ingresos.

**Por qué funciona.** Lo que se le vende a un colegio es exactamente la parte del producto que
**no consume horas del fundador**. Un alumno más cuesta ~$0. Un colegio más cuesta una reunión de
venta. Es el único punto del negocio donde el ingreso crece sin que crezca el trabajo.

**Qué compra un colegio, concretamente:**

1. Diagnóstico IRT aplicado a todo un nivel en una hora de clase, desde el teléfono del estudiante.
2. Un **mapa de errores agregado por curso**: no "el 4º medio B sacó 55%", sino *"22 de 34
   estudiantes confunden el signo al despejar en inecuaciones"*. Eso es accionable para el profesor
   el lunes siguiente.
3. Un **panel docente** (rol `profesor`, hoy inexistente — ver [[PROJECT_BRIEF]] §6) con la
   distribución de θ del curso y los déficits ordenados.
4. Re-diagnóstico y **Δθ por cohorte** al final del semestre (G-4): la evidencia que el colegio
   necesita para justificar el gasto ante su sostenedor.

**Encuadre de venta ya escrito en la memoria** ([[RAIZ_SISTEMA_LLOVIZNA]] §2.5): *"Kahoot mide a la
clase; esto mide a cada estudiante y le dice qué estudiar."* Kahoot y AhaSlides ya educaron al
mercado escolar en responder desde el teléfono — no hay que explicar el gesto, solo la diferencia.

**Fondos que ya existen del lado del comprador** (supuesto A-34, **verificar antes de citarlo**):
SEP y PIE financian nivelación en establecimientos subvencionados; la decisión de compra suele
estar en UTP + sostenedor, y el ciclo de compra es **marzo**, no noviembre.

---

### G-2 · Calibrar el banco y convertirlo en el activo defendible

**Decisión (D-48).** La calibración estadística del banco deja de ser deuda técnica postergable
([[RISKS]] R-17, Q-05) y pasa a ser **entregable de negocio de máxima prioridad**, con un reporte
técnico publicable como salida.

**Por qué es el vector más urgente.** Hoy `difficulty` es **autoral**: la asignó una persona a
ojo. Eso significa que la afirmación central del pitch —*"IRT, el mismo enfoque psicométrico de
las pruebas estandarizadas"* ([[BUSINESS_CONTEXT]] §3)— **está respaldada por el motor pero no por
los datos de entrada**. Un jefe de UTP con formación en evaluación, o cualquier due diligence
técnica de un fondo, lo pregunta en la primera reunión. Vender B2B sin esto es vender algo que no
se puede defender.

**Qué se construye:**

1. Pipeline de calibración sobre las respuestas reales ya acumuladas (252 diagnósticos y
   creciendo): de `difficulty` **asignada** a `difficulty` **estimada**.
2. Salto a **2PL** (discriminación por ítem) cuando el volumen lo permita — hoy no lo permite.
3. Calibración de los umbrales de fluidez, hoy autorales ([[RISKS]] R-24, T-65).
4. **Reporte técnico de calibración publicable**, con metodología y limitaciones declaradas.

**Por qué es defendible.** Un competidor con más capital puede copiar la interfaz en un trimestre.
No puede copiar un banco de ítems en español de Chile con **cada distractor mapeado a un error
conceptual nombrado y con parámetros estimados sobre respuestas reales** — eso requiere tiempo de
profesor y volumen de estudiantes, en ese orden. Es el foso.

**Consecuencia estratégica.** Un banco calibrado + un motor que no sabe de qué materia habla hacen
el producto **portable**: Matemática 2, Ciencias, y exámenes de admisión de otros países
hispanohablantes son el mismo software con otro banco. Eso es lo que convierte un negocio chileno
en uno regional — pero **no antes** de que el primero funcione (ver §5, precondiciones).

---

### G-3 · Romper el acoplamiento ingreso ↔ horas del fundador

**Decisión (D-49).** Toda línea de ingreso nueva debe pasar la prueba de que **su margen no
depende de una hora adicional de Jacobo Córdova**. Las horas del fundador se reasignan de
*entrega* (lineal, se agota) a *contenido y calibración* (se amortiza).

**Dos mecanismos:**

1. **Clase grabada por cuadrante θ × λ × misconception.** Se produce una vez y sirve a todos los
   estudiantes que caen en ese cuadrante. El perfil ya calcula exactamente ese cuadrante
   (ADR-019), así que la asignación es automática: la infraestructura de recomendación ya existe
   en "Mi plan" (capa 1).
2. **Red de profesores con comisión de plataforma.** El profesor recibe un grupo **ya
   diagnosticado, homogéneo por banda y con el mapa de errores encima** — que es exactamente lo
   que hace difícil y caro preparar una clase. La plataforma cobra un porcentaje. Esto convierte
   el activo (la clasificación) en margen sin sumar horas del fundador.

**Efecto sobre el riesgo dominante.** [[RISKS]] R-01 (bus factor = 1) deja de ser "un riesgo del
MVP" y pasa a ser **una restricción de diseño con solución declarada**. La memoria ya advertía que
R-01 no es transitorio sino el patrón histórico de 16 años ([[BUSINESS_CONTEXT]] §1); G-3 es el
primer plan que lo ataca por el modelo y no por la fuerza de voluntad.

**Lo que NO significa.** Las clases a $10.000 CLP/hora (D-32) **no se eliminan**: sobreviven como
producto premium y como el contacto humano que genera testimonios y confianza. Dejan de ser el
motor. La primera videollamada gratis tras el diagnóstico se conserva: es el mejor instrumento de
conversión que tiene el producto.

---

### G-4 · Vender progreso medido (Δθ), no acceso

**Decisión (D-50).** El producto que se vende, en ambos segmentos, es **la evidencia de que el
estudiante mejoró**, expresada como Δθ entre diagnósticos. Esto **resuelve [[OPEN_QUESTIONS]] Q-07
a favor del histórico versionado**: repetir el diagnóstico **nunca sobrescribe** el perfil
anterior.

**Por qué es el vector de retención.** En preparación PAES todo el mercado promete resultados
("+150 puntos") y **nadie los mide**. θ es una escala continua, repetible y comparable contra el
propio estudiante. Un "antes y después" honesto es, literalmente, el único argumento verificable
disponible en esta categoría.

- **B2C:** el estudiante vuelve porque quiere ver su número moverse. Es el bucle de retención que
  hoy no existe (el producto entrega un plan y se despide).
- **B2B:** el colegio renueva la licencia si le muestras el Δθ de su cohorte. Sin esa cifra, la
  renovación depende de la simpatía del jefe de UTP.
- **Inversión:** Δθ agregado es la métrica de *outcome* que un fondo educativo pide y que casi
  ninguna edtech puede entregar.

**Consecuencia técnica dura.** El histórico de perfiles **es el producto**. Sobrescribir
`student_profiles` al re-diagnosticar destruiría el activo. Q-07 estaba en rojo y sin responder;
queda respondida por esta decisión y su implementación es tarea de la épica E8.

**Cautela que no se negocia.** Δθ es una medida con error asociado (SE(θ)); presentarlo sin su
incertidumbre sería exactamente el tipo de afirmación no defendible que [[BUSINESS_CONTEXT]] §7
prohíbe. Se comunica con su banda de confianza o no se comunica.

---

### G-5 · Construir la máquina de distribución y medirla

**Decisión (D-51).** La instrumentación del funnel y la construcción de un canal de adquisición
repetible dejan de ser la fase F10 "que más importa" y pasan a ser **la condición de existencia
del negocio**. Ninguna meta comercial de este archivo es afirmable sin CAC y LTV medidos.

**Por qué está en el nivel de los otros cuatro.** Los tres intentos anteriores no fracasaron por
falta de idea ni de capacidad técnica. Fracasaron acá. Está escrito en la propia memoria del
proyecto: *"lo que nunca se logró, en ninguna etapa, es llegar a los estudiantes de forma
sostenida"* ([[RISKS]] R-19, [[BUSINESS_CONTEXT]] §1). Agregar producto sin resolver esto **repite
el patrón por cuarta vez**.

**Cuatro componentes:**

1. **Instrumentación** (F10, T-20/T-21/T-22): funnel medido de punta a punta. Hoy en 0%. Sin esto
   no hay CAC, no hay LTV y no hay conversación posible con un inversionista.
2. **Canal B2B directo:** venta uno a uno a colegios, con piloto gratuito acotado como puerta de
   entrada (ya contemplado en [[VISION_LIBRO_PROYECTO]] §4.6). Es lento, no escala solo, y es el
   único que funciona al principio en educación institucional.
3. **Marca personal como motor de contenido.** El fundador tiene una historia de 16 años
   **verificable**: tesis aprobada (UNEXPO, 2010) y ponencia en el II Congreso Venezolano de
   Ciencia, Tecnología e Innovación (2013). Eso no es storytelling inventado — es respaldo propio
   que no depende de ninguna institución vigente, justo el vacío que D-18 dejó abierto en B-07.
   **Bloqueado por Q-30**: el copy publicado todavía dice que el proyecto "se originó en 2025 a
   partir de un convenio con la UNAP", que es falso (X-09). No se puede construir un canal de
   contenido sobre un origen que la propia memoria declara incorrecto.
4. **Mover el ciclo comercial a marzo.** La estacionalidad PAES (R-19) es una ventana de captación
   estrecha **solo si se vende al estudiante en noviembre**. Vendiendo licencia anual al colegio en
   marzo, la estacionalidad deja de ser un riesgo y pasa a ser un calendario comercial.

---

## 3. Aritmética del millón (supuestos, no hechos)

> **Todo esta sección es supuesto sin validar** ([[ASSUMPTIONS]] A-31 … A-35). Los precios no están
> testeados con ningún comprador real, y el tamaño de mercado no está verificado contra fuentes
> oficiales (MINEDUC / DEMRE). **Tarea de validación: [[BACKLOG]] T-80.**

**Meta:** CLP 950.000.000/año ≈ USD 1.000.000/año de ingreso recurrente.

### 3.1 Por qué no existe un modelo por volumen en este mercado (D-52, 2026-08-16)

Evaluado a petición del owner: un producto **sin clases en vivo**, con el contenido **grabado por el
profesor o automatizado en texto**, cuyo ingreso se conduzca por **número de visitantes**.

**La conclusión es que el producto es correcto y el mecanismo de ingreso no.** La aritmética, en los
dos casos posibles:

**Caso publicidad** (ya descartada por D-46; esto refuerza su tercera razón con números más duros):

```
RPM educación LatAm ≈ USD 2 por 1.000 páginas vistas (supuesto generoso)
Igualar CLP 15M/año (≈ USD 16.000, el techo actual con clases):
   16.000 / 2 × 1.000            = 8.000.000 páginas vistas/año
Una sesión genera ~5–15 páginas  → 600.000 – 1.600.000 sesiones/año
Mercado total (A-32)             ≈ 250.000 personas/año
```

Habría que alcanzar a **cada persona que rinde la PAES entre 2 y 6 veces** solo para igualar lo que
se gana dando clases. **Con el 100 % de penetración nacional no alcanza.** No es difícil: es
aritméticamente imposible.

**Caso freemium masivo:**

```
CLP 5.000/mes × 8 meses de temporada = CLP 40.000/año por usuario pagando
Para CLP 950M → 23.750 pagando → a 5 % de conversión → 475.000 gratis  ≈ 2× el mercado nacional
Para CLP 100M →  2.500 pagando → a 5 % de conversión →  50.000 gratis  ≈ 20 % del mercado nacional
```

La meta grande es imposible; la modesta es durísima pero no física­mente imposible. **La causa raíz
de ambos casos es §1.1 de [[BUSINESS_CONTEXT]]:** los modelos por volumen viven de retención
compuesta, y este mercado tiene **churn del 100 % anual por construcción**.

**Y un tercer factor propio de 2026:** contenido de texto que **explica** compite de frente con un
LLM gratuito, ilimitado y mejor explicando. Automatizar las clases como texto es **automatizar la
mitad comoditizada** del producto y dejar la defendible —la medición, saber lo que no sabes que no
sabes— como una funcionalidad en vez de como el producto.

#### El mismo contenido, el otro cliente

Cero horas en vivo del fundador + contenido grabado y automatizado **es exactamente lo que compra un
colegio**: la institución no quiere las horas de Jacobo, quiere la medición y el material para que
**sus** profesores hagan la parte viva. Lo que el owner describió **no es una alternativa a G-1: es
G-1 bien entregado**, es decir, **G-3 metido dentro de G-1**.

| | Modelo por visitantes | Mismo contenido, licencia institucional |
|---|---|---|
| Ingreso por unidad | ~CLP 2 por página vista | CLP 2.400.000 por colegio/año |
| Retención | 0 % (churn anual total) | 80 % objetivo, renovable |
| El contenido es… | centro de ingreso que exige tráfico masivo | **costo que se amortiza** sobre cada colegio nuevo |
| Escala necesaria | 2–6× el mercado nacional | ~11 % de los colegios |

El mismo trabajo de contenido rinde **tres órdenes de magnitud distinto** según a quién se le cobra.

#### Cuándo sí habría modelo por volumen

No está descartado para siempre: está descartado **mientras el mercado sea PAES-Chile**. El volumen
tendría que venir de otra parte —multi-examen o multi-país—, que es justamente la consecuencia de
G-2 (un banco calibrado hace portable el motor, porque el motor no sabe de qué materia habla). Está
en la escalera para 2029, y su **precondición dura es que el primer mercado funcione**.

#### Distancia real a ese producto, si se quisiera construir igual

| Dimensión | Distancia |
|---|---|
| **Código** | 2–4 semanas: sacar los cupos del camino crítico, router para deep links por módulo (T-05), pasarela (T-84) |
| **Contenido** | **4–7×**: de 58 recursos sobre 20 módulos (~3 por módulo) a ~250–400. El cuello no es escribir sino **auditar** (ADR-016): T-01 auditó 32 recursos uno por uno |
| **Tráfico** | 10–100× lo que el mercado chileno puede dar. **No es distancia, es un muro** |

**Nota útil:** la capa 0 (`questions.error_a..d`) **ya es** enseñanza automatizada en texto,
disparada por el error específico del estudiante. El mecanismo existe; lo que falta es profundidad.

---

### Vía B2B (línea principal, ~60 % de la meta)

| Parámetro | Supuesto | Nota |
|---|---|---|
| Precio por alumno de enseñanza media / año | CLP 6.000 | Sin validar |
| Piso por establecimiento | CLP 1.500.000/año | Sin validar |
| Colegio tipo (400 alumnos de EM) | CLP 2.400.000/año | |
| Establecimientos con enseñanza media en Chile | ~3.300 | **Verificar contra MINEDUC** |
| Colegios necesarios para CLP 950M | **~380** (≈ 11,5 % de penetración) | Solo si B2B fuera el 100 % |

### Vía B2C (embudo y complemento, ~30 %)

| Parámetro | Supuesto |
|---|---|
| Suscripción | CLP 9.900/mes |
| Temporada efectiva | 8 meses (marzo–noviembre) ⇒ CLP 79.200/año por estudiante |
| Suscriptores para CLP 950M | ~12.000 (≈ 5 % de quienes rinden PAES M1) |

### Clases premium + red de profesores (~10 %)

Margen de comisión sobre clases dictadas por terceros (G-3) + clases del fundador a CLP 10.000/hora
(D-32) como producto premium.

### Escalera propuesta

| Año | B2B | B2C | Ingreso aprox. | Hito |
|---|---|---|---|---|
| 2027 | 5–10 colegios piloto (2 pagados) | ~300 suscriptores | ~CLP 30M | Primer contrato firmado; CAC medido |
| 2028 | ~40 colegios | ~1.500 suscriptores | ~CLP 220M | Primera contratación (sale R-01) |
| 2029 | ~120 colegios | ~4.000 suscriptores | ~CLP 620M | Segunda materia (M2) |
| 2030 | ~380 colegios equivalentes | — | **≈ USD 1M** | Meta |

**Costos que dejan de ser $0 en esta trayectoria.** La infraestructura sigue siendo marginal
(Supabase Pro + uso, orden de magnitud USD cientos/mes incluso con decenas de miles de
estudiantes). Los costos reales de esta escalera son **venta** (G-5) y **producción y calibración
de contenido** (G-2/G-3) — es decir, personas. Ver [[RISKS]] R-27.

---

## 4. Tesis de inversión (CORFO / Start-Up Chile / semilla)

Decidido el 2026-08-16: **se busca capital externo**, y esta memoria se escribe también como
material de inversión.

**Qué se pone sobre la mesa que otros no tienen:**

1. **Producto en producción, no prototipo.** Funnel completo verificado end-to-end, con datos
   reales de estudiantes ([[ROADMAP]] F8 cerrada).
2. **Activo de datos propietario y creciente.** 387 ítems con misconceptions nombradas + 252
   diagnósticos con tiempos de respuesta. Ese dataset es el que permite G-2.
3. **Diferenciación técnica real y documentada.** Control retroalimentado aplicado a evaluación,
   con dos ejes (θ, λ) y ADRs que muestran el razonamiento, incluidas las ideas **descartadas** por
   evidencia (estilos de aprendizaje, D-41). Eso último es señal de rigor, no de indecisión.
4. **Fundador con dominio + código + docencia simultáneos**, y 16 años de continuidad verificable.
5. **Métrica de outcome medible (Δθ)**, que casi ninguna edtech puede ofrecer.

**Qué hay que decir sin adornos, porque una due diligence lo va a encontrar igual:**

- Bus factor = 1 ([[RISKS]] R-01), y **tres intentos previos de escalar que no prosperaron**
  ([[RAIZ_SISTEMA_LLOVIZNA]]). La respuesta honesta es G-3 + la primera contratación de 2028.
- El banco **no está calibrado estadísticamente** todavía (R-17). Es exactamente el uso de fondos
  número uno.
- **Cero ingresos operativos a la fecha** y cero métricas de funnel (F10 en 0%).
- No hay pasarela de pago implementada ([[BACKLOG]] T-04, Q-02).

**Uso de fondos propuesto** (revisa y reemplaza el de [[VISION_LIBRO_PROYECTO]] §7, que era
anterior a esta tesis):

| Destino | % | Para qué, concretamente |
|---|---|---|
| Calibración y banco de ítems (G-2) | 30 % | Volumen de respuestas, estadístico/psicometrista part-time, reporte técnico |
| Venta y distribución (G-5) | 30 % | Primer rol comercial B2B, pilotos en colegios, instrumentación |
| Desarrollo técnico (G-1, G-4) | 25 % | Panel docente, rol `profesor`, histórico de θ, multi-tenant institucional |
| Contenido asíncrono (G-3) | 10 % | Producción de clases grabadas por cuadrante |
| Reserva | 5 % | |

**Programas a evaluar** (montos y ventanas **sin verificar** — [[OPEN_QUESTIONS]] Q-34): CORFO
Semilla Inicia / Semilla Expande, Start-Up Chile, SSAF-Desafío, y fondos de innovación educativa.
El proyecto ya intentó financiamiento estatal **dos veces sin éxito** (2012–13 Venezuela; 2025
UNAP): esta vez la diferencia declarada es que hay producto en producción y datos reales, no una
propuesta en papel.

---

## 5. Orden de ejecución y precondiciones

Los cinco vectores **no se ejecutan en paralelo**. El orden importa y está decidido:

```
G-2 (calibrar)  ──┐
                  ├──►  G-1 (vender B2B)  ──►  G-4 (Δθ / renovación)  ──►  G-3 (escala sin horas)
G-5 (medir)     ──┘
```

1. **G-2 y G-5 primero, en paralelo.** No se puede vender a un colegio un motor cuyo banco no está
   calibrado (G-2), ni sostener ninguna afirmación de negocio sin funnel medido (G-5). Son las dos
   precondiciones duras.
2. **G-1 después:** con banco calibrado y funnel medido, la venta institucional tiene con qué
   defenderse.
3. **G-4 en cuanto haya un colegio con dos diagnósticos separados en el tiempo.** Antes de eso no
   hay Δθ que mostrar.
4. **G-3 último:** la red de profesores y el contenido asíncrono solo tienen sentido cuando existe
   demanda que el fundador ya no da abasto para atender. Construirla antes es inventar capacidad
   para un mercado que todavía no respondió.

**Precondición transversal, bloqueante para G-5:** resolver **Q-30** (cómo se cuenta públicamente
el origen del proyecto). El copy en producción afirma algo que la propia memoria declara falso
(X-09). No se construye una máquina de contenido sobre eso.

**Precondición de higiene, heredada:** [[ROADMAP]] F9 (endurecimiento) deja de ser opcional en el
momento en que un colegio pone datos de sus estudiantes en la plataforma. Respaldo probado (T-07),
staging (T-09) y verificación de RLS (T-11) pasan de "buena práctica" a "requisito contractual".
Ver [[RISKS]] R-28.

---

## 6. Qué NO cambia con esta tesis

Para que nadie interprete el pivote como permiso para reescribir el producto entero:

- **El diagnóstico, el perfil y el plan siguen siendo gratuitos** para el estudiante (D-01). Son la
  puerta de entrada y el instrumento de captación de datos. La licencia la paga la institución.
- **La publicidad sigue descartada** como fuente de ingresos (D-46). El B2B era, ya en esa
  decisión, una de las dos vías admitidas de ingreso de terceros.
- **RLS sigue siendo el único límite de autorización** ([[../CLAUDE]] §7). El multi-tenant
  institucional se construye sobre policies, no sobre chequeos de UI.
- **La IA sigue fuera del runtime** ([[../adr/ADR-016-ia-en-el-pipeline-de-autoria-no-en-runtime]]).
- **No se promete puntaje.** Δθ es una medida con error, y se comunica como tal.
- **[[VISION_LIBRO_PROYECTO]] no se edita.** Sigue siendo el norte pedagógico del fundador; esta
  tesis es el plan comercial. Donde se contradicen (§7 uso de fondos, §4.4 paquetes), gana esta y
  queda anotado allá.

---

Relacionado: [[../adr/ADR-025-motor-de-valor-b2b-y-cinco-vectores]] · [[BUSINESS_CONTEXT]] ·
[[PROJECT_BRIEF]] · [[ROADMAP]] · [[BACKLOG]] (épica E8) · [[RISKS]] · [[ASSUMPTIONS]] ·
[[OPEN_QUESTIONS]] · [[VISION_LIBRO_PROYECTO]] · [[RAIZ_SISTEMA_LLOVIZNA]]
