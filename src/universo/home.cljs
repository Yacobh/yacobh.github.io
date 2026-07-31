(ns universo.home
  (:require
   [reagent.core :as r]
   [re-frame.core :as re-frame]
   [universo.components.resume :as resume]
   [universo.components.contacto :refer [contacto-form]]
   [universo.components.admin :as admin]
   [universo.components.cuenta :as cuenta]
   [universo.components.dashboard :as dashboard]
   [universo.components.diagnostic-test :as diagnostic-test]
   [universo.components.landing :as landing]
   [universo.components.plan :as plan]
   [universo.components.privacidad :as privacidad]
   [universo.components.slots :as slots]
   [universo.components.guestbook :as guestbook]
   [universo.components.login :as login]
   [universo.components.ui :as ui]))

;; seccion principal variable con atomo de reagent, dinamico

(defn- brand []
  [:a.flex.items-center.text-xl.font-bold.text-gray-800
   {:href "#"
    :aria-label "Academia Integral — inicio"
    :on-click (fn [e]
                (.preventDefault e)
                (re-frame/dispatch [:navigate-to :main]))}
   [:span.bg-gradient-to-r.from-blue-600.to-purple-600.bg-clip-text.text-transparent
    "Academia"]
   [:span.mx-2.text-3xl.font-light.text-indigo-600 "∫"]
   [:span.bg-gradient-to-r.from-purple-600.to-indigo-700.bg-clip-text.text-transparent
    "Integral"]])

(def ^:private link-class
  (str "rounded px-2 py-2 text-sm font-medium text-gray-700 transition "
       "hover:text-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"))

(def ^:private cta-class
  (str "inline-flex items-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 "
       "px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 "
       "focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300"))

