(ns universo.irt.progress-test
  (:require
   [cljs.test :refer-macros [deftest is testing]]
   [universo.irt.progress :as progress]))

(defn- responses
  "n respuestas con dificultad `b`. Alterna correctas/incorrectas."
  [n b]
  (mapv (fn [i]
          {:difficulty b
           :correct? (even? i)})
        (range n)))

(deftest progress-points-alinea-longitudes-y-valores
  (testing "serie alineada n/theta/difficulty/correct?"
    (let [rs [{:difficulty 0.5 :correct? true}
              {:difficulty -1.0 :correct? false}
              {:difficulty 1.2 :correct? true}]
          th [0.1 0.0 0.4]
          pts (progress/progress-points rs th)]
      (is (= 3 (count pts)))
      (is (= [1 2 3] (mapv :n pts)))
      (is (= [0.1 0.0 0.4] (mapv :theta pts)))
      (is (= [0.5 -1.0 1.2] (mapv :difficulty pts)))
      (is (= [true false true] (mapv :correct? pts)))))

  (testing "theta-history más corto usa :theta de la response o 0"
    (let [pts (progress/progress-points
               [{:difficulty 1.0 :correct? true}
                {:difficulty 2.0 :correct? false :theta 0.7}]
               [0.2])]
      (is (= 0.2 (:theta (first pts))))
      (is (= 0.7 (:theta (second pts)))))))

(deftest standard-error-baja-con-mas-informacion
  (testing "sin respuestas → SE infinito"
    (is (infinite? (progress/standard-error 0.0 []))))

  (testing "más ítems cerca de θ → menor SE"
    (let [se-few (progress/standard-error 0.0 (responses 3 0.0))
          se-many (progress/standard-error 0.0 (responses 10 0.0))]
      (is (pos? se-few))
      (is (pos? se-many))
      (is (< se-many se-few)))))

(deftest should-stop-rule
  (testing "no para con n < min-items aunque SE sea bajo"
    (let [rs (responses 3 0.0)
          cfg {:min-items 5 :max-items 12 :se-threshold 2.0}]
      (is (nil? (progress/stop-reason rs 0.0 cfg)))
      (is (false? (progress/should-stop? rs 0.0 cfg)))))

  (testing "para por precisión cuando n >= min y SE <= umbral"
    ;; 8 ítems en b=θ con azar c=0,25 → I≈1,2, SE≈0,913.
    ;;
    ;; Con el motor v1 (sin azar) eran I=2 y SE≈0,707: un ítem informaba 0,25 y
    ;; ahora informa ≈0,15, porque parte de los aciertos ya no distinguen a
    ;; quien sabe de quien adivinó. El umbral de este test subió por eso, no
    ;; porque la regla se haya aflojado — y es la misma razón por la que T-111
    ;; queda **más** lejos de dispararse que antes (ADR-034).
    (let [rs (responses 8 0.0)
          cfg {:min-items 5 :max-items 20 :se-threshold 1.0}]
      (is (<= (progress/standard-error 0.0 rs) 1.0))
      (is (= :precision (progress/stop-reason rs 0.0 cfg)))
      (is (true? (progress/should-stop? rs 0.0 cfg)))))

  (testing "con c=0 se recupera exactamente la aritmética del motor v1"
    ;; 8 ítems en b=θ sin azar → I = 8·0,25 = 2, SE = 1/√2 ≈ 0,7071.
    (let [rs (responses 8 0.0)]
      (is (< (Math/abs (- (progress/standard-error 0.0 rs 0.0) 0.70710678)) 1e-6))))

  (testing "para por max-items"
    (let [rs (responses 12 2.5)
          cfg progress/default-stop-config]
      (is (= :max-items (progress/stop-reason rs 0.0 cfg)))
      (is (true? (progress/should-stop? rs 0.0 cfg)))))

  (testing "config por defecto: piso 5, techo 12"
    (is (= 5 (:min-items progress/default-stop-config)))
    (is (= 12 (:max-items progress/default-stop-config)))
    (is (= 0.35 (:se-threshold progress/default-stop-config)))
    (is (nil? (:max-minutes progress/default-stop-config)))
    (is (= 0.25 (:guessing-c progress/default-stop-config)))
    (is (= 2.0 (:prior-sd progress/default-stop-config)))))

