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

;; -----------------------------------------------------------------------------
;; Admin: cupos
;; -----------------------------------------------------------------------------

(re-frame/reg-sub
 :admin/slots
 (fn [db _]
   (get-in db [:admin :slots] [])))

(re-frame/reg-sub
 :admin/editing-slot
 (fn [db _]
   (get-in db [:admin :editing-slot])))

(re-frame/reg-sub
 :admin/expanded-slot
 (fn [db _]
   (get-in db [:admin :expanded-slot])))

(re-frame/reg-sub
 :admin/roster
 (fn [db [_ slot-id]]
   (get-in db [:admin :rosters slot-id])))

(re-frame/reg-fx
 :admin/fetch-slots!
 (fn [_]
   (go
     (let [result (<! (crud/fetch-admin-class-slots))]
       (if (:success result)
         (re-frame/dispatch [:admin/slots-loaded (:data result)])
         (re-frame/dispatch [:admin/section-fail :slots
                             (or (:error result) "No se pudieron cargar los cupos")]))))))

(re-frame/reg-event-fx
 :admin/load-slots
 (fn [_ _]
   {:dispatch [:admin/section-start :slots]
    :admin/fetch-slots! nil}))

(re-frame/reg-event-fx
 :admin/slots-loaded
 (fn [{:keys [db]} [_ rows]]
   {:db (assoc-in db [:admin :slots] (or rows []))
    :dispatch [:admin/section-ok :slots]}))

(re-frame/reg-event-db
 :admin/edit-slot
 (fn [db [_ slot]]
   (assoc-in db [:admin :editing-slot] slot)))

(re-frame/reg-event-db
 :admin/cancel-edit-slot
 (fn [db _]
   (assoc-in db [:admin :editing-slot] nil)))

(re-frame/reg-fx
 :admin/save-slot!
 (fn [{:keys [row update?]}]
   (go
     (let [result (<! (crud/upsert-class-slot! row))]
       (if (:success result)
         (re-frame/dispatch [:admin/slot-saved update?])
         (re-frame/dispatch [:admin/slot-save-failed
                             (or (:error result) "No se pudo guardar el cupo")]))))))

(re-frame/reg-event-fx
 :admin/save-slot
 (fn [{:keys [db]} [_ row]]
   (let [uid (get-in db [:auth :user :id])
         update? (some? (get row "id"))
         payload (cond-> row
                   (and uid (nil? (get row "created_by")))
                   (assoc "created_by" uid))]
     {:admin/save-slot! {:row payload :update? update?}})))

(re-frame/reg-event-fx
 :admin/slot-saved
 (fn [{:keys [db]} [_ update?]]
   {:db (assoc-in db [:admin :editing-slot] nil)
    :dispatch-n [[:admin/toast :success (if update? "Cupo actualizado." "Cupo publicado.")]
                 [:admin/load-slots]
                 [:admin/invalidate :overview]]}))

(re-frame/reg-event-fx
 :admin/slot-save-failed
 (fn [_ [_ msg]]
   {:dispatch [:admin/toast :error msg]}))

(re-frame/reg-fx
 :admin/delete-slot!
 (fn [slot-id]
   (go
     (let [result (<! (crud/delete-class-slot! slot-id))]
       (if (:success result)
         (re-frame/dispatch [:admin/slot-deleted])
         (re-frame/dispatch [:admin/slot-save-failed
                             (or (:error result) "No se pudo eliminar el cupo")]))))))

(re-frame/reg-event-fx
 :admin/delete-slot
 (fn [_ [_ slot-id]]
   {:admin/delete-slot! slot-id}))

(re-frame/reg-event-fx
 :admin/slot-deleted
 (fn [_ _]
   {:dispatch-n [[:admin/toast :success "Cupo eliminado."]
                 [:admin/load-slots]
                 [:admin/invalidate :overview]]}))

;; Estado del cupo (abrir / confirmar / cancelar / completar) ------------------

