(ns universo.events.slots
  (:require
   [re-frame.core :as re-frame]
   [cljs.core.async :refer [go <!]]
   [universo.db.crud :as crud]))

(re-frame/reg-sub
 :slots/items
 (fn [db _]
   (get-in db [:slots :items] [])))

(re-frame/reg-sub
 :slots/my-enrollments
 (fn [db _]
   (get-in db [:slots :enrollments] [])))

(re-frame/reg-sub
 :slots/loading?
 (fn [db _]
   (get-in db [:slots :loading?] false)))

(re-frame/reg-sub
 :slots/error
 (fn [db _]
   (get-in db [:slots :error])))

(re-frame/reg-sub
 :slots/message
 (fn [db _]
   (get-in db [:slots :message])))

(re-frame/reg-event-fx
 :slots/enter
 (fn [{:keys [db]} _]
   (let [uid (get-in db [:auth :user :id])]
     {:dispatch-n [[:profile/load uid]
                   [:slots/load]
                   [:notifications/load]]})))

(re-frame/reg-fx
 :slots/fetch!
 (fn [{:keys [band user-id]}]
   (go
     (let [slots-res (<! (crud/fetch-class-slots band))
           enr-res (when user-id (<! (crud/fetch-my-enrollments user-id)))]
       (if (:success slots-res)
         (re-frame/dispatch [:slots/loaded
                             (:data slots-res)
                             (or (:data enr-res) [])])
         (re-frame/dispatch [:slots/failed
                             (or (:error slots-res) "No se pudieron cargar cupos")]))))))

(re-frame/reg-event-fx
 :slots/load
 (fn [{:keys [db]} _]
   (let [band (or (get-in db [:student-profile :theta_band])
                  (get-in db [:student-profile :profile :theta-band]))
         uid (get-in db [:auth :user :id])]
     {:db (-> db
              (assoc-in [:slots :loading?] true)
              (assoc-in [:slots :error] nil)
              (assoc-in [:slots :message] nil))
      :slots/fetch! {:band band :user-id uid}})))

(re-frame/reg-event-db
 :slots/loaded
 (fn [db [_ slots enrollments]]
   (-> db
       (assoc-in [:slots :items] (or slots []))
       (assoc-in [:slots :enrollments] (or enrollments []))
       (assoc-in [:slots :loading?] false))))

(re-frame/reg-event-db
 :slots/failed
 (fn [db [_ msg]]
   (-> db
       (assoc-in [:slots :loading?] false)
       (assoc-in [:slots :error] msg))))

(re-frame/reg-fx
 :slots/enroll!
 (fn [{:keys [slot-id user-id]}]
   (go
     (let [result (<! (crud/enroll-in-slot! slot-id user-id))]
       (if (:success result)
         (do
           (re-frame/dispatch [:slots/enroll-ok])
           (re-frame/dispatch [:slots/load])
           (re-frame/dispatch [:notifications/load]))
         (re-frame/dispatch [:slots/enroll-fail
                             (or (:error result) "No se pudo inscribir")]))))))

(re-frame/reg-event-fx
 :slots/enroll
 (fn [{:keys [db]} [_ slot-id]]
   (let [uid (get-in db [:auth :user :id])]
     (if-not uid
       {:db (assoc-in db [:slots :error] "Debes iniciar sesión")}
       {:db (assoc-in db [:slots :message] nil)
        :slots/enroll! {:slot-id slot-id :user-id uid}}))))

(re-frame/reg-event-db
 :slots/enroll-ok
 (fn [db _]
   (assoc-in db [:slots :message] "Inscripción registrada. Te avisaremos al confirmar el grupo.")))

(re-frame/reg-event-db
 :slots/enroll-fail
 (fn [db [_ msg]]
   (assoc-in db [:slots :error] msg)))

;; Admin slot CRUD
(re-frame/reg-sub
 :admin/slots
 (fn [db _]
   (get-in db [:admin :slots] [])))

