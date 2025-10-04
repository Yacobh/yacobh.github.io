(ns universo.components.diagnostic-test
  (:require [reagent.core :as r]
            [cljs.core.async :refer [go <!]]
            [universo.db.crud :as db]
            [re-frame.core :as re-frame]
            [universo.components.math-render :as math]
            [universo.db.crud :as crud]))

(defn get-questions! []
  (go
    (let [result (<! (db/get-all-table "questions"))]
      (if (:success result)
        (do
          (js/console.log "Questions loaded")
          (let [data (:data result)]
            (when data
              (js/console.log "Questions updated " (clj->js data))
              (re-frame/dispatch [:set-questions (take 5 data)]))))
        (js/console.error "❌ Error getting questions:" result)))))


;; Estado del componente
(def test-state (r/atom {:current-step :intro
                        :current-question 0
                         :selected nil
                        :answers {}
                        :started? false}))

;; Funciones auxiliares
(defn reset-test! []
  (reset! test-state {:current-step :intro
                     :current-question 0
                     :answers {}
                     :started? false}))

(defn start-test! []
  (swap! test-state assoc :current-step :questions :started? true))

;; Componentes
(defn intro-component []
  (get-questions!) ;maybe not so good idea
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
       :on-click #(re-frame/dispatch [:set-section :dashboard])}
      "Tal vez más tarde"]]]])

(defn normalize-question [q qid]
  {:id (:id q)
   :question (:question q)
   :options [{:value "A" :label (:option_a q)}
             {:value "B" :label (:option_b q)}
             {:value "C" :label (:option_c q)}
             {:value "D" :label (:option_d q)}]
   :correct-option (:correct_option q)
   :errors {:A (:error_a q)
            :B (:error_b q)
            :C (:error_c q)
            :D (:error_d q)}
   :difficulty (:difficulty q)
   :position qid})

(defn question-component []
  (let [qid @(re-frame/subscribe [:current-question])
        questions @(re-frame/subscribe [:questions])
        selected-option @(re-frame/subscribe [:current-question-selected-option])
        last-idx (dec (count questions))
        q (when (and questions (<= 0 qid last-idx))
            (normalize-question (nth questions qid) qid))]
    (when q
      [:div {:class "max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg"}
       [:h3 {:class "text-xl font-semibold text-gray-800 mb-6"} [math/inline-math  (:question q)]]
       [:div {:class "space-y-3"}
        (for [opt (:options q)]
          (let [input-id (str "q-" (:id q) "-" (:value opt))]
            [:div {:key (:value opt)}
             [:input {:type "radio"
                      :id input-id
                      :name (str "q-" (:id q))
                      :class "mr-3 text-blue-600"
                      :value (:value opt)
                      :on-change #(re-frame/dispatch
                                   [:test/answer {:question-id (:id q)
                                                  :selected (:value opt)
                                                  :correct? (= (:value opt) (:correct-option q))
                                                  :time-ms 0
                                                  :error ((keyword (:value opt)) (:errors q))
                                                  :difficulty (:difficulty q)}])
                      :checked (= (:value opt) selected-option)}]
             [:label {:for input-id} (:label opt)]]))]
       ;; Navegación con app-db
       [:div {:class "flex justify-between mt-6"}
        [:button
         {:class "px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
          :disabled (= qid 0)
          :on-click #(re-frame/dispatch [:test/prev])}
         "← Anterior"]
        [:button
         {:class "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
          :disabled (nil? selected-option)
          :on-click  #(if (= qid last-idx)
                        (do (re-frame/dispatch [:test/finish])
                            (swap! test-state assoc :current-step :completed))
                        (re-frame/dispatch [:test/next]))}
         (if (= qid last-idx) "Finalizar" "Siguiente →")]]])))

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
      :on-click #(swap! test-state assoc :current-step :results)}
     "Ver Mis Resultados"]

    #_[:button
     {:class "text-gray-500 hover:text-gray-700 transition-colors"
      :on-click reset-test!}
     "Hacer la evaluación nuevamente"]]])

(defn results-component []
  (let [test @(re-frame/subscribe [:test])
        responses (take 5 (:responses test))
        traits (:traits test)
        score (:score test)
        email-user @(re-frame/subscribe [:visitor-email])]
    (crud/insert-data-table! {:test test :email-user email-user}  "tests")
    [:div {:class "max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg"}
     [:h2 {:class "text-2xl font-bold text-gray-800 mb-6"}
      "📊 Resultados de tu Evaluación"]

     ;; Puntaje global
     [:div {:class "mb-6"}
      [:p {:class "text-xl font-semibold text-blue-600"} (str "Puntaje: " score)]
      [:p {:class "text-gray-600"} "Este puntaje se calcula en base a tus respuestas y dificultad de cada pregunta."]]

     ;; Perfil psicométrico
     [:div {:class "mb-6"}
      [:h3 {:class "text-lg font-bold text-gray-700 mb-2"} "Tu Perfil de Aprendizaje"]
      [:ul {:class "space-y-1 text-gray-600"}
       (for [[trait val] traits]
         ^{:key trait}
         [:li (str (name trait) ": " (js/Math.round (* 100 val)) "%")])]]

     ;; Respuestas
     [:div
      [:h3 {:class "text-lg font-bold text-gray-700 mb-2"} "Tus respuestas"]
      [:ul {:class "divide-y divide-gray-200"}
       (js/console.log  "responses " responses)
       (for [{:keys [question question-id selected correct? time-ms error]} responses]
         ^{:key question-id}
         [:li {:class "py-2 flex justify-between"}
          [:span (str "Pregunta " question " → " error)]
          [:span {:class (if correct? "text-green-600" "text-red-600")}
           (if correct? "✔ Correcta" "✘ Incorrecta")]])]]]))


;; Componente principal
(defn diagnostic-test []
  [:div {:class "py-12 px-4"}
   (case (:current-step @test-state)
     :intro [intro-component]
     :questions [question-component]
     :completed [completion-component]
     :results [results-component]
     :closed nil)])
