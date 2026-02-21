(ns universo.components.tetha)

;; -----------------------------------------------------------------------------
;; 🔹 MODELO 1PL (RASCH)
;; -----------------------------------------------------------------------------

(defn probability-1pl
  "Calcula la probabilidad de responder correctamente usando modelo 1PL/Rasch
   P(X=1|θ,b) = 1 / (1 + exp(-(θ - b)))

   Parámetros:
   - theta: habilidad del estudiante
   - difficulty: dificultad del ítem (parámetro b)"
  [theta difficulty]
  (/ 1.0
     (+ 1.0 (Math/exp (- (- theta difficulty))))))

(defn first-derivative
  "Primera derivada de la log-verosimilitud
   Σ(observado - P(θ))

   Parámetros:
   - theta: valor actual de habilidad
   - responses: vector de respuestas con :correct? y :difficulty"
  [theta responses]
  (reduce
   (fn [sum response]
     (let [difficulty (or (:difficulty response) 0.0)
           prob       (probability-1pl theta difficulty)
           observed   (if (:correct? response) 1.0 0.0)]
       (+ sum (- observed prob))))
   0.0
   responses))

(defn second-derivative
  "Segunda derivada de la log-verosimilitud
   -Σ(P(θ) * (1 - P(θ)))

   Parámetros:
   - theta: valor actual de habilidad
   - responses: vector de respuestas con :difficulty"
  [theta responses]
  (reduce
   (fn [sum response]
     (let [difficulty (or (:difficulty response) 0.0)
           prob       (probability-1pl theta difficulty)]
       (- sum (* prob (- 1.0 prob)))))
   0.0
   responses))

(defn newton-raphson-iteration
  "Realiza una iteración del método Newton-Raphson
   θ_nuevo = θ_actual - (f'(θ) / f''(θ))

   Protegido contra división por cero y valores NaN."
  [theta responses]
  (let [d1 (first-derivative theta responses)
        d2 (second-derivative theta responses)]
    (if (or (zero? d2) (js/isNaN d1) (js/isNaN d2))
      theta
      (- theta (/ d1 d2)))))

(defn clamp-theta
  "Limita theta al rango estándar IRT [-3, 3]"
  [theta]
  (max -3.0 (min 3.0 theta)))

(defn calculate-theta
  "Estima θ (habilidad del estudiante) usando máxima verosimilitud con Newton-Raphson

   Parámetros:
   - test: mapa con estructura {:responses [...]}
           donde cada respuesta tiene :correct? y :difficulty

   Retorna:
   - θ estimado en el rango [-3, 3]"
  [test]
  (let [responses (:responses test)]
    (if (empty? responses)
      0.0
      (loop [theta          0.0
             iteration      0
             max-iterations 20
             tolerance      0.001]
        (if (>= iteration max-iterations)
          (clamp-theta theta)
          (let [new-theta (-> (newton-raphson-iteration theta responses)
                              clamp-theta)          ;; clamp en cada iteración
                diff      (Math/abs (- new-theta theta))]
            (if (< diff tolerance)
              new-theta
              (recur new-theta
                     (inc iteration)
                     max-iterations
                     tolerance))))))))

;; -----------------------------------------------------------------------------
;; 🔹 FUNCIÓN AUXILIAR: Enriquecer respuestas con dificultad
;; -----------------------------------------------------------------------------

(defn enrich-responses-with-difficulty
  "Añade el campo :difficulty a cada respuesta buscándolo en las preguntas

   Uso en caso de que las respuestas no tengan dificultad:
   (enrich-responses-with-difficulty responses questions)"
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
  "Versión que automáticamente enriquece las respuestas con dificultad
   si alguna no la tiene."
  [test]
  (let [responses (:responses test)
        questions (:questions test)
        ;; ✅ Enriquecer si ALGUNA respuesta no tiene :difficulty
        enriched-responses (if (every? :difficulty responses)
                             responses
                             (enrich-responses-with-difficulty responses questions))]
    (calculate-theta {:responses enriched-responses})))

;; -----------------------------------------------------------------------------
;; 🔹 FUNCIÓN DE DEBUGGING
;; -----------------------------------------------------------------------------

(defn debug-theta-calculation
  "Muestra información detallada del cálculo de theta.
   Solo activo en modo desarrollo (goog.DEBUG)."
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
