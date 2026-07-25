(ns universo.components.plan
  (:require
   [re-frame.core :as re-frame]
   [reagent.core :as r]
   [universo.profile :as profile]
   [universo.components.math-render :as math]))

(defn- empty-no-profile []
  [:div.bg-white.rounded-xl.shadow.p-8.text-center.max-w-xl.mx-auto
   [:h2.text-xl.font-bold.text-gray-800.mb-2 "Aún no hay plan"]
   [:p.text-gray-600.mb-6
    "Completa un diagnóstico adaptativo para identificar tus déficits y recomendarte recursos."]
   [:button.bg-indigo-600.text-white.font-semibold.py-3.px-6.rounded-lg.hover:bg-indigo-700
    {:type "button"
     :on-click #(do
                  (re-frame/dispatch [:test/open-selection])
                  (re-frame/dispatch [:navigate-to :diagnostic-test]))}
    "Hacer diagnóstico"]])

(defn- layer0-card [m]
  [:div.border.border-amber-100.bg-amber-50.rounded-lg.p-4
   (when (:question-text m)
     [:p.text-sm.text-gray-800.mb-2 (math/latex (:question-text m))])
   (when (:selected m)
     [:p.text-xs.text-amber-800.mb-1 (str "Elegiste: " (:selected m))])
   (when (:explanation m)
     [:p.text-sm.text-gray-700 (math/latex (:explanation m))])
   (when (:module-slug m)
     [:p.text-xs.text-gray-500.mt-2 (:module-slug m)])])

(defn- resource-card [r]
  [:div.border.border-gray-200.rounded-lg.p-4.bg-white
   [:div.flex.justify-between.gap-2.mb-1
    [:h4.font-semibold.text-gray-800 (or (:title r) "Recurso")]
    [:span.text-xs.text-indigo-600.uppercase (or (:type r) "")]]
   (when-let [ctx (or (:historical_context r) (:historical-context r))]
     [:p.text-xs.text-stone-500.italic.mb-2 ctx])
   (when (:body r)
     [:div.text-sm.text-gray-700.mb-2.whitespace-pre-wrap
      (math/latex (:body r))])
   (when-let [url (:media_url r)]
     [:a.text-sm.text-indigo-600.hover:underline
      {:href url :target "_blank" :rel "noopener noreferrer"}
      "Abrir recurso →"])
   (when-let [slug (or (:module_slug r) (get-in r [:modules :slug]))]
     [:p.text-xs.text-gray-400.mt-2 slug])])

(defn plan-panel []
  (r/create-class
   {:display-name "plan-panel"
    :component-did-mount
    (fn [_]
      (re-frame/dispatch [:plan/enter]))
    :reagent-render
    (fn []
      (let [profile-map @(re-frame/subscribe [:student-profile])
            built (or (:profile profile-map) {})
            band (or (:theta_band profile-map) (:theta-band built))
            loading? @(re-frame/subscribe [:plan/loading?])
            layer0 @(re-frame/subscribe [:plan/layer0])
            deficits @(re-frame/subscribe [:plan/deficits])
            resources @(re-frame/subscribe [:plan/resources])
            error @(re-frame/subscribe [:plan/error])
            has-profile? (or (number? (:theta profile-map))
                             (number? (:theta built))
                             (seq deficits)
                             (seq layer0))]
        [:div.py-8.px-4
         [:div.max-w-3xl.mx-auto.space-y-6
          [:div.bg-white.rounded-xl.shadow.p-6
           [:h1.text-2xl.font-bold.text-gray-900.mb-1 "Mi plan"]
           [:p.text-sm.text-gray-500
            "Capa 0: explicaciones de tus errores. Capa 1: recursos Baldor por módulo."]
           (when band
             [:p.text-sm.text-indigo-700.mt-2
              (str "Banda de cupo: " (profile/band-label band)
                   (when (number? (or (:theta profile-map) (:theta built)))
                     (str " (θ = "
                          (.toFixed (js/Number (or (:theta profile-map) (:theta built))) 2)
                          ")")))])]

          (cond
            (and loading? (not has-profile?))
            [:p.text-gray-500.text-center.py-10 "Cargando plan…"]

            (not has-profile?)
            [empty-no-profile]

            :else
            [:div.space-y-6
             (when (seq deficits)
               [:div.bg-white.rounded-xl.shadow.p-6
                [:h2.text-lg.font-bold.text-gray-800.mb-3 "Dónde necesitas ayuda"]
                [:ul.space-y-2
                 (for [d deficits]
                   ^{:key (:module-slug d)}
                   [:li.flex.justify-between.text-sm.border-b.border-gray-100.py-2
                    [:span.font-medium.text-gray-800 (:module-slug d)]
                    [:span.text-red-600
                     (str (:errors d) "/" (:total d) " errores")]])]])

             [:div.bg-white.rounded-xl.shadow.p-6
              [:h2.text-lg.font-bold.text-gray-800.mb-3 "Desde tu diagnóstico"]
              (if (seq layer0)
                [:div.space-y-3
                 (for [[i m] (map-indexed vector layer0)]
                   ^{:key (str "m-" i "-" (:question-id m))}
                   [layer0-card m])]
                [:p.text-sm.text-gray-500 "No hay misconceptions registradas en el último test."])]

             [:div.bg-white.rounded-xl.shadow.p-6
              [:h2.text-lg.font-bold.text-gray-800.mb-3 "Recursos recomendados"]
              (when error
                [:p.text-sm.text-red-600.mb-3 error])
              (if (seq resources)
                [:div.space-y-3
                 (for [r resources]
                   ^{:key (:id r)}
                   [resource-card r])]
                [:p.text-sm.text-gray-500
                 "Aún no hay recursos publicados para tus módulos. Las explicaciones de arriba ya te orientan."])]

             [:div.flex.flex-wrap.gap-3.justify-center
              [:button.bg-indigo-600.text-white.font-semibold.py-2.px-5.rounded-lg.hover:bg-indigo-700
               {:type "button"
                :on-click #(re-frame/dispatch [:navigate-to :cupos])}
               "Ver cupos para mi nivel"]
              [:button.bg-white.border.border-gray-300.text-gray-700.font-semibold.py-2.px-5.rounded-lg.hover:bg-gray-50
               {:type "button"
                :on-click #(re-frame/dispatch [:navigate-to :dashboard])}
               "Volver al tablero"]]])]]))}))
