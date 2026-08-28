(ns universo.reintento-test
  (:require
   [cljs.test :refer-macros [deftest is testing]]
   [universo.reintento :as reintento]))

(defn- test-en-curso
  "Un test con dos respuestas ya registradas, como lo deja `register-response`:
   un θ en `:theta-history` por cada respuesta, y la pregunta respondida todavía
   en `:questions`."
  []
  {:status :feedback
   :theta -0.2
   :theta-initial -1.0
   :theta-history [-0.6 -0.2]
   :stop-config {:min-items 5 :max-items 2 :se-threshold 0.35}
   :stop-reason :max-items
   :current-question 2
   :questions [{:id 10 :question "vieja 10" :difficulty -0.8}
               {:id 11 :question "vieja 11" :difficulty -0.4}]
   :responses [{:question-id 10 :correct? true :difficulty -0.8}
               {:question-id 11 :correct? false :difficulty -0.4}]
   :feedback {:question {:id 11} :response {:selected-option "B"}}
   :prefetched-question {:id 12}
   :prefetching? true
   :escape-resources {:loading? true}
   :score-error "algo pasó"})

(deftest puede-reintentar-solo-con-algo-que-deshacer
  (testing "hace falta una respuesta Y la pregunta que la produjo"
    (is (true? (reintento/puede-reintentar? (test-en-curso))))
    (is (false? (reintento/puede-reintentar? {:responses [] :questions [{:id 1}]})))
    (is (false? (reintento/puede-reintentar? {:responses [{:question-id 1}] :questions []})))
    (is (false? (reintento/puede-reintentar? nil)))))

(deftest deshacer-devuelve-el-test-al-instante-anterior-a-la-respuesta
  (let [t (reintento/deshacer-ultima (test-en-curso))]
    (testing "la última respuesta y su θ salen juntos, o la serie queda desalineada"
      (is (= 1 (count (:responses t))))
      (is (= [-0.6] (:theta-history t)))
      (is (= -0.6 (:theta t))))

    (testing "la pregunta se queda y vuelve a ser la actual"
      (is (= 2 (count (:questions t))))
      (is (= 2 (:current-question t))))

    (testing "vuelve a poder responderse: sin feedback y en :questions"
      (is (= :questions (:status t)))
      (is (nil? (:feedback t))))

    (testing "el prefetch apuntaba al ítem siguiente: se descarta"
      (is (nil? (:prefetched-question t)))
      (is (false? (:prefetching? t))))

    (testing "se limpia lo que colgaba de la respuesta deshecha"
      (is (nil? (:escape-resources t)))
      (is (nil? (:score-error t)))
      (is (false? (:scoring? t))))

    (testing "la parada se recalcula: con max-items 2, una respuesta menos ya no para"
      (is (nil? (:stop-reason t))))))

(deftest deshacer-la-primera-respuesta-vuelve-al-theta-de-arranque-del-banco
  (let [t (reintento/deshacer-ultima
           {:theta -0.6
            :theta-initial -1.0
            :theta-history [-0.6]
            :questions [{:id 10}]
            :responses [{:question-id 10 :correct? true}]})]
    (testing "no a 0.0: 0.0 es la media del prior, no donde abre este test"
      (is (= -1.0 (:theta t)))
      (is (= [] (:theta-history t))))))

(deftest sin-theta-initial-cae-a-cero-en-vez-de-reventar
  (let [t (reintento/deshacer-ultima
           {:theta -0.6
            :theta-history [-0.6]
            :questions [{:id 10}]
            :responses [{:question-id 10 :correct? true}]})]
    (is (= 0.0 (:theta t)))))

(deftest el-parche-se-aplica-sobre-la-pregunta-que-vuelve
  (let [t (reintento/deshacer-ultima (test-en-curso)
                                     {:question "nueva 11" :difficulty 0.5})]
    (testing "vuelve a servirse la versión editada, no la que provocó el arreglo"
      (is (= "nueva 11" (:question (last (:questions t)))))
      (is (= 0.5 (:difficulty (last (:questions t))))))

    (testing "el parche no toca los otros ítems ni inventa campos"
      (is (= "vieja 10" (:question (first (:questions t)))))
      (is (= 11 (:id (last (:questions t))))))))

(deftest deshacer-sin-nada-que-deshacer-no-toca-el-test
  (let [t {:responses [] :questions [] :theta 0.3}]
    (is (= t (reintento/deshacer-ultima t)))
    (is (= t (reintento/deshacer-ultima t {:question "x"})))))
