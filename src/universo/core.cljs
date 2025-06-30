(ns universo.core
  (:require
   [re-frame.core :as re-frame]
   [reagent.dom :as d]
   [universo.events]
   [universo.subs]
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
    #_(re-frame/dispatch-sync [:mathacademy/init])
    #_(tracker/start-tracking!)
    (mount-root))
