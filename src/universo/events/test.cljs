(ns universo.events.test
  (:require
   [re-frame.core :as re-frame]
   [universo.components.tetha :as tetha]
   [cljs.core.async :refer [go <!]]
   [universo.db.crud :as crud]))

;; -----------------------------------------------------------------------------
;; 🔹 FUNCIÓN AUXILIAR: Normaliza la pregunta
;; -----------------------------------------------------------------------------

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
            :D (:error_d q)}
   :difficulty (:difficulty q)
   :position (:order_index q)})

;; -----------------------------------------------------------------------------
;; 🔹 FUNCIÓN AUXILIAR: Mapea label de UI → id de topic en Supabase
;; -----------------------------------------------------------------------------

(def topic-aliases
  {"Números"   "numbers_V1"
   "Numeros"   "numbers_V1"
   "números"   "numbers_V1"
   "numbers"   "numbers_V1"
   "numbers_V1" "numbers_V1"
   "Álgebra"   "algebra"
   "Algebra"   "algebra"
   "algebra"   "algebra"})

(defn resolve-topic
  "Normaliza el topic del test al identificador usado en Supabase."
  [topic]
  (or (get topic-aliases topic)
      topic
      "numbers_V1"))

;; -----------------------------------------------------------------------------
;; 🔹 EVENTO: Inicia el test
;; -----------------------------------------------------------------------------
;; - Reinicia el estado del test (limpia preguntas, respuestas, theta, etc.)
;; - Define el tema (por ejemplo: álgebra, geometría, etc.)
;; - Dispara el evento para obtener la primera pregunta

(re-frame/reg-event-fx
 :test/start
 (fn [{:keys [db]} [_ topic]]
   (let [resolved (resolve-topic topic)]
     {:db (-> db
              (assoc-in [:test :status] :intro)
              (assoc-in [:test :topic] resolved)
              (assoc-in [:test :responses] [])
              (assoc-in [:test :questions] [])
              (assoc-in [:test :feedback] nil)
              (assoc-in [:test :start-time] (.now js/Date))
              (assoc-in [:test :theta] -3.0)
              (assoc-in [:test :theta-history] [])
              (assoc-in [:test :current-question] nil))
      :dispatch [:test/fetch-next-question]})))

;; -----------------------------------------------------------------------------
;; 🔹 EFECTO: Obtiene la siguiente pregunta desde Supabase
;; -----------------------------------------------------------------------------
;; - Usa el valor actual de `theta` para estimar una dificultad objetivo.
;; - Consulta Supabase con un filtro (tema + dificultad).
;; - Filtra las preguntas que ya han sido respondidas.
;; - Cuando obtiene una pregunta, dispara el evento `:test/add-question`.


(re-frame/reg-fx
 :test/fetch-next-question
 (fn [{:keys [db]}]
   (go
     (let [theta (get-in db [:test :theta])
           topic (resolve-topic (get-in db [:test :topic]))
           answered-questions (get-in db [:test :questions])
           answered-ids (set (map :id answered-questions))
           _ (js/console.log "Theta actual:" theta)
           _ (js/console.log "Topic:" topic)
           _ (js/console.log "Preguntas ya respondidas:" answered-ids)

           result (<! (crud/get-table "questions"
                                      {"difficulty" [:between (- theta 0.5) (+ 0.5 theta)]
                                       "topic" topic}))]
       (if (:success result)
         (let [available-questions (filter
                                     #(not (contains? answered-ids (:id %)))
                                     (:data result))

               _ (js/console.log "Preguntas disponibles:" (count available-questions))

               next-q (when (seq available-questions)
                        (normalize-question (first available-questions)))]

           (if next-q
             (re-frame/dispatch [:test/add-question next-q])
             (do
               (js/console.log "⚠️ No hay más preguntas disponibles, finalizando test")
               (re-frame/dispatch [:test/complete]))))
         (js/console.error "❌ Error obteniendo pregunta:" result))))))

;; -----------------------------------------------------------------------------
;; 🔹 EVENTO: El feedback se le muestra al usuario
;; -----------------------------------------------------------------------------
;; -.
(re-frame/reg-event-db
 :test/show-feedback
 (fn [db [_ {:keys [question response]}]]
   (-> db
       (assoc-in [:test :feedback] {:question question
                                    :response response})
       (assoc-in [:test :status] :feedback))))



;; -----------------------------------------------------------------------------
;; 🔹 EVENTO: El usuario responde una pregunta
;; -----------------------------------------------------------------------------
;; - Registra la respuesta.
;; - Calcula un nuevo valor de `theta` (habilidad estimada).
;; - Guarda el nuevo valor en el historial.
;; - Dispara la obtención de la siguiente pregunta.
(re-frame/reg-event-fx
 :test/continue
 (fn [{:keys [db]} _]
   ;; Limpia current-question para mostrar loading mientras llega la siguiente
   {:db (-> db
            (assoc-in [:test :status] :questions)
            (assoc-in [:test :feedback] nil)
            (assoc-in [:test :current-question] nil))
    :dispatch [:test/fetch-next-question]}))

