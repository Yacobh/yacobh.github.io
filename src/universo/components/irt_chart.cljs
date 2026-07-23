(ns universo.components.irt-chart
  "Gráfico SVG minimalista de θ (nivel) vs dificultad durante el test."
  (:require [clojure.string :as str]))

(def ^:private y-min -3.0)
(def ^:private y-max 3.0)
(def ^:private pad-l 36)
(def ^:private pad-r 12)
(def ^:private pad-t 16)
(def ^:private pad-b 28)
(def ^:private width 420)
(def ^:private height 180)

;; Colores literales: var(--x) en atributos SVG fill/stroke a menudo
;; no resuelve y el fill por defecto queda negro.
(def ^:private color-theta "#0f4c5c")
(def ^:private color-diff "#e36414")
(def ^:private color-grid "#d6d3d1")
(def ^:private color-ink "#292524")
(def ^:private color-muted "#57534e")
(def ^:private color-axis "#78716c")


(defn- clamp-y [v]
  (max y-min (min y-max (double (or v 0.0)))))

(defn- x-scale [n count]
  (let [inner (- width pad-l pad-r)]
    (if (<= count 1)
      (+ pad-l (/ inner 2))
      (+ pad-l (* (/ (dec n) (dec count)) inner)))))

(defn- y-scale [v]
  (let [inner (- height pad-t pad-b)
        t (/ (- (clamp-y v) y-min) (- y-max y-min))]
    (+ pad-t (* (- 1.0 t) inner))))

(defn- polyline-points [pts key]
  (->> pts
       (map (fn [p]
              (str (x-scale (:n p) (count pts)) ","
                   (y-scale (get p key)))))
       (str/join " ")))

(defn- stop-reason-label [reason]
  (case reason
    :precision "Nivel estimado con suficiente precisión"
    :max-items "Se alcanzó el máximo de preguntas del diagnóstico"
    :exhausted "No hay más preguntas en este nivel"
    nil))

(defn- legend-value [v]
  [:span {:class "font-semibold tabular-nums"}
   (str " " (.toFixed v 2))])

(defn irt-progress-chart
  "SVG chart of estimated ability and item difficulty over the test."
  ([points]
   (irt-progress-chart points nil))
  ([points stop-reason]
   (let [pts (vec (or points []))
         n (count pts)
         theta-pts (when (pos? n) (polyline-points pts :theta))
         diff-pts (when (pos? n) (polyline-points pts :difficulty))
         last-pt (last pts)
         reason-txt (stop-reason-label stop-reason)]
     [:div {:class "irt-progress-chart"}
      [:div {:class "mb-2"}
       [:p {:class "text-sm font-semibold tracking-tight"
            :style {:color color-ink}}
        "Tu nivel y la dificultad"]
       [:p {:class "text-xs leading-relaxed mt-0.5"
            :style {:color color-muted}}
        "Tu nivel (θ) se ajusta tras cada respuesta. La dificultad de cada pregunta busca estar cerca de ese nivel."]]

      (if (zero? n)
        [:p {:class "text-xs text-stone-500 py-6 text-center"}
         "Responde para ver cómo evoluciona tu evaluación."]
        [:svg {:viewBox (str "0 0 " width " " height)
               :class "w-full h-auto"
               :role "img"
               :aria-label "Evolución del nivel estimado y la dificultad"}
         (for [y (range -3 4)]
           ^{:key (str "g" y)}
           [:line {:x1 pad-l :x2 (- width pad-r)
                   :y1 (y-scale y) :y2 (y-scale y)
                   :stroke color-grid :stroke-width 1
                   :stroke-dasharray (when-not (zero? y) "3 3")}])
         (for [y [-3 0 3]]
           ^{:key (str "yl" y)}
           [:text {:x (- pad-l 6) :y (+ (y-scale y) 3)
                   :text-anchor "end"
                   :font-size 9
                   :fill color-axis}
            (str y)])
         [:polyline {:fill "none"
                     :stroke color-diff
                     :stroke-width 2
                     :stroke-linecap "round"
                     :stroke-linejoin "round"
                     :points diff-pts}]
         [:polyline {:fill "none"
                     :stroke color-theta
                     :stroke-width 2.5
                     :stroke-linecap "round"
                     :stroke-linejoin "round"
                     :points theta-pts}]
         (for [p pts]
           ^{:key (str "t" (:n p))}
           [:circle {:cx (x-scale (:n p) n)
                     :cy (y-scale (:theta p))
                     :r 3.5
                     :fill color-theta}])
         (for [p pts]
           ^{:key (str "d" (:n p))}
           [:circle {:cx (x-scale (:n p) n)
                     :cy (y-scale (:difficulty p))
                     :r 3
                     :fill color-diff}])
         [:text {:x (/ width 2) :y (- height 6)
                 :text-anchor "middle"
                 :font-size 9
                 :fill color-axis}
          "Pregunta"]])

      [:div {:class "flex flex-wrap items-center gap-4 mt-2 text-xs"
             :style {:color "#44403c"}}
       [:span {:class "inline-flex items-center gap-1.5"}
        [:span {:class "inline-block w-3 h-0.5 rounded"
                :style {:background color-theta}}]
        "Nivel (θ)"
        (when last-pt
          [legend-value (:theta last-pt)])]
       [:span {:class "inline-flex items-center gap-1.5"}
        [:span {:class "inline-block w-3 h-0.5 rounded"
                :style {:background color-diff}}]
        "Dificultad"
        (when last-pt
          [legend-value (:difficulty last-pt)])]]

      (when reason-txt
        [:p {:class "text-xs mt-2 font-medium"
             :style {:color color-theta}}
         reason-txt])])))
