(ns universo.irt.progress
  "Helpers puros para evolución IRT (θ/dificultad) y stop rule diagnóstica."
  (:require [universo.components.tetha :as tetha]
            [universo.irt.effort :as effort]
            [universo.motor :as motor]))

(def default-stop-config
  {:min-items 5
   :max-items 12
   :se-threshold 0.35
   :max-minutes nil
   ;; Piso de esfuerzo en segundos (ADR-014 Fase 1). No es una regla de parada
   ;; —vive acá porque es el mismo mapa de configuración por banco que viaja
   ;; desde `test_configs`— sino el umbral que decide si una respuesta cuenta.
   :min-response-seconds effort/default-min-response-seconds
   ;; Parámetros del modelo (ADR-034). Viven acá por lo mismo: es el mapa que
   ;; viaja por evaluación desde `test_configs`, y el owner pidió explícitamente
   ;; poder moverlos por banco sin tocar código.
   :guessing-c motor/default-guessing-c
   :prior-sd motor/default-prior-sd})

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
  "Información de Fisher I(θ) = Σ w·(∂P/∂θ)²/(P(1−P)) = -f''(θ).

   Con azar (c > 0) un ítem informa **menos**: el máximo por ítem cae de 0,25 a
   ≈0,155, porque parte de los aciertos ya no distinguen a quien sabe de quien
   adivinó. Eso empeora la aritmética de T-111, no la mejora — la parada por
   precisión queda todavía más lejos de dispararse.

   El peso por respuesta de ADR-014 llega heredado de `second-derivative`: una
   respuesta descartada por no esforzada no aporta información, así que el SE
   sube en vez de mentir. Es el punto que el ADR marca como fácil de olvidar."
  ([theta responses] (fisher-information theta responses motor/default-guessing-c))
  ([theta responses c]
   (let [info (- (tetha/second-derivative theta responses c))]
     (if (or (js/isNaN info) (neg? info))
       0.0
       info))))

(defn standard-error
  "SE(θ) ≈ 1/√I(θ), **solo verosimilitud**. Sin información → infinito positivo.

   Es la que usa la regla de parada, por continuidad con el umbral configurado.
   Para la precisión que corresponde a un estimador MAP —que es lo que el motor
   calcula— ver `posterior-standard-error`."
  ([theta responses] (standard-error theta responses motor/default-guessing-c))
  ([theta responses c]
   (let [info (fisher-information theta responses c)]
     (if (< info 1e-12)
       ##Inf
       (/ 1.0 (Math/sqrt info))))))

(defn posterior-standard-error
  "SE(θ) del posterior: 1/√(I(θ) + 1/σ²).

   Es la precisión honesta de un θ estimado por MAP, porque el prior también
   aporta información. Sale más baja que `standard-error` (con 12 ítems, ≈0,53
   contra ≈0,63) y es la que hay que publicar el día que G-4 entregue Δθ con su
   error asociado: decir «θ ± SE de verosimilitud» sobre una estimación
   bayesiana exagera la incertidumbre.

   **Sin respuestas devuelve σ**, no infinito: antes del primer ítem la
   incertidumbre no es infinita, es exactamente la del prior. Por eso la regla
   de parada no la usa — un umbral flojo pararía el test con cero evidencia — y
   por eso ese cambio es T-111 y no este commit."
  ([theta responses] (posterior-standard-error theta responses nil))
  ([theta responses config]
   (let [c (:guessing-c config)
         pp (motor/prior-precision (:prior-sd config))
         info (+ (fisher-information theta responses (motor/guessing-c c)) pp)]
     (if (< info 1e-12)
       ##Inf
       (/ 1.0 (Math/sqrt info))))))

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
  "Devuelve :max-items, :precision, :time-limit o nil según la config.
   La 2 y 3-aridad no evalúan tiempo (elapsed-minutes nil), preservando el
   comportamiento previo a que existiera :max-minutes en la config."
  ([responses theta]
   (stop-reason responses theta nil default-stop-config))
  ([responses theta config]
   (stop-reason responses theta nil config))
  ([responses theta elapsed-minutes
    {:keys [min-items max-items se-threshold max-minutes guessing-c]
     :or {min-items 5 max-items 12 se-threshold 0.35 max-minutes nil}}]
   (let [n (count responses)
         se (standard-error theta responses (motor/guessing-c guessing-c))]
     (cond
       (>= n max-items) :max-items
       (and max-minutes elapsed-minutes (>= elapsed-minutes max-minutes)) :time-limit
       (and (>= n min-items) (<= se se-threshold)) :precision
       :else nil))))

(defn should-stop?
  "true si la evaluación diagnóstica debe terminar."
  ([responses theta]
   (boolean (stop-reason responses theta default-stop-config)))
  ([responses theta config]
   (boolean (stop-reason responses theta config))))
