(ns universo.events.test
  (:require
   [re-frame.core :as re-frame]
   [universo.components.tetha :as tetha]
   [universo.irt.progress :as progress]
   [cljs.core.async :as async :refer [go <!]]
   [universo.db.crud :as crud]
   [universo.supabase :as sb]))

;; -----------------------------------------------------------------------------
;; 🔹 FUNCIÓN AUXILIAR: Normaliza la pregunta
;; -----------------------------------------------------------------------------

(defn normalize-question [q]
  (let [module-join (:modules q)
        module-slug (or (:module_slug q)
                        (:slug module-join)
                        (get-in q [:modules :slug]))]
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
     :position (:order_index q)
     :topic (:topic q)
     :module-id (or (:module_id q) (:module-id module-join))
     :module-slug module-slug}))

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
;; 🔹 EVENTO: Abre la selección de evaluaciones (topics desde Supabase)
;; -----------------------------------------------------------------------------

(re-frame/reg-event-fx
 :test/open-selection
 (fn [{:keys [db]} _]
   {:db (-> db
            (assoc-in [:test :status] :select)
            (assoc-in [:test :topics-loading?] true)
            (assoc-in [:test :topics-error] nil)
            (assoc-in [:test :available-topics] [])
            (assoc-in [:test :feedback] nil))
    :dispatch [:test/load-topics]}))

(re-frame/reg-fx
 :test/fetch-topics
 (fn [_]
   (go
     (let [result (<! (crud/get-distinct-topics))]
       (if (:success result)
         (re-frame/dispatch [:test/topics-loaded (:data result)])
         (re-frame/dispatch [:test/topics-failed
                             (or (:error result) "No se pudieron cargar las evaluaciones")]))))))

(re-frame/reg-event-fx
 :test/load-topics
 (fn [{:keys [db]} _]
   {:db (-> db
            (assoc-in [:test :topics-loading?] true)
            (assoc-in [:test :topics-error] nil))
    :test/fetch-topics nil}))

(re-frame/reg-event-db
 :test/topics-loaded
 (fn [db [_ topics]]
   (-> db
       (assoc-in [:test :available-topics] (vec topics))
       (assoc-in [:test :topics-loading?] false)
       (assoc-in [:test :topics-error] nil))))

(re-frame/reg-event-db
 :test/topics-failed
 (fn [db [_ message]]
   (-> db
       (assoc-in [:test :available-topics] [])
       (assoc-in [:test :topics-loading?] false)
       (assoc-in [:test :topics-error] message))))

;; -----------------------------------------------------------------------------
;; 🔹 EVENTO: Inicia el test
;; -----------------------------------------------------------------------------
;; - Reinicia el estado del test (limpia preguntas, respuestas, theta, etc.)
;; - Define el tema (topic de Supabase)
;; - Dispara el evento para obtener la primera pregunta

(re-frame/reg-event-fx
 :test/start
 (fn [{:keys [db]} [_ topic]]
   (let [resolved (resolve-topic topic)]
     {:db (-> db
              (assoc-in [:test :status] :questions)
              (assoc-in [:test :topic] resolved)
              (assoc-in [:test :responses] [])
              (assoc-in [:test :questions] [])
              (assoc-in [:test :feedback] nil)
              (assoc-in [:test :prefetched-question] nil)
              (assoc-in [:test :prefetching?] false)
              (assoc-in [:test :start-time] (.now js/Date))
              (assoc-in [:test :theta] 0.0)
              (assoc-in [:test :theta-history] [])
              (assoc-in [:test :stop-reason] nil)
              (assoc-in [:test :current-question] nil))
      :dispatch [:test/fetch-next-question]})))

;; -----------------------------------------------------------------------------
;; 🔹 EFECTO: Obtiene la siguiente pregunta desde Supabase
;; -----------------------------------------------------------------------------
;; mode :immediate → instala la pregunta (inicio del test)
;; mode :prefetch  → la guarda para al Continuar (mientras hay feedback)

