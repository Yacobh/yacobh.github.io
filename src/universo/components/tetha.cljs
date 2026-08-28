(ns universo.components.tetha
  (:require [universo.irt.effort :as effort]
            [universo.motor :as motor]))

;; -----------------------------------------------------------------------------
;; 🔹 MODELO 1PL (RASCH) CON AZAR FIJO + MAP con prior N(0, σ²)
;; -----------------------------------------------------------------------------

(def prior-mean motor/prior-mean)
;; Precisión del prior por defecto = 1/σ². Ver `universo.motor` para por qué σ=2
;; y no 1 (el anterior) ni 3. Cada evaluación puede traer el suyo.
(def prior-precision (motor/prior-precision))
;; Máximo cambio de θ entre ítems (logits). Evita saltos de −3 a +3.
;;
;; Medido: con el prior de σ=1 este tope casi no llegaba a apretar (quitarlo
;; movía θ entre 0,00 y 0,06 logits), porque el MAP ya se movía despacio solo.
;; Con σ=2 el MAP se mueve más, así que el tope **vuelve a hacer trabajo real**:
;; es lo que impide que dos aciertos manden a un estudiante a la cota.
(def max-theta-step 0.4)

(defn probability-1pl
  "Probabilidad 1PL/Rasch **sin azar**: P(X=1|θ,b) = 1 / (1 + exp(-(θ - b))).

   Se conserva como la curva base del modelo: `probability` la usa y le suma el
   piso de azar. Para la probabilidad que el motor realmente usa al estimar,
   ver `probability`.

   Parámetros:
   - theta: habilidad del estudiante
   - difficulty: dificultad del ítem (parámetro b)"
  [theta difficulty]
  (/ 1.0
     (+ 1.0 (Math/exp (- (- theta difficulty))))))

(defn probability
  "Probabilidad de acierto con azar fijo: P = c + (1 − c)·L(θ − b).

   `c` es el piso de acierto por adivinanza (0,25 con cuatro alternativas), no
   un parámetro estimado — ver `universo.motor/default-guessing-c`. Con c = 0
   esta función es exactamente `probability-1pl`, que es lo que hace auditable
   el cambio: el modelo nuevo contiene al viejo."
  ([theta difficulty] (probability theta difficulty motor/default-guessing-c))
  ([theta difficulty c]
   (let [c (motor/guessing-c c)]
     (+ c (* (- 1.0 c) (probability-1pl theta difficulty))))))

;; El peso `w` de cada respuesta (ADR-014 Fase 1) entra en las dos derivadas:
;; una respuesta con w = 0 no aporta score ni información. Que aparezca también
;; en la segunda derivada es lo que hace que el SE suba al descartar evidencia
;; — ver universo.irt.effort. Sin `:weight`, w = 1.0 y el cálculo es idéntico
;; al previo a ADR-014.

;; Denominador P(1−P) que aparece en las dos derivadas. Cuando θ se aleja mucho
;; de `b`, P tiende a 1 y tanto el numerador como el denominador tienden a 0: el
;; límite existe y es finito, pero en coma flotante es 0/0. Por eso el piso.
(def ^:private ^:const min-variance 1e-12)

(defn- term
  "Numerador común de las dos derivadas para una respuesta: devuelve
   [dP, P, w] con dP = ∂P/∂θ = (1 − c)·L·(1 − L)."
  [theta response c]
  (let [difficulty (or (:difficulty response) 0.0)
        l          (probability-1pl theta difficulty)
        p          (+ c (* (- 1.0 c) l))
        dp         (* (- 1.0 c) l (- 1.0 l))
        w          (effort/weight-of response)]
    [dp p w]))

(defn first-derivative
  "Score de la log-verosimilitud: Σ w·(∂P/∂θ)·(observado − P)/(P·(1−P)).

   Con c = 0 la expresión se simplifica a Σ w·(observado − P), que es la fórmula
   1PL de siempre — el término de azar no altera el caso viejo, lo generaliza."
  ([theta responses] (first-derivative theta responses motor/default-guessing-c))
  ([theta responses c]
   (let [c (motor/guessing-c c)]
     (reduce
      (fn [sum response]
        (let [[dp p w] (term theta response c)
              observed (if (:correct? response) 1.0 0.0)
              var      (* p (- 1.0 p))]
          (if (< var min-variance)
            sum
            (+ sum (* w dp (/ (- observed p) var))))))
      0.0
      responses))))

