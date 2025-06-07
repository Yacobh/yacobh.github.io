(ns universo.components.improved-math-academy
  (:require [reagent.core :as r]
            [clojure.string :as str]))

(def improved-math-questions
  [{:id 1
    :question "¿Cuál es el resultado de 15 + 27?"
    :options ["40" "42" "43" "45"]
    :correct 1
    :topic "Aritmética Básica"
    :difficulty "básico"}
   {:id 2
    :question "Si x + 5 = 12, ¿cuál es el valor de x?"
    :options ["5" "6" "7" "8"]
    :correct 2
    :topic "Álgebra Básica"
    :difficulty "básico"}
   {:id 3
    :question "¿Cuál es el área de un rectángulo de 8cm × 6cm?"
    :options ["42 cm²" "46 cm²" "48 cm²" "50 cm²"]
    :correct 2
    :topic "Geometría"
    :difficulty "intermedio"}
   {:id 4
    :question "¿Cuál es el resultado de 3² + 4²?"
    :options ["12" "20" "25" "49"]
    :correct 2
    :topic "Potencias"
    :difficulty "intermedio"}
   {:id 5
    :question "Si una pizza se divide en 8 partes iguales y comes 3, ¿qué fracción queda?"
    :options ["3/8" "5/8" "3/5" "5/3"]
    :correct 1
    :topic "Fracciones"
    :difficulty "intermedio"}
   {:id 6
    :question "¿Cuál es la derivada de f(x) = x²?"
    :options ["x" "2x" "x²" "2x²"]
    :correct 1
    :topic "Cálculo"
    :difficulty "avanzado"}
   {:id 7
    :question "Resuelve: 2x - 3 = 7"
    :options ["x = 4" "x = 5" "x = 6" "x = 7"]
    :correct 1
    :topic "Álgebra Básica"
    :difficulty "básico"}
   {:id 8
    :question "¿Cuál es el perímetro de un triángulo con lados 3, 4 y 5 cm?"
    :options ["10 cm" "12 cm" "15 cm" "20 cm"]
    :correct 1
    :topic "Geometría"
    :difficulty "básico"}])

