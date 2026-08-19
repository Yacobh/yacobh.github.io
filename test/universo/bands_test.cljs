(ns universo.bands-test
  (:require
   [cljs.test :refer-macros [deftest is testing]]
   [universo.bands :as bands]))

(def ^:private modulos
  [{:id "g1" :slug "geometria/areas" :track "geometria" :order_index 1}
   {:id "a2" :slug "algebra/ecuaciones" :track "algebra" :order_index 2}
   {:id "n1" :slug "aritmetica/numeros" :track "aritmetica" :order_index 1}
   {:id "a1" :slug "algebra/expresiones" :track "algebra" :order_index 1}
   {:id "n2" :slug "aritmetica/enteros" :track "aritmetica" :order_index 2}])

(deftest curricular-order-es-la-progresion-que-el-producto-ya-declara
  (testing "aritmética → álgebra → geometría, y dentro de cada eje por order_index"
    (is (= ["n1" "n2" "a1" "a2" "g1"]
           (mapv :id (bands/curricular-order modulos)))))

  (testing "un track desconocido no desaparece: cae al final"
    (is (= ["n1" "raro"]
           (mapv :id (bands/curricular-order
                      [{:id "raro" :track "ninguno" :order_index 1}
                       {:id "n1" :track "aritmetica" :order_index 1}])))))

  (testing "vacío y nil"
    (is (= [] (bands/curricular-order [])))
    (is (= [] (bands/curricular-order nil)))))

(deftest default-bands-hace-marchar-los-centros-y-deja-que-las-bandas-se-solapen
  (let [b (bands/default-bands modulos)]
    (testing "una banda por módulo del producto"
      (is (= 5 (count b))))

    (testing "los centros marchan hacia arriba: esa es la progresión que se afirma"
      (let [centros (map #(:centro (get b (:id %))) (bands/curricular-order modulos))]
        (is (apply < centros))
        (is (= -2.4 (first centros)))
        (is (= 2.4 (last centros)))))

    (testing "las bandas se solapan a propósito"
      ;; Disjuntas y angostas afirmarían que el ítem más difícil de un contenido
      ;; es más fácil que el más trivial del siguiente, que es falso.
      (let [ordenados (map #(get b (:id %)) (bands/curricular-order modulos))]
        (doseq [[a c] (partition 2 1 ordenados)]
          (is (> (:max a) (:min c))))))

    (testing "ninguna banda se sale de la escala θ"
      (doseq [{:keys [min max]} (vals b)]
        (is (>= min bands/theta-min))
        (is (<= max bands/theta-max))))

    (testing "un solo módulo se centra en 0: no hay progresión que representar"
      (let [uno (bands/default-bands [{:id "x" :track "aritmetica" :order_index 1}])]
        (is (= 0.0 (:centro (get uno "x"))))))

    (testing "sin módulos, sin bandas"
      (is (= {} (bands/default-bands []))))))

(deftest cuantica-no-participa-de-la-progresion-paes
  ;; Medido el 2026-08-18: con los 35 módulos mezclados cada banda quedaba en
  ;; 0,17 logits y 15 de ellas eran del experimento de cuántica.
  (let [con-cuantica (conj modulos {:id "q1" :slug "cuantica/origenes"
                                    :track "cuantica" :order_index 1})
        b (bands/default-bands con-cuantica)]
    (testing "el módulo de cuántica no recibe banda"
      (is (nil? (get b "q1"))))

    (testing "y no le cambia la banda a los del producto"
      (is (= (bands/default-bands modulos) b)))

    (testing "product-modules deja fuera lo que no es del producto"
      (is (= 5 (count (bands/product-modules con-cuantica)))))))

(deftest band-for-distingue-lo-decidido-de-lo-derivado
  (let [derivadas (bands/default-bands modulos)]
    (testing "sin banda explícita usa la derivada y lo dice"
      (is (= :derivada (:origen (bands/band-for (first modulos) derivadas)))))

    (testing "con banda explícita manda la explícita"
      (let [m (assoc (first modulos) :band_min -0.5 :band_max 0.5)]
        (is (= {:min -0.5 :max 0.5 :origen :explicita}
               (bands/band-for m derivadas)))))

    (testing "una banda a medias (solo un extremo) no cuenta como explícita"
      (let [m (assoc (first modulos) :band_min -0.5)]
        (is (= :derivada (:origen (bands/band-for m derivadas))))))

    (testing "un módulo que no está en las derivadas y no tiene banda → nil"
      (is (nil? (bands/band-for {:id "fantasma"} derivadas))))))

(deftest repartir-cubre-la-banda-de-extremo-a-extremo
  (testing "varios ítems cubren los bordes: si se apiñaran en el medio, la banda de al lado quedaría con un hueco"
    (is (= [-1.0 -0.5 0.0 0.5 1.0] (bands/repartir 5 -1.0 1.0))))

  (testing "un solo ítem va al centro, no a un extremo"
    (is (= [0.0] (bands/repartir 1 -1.0 1.0))))

  (testing "dos ítems son los dos extremos"
    (is (= [-1.0 1.0] (bands/repartir 2 -1.0 1.0))))

  (testing "cero ítems, cero valores"
    (is (= [] (bands/repartir 0 -1.0 1.0)))
    (is (= [] (bands/repartir nil -1.0 1.0)))))

(deftest assign-respeta-el-orden-que-el-autor-ya-habia-puesto
  (let [items [{:id 3 :order_index 3 :difficulty 0.1 :question "c"}
               {:id 1 :order_index 1 :difficulty 2.9 :question "a"}
               {:id 2 :order_index 2 :difficulty -2.0 :question "b"}]
        r (bands/assign items {:min -1.0 :max 1.0})]
    (testing "ordena por order_index, no por la dificultad vieja"
      (is (= [1 2 3] (mapv :id r))))

    (testing "reparte dentro de la banda y redondea a dos decimales"
      (is (= [-1.0 0.0 1.0] (mapv :difficulty-despues r))))

    (testing "conserva el antes para poder mostrar el cambio sin escribir nada"
      (is (= [2.9 -2.0 0.1] (mapv :difficulty-antes r)))))

  (testing "sin order_index desempata la dificultad previa y después el id"
    (let [r (bands/assign [{:id 2 :difficulty 1.0} {:id 1 :difficulty -1.0}]
                          {:min 0.0 :max 1.0})]
      (is (= [1 2] (mapv :id r)))))

  (testing "un ítem sin dificultad previa no revienta el orden"
    (is (= 2 (count (bands/assign [{:id 1} {:id 2 :difficulty 0.5}] {:min 0.0 :max 1.0}))))))

(deftest changed-no-escribe-lo-que-ya-esta-bien
  (testing "un ítem que ya tiene su valor no se reescribe"
    (is (= [] (bands/changed [{:id 1 :difficulty-antes -1.0 :difficulty-despues -1.0}]))))

  (testing "una diferencia por debajo del redondeo tampoco cuenta"
    (is (= [] (bands/changed [{:id 1 :difficulty-antes -1.002 :difficulty-despues -1.0}]))))

  (testing "un ítem sin dificultad previa SÍ hay que escribirlo"
    (is (= 1 (count (bands/changed [{:id 1 :difficulty-antes nil :difficulty-despues -1.0}])))))

  (testing "un cambio real se conserva"
    (is (= 1 (count (bands/changed [{:id 1 :difficulty-antes 0.5 :difficulty-despues -1.0}]))))))
