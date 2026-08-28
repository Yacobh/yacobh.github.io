(ns universo.core
  (:require
   [re-frame.core :as re-frame]
   [reagent.dom :as d]
   [universo.subs]
   #_[universo.test-subs]
   [universo.events.auth]
   [universo.events.admin]
   [universo.events.test]
   [universo.events.editor-vivo]
   [universo.events.profile]
   [universo.events.account]
   [universo.events.plan]
   [universo.events.slots]
   [universo.events.contacto]
   [universo.events.dashboard]
   [universo.events.landing]
   [universo.events.ui]
   [universo.events.theme]
   [universo.events.router]
   [universo.views :as views]
   [universo.visitor-tracker :as tracker]))

(defn mount-root []
  (re-frame/clear-subscription-cache!)
  (d/render
   [views/main-panel]
   (.getElementById js/document "app")))

(defn ^:export init! []
  (re-frame/dispatch-sync [:initialize-db])
  (re-frame/dispatch-sync [:theme/init])
  ;; Antes de :auth/init a propósito (T-05): si la URL pide una sección
  ;; protegida, el destino tiene que quedar anotado antes de que la sesión
  ;; resuelva y lo consuma.
  (re-frame/dispatch-sync [:router/init])
  (re-frame/dispatch [:auth/init])
  (tracker/start-tracking!)
  (mount-root))
