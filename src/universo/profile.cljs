(ns universo.profile
  "Funciones puras: responses + questions → perfil de aprendizaje."
  (:require [clojure.string :as str]))

(def topic->module-slug
  {"numbers_V1" "aritmetica/numeros"
   "numeros" "aritmetica/numeros"
   "Números" "aritmetica/numeros"
   "enteros" "aritmetica/enteros"
   "fracciones" "aritmetica/fracciones"
   "potencias" "aritmetica/potencias"
   "algebra" "algebra/ecuaciones"
   "Álgebra" "algebra/ecuaciones"
   "geometria" "geometria/basica"
   "Geometría" "geometria/basica"})

(def topic->track
  {"numbers_V1" "aritmetica"
   "numeros" "aritmetica"
   "Números" "aritmetica"
   "enteros" "aritmetica"
   "fracciones" "aritmetica"
   "potencias" "aritmetica"
   "algebra" "algebra"
   "Álgebra" "algebra"
   "geometria" "geometria"
   "Geometría" "geometria"})

(defn theta-band
  "Banda de cupo a partir de θ continuo."
  [theta]
  (let [t (double (or theta 0.0))]
    (cond
      (>= t 2.0) "avanzado"
      (>= t 1.0) "intermedio"
      (>= t 0.0) "basico"
      :else "inicial")))

(defn band-label
  [band]
  (case band
    "avanzado" "Avanzado"
    "intermedio" "Intermedio"
    "basico" "Básico"
    "inicial" "Inicial"
    (or band "—")))

(defn- question-index
  [questions]
  (into {} (map (juxt :id identity) (or questions []))))

(defn- module-slug-for
  [question topic]
  (or (:module-slug question)
      (when-let [slug (:module_slug question)] slug)
      (get topic->module-slug (or (:topic question) topic))
      (get topic->module-slug topic)
      (str "unknown/" (or (:topic question) topic "general"))))

(defn- selected-key
  [selected]
  (cond
    (keyword? selected) selected
    (string? selected) (keyword selected)
    :else nil))

(defn- misconception-from
  [question response]
  (when (and question response (not (:correct? response)))
    (let [sel (selected-key (:selected-option response))
          explanation (or (:selected-error response)
                          (get-in question [:errors sel])
                          (get question (keyword (str "error_"
                                                      (when sel
                                                        (.toLowerCase (name sel)))))))]
      (when (or explanation sel)
        {:question-id (:id question)
         :question-text (:question question)
         :selected (when sel (name sel))
         :module-slug (module-slug-for question (:topic question))
         :explanation explanation}))))

(defn deficits-from-responses
  "Agrupa errores por module-slug. Orden: más errores primero."
  [responses questions topic]
  (let [qidx (question-index questions)
        tallies
        (reduce
         (fn [acc r]
           (let [q (get qidx (:question-id r))
                 slug (or (:module-slug r)
                          (module-slug-for q (or (:topic r) topic)))
                 prev (get acc slug {:module-slug slug :errors 0 :total 0})]
             (assoc acc slug
                    (-> prev
                        (update :total inc)
                        (cond-> (not (:correct? r)) (update :errors inc))))))
         {}
         (or responses []))]
    (->> tallies
         vals
         (filter #(pos? (:errors %)))
         (sort-by (fn [{:keys [errors total]}]
                    (- (/ (double errors) (max 1 total)))))
         vec)))

(defn misconceptions-from
  [responses questions]
  (let [qidx (question-index questions)]
    (->> responses
         (keep (fn [r]
                 (misconception-from (get qidx (:question-id r)) r)))
         vec)))

(defn dominant-track
  [topic deficits]
  (or (get topic->track topic)
      (when-let [slug (:module-slug (first deficits))]
        (first (str/split slug #"/")))
      "aritmetica"))

(defn build
  "Construye perfil de aprendizaje a partir del estado del test.

  opts:
  - :theta
  - :se (opcional)
  - :topic
  - :responses
  - :questions
  - :theta-history (opcional, para estabilidad)"
  [{:keys [theta se topic responses questions theta-history]}]
  (let [deficits (deficits-from-responses responses questions topic)
        misconceptions (misconceptions-from responses questions)
        band (theta-band theta)
        track (dominant-track topic deficits)
        history (vec (or theta-history []))
        stability (when (>= (count history) 3)
                    (let [tail (take-last 3 history)
                          mean (/ (reduce + tail) 3.0)
                          var (/ (reduce + (map #(Math/pow (- % mean) 2) tail)) 3.0)]
                      {:theta-variance var
                       :stable? (< var 0.15)}))]
    {:theta (when (number? theta) (double theta))
     :se (when (number? se) (double se))
     :theta-band band
     :track track
     :topic topic
     :deficits deficits
     :misconceptions misconceptions
     :stability stability}))
