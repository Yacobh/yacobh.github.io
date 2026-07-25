(ns universo.slots.logic-test
  (:require
   [cljs.test :refer-macros [deftest is testing]]
   [universo.slots.logic :as logic]))

(deftest filter-slots-for-band-test
  (let [slots [{:id 1 :theta_band "basico" :status "open"}
               {:id 2 :theta_band "basico" :status "confirmed"}
               {:id 3 :theta_band "basico" :status "cancelled"}
               {:id 4 :theta_band "intermedio" :status "open"}
               {:id 5 :theta_band "avanzado" :status "completed"}]]
    (testing "sin banda → vacío"
      (is (= [] (logic/filter-slots-for-band slots nil)))
      (is (= [] (logic/filter-slots-for-band slots ""))))
    (testing "solo open/confirmed de la banda"
      (is (= [1 2]
             (mapv :id (logic/filter-slots-for-band slots "basico"))))
      (is (= [4]
             (mapv :id (logic/filter-slots-for-band slots "intermedio"))))
      (is (= [] (logic/filter-slots-for-band slots "avanzado"))))))

(deftest enrollment-threshold-test
  (testing "conteo activo"
    (is (= 2 (logic/active-enrollment-count
              [{:status "pending"} {:status "confirmed"} {:status "cancelled"}])))
    (is (= 0 (logic/active-enrollment-count []))))

  (testing "remaining"
    (is (= 2 (logic/remaining-to-confirm 1 3)))
    (is (= 0 (logic/remaining-to-confirm 3 3)))
    (is (= 0 (logic/remaining-to-confirm 5 3))))

  (testing "should-confirm"
    (is (true? (logic/should-confirm-slot? "open" 3 3)))
    (is (false? (logic/should-confirm-slot? "open" 2 3)))
    (is (false? (logic/should-confirm-slot? "confirmed" 5 3)))
    (is (false? (logic/should-confirm-slot? "open" 0 0))))

  (testing "after-enrollment"
    (is (= {:status "confirmed" :confirmed? true :remaining 0 :active-count 3}
           (logic/after-enrollment {:status "open" :min_enrollments 3} 3)))
    (is (= {:status "open" :confirmed? false :remaining 1 :active-count 2}
           (logic/after-enrollment {:status "open" :min_enrollments 3} 2)))))
