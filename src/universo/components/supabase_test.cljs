(ns universo.components.supabase-test
  (:require [reagent.core :as r]
            [universo.db.visitante :as db]
            [universo.ip :refer [fetch-ip-info]]
            [cljs.core.async :refer [go <!]]))

(defn supabase-test []
  (let [status (r/atom "inicial")
        visitor-data (r/atom nil)
        all-visitors (r/atom [])]

    (fn []
      [:div
       [:h2 "🧪 Test de Conexión Supabase"]

       [:p "Status: " @status]

       ;; Botón para insertar datos
       [:button
        {:on-click (fn []
                     (reset! status "insertando...")
                     (go
                       (js/console.log "🚀 Iniciando inserción...")

                       ;; Primero obtener datos de IP
                       (let [ip-result (<! (fetch-ip-info))
                             base-data (db/collect-visitor-data)

                             ;; Combinar datos base con datos de IP si están disponibles
                             final-data (if (:success ip-result)
                                          (merge base-data
                                                 {:pais (:country_name (:data ip-result))
                                                  :ciudad (:city (:data ip-result))})
                                          base-data)]

                         (js/console.log "📋 Datos finales a insertar:" final-data)
                         (reset! visitor-data final-data)

                         ;; Insertar en Supabase
                         (let [result (<! (db/insert-visitor! final-data))]
                           (if (:success result)
                             (reset! status "✅ Insertado exitosamente!")
                             (reset! status (str "❌ Error: " (:error result))))))))}
        "Insertar Visitante"]

       ;; Botón para obtener todos los datos
       [:button
        {:on-click (fn []
                     (reset! status "obteniendo datos...")
                     (go
                       (let [result (<! (db/get-all-visitors))]
                         (if (:success result)
                           (do
                             (reset! all-visitors (:data result))
                             (reset! status "✅ Datos obtenidos!"))
                           (reset! status (str "❌ Error: " (:error result)))))))}
        "Obtener Todos"]

       ;; Mostrar datos que se van a insertar
       (when @visitor-data
         [:div
          [:h3 "📋 Datos a insertar:"]
          [:ul
           [:li "País: " (:pais @visitor-data)]
           [:li "Ciudad: " (:ciudad @visitor-data)]
           [:li "Timezone: " (:timezone @visitor-data)]
           [:li "Idioma: " (:idioma @visitor-data)]]])

       ;; Mostrar todos los visitantes
       (when (seq @all-visitors)
         [:div
          [:h3 "👥 Visitantes en la BD:"]
          [:table {:border "1"}
           [:thead
            [:tr
             [:th "ID"]
             [:th "Fecha"]
             [:th "País"]
             [:th "Ciudad"]
             [:th "Timezone"]
             [:th "Idioma"]]]
           [:tbody
            (for [visitor @all-visitors]
              [:tr {:key (:id visitor)}
               [:td (:id visitor)]
               [:td (.substring (:created_at visitor) 0 19)]
               [:td (:pais visitor)]
               [:td (:ciudad visitor)]
               [:td (:timezone visitor)]
               [:td (:idioma visitor)]])]]])])))
