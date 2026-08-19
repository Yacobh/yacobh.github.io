(ns universo.irt.escape-test
  (:require
   [cljs.test :refer-macros [deftest is testing]]
   [universo.components.tetha :as tetha]
   [universo.irt.escape :as escape]
   [universo.irt.fluency :as fluency]
   [universo.irt.progress :as progress]
   [universo.profile :as profile]))

(defn- respuesta
  "Respuesta normal (no escape)."
  [{:keys [correct? difficulty] :or {correct? true difficulty 0.0}}]
  {:question-id 1
   :selected-option "A"
   :correct? correct?
   :difficulty difficulty
   :time-ms 9000
   :question-text "¿Cuánto es 2+2?"
   :weight 1.0})

(defn- escapada
  ([] (escapada :resolucion))
  ([kind]
   (escape/escape-response {:question-id 7
                            :escape-kind kind
                            :time-ms 4000
                            :difficulty 0.0
                            :topic "algebra"
                            :module-slug "algebra/ecuaciones"
                            :question-text "Resuelve 3x + 2 = 11"})))

;; -----------------------------------------------------------------------------
;; Normalización de la clase
;; -----------------------------------------------------------------------------

(deftest kind-normaliza-keyword-y-string
  (testing "las dos clases válidas, como keyword"
    (is (= :enunciado (escape/kind :enunciado)))
    (is (= :resolucion (escape/kind :resolucion))))

  (testing "como string, que es la forma en que vuelven de tests.test (JSONB)"
    (is (= :enunciado (escape/kind "enunciado")))
    (is (= :resolucion (escape/kind "resolucion"))))

  (testing "cualquier otra cosa es nil, no una clase inventada"
    (is (nil? (escape/kind nil)))
    (is (nil? (escape/kind "")))
    (is (nil? (escape/kind "no-se")))
    (is (nil? (escape/kind :otra)))
    (is (nil? (escape/kind 3)))))

(deftest escape-of-lee-respuestas-viejas-como-no-escape
  (testing "una respuesta anterior al escape no trae la clave"
    (is (nil? (escape/escape-of (respuesta {}))))
    (is (false? (escape/escape? (respuesta {})))))

  (testing "una respuesta releída del JSONB trae la clase como string"
    (is (= :resolucion (escape/escape-of {:escape "resolucion"})))
    (is (true? (escape/escape? {:escape "resolucion"})))))

;; -----------------------------------------------------------------------------
;; La respuesta construida
;; -----------------------------------------------------------------------------

(deftest escape-response-entra-con-peso-cero
  (let [r (escapada)]
    (testing "peso 0.0: la vía de ADR-014 para evidencia que no informa"
      (is (= 0.0 (:weight r))))

    (testing "no hay alternativa elegida ni explicación que mostrar"
      (is (nil? (:selected-option r)))
      (is (nil? (:correct-option r)))
      (is (nil? (:selected-error r))))

    (testing "no acertó, así que cuenta como déficit del módulo"
      (is (false? (:correct? r))))

    (testing "conserva el contexto del ítem para poder agregarlo después"
      (is (= 7 (:question-id r)))
      (is (= "algebra/ecuaciones" (:module-slug r)))
      (is (= 4000 (:time-ms r))))))

(deftest escape-response-rechaza-clases-invalidas
  (testing "sin clase válida devuelve nil en vez de fabricar una respuesta que
            contaría como error normal y movería θ"
    (is (nil? (escape/escape-response {:question-id 1 :escape-kind nil})))
    (is (nil? (escape/escape-response {:question-id 1 :escape-kind "cualquiera"})))))

;; -----------------------------------------------------------------------------
;; La propiedad que importa: el escape no mueve θ
;; -----------------------------------------------------------------------------

