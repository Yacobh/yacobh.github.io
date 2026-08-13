(ns universo.components.feedback-modal
  (:require
   [re-frame.core :as re-frame]
   [universo.components.math-render :as math]
   [universo.components.irt-chart :as irt-chart]))

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
  [:svg {:class "w-5 h-5 text-senal-600 mt-0.5 flex-shrink-0" :fill "currentColor" :viewBox "0 0 20 20"}
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
  ;; Sin `animate-pulse`: latía para siempre, y una animación que no termina no
  ;; comunica nada — solo pide atención (ADR-022).
  [:div {:class (str "flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full "
                     (if is-correct? "bg-green-600" "bg-red-600"))}
   (if is-correct?
     [icon-check-stroke]
     [icon-cross-stroke])])

(defn status-title [is-correct?]
  [:h2 {:class (str "text-xl sm:text-2xl font-bold tracking-tight "
                    (if is-correct? "text-green-700" "text-red-700"))}
   (if is-correct? "¡Correcto!" "Incorrecto")])

(defn close-button []
  [:button {:class "text-gray-500 hover:text-gray-900 transition-colors p-2 hover:bg-panel-100 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-senal-600"
            :aria-label "Cerrar modal"
            :on-click #(re-frame/dispatch [:test/continue])}
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
  ;; ADR-023: el enunciado va en un alojamiento, hundido en la placa. Antes era
  ;; un degradado azul→índigo con los azules **de fábrica** de Tailwind — este
  ;; componente es la excepción `dark:` de ADR-012 y por eso se quedó fuera de
  ;; las tres pasadas de identidad (T-68).
  [:div {:class "alojamiento mb-6 sm:mb-8 rounded p-4 sm:p-6"}
   [:h3 {:class "grabado mb-2 sm:mb-3"} "Pregunta"]
   [:div {:class "text-base sm:text-lg text-panel-100 leading-relaxed overflow-x-auto"}
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
       [:div {:class "w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-600 flex items-center justify-center"}
        [icon-check]]

       (and is-selected? (not is-correct-answer?))
       [:div {:class "w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-600 flex items-center justify-center"}
        [icon-cross]]

       is-correct-answer?
       [:div {:class "w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-600 flex items-center justify-center"}
        [icon-check]]

       :else
       [:div {:class "w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-panel-500"}])]))

;; ============================================================================
;; BADGE DE RESPUESTA SELECCIONADA
;; ============================================================================

(defn selected-badge [value selected correct]
  (when (= value selected)
    [:span {:class (str "ml-2 relative -translate-y-[2px] inline-block px-2 py-0.5 rounded text-xs font-medium align-middle "
                        (if (= value correct)
                          "bg-green-700 text-white"
                          "bg-red-700 text-white"))}
     (if (= value correct) "Tu respuesta ✓" "Tu respuesta")]))

;; ============================================================================
;; CLASES DINÁMICAS PARA OPCIONES
;; ============================================================================

(defn option-classes [value selected correct]
  (let [is-selected? (= value selected)
        is-correct-answer? (= value correct)]
    ;; El verde y el rojo se conservan: acá el color SÍ informa (acertaste /
    ;; fallaste) y es la única lectura que importa en esta pantalla. Lo que se
    ;; fue es el adorno — el escalado al pasar el mouse y las sombras difusas,
    ;; que sugerían que la opción era accionable cuando ya no lo es (ADR-023).
    (str "relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded text-base sm:text-lg border "
         (cond
           (and is-selected? is-correct-answer?)
           "bg-green-50 border-green-600 text-green-900"

           (and is-selected? (not is-correct-answer?))
           "bg-red-50 border-red-600 text-red-900"

           is-correct-answer?
           "bg-green-50 border-green-600 text-green-900"

           :else
           "bg-panel-100 border-panel-500 text-gray-800"))))

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
     [:h3 {:class "grabado mb-3 sm:mb-4"}
      (if (= selected correct)
        "Tu respuesta correcta"
        "Comparación de respuestas")]
     (for [{:keys [value label]} relevant-options]
       ^{:key value}
       [option-item value selected correct label])]))

;; ============================================================================
;; SECCIÓN DE EXPLICACIÓN
;; ============================================================================

