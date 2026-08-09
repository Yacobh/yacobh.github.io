(ns universo.events.plan
  (:require
   [re-frame.core :as re-frame]
   [cljs.core.async :refer [go <!]]
   [universo.db.crud :as crud]
   [universo.plan :as plan]))

(re-frame/reg-sub
 :plan/resources
 ;; El cruce déficits × recursos se hace acá y no al guardar las filas porque
 ;; `:plan/enter` carga el perfil y los recursos **en paralelo**: si se filtrara
 ;; en el handler, el resultado dependería de cuál respuesta llega primero. Como
 ;; suscripción se recalcula sola cuando cualquiera de los dos cambia.
 (fn [db _]
   (plan/resources-for-deficits
    (get-in db [:plan :resources] [])
    (get-in db [:student-profile :profile :deficits] []))))

(re-frame/reg-sub
 :plan/loading?
 (fn [db _]
   (get-in db [:plan :loading?] false)))

(re-frame/reg-sub
 :plan/error
 (fn [db _]
   (get-in db [:plan :error])))

(re-frame/reg-sub
 :plan/layer0
 (fn [db _]
   (or (get-in db [:student-profile :profile :misconceptions])
       [])))

(re-frame/reg-sub
 :plan/deficits
 (fn [db _]
   (or (get-in db [:student-profile :profile :deficits])
       [])))

(re-frame/reg-event-fx
 :plan/enter
 (fn [{:keys [db]} _]
   (let [uid (get-in db [:auth :user :id])]
     {:db (assoc-in db [:plan :loading?] true)
      :dispatch-n [[:profile/load uid]
                   [:plan/load-resources]
                   [:notifications/load]]})))

(re-frame/reg-fx
 :plan/fetch-resources!
 (fn [_]
   (go
     (let [result (<! (crud/fetch-published-resources))]
       (if (:success result)
         (re-frame/dispatch [:plan/resources-loaded (:data result)])
         (re-frame/dispatch [:plan/resources-failed
                             (or (:error result) "No se pudieron cargar recursos")]))))))

(re-frame/reg-event-fx
 :plan/load-resources
 (fn [{:keys [db]} _]
   {:db (-> db
            (assoc-in [:plan :loading?] true)
            (assoc-in [:plan :error] nil))
    :plan/fetch-resources! nil}))

(re-frame/reg-event-db
 :plan/resources-loaded
 ;; Se guardan las filas crudas: quién ve qué lo decide `:plan/resources` con la
 ;; lógica pura de `universo.plan`, no este handler.
 (fn [db [_ rows]]
   (-> db
       (assoc-in [:plan :resources] (vec (or rows [])))
       (assoc-in [:plan :loading?] false)
       (assoc-in [:plan :error] nil))))

(re-frame/reg-event-db
 :plan/resources-failed
 (fn [db [_ msg]]
   (-> db
       (assoc-in [:plan :loading?] false)
       (assoc-in [:plan :error] msg)
       (assoc-in [:plan :resources] []))))
