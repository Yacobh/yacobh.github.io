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
  "Inserta data entregada en un mapa a la tabla"
  [data-to-insert table-name]
  (let [ch (async/chan)]
    (js/console.log "📤 Enviando datos a Supabase:" data-to-insert)

    (-> (.from supabase-client table-name)
        (.insert (clj->js data-to-insert) #js {:returning "representation"})
        (.select "*")  ; Selecciona todos los campos después de insertar
        (.single)  ; Asegura que solo se espera un único resultado
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
    ch))



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
  ;; Obtener las últimas 5 preguntas de enteros
  (go (let [res (<! (get-table "questions"
                               {"topic" "enteros"}
                               {:order-by [:created_at :desc]
                                :limit 5}))]
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
        (js/console.log res))))

(comment
  (go (let [res (<! (get-table "questions" {"topic" "enteros"
                                            "difficulty" [:lt 30]}))]
        (js/console.log res)))

  ,)
