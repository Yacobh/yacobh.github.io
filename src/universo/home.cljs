(ns universo.home
  (:require [reagent.core :as r]
            [universo.battery :as api]
            [universo.jardin :as jardin]
            [universo.voz :as voz]
            [universo.geo :as geo]
            [universo.ip :as ip]
            [universo.animations :as animations]
            [universo.components.supabase-test :refer [supabase-test]]
            [universo.components.guestbook :as guestbook]
            [universo.components.auth :as auth]

            [universo.components.mathacademy :as mathacademy]
            [universo.components.login :as login]
            [universo.components.diagnostic-test :as diagnostic-test]))

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

     ;; Botones
     [:div.flex.items-center.gap-3
      [:a.bg-indigo-600.text-white.text-sm.px-5.py-2.5.rounded-full.hover:bg-indigo-700.transition.shadow-sm.hover:shadow-md
       ;; Botón de acceso
       {:on-click #(set-section! :login)} ; Cambia a la sección de login
       "Mi Dashboard"]]]]])

(defn practica-paes []
  [:section.bg-gray-100.py-20
   [:div.container.mx-auto.px-4.text-center
    [:h2.text-5xl.font-bold.mb-4 "Practica la PAES"]
    [:p.text-xl.text-gray-600 "Con el test interactivo, se identifican rapidamente cuales son tus puntos debiles, y !se te entrega un resultado diagnostico personalizado totalmente gratis!"]
    [:button.mt-8.bg-blue-600.text-white.px-8.py-3.rounded-lg.hover:bg-blue-700

     {:href "#"
      :on-click #(set-section! :diagnostic-test)} ; Cambia a la sección de test diagnóstico
     "Comenzar test"]]])

(defn guestbook-section []
  [:section.bg-gray-100.py-16
   [:div.container.mx-auto.px-4

    [mathacademy/math-academy-component]]])

(defn footer []
  [:footer.bg-gradient-to-r.from-gray-900.to-gray-800.text-white.mt-auto
   ;; Sección principal
   [:div.container.mx-auto.px-4.py-12
    [:div.grid.grid-cols-1.md:grid-cols-4.gap-8
     ;; Logo y descripción
     [:div.col-span-1.md:col-span-2
      [:div.flex.items-center.mb-4
       [:span.text-2xl.mr-2 "∫"]
       [:h3.text-xl.font-bold "Academia Integral"]]
      [:p.text-gray-400.mb-4
       "Transformando el aprendizaje de las matemáticas con métodos innovadores y personalizados."]]

     ;; Enlaces rápidos
     [:div
      [:h4.text-lg.font-semibold.mb-4 "Enlaces Rápidos"]
      [:ul.space-y-2
       [:li [:a.text-gray-400.hover:text-white.transition {:href "#"
                                                           :on-click #(set-section! :main)} "Inicio"]]
       [:li [:a.text-gray-400.hover:text-white.transition {:href "#"
                                                           :on-click #(set-section! :main)} "Cursos"]]
       [:li [:a.text-gray-400.hover:text-white.transition {:href "#"
                                                           :on-click #(set-section! :main)} "Evaluación"]]
       [:li [:a.text-gray-400.hover:text-white.transition {:href "#"
                                                           :on-click #(set-section! :main)} "Blog"]]]]

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
      [:p "© 2025 Academia Integral. Todos los derechos reservados."]]]]])

;; main content por atomo de reagent
(defn main-content []
  (case @current-section
    :main [practica-paes]
    :login [login/login-form]
    :diagnostic-test [diagnostic-test/diagnostic-test]
    [:div "Sección no encontrada (404)"]))

;; Componente principal (equivalente a Home)

(defn home []
  [:div.flex.min-h-screen.flex-col
   [navigation]
    [:main.flex-1.pt-16  ;; pt-16 para compensar la altura del nav  ;; flex-1 hace que main ocupe todo el espacio disponible
     [main-content]]
   [footer]])