(defn- fetch-candidates
  "Preguntas del topic en [θ−w, θ+w] aún no respondidas."
  [theta topic answered-ids half-width]
  (go
    (let [ch (async/chan)
          lo (- theta half-width)
          hi (+ theta half-width)]
      (-> (.from sb/supabase-client "questions")
          (.select "*, modules(slug, title, track)")
          (.eq "topic" topic)
          (.gte "difficulty" lo)
          (.lte "difficulty" hi)
          (.then (fn [result]
                   (if (.-error result)
                     (async/put! ch {:success false :error (.-message (.-error result))})
                     (async/put! ch {:success true
                                     :data (js->clj (.-data result) :keywordize-keys true)}))))
          (.catch (fn [error]
                    (async/put! ch {:success false :error (.-message error)}))))
      (let [result (<! ch)]
        (if (:success result)
          (->> (:data result)
               (filter #(not (contains? answered-ids (:id %))))
               vec)
          (do
            (js/console.error "❌ Error obteniendo pregunta:" result)
            :error))))))

(re-frame/reg-fx
 :test/fetch-next-question
 (fn [{:keys [db mode]}]
   (let [mode (or mode :immediate)]
     (go
       (let [theta (get-in db [:test :theta])
             topic (resolve-topic (get-in db [:test :topic]))
             answered-questions (get-in db [:test :questions])
             answered-ids (set (map :id answered-questions))
             _ (js/console.log "Theta actual:" theta)
             _ (js/console.log "Topic:" topic)
             _ (js/console.log "Fetch mode:" (name mode))
             narrow (<! (fetch-candidates theta topic answered-ids
                                          progress/selection-half-width))
             candidates (cond
                          (= narrow :error) :error
                          (seq narrow) narrow
                          :else (<! (fetch-candidates theta topic answered-ids
                                                      progress/selection-half-width-wide)))]
         (cond
           (= candidates :error)
           (when (= mode :prefetch)
             (re-frame/dispatch [:test/prefetch-exhausted]))

           :else
           (let [next-q (some-> (progress/closest-question theta candidates)
                                normalize-question)]
             (if next-q
               (if (= mode :prefetch)
                 (re-frame/dispatch [:test/prefetch-ready next-q])
                 (re-frame/dispatch [:test/add-question next-q]))
               (if (= mode :prefetch)
                 (re-frame/dispatch [:test/prefetch-exhausted])
                 (do
                   (js/console.log "⚠️ No hay más preguntas, finalizando test")
                   (re-frame/dispatch [:test/bank-exhausted])))))))))))

;; -----------------------------------------------------------------------------
;; Prefetch: carga la siguiente pregunta en paralelo al feedback
;; -----------------------------------------------------------------------------

(re-frame/reg-event-fx
 :test/prefetch-next
 (fn [{:keys [db]} _]
   {:db (-> db
            (assoc-in [:test :prefetching?] true)
            (assoc-in [:test :prefetched-question] nil))
    :test/fetch-next-question {:db db :mode :prefetch}}))

(defn- install-question
  "Añade la pregunta al test y la marca como actual."
  [db question]
  (let [next-index (inc (count (get-in db [:test :questions])))]
    (-> db
        (update-in [:test :questions] conj question)
        (assoc-in [:test :current-question] next-index)
        (assoc-in [:test :prefetched-question] nil)
        (assoc-in [:test :prefetching?] false))))

(re-frame/reg-event-db
 :test/prefetch-ready
 (fn [db [_ question]]
   (if (= (get-in db [:test :status]) :questions)
     ;; El usuario ya pulsó Continuar: mostrar de inmediato
     (install-question db question)
     ;; Aún en feedback: aparcar hasta Continuar
     (-> db
         (assoc-in [:test :prefetched-question] question)
         (assoc-in [:test :prefetching?] false)))))

(re-frame/reg-event-fx
 :test/bank-exhausted
 (fn [{:keys [db]} _]
   {:db (assoc-in db [:test :stop-reason] :exhausted)
    :dispatch [:test/complete]}))

(re-frame/reg-event-fx
 :test/prefetch-exhausted
 (fn [{:keys [db]} _]
   (if (= (get-in db [:test :status]) :questions)
     {:db (-> db
              (assoc-in [:test :prefetching?] false)
              (assoc-in [:test :stop-reason] :exhausted))
      :dispatch [:test/complete]}
     {:db (-> db
              (assoc-in [:test :prefetched-question] :exhausted)
              (assoc-in [:test :prefetching?] false)
              (assoc-in [:test :stop-reason] :exhausted))})))

;; -----------------------------------------------------------------------------
;; 🔹 EVENTO: El feedback se le muestra al usuario
;; -----------------------------------------------------------------------------

(re-frame/reg-event-db
 :test/show-feedback
 (fn [db [_ {:keys [question response]}]]
   (-> db
       (assoc-in [:test :feedback] {:question question
                                    :response response})
       (assoc-in [:test :status] :feedback))))

;; -----------------------------------------------------------------------------
;; 🔹 Continuar: usa la pregunta prefetched si ya llegó
;; -----------------------------------------------------------------------------

(re-frame/reg-event-fx
 :test/continue
 (fn [{:keys [db]} _]
   (let [prefetched (get-in db [:test :prefetched-question])
         prefetching? (get-in db [:test :prefetching?])
         stop-reason (get-in db [:test :stop-reason])]
     (cond
       (some? stop-reason)
       {:db (-> db
                (assoc-in [:test :feedback] nil)
                (assoc-in [:test :prefetched-question] nil)
                (assoc-in [:test :prefetching?] false))
        :dispatch [:test/complete]}

       (= prefetched :exhausted)
       {:db (-> db
                (assoc-in [:test :feedback] nil)
                (assoc-in [:test :prefetched-question] nil)
                (assoc-in [:test :stop-reason] :exhausted))
        :dispatch [:test/complete]}

       (map? prefetched)
       {:db (-> (install-question db prefetched)
                (assoc-in [:test :status] :questions)
                (assoc-in [:test :feedback] nil))}

       prefetching?
       ;; Prefetch en vuelo: ir a questions; al llegar :test/prefetch-ready la instala
       {:db (-> db
                (assoc-in [:test :status] :questions)
                (assoc-in [:test :feedback] nil)
                (assoc-in [:test :current-question] nil))}

       :else
       ;; Sin prefetch (fallback): pedir ahora
       {:db (-> db
                (assoc-in [:test :status] :questions)
                (assoc-in [:test :feedback] nil)
                (assoc-in [:test :current-question] nil))
        :dispatch [:test/fetch-next-question]}))))

(re-frame/reg-event-fx
 :test/answer
 (fn [{:keys [db]} [_ {:keys [question-id selected correct? time-ms]}]]
   (let [questions (get-in db [:test :questions])
         question (some #(when (= (:id %) question-id) %) questions)
         sel-key (when selected (keyword selected))
         new-response {:question-id question-id
                       :selected-option selected
                       :correct? correct?
                       :time-ms (or time-ms 0)
                       :difficulty (or (:difficulty question) 0.0)
                       :topic (or (:topic question) (get-in db [:test :topic]))
                       :module-id (:module-id question)
                       :module-slug (:module-slug question)
                       :selected-error (get-in question [:errors sel-key])
                       :question-text (:question question)}
         updated-db (update-in db [:test :responses] conj new-response)
         new-theta (tetha/calculate-theta-auto (:test updated-db))
         responses (get-in updated-db [:test :responses])
         reason (progress/stop-reason responses new-theta)
         db-with-theta (-> updated-db
                           (assoc-in [:test :theta] new-theta)
                           (update-in [:test :theta-history] conj new-theta)
                           (assoc-in [:test :stop-reason] reason)
                           (assoc-in [:test :prefetched-question] nil)
                           (assoc-in [:test :prefetching?] (nil? reason)))
         _ (js/console.log "new-theta:" new-theta "stop-reason:" (clj->js reason))]
     (cond-> {:db db-with-theta
              :dispatch [:test/show-feedback {:question question
                                              :response new-response}]}
       (nil? reason)
       (assoc :test/fetch-next-question {:db db-with-theta :mode :prefetch})))))

;; -----------------------------------------------------------------------------
;; 🔹 EVENTO: Agrega la nueva pregunta al test
;; -----------------------------------------------------------------------------

(re-frame/reg-event-db
 :test/add-question
 (fn [db [_ question]]
   (install-question db question)))


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
   {:test/fetch-next-question {:db db :mode :immediate}}))


