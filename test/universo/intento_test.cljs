(ns universo.intento-test
  (:require [cljs.test :refer-macros [deftest is testing]]
            [universo.intento :as intento]))

;; Respuestas con la forma real que guarda `:test/answer-scored`
;; (`events/test.cljs`), no una inventada para el test.

(def ^:private correcta
  {:question-id "101" :selected-option "a" :correct-option "a" :correct? true
   :selected-error "" :module-slug "aritmetica/fracciones" :difficulty -0.4
   :time-ms 22000 :weight 1.0 :question-text "Suma 1/2 + 1/3"})

(def ^:private incorrecta
  {:question-id "102" :selected-option "b" :correct-option "d" :correct? false
   :selected-error "Sumaste numeradores y denominadores"
   :module-slug "aritmetica/fracciones" :difficulty 0.2
   :time-ms 31000 :weight 1.0 :question-text "Resuelve 3x-5>7"})

(def ^:private correcta-rapida
  (assoc correcta :question-id "103" :time-ms 900 :weight 0.0))

(def ^:private incorrecta-rapida
  (assoc incorrecta :question-id "104" :time-ms 800 :weight 0.0))

;; Un escape llega con `:correct? false`, `:selected-option nil` y `:weight 0.0`
;; (`irt/escape.cljs`): es justo la combinación que confundiría a un `cond` mal
;; ordenado.
(def ^:private escape
  {:question-id "105" :selected-option nil :correct? false :escape "enunciado"
   :module-slug "geometria/area" :difficulty 0.8 :time-ms 9000 :weight 0.0
   :question-text "Área del trapecio"})

(deftest categoria-distingue-las-cinco
  (testing "las tres dimensiones no colapsan en correcta/incorrecta"
    (is (= :correcta (intento/categoria correcta)))
    (is (= :incorrecta (intento/categoria incorrecta)))
    (is (= :correcta-desestimada (intento/categoria correcta-rapida)))
    (is (= :incorrecta-desestimada (intento/categoria incorrecta-rapida)))))

(deftest el-escape-no-es-un-error
  (testing "se evalúa antes que correct?/weight, que en un escape valen false y 0"
    (is (= :escape (intento/categoria escape)))
    (is (not (intento/cuenta-como-error? escape)))))

(deftest respuestas-viejas-sin-weight-siguen-contando
  (testing "ADR-014 no reinterpreta retroactivamente lo ya medido"
    (let [vieja (dissoc correcta :weight)]
      (is (intento/contada? vieja))
      (is (= :correcta (intento/categoria vieja))))))

(deftest cuenta-como-error-exige-idea-escrita
  (testing "mismo criterio que el ranking de T-130: sin idea, no es evidencia"
    (is (intento/cuenta-como-error? incorrecta))
    (is (not (intento/cuenta-como-error? (assoc incorrecta :selected-error ""))))
    (is (not (intento/cuenta-como-error? (dissoc incorrecta :selected-error))))
    (testing "una incorrecta desestimada tampoco, aunque traiga idea"
      (is (not (intento/cuenta-como-error? incorrecta-rapida))))))

(deftest theta-en-el-borde-es-censurado
  (testing "R-44: el clamp no es una medición"
    (is (intento/en-el-suelo? -3.0))
    (is (intento/censurado? -3.0))
    (is (intento/en-el-techo? 3.0))
    (is (intento/censurado? 3.0)))
  (testing "un θ interior no lo es, ni siquiera cerca del borde"
    (is (not (intento/censurado? -2.93)))
    (is (not (intento/censurado? 0.0))))
  (testing "sin θ no se afirma nada"
    (is (not (intento/censurado? nil)))))

(deftest segundos-distingue-no-medido-de-instantaneo
  (testing "time-ms 0 es «no se midió» (T-59), no «respondió al instante»"
    (is (nil? (intento/segundos (assoc correcta :time-ms 0))))
    (is (nil? (intento/segundos (dissoc correcta :time-ms))))
    (is (= 22.0 (intento/segundos correcta)))))

