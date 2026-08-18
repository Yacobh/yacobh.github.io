# ADR-029: El «no sé» del estudiante es una tercera categoría de respuesta, no una alternativa incorrecta

## Estado

Aprobada

## Fecha

2026-08-18

## Contexto

### El problema

Con cuatro alternativas y ningún botón más, un estudiante que no entiende el ítem tiene exactamente
dos salidas: **adivinar** o **abandonar**. Las dos son malas para él y peores para el producto:

- Adivinar mete una respuesta al azar en la verosimilitud como si fuera evidencia de habilidad. De
  eso se ocupa parcialmente [[ADR-014-tiempo-de-respuesta-como-eje-separado]] vía
  `universo.irt.effort`, pero solo cuando alcanza a medir el tiempo — y el `:time-ms 0` es
  centinela de «no medido», así que no siempre alcanza. Un estudiante que se toma cinco segundos
  para tirar una moneda pasa el filtro.
- Abandonar no deja rastro de **por qué** se abandonó, que es justamente el dato que falta para
  saber si el diagnóstico de 20 minutos es viable en una hora de clase
  ([[../project-memory/BACKLOG]] T-90).

Además, ninguna de las dos produce lo que el producto promete entregar: el diferencial declarado es
el **mapa de errores** ([[ADR-005-banco-de-items-en-vez-de-cms]], D-12), y un ítem adivinado o
saltado no aporta ninguna idea errónea nombrable.

### Por qué no sirve tratarlo como «una alternativa incorrecta más»

Es la solución obvia y tira justo lo que hace valioso al evento. Un error y un «no sé» son
diagnósticos **opuestos en accionabilidad**:

| Evento | Qué dice del estudiante | Qué corresponde entregarle |
|---|---|---|
| Alternativa incorrecta | Tiene un procedimiento y está mal. Hay una idea errónea nombrable (`questions.error_*`) | La misconception y su explicación contextual: *corrige esto* |
| «No sé resolverlo» | **No tiene procedimiento.** No hay idea errónea que nombrar: hay un hueco de prerrequisito | El módulo anterior: *te falta el paso previo* |
| «No entiendo el enunciado» | El bloqueo es de **lectura o notación**, no de matemática | Notación/vocabulario — y es lo único de los tres que habla del **ítem** y no del estudiante |

Fusionar los tres en «incorrecta» borra esa distinción y deja al plan de estudio recomendando
corregir una idea errónea que el estudiante nunca tuvo.

### La restricción que hace esto baratísimo

El mecanismo ya está construido. `universo.irt.effort` (ADR-014 Fase 1) asigna un **peso** por
respuesta que entra en las **dos** derivadas de `universo.components.tetha`, y por herencia en
`universo.irt.progress/fisher-information`. Una respuesta con peso 0 no aporta score **ni
información**, así que descartar evidencia sube el SE en vez de mentir. Es exactamente la semántica
que un escape necesita, y no hay que inventarla.

### Qué NO se puede hacer server-side

`public.score_answer` (024) valida que la alternativa esté en `('A','B','C','D')` y **levanta
excepción** si no. Un escape no es una alternativa: no hay nada que corregir. Llamarla sería pedirle
que valide algo que no es una respuesta. Por eso el escape es **enteramente del cliente y no
requiere migración**, lo que además lo vuelve desplegable sin tocar producción en la base.

## Decisión

**El escape es una tercera categoría de respuesta. Se registra con peso 0.0, no mueve θ, y no
decide nada todavía.**

Cuatro partes:

1. **Son dos botones, no uno.** `:enunciado` («no entiendo el enunciado») y `:resolucion` («no sé
   cómo resolverlo»). Cuesta un botón más y separa dos poblaciones que necesitan cosas contrarias.
   El primero, además, es **revisión de ítem gratis**: si un ítem acumula marcas, el problema es del
   ítem, y eso es insumo directo de **G-2** ([[ADR-025-motor-de-valor-b2b-y-cinco-vectores]]), que
   es la precondición dura del plan de negocio.

