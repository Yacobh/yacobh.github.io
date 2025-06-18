(ns universo.components.diagnostic-test
  (:require [reagent.core :as r]
            [re-flow.core :as re-flow]))

;; Estado del componente
(def test-state (r/atom {:current-step :intro
                        :current-question 0
                        :answers {}
                        :started? false}))

;; Preguntas de ejemplo para el diagnóstico
(def sample-questions
  [{:id 1
    :question "¿Cuál es tu nivel actual de programación?"
    :type :multiple-choice
    :options [{:value "beginner" :label "Principiante - Nunca he programado"}
              {:value "basic" :label "Básico - Conozco algunos conceptos"}
              {:value "intermediate" :label "Intermedio - Puedo crear programas simples"}
              {:value "advanced" :label "Avanzado - Tengo experiencia significativa"}]}

   {:id 2
    :question "¿Con qué lenguajes de programación has trabajado?"
    :type :multiple-select
    :options [{:value "javascript" :label "JavaScript"}
              {:value "python" :label "Python"}
              {:value "java" :label "Java"}
              {:value "clojure" :label "Clojure"}
              {:value "none" :label "Ninguno"}]}

   {:id 3
    :question "¿Cuánto tiempo puedes dedicar al estudio por semana?"
    :type :multiple-choice
    :options [{:value "1-3" :label "1-3 horas"}
              {:value "4-7" :label "4-7 horas"}
              {:value "8-15" :label "8-15 horas"}
              {:value "15+" :label "Más de 15 horas"}]}

   {:id 4
    :question "¿Cuál es tu objetivo principal?"
    :type :multiple-choice
    :options [{:value "career-change" :label "Cambio de carrera"}
              {:value "skill-improvement" :label "Mejorar habilidades actuales"}
              {:value "hobby" :label "Aprendizaje como hobby"}
              {:value "academic" :label "Complemento académico"}]}

   {:id 5
    :question "¿Tienes experiencia con bases de datos?"
    :type :multiple-choice
    :options [{:value "none" :label "No tengo experiencia"}
              {:value "basic" :label "Conceptos básicos (SQL básico)"}
              {:value "intermediate" :label "Intermedio (diseño de esquemas)"}
              {:value "advanced" :label "Avanzado (optimización, administración)"}]}])

;; Funciones auxiliares
(defn reset-test! []
  (reset! test-state {:current-step :intro
                     :current-question 0
                     :answers {}
                     :started? false}))

(defn start-test! []
  (swap! test-state assoc :current-step :questions :started? true))

(defn next-question! []
  (let [current (:current-question @test-state)
        total (count sample-questions)]
    (if (>= (inc current) total)
      (swap! test-state assoc :current-step :completed)
      (swap! test-state update :current-question inc))))

(defn save-answer! [question-id answer]
  (swap! test-state assoc-in [:answers question-id] answer))

;; Componentes
(defn intro-component []
  [:div {:class "max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg"}
   [:div {:class "text-center"}
    [:h2 {:class "text-3xl font-bold text-gray-800 mb-6"}
     "Evaluación Diagnóstica Gratuita"]

    [:div {:class "mb-8"}
     [:div {:class "w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"}
      [:svg {:class "w-8 h-8 text-blue-600" :fill "currentColor" :viewBox "0 0 20 20"}
       [:path {:d "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"}]]]

     [:p {:class "text-lg text-gray-600 leading-relaxed"}
      "Esta evaluación nos ayudará a entender tu nivel actual y diseñar un plan de estudios personalizado para ti."]

     [:p {:class "text-sm text-gray-500 mt-4"}
      "📝 5-6 preguntas • ⏱️ Aproximadamente 3 minutos • 🎯 Resultados inmediatos"]]

    [:div {:class "space-y-4"}
     [:button
      {:class "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
       :on-click start-test!}
      "Comenzar Evaluación"]

     [:button
      {:class "text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200"
       :on-click #(reset! test-state {:current-step :closed})}
      "Tal vez más tarde"]]]])

(defn question-component []
  (let [current-idx (:current-question @test-state)
        question (nth sample-questions current-idx)
        progress (* (/ (inc current-idx) (count sample-questions)) 100)]

    [:div {:class "max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg"}
     ;; Barra de progreso
     [:div {:class "mb-8"}
      [:div {:class "flex justify-between text-sm text-gray-600 mb-2"}
       [:span (str "Pregunta " (inc current-idx) " de " (count sample-questions))]
       [:span (str (int progress) "%")]]
      [:div {:class "w-full bg-gray-200 rounded-full h-2"}
       [:div {:class "bg-blue-600 h-2 rounded-full transition-all duration-300"
              :style {:width (str progress "%")}}]]]

     ;; Pregunta
     [:div {:class "mb-8"}
      [:h3 {:class "text-xl font-semibold text-gray-800 mb-6"}
       (:question question)]

      ;; Opciones según el tipo
      (case (:type question)
        :multiple-choice
        [:div {:class "space-y-3"}
         (for [option (:options question)]
           ^{:key (:value option)}
           [:label {:class "flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"}
            [:input {:type "radio"
                    :name (str "question-" (:id question))
                    :value (:value option)
                    :class "mr-3 text-blue-600"
                    :on-change #(save-answer! (:id question) (:value option))}]
            [:span {:class "text-gray-700"} (:label option)]])]

        :multiple-select
        [:div {:class "space-y-3"}
         (for [option (:options question)]
           ^{:key (:value option)}
           [:label {:class "flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"}
            [:input {:type "checkbox"
                    :value (:value option)
                    :class "mr-3 text-blue-600"
                    :on-change #(let [checked (-> % .-target .-checked)
                                     current-answers (get-in @test-state [:answers (:id question)] #{})
                                     new-answers (if checked
                                                  (conj current-answers (:value option))
                                                  (disj current-answers (:value option)))]
                                 (save-answer! (:id question) new-answers))}]
            [:span {:class "text-gray-700"} (:label option)]])])]

     ;; Botones de navegación
     [:div {:class "flex justify-between"}
      [:button
       {:class "px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        :disabled (= current-idx 0)
        :on-click #(swap! test-state update :current-question dec)}
       "← Anterior"]

      [:button
       {:class "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        :disabled (nil? (get-in @test-state [:answers (:id question)]))
        :on-click next-question!}
       (if (= current-idx (dec (count sample-questions)))
         "Finalizar"
         "Siguiente →")]]]))

(defn completion-component []
  [:div {:class "max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg text-center"}
   [:div {:class "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"}
    [:svg {:class "w-8 h-8 text-green-600" :fill "currentColor" :viewBox "0 0 20 20"}
     [:path {:d "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"}]]]

   [:h2 {:class "text-2xl font-bold text-gray-800 mb-4"}
    "¡Evaluación Completada!"]

   [:p {:class "text-gray-600 mb-8"}
    "Gracias por completar la evaluación. Estamos procesando tus respuestas para crear tu plan personalizado."]

   [:div {:class "space-y-4"}
    [:button
     {:class "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
      :on-click #(js/alert "Aquí procesarías los resultados")}
     "Ver Mis Resultados"]

    [:button
     {:class "text-gray-500 hover:text-gray-700 transition-colors"
      :on-click reset-test!}
     "Hacer la evaluación nuevamente"]]])

;; Componente principal
(defn diagnostic-test []
  [:div {:class "py-12 px-4"}
   (case (:current-step @test-state)
     :intro [intro-component]
     :questions [question-component]
     :completed [completion-component]
     :closed nil)])
