(ns universo.events
  (:require [re-frame.core :as re-frame]))

(re-frame/reg-event-db
 :initialize-db
 (fn [_ _]
   {:current-page :home
    :current-section :main}))

(re-frame/reg-event-db
 :set-page
 (fn [db [_ new-page]]
   (assoc db :current-page new-page)))

(re-frame/reg-event-db
 :set-section
 (fn [db [_ section]]
   (assoc db :current-section section)))
