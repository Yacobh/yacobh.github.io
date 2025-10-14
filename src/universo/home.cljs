(ns universo.home
  (:require [universo.components.contacto :refer [contacto-form]]
            [re-frame.core :as re-frame]
            [universo.components.login :as login]
            [universo.components.diagnostic-test :as diagnostic-test]
            [universo.components.dashboard :as dashboard]))

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
      (if @(re-frame/subscribe [:visitor-email])
        [:a.bg-indigo-600.text-white.text-sm.px-5.py-2.5.rounded-full.hover:bg-indigo-700.transition.shadow-sm.hover:shadow-md
         ;; Botón de acceso
         {:on-click #(re-frame/dispatch [:set-section :dashboard])} ; Cambia a la sección de login
         "Mi tablero"]
        [:a.bg-indigo-600.text-white.text-sm.px-5.py-2.5.rounded-full.hover:bg-indigo-700.transition.shadow-sm.hover:shadow-md
         ;; Botón de acceso
         {:on-click #(re-frame/dispatch [:set-section :login])} ; Cambia a la sección de login
         "Iniciar Sesión"])]]]])


(defn presentacion []
    [:div {:class "flex justify-center bg-gray-600 py-8"}
     [:div {:class "max-w-3xl p-8 text-left font-serif leading-relaxed text-gray-800 shadow-lg bg-white rounded-2xl"}

      [:h1 {:class "text-3xl font-bold text-blue-900 mb-4"}
       "Portal de tutorías matemáticas"]
      [:p "En esta aplicación podras practicar los contenidos de la Prueba de Admisión a la Educación Superior (PAES)."]

      [:p "A traves de una serie de evaluaciones que te indicaran cuales son los contenidos que necesitas reforzar."]
      [:p "Esta web es parte de un programa de la Universidad Nacional Arturo Prat, en conjunto con el profesor Jacobo Cordova."]

      [:p "Para ingresar al tablero necesitará un usuario y contraseña."]

      [:p "Al ingresar al tablero tendrás un resumen de tus evaluaciones y podrás acceder a tu evaluación diagnóstica."]

      [:p "La evaluación diagnóstica está enfocada en contenidos granulares y progresivos del pensum de la prueba de Matemática 1."]
      [:p "La evaluación funciona en base a niveles de aprendizaje, comenzando con un nivel de 0"]

      [:p "Durante la evaluación no se debe usar calculadora, o ayudas externas."]
      [:p "El tiempo utilizado para respoder es un elemento que se toma en cuenta."]
      [:p {:class "italic text-blue-700 font-semibold"}
       "Esperamos que esta herramienta sea de mucha ayuda en tu proceso para la práctica de la PAES"]]])



#_(defn presentacion []
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

     ;; Contacto
     [:div
      [:h4.text-lg.font-semibold.mb-4 "Contacto"]
      [contacto-form]]]]

   ;; Barra inferior
   [:div.border-t.border-gray-700
    [:div.container.mx-auto.px-4.py-4
     [:div.flex.flex-col.md:flex-row.justify-between.items-center.text-sm.text-gray-400
      [:p "© 2025 Academia Integral. Todos los derechos reservados."]]]]])

;; main content por atomo de reagent
(defn main-content []
  (let [current-section @(re-frame/subscribe [:current-section])
        _ (js/console.log "Current section:" current-section)]

    (case current-section
      :main [presentacion]
      :login [login/login-form]
      :diagnostic-test [diagnostic-test/diagnostic-test]
      :dashboard [dashboard/dashboard]
      [:div "Sección no encontrada (404)"])))


;; Componente principal (equivalente a Home)

(defn home []
  [:div.flex.min-h-screen.flex-col.bg-gray-100
   [navigation]
   [:main.flex-1.pt-16  ;; pt-16 para compensar la altura del nav  ;; flex-1 hace que main ocupe todo el espacio disponible
    [main-content]]
   [footer]])
