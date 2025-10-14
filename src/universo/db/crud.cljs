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


(defn get-table
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

(comment
  (go (let [res (<! (get-table "questions" {"topic" "enteros"
                                            "difficulty" [:lt 30]}))]
        (js/console.log res)))

  ,)