(deftest escape-no-mueve-theta
  (let [previas [(respuesta {:correct? true}) (respuesta {:correct? true})]
        theta-sin (tetha/calculate-theta {:responses previas :theta 0.0})
        theta-con (tetha/calculate-theta {:responses (conj previas (escapada))
                                          :theta 0.0})]
    (testing "agregar un escape deja θ exactamente igual"
      (is (= theta-sin theta-con)))

    (testing "en cambio una respuesta incorrecta sí lo mueve — o sea que la
              prueba de arriba no pasa por casualidad"
      (is (not= theta-sin
                (tetha/calculate-theta
                 {:responses (conj previas (respuesta {:correct? false}))
                  :theta 0.0}))))))

(deftest escape-no-aporta-informacion-de-fisher
  (testing "sin información el SE no baja, así que no se puede terminar el test
            escapando"
    (let [solo-escapes (vec (repeat 5 (escapada)))]
      (is (= 0.0 (progress/fisher-information 0.0 solo-escapes)))
      (is (= ##Inf (progress/standard-error 0.0 solo-escapes)))))

  (testing "un escape no le quita información a las respuestas reales"
    (let [reales [(respuesta {:correct? true}) (respuesta {:correct? false})]]
      (is (= (progress/fisher-information 0.0 reales)
             (progress/fisher-information 0.0 (conj reales (escapada))))))))

;; -----------------------------------------------------------------------------
;; Interacción con la regla de parada
;; -----------------------------------------------------------------------------

(deftest escapar-no-permite-terminar-por-precision-pero-si-por-max-items
  (let [config {:min-items 5 :max-items 12 :se-threshold 0.35}]
    (testing "cinco escapes cumplen min-items pero el SE es infinito: no para"
      (is (nil? (progress/stop-reason (vec (repeat 5 (escapada))) 0.0 nil config))))

    (testing "doce escapes paran por max-items: el test no es infinito"
      (is (= :max-items
             (progress/stop-reason (vec (repeat 12 (escapada))) 0.0 nil config))))))

;; -----------------------------------------------------------------------------
;; El escape queda fuera del eje de fluidez sin decir nada
;; -----------------------------------------------------------------------------

(deftest escape-no-es-evidencia-de-fluidez
  (testing "falla las dos condiciones de fluency/usable?: no es correcta y su
            peso no es positivo"
    (is (false? (fluency/usable? (escapada))))))

;; -----------------------------------------------------------------------------
;; Agregados
;; -----------------------------------------------------------------------------

(deftest cuenta-y-tasa
  (let [rs [(respuesta {}) (escapada :enunciado) (escapada :resolucion)
            (escapada :resolucion)]]
    (testing "cuenta por clase, con forma estable"
      (is (= {:enunciado 1 :resolucion 2} (escape/escape-counts rs))))

    (testing "total y tasa"
      (is (= 3 (escape/escape-count rs)))
      (is (= 0.75 (escape/escape-rate rs))))

    (testing "sin respuestas la tasa es 0.0, no una división por cero"
      (is (= 0.0 (escape/escape-rate [])))
      (is (= 0.0 (escape/escape-rate nil))))

    (testing "sin escapes las dos claves siguen ahí, en cero"
      (is (= {:enunciado 0 :resolucion 0}
             (escape/escape-counts [(respuesta {})]))))))

(deftest summary-calla-cuando-no-hubo-escapes
  (testing "nil distingue «no escapó» de «test anterior al escape»"
    (is (nil? (escape/summary [(respuesta {})])))
    (is (nil? (escape/summary []))))

  (testing "con escapes trae total, tasa y desglose"
    (let [s (escape/summary [(respuesta {}) (escapada :enunciado)])]
      (is (= 1 (:total s)))
      (is (= 0.5 (:rate s)))
      (is (= {:enunciado 1 :resolucion 0} (:by-kind s))))))

;; -----------------------------------------------------------------------------
;; El perfil no inventa una idea errónea para quien declaró no tener ninguna
;; -----------------------------------------------------------------------------

(deftest escape-no-produce-misconception
  (let [questions [{:id 7 :question "Resuelve 3x + 2 = 11" :topic "algebra"}]
        perfil (profile/build {:theta 0.0
                               :topic "algebra"
                               :responses [(escapada :resolucion)]
                               :questions questions})]
    (testing "un escape no genera misconception: no eligió ningún distractor"
      (is (empty? (:misconceptions perfil))))

    (testing "pero sí cuenta como déficit del módulo, que es cierto"
      (is (= [{:module-slug "algebra/ecuaciones" :errors 1 :total 1}]
             (:deficits perfil))))

    (testing "y queda registrado en el perfil como observación"
      (is (= 1 (get-in perfil [:escape :total])))
      (is (= {:enunciado 0 :resolucion 1} (get-in perfil [:escape :by-kind]))))))

;; -----------------------------------------------------------------------------
;; Retroceso de dificultad: ocurre en la selección, no en la estimación
;; -----------------------------------------------------------------------------

(deftest consecutive-escapes-cuenta-desde-el-final
  (testing "cuenta la racha final, no el total"
    (is (= 0 (escape/consecutive-escapes [])))
    (is (= 0 (escape/consecutive-escapes [(escapada) (respuesta {})])))
    (is (= 1 (escape/consecutive-escapes [(respuesta {}) (escapada)])))
    (is (= 3 (escape/consecutive-escapes [(escapada) (respuesta {})
                                          (escapada) (escapada) (escapada)]))))

  (testing "responder de verdad reinicia la racha sin contador aparte"
    (is (= 0 (escape/consecutive-escapes
              [(escapada) (escapada) (respuesta {:correct? false})])))))

(deftest selection-theta-no-toca-theta-y-retrocede-por-escalones
  (let [step 1.0]
    (testing "sin escapes al final, el objetivo es θ tal cual: el comportamiento
              de siempre para quien no escapa"
      (is (= 0.5 (escape/selection-theta 0.5 [(respuesta {})] step)))
      (is (= 0.5 (escape/selection-theta 0.5 [] step))))

    (testing "un escape retrocede un escalón"
      (is (= -1.0 (escape/selection-theta 0.0 [(escapada)] step))))

    (testing "se acumula: tres escapes seguidos son tres escalones, que es lo
              que produce el «va bajando» de verdad"
      (is (= -3.0 (escape/selection-theta 0.0
                                          [(escapada) (escapada) (escapada)]
                                          step))))

    (testing "el ancla es el mínimo entre θ y la dificultad del ítem escapado:
              si next_question sirvió algo más difícil que θ, retroceder desde θ
              dejaría al estudiante donde se atascó"
      (let [dificil (assoc (escapada) :difficulty 2.0)]
        ;; θ = 1.0, ítem 2.0 ⇒ ancla 1.0 (θ), no 2.0
        (is (= 0.0 (escape/selection-theta 1.0 [dificil] step))))
      (let [facil (assoc (escapada) :difficulty -1.0)]
        ;; θ = 1.0, ítem -1.0 ⇒ ancla -1.0 (el ítem), no θ
        (is (= -2.0 (escape/selection-theta 1.0 [facil] step)))))

    (testing "el piso es -3.0, el clamp del rango IRT: más abajo no hay banco"
      (is (= -3.0 (escape/selection-theta 0.0 (vec (repeat 10 (escapada))) step))))))

(deftest el-retroceso-es-de-seleccion-y-no-de-estimacion
  (testing "θ sigue intacto después de escapar: selection-theta es un objetivo de
            búsqueda, no una estimación"
    (let [previas [(respuesta {:correct? true}) (respuesta {:correct? true})]
          con-escape (conj previas (escapada))
          theta (tetha/calculate-theta {:responses con-escape :theta 0.0})]
      (is (= theta (tetha/calculate-theta {:responses previas :theta 0.0})))
      ;; …y sin embargo el próximo ítem se busca más abajo.
      (is (< (escape/selection-theta theta con-escape 1.0) theta)))))

;; -----------------------------------------------------------------------------
;; La trampa del prior: por qué el peso 0.0 NO alcanza
;; -----------------------------------------------------------------------------
;; Regresión de un fallo medido en producción el 2026-08-18 (test 294):
;; `mq_armonicos_esfericos`, seis escapes seguidos y ninguna respuesta real. θ
;; caminó de -1,0 a 0,0 y las dificultades servidas fueron
;; -0,8 · -0,3 · 0,2 · 0,7 · 1,1 · 1,5 — o sea que el test se le puso **más
;; difícil** a quien acababa de declarar seis veces que no entendía nada.

(deftest reestimar-con-solo-escapes-arrastra-theta-hacia-el-prior
  (testing "el peso 0.0 impide aportar verosimilitud, pero reestimar el MAP sin
            evidencia real converge a la media del prior (0.0), y el paso máximo
            de 0.4 hace que θ SUBA para quien venía por debajo"
    (let [escapes [(escapada)]
          theta-1 (tetha/calculate-theta {:responses escapes :theta -1.0})]
      (is (> theta-1 -1.0)
          "esta es la trampa: reestimar mueve θ hacia arriba")
      (is (<= theta-1 (+ -1.0 tetha/max-theta-step))))

    ;; La app reestima **una vez por respuesta**, alimentando el θ anterior. Hay
    ;; que simular ese bucle: `limit-theta-step` topa el movimiento a 0.4 **por
    ;; llamada**, así que una sola llamada con seis respuestas mueve 0.4, no seis
    ;; veces 0.4. Es justo lo que produjo el caminar de -1,0 a 0,0 en producción.
    (testing "reestimando una vez por respuesta, seis escapes llegan al prior"
      (let [theta-final (reduce (fn [theta i]
                                  (tetha/calculate-theta
                                   {:responses (vec (repeat (inc i) (escapada)))
                                    :theta theta}))
                                -1.0
                                (range 6))]
        (is (< (Math/abs (- 0.0 theta-final)) 0.01)
            "θ termina en la media del prior, sin una sola respuesta real"))))

  (testing "por eso la regla es congelar θ, no confiar solo en el peso"
    (is (true? (escape/freeze-theta? (escapada))))
    (is (false? (escape/freeze-theta? (respuesta {:correct? false}))))))

(deftest congelar-theta-mantiene-el-retroceso-bajando
  (testing "con θ congelado, el objetivo de selección solo puede bajar — que es
            justo lo que el fallo de producción hacía al revés"
    (let [theta -1.0
          objetivo (fn [n] (escape/selection-theta theta
                                                   (vec (repeat n (escapada)))
                                                   0.5))
          serie (mapv objetivo [1 2 3])]
      (is (< (first serie) theta))
      (is (apply > (cons theta serie))
          "estrictamente decreciente mientras no toque el piso")))

  (testing "y al llegar al piso -3.0 se queda ahí, no sigue bajando al vacío"
    (let [muchos (escape/selection-theta -1.0 (vec (repeat 20 (escapada))) 1.0)]
      (is (= -3.0 muchos)))))

(deftest needs-resources
  (testing "todo escape pide material; una respuesta normal no"
    (is (true? (escape/needs-resources? (escapada :resolucion))))
    (is (true? (escape/needs-resources? (escapada :enunciado))))
    (is (false? (escape/needs-resources? (respuesta {:correct? false}))))))

(deftest perfil-sin-escapes-no-trae-la-clave-poblada
  (let [questions [{:id 1 :question "¿Cuánto es 2+2?" :topic "algebra"}]
        perfil (profile/build {:theta 0.0
                               :topic "algebra"
                               :responses [(respuesta {})]
                               :questions questions})]
    (testing "aditivo de verdad: quien no escapó ve el perfil de siempre"
      (is (nil? (:escape perfil))))))
