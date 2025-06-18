(ns universo.home
  (:require [reagent.core :as r]
            [reagent.dom :as rdom]
            [universo.components.mathacademy :as mathacademy]
            [universo.components.diagnostic-test :as diagnostic-test]
            [universo.components.guestbook :refer [guestbook-component]]))

;; Componentes individuales
#_(defn navigation []
  (let [user-logged-in? (r/atom false)]
    (fn []
      [:nav.fixed.top-0.w-full.z-50.bg-gradient-to-r.from-blue-50.to-indigo-50.backdrop-blur-lg.shadow-sm
       [:div.container.mx-auto.px-4.py-3
        [:div.flex.justify-between.items-center
         ;; Logo con integral animada
         [:div.flex.items-center
          [:h1.text-2xl.font-bold.flex.items-center.group
           [:span.bg-gradient-to-r.from-blue-600.to-purple-600.bg-clip-text.text-transparent
            "Academia"]
           [:span.mx-2.text-3xl.font-light.text-transparent.bg-gradient-to-r.from-indigo-600.to-purple-600.bg-clip-text.transform.transition-transform.group-hover:scale-110.group-hover:rotate-12
            "∫"]
           [:span.bg-gradient-to-r.from-purple-600.to-indigo-700.bg-clip-text.text-transparent
            "Integral"]]
          [:span.ml-3.text-sm.text-gray-600 "Prof. Jacobo Córdova"]]

         ;; Navegación y botones
         [:div.flex.items-center.space-x-6
          [:nav.hidden.lg:flex.space-x-6
           [:a.text-gray-700.hover:text-blue-600.font-medium.transition {:href "#"} "Inicio"]
           [:a.text-gray-700.hover:text-blue-600.font-medium.transition {:href "#courses"} "Cursos"]
           [:a.text-gray-700.hover:text-blue-600.font-medium.transition {:href "#methodology"} "Metodología"]]

          [:div.flex.items-center.space-x-3
           [:button.px-5.py-2.5.bg-white.text-blue-600.font-semibold.rounded-lg.shadow-md.border.border-blue-100.hover:shadow-lg.transition-all
            "📊 Test Diagnóstico"]
           [:button.px-5.py-2.5.bg-gradient-to-r.from-indigo-600.to-blue-700.text-white.rounded-lg.font-semibold.shadow-md.hover:shadow-xl.transform.hover:scale-105.transition-all
            "Iniciar Sesión"]]]]]])))
#_(defn navigation []
  (let [user-logged-in? (r/atom false)]
    (fn []
      [:nav.fixed.top-0.w-full.z-50.bg-white.bg-opacity-95.backdrop-blur-lg.shadow-sm
       [:div.container.mx-auto.px-4.py-4
        [:div.flex.justify-between.items-center
         ;; Logo minimalista
         [:div.flex.items-center.space-x-4
          [:h1.text-2xl.tracking-tight.flex.items-center
           [:span.font-light.text-gray-700 "Academia"]
           [:span.mx-2.text-3xl.font-thin.bg-gradient-to-b.from-indigo-500.to-purple-600.bg-clip-text.text-transparent "∫"]
           [:span.font-bold.text-gray-900 "Integral"]]
          [:span.text-sm.text-gray-500 "| Prof. J. Córdova"]]

         ;; Botones y navegación
         [:div.flex.items-center.space-x-6
          [:nav.hidden.lg:flex.space-x-8
           [:a.text-gray-600.hover:text-indigo-600.transition {:href "#"} "Inicio"]
           [:a.text-gray-600.hover:text-indigo-600.transition {:href "#courses"} "Cursos"]
           [:a.text-gray-600.hover:text-indigo-600.transition {:href "#about"} "Nosotros"]]

          [:div.flex.items-center.space-x-3
           [:button.px-5.py-2.text-indigo-600.font-medium.border.border-indigo-200.rounded-lg.hover:bg-indigo-50.transition
            "Test Diagnóstico"]
           [:button.px-5.py-2.bg-indigo-600.text-white.font-medium.rounded-lg.hover:bg-indigo-700.transition.shadow-md
            "Acceder"]]]]]])))
