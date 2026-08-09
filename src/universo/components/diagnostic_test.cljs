(ns universo.components.diagnostic-test
  (:require [re-frame.core :as re-frame]
            [reagent.core :as r]
            [universo.catalog :as catalog]
            [universo.components.feedback-modal :refer [feedback]]
            [universo.components.irt-chart :as irt-chart]
            [universo.components.math-render :as math]
            [universo.components.ui :as ui]
            [universo.profile :as profile]))

;; -------------------------------
;; Helpers de presentación
;; -------------------------------

(defn topic-label
  "Etiqueta legible de un topic, tomando el nombre que el admin configuró en
   test_configs.display_name (T-42) cuando existe. El diccionario estático de
   respaldo vive en universo.catalog junto con la regla de precedencia."
  [topic]
  (let [configs @(re-frame/subscribe [:test/configs])]
    (catalog/topic-label topic (:display_name (get configs topic)))))

;; -------------------------------
;; Selección de evaluación (topics)
;; -------------------------------

(defn selection-component []
  (let [topics @(re-frame/subscribe [:test/available-topics])
        configs @(re-frame/subscribe [:test/configs])
        admin? @(re-frame/subscribe [:auth/admin?])
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
       [ui/loading-block "Cargando evaluaciones disponibles..."]

       error
       [:div {:class "text-center py-8 space-y-4"}
        [:p {:class "text-red-600"} error]
        [:button {:class "bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-5 rounded-lg transition"
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
          (let [draft? (and admin? (not (:active (get configs topic))))]
            [:button
             {:type "button"
              :class "w-full text-left bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 text-indigo-900 font-semibold py-4 px-5 rounded-xl transition flex items-center justify-between"
              :on-click #(re-frame/dispatch [:test/start topic])}
             [:span {:class "flex items-center gap-2 text-lg"}
              (topic-label topic)
              (when draft?
                [:span {:class "rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700"}
                 "Vista previa (borrador)"])]
             [:span {:class "text-sm font-normal text-indigo-500"} "Comenzar →"]]))])

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
  [:div {:class "max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg"}
   [ui/loading-block "Cargando siguiente pregunta..."]])

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
    {:class "w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
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
          scoring? @(re-frame/subscribe [:test/scoring?])
          score-error @(re-frame/subscribe [:test/score-error])
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
         ;; El acierto lo decide el servidor (ADR-015): mientras corrige, las
         ;; alternativas quedan bloqueadas para no registrar dos respuestas.
         [:div.space-y-3.mt-6
          (for [{:keys [value label]} rotated-options]
            ^{:key value}
            [:button.w-full.bg-indigo-50.hover:bg-indigo-100.text-indigo-700.font-medium.py-2.px-4.rounded-lg.transition.disabled:opacity-50.disabled:cursor-wait
             {:disabled scoring?
              :on-click #(re-frame/dispatch
                          [:test/answer
                           {:question-id (:id question)
                            :selected value
                            :time-ms (if @started-at
                                       (- (.now js/Date) @started-at)
                                       0)}])}
             (math/latex label)])]

         (when score-error
           [:div {:role "alert"
                  :class "rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"}
            score-error])

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
        sp @(re-frame/subscribe [:student-profile])
        built (or (:profile sp) {})
        band (or (:theta_band sp) (:theta-band built) (profile/theta-band theta))
        deficits (or (:deficits built) [])
        misconceptions (take 5 (or (:misconceptions built) []))
        total (count answers)
        correct (count (filter :correct? answers))
        score (if (pos? total)
                (Math/round (* (/ correct total) 100))
                0)]

    [:div {:class "max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow space-y-6"}
     [:div {:class "text-center"}
      [:h2 {:class "text-2xl font-bold text-gray-800 mb-2"} "Resultados"]
      (when topic
        [:p {:class "text-sm text-indigo-600 mb-2"} (topic-label topic)])
      [:p {:class "text-lg text-gray-700 mb-1"}
       (str "Preguntas correctas: " correct " de " total)]
      [:p {:class "text-xl font-semibold text-indigo-600"}
       (str "Puntaje: " score "%")]
      (when (number? theta)
        [:p {:class "text-sm text-stone-600 mt-2 tabular-nums"}
         (str "Nivel estimado (θ): " (.toFixed theta 2))])
      [:p {:class "text-sm font-semibold text-indigo-700 mt-1"}
       (str "Banda de cupo: " (profile/band-label band))]]

     [:div {:class "text-left"}
      [irt-chart/irt-progress-chart points stop-reason]]

     (when (seq deficits)
       [:div.text-left.border.border-gray-100.rounded-lg.p-4
        [:h3.font-bold.text-gray-800.mb-2 "Dónde necesitas ayuda"]
        [:ul.space-y-1
         (for [d (take 5 deficits)]
           ^{:key (:module-slug d)}
           [:li.text-sm.text-gray-700
            (str (:module-slug d) ": " (:errors d) "/" (:total d))])]])

     (when (seq misconceptions)
       [:div.text-left.border.border-amber-100.bg-amber-50.rounded-lg.p-4
        [:h3.font-bold.text-gray-800.mb-2 "Ideas a corregir"]
        [:ul.space-y-2
         (for [[i m] (map-indexed vector misconceptions)]
           ^{:key (str i "-" (:question-id m))}
           [:li.text-sm.text-gray-700
            (if (:explanation m)
              (math/latex (:explanation m))
              (str "Opción " (:selected m)))])]])

     [:div {:class "space-y-3"}
      [:button
       {:class "w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg"
        :type "button"
        :on-click #(re-frame/dispatch [:navigate-to :plan])}
       "Ver mi plan"]
      [:button
       {:class "w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
        :type "button"
        :on-click #(re-frame/dispatch [:navigate-to :cupos])}
       "Ver cupos para mi nivel"]
      [:button
       {:class "w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg"
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
  ;; Al montar sin un test en curso hay que cargar el catálogo: se puede llegar
  ;; acá por rutas que solo navegan (el CTA de la landing, el redirect
  ;; post-registro) y sin esto la sección queda mostrando "No hay evaluaciones
  ;; disponibles" para siempre, con el catálogo nunca consultado.
  (r/with-let [_ (when (contains? #{nil :not-started} @(re-frame/subscribe [:test/status]))
                   (re-frame/dispatch [:test/open-selection]))]
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
         [selection-component])])))
