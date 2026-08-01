(ns universo.events.contacto
  (:require
   [re-frame.core :as re-frame]
   [cljs.core.async :refer [go <!]]
   [universo.db.crud :as crud]))

(defn- contexto-curado
  "Contexto útil para atender el mensaje (qué sección, si hay cuenta) sin
   volcar el app-db completo de re-frame — lo que había antes era ruido, no
   contexto: incluía todo el estado de UI de la sesión, sin curar."
  [db]
  (let [user (get-in db [:auth :user])]
    (cond-> {:seccion (name (or (get-in db [:ui :current-section]) :desconocida))
             :logueado? (boolean user)
             :url (.-href js/window.location)}
      user (assoc :correo-cuenta (:email user)))))

(re-frame/reg-event-fx
 :enviar-contacto
 (fn [{:keys [db]} [_ {:keys [mensaje] :as datos}]]
   (when (seq mensaje)
     {:db (assoc db :contacto/enviando? true)
      :dispatch [:contacto/guardar datos]})))

;; -----------------------------------------------------------------------------
;; EVENTO: Guarda el contacto en Supabase
;; -----------------------------------------------------------------------------
(re-frame/reg-event-fx
 :contacto/guardar
 (fn [{:keys [db]} [_ datos]]
   {:fx/insertar-contacto [datos db]}))  ;; 👈 efecto con nombre distinto

;; -----------------------------------------------------------------------------
;; EFECTO: Inserta en Supabase
;; -----------------------------------------------------------------------------
(re-frame/reg-fx
 :fx/insertar-contacto
 (fn [[{:keys [mensaje telefono correo]} db]]
   (go
     (let [visitor-id (some-> (get-in db [:visitor :id]) str (js/parseInt 10))
           payload (cond-> {:mensaje mensaje
                             :extra (contexto-curado db)}
                     (seq telefono) (assoc :telefono telefono)
                     (seq correo) (assoc :correo correo)
                     (and visitor-id (not (js/isNaN visitor-id)))
                     (assoc :id_visitor visitor-id))
           result (<! (crud/insert-data-table!
                       payload
                       "contacto"
                       {:returning? false}))]
       (if (:success result)
         (do
           (js/console.log "✅ contacto guardado exitosamente:" (:data result))
           (re-frame/dispatch [:contacto-exito]))
         (do
           (js/console.error "❌ Error al guardar contacto:" (:error result))
           (re-frame/dispatch [:contacto-error (:error result)])))))))

(re-frame/reg-event-fx
 :contacto-exito
 (fn [{:keys [db]} _]
   {:db (-> db
            (assoc :contacto/enviando? false)
            (assoc :contacto/estado :exito))
    ;; Despacha reset en 5 segundos
    :dispatch-later [{:ms 5000 :dispatch [:contacto/reset]}]}))

(re-frame/reg-event-db
 :contacto-error
 (fn [db [_ err]]
   (js/console.error "Error al enviar contacto:" err)
   (-> db
       (assoc :contacto/enviando? false)
       (assoc :contacto/estado :error))))

;; -----------------------------------------------------------------------------
;; EVENTO: Reset — vuelve el estado a nil
;; -----------------------------------------------------------------------------
(re-frame/reg-event-db
 :contacto/reset
 (fn [db _]
   (assoc db :contacto/estado nil)))

;;-------- subs

(re-frame/reg-sub
 :contacto/estado
 (fn [db _]
   (:contacto/estado db)))

(re-frame/reg-sub
 :contacto/enviando?
 (fn [db _]
   (:contacto/enviando? db)))
