(ns universo.home
  (:require
   [reagent.core :as r]
   [re-frame.core :as re-frame]
   [universo.components.resume :as resume]
   [universo.components.contacto :refer [contacto-form contacto-panel]]
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
  ;; ADR-022: el logotipo era texto con degradado azul→púrpura, el recurso más
  ;; reconocible del template genérico. Ahora es lo que Braun haría: una sola
  ;; letra, peso y espaciado. El ∫ va en naranja porque **es** la marca — es el
  ;; único adorno que sobrevive, y sobrevive por ser el símbolo del producto.
  [:a.flex.items-center.text-xl.font-medium.tracking-tight.text-gray-800
   {:href "#"
    :aria-label "Academia Integral — inicio"
    :on-click (fn [e]
                (.preventDefault e)
                (re-frame/dispatch [:navigate-to :main]))}
   [:span "Academia"]
   [:span.mx-1.5.text-3xl.font-light.text-senal-700 "∫"]
   [:span "Integral"]])

(def ^:private link-class
  (str "rounded px-2 py-2 text-sm font-medium text-gray-700 transition "
       "hover:text-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"))

;; La acción principal de la barra. Es el único naranja de la navegación: si
;; hubiera dos, ninguno sería el principal (ADR-022). Texto grafito sobre el
;; naranja, no blanco — es lo que hacía Braun y además lo que pasa AA.
(def ^:private cta-class
  (str "control inline-flex items-center rounded bg-senal-400 "
       "px-5 py-2.5 text-sm font-medium text-grafito-900 hover:bg-senal-300 "
       "focus:outline-none focus-visible:ring-2 focus-visible:ring-senal-700 "
       "focus-visible:ring-offset-2"))

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

(defn- theme-toggle []
  (let [dark? @(re-frame/subscribe [:theme/dark?])]
    [:button
     {:type "button"
      :class (str "inline-flex items-center justify-center rounded-full p-2 text-gray-600 "
                  "transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none "
                  "focus-visible:ring-2 focus-visible:ring-indigo-400")
      :aria-label (if dark? "Cambiar a tema claro" "Cambiar a tema oscuro")
      :on-click #(re-frame/dispatch [:theme/toggle])}
     (if dark?
       ;; sol — visible en oscuro, invita a volver a claro
       [:svg {:class "h-5 w-5" :fill "none" :viewBox "0 0 24 24" :stroke "currentColor" :stroke-width "1.8"}
        [:path {:stroke-linecap "round" :stroke-linejoin "round"
                :d "M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"}]]
       ;; luna — visible en claro, invita a pasar a oscuro
       [:svg {:class "h-5 w-5" :fill "none" :viewBox "0 0 24 24" :stroke "currentColor" :stroke-width "1.8"}
        [:path {:stroke-linecap "round" :stroke-linejoin "round"
                :d "M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"}]])]))

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
                           (re-frame/dispatch [:auth/set-login-mode :login])
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
         ;; Excepción documentada en ADR-012/ADR-020: el `dark:` va acá y no en
         ;; el mapeo global porque `bg-white/90` con blur es una aparición
         ;; única, no vocabulario compartido.
         {:class (str "fixed top-0 left-0 right-0 z-50 border-b border-panel-400 bg-panel-200/95 "
                      "backdrop-blur dark:border-panel-950 dark:bg-panel-900/95")}
         [:div.mx-auto.max-w-7xl.px-4.sm:px-6.lg:px-8
          [:div.flex.h-16.items-center.justify-between
           [brand]

           [:div.flex.items-center.gap-1
            ;; Escritorio
            [:div.hidden.items-center.gap-2.md:flex
             [links false]]

            [theme-toggle]

            ;; Móvil
            [:button.inline-flex.items-center.justify-center.rounded.p-2.text-gray-600.md:hidden
             {:type "button"
              :aria-label (if @menu-open? "Cerrar menú" "Abrir menú")
              :aria-expanded (if @menu-open? "true" "false")
              :on-click #(swap! menu-open? not)}
             [:span.text-2xl.leading-none (if @menu-open? "✕" "☰")]]]]]

         (when @menu-open?
           [:div.border-t.border-gray-200.bg-white.md:hidden
            [:div.mx-auto.flex.max-w-7xl.flex-col.gap-1.px-4.py-4
             [links true]]])]))))

