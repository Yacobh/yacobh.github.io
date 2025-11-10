(ns universo.events.dashboard
  (:require
   [re-frame.core :as re-frame]
   [cljs.core.async :refer [go <!]]
   [universo.db.crud :as crud]))

;; -----------------------------------------------------------------------------
;; FUNCIONES AUXILIARES PARA PROCESAR TESTS
;; -----------------------------------------------------------------------------
(defn duracion-test-ms [test]
  ;; Devuelve la duración en milisegundos o nil si falta algún dato
  (let [start (:start-time test)
        end   (:end-time test)]
    (when (and start end)
      (- end start))))

(defn duracion-test-min [test]
  ;; Devuelve la duración en minutos (redondeado a 1 decimal)
  (when-let [ms (duracion-test-ms test)]
    (/ (js/Math.round (/ ms 6000)) 10))) ;; 6000 para dar 1 decimal, 60000 sería sin decimales

(defn promedio-tiempo-por-pregunta-ms [test]
  (let [duracion (duracion-test-ms test)
        total    (count (:responses test))]
    (when (and duracion (pos? total))
      (/ duracion total))))

(defn promedio-tiempo-por-pregunta-seg [test]
  (when-let [ms (promedio-tiempo-por-pregunta-ms test)]
    (/ (js/Math.round (/ ms 100)) 10))) ;; 100 para 1 decimal, 1000 sólo segundos enteros



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
       :current-question (get-in ultimo-test [:test :current-question])
       :duracion-min (duracion-test-min test-info)
       :promedio-seg-pregunta (promedio-tiempo-por-pregunta-seg test-info)})))


(defn test-completado? [test]
  (some? (:end-time test)))

(defn nota-de-test [test]
  (:nota (calcular-nota test)))

(defn theta-final [test]
  (last (:theta-history test)))

(defn promediar
  "Calcula el promedio de una secuencia de números, retorna 0 si está vacía."
  [nums]
  (if (seq nums)
    (/ (reduce + nums) (count nums))
    0))

(defn calcular-estadisticas-generales
  "Calcula estadísticas generales de todos los tests"
  [tests-data]
  (let [tests-completados (filter test-completado? tests-data)
        total-tests (count tests-data)
        total-completados (count tests-completados)
        notas (keep nota-de-test tests-completados)
        thetas (keep theta-final tests-completados)
        promedio-nota (Math/round (promediar notas))
        theta-promedio (Math/round (* 100 (promediar thetas)))]
    {:total-tests total-tests
     :tests-completados total-completados
     :promedio-nota (if (pos? total-completados) promedio-nota 0)
     :theta-promedio (if (pos? total-completados) theta-promedio 0)
     :ultimo-test (procesar-ultimo-test tests-data)}))


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
