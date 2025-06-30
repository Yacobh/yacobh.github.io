(ns universo.subs
  (:require
   [re-frame.core :as re-frame]))

(re-frame/reg-sub
 :db
 (fn [db _]
   db))

(re-frame/reg-sub
 :current-page
 (fn [db _]
   (:current-page db)))

(re-frame/reg-sub
 :current-section
 (fn [db _]
   (:current-section db)))
