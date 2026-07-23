(ns universo.components.diagnostic-test
  (:require [clojure.string :as str]
            [re-frame.core :as re-frame]
            [reagent.core :as r]
            [universo.components.feedback-modal :refer [feedback]]
            [universo.components.irt-chart :as irt-chart]
            [universo.components.math-render :as math]))

;; -------------------------------
;; Helpers de presentación
;; -------------------------------

(def topic-labels
  {"numbers_V1" "Números"
   "enteros"    "Enteros"
   "algebra"    "Álgebra"
   "geometria"  "Geometría"
   "fracciones" "Fracciones"
   "potencias"  "Potencias"})

(defn topic-label
  "Etiqueta legible para un topic de Supabase."
  [topic]
  (or (get topic-labels topic)
      (str/replace (str topic) #"_" " ")))
;; -------------------------------
;; Selección de evaluación (topics)
;; -------------------------------

(defn selection-component []
  (let [topics @(re-frame/subscribe [:test/available-topics])
        loading? @(re-frame/subscribe [:test/topics-loading?])
        error @(re-frame/subscribe [:test/topics-error])]
    [:div {:class "max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg"}
     [:div {:class "text-center mb-8"}
      [:h2 {:class "text-3xl font-bold text-gray-800 mb-3"}
       "Elige una evaluación"]
      [:p {:class "text-gray-600"}
       "Selecciona el tema que quieres practicar. Las opciones se cargan desde el banco de preguntas."]]

     (cond
       loading?
       [:div {:class "text-center py-10"}
        [:div {:class "inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600 mb-4"}]
        [:p {:class "text-gray-600"} "Cargando evaluaciones disponibles..."]]

       error
       [:div {:class "text-center py-8 space-y-4"}
        [:p {:class "text-red-600"} error]
        [:button {:class "bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-5 rounded-lg"
                  :type "button"
                  :on-click #(re-frame/dispatch [:test/load-topics])}
         "Reintentar"]]

       (empty? topics)
       [:div {:class "text-center py-8"}
        [:p {:class "text-gray-600"} "No hay evaluaciones disponibles por ahora."]]

       :else
       [:div {:class "space-y-3"}
        (for [topic topics]
          ^{:key topic}
          [:button
           {:type "button"
            :class "w-full text-left bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 text-indigo-900 font-semibold py-4 px-5 rounded-xl transition flex items-center justify-between"
            :on-click #(re-frame/dispatch [:test/start topic])}
           [:span {:class "text-lg"} (topic-label topic)]
           [:span {:class "text-sm font-normal text-indigo-500"} "Comenzar →"]])])

     [:div {:class "mt-8 text-center"}
      [:button
       {:class "text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200"
        :type "button"
        :on-click #(re-frame/dispatch [:navigate-to :dashboard])}
       "Volver al tablero"]]]))

;; -------------------------------
;; Componente de carga
;; -------------------------------

(defn loading-component []
  [:div {:class "max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg text-center"}
   [:div {:class "inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600 mb-4"}]
   [:p {:class "text-gray-600 text-lg"} "Cargando siguiente pregunta..."]])

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
  (r/with-let [started-at (r/atom nil)
               last-id (r/atom nil)]
    (let [question @(re-frame/subscribe [:test/current-question])
          question-index (count @(re-frame/subscribe [:test/questions]))
          topic @(re-frame/subscribe [:test/topic])
          ;; 🎲 Rotar opciones basado en el ID (0, 1, 2, o 3 posiciones)
          shift (when question (mod (:id question) 4))
          rotated-options (when question
                            (let [opts (:options question)]
                              (concat (drop shift opts) (take shift opts))))]

      ;; Reinicia cronómetro al cambiar de pregunta
      (when (and question (not= @last-id (:id question)))
        (reset! last-id (:id question))
        (reset! started-at (.now js/Date)))

      (if question
        [:div.max-w-2xl.mx-auto.bg-white.rounded-xl.shadow-md.p-8.space-y-6

         ;; 🔹 Título / encabezado
         [:h2.text-2xl.font-bold.text-gray-800.text-center
          (str "Pregunta " question-index)]
         (when topic
           [:p.text-sm.text-indigo-600.text-center
            (topic-label topic)])

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
                            :time-ms (if @started-at
                                       (- (.now js/Date) @started-at)
                                       0)}])}
             (math/latex label)])]

         ;; 🔹 Botón para finalizar test manualmente (opcional)
         [:div.mt-8.text-center
          [:button.bg-gray-200.hover:bg-gray-300.text-gray-700.font-semibold.py-2.px-6.rounded-lg
           {:on-click #(re-frame/dispatch [:test/complete])}
           "Finalizar Test"]]]

        ;; 🔹 Esperando pregunta (fetch en curso)
        [loading-component]))))

;; -------------------------------
;; Resultados finales
;; -------------------------------

(defn results-component []
  (let [answers @(re-frame/subscribe [:test/answers])
        topic @(re-frame/subscribe [:test/topic])
        theta @(re-frame/subscribe [:test/theta])
        points @(re-frame/subscribe [:test/progress-points])
        stop-reason @(re-frame/subscribe [:test/stop-reason])
        total (count answers)
        correct (count (filter :correct? answers))
        score (if (pos? total)
                (Math/round (* (/ correct total) 100))
                0)]

    [:div {:class "max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow"}
     [:div {:class "text-center mb-6"}
      [:h2 {:class "text-2xl font-bold text-gray-800 mb-2"} "Resultados"]
      (when topic
        [:p {:class "text-sm text-indigo-600 mb-2"} (topic-label topic)])
      [:p {:class "text-lg text-gray-700 mb-1"}
       (str "Preguntas correctas: " correct " de " total)]
      [:p {:class "text-xl font-semibold text-blue-600"}
       (str "Puntaje: " score "%")]
      (when (number? theta)
        [:p {:class "text-sm text-stone-600 mt-2 tabular-nums"}
         (str "Nivel estimado (θ): " (.toFixed theta 2))])]

     [:div {:class "mb-8 text-left"}
      [irt-chart/irt-progress-chart points stop-reason]]

     [:div {:class "space-y-3"}
      [:button
       {:class "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
        :type "button"
        :on-click #(re-frame/dispatch [:test/start topic])}
       "Repetir evaluación"]
      [:button
       {:class "w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2 px-4 rounded-lg"
        :type "button"
        :on-click #(re-frame/dispatch [:test/open-selection])}
       "Elegir otra evaluación"]]]))

;; -------------------------------
;; Componente principal
;; -------------------------------

(defn diagnostic-test []
  (let [current-step @(re-frame/subscribe [:test/status])]
    [:div {:class "py-12 px-4"}
     (case current-step
       :select [selection-component]
       :intro [selection-component] ;; compatibilidad: intro redirige a selección
       :questions [question-component]
       :feedback [feedback]
       :completed [completion-component]
       :results [results-component]
       ;; Estado inicial / desconocido → selección
       [selection-component])]))
