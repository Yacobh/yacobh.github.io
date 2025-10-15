(ns universo.test-subs
  (:require
   [re-frame.core :as re-frame]))

(defn normalize-question [q]
  {:id (:id q)
   :question (:question q)
   :options [{:value "A" :label (:option_a q)}
             {:value "B" :label (:option_b q)}
             {:value "C" :label (:option_c q)}
             {:value "D" :label (:option_d q)}]
   :correct-option (:correct_option q)
   :errors {:A (:error_a q)
            :B (:error_b q)
            :C (:error_c q)
            :D (:error_d q)}})

(re-frame/reg-sub
 :current-question-response
 :<- [:current-question] ; Índice de la pregunta actual (0, 1, 2...)
 :<- [:questions]        ; Todas las preguntas
 :<- [:responses]        ; Todas las respuestas guardadas

 (fn [[current-q-idx questions responses] _]
   (let [;; Asegurarse de que el índice es válido antes de acceder a la pregunta
         q-data (when (and questions (<= 0 current-q-idx (dec (count questions))))
                  ;; Asumimos que normalize-question es una función que existe
                  ;; y devuelve un mapa con la clave :id de la pregunta.
                  (normalize-question (nth questions current-q-idx)))
         current-q-id (:id q-data)] ; El ID real de la pregunta (e.g., :q1, :q2)

     ;; Buscar en las respuestas si ya existe una para esta pregunta
     (when current-q-id
       (last (filter #(= (:question-id %) current-q-id) responses))))))

(re-frame/reg-sub
 :current-question-selected-option
 :<- [:current-question-response]
 (fn [response _]
   (:selected-option response)))

(re-frame/reg-sub
 :questions
 (fn [db _]
   (get-in db [:test :questions])))

(re-frame/reg-sub
 :test
 (fn [db _]
   (:test db)))

(re-frame/reg-sub
 :test-status
 (fn [db _]
   (get-in db [:test :status])))

(re-frame/reg-sub
 :current-question
 (fn [db _]
   (get-in db [:test :current-question])))

(re-frame/reg-sub
 :responses
 (fn [db _]
   (get-in db [:test :responses])))

(re-frame/reg-sub
 :start-time
 (fn [db _]
   (get-in db [:test :start-time])))


;; Iniciar test
(re-frame/reg-event-db
 :test/start
 (fn [db [_ question-ids topic]]
   (-> db
       (assoc-in [:test :question-ids] question-ids)
       (assoc-in [:test :topic] topic)
       (assoc-in [:test :status] :in-progress)
       (assoc-in [:test :responses] [])
       (assoc-in [:test :start-time] (.now js/Date))
       (assoc-in [:test :end-time] nil)
       (assoc-in [:test :theta] 0.0)
       (assoc-in [:test :theta-history] []))))

;; Registrar respuesta
(re-frame/reg-event-db
 :test/answer
 (fn [db [_ {:keys [question-id selected correct? time-ms difficulty error]}]]
   (let [resp {:question-id question-id
               :selected-option selected
               :correct? correct?
               :time-ms time-ms
               :error error}
         path [:test :responses]
         score  (get-in db [:test :score])
         new-score (if correct? (+ difficulty score) score)
         _ (js/console.log "new-score: " new-score)
         responses (get-in db path)
         existing-idx (->> responses
                           (map-indexed vector)
                           (some (fn [[i r]] (when (= (:question-id r) question-id) i))))]
     (assoc-in (if (some? existing-idx)
                 (assoc-in db (conj path existing-idx) resp)
                 (update-in db path conj resp))
               [:test :score] new-score))))

#_(re-frame/reg-event-db
 :test/answer
 (fn [db [_ {:keys [question-id selected correct? time-ms]}]]
   (let [resp {:question-id question-id
               :selected-option selected
               :correct? correct?
               :time-ms time-ms}]
     (update-in (update-in db [:test :responses] conj resp)
                [:test :current-question] inc))))

(re-frame/reg-event-db
 :test/goto
 (fn [db [_ idx]]
   (let [n (count (get-in db [:test :questions]))
         idx' (-> idx (max 0) (min (max 0 (dec n))))]
     (assoc-in db [:test :current-question] idx'))))

(re-frame/reg-event-db
 :test/prev
 (fn [db _]
   (update-in db [:test :current-question]
              (fn [i] (max 0 (dec (or i 0)))))))

(re-frame/reg-event-db
 :test/next
 (fn [db _]
   (let [n (count (get-in db [:test :questions]))]
     (update-in db [:test :current-question]
                (fn [i] (min (max 0 (dec n)) (inc (or i 0))))))))

(re-frame/reg-event-db
 :test/finish
 (fn [db _]
   (-> db
       (assoc-in [:test :status] :completed)
       (assoc-in [:test :end-time] (.now js/Date)))))

;; Finalizar test
#_(re-frame/reg-event-db
 :test/finish
 (fn [db _]
   (assoc-in db [:test :status] :completed
                [:test :end-time] (.now js/Date))))

(re-frame/reg-event-db
 :set-questions
 (fn [db [_ questions]]
   (assoc-in db [:test :questions] questions)))
