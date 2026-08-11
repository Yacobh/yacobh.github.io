(ns universo.irt.effort
  "Filtro de respuestas no esforzadas — Fase 1 de ADR-014.

   El único punto donde el tiempo de respuesta entra legítimamente en la
   estimación de θ es *descartar evidencia que no es evidencia*: una respuesta
   emitida en menos tiempo del que toma leer el enunciado no informa sobre
   habilidad, es una moneda al aire, e incluirla corrompe θ (Wise & Kong,
   response time effort).

   Este namespace decide un **peso** por respuesta (1.0 = cuenta, 0.0 = se
   descarta). El peso lo consumen `universo.components.tetha` (verosimilitud)
   y, por herencia, `universo.irt.progress/fisher-information` — de modo que
   descartar una respuesta también le quita información al SE. Si el peso
   entrara solo en la verosimilitud, el SE mentiría: diría que hay más
   precisión de la que realmente se midió.

   Propiedad emergente buscada: menos evidencia válida ⇒ SE más alto ⇒ la
   regla de parada `SE ≤ umbral` le hace más preguntas a quien responde al
   azar. El riesgo de test infinito ya está acotado por `max_items` y
   `max_minutes` (ADR-013)."
  (:require [clojure.string :as str]))

;; Piso por defecto en segundos, usado cuando el banco no configura el suyo
;; (`test_configs.min_response_seconds`). Coincide con el default de la columna
;; en 032_min_response_seconds_calibrado.sql: son dos caras del mismo número y
;; hay que moverlas juntas.
;;
;; **2.0 y no 3.0 porque lo dijeron los datos, no el autor** (2026-08-10). Al
;; aplicar el umbral retroactivamente a las 195 respuestas con tiempo real del
;; histórico, barriendo el piso de 0 a 10 s, la tasa de acierto de las
;; respuestas DESCARTADAS es: 18 % con piso 0, 21 % con 1, 27 % con 2, **34 %
;; con 3**, 42 % con 4. Con cuatro alternativas, adivinar da 25 %: mientras las
;; descartadas aciertan cerca de ese 25 % se está tirando ruido, y en cuanto
;; suben claramente por encima se está tirando conocimiento. El 3 autoral ya
;; estaba del lado equivocado de esa línea. Ver T-59.
(def default-min-response-seconds 2.0)

;; Caracteres por segundo de lectura. El texto matemático se lee más lento que
;; la prosa (un estudiante no "lee" 3/4 + 2/5, lo procesa), así que 20 c/s es
;; deliberadamente generoso: buscamos descartar solo lo absurdo, no medir
;; velocidad de lectura.
(def chars-per-second 20.0)

(def full-weight 1.0)
(def discarded-weight 0.0)

(defn reading-seconds
  "Segundos mínimos plausibles para leer un enunciado, por su largo."
  [question-text]
  (let [n (count (str/trim (or question-text "")))]
    (/ (double n) chars-per-second)))

(defn min-response-seconds
  "Umbral de esfuerzo para un ítem: `max(piso configurado, largo / 20)`.

   El piso cubre los enunciados cortos (`¿Cuánto es 2+2?` se lee en 0,7 s pero
   responder aún exige pensar); la parte proporcional cubre los largos."
  ([question-text]
   (min-response-seconds question-text default-min-response-seconds))
  ([question-text floor-seconds]
   (let [floor (double (or floor-seconds default-min-response-seconds))]
     ;; El 0.0 acota un piso negativo mal configurado; el check de la columna
     ;; ya lo impide en la base, pero acá llega también config vieja o de un
     ;; app-db manipulado.
     (max floor 0.0 (reading-seconds question-text)))))

(defn measured-ms
  "El `:time-ms` de una respuesta, o nil si no es una medición utilizable.

   `events/test.cljs` persiste `(or time-ms 0)` y la UI manda 0 cuando el
   cronómetro no llegó a arrancar (`diagnostic_test.cljs`), así que 0 es el
   centinela de *no medido*, no de 'respondió instantáneamente'. Un click real
   siempre tarda algo. Descartar una respuesta por un 0 que significa 'no sé
   cuánto tardó' sería tirar evidencia válida por un defecto de medición —
   justo lo contrario de lo que este filtro busca. Lo mismo para tiempos
   negativos, que solo pueden venir de un reloj corrido."
  [response]
  (let [t (:time-ms response)]
    (when (and (number? t) (pos? t))
      (double t))))

(defn response-weight
  "Peso de una respuesta: 1.0 si es esforzada o no se puede juzgar, 0.0 si se
   emitió por debajo del umbral de su enunciado.

   Ante la duda (sin tiempo medido) se conserva la respuesta: el costo de
   descartar evidencia buena es mayor que el de conservar una dudosa, porque
   descartar de más sesga θ sin dejar rastro."
  ([response]
   (response-weight response default-min-response-seconds))
  ([response floor-seconds]
   (if-let [ms (measured-ms response)]
     (let [threshold-ms (* 1000.0 (min-response-seconds (:question-text response)
                                                        floor-seconds))]
       (if (< ms threshold-ms) discarded-weight full-weight))
     full-weight)))

(defn weigh-response
  "Añade `:weight` a la respuesta. Se calcula una sola vez, al registrarla, y
   viaja dentro de `tests.test` (JSONB): así el peso queda auditable junto a la
   respuesta que lo produjo, y recalibrar el umbral más adelante (Fase 2) no
   reescribe la historia — se puede recomputar sobre `:time-ms`, que también
   está guardado."
  ([response]
   (weigh-response response default-min-response-seconds))
  ([response floor-seconds]
   (assoc response :weight (response-weight response floor-seconds))))

(defn weight-of
  "Peso ya calculado de una respuesta. 1.0 si no lo trae: las respuestas
   anteriores a ADR-014 no tienen `:weight` y deben seguir contando como
   siempre — este filtro no reinterpreta retroactivamente lo ya medido."
  [response]
  (let [w (:weight response)]
    (if (number? w) (double w) full-weight)))

(defn discarded-count
  "Cuántas respuestas fueron descartadas por falta de esfuerzo."
  [responses]
  (count (filter #(zero? (weight-of %)) (or responses []))))