#_(defn navigation []
  (let [user-logged-in? (r/atom false)]
    (fn []
      [:nav.fixed.top-0.w-full.z-50.bg-gradient-to-r.from-blue-50.to-indigo-50.backdrop-blur-lg.shadow-sm
       [:div.container.mx-auto.px-4.py-3
        [:div.flex.justify-between.items-center
         ;; Logo con integral en círculo
         [:div.flex.items-center
          [:h1.text-2xl.font-bold.flex.items-center
           [:span.bg-gradient-to-r.from-blue-600.to-purple-600.bg-clip-text.text-transparent "Academia"]
           [:div.mx-3.relative
            [:div.absolute.inset-0.bg-gradient-to-r.from-blue-400.to-indigo-600.rounded-full.blur.opacity-40]
            [:div.relative.w-10.h-10.bg-gradient-to-r.from-blue-500.to-indigo-600.rounded-full.flex.items-center.justify-center.text-white.text-xl.shadow-lg
             "∫"]]
           [:span.bg-gradient-to-r.from-purple-600.to-indigo-700.bg-clip-text.text-transparent "Integral"]]
          [:div.ml-3.border-l-2.border-gray-300.pl-3
           [:p.text-sm.text-gray-600.font-medium "Prof. Jacobo Córdova"]]]

         ;; Resto del navigation...
         ]]])))
#_(defn navigation []
  (let [user-logged-in? (r/atom false)]
    (fn []
      [:nav.fixed.top-0.w-full.z-50.bg-gradient-to-r.from-blue-50.to-indigo-50.backdrop-blur-lg.shadow-sm
       [:div.container.mx-auto.px-4.py-3
        [:div.flex.justify-between.items-center
         ;; Logo con integral como separador
         [:div.flex.items-center.space-x-3
          [:div
           [:h1.text-2xl.font-bold.flex.items-center
            [:span.bg-gradient-to-r.from-blue-600.to-purple-600.bg-clip-text.text-transparent "Academia"]
            [:span.mx-2.text-3xl.font-light.text-indigo-600 "∫"]
            [:span.bg-gradient-to-r.from-purple-600.to-indigo-700.bg-clip-text.text-transparent "Integral"]]
           [:p.text-sm.text-gray-600.font-medium "Profesor Jacobo Córdova"]]]

         ;; Resto del navigation...
         [:div.flex.items-center.space-x-6
          [:nav.hidden.lg:flex.space-x-6
           [:a.text-gray-700.hover:text-blue-600.font-medium.transition {:href "#"} "Inicio"]
           [:a.text-gray-700.hover:text-blue-600.font-medium.transition {:href "#courses"} "Cursos"]
           [:a.text-gray-700.hover:text-blue-600.font-medium.transition {:href "#methodology"} "Metodología"]]

          [:div.flex.items-center.space-x-3
           [:button.group.relative.px-5.py-2.5.overflow-hidden.rounded-lg.bg-white.text-blue-600.font-semibold.shadow-md.transition-all.hover:shadow-lg
            [:span.relative.z-10 "📊 Test Diagnóstico"]
            [:div.absolute.inset-0.bg-gradient-to-r.from-blue-400.to-indigo-500.opacity-0.group-hover:opacity-10.transition-opacity]]

           [:button.px-5.py-2.5.bg-gradient-to-r.from-indigo-600.to-blue-700.text-white.rounded-lg.font-semibold.shadow-md.hover:shadow-xl.transform.hover:scale-105.transition-all
            "Iniciar Sesión"]]]]]])))
