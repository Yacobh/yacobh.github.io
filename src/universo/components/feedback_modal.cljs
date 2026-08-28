(ns universo.components.feedback-modal
  "La capa cero: lo que aparece cuando el estudiante responde.

   ── Por qué ya no es un modal (ADR-032) ──────────────────────────────────────
   Era un `fixed inset-0` con `bg-black/60 backdrop-blur-sm` sobre una pantalla
   donde la pregunta **ni siquiera estaba montada**: `diagnostic-test` cambiaba
   de `:questions` a `:feedback` y el modal tenía que volver a dibujar el
   enunciado adentro para que se pudiera leer la explicación. Oscurecía un fondo
   vacío y repetía lo que acababa de tapar.

   Ahora la pregunta se queda a la izquierda, congelada y con la alternativa
   elegida marcada, y esto entra al costado: sin backdrop, sin repetir el
   enunciado y por lo tanto más corto. En pantallas angostas entra como hoja
   inferior, que es el equivalente móvil de «al lado» y tampoco oscurece nada.

   El nombre del namespace se conserva a propósito: renombrarlo tocaría todos sus
   usos sin cambiar ni una línea de comportamiento."
  (:require
   [re-frame.core :as re-frame]
   [reagent.core :as r]
   [universo.components.math-render :as math]
   [universo.components.plan :as plan]
   [universo.components.test-editor :as test-editor]
   [universo.irt.escape :as escape]))

;; ============================================================================
;; ICONOS
;; ============================================================================

(defn icon-close-button []
  [:svg {:class "w-5 h-5 sm:w-6 sm:h-6" :fill "none" :viewBox "0 0 24 24" :stroke "currentColor"}
   [:path {:stroke-linecap "round" :stroke-linejoin "round" :stroke-width "2"
           :d "M6 18L18 6M6 6l12 12"}]])

(defn icon-step-back-stroke
  "Flecha a la izquierda: el escape no es un fallo, es un paso atrás."
  []
  [:svg {:class "w-6 h-6 sm:w-7 sm:h-7" :fill "none" :viewBox "0 0 24 24" :stroke "currentColor"}
   [:path {:stroke-linecap "round" :stroke-linejoin "round" :stroke-width "3"
           :d "M11 17l-5-5 5-5M18 17l-5-5 5-5"}]])

;; ============================================================================
;; EL ESTADO SE DICE CON UN DIODO, NO PINTANDO LA SUPERFICIE
;; ============================================================================
;; ADR-033. Antes esto era `bg-green-50 border-green-600 text-green-900` y su
;; gemelo en rojo: verdes y rojos **de fábrica** de Tailwind, la única familia de
;; color del producto que no salía de la paleta. Por eso desentonaba — no era una
;; impresión, era literalmente otro sistema de color dentro de la misma pantalla.
;;
;; La carcasa de un aparato no cambia de color para decir algo: se enciende un
;; piloto. La superficie de la alternativa se queda como está y el estado lo dice
;; el diodo, que además **ya existía** como vocabulario (`.led` dentro de
;; `.alojamiento`, ADR-023) y no se estaba usando acá.
;;
;; El color nunca es el único portador: junto al diodo van siempre las palabras
;; —«¡Correcto!», «Correcta», «Tu respuesta»— y eso es lo que hace que la
;; pantalla se lea igual sin distinguir el rojo del verde.

(defn estado-led
  "Diodo de estado dentro de su alojamiento.

   `estado` ∈ `:ok` (encendido verde) · `:alarma` (encendido rojo) · `:apagado`
   (el hueco sigue ahí: un diodo sin corriente también informa)."
  ([estado] (estado-led estado :chico))
  ([estado tamano]
   (let [grande? (= tamano :grande)]
     [:div {:class (str "alojamiento flex flex-shrink-0 items-center justify-center rounded-full "
                        (if grande? "w-10 h-10 sm:w-12 sm:h-12" "w-6 h-6"))
            :aria-hidden "true"}
      [:span {:class (str "rounded-full led "
                          (if grande? "w-3.5 h-3.5" "w-2 h-2")
                          (case estado
                            :ok " led--on"
                            :alarma " led--alarma"
                            ""))}]])))

(defn estado-de
  "Qué diodo le toca a una alternativa ya juzgada."
  [value selected correct]
  (cond
    (= value correct) :ok
    (= value selected) :alarma
    :else :apagado))

;; ============================================================================
;; COMPONENTES DE ESTADO
;; ============================================================================

