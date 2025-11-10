(ns universo.home
  (:require [universo.components.contacto :refer [contacto-form]]
            [re-frame.core :as re-frame]
            [universo.components.login :as login]
            [universo.components.diagnostic-test :as diagnostic-test]
            [universo.components.dashboard :as dashboard]))

;; seccion principal variable con atomo de reagent, dinamico

(defn navigation []
  [:nav.fixed.top-0.left-0.right-0.z-50.bg-white.border-b.border-gray-200
   [:div.max-w-7xl.mx-auto.px-4.sm:px-6.lg:px-8
    [:div.flex.justify-between.items-center.h-16
     [:div.flex.items-center
      [:a.text-gray-800.font-bold.text-xl.flex.items-center
       {:href "#"
        :on-click #(re-frame/dispatch [:set-section :main])}
       [:span.bg-gradient-to-r.from-blue-600.to-purple-600.bg-clip-text.text-transparent
        "Academia"]
       [:span.mx-2.text-3xl.font-light.text-indigo-600 "∫"]
       [:span.bg-gradient-to-r.from-purple-600.to-indigo-700.bg-clip-text.text-transparent
        "Integral"]]]

     [:div.flex.items-center.gap-3
      (if @(re-frame/subscribe [:visitor-email])
        [:a.bg-gradient-to-r.from-indigo-600.to-purple-600.text-white.text-sm.font-medium.px-6.py-2.5.rounded-full.hover:opacity-90.transition.cursor-pointer
         {:on-click #(re-frame/dispatch [:set-section :dashboard])}
         "Mi Tablero"]
        [:a.bg-gradient-to-r.from-indigo-600.to-purple-600.text-white.text-sm.font-medium.px-6.py-2.5.rounded-full.hover:opacity-90.transition.cursor-pointer
         {:on-click #(re-frame/dispatch [:set-section :login])}
         "Iniciar Sesión"])]]]])



(defn presentacion []
  [:div {:class "flex justify-center py-8"}
   [:div {:class "w-full sm:w-11/12 md:w-3/4 max-w-3xl p-4 sm:p-8 rounded-2xl shadow-lg sm:shadow-2xl bg-white mx-auto"}
    [:h1 {:class "text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4"} "Portal de Tutorías Matemáticas"]

    [:p {:class "mb-4 text-lg"}
     "Plataforma de práctica para la Prueba de Admisión a la Educación Superior (PAES) de Matemática 1."]

    [:div {:class "mb-4"}
     [:h2 {:class "text-xl font-semibold text-blue-800 mb-2"} "¿Cómo funciona?"]
     [:ul {:class "list-disc list-inside space-y-1 text-gray-700"}
      [:li "Evaluaciones diagnósticas que identifican contenidos a reforzar"]
      [:li "Sistema progresivo basado en niveles de aprendizaje"]
      [:li "Seguimiento personalizado de tu avance"]]]

    [:div {:class "mb-4"}
     [:h2 {:class "text-xl font-semibold text-blue-800 mb-2"} "Instrucciones"]
     [:ul {:class "list-disc list-inside space-y-1 text-gray-700"}
      [:li "Ingresa con tu usuario y contraseña"]
      [:li "No uses calculadora ni ayudas externas"]
      [:li "El tiempo de respuesta es considerado en la evaluación"]]]

    [:p {:class "text-sm text-gray-600 mt-6"}
     "Iniciativa de la Universidad Nacional Arturo Prat en conjunto con el profesor Jacobo Córdova."]

    [:p {:class "italic text-blue-700 font-semibold mt-4"}
     "¡Éxito en tu preparación para la PAES!"]]])

(defn footer []
  [:footer.bg-gradient-to-r.from-gray-900.to-gray-800.text-white.mt-auto
   ;; Sección principal
   [:div.container.mx-auto.px-2.py-4
    [:div.grid.grid-cols-1.md:grid-cols-4.gap-8
     ;; Logo y descripción
     [:div.col-span-1.md:col-span-2
      [:div.flex.items-center.mb-4
       [:span.text-2xl.mr-2 "∫"]
       [:h3.text-xl.font-bold "Academia Integral"]]
      [:p.text-gray-400.mb-4
       "Transformando el aprendizaje de las matemáticas con métodos innovadores y personalizados."]]

     ;; Contacto
     [:div.col-span-1.md:col-span-2
      [:h4.text-lg.font-semibold.mb-4 "Contacto"]
      [contacto-form]]]]

   ;; Barra inferior
   [:div.border-t.border-gray-700
    [:div.container.mx-auto.px-4.py-4
     [:div.flex.flex-col.md:flex-row.justify-between.items-center.text-sm.text-gray-400
      [:p "© 2025 Academia Integral. Todos los derechos reservados."]]]]])

;; main content por atomo de reagent
(defn main-content []
  (let [current-section @(re-frame/subscribe [:current-section])
        _ (js/console.log "Current section:" current-section)]

    (case current-section
      :main [presentacion]
      :login [login/login-form]
      :diagnostic-test [diagnostic-test/diagnostic-test]
      :dashboard [dashboard/dashboard]
      [:div.flex.items-center.justify-center.min-h-screen
       [:div.text-center
        [:h1.text-6xl.font-bold.text-gray-300.mb-4 "404"]
        [:p.text-xl.text-gray-600 "Sección no encontrada"]]])))


;; Componente principal (equivalente a Home)

(defn home []
  [:div.flex.min-h-screen.flex-col {:class "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"}
   [navigation]
   [:main.flex-1.pt-16  ;; pt-16 para compensar la altura del nav  ;; flex-1 hace que main ocupe todo el espacio disponible
    [main-content]]
   [footer]])
