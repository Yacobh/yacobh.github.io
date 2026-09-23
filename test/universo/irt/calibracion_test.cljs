(ns universo.irt.calibracion-test
  (:require [cljs.test :refer-macros [deftest is testing]]
            [universo.irt.calibracion :as cal]))

;; ── Generador reproducible ──────────────────────────────────────────────────
;; `rand` no se puede sembrar en cljs, y un test de recuperación que falla una
;; vez de cada cien es peor que no tener test. LCG de Numerical Recipes.

(defn- lcg [seed]
  (let [estado (atom seed)]
    (fn []
      (swap! estado #(mod (+ (* 1664525 %) 1013904223) 4294967296))
      (/ @estado 4294967296))))

(defn- normal [u]
  ;; Box-Muller con dos uniformes.
  (let [a (max 1e-12 (u)) b (u)]
    (* (Math/sqrt (* -2 (Math/log a))) (Math/cos (* 2 Math/PI b)))))

(defn- p-acierto [theta b c]
  (+ c (* (- 1 c) (/ 1 (+ 1 (Math/exp (- (- theta b))))))))

(defn- simular
  "Cada persona responde todos los ítems: el caso fácil, para probar que el
   estimador recupera lo que se le dio."
  [n-personas bs c seed]
  (let [u (lcg seed)]
    (vec
     (for [p (range n-personas)
           :let [theta (normal u)]
           [i b] (map-indexed vector bs)]
       {:persona [(str "u" p) "banco"]
        :item (str i)
        :y (if (< (u) (p-acierto theta b c)) 1 0)}))))

;; ── Selección de respuestas ─────────────────────────────────────────────────

(def ^:private r-ok {:question-id 1 :correct? true :weight 1.0 :time-ms 9000})
(def ^:private r-mal {:question-id 2 :correct? false :weight 1.0 :time-ms 9000})

(deftest respuesta-calibrable
  (testing "cuentan los aciertos y los errores con esfuerzo"
    (is (cal/respuesta-calibrable? r-ok))
    (is (cal/respuesta-calibrable? r-mal)))
  (testing "sin :weight cuenta, como en `effort/weight-of` (filas previas a ADR-014)"
    (is (cal/respuesta-calibrable? (dissoc r-ok :weight))))
  (testing "un escape no es evidencia de dificultad aunque venga con :correct? false"
    (is (not (cal/respuesta-calibrable? (assoc r-mal :escape "enunciado" :weight 0.0))))
    (is (not (cal/respuesta-calibrable? (assoc r-mal :escape "no-se")))))
  (testing "desestimada por esfuerzo no cuenta, sea acierto o error"
    (is (not (cal/respuesta-calibrable? (assoc r-ok :weight 0.0))))
    (is (not (cal/respuesta-calibrable? (assoc r-mal :weight 0)))))
  (testing "sin id de ítem no hay a qué atribuirla"
    (is (not (cal/respuesta-calibrable? (dissoc r-ok :question-id))))))

(def ^:private filas
  [{:id 10 :user_id "a" :topic "t" :created_at "2026-09-21T10:00:00"
    :test {:responses [r-ok r-mal]}}
   ;; Segundo intento de la misma persona en el mismo banco: fuera (R-47).
   {:id 11 :user_id "a" :topic "t" :created_at "2026-09-21T10:05:00"
    :test {:responses [(assoc r-mal :question-id 1)]}}
   ;; Misma persona, otro banco: es otra persona para la calibración.
   {:id 12 :user_id "a" :topic "otro" :created_at "2026-09-21T10:10:00"
    :test {:responses [r-ok]}}
   {:id 13 :user_id "b" :topic "t" :created_at "2026-09-21T09:00:00"
    :test {:responses [r-ok (assoc r-mal :escape "no-se" :weight 0.0)]}}])

(deftest primeros-intentos
  (is (= #{10 12 13} (set (map :id (cal/primeros-intentos filas)))))
  (testing "el orden de entrada no decide cuál es el primero"
    (is (= #{10 12 13} (set (map :id (cal/primeros-intentos (reverse filas))))))))

(deftest observaciones
  (let [obs (cal/observaciones filas)]
    (is (= 4 (count obs)) "2 de `a` en t, 1 de `a` en otro, 1 de `b` (el escape se va)")
    (is (every? #(string? (:item %)) obs) "ids como string, igual que las etiquetas")
    (is (= #{["a" "t"] ["a" "otro"] ["b" "t"]} (set (map :persona obs))))
    (testing "el segundo intento de `a` no aporta su error en el ítem 1"
      (is (= [1] (->> obs (filter #(= ["a" "t"] (:persona %))) (filter #(= "1" (:item %))) (map :y)))))))

;; ── Estimación ──────────────────────────────────────────────────────────────

(deftest recupera-dificultades-conocidas
  (let [verdad [-2.0 -1.0 0.0 1.0 2.0]
        obs (simular 600 verdad 0.25 42)
        ;; Etiquetas deliberadamente malas (todas en 0) y prior flojo: si el
        ;; estimador las devuelve, no está mirando el dato.
        etiquetas (zipmap (map str (range 5)) (repeat 0.0))
        cal (cal/estimar obs etiquetas {:b-prior-sd 5.0})]
    (is (:convergio? cal))
    (doseq [[i b] (map-indexed vector verdad)]
      (let [est (get-in cal [:items (str i) :b])]
        (is (< (Math/abs (- est b)) 0.35)
            (str "ítem " i ": verdad " b ", estimado " est))))
    (testing "el orden sale bien aunque las etiquetas no lo traían"
      (is (apply < (map #(get-in cal [:items (str %) :b]) (range 5)))))))

(deftest un-item-sin-datos-no-finge-medicion
  (let [obs [{:persona ["p" "t"] :item "1" :y 1}]
        cal (cal/estimar obs {"1" 0.7})]
    (testing "con una respuesta, el b apenas se mueve y lo declara"
      (is (< (get-in cal [:items "1" :peso-del-dato]) 0.25))
      (is (< (Math/abs (get-in cal [:items "1" :delta])) 0.3)))))

(deftest prior-fuerte-retiene-la-etiqueta
  ;; Con un solo ítem, `b` y la media de θ se pueden intercambiar y el caso no
  ;; dice nada: hacen falta otros ítems bien etiquetados que fijen la escala.
  (let [verdad [1.5 -1.0 0.0 1.0 -2.0]
        obs (simular 400 verdad 0.25 7)
        etiquetas (assoc (zipmap (map str (range 5)) verdad) "0" -1.0)
        suelto (cal/estimar obs etiquetas {:b-prior-sd 5.0})
        atado (cal/estimar obs etiquetas {:b-prior-sd 0.01})]
    (is (< (Math/abs (- (get-in atado [:items "0" :b]) -1.0)) 0.1))
    (is (> (get-in suelto [:items "0" :b]) 1.0))
    (is (> (get-in suelto [:items "0" :peso-del-dato])
           (get-in atado [:items "0" :peso-del-dato])))))

(deftest puntaje-perfecto-da-numeros-finitos
  ;; JML sin prior da θ = +∞ a quien acierta todo. Con prior no.
  (let [obs (for [i (range 6)] {:persona ["p" "t"] :item (str i) :y 1})
        cal (cal/estimar obs (zipmap (map str (range 6)) (repeat -2.0)))]
    (is (js/isFinite (get-in cal [:personas ["p" "t"]])))
    (is (every? #(js/isFinite (:b %)) (vals (:items cal))))
    (is (every? #(js/isFinite (:se %)) (vals (:items cal))))))

;; ── El caso real que no convergía ───────────────────────────────────────────
;; Un test sintético con la misma forma (banco muy fácil, casi sin errores)
;; **no** reproducía el ciclo: pasaba igual sin el arreglo. Por eso el fixture
;; es el dato real, reducido a lo mínimo.

(def ^:private notacion-2026-09
  "[persona ítem acierto] × 348: primeros intentos de `electronica_notacion`
   al 2026-09-23, con las personas renumeradas 0…n. Sin ningún identificador."
  (partition 3 [0 1113 0 0 1115 0 0 1107 1 0 1109 0 0 1119 1 0 1121 0 0 1111 0 0 1110 0 1 1113 0 1 1115 1
   1 1116 1 1 1112 0 1 1120 1 1 1108 0 1 1117 0 1 1109 0 2 1111 1 2 1120 1 2 1116 1 2 1112 1
   2 1108 1 2 1115 1 3 1113 1 3 1120 1 3 1116 1 3 1112 1 3 1108 1 3 1115 1 4 1113 1 4 1120 1
   4 1116 1 4 1112 1 4 1108 1 4 1115 1 5 1113 1 5 1112 1 5 1108 1 6 1113 0 6 1115 0 6 1107 0
   6 1111 1 6 1110 0 6 1119 0 6 1114 0 6 1121 1 7 1113 1 7 1120 0 7 1116 0 7 1112 0 7 1118 1
   7 1117 0 7 1121 1 7 1109 0 8 1113 1 8 1116 1 8 1112 1 8 1108 1 8 1115 1 9 1113 1 9 1120 0
   9 1116 1 9 1112 0 9 1108 1 9 1115 1 9 1117 1 9 1118 0 10 1113 1 10 1112 1 10 1108 0
   10 1115 1 10 1117 1 10 1118 1 11 1113 1 11 1120 1 11 1116 1 11 1112 1 11 1108 1 11 1111 1
   12 1113 1 12 1120 1 12 1116 1 12 1112 1 12 1108 1 12 1115 1 13 1113 1 13 1120 1 13 1116 1
   13 1112 1 13 1108 0 13 1115 1 13 1117 1 13 1118 1 15 1113 0 15 1115 0 15 1107 1 15 1109 0
   15 1119 1 15 1121 1 15 1106 1 15 1117 0 16 1113 1 16 1120 1 16 1116 1 16 1112 1 16 1111 1
   16 1115 0 16 1117 0 17 1113 1 17 1120 0 17 1116 0 17 1112 0 17 1118 0 17 1114 0 18 1113 1
   18 1112 0 19 1113 1 19 1120 1 19 1116 1 19 1112 1 19 1108 1 19 1115 1 20 1112 1 20 1108 1
   20 1115 1 21 1113 1 21 1120 1 21 1116 1 21 1112 1 21 1108 0 21 1117 1 21 1118 0 22 1120 1
   22 1112 0 22 1108 0 22 1115 1 22 1117 1 22 1118 0 23 1113 1 23 1120 0 23 1116 1 23 1112 0
   23 1108 1 23 1115 0 23 1117 1 23 1118 0 24 1113 1 24 1120 1 24 1116 1 24 1112 0 24 1108 1
   24 1115 1 24 1117 0 24 1118 1 25 1113 0 25 1115 0 25 1107 0 25 1111 0 25 1110 0 26 1108 1
   26 1115 1 27 1113 1 27 1120 1 27 1116 1 27 1112 0 27 1108 0 27 1115 1 27 1117 0 27 1118 0
   28 1113 1 28 1120 0 28 1116 0 28 1112 1 28 1108 1 28 1115 1 28 1117 1 28 1118 0 29 1113 1
   29 1120 1 29 1112 0 29 1108 0 29 1115 1 29 1117 0 29 1118 1 30 1113 1 30 1120 0 30 1116 1
   30 1112 0 30 1111 1 30 1115 1 30 1117 1 31 1113 1 31 1120 0 31 1116 1 31 1112 0 31 1108 0
   31 1115 0 31 1118 0 31 1114 0 32 1113 1 32 1120 0 32 1116 0 32 1112 0 32 1118 0 32 1114 0
   32 1111 1 32 1110 0 33 1113 1 33 1120 1 33 1116 1 33 1112 1 33 1108 1 33 1115 0 33 1117 1
   33 1118 0 34 1113 0 34 1115 1 34 1116 1 34 1112 0 34 1120 1 34 1108 0 34 1117 1 34 1118 0
   35 1113 1 35 1120 1 35 1116 1 35 1112 1 35 1108 1 35 1115 1 36 1113 1 36 1120 1 36 1116 1
   36 1112 1 36 1108 0 36 1115 1 36 1117 0 36 1118 1 37 1113 1 37 1120 1 37 1112 1 37 1108 1
   37 1115 0 37 1117 1 37 1118 1 38 1113 1 38 1120 1 38 1116 1 38 1112 0 38 1108 0 38 1115 1
   38 1117 1 38 1118 0 39 1113 1 39 1120 0 39 1116 0 39 1112 0 39 1118 1 39 1117 1 39 1108 0
   39 1109 1 40 1111 1 40 1120 1 40 1116 1 40 1110 0 40 1108 1 40 1115 0 41 1113 1 41 1120 1
   41 1116 1 41 1112 1 41 1108 1 41 1115 1 42 1113 0 42 1115 1 42 1116 1 42 1112 0 42 1120 0
   42 1108 0 43 1113 1 43 1120 1 43 1116 0 43 1112 0 43 1108 0 43 1118 0 44 1113 1 44 1120 1
   44 1116 1 44 1112 1 44 1108 1 44 1115 1 45 1113 1 45 1120 1 45 1116 1 45 1112 1 45 1108 1
   45 1115 0 45 1117 1 45 1118 1 46 1113 1 46 1120 1 46 1116 0 46 1112 0 46 1108 0 46 1115 0
   46 1118 1 46 1109 0 47 1113 1 47 1120 1 47 1116 1 47 1112 1 47 1108 1 47 1115 1 48 1113 1
   48 1120 0 48 1116 0 48 1112 0 48 1118 1 48 1117 1 48 1108 1 48 1115 1 49 1113 1 49 1120 1
   49 1112 1 49 1108 1 49 1115 1 50 1113 0 50 1115 0 50 1107 0 50 1111 0 50 1110 0 50 1119 0
   50 1114 0 50 1121 0 51 1120 1 51 1116 1 51 1112 0 51 1108 0 51 1115 1 51 1117 0 52 1112 1
   52 1108 1 52 1115 1 53 1113 1 53 1120 1 53 1116 1 53 1112 1 53 1108 1 53 1115 0 53 1117 0]))

(def ^:private etiquetas-notacion
  {"1106" -2.55 "1107" -2.6 "1108" -2.1 "1109" -2.5 "1110" -2.95 "1111" -3 "1112" -1.95 "1113" -2.4 "1114" -2.8 "1115" -2.2 "1116" -1.9 "1117" -2.3 "1118" -2.35 "1119" -2.9 "1120" -2 "1121" -2.7})

(deftest converge-en-electronica-notacion
  ;; Sin el ascenso garantizado de `paso-newton` quedaba en un ciclo y no
  ;; convergía ni en 3.000 iteraciones (primera corrida real, 2026-09-23).
  (let [obs (map (fn [[p i y]] {:persona [p "electronica_notacion"] :item (str i) :y y})
                 notacion-2026-09)
        cal (cal/estimar obs etiquetas-notacion {:max-iter 300})]
    (is (= 348 (count obs)))
    (is (:convergio? cal))
    (testing "y lo que la pantalla del aula ya mostraba: #1108 y #1112 son más difíciles de lo etiquetado"
      (is (> (get-in cal [:items "1108" :delta]) 1.0))
      (is (> (get-in cal [:items "1112" :delta]) 1.0)))))

(deftest el-error-baja-con-mas-datos
  (let [poco (cal/estimar (simular 30 [0.0] 0.25 3) {"0" 0.0})
        mucho (cal/estimar (simular 600 [0.0] 0.25 3) {"0" 0.0})]
    (is (< (get-in mucho [:items "0" :se]) (get-in poco [:items "0" :se])))
    (is (> (get-in mucho [:items "0" :peso-del-dato]) (get-in poco [:items "0" :peso-del-dato])))))

(deftest resumen-y-reporte
  (let [cal {:convergio? true :iteraciones 12 :personas {["p" "t"] 0.0 ["q" "t"] 1.0}
             :items {"1" {:n 40 :delta 0.9 :se 0.3 :peso-del-dato 0.8}
                     "2" {:n 5 :delta 0.6 :se 0.9 :peso-del-dato 0.1}
                     "3" {:n 31 :delta -0.1 :se 0.3 :peso-del-dato 0.7}}}
        r (cal/resumen cal)]
    (is (= 3 (:items r)))
    (is (= 76 (:respuestas r)))
    (is (= 2 (:items-con-n-suficiente r)))
    (is (= 1 (:items-movidos r)) "el ítem 2 se movió 0,6 pero su error es 0,9: no cuenta")
    (is (= ["1" "2" "3"] (map :id (cal/filas-del-reporte cal))))))
