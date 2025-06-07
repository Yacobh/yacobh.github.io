(ns universo.components.mathacademy
  (:require [reagent.core :as r]
            [clojure.string :as str]
            [universo.components.improved-math-academy :as improved-math-academy]
            [universo.db.supabase :as supabase]))

(def math-questions
  [{:id 1
    :question "¿Cuál es el resultado de 2x + 5 = 13?"
    :options ["x = 4" "x = 6" "x = 8" "x = 9"]
    :correct 0
    :level "basico"}
   {:id 2
    :question "Si f(x) = 3x² - 2x + 1, ¿cuál es f(2)?"
    :options ["9" "11" "13" "15"]
    :correct 0
    :level "intermedio"}
   {:id 3
    :question "¿Cuál es la derivada de x³ + 2x²?"
    :options ["3x² + 4x" "x² + 4x" "3x² + 2x" "x³ + 4x"]
    :correct 0
    :level "avanzado"}
   {:id 4
    :question "En un triángulo rectángulo, si un cateto mide 3 y la hipotenusa 5, ¿cuál es el otro cateto?"
    :options ["4" "6" "7" "8"]
    :correct 0
    :level "basico"}
   {:id 5
    :question "¿Cuál es el límite de (sin x)/x cuando x tiende a 0?"
    :options ["0" "1" "∞" "No existe"]
    :correct 1
    :level "avanzado"}])

