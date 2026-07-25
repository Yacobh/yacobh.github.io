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

(deftest topic-fallback-module-slug
  (let [built (profile/build
               {:theta -0.5
                :topic "numbers_V1"
                :responses [{:question-id 9 :correct? false :selected-option "A"}]
                :questions [{:id 9 :topic "numbers_V1" :errors {:A "Revisa el sistema decimal"}}]})]
    (is (= "inicial" (:theta-band built)))
    (is (= "aritmetica/numeros" (:module-slug (first (:deficits built)))))))
