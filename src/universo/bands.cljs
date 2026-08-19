(ns universo.bands
  "Bandas de conocimiento: qué rango de dificultad IRT le toca a cada módulo.

   ── La idea ────────────────────────────────────────────────────────────────
   Hoy `questions.difficulty` es un número suelto por ítem, tipeado a mano. El
   resultado medido el 2026-08-18: `polinomios` tiene 18 de sus 20 ítems dentro
   de **0,045 logits** —eso no es una escala de dificultad, es una constante con
   ruido— mientras `numbers_v1` recorre de -3 a 3. Dos bancos del mismo producto
   con escalas incompatibles.

   Una **banda** ata la dificultad de un ítem al lugar que ocupa su contenido en
   la progresión curricular: el primer contenido vive abajo del todo y cada uno
   siguiente sube. Dentro de la banda los ítems se reparten, porque dentro de un
   mismo contenido también hay ítems más fáciles y más difíciles — colapsarlos a
   un punto dejaría al test adaptativo sin nada que discriminar.

   ── Lo que una banda NO es ─────────────────────────────────────────────────
   **Una hipótesis editorial, no una medición.** Sigue siendo `difficulty`
   autoral. Lo que gana el banco es coherencia, no validez psicométrica; la
   validez solo puede venir de calibrar con respuestas reales (G-2, R-17, Q-05).
   Cuando se calibre, estas bandas son la hipótesis **contra la que se
   contrasta**, y por eso conviene tenerlas escritas."
  (:require [clojure.string :as str]))

;; La escala θ del sistema, la misma de `components.tetha/clamp-theta`.
(def theta-min -3.0)
(def theta-max 3.0)

;; Orden de los ejes. Sale de la progresión que el propio producto declara en la
;; portada («una progresión clásica de aritmética, álgebra y geometría») y del
;; temario PAES M1, que agrega probabilidad y estadística como cuarto eje.
;; `cuantica` va al final y aparte: no es contenido del producto (T-61).
(def track-order
  ["aritmetica" "algebra" "geometria" "probabilidad" "cuantica"])

(defn- track-rank [track]
  (let [i (.indexOf track-order (str/lower-case (str (or track "zzz"))))]
    (if (neg? i) (count track-order) i)))