(defn- scroll-to-section!
  "Navega al inicio y luego hace scroll al ancla (la landing debe estar montada)."
  [element-id]
  (re-frame/dispatch [:navigate-to :main])
  (js/setTimeout
   (fn []
     (when-let [el (.getElementById js/document element-id)]
       (.scrollIntoView el #js {:behavior "smooth" :block "start"})))
   320))

(defn- authed-links
  "Enlaces de sesión. on-navigate permite cerrar el menú móvil."
  [{:keys [admin? on-navigate stacked?]}]
  (let [go (fn [section]
             (fn []
               (when on-navigate (on-navigate))
               (re-frame/dispatch [:navigate-to section])))]
    [:<>
     (when admin?
       [:button {:type "button"
                 :class (str link-class " font-semibold text-indigo-700 hover:text-indigo-900 "
                             (when stacked? "text-left w-full"))
                 :on-click (go :admin)}
        "Admin"])
     [:button {:type "button"
               :class (str link-class (when stacked? " text-left w-full"))
               :on-click (go :plan)}
      "Mi plan"]
     [:button {:type "button"
               :class (str link-class (when stacked? " text-left w-full"))
               :on-click (go :cupos)}
      "Cupos"]
     [:button {:type "button"
               :class (str cta-class (when stacked? " w-full justify-center"))
               :on-click (go :dashboard)}
      "Mi tablero"]
     [:button {:type "button"
               :class (str link-class " text-gray-500 hover:text-gray-900"
                           (when stacked? " text-left w-full"))
               :on-click (go :cuenta)}
      "Configuración"]
     [:button {:type "button"
               :class (str link-class " text-gray-500 hover:text-gray-900"
                           (when stacked? " text-left w-full"))
               :on-click (fn []
                           (when on-navigate (on-navigate))
                           (re-frame/dispatch [:auth/logout]))}
      "Salir"]]))

(defn- guest-links
  [{:keys [on-navigate stacked?]}]
  (let [close (fn [] (when on-navigate (on-navigate)))]
    [:<>
     [:button {:type "button"
               :class (str link-class (when stacked? " text-left w-full"))
               :on-click (fn [] (close) (scroll-to-section! "como-funciona"))}
      "Cómo funciona"]
     [:button {:type "button"
               :class (str link-class (when stacked? " text-left w-full"))
               :on-click (fn [] (close) (scroll-to-section! "preguntas"))}
      "Preguntas"]
     [:button {:type "button"
               :class (str link-class (when stacked? " text-left w-full"))
               :on-click (fn []
                           (close)
                           (re-frame/dispatch [:navigate-to :login]))}
      "Iniciar sesión"]
     [:button {:type "button"
               :class (str cta-class (when stacked? " w-full justify-center"))
               :on-click (fn []
                           (close)
                           (re-frame/dispatch [:landing/start]))}
      "Comenzar gratis"]]))

(defn navigation []
  (let [menu-open? (r/atom false)]
    (fn []
      (let [ready? @(re-frame/subscribe [:auth/ready?])
            logged-in? @(re-frame/subscribe [:auth/logged-in?])
            admin? @(re-frame/subscribe [:auth/admin?])
            close! #(reset! menu-open? false)
            links (fn [stacked?]
                    (cond
                      (not ready?)
                      [:span.px-4.text-sm.text-gray-400 "…"]

                      logged-in?
                      [authed-links {:admin? admin?
                                     :on-navigate close!
                                     :stacked? stacked?}]

                      :else
                      [guest-links {:on-navigate close!
                                    :stacked? stacked?}]))]
        [:nav
         {:class "fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur"}
         [:div.mx-auto.max-w-7xl.px-4.sm:px-6.lg:px-8
          [:div.flex.h-16.items-center.justify-between
           [brand]

           ;; Escritorio
           [:div.hidden.items-center.gap-2.md:flex
            [links false]]

           ;; Móvil
           [:button.inline-flex.items-center.justify-center.rounded.p-2.text-gray-600.md:hidden
            {:type "button"
             :aria-label (if @menu-open? "Cerrar menú" "Abrir menú")
             :aria-expanded (if @menu-open? "true" "false")
             :on-click #(swap! menu-open? not)}
            [:span.text-2xl.leading-none (if @menu-open? "✕" "☰")]]]]

         (when @menu-open?
           [:div.border-t.border-gray-200.bg-white.md:hidden
            [:div.mx-auto.flex.max-w-7xl.flex-col.gap-1.px-4.py-4
             [links true]]])]))))

(defn footer []
  [:footer.mt-auto.bg-gradient-to-br.from-slate-900.via-indigo-950.to-slate-900.text-white
   [:div.mx-auto.max-w-7xl.px-4.py-12.sm:px-6.lg:px-8
    [:div.grid.grid-cols-1.gap-10.md:grid-cols-4
     ;; Marca (más ancha: el párrafo necesita más espacio del que le daba 1/3)
     [:div.md:col-span-2
      [:div.mb-4.flex.items-center
       [:span.mr-2.text-2xl.text-indigo-300 "∫"]
       [:h3.text-xl.font-bold "Academia Integral"]]
      [:p {:class "max-w-md text-sm leading-relaxed text-indigo-100/70"}
       "Preparación de PAES Matemática 1 con diagnóstico adaptativo, plan personalizado "
       "y grupos de estudio por nivel. Un proyecto del profesor Jacobo Córdova, que se originó "
       "en 2025 a partir de un convenio de desarrollo con la Universidad Arturo Prat."]]

     ;; Enlaces
     [:div
      [:h4.mb-4.text-sm.font-semibold.uppercase.tracking-wider.text-indigo-300 "Explorar"]
      [:ul.space-y-2.text-sm
       (for [[label handler]
             [["Comenzar diagnóstico" #(re-frame/dispatch [:landing/start])]
              ["Cómo funciona" #(scroll-to-section! "como-funciona")]
              ["Preguntas frecuentes" #(scroll-to-section! "preguntas")]
              ["Libro de visitas" #(re-frame/dispatch [:navigate-to :guestbook])]
              ["Sobre el profesor" #(re-frame/dispatch [:navigate-to :jacobocordova])]
              ["Aviso de privacidad" #(re-frame/dispatch [:navigate-to :privacidad])]]]
         ^{:key label}
         [:li
          [:button {:type "button"
                    :class "text-indigo-100/70 transition hover:text-white"
                    :on-click handler}
           label]])]]

     ;; Contacto
     [:div {:id "contacto"}
      [:h4.mb-4.text-sm.font-semibold.uppercase.tracking-wider.text-indigo-300 "Contacto"]
      [contacto-form]]]]

   [:div {:class "border-t border-indigo-900/50"}
    [:div.mx-auto.max-w-7xl.px-4.py-5.sm:px-6.lg:px-8
     [:p {:class "text-center text-sm text-indigo-100/50"}
      (str "© " (.getFullYear (js/Date.)) " Academia Integral. Todos los derechos reservados.")]]]])

;; main content por atomo de reagent
(defn main-content []
  (let [current-section @(re-frame/subscribe [:current-section])]
    (case current-section
      :main [landing/landing]
      :login [login/login-form]
      :diagnostic-test [diagnostic-test/diagnostic-test]
      :dashboard [dashboard/dashboard]
      :cuenta [cuenta/cuenta-page]
      :plan [plan/plan-panel]
      :cupos [slots/slots-panel]
      :admin [admin/admin-panel]
      :guestbook [guestbook/guestbook-component]
      :jacobocordova [resume/jacobo]
      :privacidad [privacidad/privacidad-page]
      [:div.flex.min-h-screen.items-center.justify-center
       [:div.text-center
        [:h1.mb-4.text-6xl.font-bold.text-gray-300 "404"]
        [:p.text-xl.text-gray-600 "Sección no encontrada"]]])))

;; 1. Envolver main-content con la opacidad reactiva
(defn main-content-wrapper []
  (let [transitioning @(re-frame/subscribe [:transitioning])]
    [:div.flex-1
     {:style {:opacity    (if transitioning 0 1)
              :transition "opacity 200ms ease-in-out"}}
     [main-content]]))

;; Componente principal (equivalente a Home)

(defn home []
  [:div.flex.min-h-screen.flex-col {:class "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"}
   [navigation]
   [:main.flex-1.pt-16  ;; pt-16 compensa la altura del nav fijo
    [main-content-wrapper]]
   [footer]
   ;; Montado una sola vez: reacciona a [:confirm/ask ...] sin importar la sección activa.
   [ui/confirm-dialog]])
