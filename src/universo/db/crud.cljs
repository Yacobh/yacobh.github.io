(ns universo.db.crud
  (:require [universo.supabase :refer [supabase-client]]
            [cljs.core.async :as async :refer [go <!]]))

(defn collect-visitor-data
  "Recolecta datos básicos del visitante"
  []
  {:pais nil                    ; Lo llenaremos después con IP API
   :ciudad nil                  ; Lo llenaremos después con IP API
   :timezone (.-timeZone (.resolvedOptions (.DateTimeFormat js/Intl)))
   :idioma (.-language js/navigator)})

(defn insert-data-table!
  "Inserta data en una tabla.
   opts:
   - :returning? (default true) — si true, hace .select tras insert.
     Con RLS, .select requiere policy SELECT; para tests usa false si solo tienes INSERT."
  ([data-to-insert table-name]
   (insert-data-table! data-to-insert table-name {:returning? true}))
  ([data-to-insert table-name {:keys [returning?] :or {returning? true}}]
   (let [ch (async/chan)
         ;; Preferir claves string para columnas con guiones (email-user)
         payload (clj->js data-to-insert)
         _ (js/console.log "📤 Enviando datos a Supabase:" table-name payload)
         base (-> (.from supabase-client table-name)
                  (.insert payload))
         query (if returning?
                 (-> base (.select "*") (.single))
                 base)]
     (-> query
         (.then (fn [result]
                  (js/console.log "📡 Respuesta de Supabase:" result)
                  (if (.-error result)
                    (do
                      (js/console.error "❌ Error de Supabase:" (.-error result))
                      (async/put! ch {:success false
                                      :error (.-message (.-error result))}))
                    (do
                      (js/console.log "✅ Datos guardados exitosamente:" (.-data result))
                      (async/put! ch {:success true
                                      :data (js->clj (.-data result) :keywordize-keys true)})))))
         (.catch (fn [error]
                   (js/console.error "💥 Error capturado:" error)
                   (async/put! ch {:success false
                                   :error (.-message error)}))))
     ch)))



(defn get-all-table "Obtiene todos los elementos de la tabla"
  [table-name]
  (let [ch (async/chan)]
    (-> (.from supabase-client table-name)
        (.select "*")
        (.then (fn [result]
                 (js/console.log "📡 Respuesta de Supabase:" result)
                 (if (.-error result)
                   (async/put! ch {:success false
                                   :error (.-message (.-error result))})
                   (async/put! ch {:success true
                                   :data (js->clj (.-data result) :keywordize-keys true)}))))
        (.catch (fn [error]
                  (async/put! ch {:success false
                                  :error (.-message error)}))))
    ch))


#_(defn get-table
  "Obtiene elementos de una tabla, opcionalmente aplicando filtros.
   - table-name: nombre de la tabla
   - filters: mapa opcional con {comlumna valor} o {columna [:operador valor]}"
  ([table-name] (get-table table-name {})) ;; versión sin filtros
  ([table-name filters]
   (let [ch (async/chan)
         query (-> (.from supabase-client table-name)
                   (.select "*"))]

     ;; aplicar filtros dinámicamente
     (doseq [[col val] filters]
       (if (vector? val)
         (let [[op v] val]
           (case op
             :eq  (.eq query col v)
             :neq (.neq query col v)
             :lt  (.lt query col v)
             :lte (.lte query col v)
             :gt  (.gt query col v)
             :gte (.gte query col v)
             :like (.like query col v)
             :ilike (.ilike query col v)
            ;; NUEVO: operador :between para rangos
             :between (let [[_ min-val max-val] val]
                        (.gte query col min-val)
                        (.lte query col max-val))
             ;; si no reconoce, cae a eq
             (.eq query col v)))
         ;; default = igualdad
         (.eq query col val)))

     ;; ejecutar
     (-> query
         (.then (fn [result]
                  (js/console.log "📡 Respuesta filtrada de Supabase:" result)
                  (if (.-error result)
                    (async/put! ch {:success false
                                    :error (.-message (.-error result))})
                    (async/put! ch {:success true
                                    :data (js->clj (.-data result) :keywordize-keys true)}))))
         (.catch (fn [error]
                   (async/put! ch {:success false
                                   :error (.-message error)}))))
     ch)))

