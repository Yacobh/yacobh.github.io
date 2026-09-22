(ns universo.components.graficos-aula
  "Los gráficos del aula: tira de θ, pequeños múltiples de los intentos y
   barras de acierto por módulo.

   ── Reglas que sigue este archivo ──────────────────────────────────────────
   · **Colores literales dentro de un `.visor`**, como `irt_chart.cljs` y
     `cuadrante_aula.cljs` (ADR-023). `var(--x)` en un atributo SVG `fill` a
     menudo no resuelve y la figura queda negra; el visor es claro en los dos
     temas, así que un solo juego de literales sirve para ambos. Son **los
     mismos valores ya medidos** en el contrato de `scripts/audit_contraste.py`:
     este archivo no introduce ningún par de color nuevo.
   · **Nunca dos escalas en un mismo par de ejes.** Segundos y porcentaje de
     acierto se dibujan como **pequeños múltiples** —dos gráficos que comparten
     el eje horizontal— y no como dos series sobre el mismo marco.
   · **Una sola serie por gráfico**, así que no hay leyenda ni paleta
     categórica: lo que distingue a un dato de otro es su posición y su
     etiqueta, no su color.
   · **Los rótulos van fuera del área de datos.** Dentro chocan con los puntos;
     se descubrió renderizando, que es lo único que lo encuentra.
   · **Cada gráfico tiene su gemelo en tabla** en la misma pantalla. El color y
     la posición nunca son el único camino al número."
  (:require [clojure.string :as str]))

;; Los literales compartidos con `irt_chart.cljs`, ya medidos contra el visor.
(def ^:private color-serie "#0f4c5c")   ;; 6.52 sobre el visor
(def ^:private color-grid "#9E9E9A")    ;; referencia sutil, no dato
(def ^:private color-axis "#423F3B")    ;; ejes y rótulos — 7.18
(def ^:private color-visor "#E4E4E1")   ;; el fondo, para anillos y separaciones
(def ^:private color-atenuado "#7A7A76") ;; lo que tiene poca evidencia

(defn- redondear [x d]
  (when (number? x)
    (let [f (js/Math.pow 10 d)]
      (/ (js/Math.round (* x f)) f))))

;; =============================================================================
;; Tira de θ — dónde cae cada estudiante en la escala
;; =============================================================================

(def ^:private theta-min -3.0)
(def ^:private theta-max 3.0)

