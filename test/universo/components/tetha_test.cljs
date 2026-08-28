(ns universo.components.tetha-test
  (:require
   [cljs.test :refer-macros [deftest is testing]]
   [universo.components.tetha :as tetha]
   [universo.motor :as motor]))

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

;; -----------------------------------------------------------------------------
;; Azar fijo (ADR-034). El mecanismo, no los valores.
;; -----------------------------------------------------------------------------

(deftest con-c-cero-el-modelo-nuevo-es-el-viejo
  ;; La propiedad que hace auditable el cambio: el modelo con azar **contiene**
  ;; al 1PL. Si esto falla, el motor v2 no es una generalización del v1 sino
  ;; otra cosa, y comparar sus θ deja de tener sentido incluso con versión.
  (testing "probability con c=0 es probability-1pl"
    (doseq [th [-2.0 -0.5 0.0 1.3]
            b  [-2.5 0.0 1.0]]
      (is (< (Math/abs (- (tetha/probability th b 0.0)
                          (tetha/probability-1pl th b)))
             1e-12))))

  (testing "first-derivative con c=0 es Σ (observado − P)"
    (let [rs [{:difficulty -1.0 :correct? true}
              {:difficulty 0.5 :correct? false}]
          esperado (reduce (fn [s r]
                             (+ s (- (if (:correct? r) 1.0 0.0)
                                     (tetha/probability-1pl 0.0 (:difficulty r)))))
                           0.0 rs)]
      (is (< (Math/abs (- (tetha/first-derivative 0.0 rs 0.0) esperado)) 1e-12))))

  (testing "second-derivative con c=0 es −Σ P·(1−P)"
    (let [rs [{:difficulty -1.0 :correct? true}
              {:difficulty 0.5 :correct? false}]
          esperado (reduce (fn [s r]
                             (let [p (tetha/probability-1pl 0.0 (:difficulty r))]
                               (- s (* p (- 1.0 p)))))
                           0.0 rs)]
      (is (< (Math/abs (- (tetha/second-derivative 0.0 rs 0.0) esperado)) 1e-12)))))

(deftest el-azar-descuenta-aciertos-pero-no-errores
  ;; Este es **el** mecanismo por el que modelar el azar corrige el sesgo de
  ;; +1,0 logits en los estudiantes débiles: un acierto en un ítem muy por
  ;; encima del nivel puede ser suerte, así que informa menos; un error no
  ;; puede ser suerte, así que informa igual que antes. El sesgo se corrige por
  ;; arriba sin castigar por abajo.
  (testing "un acierto en un ítem difícil empuja mucho menos con azar"
    (let [r [{:difficulty 2.0 :correct? true}]
          sin (tetha/first-derivative 0.0 r 0.0)
          con (tetha/first-derivative 0.0 r 0.25)]
      (is (pos? sin))
      (is (pos? con))
      (is (< con (* 0.5 sin)))))

  (testing "un error en un ítem fácil pesa prácticamente igual"
    (let [r [{:difficulty -2.0 :correct? false}]
          sin (tetha/first-derivative 0.0 r 0.0)
          con (tetha/first-derivative 0.0 r 0.25)]
      (is (neg? sin))
      (is (neg? con))
      (is (< (Math/abs (- con sin)) 0.01))))

  (testing "con azar cada ítem informa menos, así que el SE sube"
    ;; Consecuencia incómoda y deliberada: mejora la exactitud de θ y empeora
    ;; la aritmética de la parada por precisión (T-111).
    (let [rs (mapv (fn [_] {:difficulty 0.0 :correct? true}) (range 5))]
      (is (< (- (tetha/second-derivative 0.0 rs 0.25))
             (- (tetha/second-derivative 0.0 rs 0.0)))))))

(defn- map-convergido
  "El MAP al que converge Newton-Raphson, **sin** el tope de paso.

   El tope vive fuera del modelo: es una salvaguarda de UX sobre el resultado.
   Mezclarlo acá esconde el efecto del prior — con aciertos seguidos el tope
   satura y dos priors distintos devuelven el mismo número aunque el MAP sea
   muy diferente. Se testean por separado a propósito."
  [theta responses c pp]
  (loop [th theta i 0]
    (if (>= i 30)
      th
      (let [nuevo (tetha/clamp-theta (tetha/newton-raphson-iteration th responses c pp))]
        (if (< (Math/abs (- nuevo th)) 1e-6)
          nuevo
          (recur nuevo (inc i)))))))

(deftest el-prior-configurable-cambia-cuanto-encoge
  (let [items (mapv (fn [b] {:difficulty b :correct? true}) [0.0 0.5 1.0 1.5 2.0 2.5])]
    (testing "con la misma evidencia, un prior más ancho deja el MAP más lejos de 0"
      (let [angosto (map-convergido -1.0 items 0.25 (motor/prior-precision 1.0))
            default (map-convergido -1.0 items 0.25 (motor/prior-precision))
            ancho   (map-convergido -1.0 items 0.25 (motor/prior-precision 3.0))]
        (is (< angosto default))
        (is (< default ancho))))

    (testing "el encogimiento es hacia la media del prior, no hacia abajo siempre"
      ;; Con evidencia de un estudiante flojo, el prior angosto lo sube.
      (let [malas (mapv (fn [b] {:difficulty b :correct? false}) [-2.5 -2.0 -1.5 -1.0])
            angosto (map-convergido -1.0 malas 0.25 (motor/prior-precision 1.0))
            ancho   (map-convergido -1.0 malas 0.25 (motor/prior-precision 3.0))]
        (is (> angosto ancho))))

    (testing "el tope de paso se respeta igual con el prior ancho"
      ;; Con σ=1 el tope casi no apretaba; con σ=2 vuelve a hacer trabajo real,
      ;; así que esta salvaguarda importa más que antes, no menos.
      (let [th1 (tetha/calculate-theta {:responses (subvec items 0 1) :theta -1.0}
                                       {:prior-sd 3.0})]
        (is (<= (Math/abs (- th1 -1.0)) (+ tetha/max-theta-step 1e-9)))))))

(deftest calculate-theta-auto-lee-la-config-del-banco
  ;; El azar y el prior viajan en `:stop-config`, el mismo mapa que ya trae
  ;; max-items desde `test_configs`. Si esto se rompe, cada banco vuelve a
  ;; estimar con los valores por defecto sin avisar.
  ;;
  ;; Un solo acierto fácil a propósito: la evidencia es débil, el MAP queda
  ;; dentro del tope y la diferencia entre priors llega a la salida en vez de
  ;; ser recortada.
  (let [base {:responses [{:difficulty -2.0 :correct? true}] :theta 0.0}
        angosto (tetha/calculate-theta-auto (assoc base :stop-config {:prior-sd 1.0}))
        default (tetha/calculate-theta-auto (assoc base :stop-config {:prior-sd 2.0}))]
    (is (not= angosto default))
    (is (< angosto default))
    (testing "sin config, el default de universo.motor"
      (is (= default (tetha/calculate-theta-auto base))))))
