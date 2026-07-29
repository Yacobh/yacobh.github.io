(ns universo.components.dashboard
  (:require [re-frame.core :as re-frame]
            [reagent.core :as r]))

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

(defn fila-historial
  "Fila compacta de una evaluación en el historial."
  [{:keys [tema fecha completado? correctas total porcentaje theta]}]
  [:div {:class "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-4 border-b border-gray-100 last:border-0"}
   [:div
    [:p {:class "font-semibold text-gray-800"} (or tema "Sin tema")]
    [:p {:class "text-sm text-gray-500"} (formatear-fecha fecha)]]
   [:div {:class "flex flex-wrap items-center gap-3 text-sm"}
    [:span {:class (str "font-semibold "
                        (if (>= (or porcentaje 0) 70) "text-green-600" "text-red-600"))}
     (str correctas "/" total " (" porcentaje "%)")]
    (when theta
      [:span {:class "text-indigo-600"} (str "θ " theta)])
    [:span {:class (if completado?
                     "text-green-700 bg-green-50 px-2 py-0.5 rounded-full text-xs font-medium"
                     "text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full text-xs font-medium")}
     (if completado? "Completado" "Incompleto")]]])

(defn- profile-block []
  (let [sp @(re-frame/subscribe [:student-profile])
        built (or (:profile sp) {})
        band (or (:theta_band sp) (:theta-band built))
        theta (or (:theta sp) (:theta built))
        deficits (take 4 (or (:deficits built) []))
        unread @(re-frame/subscribe [:notifications/unread])]
    [:div.bg-white.rounded-xl.shadow-lg.p-6.mt-6.max-w-2xl.mx-auto
     [:h3.text-xl.font-bold.text-indigo-700.mb-3 "Perfil de aprendizaje"]
     (when (seq unread)
       [:div.mb-4.rounded-lg.bg-green-50.border.border-green-200.p-3
        [:p.text-sm.font-semibold.text-green-800.mb-1 "Tienes novedades de grupos"]
        (for [n (take 3 unread)]
          ^{:key (:id n)}
          [:p.text-sm.text-green-900 (:message n)])
        [:button.text-xs.text-green-700.underline.mt-1
         {:type "button"
          :on-click #(re-frame/dispatch [:notifications/dismiss])}
         "Marcar leídas"]])
     (if (or band (number? theta) (seq deficits))
       [:div.space-y-2
        (when (number? theta)
          [:p.text-sm.text-gray-700
           (str "θ = " (.toFixed (js/Number theta) 2)
                (when band (str " · banda " band)))])
        (if (seq deficits)
          [:ul.space-y-1
           (for [d deficits]
             ^{:key (:module-slug d)}
             [:li.text-sm.text-gray-700
              (str "• " (:module-slug d) " (" (:errors d) " errores)")])]
          [:p.text-sm.text-gray-500 "Sin déficits destacados en el último diagnóstico."])]
       [:div.text-center.py-2
        [:p.text-sm.text-gray-600.mb-3
         "Aún no hay perfil. Haz un diagnóstico para ver tu nivel y déficits."]
        [:button.bg-indigo-600.text-white.text-sm.font-semibold.py-2.px-4.rounded-lg
         {:type "button"
          :on-click #(do
                       (re-frame/dispatch [:test/open-selection])
                       (re-frame/dispatch [:navigate-to :diagnostic-test]))}
         "Comenzar diagnóstico"]])]))

