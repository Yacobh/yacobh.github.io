(ns universo.core
  (:require
   [reagent.core :as r]
   [reagent.dom :as d]))

(defn toggle-dark-mode! []
  (let [body (.-body js/document)]
    (.toggle (.-classList body) "dark-mode")))

(defonce box-position (r/atom {:x 0 :y 0 :target-x 0}))

(defn animate-step [timestamp]
  (swap! box-position
         (fn [current-pos]
           (let [current-x (:x current-pos)
                 target-x (:target-x current-pos)
                 step-size 10
                 new-x (if (< current-x target-x)
                         (min target-x (+ current-x step-size))
                         (max target-x (- current-x step-size)))]
             (assoc current-pos :x new-x))))

  (when (not= (:x @box-position) (:target-x @box-position)) ; Continuar si no hemos llegado al destino
    (js/requestAnimationFrame animate-step)))

(defn start-animation [target-x-pos]
  (swap! box-position assoc :target-x target-x-pos)
  (js/requestAnimationFrame animate-step)) ; Inicia el bucle de animación

(defn movable-box-component []
  (let [pos @box-position]
    [:div.movable-circle
     {:style {:transform (str "translateX(" (:x pos) "px) translateY(" (:y pos) "px)")}}]))
     ; No se usa (:y pos) en este ejemplo, pero se podría añadir lógica para ello




;; Estado para controlar la animación
(def wow-state (r/atom {:visible false}))

;; Función para activar la animación cuando el componente se monta
(defn show-wow []
  ;; Pequeño retardo para que la animación sea visible después de la carga
  (js/setTimeout #(swap! wow-state assoc :visible true) 1000))

;; -------------------------
;; Views

(defn app []
  [:div
   [movable-box-component]
   [:button {:on-click #(start-animation 200)} "Move to 200px"]
   [:button {:on-click #(start-animation 0)} "Move to 0px"]])

(defn fade-in-page []
  (let [body (.-body js/document)]
    ;; Añade la clase de desvanecimiento
    (.add (.-classList body) "fading")

    ;; Quita la clase después de un breve retraso
    (js/setTimeout
     (fn []
       (.remove (.-classList body) "fading"))
     5000)))



(defn home-page []
  ;; Ejecuta show-wow cuando el componente se monta
  (fade-in-page)
  (r/create-class
   {:component-did-mount show-wow
    :reagent-render
    (fn []
      [:div.wow-container
       [:h2.wow-text
        {:class (when (:visible @wow-state) "visible")}
        "WOW"]])}))

  ;; -------------------------
  ;; Initialize app

  (defn mount-root []
    (d/render [home-page] (.getElementById js/document "app")))

  (defn ^:export init! []
    (mount-root))
