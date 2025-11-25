(ns universo.components.feedback-modal
  (:require
   [re-frame.core :as re-frame]
   [universo.components.math-render :as math]))

;; ============================================================================
;; ICONOS REUTILIZABLES
;; ============================================================================

(defn icon-check []
  [:svg {:class "w-4 h-4 text-white" :fill "currentColor" :viewBox "0 0 20 20"}
   [:path {:d "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"}]])

(defn icon-cross []
  [:svg {:class "w-4 h-4 text-white" :fill "currentColor" :viewBox "0 0 20 20"}
   [:path {:d "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"}]])

(defn icon-warning []
  [:svg {:class "w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" :fill "currentColor" :viewBox "0 0 20 20"}
   [:path {:d "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"}]])

(defn icon-close-button []
  [:svg {:class "w-5 h-5 sm:w-6 sm:h-6" :fill "none" :viewBox "0 0 24 24" :stroke "currentColor"}
   [:path {:stroke-linecap "round" :stroke-linejoin "round" :stroke-width "2"
           :d "M6 18L18 6M6 6l12 12"}]])

(defn icon-check-stroke []
  [:svg {:class "w-6 h-6 sm:w-7 sm:h-7" :fill "none" :viewBox "0 0 24 24" :stroke "currentColor"}
   [:path {:stroke-linecap "round" :stroke-linejoin "round" :stroke-width "3"
           :d "M5 13l4 4L19 7"}]])

(defn icon-cross-stroke []
  [:svg {:class "w-6 h-6 sm:w-7 sm:h-7" :fill "none" :viewBox "0 0 24 24" :stroke "currentColor"}
   [:path {:stroke-linecap "round" :stroke-linejoin "round" :stroke-width "3"
           :d "M6 18L18 6M6 6l12 12"}]])

;; ============================================================================
;; COMPONENTES DE ESTADO
;; ============================================================================

(defn status-badge [is-correct?]
  [:div {:class (str "flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full animate-pulse "
                     (if is-correct? "bg-green-100" "bg-red-100"))}
   (if is-correct?
     [icon-check-stroke]
     [icon-cross-stroke])])

(defn status-title [is-correct?]
  [:h2 {:class (str "text-xl sm:text-2xl font-bold tracking-tight "
                    (if is-correct? "text-green-700" "text-red-700"))}
   (if is-correct? "¡Correcto!" "Incorrecto")])

