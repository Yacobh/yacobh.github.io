(ns universo.views
  (:require
   [re-frame.core :as re-frame]
   [universo.home :as home]))

(defn pages [page-name]
  (case page-name
    :home [home/home]
    ;; :math (MathAcademy) archivado — funnel único en home
    [home/home]))

(defn main-panel []
  (let [current-page @(re-frame/subscribe [:current-page])]
    [pages current-page]))
