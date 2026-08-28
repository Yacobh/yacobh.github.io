(ns universo.events.editor-vivo
  "Editar el ítem que está a la vista, sin salir del diagnóstico (ADR-032).

   El banco de preguntas es el activo del proyecto (G-2) y hasta ahora solo se
   podía corregir desde el panel de admin, en frío: el autor detectaba una
   explicación mala **rindiendo** el test y tenía que anotarla, salir, buscar el
   ítem entre 306 y volver. Este namespace cierra ese viaje — se corrige donde se
   ve, y con «volver a servir» se comprueba el efecto en el mismo flujo.

   Dos límites que no son casualidad:

   1. **Patch parcial, nunca la fila entera.** El borrador conoce once columnas
      de las veinte del ítem; `editor/campos-editados` manda solo lo que cambió.
   2. **El control real es la policy SQL.** El `admin?` de acá es UX: quien no lo
      sea no obtiene la fila (`questions_select_admin`, migración 025) ni puede
      escribirla. Ver CLAUDE.md §7.4."
  (:require
   [cljs.core.async :as async :refer [go <!]]
   [clojure.string :as str]
   [re-frame.core :as re-frame]
   [universo.db.crud :as crud]
   [universo.editor :as editor]))

;; -----------------------------------------------------------------------------
;; Estado
;; -----------------------------------------------------------------------------
;; Vive en [:test :editor] y no en [:admin ...] a propósito: es estado de la
;; sección diagnóstico y muere con ella. `:test/start` lo limpia junto con el
;; resto del test, así que un editor abierto no puede sobrevivir a un test nuevo
;; apuntando a un ítem que ya no está en pantalla.

(def ^:private estado-cerrado
  {:open? false :question-id nil :loading? false :saving? false
   :error nil :aviso nil :draft nil :original nil})

(defn- draft-desde-fila
  "Fila de `questions` → borrador del formulario.

   Los `nil` se vuelven `\"\"` porque un `<textarea :value nil>` en React pasa a
   no controlado y deja de responder al estado; `editor/campos-editados` los
   vuelve a convertir en `nil` al guardar, así que la ida y vuelta no inventa
   strings vacíos en columnas que estaban en nulo."
  [row]
  (reduce (fn [m k]
            (assoc m k (let [v (get row k)]
                         (cond (nil? v) ""
                               (keyword? v) (name v)
                               :else v))))
          {}
          editor/campos-en-vivo))

;; -----------------------------------------------------------------------------
;; Abrir / cerrar
;; -----------------------------------------------------------------------------

(re-frame/reg-fx
 :editor-vivo/fetch
 (fn [question-id]
   (go
     (let [res (<! (crud/fetch-admin-question question-id))]
       (if (:success res)
         (re-frame/dispatch [:editor-vivo/cargado (:data res)])
         (re-frame/dispatch [:editor-vivo/fallo
                             (or (:error res) "No se pudo cargar el ítem.")]))))))

(re-frame/reg-event-fx
 :editor-vivo/abrir
 (fn [{:keys [db]} [_ question-id]]
   (if-not (and (get-in db [:auth :admin?]) question-id)
     {:db db}
     (cond-> {:db (assoc-in db [:test :editor]
                            (merge estado-cerrado
                                   {:open? true
                                    :question-id question-id
                                    :loading? true}))
              :editor-vivo/fetch question-id}
       ;; Los dos catálogos de los desplegables. Se piden con los mismos efectos
       ;; del panel: acá no se ha abierto ninguna pestaña de admin, así que sin
       ;; esto «Módulo» e «Idea errónea» aparecen vacíos y parecen rotos.
       (empty? (get-in db [:admin :modules]))
       (assoc :admin/fetch-modules-only true)

       (empty? (get-in db [:admin :misconceptions]))
       (assoc :admin/fetch-misconceptions-only true)))))

(re-frame/reg-event-db
 :editor-vivo/cargado
 (fn [db [_ row]]
   (update-in db [:test :editor] merge
              {:loading? false
               :error nil
               :original row
               :draft (draft-desde-fila row)})))

(re-frame/reg-event-db
 :editor-vivo/fallo
 (fn [db [_ mensaje]]
   (update-in db [:test :editor] merge
              {:loading? false :saving? false :error mensaje})))

(re-frame/reg-event-db
 :editor-vivo/cerrar
 (fn [db _]
   (assoc-in db [:test :editor] estado-cerrado)))

(re-frame/reg-event-db
 :editor-vivo/campo
 (fn [db [_ k v]]
   (-> db
       (assoc-in [:test :editor :draft k] v)
       ;; Cualquier tecla borra el aviso de la corrida anterior: un «guardado»
       ;; verde sobre un formulario que ya cambió miente.
       (assoc-in [:test :editor :aviso] nil))))

;; -----------------------------------------------------------------------------
;; Guardar
;; -----------------------------------------------------------------------------

