(ns universo.components.diagnostic-test
  (:require [re-frame.core :as re-frame]
            [reagent.core :as r]
            [universo.catalog :as catalog]
            [universo.components.feedback-modal :as fm :refer [feedback]]
            [universo.components.irt-chart :as irt-chart]
            [universo.components.math-render :as math]
            [universo.components.ui :as ui]
            [universo.opciones :as opciones]
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
    [:div {:class "max-w-2xl mx-auto p-5 sm:p-8 bg-white rounded-lg shadow-lg"}
     [:div {:class "text-center mb-8"}
      [:h2 {:class "text-2xl sm:text-3xl font-bold text-gray-800 mb-3"}
       "Elige una evaluación"]
      [:p {:class "text-gray-600"}
       "Selecciona el tema que quieres practicar. Las opciones se cargan desde el banco de preguntas."]]

     (cond
       loading?
       [ui/loading-block "Cargando evaluaciones disponibles..."]

       error
       [:div {:class "text-center py-8 space-y-4"}
        [:p {:class "text-red-600"} error]
        [:button {:class "min-h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-5 rounded-lg transition"
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
  [:div {:class "max-w-2xl mx-auto p-5 sm:p-8 bg-white rounded-lg shadow-lg"}
   [ui/loading-block "Cargando siguiente pregunta..."]])

;; -------------------------------
;; Componente de finalización
;; -------------------------------

(defn completion-component []
  [:div {:class "max-w-2xl mx-auto p-5 sm:p-8 bg-white rounded-lg shadow-lg text-center"}
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
;; El escape: «no sé»
;; -------------------------------

;; Dos botones y no uno, porque son dos diagnósticos opuestos en accionabilidad
;; (ver `universo.irt.escape`): «no entiendo el enunciado» habla del **ítem**
;; —lectura, notación— y «no sé resolverlo» habla de un hueco de prerrequisito
;; del estudiante. Tratarlos como una alternativa incorrecta más tira justamente
;; la distinción que los vuelve útiles.
;;
;; Dos decisiones de jerarquía, y las dos son a propósito:
;;   · **Peso secundario.** Sin relleno de señal: el naranja está reservado a la
;;     acción principal de la pantalla, que son las alternativas. El escape se
;;     ve, no se ofrece.
;;   · **Sin confirmación.** Poner fricción acá castigaría la honestidad, que es
;;     exactamente la conducta que se quiere premiar. Nunca es el camino más
;;     rápido; nunca pregunta «¿estás seguro?».
(def ^:private escape-options
  [[:enunciado "No entiendo el enunciado"
    "No entiendo qué me están preguntando"]
   [:resolucion "No sé cómo resolverlo"
    "Entiendo la pregunta, pero no sé por dónde partir"]])

(defn- escape-buttons
  [{:keys [question-id scoring? elapsed-ms]}]
  [:div {:class "mt-6 border-t border-panel-500 pt-5"}
   [:p {:class "grabado mb-3"} "Si no sabes, dilo — sirve más que adivinar"]
   [:div {:class "grid grid-cols-1 gap-2 sm:grid-cols-2"}
    (for [[kind label hint] escape-options]
      ^{:key kind}
      [:button
       {:type "button"
        :disabled scoring?
        :title hint
        :class (str "min-h-11 w-full border border-panel-500 bg-panel-100 px-4 py-2.5 "
                    "text-left text-sm font-medium text-gray-800 transition "
                    "hover:border-panel-600 hover:bg-panel-200 "
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-senal-600 "
                    "disabled:cursor-not-allowed disabled:opacity-50")
        :on-click #(re-frame/dispatch
                    [:test/escape
                     {:question-id question-id
                      :escape-kind kind
                      :time-ms (elapsed-ms)}])}
       [:span {:class "block"} label]
       [:span {:class "mt-0.5 block text-xs font-normal text-gray-600"} hint]])]])

;; -------------------------------
;; Componente de preguntas
;; -------------------------------

(defn- alternativa-respondida
  "Una alternativa ya juzgada: verde la correcta, roja la elegida si falló.

   Es un `div` y no un `button` a propósito — ya no se puede accionar, y dejarla
   como botón deshabilitado la anunciaría igual como control a un lector de
   pantalla. Los estilos son los del panel (`components/feedback-modal`), que es
   donde vivían cuando esto se dibujaba dos veces."
  [{:keys [value label selected correct admin?]}]
  [:div {:class (fm/option-classes value selected correct)}
   [fm/option-indicator value selected correct]
   [:div {:class "flex-1 leading-relaxed min-w-0 overflow-x-auto"}
    ;; La letra original, solo para quien edita el banco. Las alternativas se
    ;; barajan (ADR-030), así que la que se ve tercera puede ser la `B`; sin esto
    ;; hay que adivinar cuál fila del editor corresponde a cuál alternativa.
    ;; **Al estudiante no se le muestra**: sería devolverle el orden del banco,
    ;; que es justo lo que barajar existe para ocultar.
    (when admin?
      [:span {:class "grabado mr-2 align-middle"} value])
    [math/latex label]
    [fm/selected-badge value selected correct]
    [fm/correct-label value selected correct]]])

(defn question-component
  "El enunciado y sus alternativas.

   `congelada?` es el estado de ADR-032: mientras el panel de la capa cero está
   al lado, esta columna **sigue montada** —no se desmonta como antes— con las
   alternativas ya juzgadas y sin controles accionables. Que no se desmonte es
   lo que permite que el panel entre con una transición en vez de aparecer de
   golpe, y lo que le ahorra al panel repetir el enunciado."
  ([] [question-component {}])
  ([{:keys [congelada?]}]
   (r/with-let [started-at (r/atom nil)
                last-id (r/atom nil)]
     (let [question @(re-frame/subscribe [:test/current-question])
           question-index (count @(re-frame/subscribe [:test/questions]))
           topic @(re-frame/subscribe [:test/topic])
           scoring? @(re-frame/subscribe [:test/scoring?])
           score-error @(re-frame/subscribe [:test/score-error])
           admin? @(re-frame/subscribe [:auth/admin?])
           theta @(re-frame/subscribe [:test/theta])
           respuesta (:response @(re-frame/subscribe [:test/feedback]))
           selected (when congelada? (:selected-option respuesta))
           correct (when congelada? (:correct-option respuesta))
           ;; 🎲 Barajar las alternativas. Antes se rotaba con `id mod 4`, que
           ;; reparte bien la posición visible pero es cíclica: con la clave
           ;; siempre en A —293 de 306 ítems del banco lo están— la correcta
           ;; queda en la posición `(4 - id mod 4)`, deducible sin leer el
           ;; enunciado. `opciones/barajar` permuta de verdad (universo.opciones).
           ;; Es determinista por `id`, así que al congelarse la pregunta las
           ;; alternativas no se reordenan bajo el dedo del estudiante.
           rotated-options (when question
                             (opciones/barajar (:options question) (:id question)))]

       ;; Reinicia cronómetro al cambiar de pregunta. Un ítem que vuelve por
       ;; «volver a servir» (universo.reintento) conserva su `id`, así que el
       ;; cronómetro NO se reinicia: el tiempo ya corrido es el que el
       ;; estudiante —acá, el autor— efectivamente pasó mirándolo.
       (when (and question (not= @last-id (:id question)))
         (reset! last-id (:id question))
         (reset! started-at (.now js/Date)))

       (if question
         [:div {:class "max-w-2xl mx-auto bg-white rounded-xl shadow-md p-5 sm:p-8 space-y-6"}

          ;; 🔹 Título / encabezado
          [:div {:class "flex items-baseline justify-center gap-3"}
           [:h2 {:class "text-xl sm:text-2xl font-bold text-gray-800 text-center"}
            (str "Pregunta " question-index)]
           ;; θ y b solo para quien puede editar el banco: al estudiante no se le
           ;; muestra su estimación a mitad del test, y a quien lo está depurando
           ;; le hace falta para leer por qué vino este ítem y no otro.
           (when (and admin? (number? theta))
             [:span {:class "grabado tabular-nums"}
              (str "θ " (.toFixed (js/Number theta) 2)
                   " · b " (if (number? (:difficulty question))
                             (.toFixed (js/Number (:difficulty question)) 1)
                             "—"))])]
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
             (if congelada?
               [alternativa-respondida {:value value :label label
                                        :selected selected :correct correct
                                        :admin? admin?}]
               [:button.w-full.bg-indigo-50.hover:bg-indigo-100.text-indigo-700.font-medium.py-2.px-4.rounded-lg.transition.disabled:opacity-50.disabled:cursor-wait
                {:disabled scoring?
                 :on-click #(re-frame/dispatch
                             [:test/answer
                              {:question-id (:id question)
                               :selected value
                               :time-ms (if @started-at
                                          (- (.now js/Date) @started-at)
                                          0)}])}
                (math/latex label)]))]

          (when score-error
            ;; Alarma de la paleta, no el rojo de fábrica (ADR-033): esta caja
            ;; aparece **al lado** del panel del instrumento, y era el otro
            ;; sistema de color metido en la misma pantalla.
            [:div {:role "alert"
                   :class (str "rounded border border-panel-500 border-l-2 border-l-alarma-700 "
                               "bg-panel-100 px-4 py-3 text-sm text-gray-900")}
             score-error])

          ;; 🔹 El escape y el cierre manual solo mientras se puede responder:
          ;; congelada, la columna no ofrece ninguna acción — todas viven en el
          ;; panel de al lado, que es el que tiene el turno.
          (when-not congelada?
            [:<>
             [escape-buttons
              {:question-id (:id question)
               :scoring? scoring?
               :elapsed-ms (fn []
                             (if @started-at
                               (- (.now js/Date) @started-at)
                               0))}]

             [:div.mt-8.text-center
              [:button.bg-gray-200.hover:bg-gray-300.text-gray-700.font-semibold.py-2.px-6.rounded-lg
               {:on-click #(re-frame/dispatch [:test/complete])}
               "Finalizar Test"]]])]

         ;; 🔹 Esperando pregunta (fetch en curso)
         [loading-component])))))

;; -------------------------------
;; El escenario: pregunta + capa cero al lado
;; -------------------------------

(defn- riel
  "El riel del instrumento: la columna derecha, y **existe siempre**.

   ── Por qué siempre, y no solo cuando hay respuesta (ADR-033) ───────────────
   Si el riel apareciera al responder, la pregunta se movería en cada ítem. Y hay
   una razón mejor que esa: en un aparato de medida el visor **es parte de la
   cara**, no algo que se despliega. Está ahí desde el principio, apagado hasta
   que hay algo que mostrar — y `irt-progress-chart` ya trae ese estado vacío
   («Responde para ver cómo evoluciona tu evaluación»), así que no hubo que
   inventarle un placeholder.

   Consecuencia buscada: la gráfica deja de aparecer y desaparecer con cada
   respuesta. Estaba dentro del modal, o sea que parpadeaba doce veces por
   diagnóstico. Una medición que se muestra a saltos se lee peor que una que está
   siempre en el mismo sitio."
  []
  (let [respondiendo? (= @(re-frame/subscribe [:test/status]) :feedback)
        points @(re-frame/subscribe [:test/progress-points])
        stop-reason @(re-frame/subscribe [:test/stop-reason])]
    ;; `calc(100vh_-_6rem)` con guiones bajos: en una clase arbitraria de Tailwind
    ;; el `_` es el espacio, y `calc(100vh-6rem)` **sin** espacios alrededor del
    ;; signo no es CSS válido — se genera y el navegador la descarta en silencio.
    [:div {:class (str "space-y-4 lg:sticky lg:top-20 "
                       "lg:max-h-[calc(100vh_-_6rem)] lg:overflow-y-auto")}
     ;; El panel se trae solo a la vista cuando nace fuera de ella
     ;; (`feedback-modal/panel-shell`): sabe dónde está y este riel no.
     (when respondiendo? [feedback])
     [irt-chart/irt-progress-chart points stop-reason]]))

(defn test-stage
  "Las dos columnas de ADR-032, ya sin nada `fixed` (ADR-033).

   El riel es una columna de verdad del grid y **está siempre**, así que la
   pregunta no se mueve nunca y el panel no puede montarse sobre el footer: el
   footer viene después de este bloque, en el flujo. La versión anterior era un
   panel `fixed` con `padding` compensatorio en el escenario, y eso es
   exactamente lo que lo hacía pisar el pie de página."
  []
  (let [respondiendo? (= @(re-frame/subscribe [:test/status]) :feedback)]
    ;; Flex y no un grid de columnas arbitrarias. Dos razones, las dos medidas
    ;; sobre el CSS compilado y no sobre la documentación:
    ;;   · una utilidad arbitraria con paréntesis y coma adentro sale del
    ;;     extractor de Tailwind con el escape `\2c`, y verificar que existe se
    ;;     vuelve un ejercicio de adivinar cómo quedó escrita;
    ;;   · una utilidad que no se genera falla **en silencio** — nada avisa, el
    ;;     riel simplemente se cae debajo.
    ;; Un ancho fijo y `flex-1` son dos utilidades triviales que se verifican de
    ;; un vistazo. `lg:min-w-0` en la columna del enunciado no es opcional: sin
    ;; eso, un ítem con LaTeX ancho empuja la caja flex y saca el riel de la
    ;; pantalla.
    [:div {:class "mx-auto w-full max-w-6xl space-y-6 lg:flex lg:items-start lg:gap-6 lg:space-y-0"}
     [:div {:class "lg:min-w-0 lg:flex-1"}
      [question-component {:congelada? respondiendo?}]]
     [:div {:class "lg:w-[26rem] lg:flex-none"}
      [riel]]]))

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
       {:class "min-h-11 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg"
        :type "button"
        :on-click #(re-frame/dispatch [:navigate-to :plan])}
       "Ver mi plan"]
      [:button
       {:class "min-h-11 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-4 rounded-lg"
        :type "button"
        :on-click #(re-frame/dispatch [:navigate-to :cupos])}
       "Ver cupos para mi nivel"]
      [:button
       {:class "min-h-11 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg"
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
         ;; Los dos estados renderizan el mismo escenario: en `:feedback` la
         ;; pregunta se congela y entra el panel al lado, sin desmontar nada
         ;; (ADR-032).
         :questions [test-stage]
         :feedback [test-stage]
         :completed [completion-component]
         :results [results-component]
         ;; Estado inicial / desconocido → selección
         [selection-component])])))