(re-frame/reg-fx
 :admin/fetch-slots!
 (fn [_]
   (go
     (let [result (<! (crud/fetch-admin-class-slots))]
       (if (:success result)
         (re-frame/dispatch [:admin/slots-loaded (:data result)])
         (re-frame/dispatch [:admin/set-error
                             (or (:error result) "Error cargando cupos")]))))))

(re-frame/reg-event-fx
 :admin/load-slots
 (fn [{:keys [db]} _]
   {:db (assoc-in db [:admin :loading?] true)
    :admin/fetch-slots! nil}))

(re-frame/reg-event-db
 :admin/slots-loaded
 (fn [db [_ rows]]
   (-> db
       (assoc-in [:admin :slots] (or rows []))
       (assoc-in [:admin :loading?] false))))

(re-frame/reg-fx
 :admin/save-slot!
 (fn [row]
   (go
     (let [result (<! (crud/upsert-class-slot! row))]
       (if (:success result)
         (re-frame/dispatch [:admin/load-slots])
         (re-frame/dispatch [:admin/set-error
                             (or (:error result) "Error guardando cupo")]))))))

(re-frame/reg-event-fx
 :admin/save-slot
 (fn [{:keys [db]} [_ row]]
   (let [uid (get-in db [:auth :user :id])
         payload (cond-> row
                   (and uid (nil? (get row "created_by")))
                   (assoc "created_by" uid))]
     {:admin/save-slot! payload})))

(re-frame/reg-fx
 :admin/delete-slot!
 (fn [slot-id]
   (go
     (let [result (<! (crud/delete-class-slot! slot-id))]
       (if (:success result)
         (re-frame/dispatch [:admin/load-slots])
         (re-frame/dispatch [:admin/set-error
                             (or (:error result) "Error eliminando cupo")]))))))

(re-frame/reg-event-fx
 :admin/delete-slot
 (fn [_ [_ slot-id]]
   {:admin/delete-slot! slot-id}))

;; Admin resources
(re-frame/reg-sub
 :admin/resources
 (fn [db _]
   (get-in db [:admin :resources] [])))

(re-frame/reg-sub
 :admin/modules
 (fn [db _]
   (get-in db [:admin :modules] [])))

(re-frame/reg-fx
 :admin/fetch-resources!
 (fn [_]
   (go
     (let [mods (<! (crud/fetch-modules))
           res (<! (crud/fetch-admin-resources))]
       (re-frame/dispatch [:admin/resources-bundle
                           (or (:data mods) [])
                           (or (:data res) [])
                           (or (:error res) (:error mods))])))))

(re-frame/reg-event-fx
 :admin/load-resources
 (fn [{:keys [db]} _]
   {:db (assoc-in db [:admin :loading?] true)
    :admin/fetch-resources! nil}))

(re-frame/reg-event-db
 :admin/resources-bundle
 (fn [db [_ modules resources err]]
   (-> db
       (assoc-in [:admin :modules] modules)
       (assoc-in [:admin :resources] resources)
       (assoc-in [:admin :loading?] false)
       (assoc-in [:admin :error] err))))

(re-frame/reg-fx
 :admin/save-resource!
 (fn [row]
   (go
     (let [result (<! (crud/upsert-resource! row))]
       (if (:success result)
         (re-frame/dispatch [:admin/load-resources])
         (re-frame/dispatch [:admin/set-error
                             (or (:error result) "Error guardando recurso")]))))))

(re-frame/reg-event-fx
 :admin/save-resource
 (fn [_ [_ row]]
   {:admin/save-resource! row}))

(re-frame/reg-fx
 :admin/delete-resource!
 (fn [id]
   (go
     (let [result (<! (crud/delete-resource! id))]
       (if (:success result)
         (re-frame/dispatch [:admin/load-resources])
         (re-frame/dispatch [:admin/set-error
                             (or (:error result) "Error eliminando recurso")]))))))

(re-frame/reg-event-fx
 :admin/delete-resource
 (fn [_ [_ id]]
   {:admin/delete-resource! id}))
