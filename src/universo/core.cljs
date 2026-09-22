(ns universo.core
  (:require
   [re-frame.core :as re-frame]
   [reagent.dom :as d]
   [universo.subs]
   #_[universo.test-subs]
   [universo.events.auth]
   [universo.events.admin]
   [universo.events.aula]
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
  ;; La query string se lee **antes** de `:router/init` a propósito (T-135): ese
  ;; evento normaliza la URL con `replaceState`, y `/?de=tarjeta` pasa a ser `/`
  ;; sin la etiqueta de campaña. Leerla más abajo, al arrancar el tracker, sería
  ;; leer siempre una cadena vacía — y la campaña entera quedaría sin atribuir.
  (let [query (.. js/window -location -search)]
    (re-frame/dispatch-sync [:initialize-db])
    (re-frame/dispatch-sync [:theme/init])
    ;; Antes de :auth/init a propósito (T-05): si la URL pide una sección
    ;; protegida, el destino tiene que quedar anotado antes de que la sesión
    ;; resuelva y lo consuma.
    (re-frame/dispatch-sync [:router/init])
    (re-frame/dispatch [:auth/init])
    (tracker/start-tracking! query)
    (mount-root)))
