(ns universo.jardin
  (:require
   [reagent.core :as r]
   [universo.physics :as physics]))

;; Estado global de la simulación
(defonce app-state
  (r/atom
   {:particles []
    :wave-function nil
    :simulation-running false}))

;; Función para inicializar partículas
(defn init-particles [n]
  (swap! app-state
         assoc :particles
         (physics/generate-quantum-particles n)))


;; Componente principal de visualización
(defn quantum-simulator []
  (let [state @app-state]
    [:div.quantum-container
     [:h1 "Quantum Particle Simulator"]

     ;; Panel de control
     [:div.control-panel
      [:button
       {:on-click #(init-particles 20)}
       "Generate 10 Particles"]

      [:button
       {:on-click #(swap! app-state update :simulation-running not)}
       (if (:simulation-running state)
         "Stop Simulation"
         "Start Simulation")]]

     ;; Área de visualización
     [:div.visualization-area
      (for [particle (:particles state)]
        ^{:key (:id particle)}
        [:div.quantum-particle
         {:style
          {:left (str (:x particle) "px")
           :top (str (:y particle) "px")}}])]]))



(def particle-position (r/atom {:x "50%" :y "40%"}))
(def particle-state (r/atom :fundamental))



(defn state-controls []
  [:div
   [:button {:on-click #(reset! particle-state :fundamental)} "Fundamental"]
   [:button {:on-click #(reset! particle-state :excited)} "Excited"]])



(defn quantum-dot []
  (let [state @particle-state
        pos @particle-position]
    [:div.quantum-dot
     {:style {:left (:x pos)
              :top (:y pos)
              :transform "translate(-50%, -50%)"
              :background-color (if (= state :excited) "#ff0" "#0ff")} ; Ejemplo de cambio de color
      :class (when (= state :excited) "excited-state")}] ; Añade una clase condicional
    ))

(defn jardin []
  [:div
   [state-controls]
   [quantum-dot]])
