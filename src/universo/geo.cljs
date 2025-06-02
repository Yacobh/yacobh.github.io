(ns universo.geo
   (:require [reagent.core :as r]
            [cljs.core.async :as async :refer [go <!]]))

 ;; ✅ Sin dependencias externas - Funciona siempre
 (defn fetch-ip-info "Usa fetch API nativo del navegador" []
   (let [ch (async/chan)]
     (-> (js/fetch "https://ipapi.co/json/")
         (.then (fn [response]
                  (if (.-ok response)
                    (.json response)
                    (throw (js/Error. (str "HTTP " (.-status response)))))))
         (.then (fn [data]
                  (async/put! ch {:success true
                                  :data (js->clj data :keywordize-keys true)})))
         (.catch (fn [error]
                   (async/put! ch {:success false
                                   :error (.-message error)}))))
     ch))

 ;; Información que NO requiere APIs externas
 (defn browser-info []
   {:user-agent (.-userAgent js/navigator)
    :language (.-language js/navigator)
    :languages (array-seq (.-languages js/navigator))
    :platform (.-platform js/navigator)
    :cookie-enabled (.-cookieEnabled js/navigator)
    :online (.-onLine js/navigator)})

 (defn timezone-info []
   (let [date (js/Date.)
         timezone-name (.timeZone (.resolvedOptions (.DateTimeFormat js/Intl)))
         offset (.getTimezoneOffset date)
         offset-hours (/ offset -60)]
     {:timezone timezone-name
      :offset-minutes offset
      :offset-hours offset-hours
      :local-time (.toLocaleString date)
      :utc-time (.toUTCString date)}))

 (defn screen-info []
   {:width (.-width js/screen)
    :height (.-height js/screen)
    :color-depth (.-colorDepth js/screen)
    :pixel-ratio js/devicePixelRatio
    :orientation (when (.-orientation js/screen)
                   (.-angle js/screen.orientation))})

 ;; Estimación de país por zona horaria (sin API)
 (defn estimate-country []
   (let [tz (.timeZone (.resolvedOptions (.DateTimeFormat js/Intl)))]
     (cond
       (.includes tz "Mexico") {:country "México" :flag "🇲🇽"}
       (.includes tz "Argentina") {:country "Argentina" :flag "🇦🇷"}
       (.includes tz "Bogota") {:country "Colombia" :flag "🇨🇴"}
       (.includes tz "Lima") {:country "Perú" :flag "🇵🇪"}
       (.includes tz "Santiago") {:country "Chile" :flag "🇨🇱"}
       (.includes tz "Madrid") {:country "España" :flag "🇪🇸"}
       (.includes tz "New_York") {:country "Estados Unidos" :flag "🇺🇸"}
       (.includes tz "London") {:country "Reino Unido" :flag "🇬🇧"}
       (.includes tz "Paris") {:country "Francia" :flag "🇫🇷"}
       (.includes tz "Berlin") {:country "Alemania" :flag "🇩🇪"}
       (.includes tz "Rome") {:country "Italia" :flag "🇮🇹"}
       (.includes tz "Tokyo") {:country "Japón" :flag "🇯🇵"}
       (.includes tz "Shanghai") {:country "China" :flag "🇨🇳"}
       (.includes tz "Europe/") {:country "Europa" :flag "🇪🇺"}
       (.includes tz "America/") {:country "América" :flag "🌎"}
       (.includes tz "Asia/") {:country "Asia" :flag "🌏"}
       :else {:country "Mundo" :flag "🌍"})))

 ;; Componente principal
 (defn geo-info-display []
   (let [browser-data (browser-info)
         timezone-data (timezone-info)
         screen-data (screen-info)
         country-estimate (estimate-country)
         ip-data (r/atom {:loading true})
         show-details? (r/atom false)]

     ;; Cargar IP info al montar (opcional)
     (r/create-class
      {:component-did-mount
       (fn []
         (go
           (let [result (<! (fetch-ip-info))]
             (reset! ip-data result))))

       :reagent-render
       (fn []
         [:div.geo-info-container
          [:div.info-header
           [:h3 (str (:flag country-estimate) " Información Detectada")]
           [:button.toggle-btn
            {:on-click #(swap! show-details? not)}
            (if @show-details? "Ocultar detalles" "Ver detalles")]]

          [:div.info-summary
           ;; IDIOMA
           [:div.info-card
            [:h4 "🗣️ Idioma"]
            [:p (case (:language browser-data)
                  "es" "Español"
                  "es-ES" "Español (España)"
                  "es-MX" "Español (México)"
                  "en" "English"
                  "fr" "Français"
                  "de" "Deutsch"
                  (:language browser-data))]
            (when @show-details?
              [:div.details
               [:strong "Idiomas preferidos:"]
               [:ul
                (for [lang (:languages browser-data)]
                  [:li {:key lang} lang])]])]

           ;; ZONA HORARIA
           [:div.info-card
            [:h4 "🕐 Zona Horaria"]
            [:p (:timezone timezone-data)]
            (when @show-details?
              [:div.details
               [:p [:strong "Hora local: "] (:local-time timezone-data)]
               [:p [:strong "Offset UTC: "] (:offset-hours timezone-data) " horas"]])]

           ;; UBICACIÓN ESTIMADA
           [:div.info-card
            [:h4 "📍 Ubicación Estimada"]
            [:p (str (:flag country-estimate) " " (:country country-estimate))]
            (when @show-details?
              [:div.details
               [:p [:strong "Basado en: "] "Zona horaria del navegador"]
               [:p [:strong "Precisión: "] "País/Región aproximado"]])]

           ;; IP INFO (si se carga)
           (when (and (not (:loading @ip-data)) (:success @ip-data))
             [:div.info-card
              [:h4 "🌐 IP Info"]
              (let [data (:data @ip-data)]
                [:div
                 [:p (str (:city data) ", " (:country_name data))]
                 (when @show-details?
                   [:div.details
                    [:p [:strong "IP: "] (:ip data)]
                    [:p [:strong "ISP: "] (:org data)]])])])]

          ;; DETALLES TÉCNICOS
          (when @show-details?
            [:div.technical-details
             [:h4 "🔧 Información Técnica"]
             [:div.tech-grid
              [:div.tech-item
               [:label "Navegador:"]
               [:span (cond
                        (.includes (:user-agent browser-data) "Chrome") "Chrome"
                        (.includes (:user-agent browser-data) "Firefox") "Firefox"
                        (.includes (:user-agent browser-data) "Safari") "Safari"
                        (.includes (:user-agent browser-data) "Edge") "Edge"
                        :else "Otro")]]

              [:div.tech-item
               [:label "Sistema:"]
               [:span (:platform browser-data)]]

              [:div.tech-item
               [:label "Pantalla:"]
               [:span (str (:width screen-data) "×" (:height screen-data))]]

              [:div.tech-item
               [:label "En línea:"]
               [:span (if (:online browser-data) "✅ Sí" "❌ No")]]]])])})))

(defn welcome-message []
  (let [lang (.-language js/navigator)
        hour (.getHours (js/Date.))

        greeting (cond
                   (< hour 12) "Buenos días"
                   (< hour 18) "Buenas tardes"
                   :else "Buenas noches")

        lang-name (case (.substring lang 0 2)
                    "es" "español"
                    "en" "inglés"
                    "fr" "francés"
                    "de" "alemán"
                    "otro idioma")]

    [:div.welcome-banner
     [:h2 (str greeting "! 👋")]
     [:p (str "Vemos que tu navegador está en " lang-name)]
     [:p "¿Necesitas ayuda con tus estudios? ¡Estás en el lugar correcto!"]]))