(defn question-card [question question-index selected-answers on-select]
  (let [selected (get @selected-answers (:id question))]
    [:div.question-card.bg-white.border.border-gray-200.rounded-lg.p-6.mb-6.shadow-sm
     [:div.question-header.mb-4
      [:span.question-number.bg-blue-100.text-blue-800.px-3.py-1.rounded-full.text-sm.font-semibold.mr-3
       (str "Pregunta " (inc question-index))]
      [:span.topic-badge.bg-gray-100.text-gray-600.px-2.py-1.rounded.text-xs
       (:topic question)]
      [:span.difficulty-badge.ml-2.px-2.py-1.rounded.text-xs
       {:class (case (:difficulty question)
                 "básico" "bg-green-100 text-green-800"
                 "intermedio" "bg-yellow-100 text-yellow-800"
                 "avanzado" "bg-red-100 text-red-800")}
       (:difficulty question)]]

     [:h3.question-text.text-lg.font-semibold.text-gray-800.mb-4
      (:question question)]

     [:div.options-container.space-y-3
      (for [[opt-index option] (map-indexed vector (:options question))]
        ^{:key (str (:id question) "-" opt-index)}
        [:div.option-card.border.border-gray-200.rounded-lg.p-3.cursor-pointer.transition-all.duration-200.hover:border-blue-300.hover:bg-blue-50
         {:class (if (= selected opt-index)
                   "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                   "")
          :on-click #(on-select (:id question) opt-index)}
         [:div.flex.items-center
          [:div.radio-indicator.w-4.h-4.rounded-full.border-2.mr-3.flex.items-center.justify-center
           {:class (if (= selected opt-index)
                     "border-blue-500 bg-blue-500"
                     "border-gray-300")}
           (when (= selected opt-index)
             [:div.w-2.h-2.bg-white.rounded-full])]
          [:span.text-gray-700.font-medium option]]])]]))

(defn test-progress [answered-count total-count]
  [:div.progress-container.mb-6
   [:div.flex.justify-between.items-center.mb-2
    [:span.text-sm.font-medium.text-gray-700 "Progreso del Test"]
    [:span.text-sm.text-gray-500 (str answered-count "/" total-count " completadas")]]
   [:div.progress-bar.w-full.bg-gray-200.rounded-full.h-2
    [:div.progress-fill.bg-blue-600.h-2.rounded-full.transition-all.duration-300
     {:style {:width (str (* (/ answered-count total-count) 100) "%")}}]]])

(defn test-results [score correct-answers total-questions weak-areas]
  (let [percentage (:percentage score)]
    [:div.results-container.bg-white.rounded-lg.shadow-lg.p-8.text-center
     [:div.score-circle.mx-auto.mb-6.w-32.h-32.rounded-full.flex.items-center.justify-center.text-4xl.font-bold
      {:class (cond
                (>= percentage 80) "bg-green-100 text-green-600"
                (>= percentage 60) "bg-yellow-100 text-yellow-600"
                :else "bg-red-100 text-red-600")}
      (str (int percentage) "%")]

     [:div.score-details.mb-6
      [:h3.text-2xl.font-bold.text-gray-800.mb-2 "Resultados del Test"]
      [:p.text-lg.text-gray-600
       (str "Respondiste correctamente " correct-answers " de " total-questions " preguntas")]]

     [:div.recommendation.bg-gray-50.rounded-lg.p-6.mb-6.text-left
      [:h4.font-semibold.text-gray-800.mb-3 "Recomendación Personalizada:"]
      [:p.text-gray-700.leading-relaxed
       (cond
         (>= percentage 80)
         "¡Excelente! Tienes una base sólida en matemáticas. Podemos enfocarnos en temas avanzados y desafiantes para llevarte al siguiente nivel."

         (>= percentage 60)
         "¡Buen trabajo! Tienes conocimientos intermedios. Podemos reforzar algunas áreas y avanzar gradualmente hacia temas más complejos."

         :else
         "Hay espacio para mejorar, pero ¡no te preocupes! Comenzaremos desde lo básico y construiremos una base sólida paso a paso.")]

      (when (seq weak-areas)
        [:div.mt-4
         [:h5.font-semibold.text-gray-800.mb-2 "Áreas a reforzar:"]
         [:div.flex.flex-wrap.gap-2
          (for [area weak-areas]
            ^{:key area}
            [:span.bg-orange-100.text-orange-800.px-3.py-1.rounded-full.text-sm area])]])]]))

(defn improved-math-test []
  (let [selected-answers (r/atom {})
        test-completed (r/atom false)
        test-score (r/atom nil)]

    (letfn [(select-option [question-id option-index]
              (swap! selected-answers assoc question-id option-index))

            (calculate-results []
              (let [correct-count (reduce (fn [acc question]
                                           (if (= (get @selected-answers (:id question))
                                                 (:correct question))
                                             (inc acc)
                                             acc))
                                         0 improved-math-questions)
                    percentage (* (/ correct-count (count improved-math-questions)) 100)
                    weak-areas (->> improved-math-questions
                                   (filter #(not= (get @selected-answers (:id %))
                                                 (:correct %)))
                                   (map :topic)
                                   distinct
                                   vec)]
                {:correct correct-count
                 :total (count improved-math-questions)
                 :percentage percentage
                 :weak-areas weak-areas}))

            (submit-test []
              (let [answered-count (count @selected-answers)]
                (if (< answered-count (count improved-math-questions))
                  (js/alert "Por favor responde todas las preguntas antes de enviar el test.")
                  (let [results (calculate-results)]
                    (reset! test-score results)
                    (reset! test-completed true)))))

            (restart-test []
              (reset! selected-answers {})
              (reset! test-completed false)
              (reset! test-score nil))]

      (fn []
        (if @test-completed
          ;; Mostrar resultados
          [:div.test-results
           [test-results @test-score (:correct @test-score) (:total @test-score) (:weak-areas @test-score)]
           [:div.text-center.mt-6.space-x-4
            [:button.btn.bg-green-600.text-white.px-6.py-3.rounded-lg.font-semibold.hover:bg-green-700.transition-colors
             {:on-click #(js/console.log "Ir a agendar clase")} ; Aquí conectarías con la función de booking
             "Agendar Clase Personalizada"]
            [:button.btn.bg-gray-500.text-white.px-6.py-3.rounded-lg.font-semibold.hover:bg-gray-600.transition-colors
             {:on-click restart-test}
             "Reiniciar Test"]]]

          ;; Mostrar test
          [:div.test-container
           [:div.test-header.mb-8
            [:h2.text-3xl.font-bold.text-gray-800.mb-4
             [:span.mr-3 "🎯"] "Test Diagnóstico de Matemáticas"]
            [:p.text-gray-600.mb-6
             "Responde todas las preguntas para obtener una evaluación personalizada de tu nivel."]
            [test-progress (count @selected-answers) (count improved-math-questions)]]

           [:div.questions-container
            (for [[index question] (map-indexed vector improved-math-questions)]
              ^{:key (:id question)}
              [question-card question index selected-answers select-option])]

           [:div.test-actions.text-center.mt-8.space-x-4
            [:button.btn.bg-blue-600.text-white.px-8.py-3.rounded-lg.font-semibold.hover:bg-blue-700.transition-colors.disabled:opacity-50.disabled:cursor-not-allowed
             {:on-click submit-test
              :disabled (< (count @selected-answers) (count improved-math-questions))}
             "Enviar Test"]
            [:button.btn.bg-gray-500.text-white.px-6.py-3.rounded-lg.font-semibold.hover:bg-gray-600.transition-colors
             {:on-click restart-test}
             "Reiniciar"]]])))))
