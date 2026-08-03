# VISION_LIBRO_PROYECTO

Última actualización: **2026-07-27** · Fuente: documento LaTeX "Academia Online de Matemáticas —
Libro del Proyecto", Borrador v0.1, compartido por Jacobo Córdova el 2026-07-27.

> **Naturaleza de este archivo:** es la visión de negocio y pedagógica de **largo plazo** del
> fundador, tal como la escribió él mismo. **Nada de lo que describe este archivo está
> implementado en el código salvo donde se indica explícitamente.** No reemplaza a
> [[PROJECT_BRIEF]] (alcance del MVP actual) ni a [[ROADMAP]] (fases reconstruidas del historial
> de commits) — los complementa como el destino declarado hacia el que el owner quiere avanzar.
>
> **2026-07-30 (owner, Q-21, [[../adr/ADR-011-vision-libro-como-norte-estrategico]]):** esta visión
> queda confirmada como el **norte estratégico**; el MVP es explícitamente "una versión menor que
> busca llegar a ese objetivo", no un producto final alternativo. Esto resuelve la tensión de
> *dirección* — pero **no** resuelve cada detalle puntual: varias afirmaciones concretas de este
> documento (gratuidad, alcance a una sola materia, cuatro bandas de θ vs. "grupos de
> conocimiento") siguen sin reconciliarse una por una con lo ya implementado. Esas tensiones
> puntuales siguen registradas en [[OPEN_QUESTIONS]] Q-22/Q-23 y no se dan por resueltas aquí.

---

## 1. Qué es este documento fuente

Un "libro del proyecto" en LaTeX, de uso interno, escrito por el fundador para servir de brújula
personal, material de presentación a inversores, guía para desarrolladores/colaboradores y memoria
del proyecto. Nombra el producto **"Academia Online de Matemáticas"** — un nombre más amplio que
"Academia Integral" (ver tensión en §7).

## 2. Problema y contexto de mercado

- Problema declarado: escasez de profesores de matemáticas accesibles, alta varianza de nivel
  dentro de un mismo curso, y ausencia de herramientas que adapten contenido en tiempo real según
  dónde está el estudiante *hoy*.
- Contexto de mercado citado (Chile): alta penetración de internet/smartphones, resultados
  históricos bajos en SIMCE/PAES, escasez de profesores con metodología sólida, normalización del
  aprendizaje digital post-pandemia, disposición de los padres a pagar por herramientas
  complementarias.

## 3. Filosofía pedagógica

### 3.1 Matemáticas como narrativa histórica

Apuesta central: el contenido matemático se entrega **superpuesto a la historia de sus
protagonistas** (Al-Khwarizmi, Descartes, Galois, Euler, Noether, Lovelace…), bajo el argumento de
que la narrativa genera redes de memoria más robustas que la exposición abstracta.

Estructura propuesta por unidad: **1) el personaje → 2) el problema → 3) la herramienta
(concepto matemático) → 4) la práctica (ejercicios graduados) → 5) la síntesis** (conexión con
aplicaciones contemporáneas).

Ejemplos de unidades planificadas:

| Personaje | Tópico matemático | Nivel |
|---|---|---|
| Al-Khwarizmi | Introducción al Álgebra | Básico |
| René Descartes | Plano cartesiano y funciones | Básico-Medio |
| Évariste Galois | Teoría de grupos / polinomios | Avanzado |
| Leonhard Euler | Funciones exponenciales y *e* | Medio |
| Emmy Noether | Estructuras algebraicas | Avanzado |
| Ada Lovelace | Algoritmos y pensamiento formal | Transversal |

**Estado en el código:** no implementado. El diagnóstico y los `resources` actuales no tienen
componente narrativo-histórico. Relacionado con [[BACKLOG]] T-01 (contenido) si se decide adoptar.

### 3.2 Control retroalimentado aplicado a la pedagogía

Marco conceptual: el estudiante es medido continuamente y el sistema ajusta contenido, dificultad
y ritmo — analogía explícita con sistemas de control (Ogata, *Modern Control Engineering*). El
error no es un fracaso sino información que calibra el modelo del estudiante.

Esto es, en esencia, una descripción de alto nivel de lo que el motor IRT (1PL/MAP) ya hace en el
código actual — ver [[TERMINOLOGY]] "IRT / TRI" y [[../adr/ADR-004-irt-1pl-map-y-regla-de-parada]].
El libro lo generaliza como principio de diseño, no introduce un mecanismo distinto.

### 3.3 Modelo de clasificación de dos (y eventualmente tres) ejes

El libro propone una **huella cognitiva bidimensional**, más ambiciosa que la banda única de θ que
usa el código hoy:

- **Eje 1 — Conocimiento**: igual a la θ del modelo IRT actual, en la misma escala `[-3, 3]`
  (coincide con `questions.difficulty`, ya implementado).
