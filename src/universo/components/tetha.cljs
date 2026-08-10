(ns universo.components.tetha
  (:require [universo.irt.effort :as effort]))

;; -----------------------------------------------------------------------------
;; 🔹 MODELO 1PL (RASCH) + MAP con prior N(0,1)
;; -----------------------------------------------------------------------------

(def prior-mean 0.0)
;; Precisión del prior = 1/σ². N(0,1) ⇒ 1.0 (encoge θ hacia 0 con pocas respuestas).
(def prior-precision 1.0)
;; Máximo cambio de θ entre ítems (logits). Evita saltos de −3 a +3.
(def max-theta-step 0.4)

(defn probability-1pl
  "Calcula la probabilidad de responder correctamente usando modelo 1PL/Rasch
   P(X=1|θ,b) = 1 / (1 + exp(-(θ - b)))

   Parámetros:
   - theta: habilidad del estudiante
   - difficulty: dificultad del ítem (parámetro b)"
  [theta difficulty]
  (/ 1.0
     (+ 1.0 (Math/exp (- (- theta difficulty))))))

;; El peso `w` de cada respuesta (ADR-014 Fase 1) entra en las dos derivadas:
;; una respuesta con w = 0 no aporta score ni información. Que aparezca también
;; en la segunda derivada es lo que hace que el SE suba al descartar evidencia
;; — ver universo.irt.effort. Sin `:weight`, w = 1.0 y el cálculo es idéntico
;; al previo a ADR-014.

(defn first-derivative
  "Primera derivada de la log-verosimilitud Σ w·(observado - P(θ))."
  [theta responses]
  (reduce
   (fn [sum response]
     (let [difficulty (or (:difficulty response) 0.0)
           prob       (probability-1pl theta difficulty)
           observed   (if (:correct? response) 1.0 0.0)
           w          (effort/weight-of response)]
       (+ sum (* w (- observed prob)))))
   0.0
   responses))

(defn second-derivative
  "Segunda derivada de la log-verosimilitud -Σ w·(P(θ) * (1 - P(θ)))."
  [theta responses]
  (reduce
   (fn [sum response]
     (let [difficulty (or (:difficulty response) 0.0)
           prob       (probability-1pl theta difficulty)
           w          (effort/weight-of response)]
       (- sum (* w prob (- 1.0 prob)))))
   0.0
   responses))

(defn map-first-derivative
  "Score MAP = verosimilitud + prior N(μ, σ²)."
  [theta responses]
  (+ (first-derivative theta responses)
     (* (- prior-precision) (- theta prior-mean))))

(defn map-second-derivative
  "Hessiano MAP = verosimilitud + (−1/σ²)."
  [theta responses]
  (- (second-derivative theta responses) prior-precision))

(defn newton-raphson-iteration
  "Una iteración Newton-Raphson sobre el posterior MAP.
   θ_nuevo = θ_actual - (f'(θ) / f''(θ))"
  [theta responses]
  (let [d1 (map-first-derivative theta responses)
        d2 (map-second-derivative theta responses)]
    (if (or (zero? d2) (js/isNaN d1) (js/isNaN d2))
      theta
      (- theta (/ d1 d2)))))

(defn clamp-theta
  "Limita theta al rango estándar IRT [-3, 3]"
  [theta]
  (max -3.0 (min 3.0 theta)))

(defn limit-theta-step
  "Limita |Δθ| respecto al valor previo para una subida/bajada gradual."
  ([prev-theta new-theta]
   (limit-theta-step prev-theta new-theta max-theta-step))
  ([prev-theta new-theta max-step]
   (let [prev (double (or prev-theta 0.0))
         raw (double (or new-theta prev))
         delta (- raw prev)
         step (double (or max-step max-theta-step))
         capped (max (- step) (min step delta))]
     (clamp-theta (+ prev capped)))))

(defn calculate-theta
  "Estima θ con MAP (prior N(0,1)) + Newton-Raphson, partiendo del θ previo
   y limitando el paso entre ítems.

   Parámetros:
   - test: {:responses [...] :theta prev?}
           cada respuesta tiene :correct? y :difficulty

   Retorna θ en [-3, 3]."
  [test]
  (let [responses (:responses test)
        prev-theta (or (:theta test) 0.0)]
    (if (empty? responses)
      0.0
      (loop [theta          (double prev-theta)
             iteration      0
             max-iterations 20
             tolerance      0.001]
        (if (>= iteration max-iterations)
          (limit-theta-step prev-theta (clamp-theta theta))
          (let [new-theta (-> (newton-raphson-iteration theta responses)
                              clamp-theta)
                diff      (Math/abs (- new-theta theta))]
            (if (< diff tolerance)
              (limit-theta-step prev-theta new-theta)
              (recur new-theta
                     (inc iteration)
                     max-iterations
                     tolerance))))))))

;; -----------------------------------------------------------------------------
;; 🔹 FUNCIÓN AUXILIAR: Enriquecer respuestas con dificultad
;; -----------------------------------------------------------------------------

(defn enrich-responses-with-difficulty
  "Añade el campo :difficulty a cada respuesta buscándolo en las preguntas."
  [responses questions]
  (map (fn [response]
         (let [question-id (:question-id response)
               question    (first (filter #(= (:id %) question-id) questions))
               difficulty  (or (:difficulty question) 0.0)]
           (assoc response :difficulty difficulty)))
       responses))

;; -----------------------------------------------------------------------------
;; 🔹 FUNCIÓN AUXILIAR: Calcular theta con enriquecimiento automático
;; -----------------------------------------------------------------------------

(defn calculate-theta-auto
  "Enriquece respuestas con dificultad si falta y estima θ (usa :theta previo)."
  [test]
  (let [responses (:responses test)
        questions (:questions test)
        enriched-responses (if (every? :difficulty responses)
                             responses
                             (enrich-responses-with-difficulty responses questions))]
    (calculate-theta {:responses enriched-responses
                      :theta (:theta test)})))

;; -----------------------------------------------------------------------------
;; 🔹 FUNCIÓN DE DEBUGGING
;; -----------------------------------------------------------------------------

(defn debug-theta-calculation
  "Muestra información detallada del cálculo de theta (solo goog.DEBUG)."
  [test]
  (when ^boolean goog.DEBUG
    (let [responses (:responses test)]
      (js/console.log "=== Debug Theta Calculation ===")
      (js/console.log "Total responses:" (count responses))
      (doseq [[idx resp] (map-indexed vector responses)]
        (js/console.log (str "Response " idx ":")
                        "correct?" (:correct? resp)
                        "difficulty:" (:difficulty resp)))
      (let [theta (calculate-theta test)]
        (js/console.log "Final theta:" theta)
        theta))))
