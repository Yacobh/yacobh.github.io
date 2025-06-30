(ns universo.components.mathacademy.events
  (:require [re-frame.core :as re-frame]))

(re-frame/reg-event-db
 :mathacademy/init
 (fn [_ _]
   ;; estado inicial para mathacademy
   {:mathacademy/section :main}))
