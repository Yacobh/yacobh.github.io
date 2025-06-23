(ns universo.events
  (:require [re-frame.core :as re-frame]
            [universo.db :as db]))

(re-frame/reg-event-db
 :initialize-db
 (fn [_ _]
   db/default-db))

(re-frame/reg-event-db
 :set-page
 (fn [db [_ new-page]]
   (assoc db :page new-page)))
