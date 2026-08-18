(ns universo.irt.escape
  "El escape del estudiante: «no entiendo el enunciado» / «no sé resolverlo».

   ── Qué problema resuelve ──────────────────────────────────────────────────
   Con cuatro alternativas y ningún botón más, un estudiante que no entiende
   nada tiene exactamente dos salidas: adivinar o abandonar. Las dos son malas
   para él y peores para el banco — una respuesta al azar entra a la
   verosimilitud como si fuera evidencia (de eso se ocupa `universo.irt.effort`
   cuando alcanza a medir el tiempo, y no siempre alcanza) y un abandono no deja
   rastro de por qué se abandonó.

   ── Por qué NO es «una alternativa incorrecta más» ─────────────────────────
   Un error y un «no sé» son diagnósticos **opuestos en accionabilidad**:

     · Alternativa incorrecta → tiene un procedimiento y está mal. Hay una idea
       errónea nombrable (`questions.error_*`), y lo que corresponde es
       corregirla.
     · «No sé resolverlo» → no tiene procedimiento. **No hay** idea errónea que
       nombrar: hay un hueco de prerrequisito, y lo que corresponde es el módulo
       anterior.
     · «No entiendo el enunciado» → el bloqueo es de lectura o de notación, no
       de matemática. Es lo único de los tres que además dice algo **del ítem**
       y no del estudiante.

   Tratar los tres como «incorrecta» tira justamente la distinción que los hace
   útiles. Por eso son dos botones y no uno: cuestan un botón más y separan dos
   poblaciones que necesitan cosas contrarias.

   ── Qué hace este namespace HOY y qué no ───────────────────────────────────
   **Instrumenta, no decide.** Un escape se registra como respuesta con
   `:weight 0.0`, es decir por el camino que ADR-014 ya construyó para la
   evidencia que no es evidencia:

     · No mueve θ. El peso entra en las dos derivadas de
       `universo.components.tetha`, así que con w = 0 no aporta score.
     · No aporta información de Fisher, así que **el SE no baja**: la regla de
       parada `SE ≤ umbral` no se cumple escapando, y el test sigue preguntando.
     · Sí cuenta para `max-items`, porque `progress/stop-reason` cuenta
       respuestas. Un test donde se escapa todo termina por `:max-items`, no se
       vuelve infinito.
     · Queda fuera del eje de fluidez sin tener que decir nada:
       `fluency/usable?` exige respuesta correcta **y** peso positivo, y un
       escape falla las dos condiciones.

   Lo que este namespace **no** hace todavía, a propósito:

     · No baja la dificultad por su cuenta. Con `:correct? false` el motor
       adaptativo ya sirve ítems más cercanos al θ estimado; el retroceso
       explícito al módulo prerrequisito es una decisión de **selección** y va
       en el servidor (`next_question`), no acá.
     · **No fija ningún umbral de tasa de escape.** `escape-rate` se calcula y
       se guarda; qué valor marca un perfil como poco confiable sale de observar
       un curso real (BACKLOG T-90), no del criterio del autor. Este proyecto ya
       se equivocó dos veces poniendo a mano un número que después los datos
       corrigieron —el piso de `min_response_seconds` (3 → 2, ver T-59) y los
       cortes de fluidez, que siguen sin calibrar (T-65)—. No se repite acá.

   ── Compatibilidad hacia atrás ─────────────────────────────────────────────
   Mismo criterio que `effort/weight-of` y que ADR-014: las respuestas rendidas
   antes de esto no traen `:escape`, y `escape-of` devuelve nil para ellas. Nada
   se recalcula hacia atrás y ningún perfil ya mostrado cambia de significado."
  (:require [universo.irt.effort :as effort]))

;; -----------------------------------------------------------------------------
;; Las dos clases de escape
;; -----------------------------------------------------------------------------