2. **Entra con `:weight 0.0`**, por la vía que ADR-014 construyó para la evidencia que no es
   evidencia, **y además θ no se reestima**. Consecuencias, todas buscadas:
   - No mueve θ.

   > **Corrección del 2026-08-18, medida en producción.** La primera versión decía que el peso 0.0
   > bastaba para que el escape «no mueva θ». **Es falso, y el error tenía el signo peor posible.**
   > El peso impide aportar a la verosimilitud, pero `calculate-theta` reestima el **MAP completo** y
   > lo acerca a su valor convergido en pasos de `tetha/max-theta-step`. Con poca evidencia real ese
   > valor convergido *es la media del prior*, θ = 0. O sea que cada escape arrastraba θ hacia 0 —
   > **hacia arriba** para quien venía por debajo, que es exactamente quien escapa.
   >
   > Medido en el test `294` (`mq_armonicos_esfericos`, seis escapes seguidos y ninguna respuesta
   > real): θ caminó de **-1,0 a 0,0** y las dificultades servidas fueron
   > **-0,8 · -0,3 · 0,2 · 0,7 · 1,1 · 1,5**. El motor le ponía el test **más difícil** a quien
   > acababa de declarar seis veces que no entendía nada.
   >
   > La regla ahora es explícita (`escape/freeze-theta?`): ante un escape, θ **se conserva tal
   > cual** y no se reestima. De una no-respuesta no se estima nada, y «nada» incluye no dejar que
   > el prior mueva la estimación. Verificado en vivo el 2026-08-18 sobre `numbers_v1`: θ constante
   > en -1,00 mientras la dificultad servida bajaba **-1,1 → -2,1 → -3,0**.
   >
   > `progress/progress-points` sigue alineado porque `theta-history` recibe igual el valor (el
   > mismo), manteniendo la correspondencia 1:1 con `responses`.
   - No aporta información de Fisher ⇒ **el SE no baja** ⇒ la regla `SE ≤ umbral` **no se cumple
     escapando** y el test sigue preguntando.
   - Sí cuenta para `max-items`, porque `progress/stop-reason` cuenta respuestas: un test donde se
     escapa todo termina por `:max-items`, no se vuelve infinito.
   - Queda fuera del eje de fluidez sin que haya que decir nada: `fluency/usable?` exige respuesta
     correcta **y** peso positivo, y un escape falla las dos.
   - `:selected-option nil` hace que `profile/misconception-from` devuelva nil: **no se le inventa
     una idea errónea a quien declaró no tener ninguna.** Sí cuenta como déficit del módulo, que es
     cierto.

3. **La bajada de dificultad ocurre en la selección, no en la estimación.**

   > **Corrección del 2026-08-18, el mismo día.** La primera redacción de este punto decía que con
   > el escape marcado `:correct? false` «el motor adaptativo ya sirve ítems más fáciles solo». **Eso
   > era falso y se detectó al revisarlo con el owner:** ese razonamiento vale para la alternativa de
   > peso 1.0, que se descartó. Con **peso 0.0** θ no se mueve en absoluto, así que `next_question`
   > seguía sirviendo el ítem siguiente **en la misma banda de dificultad**. El escape bajaba a cero
   > su propia utilidad: registraba el problema y no hacía nada al respecto.

   El retroceso es **explícito** y vive en `universo.irt.escape/selection-theta`: θ y el ítem que se
   muestra son **dos decisiones distintas**. θ es lo que el modelo estima —y de una no-respuesta no
   se estima nada—; qué mostrar después es una decisión **pedagógica**, y seguir al mismo nivel con
   quien acaba de declarar que no entiende es exactamente lo que no hay que hacer.

   Como `next_question` recibe el θ objetivo **como parámetro**, esto se resuelve eligiendo qué
   número mandarle: **sin migración, sin tocar la estimación y sin que el ítem servido contamine
   nada.** Tres propiedades:
   - el ancla es `min(θ, dificultad del ítem escapado)` — cuando la ventana estrecha viene vacía,
     `next_question` sirve algo más difícil que θ, y retroceder desde θ dejaría al estudiante justo
     donde se atascó;
   - **se acumula**: N escapes seguidos son N escalones, y la racha **se reinicia sola** en cuanto
     responde de verdad;
   - el escalón **no es una constante nueva**: quien llama pasa `progress/selection-half-width`, que
     es la anchura que el sistema ya usa para definir «cerca».

   Es el mismo movimiento conceptual de ADR-014 con el tiempo: no meter en el 1PL lo que no es
   habilidad.

5. **El escape entrega material, no solo una frase.** Decir «no sé» y recibir únicamente una nota
   amable es peor que no preguntar: el estudiante declaró un hueco y hay que darle con qué taparlo.
   El modal de escape carga los recursos publicados del módulo del ítem
   (`crud/fetch-published-resources-for-module`) y los muestra con `plan/resource-card` — **la misma
   tarjeta que ve en «Mi plan»**, no una variante.

   **Limitación declarada, y se dice en la propia UI:** es el material del **mismo** módulo, no el
   del módulo *prerrequisito*, porque el grafo todavía no está decidido (Q-38 / T-98). Para «no sé
   cómo resolverlo» lo correcto es el módulo anterior; esto es la aproximación honesta que se puede
   dar sin inventar el grafo, y mejora sola en cuanto exista. El estado vacío también es honesto:
   con un tercio del banco sin `module_id` (T-60) va a ocurrir, y es mejor decir que no hay material
   que fingir que el estudiante no lo necesitaba.