;; -----------------------------------------------------------------------------
;; 🔹 EVENTO: Guarda el test en Supabase
;; -----------------------------------------------------------------------------
;; Este evento usa el efecto :save-test definido abajo

(re-frame/reg-event-fx
 :save-test
 (fn [{:keys [db]} [_ data]]
   {:save-test {:data data
                :email (or (get data "email-user")
                           (:email-user data)
                           (get-in db [:visitor :email]))}}))

;; -----------------------------------------------------------------------------
;; 🔹 EFECTO: Guarda el test en Supabase
;; -----------------------------------------------------------------------------
;; Resuelve user_id desde la sesión JWT real y evita .select() post-insert
;; (sin policy SELECT, .insert().select() falla con error de RLS).

(re-frame/reg-fx
 :save-test
 (fn [{:keys [data email]}]
   (-> (sb/current-user-id)
       (.then
        (fn [session-uid]
          (go
            (let [app-uid (or (get data "user_id") (:user_id data))
                  uid (or session-uid app-uid)
                  email* (or email (get data "email-user") (:email-user data))
                  test-payload (or (get data "test") (:test data))
                  ;; Claves string = nombres exactos de columnas en Postgres
                  row {"test" test-payload
                       "email-user" email*
                       "user_id" uid}
                  _ (js/console.log "💾 Guardando test user_id:" uid
                                    "desde-sesión?" (boolean session-uid))]
              (if-not uid
                (js/console.error "❌ Sin sesión Supabase (auth.uid vacío); vuelve a iniciar sesión")
                (let [result (<! (crud/insert-data-table! row "tests" {:returning? false}))]
                  (if (:success result)
                    (do
                      (js/console.log "✅ Test guardado exitosamente")
                      (when email*
                        (re-frame/dispatch [:dashboard/consultar email*])))
                    (js/console.error "❌ Error al guardar test:" (clj->js (:error result))))))))))
       (.catch (fn [err]
                 (js/console.error "❌ No se pudo leer la sesión:" err))))))


