(ns universo.events.dashboard
  (:require
   [re-frame.core :as re-frame]
   [cljs.core.async :refer [go <!]]
   [universo.db.crud :as crud]))

;; -----------------------------------------------------------------------------
;; FUNCIONES AUXILIARES PARA PROCESAR TESTS
;; -----------------------------------------------------------------------------

(defn calcular-nota
  "Calcula la nota del test basada en el array de responses"
  [test-data]
  (let [responses (get-in test-data [:test :responses])
        total (count responses)
        correctas (count (filter :correct? responses))
        porcentaje (if (pos? total)
                     (* (/ correctas total) 100)
                     0)]
    {:correctas correctas
     :total total
     :porcentaje (js/Math.round porcentaje)
     :nota porcentaje}))

(defn procesar-ultimo-test
  "Procesa el test más reciente para mostrar en el dashboard"
  [tests-data]
  (when (seq tests-data)
    (let [ultimo-test (first tests-data)
          test-info (:test ultimo-test)
          stats (calcular-nota ultimo-test)
          theta-final (last (get-in ultimo-test [:test :theta-history]))]
      {:id (:id ultimo-test)
       :fecha (:created_at ultimo-test)
       :tema (get-in ultimo-test [:test :topic])
       :completado? (some? (get-in ultimo-test [:test :end-time]))
       :correctas (:correctas stats)
       :total (:total stats)
       :porcentaje (:porcentaje stats)
       :nota (:nota stats)
       :theta theta-final
       :current-question (get-in ultimo-test [:test :current-question])})))

(defn calcular-estadisticas-generales
  "Calcula estadísticas generales de todos los tests"
  [tests-data]
  (let [tests-completados (filter #(some? (get-in % [:test :end-time])) tests-data)
        total-tests (count tests-data)
        total-completados (count tests-completados)]
    (if (pos? total-completados)
      (let [notas (map #(get (calcular-nota %) :nota) tests-completados)
            promedio (/ (reduce + notas) total-completados)
            theta-promedio (/ (reduce + (keep #(last (get-in % [:test :theta-history])) tests-completados))
                              total-completados)]
        {:total-tests total-tests
         :tests-completados total-completados
         :promedio-nota (js/Math.round promedio)
         :theta-promedio (js/Math.round (* theta-promedio 100)) ; escalado para mostrar
         :ultimo-test (procesar-ultimo-test tests-data)})
      {:total-tests total-tests
       :tests-completados 0
       :promedio-nota 0
       :theta-promedio 0
       :ultimo-test (procesar-ultimo-test tests-data)})))

(defn formatear-fecha
  "Formatea la fecha de created_at a formato legible"
  [fecha-str]
  (when fecha-str
    (let [fecha (js/Date. fecha-str)
          opciones #js {:year "numeric"
                        :month "long"
                        :day "numeric"
                        :hour "2-digit"
                        :minute "2-digit"}]
      (.toLocaleDateString fecha "es-ES" opciones))))

;; -----------------------------------------------------------------------------
;; EVENTOS PRINCIPALES
;; -----------------------------------------------------------------------------

(re-frame/reg-event-fx
 :dashboard/cargar
 (fn [{:keys [db]} [_ email]]
   (if (or (nil? email)
           (:dashboard/cargando? db))
     (do (js/console.warn "⚠️ :dashboard/cargar llamado sin email o mientras cargaba")
         {:db db})
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
       ;; Obtener tests ordenados por fecha descendente (más reciente primero)
       (let [tests-resp (<! (crud/get-table "tests"
                                            {"email-user" email}
                                            {:order-by [:created_at :desc]}))
             tests-data (:data tests-resp)]

         (if (:success tests-resp)
           (do
             (js/console.log "📊 Tests cargados:" (count tests-data))
             (let [stats (calcular-estadisticas-generales tests-data)]
               (js/console.log "📈 Estadísticas calculadas:" stats)
               (re-frame/dispatch [:dashboard/exito stats])))
           (do
             (js/console.error "❌ Error al cargar tests:" tests-resp)
             (re-frame/dispatch [:dashboard/error "Error al obtener datos."]))))

       (catch :default e
         (js/console.error "❌ Excepción al cargar dashboard:" e)
         (re-frame/dispatch [:dashboard/error e]))))))

;; -----------------------------------------------------------------------------
;; ÉXITO / ERROR
;; -----------------------------------------------------------------------------
(re-frame/reg-event-fx
 :dashboard/exito
 (fn [{:keys [db]} [_ stats]]
   {:db (-> db
            (assoc :dashboard/stats stats)
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
(re-frame/reg-sub
 :dashboard/stats
 (fn [db _] (:dashboard/stats db)))

(re-frame/reg-sub
 :dashboard/ultimo-test
 (fn [db _] (get-in db [:dashboard/stats :ultimo-test])))

(re-frame/reg-sub
 :dashboard/total-tests
 (fn [db _] (get-in db [:dashboard/stats :total-tests] 0)))

(re-frame/reg-sub
 :dashboard/tests-completados
 (fn [db _] (get-in db [:dashboard/stats :tests-completados] 0)))

(re-frame/reg-sub
 :dashboard/promedio-nota
 (fn [db _] (get-in db [:dashboard/stats :promedio-nota] 0)))

(re-frame/reg-sub
 :dashboard/theta-promedio
 (fn [db _] (get-in db [:dashboard/stats :theta-promedio] 0)))

(re-frame/reg-sub
 :dashboard/cargando?
 (fn [db _] (:dashboard/cargando? db)))

(re-frame/reg-sub
 :dashboard/error
 (fn [db _] (:dashboard/error db)))
