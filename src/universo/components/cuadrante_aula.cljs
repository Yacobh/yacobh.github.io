(ns universo.components.cuadrante-aula
  "Velocidad × acierto del curso: un punto por estudiante.

   ── Por qué esto sí es un gráfico y el ranking no ──────────────────────────
   Un ranking de 26 personas con seis medidas es **una tabla**: se lee ordenando
   una columna. Pero hay una lectura que ninguna columna ordenada da, y es el
   **cruce**: quien contesta en poco tiempo *y acierta* frente a quien contesta
   en poco tiempo *y falla*. En la columna «más rápidos» esos dos quedan pegados
   uno al lado del otro, y son dos situaciones distintas.

   El gráfico las separa; qué significa cada esquina lo decide quien enseña, y
   por eso las esquinas están rotuladas con **los ejes** y no con un veredicto.

   Es el eje λ de [[../../adr/ADR-019-eje-de-fluidez-en-vez-de-estilos-de-aprendizaje]]
   —fluidez— dibujado para un curso entero en vez de para una persona.

   ── Decisiones de dibujo, y de dónde salen ─────────────────────────────────
   · **Una sola serie**, así que no hay leyenda ni paleta categórica: la
     identidad de cada punto la da su etiqueta al pasar el cursor, no un color.
   · **Los cortes son las medianas del propio curso**, no valores fijos: así
     cada cuadrante tiene gente por construcción y el gráfico no miente cuando
     el curso entero anduvo bien o mal.
   · **Colores literales dentro de un `.visor`**, exactamente como
     `irt_chart.cljs` (ADR-023): `var(--x)` en un atributo SVG `fill` a menudo no
     resuelve y el punto queda negro. El visor es claro en los dos temas, así que
     un solo juego de literales sirve para ambos, y los valores son **los mismos
     que ya están en el contrato de `scripts/audit_contraste.py`** — no se
     introduce ningún par de color nuevo.
   · **Anillo de la superficie en cada punto** (2 px del color del visor): con 26
     estudiantes hay solapamientos, y sin el anillo dos puntos encimados se leen
     como uno solo más grande.
   · Quien tiene **poca evidencia** (menos de cuatro respuestas correctas
     cronometradas) se dibuja **hueco**. No se lo esconde —seguiría estando en la
     tabla— pero tampoco se lo pinta como una medición firme."
  (:require [clojure.string :as str]))

(def ^:private width 460)
(def ^:private height 260)
(def ^:private pad-l 44)
(def ^:private pad-r 16)
;; `pad-t` y `pad-b` dejan sitio a los rótulos de cuadrante **fuera** del área
;; de datos. Dentro chocaban con los puntos — se vio renderizando, que es lo
;; único que lo encuentra: ninguna validación de color mira la geometría.
(def ^:private pad-t 30)
(def ^:private pad-b 56)