(defn curricular-order
  "Módulos ordenados como los recorre un estudiante: por eje y, dentro del eje,
   por `order_index`.

   Es el único insumo de las bandas derivadas, y por eso reordenar módulos
   **cambia las bandas**: es deliberado — el orden curricular *es* la hipótesis
   de dificultad."
  [modules]
  (->> (or modules [])
       (sort-by (juxt #(track-rank (:track %))
                      #(or (:order_index %) 0)
                      #(str (:slug %))))
       vec))

(def product-tracks
  "Ejes del producto. `cuantica` NO está: es un experimento personal (T-61) con
   su propia escala, y meterlo en la progresión PAES le comería la mitad de los
   logits a los contenidos que sí se evalúan. Medido: con los 35 módulos
   mezclados, cada banda quedaba en 0,17 logits y 15 de ellas eran de cuántica."
  #{"aritmetica" "algebra" "geometria" "probabilidad"})

(defn product-modules
  "Solo los módulos que participan de la progresión PAES."
  [modules]
  (filterv #(contains? product-tracks (str/lower-case (str (:track %))))
           (curricular-order modules)))

;; Los centros de banda se reparten en [-2.4, 2.4] y no en [-3, 3]: los extremos
;; de la escala quedan para los ítems excepcionales **dentro** de cada banda, no
;; para el centro de un contenido. Un módulo cuyo centro fuera -3.0 no tendría
;; hacia dónde repartir sus ítems fáciles.
(def ^:private centro-min -2.4)
(def ^:private centro-max 2.4)

;; Semiancho mínimo de una banda. Las bandas **se solapan a propósito**: dentro de
;; un mismo contenido hay ítems fáciles y difíciles, y bandas disjuntas y
;; angostas afirmarían que el ítem más difícil de «enteros» es más fácil que el
;; más trivial de «fracciones», que es falso y desviaría al test adaptativo.
(def ^:private semiancho-minimo 0.45)

(defn default-bands
  "Banda derivada de cada módulo del producto, a partir del orden curricular.

   Devuelve `{module-id {:min x :max y :centro c :indice i :total n}}`. Los
   **centros** marchan hacia arriba —que es la progresión que se quiere afirmar—
   y las bandas se solapan, que es lo que deja espacio a la variación dentro de
   un mismo contenido.

   Los módulos fuera de `product-tracks` no reciben banda: no participan de esta
   progresión y forzarlos sería inventar una."
  [modules]
  (let [ordenados (product-modules modules)
        n (count ordenados)]
    (if (zero? n)
      {}
      (let [paso (if (= 1 n) 0.0 (/ (- centro-max centro-min) (double (dec n))))
            semi (max semiancho-minimo (* 0.9 paso))]
        (into {}
              (map-indexed
               (fn [i m]
                 (let [c (if (= 1 n) 0.0 (+ centro-min (* i paso)))]
                   [(:id m) {:min (max theta-min (- c semi))
                             :max (min theta-max (+ c semi))
                             :centro c
                             :indice i
                             :total n}]))
               ordenados))))))

(defn band-for
  "Banda efectiva de un módulo: la explícita si la tiene, la derivada si no.

   `:origen` dice cuál de las dos es, porque en el panel importa distinguir «esto
   lo decidió alguien» de «esto salió del orden»."
  [module derivadas]
  (let [{:keys [band_min band_max]} module
        derivada (get derivadas (:id module))]
    (if (and (number? band_min) (number? band_max))
      {:min (double band_min) :max (double band_max) :origen :explicita}
      (when derivada
        (assoc (select-keys derivada [:min :max]) :origen :derivada)))))

(defn repartir
  "Reparte `n` ítems dentro de la banda `[lo, hi]`, del más fácil al más difícil.

   Con n = 1 el ítem va al **centro** de la banda y no a un extremo: un solo ítem
   no tiene por qué representar el piso ni el techo de su contenido.

   Con n > 1 se reparte de extremo a extremo, incluidos los bordes, de modo que
   la banda quede efectivamente cubierta: si los ítems se apiñaran en el medio, la
   banda de al lado dejaría un hueco por el que el test adaptativo no encuentra
   nada que servir."
  [n lo hi]
  (let [n (max 0 (or n 0))
        lo (double lo) hi (double hi)]
    (cond
      (zero? n) []
      (= 1 n) [(/ (+ lo hi) 2.0)]
      :else (mapv (fn [i] (+ lo (* (/ (double i) (dec n)) (- hi lo))))
                  (range n)))))

(defn assign
  "Dificultades propuestas para los ítems de un módulo dentro de su banda.

   `items` se ordena por `order_index` y, a falta de él, por la dificultad que ya
   tenía y luego por id: si el autor ya había puesto un orden de dificultad, se
   respeta **dentro** de la banda en vez de barrerlo. Devuelve
   `[{:id … :difficulty-antes … :difficulty-despues …}]` para poder mostrar el
   antes y el después sin escribir nada todavía."
  [items {:keys [min max]}]
  (let [ordenados (->> (or items [])
                       (sort-by (juxt #(or (:order_index %) 9999)
                                      #(if (number? (:difficulty %))
                                         (:difficulty %)
                                         0)
                                      #(str (:id %))))
                       vec)
        valores (repartir (count ordenados) min max)]
    (mapv (fn [item v]
            {:id (:id item)
             :question (:question item)
             :difficulty-antes (:difficulty item)
             :difficulty-despues (/ (js/Math.round (* v 100)) 100.0)})
          ordenados valores)))

(defn changed
  "Solo las asignaciones que de verdad cambian algo.

   Guardar 84 ítems para modificar 12 es pagar 72 escrituras contra producción
   por gusto, y además ensucia el `updated_at` de filas que nadie tocó."
  [asignaciones]
  (vec (remove (fn [{:keys [difficulty-antes difficulty-despues]}]
                 (and (number? difficulty-antes)
                      (< (js/Math.abs (- difficulty-antes difficulty-despues)) 0.005)))
               asignaciones)))
