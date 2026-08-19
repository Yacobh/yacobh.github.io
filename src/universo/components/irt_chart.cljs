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

;; -----------------------------------------------------------------------------
;; Sparkline de θ en el tiempo (tablero)
;; -----------------------------------------------------------------------------
;;
;; Vive en este ns y no en uno propio para que **haya un solo lenguaje gráfico**:
;; los mismos literales ya auditados contra el `.visor` (ADR-023), el mismo grosor
;; de línea y el mismo radio de punto que el gráfico del test. Un segundo juego de
;; colores «parecidos» es como empiezan los tableros que no se ven de la misma
;; familia.
;;
;; Diferencias deliberadas con `irt-progress-chart`, las tres por la misma razón
;; —acá el gráfico es un dato más de una tarjeta, no el centro de la pantalla—:
;; sin grilla, sin ejes rotulados y sin leyenda. El eje x es **tiempo real**, no
;; el número de intento: si alguien rindió tres veces en un día y la cuarta un mes
;; después, el hueco es información.

(def ^:private spark-w 240)
(def ^:private spark-h 48)
(def ^:private spark-pad 6)

(defn- spark-x [t t-min t-max]
  (let [inner (- spark-w (* 2 spark-pad))]
    (if (or (nil? t-min) (= t-min t-max))
      (+ spark-pad (/ inner 2))
      (+ spark-pad (* (/ (- t t-min) (double (- t-max t-min))) inner)))))

(defn- spark-y [v v-min v-max]
  (let [inner (- spark-h (* 2 spark-pad))
        rango (- v-max v-min)]
    (if (zero? rango)
      (+ spark-pad (/ inner 2))
      (+ spark-pad (* (- 1.0 (/ (- v v-min) rango)) inner)))))

(defn theta-sparkline
  "θ contra el tiempo para **una** evaluación.

   `puntos` son `{:t <ms> :theta <double>}` ya ordenados (ver
   `universo.history/attempt-points`).

   La escala vertical es **local a la evaluación**, no el rango fijo −3…3 del
   gráfico del test: con cuatro intentos entre 0,1 y 0,5, la escala fija los
   dibuja como una línea plana y el estudiante concluye que no avanzó nada. Se
   dice en el `aria-label` para que la lectura no dependa de adivinar la escala.
   El precio —dos sparklines de tarjetas distintas no son comparables entre sí—
   se acepta porque **comparar θ entre bancos distintos no es válido de todos
   modos** (R-17), que es la misma razón por la que no hay un gráfico global."
  [puntos]
  (let [pts (vec (or puntos []))
        n (count pts)]
    (when (pos? n)
      (let [ts (mapv :t pts)
            vs (mapv :theta pts)
            t-min (apply min ts) t-max (apply max ts)
            v-min (apply min vs) v-max (apply max vs)
            ;; Un respiro arriba y abajo: con el margen justo, el punto extremo
            ;; queda cortado por el borde del visor.
            margen (max 0.15 (* 0.15 (- v-max v-min)))
            lo (- v-min margen) hi (+ v-max margen)
            xy (fn [p] [(spark-x (:t p) t-min t-max) (spark-y (:theta p) lo hi)])
            linea (->> pts (map (fn [p] (let [[x y] (xy p)] (str x "," y)))) (str/join " "))
            [ux uy] (xy (last pts))]
        [:div {:class "visor rounded px-2 py-1"}
         [:svg {:viewBox (str "0 0 " spark-w " " spark-h)
                :class "w-full h-auto"
                :role "img"
                :aria-label (str "Evolución de θ en " n
                                 (if (= 1 n) " intento" " intentos")
                                 ", de " (.toFixed (double v-min) 2)
                                 " a " (.toFixed (double v-max) 2)
                                 " (escala propia de esta evaluación)")}
          (when (> n 1)
            [:polyline {:fill "none"
                        :stroke color-theta
                        :stroke-width 2
                        :stroke-linecap "round"
                        :stroke-linejoin "round"
                        :points linea}])
          ;; Los intentos anteriores en gris y el último en la tinta de la serie:
          ;; es la regla de «emphasis» —uno es el dato, el resto es contexto— y
          ;; evita que una línea de doce puntos compita consigo misma.
          (for [[i p] (map-indexed vector (butlast pts))]
            (let [[x y] (xy p)]
              ^{:key i} [:circle {:cx x :cy y :r 2.5 :fill color-grid}]))
          [:circle {:cx ux :cy uy :r 4 :fill color-theta}]]]))))
