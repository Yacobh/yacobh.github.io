(ns universo.profile
  "Funciones puras: responses + questions → perfil de aprendizaje."
  (:require [clojure.string :as str]
            [universo.irt.fluency :as fluency]
            [universo.topics :as topics]))

;; El mapeo topic → módulo vivía acá como dos tablas literales que había que
;; ampliar con cada variante de escritura ("algebra", "Álgebra", …). Desde
;; T-51 vive en `universo.topics`, que normaliza el topic antes de buscarlo:
;; las variantes por acento o mayúscula dejan de necesitar una entrada propia.

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
      (topics/module-slug-for (or (:topic question) topic))
      (topics/module-slug-for topic)
      ;; `unknown/…` es a propósito visible: marca en el perfil los ítems que
      ;; no se pudieron atribuir a un módulo (bancos mezclados como
      ;; `diagnostico`, o topics sin mapeo). Se normaliza para no generar dos
      ;; huecos distintos por el mismo banco mal escrito.
      (str "unknown/" (or (topics/normalize (:topic question))
                          (topics/normalize topic)
                          "general"))))

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
  (or (topics/track-for topic)
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
        fluencia (fluency/classify responses)
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
     :stability stability
     ;; Eje 2 de VISION §3.3. Aditivo: quien no lo lea sigue viendo el mismo
     ;; perfil de antes, y los perfiles ya guardados en `student_profiles.profile`
     ;; simplemente no traen estas claves. **No se recalcula hacia atrás**, por
     ;; el mismo criterio de ADR-014: no reinterpretar lo que ya se le mostró a
     ;; alguien.
     :fluency fluencia
     ;; El cruce θ × λ. nil mientras falte cualquiera de los dos ejes, que es
     ;; lo habitual en un diagnóstico corto: sin banda de fluidez no hay
     ;; cuadrante, y sin cuadrante la UI no muestra nada. Preferimos callar.
     :fluency-profile (fluency/profile-for band (:band fluencia))}))
