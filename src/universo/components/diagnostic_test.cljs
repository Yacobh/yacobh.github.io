(ns universo.components.diagnostic-test
  (:require [re-frame.core :as re-frame]
            [universo.components.feedback-modal :refer [feedback]]
            [universo.components.math-render :as math]))

;; -------------------------------
;; Componente de introducción
;; -------------------------------

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
     ;; Botón principal
     [:button
      {:class "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
       :on-click #(re-frame/dispatch [:test/question])}
      "Comenzar Evaluación"]

     [:button
      {:class "text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200"
       :on-click #(re-frame/dispatch [:set-section :dashboard])}
      "Tal vez más tarde"]]]])

;; -------------------------------
;; Componente de finalización
;; -------------------------------

(defn completion-component []
  [:div {:class "max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg text-center"}
   [:div {:class "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"}
    [:svg {:class "w-8 h-8 text-green-600" :fill "currentColor" :viewBox "0 0 20 20"}
     [:path {:d "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"}]]]
   [:h2 {:class "text-2xl font-bold text-gray-800 mb-4"} "¡Evaluación Completada!"]
   [:p {:class "text-gray-600 mb-8"} "Gracias por completar la evaluación. Estamos procesando tus respuestas para crear tu plan personalizado."]

   [:button
    {:class "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
     :on-click #(re-frame/dispatch [:test/results])}
    "Ver Mis Resultados"]])

;; -------------------------------
;; Componente de preguntas
;; -------------------------------

(defn question-component []
  (let [question @(re-frame/subscribe [:test/current-question])
        question-index (count @(re-frame/subscribe [:test/questions]))
        ;; 🎲 Rotar opciones basado en el ID (0, 1, 2, o 3 posiciones)
        shift (mod (:id question) 4)
        rotated-options (when question
                         (let [opts (:options question)]
                           (concat (drop shift opts) (take shift opts))))]

    (if question
      [:div.max-w-2xl.mx-auto.bg-white.rounded-xl.shadow-md.p-8.space-y-6

       ;; 🔹 Título / encabezado
       [:h2.text-2xl.font-bold.text-gray-800.text-center
        (str "Pregunta " question-index)]

       ;; 🔹 Texto de la pregunta
       [:p.text-lg.text-gray-700.text-center.mt-4
        (math/latex (:question question))]

       ;; 🔹 Opciones
       [:div.space-y-3.mt-6
        (for [{:keys [value label]} rotated-options]
          ^{:key value}
          [:button.w-full.bg-blue-50.hover:bg-blue-100.text-blue-700.font-medium.py-2.px-4.rounded-lg.transition
           {:on-click #(re-frame/dispatch
                        [:test/answer
                         {:question-id (:id question)
                          :selected value
                          :correct? (= value (:correct-option question))
                          :time-ms 0}])}
           (math/latex label)])]

       ;; 🔹 Botón para finalizar test manualmente (opcional)
       [:div.mt-8.text-center
        [:button.bg-gray-200.hover:bg-gray-300.text-gray-700.font-semibold.py-2.px-6.rounded-lg
         {:on-click #(re-frame/dispatch [:test/complete])}
         "Finalizar Test"]]]

      ;; 🔹 Si no hay pregunta cargada todavía
      [completion-component])))



;; -------------------------------
;; Resultados finales
;; -------------------------------

(defn results-component []
  (let [answers @(re-frame/subscribe [:test/answers])
        questions @(re-frame/subscribe [:test/questions])
        total (count answers)
        correct (count (filter :correct? answers))
        score (if (pos? total)
                (Math/round (* (/ correct total) 100))
                0)]

    [:div {:class "max-w-md mx-auto bg-white p-6 rounded-lg shadow text-center"}
     [:h2 {:class "text-2xl font-bold text-gray-800 mb-4"} "Resultados"]
     [:p {:class "text-lg text-gray-700 mb-2"}
      (str "Preguntas correctas: " correct " de " total)]
     [:p {:class "text-xl font-semibold text-blue-600 mb-6"}
      (str "Puntaje: " score "%")]

     [:button
      {:class "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
       :on-click #(re-frame/dispatch [:test/start])}
      "Repetir evaluación"]]))

;; -------------------------------
;; Componente principal
;; -------------------------------

(defn diagnostic-test []
  (let [current-step @(re-frame/subscribe [:test/status])]
    [:div {:class "py-12 px-4"}
     (case current-step
       :intro [intro-component]
       :questions [question-component]
       :feedback [feedback]
       :completed [completion-component]
       :results [results-component]
       nil)]))
