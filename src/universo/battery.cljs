(ns universo.battery
  (:require [reagent.core :as r]))

(defn update-battery-status [battery battery-state]
  (swap! battery-state assoc
         :charging (.-charging battery)
         :level (* 100 (.-level battery))
         :chargingTime (if (js/isFinite (.-chargingTime battery))
                         (.-chargingTime battery)
                         "Infinito")
         :dischargingTime (if (js/isFinite (.-dischargingTime battery))
                            (.-dischargingTime battery)
                            "Infinito")))

(defn setup-battery-listeners [battery battery-state]
  (update-battery-status battery battery-state)

  ;; Configurar listeners para eventos de cambio
  (.addEventListener battery "chargingchange"
                     #(swap! battery-state assoc :charging (.-charging battery)))
  (.addEventListener battery "levelchange"
                     #(swap! battery-state assoc :level (* 100 (.-level battery))))
  (.addEventListener battery "chargingtimechange"
                     #(swap! battery-state assoc :chargingTime
                             (if (js/isFinite (.-chargingTime battery))
                               (.-chargingTime battery)
                               "Infinito")))
  (.addEventListener battery "dischargingtimechange"
                     #(swap! battery-state assoc :dischargingTime
                             (if (js/isFinite (.-dischargingTime battery))
                               (.-dischargingTime battery)
                               "Infinito"))))

(defn battery-status-component []
  (let [battery-state (r/atom {:charging false
                               :level 0
                               :chargingTime "Infinito"
                               :dischargingTime "Infinito"})]
    (r/create-class
     {:component-did-mount (fn []
                             (when (.-getBattery js/navigator)
                               (-> (.getBattery js/navigator)
                                   (.then #(setup-battery-listeners % battery-state))
                                   (.catch #(js/console.error "Error accediendo a la API de batería:" %)))))
      :reagent-render (fn []
                        [:div
                         [:h2 "Estado de la Batería"]
                         [:div
                          [:p (str "Nivel: " (:level @battery-state) "%")]
                          [:div.battery-indicator
                           [:div.battery-level {:style {:width (str (:level @battery-state) "%")
                                                        :background-color (if (:charging @battery-state)
                                                                            "green"
                                                                            (cond
                                                                              (< (:level @battery-state) 20) "red"
                                                                              (< (:level @battery-state) 50) "orange"
                                                                              :else "lightgreen"))}}]]
                          [:p (str "Estado: " (if (:charging @battery-state) "Cargando" "Descargando"))]
                          [:p (str "Tiempo de carga restante: "
                                   (if (:charging @battery-state)
                                     #_(str (:chargingTime @battery-state) " segundos")
                                     (str (/ (:chargingTime @battery-state) 60) " minutos")
                                     "N/A"))]
                          [:p (str "Tiempo de descarga restante: "
                                   (if (not (:charging @battery-state))
                                     (str (:dischargingTime @battery-state) " segundos")
                                     "N/A"))]]])})))
