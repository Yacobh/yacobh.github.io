(ns universo.subs
  (:require
   [re-frame.core :as re-frame]))

(re-frame/reg-sub
 :current-page
 (fn [db _]
   (:page db)))