(defn math-academy-component []
  (let [current-section (r/atom :main)
        test-answers (r/atom {})
        test-score (r/atom nil)
        form-data (r/atom {:name "" :email "" :phone "" :class-type "" :level "" :topics ""})
        form-submitted (r/atom false)]

    (letfn [(start-test []
              (reset! current-section :test)
              (reset! test-answers {})
              (reset! test-score nil))

            (show-booking []
              (reset! current-section :booking))

            (show-main []
              (reset! current-section :main))

            (answer-question [question-id answer-index]
              (swap! test-answers assoc question-id answer-index))

            (submit-test []
              (let [correct-count (reduce (fn [acc question]
                                            (if (= (get @test-answers (:id question))
                                                   (:correct question))
                                              (inc acc)
                                              acc))
                                          0 math-questions)
                    percentage (* (/ correct-count (count math-questions)) 100)]
                (reset! test-score {:correct correct-count
                                    :total (count math-questions)
                                    :percentage percentage})
                (reset! current-section :results)))

            (submit-booking [e]
                            (.preventDefault e)
                            (reset! form-submitted true)

                            ;; Mapea los datos del formulario a los campos de la tabla
                            (let [booking-data {:name (:name @form-data)
                                                :email (:email @form-data)
                                                :phone (:phone @form-data)
                                                :message (str "Tipo: " (:class-type @form-data)
                                                              "\nNivel: " (:level @form-data)
                                                              "\nTemas: " (:topics @form-data))}]

                              (js/console.log "Booking data to submit:" booking-data)

                              (-> (supabase/add-guestbook-entry booking-data)
                                  (.then (fn [response]
                                           (js/console.log "Booking submitted successfully: " response)
                                           (reset! form-submitted false)
                                           (reset! current-section :main)
                                           (reset! form-data {:name "" :email "" :phone ""
                                                              :class-type "" :level "" :topics ""})))
                                  (.catch #(do (js/console.error "Error submitting:" %)
                                               (reset! form-submitted false))))))

            (get-recommendation [percentage]
              (cond
                (>= percentage 80) "¡Excelente! Tienes una base sólida. Te recomendamos clases de nivel avanzado para perfeccionar tus habilidades."
                (>= percentage 60) "¡Bien! Tienes conocimientos intermedios. Las clases personalizadas te ayudarán a fortalecer conceptos clave."
                (>= percentage 40) "Tienes una base básica. Te recomendamos comenzar con reforzamiento de conceptos fundamentales."
                :else "No te preocupes, todos comenzamos desde algún lugar. Las clases personalizadas te ayudarán a construir una base sólida."))]

      (fn []
        [:div.container.max-w-4xl.mx-auto.p-4

         ;; Header
         [:header.text-center.mb-8
          [:h1.text-4xl.font-bold.text-blue-900.mb-2 "🧮 MathAcademy Iquique"]
          [:p.text-lg.text-gray-600 "Clases de Matemáticas Personalizadas | Virtual y Presencial"]]

         ;; Main Content
         (case @current-section
           :main

           #_[:div.card.bg-white.rounded-lg.shadow-lg.p-6
              [:h2.text-2xl.font-bold.text-gray-800.mb-4
               [:span.mr-2 "📊"] "Test Diagnóstico"]
              [:p.text-gray-600.mb-6
               "Realiza nuestro test diagnóstico para identificar tus fortalezas y áreas de mejora en matemáticas. Esto nos ayudará a personalizar tu experiencia de aprendizaje."]
              [:button.btn.bg-blue-600.text-white.px-6.py-3.rounded-lg.font-semibold.hover:bg-blue-700.transition-colors
               {:on-click start-test}
               "Comenzar Test"]]

           [:div.card.bg-white.rounded-lg.shadow-lg.p-6
            [:h2.text-2xl.font-bold.text-gray-800.mb-4
             [:span.mr-2 "📅"] "Agendar Clase"]
            [:p.text-gray-600.mb-6
             "Reserva tu clase personalizada conmigo. Disponible tanto virtual como presencial en Iquique. Adaptamos el contenido según tus necesidades específicas."]
            [:button.btn.bg-green-600.text-white.px-6.py-3.rounded-lg.font-semibold.hover:bg-green-700.transition-colors
             {:on-click show-booking}
             "Agendar Ahora"]]

           :test
           [:div (improved-math-academy/improved-math-test)]

           :booking
           [:div.card.bg-white.rounded-lg.shadow-lg.p-6
            [:h2.text-2xl.font-bold.text-gray-800.mb-6
             [:span.mr-2 "📝"] "Agendar tu Clase"]
            [:form {:on-submit submit-booking}
             [:div.grid.md:grid-cols-2.gap-4
              [:div.form-group.mb-4
               [:label.block.text-sm.font-medium.text-gray-700.mb-2 {:for "name"} "Nombre Completo"]
               [:input.form-input.w-full.px-3.py-2.border.border-gray-300.rounded-md.focus:outline-none.focus:ring-2.focus:ring-blue-500
                {:type "text" :id "name" :required true
                 :value (:name @form-data)
                 :on-change #(swap! form-data assoc :name (-> % .-target .-value))}]]

              [:div.form-group.mb-4
               [:label.block.text-sm.font-medium.text-gray-700.mb-2 {:for "email"} "Email"]
               [:input.form-input.w-full.px-3.py-2.border.border-gray-300.rounded-md.focus:outline-none.focus:ring-2.focus:ring-blue-500
                {:type "email" :id "email" :required true
                 :value (:email @form-data)
                 :on-change #(swap! form-data assoc :email (-> % .-target .-value))}]]]

             [:div.grid.md:grid-cols-2.gap-4
              [:div.form-group.mb-4
               [:label.block.text-sm.font-medium.text-gray-700.mb-2 {:for "phone"} "Teléfono"]
               [:input.form-input.w-full.px-3.py-2.border.border-gray-300.rounded-md.focus:outline-none.focus:ring-2.focus:ring-blue-500
                {:type "tel" :id "phone" :required true
                 :value (:phone @form-data)
                 :on-change #(swap! form-data assoc :phone (-> % .-target .-value))}]]

              [:div.form-group.mb-4
               [:label.block.text-sm.font-medium.text-gray-700.mb-2 {:for "class-type"} "Tipo de Clase"]
               [:select.form-select.w-full.px-3.py-2.border.border-gray-300.rounded-md.focus:outline-none.focus:ring-2.focus:ring-blue-500
                {:id "class-type" :required true
                 :value (:class-type @form-data)
                 :on-change #(swap! form-data assoc :class-type (-> % .-target .-value))}
                [:option {:value ""} "Selecciona una opción"]
                [:option {:value "virtual"} "Virtual (Online)"]
                [:option {:value "presencial"} "Presencial (Iquique)"]]]]

             [:div.form-group.mb-4
              [:label.block.text-sm.font-medium.text-gray-700.mb-2 {:for "level"} "Nivel Educativo"]
              [:select.form-select.w-full.px-3.py-2.border.border-gray-300.rounded-md.focus:outline-none.focus:ring-2.focus:ring-blue-500
               {:id "level" :required true
                :value (:level @form-data)
                :on-change #(swap! form-data assoc :level (-> % .-target .-value))}
               [:option {:value ""} "Selecciona tu nivel"]
               [:option {:value "basica"} "Educación Básica"]
               [:option {:value "media"} "Educación Media"]
               [:option {:value "psu"} "Preparación PSU/PAES"]
               [:option {:value "universitario"} "Universitario"]]]

             [:div.form-group.mb-6
              [:label.block.text-sm.font-medium.text-gray-700.mb-2 {:for "topics"} "Temas Específicos (opcional)"]
              [:textarea.form-textarea.w-full.px-3.py-2.border.border-gray-300.rounded-md.focus:outline-none.focus:ring-2.focus:ring-blue-500
               {:id "topics" :rows 3
                :placeholder "Ej: Álgebra, Geometría, Cálculo..."
                :value (:topics @form-data)
                :on-change #(swap! form-data assoc :topics (-> % .-target .-value))}]]

             [:div.text-center
              [:button.btn.bg-green-600.text-white.px-8.py-3.rounded-lg.font-semibold.hover:bg-green-700.transition-colors
               {:type "submit" :disabled @form-submitted}
               (if @form-submitted "Enviando..." "Enviar Solicitud")]
              [:button.btn.bg-gray-500.text-white.px-6.py-3.rounded-lg.font-semibold.hover:bg-gray-600.transition-colors.ml-4
               {:type "button" :on-click show-main}
               "Volver"]]]]

           :results
           [:div.card.bg-white.rounded-lg.shadow-lg.p-6.text-center
            [:h2.text-2xl.font-bold.text-gray-800.mb-6
             [:span.mr-2 "🎉"] "Resultados del Test"]
            (when @test-score
              [:div
               [:div.score.text-6xl.font-bold.text-blue-600.mb-4
                (str (:correct @test-score) "/" (:total @test-score))]
               [:div.text-2xl.font-semibold.mb-6
                (str (int (:percentage @test-score)) "%")]
               [:div.recommendation.bg-blue-50.p-4.rounded-lg.mb-6.text-left
                [:p.text-gray-700 (get-recommendation (:percentage @test-score))]]])
            [:div.space-x-4
             [:button.btn.bg-green-600.text-white.px-6.py-3.rounded-lg.font-semibold.hover:bg-green-700.transition-colors
              {:on-click show-booking}
              "Agendar Clase Personalizada"]
             [:button.btn.bg-gray-500.text-white.px-6.py-3.rounded-lg.font-semibold.hover:bg-gray-600.transition-colors
              {:on-click show-main}
              "Volver al Inicio"]]])]))))