(defn get-table
  "Obtiene elementos de una tabla, opcionalmente aplicando filtros.
   - table-name: nombre de la tabla
   - filters: mapa opcional con {columna valor} o {columna [:operador valor]}
   - options: mapa opcional con opciones adicionales
     {:order-by [:columna :orden] ;; :orden puede ser :asc o :desc
      :limit n                     ;; número máximo de resultados
      :single true}                ;; si esperas un único resultado"
  ([table-name] (get-table table-name {} {}))
  ([table-name filters] (get-table table-name filters {}))
  ([table-name filters options]
   (let [ch (async/chan)
         query (-> (.from supabase-client table-name)
                   (.select "*"))]

     ;; aplicar filtros dinámicamente
     (doseq [[col val] filters]
       (if (vector? val)
         (let [[op v] val]
           (case op
             :eq  (.eq query col v)
             :neq (.neq query col v)
             :lt  (.lt query col v)
             :lte (.lte query col v)
             :gt  (.gt query col v)
             :gte (.gte query col v)
             :like (.like query col v)
             :ilike (.ilike query col v)
             :between (let [[_ min-val max-val] val]
                        (.gte query col min-val)
                        (.lte query col max-val))
             (.eq query col v)))
         (.eq query col val)))

     ;; aplicar ordenamiento si existe
     (when-let [[col orden] (:order-by options)]
       (.order query (name col) #js {:ascending (= orden :asc)}))

     ;; aplicar límite si existe
     (when-let [limit (:limit options)]
       (.limit query limit))

     ;; si se espera un único resultado
     (when (:single options)
       (.single query))

     ;; ejecutar
     (-> query
         (.then (fn [result]
                  (js/console.log "📡 Respuesta filtrada de Supabase:" result)
                  (if (.-error result)
                    (async/put! ch {:success false
                                    :error (.-message (.-error result))})
                    (async/put! ch {:success true
                                    :data (js->clj (.-data result) :keywordize-keys true)}))))
         (.catch (fn [error]
                   (async/put! ch {:success false
                                   :error (.-message error)}))))
     ch)))

(defn fetch-tests
  "Obtiene tests visibles (RLS). Opcionalmente filtra en servidor.
   filter-mode:
   - :none  → sin .eq (solo RLS)
   - :user  → .eq user_id
   - :email → .eq email-user"
  ([filter-mode value]
   (let [ch (async/chan)
         q0 (-> (.from supabase-client "tests")
                (.select "*")
                (.order "created_at" #js {:ascending false}))
         q (case filter-mode
             :user (if (and value (pos? (count (str value))))
                      (.eq q0 "user_id" (str value))
                      q0)
             :email (if (and value (pos? (count (str value))))
                      (.eq q0 "email-user" (str value))
                      q0)
             q0)]
     (js/console.log "🔎 fetch-tests"
                     #js {:mode (name filter-mode) :value (str value)})
     (-> q
         (.then (fn [result]
                  (let [err (.-error result)
                        data (.-data result)
                        n (if data (alength data) 0)]
                    (js/console.log "🔎 fetch-tests respuesta"
                                    #js {:mode (name filter-mode)
                                         :count n
                                         :error (when err (.-message err))
                                         :sample (when (pos? n) (aget data 0))})
                    (if err
                      (async/put! ch {:success false :error (.-message err)})
                      (async/put! ch {:success true
                                      :data (or (js->clj data :keywordize-keys true) [])})))))
         (.catch (fn [error]
                   (js/console.error "🔎 fetch-tests exception:" error)
                   (async/put! ch {:success false :error (.-message error)}))))
     ch)))

(defn fetch-user-tests
  "Compat: carga por user_id (string UUID)."
  [user-id]
  (fetch-tests :user user-id))

(defn insert-guestbook!
  "Inserta firma en guestbook sin .select() post-insert (compatible con RLS
   que solo deja SELECT de filas is_approved = true)."
  [row]
  (insert-data-table! row "guestbook" {:returning? false}))

(defn fetch-guestbook-entries
  "Lista pública: solo entradas aprobadas, más recientes primero."
  []
  (let [ch (async/chan)]
    (-> (.from supabase-client "guestbook")
        (.select "id,created_at,name,message")
        (.eq "is_approved" true)
        (.order "created_at" #js {:ascending false})
        (.limit 50)
        (.then (fn [result]
                 (if (.-error result)
                   (async/put! ch {:success false
                                   :error (.-message (.-error result))})
                   (async/put! ch {:success true
                                   :data (or (js->clj (.-data result)
                                                      :keywordize-keys true)
                                             [])}))))
        (.catch (fn [error]
                  (async/put! ch {:success false
                                  :error (.-message error)}))))
    ch))

(defn fetch-admin-profiles
  "Lista profiles (requiere is_admin vía RLS)."
  []
  (let [ch (async/chan)]
    (-> (.from supabase-client "profiles")
        (.select "id,email,role,created_at")
        (.order "created_at" #js {:ascending false})
        (.then (fn [result]
                 (if (.-error result)
                   (async/put! ch {:success false
                                   :error (.-message (.-error result))})
                   (async/put! ch {:success true
                                   :data (or (js->clj (.-data result)
                                                      :keywordize-keys true)
                                             [])}))))
        (.catch (fn [error]
                  (async/put! ch {:success false
                                  :error (.-message error)}))))
    ch))

(defn fetch-admin-tests
  "Lista tests recientes para admin (RLS is_admin)."
  ([]
   (fetch-admin-tests 100))
  ([limit]
   (let [ch (async/chan)]
     (-> (.from supabase-client "tests")
         (.select "id,created_at,email-user,user_id,test")
         (.order "created_at" #js {:ascending false})
         (.limit limit)
         (.then (fn [result]
                  (if (.-error result)
                    (async/put! ch {:success false
                                    :error (.-message (.-error result))})
                    (async/put! ch {:success true
                                    :data (or (js->clj (.-data result)
                                                       :keywordize-keys true)
                                              [])}))))
         (.catch (fn [error]
                   (async/put! ch {:success false
                                   :error (.-message error)}))))
     ch)))

(defn fetch-admin-guestbook
  "Guestbook para moderación.
   filter: :pending (null) | :approved (true) | :trash (false)"
  ([]
   (fetch-admin-guestbook :pending))
  ([filter-mode]
   (let [ch (async/chan)
         q0 (-> (.from supabase-client "guestbook")
                (.select "id,created_at,name,email,phone,message,is_approved")
                (.order "created_at" #js {:ascending false})
                (.limit 100))
         q (case filter-mode
             :pending (.is q0 "is_approved" nil)
             :approved (.eq q0 "is_approved" true)
             :trash (.eq q0 "is_approved" false)
             q0)]
     (-> q
         (.then (fn [result]
                  (if (.-error result)
                    (async/put! ch {:success false
                                    :error (.-message (.-error result))})
                    (async/put! ch {:success true
                                    :data (or (js->clj (.-data result)
                                                       :keywordize-keys true)
                                              [])}))))
         (.catch (fn [error]
                   (async/put! ch {:success false
                                   :error (.-message error)}))))
     ch)))

(defn update-guestbook-approval!
  "Actualiza is_approved: true | false | nil (pendiente)."
  [entry-id approved]
  (let [ch (async/chan)
        payload #js {:is_approved (if (nil? approved) nil (boolean approved))}]
    (-> (.from supabase-client "guestbook")
        (.update payload)
        (.eq "id" entry-id)
        (.then (fn [result]
                 (if (.-error result)
                   (async/put! ch {:success false
                                   :error (.-message (.-error result))})
                   (async/put! ch {:success true :data nil}))))
        (.catch (fn [error]
                  (async/put! ch {:success false
                                  :error (.-message error)}))))
    ch))

(defn delete-admin-guestbook!
  "Elimina permanentemente una entrada del guestbook (admin)."
  [entry-id]
  (let [ch (async/chan)]
    (-> (.from supabase-client "guestbook")
        (.delete)
        (.eq "id" entry-id)
        (.then (fn [result]
                 (if (.-error result)
                   (async/put! ch {:success false
                                   :error (.-message (.-error result))})
                   (async/put! ch {:success true :data nil}))))
        (.catch (fn [error]
                  (async/put! ch {:success false
                                  :error (.-message error)}))))
    ch))

(defn get-distinct-topics
  "Obtiene los valores distintos de `topic` desde la tabla questions."
  []
  (let [ch (async/chan)]
    (-> (.from supabase-client "questions")
        (.select "topic")
        (.then (fn [result]
                 (if (.-error result)
                   (async/put! ch {:success false
                                   :error (.-message (.-error result))})
                   (let [rows (js->clj (.-data result) :keywordize-keys true)
                         topics (->> rows
                                     (map :topic)
                                     (remove #(or (nil? %) (= % "")))
                                     distinct
                                     sort
                                     vec)]
                     (async/put! ch {:success true
                                     :data topics})))))
        (.catch (fn [error]
                  (async/put! ch {:success false
                                  :error (.-message error)}))))
    ch))

;; Función helper para obtener el último registro
(defn get-latest
  "Obtiene el registro más reciente de una tabla basado en created_at"
  [table-name & [filters]]
  (get-table table-name
             (or filters {})
             {:order-by [:created_at :desc]
              :limit 1
              :single true}))

;; Función helper para obtener el valor más grande de una columna
(defn get-max-value
  "Obtiene el registro con el valor máximo en una columna específica"
  [table-name column & [filters]]
  (get-table table-name
             (or filters {})
             {:order-by [column :desc]
              :limit 1
              :single true}))

(comment
  (def result (atom {}))
  (def test-tetha (atom {}))
  (def my-user '("eluque@estudiantesunap.cl" "anarayas@estudiantesunap.cl" "karevaloo@estudiantesunap.cl" "dasotoc@estudiantesunap.cl" "yenmamanic@estudiantesunap.cl" "alavargass@estudiantesunap.cl" "latineos@estudiantesunap.cl" "aespinar@estudiantesunap.cl" "maccarvajal@estudiantesunap.cl" "naromeros@estudiantesunap.cl" "vlemus@estudiantesunap.cl" "cmoyao@estudiantesunap.cl" "jechoquec@estudiantesunap.cl" "baespinoza@unap.cl" "kjelves@estudiantesunap.cl" "avaldivial@estudiantesunap.cl"))
  (count my-user)
  (defn conteo-test! [user-email] (go (let [res (<! (get-table "tests"
                                                               {"email-user" user-email}
                                                               {:order-by [:created_at :desc]}))]
                                        #_(reset! result res)
                                        (swap! test-tetha assoc (str user-email) (:data res))
                                        (swap! result assoc (str user-email) (count (:data res)))
                                        (js/console.log res))))

  (map conteo-test! my-user)
  @result
  (count @result)
  (reduce + (map #(val %) @result))
  (/ 34.0 16)
  @test-tetha
  (count (keys (:test (first (val (first @test-tetha))))))
  (keys (:test (first (val (first @test-tetha)))))
  (:start-time (:test (first (val (first @test-tetha)))))

  (go (let [res (<! (get-table "test"
                               {"email-user" "eluque@estudiantesunap.cl"}
                               {:order-by [:created_at :desc]}))]
        (js/console.log res)))

  ;; Obtener la pregunta más reciente
  (go (let [res (<! (get-latest "tests" {"email-user" "jacobocordova@gmail.com"}))]
        (js/console.log res)))

  ;; Obtener la pregunta más reciente de un tema específico
  (go (let [res (<! (get-latest "questions" {"topic" "enteros"}))]
        (js/console.log res)))

  ;; Obtener la pregunta con mayor dificultad
  (go (let [res (<! (get-max-value "questions" :difficulty))]
        (js/console.log res)))

  ;; Obtener las 10 preguntas más difíciles de enteros
  (go (let [res (<! (get-table "questions"
                               {"topic" "enteros"}
                               {:order-by [:difficulty :desc]
                                :limit 10}))]
        (js/console.log res)))
  )

(comment
  (go (let [res (<! (get-table "questions" {"topic" "enteros"
                                            "difficulty" [:lt 30]}))]
        (js/console.log res)
        (print res)))

  ,)
