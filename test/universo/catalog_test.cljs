(ns universo.catalog-test
  (:require
   [cljs.test :refer-macros [deftest is testing]]
   [universo.catalog :as catalog]))

(deftest topic-label-precedencia
  (testing "el nombre configurado por el admin gana sobre el diccionario estático"
    (is (= "Números y operaciones"
           (catalog/topic-label "numbers_V1" "Números y operaciones"))))

  (testing "sin display_name cae al diccionario estático"
    (is (= "Números" (catalog/topic-label "numbers_V1")))
    (is (= "Números" (catalog/topic-label "numbers_V1" nil))))

  (testing "un display_name en blanco no cuenta como nombre"
    (is (= "Números" (catalog/topic-label "numbers_V1" "   ")))
    (is (= "Números" (catalog/topic-label "numbers_V1" ""))))

  (testing "recorta los espacios del nombre configurado"
    (is (= "Fracciones I" (catalog/topic-label "fracciones" "  Fracciones I  "))))

  (testing "topic desconocido sin nombre: guiones bajos como espacios, nunca el crudo"
    (is (= "razones y proporciones"
           (catalog/topic-label "razones_y_proporciones")))))

(deftest count-by-topic-agrupa
  (testing "cuenta las preguntas de cada banco"
    (is (= {"numbers_V1" 2 "algebra" 1}
           (catalog/count-by-topic
            [{:topic "numbers_V1"} {:topic "algebra"} {:topic "numbers_V1"}]))))

  (testing "descarta topics nulos o vacíos, como get-distinct-topics"
    (is (= {"algebra" 1}
           (catalog/count-by-topic
            [{:topic nil} {:topic ""} {:topic "algebra"}]))))

  (testing "banco vacío"
    (is (= {} (catalog/count-by-topic [])))))

(deftest counts-truncated?-detecta-respuesta-recortada
  (testing "menos filas traídas que el total real: el conteo es un piso"
    (is (true? (catalog/counts-truncated? 1000 1500))))

  (testing "trajo todo"
    (is (false? (catalog/counts-truncated? 42 42))))

  (testing "sin total conocido no se afirma truncamiento"
    (is (false? (catalog/counts-truncated? 42 nil)))))
