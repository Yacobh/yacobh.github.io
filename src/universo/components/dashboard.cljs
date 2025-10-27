(ns universo.components.dashboard
  (:require [re-frame.core :as re-frame]))
(defn formatear-fecha
  "Formatea la fecha de created_at a formato legible"
  [fecha-str]
  (when fecha-str
    (let [fecha (js/Date. fecha-str)
          opciones #js {:year "numeric"
                       :month "long"
                       :day "numeric"
                       :hour "2-digit"
                       :minute "2-digit"}]
      (.toLocaleDateString fecha "es-ES" opciones))))

(defn tarjeta-estadistica
  "Componente para mostrar una estadística individual"
  [titulo valor subtitulo icono color-bg color-text]
  [:div {:class (str "bg-white rounded-lg shadow-md p-6 border-l-4 " color-bg)}
   [:div.flex.items-center.justify-between
    [:div
     [:p.text-sm.font-medium.text-gray-600.uppercase.tracking-wide titulo]
     [:p {:class (str "text-3xl font-bold mt-2 " color-text)} valor]
     (when subtitulo
       [:p.text-xs.text-gray-500.mt-1 subtitulo])]
    [:div {:class (str "text-4xl " color-text)}
     icono]]])

(defn barra-progreso
  "Componente de barra de progreso"
  [porcentaje]
  (let [porcentaje-limitado (min porcentaje 100) ; Limitar a 100%
        color (cond
                (>= porcentaje 90) "bg-green-500"
                (>= porcentaje 70) "bg-blue-500"
                (>= porcentaje 50) "bg-yellow-500"
                :else "bg-red-500")]
    [:div.w-full.bg-gray-200.rounded-full.h-3.overflow-hidden
     [:div {:class (str "h-full rounded-full transition-all duration-500 " color)
            :style {:width (str porcentaje-limitado "%")}}]]))

(defn nivel-theta
  "Componente para mostrar el nivel theta visualmente"
  [theta]
  (let [nivel (cond
                (>= theta 2.0) {:texto "Avanzado" :color "text-purple-600" :emoji "🚀"}
                (>= theta 1.0) {:texto "Intermedio" :color "text-blue-600" :emoji "📈"}
                (>= theta 0.0) {:texto "Básico" :color "text-green-600" :emoji "🌱"}
                :else {:texto "Inicial" :color "text-gray-600" :emoji "🎯"})]
    [:div.flex.items-center.gap-2
     [:span.text-2xl (:emoji nivel)]
     [:div
      [:p {:class (str "font-bold text-lg " (:color nivel))} (:texto nivel)]
      [:p.text-xs.text-gray-500 (str "θ = " (js/Math.round (* theta 100)) "/100")]]]))

(defn tarjeta-ultimo-test
  "Tarjeta detallada del último test"
  [ultimo-test]
  (when ultimo-test
    (let [{:keys [tema fecha correctas total porcentaje completado? current-question theta]} ultimo-test]
      [:div.bg-gradient-to-br.from-indigo-50.to-purple-50.rounded-lg.shadow-lg.p-6
       [:div.flex.items-center.justify-between.mb-4
        [:h3.text-xl.font-bold.text-gray-800 "Última Evaluación"]
        (when-not completado?
          [:span.bg-amber-100.text-amber-800.text-xs.font-semibold.px-3.py-1.rounded-full
           "En progreso"])]

       [:div.space-y-4
        ;; Tema
        [:div
         [:p.text-sm.text-gray-600.font-medium "Tema"]
         [:p.text-lg.font-bold.text-indigo-700 tema]]

        ;; Fecha
        [:div
         [:p.text-sm.text-gray-600.font-medium "Fecha"]
         [:p.text-sm.text-gray-700 (formatear-fecha fecha)]]

        ;; Progreso de preguntas
        [:div
         [:div.flex.justify-between.items-center.mb-2
          [:p.text-sm.text-gray-600.font-medium "Progreso"]
          [:p.text-sm.font-semibold.text-gray-700 (str current-question "/" total)]]
         [:div.w-full.bg-gray-200.rounded-full.h-2.overflow-hidden
          [:div.bg-indigo-500.h-2.rounded-full.transition-all
           {:style {:width (str (min (* (/ current-question total) 100) 100) "%")}}]]]

        ;; Resultado
        [:div
         [:div.flex.justify-between.items-center.mb-2
          [:p.text-sm.text-gray-600.font-medium "Resultado"]
          [:p {:class (str "text-lg font-bold "
                           (if (>= porcentaje 70) "text-green-600" "text-red-600"))}
           (str correctas "/" total " (" porcentaje "%)")]]
         [barra-progreso porcentaje]]

        ;; Nivel estimado
        (when theta
          [:div
           [:p.text-sm.text-gray-600.font-medium.mb-2 "Nivel estimado"]
           [nivel-theta theta]])]])))

