(ns universo.components.test-editor
  "La pestaña «Editar ítem» del panel del diagnóstico (ADR-032).

   Es el formulario más corto posible que sirve para lo que se hace acá: corregir
   la capa cero del ítem que se acaba de ver y, si hace falta, mover la palanca
   que decide cuál viene después. El formulario largo —alternativas, respuesta
   correcta, tema, orden— sigue en el panel de admin, con el test cerrado: son
   los campos que no se pueden cambiar a mitad de una medición sin invalidarla.

   Los campos son los mismos widgets del panel (`components/campos`), cableados a
   `:editor-vivo/campo` en vez de a `:admin/update-question-draft`."
  (:require
   [clojure.string :as str]
   [re-frame.core :as re-frame]
   [universo.components.campos :as campos]
   [universo.components.math-render :as math]
   [universo.editor :as editor]))

(def ^:private letras ["A" "B" "C" "D"])

(defn- clave-error [letra] (keyword (str "error_" (str/lower-case letra))))
(defn- clave-misconception [letra] (keyword (str "misconception_" (str/lower-case letra) "_id")))

(defn- campo! [k v]
  (re-frame/dispatch [:editor-vivo/campo k v]))

(defn- clave-opcion [letra] (keyword (str "option_" (str/lower-case letra))))

