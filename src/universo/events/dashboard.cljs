(ns universo.events.dashboard
  (:require
   [re-frame.core :as re-frame]
   [cljs.core.async :refer [go <!]]
   [universo.db.crud :as crud]
   [universo.supabase :as sb]))

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

(defn- created-at-ms
  "Timestamp ms de created_at; 0 si no hay fecha."
  [row]
  (if-let [s (:created_at row)]
    (.getTime (js/Date. s))
    0))

(defn sort-tests-newest-first
  "Ordena por created_at desc, luego por id desc (más reciente primero)."
  [tests-data]
  (vec (sort-by (fn [t]
                  [(- (created-at-ms t))
                   (- (or (:id t) 0))])
                tests-data)))

(defn procesar-test-resumen
  "Normaliza una fila de Supabase para la UI del dashboard."
  [row]
  (when row
    (let [test-info (:test row)
          stats (calcular-nota row)
          theta (last (get-in row [:test :theta-history]))]
      {:id (:id row)
       :fecha (:created_at row)
       :tema (get-in row [:test :topic])
       :completado? (some? (get-in row [:test :end-time]))
       :correctas (:correctas stats)
       :total (:total stats)
       :porcentaje (:porcentaje stats)
       :nota (:nota stats)
       :theta theta
       :current-question (get-in row [:test :current-question])
       :duracion-min (duracion-test-min test-info)
       :promedio-seg-pregunta (promedio-tiempo-por-pregunta-seg test-info)})))

(defn procesar-ultimo-test
  "Procesa el test más reciente (por fecha/id) para mostrar en el dashboard."
  [tests-data]
  (when-let [sorted (seq (sort-tests-newest-first tests-data))]
    (procesar-test-resumen (first sorted))))

(defn procesar-historial
  "Lista de resúmenes, más reciente primero."
  [tests-data]
  (mapv procesar-test-resumen (sort-tests-newest-first tests-data)))

(defn test-completado? [test]
  (some? (:end-time (:test test))))

(defn nota-de-test [test]
  (:nota (calcular-nota test)))

(defn theta-final [test]
  (last (:theta-history (:test test))))

(defn promediar
  "Calcula el promedio de una secuencia de números, retorna 0 si está vacía."
  [nums]
  (if (seq nums)
    (/ (reduce + nums) (count nums))
    0))

(defn calcular-estadisticas-generales
  "Calcula estadísticas generales de todos los tests"
  [tests-data]
  (let [sorted (sort-tests-newest-first tests-data)
        tests-completados (filter test-completado? sorted)
        total-tests (count sorted)
        total-completados (count tests-completados)
        notas (keep nota-de-test tests-completados)
        thetas (keep theta-final tests-completados)
        promedio-nota (Math/round (promediar notas))
        theta-promedio (Math/round (* 100 (promediar thetas)))
        historial (procesar-historial sorted)]
    {:total-tests total-tests
     :tests-completados total-completados
     :promedio-nota (if (pos? total-completados) promedio-nota 0)
     :theta-promedio (if (pos? total-completados) theta-promedio 0)
     :ultimo-test (first historial)
     :historial historial}))


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
 :dashboard/refresh
 (fn [{:keys [db]} _]
   (let [email (get-in db [:visitor :email])
         user-id (or (get-in db [:auth :user :id])
                     (get-in db [:dashboard :user-id]))]
     (if (or email user-id)
       {:dispatch [:dashboard/cargar email]}
       {:db db}))))

(defn- own-test?
  "Fila propia por user_id o email-user (defensa si RLS está demasiado abierta)."
  [row uid email]
  (let [row-uid (some-> (or (:user_id row) (get row "user_id")) str)
        row-email (or (:email-user row)
                      (get row "email-user"))]
    (boolean
     (or (and uid row-uid (= (str uid) row-uid))
         (and email row-email (= (str email) (str row-email)))))))

(defn- filter-own-tests [rows uid email]
  (if (or uid email)
    (vec (filter #(own-test? % uid email) (or rows [])))
    (vec (or rows []))))

(re-frame/reg-event-fx
 :dashboard/cargar
 (fn [{:keys [db]} [_ email]]
   (let [email (or email (get-in db [:visitor :email]))
         user-id (or (get-in db [:auth :user :id])
                     (get-in db [:dashboard :user-id]))]
     (cond
       (and (nil? email) (nil? user-id))
       (do (js/console.warn "⚠️ :dashboard/cargar sin identidad")
           {:db db})

       (:dashboard/cargando? db)
       {:db db}

       :else
       {:db (assoc db :dashboard/cargando? true)
        :dispatch [:dashboard/consultar email]}))))

(re-frame/reg-event-fx
 :dashboard/consultar
 (fn [{:keys [db]} [_ email]]
   (let [user-id (or (get-in db [:auth :user :id])
                     (get-in db [:dashboard :user-id]))]
     {:fx/cargar-dashboard {:email email :user-id user-id}})))

;; -----------------------------------------------------------------------------
;; EFECTO: Cargar datos de Supabase
;; Preferir filtro user_id; si RLS/policies fallan, probar email y sin filtro.
;; Siempre se recorta en cliente a filas del usuario actual.
;; -----------------------------------------------------------------------------
(re-frame/reg-fx
 :fx/cargar-dashboard
 (fn [{:keys [email user-id]}]
   (-> (sb/current-user-id)
       (.then
        (fn [session-uid]
          (go
            (try
              (let [uid (some-> (or session-uid user-id) str)
                    _ (js/console.log "📊 Dashboard load"
                                      #js {:session-uid session-uid
                                           :app-uid user-id
                                           :email email})
                    attempts (cond-> []
                               uid (conj [:user uid])
                               email (conj [:email email])
                               true (conj [:none nil]))
                    resp (loop [xs attempts]
                           (if-let [[mode val] (first xs)]
                             (let [r (<! (crud/fetch-tests mode val))]
                               (cond
                                 (not (:success r)) r
                                 (seq (:data r)) r
                                 :else (do
                                         (when (next xs)
                                           (js/console.warn "⚠️ 0 filas mode=" (name mode)
                                                            "→ siguiente"))
                                         (recur (next xs)))))
                             {:success true :data []}))
                    raw (or (:data resp) [])
                    tests-data (filter-own-tests raw uid email)]
                (if (:success resp)
                  (do
                    (js/console.log "📊 Tests cargados:" (count tests-data)
                                    "(de" (count raw) "visibles)")
                    (re-frame/dispatch
                     [:dashboard/exito (calcular-estadisticas-generales tests-data)]))
                  (do
                    (js/console.error "❌ Error al cargar tests:" (clj->js resp))
                    (re-frame/dispatch [:dashboard/error (or (:error resp)
                                                             "Error al obtener datos.")]))))
              (catch :default e
                (js/console.error "❌ Excepción al cargar dashboard:" e)
                (re-frame/dispatch [:dashboard/error e]))))))
       (.catch (fn [err]
                 (js/console.error "❌ No se pudo leer sesión para dashboard:" err)
                 (re-frame/dispatch [:dashboard/error "Sesión no disponible"]))))))

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
 :dashboard/historial
 (fn [db _] (get-in db [:dashboard/stats :historial] [])))

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