;; -----------------------------------------------------------------------------
;; 🔹 EVENTO: Finaliza el test
;; -----------------------------------------------------------------------------
;; - Cambia el estado a :completed
;; - Guarda los resultados; el dashboard se refresca al confirmar el save

(re-frame/reg-event-fx
 :test/complete
 (fn [{:keys [db]} _]
   (let [email-user (get-in db [:visitor :email])
         user-id    (or (get-in db [:auth :user :id])
                        (get-in db [:dashboard :user-id]))
         new-db     (-> db
                        (assoc-in [:test :status] :completed)
                        (assoc-in [:test :end-time] (.now js/Date)))
         test       (:test new-db)]
     {:db new-db
      :save-test {:data {"test" test
                         "email-user" email-user
                         "user_id" user-id}
                  :email email-user}
      ;; Perfil derivado; el usuario abre resultados desde la pantalla de cierre
      :dispatch [:profile/save-from-test]})))

;; -----------------------------------------------------------------------------
;; 🔹 SUSCRIPCIONES
;; -----------------------------------------------------------------------------
;; - Para acceder fácilmente al estado del test desde los componentes UI

(re-frame/reg-sub :test/status (fn [db _] (get-in db [:test :status])))
(re-frame/reg-sub :test/feedback (fn [db _] (get-in db [:test :feedback])))
(re-frame/reg-sub :test/topic (fn [db _] (get-in db [:test :topic])))
(re-frame/reg-sub :test/theta (fn [db _] (get-in db [:test :theta])))
(re-frame/reg-sub :test/theta-history (fn [db _] (get-in db [:test :theta-history] [])))
(re-frame/reg-sub :test/stop-reason (fn [db _] (get-in db [:test :stop-reason])))
(re-frame/reg-sub :test/questions (fn [db _] (get-in db [:test :questions])))
(re-frame/reg-sub :test/answers (fn [db _] (get-in db [:test :responses])))
(re-frame/reg-sub :test/available-topics (fn [db _] (get-in db [:test :available-topics] [])))
(re-frame/reg-sub :test/topics-loading? (fn [db _] (get-in db [:test :topics-loading?] false)))
(re-frame/reg-sub :test/topics-error (fn [db _] (get-in db [:test :topics-error])))
(re-frame/reg-sub :test/current-question
                  (fn [db _]
                    (let [qid (get-in db [:test :current-question])
                          questions (get-in db [:test :questions])]
                      (when (and qid (pos? qid))
                        (nth questions (dec qid) nil)))))

(re-frame/reg-sub
 :test/progress-points
 (fn [db _]
   (progress/progress-points
    (get-in db [:test :responses])
    (get-in db [:test :theta-history]))))
