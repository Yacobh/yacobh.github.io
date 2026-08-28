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
   [universo.bands :as bands]
   [universo.db.crud :as crud]
   [universo.editor :as editor]
   [universo.events.dashboard :as dash]
   [universo.misconceptions :as mis]))

(def page-size 20)

(def ^:private tab->loader
  {:overview :admin/load-overview
   :users :admin/load-profiles
   :tests :admin/load-tests
   :questions :admin/load-questions
   :test-configs :admin/load-test-configs
   :resources :admin/load-resources
   :misconceptions :admin/load-misconceptions
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
   ;; Los módulos los cargaba **solo** la pestaña de recursos, así que el
   ;; selector de módulo del editor de preguntas aparecía vacío si no se había
   ;; pasado antes por ahí: un desplegable sin opciones y sin explicación.
   (cond-> {:dispatch [:admin/section-start :questions]
            :admin/fetch-questions (get-in db [:admin :question-topic-filter])}
     (empty? (get-in db [:admin :modules]))
     (assoc :admin/fetch-modules-only true)

     ;; El editor asigna la idea errónea de cada distractor, así que necesita el
     ;; catálogo aunque nunca se haya abierto su pestaña.
     (empty? (get-in db [:admin :misconceptions]))
     (assoc :admin/fetch-misconceptions-only true))))

(re-frame/reg-fx
 :admin/fetch-misconceptions-only
 (fn [_]
   (go
     (let [res (<! (crud/fetch-misconceptions))]
       (when (:success res)
         (re-frame/dispatch [:admin/misconceptions-only-loaded (or (:data res) [])]))))))

(re-frame/reg-event-db
 :admin/misconceptions-only-loaded
 (fn [db [_ rows]]
   (assoc-in db [:admin :misconceptions] rows)))

(re-frame/reg-fx
 :admin/fetch-modules-only
 (fn [_]
   (go
     (let [res (<! (crud/fetch-modules))]
       (when (:success res)
         (re-frame/dispatch [:admin/modules-loaded (or (:data res) [])]))))))

(re-frame/reg-event-db
 :admin/modules-loaded
 (fn [db [_ modules]]
   (assoc-in db [:admin :modules] modules)))

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
                          ;; Los cuatro `misconception_*_id` viajan al draft para que el
                          ;; selector muestre lo ya catalogado. Ojo: `crud/question-payload`
                          ;; solo manda las claves presentes, así que sacarlas de acá no
                          ;; «protege» nada — deja el selector ciego.
                          (select-keys row
                                       [:id :question :option_a :option_b :option_c :option_d
                                        :correct_option :error_a :error_b :error_c :error_d
                                        :topic :order_index :difficulty :module_id
                                        :misconception_a_id :misconception_b_id
                                        :misconception_c_id :misconception_d_id]))
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


