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
;;
;; Por eso el componente se dibuja dentro de un `.visor` (ADR-023): una
;; superficie clara **en ambos temas**, como el visor de un instrumento. Esa
;; decisión es lo que permite que un solo juego de literales funcione en claro y
;; en oscuro, en vez de duplicarlos o reescribir el SVG para que reaccione al
;; tema.
;;
;; T-72d — medidos contra el visor por primera vez, dos no pasaban:
;;   · `axis` era #78716c → 3.29 sobre el visor, y rotula texto (-3, 0, 3,
;;     "Pregunta", la leyenda), así que necesita 4.5.
;;   · `diff` era #e36414 → 2.36, por debajo del 3.0 de un objeto gráfico. De
;;     paso era un naranja distinto del de la marca, compitiendo con él.
;; Los valores nuevos están en el contrato de `scripts/audit_contraste.py`.
(def ^:private color-theta "#0f4c5c")   ;; serie θ — 6.52
(def ^:private color-diff "#9E3C08")    ;; serie dificultad — 4.64, y es senal-700
(def ^:private color-grid "#9E9E9A")    ;; grilla — referencia sutil, no dato
(def ^:private color-ink "#292524")     ;; título — 10.41
(def ^:private color-muted "#57534e")   ;; descripción — 5.23
(def ^:private color-axis "#423F3B")    ;; ejes y leyenda — 7.18


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
     ;; T-72d: el visor va acá y no en cada sitio de llamada. Este componente
     ;; pinta con colores LITERALES (ver la cabecera del ns), así que necesita
     ;; una superficie clara SIEMPRE — y si esa superficie la tiene que poner
     ;; quien lo usa, alguien se la olvida. Pasó exactamente eso: se puso en el
     ;; modal de feedback y la pantalla de resultados quedó sin ella, con la
     ;; tinta oscura del gráfico sobre el fondo oscuro del tema.
     [:div {:class "irt-progress-chart visor rounded p-3 sm:p-4"}
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