;; Los mismos literales de `irt_chart.cljs`, ya medidos contra el visor.
(def ^:private color-punto "#0f4c5c")   ;; la serie — 6.52 sobre el visor
(def ^:private color-grid "#9E9E9A")    ;; guías: referencia sutil, no dato
(def ^:private color-axis "#423F3B")    ;; ejes y rótulos — 7.18
;; El fondo del propio `.visor`: `panel-50` en claro y `panel-100` en oscuro
;; (`src/css/app.css`). Se toma el claro para el anillo — la diferencia entre
;; los dos es de un tono, y lo que tiene que separar el anillo es el punto
;; (#0f4c5c) de su vecino, no el fondo de sí mismo.
(def ^:private color-visor "#E4E4E1")

(defn- mediana
  [xs]
  (let [v (vec (sort xs))
        n (count v)]
    (when (pos? n)
      (if (odd? n)
        (nth v (quot n 2))
        (/ (+ (nth v (dec (quot n 2))) (nth v (quot n 2))) 2.0)))))

(defn- escala
  "Valor → píxel, con el eje ya invertido si hace falta."
  [v minimo maximo desde hasta]
  (let [rango (max 1e-9 (- maximo minimo))
        t (/ (- (max minimo (min maximo v)) minimo) rango)]
    (+ desde (* t (- hasta desde)))))

(defn- punto-visible?
  [{:keys [seg-por-acierto pct-acierto]}]
  (and (number? seg-por-acierto) (number? pct-acierto)))

(defn cuadrante
  "`filas` son renglones de `universo.cohorte/ranking`."
  [filas]
  (let [puntos (filter punto-visible? filas)
        segs (map :seg-por-acierto puntos)
        x-max (max 10 (apply max 1 segs))
        corte-x (mediana segs)
        corte-y (mediana (map :pct-acierto puntos))
        x-de #(escala % 0 x-max pad-l (- width pad-r))
        y-de #(escala % 0 100 (- height pad-b) pad-t)]
    (if (empty? puntos)
      [:div {:class "visor rounded p-6 text-center"}
       [:p {:class "text-sm text-gray-600"}
        "Todavía no hay aciertos cronometrados con los que medir velocidad."]]
      [:div {:class "visor rounded p-3 sm:p-4"}
       [:svg {:viewBox (str "0 0 " width " " height)
              :class "w-full h-auto"
              :role "img"
              :aria-label (str "Velocidad contra acierto de " (count puntos)
                               " estudiantes. La tabla de arriba tiene los mismos datos.")}

        ;; Guías horizontales cada 25 %: referencia, no dato.
        (for [p [0 25 50 75 100]]
          ^{:key (str "g" p)}
          [:line {:x1 pad-l :x2 (- width pad-r) :y1 (y-de p) :y2 (y-de p)
                  :stroke color-grid :stroke-width 1
                  :stroke-dasharray (when-not (zero? p) "3 3")}])

        ;; Los dos cortes: la mediana del curso en cada eje.
        (when corte-x
          [:line {:x1 (x-de corte-x) :x2 (x-de corte-x) :y1 pad-t :y2 (- height pad-b)
                  :stroke color-grid :stroke-width 1 :stroke-dasharray "2 4"}])
        (when corte-y
          [:line {:x1 pad-l :x2 (- width pad-r) :y1 (y-de corte-y) :y2 (y-de corte-y)
                  :stroke color-grid :stroke-width 1 :stroke-dasharray "2 4"}])

        ;; Rótulos del eje vertical.
        (for [p [0 50 100]]
          ^{:key (str "t" p)}
          [:text {:x (- pad-l 8) :y (+ 4 (y-de p))
                  :text-anchor "end" :font-size 10 :fill color-axis}
           (str p " %")])

        ;; Rótulos del eje horizontal.
        (for [s [0 (js/Math.round (/ x-max 2)) (js/Math.round x-max)]]
          ^{:key (str "x" s)}
          [:text {:x (x-de s) :y (- height pad-b -30)
                  :text-anchor "middle" :font-size 10 :fill color-axis}
           (str s " s")])

        [:text {:x (/ width 2) :y (- height 6)
                :text-anchor "middle" :font-size 10 :fill color-axis}
         "segundos por acierto (mediana)"]

        ;; Las esquinas, que son la lectura entera del gráfico — **arriba del
        ;; borde superior y abajo del inferior**, nunca sobre los datos.
        [:text {:x pad-l :y (- pad-t 10) :font-size 10 :fill color-axis}
         "↖ menos tiempo, más acierto"]
        [:text {:x (- width pad-r) :y (- pad-t 10)
                :text-anchor "end" :font-size 10 :fill color-axis}
         "más tiempo, más acierto ↗"]
        [:text {:x pad-l :y (- height pad-b -14) :font-size 10 :fill color-axis}
         "↙ menos tiempo, menos acierto"]

        ;; Los puntos. El anillo va del color del visor: separa dos encimados.
        (for [{:keys [correo seg-por-acierto pct-acierto intentos
                      evidencia evidencia-suficiente?]} puntos]
          ^{:key (str correo seg-por-acierto pct-acierto)}
          [:circle {:cx (x-de seg-por-acierto)
                    :cy (y-de pct-acierto)
                    :r 5
                    :fill (if evidencia-suficiente? color-punto color-visor)
                    :stroke (if evidencia-suficiente? color-visor color-punto)
                    :stroke-width 2}
           [:title (str (first (str/split (str correo) #"@"))
                        " · " pct-acierto " % · " seg-por-acierto " s por acierto"
                        " · " intentos (if (= 1 intentos) " intento" " intentos")
                        (when-not evidencia-suficiente?
                          (str " · solo " evidencia
                               (if (= 1 evidencia) " acierto cronometrado" " aciertos cronometrados"))))]])]

       [:div {:class "mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600"}
        [:span {:class "inline-flex items-center gap-1.5"}
         [:svg {:width 12 :height 12 :aria-hidden true}
          [:circle {:cx 6 :cy 6 :r 4 :fill color-punto}]]
         "un estudiante"]
        [:span {:class "inline-flex items-center gap-1.5"}
         [:svg {:width 12 :height 12 :aria-hidden true}
          [:circle {:cx 6 :cy 6 :r 4 :fill "none" :stroke color-punto :stroke-width 2}]]
         "menos de 4 aciertos cronometrados"]
        [:span "las líneas punteadas son la mediana del curso"]]])))
