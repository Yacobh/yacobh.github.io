(ns core-test
  (:require [cljs.test :refer-macros [deftest is testing run-tests]]
            [universo.particulas :as particles]))

(deftest test-numbers
  (is (= 1 1)))

(deftest create-particle-test
  (testing "Creación de partícula cuántica"
    (let [particle (particles/create-particle
                    {:mass 1
                     :charge 1
                     :initial-position [0 0 0]})]

      ;; Verificamos que la partícula tenga las propiedades esperadas
      (is (map? particle) "La partícula debe ser un mapa")
      (is (contains? particle :id) "Debe tener un ID único")
      (is (contains? particle :mass) "Debe tener masa")
      (is (contains? particle :charge) "Debe tener carga")
      (is (contains? particle :position) "Debe tener posición")
      (is (contains? particle :momentum) "Debe tener momentum"))))