(defn status-badge [is-correct?]
  ;; Sin `animate-pulse`: latía para siempre, y una animación que no termina no
  ;; comunica nada — solo pide atención (ADR-022).
  [estado-led (if is-correct? :ok :alarma) :grande])

(defn status-title [is-correct?]
  ;; El título ya no se pinta de verde ni de rojo: eso lo dice el diodo de al
  ;; lado, y la palabra lo dice en palabras (ADR-033). Un titular de color sería
  ;; el color repitiendo lo que el texto ya afirma — decoración, no señal.
  [:h2 {:class "text-xl sm:text-2xl font-bold tracking-tight text-gray-900"}
   (if is-correct? "¡Correcto!" "Incorrecto")])

(defn close-button []
  ;; La X no «cierra»: continúa el test. Es el mismo evento del botón Continuar,
  ;; y por eso la etiqueta accesible lo dice — cerrar y avanzar son cosas
  ;; distintas para quien navega con lector de pantalla.
  [:button {:class "text-gray-500 hover:text-gray-900 transition-colors p-2 hover:bg-panel-100 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-senal-600"
            :aria-label "Continuar con la siguiente pregunta"
            :title "Continuar"
            :on-click #(re-frame/dispatch [:test/continue])}
   [icon-close-button]])

;; ============================================================================
;; HEADER
;; ============================================================================

(defn panel-header [is-correct?]
  [:div {:class "flex items-center justify-between gap-4 px-4 pt-4"}
   [:div {:class "flex items-center gap-2 sm:gap-4 min-w-0"}
    [status-badge is-correct?]
    [status-title is-correct?]]
   [close-button]])

;; El enunciado ya no se dibuja acá: está a la izquierda, montado y visible
;; (ADR-032). Lo que antes era `question-section` son ~250px menos de panel y una
;; fuente menos de la que el enunciado podía quedar desincronizado.

;; ============================================================================
;; PIEZAS DE UNA ALTERNATIVA YA JUZGADA
;; ============================================================================
;; Las usa `components/diagnostic-test`, que es donde se dibujan las alternativas
;; desde ADR-032. Viven acá porque acá está el vocabulario de estado: tenerlas
;; en los dos sitios sería tener dos definiciones de «correcta».

(defn option-indicator [value selected correct]
  [estado-led (estado-de value selected correct)])

(defn selected-badge
  "«Tu respuesta» — un hecho, no un veredicto: el veredicto lo da el diodo.

   Por eso es neutro y no verde/rojo. Antes había un relleno por estado, o sea el
   color diciendo por tercera vez lo mismo que ya decían el diodo y la palabra."
  [value selected _correct]
  (when (= value selected)
    [:span {:class (str "ml-2 relative -translate-y-[2px] inline-block rounded bg-panel-700 "
                        "px-2 py-0.5 align-middle text-xs font-medium text-panel-50")}
     "Tu respuesta"]))

(defn correct-label
  "Rótulo grabado en la correcta cuando **no** es la que se eligió.

   Es la redundancia que hace que la pantalla no dependa de distinguir el diodo
   verde del rojo."
  [value selected correct]
  (when (and (= value correct) (not= value selected))
    [:span {:class "grabado ml-2 align-middle"} "Correcta"]))

(defn option-classes
  "La superficie **no cambia de color** (ADR-033): las cuatro alternativas siguen
   siendo la misma pieza del panel. Lo único que se mueve es la regla lateral,
   que es un objeto gráfico y por eso le basta 3:1 — `led-800` da 3.64 sobre la
   superficie y `alarma-700` da 4.78.

   Lo que se había ido antes (ADR-023) fue el adorno: el escalado al pasar el
   mouse y las sombras difusas, que sugerían que la opción era accionable cuando
   ya no lo es."
  [value selected correct]
  (str "relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded text-base sm:text-lg "
       "border border-panel-500 bg-panel-100 text-gray-800 border-l-2 "
       (case (estado-de value selected correct)
         :ok "border-l-led-800"
         :alarma "border-l-alarma-700"
         "border-l-panel-500")))

;; ============================================================================
;; ITEM DE OPCIÓN
;; ============================================================================

(defn option-item [value selected correct label]
  [:div {:class (option-classes value selected correct)}
   [option-indicator value selected correct]
   [:div {:class "flex-1 leading-relaxed min-w-0 overflow-x-auto"}
    [math/latex label]
    [selected-badge value selected correct]
    [correct-label value selected correct]]])

;; ============================================================================
;; SECCIÓN DE OPCIONES — se fue a la columna de la pregunta
;; ============================================================================
;; `options-section` repetía acá las alternativas para poder marcar cuál se
;; eligió y cuál era la correcta. Desde ADR-032 las marca la propia pregunta, que
;; sigue montada a la izquierda: `option-classes`, `option-indicator` y
;; `selected-badge` los usa ahora `components/diagnostic-test`. Mantenerlas
;; también acá sería decir dos veces lo mismo en la misma pantalla — el mismo
;; motivo por el que se fue el enunciado.

;; ============================================================================
;; SECCIÓN DE EXPLICACIÓN — y su variante bonus
;; ============================================================================

(defn explanation-section
  "La nota de la alternativa elegida. **Dice dos cosas distintas según si acertó**,
   y por eso se llama distinto en cada caso.

   ── Por qué vuelve el «bonus» ───────────────────────────────────────────────
   `score_answer` devuelve la nota de la alternativa **elegida** (026). Cuando el
   estudiante falla, esa nota explica el error y es el diferencial del producto.
   Cuando acierta, la nota que llega es la de la **alternativa correcta**: no
   explica ningún error suyo — es material extra sobre algo que ya resolvió bien.

   Llamar «Explicación» a las dos, y encima ponerle un triángulo de advertencia,
   le decía a quien acababa de acertar que había algo que corregir. El rótulo
   `Bonus` dice lo que la nota es, y el triángulo se va: en esta pantalla no hay
   nada peligroso, y la señal naranja del costado ya marca que esto es lo que hay
   que leer.

   **Limitación, dicha en voz alta:** el bonus es la nota de la correcta, no «el
   error más común de este ítem». Mostrar eso exigiría que el servidor mandara
   otra explicación además de la elegida, que es justo lo que ADR-015 no hace."
  ([response] (explanation-section response false))
  ([response is-correct?]
   (when-let [nota (:selected-error response)]
     [:div {:class (str "mb-6 sm:mb-8 p-4 sm:p-5 bg-panel-100 border border-panel-500 "
                        "border-l-2 border-l-senal-600 rounded-r")}
      [:h4 {:class "grabado mb-1"} (if is-correct? "Bonus" "Explicación")]
      (when is-correct?
        [:p {:class "mb-2 text-sm text-gray-600"}
         "Acertaste. Esto es lo que hay detrás de esa alternativa."])
      [:div {:class "text-gray-800 leading-relaxed text-base sm:text-lg"}
       (math/parse-markdown-latex nota)]])))

;; ============================================================================
;; BOTONES DE ACCIÓN
;; ============================================================================

(defn action-buttons [stop-reason]
  [:button {:class (str "control mt-6 bg-senal-400 text-grafito-900 px-6 py-2.5 rounded "
                        "text-sm font-medium hover:bg-senal-300")
            :on-click #(re-frame/dispatch [:test/continue])}
   (if stop-reason "Ver resultados →" "Continuar →")])

;; ============================================================================
;; VARIANTE DE ESCAPE
;; ============================================================================
;; Un escape NO es una respuesta incorrecta y esta pantalla no puede decir que lo
;; es. Sin esta variante, el modal normal mostraría el badge rojo con
;; «Incorrecto» y —como `selected` y `correct` son los dos nil— una «Comparación
;; de respuestas» vacía, porque `(= nil nil)` entra por la rama del acierto.
;;
;; Tampoco lleva verde ni rojo: en esta pantalla el color informa acierto/fallo
;; (ver `option-classes`) y acá no hubo ninguno de los dos. El escape se dice con
;; neutro y con palabras.

(def ^:private escape-copy
  {:enunciado
   {:titulo "Anotado"
    :cuerpo (str "Que el enunciado no se entienda es información útil, y no es "
                 "culpa tuya: a veces el problema está en cómo está escrita la "
                 "pregunta. Queda registrado, y la siguiente va a ser más simple.")}
   :resolucion
   {:titulo "Vamos un paso atrás"
    :cuerpo (str "Decir «no sé» a tiempo vale más que adivinar: adivinar ensucia "
                 "la medición y te deja en un nivel que no es el tuyo. La "
                 "siguiente pregunta va a ser más fácil.")}})

;; ---------------------------------------------------------------------------
;; Material para el hueco declarado
;; ---------------------------------------------------------------------------
;; Decir «no sé» y recibir solo una frase amable es peor que no preguntar.
;;
;; **Limitación que se dice en voz alta, no se esconde:** este es el material del
;; **mismo** módulo del ejercicio, no el del módulo *anterior*, porque el grafo de
;; prerrequisitos todavía no está decidido (Q-38 / T-98). Es la aproximación
;; honesta que se puede dar hoy. El estado vacío también es honesto: con un tercio
;; del banco todavía sin `module_id` (T-60) va a ocurrir, y es mejor decir que no
;; hay material que fingir que el estudiante no lo necesitaba.

(defn- escape-resources-section []
  (let [{:keys [loading? items module-slug]} @(re-frame/subscribe [:test/escape-resources])]
    [:div {:class "mb-6 sm:mb-8"}
     [:h3 {:class "grabado mb-3 sm:mb-4"} "Para repasar esto"]
     (cond
       loading?
       [:p {:class "text-sm text-gray-600"} "Buscando material…"]

       (seq items)
       [:div {:class "space-y-3"}
        (for [r (take 3 items)]
          ^{:key (:id r)}
          [plan/resource-card r])]

       :else
       [:div {:class "border border-panel-500 bg-panel-100 p-4"}
        [:p {:class "text-sm text-gray-800"}
         (if module-slug
           (str "Todavía no hay material publicado para «" module-slug "».")
           "Este ejercicio aún no está asignado a un módulo, así que no puedo mostrarte material.")]
        [:p {:class "mt-1 text-sm text-gray-600"}
         "Va a aparecer en «Mi plan» cuando lo publiquemos."]])]))

(defn escape-header [kind]
  [:div {:class "flex items-center justify-between gap-4 px-4 pt-4"}
   [:div {:class "flex items-center gap-2 sm:gap-4 min-w-0"}
    [:div {:class (str "flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 "
                       "rounded-full bg-panel-600 text-panel-50")}
     [icon-step-back-stroke]]
    [:h2 {:class "text-xl sm:text-2xl font-bold tracking-tight text-gray-900"}
     (get-in escape-copy [kind :titulo] "Anotado")]]
   [close-button]])

(defn- escape-note [kind]
  [:div {:class (str "mb-6 sm:mb-8 p-4 sm:p-5 bg-panel-100 border border-panel-500 "
                     "border-l-2 border-l-senal-600 rounded-r")}
   [:h4 {:class "grabado mb-1"} "Qué pasa ahora"]
   [:p {:class "text-gray-800 leading-relaxed text-base sm:text-lg"}
    (get-in escape-copy [kind :cuerpo] "Queda registrado.")]])

(defn escape-body
  "Cuerpo del panel cuando el estudiante declaró que no sabe. Sin encabezado, sin
   enunciado y sin gráfica: el encabezado lo pone el panel, el enunciado la
   columna de la izquierda y la gráfica es el visor permanente del riel
   (ADR-032 · ADR-033)."
  [kind stop-reason]
  [:div {:class "px-4 pb-6 pt-2 space-y-4"}
   [escape-note kind]
   ;; El material va ANTES de la gráfica: quien acaba de decir «no sé» necesita
   ;; con qué seguir, no ver su propia curva. La gráfica se queda porque es la
   ;; misma pantalla del feedback normal y sacarla haría que el escape se sienta
   ;; un camino aparte, que es justo lo que no se quiere.
   [escape-resources-section]
   [action-buttons stop-reason]])


;; ============================================================================
;; CUERPO: LA RESPUESTA
;; ============================================================================

(defn respuesta-body
  "Explicación (o bonus) y el botón de seguir. Nada de enunciado ni de
   alternativas —están a la izquierda, en la pregunta que no se desmontó
   (ADR-032)— y nada de gráfica: la gráfica es el visor del riel y está siempre
   encendida (ADR-033), no aparece y desaparece con cada respuesta."
  [response is-correct? stop-reason]
  [:div {:class "px-4 pb-6 pt-2"}
   [explanation-section response is-correct?]
   [action-buttons stop-reason]])

;; ============================================================================
;; PESTAÑAS (solo admin)
;; ============================================================================

(defn- tab-button [label activa? on-click]
  [:button {:type "button"
            :aria-pressed (if activa? "true" "false")
            :class (str "min-h-11 flex-1 border-b-2 px-3 py-2 text-sm font-medium transition "
                        (if activa?
                          "border-senal-600 text-gray-900"
                          "border-transparent text-gray-600 hover:text-gray-900"))
            :on-click on-click}
   label])

(defn- editor-tabs
  "«Respuesta» / «Editar ítem». Solo para quien puede editar el banco.

   No hay estado de pestaña propio: la pestaña **es** si el editor está abierto.
   Un booleano duplicado acá sería el clásico que se desincroniza el día que el
   editor se cierre solo — por ejemplo al arrancar otro test, que lo limpia."
  [question-id]
  (let [admin? @(re-frame/subscribe [:auth/admin?])
        editando? @(re-frame/subscribe [:editor-vivo/abierto?])]
    (when (and admin? question-id)
      [:div {:class "mt-3 flex border-b border-panel-500"}
       [tab-button "Respuesta" (not editando?)
        #(when editando? (re-frame/dispatch [:editor-vivo/cerrar]))]
       [tab-button "Editar ítem" editando?
        #(when-not editando? (re-frame/dispatch [:editor-vivo/abrir question-id]))]])))

;; ============================================================================
;; CÁSCARA DEL PANEL
;; ============================================================================

(defn- traer-a-la-vista!
  "En pantallas angostas el riel va **debajo** de la pregunta, así que el panel
   nace fuera de la vista y nadie lo ve aparecer. Se lo trae — y **solo ahí**: en
   `lg` está al lado y pegado, mover el scroll sería quitarle la página de debajo
   a alguien que no pidió nada.

   `block: \"nearest\"` y no `\"start\"`: alcanza con que entre, no hace falta
   clavarlo arriba. Sin animación si el sistema pidió menos movimiento."
  [el]
  (when (and el (.-matchMedia js/window))
    (let [angosto? (.-matches (.matchMedia js/window "(max-width: 1023px)"))
          quieto? (.-matches (.matchMedia js/window "(prefers-reduced-motion: reduce)"))]
      (when angosto?
        (.scrollIntoView el #js {:behavior (if quieto? "auto" "smooth")
                                 :block "nearest"})))))

(defn panel-shell
  "La placa de la capa cero, **dentro del flujo** del riel.

   ── Por qué dejó de ser `fixed` (ADR-033) ──────────────────────────────────
   La primera versión (ADR-032) era `fixed right-0 top-16 bottom-0`: quedaba
   anclada a la ventana y por lo tanto **se montaba sobre el footer** al llegar
   al final de la página. Un elemento `fixed` no sabe que existe el resto del
   documento; para que respetara el footer habría que escucharle el scroll y
   corregirle la altura a mano, que es mucha maquinaria para algo que el flujo
   resuelve solo.

   Ahora el riel es una **columna de verdad** del `grid` y el panel vive dentro,
   con `sticky` para que acompañe la lectura sin despegarse del documento: se
   pega bajo la barra mientras hay página, y se despega cuando llega el footer.
   Ese es exactamente el comportamiento que se quería, y sale gratis.

   `max-h` + scroll propio porque un panel `sticky` más alto que la ventana deja
   su parte de abajo fuera de alcance — el mismo fallo de flexbox que T-68
   documentó para el modal, con otro disfraz.

   La entrada se anima con `translate` y `opacity`: las dos propiedades que el
   compositor puede animar sin recalcular layout. `motion-reduce` la apaga."
  [contenido]
  (r/with-let [montado? (r/atom false)
               nodo (r/atom nil)
               _ (r/next-tick (fn []
                                (reset! montado? true)
                                (traer-a-la-vista! @nodo)))]
    [:aside
     {:ref (fn [el] (reset! nodo el))
      :class (str "placa rounded border border-panel-600 bg-panel-100 "
                  "transition duration-300 ease-out motion-reduce:transition-none "
                  (if @montado?
                    "translate-y-0 opacity-100"
                    "translate-y-2 opacity-0"))}
     contenido]))

;; ============================================================================
;; COMPONENTE PRINCIPAL
;; ============================================================================

(defn feedback []
  (let [modal @(re-frame/subscribe [:test/feedback])
        stop-reason @(re-frame/subscribe [:test/stop-reason])
        editando? @(re-frame/subscribe [:editor-vivo/abierto?])]
    (when modal
      (let [{:keys [question response]} modal
            ;; La letra elegida solo se usa para abrir el editor en la
            ;; explicación que corresponde; la alternativa correcta la marca la
            ;; columna de la pregunta, con el `:correct-option` que devolvió el
            ;; servidor (el ítem llega sin ella, ADR-015).
            selected (:selected-option response)
            is-correct? (:correct? response)
            escape-kind (escape/escape-of response)]
        [panel-shell
         [:<>
          (if escape-kind
            [escape-header escape-kind]
            [panel-header is-correct?])
          [editor-tabs (:id question)]
          (cond
            editando?
            [test-editor/editor-panel selected]

            escape-kind
            [escape-body escape-kind stop-reason]

            :else
            [respuesta-body response is-correct? stop-reason])]]))))
