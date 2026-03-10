(ns universo.subs
  (:require
   [re-frame.core :as re-frame]
   [universo.db :as udb]))

;;;; Subscriptions and events




;; Subscriptions


;; 1. Suscripción al estado de transición
(re-frame/reg-sub
 :transitioning
 (fn [db _]
   (get-in db [:ui :transitioning])))

;; dashboard- subscriptions
(re-frame/reg-sub
 :user-id
 (fn [db _]
   (get-in db [:dashboard :user-id])))

(re-frame/reg-sub
 :dashboard
 (fn [db _]
   (get-in db [:dashboard])))
;;------


(re-frame/reg-sub
 :db
 (fn [db _] db))

(re-frame/reg-sub
 :current-page
 (fn [db _]
   (get-in db [:ui :current-page])))

(re-frame/reg-sub
 :current-section
 (fn [db _]
   (get-in db [:ui :current-section])))

(re-frame/reg-sub
 :visitor
 (fn [db _]
   (get-in db [:visitor])))

(re-frame/reg-sub
 :visitor-id
 (fn [db _]
   (get-in db [:visitor :id])))

(re-frame/reg-sub
 :visitor-email
 (fn [db _]
   (get-in db [:visitor :email])))



;; Events

;transition events
;; 2. Evento que inicia la transición (reemplaza :set-section en los on-click)
(re-frame/reg-event-fx
 :navigate-to
 (fn [{:keys [db]} [_ section]]
   {:db             (assoc-in db [:ui :transitioning] true)
    :dispatch-later [{:ms 240 :dispatch [:complete-navigation section]}]}))

;; 3. Evento que cambia la sección y apaga la transición
(re-frame/reg-event-db
 :complete-navigation
 (fn [db [_ section]]
   (-> db
       (assoc-in [:ui :current-section] section)
       (assoc-in [:ui :transitioning] false))))


;; dashboard events
(re-frame/reg-event-db
 :set-dashboard-user-id
 (fn [db [_ user-id]]
   (assoc-in db [:dashboard :user-id] user-id)))
;-----


(re-frame/reg-event-db
 :initialize-db
 (fn [_ _]
   udb/default-db))

(re-frame/reg-event-db
 :set-page
 (fn [db [_ new-page]]
   (assoc-in db [:ui :current-page] new-page)))

(re-frame/reg-event-db
 :set-section
 (fn [db [_ section]]
   (assoc-in db [:ui :current-section] section)))

(re-frame/reg-sub
 :modal
 (fn [db _]
   (get-in db [:ui :modal])))

(re-frame/reg-event-db
 :show-modal
 (fn [db [_ modal-info]]
   (assoc-in db [:ui :modal] modal-info)))

(re-frame/reg-event-db
 :hide-modal
 (fn [db _]
   (assoc-in db [:ui :modal] nil)))

;; authentication

(re-frame/reg-event-db
 :set-visitor-id
 (fn [db [_ visitor-id]]
   (assoc-in db [:visitor :id] visitor-id)))

(re-frame/reg-event-db
 :set-visitor-email
 (fn [db [_ email]]
   (assoc-in db [:visitor :email] email)))
