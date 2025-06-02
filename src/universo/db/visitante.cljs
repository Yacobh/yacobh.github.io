(ns universo.db.visitante
  (:require [universo.supabase :refer [supabase-client]]
            [cljs.core.async :as async :refer [go <!]]))

(defn collect-visitor-data []
  "Recolecta datos básicos del visitante"
  {:pais nil                    ; Lo llenaremos después con IP API
   :ciudad nil                  ; Lo llenaremos después con IP API
   :timezone (.-timeZone (.resolvedOptions (.DateTimeFormat js/Intl)))
   :idioma (.-language js/navigator)})

(defn insert-visitor!
  "Inserta nuevo visitante en la tabla"
  [visitor-data]
  (let [ch (async/chan)]
    (js/console.log "📤 Enviando datos a Supabase:" visitor-data)

    (-> (.from supabase-client "visitor")  ; Nombre de tu tabla
        (.insert (clj->js visitor-data))
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

(defn get-all-visitors "Obtiene todos los visitantes (para testing)" []
  (let [ch (async/chan)]
    (-> (.from supabase-client "visitor")
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