#_(defn navigation []
  (let [user-logged-in? (r/atom false)
        mobile-menu-open? (r/atom false)]
    (fn []
      [:nav.fixed.top-0.w-full.z-50.bg-gradient-to-r.from-blue-50.to-indigo-50.backdrop-blur-lg.shadow-sm
       [:div.container.mx-auto.px-4.py-3
        [:div.flex.justify-between.items-center
         ;; Logo
         [:div.flex.items-center.space-x-2
          [:div.relative
           [:div.absolute.inset-0.bg-gradient-to-r.from-blue-400.to-indigo-600.rounded-xl.blur.opacity-70]
           [:div.relative.bg-gradient-to-r.from-blue-500.to-indigo-600.text-white.w-12.h-12.rounded-xl.flex.items-center.justify-center.font-bold.text-2xl.shadow-lg
            "∫"]]
          [:div
           [:h1.text-xl.font-bold.bg-gradient-to-r.from-blue-600.to-indigo-700.bg-clip-text.text-transparent
            "Academia Integral"]
           [:p.text-xs.text-gray-600 "Profesor Jacobo Córdova"]]]

         ;; Desktop menu
         [:div.hidden.md:flex.items-center.space-x-6
          [:nav.flex.space-x-6
           [:a.text-gray-700.hover:text-blue-600.font-medium.transition {:href "#"} "Inicio"]
           [:a.text-gray-700.hover:text-blue-600.font-medium.transition {:href "#courses"} "Cursos"]
           [:a.text-gray-700.hover:text-blue-600.font-medium.transition {:href "#methodology"} "Metodología"]]

          [:div.flex.items-center.space-x-3
           [:button.px-4.py-2.text-blue-600.border.border-blue-200.rounded-lg.hover:bg-blue-50.transition.font-medium
            "📊 Evaluación"]
           [:button.px-4.py-2.bg-gradient-to-r.from-indigo-600.to-blue-700.text-white.rounded-lg.hover:shadow-lg.transition.font-medium
            "Acceder →"]]]

         ;; Mobile menu button
         [:button.md:hidden.p-2
          {:on-click #(swap! mobile-menu-open? not)}
          [:svg.w-6.h-6 {:fill "none" :stroke "currentColor" :viewBox "0 0 24 24"}
           [:path {:stroke-linecap "round" :stroke-linejoin "round" :stroke-width "2"
                   :d (if @mobile-menu-open?
                        "M6 18L18 6M6 6l12 12"
                        "M4 6h16M4 12h16M4 18h16")}]]]]

        ;; Mobile menu
        (when @mobile-menu-open?
          [:div.md:hidden.mt-4.pb-4
           [:nav.flex.flex-col.space-y-2
            [:a.text-gray-700.hover:text-blue-600.font-medium.py-2 {:href "#"} "Inicio"]
            [:a.text-gray-700.hover:text-blue-600.font-medium.py-2 {:href "#courses"} "Cursos"]
            [:a.text-gray-700.hover:text-blue-600.font-medium.py-2 {:href "#methodology"} "Metodología"]]
           [:div.flex.flex-col.space-y-2.mt-4
            [:button.px-4.py-2.text-blue-600.border.border-blue-200.rounded-lg.font-medium
             "📊 Evaluación Gratuita"]
            [:button.px-4.py-2.bg-gradient-to-r.from-indigo-600.to-blue-700.text-white.rounded-lg.font-medium
             "Acceder →"]]])]])))
