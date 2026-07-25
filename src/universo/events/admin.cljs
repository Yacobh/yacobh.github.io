(ns universo.events.admin
  (:require
   [re-frame.core :as re-frame]
   [cljs.core.async :refer [go <!]]
   [universo.db.crud :as crud]
   [universo.events.dashboard :as dash]))

;; -----------------------------------------------------------------------------
;; Suscripciones
;; -----------------------------------------------------------------------------

(re-frame/reg-sub
 :admin/tab
 (fn [db _]
   (get-in db [:admin :tab] :users)))

(re-frame/reg-sub
 :admin/loading?
 (fn [db _]
   (get-in db [:admin :loading?] false)))

(re-frame/reg-sub
 :admin/error
 (fn [db _]
   (get-in db [:admin :error])))

(re-frame/reg-sub
 :admin/profiles
 (fn [db _]
   (get-in db [:admin :profiles] [])))

(re-frame/reg-sub
 :admin/tests
 (fn [db _]
   (get-in db [:admin :tests] [])))

(re-frame/reg-sub
 :admin/guestbook
 (fn [db _]
   (get-in db [:admin :guestbook] [])))

(re-frame/reg-sub
 :admin/guestbook-filter
 (fn [db _]
   (get-in db [:admin :guestbook-filter] :pending)))

;; -----------------------------------------------------------------------------
;; Tab + carga
;; -----------------------------------------------------------------------------

(re-frame/reg-event-fx
 :admin/set-tab
 (fn [{:keys [db]} [_ tab]]
   {:db (assoc-in db [:admin :tab] tab)
    :dispatch (case tab
                :users [:admin/load-profiles]
                :tests [:admin/load-tests]
                :guestbook [:admin/load-guestbook]
                :resources [:admin/load-resources]
                :slots [:admin/load-slots]
                [:admin/load-profiles])}))

(re-frame/reg-event-fx
 :admin/enter
 (fn [{:keys [db]} _]
   (let [tab (get-in db [:admin :tab] :users)]
     {:dispatch [:admin/set-tab tab]})))

(re-frame/reg-event-db
 :admin/loading
 (fn [db [_ loading?]]
   (-> db
       (assoc-in [:admin :loading?] loading?)
       (cond-> loading? (assoc-in [:admin :error] nil)))))

(re-frame/reg-event-db
 :admin/set-error
 (fn [db [_ msg]]
   (-> db
       (assoc-in [:admin :loading?] false)
       (assoc-in [:admin :error] msg))))

;; -----------------------------------------------------------------------------
;; Profiles
;; -----------------------------------------------------------------------------

(re-frame/reg-event-fx
 :admin/load-profiles
 (fn [{:keys [db]} _]
   {:db (-> db
            (assoc-in [:admin :loading?] true)
            (assoc-in [:admin :error] nil))
    :admin/fetch-profiles nil}))

(re-frame/reg-fx
 :admin/fetch-profiles
 (fn [_]
   (go
     (let [result (<! (crud/fetch-admin-profiles))]
       (if (:success result)
         (re-frame/dispatch [:admin/profiles-loaded (:data result)])
         (re-frame/dispatch [:admin/set-error (or (:error result)
                                                 "No se pudieron cargar usuarios")]))))))

(re-frame/reg-event-db
 :admin/profiles-loaded
 (fn [db [_ rows]]
   (-> db
       (assoc-in [:admin :loading?] false)
       (assoc-in [:admin :profiles] (or rows []))
       (assoc-in [:admin :error] nil))))

;; -----------------------------------------------------------------------------
;; Tests
;; -----------------------------------------------------------------------------

(re-frame/reg-event-fx
 :admin/load-tests
 (fn [{:keys [db]} _]
   {:db (-> db
            (assoc-in [:admin :loading?] true)
            (assoc-in [:admin :error] nil))
    :admin/fetch-tests nil}))

(re-frame/reg-fx
 :admin/fetch-tests
 (fn [_]
   (go
     (let [result (<! (crud/fetch-admin-tests 100))]
       (if (:success result)
         (re-frame/dispatch [:admin/tests-loaded (:data result)])
         (re-frame/dispatch [:admin/set-error (or (:error result)
                                                 "No se pudieron cargar tests")]))))))

(re-frame/reg-event-db
 :admin/tests-loaded
 (fn [db [_ rows]]
   (let [summaries (mapv (fn [row]
                           (let [email (or (get row (keyword "email-user"))
                                           (:email-user row)
                                           (:email_user row))]
                             (-> (dash/procesar-test-resumen row)
                                 (assoc :email email)
                                 (assoc :user-id (:user_id row)))))
                         (or rows []))]
     (-> db
         (assoc-in [:admin :loading?] false)
         (assoc-in [:admin :tests] summaries)
         (assoc-in [:admin :error] nil)))))

;; -----------------------------------------------------------------------------
;; Guestbook
;; -----------------------------------------------------------------------------

(re-frame/reg-event-fx
 :admin/set-guestbook-filter
 (fn [{:keys [db]} [_ filter-mode]]
   {:db (assoc-in db [:admin :guestbook-filter] filter-mode)
    :dispatch [:admin/load-guestbook]}))

(re-frame/reg-event-fx
 :admin/load-guestbook
 (fn [{:keys [db]} _]
   (let [filter-mode (get-in db [:admin :guestbook-filter] :pending)]
     {:db (-> db
              (assoc-in [:admin :loading?] true)
              (assoc-in [:admin :error] nil))
      :admin/fetch-guestbook filter-mode})))

(re-frame/reg-fx
 :admin/fetch-guestbook
 (fn [filter-mode]
   (go
     (let [result (<! (crud/fetch-admin-guestbook filter-mode))]
       (if (:success result)
         (re-frame/dispatch [:admin/guestbook-loaded (:data result)])
         (re-frame/dispatch [:admin/set-error (or (:error result)
                                                 "No se pudo cargar el guestbook")]))))))

(re-frame/reg-event-db
 :admin/guestbook-loaded
 (fn [db [_ rows]]
   (-> db
       (assoc-in [:admin :loading?] false)
       (assoc-in [:admin :guestbook] (or rows []))
       (assoc-in [:admin :error] nil))))

(re-frame/reg-event-fx
 :admin/approve-guestbook
 (fn [_ [_ entry-id]]
   {:admin/update-guestbook-approval [entry-id true]}))

(re-frame/reg-event-fx
 :admin/reject-guestbook
 (fn [_ [_ entry-id]]
   {:admin/update-guestbook-approval [entry-id false]}))

(re-frame/reg-event-fx
 :admin/restore-guestbook
 (fn [_ [_ entry-id]]
   {:admin/update-guestbook-approval [entry-id nil]}))

(re-frame/reg-fx
 :admin/update-guestbook-approval
 (fn [[entry-id approved]]
   (go
     (let [result (<! (crud/update-guestbook-approval! entry-id approved))]
       (if (:success result)
         (re-frame/dispatch [:admin/load-guestbook])
         (re-frame/dispatch [:admin/set-error (or (:error result)
                                                 "No se pudo actualizar la entrada")]))))))

(re-frame/reg-event-fx
 :admin/delete-guestbook
 (fn [_ [_ entry-id]]
   {:admin/remove-guestbook entry-id}))

(re-frame/reg-fx
 :admin/remove-guestbook
 (fn [entry-id]
   (go
     (let [result (<! (crud/delete-admin-guestbook! entry-id))]
       (if (:success result)
         (re-frame/dispatch [:admin/load-guestbook])
         (re-frame/dispatch [:admin/set-error (or (:error result)
                                                 "No se pudo eliminar la entrada")]))))))
