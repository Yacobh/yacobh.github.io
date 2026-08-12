(ns universo.profile-test
  (:require
   [cljs.test :refer-macros [deftest is testing]]
   [universo.profile :as profile]))

(deftest theta-band-boundaries
  (testing "bandas de cupo"
    (is (= "inicial" (profile/theta-band -0.1)))
    (is (= "basico" (profile/theta-band 0.0)))
    (is (= "basico" (profile/theta-band 0.9)))
    (is (= "intermedio" (profile/theta-band 1.0)))
    (is (= "intermedio" (profile/theta-band 1.9)))
    (is (= "avanzado" (profile/theta-band 2.0)))
    (is (= "avanzado" (profile/theta-band 3.5)))))

(deftest build-profile-deficits-and-misconceptions
  (let [questions [{:id 1
                    :question "2+2"
                    :topic "enteros"
                    :module-slug "aritmetica/enteros"
                    :errors {:A "Sumaste mal" :B nil :C nil :D nil}}
                   {:id 2
                    :question "x+1=2"
                    :topic "algebra"
                    :module-slug "algebra/ecuaciones"
                    :errors {:B "Restaste en vez de despejar"}}]
        responses [{:question-id 1 :selected-option "A" :correct? false :difficulty -0.5}
                   {:question-id 2 :selected-option "B" :correct? false :difficulty 0.2}
                   {:question-id 1 :selected-option "C" :correct? true :difficulty -0.5}]
        built (profile/build {:theta 0.4
                              :se 0.3
                              :topic "enteros"
                              :responses responses
                              :questions questions
                              :theta-history [0.1 0.2 0.4]})]
    (is (= "basico" (:theta-band built)))
    (is (= 0.4 (:theta built)))
    (is (= 0.3 (:se built)))
    (is (= "aritmetica" (:track built)))
    (is (seq (:deficits built)))
    (is (= #{"aritmetica/enteros" "algebra/ecuaciones"}
           (set (map :module-slug (:deficits built)))))
    ;; mayor tasa de error primero
    (is (= "algebra/ecuaciones" (:module-slug (first (:deficits built)))))
    (is (= 2 (count (:misconceptions built))))
    (is (some #(= "Sumaste mal" (:explanation %)) (:misconceptions built)))
    (is (true? (get-in built [:stability :stable?])))))

(deftest build-incluye-el-eje-de-fluidez
  (let [enunciado (apply str (repeat 200 "x")) ;; 10 s de lectura
        ;; Cuatro correctas a 2× el tiempo de lectura ⇒ mediana 2.0 ⇒ :fluida.
        responses (vec (for [i (range 4)]
                         {:question-id i :correct? true :difficulty 1.5
                          :question-text enunciado :time-ms 20000 :weight 1.0}))
        built (profile/build {:theta 2.1 :se 0.3 :topic "enteros"
                              :responses responses :questions []})]
    (testing "el perfil trae la medición de fluidez"
      (is (= 4 (get-in built [:fluency :n])))
      (is (= 2.0 (get-in built [:fluency :t-rel])))
      (is (= :fluida (get-in built [:fluency :band]))))

    (testing "y el cuadrante del cruce θ × λ"
      (is (= "avanzado" (:theta-band built)))
      (is (= :consolidado (get-in built [:fluency-profile :id]))))))

(deftest build-calla-cuando-no-hay-evidencia-de-fluidez
  (testing "sin tiempos medidos no se inventa un cuadrante"
    (let [built (profile/build {:theta 2.1 :topic "enteros"
                                :responses [{:question-id 1 :correct? true}]
                                :questions []})]
      (is (= 0 (get-in built [:fluency :n])))
      (is (nil? (get-in built [:fluency :band])))
      (is (nil? (:fluency-profile built))
          "sin banda de fluidez no hay cuadrante, aunque θ sí exista"))))

(deftest sabe-pero-lento-es-el-caso-que-motiva-el-eje
  (testing "θ alto con tiempos largos NO es lo mismo que θ alto y rápido"
    (let [enunciado (apply str (repeat 200 "x"))
          lentas (vec (for [i (range 4)]
                        {:question-id i :correct? true :difficulty 1.5
                         :question-text enunciado :time-ms 100000 :weight 1.0}))
          built (profile/build {:theta 2.1 :topic "enteros"
                                :responses lentas :questions []})]
      (is (= "avanzado" (:theta-band built)) "mismo θ que el test anterior")
      (is (= :laboriosa (get-in built [:fluency :band])))
      (is (= :sabe-pero-lento (get-in built [:fluency-profile :id]))
          "y sin embargo el sistema debe recomendarle algo distinto"))))

(deftest topic-fallback-module-slug
  (let [built (profile/build
               {:theta -0.5
                :topic "numbers_V1"
                :responses [{:question-id 9 :correct? false :selected-option "A"}]
                :questions [{:id 9 :topic "numbers_V1" :errors {:A "Revisa el sistema decimal"}}]})]
    (is (= "inicial" (:theta-band built)))
    (is (= "aritmetica/numeros" (:module-slug (first (:deficits built)))))))
