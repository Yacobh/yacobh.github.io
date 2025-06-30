(ns universo.views
  (:require
   [re-frame.core :as re-frame]
   [universo.components.mathacademy :refer [math-academy-component]]
   [universo.home :as home]))

(defn pages [page-name]
  (case page-name
    :home [home/home]
    :math [math-academy-component]
    [:div "Página no encontrada "]))

(defn main-panel []
  (let [current-page @(re-frame/subscribe [:current-page])
        _ (js/console.log "Current page:" current-page)]
    [pages current-page]))