(re-frame/reg-event-fx
 :admin/save-question
 (fn [{:keys [db]} _]
   (let [draft (get-in db [:admin :question-draft])]
     ;; Mismo criterio que muestra el formulario: `editor/question-missing-fields`
     ;; es la única definición de «completo». Cuando vivían separados, el editor
     ;; no podía decir qué faltaba y este evento respondía con una lista fija que
     ;; había que mantener a mano.
     (if-let [faltan (seq (editor/question-missing-fields draft))]
       {:dispatch [:admin/toast :error
                   (str "Para guardar falta: " (str/join ", " faltan) ".")]}
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
              ;; El panel de bandas lee su propia copia del banco. Sin invalidarla
              ;; acá, después de guardar sigue mostrando el «Hoy» viejo y parece
              ;; que la banda no se aplicó — se vio al usarlo.
              (assoc-in [:admin :all-questions] [])
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
   :min_response_seconds 2
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
                      ;; `initial_theta` y los cortes de fluidez viajan **solo si
                      ;; la fila los trae**, o sea si su migración está aplicada.
                      ;; `select-keys` ya se comporta así: una clave ausente en la
                      ;; fila no aparece en el draft, y `test-config-payload` la
                      ;; omite del upsert.
                      (update (select-keys row [:topic :display_name :min_items :max_items
                                                :se_threshold :prerequisite_topic :min_theta
                                                :max_minutes :active :initial_theta
                                                :prior_sd :guessing_c])
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

;; -----------------------------------------------------------------------------
;; Apariencia del sitio (ADR-022, migración 043)
;; -----------------------------------------------------------------------------
;; Estado propio (`[:admin :status :apariencia]`), como cada pestaña del panel:
;; un error acá no debe apagar el resto del admin.

(re-frame/reg-event-fx
 :admin/cargar-apariencia
 (fn [{:keys [db]} _]
   {:db (assoc-in db [:admin :status :apariencia :error] nil)
    :fx/cargar-apariencia nil}))

(re-frame/reg-fx
 :fx/cargar-apariencia
 (fn [_]
   (go
     (let [res (<! (crud/fetch-site-settings))]
       (if (:success res)
         (re-frame/dispatch [:admin/apariencia-cargada (get-in res [:data :theme_default])])
         (re-frame/dispatch [:admin/apariencia-error (:error res)]))))))

(re-frame/reg-event-db
 :admin/apariencia-cargada
 (fn [db [_ valor]]
   (-> db
       (assoc-in [:admin :apariencia] (or valor "sistema"))
       (assoc-in [:admin :status :apariencia :guardando?] false))))

(re-frame/reg-event-db
 :admin/apariencia-error
 (fn [db [_ error]]
   (-> db
       (assoc-in [:admin :status :apariencia :error] error)
       (assoc-in [:admin :status :apariencia :guardando?] false))))

(re-frame/reg-event-fx
 :admin/guardar-apariencia
 (fn [{:keys [db]} [_ valor]]
   ;; Se pinta el valor nuevo de inmediato y se confirma con la respuesta. Si la
   ;; policy rechaza (no es admin de verdad), `:admin/apariencia-error` lo dice y
   ;; la recarga devuelve el valor real: la UI no se queda mintiendo.
   {:db (-> db
            (assoc-in [:admin :apariencia] valor)
            (assoc-in [:admin :status :apariencia :guardando?] true)
            (assoc-in [:admin :status :apariencia :error] nil))
    :fx/guardar-apariencia {:valor valor
                            :user-id (get-in db [:auth :user :id])}}))

(re-frame/reg-fx
 :fx/guardar-apariencia
 (fn [{:keys [valor user-id]}]
   (go
     (let [res (<! (crud/update-site-settings! {:theme-default valor :user-id user-id}))]
       (if (:success res)
         (do (re-frame/dispatch [:admin/apariencia-cargada valor])
             (re-frame/dispatch [:toast/show {:kind :success
                                              :message "Apariencia por defecto actualizada."}]))
         (do (re-frame/dispatch [:admin/apariencia-error (:error res)])
             (re-frame/dispatch [:admin/cargar-apariencia])))))))

(re-frame/reg-sub
 :admin/apariencia
 (fn [db _] (get-in db [:admin :apariencia] "sistema")))

(re-frame/reg-sub
 :admin/apariencia-guardando?
 (fn [db _] (get-in db [:admin :status :apariencia :guardando?] false)))

(re-frame/reg-sub
 :admin/apariencia-error
 (fn [db _] (get-in db [:admin :status :apariencia :error])))

;; -----------------------------------------------------------------------------
;; Catálogo de misconceptions (T-103, sobre la migración 027)
;; -----------------------------------------------------------------------------
;;
;; La sección carga **dos** cosas: el catálogo y el banco completo de ítems. El
;; banco no es un lujo: sin él no se puede calcular el uso de cada idea errónea
;; ni la salud del catálogo, que son justamente las dos preguntas que esta
;; pestaña existe para responder. Van en paralelo, como en recursos.

(re-frame/reg-fx
 :admin/fetch-misconceptions!
 (fn [_]
   (go
     (let [mis-ch (crud/fetch-misconceptions)
           qs-ch (crud/fetch-admin-questions)
           mis (<! mis-ch)
           qs (<! qs-ch)]
       (if-let [err (or (:error mis) (:error qs))]
         (re-frame/dispatch [:admin/section-fail :misconceptions err])
         (re-frame/dispatch [:admin/misconceptions-bundle
                             (or (:data mis) [])
                             (or (:data qs) [])]))))))

(re-frame/reg-event-fx
 :admin/load-misconceptions
 (fn [{:keys [db]} _]
   (cond-> {:dispatch [:admin/section-start :misconceptions]
            :admin/fetch-misconceptions! nil}
     (empty? (get-in db [:admin :modules]))
     (assoc :admin/fetch-modules-only true))))

(re-frame/reg-event-fx
 :admin/misconceptions-bundle
 (fn [{:keys [db]} [_ misconceptions questions]]
   {:db (-> db
            (assoc-in [:admin :misconceptions] misconceptions)
            (assoc-in [:admin :misconception-usage]
                      (mis/usage-index questions))
            (assoc-in [:admin :misconception-bank-size] (count questions)))
    :dispatch [:admin/section-ok :misconceptions]}))

(re-frame/reg-sub
 :admin/misconceptions
 (fn [db _]
   (get-in db [:admin :misconceptions] [])))

(re-frame/reg-sub
 :admin/misconception-usage
 (fn [db _]
   (get-in db [:admin :misconception-usage] {})))

(re-frame/reg-sub
 :admin/misconception-search
 (fn [db _]
   (get-in db [:admin :misconception-search] "")))

(re-frame/reg-sub
 :admin/misconception-draft
 (fn [db _]
   (get-in db [:admin :misconception-draft])))

(re-frame/reg-sub
 :admin/misconception-saving?
 (fn [db _]
   (get-in db [:admin :misconception-saving?] false)))

;; Lista visible: uso adjunto, ordenada por uso y filtrada por la búsqueda. Toda
;; la regla vive en `universo.misconceptions`; acá solo se cablea.
(re-frame/reg-sub
 :admin/misconceptions-view
 :<- [:admin/misconceptions]
 :<- [:admin/misconception-usage]
 :<- [:admin/misconception-search]
 (fn [[rows usage query] _]
   (->> (mis/with-usage rows usage)
        (filterv #(mis/matches? query %)))))

(re-frame/reg-sub
 :admin/misconception-bank-size
 (fn [db _]
   (get-in db [:admin :misconception-bank-size] 0)))

(re-frame/reg-sub
 :admin/misconceptions-health
 :<- [:admin/misconceptions]
 :<- [:admin/misconception-usage]
 :<- [:admin/misconception-bank-size]
 (fn [[rows usage bank-size] _]
   (mis/health-from-usage rows usage bank-size)))

(re-frame/reg-event-db
 :admin/set-misconception-search
 (fn [db [_ q]]
   (assoc-in db [:admin :misconception-search] (or q ""))))

(def blank-misconception
  {:id nil :slug "" :name "" :description "" :module_id nil})

(re-frame/reg-event-db
 :admin/new-misconception
 (fn [db _]
   (assoc-in db [:admin :misconception-draft] blank-misconception)))

(re-frame/reg-event-db
 :admin/edit-misconception
 (fn [db [_ row]]
   (assoc-in db [:admin :misconception-draft]
             (merge blank-misconception
                    (select-keys row [:id :slug :name :description :module_id])))))

(re-frame/reg-event-db
 :admin/cancel-misconception-edit
 (fn [db _]
   (assoc-in db [:admin :misconception-draft] nil)))

(re-frame/reg-event-db
 :admin/update-misconception-draft
 (fn [db [_ k v]]
   (assoc-in db [:admin :misconception-draft k] v)))

;; Escribir el nombre y que el slug se proponga solo es la diferencia entre
;; llenar dos campos y llenar uno. Deja de proponer en cuanto el autor toca el
;; slug a mano: sobrescribir lo que alguien acaba de escribir es peor que no
;; ayudar. Por eso el evento es distinto del genérico de arriba.
(re-frame/reg-event-db
 :admin/update-misconception-name
 (fn [db [_ nombre]]
   (let [draft (get-in db [:admin :misconception-draft])
         sugerido (mis/suggest-slug (:name draft))
         intacto? (or (str/blank? (str (:slug draft)))
                      (= (:slug draft) sugerido))]
     (update-in db [:admin :misconception-draft]
                (fn [d]
                  (cond-> (assoc d :name nombre)
                    intacto? (assoc :slug (or (mis/suggest-slug nombre) ""))))))))

(re-frame/reg-event-fx
 :admin/save-misconception
 (fn [{:keys [db]} _]
   (let [draft (get-in db [:admin :misconception-draft])]
     (cond
       (str/blank? (str (:name draft)))
       {:dispatch [:admin/toast :error "La idea errónea necesita un nombre."]}

       ;; El check de `027` es la autoridad; esto solo evita el viaje de ida y
       ;; vuelta para enterarse.
       (not (mis/slug-valid? (str/trim (str (:slug draft)))))
       {:dispatch [:admin/toast :error
                   "El slug solo admite minúsculas, dígitos y - o / como separadores."]}

       :else
       {:db (assoc-in db [:admin :misconception-saving?] true)
        :admin/persist-misconception draft}))))

(re-frame/reg-fx
 :admin/persist-misconception
 (fn [draft]
   (go
     (let [result (<! (crud/upsert-misconception! draft))]
       (if (:success result)
         (re-frame/dispatch [:admin/misconception-saved])
         (re-frame/dispatch [:admin/misconception-failed
                             (or (:error result) "No se pudo guardar")]))))))

(re-frame/reg-event-fx
 :admin/misconception-saved
 (fn [{:keys [db]} [_ mensaje]]
   {:db (-> db
            (assoc-in [:admin :misconception-saving?] false)
            (assoc-in [:admin :misconception-draft] nil))
    :dispatch-n [[:admin/toast :success (or mensaje "Idea errónea guardada.")]
                 [:admin/load-misconceptions]]}))

(re-frame/reg-event-fx
 :admin/misconception-failed
 (fn [{:keys [db]} [_ msg]]
   {:db (assoc-in db [:admin :misconception-saving?] false)
    :dispatch [:admin/toast :error msg]}))

(re-frame/reg-event-fx
 :admin/delete-misconception
 (fn [{:keys [db]} [_ id]]
   {:db (assoc-in db [:admin :misconception-saving?] true)
    :admin/remove-misconception id}))

(re-frame/reg-fx
 :admin/remove-misconception
 (fn [id]
   (go
     (let [result (<! (crud/delete-misconception! id))]
       (if (:success result)
         (re-frame/dispatch [:admin/misconception-saved "Idea errónea eliminada."])
         (re-frame/dispatch [:admin/misconception-failed
                             (or (:error result) "No se pudo eliminar")]))))))

;; -----------------------------------------------------------------------------
;; Bandas de conocimiento (migración 046)
;; -----------------------------------------------------------------------------
;;
;; La herramienta vive en la pestaña de Preguntas y **no escribe sola**: llena
;; `[:admin :question-inline-edits]`, que es el mismo borrador que usa la edición
;; en línea de la tabla. Eso da gratis el «N dificultades editadas sin guardar»,
;; el botón de descartar y una única ruta de guardado. Aplicar una banda es
;; proponer, no ejecutar.

(re-frame/reg-fx
 :admin/fetch-all-questions
 (fn [_]
   (go
     ;; Sin filtro de tema a propósito: las bandas se calculan sobre el banco
     ;; completo. Con el filtro puesto, un módulo parecería tener tres ítems
     ;; cuando tiene treinta, y el reparto saldría mal.
     (let [res (<! (crud/fetch-admin-questions))]
       (if (:success res)
         (re-frame/dispatch [:admin/all-questions-loaded (or (:data res) [])])
         (re-frame/dispatch [:admin/toast :error
                             (or (:error res) "No se pudo cargar el banco para las bandas")]))))))

(re-frame/reg-event-fx
 :admin/open-bands
 (fn [{:keys [db]} _]
   ;; Se re-pide el banco si la copia está vacía, que es como queda tras guardar
   ;; dificultades: abrir el panel siempre muestra el estado real.
   (cond-> {:db (assoc-in db [:admin :bands-open?] true)}
     (empty? (get-in db [:admin :all-questions]))
     (assoc :admin/fetch-all-questions nil)

     (empty? (get-in db [:admin :modules]))
     (assoc :admin/fetch-modules-only true))))

(re-frame/reg-event-db
 :admin/close-bands
 (fn [db _]
   (assoc-in db [:admin :bands-open?] false)))

(re-frame/reg-event-db
 :admin/all-questions-loaded
 (fn [db [_ rows]]
   (assoc-in db [:admin :all-questions] rows)))

(re-frame/reg-sub
 :admin/bands-open?
 (fn [db _] (get-in db [:admin :bands-open?] false)))

(re-frame/reg-sub
 :admin/all-questions
 (fn [db _] (get-in db [:admin :all-questions] [])))

(re-frame/reg-sub
 :admin/band-draft
 (fn [db _] (get-in db [:admin :band-draft] {})))

;; Los módulos en orden curricular, cada uno con su banda efectiva y con lo que
;; hoy tienen sus ítems. Ese «hoy» es la mitad que importa: sin él, el admin no
;; puede ver que `polinomios` está aplastado en 0,045 logits.
(re-frame/reg-sub
 :admin/bands-view
 :<- [:admin/modules]
 :<- [:admin/all-questions]
 (fn [[modules questions] _]
   (let [derivadas (bands/default-bands modules)
         por-modulo (group-by :module_id (or questions []))]
     (mapv (fn [m]
             (let [items (get por-modulo (:id m) [])
                   dificultades (keep :difficulty items)]
               {:module m
                :banda (bands/band-for m derivadas)
                :n-items (count items)
                :actual-min (when (seq dificultades) (apply min dificultades))
                :actual-max (when (seq dificultades) (apply max dificultades))}))
           (bands/curricular-order modules)))))

(re-frame/reg-event-db
 :admin/update-band-draft
 (fn [db [_ module-id k v]]
   (assoc-in db [:admin :band-draft module-id k] v)))

(re-frame/reg-event-fx
 :admin/save-module-band
 (fn [{:keys [db]} [_ module-id]]
   (let [draft (get-in db [:admin :band-draft module-id])
         lo (js/parseFloat (str (:band-min draft)))
         hi (js/parseFloat (str (:band-max draft)))
         ;; `046` aplicada = las columnas llegaron en el select. Se mira una fila
         ;; real y no una bandera de configuración: la base es la que sabe.
         existen? (some #(contains? % :band_min) (get-in db [:admin :modules] []))]
     (if (or (js/isNaN lo) (js/isNaN hi) (> lo hi))
       {:dispatch [:admin/toast :error "La banda necesita un mínimo y un máximo, y el mínimo no puede ser mayor."]}
       {:admin/persist-module-band {:id module-id :band-min lo :band-max hi :existen? existen?}}))))

(re-frame/reg-fx
 :admin/persist-module-band
 (fn [{:keys [id band-min band-max existen?]}]
   (go
     (let [res (<! (crud/update-module-band! id {:band-min band-min :band-max band-max} existen?))]
       (if (:success res)
         (re-frame/dispatch [:admin/module-band-saved])
         (re-frame/dispatch [:admin/toast :error (or (:error res) "No se pudo guardar la banda")]))))))

(re-frame/reg-event-fx
 :admin/module-band-saved
 (fn [_ _]
   ;; `:admin/fetch-modules-only` es un **efecto**, no un evento: va como clave
   ;; del mapa. Despacharlo como evento no habría hecho nada y la banda recién
   ;; guardada seguiría mostrándose vieja hasta recargar.
   {:admin/fetch-modules-only true
    :dispatch [:admin/toast :success "Banda guardada."]}))

;; Aplicar = llenar el borrador de ediciones en línea. No escribe nada todavía.
(re-frame/reg-event-fx
 :admin/apply-band
 (fn [{:keys [db]} [_ module-id]]
   (let [modules (get-in db [:admin :modules] [])
         derivadas (bands/default-bands modules)
         m (first (filter #(= (:id %) module-id) modules))
         banda (bands/band-for m derivadas)
         items (filter #(= (:module_id %) module-id) (get-in db [:admin :all-questions] []))
         cambios (bands/changed (bands/assign items banda))]
     (if (empty? cambios)
       {:dispatch [:admin/toast :success "Ese módulo ya está dentro de su banda: no hay nada que cambiar."]}
       {:db (update-in db [:admin :question-inline-edits]
                       merge
                       (into {} (map (juxt :id #(str (:difficulty-despues %)))) cambios))
        :dispatch [:admin/toast :success
                   (str (count cambios)
                        (if (= 1 (count cambios))
                          " dificultad propuesta. Revísala y guarda."
                          " dificultades propuestas. Revísalas y guarda."))]}))))

(re-frame/reg-event-fx
 :admin/apply-all-bands
 (fn [{:keys [db]} _]
   (let [modules (get-in db [:admin :modules] [])
         derivadas (bands/default-bands modules)
         questions (get-in db [:admin :all-questions] [])
         por-modulo (group-by :module_id questions)
         cambios (mapcat (fn [m]
                           (bands/changed
                            (bands/assign (get por-modulo (:id m) [])
                                          (bands/band-for m derivadas))))
                         modules)]
     (if (empty? cambios)
       {:dispatch [:admin/toast :success "Todo el banco ya está dentro de sus bandas."]}
       {:db (update-in db [:admin :question-inline-edits]
                       merge
                       (into {} (map (juxt :id #(str (:difficulty-despues %)))) cambios))
        :dispatch [:admin/toast :success
                   (str (count cambios) " dificultades propuestas en todo el banco. "
                        "Revísalas antes de guardar.")]}))))

;; -----------------------------------------------------------------------------
;; Selección múltiple y acciones en lote sobre el banco
;; -----------------------------------------------------------------------------
;;
;; Por qué existe: el 2026-08-18 se midió que **los 84 ítems del diagnóstico y
;; los 44 de `paes_m1` no tienen `module_id`**. Sin módulo no hay banda que los
;; alcance, no hay material que el plan pueda recomendar y no hay recurso que el
;; escape pueda entregar. Arreglarlo de a un ítem son cuatro clics por ítem; en
;; lote son tres clics por grupo, y es la diferencia entre que se haga y que no.
;;
;; A diferencia de las bandas, esto **sí escribe al confirmar**: mover de tema o
;; asignar módulo no tiene un «antes y después» que revisar — se ve en la tabla.

(re-frame/reg-sub
 :admin/question-selection
 (fn [db _] (get-in db [:admin :question-selection] #{})))

(re-frame/reg-sub
 :admin/question-bulk-saving?
 (fn [db _] (get-in db [:admin :question-bulk-saving?] false)))

(re-frame/reg-event-db
 :admin/toggle-question-selection
 (fn [db [_ id]]
   (update-in db [:admin :question-selection] (fnil (fn [s] (if (contains? s id) (disj s id) (conj s id))) #{}) )))

(re-frame/reg-event-db
 :admin/select-questions
 (fn [db [_ ids]]
   (assoc-in db [:admin :question-selection] (set ids))))

(re-frame/reg-event-db
 :admin/clear-question-selection
 (fn [db _]
   (assoc-in db [:admin :question-selection] #{})))

(re-frame/reg-event-fx
 :admin/bulk-update-questions
 (fn [{:keys [db]} [_ campos]]
   (let [ids (get-in db [:admin :question-selection] #{})]
     (if (empty? ids)
       {:dispatch [:admin/toast :error "No hay ítems seleccionados."]}
       {:db (assoc-in db [:admin :question-bulk-saving?] true)
        :admin/persist-bulk-questions {:ids ids :campos campos}}))))

(re-frame/reg-fx
 :admin/persist-bulk-questions
 (fn [{:keys [ids campos]}]
   (go
     ;; En serie y no en paralelo: son escrituras contra producción y un lote de
     ;; 80 peticiones simultáneas contra el free tier de Supabase es la forma
     ;; conocida de que la mitad falle sin saber cuál. Mismo criterio que
     ;; `:admin/persist-inline-question-edits`.
     (loop [pendientes (seq ids) ok [] fallidos []]
       (if (empty? pendientes)
         (re-frame/dispatch [:admin/bulk-questions-done {:ok ok :fallidos fallidos}])
         (let [id (first pendientes)
               r (<! (crud/patch-admin-question-fields! id campos))]
           (if (:success r)
             (recur (rest pendientes) (conj ok id) fallidos)
             (recur (rest pendientes) ok (conj fallidos id)))))))))

(re-frame/reg-event-fx
 :admin/bulk-questions-done
 (fn [{:keys [db]} [_ {:keys [ok fallidos]}]]
   {:db (-> db
            (assoc-in [:admin :question-bulk-saving?] false)
            (assoc-in [:admin :question-selection] #{})
            (assoc-in [:admin :all-questions] [])
            (update-in [:admin :status :questions] dissoc :loaded-at))
    :dispatch-n (cond-> [[:admin/load-questions]]
                  (seq ok)
                  (conj [:admin/toast :success
                         (str (count ok) (if (= 1 (count ok)) " ítem actualizado." " ítems actualizados."))])
                  (seq fallidos)
                  (conj [:admin/toast :error
                         (str "No se pudieron actualizar " (count fallidos) ".")]))}))

;; -----------------------------------------------------------------------------
;; Vista de catalogación (T-57 paso 2)
;; -----------------------------------------------------------------------------
;;
;; Una fila por distractor en vez de un formulario por ítem. El cambio de unidad
;; es el punto: catalogar los 64 ítems del diagnóstico abriendo el editor de cada
;; uno son cuatro clics por ítem antes de leer nada; acá se barre un módulo de
;; corrido leyendo la opción y su explicación, que es lo único que hace falta
;; para decidir qué idea errónea hay detrás.
;;
;; **Escribe al instante, campo por campo.** No hay borrador ni botón de guardar:
;; cada cambio es un `update` de una sola columna, y deshacer es volver a elegir.
;; Un borrador acá pondría un paso entre leer y decidir, que es justo el paso que
;; esta vista existe para quitar.

(re-frame/reg-sub
 :admin/catalog-module
 (fn [db _] (get-in db [:admin :catalog-module] "")))

(re-frame/reg-event-fx
 :admin/open-catalog
 (fn [{:keys [db]} _]
   (cond-> {:db (assoc-in db [:admin :catalog-open?] true)}
     (empty? (get-in db [:admin :all-questions]))
     (assoc :admin/fetch-all-questions nil)

     (empty? (get-in db [:admin :modules]))
     (assoc :admin/fetch-modules-only true)

     (empty? (get-in db [:admin :misconceptions]))
     (assoc :admin/fetch-misconceptions-only true))))

(re-frame/reg-event-db
 :admin/close-catalog
 (fn [db _] (assoc-in db [:admin :catalog-open?] false)))

(re-frame/reg-sub
 :admin/catalog-open?
 (fn [db _] (get-in db [:admin :catalog-open?] false)))

(re-frame/reg-event-db
 :admin/set-catalog-module
 (fn [db [_ module-id]]
   (assoc-in db [:admin :catalog-module] (or module-id ""))))

;; Las filas del módulo elegido. Sin módulo elegido no se devuelve nada a
;; propósito: 510 distractores en una sola lista no es una herramienta de
;; trabajo, y `027` dice que se cataloga **un módulo a la vez**.
(re-frame/reg-sub
 :admin/catalog-rows
 :<- [:admin/all-questions]
 :<- [:admin/catalog-module]
 (fn [[questions module-id] _]
   (if (str/blank? (str module-id))
     []
     (editor/distractor-rows
      (filterv #(= (:module_id %) module-id) questions)))))

(re-frame/reg-sub
 :admin/catalog-progress
 :<- [:admin/catalog-rows]
 (fn [rows _] (editor/catalog-progress rows)))

;; Escritura de un solo campo de un ítem, con la copia local actualizada en el
;; acto: sin eso la fila «salta» al valor viejo hasta que llegue la respuesta.
(re-frame/reg-event-fx
 :admin/patch-question-field
 (fn [{:keys [db]} [_ question-id campo valor]]
   {:db (update-in db [:admin :all-questions]
                   (fn [qs] (mapv #(if (= (:id %) question-id) (assoc % campo valor) %) qs)))
    :admin/persist-question-field {:id question-id :campo campo :valor valor}}))

(re-frame/reg-fx
 :admin/persist-question-field
 (fn [{:keys [id campo valor]}]
   (go
     (let [r (<! (crud/patch-admin-question-fields! id {campo valor}))]
       (when-not (:success r)
         (re-frame/dispatch [:admin/toast :error
                             (str "No se pudo guardar: " (or (:error r) "error desconocido"))]))))))

;; Crear la idea errónea **desde la fila** y asignarla de una vez. Es la
;; diferencia entre catalogar y abandonar: leyendo un distractor uno sabe qué
;; idea falta, y mandar al autor a otra pestaña a crearla —y volver a buscar
;; dónde estaba— es donde se pierde el hilo.
(re-frame/reg-event-fx
 :admin/quick-misconception
 (fn [{:keys [db]} [_ {:keys [nombre question-id campo module-id]}]]
   (let [n (str/trim (str nombre))
         ;; El slug se namespacia con el sufijo del slug del módulo
         ;; (`aritmetica/fracciones` → `fracciones/...`), que es la convención
         ;; que 027 propone y que el quick-create no aplicaba: las primeras 12
         ;; ideas del producto quedaron planas. Namespaciar acá es gratis porque
         ;; la vista ya sabe en qué módulo se está catalogando.
         prefijo (some->> (get-in db [:admin :modules])
                          (filter #(= (:id %) module-id))
                          first :slug (re-find #"[^/]+$"))
         base (mis/suggest-slug n)
         slug (if (and prefijo base (mis/slug-valid? (str prefijo "/" base)))
                (str prefijo "/" base)
                base)]
     (cond
       (str/blank? n)
       {:dispatch [:admin/toast :error "La idea errónea necesita un nombre."]}

       (not (mis/slug-valid? slug))
       {:dispatch [:admin/toast :error
                   "Con ese nombre no sale un slug válido: usa letras y dígitos."]}

       :else
       {:db (assoc-in db [:admin :quick-mis-saving?] true)
        :admin/persist-quick-misconception
        {:row {:name n :slug slug :module_id module-id}
         :question-id question-id :campo campo}}))))

(re-frame/reg-fx
 :admin/persist-quick-misconception
 (fn [{:keys [row question-id campo]}]
   (go
     (let [r (<! (crud/upsert-misconception! row))]
       (if (:success r)
         (re-frame/dispatch [:admin/quick-misconception-created
                             {:mis (:data r) :question-id question-id :campo campo}])
         (re-frame/dispatch [:admin/quick-misconception-failed
                             (or (:error r) "No se pudo crear")]))))))

(re-frame/reg-event-fx
 :admin/quick-misconception-created
 (fn [{:keys [db]} [_ {:keys [mis question-id campo]}]]
   {:db (-> db
            (assoc-in [:admin :quick-mis-saving?] false)
            ;; Entra al catálogo en memoria para que el selector de las demás
            ;; filas la ofrezca de inmediato, que es cuando más se necesita: la
            ;; misma idea suele repetirse en los ítems vecinos.
            (update-in [:admin :misconceptions] (fnil conj []) mis))
    :dispatch-n [[:admin/patch-question-field question-id campo (:id mis)]
                 [:admin/toast :success (str "«" (:name mis) "» creada y asignada.")]]}))

(re-frame/reg-event-fx
 :admin/quick-misconception-failed
 (fn [{:keys [db]} [_ msg]]
   {:db (assoc-in db [:admin :quick-mis-saving?] false)
    :dispatch [:admin/toast :error msg]}))

(re-frame/reg-sub
 :admin/quick-mis-saving?
 (fn [db _] (get-in db [:admin :quick-mis-saving?] false)))

;; «Abrir el ítem» desde la catalogación. **No se puede despachar
;; `:admin/edit-question` con solo el id**: ese evento arma el draft con
;; `select-keys` sobre lo que recibe y lo mezcla con el borrador vacío, así que
;; con un mapa de una sola clave el enunciado y las cuatro opciones quedarían en
;; "" — y guardar borraría el ítem. Se busca la fila completa y se cambia de
;; pestaña, que es lo que el autor espera al pulsar.
(re-frame/reg-event-fx
 :admin/edit-question-by-id
 (fn [{:keys [db]} [_ question-id]]
   (if-let [row (first (filter #(= (:id %) question-id)
                               (get-in db [:admin :all-questions] [])))]
     {:dispatch-n [[:admin/set-tab :questions]
                   [:admin/edit-question row]]}
     {:dispatch [:admin/toast :error "No se encontró ese ítem en el banco cargado."]})))

;; Envolver en `$…$` las alternativas de los ítems seleccionados.
;;
;; Es una operación mecánica —agrega delimitadores, no reescribe contenido— e
;; **idempotente**, así que puede correrse dos veces sin daño. Aun así se
;; confirma diciendo cuántas alternativas van a cambiar: 40 de 48 no es lo mismo
;; que 3 de 48, y el autor merece saber cuál de los dos está por hacer.
(re-frame/reg-event-fx
 :admin/bulk-wrap-options
 (fn [{:keys [db]} _]
   (let [ids (get-in db [:admin :question-selection] #{})
         ;; Las dos listas: la de la tabla (filtrada por tema, que es de donde
         ;; sale la selección) y la copia completa que llenan las bandas y la
         ;; catalogación. Antes solo miraba la segunda, que en la pestaña de
         ;; preguntas suele estar vacía — el resultado era «ninguna alternativa
         ;; necesita delimitadores» con 16 ítems seleccionados que sí las
         ;; necesitaban, o sea un no-op silencioso.
         candidatos (->> (concat (get-in db [:admin :questions] [])
                                 (get-in db [:admin :all-questions] []))
                         (reduce (fn [acc q] (assoc acc (:id q) q)) {})
                         vals)
         qs (filterv #(contains? ids (:id %)) candidatos)
         cambios (into {} (keep (fn [q]
                                  (let [w (editor/option-wraps q)]
                                    (when (seq w) [(:id q) w])))
                                qs))]
     (cond
       (empty? ids)
       {:dispatch [:admin/toast :error "No hay ítems seleccionados."]}

       (empty? cambios)
       {:dispatch [:admin/toast :success
                   "Ninguna alternativa de la selección necesita delimitadores."]}

       :else
       {:db (assoc-in db [:admin :question-bulk-saving?] true)
        :admin/persist-wrapped-options cambios}))))

(re-frame/reg-fx
 :admin/persist-wrapped-options
 (fn [cambios]
   (go
     (loop [pendientes (seq cambios) ok [] fallidos []]
       (if (empty? pendientes)
         (re-frame/dispatch [:admin/bulk-questions-done {:ok ok :fallidos fallidos}])
         (let [[id campos] (first pendientes)
               r (<! (crud/patch-admin-question-fields! id campos))]
           (if (:success r)
             (recur (rest pendientes) (conj ok id) fallidos)
             (recur (rest pendientes) ok (conj fallidos id)))))))))
