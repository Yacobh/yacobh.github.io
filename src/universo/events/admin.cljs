(ns universo.events.admin
  "Eventos del panel de administración.

   Decisiones de diseño:
   - El estado de carga/error es por sección (`[:admin :status <section>]`), así
     un fallo en Tests no aparece como error en Usuarios.
   - Cada sección se carga una vez y queda cacheada; cambiar de pestaña no vuelve
     a consultar Supabase. El refresco es explícito (`:admin/refresh`).
   - Las mutaciones muestran un toast de confirmación en vez de fallar en silencio."
  (:require
   [clojure.string :as str]
   [re-frame.core :as re-frame]
   [cljs.core.async :refer [go <!]]
   [universo.catalog :as catalog]
   [universo.db.crud :as crud]
   [universo.events.dashboard :as dash]))

(def page-size 20)

(def ^:private tab->loader
  {:overview :admin/load-overview
   :users :admin/load-profiles
   :tests :admin/load-tests
   :questions :admin/load-questions
   :test-configs :admin/load-test-configs
   :resources :admin/load-resources
   :slots :admin/load-slots
   :guestbook :admin/load-guestbook
   :contacto :admin/load-contacto})

;; -----------------------------------------------------------------------------
;; Estado por sección
;; -----------------------------------------------------------------------------

(re-frame/reg-sub
 :admin/tab
 (fn [db _]
   (get-in db [:admin :tab] :overview)))

(re-frame/reg-sub
 :admin/section-loading?
 (fn [db [_ section]]
   (get-in db [:admin :status section :loading?] false)))

(re-frame/reg-sub
 :admin/section-error
 (fn [db [_ section]]
   (get-in db [:admin :status section :error])))

(re-frame/reg-sub
 :admin/section-loaded-at
 (fn [db [_ section]]
   (get-in db [:admin :status section :loaded-at])))

(re-frame/reg-sub
 :admin/toast
 (fn [db _]
   (get-in db [:admin :toast])))

(re-frame/reg-event-db
 :admin/section-start
 (fn [db [_ section]]
   (update-in db [:admin :status section] merge {:loading? true :error nil})))

(re-frame/reg-event-db
 :admin/section-ok
 (fn [db [_ section]]
   (update-in db [:admin :status section] merge
              {:loading? false :error nil :loaded-at (.now js/Date)})))

(re-frame/reg-event-db
 :admin/section-fail
 (fn [db [_ section msg]]
   (update-in db [:admin :status section] merge {:loading? false :error msg})))

;; -----------------------------------------------------------------------------
;; Toast
;; -----------------------------------------------------------------------------

(re-frame/reg-event-fx
 :admin/toast
 (fn [{:keys [db]} [_ kind message]]
   (let [id (random-uuid)]
     {:db (assoc-in db [:admin :toast] {:id id :kind kind :message message})
      :dispatch-later [{:ms 4500 :dispatch [:admin/clear-toast id]}]})))

(re-frame/reg-event-db
 :admin/clear-toast
 (fn [db [_ id]]
   ;; Solo limpia si el toast sigue siendo el que programó este timer.
   (if (or (nil? id) (= id (get-in db [:admin :toast :id])))
     (assoc-in db [:admin :toast] nil)
     db)))

;; -----------------------------------------------------------------------------
;; Navegación de pestañas (con caché)
;; -----------------------------------------------------------------------------

(re-frame/reg-event-fx
 :admin/set-tab
 (fn [{:keys [db]} [_ tab]]
   {:db (assoc-in db [:admin :tab] tab)
    :dispatch [:admin/ensure tab]}))

(re-frame/reg-event-fx
 :admin/ensure
 (fn [{:keys [db]} [_ tab]]
   (let [{:keys [loading? loaded-at]} (get-in db [:admin :status tab])]
     (if (or loading? loaded-at)
       {}
       {:dispatch [(get tab->loader tab :admin/load-overview)]}))))

(re-frame/reg-event-fx
 :admin/refresh
 (fn [_ [_ tab]]
   {:dispatch [(get tab->loader tab :admin/load-overview)]}))

(re-frame/reg-event-fx
 :admin/enter
 (fn [{:keys [db]} _]
   ;; Sin rol admin confirmado, RLS devolvería vacío y la UI mostraría
   ;; "sin datos" en lugar de esperar. Se reintenta desde :auth/profile-loaded.
   (if-not (get-in db [:auth :admin?])
     {}
     {:dispatch [:admin/ensure (get-in db [:admin :tab] :overview)]})))

;; -----------------------------------------------------------------------------
;; Resumen (overview)
;; -----------------------------------------------------------------------------

(re-frame/reg-sub
 :admin/overview
 (fn [db _]
   (get-in db [:admin :overview])))

(re-frame/reg-fx
 :admin/fetch-overview
 (fn [_]
   (go
     (let [result (<! (crud/fetch-admin-overview))]
       (if (:success result)
         (re-frame/dispatch [:admin/overview-loaded (:data result)])
         (re-frame/dispatch [:admin/section-fail :overview
                             (or (:error result) "No se pudo cargar el resumen")]))))))

