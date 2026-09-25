(ns universo.vistos-test
  (:require [cljs.test :refer [deftest is testing]]
            [universo.vistos :as vistos]))

(def r (fn [id] {:question-id id :correct? true}))

(deftest ids-vistos-junta-las-dos-fuentes
  (testing "filas de tests e intentos, con y sin respuestas"
    (is (= #{1 2 3 7}
           (vistos/ids-vistos [{:responses [(r 1) (r 2)]}
                               {:responses nil}
                               nil
                               {:responses [(r 2) (r 3)]}
                               [(r 7)]]))))
  (testing "un escape también es un ítem visto (ADR-029)"
    (is (= #{9} (vistos/ids-vistos [{:responses [{:question-id 9 :escape? true}]}]))))
  (testing "sin intentos anteriores, nada"
    (is (= #{} (vistos/ids-vistos [])))
    (is (= #{} (vistos/ids-vistos nil))))
  (testing "respuestas sin question-id no meten nil al conjunto"
    (is (= #{4} (vistos/ids-vistos [{:responses [{:correct? true} (r 4)]}])))))

(deftest a-excluir
  (testing "normal: los del intento en curso más los vistos"
    (is (= #{1 2 10 11} (vistos/a-excluir [1 2] #{10 11} false))))
  (testing "repitiendo: solo los del intento en curso, nunca repite dentro del mismo"
    (is (= #{1 2} (vistos/a-excluir [1 2] #{10 11} true))))
  (testing "sin vistos cargados todavía (nil) se comporta como antes"
    (is (= #{1} (vistos/a-excluir [1] nil false)))))

(deftest reintentar-con-vistos?
  (is (true? (vistos/reintentar-con-vistos? #{1} false)))
  (testing "sin vistos, el banco realmente se agotó"
    (is (not (vistos/reintentar-con-vistos? #{} false)))
    (is (not (vistos/reintentar-con-vistos? nil false))))
  (testing "ya repitiendo, no hay segundo reintento: evita un bucle"
    (is (not (vistos/reintentar-con-vistos? #{1} true)))))

(deftest repetidos
  (testing "en orden de aparición y sin duplicar"
    (is (= [5 3] (vistos/repetidos [(r 1) (r 5) (r 3) (r 5)] #{3 5 99}))))
  (testing "un intento limpio no repite nada"
    (is (= [] (vistos/repetidos [(r 1) (r 2)] #{10})))
    (is (= [] (vistos/repetidos [(r 1)] nil)))))
