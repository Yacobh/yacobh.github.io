(ns universo.events.theme
  "Tema claro/oscuro (T-24-bis). La clase `dark` en <html> se aplica primero
   de forma síncrona en index.html (antes de cargar app.js), para que no
   haya flash de tema claro al recargar con oscuro guardado — ver el script
   inline en <head>. Este ns mantiene :theme en app-db sincronizado con esa
   clase y persiste el cambio explícito del usuario en localStorage."
  (:require [cljs.core.async :refer [go <!]]
            [re-frame.core :as re-frame]
            [universo.db.crud :as crud]))

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
      :fx/apply-theme dark?
      ;; Se pide siempre, aunque haya preferencia guardada: el handler decide
      ;; si corresponde aplicarla. Así la regla de precedencia vive en un solo
      ;; lugar y no repartida entre quien pide y quien responde.
      :dispatch [:theme/cargar-default-del-sitio]})))

;; -----------------------------------------------------------------------------
;; Apariencia por defecto del sitio (ADR-022, migración 043)
;; -----------------------------------------------------------------------------
;; Precedencia, de mayor a menor:
;;   1. lo que el visitante eligió con el botón  (localStorage)
;;   2. lo que el admin fijó para el sitio       (site_settings.theme_default)
;;   3. lo que dice su sistema operativo         (prefers-color-scheme)
;;
;; El orden importa y no es arbitrario: la elección explícita de una persona
;; sobre su propia pantalla gana siempre. El ajuste del admin decide la primera
;; impresión, no impone nada — pisar una preferencia guardada sería tratar al
;; visitante como si no supiera lo que quiere.
;;
;; Llega tarde por naturaleza (es una consulta de red), así que **solo se
;; aplica si el visitante no había elegido**. Si eligió, no se toca nada y no
;; hay parpadeo.

(re-frame/reg-event-fx
 :theme/cargar-default-del-sitio
 (fn [_ _]
   {:fx/fetch-site-theme nil}))

(re-frame/reg-fx
 :fx/fetch-site-theme
 (fn [_]
   (go
     (let [res (<! (crud/fetch-site-settings))]
       (when (:success res)
         (when-let [t (get-in res [:data :theme_default])]
           (re-frame/dispatch [:theme/aplicar-default-del-sitio t])))))))

(re-frame/reg-event-fx
 :theme/aplicar-default-del-sitio
 (fn [{:keys [db]} [_ theme-default]]
   (if (stored-theme)
     {:db db}                              ;; el visitante ya decidió: no se toca
     (let [dark? (case theme-default
                   "oscuro" true
                   "claro" false
                   (system-prefers-dark?))]
       {:db (assoc db :theme (if dark? :dark :light))
        :fx/apply-theme dark?}))))

(re-frame/reg-event-fx
 :theme/toggle
 (fn [{:keys [db]} _]
   (let [theme (if (= :dark (:theme db)) :light :dark)]
     {:db (assoc db :theme theme)
      :fx/apply-theme (= :dark theme)
      :fx/persist-theme theme})))