(re-frame/reg-event-fx
 :test/answer
 (fn [{:keys [db]} [_ {:keys [question-id selected correct? time-ms]}]]
   (let [questions (get-in db [:test :questions])
         question (some #(when (= (:id %) question-id) %) questions)
         new-response {:question-id question-id
                       :selected-option selected
                       :correct? correct?
                       :time-ms (or time-ms 0)
                       :difficulty (or (:difficulty question) 0.0)}
         updated-db (update-in db [:test :responses] conj new-response)
         ;; Usa IRT 1PL con dificultad del ítem (enrich automático de respaldo)
         new-theta (tetha/calculate-theta-auto (:test updated-db))
         _ (js/console.log "new-theta:" new-theta)]
     {:db (-> updated-db
              (assoc-in [:test :theta] new-theta)
              (update-in [:test :theta-history] conj new-theta))
      :dispatch [:test/show-feedback {:question question
                                      :response new-response}]})))


;; -----------------------------------------------------------------------------
;; 🔹 EVENTO: Agrega la nueva pregunta al test
;; -----------------------------------------------------------------------------
;; - Añade la pregunta a la lista.
;; - Actualiza el índice actual.

(re-frame/reg-event-db
 :test/add-question
 (fn [db [_ question]]
   (let [next-index (inc (count (get-in db [:test :questions])))]
     (-> db
         (update-in [:test :questions] conj question)
         (assoc-in [:test :current-question] next-index)))))


;; -----------------------------------------------------------------------------
;; 🔹 EVENTO: abre el questionario
;; -----------------------------------------------------------------------------
;; - cambia el estado a questions

(re-frame/reg-event-fx
 :test/question
 (fn [{:keys [db]} _]
   {:db (assoc-in db [:test :status] :questions)}))


;; -----------------------------------------------------------------------------
;; 🔹 EVENTO: Abre los resultados
;; -----------------------------------------------------------------------------
;; - cambia el estado a results


(re-frame/reg-event-fx
 :test/results
 (fn [{:keys [db]} _]
   {:db (assoc-in db [:test :status] :results)}))

;; -----------------------------------------------------------------------------
;; 🔹 EVENTO:
;; -----------------------------------------------------------------------------


(re-frame/reg-event-fx
 :test/fetch-next-question
 (fn [{:keys [db]} _]
   {:test/fetch-next-question {:db db}}))


;; -----------------------------------------------------------------------------
;; 🔹 EVENTO: Guarda el test en Supabase
;; -----------------------------------------------------------------------------
;; Este evento usa el efecto :save-test definido abajo

(re-frame/reg-event-fx
 :save-test
 (fn [_ [_ data]]
   {:save-test data}))

;; -----------------------------------------------------------------------------
;; 🔹 EFECTO: Guarda el test en Supabase
;; -----------------------------------------------------------------------------
;; - Usa tu función existente crud/insert-data-table!
;; - Registra logs en consola (se puede extender con notificaciones)(est
 (re-frame/reg-fx
  :save-test                                   ; nombre del efecto
  (fn [data]                                   ; data = mapa con los datos del test
    (go
      (let [result (<! (crud/insert-data-table! data "tests"))]
        (if (:success result)
          (js/console.log "✅ Test guardado exitosamente:" (clj->js (:data result)))
          (js/console.error "❌ Error al guardar test:"  (clj->js (:error result))))))))


;; -----------------------------------------------------------------------------
;; 🔹 EVENTO: Finaliza el test
;; -----------------------------------------------------------------------------
;; - Cambia el estado a :completed
;; - Guarda los resultados en Supabase mediante el evento :save-test

(re-frame/reg-event-fx
 :test/complete
 (fn [{:keys [db]} _]
   (let [email-user (get-in db [:visitor :email])
         new-db     (-> db
                        (assoc-in [:test :status]    :completed)
                        (assoc-in [:test :end-time] (.now js/Date)))
         test       (:test new-db)]
     {:db       new-db
      :dispatch-n [[:save-test {:test test :email-user email-user}]
                   [:dashboard/consultar email-user]]})))

;; -----------------------------------------------------------------------------
;; 🔹 SUSCRIPCIONES
;; -----------------------------------------------------------------------------
;; - Para acceder fácilmente al estado del test desde los componentes UI

(re-frame/reg-sub :test/status (fn [db _] (get-in db [:test :status])))
(re-frame/reg-sub :test/feedback (fn [db _] (get-in db [:test :feedback])))
(re-frame/reg-sub :test/topic (fn [db _] (get-in db [:test :topic])))
(re-frame/reg-sub :test/theta (fn [db _] (get-in db [:test :theta])))
(re-frame/reg-sub :test/questions (fn [db _] (get-in db [:test :questions])))
(re-frame/reg-sub :test/answers (fn [db _] (get-in db [:test :responses])))
(re-frame/reg-sub :test/current-question
                  (fn [db _]
                    (let [qid (get-in db [:test :current-question])
                          questions (get-in db [:test :questions])]
                      (when (and qid (pos? qid))
                        (nth questions (dec qid) nil)))))
