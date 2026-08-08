(ns universo.access-test
  (:require
   [cljs.test :refer-macros [deftest is testing]]
   [universo.access :as access]))

(deftest best-theta-by-topic-toma-el-maximo
  (testing "agrupa por topic y se queda con el mejor intento"
    (is (= {"numbers_V1" 0.9 "algebra" 0.2}
           (access/best-theta-by-topic
            [{:topic "numbers_V1" :theta 0.2}
             {:topic "numbers_V1" :theta 0.9}
             {:topic "algebra" :theta 0.2}]))))

  (testing "ignora rows sin topic o sin theta"
    (is (= {"algebra" 0.5}
           (access/best-theta-by-topic
            [{:topic nil :theta 0.9}
             {:topic "algebra" :theta nil}
             {:topic "algebra" :theta 0.5}]))))

  (testing "sin historial, mapa vacío"
    (is (= {} (access/best-theta-by-topic [])))))

(deftest unlocked-topics-sin-prerequisito
  (testing "un topic activo sin prerequisito siempre está desbloqueado"
    (is (= #{"numbers_V1"}
           (access/unlocked-topics
            [{:topic "numbers_V1" :active true :prerequisite_topic nil :min_theta nil}]
            {}))))

  (testing "inactivo nunca se muestra aunque no tenga prerequisito"
    (is (= #{}
           (access/unlocked-topics
            [{:topic "borrador" :active false :prerequisite_topic nil :min_theta nil}]
            {})))))

(deftest unlocked-topics-con-prerequisito
  (testing "bloqueado si el prerequisito no fue rendido"
    (is (= #{}
           (access/unlocked-topics
            [{:topic "algebra" :active true :prerequisite_topic "numbers_V1" :min_theta nil}]
            {}))))

  (testing "desbloqueado si el prerequisito fue rendido y no hay min-theta"
    (is (= #{"algebra"}
           (access/unlocked-topics
            [{:topic "algebra" :active true :prerequisite_topic "numbers_V1" :min_theta nil}]
            {"numbers_V1" 0.5})))))

(deftest unlocked-topics-con-min-theta
  (testing "bloqueado si el theta alcanzado está por debajo del mínimo exigido"
    (is (= #{}
           (access/unlocked-topics
            [{:topic "geometria" :active true :prerequisite_topic "numbers_V1" :min_theta 0.8}]
            {"numbers_V1" 0.5}))))

  (testing "desbloqueado si el theta alcanzado alcanza o supera el mínimo"
    (is (= #{"geometria"}
           (access/unlocked-topics
            [{:topic "geometria" :active true :prerequisite_topic "numbers_V1" :min_theta 0.5}]
            {"numbers_V1" 0.7})))))