#_(defn navigation []
  (let [user-logged-in? (r/atom false)]
    (fn []
      [:nav.fixed.top-0.w-full.z-50.bg-gradient-to-r.from-blue-50.via-purple-50.to-indigo-50.backdrop-blur-lg.shadow-sm
       [:div.container.mx-auto.px-4.py-3
        [:div.flex.justify-between.items-center
         ;; Logo mejorado
         [:div.flex.items-center.space-x-3
          ;; Símbolo integral con efecto
          [:div.relative.group
           [:div.absolute.inset-0.bg-gradient-to-r.from-purple-400.to-indigo-600.rounded-xl.blur.opacity-60.group-hover:opacity-80.transition]
           [:div.relative.bg-gradient-to-r.from-purple-500.to-indigo-600.text-white.w-14.h-14.rounded-xl.flex.items-center.justify-center.shadow-lg
            [:span.text-3xl.font-light "∫"]]]
          [:div
           [:h1.text-2xl.font-bold
            [:span.bg-gradient-to-r.from-purple-600.to-indigo-700.bg-clip-text.text-transparent "Academia "]
            [:span.bg-gradient-to-r.from-indigo-600.to-blue-700.bg-clip-text.text-transparent "Integral"]]
           [:p.text-sm.text-gray-600.font-medium "Prof. Jacobo Córdova • Matemáticas"]]]

         ;; Navegación y botones
         [:div.flex.items-center.space-x-6
          ;; Links de navegación
          [:nav.hidden.lg:flex.space-x-8
           [:a.text-gray-700.hover:text-indigo-600.font-medium.transition.relative.group {:href "#"}
            "Inicio"
            [:div.absolute.bottom-0.left-0.w-0.h-0.5.bg-indigo-600.group-hover:w-full.transition-all]]
           [:a.text-gray-700.hover:text-indigo-600.font-medium.transition.relative.group {:href "#courses"}
            "Cursos"
            [:div.absolute.bottom-0.left-0.w-0.h-0.5.bg-indigo-600.group-hover:w-full.transition-all]]
           [:a.text-gray-700.hover:text-indigo-600.font-medium.transition.relative.group {:href "#about"}
            "Nosotros"
            [:div.absolute.bottom-0.left-0.w-0.h-0.5.bg-indigo-600.group-hover:w-full.transition-all]]]

          ;; Botones CTA mejorados
          [:div.flex.items-center.space-x-3
           ;; Botón de evaluación
           [:button.group.relative.px-5.py-2.5.overflow-hidden.rounded-lg.bg-white.text-indigo-600.font-semibold.shadow-md.transition-all.hover:shadow-xl.border.border-indigo-100
            [:span.relative.z-10.flex.items-center
             [:span.text-lg.mr-2 "📐"]
             "Test Gratuito"]
            [:div.absolute.inset-0.bg-gradient-to-r.from-indigo-50.to-purple-50.opacity-0.group-hover:opacity-100.transition-opacity]]

           ;; Botón de acceso/login
           (if @user-logged-in?
             [:button.px-5.py-2.5.bg-gradient-to-r.from-indigo-600.via-purple-600.to-blue-700.text-white.rounded-lg.font-semibold.shadow-lg.hover:shadow-2xl.transform.hover:scale-105.transition-all.flex.items-center.space-x-2
              [:svg.w-5.h-5 {:fill "none" :stroke "currentColor" :viewBox "0 0 24 24"}
               [:path {:stroke-linecap "round" :stroke-linejoin "round" :stroke-width "2"
                       :d "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"}]]
              [:span "Mi Dashboard"]]
             [:button.px-5.py-2.5.bg-gradient-to-r.from-indigo-600.via-purple-600.to-blue-700.text-white.rounded-lg.font-semibold.shadow-lg.hover:shadow-2xl.transform.hover:scale-105.transition-all.flex.items-center
              [:span "Acceder"]
              [:svg.w-4.h-4.ml-2 {:fill "none" :stroke "currentColor" :viewBox "0 0 24 24"}
               [:path {:stroke-linecap "round" :stroke-linejoin "round" :stroke-width "2"
                       :d "M14 5l7 7m0 0l-7 7m7-7H3"}]]])]]]]])))
