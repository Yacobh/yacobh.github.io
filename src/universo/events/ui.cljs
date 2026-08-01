(ns universo.events.ui
  "Eventos de UI transversales, no atados a un dominio: el diálogo de
   confirmación global (reemplaza js/confirm nativo, ver
   universo.components.ui/confirm-dialog) y la apertura/cierre del panel de
   contacto flotante (ver universo.components.contacto)."
  (:require [re-frame.core :as re-frame]))

(re-frame/reg-sub
 :confirm/state
 (fn [db _]
   (:confirm db)))

(re-frame/reg-event-db
 :confirm/ask
 (fn [db [_ {:keys [message title confirm-label variant on-confirm]}]]
   (assoc db :confirm {:open? true
                        :title title
                        :message message
                        :confirm-label (or confirm-label "Confirmar")
                        :variant variant
                        :on-confirm on-confirm})))

(re-frame/reg-event-fx
 :confirm/accept
 (fn [{:keys [db]} _]
   (let [on-confirm (get-in db [:confirm :on-confirm])]
     (cond-> {:db (assoc db :confirm {:open? false :title nil :message nil
                                       :confirm-label nil :variant nil :on-confirm nil})}
       on-confirm (assoc :dispatch on-confirm)))))

(re-frame/reg-event-db
 :confirm/cancel
 (fn [db _]
   (assoc db :confirm {:open? false :title nil :message nil
                        :confirm-label nil :variant nil :on-confirm nil})))

;; Panel de contacto flotante — abre/cierra sin importar la sección activa
;; (ver universo.components.contacto/contacto-fab y contacto-panel).
(re-frame/reg-sub
 :contacto/panel-open?
 (fn [db _]
   (get-in db [:contacto :panel-open?])))

(re-frame/reg-event-db
 :contacto/abrir-panel
 (fn [db _]
   (assoc-in db [:contacto :panel-open?] true)))

(re-frame/reg-event-db
 :contacto/cerrar-panel
 (fn [db _]
   (assoc-in db [:contacto :panel-open?] false)))