4. **No se fija ningún umbral de tasa de escape.** `escape/escape-rate` se calcula y se guarda en el
   perfil; **qué valor** marca un perfil como poco confiable sale de observar un curso real (T-90),
   no del criterio del autor.

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|---|---|
| **Un solo botón «No sé»** | Fusiona un problema de lectura con un hueco de contenido. Son dos remedios opuestos y, sobre todo, uno de los dos habla del ítem y no del estudiante: perder eso es perder revisión de banco gratis. |
| **Escape = incorrecta con peso 1.0** | Es defendible —es evidencia de no saber— pero abre el escape estratégico: cinco «no sé» seguidos aterrizan a alguien en banda `inicial` con un plan por debajo de su nivel, y θ manda banda → cupo → plan. Se descarta **para esta etapa**, no para siempre: el peso queda guardado por respuesta, así que se puede recomputar sobre los mismos datos cuando T-90 dé el umbral. |
| **Escape = incorrecta con peso 0.5** | Psicométricamente más fino (θ se mueve poco y el SE sube), pero **0.5 sería un número autoral**. Este proyecto ya se equivocó dos veces así: el piso de `min_response_seconds` puesto en 3 s que los datos bajaron a 2 s (T-59, D-36) y los cortes de fluidez 3,0/6,0 que siguen sin calibrar (T-65). No se repite a sabiendas. |
| **No registrar el escape y solo saltar el ítem** | Deja el mismo agujero que el abandono: no queda rastro de por qué. Y sin entrar a `:responses` no cuenta para `max-items`, así que un test de escapes seguidos correría hasta agotar el banco. |
| **Escape con peso 0.0 pero fuera de `:responses`** | Misma consecuencia anterior sobre `max-items`, y rompe la invariante de que `tests.test` contiene todo lo que pasó en el test. |
| **Resolverlo en el servidor con `score_answer`** | La función rechaza por diseño cualquier cosa que no sea A–D (024). Ampliarla obligaría a una migración contra producción sin staging (R-02) para un cambio que no necesita servidor: no hay respuesta que ocultar ni corregir. |
| **Bajar la dificultad metiendo el escape en el 1PL** | Es exactamente lo que ADR-014 prohibió para el tiempo. Contamina la estimación con algo que no es habilidad y destruye la interpretabilidad de θ. |

## Consecuencias

**Positivas**

- El estudiante que no sabe tiene una salida honesta que **no ensucia su propia medición**, y se le
  dice así con palabras en el feedback.
- Cada «no entiendo el enunciado» es una marca de calidad sobre el ítem: revisión de banco sin
  costo, que alimenta G-2.
- El escape es **cliente puro**: no requiere migración ni toca RLS, así que se puede publicar y
  observar en un curso real sin riesgo en la base (R-02).
- `escape/summary` da la tasa y el desglose por clase, que son tres de las observaciones que T-90
  necesita, sin instrumentación aparte.
- Aditivo de verdad: quien no escapó ve el perfil de siempre, y los perfiles ya guardados no
  cambian de significado.

**Negativas / costos aceptados**

- **θ queda sistemáticamente más incierto** para quien escapa mucho: más ítems administrados y SE
  más alto. Es el comportamiento correcto, pero significa que un test con muchos escapes casi
  siempre va a terminar por `:max-items` y no por precisión.
- **El destino del escape es aproximado, no exacto.** Se le ofrece material del **mismo** módulo,
  no del prerrequisito, hasta que el grafo esté decidido (Q-38 / T-98). Para «no sé cómo resolverlo»
  eso puede ser demasiado difícil todavía — es la mejor aproximación disponible sin inventar
  contenido pedagógico, y la UI no promete más de lo que entrega.
