(ns universo.core
  (:require
   [reagent.core :as r]
   [reagent.dom :as d]
   [universo.battery :as api]
   [universo.jardin :as jardin]
   [universo.voz :as voz]
   [universo.geo :as geo]
   [universo.ip :as ip]
   [universo.animations :as animations]
   [universo.components.supabase-test :refer [supabase-test]]
   [universo.components.login :as login]
   [universo.components.guestbook :as guestbook]
   [universo.components.mathacademy :as mathacademy]
   [universo.components.auth :as auth]))

  ;; -------------------------
  ;; Initialize app

  (defn mount-root []
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
     [mathacademy/math-academy-component]
     (.getElementById js/document "app")))

  (defn ^:export init! []
    (mount-root))
