(ns universo.events.dashboard
  (:require
   [re-frame.core :as re-frame]
   [cljs.core.async :refer [go <!]]
   [universo.db.crud :as crud]))

;; -----------------------------------------------------------------------------
;; EVENTOS PRINCIPALES
;; -----------------------------------------------------------------------------

(re-frame/reg-event-fx
 :dashboard/cargar
 (fn [{:keys [db]} [_ email]]
   (if (or (nil? email)
           (:dashboard/cargando? db))
     (do (js/console.warn "⚠️ :dashboard/cargar llamado sin user-id o mientras cargaba") {:db db})
     {:db (assoc db :dashboard/cargando? true)
      :dispatch [:dashboard/consultar email]})))

(re-frame/reg-event-fx
 :dashboard/consultar
 (fn [_ [_ email]]
   {:fx/cargar-dashboard [email]}))

;; -----------------------------------------------------------------------------
;; EFECTO: Cargar datos de Supabase
;; -----------------------------------------------------------------------------
(re-frame/reg-fx
 :fx/cargar-dashboard
 (fn [[email]]
   (go
     (try
       (let [
             ;dashboard-resp (<! (crud/get-table "dashboard" {:user_id email}))
             tests-resp     (<! (crud/get-table "tests" {"email-user" email}))
             ;dashboard-data (first (:data dashboard-resp))
             tests-data     (:data tests-resp)]

         (if (:success tests-resp)
           #_(and (:success dashboard-resp)
                  (:success tests-resp))
           (do
             #_(js/console.log "✅ Dashboard cargado:" dashboard-data)
             (js/console.log "📊 Tests cargados:" (count tests-data))
             (re-frame/dispatch
              [:dashboard/exito {
                                 ;:info (:info dashboard-data)
                                 :tests tests-data}]))
           (do
             (js/console.error "❌ Error al cargar dashboard/test:" #_dashboard-resp tests-resp)
             (re-frame/dispatch [:dashboard/error "Error al obtener datos."]))))

       (catch :default e
         (js/console.error "❌ Excepción al cargar dashboard:" e)
         (re-frame/dispatch [:dashboard/error e]))))))

;; -----------------------------------------------------------------------------
;; ÉXITO / ERROR
;; -----------------------------------------------------------------------------
(re-frame/reg-event-fx
 :dashboard/exito
 (fn [{:keys [db]} [_ {:keys [info tests]}]]
   {:db (-> db
            #_(assoc :dashboard/info info)
            (assoc-in [:dashboard :tests] (count tests))
            (assoc :dashboard/cargando? false)
            (assoc :dashboard/error nil))}))

(re-frame/reg-event-db
 :dashboard/error
 (fn [db [_ err]]
   (-> db
       (assoc :dashboard/cargando? false)
       (assoc :dashboard/error err))))

;; -----------------------------------------------------------------------------
;; SUBSCRIPCIONES
;; -----------------------------------------------------------------------------
(re-frame/reg-sub :dashboard/info (fn [db _] (:dashboard/info db)))
(re-frame/reg-sub :dashboard/tests (fn [db _] (:dashboard/tests db)))
(re-frame/reg-sub :dashboard/cargando? (fn [db _] (:dashboard/cargando? db)))
(re-frame/reg-sub :dashboard/error (fn [db _] (:dashboard/error db)))