- **El retroceso de dificultad se apoya en que el banco tenga ítems más fáciles del mismo topic**, y
  **medido el 2026-08-18 eso varía muchísimo entre bancos**:

  | topic | n | mín | mediana | ¿retrocede? |
  |---|---|---|---|---|
  | `numbers_v1` | 178 | -3,0 | -1,8 | **Sí**, con recorrido real (-1,1 → -2,1 → -3,0) |
  | `paes_m1` | 44 | -1,8 | -0,5 | Solo un escalón; el piso del banco es -1,8 |
  | `polinomios` | 20 | -1,7 | -1,675 | **No perceptiblemente**: 18 de 20 ítems caben en 0,045 logits |

  El escape no puede fabricar un ítem que no existe. Y `polinomios` es el caso que conviene mirar de
  frente: un banco cuya `difficulty` vive entera en una franja de 0,045 **no es una escala de
  dificultad, es una constante con ruido**. Es [[../project-memory/RISKS]] R-17 y
  [[../project-memory/OPEN_QUESTIONS]] Q-05 en su forma más concreta, y es exactamente lo que **G-2**
  existe para arreglar: mientras `difficulty` sea autoral, «bajar la dificultad» es una operación
  sobre etiquetas que nadie validó.
- **Una llamada extra por escape** para traer el material. Es una consulta filtrada por `module_id`
  y `published`, no el catálogo completo; y ocurre mientras el estudiante lee el modal, en paralelo
  con el prefetch del siguiente ítem.
- **El escape estratégico no está mitigado**, solo medido. Un estudiante puede escapar todo y
  quedarse sin diagnóstico útil; hoy no baja su banda (peso 0.0 no mueve θ), así que el daño es
  para él y no para la cohorte. La guarda de confianza queda pendiente del umbral.
- La UI del test suma dos controles a una pantalla que ya tiene cuatro alternativas y un
  «Finalizar». Se mitigó con jerarquía (peso secundario, sin relleno de señal) pero es densidad
  nueva en la pantalla más importante del producto.
- `progress/progress-points` dibuja el escape como un punto incorrecto en la gráfica, porque lee
  `:correct?`. Es una imprecisión visual conocida y no se corrigió acá para no ampliar el alcance.

## Riesgos

| Riesgo | Mitigación | Ref. |
|---|---|---|
| Escape estratégico: baja el nivel percibido y produce un plan por debajo del real | Peso 0.0 no mueve θ, así que hoy no hay incentivo real. La tasa se mide y la guarda de confianza se define con T-90 | R nuevo, ver [[../project-memory/RISKS]] |
| El botón se vuelve el camino fácil y se degrada la medición del banco entero | Jerarquía visual secundaria y **sin confirmación**: nunca es lo más rápido, pero tampoco se castiga la honestidad. Se observa la tasa en T-90 antes de ajustar nada | R-17 |
| Que el escape se quede en instrumentación para siempre y nunca lleve a un remedio | `045` ya está escrita; el grafo de prerrequisitos es la única pieza que falta y es una decisión del profesor, registrada como pregunta abierta | R-30 |
| Elegir el umbral de tasa de escape «a ojo» cuando aparezca la primera necesidad | Este ADR lo prohíbe explícitamente y nombra los dos precedentes en que pasó | T-59, T-65 |

## Seguimiento

- **Antes de T-90:** compilar, publicar el bundle (ADR-003) y probar el escape de punta a punta con
  una cuenta de **estudiante**, no de admin — incluyendo que el modal de feedback muestre la
  variante de escape y no «Incorrecto».
- **Durante T-90:** anotar tasa de escape del curso, reparto entre `:enunciado` y `:resolucion`, y
  qué ítems concentran marcas de `:enunciado`.
- **Después de T-90:** con esos datos, (a) elegir el umbral de confianza del perfil, (b) decidir si
  el peso pasa de 0.0 a un valor medido, recomputando sobre `:time-ms` y `:escape` ya guardados, y
  (c) revisar los ítems más marcados.
- **Se reconsidera este ADR** si se decide mover θ al servidor: en ese caso el escape se absorbería
  en el flujo de test con estado, junto con `next_question`/`score_answer` (ADR-015 §Seguimiento).

---

Relacionado: [[ADR-004-irt-1pl-map-y-regla-de-parada]] ·
[[ADR-014-tiempo-de-respuesta-como-eje-separado]] · [[ADR-015-item-sin-respuesta-en-el-cliente]] ·
[[ADR-009-reglas-de-negocio-en-namespaces-puros]] · [[ADR-019-eje-de-fluidez-en-vez-de-estilos-de-aprendizaje]] ·
[[ADR-025-motor-de-valor-b2b-y-cinco-vectores]] · [[../project-memory/BACKLOG]] T-90 ·
[[../project-memory/RISKS]] · [[../project-memory/OPEN_QUESTIONS]] · [[../project-memory/DECISIONS]]