(defn close-button []
  [:button {:class "text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            :aria-label "Cerrar modal"
            :on-click #(re-frame/dispatch [:test/question])}
   [icon-close-button]])

;; ============================================================================
;; HEADER
;; ============================================================================

(defn modal-header [is-correct?]
  [:div {:class "flex items-center justify-between mb-6 sm:mb-8 gap-4"}
   [:div {:class "flex items-center gap-2 sm:gap-4 min-w-0"}
    [status-badge is-correct?]
    [status-title is-correct?]]
   [close-button]])

;; ============================================================================
;; PREGUNTA
;; ============================================================================

(defn question-section [question]
  [:div {:class "mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 shadow-sm"}
   [:h3 {:class "text-xs sm:text-sm font-semibold text-blue-700 mb-2 sm:mb-3 uppercase tracking-wide"}
    "Pregunta"]
   [:div {:class "text-base sm:text-lg text-gray-800 leading-relaxed overflow-x-auto"}
    [math/latex (:question question)]]])

;; ============================================================================
;; INDICADOR DE OPCIÓN (Check, Cross, Empty)
;; ============================================================================

(defn option-indicator [value selected correct]
  (let [is-selected? (= value selected)
        is-correct-answer? (= value correct)]
    [:div {:class "flex-shrink-0"}
     (cond
       (and is-selected? is-correct-answer?)
       [:div {:class "w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500 flex items-center justify-center"}
        [icon-check]]

       (and is-selected? (not is-correct-answer?))
       [:div {:class "w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-500 flex items-center justify-center"}
        [icon-cross]]

       is-correct-answer?
       [:div {:class "w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500 flex items-center justify-center"}
        [icon-check]]

       :else
       [:div {:class "w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-gray-300"}])]))

;; ============================================================================
;; BADGE DE RESPUESTA SELECCIONADA
;; ============================================================================

(defn selected-badge [value selected correct]
  (when (= value selected)
    [:span {:class (str "ml-2 relative -translate-y-[2px] inline-block px-2 py-1 rounded-full text-xs font-semibold align-middle "
                        (if (= value correct)
                          "bg-green-500 text-white"
                          "bg-red-500 text-white"))}
     (if (= value correct) "Tu respuesta ✓" "Tu respuesta")]))

;; ============================================================================
;; CLASES DINÁMICAS PARA OPCIONES
;; ============================================================================

(defn option-classes [value selected correct]
  (let [is-selected? (= value selected)
        is-correct-answer? (= value correct)]
    (str "relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl text-base sm:text-lg border-2 transition-all duration-200 "
         (cond
           (and is-selected? is-correct-answer?)
           "bg-green-50 border-green-300 text-green-800 shadow-md transform scale-[1.02] hover:scale-[1.03]"

           (and is-selected? (not is-correct-answer?))
           "bg-red-50 border-red-300 text-red-800 shadow-md"

           is-correct-answer?
           "bg-green-50 border-green-300 text-green-700 shadow-sm hover:shadow-md"

           :else
           "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:shadow-sm"))))

;; ============================================================================
;; ITEM DE OPCIÓN
;; ============================================================================

(defn option-item [value selected correct label]
  [:div {:class (option-classes value selected correct)}
   [option-indicator value selected correct]
   [:div {:class "flex-1 leading-relaxed min-w-0 overflow-x-auto"}
    [math/latex label] [selected-badge value selected correct]]])

;; ============================================================================
;; SECCIÓN DE OPCIONES
;; ============================================================================

(defn options-section [question selected correct]
  (let [relevant-options (if (= selected correct)
                           ;; Si acertó, solo muestra la correcta
                           (filter #(= (:value %) correct) (:options question))
                           ;; Si falló, ordena: primero la seleccionada, luego la correcta
                           (let [selected-opt (first (filter #(= (:value %) selected) (:options question)))
                                 correct-opt (first (filter #(= (:value %) correct) (:options question)))]
                             [selected-opt correct-opt]))]
    [:div {:class "mb-6 sm:mb-8 space-y-2 sm:space-y-3"}
     [:h3 {:class "text-xs sm:text-sm font-semibold text-gray-600 mb-3 sm:mb-4 uppercase tracking-wide"}
      (if (= selected correct)
        "Tu respuesta correcta"
        "Comparación de respuestas")]
     (for [{:keys [value label]} relevant-options]
       ^{:key value}
       [option-item value selected correct label])]))

;; ============================================================================
;; SECCIÓN DE EXPLICACIÓN
;; ============================================================================

(defn explanation-section [question selected is-correct?]
  (when-let [err-msg (get-in question [:errors (keyword selected)])]
    [:div {:class "mb-6 sm:mb-8 p-4 sm:p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl"}
     [:div {:class "flex items-start gap-3"}
      [icon-warning]
      [:div {:class "min-w-0"}
       [:h4 {:class "font-semibold text-amber-800 mb-1 text-sm sm:text-base"}
        "Explicación:"]
       [:p {:class "text-amber-700 leading-relaxed text-sm sm:text-base"}
        err-msg]]]]
    #_[:div {:class "mb-6 sm:mb-8 p-4 sm:p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl"}
     [:div {:class "flex items-start gap-3"}
      [icon-warning]
      [:div {:class "min-w-0"}
       [:h4 {:class "font-semibold text-amber-800 mb-1 text-sm sm:text-base"}
        (if is-correct? "¡Excelente!" "Explicación:")]
       [:p {:class "text-amber-700 leading-relaxed text-sm sm:text-base"}
        err-msg]]]]))
#_(defn explanation-section [question selected]
  (when-let [err-msg (get-in question [:errors selected])]
    [:div {:class "mb-6 sm:mb-8 p-4 sm:p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl"}
     [:div {:class "flex items-start gap-3"}
      [icon-warning]
      [:div {:class "min-w-0"}
       [:h4 {:class "font-semibold text-amber-800 mb-1 text-sm sm:text-base"}
        "Explicación:"]
       [:p {:class "text-amber-700 leading-relaxed text-sm sm:text-base"}
        err-msg]]]]))

;; ============================================================================
;; BOTONES DE ACCIÓN
;; ============================================================================

(defn action-buttons []
  [:button {:class "mt-6 bg-indigo-600 text-white px-6 py-2 rounded-full text-sm hover:bg-indigo-700 transition"
            :on-click #(re-frame/dispatch [:test/continue])}
   "Continuar →"])

;; ============================================================================
;; CONTENEDOR PRINCIPAL DEL MODAL
;; ============================================================================

(defn modal-content [question response selected correct is-correct?]
  [:div.max-w-2xl.mx-auto.bg-white.rounded-xl.shadow-md.p-8.space-y-6
   [question-section question]
   [options-section question selected correct]
   [explanation-section question selected is-correct?]  ;; Ahora pasa is-correct?
   [action-buttons]])

#_(defn modal-content [question response selected correct is-correct?]
  [:div.max-w-2xl.mx-auto.bg-white.rounded-xl.shadow-md.p-8.space-y-6
   #_[modal-header is-correct?]
   [question-section question]
   [options-section question selected correct]
   [explanation-section question selected]
   [action-buttons]])

;; ============================================================================
;; OVERLAY/BACKDROP
;; ============================================================================

(defn modal-overlay [open?]
  [:div {:class "fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto"
         :on-click #(re-frame/dispatch [:hide-modal])}])

;; ============================================================================
;; COMPONENTE PRINCIPAL
;; ============================================================================

(defn feedback []
  (let [modal @(re-frame/subscribe [:test/feedback])]
    (when modal
      (let [{:keys [question response]} modal
            selected (:selected-option response)  ;; ← Aquí está el problema probable
            correct (:correct-option question)
            is-correct? (:correct? response)]
        (js/console.log "Modal data:" (clj->js modal))
        (js/console.log "Selected:" selected)
        (js/console.log "Errors:" (clj->js (:errors question)))
        (js/console.log "Error para selected:" (get-in question [:errors (keyword selected)]))
        [modal-content question response selected correct is-correct?]))))


#_(defn feedback []
  (let [modal @(re-frame/subscribe [:test/feedback])]
    (when modal
      (let [{:keys [question response]} modal
            selected (:selected-option response)
            correct (:correct-option question)
            is-correct? (:correct? response)]
         [modal-content question response selected correct is-correct?]))))
