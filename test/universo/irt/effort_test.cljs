(ns universo.irt.effort-test
  (:require
   [cljs.test :refer-macros [deftest is testing]]
   [universo.components.tetha :as tetha]
   [universo.irt.effort :as effort]
   [universo.irt.progress :as progress]))

(defn- theta-de
  "θ estimado a partir de un conjunto de respuestas (sin θ previo)."
  [responses]
  (tetha/calculate-theta {:responses responses :theta 0.0}))

(def ^:private enunciado-corto "¿Cuánto es 2+2?")

;; 200 caracteres ⇒ 10 s de lectura con chars-per-second = 20, por encima del
;; piso de 3 s: sirve para probar que la parte proporcional manda.
(def ^:private enunciado-largo (apply str (repeat 200 "x")))

(defn- respuesta
  [{:keys [ms text correct?] :or {correct? true}}]
  {:time-ms ms
   :question-text text
   :correct? correct?
   :difficulty 0.0})

(deftest umbral-combina-piso-y-largo
  (testing "enunciado corto: manda el piso configurado"
    (is (= 3.0 (effort/min-response-seconds enunciado-corto 3.0)))
    (is (= 8.0 (effort/min-response-seconds enunciado-corto 8.0))))

  (testing "enunciado largo: manda la velocidad de lectura"
    (is (= 10.0 (effort/min-response-seconds enunciado-largo 3.0))))

  (testing "sin texto el umbral es el piso"
    (is (= 3.0 (effort/min-response-seconds nil 3.0)))
    (is (= 3.0 (effort/min-response-seconds "" 3.0))))

  (testing "piso 0 deja actuar solo la regla proporcional"
    (is (= 0.0 (effort/min-response-seconds "" 0.0)))
    (is (= 10.0 (effort/min-response-seconds enunciado-largo 0.0))))

  (testing "piso nil cae al valor por defecto"
    (is (= effort/default-min-response-seconds
           (effort/min-response-seconds enunciado-corto nil))))

  (testing "el default es el calibrado contra el histórico (032/T-59), no el autoral de 028"
    (is (= 2.0 effort/default-min-response-seconds)
        "si cambia, tiene que cambiar junto con el default de la columna en Postgres")))

(deftest peso-descarta-solo-lo-no-esforzado
  (testing "por debajo del umbral: peso 0"
    (is (zero? (effort/response-weight (respuesta {:ms 800 :text enunciado-corto}) 3.0))))

  (testing "por encima del umbral: peso 1"
    (is (= 1.0 (effort/response-weight (respuesta {:ms 9000 :text enunciado-corto}) 3.0))))

  (testing "el enunciado largo exige más tiempo: los mismos 5 s pasan en el corto y no en el largo"
    (is (= 1.0 (effort/response-weight (respuesta {:ms 5000 :text enunciado-corto}) 3.0)))
    (is (zero? (effort/response-weight (respuesta {:ms 5000 :text enunciado-largo}) 3.0))))

  (testing "justo en el umbral cuenta (el corte es estrictamente menor)"
    (is (= 1.0 (effort/response-weight (respuesta {:ms 3000 :text enunciado-corto}) 3.0)))))

(deftest ante-la-duda-la-respuesta-se-conserva
  (testing "time-ms 0 es el centinela de 'no medido', no de respuesta instantánea"
    (is (= 1.0 (effort/response-weight (respuesta {:ms 0 :text enunciado-corto}) 3.0))))

  (testing "sin time-ms tampoco se descarta"
    (is (= 1.0 (effort/response-weight (respuesta {:ms nil :text enunciado-corto}) 3.0)))
    (is (= 1.0 (effort/response-weight {:question-text enunciado-corto} 3.0))))

  (testing "tiempo negativo (reloj corrido) no descarta"
    (is (= 1.0 (effort/response-weight (respuesta {:ms -500 :text enunciado-corto}) 3.0)))))

(deftest weigh-response-y-weight-of
  (testing "weigh-response deja el peso en la respuesta"
    (let [r (effort/weigh-response (respuesta {:ms 100 :text enunciado-corto}) 3.0)]
      (is (zero? (:weight r)))
      (is (= 100 (:time-ms r)) "no toca el resto de la respuesta")))

  (testing "una respuesta sin :weight cuenta como siempre (histórico pre-ADR-014)"
    (is (= 1.0 (effort/weight-of {:correct? true})))
    (is (= 1.0 (effort/weight-of {:weight nil}))))

  (testing "discarded-count cuenta las descartadas"
    (is (= 2 (effort/discarded-count [{:weight 0.0} {:weight 1.0} {:weight 0.0} {}])))))

;; -----------------------------------------------------------------------------
;; El punto que ADR-014 marca como fácil de olvidar: el peso tiene que entrar
;; también en la información de Fisher, no solo en la verosimilitud.
;; -----------------------------------------------------------------------------

(deftest respuesta-descartada-no-mueve-theta-y-sube-el-se
  (let [utiles (mapv (fn [i] {:difficulty 0.0 :correct? (even? i) :weight 1.0})
                     (range 6))
        ;; misma respuesta, una contada y otra descartada
        extra-contada (conj utiles {:difficulty 0.0 :correct? true :weight 1.0})
        extra-descartada (conj utiles {:difficulty 0.0 :correct? true :weight 0.0})]

    (testing "descartar una respuesta correcta deja θ donde estaba"
      (let [theta-base (theta-de utiles)
            theta-descartada (theta-de extra-descartada)
            theta-contada (theta-de extra-contada)]
        (is (= theta-base theta-descartada))
        (is (not= theta-base theta-contada)
            "control: si contara, θ tendría que moverse")))

    (testing "el SE de la descartada es mayor que el de la contada"
      (is (> (progress/standard-error 0.0 extra-descartada)
             (progress/standard-error 0.0 extra-contada))))

    (testing "y es exactamente el de no haberla respondido: no aporta información"
      (is (= (progress/standard-error 0.0 utiles)
             (progress/standard-error 0.0 extra-descartada))))

    (testing "con todas las respuestas descartadas no hay información: SE infinito"
      (is (infinite? (progress/standard-error
                      0.0
                      (mapv #(assoc % :weight 0.0) utiles)))))))