(defn dashboard []
  (let [correo @(re-frame/subscribe [:visitor-email])
        cargando? @(re-frame/subscribe [:dashboard/cargando?])
        ultimo-test @(re-frame/subscribe [:dashboard/ultimo-test])
        total-tests @(re-frame/subscribe [:dashboard/total-tests])
        tests-completados @(re-frame/subscribe [:dashboard/tests-completados])
        promedio @(re-frame/subscribe [:dashboard/promedio-nota])
        theta-promedio @(re-frame/subscribe [:dashboard/theta-promedio])]

    [:div {:class "min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4"}
     [:div {:class "max-w-6xl mx-auto"}

      ;; Header
      [:div.bg-white.rounded-xl.shadow-lg.p-6.mb-8
       [:div.flex.items-center.justify-between
        [:div
         [:h1.text-3xl.font-bold.text-gray-800.mb-2 "Dashboard de Aprendizaje"]
         [:p.text-gray-600 (str "Bienvenido, " correo)]]
        [:div.text-5xl "📊"]]]

      (if cargando?
        [:div.text-center.py-20
         [:div.inline-block.animate-spin.rounded-full.h-16.w-16.border-t-4.border-b-4.border-indigo-600]
         [:p.text-gray-600.mt-4.text-lg "Cargando tus datos..."]]

        [:div
         ;; Grid de estadísticas principales
         [:div.grid.grid-cols-1.md:grid-cols-2.lg:grid-cols-4.gap-6.mb-8

          ;; Total de tests
          [tarjeta-estadistica
           "Total Evaluaciones"
           total-tests
           "Realizadas hasta ahora"
           "📝"
           "border-blue-500"
           "text-blue-600"]

          ;; Tests completados
          [tarjeta-estadistica
           "Completadas"
           tests-completados
           (str (- total-tests tests-completados) " en progreso")
           "✅"
           "border-green-500"
           "text-green-600"]

          ;; Promedio
          [tarjeta-estadistica
           "Promedio General"
           (if (pos? tests-completados) (str promedio "%") "N/A")
           (when (pos? tests-completados)
             (cond
               (>= promedio 90) "¡Excelente!"
               (>= promedio 70) "Muy bien"
               (>= promedio 50) "Sigue practicando"
               :else "Necesitas mejorar"))
           "🎯"
           "border-purple-500"
           "text-purple-600"]

          ;; Nivel promedio
          [tarjeta-estadistica
           "Nivel Promedio"
           (if (pos? tests-completados) (str theta-promedio "/100") "N/A")
           (when (pos? tests-completados) "Basado en θ promedio")
           "⭐"
           "border-yellow-500"
           "text-yellow-600"]]

         ;; Grid de contenido detallado
         [:div.grid.grid-cols-1.lg:grid-cols-3.gap-6

          ;; Columna izquierda (2/3) - Último test
          [:div.lg:col-span-2
           [tarjeta-ultimo-test ultimo-test]]

          ;; Columna derecha (1/3) - Acciones rápidas
          [:div.space-y-6
           ;; Tarjeta de acción principal
           [:div.bg-white.rounded-lg.shadow-lg.p-6
            [:h3.text-lg.font-bold.text-gray-800.mb-4 "Acciones Rápidas"]
            [:div.space-y-3
             [:button.w-full.bg-indigo-600.text-white.font-semibold.py-3.px-4.rounded-lg.hover:bg-indigo-700.transition.shadow-md.hover:shadow-lg.flex.items-center.justify-center.gap-2
              {:type "button"
               :on-click #(do
                            (re-frame/dispatch [:test/start "Números"])
                            (re-frame/dispatch [:set-section :diagnostic-test]))}
              [:span "🚀"]
              [:span "Nueva Evaluación"]]

             [:button.w-full.bg-gray-100.text-gray-700.font-semibold.py-3.px-4.rounded-lg.hover:bg-gray-200.transition.flex.items-center.justify-center.gap-2
              {:type "button"
               :on-click #(js/console.log "Ver historial")}
              [:span "📈"]
              [:span "Ver Historial"]]]]

           ;; Tarjeta de tips
           [:div.bg-gradient-to-br.from-green-50.to-emerald-50.rounded-lg.shadow-md.p-6
            [:h3.text-lg.font-bold.text-gray-800.mb-3.flex.items-center.gap-2
             [:span "💡"]
             [:span "Consejo del día"]]
            [:p.text-sm.text-gray-700.leading-relaxed
             "La práctica constante es clave para mejorar. Intenta realizar al menos una evaluación cada semana para mantener tu progreso."]]]]])]]))