#_(defn navigation []
  (let [user-logged-in? (r/atom false)] ; Estado para usuario logueado
    (fn []
      [:nav.fixed.top-0.w-full.z-50.bg-gradient-to-r.from-blue-50.to-indigo-50.backdrop-blur-lg.shadow-sm
       [:div.container.mx-auto.px-4.py-3
        [:div.flex.justify-between.items-center
         ;; Logo con símbolo integral
         [:div.flex.items-center.space-x-2
          [:div.relative
           [:div.absolute.inset-0.bg-gradient-to-r.from-blue-400.to-indigo-600.rounded-xl.blur.opacity-70]
           [:div.relative.bg-gradient-to-r.from-blue-500.to-indigo-600.text-white.w-12.h-12.rounded-xl.flex.items-center.justify-center.font-bold.text-2xl
            "∫"]]
          [:div
           [:h1.text-xl.font-bold.bg-gradient-to-r.from-blue-600.to-indigo-700.bg-clip-text.text-transparent
            "Academia Integral"]
           [:p.text-xs.text-gray-600 "Profesor Jacobo Córdova"]]]

         ;; Menú y botones
         [:div.flex.items-center.space-x-6
          [:nav.hidden.lg:flex.space-x-6
           [:a.text-gray-700.hover:text-blue-600.font-medium.transition {:href "#"} "Inicio"]
           [:a.text-gray-700.hover:text-blue-600.font-medium.transition {:href "#courses"} "Cursos"]
           [:a.text-gray-700.hover:text-blue-600.font-medium.transition {:href "#methodology"} "Metodología"]]

          ;; Botones CTA
          [:div.flex.items-center.space-x-3
           [:button.group.relative.px-5.py-2.5.overflow-hidden.rounded-lg.bg-white.text-blue-600.font-semibold.shadow-md.transition-all.hover:shadow-lg
            [:span.relative.z-10 "📊 Test Diagnóstico"]
            [:div.absolute.inset-0.bg-gradient-to-r.from-blue-400.to-indigo-500.opacity-0.group-hover:opacity-10.transition-opacity]]

           (if @user-logged-in?
             [:button.px-5.py-2.5.bg-gradient-to-r.from-indigo-600.to-blue-700.text-white.rounded-lg.font-semibold.shadow-md.hover:shadow-xl.transform.hover:scale-105.transition-all.flex.items-center.space-x-2
              [:span "Dashboard"]
              [:svg.w-4.h-4 {:fill "none" :stroke "currentColor" :viewBox "0 0 24 24"}
               [:path {:stroke-linecap "round" :stroke-linejoin "round" :stroke-width "2"
                       :d "M13 7l5 5m0 0l-5 5m5-5H6"}]]]
             [:button.px-5.py-2.5.bg-gradient-to-r.from-indigo-600.to-blue-700.text-white.rounded-lg.font-semibold.shadow-md.hover:shadow-xl.transform.hover:scale-105.transition-all
              "Iniciar Sesión"])]]]]])))
;; seccion principal variable con atomo de reagent, dinamico
(defonce current-section (r/atom :main))
(defn set-section! [section]
  (reset! current-section section))

