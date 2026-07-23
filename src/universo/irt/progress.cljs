(ns universo.irt.progress
  "Helpers puros para evolución IRT (θ/dificultad) y stop rule diagnóstica."
  (:require [universo.components.tetha :as tetha]))

(def default-stop-config
  {:min-items 5
   :max-items 12
   :se-threshold 0.35})

;; Ventana de búsqueda de ítems alrededor de θ (luego se elige el más cercano).
(def selection-half-width 1.0)
(def selection-half-width-wide 2.0)

(defn closest-question
  "Elige el ítem con dificultad más cercana a θ (argmin |b − θ|)."
  [theta questions]
  (when (seq questions)
    (apply min-key
           (fn [q]
             (Math/abs (- (double (or (:difficulty q) 0.0))
                          (double (or theta 0.0)))))
           questions)))

(defn fisher-information
  "Información de Fisher I(θ) = Σ P(1-P) = -f''(θ) para 1PL."
  [theta responses]
  (let [info (- (tetha/second-derivative theta responses))]
    (if (or (js/isNaN info) (neg? info))
      0.0
      info)))

(defn standard-error
  "SE(θ) ≈ 1/√I(θ). Sin información → infinito positivo."
  [theta responses]
  (let [info (fisher-information theta responses)]
    (if (< info 1e-12)
      ##Inf
      (/ 1.0 (Math/sqrt info)))))

(defn progress-points
  "Serie alineada de progreso a partir de responses y theta-history.
   Cada punto: {:n :theta :difficulty :correct?}"
  [responses theta-history]
  (let [rs (vec (or responses []))
        th (vec (or theta-history []))]
    (mapv (fn [i]
            (let [r (nth rs i)
                  theta (nth th i (or (:theta r) 0.0))]
              {:n (inc i)
               :theta (double theta)
               :difficulty (double (or (:difficulty r) 0.0))
               :correct? (boolean (:correct? r))}))
          (range (count rs)))))

(defn stop-reason
  "Devuelve :max-items, :precision o nil según la config."
  ([responses theta]
   (stop-reason responses theta default-stop-config))
  ([responses theta {:keys [min-items max-items se-threshold]
                     :or {min-items 5 max-items 12 se-threshold 0.35}}]
   (let [n (count responses)
         se (standard-error theta responses)]
     (cond
       (>= n max-items) :max-items
       (and (>= n min-items) (<= se se-threshold)) :precision
       :else nil))))

(defn should-stop?
  "true si la evaluación diagnóstica debe terminar."
  ([responses theta]
   (boolean (stop-reason responses theta default-stop-config)))
  ([responses theta config]
   (boolean (stop-reason responses theta config))))