(re-frame/reg-fx
 :admin/set-slot-status!
 (fn [{:keys [slot-id status]}]
   (go
     (let [result (<! (crud/update-slot-status! slot-id status))]
       (if (:success result)
         (re-frame/dispatch [:admin/slot-status-changed status])
         (re-frame/dispatch [:admin/slot-save-failed
                             (or (:error result) "No se pudo cambiar el estado")]))))))

(re-frame/reg-event-fx
 :admin/set-slot-status
 (fn [_ [_ slot-id status]]
   {:admin/set-slot-status! {:slot-id slot-id :status status}}))

(re-frame/reg-event-fx
 :admin/slot-status-changed
 (fn [_ [_ status]]
   {:dispatch-n [[:admin/toast :success (str "Cupo marcado como " status ".")]
                 [:admin/load-slots]
                 [:admin/invalidate :overview]]}))

;; Lista de inscritos ---------------------------------------------------------

(re-frame/reg-fx
 :admin/fetch-roster!
 (fn [slot-id]
   (go
     (let [result (<! (crud/fetch-slot-roster slot-id))]
       (if (:success result)
         (re-frame/dispatch [:admin/roster-loaded slot-id (:data result)])
         (re-frame/dispatch [:admin/roster-failed slot-id
                             (or (:error result) "No se pudo cargar la lista de inscritos")]))))))

(re-frame/reg-event-fx
 :admin/toggle-roster
 (fn [{:keys [db]} [_ slot-id]]
   (if (= (get-in db [:admin :expanded-slot]) slot-id)
     {:db (assoc-in db [:admin :expanded-slot] nil)}
     {:db (-> db
              (assoc-in [:admin :expanded-slot] slot-id)
              (assoc-in [:admin :rosters slot-id :loading?] true))
      :admin/fetch-roster! slot-id})))

(re-frame/reg-event-db
 :admin/roster-loaded
 (fn [db [_ slot-id rows]]
   (assoc-in db [:admin :rosters slot-id]
             {:loading? false :error nil :rows (or rows [])})))

(re-frame/reg-event-db
 :admin/roster-failed
 (fn [db [_ slot-id msg]]
   (assoc-in db [:admin :rosters slot-id]
             {:loading? false :error msg :rows []})))

(re-frame/reg-fx
 :admin/set-enrollment-status!
 (fn [{:keys [enrollment-id status slot-id]}]
   (go
     (let [result (<! (crud/update-enrollment-status! enrollment-id status))]
       (if (:success result)
         (re-frame/dispatch [:admin/enrollment-status-changed slot-id status])
         (re-frame/dispatch [:admin/roster-failed slot-id
                             (or (:error result) "No se pudo actualizar la inscripción")]))))))

(re-frame/reg-event-fx
 :admin/set-enrollment-status
 (fn [_ [_ slot-id enrollment-id status]]
   {:admin/set-enrollment-status! {:enrollment-id enrollment-id
                                   :status status
                                   :slot-id slot-id}}))

(re-frame/reg-event-fx
 :admin/enrollment-status-changed
 (fn [_ [_ slot-id status]]
   {:dispatch-n [[:admin/toast :success (str "Inscripción marcada como " status ".")]
                 [:admin/fetch-roster slot-id]
                 ;; El contador de inscritos del cupo cambió.
                 [:admin/load-slots]]}))

(re-frame/reg-event-fx
 :admin/fetch-roster
 (fn [_ [_ slot-id]]
   {:admin/fetch-roster! slot-id}))

;; -----------------------------------------------------------------------------
;; Admin: recursos
;; -----------------------------------------------------------------------------

(re-frame/reg-sub
 :admin/resources
 (fn [db _]
   (get-in db [:admin :resources] [])))

(re-frame/reg-sub
 :admin/modules
 (fn [db _]
   (get-in db [:admin :modules] [])))

(re-frame/reg-sub
 :admin/editing-resource
 (fn [db _]
   (get-in db [:admin :editing-resource])))

