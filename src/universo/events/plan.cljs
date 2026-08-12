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
      ;; El último test alimenta el eje de fluidez cuando el perfil guardado no
      ;; lo trae (perfiles anteriores a ADR-019). Va aparte de `:dispatch-n`
      ;; porque no debe bloquear ni ensuciar `:plan/loading?`: si falla, la
      ;; página se ve igual, solo sin la tarjeta de fluidez.
      :plan/fetch-last-test! uid
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

;; -----------------------------------------------------------------------------
;; Respuestas del último test — insumo del eje de fluidez (ADR-019)
;; -----------------------------------------------------------------------------
;; `student_profiles.profile` solo trae `:fluency` si lo escribió una versión del
;; bundle posterior a ADR-019. Todos los perfiles anteriores —incluido el de
;; cualquiera que haya rendido antes de publicar esta versión— no lo tienen, y
;; sin esto el eje no existiría para nadie hasta que volviera a rendir un test.
;;
;; No hace falta: los datos crudos ya están en `tests.test`, que guarda el mapa
;; completo del test con sus `:responses`, cada una con `:time-ms`, `:weight` y
;; `:question-text` desde ADR-014 Fase 1. La fluidez se recalcula desde ahí.
;;
;; **Esto NO contradice el criterio de "no reinterpretar hacia atrás" de
;; ADR-014.** Aquel decía que el filtro de esfuerzo no debe cambiar θ ya
;; estimado y mostrado. Acá no se toca θ ni ningún resultado previo: se calcula
;; un eje **nuevo** a partir de datos que siempre estuvieron guardados, y que
;; hasta ahora nadie leía.

(defn- test-map
  "El mapa del test guardado en la fila de `tests`.

   La columna `test` puede venir como objeto ya parseado (si es JSONB) o como
   string (si es text). [[../supabase/SCHEMA]] deja constancia de que el tipo
   real no está verificado contra la base — ver la nota de `021` — así que se
   toleran las dos formas en vez de suponer una."
  [row]
  (let [t (:test row)]
    (cond
      (map? t) t
      (string? t) (try
                    (js->clj (js/JSON.parse t) :keywordize-keys true)
                    (catch :default _ nil))
      :else nil)))

(re-frame/reg-fx
 :plan/fetch-last-test!
 (fn [user-id]
   (go
     (let [result (<! (crud/fetch-user-tests user-id))]
       ;; `fetch-tests` ordena por `created_at` descendente, así que el primero
       ;; es el más reciente. Un fallo acá no es un error del plan: simplemente
       ;; no se muestra la tarjeta de fluidez, y el resto de la página funciona
       ;; igual. Por eso no hay evento de error.
       (when (:success result)
         (let [ultimo (first (:data result))
               responses (:responses (test-map ultimo))]
           (re-frame/dispatch [:plan/last-test-loaded responses])))))))

(re-frame/reg-event-db
 :plan/last-test-loaded
 (fn [db [_ responses]]
   (assoc-in db [:plan :last-responses] (vec (or responses [])))))

(re-frame/reg-sub
 :plan/last-responses
 (fn [db _]
   (get-in db [:plan :last-responses] [])))