(defn navigation []
  [:nav.fixed.top-0.left-0.right-0.z-50.bg-white.border-b.border-gray-100
   [:div.max-w-7xl.mx-auto.px-4.sm:px-6.lg:px-8
    [:div.flex.justify-between.items-center.h-16
     ;; Logo con vinculo a la sección principal

     [:div.flex.items-center
      ;; Logo con integral animada
      [:a.text-gray-800.font-bold.text-xl.flex.items-center
       {:href "#"
        :on-click #(set-section! :main)} ; Cambia a la sección principal
       [:span.bg-gradient-to-r.from-blue-600.to-purple-600.bg-clip-text.text-transparent "Integral"]
       [:span.mx-2.text-3xl.font-light.text-indigo-600 "∫"]
       [:span.bg-gradient-to-r.from-purple-600.to-indigo-700.bg-clip-text.text-transparent "Academy"]]]
     #_[:a
      {:href #(set-section! :main)}
      [:div.flex.items-center
       [:h1.text-2xl.font-light.tracking-tight
        [:span.font-bold.text-indigo-600 "Integral"]
        [:span.text-gray-800 "Academy"]]
       [:span.ml-2.text-xl.text-gray-500.hidden.sm:inline "|"]
       [:span.ml-2.text-sm.text-gray-500.hidden.sm:inline " Prof. Jacobo Córdova"]]]

     ;; Botones
     [:div.flex.items-center.gap-3
      #_[:a.text-sm.text-gray-600.hover:text-gray-900.px-3.py-2.rounded-md.transition
       {:href "#"
        :on-click #(set-section! :diagnostic-test)} ; Cambia a la sección de test diagnóstico
       "Evaluación Gratuita"]
      [:a.bg-indigo-600.text-white.text-sm.px-5.py-2.5.rounded-full.hover:bg-indigo-700.transition.shadow-sm.hover:shadow-md
       ;; Botón de acceso
       {:on-click #(set-section! :login)} ; Cambia a la sección de login
       "Mi Dashboard"]]]]])
#_(defn navigation []
  [:nav.fixed.top-0.left-0.right-0.z-50.bg-white.backdrop-blur-md.shadow-md
   [:div.container.mx-auto.px-4.py-3
    [:div.flex.justify-between.items-center
     ;; Logo y nombre
     [:div.flex.items-center.space-x-3
      ;; Icono matemático (opcional)
      [:div.w-10.h-10.bg-gradient-to-br.from-blue-600.to-indigo-700.rounded-lg.flex.items-center.justify-center
       [:span.text-white.font-bold.text-xl "π"]]
      [:div
       [:h1.text-xl.font-bold.text-gray-900 "MathAcademia"]
       [:p.text-xs.text-gray-600 "Prof. Jacobo Córdova"]]]

     ;; Navegación central
     [:ul.hidden.md:flex.space-x-8
      [:li [:a.text-gray-700.hover:text-blue-600.transition-colors {:href "#"} "Inicio"]]
      [:li [:a.text-gray-700.hover:text-blue-600.transition-colors {:href "#services"} "Servicios"]]
      [:li [:a.text-gray-700.hover:text-blue-600.transition-colors {:href "#about"} "Nosotros"]]
      [:li [:a.text-gray-700.hover:text-blue-600.transition-colors {:href "#contact"} "Contacto"]]]

     ;; Botones de acción
     [:div.flex.items-center.space-x-4
      [:button.px-4.py-2.text-blue-600.border.border-blue-600.rounded-lg.hover:bg-blue-50.transition-all.duration-200.font-medium
       "Evaluación Gratuita"]
      [:button.px-4.py-2.bg-gradient-to-r.from-blue-600.to-indigo-700.text-white.rounded-lg.hover:shadow-lg.transform.hover:-translate-y-0.5.transition-all.duration-200.font-medium
       "Acceder →"]]]]])

(defn practica-paes []
  [:section.bg-gray-100.py-20
   [:div.container.mx-auto.px-4.text-center
    [:h2.text-5xl.font-bold.mb-4 "Practica la PAES"]
    [:p.text-xl.text-gray-600 "Con el test interactivo, se identifican rapidamente cuales son tus puntos debiles, y !se te entrega un resultado diagnostico personalizado totalmente gratis!"]
    [:button.mt-8.bg-blue-600.text-white.px-8.py-3.rounded-lg.hover:bg-blue-700

     {:href "#"
      :on-click #(set-section! :diagnostic-test)} ; Cambia a la sección de test diagnóstico
     "Comenzar test"]]])

(defn services-section []
  [:section#services.py-16
   [:div.container.mx-auto.px-4
    [:h2.text-4xl.font-bold.text-center.mb-12 "Nuestros Servicios"]
    [:div.grid.grid-cols-1.md:grid-cols-3.gap-8
     [:div.bg-white.p-6.rounded-lg.shadow
      [:h3.text-xl.font-semibold.mb-2 "Servicio 1"]
      [:p.text-gray-600 "Descripción del servicio"]]
     [:div.bg-white.p-6.rounded-lg.shadow
      [:h3.text-xl.font-semibold.mb-2 "Servicio 2"]
      [:p.text-gray-600 "Descripción del servicio"]]
     [:div.bg-white.p-6.rounded-lg.shadow
      [:h3.text-xl.font-semibold.mb-2 "Servicio 3"]
      [:p.text-gray-600 "Descripción del servicio"]]]]])

(defn guestbook-section []
  [:section.bg-gray-100.py-16
   [:div.container.mx-auto.px-4

    [mathacademy/math-academy-component]
    #_#_[:h2.text-4xl.font-bold.text-center.mb-12 "Libro de Visitas"]
    [:div.max-w-2xl.mx-auto
     [:div.bg-white.p-6.rounded-lg.shadow.mb-4
      [:p.italic "\"Excelente servicio!\""]
      [:p.text-sm.text-gray-500.mt-2 "- Cliente Satisfecho"]]
     [:div.bg-white.p-6.rounded-lg.shadow
      [:p.italic "\"Muy recomendado.\""]
      [:p.text-sm.text-gray-500.mt-2 "- Otro Cliente"]]]]])
(defn booking-section []
  #_[:section#booking.py-16
   [:div.container.mx-auto.px-4
    [:h2.text-4xl.font-bold.text-center.mb-12 "Hacer una Reserva"]
    [:form.max-w-md.mx-auto.bg-white.p-8.rounded-lg.shadow
     [:div.mb-4
      [:label.block.text-gray-700.mb-2 "Nombre"]
      [:input.w-full.px-3.py-2.border.rounded {:type "text"}]]
     [:div.mb-4
      [:label.block.text-gray-700.mb-2 "Email"]
      [:input.w-full.px-3.py-2.border.rounded {:type "email"}]]
     [:div.mb-6
      [:label.block.text-gray-700.mb-2 "Fecha"]
      [:input.w-full.px-3.py-2.border.rounded {:type "date"}]]
     [:button.w-full.bg-blue-600.text-white.py-2.rounded.hover:bg-blue-700
      "Reservar"]]]])
(defn footer []
  [:footer.bg-gradient-to-r.from-gray-900.to-gray-800.text-white.mt-auto
   ;; Sección principal
   #_[:div.container.mx-auto.px-4.py-12
    [:div.grid.grid-cols-1.md:grid-cols-4.gap-8
     ;; Logo y descripción
     [:div.col-span-1.md:col-span-2
      [:div.flex.items-center.mb-4
       [:span.text-2xl.mr-2 "∫"]
       [:h3.text-xl.font-bold "Academia Integral"]]
      [:p.text-gray-400.mb-4
       "Transformando el aprendizaje de las matemáticas con métodos innovadores y personalizados."]
      ;; Redes sociales
      [:div.flex.space-x-4
       [:a.text-gray-400.hover:text-white.transition {:href "#"}
        [:svg.w-6.h-6 {:fill "currentColor" :viewBox "0 0 24 24"}
         [:path {:d "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"}]]]
       [:a.text-gray-400.hover:text-white.transition {:href "#"}
        [:svg.w-6.h-6 {:fill "currentColor" :viewBox "0 0 24 24"}
         [:path {:d "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"}]]]]]

     ;; Enlaces rápidos
     [:div
      [:h4.text-lg.font-semibold.mb-4 "Enlaces Rápidos"]
      [:ul.space-y-2
       [:li [:a.text-gray-400.hover:text-white.transition {:href "#"} "Inicio"]]
       [:li [:a.text-gray-400.hover:text-white.transition {:href "#"} "Cursos"]]
       [:li [:a.text-gray-400.hover:text-white.transition {:href "#"} "Evaluación"]]
       [:li [:a.text-gray-400.hover:text-white.transition {:href "#"} "Blog"]]]]

     ;; Contacto
     [:div
      [:h4.text-lg.font-semibold.mb-4 "Contacto"]
      [:ul.space-y-2.text-gray-400
       [:li.flex.items-center
        [:svg.w-5.h-5.mr-2 {:fill "none" :stroke "currentColor" :viewBox "0 0 24 24"}
         [:path {:stroke-linecap "round" :stroke-linejoin "round" :stroke-width "2"
                 :d "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"}]]
        "contacto@academiaintegral.com"]
       [:li.flex.items-center
        [:svg.w-5.h-5.mr-2 {:fill "none" :stroke "currentColor" :viewBox "0 0 24 24"}
         [:path {:stroke-linecap "round" :stroke-linejoin "round" :stroke-width "2"
                 :d "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"}]]
        "+52 123 456 7890"]
       [:li.flex.items-start
        [:svg.w-5.h-5.mr-2.mt-1 {:fill "none" :stroke "currentColor" :viewBox "0 0 24 24"}
         [:path {:stroke-linecap "round" :stroke-linejoin "round" :stroke-width "2"
                 :d "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"}]
         [:path {:stroke-linecap "round" :stroke-linejoin "round" :stroke-width "2"
                 :d "M15 11a3 3 0 11-6 0 3 3 0 016 0z"}]]
        "Ciudad de México, México"]]]]]

   ;; Barra inferior
   [:div.border-t.border-gray-700
    [:div.container.mx-auto.px-4.py-4
     [:div.flex.flex-col.md:flex-row.justify-between.items-center.text-sm.text-gray-400
      [:p "© 2025 Academia Integral. Todos los derechos reservados."]
      #_[:div.flex.space-x-4.mt-2.md:mt-0
       [:a.hover:text-white.transition {:href "#"} "Privacidad"]
       [:a.hover:text-white.transition {:href "#"} "Términos"]
       [:a.hover:text-white.transition {:href "#"} "Cookies"]]]]]])