;; El orden es el de la UI y el de los reportes, y no es alfabético: va de lo
;; que habla del ítem a lo que habla del estudiante.
(def kinds
  [:enunciado    ;; «no entiendo lo que me están preguntando» → lectura/notación
   :resolucion]) ;; «entiendo la pregunta, no sé cómo resolverla» → prerrequisito

(def kind-set (set kinds))

(defn kind
  "Normaliza una clase de escape, o nil si no es una de las dos.

   Acepta keyword o string porque el valor vuelve desde `tests.test` (JSONB) como
   string: al releer un test guardado, `:escape` llega \"resolucion\", no
   :resolucion. Sin esta normalización los reportes contarían cero sobre datos
   que sí están."
  [v]
  (cond
    (contains? kind-set v) v
    (string? v) (let [k (keyword v)] (when (contains? kind-set k) k))
    :else nil))

(defn escape-of
  "La clase de escape de una respuesta, o nil si fue una respuesta normal."
  [response]
  (kind (:escape response)))

(defn escape?
  "¿Esta respuesta es un escape?"
  [response]
  (some? (escape-of response)))

;; -----------------------------------------------------------------------------
;; Construcción de la respuesta
;; -----------------------------------------------------------------------------

(defn escape-response
  "Respuesta que representa un escape, lista para entrar a `[:test :responses]`.

   Se construye acá y no en el handler por la misma razón que
   `effort/weigh-response`: el peso y la forma quedan decididos en un solo lugar
   y viajan con la respuesta hasta `tests.test`, donde son auditables junto al
   evento que los produjo.

   Claves deliberadas:
   - `:selected-option nil` — no eligió ninguna alternativa. Es lo que hace que
     `profile/misconception-from` devuelva nil y **no** invente una idea errónea
     para alguien que declaró no tener ninguna.
   - `:correct? false` — no acertó. Cuenta como déficit del módulo, que es
     cierto, sin que el peso 0.0 lo deje mover θ.
   - `:weight 0.0` — la vía de ADR-014 para evidencia que no informa habilidad.
   - `:time-ms` se conserva **medido pero inerte**: cuánto tardó en rendirse es
     dato útil para T-90, y con `:correct? false` el eje de fluidez lo ignora
     igual."
  [{:keys [question-id escape-kind time-ms difficulty topic module-id module-slug
           question-text]}]
  (let [k (kind escape-kind)]
    (when k
      {:question-id question-id
       :selected-option nil
       :correct? false
       :correct-option nil
       :selected-error nil
       :escape k
       :weight effort/discarded-weight
       :time-ms (or time-ms 0)
       :difficulty (or difficulty 0.0)
       :topic topic
       :module-id module-id
       :module-slug module-slug
       :question-text question-text})))

;; -----------------------------------------------------------------------------
;; Agregados — la observación que pide T-90
;; -----------------------------------------------------------------------------

(defn escape-counts
  "Cuántos escapes de cada clase hay en un conjunto de respuestas.

   Devuelve siempre las dos claves, en cero si no hubo: un mapa con forma
   estable es más fácil de leer en un reporte que uno que a veces trae la clave
   y a veces no."
  [responses]
  (reduce (fn [acc r]
            (if-let [k (escape-of r)]
              (update acc k inc)
              acc))
          (zipmap kinds (repeat 0))
          (or responses [])))

(defn escape-count
  "Total de escapes, de cualquier clase."
  [responses]
  (count (filter escape? (or responses []))))

(defn escape-rate
  "Fracción de respuestas que fueron escape, en [0.0, 1.0]. 0.0 sin respuestas.

   Es la magnitud que va a gobernar la guarda de confianza del perfil cuando
   haya datos para elegir su umbral (ver el docstring del namespace). Hoy se
   calcula y se guarda; no decide nada."
  [responses]
  (let [total (count (or responses []))]
    (if (zero? total)
      0.0
      (/ (double (escape-count responses)) total))))

