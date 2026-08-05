(ns universo.events.theme
  "Tema claro/oscuro (T-24-bis). La clase `dark` en <html> se aplica primero
   de forma síncrona en index.html (antes de cargar app.js), para que no
   haya flash de tema claro al recargar con oscuro guardado — ver el script
   inline en <head>. Este ns mantiene :theme en app-db sincronizado con esa
   clase y persiste el cambio explícito del usuario en localStorage."
  (:require [re-frame.core :as re-frame]))

(defn- stored-theme []
  (try (js/localStorage.getItem "theme") (catch :default _ nil)))

(defn- system-prefers-dark? []
  (try
    (.-matches (js/window.matchMedia "(prefers-color-scheme: dark)"))
    (catch :default _ false)))

(re-frame/reg-fx
 :fx/apply-theme
 (fn [dark?]
   (-> js/document.documentElement .-classList (.toggle "dark" dark?))))

(re-frame/reg-fx
 :fx/persist-theme
 (fn [theme]
   (try
     (js/localStorage.setItem "theme" (name theme))
     (catch :default _ nil))))

(re-frame/reg-sub
 :theme/dark?
 (fn [db _]
   (= :dark (:theme db))))

;; Sincroniza app-db con la clase ya aplicada por el script inline (o con
;; prefers-color-scheme si el usuario nunca eligió explícitamente).
(re-frame/reg-event-fx
 :theme/init
 (fn [{:keys [db]} _]
   (let [saved (stored-theme)
         dark? (if saved (= saved "dark") (system-prefers-dark?))
         theme (if dark? :dark :light)]
     {:db (assoc db :theme theme)
      :fx/apply-theme dark?})))

(re-frame/reg-event-fx
 :theme/toggle
 (fn [{:keys [db]} _]
   (let [theme (if (= :dark (:theme db)) :light :dark)]
     {:db (assoc db :theme theme)
      :fx/apply-theme (= :dark theme)
      :fx/persist-theme theme})))
