(ns universo.core
  (:require
   [re-frame.core :as re-frame]
   [reagent.dom :as d]
   [universo.subs]
   #_[universo.test-subs]
   [universo.events.auth]
   [universo.events.admin]
   [universo.events.test]
   [universo.events.profile]
   [universo.events.plan]
   [universo.events.slots]
   [universo.events.contacto]
   [universo.events.dashboard]
   [universo.events.landing]
   [universo.views :as views]
   [universo.visitor-tracker :as tracker]
   [universo.components.mathacademy.events]
   [universo.components.mathacademy.subs]))

(defn mount-root []
  (re-frame/clear-subscription-cache!)
  (d/render
   [views/main-panel]
   (.getElementById js/document "app")))

(defn ^:export init! []
  (re-frame/dispatch-sync [:initialize-db])
  (re-frame/dispatch [:auth/init])
  #_(re-frame/dispatch-sync [:mathacademy/init])
  (tracker/start-tracking!)
  (mount-root))
