(ns universo.components.tetha-test
  (:require
   [cljs.test :refer-macros [deftest is testing]]
   [universo.components.tetha :as tetha]))

(defn- correct-on [b]
  {:difficulty b :correct? true})

(deftest limit-theta-step-cap
  (testing "no permite saltos mayores a max-theta-step"
    (is (== 0.4 (tetha/limit-theta-step 0.0 3.0 0.4)))
    (is (== -0.4 (tetha/limit-theta-step 0.0 -3.0 0.4)))
    (is (== 0.2 (tetha/limit-theta-step 0.0 0.2 0.4)))))

(deftest map-no-explota-con-acierto-facil
  (testing "tras 1 acierto fácil desde 0, |Δθ| ≤ max-theta-step"
    (let [theta (tetha/calculate-theta
                 {:responses [(correct-on -2.5)]
                  :theta 0.0})]
      (is (<= (Math/abs theta) tetha/max-theta-step))
      (is (pos? theta)))))

(deftest sequential-climb-is-gradual
  (let [items [(correct-on -1.0)
               (correct-on -0.5)
               (correct-on 0.0)
               (correct-on 0.5)]
        thetas (loop [i 1
                      prev 0.0
                      acc []]
                 (if (> i (count items))
                   acc
                   (let [rs (subvec (vec items) 0 i)
                         th (tetha/calculate-theta {:responses rs :theta prev})]
                     (recur (inc i) th (conj acc th)))))]
    (testing "cada paso ≤ max-theta-step"
      (doseq [[a b] (partition 2 1 (cons 0.0 thetas))]
        (is (<= (Math/abs (- b a)) (+ tetha/max-theta-step 1e-9)))))
    (testing "tras 4 aciertos sigue lejos de +3"
      (is (< (last thetas) 2.0)))))
