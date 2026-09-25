(ns universo.irt.person-fit-cli
  "Punto de entrada de node para medir person-fit sobre un volcado de la base
   (T-175). No es parte del bundle: solo lo compila el build `:person-fit`.

     node out/person_fit.js <intentos.json> <salida.json> [simulaciones]

   ── Por qué se simula ──────────────────────────────────────────────────────
   Con 8 a 20 ítems, `lz` no sigue una normal y el corte −1,645 marca de más o
   de menos según el banco. En vez de confiar en la teoría, para cada intento se
   generan N patrones de un estudiante **honesto que responde exactamente como
   dice el modelo**, con el mismo θ y los mismos ítems, y se cuenta qué fracción
   da un `lz` tan bajo o más que el observado. Eso es `p-sim`: si es 0,02, solo
   el 2 % de los honestos simulados produce un patrón así de raro. Con datos
   honestos, alrededor del 5 % de los intentos cae bajo 0,05 por puro azar: el
   exceso sobre ese 5 % es la señal, no cada caso por separado.

   La semilla es fija: dos corridas sobre el mismo volcado dan lo mismo."
  (:require [universo.irt.person-fit :as pf]
            [universo.components.tetha :as tetha]))

(def ^:private fs (js/require "fs"))

(defn- leer-json [ruta]
  (js->clj (.parse js/JSON (.readFileSync fs ruta "utf8")) :keywordize-keys true))

(defn- rng
  "mulberry32: generador con semilla, para que el resultado sea reproducible."
  [semilla]
  (let [a (atom (bit-or semilla 0))]
    (fn []
      (swap! a #(bit-or (+ % 0x6D2B79F5) 0))
      (let [t @a
            t (js/Math.imul (bit-xor t (unsigned-bit-shift-right t 15)) (bit-or t 1))
            t (bit-xor t (+ t (js/Math.imul (bit-xor t (unsigned-bit-shift-right t 7)) (bit-or t 61))))]
        (/ (unsigned-bit-shift-right (bit-xor t (unsigned-bit-shift-right t 14)) 0) 4294967296)))))

(defn p-simulado
  "Fracción de patrones simulados con `lz` ≤ el observado."
  [rs theta c lz-obs n-sims azar]
  (let [ps (mapv #(tetha/probability theta (:difficulty %) c) rs)
        sim (fn [] (mapv (fn [r p] (assoc r :correct? (< (azar) p))) rs ps))
        zs (keep (fn [_] (pf/lz (sim) theta c)) (range n-sims))]
    (when (seq zs)
      (/ (count (filter #(<= % lz-obs) zs)) (count zs)))))

(defn- grupo [topic]
  (cond (nil? topic) "(sin topic)"
        (.startsWith topic "electronica") "electronica_*"
        (.startsWith topic "mq_") "mq_*"
        :else topic))

(defn- mediana [xs]
  (let [v (vec (sort (remove nil? xs))) n (count v)]
    (when (pos? n)
      (if (odd? n) (v (quot n 2)) (/ (+ (v (dec (quot n 2))) (v (quot n 2))) 2)))))

(defn- r3 [x] (when (number? x) (/ (Math/round (* 1000 x)) 1000)))

(defn medir-intentos
  "Numera los intentos de cada estudiante por topic y mide cada uno. El
   `user_id` se usa para numerar y no sale en el resultado."
  [filas n-sims]
  (let [azar (rng 20260925)
        numerados (->> filas
                       (group-by (juxt :user_id :topic))
                       vals
                       (mapcat (fn [fs] (map-indexed (fn [i f] (assoc f :intento (inc i)))
                                                     (sort-by :created_at fs)))))]
    (vec
     (for [f (sort-by :created_at numerados)
           :let [rs (pf/respuestas-evaluables (:responses f))
                 m (pf/medir (:responses f) (:theta f) (:c f))]
           :when (:lz m)]
       {:id (:id f) :topic (:topic f) :grupo (grupo (:topic f)) :intento (:intento f)
        :fecha (subs (str (:created_at f)) 0 10)
        :n (:n m) :theta (r3 (:theta f))
        :aciertos (r3 (/ (count (filter :correct? rs)) (count rs)))
        :lz (r3 (:lz m))
        :p-sim (r3 (p-simulado rs (:theta f) (:c f) (:lz m) n-sims azar))
        :guttman (r3 (:guttman m))
        :cv-tiempo (r3 (:cv-tiempo m))
        :seg-mediana (r3 (some-> (mediana (map :time-ms rs)) (/ 1000)))}))))

(defn resumen
  "Por grupo y por intento (1º contra posteriores): cuántos, qué fracción con
   p-sim < 0,05 (esperado ≈ 0,05 si todos fueran honestos), y medianas."
  [medidos]
  (let [fila (fn [xs]
               (let [n (count xs)]
                 {:intentos n
                  :frac-p-sim<0.05 (r3 (/ (count (filter #(some-> (:p-sim %) (< 0.05)) xs)) (max n 1)))
                  :mediana-guttman (r3 (mediana (map :guttman xs)))
                  :mediana-cv-tiempo (r3 (mediana (map :cv-tiempo xs)))
                  :mediana-seg (r3 (mediana (map :seg-mediana xs)))}))]
    (into (sorted-map)
          (for [[g xs] (group-by :grupo medidos)]
            [g {:todos (fila xs)
                :primer-intento (fila (filter #(= 1 (:intento %)) xs))
                :posteriores (fila (filter #(> (:intento %) 1) xs))}]))))

(defn main [& [ruta-in ruta-out sims]]
  (if-not (and ruta-in ruta-out)
    (do (js/console.error "uso: node out/person_fit.js intentos.json salida.json [simulaciones]")
        (js/process.exit 2))
    (let [medidos (medir-intentos (leer-json ruta-in) (if sims (js/parseInt sims) 500))
          res {:resumen (resumen medidos) :intentos medidos}]
      (.writeFileSync fs ruta-out (.stringify js/JSON (clj->js res) nil 2))
      (doseq [[g r] (:resumen res)]
        (println g (pr-str r))))))