(re-frame/reg-event-fx
 :admin/load-overview
 (fn [_ _]
   {:dispatch [:admin/section-start :overview]
    :admin/fetch-overview nil}))

(re-frame/reg-event-fx
 :admin/overview-loaded
 (fn [{:keys [db]} [_ data]]
   {:db (-> db
            (assoc-in [:admin :overview] data)
            ;; Reutiliza los contadores del resumen para que el badge de
            ;; moderación aparezca sin tener que abrir esa pestaña.
            (update-in [:admin :guestbook-counts] merge
                       {:pending (:guestbook-pending data)
                        :approved (:guestbook-approved data)}))
    :dispatch [:admin/section-ok :overview]}))

;; -----------------------------------------------------------------------------
;; Usuarios
;; -----------------------------------------------------------------------------

(re-frame/reg-sub
 :admin/profiles
 (fn [db _]
   (get-in db [:admin :profiles] [])))

(re-frame/reg-sub
 :admin/users-query
 (fn [db _]
   (get-in db [:admin :users-query] "")))

(re-frame/reg-sub
 :admin/users-page
 (fn [db _]
   (get-in db [:admin :users-page] 0)))

(defn- matches?
  [query & fields]
  (let [q (str/lower-case (str/trim (str query)))]
    (or (str/blank? q)
        (boolean (some #(str/includes? (str/lower-case (str %)) q) fields)))))

(defn- paginate
  "Recorta una colección a la página pedida y devuelve metadatos de paginación."
  [rows page]
  (let [total (count rows)
        pages (max 1 (js/Math.ceil (/ total page-size)))
        page (-> page (max 0) (min (dec pages)))]
    {:rows (->> rows (drop (* page page-size)) (take page-size) vec)
     :total total
     :page page
     :pages pages}))

(re-frame/reg-sub
 :admin/users-view
 :<- [:admin/profiles]
 :<- [:admin/users-query]
 :<- [:admin/users-page]
 (fn [[rows query page] _]
   (-> (filterv #(matches? query (:email %) (:role %)) rows)
       (paginate page))))

(re-frame/reg-event-db
 :admin/set-users-query
 (fn [db [_ q]]
   (-> db
       (assoc-in [:admin :users-query] q)
       (assoc-in [:admin :users-page] 0))))

(re-frame/reg-event-db
 :admin/set-users-page
 (fn [db [_ page]]
   (assoc-in db [:admin :users-page] (max 0 page))))

(re-frame/reg-fx
 :admin/fetch-profiles
 (fn [_]
   (go
     (let [result (<! (crud/fetch-admin-profiles))]
       (if (:success result)
         (re-frame/dispatch [:admin/profiles-loaded (:data result)])
         (re-frame/dispatch [:admin/section-fail :users
                             (or (:error result) "No se pudieron cargar usuarios")]))))))

(re-frame/reg-event-fx
 :admin/load-profiles
 (fn [_ _]
   {:dispatch [:admin/section-start :users]
    :admin/fetch-profiles nil
    :admin/fetch-deletion-requests nil}))

(re-frame/reg-event-fx
 :admin/profiles-loaded
 (fn [{:keys [db]} [_ rows]]
   {:db (assoc-in db [:admin :profiles] (or rows []))
    :dispatch [:admin/section-ok :users]}))

;; Solicitudes de eliminación de cuenta --------------------------------------
;; Reutilizan `notifications` (kind = "account_deletion_request"); ver
;; migración 009 y [[project-memory/OPEN_QUESTIONS]] Q-03.

(re-frame/reg-sub
 :admin/deletion-requests
 (fn [db _]
   (get-in db [:admin :deletion-requests] [])))

(re-frame/reg-fx
 :admin/fetch-deletion-requests
 (fn [_]
   (go
     (let [result (<! (crud/fetch-account-deletion-requests))]
       (when (:success result)
         (re-frame/dispatch [:admin/deletion-requests-loaded (:data result)]))))))

(re-frame/reg-event-db
 :admin/deletion-requests-loaded
 (fn [db [_ rows]]
   (assoc-in db [:admin :deletion-requests] (or rows []))))

(re-frame/reg-fx
 :admin/mark-deletion-attended!
 (fn [id]
   (go
     (<! (crud/mark-notification-read! id))
     (re-frame/dispatch [:admin/fetch-deletion-requests]))))

(re-frame/reg-event-fx
 :admin/mark-deletion-attended
 (fn [{:keys [db]} [_ id]]
   {:db (update-in db [:admin :deletion-requests]
                   (fn [rows] (vec (remove #(= (:id %) id) rows))))
    :admin/mark-deletion-attended! id}))

;; Cambio de rol -------------------------------------------------------------

(re-frame/reg-fx
 :admin/set-role!
 (fn [{:keys [user-id role]}]
   (go
     (let [result (<! (crud/update-profile-role! user-id role))]
       (if (:success result)
         (re-frame/dispatch [:admin/role-changed (:data result)])
         (re-frame/dispatch [:admin/role-change-failed user-id
                             (or (:error result) "No se pudo cambiar el rol")]))))))

(re-frame/reg-event-fx
 :admin/set-role
 (fn [{:keys [db]} [_ user-id role]]
   (let [me (get-in db [:auth :user :id])]
     (if (= (str me) (str user-id))
       {:dispatch [:admin/toast :error
                   "No puedes cambiar tu propio rol (evita quedarte sin acceso)."]}
       ;; Optimista: la tabla refleja el cambio y se revierte si el servidor falla.
       {:db (update-in db [:admin :profiles]
                       (fn [rows]
                         (mapv #(if (= (:id %) user-id) (assoc % :role role) %) rows)))
        :admin/set-role! {:user-id user-id :role role}}))))

(re-frame/reg-event-fx
 :admin/role-changed
 (fn [{:keys [db]} [_ profile]]
   {:db (update-in db [:admin :profiles]
                   (fn [rows]
                     (mapv #(if (= (:id %) (:id profile)) (merge % profile) %) rows)))
    :dispatch-n [[:admin/toast :success
                  (str "Rol de " (:email profile) " actualizado a " (:role profile) ".")]
                 ;; El conteo de admins del resumen queda obsoleto.
                 [:admin/invalidate :overview]]}))

(re-frame/reg-event-fx
 :admin/role-change-failed
 (fn [_ [_ _user-id msg]]
   {:dispatch-n [[:admin/toast :error msg]
                 ;; Revierte el cambio optimista con datos del servidor.
                 [:admin/load-profiles]]}))

;; -----------------------------------------------------------------------------
;; Invalidación de caché
;; -----------------------------------------------------------------------------

(re-frame/reg-event-db
 :admin/invalidate
 (fn [db [_ section]]
   (update-in db [:admin :status section] dissoc :loaded-at)))

;; -----------------------------------------------------------------------------
;; Tests
;; -----------------------------------------------------------------------------

(re-frame/reg-sub
 :admin/tests
 (fn [db _]
   (get-in db [:admin :tests] [])))

(re-frame/reg-sub
 :admin/tests-query
 (fn [db _]
   (get-in db [:admin :tests-query] "")))

(re-frame/reg-sub
 :admin/tests-page
 (fn [db _]
   (get-in db [:admin :tests-page] 0)))

(re-frame/reg-sub
 :admin/tests-view
 :<- [:admin/tests]
 :<- [:admin/tests-query]
 :<- [:admin/tests-page]
 (fn [[rows query page] _]
   (-> (filterv #(matches? query (:email %) (:tema %)) rows)
       (paginate page))))

(re-frame/reg-event-db
 :admin/set-tests-query
 (fn [db [_ q]]
   (-> db
       (assoc-in [:admin :tests-query] q)
       (assoc-in [:admin :tests-page] 0))))

(re-frame/reg-event-db
 :admin/set-tests-page
 (fn [db [_ page]]
   (assoc-in db [:admin :tests-page] (max 0 page))))

(re-frame/reg-fx
 :admin/fetch-tests
 (fn [_]
   (go
     (let [result (<! (crud/fetch-admin-tests 200))]
       (if (:success result)
         (re-frame/dispatch [:admin/tests-loaded (:data result)])
         (re-frame/dispatch [:admin/section-fail :tests
                             (or (:error result) "No se pudieron cargar tests")]))))))

(re-frame/reg-event-fx
 :admin/load-tests
 (fn [_ _]
   {:dispatch [:admin/section-start :tests]
    :admin/fetch-tests nil}))

(re-frame/reg-event-fx
 :admin/tests-loaded
 (fn [{:keys [db]} [_ rows]]
   (let [summaries (mapv (fn [row]
                           (let [email (or (get row (keyword "email-user"))
                                           (:email-user row)
                                           (:email_user row))]
                             (-> (dash/procesar-test-resumen row)
                                 (assoc :email email)
                                 (assoc :user-id (:user_id row)))))
                         (or rows []))]
     {:db (assoc-in db [:admin :tests] summaries)
      :dispatch [:admin/section-ok :tests]})))

;; -----------------------------------------------------------------------------
;; Guestbook
;; -----------------------------------------------------------------------------

(re-frame/reg-sub
 :admin/guestbook
 (fn [db _]
   (get-in db [:admin :guestbook] [])))

(re-frame/reg-sub
 :admin/guestbook-filter
 (fn [db _]
   (get-in db [:admin :guestbook-filter] :pending)))

(re-frame/reg-sub
 :admin/guestbook-counts
 (fn [db _]
   (get-in db [:admin :guestbook-counts] {})))

(re-frame/reg-event-fx
 :admin/set-guestbook-filter
 (fn [{:keys [db]} [_ filter-mode]]
   {:db (assoc-in db [:admin :guestbook-filter] filter-mode)
    :dispatch [:admin/load-guestbook]}))

(re-frame/reg-fx
 :admin/fetch-guestbook
 (fn [filter-mode]
   (go
     (let [result (<! (crud/fetch-admin-guestbook filter-mode))
           counts (<! (crud/fetch-guestbook-counts))]
       (if (:success result)
         (re-frame/dispatch [:admin/guestbook-loaded (:data result) (:data counts)])
         (re-frame/dispatch [:admin/section-fail :guestbook
                             (or (:error result) "No se pudo cargar el libro de visitas")]))))))

(re-frame/reg-event-fx
 :admin/load-guestbook
 (fn [{:keys [db]} _]
   {:dispatch [:admin/section-start :guestbook]
    :admin/fetch-guestbook (get-in db [:admin :guestbook-filter] :pending)}))

(re-frame/reg-event-fx
 :admin/guestbook-loaded
 (fn [{:keys [db]} [_ rows counts]]
   {:db (-> db
            (assoc-in [:admin :guestbook] (or rows []))
            (cond-> counts (assoc-in [:admin :guestbook-counts] counts)))
    :dispatch [:admin/section-ok :guestbook]}))

;; -----------------------------------------------------------------------------
;; Contacto
;; -----------------------------------------------------------------------------

(re-frame/reg-sub
 :admin/contacto
 (fn [db _]
   (get-in db [:admin :contacto] [])))

(re-frame/reg-fx
 :admin/fetch-contacto
 (fn [_]
   (go
     (let [result (<! (crud/fetch-admin-contacto))]
       (if (:success result)
         (re-frame/dispatch [:admin/contacto-loaded (:data result)])
         (re-frame/dispatch [:admin/section-fail :contacto
                             (or (:error result) "No se pudieron cargar los mensajes de contacto")]))))))

(re-frame/reg-event-fx
 :admin/load-contacto
 (fn [_ _]
   {:dispatch [:admin/section-start :contacto]
    :admin/fetch-contacto nil}))

(re-frame/reg-event-fx
 :admin/contacto-loaded
 (fn [{:keys [db]} [_ rows]]
   {:db (assoc-in db [:admin :contacto] (or rows []))
    :dispatch [:admin/section-ok :contacto]}))

(defn- moderation-label
  [approved]
  (cond
    (true? approved) "aprobada"
    (false? approved) "enviada a la papelera"
    :else "devuelta a pendientes"))

(re-frame/reg-fx
 :admin/update-guestbook-approval
 (fn [[entry-id approved]]
   (go
     (let [result (<! (crud/update-guestbook-approval! entry-id approved))]
       (if (:success result)
         (re-frame/dispatch [:admin/guestbook-moderated approved])
         (re-frame/dispatch [:admin/guestbook-moderation-failed
                             (or (:error result) "No se pudo actualizar la entrada")]))))))

(re-frame/reg-event-fx
 :admin/moderate-guestbook
 (fn [{:keys [db]} [_ entry-id approved]]
   ;; Optimista: la entrada sale de la lista actual de inmediato.
   {:db (update-in db [:admin :guestbook]
                   (fn [rows] (filterv #(not= (:id %) entry-id) rows)))
    :admin/update-guestbook-approval [entry-id approved]}))

;; Aliases legibles usados por la UI
(re-frame/reg-event-fx
 :admin/approve-guestbook
 (fn [_ [_ entry-id]]
   {:dispatch [:admin/moderate-guestbook entry-id true]}))

(re-frame/reg-event-fx
 :admin/reject-guestbook
 (fn [_ [_ entry-id]]
   {:dispatch [:admin/moderate-guestbook entry-id false]}))

(re-frame/reg-event-fx
 :admin/restore-guestbook
 (fn [_ [_ entry-id]]
   {:dispatch [:admin/moderate-guestbook entry-id nil]}))

(re-frame/reg-event-fx
 :admin/guestbook-moderated
 (fn [_ [_ approved]]
   {:dispatch-n [[:admin/toast :success (str "Entrada " (moderation-label approved) ".")]
                 [:admin/refresh-guestbook-counts]
                 [:admin/invalidate :overview]]}))

(re-frame/reg-event-fx
 :admin/guestbook-moderation-failed
 (fn [_ [_ msg]]
   {:dispatch-n [[:admin/toast :error msg]
                 [:admin/load-guestbook]]}))

(re-frame/reg-fx
 :admin/fetch-guestbook-counts
 (fn [_]
   (go
     (let [result (<! (crud/fetch-guestbook-counts))]
       (when (:success result)
         (re-frame/dispatch [:admin/guestbook-counts-loaded (:data result)]))))))

(re-frame/reg-event-fx
 :admin/refresh-guestbook-counts
 (fn [_ _]
   {:admin/fetch-guestbook-counts nil}))

(re-frame/reg-event-db
 :admin/guestbook-counts-loaded
 (fn [db [_ counts]]
   (assoc-in db [:admin :guestbook-counts] counts)))

(re-frame/reg-fx
 :admin/remove-guestbook
 (fn [entry-id]
   (go
     (let [result (<! (crud/delete-admin-guestbook! entry-id))]
       (if (:success result)
         (re-frame/dispatch [:admin/guestbook-deleted])
         (re-frame/dispatch [:admin/guestbook-moderation-failed
                             (or (:error result) "No se pudo eliminar la entrada")]))))))

(re-frame/reg-event-fx
 :admin/delete-guestbook
 (fn [{:keys [db]} [_ entry-id]]
   {:db (update-in db [:admin :guestbook]
                   (fn [rows] (filterv #(not= (:id %) entry-id) rows)))
    :admin/remove-guestbook entry-id}))

(re-frame/reg-event-fx
 :admin/guestbook-deleted
 (fn [_ _]
   {:dispatch-n [[:admin/toast :success "Entrada eliminada permanentemente."]
                 [:admin/refresh-guestbook-counts]
                 [:admin/invalidate :overview]]}))

;; -----------------------------------------------------------------------------
;; Preguntas (banco IRT)
;; -----------------------------------------------------------------------------

(def empty-question-draft
  {:id nil
   :question ""
   :option_a ""
   :option_b ""
   :option_c ""
   :option_d ""
   :correct_option "A"
   :error_a ""
   :error_b ""
   :error_c ""
   :error_d ""
   :topic ""
   :order_index nil
   :difficulty nil
   :module_id nil})

(re-frame/reg-sub
 :admin/questions
 (fn [db _]
   (get-in db [:admin :questions] [])))

(re-frame/reg-sub
 :admin/question-topics
 (fn [db _]
   (get-in db [:admin :question-topics] [])))

(re-frame/reg-sub
 :admin/question-topic-filter
 (fn [db _]
   (get-in db [:admin :question-topic-filter])))

(re-frame/reg-sub
 :admin/question-sort
 (fn [db _]
   (get-in db [:admin :question-sort] :default)))

(re-frame/reg-sub
 :admin/question-editing?
 (fn [db _]
   (get-in db [:admin :question-editing?] false)))

(re-frame/reg-sub
 :admin/question-saving?
 (fn [db _]
   (get-in db [:admin :question-saving?] false)))

(re-frame/reg-sub
 :admin/question-draft
 (fn [db _]
   (get-in db [:admin :question-draft])))

(defn- difficulty-sort-key
  [q ascending?]
  (let [d (:difficulty q)
        missing? (nil? d)
        n (if missing? 0 (js/Number d))
        id (or (:id q) 0)]
    (if ascending?
      [(if missing? 1 0) n id]
      [(if missing? 1 0) (- n) (- id)])))

(re-frame/reg-sub
 :admin/questions-view
 :<- [:admin/questions]
 :<- [:admin/question-sort]
 (fn [[rows sort-mode] _]
   (case sort-mode
     :difficulty-asc (vec (sort-by #(difficulty-sort-key % true) rows))
     :difficulty-desc (vec (sort-by #(difficulty-sort-key % false) rows))
     (or rows []))))

(re-frame/reg-event-fx
 :admin/set-question-topic-filter
 (fn [{:keys [db]} [_ topic]]
   {:db (-> db
            (assoc-in [:admin :question-topic-filter]
                      (when (and topic (pos? (count topic))) topic))
            (update-in [:admin :status :questions] dissoc :loaded-at))
    :dispatch [:admin/load-questions]}))

(re-frame/reg-event-db
 :admin/set-question-sort
 (fn [db [_ sort-mode]]
   (assoc-in db [:admin :question-sort] (or sort-mode :default))))

(re-frame/reg-fx
 :admin/fetch-questions
 (fn [topic]
   (go
     (let [topics-result (<! (crud/get-distinct-topics))
           qs-result (<! (crud/fetch-admin-questions topic))]
       (when (:success topics-result)
         (re-frame/dispatch [:admin/question-topics-loaded (:data topics-result)]))
       (if (:success qs-result)
         (re-frame/dispatch [:admin/questions-loaded (:data qs-result)])
         (re-frame/dispatch [:admin/section-fail :questions
                             (or (:error qs-result)
                                 "No se pudieron cargar preguntas")]))))))

(re-frame/reg-event-fx
 :admin/load-questions
 (fn [{:keys [db]} _]
   {:dispatch [:admin/section-start :questions]
    :admin/fetch-questions (get-in db [:admin :question-topic-filter])}))

(re-frame/reg-event-db
 :admin/question-topics-loaded
 (fn [db [_ topics]]
   (assoc-in db [:admin :question-topics] (or topics []))))

(re-frame/reg-event-fx
 :admin/questions-loaded
 (fn [{:keys [db]} [_ rows]]
   {:db (assoc-in db [:admin :questions] (or rows []))
    :dispatch [:admin/section-ok :questions]}))

(re-frame/reg-event-db
 :admin/new-question
 (fn [db _]
   (let [filter-topic (get-in db [:admin :question-topic-filter])]
     (-> db
         (assoc-in [:admin :question-editing?] true)
         (assoc-in [:admin :question-draft]
                   (cond-> empty-question-draft
                     filter-topic (assoc :topic filter-topic)))))))

(re-frame/reg-event-db
 :admin/edit-question
 (fn [db [_ row]]
   (let [draft (-> (merge empty-question-draft
                          (select-keys row
                                       [:id :question :option_a :option_b :option_c :option_d
                                        :correct_option :error_a :error_b :error_c :error_d
                                        :topic :order_index :difficulty :module_id]))
                   (update :correct_option #(some-> % str str/trim)))]
     (-> db
         (assoc-in [:admin :question-editing?] true)
         (assoc-in [:admin :question-draft] draft)))))

(re-frame/reg-event-db
 :admin/cancel-question-edit
 (fn [db _]
   (-> db
       (assoc-in [:admin :question-editing?] false)
       (assoc-in [:admin :question-draft] nil)
       (assoc-in [:admin :question-saving?] false))))

(re-frame/reg-event-db
 :admin/update-question-draft
 (fn [db [_ k v]]
   (assoc-in db [:admin :question-draft k] v)))

(defn- question-draft-valid? [draft]
  (and (pos? (count (str/trim (or (:question draft) ""))))
       (pos? (count (str/trim (or (:option_a draft) ""))))
       (pos? (count (str/trim (or (:option_b draft) ""))))
       (pos? (count (str/trim (or (:option_c draft) ""))))
       (pos? (count (str/trim (or (:option_d draft) ""))))
       (pos? (count (str/trim (or (:topic draft) ""))))
       (#{"A" "B" "C" "D"} (str/trim (str (:correct_option draft))))))

(re-frame/reg-event-fx
 :admin/save-question
 (fn [{:keys [db]} _]
   (let [draft (get-in db [:admin :question-draft])]
     (if-not (question-draft-valid? draft)
       {:dispatch [:admin/toast :error
                   "Completa enunciado, opciones A–D, tema y respuesta correcta."]}
       {:db (assoc-in db [:admin :question-saving?] true)
        :admin/persist-question draft}))))

(re-frame/reg-fx
 :admin/persist-question
 (fn [draft]
   (go
     (let [result (if (:id draft)
                    (<! (crud/update-admin-question! (:id draft) draft))
                    (<! (crud/insert-admin-question! draft)))]
       (if (:success result)
         (re-frame/dispatch [:admin/question-saved])
         (re-frame/dispatch [:admin/question-save-failed
                             (or (:error result) "No se pudo guardar")]))))))

(re-frame/reg-event-fx
 :admin/question-saved
 (fn [{:keys [db]} _]
   {:db (-> db
            (assoc-in [:admin :question-saving?] false)
            (assoc-in [:admin :question-editing?] false)
            (assoc-in [:admin :question-draft] nil)
            (update-in [:admin :status :questions] dissoc :loaded-at))
    :dispatch-n [[:admin/toast :success "Pregunta guardada."]
                 [:admin/load-questions]]}))

(re-frame/reg-event-fx
 :admin/question-save-failed
 (fn [{:keys [db]} [_ msg]]
   {:db (assoc-in db [:admin :question-saving?] false)
    :dispatch [:admin/toast :error msg]}))

(re-frame/reg-event-fx
 :admin/delete-question
 (fn [{:keys [db]} [_ question-id]]
   {:db (assoc-in db [:admin :question-saving?] true)
    :admin/remove-question question-id}))

(re-frame/reg-fx
 :admin/remove-question
 (fn [question-id]
   (go
     (let [result (<! (crud/delete-admin-question! question-id))]
       (if (:success result)
         (re-frame/dispatch [:admin/question-deleted])
         (re-frame/dispatch [:admin/question-save-failed
                             (or (:error result) "No se pudo eliminar")]))))))

(re-frame/reg-event-fx
 :admin/question-deleted
 (fn [{:keys [db]} _]
   {:db (-> db
            (assoc-in [:admin :question-saving?] false)
            (assoc-in [:admin :question-editing?] false)
            (assoc-in [:admin :question-draft] nil)
            (update-in [:admin :status :questions] dissoc :loaded-at))
    :dispatch-n [[:admin/toast :success "Pregunta eliminada."]
                 [:admin/load-questions]]}))

;; -----------------------------------------------------------------------------
;; Edición rápida de dificultad desde la tabla (T-50)
;;
;; El editor completo (question-draft) exige abrir cada pregunta una por una;
;; para recalibrar un banco entero (p.ej. `enteros`, con `difficulty` en escala
;; 10–90 en vez de logits) hace falta editar muchas filas seguidas sin ese
;; costo. Cada celda editada queda en :question-inline-edits hasta guardar o
;; descartar; no interfiere con question-draft/question-editing?, que siguen
;; siendo del editor completo.
;; -----------------------------------------------------------------------------

(re-frame/reg-sub
 :admin/question-inline-edits
 (fn [db _]
   (get-in db [:admin :question-inline-edits] {})))

(re-frame/reg-sub
 :admin/question-inline-saving?
 (fn [db _]
   (get-in db [:admin :question-inline-saving?] false)))

(re-frame/reg-event-db
 :admin/set-question-inline-difficulty
 (fn [db [_ id raw-value]]
   (let [original (:difficulty (some #(when (= (:id %) id) %)
                                      (get-in db [:admin :questions])))
         unchanged? (= (str/trim (or raw-value ""))
                       (str/trim (or (some-> original str) "")))]
     (if unchanged?
       (update-in db [:admin :question-inline-edits] dissoc id)
       (assoc-in db [:admin :question-inline-edits id] raw-value)))))

(re-frame/reg-event-db
 :admin/discard-question-inline-edits
 (fn [db _]
   (assoc-in db [:admin :question-inline-edits] {})))

(re-frame/reg-event-fx
 :admin/save-question-inline-edits
 (fn [{:keys [db]} _]
   (let [edits (get-in db [:admin :question-inline-edits] {})]
     (if (empty? edits)
       {}
       {:db (assoc-in db [:admin :question-inline-saving?] true)
        :admin/persist-inline-question-edits edits}))))

(re-frame/reg-fx
 :admin/persist-inline-question-edits
 (fn [edits]
   (go
     (loop [remaining (seq edits)
            ok []
            failed []]
       (if (empty? remaining)
         (re-frame/dispatch [:admin/inline-edits-saved {:ok ok :failed failed}])
         (let [[id raw-value] (first remaining)
               result (<! (crud/patch-admin-question! id raw-value))]
           (if (:success result)
             (recur (rest remaining) (conj ok id) failed)
             (recur (rest remaining) ok (conj failed {:id id :error (:error result)})))))))))

(re-frame/reg-event-fx
 :admin/inline-edits-saved
 (fn [{:keys [db]} [_ {:keys [ok failed]}]]
   (let [n-ok (count ok)
         n-failed (count failed)]
     {:db (-> db
              (assoc-in [:admin :question-inline-saving?] false)
              (update-in [:admin :question-inline-edits] #(apply dissoc % ok))
              (update-in [:admin :status :questions] dissoc :loaded-at))
      :dispatch-n (cond-> []
                    (pos? n-ok)
                    (conj [:admin/toast :success
                           (str n-ok (if (= n-ok 1)
                                       " pregunta actualizada."
                                       " preguntas actualizadas."))])
                    (pos? n-failed)
                    (conj [:admin/toast :error
                           (str n-failed (if (= n-failed 1)
                                           " cambio falló, revisa esa fila."
                                           " cambios fallaron, revisa esas filas."))])
                    true (conj [:admin/load-questions]))})))

;; -----------------------------------------------------------------------------
;; Configuración de tests (parada IRT + cadena de prerequisitos por topic)
;; -----------------------------------------------------------------------------
;; No hay tabla de "accesos otorgados" por usuario: el avance se deriva del
;; historial real en `tests` (ver universo.access). Esta sección solo edita
;; el catálogo (test_configs) — min/max items, SE, tiempo, prerequisito y
;; theta mínimo, y el flag `active` para tener tests en borrador.

(def empty-test-config-draft
  {:topic ""
   :display_name ""
   :min_items 5
   :max_items 12
   :se_threshold 0.35
   :prerequisite_topic nil
   :min_theta nil
   :max_minutes nil
   :min_response_seconds 3
   :active true})

(re-frame/reg-sub
 :admin/test-configs
 (fn [db _]
   (get-in db [:admin :test-configs] [])))

(re-frame/reg-sub
 :admin/test-config-editing?
 (fn [db _]
   (get-in db [:admin :test-config-editing?] false)))

(re-frame/reg-sub
 :admin/test-config-saving?
 (fn [db _]
   (get-in db [:admin :test-config-saving?] false)))

(re-frame/reg-sub
 :admin/test-config-draft
 (fn [db _]
   (get-in db [:admin :test-config-draft])))

;; Cuántas preguntas tiene el banco de cada topic: sin este dato el admin puede
;; exigirle a un test una regla de parada que su banco no alcanza a cumplir
;; (el problema que originó T-39). Ver BACKLOG T-40.
(re-frame/reg-sub
 :admin/question-counts
 (fn [db _]
   (get-in db [:admin :question-counts] {})))

(re-frame/reg-sub
 :admin/question-counts-truncated?
 (fn [db _]
   (get-in db [:admin :question-counts-truncated?] false)))

(re-frame/reg-fx
 :admin/fetch-test-configs
 (fn [_]
   (go
     (let [result (<! (crud/fetch-test-configs))]
       (if (:success result)
         (re-frame/dispatch [:admin/test-configs-loaded (:data result)])
         (re-frame/dispatch [:admin/section-fail :test-configs
                             (or (:error result)
                                 "No se pudo cargar la configuración de tests")]))))))

(re-frame/reg-fx
 :admin/fetch-question-counts
 (fn [_]
   (go
     (let [result (<! (crud/fetch-question-counts-by-topic))]
       ;; El conteo es informativo: si falla, la tabla del catálogo se muestra
       ;; igual (con "—" en la columna) en vez de marcar la sección en error.
       (when (:success result)
         (re-frame/dispatch [:admin/question-counts-loaded (:data result)]))))))

(re-frame/reg-event-db
 :admin/question-counts-loaded
 (fn [db [_ {:keys [counts fetched total]}]]
   (-> db
       (assoc-in [:admin :question-counts] (or counts {}))
       (assoc-in [:admin :question-counts-truncated?]
                 (catalog/counts-truncated? fetched total)))))

(re-frame/reg-event-fx
 :admin/load-test-configs
 (fn [_ _]
   {:dispatch [:admin/section-start :test-configs]
    :admin/fetch-test-configs nil
    :admin/fetch-question-counts nil}))

(re-frame/reg-event-fx
 :admin/test-configs-loaded
 (fn [{:keys [db]} [_ rows]]
   {:db (assoc-in db [:admin :test-configs] (or rows []))
    :dispatch [:admin/section-ok :test-configs]}))

(re-frame/reg-event-db
 :admin/new-test-config
 (fn [db _]
   (-> db
       (assoc-in [:admin :test-config-editing?] true)
       (assoc-in [:admin :test-config-draft] empty-test-config-draft))))

(re-frame/reg-event-db
 :admin/edit-test-config
 (fn [db [_ row]]
   (let [draft (merge empty-test-config-draft
                      ;; display_name llega null desde la DB cuando no se
                      ;; configuró; el <input> necesita string.
                      (update (select-keys row [:topic :display_name :min_items :max_items
                                                :se_threshold :prerequisite_topic :min_theta
                                                :max_minutes :active])
                              :display_name #(or % "")))]
     (-> db
         (assoc-in [:admin :test-config-editing?] true)
         (assoc-in [:admin :test-config-draft] draft)))))

(re-frame/reg-event-db
 :admin/cancel-test-config-edit
 (fn [db _]
   (-> db
       (assoc-in [:admin :test-config-editing?] false)
       (assoc-in [:admin :test-config-draft] nil)
       (assoc-in [:admin :test-config-saving?] false))))

(re-frame/reg-event-db
 :admin/update-test-config-draft
 (fn [db [_ k v]]
   (assoc-in db [:admin :test-config-draft k] v)))

(defn- as-num
  "Convierte a número los valores de draft (llegan como string desde
   <input type=\"number\">, igual que en admin_questions)."
  [v]
  (cond
    (number? v) v
    (string? v) (let [n (js/parseFloat v)] (when-not (js/isNaN n) n))
    :else nil))

(defn- test-config-draft-valid? [draft]
  (let [min-items (as-num (:min_items draft))
        max-items (as-num (:max_items draft))
        se (as-num (:se_threshold draft))
        min-theta-set? (not (or (nil? (:min_theta draft))
                                (and (string? (:min_theta draft))
                                     (str/blank? (:min_theta draft)))))]
    (and (pos? (count (str/trim (or (:topic draft) ""))))
         min-items (pos? min-items)
         max-items (>= max-items min-items)
         se (pos? se)
         ;; min_theta exige un prerequisite_topic contra el cual medirse
         ;; (mismo check que en la migración 020_test_configs.sql).
         (or (not min-theta-set?)
             (some-> (:prerequisite_topic draft) str/trim seq)))))

(re-frame/reg-event-fx
 :admin/save-test-config
 (fn [{:keys [db]} _]
   (let [draft (get-in db [:admin :test-config-draft])]
     (if-not (test-config-draft-valid? draft)
       {:dispatch [:admin/toast :error
                   "Revisa el topic, min/max items, SE y que theta mínimo tenga un prerequisito."]}
       {:db (assoc-in db [:admin :test-config-saving?] true)
        :admin/persist-test-config draft}))))

(re-frame/reg-fx
 :admin/persist-test-config
 (fn [draft]
   (go
     (let [result (<! (crud/upsert-test-config! draft))]
       (if (:success result)
         (re-frame/dispatch [:admin/test-config-saved])
         (re-frame/dispatch [:admin/test-config-save-failed
                             (or (:error result) "No se pudo guardar")]))))))

(re-frame/reg-event-fx
 :admin/test-config-saved
 (fn [{:keys [db]} _]
   {:db (-> db
            (assoc-in [:admin :test-config-saving?] false)
            (assoc-in [:admin :test-config-editing?] false)
            (assoc-in [:admin :test-config-draft] nil)
            (update-in [:admin :status :test-configs] dissoc :loaded-at))
    :dispatch-n [[:admin/toast :success "Configuración guardada."]
                 [:admin/load-test-configs]]}))

(re-frame/reg-event-fx
 :admin/test-config-save-failed
 (fn [{:keys [db]} [_ msg]]
   {:db (assoc-in db [:admin :test-config-saving?] false)
    :dispatch [:admin/toast :error msg]}))