#_(defn footer []
  [:footer.bg-gray-800.text-white.py-8.mt-auto
   [:div.container.mx-auto.px-4.text-center
    [:p "© 2024 Academia Integral. Todos los derechos reservados."]]])

(def learning-flow
  [{:name :welcome
    :section [practica-paes]
    :transition {:re-flow.transition/default :diagnostic}}
   {:name :diagnostic
    :section [services-section]
    :transition {:re-flow.transition/default :question}}
   {:name :question
    :section [:main.flex-1 [diagnostic-test/diagnostic-test]]
    :transition {:re-flow.transition/default :welcome}
    }])

#_(defn learning []
  (let [state (re-flow/sub-flow-state)]
    (fn []
      [:div
       ;; State here is one of the maps defined in ping-pong-flow, so we'll
       ;; just pull out the name to display
       [:div.flex.min-h-screen.flex-col
        [navigation]
        [:main.flex-1.pt-16  ;; pt-16 para compensar la altura del nav  ;; flex-1 hace que main ocupe todo el espacio disponible
         (:section @state)
         [:p (:name @state)]
         [:button {:on-click #(re-flow/transition)} "Transition!"]
         #_[main-content]]
        [footer]]
       ;; If we click the button, we want the flow to transition from one
       ;; state to the next. We can accomplish that by calling the transition
       ;; function. You will normally provide transition data to go along with
       ;; this call, and you can provide a flow-name as well.
       ;;
       ;; If you are using a named flow, you have to provide some transition
       ;; data, but nil is a perfectly valid value to pass. In fact, that is
       ;; what is happening here.
       ])))

;; main content por atomo de reagent
(defn main-content []
  (case @current-section
    :main [:div
           [practica-paes]
           [services-section]
           [guestbook-section]
           [booking-section]]
    :login [:main.flex-1 [mathacademy/math-academy-component]]
    :diagnostic-test [:main.flex-1 [diagnostic-test/diagnostic-test]]
    [:div "Sección no encontrada (404)"]))

;; Componente principal (equivalente a Home)

(defn home []
  [:div.flex.min-h-screen.flex-col
   [navigation]
    [:main.flex-1.pt-16  ;; pt-16 para compensar la altura del nav  ;; flex-1 hace que main ocupe todo el espacio disponible
     [main-content]]
   [footer]])



#_(defn app []
  ;; Site = flex min-h-screen flex-col
  [:div.flex.min-h-screen.flex-col

   ;; Header
   [navigation]

   ;; Site-content = flex-1 (esto es flex-grow: 1)
   [:main.flex-1
    [practica-paes]
    [services-section]
    [guestbook-section]
    [booking-section]]

   ;; Footer
   [footer]])
