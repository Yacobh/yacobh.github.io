(ns universo.components.dashboard
  (:require [re-frame.core :as re-frame]))

(defn dashboard []
  (let [dashboard @(re-frame/subscribe [:dashboard])
        correo @(re-frame/subscribe [:visitor-email])]
    ;[:div.flex.items-center.justify-center.bg-gray-100.min-h-screen.p-6
     ;[:div.bg-white.shadow-md.rounded-lg.p-8.w-full.max-w-md
    [:div {:class "py-12 px-4"}
     [:div {:class "max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg"}
       [:div {:class "text-center"}


        ;; Título
        [:h2.text-2xl.font-bold.text-gray-800.mb-6.text-center
         "Tu tablero de aprendizaje"]

        ;; Información del usuario
        [:div.text-sm.text-gray-600.mb-4.text-center
         [:p.font-medium "Usuario:"]
         [:p correo]]

        ;; Separador
        [:hr.border-gray-200.my-4]

        ;; Datos del progreso
        [:div.space-y-4.text-gray-700
         [:div.flex.justify-between
          [:span "Nivel actual:"]
          [:span.font-semibold.text-blue-700 (:level dashboard)]]

         [:div.flex.justify-between
          [:span "Frecuencia de estudio:"]
          [:span.font-semibold.text-blue-700 (:frecuencia dashboard)]]

         [:div.flex.justify-between
          [:span "Evaluaciones realizadas:"]
          [:span.font-semibold.text-blue-700 (:tests dashboard)]]]

        ;; Botón o acción inferior
        [:div.mt-8.text-center
         [:a.bg-indigo-600.text-white.text-sm.px-5.py-2.5.rounded-full.hover:bg-indigo-700.transition.shadow-sm.hover:shadow-md
          ;; Botón de acceso
          {:on-click #(do
                        (re-frame/dispatch [:test/start "Números"])
                        (re-frame/dispatch [:set-section :diagnostic-test]))
           #_(re-frame/dispatch [:set-section :diagnostic-test])} ; Cambia a la sección de login
          "Realizar evaluación"]]]]]))