- **Eje 2 — Frecuencia (λ)**: *respuestas por minuto*, no "tiempo de respuesta" simple —
  `λ = n_respuestas / Δt_sesión`. Se compara explícitamente con la métrica de fluidez lectora
  (palabras por minuto). **No implementado**: el código captura `time-ms` por respuesta
  (ver [[OPEN_QUESTIONS]] Q-17) pero no lo agrega a una frecuencia de sesión ni lo usa para
  clasificar.
- **Eje 3 — Estilo de aprendizaje** *(fase futura, sin diseño técnico)*: evaluaciones para
  detectar canal preferente — auditivo, visual, kinestésico/procedimental, y un eje
  conductual/de personalidad (persistencia ante el error, tolerancia a la frustración). Declarado
  explícitamente como diferenciador competitivo, no como algo por construir en el corto plazo.

Caso de uso que motiva el Eje 2: un estudiante con **conocimiento alto y frecuencia baja**
("sabe, pero lento") indica comprensión sin automatización, y requeriría un tipo de práctica
distinto al de baja-conocimiento/baja-frecuencia. El código actual no distingue estos dos perfiles.

### 3.4 Tres grupos de conocimiento (vs. cuatro bandas de θ)

| Grupo (libro) | Rango de dificultad | Frecuencia |
|---|---|---|
| Básico | d ∈ [-3, -0.5] | cualquiera |
| Medio | d ∈ [-0.5, 1.5] | cualquiera |
| Avanzado | d ∈ [1.5, 3] | cualquiera |

Esto **no coincide** con las cuatro bandas ya implementadas en `universo.profile` /
`class_slots.theta_band` (`inicial < 0`, `basico [0,1)`, `intermedio [1,2)`, `avanzado ≥ 2` — ver
[[TERMINOLOGY]]). Además el libro distingue:

- **Grupo de Conocimiento**: clasificación estática del diagnóstico inicial.
- **Grupo de Aprendizaje**: clasificación dinámica que evoluciona con ritmo, frecuencia y estilo
  observado — no existe hoy ni como concepto ni como tabla.

Ver tensión registrada en [[OPEN_QUESTIONS]] Q-22.

## 4. Modelo de negocio propuesto

### 4.1 Embudo

`Test diagnóstico (gratuito) → Clasificación → Catálogo personalizado de clases → Booking (pago)`

El test se enmarca como "promesa", no barrera: el estudiante lo hace porque recibe a cambio un
catálogo personalizado. El libro argumenta que esto también resuelve, sin algoritmo adicional, la
formación de grupos homogéneos — que es exactamente lo que ya hacen los `class_slots` filtrados por
banda.

### 4.2 Propuesta de valor por segmento

- **Estudiante**: diagnóstico honesto + catálogo de clases ajustado a su nivel.
- **Padre/tutor**: visibilidad del nivel del hijo desde el día 1, ruta y costo claros.
- **Colegio**: herramienta de nivelación objetiva que complementa el aula.

### 4.3 Segmentos de cliente

1. Estudiantes de enseñanza media (14–18) preparando PAES o mejorando notas.
2. Estudiantes universitarios en carreras con matemática de base.
3. Adultos que retoman estudios o buscan certificación.
4. Colegios e instituciones (cliente B2B).

### 4.4 Oferta y modelo de pago — ✅ **resuelto a favor del libro (D-19/D-26, 2026-07-28/30)**

Formatos: clase en vivo, clase grabada, lectura narrativa, ejercicios guiados.

Modelo de pago propuesto: **pago por clase o paquete** (no suscripción, al menos en esta etapa),
justificado por menor fricción de entrada y venta más concreta vía agentes. Productos: clase
individual, paquete de 4 clases, paquete completo de nivel, licencia institucional. La migración a
suscripción mensual se evalúa recién en una "Fase 3" propia del libro, tras validar retención.

> **Ya no contradice al MVP.** El owner confirmó exactamente esta dirección: **pago por clase**
> (D-19/D-26) a $10.000 CLP/hora, con la primera videollamada gratis tras el diagnóstico — el
> diagnóstico/perfil/plan siguen gratis (`isAccessibleForFree: true` en el JSON-LD sigue acotado a
> eso, ver [[BUSINESS_CONTEXT]] §5). La decisión pendiente **P-03** y la pregunta **Q-02** que
> registraban esta tensión **ya están respondidas** — ver [[DECISIONS]] D-19/D-26,
> [[OPEN_QUESTIONS]] Q-02, Q-21. Lo que el libro proponía como paquetes (4 clases, nivel completo,
> licencia institucional) **no** está decidido todavía -- solo el precio por hora individual; eso
> sigue siendo intención del libro, no decisión aplicada.

### 4.5 Métricas de negocio propuestas

Tasa de conversión test → booking · tasa de completación del test · tamaño/homogeneidad de
grupos · tasa de recompra · NPS · ganancia de nivel (delta de dificultad entre inicio y fin de
paquete). Complementa, sin reemplazar, las métricas ya listadas en [[BUSINESS_CONTEXT]] §6.

