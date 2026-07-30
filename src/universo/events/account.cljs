(ns universo.events.account
  "Autogestión de cuenta del usuario, fuera del panel de admin: editar
   nombre/teléfono propios y solicitar la eliminación de la cuenta (que llega
   al admin como notificación en la pestaña Usuarios). No borra nada por sí
   sola — el borrado real de auth.users sigue siendo manual, vía Supabase."
  (:require
   [re-frame.core :as re-frame]
   [cljs.core.async :refer [go <!]]
   [universo.db.crud :as crud]))

;; -----------------------------------------------------------------------------
;; Perfil propio (nombre, teléfono)
;; -----------------------------------------------------------------------------

(re-frame/reg-sub
 :account/profile
 (fn [db _]
   (get-in db [:account :profile])))

(re-frame/reg-sub
 :account/profile-loading?
 (fn [db _]
   (get-in db [:account :profile-loading?] false)))

;; nil | :saving | :saved | :error
(re-frame/reg-sub
 :account/save-status
 (fn [db _]
   (get-in db [:account :save-status])))

(re-frame/reg-fx
 :account/fetch-profile!
 (fn [user-id]
   (when user-id
     (go
       (let [result (<! (crud/fetch-own-profile user-id))]
         (re-frame/dispatch [:account/profile-loaded (when (:success result) (:data result))]))))))

(re-frame/reg-event-fx
 :account/load-profile
 (fn [{:keys [db]} _]
   (let [user-id (get-in db [:auth :user :id])]
     {:db (assoc-in db [:account :profile-loading?] true)
      :account/fetch-profile! user-id})))

(re-frame/reg-event-db
 :account/profile-loaded
 (fn [db [_ data]]
   (-> db
       (assoc-in [:account :profile-loading?] false)
       (assoc-in [:account :profile] data))))

(re-frame/reg-fx
 :account/save-profile!
 (fn [{:keys [user-id full-name phone contact-preference]}]
   (go
     (let [result (<! (crud/update-own-profile!
                        user-id
                        {:full-name full-name :phone phone
                         :contact-preference contact-preference}))]
       (re-frame/dispatch [:account/profile-saved result])))))

(re-frame/reg-event-fx
 :account/save-profile
 (fn [{:keys [db]} [_ {:keys [full-name phone contact-preference]}]]
   (let [user-id (get-in db [:auth :user :id])]
     (if-not user-id
       {}
       {:db (assoc-in db [:account :save-status] :saving)
        :account/save-profile! {:user-id user-id :full-name full-name :phone phone
                                 :contact-preference contact-preference}}))))

(re-frame/reg-event-db
 :account/profile-saved
 (fn [db [_ result]]
   (if (:success result)
     (-> db
         (assoc-in [:account :save-status] :saved)
         (assoc-in [:account :profile] (:data result)))
     (assoc-in db [:account :save-status] :error))))

;; -----------------------------------------------------------------------------
;; Solicitud de eliminación de cuenta
;; -----------------------------------------------------------------------------

(re-frame/reg-sub
 :account/deletion-request-status
 (fn [db _]
   (get-in db [:account :deletion-request-status])))

(re-frame/reg-fx
 :account/request-deletion!
 (fn [{:keys [user-id email]}]
   (go
     (let [result (<! (crud/request-account-deletion! user-id email))]
       (re-frame/dispatch [:account/deletion-request-done (:success result)])))))

(re-frame/reg-event-fx
 :account/request-deletion
 (fn [{:keys [db]} _]
   (let [user-id (get-in db [:auth :user :id])
         email (get-in db [:auth :user :email])]
     (if-not user-id
       {}
       {:db (assoc-in db [:account :deletion-request-status] :sending)
        :account/request-deletion! {:user-id user-id :email email}}))))

(re-frame/reg-event-db
 :account/deletion-request-done
 (fn [db [_ success?]]
   (assoc-in db [:account :deletion-request-status] (if success? :sent :error))))