(defn- enlace-configuracion-cuenta []
  [:div.bg-white.rounded-xl.shadow-lg.p-6.mt-6.max-w-2xl.mx-auto.flex.items-center.justify-between
   [:div
    [:h3.text-lg.font-bold.text-gray-800 "Configuración de cuenta"]
    [:p.text-sm.text-gray-500 "Edita tu nombre y teléfono, o solicita eliminar tu cuenta."]]
   [:button.text-sm.font-semibold.text-indigo-700.border.border-indigo-200.rounded-lg.px-4.py-2.hover:bg-indigo-50.transition
    {:type "button"
     :on-click #(re-frame/dispatch [:navigate-to :cuenta])}
    "Ir a configuración →"]])

(defn dashboard []
  (r/with-let [_ (do (re-frame/dispatch [:dashboard/refresh])
                     (re-frame/dispatch [:profile/load])
                     (re-frame/dispatch [:notifications/load]))]
    (let [correo @(re-frame/subscribe [:visitor-email])
          cargando? @(re-frame/subscribe [:dashboard/cargando?])
          historial @(re-frame/subscribe [:dashboard/historial])
          total-tests @(re-frame/subscribe [:dashboard/total-tests])
          tests-completados @(re-frame/subscribe [:dashboard/tests-completados])
          promedio @(re-frame/subscribe [:dashboard/promedio-nota])
          theta-promedio @(re-frame/subscribe [:dashboard/theta-promedio])
          ultimo (first historial)]

      [:div {:class "py-8 px-4"}
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

           [profile-block]

           ;; Acciones rápidas
           [:div.flex.flex-row.flex-wrap.gap-4.justify-center.mt-10
            [:button.bg-indigo-600.text-white.font-semibold.py-3.px-5.rounded-lg.hover:bg-indigo-700.transition.shadow-md.flex.items-center.gap-2
             {:type "button"
              :on-click #(do
                           (re-frame/dispatch [:test/open-selection])
                           (re-frame/dispatch [:navigate-to :diagnostic-test]))}
             [:span "🚀"]
             [:span "Nueva Evaluación"]]
            [:button.bg-white.border.border-indigo-200.text-indigo-700.font-semibold.py-3.px-5.rounded-lg.hover:bg-indigo-50.transition.shadow-sm
             {:type "button"
              :on-click #(re-frame/dispatch [:navigate-to :plan])}
             "Mi plan"]
            [:button.bg-green-600.text-white.font-semibold.py-3.px-5.rounded-lg.hover:bg-green-700.transition.shadow-md
             {:type "button"
              :on-click #(re-frame/dispatch [:navigate-to :cupos])}
             "Cupos / Grupos"]]

           ;; Último test (el más reciente por fecha/id)
           (when ultimo
             (let [{:keys [tema fecha completado? correctas total porcentaje nota theta
                           duracion-min promedio-seg-pregunta]} ultimo]
               [:div.bg-white.rounded-xl.shadow-lg.p-8.mt-6.max-w-2xl.mx-auto
                [:h3.text-xl.font-bold.text-indigo-700.mb-4 "Última evaluación"]
                [:div.grid.grid-cols-1.sm:grid-cols-2.gap-x-8.gap-y-2
                 [:div [:span.font-semibold "Tema: "] (str tema)]
                 [:div [:span.font-semibold "Fecha: "] (formatear-fecha fecha)]
                 [:div [:span.font-semibold "Completado: "] (if completado? "Sí" "No")]
                 [:div [:span.font-semibold "Correctas: "] (str correctas "/" total)]
                 [:div [:span.font-semibold "Porcentaje: "] (str porcentaje "%")]
                 [:div [:span.font-semibold "Nota: "] (str nota)]
                 [:div [:span.font-semibold "Theta final: "] (str theta)]
                 [:div [:span.font-semibold "Duración total: "] (if duracion-min (str duracion-min " min") "-")]
                 [:div [:span.font-semibold "Promedio por pregunta: "] (if promedio-seg-pregunta (str promedio-seg-pregunta " seg") "-")]]]))

           ;; Historial completo
           [:div.bg-white.rounded-xl.shadow-lg.p-8.mt-6.max-w-2xl.mx-auto
            [:h3.text-xl.font-bold.text-indigo-700.mb-2 "Historial de evaluaciones"]
            (if (seq historial)
              [:div
               (for [row historial]
                 ^{:key (:id row)}
                 [fila-historial row])]
              [:p.text-gray-500.text-sm "Aún no hay evaluaciones registradas."])]

           [enlace-configuracion-cuenta]])]])))