(defn- bloque-distractor
  "Explicación + idea errónea de una alternativa.

   **El texto de la alternativa va arriba, y no es adorno.** Desde ADR-030 las
   alternativas se barajan en pantalla, así que la que el estudiante vio tercera
   puede ser la `B`: sin el enunciado de cada una delante, «Alternativa B» no
   identifica nada y se corrige a ciegas la explicación equivocada. Va en solo
   lectura —cambiar una alternativa a mitad de un test invalidaría la respuesta
   recién dada (ADR-032)— pero tiene que estar.

   `elegida?` marca la que el estudiante acaba de responder: es la única que se
   vio juzgada y la única que se puede evaluar con el caso delante, así que va
   abierta y con la regla de señal al costado. Las otras tres están, pero no
   compiten por la atención."
  [draft original letra elegida?]
  [:div {:class (str "rounded border px-3 pt-3 "
                     (if elegida?
                       "border-panel-500 border-l-2 border-l-senal-600 bg-panel-100"
                       "border-panel-400 bg-white"))}
   [:p {:class "grabado mb-2"}
    (str "Alternativa " letra)
    (when (= letra (str/upper-case (str/trim (str (:correct_option original)))))
      [:span {:class "ml-2 rounded bg-panel-700 px-1.5 py-0.5 text-xs font-medium text-panel-50"}
       "correcta"])
    (when elegida?
      [:span {:class "ml-2 rounded bg-senal-400 px-1.5 py-0.5 text-xs font-medium text-grafito-900"}
       "la que respondió"])]
   [:div {:class "mb-3 rounded border border-panel-400 bg-panel-50 px-3 py-2 text-sm text-gray-800"}
    (let [texto (get original (clave-opcion letra))]
      (if (str/blank? (str texto))
        [:span {:class "text-gray-600"} "(sin texto)"]
        [math/latex texto]))]
   [campos/latex-editor
    {:label "Explicación del error"
     :hint "Markdown + LaTeX · es la capa cero que ve el estudiante"
     :value (get draft (clave-error letra))
     :rows 3
     :markdown? true
     :on-change #(campo! (clave-error letra) %)}]
   [campos/misconception-select
    {:value (get draft (clave-misconception letra))
     :on-change #(campo! (clave-misconception letra) %)}]])

(defn- fila-medicion
  "Dificultad y módulo: las dos palancas con efecto en el flujo, no en el texto.

   `difficulty` es el parámetro b del 1PL — decide qué ítem sirve
   `next_question` en la siguiente vuelta— y `module_id` decide qué material
   recibe el «no sé» y qué entra a «Mi plan». Van juntas y arriba porque son las
   dos que justifican editar **durante** el test en vez de después."
  [draft theta]
  [:div {:class "mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2"}
   [:div
    [campos/field "Dificultad (b)"
     (str "θ actual: " (if (number? theta) (.toFixed (js/Number theta) 2) "—"))
     [:input {:class campos/input-class
              :type "number"
              :step "0.1"
              :value (let [v (:difficulty draft)] (if (nil? v) "" v))
              :on-change #(campo! :difficulty (.. % -target -value))}]]
    [:p {:class "mt-1 text-xs text-gray-600"}
     "Mueve el ítem que se sirve después, no la respuesta de este."]]
   [:div
    [campos/field "Módulo" "De acá salen «Mi plan» y el material del «no sé»"
     [:select {:class campos/input-class
               :value (or (:module_id draft) "")
               :on-change #(campo! :module_id (.. % -target -value))}
      [:option {:value ""} "— sin módulo —"]
      (for [[track ms] (editor/modules-by-track @(re-frame/subscribe [:admin/modules]))]
        ^{:key track}
        [:optgroup {:label track}
         (for [m ms]
           ^{:key (:id m)}
           [:option {:value (:id m)} (editor/module-label m)])])]]
    (when (str/blank? (str (:module_id draft)))
      ;; `alarma-700` y no el ámbar de fábrica: desde ADR-033 «algo está mal» se
      ;; dice con el color del diodo de alarma, que sí es de la paleta.
      [:p {:class "mt-1 text-xs text-alarma-700"}
       "Sin módulo, este ítem no aporta material a «Mi plan» ni al «no sé»."])]])

(defn- barra-acciones
  [{:keys [cambios saving? puede-reintentar?]}]
  (let [n (count cambios)
        etiqueta (cond saving? "Guardando…"
                       (zero? n) "Sin cambios"
                       (= n 1) "Guardar 1 campo"
                       :else (str "Guardar " n " campos"))]
    [:div {:class (str "sticky bottom-0 -mx-4 mt-4 flex flex-wrap items-center justify-end "
                       "gap-2 border-t border-panel-500 bg-panel-100 px-4 py-3")}
     [:button {:type "button"
               :class (str "control min-h-11 rounded border border-panel-500 bg-white px-3 py-1.5 "
                           "text-sm font-medium text-gray-800 hover:bg-panel-200")
               :on-click #(re-frame/dispatch [:editor-vivo/cerrar])}
      "Descartar"]
     (when puede-reintentar?
       ;; El botón que convierte el editor en un depurador: guarda y vuelve a
       ;; correr el mismo ítem con el cambio puesto (`universo.reintento`).
       [:button {:type "button"
                 :disabled saving?
                 :title "Guarda y vuelve a mostrar este mismo ítem, ya editado"
                 :class (str "control min-h-11 rounded border border-panel-600 bg-panel-200 px-3 py-1.5 "
                             "text-sm font-medium text-gray-900 hover:bg-panel-300 "
                             "disabled:cursor-not-allowed disabled:opacity-50")
                 :on-click #(re-frame/dispatch [:editor-vivo/guardar {:reintentar? true}])}
        "Guardar y volver a servir ↻"])
     [:button {:type "button"
               :disabled (or saving? (zero? n))
               :title "⌘/Ctrl+Enter"
               :class (str "control min-h-11 rounded bg-senal-400 px-3 py-1.5 text-sm font-medium "
                           "text-grafito-900 hover:bg-senal-300 "
                           "disabled:cursor-not-allowed disabled:opacity-50")
               :on-click #(re-frame/dispatch [:editor-vivo/guardar {}])}
      etiqueta]]))

(defn editor-panel
  "Cuerpo de la pestaña de edición. `seleccionada` es la letra que respondió el
   estudiante (nil en un escape: ahí no hay alternativa que juzgar)."
  [seleccionada]
  (let [{:keys [loading? saving? error aviso draft original]} @(re-frame/subscribe [:editor-vivo/estado])
        cambios @(re-frame/subscribe [:editor-vivo/cambios])
        theta @(re-frame/subscribe [:test/theta])
        puede-reintentar? @(re-frame/subscribe [:test/puede-reintentar?])
        elegida (when seleccionada (str/upper-case (str seleccionada)))
        ;; ⌘/Ctrl+Enter guarda y Esc cierra, igual que el editor del panel (D-58).
        ;; Van en el contenedor y no en cada campo para que funcionen desde el
        ;; `textarea`, que es donde se pasa el tiempo.
        on-key (fn [e]
                 (cond
                   (and (= (.-key e) "Enter") (or (.-metaKey e) (.-ctrlKey e)))
                   (do (.preventDefault e)
                       (re-frame/dispatch [:editor-vivo/guardar {}]))

                   (= (.-key e) "Escape")
                   (do (.preventDefault e)
                       (re-frame/dispatch [:editor-vivo/cerrar]))))]
    [:div {:class "px-4 pb-2 pt-4" :on-key-down on-key}
     (cond
       loading?
       [:p {:class "text-sm text-gray-600"} "Cargando el ítem…"]

       (nil? draft)
       [:p {:class "text-sm text-gray-600"}
        (or error "No se pudo cargar el ítem.")]

       :else
       [:<>
        (when error
          [:div {:role "alert"
                 :class (str "mb-3 rounded border border-panel-500 border-l-2 border-l-alarma-700 "
                             "bg-panel-100 px-3 py-2 text-sm text-gray-900")}
           error])
        (when aviso
          [:p {:class "mb-3 text-sm text-gray-700"} aviso])

        [fila-medicion draft theta]

        [campos/latex-editor
         {:label "Enunciado"
          :hint "Texto + LaTeX"
          :value (:question draft)
          :rows 3
          :on-change #(campo! :question %)}]

        [:div {:class "space-y-3"}
         (when elegida
           [bloque-distractor draft original elegida true])
         [:details (when-not elegida {:open true})
          [:summary {:class "cursor-pointer text-sm font-medium text-gray-700"}
           (if elegida
             "Las otras tres explicaciones"
             "Las cuatro explicaciones")]
          [:div {:class "mt-3 space-y-3"}
           (for [l letras :when (not= l elegida)]
             ^{:key l}
             [bloque-distractor draft original l false])]]]

        [barra-acciones {:cambios cambios
                         :saving? saving?
                         :puede-reintentar? puede-reintentar?}]])]))