(defn footer []
  [:footer.mt-auto.bg-grafito-900.text-white
   [:div.mx-auto.max-w-7xl.px-4.py-12.sm:px-6.lg:px-8
    ;; Contacto primero y a lo ancho (T-71). Antes vivía apretado en una de
    ;; cuatro columnas, con un formulario que no entraba; ahora es una placa
    ;; montada sobre el panel del footer, que es lo que le corresponde a la
    ;; única vía de contacto del sitio.
    [:div {:id "contacto"
           :class (str "placa mb-10 rounded bg-panel-800/60 p-6 sm:p-8 "
                       "grid gap-6 md:grid-cols-2 md:items-start")}
     [:div
      [:h4 {:class "text-lg font-medium text-white"} "¿Hablamos?"]
      [:p {:class "mt-2 max-w-sm text-sm leading-relaxed text-panel-200"}
       "Dudas sobre el diagnóstico, sobre los grupos de estudio o sobre cualquier "
       "otra cosa. Responde el profesor, no un formulario automático."]]
     [contacto-form]]

    [:div.grid.grid-cols-1.gap-10.md:grid-cols-3
     ;; Marca (más ancha: el párrafo necesita más espacio del que le daba 1/3)
     [:div.md:col-span-2
      [:div.mb-4.flex.items-center
       [:span.mr-2.text-2xl.text-senal-500 "∫"]
       [:h3.text-xl.font-bold "Academia Integral"]]
      [:p {:class "max-w-md text-sm leading-relaxed text-panel-200"}
       "Preparación de PAES Matemática 1 con diagnóstico adaptativo, plan personalizado "
       "y grupos de estudio por nivel. Un proyecto del profesor Jacobo Córdova. Nace de su "
       "trabajo de grado en Ingeniería Electrónica (UNEXPO, Venezuela, 2010) sobre sistemas "
       "de respuesta en el aula, y se desarrolla desde 2025 en Iquique."]]

     ;; Enlaces
     [:div
      [:h4.mb-4.grabado.text-panel-300 "Explorar"]
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
                    :class "text-panel-200 transition hover:text-white"
                    :on-click handler}
           label]])]]
  ]]

   [:div {:class "border-t border-panel-950"}
    [:div.mx-auto.max-w-7xl.px-4.py-5.sm:px-6.lg:px-8
     [:p {:class "text-center text-sm text-panel-300"}
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
  [:div.flex.min-h-screen.flex-col
   ;; El fondo de página. Antes era el degradado azul→índigo→púrpura que trae
   ;; todo template de Tailwind; ahora es papel cálido en claro y tinta profunda
   ;; en oscuro (ADR-020). Los stops de gradiente no caben en el mapeo global
   ;; porque usan variables --tw-gradient-*, así que van con `dark:` directo.
   ;; La cara del panel (ADR-023). Plana y en gris medio: no es la hoja blanca
   ;; de un documento, es la carcasa de un instrumento. El degradado diagonal
   ;; que había antes era decoración; el gris no lo es — es lo que hace que las
   ;; placas blancas y los controles se lean como piezas montadas encima.
   {:class "bg-panel-300 dark:bg-panel-800"}
   [navigation]
   [:main.flex-1.pt-16  ;; pt-16 compensa la altura del nav fijo
    [main-content-wrapper]]
   [footer]
   ;; Montados una sola vez: el panel de contacto y el diálogo de confirmación
   ;; reaccionan a sus eventos globales sin importar la sección activa.
   ;;
   ;; El botón flotante que abría el panel se quitó (T-71): la caja del footer
   ;; ya cumple esa función y el FAB tapaba contenido en móvil. El panel sigue
   ;; vivo porque **Cupos** lo abre desde "Avisarme cuando haya cupo"
   ;; (`:contacto/abrir-panel`, slots.cljs) — quitarlo rompería ese flujo.
   [contacto-panel]
   [ui/confirm-dialog]])
