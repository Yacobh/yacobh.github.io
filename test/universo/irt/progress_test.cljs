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
    ;; 8 ítems en b=θ → I=2, SE≈0.707
    (let [rs (responses 8 0.0)
          cfg {:min-items 5 :max-items 20 :se-threshold 0.8}]
      (is (<= (progress/standard-error 0.0 rs) 0.8))
      (is (= :precision (progress/stop-reason rs 0.0 cfg)))
      (is (true? (progress/should-stop? rs 0.0 cfg)))))

  (testing "para por max-items"
    (let [rs (responses 12 2.5)
          cfg progress/default-stop-config]
      (is (= :max-items (progress/stop-reason rs 0.0 cfg)))
      (is (true? (progress/should-stop? rs 0.0 cfg)))))

  (testing "config por defecto: piso 5, techo 12"
    (is (= 5 (:min-items progress/default-stop-config)))
    (is (= 12 (:max-items progress/default-stop-config)))
    (is (= 0.35 (:se-threshold progress/default-stop-config)))))

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