(defn explanation-section
  "Muestra la explicación de la opción seleccionada.
   La explicación viene en la respuesta, no en la pregunta: el ítem llega del
   servidor sin sus `error_*` y `score_answer` devuelve solo la de la
   alternativa elegida (ADR-015)."
  ([response]
   (explanation-section response false))
  ([response _is-correct?]
   (when-let [err-msg (:selected-error response)]
     ;; Es la parte más valiosa de la pantalla —el diferencial del producto es
     ;; explicar el error, no puntuarlo— así que lleva la regla naranja al
     ;; costado: lo único que la señal marca acá.
     [:div {:class (str "mb-6 sm:mb-8 p-4 sm:p-5 bg-panel-100 border border-panel-500 "
                        "border-l-2 border-l-senal-600 rounded-r")}
      [:div {:class "flex items-start gap-3"}
       [icon-warning]
       [:div {:class "min-w-0"}
        [:h4 {:class "grabado mb-1"} "Explicación"]
        [:div {:class "text-gray-800 leading-relaxed text-base sm:text-lg"}
         (math/parse-markdown-latex err-msg)]]]])))

;; ============================================================================
;; BOTONES DE ACCIÓN
;; ============================================================================

(defn action-buttons [stop-reason]
  [:button {:class (str "control mt-6 bg-senal-500 text-grafito-900 px-6 py-2.5 rounded "
                        "text-sm font-medium hover:bg-senal-400")
            :on-click #(re-frame/dispatch [:test/continue])}
   (if stop-reason "Ver resultados →" "Continuar →")])

;; ============================================================================
;; CONTENEDOR PRINCIPAL DEL MODAL
;; ============================================================================

(defn modal-content [question response selected correct is-correct? points stop-reason]
  [:div {:class "placa bg-white border-panel-600 rounded p-6 sm:p-8 space-y-6"}
   [question-section question]
   [options-section question selected correct]
   [explanation-section response is-correct?]
   ;; El visor lo pone el propio componente (T-72d).
   [irt-chart/irt-progress-chart points stop-reason]
   [action-buttons stop-reason]])

;; ============================================================================
;; OVERLAY/BACKDROP
;; ============================================================================

(defn modal-overlay
  "Backdrop del modal de feedback. El click afuera dispara :test/continue —
   el mismo evento que ya usan el botón X y 'Continuar', no hay lógica nueva.

   ── El bug que arregla `m-auto` (T-68) ─────────────────────────────────────
   Antes esto era `flex items-center justify-center` **junto con**
   `overflow-y-auto` en el mismo elemento. Es un fallo conocido de flexbox: con
   `align-items: center`, un hijo más alto que el contenedor se desborda por
   arriba **y** por abajo, y el desbordamiento superior queda **inalcanzable**
   —el scroll no llega ahí—. O sea que en un ítem largo el estudiante perdía el
   encabezado y el enunciado, justo en los ítems que más explicación necesitan.

   La corrección es `items-start` + `m-auto` en el hijo: los márgenes
   automáticos centran cuando sobra espacio y **no recortan** cuando falta, que
   es exactamente lo que `align-items: center` no sabe hacer."
  [content]
  [:div {:class (str "fixed inset-0 z-50 flex items-start justify-center overflow-y-auto "
                     "bg-black/60 backdrop-blur-sm p-3 sm:p-4")
         :on-click #(re-frame/dispatch [:test/continue])}
   [:div {:class "m-auto w-full max-w-2xl"
          :on-click #(.stopPropagation %)}
    content]])

;; ============================================================================
;; COMPONENTE PRINCIPAL
;; ============================================================================

(defn feedback []
  (let [modal @(re-frame/subscribe [:test/feedback])
        points @(re-frame/subscribe [:test/progress-points])
        stop-reason @(re-frame/subscribe [:test/stop-reason])]
    (when modal
      (let [{:keys [question response]} modal
            selected (:selected-option response)
            ;; La alternativa correcta la trae la respuesta corregida por el
            ;; servidor, no la pregunta: el ítem llega sin ella (ADR-015).
            correct (:correct-option response)
            is-correct? (:correct? response)]
        [modal-overlay
         [modal-content question response selected correct is-correct?
          points stop-reason]]))))
