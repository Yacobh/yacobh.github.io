(ns universo.events.contacto
  (:require
   [re-frame.core :as re-frame]
   [cljs.core.async :refer [go <!]]
   [universo.db.crud :as crud]))  ;; ← asumo que aquí tienes la función para llamar a Supabase

(re-frame/reg-event-fx
 :enviar-contacto
 (fn [{:keys [db]} [_ mensaje]]
   (when (seq mensaje)
     {:db (assoc db :contacto/enviando? true)
      :dispatch [:contacto/guardar mensaje]})))

;; -----------------------------------------------------------------------------
;; EVENTO: Guarda el contacto en Supabase
;; -----------------------------------------------------------------------------
(re-frame/reg-event-fx
 :contacto/guardar
 (fn [_ [_ mensaje]]
   {:fx/insertar-contacto mensaje}))  ;; 👈 efecto con nombre distinto

;; -----------------------------------------------------------------------------
;; EFECTO: Inserta en Supabase
;; -----------------------------------------------------------------------------
(re-frame/reg-fx
 :fx/insertar-contacto
 (fn [mensaje]
   (go
     (let [result (<! (crud/insert-data-table!
                       {:mensaje mensaje}
                       "contacto"))]
       (if (:success result)
         (do
           (js/console.log "✅ contacto guardado exitosamente:" (:data result))
           (re-frame/dispatch [:contacto-exito]))
         (do
           (js/console.error "❌ Error al guardar contacto:" (:error result))
           (re-frame/dispatch [:contacto-error (:error result)])))))))

(re-frame/reg-event-db
 :contacto-exito
 (fn [db _]
   (-> db
       (assoc :contacto/enviando? false)
       (assoc :contacto/estado :exito))))

(re-frame/reg-event-db
 :contacto-error
 (fn [db [_ err]]
   (js/console.error "Error al enviar contacto:" err)
   (-> db
       (assoc :contacto/enviando? false)
       (assoc :contacto/estado :error))))

;;-------- subs

(re-frame/reg-sub
 :contacto/estado
 (fn [db _]
   (:contacto/estado db)))

(re-frame/reg-sub
 :contacto/enviando?
 (fn [db _]
   (:contacto/enviando? db)))
