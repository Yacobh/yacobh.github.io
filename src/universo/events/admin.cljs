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
   [universo.db.crud :as crud]
   [universo.events.dashboard :as dash]))

(def page-size 20)

(def ^:private tab->loader
  {:overview :admin/load-overview
   :users :admin/load-profiles
   :tests :admin/load-tests
   :resources :admin/load-resources
   :slots :admin/load-slots
   :guestbook :admin/load-guestbook})

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
    :admin/fetch-profiles nil}))

(re-frame/reg-event-fx
 :admin/profiles-loaded
 (fn [{:keys [db]} [_ rows]]
   {:db (assoc-in db [:admin :profiles] (or rows []))
    :dispatch [:admin/section-ok :users]}))

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
