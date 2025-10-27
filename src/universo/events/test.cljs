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
;; 🔹 FUNCIÓN AUXILIAR: Calcula el nuevo theta
;; -----------------------------------------------------------------------------
;; Esto puede crecer más adelante, pero por ahora se usa una estimación simple.

(defn calculate-theta [test]
  (let [responses (:responses test)
        total (count responses)
        corrects (count (filter :correct? responses))]
    (if (zero? total)
      0.0
      ;; Escala de -1 a +1 según proporción de aciertos
      (- (* 2 (/ corrects total)) 1))))



;; -----------------------------------------------------------------------------
;; 🔹 EVENTO: Inicia el test
;; -----------------------------------------------------------------------------
;; - Reinicia el estado del test (limpia preguntas, respuestas, theta, etc.)
;; - Define el tema (por ejemplo: álgebra, geometría, etc.)
;; - Dispara el evento para obtener la primera pregunta

(re-frame/reg-event-fx
 :test/start
 (fn [{:keys [db]} [_ topic]]
   {:db (-> db
            (assoc-in [:test :status] :intro)
            (assoc-in [:test :topic] topic)
            (assoc-in [:test :responses] [])
            (assoc-in [:test :questions] [])
            (assoc-in [:test :theta] -3.0)
            (assoc-in [:test :theta-history] [])
            (assoc-in [:test :current-question] 0))
    :dispatch [:test/fetch-next-question]}))


;; -----------------------------------------------------------------------------
;; 🔹 EFECTO: Obtiene la siguiente pregunta desde Supabase
;; -----------------------------------------------------------------------------
;; - Usa el valor actual de `theta` para estimar una dificultad objetivo.
;; - Consulta Supabase con un filtro (tema + dificultad).
;; - Filtra las preguntas que ya han sido respondidas.
;; - Cuando obtiene una pregunta, dispara el evento `:test/add-question`.

(re-frame/reg-fx
 :test/fetch-next-question
 (fn [_]
   (go
     (let [theta @(re-frame/subscribe [:test/theta])
           ;; Obtener las preguntas ya realizadas
           answered-questions @(re-frame/subscribe [:test/questions])
           ;; Extraer los IDs de las preguntas ya respondidas
           answered-ids (set (map :id answered-questions))

           _ (js/console.log "Theta actual:" theta)
           _ (js/console.log "Preguntas ya respondidas:" answered-ids)

           ;; Consultar Supabase
           result (<! (crud/get-table "questions"
                                      {"difficulty" [:between (- theta 0.5 ) (+ 0.5 theta)]
                                       "topic" "diagnostico"}))]
       (if (:success result)
         (let [;; Filtrar preguntas que NO han sido respondidas
               available-questions (filter
                                     #(not (contains? answered-ids (:id %)))
                                     (:data result))

               _ (js/console.log "Preguntas disponibles:" (count available-questions))

               ;; Seleccionar una pregunta (puedes aleatorizar aquí)
               next-q (when (seq available-questions)
                        (normalize-question (first available-questions)))]

           (if next-q
             (re-frame/dispatch [:test/add-question next-q])
             (do
               (js/console.log "⚠️ No hay más preguntas disponibles, finalizando test")
               (re-frame/dispatch [:test/complete]))))
         (js/console.error "❌ Error obteniendo pregunta:" result))))))

;; -----------------------------------------------------------------------------
;; 🔹 EVENTO: El usuario responde una pregunta
;; -----------------------------------------------------------------------------
;; - Registra la respuesta.
;; - Calcula un nuevo valor de `theta` (habilidad estimada).
;; - Guarda el nuevo valor en el historial.
;; - Dispara la obtención de la siguiente pregunta.

(re-frame/reg-event-fx
 :test/answer
 (fn [{:keys [db]} [_ {:keys [question-id selected correct? time-ms]}]]
   (let [new-response {:question-id question-id
                       :selected-option selected
                       :correct? correct?
                       :time-ms time-ms}
         updated-db (update-in db [:test :responses] conj new-response)
         new-theta (tetha/calculate-theta (:test updated-db))
         _ (js/console.log "new-theta: " new-theta)]
     {:db (-> updated-db
              (assoc-in [:test :theta] new-theta)
              (update-in [:test :theta-history] conj new-theta))
      :dispatch [:test/fetch-next-question]})))


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
 :test/open
 (fn [{:keys [db]} _]
   {:db (assoc-in db [:test :status] :questions)}))


;; -----------------------------------------------------------------------------
;; 🔹 EVENTO: Abre los resultados
;; -----------------------------------------------------------------------------
;; - cambia el estado a questions


(re-frame/reg-event-fx
 :test/results
 (fn [{:keys [db]} _]
   {:db (assoc-in db [:test :status] :results)}))

;; -----------------------------------------------------------------------------
;; 🔹 EVENTO:
;; -----------------------------------------------------------------------------


(re-frame/reg-event-fx
 :test/fetch-next-question
 (fn [_ _]
   {:test/fetch-next-question nil}))


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
   (let [test (:test db)
         email-user (get-in db [:visitor :email])]
     {:db (assoc-in db [:test :status] :completed)
      :dispatch [:save-test {:test test :email-user email-user}]})))

;; -----------------------------------------------------------------------------
;; 🔹 SUSCRIPCIONES
;; -----------------------------------------------------------------------------
;; - Para acceder fácilmente al estado del test desde los componentes UI

(re-frame/reg-sub :test/status (fn [db _] (get-in db [:test :status])))
(re-frame/reg-sub :test/topic (fn [db _] (get-in db [:test :topic])))
(re-frame/reg-sub :test/theta (fn [db _] (get-in db [:test :theta])))
(re-frame/reg-sub :test/questions (fn [db _] (get-in db [:test :questions])))
(re-frame/reg-sub :test/answers (fn [db _] (get-in db [:test :responses])))
(re-frame/reg-sub :test/current-question
                  (fn [db _]
                    (let [qid (get-in db [:test :current-question])
                          questions (get-in db [:test :questions])]
                      (nth questions (dec qid) nil))))