(deftest r38-la-parada-por-precision-sigue-sin-dispararse
  ;; R-38 / T-111. Esto no es una aspiración: es la cota superior aritmética.
  ;; Con azar la información máxima por ítem es ≈0,155, así que 12 ítems dan
  ;; como mucho ≈1,86 y el SE no baja de ≈0,73 — contra un umbral de 0,35.
  ;;
  ;; El test existe para que, si alguien sube `max-items` o baja el umbral
  ;; creyendo que así se arregla, quede escrito cuánto falta de verdad.
  (testing "12 ítems perfectamente apuntados no alcanzan el umbral de 0,35"
    (let [rs (responses 12 0.0)
          se (progress/standard-error 0.0 rs)]
      (is (> se 0.7))
      (is (> se (:se-threshold progress/default-stop-config)))
      (is (= :max-items (progress/stop-reason rs 0.0 progress/default-stop-config)))))

  (testing "ni siquiera 30 ítems lo alcanzan"
    (is (> (progress/standard-error 0.0 (responses 30 0.0)) 0.35))))

(deftest posterior-standard-error-incluye-el-prior
  (testing "es menor que el SE de verosimilitud, porque el prior también informa"
    (let [rs (responses 8 0.0)]
      (is (< (progress/posterior-standard-error 0.0 rs)
             (progress/standard-error 0.0 rs)))))

  (testing "sin respuestas devuelve σ del prior, no infinito"
    ;; Antes del primer ítem la incertidumbre no es infinita: es la del prior.
    (is (< (Math/abs (- (progress/posterior-standard-error 0.0 []) 2.0)) 1e-9))
    (is (< (Math/abs (- (progress/posterior-standard-error 0.0 [] {:prior-sd 1.0}) 1.0)) 1e-9)))

  (testing "un prior más ancho da menos precisión aparente"
    (let [rs (responses 8 0.0)]
      (is (< (progress/posterior-standard-error 0.0 rs {:prior-sd 1.0})
             (progress/posterior-standard-error 0.0 rs {:prior-sd 3.0}))))))

(deftest stop-reason-limite-de-tiempo
  (testing "para por :time-limit aunque no se hayan alcanzado min-items ni max-items"
    (let [rs (responses 2 0.0)
          cfg {:min-items 5 :max-items 12 :se-threshold 0.35 :max-minutes 5}]
      (is (= :time-limit (progress/stop-reason rs 0.0 6 cfg)))))

  (testing "no para por tiempo si max-minutes es nil (comportamiento sin límite)"
    (let [rs (responses 2 0.0)]
      (is (nil? (progress/stop-reason rs 0.0 999 progress/default-stop-config)))))

  (testing "no para por tiempo si aún no se alcanza el máximo de minutos"
    (let [rs (responses 2 0.0)
          cfg {:min-items 5 :max-items 12 :se-threshold 0.35 :max-minutes 5}]
      (is (nil? (progress/stop-reason rs 0.0 3 cfg)))))

  (testing ":max-items tiene prioridad si ambos límites se cumplen a la vez"
    (let [rs (responses 12 2.5)
          cfg {:min-items 5 :max-items 12 :se-threshold 0.35 :max-minutes 5}]
      (is (= :max-items (progress/stop-reason rs 0.0 10 cfg)))))

  (testing "2 y 3-aridad siguen sin evaluar tiempo (compatibilidad hacia atrás)"
    (let [rs (responses 12 2.5)]
      (is (= :max-items (progress/stop-reason rs 0.0)))
      (is (= :max-items (progress/stop-reason rs 0.0 progress/default-stop-config))))))

(deftest closest-question-argmin
  (testing "elige la dificultad más cercana a θ"
    (let [qs [{:id 1 :difficulty -1.0}
              {:id 2 :difficulty 0.3}
              {:id 3 :difficulty 1.5}]]
      (is (= 2 (:id (progress/closest-question 0.0 qs))))
      (is (= 3 (:id (progress/closest-question 1.4 qs))))
      (is (= 1 (:id (progress/closest-question -0.9 qs))))))

  (testing "nil si no hay candidatos"
    (is (nil? (progress/closest-question 0.0 [])))
    (is (nil? (progress/closest-question 0.0 nil)))))
