(ns universo.events.slots
  (:require
   [re-frame.core :as re-frame]
   [cljs.core.async :refer [go <!]]
   [universo.db.crud :as crud]
   [universo.resources :as resources]
   [universo.slots.logic :as logic]))

(re-frame/reg-sub
 :slots/all-items
 (fn [db _]
   (get-in db [:slots :items] [])))

(re-frame/reg-sub
 :slots/band
 (fn [db _]
   (let [band (or (get-in db [:student-profile :theta_band])
                  (get-in db [:student-profile :profile :theta-band]))]
     (when (seq (str (or band ""))) band))))

;; El filtro por banda se deriva, no se aplica al cargar: el perfil se pide en
;; paralelo a los cupos y suele llegar después, así que filtrar en :slots/loaded
;; dejaba la lista vacía para siempre aunque hubiera cupos de la banda.
(re-frame/reg-sub
 :slots/items
 :<- [:slots/all-items]
 :<- [:slots/band]
 (fn [[items band] _]
   (logic/filter-slots-for-band items band)))

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

;; Las dos consultas son independientes: se lanzan juntas y se esperan después.
;; Antes se hacían en serie (`mods` y recién entonces `res`), pagando dos veces la
;; latencia por gusto — y esta carga ocurría después de **cada** guardado.
(re-frame/reg-fx
 :admin/fetch-resources!
 (fn [_]
   (go
     (let [mods-ch (crud/fetch-modules)
           res-ch (crud/fetch-admin-resources)
           mods (<! mods-ch)
           res (<! res-ch)]
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

;; `:admin/cancel-edit-resource` se fusionó con `:admin/discard-resource-draft`,
;; más abajo: hacían el mismo trabajo y tener dos eventos para una acción es la
;; forma más fácil de que uno se quede sin limpiar la mitad del estado.

(re-frame/reg-fx
 :admin/save-resource!
 (fn [{:keys [row update?]}]
   (go
     (let [result (<! (crud/upsert-resource! row))]
       (if (:success result)
         ;; La fila guardada viaja en el propio resultado (`upsert-resource!`
         ;; hace `.select("*").single()`), así que no hay que ir a buscarla.
         (re-frame/dispatch [:admin/resource-saved update? (:data result)])
         (re-frame/dispatch [:admin/resource-save-failed
                             (or (:error result) "No se pudo guardar el recurso")]))))))

(re-frame/reg-event-fx
 :admin/save-resource
 (fn [{:keys [db]} [_ row]]
   {:db (assoc-in db [:admin :resource-saving?] true)
    :admin/save-resource! {:row row :update? (some? (get row "id"))}}))

;; Antes esto disparaba `:admin/load-resources`, que recarga módulos y **todos**
;; los recursos para reflejar el cambio de una fila. Ahora la fila se pone en su
;; lugar en la lista que ya está en memoria; el `:modules` del join lo re-adjunta
;; `resources/attach-module` con los módulos que también están en memoria.
;; El resultado es el mismo y no hay viaje de vuelta al servidor.
(re-frame/reg-event-fx
 :admin/resource-saved
 (fn [{:keys [db]} [_ update? row]]
   (let [modules (get-in db [:admin :modules] [])
         fila (some-> row (resources/attach-module modules))]
     {:db (-> db
              (assoc-in [:admin :editing-resource] nil)
              (assoc-in [:admin :resource-draft] nil)
              (assoc-in [:admin :resource-saving?] false)
              (update-in [:admin :resources] resources/upsert-row fila))
      :dispatch-n [[:admin/toast :success (if update? "Recurso actualizado." "Recurso creado.")]
                   ;; El resumen sí queda obsoleto (cuenta publicados): se
                   ;; invalida para que se recargue al abrir esa pestaña, en vez
                   ;; de recargarla ahora que nadie la está mirando.
                   [:admin/invalidate :overview]]})))

(re-frame/reg-event-fx
 :admin/resource-save-failed
 (fn [{:keys [db]} [_ msg]]
   {:db (assoc-in db [:admin :resource-saving?] false)
    :dispatch [:admin/toast :error msg]}))

;; Publicar/despublicar es un booleano y costaba una recarga completa de la
;; sección. Ahora se pinta al instante y se revierte si la policy lo rechaza —
;; el mismo patrón que ya usan los roles y la moderación del guestbook.
(re-frame/reg-event-fx
 :admin/toggle-resource-published
 (fn [{:keys [db]} [_ resource]]
   (let [id (:id resource)
         nuevo (not (boolean (:published resource)))]
     {:db (update-in db [:admin :resources] resources/set-published id nuevo)
      :admin/toggle-resource-published! {:id id :published nuevo}})))

(re-frame/reg-fx
 :admin/toggle-resource-published!
 (fn [{:keys [id published]}]
   (go
     (let [result (<! (crud/upsert-resource! {"id" id "published" published}))]
       (if (:success result)
         (re-frame/dispatch [:admin/invalidate :overview])
         (re-frame/dispatch [:admin/resource-publish-failed id (not published)
                             (or (:error result)
                                 "No se pudo cambiar la publicación")]))))))

(re-frame/reg-event-fx
 :admin/resource-publish-failed
 (fn [{:keys [db]} [_ id anterior msg]]
   ;; `set-published` es su propia inversa: revertir es volver a llamarla con el
   ;; valor de antes. Sin recargar la sección entera para deshacer un booleano.
   {:db (update-in db [:admin :resources] resources/set-published id anterior)
    :dispatch [:admin/toast :error msg]}))

;; -----------------------------------------------------------------------------
;; Borrador del formulario de recursos (sobrevive el cambio de pestaña)
;; -----------------------------------------------------------------------------
;; Antes el formulario vivía en un `r/atom` dentro del componente: cambiar de
;; pestaña y volver borraba lo escrito **sin aviso**, y escribir un recurso con
;; LaTeX son veinte minutos de trabajo. La convención del proyecto ya dice que el
;; estado de UI por sección va en `app-db`; esto lo cumple.

(re-frame/reg-sub
 :admin/resource-draft
 (fn [db _]
   (get-in db [:admin :resource-draft])))

(re-frame/reg-sub
 :admin/resource-saving?
 (fn [db _]
   (get-in db [:admin :resource-saving?] false)))

(re-frame/reg-event-db
 :admin/set-resource-draft
 (fn [db [_ draft]]
   (assoc-in db [:admin :resource-draft] draft)))

(re-frame/reg-event-db
 :admin/update-resource-draft
 (fn [db [_ k v]]
   (assoc-in db [:admin :resource-draft k] v)))

(re-frame/reg-event-db
 :admin/discard-resource-draft
 (fn [db _]
   (-> db
       (assoc-in [:admin :resource-draft] nil)
       (assoc-in [:admin :editing-resource] nil))))

;; Duplicar: el atajo que más rinde escribiendo contenido, porque los recursos de
;; un módulo suelen ser variaciones del anterior. Deja el borrador cargado y sin
;; `:id`, así que el siguiente guardado crea una fila nueva.
(re-frame/reg-event-fx
 :admin/duplicate-resource
 (fn [{:keys [db]} [_ resource]]
   {:db (-> db
            (assoc-in [:admin :editing-resource] nil)
            (assoc-in [:admin :resource-draft] (resources/duplicate-draft resource)))
    :dispatch [:admin/toast :success "Copia lista para editar. No está publicada."]}))

(re-frame/reg-fx
 :admin/delete-resource!
 (fn [id]
   (go
     (let [result (<! (crud/delete-resource! id))]
       (if (:success result)
         (re-frame/dispatch [:admin/resource-deleted])
         ;; Falló el borrado: la fila tiene que volver, y para eso sí hace falta
         ;; el servidor — no se puede reconstruir una fila que se quitó de la
         ;; lista optimista sin haberla guardado.
         (re-frame/dispatch [:admin/resource-delete-failed
                             (or (:error result) "No se pudo eliminar el recurso")]))))))

(re-frame/reg-event-fx
 :admin/delete-resource
 (fn [{:keys [db]} [_ id]]
   {:db (update-in db [:admin :resources] resources/remove-row id)
    :admin/delete-resource! id}))

(re-frame/reg-event-fx
 :admin/resource-deleted
 (fn [_ _]
   {:dispatch-n [[:admin/toast :success "Recurso eliminado."]
                 [:admin/invalidate :overview]]}))

(re-frame/reg-event-fx
 :admin/resource-delete-failed
 (fn [_ [_ msg]]
   {:dispatch-n [[:admin/toast :error msg]
                 [:admin/load-resources]]}))