(deftest filas-numera-desde-uno-y-oculta-la-idea-cuando-no-aplica
  (let [fs (intento/filas [correcta incorrecta escape])]
    (is (= [1 2 3] (mapv :n fs)))
    (is (nil? (:idea-erronea (first fs))))
    (is (= "Sumaste numeradores y denominadores" (:idea-erronea (second fs))))
    ;; `escape/escape-of` normaliza a keyword. Importa: un test releído desde
    ;; Supabase trae `:escape` como **string**, y sin esa normalización la vista
    ;; tendría que comparar contra los dos.
    (is (= :enunciado (:escape (nth fs 2))))
    (is (nil? (:escape (first fs))))))

(deftest resumen-cuenta-el-acierto-desestimado-como-acierto-y-lo-nombra
  (let [r (intento/resumen {:responses [correcta incorrecta correcta-rapida
                                        incorrecta-rapida escape]
                            :theta -3.0
                            :stop-reason nil
                            :engine-version 2
                            :origin "student"
                            :duracion-min 10.0})]
    (testing "el acierto veloz sigue siendo un acierto, pero se declara aparte (Q-47)"
      (is (= 5 (:items r)))
      (is (= 2 (:aciertos r)))
      (is (= 1 (:aciertos-desestimados r)))
      (is (= 40 (:porcentaje r))))
    (testing "las desestimadas incluyen al escape, que también pesa 0"
      (is (= 3 (:desestimadas r)))
      (is (= 1 (:escapes r)))
      (is (= 2 (:contadas r))))
    (testing "solo una respuesta es evidencia de idea errónea"
      (is (= 1 (:errores-con-idea r))))
    (testing "θ en el clamp y salida por botón quedan marcados"
      (is (:theta-censurado? r))
      (is (:abandonado? r)))
    (testing "el tiempo por ítem sale de la duración recibida, no se recalcula"
      (is (= 120.0 (:seg-por-item r))))))

(deftest resumen-de-un-intento-vacio-no-revienta
  (let [r (intento/resumen {:responses nil :theta nil :duracion-min nil})]
    (is (= 0 (:items r)))
    (is (= 0 (:aciertos r)))
    (is (nil? (:porcentaje r)))
    (is (nil? (:seg-por-item r)))
    (is (not (:theta-censurado? r)))))

(deftest puntos-del-grafico-numera-para-el-eje-horizontal
  (testing "sin :n, x-scale hace (dec nil) → NaN y el SVG apila todo sobre el eje"
    (let [ps (intento/puntos-del-grafico {:responses [correcta incorrecta]
                                          :theta-history [0.1 -0.3]})]
      (is (= [1 2] (mapv :n ps)))
      (is (= [{:n 1 :theta 0.1 :difficulty -0.4}
              {:n 2 :theta -0.3 :difficulty 0.2}] ps)))))

(deftest puntos-del-grafico-tolera-largos-distintos
  (testing "se dibuja lo que hay; un test viejo o guardado a medias no revienta"
    (is (= [{:n 1 :theta 0.1 :difficulty -0.4}]
           (intento/puntos-del-grafico {:responses [correcta incorrecta]
                                        :theta-history [0.1]})))
    (is (= [] (intento/puntos-del-grafico {:responses [correcta]
                                           :theta-history nil})))
    (is (= [] (intento/puntos-del-grafico {})))))

(deftest razon-de-parada-normaliza-lo-que-vuelve-de-supabase
  (testing "clj->js serializa el keyword a string y keywordize-keys no lo revierte"
    (is (= :max-items (intento/razon-de-parada "max-items")))
    (is (= :precision (intento/razon-de-parada :precision)))
    (is (nil? (intento/razon-de-parada nil)))
    (is (nil? (intento/razon-de-parada "")))))
