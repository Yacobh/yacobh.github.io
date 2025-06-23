(ns universo.core
  (:require
   [reagent.core :as r]
   [re-frame.core :as re-frame]
   [reagent.dom :as d]
   [universo.home :as home]
   [universo.events]           ;; Registrar eventos aquí
   [universo.subs]             ;; Registrar subscripciones aquí
   [universo.views :as views]
   [universo.visitor-tracker :as tracker])) ;; Contendrá la vista dinámica

  ;; -------------------------
  ;; Initialize app

  (defn mount-root []

    (re-frame/clear-subscription-cache!)
    (d/render
     #_[voz/voice-selector]
     #_[voz/speech-component]
     #_[animations/app]
     #_[jardin/quantum-simulator]
     #_[api/battery-status-component]
     #_[geo/geo-info-display]
     #_[ip/ip-test-component]
     #_[ip/simple-ip-test]
     #_[supabase-test]
     #_[login/login-component]
     #_[login/login-form]
     #_[auth/auth-component]
     #_[ip/minimal-test]
     #_[geo/welcome-message]
     #_[guestbook/guestbook-component]
     #_[mathacademy/math-academy-component]
     #_[tailwind/app]
     #_[home/home]
     [views/main-panel]
     (.getElementById js/document "app")))

  (defn ^:export init! []
      (re-frame/dispatch-sync [:initialize-db])
    (tracker/start-tracking!)
    (mount-root))