(defn summary
  "Resumen de escape de un test, para el perfil y para los reportes.

   nil cuando no hubo ningún escape: así un perfil sin escapes no arrastra un
   mapa de ceros, y `profile/build` puede omitir la clave por completo — que es
   la diferencia entre «no escapó» y «este test es anterior al escape»."
  [responses]
  (let [n (escape-count responses)]
    (when (pos? n)
      {:total n
       :rate (escape-rate responses)
       :by-kind (escape-counts responses)})))

;; -----------------------------------------------------------------------------
;; Retroceso de dificultad — en la SELECCIÓN, nunca en la estimación
;; -----------------------------------------------------------------------------
;;
;; Acá está la distinción que sostiene todo el diseño (ADR-029 §3): **θ y el ítem
;; que se muestra son dos decisiones distintas.**
;;
;;   · θ es lo que el modelo estima que sabe el estudiante. Un escape entra con
;;     peso 0.0 y por lo tanto **no lo toca**: no se estima nada a partir de una
;;     no-respuesta.
;;   · Qué ítem mostrar después es una decisión **pedagógica**. Insistir al mismo
;;     nivel con alguien que acaba de declarar que no entiende es exactamente lo
;;     que no hay que hacer.
;;
;; Es el mismo movimiento de ADR-014 con el tiempo: no meter en el 1PL lo que no
;; es habilidad. Como `next_question` recibe el θ objetivo **como parámetro**,
;; esto se resuelve eligiendo qué número mandarle — sin migración, sin tocar la
;; estimación y sin que el ítem servido contamine nada.

(defn consecutive-escapes
  "Cuántos escapes seguidos hay al FINAL de las respuestas.

   Se cuenta desde el final, no en total, porque es lo que hace que el retroceso
   **se acumule mientras el estudiante siga sin poder** y **se reinicie solo** en
   cuanto responda una pregunta de verdad. Sin esto haría falta un contador
   aparte en `app-db` que alguien tendría que acordarse de limpiar."
  [responses]
  (count (take-while escape? (reverse (or responses [])))))

(defn selection-theta
  "El θ **objetivo para elegir el próximo ítem**. No es θ y no lo reemplaza.

   `theta` es la estimación vigente, `responses` el historial del test y `step`
   el tamaño del escalón de retroceso.

   Tres decisiones:

   1. **El ancla es el mínimo entre θ y la dificultad del ítem escapado.** El
      ítem se eligió por cercanía a θ, así que normalmente son casi lo mismo;
      pero cuando la ventana estrecha viene vacía, `next_question` sirve algo más
      difícil, y en ese caso retroceder desde θ dejaría al estudiante en el mismo
      lugar donde acaba de atascarse.
   2. **Se acumula:** N escapes seguidos son N escalones. Es lo que produce el
      «va bajando» que se espera de verdad, en vez de un único escalón que se
      queda corto para quien no entiende nada.
   3. **`step` se recibe, no se inventa acá.** Quien llama pasa
      `progress/selection-half-width`, que es la anchura que el sistema ya usa
      para definir «cerca». Es deliberado no declarar una constante nueva: sería
      otro número autoral, y ADR-029 existe en parte para no repetir ese error.

   El piso es -3.0, el mismo clamp del rango IRT de `tetha/clamp-theta`: por
   debajo de eso no hay banco y pedir ítems más fáciles no devolvería ninguno."
  [theta responses step]
  (let [n (consecutive-escapes responses)]
    (if (zero? n)
      (double (or theta 0.0))
      (let [ultimo (last responses)
            base (min (double (or theta 0.0))
                      (double (or (:difficulty ultimo) (or theta 0.0))))
            paso (double (or step 1.0))]
        (max -3.0 (- base (* n paso)))))))

(defn needs-resources?
  "¿Corresponde ofrecerle material a esta respuesta?

   Hoy es «cualquier escape», pero se nombra como función y no se pregunta
   `escape?` en el handler porque las dos clases van a divergir: `:resolucion`
   pide el módulo prerrequisito (cuando exista el grafo, Q-38) y `:enunciado`
   pide material de notación y lectura. Cuando eso pase, cambia acá y no en
   cuatro lugares."
  [response]
  (escape? response))