### 4.6 Estrategia de crecimiento

Marca personal de Jacobo como canal de adquisición · grupos piloto gratuitos (para generar datos y
testimonios) · red de agentes/profesores independientes con comisión · pilotos institucionales con
1–2 colegios · comunidad entre pares dentro de cada grupo de nivel.

## 5. Equipo y roles a incorporar

Hoy: Jacobo Córdova como fundador, diseñador pedagógico y único desarrollador (coincide con
[[RISKS]] R-01, bus factor = 1).

Roles declarados como necesarios a futuro: desarrollador ClojureScript, ingeniero de
datos/ML (para calibrar el motor adaptativo — relacionado con [[OPEN_QUESTIONS]] Q-05), diseñador
UX/UI, redactor pedagógico (para las lecturas narrativas), agente educativo/ventas.

## 6. Roadmap declarado en el libro

> Este roadmap es **independiente** del reconstruido en [[ROADMAP]] (F0–F11), que sale del
> historial de commits real. El del libro es la intención estratégica del fundador, sin fecha
> comprometida ni verificación de código. Se transcribe aquí sin fusionar ambos para no perder
> ninguna de las dos fuentes.

**Fases del libro (distintas de las fases F0–F11 del código):**

1. Prototipo (autenticación, banco de álgebra, comentarios) — coincide aproximadamente con F0–F1.
2. Motor adaptativo (selección de dificultad) — ya implementado en el código (F1), más avanzado de
   lo que el libro asume.
3. Contenido narrativo histórico — no iniciado.
4. Paneles y métricas (estudiante, padres, profesores) — parcialmente cubierto por F4/admin, sin
   panel de padres.
5. Escalabilidad (más infraestructura, más materias).

**Horizontes de tiempo:**

- **Corto plazo (0–6 meses):** ≥200 preguntas validadas de álgebra, motor adaptativo básico (ya
  existe y es más sofisticado — 1PL/MAP, no solo selección de dificultad), primeras 5 lecturas
  narrativas, primeros 100 usuarios activos en piloto, primer dashboard de métricas.
- **Mediano plazo (6–18 meses):** geometría/funciones/estadística, modelo freemium → suscripción
  premium, primer piloto institucional, equipo mínimo (fundador + 1 dev + 1 redactor), búsqueda de
  inversión semilla o CORFO/Start-Up Chile.
- **Largo plazo (18+ meses):** expansión a otras asignaturas, internacionalización a Latinoamérica
  hispanohablante, IA generativa para personalización, certificaciones propias, tutores en vivo
  conectados al sistema de clasificación.

## 7. Tesis de inversión y uso de fondos

Argumentos declarados: problema real y masivo, diferenciación técnica (control retroalimentado
aplicado a educación, sin equivalente claro en el mercado hispanohablante), diferenciación
narrativa (clases históricas), fundador con conocimiento de dominio + código + docencia a la vez,
prototipo funcional ya en producción.

Uso de fondos propuesto: desarrollo técnico 40% · producción de contenido 25% · marketing/
adquisición 20% · operaciones/infraestructura 10% · reserva 5%.

**Estado:** sin ronda de inversión abierta ni conversación documentada en el repositorio a la fecha
de esta nota. Registrado como contexto, no como hecho en curso.

## 8. Glosario nuevo introducido por el libro

Ver adiciones en [[TERMINOLOGY]] — sección "Visión de negocio (Libro del Proyecto)". Términos:
Motor Adaptativo (como lo nombra el libro; en el código es el motor IRT/tetha), Grupo de
Conocimiento, Grupo de Aprendizaje, Control Retroalimentado, Frecuencia (λ), Freemium, MAU, NPS,
BaaS.

## 9. Preguntas abiertas propias del libro

El propio documento lista, en su capítulo final, preguntas sin responder: especificación completa
del algoritmo adaptativo, criterios de validación/ingesta del banco de preguntas, índice completo
de lecturas históricas, modelado dinámico de grupos de aprendizaje, contrato para agentes
educativos, estrategia de privacidad para menores, y fondos/programas de apoyo aplicables en Chile.
Se han incorporado como preguntas nuevas en [[OPEN_QUESTIONS]] donde no dupliquen una ya existente
(la de privacidad ya existía como Q-03/R-06).

## 10. Referencias citadas en el libro

Rasch (1960) · Lord (1980), *Applications of Item Response Theory to Practical Testing Problems* ·
Vygotsky (1978) · Mayer (2009), *Multimedia Learning* · Willingham (2009), *Why Don't Students Like
School?* · Ogata (2010), *Modern Control Engineering* · Bloom (1984), "The 2 Sigma Problem".

---

Relacionado: [[PROJECT_BRIEF]] · [[BUSINESS_CONTEXT]] · [[ROADMAP]] · [[TERMINOLOGY]] ·
[[OPEN_QUESTIONS]] · [[DECISIONS]] · [[RISKS]]
