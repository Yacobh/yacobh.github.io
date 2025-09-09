(ns universo.subs
  (:require
   [re-frame.core :as re-frame]
   [universo.db :as udb]))

;; Subscriptions and events

;; Subscriptions

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

(re-frame/reg-event-db
 :set-visitor-id
 (fn [db [_ visitor-id]]
   (assoc-in db [:visitor :id] visitor-id)))

(re-frame/reg-event-db
 :set-visitor-email
 (fn [db [_ email]]
   (assoc-in db [:visitor :email] email)))