(re-frame/reg-sub
 :admin/resources-module-filter
 (fn [db _]
   (get-in db [:admin :resources-module-filter] "")))

(re-frame/reg-sub
 :admin/resources-view
 :<- [:admin/resources]
 :<- [:admin/resources-module-filter]
 (fn [[rows module-id] _]
   (if (seq (str module-id))
     (filterv #(= (:module_id %) module-id) rows)
     rows)))

(re-frame/reg-event-db
 :admin/set-resources-module-filter
 (fn [db [_ module-id]]
   (assoc-in db [:admin :resources-module-filter] module-id)))

(re-frame/reg-fx
 :admin/fetch-resources!
 (fn [_]
   (go
     (let [mods (<! (crud/fetch-modules))
           res (<! (crud/fetch-admin-resources))]
       (if-let [err (or (:error res) (:error mods))]
         (re-frame/dispatch [:admin/section-fail :resources err])
         (re-frame/dispatch [:admin/resources-bundle
                             (or (:data mods) [])
                             (or (:data res) [])]))))))

(re-frame/reg-event-fx
 :admin/load-resources
 (fn [_ _]
   {:dispatch [:admin/section-start :resources]
    :admin/fetch-resources! nil}))

(re-frame/reg-event-fx
 :admin/resources-bundle
 (fn [{:keys [db]} [_ modules resources]]
   {:db (-> db
            (assoc-in [:admin :modules] modules)
            (assoc-in [:admin :resources] resources))
    :dispatch [:admin/section-ok :resources]}))

(re-frame/reg-event-db
 :admin/edit-resource
 (fn [db [_ resource]]
   (assoc-in db [:admin :editing-resource] resource)))

(re-frame/reg-event-db
 :admin/cancel-edit-resource
 (fn [db _]
   (assoc-in db [:admin :editing-resource] nil)))

(re-frame/reg-fx
 :admin/save-resource!
 (fn [{:keys [row update?]}]
   (go
     (let [result (<! (crud/upsert-resource! row))]
       (if (:success result)
         (re-frame/dispatch [:admin/resource-saved update?])
         (re-frame/dispatch [:admin/resource-save-failed
                             (or (:error result) "No se pudo guardar el recurso")]))))))

(re-frame/reg-event-fx
 :admin/save-resource
 (fn [_ [_ row]]
   {:admin/save-resource! {:row row :update? (some? (get row "id"))}}))

(re-frame/reg-event-fx
 :admin/resource-saved
 (fn [{:keys [db]} [_ update?]]
   {:db (assoc-in db [:admin :editing-resource] nil)
    :dispatch-n [[:admin/toast :success (if update? "Recurso actualizado." "Recurso creado.")]
                 [:admin/load-resources]
                 [:admin/invalidate :overview]]}))

(re-frame/reg-event-fx
 :admin/resource-save-failed
 (fn [_ [_ msg]]
   {:dispatch [:admin/toast :error msg]}))

(re-frame/reg-event-fx
 :admin/toggle-resource-published
 (fn [_ [_ resource]]
   {:dispatch [:admin/save-resource
               {"id" (:id resource)
                "published" (not (boolean (:published resource)))}]}))

(re-frame/reg-fx
 :admin/delete-resource!
 (fn [id]
   (go
     (let [result (<! (crud/delete-resource! id))]
       (if (:success result)
         (re-frame/dispatch [:admin/resource-deleted])
         (re-frame/dispatch [:admin/resource-save-failed
                             (or (:error result) "No se pudo eliminar el recurso")]))))))

(re-frame/reg-event-fx
 :admin/delete-resource
 (fn [_ [_ id]]
   {:admin/delete-resource! id}))

(re-frame/reg-event-fx
 :admin/resource-deleted
 (fn [_ _]
   {:dispatch-n [[:admin/toast :success "Recurso eliminado."]
                 [:admin/load-resources]
                 [:admin/invalidate :overview]]}))
