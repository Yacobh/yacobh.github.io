(ns universo.opciones-test
  (:require
   [cljs.test :refer-macros [deftest is testing]]
   [universo.opciones :as opciones]))

(def ^:private opts
  [{:value "A" :label "a"} {:value "B" :label "b"}
   {:value "C" :label "c"} {:value "D" :label "d"}])

(deftest permutacion-es-una-permutacion
  (testing "cada índice aparece exactamente una vez, para muchos ids"
    (doseq [id (range 0 500)]
      (is (= #{0 1 2 3} (set (opciones/permutacion 4 id)))
          (str "id " id " no produjo una permutación")))))

(deftest barajar-preserva-las-alternativas
  (testing "no se pierde, duplica ni altera ninguna alternativa"
    (doseq [id (range 0 200)]
      (is (= (set opts) (set (opciones/barajar opts id))))
      (is (= 4 (count (opciones/barajar opts id)))))))

(deftest barajar-preserva-el-value
  (testing "el :value viaja con su label: el servidor corrige por letra (ADR-015)"
    (doseq [id (range 0 200)]
      (doseq [{:keys [value label]} (opciones/barajar opts id)]
        (is (= (clojure.string/lower-case value) label))))))

(deftest es-determinista
  (testing "el mismo ítem se ve siempre igual, aunque se recargue la página"
    (doseq [id [1 7 42 56 178 306]]
      (is (= (opciones/barajar opts id) (opciones/barajar opts id))))))

(deftest reparte-la-correcta-entre-las-cuatro-posiciones
  (testing "con la clave siempre en A —el estado real del banco— la posición
            mostrada no se concentra en ningún lugar"
    (let [posiciones (map (fn [id]
                            (->> (opciones/barajar opts id)
                                 (map :value)
                                 (map-indexed vector)
                                 (some (fn [[i v]] (when (= "A" v) i)))))
                          (range 1 401))
          conteo (frequencies posiciones)]
      (is (= 4 (count conteo)) "usa las cuatro posiciones")
      (doseq [[pos n] conteo]
        (is (< 60 n 140)
            (str "posición " pos " apareció " n " veces de 400; se esperaba ~100"))))))

(deftest rompe-el-orden-relativo
  (testing "no es una rotación cíclica: el orden relativo de los distractores
            cambia, que es justo lo que la rotación anterior no hacía"
    (let [rotaciones (set (for [s (range 4)]
                            (vec (concat (drop s ["A" "B" "C" "D"])
                                         (take s ["A" "B" "C" "D"])))))
          ordenes (map (fn [id] (mapv :value (opciones/barajar opts id))) (range 1 201))
          no-ciclicos (remove rotaciones ordenes)]
      (is (< 100 (count no-ciclicos))
          (str "solo " (count no-ciclicos) " de 200 órdenes no son rotaciones")))))

(deftest tolera-listas-degeneradas
  (testing "no revienta con 0 ni 1 alternativa"
    (is (= [] (opciones/barajar [] 5)))
    (is (= [{:value "A"}] (opciones/barajar [{:value "A"}] 5)))))

(deftest acepta-id-string
  (testing "si algún día el id es uuid, barajar sigue funcionando y siendo estable"
    (let [id "9f3c1e2a-0000-4000-8000-000000000001"]
      (is (= #{0 1 2 3} (set (opciones/permutacion 4 id))))
      (is (= (opciones/barajar opts id) (opciones/barajar opts id))))))
