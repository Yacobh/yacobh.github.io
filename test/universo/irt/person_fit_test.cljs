(ns universo.irt.person-fit-test
  (:require [cljs.test :refer [deftest is testing]]
            [universo.irt.person-fit :as pf]))

(defn- r [b ok & [ms]] {:difficulty b :correct? ok :time-ms (or ms 20000)})

;; Ocho ítems de −2 a +1,5. Ordenado: acierta los fáciles, falla los difíciles.
(def ordenado  (mapv r [-2 -1.5 -1 -0.5 0 0.5 1 1.5] [true true true true true false false false]))
;; Mismo número de aciertos, al revés: falla los fáciles, acierta los difíciles.
(def invertido (mapv r [-2 -1.5 -1 -0.5 0 0.5 1 1.5] [false false false true true true true true]))

(deftest lz-distingue-el-orden
  (let [lo (pf/lz ordenado 0.5 0.25)
        li (pf/lz invertido 0.5 0.25)]
    (testing "el patrón ordenado no está en la cola baja"
      (is (> lo pf/corte-lz)))
    (testing "el invertido sí, con el mismo θ y los mismos aciertos"
      (is (< li pf/corte-lz))
      (is (< li lo)))))

(deftest lz-sin-varianza
  (is (nil? (pf/lz [] 0 0.25))))

(deftest guttman
  (testing "perfectamente ordenado → 0"
    (is (= 0 (pf/guttman ordenado))))
  (testing "perfectamente invertido → 1"
    (is (= 1 (pf/guttman invertido))))
  (testing "sin pares acierto-fallo → nil"
    (is (nil? (pf/guttman (mapv #(r % true) [-1 0 1])))))
  (testing "pares a la misma dificultad no cuentan"
    (is (nil? (pf/guttman [(r 0 true) (r 0 false)])))))

(deftest cv-tiempo
  (is (= 0 (pf/cv-tiempo (mapv #(r 0 true %) [1000 1000 1000]))))
  (is (> (pf/cv-tiempo (mapv #(r 0 true %) [1000 5000 30000])) 0.5))
  (testing "con menos de tres tiempos no se reporta"
    (is (nil? (pf/cv-tiempo [(r 0 true 1000) (r 0 true 2000)])))))

(deftest respuestas-evaluables
  (testing "los escapes y las respuestas sin dificultad quedan fuera"
    (is (= 1 (count (pf/respuestas-evaluables
                     [(r 0 true)
                      {:difficulty 0 :correct? false :escape "resolucion"}
                      {:correct? true}]))))))

(deftest medir
  (testing "un intento corto no se reporta"
    (is (= {:n 3} (pf/medir (subvec ordenado 0 3) 0 0.25))))
  (testing "sin θ no se reporta"
    (is (= {:n 8} (pf/medir ordenado nil 0.25))))
  (testing "el invertido queda marcado; el ordenado no"
    (is (true?  (:lz-bajo? (pf/medir invertido 0.5 0.25))))
    (is (false? (:lz-bajo? (pf/medir ordenado 0.5 0.25))))))
