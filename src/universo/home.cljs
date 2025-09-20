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
            [re-frame.core :as re-frame]
            [universo.components.mathacademy :as mathacademy]
            [universo.components.login :as login]
            [universo.components.diagnostic-test :as diagnostic-test]))

;; seccion principal variable con atomo de reagent, dinamico


(defn navigation []
  [:nav.fixed.top-0.left-0.right-0.z-50.bg-white.border-b.border-gray-100
   [:div.max-w-7xl.mx-auto.px-4.sm:px-6.lg:px-8
    [:div.flex.justify-between.items-center.h-16
     ;; Logo con vinculo a la sección principal

     [:div.flex.items-center
      ;; Logo con integral animada
      [:a.text-gray-800.font-bold.text-xl.flex.items-center
       {:href "#"
        :on-click #(re-frame/dispatch [:set-section :main])} ; Cambia a la sección principal
       [:span.bg-gradient-to-r.from-blue-600.to-purple-600.bg-clip-text.text-transparent "Academia"]
       [:span.mx-2.text-3xl.font-light.text-indigo-600 "∫"]
       [:span.bg-gradient-to-r.from-purple-600.to-indigo-700.bg-clip-text.text-transparent "Integral"]]]

     ;; Botones
     [:div.flex.items-center.gap-3
      [:a.bg-indigo-600.text-white.text-sm.px-5.py-2.5.rounded-full.hover:bg-indigo-700.transition.shadow-sm.hover:shadow-md
       ;; Botón de acceso
       {:on-click #(re-frame/dispatch [:set-section :login])} ; Cambia a la sección de login
       "Mi Dashboard"]]]]])

(defn presentacion []
  [:section.bg-gray-100.py-20
   [:div.container.mx-auto.px-4.text-center
    [:h2.text-3xl.font-bold.mb-4 "Hola soy el profesor Jacobo Córdova"]
    [:p.text-xl.text-gray-600 "Bienvenido a mi portal Web "]
    [:p.text-xl.text-gray-600 "Ofrezco cursos de matemática, adaptados a perfiles de estudiantes"]
    [:p.text-xl.text-gray-600 "Te invito a que realices el test interactivo, que podrá perfilar cuál es tu nivel matemático, indicándote cuáles son los temas que necesitas
                               abordar. Se identifican rápidamente tus puntos débiles y ¡se te entrega un resultado diagnóstico personalizado totalmente gratis!"]
    [:p.text-xl.text-gray-600 "Actualmente cuento con un test de Álgebra, dentro del temario de la PAES"]
    [:p.text-xl.text-gray-600 "Para entregarte el resultado del test necesitaré que me dejes un correo electrónico"]

    ;; Aquí está el input funcional
    #_[:input.border.rounded-lg.p-2.w-full
     {:type "email"
      :placeholder "Tu correo electrónico"
      :required true
      :value @(re-frame/subscribe [:visitor-email])
      :on-change #(re-frame/dispatch [:set-visitor-email (.. % -target -value)])}]

    ;; Botón para iniciar test
    #_[:button.mt-8.bg-blue-600.text-white.px-8.py-3.rounded-lg.hover:bg-blue-700
     {:on-click #(re-frame/dispatch [:set-section :login])}
     "Iniciar Sesión"]]])


#_(defn practica-paes []
  [:section.bg-gray-100.py-20
   [:div.container.mx-auto.px-4.text-center
    [:h2.text-5xl.font-bold.mb-4 "Practica la PAES ooo"]
    [:p.text-xl.text-gray-600 "Con el test interactivo, se identifican rapidamente cuales son tus puntos debiles, y !se te entrega un resultado diagnostico personalizado totalmente gratis!"]
    [:button.mt-8.bg-blue-600.text-white.px-8.py-3.rounded-lg.hover:bg-blue-700

     {:href "#"
      :on-click #(re-frame/dispatch [:set-section :diagnostic-test])} ; Cambia a la sección de test diagnóstico
     "Comenzar test"]]])

#_(defn guestbook-section []
  [:section.bg-gray-100.py-16
   [:div.container.mx-auto.px-4

    [mathacademy/math-academy-component]]])

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

     ;; Enlaces rápidos
     #_[:div
      [:h4.text-lg.font-semibold.mb-4 "Enlaces Rápidos"]
      [:ul.space-y-2
       [:li [:a.text-gray-400.hover:text-white.transition {:href "#"
                                                           :on-click #(re-frame/dispatch [:set-section :main])} "Inicio"]]
       [:li [:a.text-gray-400.hover:text-white.transition {:href "#"
                                                           :on-click #(re-frame/dispatch [:set-section :main])} "Cursos"]]
       [:li [:a.text-gray-400.hover:text-white.transition {:href "#"
                                                           :on-click #(re-frame/dispatch [:set-section :main])} "Evaluación"]]
       [:li [:a.text-gray-400.hover:text-white.transition {:href "#"
                                                           :on-click #(re-frame/dispatch [:set-section :main])} "Blog"]]]]

     ;; Contacto
     [:div
      [:h4.text-lg.font-semibold.mb-4 "Contacto"]
      [:ul.space-y-2.text-gray-400
       [:li.flex.items-center
        [:svg.w-5.h-5.mr-2 {:fill "none" :stroke "currentColor" :viewBox "0 0 24 24"}
         [:path {:stroke-linecap "round" :stroke-linejoin "round" :stroke-width "2"
                 :d "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"}]]
        "jacobocordova@gmail.com"]
       [:li.flex.items-center
        [:svg.w-5.h-5.mr-2 {:fill "none" :stroke "currentColor" :viewBox "0 0 24 24"}
         [:path {:stroke-linecap "round" :stroke-linejoin "round" :stroke-width "2"
                 :d "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"}]]
        "+56 9 28789476"]
       [:li.flex.items-start
        [:svg.w-5.h-5.mr-2.mt-1 {:fill "none" :stroke "currentColor" :viewBox "0 0 24 24"}
         [:path {:stroke-linecap "round" :stroke-linejoin "round" :stroke-width "2"
                 :d "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"}]
         [:path {:stroke-linecap "round" :stroke-linejoin "round" :stroke-width "2"
                 :d "M15 11a3 3 0 11-6 0 3 3 0 016 0z"}]]
        "Iquique, Chile"]]]]]

   ;; Barra inferior
   [:div.border-t.border-gray-700
    [:div.container.mx-auto.px-4.py-4
     [:div.flex.flex-col.md:flex-row.justify-between.items-center.text-sm.text-gray-400
      [:p "© 2025 Academia Integral. Todos los derechos reservados."]]]]])

;; main content por atomo de reagent
(defn main-content []
  (let [current-section @(re-frame/subscribe [:current-section])
        _ (js/console.log "Current section:" current-section)
        visitor-email @(re-frame/subscribe [:visitor-email])]  ;; Para depuración

    (case current-section
      :main [presentacion] #_[practica-paes]
      :login (if visitor-email
               [diagnostic-test/diagnostic-test]
               [login/login-form])
      :diagnostic-test [diagnostic-test/diagnostic-test]
      :dashboard [diagnostic-test/diagnostic-test]
      [:div "Sección no encontrada (404)"])))


;; Componente principal (equivalente a Home)

(defn home []
  [:div.flex.min-h-screen.flex-col.bg-gray-100
   [navigation]
    [:main.flex-1.pt-16  ;; pt-16 para compensar la altura del nav  ;; flex-1 hace que main ocupe todo el espacio disponible
     [main-content]]
   [footer]])
