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
      [:div
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

    [:div{:class "py-8 px-4"}
     [:div {:class "max-w-6xl mx-auto"}

      ;; Header
      [:div.bg-white.rounded-xl.shadow-lg.p-6.mb-8
       [:div.flex.items-center.justify-between
        [:div
         [:h1.text-3xl.font-bold.text-gray-800.mb-2 "Tablero de Aprendizaje"]
         [:p.text-gray-600 (str "Bienvenido, " correo)]]
        [:div.text-5xl "📊"]]]

      (if cargando?
        [:div.text-center.py-20
         [:div.inline-block.animate-spin.rounded-full.h-16.w-16.border-t-4.border-b-4.border-indigo-600]
         [:p.text-gray-600.mt-4.text-lg "Cargando tus datos..."]]

        [:div
         ;; Grid de estadísticas principales
         [:div.grid.grid-cols-1.sm:grid-cols-3.gap-4.mb-2
          [tarjeta-estadistica
           "Total Evaluaciones"
           total-tests
           "Realizadas hasta ahora"
           "📝"
           "border-blue-500"
           "text-blue-600"]
          [tarjeta-estadistica
           "Completadas"
           tests-completados
           "Evaluaciones finalizadas"
           "✅"
           "border-green-500"
           "text-green-600"]
          [tarjeta-estadistica
           "Promedio"
           (str promedio "%")
           (str "Theta avg: " theta-promedio)
           "📈"
           "border-indigo-500"
           "text-indigo-600"]]

         ;; Detalle último test realizado
         (let [{:keys [tema fecha completado? correctas total porcentaje nota theta
                       duracion-min promedio-seg-pregunta]} ultimo-test]
           [:div.bg-white.rounded-xl.shadow-lg.p-8.mt-6.max-w-2xl.mx-auto
            [:h3.text-xl.font-bold.text-indigo-700.mb-4 "Último test realizado"]
            [:div.grid.grid-cols-1.sm:grid-cols-2.gap-x-8.gap-y-2
             [:div [:span.font-semibold "Tema: "] (str tema)]
             [:div [:span.font-semibold "Fecha: "] (formatear-fecha fecha)]
             [:div [:span.font-semibold "Completado: "] (if completado? "Sí" "No")]
             [:div [:span.font-semibold "Correctas: "] (str correctas "/" total)]
             [:div [:span.font-semibold "Porcentaje: "] (str porcentaje "%")]
             [:div [:span.font-semibold "Nota: "] (str nota)]
             [:div [:span.font-semibold "Theta final: "] (str theta)]
             [:div [:span.font-semibold "Duración total: "] (if duracion-min (str duracion-min " min") "-")]
             [:div [:span.font-semibold "Promedio por pregunta: "] (if promedio-seg-pregunta (str promedio-seg-pregunta " seg") "-")]]])

         ;; Acciones rápidas
         [:div.flex.flex-row.flex-wrap.gap-4.justify-center.mt-10
          [:button.bg-indigo-600.text-white.font-semibold.py-3.px-5.rounded-lg.hover:bg-indigo-700.transition.shadow-md.flex.items-center.gap-2
           {:type "button"
            :on-click #(do
                         (re-frame/dispatch [:test/start "Números"])
                         (re-frame/dispatch [:navigate-to :diagnostic-test]))}
           [:span "🚀"]
           [:span "Nueva Evaluación"]]]])]]))
