(ns universo.ip
  (:require [reagent.core :as r]
            [cljs.core.async :as async :refer [go <!]]))

;; ✅ Función con logs detallados
(defn fetch-ip-info "Usa fetch API nativo del navegador con logs" []
  (let [ch (async/chan)]

    (js/console.log "🚀 Iniciando fetch-ip-info...")

    (-> (js/fetch "https://ipapi.co/json/")
        (.then (fn [response]
                 (js/console.log "📡 Response recibido:" response)
                 (js/console.log "📊 Status:" (.-status response))
                 (js/console.log "✅ OK?:" (.-ok response))

                 (if (.-ok response)
                   (do
                     (js/console.log "🔄 Convirtiendo a JSON...")
                     (.json response))
                   (throw (js/Error. (str "HTTP " (.-status response)))))))

        (.then (fn [data]
                 (js/console.log "📋 Data JSON recibida:" data)
                 (let [converted-data (js->clj data :keywordize-keys true)]
                   (js/console.log "🔄 Data convertida a ClojureScript:" converted-data)
                   (async/put! ch {:success true
                                   :data converted-data}))))

        (.catch (fn [error]
                  (js/console.error "❌ Error capturado:" error)
                  (js/console.error "❌ Mensaje del error:" (.-message error))
                  (async/put! ch {:success false
                                  :error (.-message error)}))))

    (js/console.log "📤 Retornando canal...")
    ch))

;; 🖥️ Componente básico
(defn ip-test-component []
  (let [result (r/atom {:status "inicial"})
        loading? (r/atom false)]

    (fn []
      [:div
       [:h3 "Prueba de fetch-ip-info"]

       [:button
        {:disabled @loading?
         :on-click (fn []
                     (js/console.log "🎯 Botón clickeado!")
                     (reset! loading? true)
                     (reset! result {:status "cargando..."})

                     (go
                       (js/console.log "🏃 Ejecutando go block...")
                       (let [response (<! (fetch-ip-info))]
                         (js/console.log "🎉 Respuesta final recibida:" response)
                         (reset! loading? false)
                         (reset! result response))))}
        (if @loading? "Cargando..." "Probar API")]

       [:div
        [:h4 "Resultado:"]
        [:p (str @result)]

        ;; Mostrar datos específicos si hay éxito
        (when (and (:success @result) (:data @result))
          (let [data (:data @result)]
            [:div
             [:h4 "Datos obtenidos:"]
             [:p "IP: " (:ip data)]
             [:p "País: " (:country_name data)]
             [:p "Ciudad: " (:city data)]
             [:p "ISP: " (:org data)]]))

        ;; Mostrar error si falla
        (when (and (not (:success @result)) (:error @result))
          [:div
           [:h4 "Error:"]
           [:p (:error @result)]])]])))

;; 🎯 Versión automática súper simple
(defn simple-ip-test []
  (let [ip-info (r/atom "No cargado")]

    (r/create-class
     {:component-did-mount
      (fn []
        (js/console.log "🎬 Componente montado, iniciando fetch...")
        (go
          (js/console.log "⏳ Llamando fetch-ip-info...")
          (let [result (<! (fetch-ip-info))]
            (js/console.log "🏁 Resultado final:" result)
            (reset! ip-info result))))

      :reagent-render
      (fn []
        [:div
         [:h3 "Test Simple (automático)"]
         [:p "Resultado: " (str @ip-info)]
         (when (map? @ip-info)
           [:div
            (if (:success @ip-info)
              [:p "Éxito: " (str (:data @ip-info))]
              [:p "Error: " (str (:error @ip-info))])])])})))

;; 🔥 Test súper minimalista
(defn minimal-test []
  (let [status (r/atom "inicial")]

    [:div
     [:h2 "TEST MÍNIMO"]
     [:p "Status: " @status]
     [:button
      {:on-click (fn []
                   (js/console.log "Click!")
                   (reset! status "clickeado")
                   (go
                     (js/console.log "Go block ejecutado")
                     (reset! status "go ejecutado")
                     (let [result (<! (fetch-ip-info))]
                       (js/console.log "Resultado:" result)
                       (reset! status (str "Resultado: " result)))))}
      "CLICK AQUÍ"]]))