(defn tira-de-theta
  "Un punto por medición sobre la escala continua de θ, apilados por tramo.

   Es un histograma de puntos y no de barras a propósito: con 24 estudiantes,
   cada punto **es** una persona y se puede contar con el dedo. Una barra a esa
   escala esconde justamente lo que interesa mirar — cuánta dispersión hay
   dentro de un mismo curso.

   ⚠️ **El alto se calcula desde la pila más alta, antes de dibujar.** La primera
   versión fijaba el alto y después apilaba: la columna más alta se salía del
   lienzo por arriba y el resto del gráfico quedaba con un vacío enorme abajo.
   Se vio renderizando, que es lo único que lo encuentra.

   `mediciones` son mapas con `:theta` y `:correo`."
  [mediciones]
  (let [ancho 460
        pad-l 16
        pad-r 16
        pad-b 42
        ;; Sitio para los nombres de banda **más** el hueco que garantiza que la
        ;; pila más alta nunca los toque.
        pad-t 30
        datos (filter #(number? (:theta %)) mediciones)
        ;; Tramos de 0,5 logits: doce cubren la escala entera y dejan los
        ;; cortes de banda (0, 1, 2) justo en un borde, no partiendo un tramo.
        paso 0.5
        tramo-de (fn [t] (min 11 (max 0 (js/Math.floor (/ (- (max theta-min (min theta-max t))
                                                             theta-min)
                                                          paso)))))
        por-tramo (group-by (comp tramo-de :theta) datos)
        alto-max (apply max 1 (map count (vals por-tramo)))
        r 5
        separacion (+ (* 2 r) 3)
        ;; El lienzo se ajusta a la pila, con un mínimo para que un curso de
        ;; tres personas no salga como una franja.
        alto (max 150 (+ pad-t pad-b (* alto-max separacion)))
        base (- alto pad-b)
        x-de (fn [t] (+ pad-l (* (/ (- (max theta-min (min theta-max t)) theta-min)
                                    (- theta-max theta-min))
                                 (- ancho pad-l pad-r))))]
    (if (empty? datos)
      [:div {:class "visor rounded p-6 text-center"}
       [:p {:class "text-sm text-gray-600"} "Sin mediciones de θ en esta ventana."]]
      [:div {:class "visor rounded p-3 sm:p-4"}
       [:svg {:viewBox (str "0 0 " ancho " " alto)
              :class "w-full h-auto"
              :role "img"
              :aria-label (str "Distribución de θ de " (count datos)
                               " mediciones. La tabla de al lado tiene los mismos datos.")}
        ;; Los cortes de banda. Son la única referencia del fondo.
        (for [corte [0.0 1.0 2.0]]
          ^{:key (str "c" corte)}
          [:line {:x1 (x-de corte) :x2 (x-de corte) :y1 (- pad-t 4) :y2 base
                  :stroke color-grid :stroke-width 1 :stroke-dasharray "2 4"}])

        ;; El eje.
        [:line {:x1 pad-l :x2 (- ancho pad-r) :y1 base :y2 base
                :stroke color-grid :stroke-width 1}]

        ;; Nombres de banda, arriba y fuera del área de puntos.
        (for [[etiqueta desde hasta] [["inicial" theta-min 0.0]
                                      ["básico" 0.0 1.0]
                                      ["intermedio" 1.0 2.0]
                                      ["avanzado" 2.0 theta-max]]]
          ^{:key etiqueta}
          [:text {:x (/ (+ (x-de desde) (x-de hasta)) 2) :y 12
                  :text-anchor "middle" :font-size 10 :fill color-axis}
           etiqueta])

        ;; Rótulos de la escala.
        (for [t [-3 -2 -1 0 1 2 3]]
          ^{:key (str "t" t)}
          [:text {:x (x-de t) :y (+ base 16)
                  :text-anchor "middle" :font-size 10 :fill color-axis}
           (str t)])
        [:text {:x (/ ancho 2) :y (+ base 33)
                :text-anchor "middle" :font-size 10 :fill color-axis}
         "θ"]

        ;; Los puntos, apilados hacia arriba dentro de su tramo.
        (for [[tramo ms] por-tramo
              [i m] (map-indexed vector (sort-by :theta ms))
              :let [centro (+ theta-min (* paso (+ tramo 0.5)))
                    ;; Hueco = el valor es un tope alcanzado, no una
                    ;; estimación: o el banco se quedó sin ítems sin que
                    ;; fallara ninguno, o θ se pegó al borde de la escala.
                    tope? (or (:tope-del-banco? m) (:censurado? m))]]
          ^{:key (str tramo "-" i)}
          [:circle {:cx (x-de centro)
                    :cy (- base r 2 (* i separacion))
                    :r r
                    :fill (if tope? color-visor color-serie)
                    :stroke (if tope? color-serie color-visor)
                    :stroke-width 2}
           [:title (str (first (str/split (str (:correo m)) #"@"))
                        " · θ " (redondear (:theta m) 2)
                        (when (:topic m) (str " · " (:topic m)))
                        (cond
                          (:tope-del-banco? m) " · sin errores; el banco se quedó sin ítems"
                          (:censurado? m) " · en el borde de la escala"
                          :else ""))]])]
       [:div {:class "mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600"}
        [:span {:class "inline-flex items-center gap-1.5"}
         [:svg {:width 12 :height 12 :aria-hidden true}
          [:circle {:cx 6 :cy 6 :r 4 :fill color-serie}]]
         "una medición"]
        [:span {:class "inline-flex items-center gap-1.5"}
         [:svg {:width 12 :height 12 :aria-hidden true}
          [:circle {:cx 6 :cy 6 :r 4 :fill "none" :stroke color-serie :stroke-width 2}]]
         "tope alcanzado: sin errores y sin ítems, o en el borde de la escala"]]])))

;; =============================================================================
;; Pequeños múltiples — los intentos sucesivos
;; =============================================================================

(defn- mini-linea
  "Un gráfico chico: eje horizontal = número de intento, una serie."
  [{:keys [titulo puntos sufijo maximo]}]
  (let [ancho 220
        alto 120
        pad-l 30
        pad-r 12
        ;; El título vive arriba del área de datos, y el rótulo directo de un
        ;; punto que toque el tope caería encima de él: por eso el hueco, y por
        ;; eso el rótulo se dibuja **debajo** del punto cuando está muy alto.
        pad-t 34
        pad-b 26
        n (count puntos)
        tope (max 1 (or maximo (apply max 1 (keep :v puntos))))
        x-de (fn [i] (if (<= n 1)
                       (/ (+ pad-l (- ancho pad-r)) 2)
                       (+ pad-l (* (/ i (dec n)) (- ancho pad-l pad-r)))))
        y-de (fn [v] (+ pad-t (* (- 1.0 (/ (max 0 (min tope v)) tope))
                                 (- alto pad-t pad-b))))]
    [:svg {:viewBox (str "0 0 " ancho " " alto)
           :class "w-full h-auto"
           :role "img"
           :aria-label (str titulo ". Valores: "
                            (str/join ", " (map #(str (:etiqueta %) ": " (:v %) sufijo)
                                                puntos)))}
     [:text {:x pad-l :y 12 :font-size 10 :fill color-axis} titulo]
     ;; Base y tope, como referencia.
     (for [v [0 tope]]
       ^{:key (str "g" v)}
       [:line {:x1 pad-l :x2 (- ancho pad-r) :y1 (y-de v) :y2 (y-de v)
               :stroke color-grid :stroke-width 1
               :stroke-dasharray (when (pos? v) "3 3")}])
     [:text {:x (- pad-l 4) :y (+ 3 (y-de tope)) :text-anchor "end"
             :font-size 9 :fill color-axis} (str tope)]
     [:text {:x (- pad-l 4) :y (+ 3 (y-de 0)) :text-anchor "end"
             :font-size 9 :fill color-axis} "0"]
     ;; La serie.
     (when (> n 1)
       [:polyline {:fill "none" :stroke color-serie :stroke-width 2
                   :stroke-linecap "round" :stroke-linejoin "round"
                   :points (str/join " " (map-indexed (fn [i p] (str (x-de i) "," (y-de (:v p))))
                                                      puntos))}])
     (for [[i p] (map-indexed vector puntos)]
       ^{:key (str "p" i)}
       [:g
        [:circle {:cx (x-de i) :cy (y-de (:v p)) :r 4
                  :fill color-serie :stroke color-visor :stroke-width 2}
         [:title (str (:etiqueta p) ": " (:v p) sufijo)]]
        ;; Con cinco o seis puntos la etiqueta directa cabe y evita el viaje al
        ;; eje; con más, se deja solo el primero y el último.
        ;; El punto que **es** el tope ya está rotulado en el eje: repetirlo
        ;; al lado duplica el mismo número dos veces en dos centímetros.
        (when (and (or (<= n 6) (zero? i) (= i (dec n)))
                   (not= (:v p) tope))
          [:text {:x (x-de i) :y (- (y-de (:v p)) 9)
                  :text-anchor "middle" :font-size 9 :fill color-axis}
           (str (:v p))])
        [:text {:x (x-de i) :y (- alto 8)
                :text-anchor "middle" :font-size 9 :fill color-axis}
         (:etiqueta p)]])]))

(defn intentos-sucesivos
  "Dos gráficos que comparten el eje horizontal (el número de intento) y **no**
   el vertical: uno mide segundos y el otro porcentaje.

   Ponerlos sobre el mismo marco con dos escalas haría que el cruce de las dos
   líneas pareciera significar algo. No significa nada: depende de qué escala se
   elija."
  [progreso]
  (let [segundos (map (fn [f] {:etiqueta (str (:intento f) "º") :v (:seg-por-item f)}) progreso)
        acierto (map (fn [f] {:etiqueta (str (:intento f) "º") :v (:pct-acierto f)}) progreso)]
    [:div {:class "visor rounded p-3 sm:p-4"}
     [:div {:class "grid grid-cols-1 gap-4 sm:grid-cols-2"}
      [mini-linea {:titulo "Segundos por ítem (mediana)" :puntos segundos :sufijo " s"}]
      [mini-linea {:titulo "% de acierto" :puntos acierto :sufijo " %" :maximo 100}]]]))

;; =============================================================================
;; Acierto por módulo
;; =============================================================================

(defn barras-por-modulo
  "Una barra por módulo, ordenadas por cuántos estudiantes lo rindieron.

   Lo que tiene menos estudiantes que el mínimo se dibuja **atenuado y con su
   número de estudiantes al lado**: sigue estando, pero no se lee igual que una
   fila que describe al curso entero."
  [modulos]
  (let [ancho 460
        fila 30
        pad-l 8
        pad-r 8
        etiqueta-w 190
        barra-x (+ pad-l etiqueta-w 8)
        barra-w (- ancho barra-x pad-r 46)
        alto (+ 26 (* fila (count modulos)))]
    (if (empty? modulos)
      [:div {:class "visor rounded p-6 text-center"}
       [:p {:class "text-sm text-gray-600"} "Sin respuestas en esta ventana."]]
      [:div {:class "visor rounded p-3 sm:p-4"}
       [:svg {:viewBox (str "0 0 " ancho " " alto)
              :class "w-full h-auto"
              :role "img"
              :aria-label "Porcentaje de acierto por módulo. La tabla de abajo tiene los mismos datos."}
        [:text {:x pad-l :y 12 :font-size 10 :fill color-axis}
         "% de acierto · el ancho de la barra es el porcentaje"]
        (for [[i {:keys [modulo estudiantes pct-acierto evidencia-suficiente?]}]
              (map-indexed vector modulos)]
          (let [y (+ 26 (* i fila))
                tinta (if evidencia-suficiente? color-serie color-atenuado)]
            ^{:key modulo}
            [:g
             [:title (str modulo " · " pct-acierto " % · " estudiantes
                          (if (= 1 estudiantes) " estudiante" " estudiantes"))]
             [:text {:x pad-l :y (+ y 12) :font-size 10
                     :fill (if evidencia-suficiente? color-axis color-atenuado)}
              (let [corto (str/replace (str modulo) #"^[^/]+/" "")]
                (if (> (count corto) 30) (str (subs corto 0 29) "…") corto))]
             ;; El riel completo, para que el vacío también se vea.
             [:rect {:x barra-x :y (+ y 3) :width barra-w :height 12 :rx 3
                     :fill color-visor :stroke color-grid :stroke-width 1}]
             [:rect {:x barra-x :y (+ y 3)
                     :width (max 2 (* barra-w (/ (or pct-acierto 0) 100.0)))
                     :height 12 :rx 3 :fill tinta}]
             [:text {:x (+ barra-x barra-w 6) :y (+ y 13) :font-size 10
                     :fill (if evidencia-suficiente? color-axis color-atenuado)}
              (str pct-acierto " %")]]))]])))