(defn second-derivative
  "Hessiano de la log-verosimilitud, en su forma de **información esperada**:
   −Σ w·(∂P/∂θ)²/(P·(1−P)).

   Es información de Fisher con signo negativo, no la segunda derivada
   observada, y la diferencia importa: con c > 0 la verosimilitud **deja de ser
   log-cóncava**, así que el Hessiano observado puede salir positivo y
   Newton-Raphson daría un paso en la dirección equivocada. La información
   esperada es negativa siempre (Fisher scoring), y con c = 0 coincide con la
   segunda derivada observada de antes: −Σ w·P·(1−P).

   El peso `w` de ADR-014 sigue heredándose: una respuesta descartada por no
   esforzada no aporta información, así que el SE sube en vez de mentir."
  ([theta responses] (second-derivative theta responses motor/default-guessing-c))
  ([theta responses c]
   (let [c (motor/guessing-c c)]
     (reduce
      (fn [sum response]
        (let [[dp p w] (term theta response c)
              var      (* p (- 1.0 p))]
          (if (< var min-variance)
            sum
            (- sum (* w (/ (* dp dp) var))))))
      0.0
      responses))))

(defn map-first-derivative
  "Score MAP = verosimilitud + prior N(μ, σ²)."
  ([theta responses] (map-first-derivative theta responses motor/default-guessing-c prior-precision))
  ([theta responses c pp]
   (+ (first-derivative theta responses c)
      (* (- pp) (- theta prior-mean)))))

(defn map-second-derivative
  "Hessiano MAP = verosimilitud + (−1/σ²)."
  ([theta responses] (map-second-derivative theta responses motor/default-guessing-c prior-precision))
  ([theta responses c pp]
   (- (second-derivative theta responses c) pp)))

(defn newton-raphson-iteration
  "Una iteración Newton-Raphson sobre el posterior MAP.
   θ_nuevo = θ_actual - (f'(θ) / f''(θ))"
  ([theta responses] (newton-raphson-iteration theta responses motor/default-guessing-c prior-precision))
  ([theta responses c pp]
   (let [d1 (map-first-derivative theta responses c pp)
         d2 (map-second-derivative theta responses c pp)]
     (if (or (zero? d2) (js/isNaN d1) (js/isNaN d2))
       theta
       (- theta (/ d1 d2))))))

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
  "Estima θ con MAP (prior N(0, σ²), azar fijo c) + Newton-Raphson, partiendo
   del θ previo y limitando el paso entre ítems.

   Parámetros:
   - test: {:responses [...] :theta prev?}
           cada respuesta tiene :correct? y :difficulty
   - config (opcional): {:guessing-c c :prior-sd σ}, tal como viaja desde
     `test_configs`. Ausente = los valores de `universo.motor`.

   Itera **hasta convergencia**, no una sola vez. ADR-004 describía una
   iteración y listaba «iterar hasta convergencia» entre las alternativas
   descartadas; el código hace lo segundo desde antes de que nadie lo anotara
   (X-10). Se deja como está —converger al MAP es lo correcto— y ADR-034 pone
   el documento al día en vez de cambiar el código para que calce con él.

   Retorna θ en [-3, 3]."
  ([test] (calculate-theta test nil))
  ([test config]
   (let [responses (:responses test)
         prev-theta (or (:theta test) 0.0)
         c (motor/guessing-c (:guessing-c config))
         pp (motor/prior-precision (:prior-sd config))]
     (if (empty? responses)
       0.0
       (loop [theta          (double prev-theta)
              iteration      0
              max-iterations 20
              tolerance      0.001]
         (if (>= iteration max-iterations)
           (limit-theta-step prev-theta (clamp-theta theta))
           (let [new-theta (-> (newton-raphson-iteration theta responses c pp)
                               clamp-theta)
                 diff      (Math/abs (- new-theta theta))]
             (if (< diff tolerance)
               (limit-theta-step prev-theta new-theta)
               (recur new-theta
                      (inc iteration)
                      max-iterations
                      tolerance)))))))))

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
  "Enriquece respuestas con dificultad si falta y estima θ (usa :theta previo).

   El azar y el ancho del prior salen de `:stop-config`, que es el mismo mapa
   que ya viaja desde `test_configs` con `max-items` y el resto: una evaluación
   con otro número de alternativas o con un banco distinto puede querer los
   suyos sin tocar código."
  [test]
  (let [responses (:responses test)
        questions (:questions test)
        enriched-responses (if (every? :difficulty responses)
                             responses
                             (enrich-responses-with-difficulty responses questions))]
    (calculate-theta {:responses enriched-responses
                      :theta (:theta test)}
                     (:stop-config test))))

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