(re-frame/reg-fx
 :editor-vivo/patch
 (fn [{:keys [question-id campos reintentar?]}]
   (go
     (let [res (<! (crud/patch-admin-question-fields! question-id campos))]
       (if (:success res)
         (re-frame/dispatch [:editor-vivo/guardado
                             {:row (:data res) :reintentar? reintentar?}])
         (re-frame/dispatch [:editor-vivo/fallo
                             (or (:error res) "No se pudo guardar el cambio.")]))))))

(re-frame/reg-event-fx
 :editor-vivo/guardar
 (fn [{:keys [db]} [_ {:keys [reintentar?]}]]
   (let [{:keys [question-id draft original saving?]} (get-in db [:test :editor])
         campos (editor/campos-editados original draft)]
     (cond
       (or saving? (nil? question-id)) {:db db}

       ;; Abrir, mirar y cerrar es un caso normal, no un error: no se escribe
       ;; una fila para decir que no cambió nada.
       (empty? campos)
       (if reintentar?
         {:db (assoc-in db [:test :editor :aviso] "Sin cambios; se vuelve a servir igual.")
          :dispatch [:test/reintentar-ultimo {:parche nil}]}
         {:db (assoc-in db [:test :editor :aviso] "No hay cambios que guardar.")})

       :else
       {:db (update-in db [:test :editor] merge {:saving? true :error nil :aviso nil})
        :editor-vivo/patch {:question-id question-id
                            :campos campos
                            :reintentar? reintentar?}}))))

(defn- parche-de-item
  "Fila guardada → los campos que la pregunta ya montada en el test entiende.

   El test guarda la pregunta normalizada (`normalize-question`), con
   `:module-id`/`:module-slug` en kebab-case y sin las columnas de explicación.
   Sin esta traducción, «volver a servir» mostraría el enunciado viejo."
  [row modules]
  (let [slug (some (fn [m] (when (= (:id m) (:module_id row)) (:slug m))) modules)]
    (cond-> {}
      (contains? row :question) (assoc :question (:question row))
      (contains? row :difficulty) (assoc :difficulty (:difficulty row))
      (contains? row :module_id) (assoc :module-id (:module_id row))
      slug (assoc :module-slug slug))))

(re-frame/reg-event-fx
 :editor-vivo/guardado
 (fn [{:keys [db]} [_ {:keys [row reintentar?]}]]
   (let [seleccionada (get-in db [:test :feedback :response :selected-option])
         clave-error (when seleccionada
                       (keyword (str "error_" (str/lower-case (str seleccionada)))))
         ;; La explicación que el estudiante tiene delante se refresca en el acto:
         ;; el punto del editor es ver el efecto de lo que se escribió, y para eso
         ;; hay que verlo. **La respuesta ya registrada en `:responses` no se
         ;; toca**: es el hecho de lo que se le mostró en su momento, y reescribir
         ;; el histórico para que cuadre con la corrección es exactamente lo que
         ;; G-4 prohíbe.
         db' (cond-> (update-in db [:test :editor] merge
                                {:saving? false
                                 :error nil
                                 :aviso "Guardado."
                                 :original row
                                 :draft (draft-desde-fila row)})
               (and clave-error (contains? row clave-error))
               (assoc-in [:test :feedback :response :selected-error]
                         (get row clave-error)))]
     (cond-> {:db db'}
       reintentar?
       (assoc :dispatch [:test/reintentar-ultimo
                         {:parche (parche-de-item row (get-in db [:admin :modules]))}])))))

;; -----------------------------------------------------------------------------
;; Suscripciones
;; -----------------------------------------------------------------------------

;; `or` y no el valor por defecto de `get-in`: `:test/start` y `:test/show-feedback`
;; dejan la clave puesta en `nil`, y ahí `get-in` devuelve `nil`, no el default.
(re-frame/reg-sub :editor-vivo/estado (fn [db _] (or (get-in db [:test :editor]) estado-cerrado)))
;; Con `(fn [m _] ...)` y no con la keyword suelta: re-frame invoca la función de
;; cómputo con dos argumentos, y `(:open? m [:editor-vivo/estado])` devolvería el
;; vector de consulta como valor por defecto — verdadero siempre.
(re-frame/reg-sub :editor-vivo/abierto? :<- [:editor-vivo/estado] (fn [m _] (:open? m)))
(re-frame/reg-sub :editor-vivo/draft :<- [:editor-vivo/estado] (fn [m _] (:draft m)))

;; Qué cambiaría si se pulsa Guardar. Lo usa el botón para desactivarse y para
;; decir cuántos campos van — el mismo criterio que aplica el evento, no una
;; segunda opinión (la lección de `question-missing-fields`).
(re-frame/reg-sub
 :editor-vivo/cambios
 :<- [:editor-vivo/estado]
 (fn [{:keys [original draft]} _]
   (if (and original draft)
     (editor/campos-editados original draft)
     {})))
