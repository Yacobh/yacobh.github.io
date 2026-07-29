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
         base (-> (.from supabase-client table-name)
                  (.insert payload))
         query (if returning?
                 (-> base (.select "*") (.single))
                 base)]
     (-> query
         (.then (fn [result]
                  (if (.-error result)
                    (do
                      (js/console.error "Error de Supabase:" table-name (.-error result))
                      (async/put! ch {:success false
                                      :error (.-message (.-error result))}))
                    (async/put! ch {:success true
                                    :data (js->clj (.-data result) :keywordize-keys true)}))))
         (.catch (fn [error]
                   (js/console.error "Error capturado:" table-name error)
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

(def ^:private question-select-cols
  (str "id,created_at,question,option_a,option_b,option_c,option_d,"
       "correct_option,error_a,error_b,error_c,error_d,topic,order_index,difficulty,module_id"))

(defn fetch-admin-questions
  "Lista questions para admin. topic nil → todas."
  ([]
   (fetch-admin-questions nil))
  ([topic]
   (let [ch (async/chan)
         q0 (-> (.from supabase-client "questions")
                (.select question-select-cols)
                (.order "topic" #js {:ascending true})
                (.order "order_index" #js {:ascending true})
                (.order "id" #js {:ascending true}))
         q (if (and topic (pos? (count (str topic))))
             (.eq q0 "topic" (str topic))
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

(defn- question-payload
  "Mapa CLJS → JS para insert/update (sin id ni created_at)."
  [row]
  (let [parse-num (fn [v f]
                    (when-let [x v]
                      (if (string? x)
                        (when (pos? (count x)) (f x))
                        x)))]
    (clj->js
     {:question (or (:question row) "")
      :option_a (or (:option_a row) "")
      :option_b (or (:option_b row) "")
      :option_c (or (:option_c row) "")
      :option_d (or (:option_d row) "")
      :correct_option (or (:correct_option row) "A")
      :error_a (:error_a row)
      :error_b (:error_b row)
      :error_c (:error_c row)
      :error_d (:error_d row)
      :topic (or (:topic row) "")
      :order_index (parse-num (:order_index row) #(js/parseInt % 10))
      :difficulty (parse-num (:difficulty row) js/parseFloat)
      :module_id (let [m (:module_id row)]
                   (cond
                     (or (nil? m) (= m "") (= m "null")) nil
                     (string? m) (js/parseInt m 10)
                     :else m))})))

(defn insert-admin-question!
  [row]
  (let [ch (async/chan)]
    (-> (.from supabase-client "questions")
        (.insert (question-payload row))
        (.select question-select-cols)
        (.single)
        (.then (fn [result]
                 (if (.-error result)
                   (async/put! ch {:success false
                                   :error (.-message (.-error result))})
                   (async/put! ch {:success true
                                   :data (js->clj (.-data result)
                                                  :keywordize-keys true)}))))
        (.catch (fn [error]
                  (async/put! ch {:success false
                                  :error (.-message error)}))))
    ch))

(defn update-admin-question!
  [question-id row]
  (let [ch (async/chan)]
    (-> (.from supabase-client "questions")
        (.update (question-payload row))
        (.eq "id" question-id)
        (.select question-select-cols)
        (.single)
        (.then (fn [result]
                 (if (.-error result)
                   (async/put! ch {:success false
                                   :error (.-message (.-error result))})
                   (async/put! ch {:success true
                                   :data (js->clj (.-data result)
                                                  :keywordize-keys true)}))))
        (.catch (fn [error]
                  (async/put! ch {:success false
                                  :error (.-message error)}))))
    ch))

(defn delete-admin-question!
  [question-id]
  (let [ch (async/chan)]
    (-> (.from supabase-client "questions")
        (.delete)
        (.eq "id" question-id)
        (.then (fn [result]
                 (if (.-error result)
                   (async/put! ch {:success false
                                   :error (.-message (.-error result))})
                   (async/put! ch {:success true :data nil}))))
        (.catch (fn [error]
                  (async/put! ch {:success false
                                  :error (.-message error)}))))
    ch))

(defn- put-result [ch result]
  (if (.-error result)
    (async/put! ch {:success false :error (.-message (.-error result))})
    (async/put! ch {:success true
                    :data (js->clj (.-data result) :keywordize-keys true)})))

(defn upsert-student-profile!
  "Upsert por user_id."
  [row]
  (let [ch (async/chan)
        payload (clj->js row)]
    (-> (.from supabase-client "student_profiles")
        (.upsert payload #js {:onConflict "user_id"})
        (.select "*")
        (.single)
        (.then (fn [result] (put-result ch result)))
        (.catch (fn [error]
                  (async/put! ch {:success false :error (.-message error)}))))
    ch))

(defn fetch-student-profile
  [user-id]
  (let [ch (async/chan)]
    (-> (.from supabase-client "student_profiles")
        (.select "*")
        (.eq "user_id" (str user-id))
        (.maybeSingle)
        (.then (fn [result] (put-result ch result)))
        (.catch (fn [error]
                  (async/put! ch {:success false :error (.-message error)}))))
    ch))

(defn fetch-modules
  []
  (let [ch (async/chan)]
    (-> (.from supabase-client "modules")
        (.select "*")
        (.order "order_index" #js {:ascending true})
        (.then (fn [result] (put-result ch result)))
        (.catch (fn [error]
                  (async/put! ch {:success false :error (.-message error)}))))
    ch))

(defn fetch-published-resources
  []
  (let [ch (async/chan)]
    (-> (.from supabase-client "resources")
        (.select "*, modules(slug, title, track)")
        (.eq "published" true)
        (.order "order_index" #js {:ascending true})
        (.then (fn [result]
                 (if (.-error result)
                   (async/put! ch {:success false
                                   :error (.-message (.-error result))})
                   (let [rows (js->clj (.-data result) :keywordize-keys true)
                         enriched (mapv (fn [r]
                                          (assoc r :module_slug
                                                 (or (get-in r [:modules :slug])
                                                     (:module_slug r))))
                                        (or rows []))]
                     (async/put! ch {:success true :data enriched})))))
        (.catch (fn [error]
                  (async/put! ch {:success false :error (.-message error)}))))
    ch))

(defn fetch-resources-for-modules
  [module-ids]
  (fetch-published-resources))

(defn fetch-admin-resources
  []
  (let [ch (async/chan)]
    (-> (.from supabase-client "resources")
        (.select "*, modules(slug, title, track)")
        (.order "created_at" #js {:ascending false})
        (.then (fn [result] (put-result ch result)))
        (.catch (fn [error]
                  (async/put! ch {:success false :error (.-message error)}))))
    ch))

(defn upsert-resource!
  [row]
  (let [ch (async/chan)
        payload (clj->js row)
        id (or (get row "id") (:id row))]
    (-> (if id
          (-> (.from supabase-client "resources")
              (.update payload)
              (.eq "id" (str id))
              (.select "*")
              (.single))
          (-> (.from supabase-client "resources")
              (.insert payload)
              (.select "*")
              (.single)))
        (.then (fn [result] (put-result ch result)))
        (.catch (fn [error]
                  (async/put! ch {:success false :error (.-message error)}))))
    ch))

(defn delete-resource!
  [id]
  (let [ch (async/chan)]
    (-> (.from supabase-client "resources")
        (.delete)
        (.eq "id" (str id))
        (.then (fn [result]
                 (if (.-error result)
                   (async/put! ch {:success false
                                   :error (.-message (.-error result))})
                   (async/put! ch {:success true :data nil}))))
        (.catch (fn [error]
                  (async/put! ch {:success false :error (.-message error)}))))
    ch))

(defn fetch-class-slots
  "Cupos open/confirmed. Si band, filtra por theta_band."
  [band]
  (let [ch (async/chan)
        q0 (-> (.from supabase-client "class_slots")
               (.select "*")
               (.in "status" #js ["open" "confirmed"])
               (.order "starts_at" #js {:ascending true}))
        q (if (and band (pos? (count (str band))))
            (.eq q0 "theta_band" (str band))
            q0)]
    (-> q
        (.then (fn [result] (put-result ch result)))
        (.catch (fn [error]
                  (async/put! ch {:success false :error (.-message error)}))))
    ch))

(defn fetch-admin-class-slots
  []
  (let [ch (async/chan)]
    (-> (.from supabase-client "class_slots")
        (.select "*, enrollments(id,user_id,status)")
        (.order "starts_at" #js {:ascending true})
        (.then (fn [result] (put-result ch result)))
        (.catch (fn [error]
                  (async/put! ch {:success false :error (.-message error)}))))
    ch))

(defn upsert-class-slot!
  [row]
  (let [ch (async/chan)
        payload (clj->js row)
        id (or (get row "id") (:id row))]
    (-> (if id
          (-> (.from supabase-client "class_slots")
              (.update payload)
              (.eq "id" (str id))
              (.select "*")
              (.single))
          (-> (.from supabase-client "class_slots")
              (.insert payload)
              (.select "*")
              (.single)))
        (.then (fn [result] (put-result ch result)))
        (.catch (fn [error]
                  (async/put! ch {:success false :error (.-message error)}))))
    ch))

(defn delete-class-slot!
  [id]
  (let [ch (async/chan)]
    (-> (.from supabase-client "class_slots")
        (.delete)
        (.eq "id" (str id))
        (.then (fn [result]
                 (if (.-error result)
                   (async/put! ch {:success false
                                   :error (.-message (.-error result))})
                   (async/put! ch {:success true :data nil}))))
        (.catch (fn [error]
                  (async/put! ch {:success false :error (.-message error)}))))
    ch))

(defn fetch-my-enrollments
  [user-id]
  (let [ch (async/chan)]
    (-> (.from supabase-client "enrollments")
        (.select "*, class_slots(*)")
        (.eq "user_id" (str user-id))
        (.neq "status" "cancelled")
        (.order "created_at" #js {:ascending false})
        (.then (fn [result] (put-result ch result)))
        (.catch (fn [error]
                  (async/put! ch {:success false :error (.-message error)}))))
    ch))

(defn enroll-in-slot!
  [slot-id user-id]
  (let [ch (async/chan)
        payload #js {:slot_id (str slot-id)
                     :user_id (str user-id)
                     :status "pending"}]
    (-> (.from supabase-client "enrollments")
        (.upsert payload #js {:onConflict "slot_id,user_id"})
        (.select "*")
        (.single)
        (.then (fn [result] (put-result ch result)))
        (.catch (fn [error]
                  (async/put! ch {:success false :error (.-message error)}))))
    ch))

(defn fetch-notifications
  [user-id]
  (let [ch (async/chan)]
    (-> (.from supabase-client "notifications")
        (.select "*")
        (.eq "user_id" (str user-id))
        (.order "created_at" #js {:ascending false})
        (.limit 20)
        (.then (fn [result] (put-result ch result)))
        (.catch (fn [error]
                  (async/put! ch {:success false :error (.-message error)}))))
    ch))

(defn mark-notification-read!
  [id]
  (let [ch (async/chan)]
    (-> (.from supabase-client "notifications")
        (.update #js {:read true})
        (.eq "id" (str id))
        (.then (fn [result]
                 (if (.-error result)
                   (async/put! ch {:success false
                                   :error (.-message (.-error result))})
                   (async/put! ch {:success true :data nil}))))
        (.catch (fn [error]
                  (async/put! ch {:success false :error (.-message error)}))))
    ch))

(defn request-account-deletion!
  "El usuario deja una notificación sobre sí mismo pidiendo que un admin
   elimine su cuenta. No borra nada: es solo la alerta que ve el admin en el
   panel (pestaña Usuarios)."
  [user-id email]
  (insert-data-table!
   {:user_id (str user-id)
    :kind "account_deletion_request"
    :message (str "Solicitud de eliminación de cuenta: " email)
    :meta {:email email}}
   "notifications"
   {:returning? false}))

(defn fetch-account-deletion-requests
  "Solicitudes de eliminación de cuenta sin atender. RLS deja verlas todas
   solo a un admin (notifications_select_own incluye is_admin())."
  []
  (let [ch (async/chan)]
    (-> (.from supabase-client "notifications")
        (.select "*")
        (.eq "kind" "account_deletion_request")
        (.eq "read" false)
        (.order "created_at" #js {:ascending false})
        (.then (fn [result] (put-result ch result)))
        (.catch (fn [error]
                  (async/put! ch {:success false :error (.-message error)}))))
    ch))

(defn fetch-own-profile
  "Nombre, teléfono y correo del perfil propio, para la sección
   Configuración de cuenta."
  [user-id]
  (let [ch (async/chan)]
    (-> (.from supabase-client "profiles")
        (.select "id,email,full_name,phone")
        (.eq "id" (str user-id))
        (.maybeSingle)
        (.then (fn [result] (put-result ch result)))
        (.catch (fn [error]
                  (async/put! ch {:success false :error (.-message error)}))))
    ch))

(defn update-own-profile!
  "Actualiza nombre/teléfono de la propia fila en profiles. Permitido por
   profiles_update_own (admin_rls.sql): un usuario puede tocar cualquier
   columna de su propia fila salvo `role`."
  [user-id {:keys [full-name phone]}]
  (let [ch (async/chan)]
    (-> (.from supabase-client "profiles")
        (.update #js {:full_name full-name :phone phone})
        (.eq "id" (str user-id))
        (.select "id,email,full_name,phone")
        (.single)
        (.then (fn [result] (put-result ch result)))
        (.catch (fn [error]
                  (async/put! ch {:success false :error (.-message error)}))))
    ch))

;; -----------------------------------------------------------------------------
;; Admin: métricas, roles y gestión de inscripciones
;; -----------------------------------------------------------------------------

(defn count-rows
  "Cuenta filas sin traerlas (count exact + head). apply-filters recibe la query."
  ([table] (count-rows table identity))
  ([table apply-filters]
   (let [ch (async/chan)]
     (-> (apply-filters (-> (.from supabase-client table)
                            (.select "*" #js {:count "exact" :head true})))
         (.then (fn [result]
                  (if (.-error result)
                    (async/put! ch {:success false
                                    :error (.-message (.-error result))})
                    (async/put! ch {:success true :data (or (.-count result) 0)}))))
         (.catch (fn [error]
                   (async/put! ch {:success false :error (.-message error)}))))
     ch)))

(defn- days-ago-iso
  [n]
  (.toISOString (js/Date. (- (.now js/Date) (* n 24 60 60 1000)))))

(defn fetch-admin-overview
  "Métricas agregadas del panel. Un solo canal con todos los contadores."
  []
  (let [ch (async/chan)]
    (go
      (let [since-7d (days-ago-iso 7)
            users (<! (count-rows "profiles"))
            admins (<! (count-rows "profiles" (fn [^js q] (.eq q "role" "admin"))))
            tests (<! (count-rows "tests"))
            tests-7d (<! (count-rows "tests" (fn [^js q] (.gte q "created_at" since-7d))))
            gb-pending (<! (count-rows "guestbook" (fn [^js q] (.is q "is_approved" nil))))
            gb-approved (<! (count-rows "guestbook" (fn [^js q] (.eq q "is_approved" true))))
            resources (<! (count-rows "resources"))
            published (<! (count-rows "resources" (fn [^js q] (.eq q "published" true))))
            profiles-band (<! (let [c (async/chan)]
                                (-> (.from supabase-client "student_profiles")
                                    (.select "theta_band")
                                    (.then (fn [r] (put-result c r)))
                                    (.catch (fn [e]
                                              (async/put! c {:success false
                                                             :error (.-message e)}))))
                                c))
            slots (<! (fetch-admin-class-slots))
            results [users admins tests tests-7d gb-pending gb-approved
                     resources published slots profiles-band]
            first-error (->> results (remove :success) (map :error) (remove nil?) first)]
        (async/put!
         ch
         (if first-error
           {:success false :error first-error}
           {:success true
            :data {:users (:data users)
                   :admins (:data admins)
                   :tests (:data tests)
                   :tests-7d (:data tests-7d)
                   :guestbook-pending (:data gb-pending)
                   :guestbook-approved (:data gb-approved)
                   :resources (:data resources)
                   :resources-published (:data published)
                   :slots (or (:data slots) [])
                   :bands (frequencies (keep :theta_band (or (:data profiles-band) [])))}}))))
    ch))

(defn fetch-guestbook-counts
  "Contadores por estado de moderación, para los filtros del panel."
  []
  (let [ch (async/chan)]
    (go
      (let [pending (<! (count-rows "guestbook" (fn [^js q] (.is q "is_approved" nil))))
            approved (<! (count-rows "guestbook" (fn [^js q] (.eq q "is_approved" true))))
            trash (<! (count-rows "guestbook" (fn [^js q] (.eq q "is_approved" false))))]
        (async/put! ch {:success true
                        :data {:pending (or (:data pending) 0)
                               :approved (or (:data approved) 0)
                               :trash (or (:data trash) 0)}})))
    ch))

(defn update-profile-role!
  "Cambia el rol de un usuario. Requiere policy profiles_update_admin
   (migración 006); un admin no puede cambiar su propio rol."
  [user-id role]
  (let [ch (async/chan)]
    (-> (.from supabase-client "profiles")
        (.update #js {:role role})
        (.eq "id" (str user-id))
        (.select "id,email,role,created_at")
        (.maybeSingle)
        (.then (fn [result]
                 (if (.-error result)
                   (async/put! ch {:success false
                                   :error (.-message (.-error result))})
                   (if-let [data (.-data result)]
                     (async/put! ch {:success true
                                     :data (js->clj data :keywordize-keys true)})
                     ;; RLS devuelve 0 filas cuando la policy bloquea el update.
                     (async/put! ch {:success false
                                     :error (str "No se pudo cambiar el rol. Verifica que la "
                                                 "migración 006_admin_role_management.sql "
                                                 "esté aplicada.")})))))
        (.catch (fn [error]
                  (async/put! ch {:success false :error (.-message error)}))))
    ch))

(defn fetch-profiles-by-ids
  [ids]
  (let [ch (async/chan)]
    (if-not (seq ids)
      (async/put! ch {:success true :data []})
      (-> (.from supabase-client "profiles")
          (.select "id,email,role")
          (.in "id" (clj->js (mapv str ids)))
          (.then (fn [result] (put-result ch result)))
          (.catch (fn [error]
                    (async/put! ch {:success false :error (.-message error)})))))
    ch))

(defn fetch-slot-roster
  "Inscritos de un cupo con su email.
   enrollments.user_id apunta a auth.users, no a profiles, así que PostgREST no
   puede hacer el embed: el join se resuelve en el cliente."
  [slot-id]
  (let [ch (async/chan)]
    (go
      (let [enr (<! (let [c (async/chan)]
                      (-> (.from supabase-client "enrollments")
                          (.select "id,user_id,status,created_at")
                          (.eq "slot_id" (str slot-id))
                          (.order "created_at" #js {:ascending true})
                          (.then (fn [r] (put-result c r)))
                          (.catch (fn [e]
                                    (async/put! c {:success false
                                                   :error (.-message e)}))))
                      c))]
        (if-not (:success enr)
          (async/put! ch enr)
          (let [rows (or (:data enr) [])
                profs (<! (fetch-profiles-by-ids (map :user_id rows)))
                email-by-id (into {} (map (juxt :id :email)) (or (:data profs) []))]
            (async/put! ch {:success true
                            :data (mapv #(assoc % :email (get email-by-id (:user_id %)))
                                        rows)})))))
    ch))

(defn update-enrollment-status!
  [enrollment-id status]
  (let [ch (async/chan)]
    (-> (.from supabase-client "enrollments")
        (.update #js {:status status})
        (.eq "id" (str enrollment-id))
        (.then (fn [result]
                 (if (.-error result)
                   (async/put! ch {:success false
                                   :error (.-message (.-error result))})
                   (async/put! ch {:success true :data nil}))))
        (.catch (fn [error]
                  (async/put! ch {:success false :error (.-message error)}))))
    ch))

(defn update-slot-status!
  [slot-id status]
  (let [ch (async/chan)]
    (-> (.from supabase-client "class_slots")
        (.update #js {:status status})
        (.eq "id" (str slot-id))
        (.then (fn [result]
                 (if (.-error result)
                   (async/put! ch {:success false
                                   :error (.-message (.-error result))})
                   (async/put! ch {:success true :data nil}))))
        (.catch (fn [error]
                  (async/put! ch {:success false :error (.-message error)}))))
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
