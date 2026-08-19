(ns universo.components.admin-questions
  "Editor del banco de preguntas (LaTeX + KaTeX) para el panel admin."
  (:require
   [clojure.string :as str]
   [re-frame.core :as re-frame]
   [reagent.core :as r]
   [universo.components.math-render :as math]
   [universo.editor :as editor]
   [universo.misconceptions :as mis]))

(def ^:private input-class
  (str "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 "
       "placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none "
       "focus:ring-1 focus:ring-indigo-500"))

(def ^:private mono-class
  (str input-class " font-mono"))

(defn- truncate [s n]
  (let [t (or s "")]
    (if (> (count t) n) (str (subs t 0 n) "…") t)))

(defn- field [label hint body]
  [:label {:class "block"}
   [:span {:class "mb-1 block text-xs font-medium text-gray-600"} label]
   (when hint
     [:span {:class "mb-1 block text-xs text-gray-400"} hint])
   body])

(defn- latex-editor
  "Campo de texto con vista previa **solo cuando la previa dice algo**.

   Este formulario tiene nueve campos con previa. Cuando el contenido es «2» o
   «Sumó mal», la caja repetía el texto y duplicaba el largo del formulario sin
   aportar nada; ahora en ese caso queda una línea que explica por qué no hay
   previa, en vez de un hueco que parece un error. La regla vive en
   `universo.editor/renderable?`."
  [{:keys [label hint value on-change rows markdown?]}]
  (let [previa? (editor/renderable? value {:markdown? markdown?})]
    [:div {:class "mb-4"}
     [field label hint
      [:textarea {:class mono-class
                  :rows (or rows 3)
                  :value (or value "")
                  :on-change #(on-change (.. % -target -value))}]]
     (if previa?
       [:div {:class "mt-2 min-h-10 rounded-lg border border-dashed border-gray-200 bg-gray-50 px-3 py-2"}
        [:p {:class "mb-1 text-xs text-gray-400"} "Vista previa"]
        (if markdown?
          [math/parse-markdown-latex value]
          [math/latex value])]
       (when-not (str/blank? (str value))
         [:p {:class "mt-1 text-xs text-gray-400"}
          "Texto sin fórmulas: se muestra tal cual."]))]))

(defn- parse-optional-number [raw]
  (when (pos? (count raw)) raw))

(defn- meta-row [draft]
  (let [topics @(re-frame/subscribe [:admin/question-topics])
        modules @(re-frame/subscribe [:admin/modules])
        topic (or (:topic draft) "")
        known? (some #{topic} topics)
        topic-select-value (if (or known? (str/blank? topic)) topic "__custom__")]
    [:div {:class "mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2"}
     [:div
      [field "Tema" "Elige uno existente o escribe uno nuevo"
       [:<>
        [:select {:class (str input-class " mb-2")
                  :value topic-select-value
                  :on-change (fn [e]
                               (let [v (.. e -target -value)]
                                 (when-not (= v "__custom__")
                                   (re-frame/dispatch [:admin/update-question-draft :topic v]))))}
         [:option {:value ""} "— seleccionar —"]
         (for [t topics]
           ^{:key t} [:option {:value t} t])
         [:option {:value "__custom__"} "Otro (escribir abajo)"]]
        [:input {:class input-class
                 :type "text"
                 :placeholder "Tema nuevo o edición"
                 :value topic
                 :on-change #(re-frame/dispatch
                              [:admin/update-question-draft :topic
                               (.. % -target -value)])}]]]]
     [:div {:class "grid grid-cols-2 gap-3"}
      [field "Dificultad (b)" "IRT, p.ej. -2 … 2"
       [:input {:class input-class
                :type "number"
                :step "0.1"
                :value (or (:difficulty draft) "")
                :on-change #(re-frame/dispatch
                             [:admin/update-question-draft :difficulty
                              (parse-optional-number (.. % -target -value))])}]]
      [field "Orden" "order_index opcional"
       [:input {:class input-class
                :type "number"
                :step "1"
                :value (or (:order_index draft) "")
                :on-change #(re-frame/dispatch
                             [:admin/update-question-draft :order_index
                              (parse-optional-number (.. % -target -value))])}]]]
     [:div
      [field "Módulo" "De acá salen «Mi plan» y el material del «no sé»"
       [:select {:class input-class
                 :value (or (:module_id draft) "")
                 :on-change #(re-frame/dispatch
                              [:admin/update-question-draft :module_id
                               (.. % -target -value)])}
        [:option {:value ""} "— sin módulo —"]
        (for [[track ms] (editor/modules-by-track modules)]
          ^{:key track}
          [:optgroup {:label track}
           (for [m ms]
             ^{:key (:id m)}
             [:option {:value (:id m)} (editor/module-label m)])])]]
      ;; Un tercio del banco no tiene módulo (T-60) y eso no es cosmético: sin
      ;; él, «Mi plan» no puede recomendar nada para el ítem y el escape del
      ;; estudiante (ADR-029) se queda sin material que entregar. El aviso está
      ;; acá, en el único lugar donde se puede arreglar.
      (when (str/blank? (str (:module_id draft)))
        [:p {:class "mt-1 text-xs text-amber-700"}
         "Sin módulo, este ítem no aporta material a «Mi plan» ni al «no sé»."])]
     [:div {:class "sm:col-span-2"}
      [field "Respuesta correcta" nil
       [:div {:class "flex gap-3"}
        (for [opt ["A" "B" "C" "D"]]
          ^{:key opt}
          [:label {:class "flex cursor-pointer items-center gap-1.5 text-sm"}
           [:input {:type "radio"
                    :name "correct_option"
                    :checked (= (str/trim (str (:correct_option draft))) opt)
                    :on-change #(re-frame/dispatch
                                 [:admin/update-question-draft :correct_option opt])}]
           opt])]]]]))

(defn- misconception-select
  "Desplegable de idea errónea para un distractor.

   El valor es el `uuid` del catálogo; `«— sin catalogar —»` manda `nil` a la
   base, que es lo que `027` define como «este distractor todavía no se estudió».
   Las del experimento de cuántica quedan en su propio grupo para que no se
   mezclen con las del producto sin avisar (Q-40)."
  [draft k]
  (let [rows @(re-frame/subscribe [:admin/misconceptions])
        {:keys [producto experimento]} (mis/split-experimento rows)]
    [:div {:class "-mt-2 mb-4"}
     [field "Idea errónea" "La identidad reusable del error, del catálogo"
      [:select {:class input-class
                :value (or (get draft k) "")
                :on-change #(re-frame/dispatch
                             [:admin/update-question-draft k (.. % -target -value)])}
       [:option {:value ""} "— sin catalogar —"]
       (when (seq producto)
         [:optgroup {:label "Catálogo"}
          (for [m (sort-by :slug producto)]
            ^{:key (:id m)}
            [:option {:value (:id m)} (str (:name m) " · " (:slug m))])])
       (when (seq experimento)
         [:optgroup {:label "Experimento de cuántica"}
          (for [m (sort-by :slug experimento)]
            ^{:key (:id m)}
            [:option {:value (:id m)} (str (:name m) " · " (:slug m))])])]]
     (when (empty? rows)
       [:p {:class "mt-1 text-xs text-gray-400"}
        "El catálogo está vacío: créalas en la pestaña «Ideas erróneas»."])]))

(defn- question-editor
  "Formulario de un ítem del banco.

   Tres cosas que no son adorno y conviene no deshacer:

   1. **La barra de acciones es `sticky`.** El formulario mide quince campos; con
      los botones solo arriba había que subir hasta el principio para guardar
      cada corrección, y ese viaje se paga una vez por ítem en un banco de 387.
   2. **⌘/Ctrl+Enter guarda y Esc cancela**, igual que el editor de recursos
      (D-58). Van en el contenedor, no en cada campo, para que funcionen también
      desde el `textarea`, que es donde se pasa el tiempo.
   3. **Lo que falta se dice antes de pulsar Guardar**, no en un toast después.
      La lista sale de `editor/question-missing-fields`, la misma función que
      usa el evento para decidir si guarda — no hay dos criterios."
  []
  (let [draft @(re-frame/subscribe [:admin/question-draft])
        saving? @(re-frame/subscribe [:admin/question-saving?])
        new? (nil? (:id draft))
        faltan (editor/question-missing-fields draft)
        guardable? (and (empty? faltan) (not saving?))
        guardar! #(when guardable? (re-frame/dispatch [:admin/save-question]))
        on-key (fn [e]
                 (cond
                   (and (= (.-key e) "Enter") (or (.-metaKey e) (.-ctrlKey e)))
                   (do (.preventDefault e) (guardar!))

                   (= (.-key e) "Escape")
                   (do (.preventDefault e)
                       (re-frame/dispatch [:admin/cancel-question-edit]))))]
    [:div {:class "mb-6 rounded-xl border border-indigo-100 bg-white p-5"
           :on-key-down on-key}
     [:div {:class (str "sticky top-14 z-10 -mx-5 mb-4 flex flex-wrap items-center "
                        "justify-between gap-2 border-b border-gray-100 bg-white px-5 pb-3 pt-1")}
      [:div
       [:h3 {:class "text-lg font-semibold text-gray-900"}
        (if new? "Nueva pregunta" (str "Editar #" (:id draft)))]
       [:span {:class "hidden text-xs text-gray-500 sm:inline"}
        "⌘/Ctrl+Enter guarda · Esc cancela"]]
      [:div {:class "flex flex-wrap gap-2"}
       (when-not new?
         [:button {:type "button"
                   :disabled saving?
                   :class (str "rounded-lg bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 transition "
                               "hover:bg-red-100 disabled:opacity-50 focus:outline-none "
                               "focus-visible:ring-2 focus-visible:ring-red-400")
                   :on-click #(re-frame/dispatch
                               [:confirm/ask
                                {:message "¿Eliminar esta pregunta?"
                                 :confirm-label "Eliminar"
                                 :variant :danger
                                 :on-confirm [:admin/delete-question (:id draft)]}])}
          "Eliminar"])
       [:button {:type "button"
                 :disabled saving?
                 :class (str "rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 transition "
                             "hover:bg-gray-200 disabled:opacity-50 focus:outline-none "
                             "focus-visible:ring-2 focus-visible:ring-gray-400")
                 :on-click #(re-frame/dispatch [:admin/cancel-question-edit])}
        "Cancelar"]
       [:button {:type "button"
                 :disabled (not guardable?)
                 :title (if (seq faltan)
                          (str "Falta " (str/join ", " faltan))
                          "Guardar (⌘/Ctrl+Enter)")
                 :class (str "rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white transition "
                             "hover:bg-indigo-700 disabled:opacity-50 focus:outline-none "
                             "focus-visible:ring-2 focus-visible:ring-indigo-400")
                 :on-click guardar!}
        (if saving? "Guardando…" "Guardar")]]]

     (when (seq faltan)
       [:div {:class "mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-800"}
        (str "Para guardar falta: " (str/join ", " faltan) ".")])

     [:p {:class "mb-4 text-xs text-gray-500"}
      "LaTeX: usa $x^2$ para inline y $$\\frac{a}{b}$$ para display. "
      "Las explicaciones admiten markdown ligero + LaTeX."]

     [meta-row draft]

     [latex-editor
      {:label "Enunciado"
       :hint "Texto + LaTeX"
       :value (:question draft)
       :rows 4
       :on-change #(re-frame/dispatch [:admin/update-question-draft :question %])}]

     (for [[k lab] [[:option_a "Opción A"]
                    [:option_b "Opción B"]
                    [:option_c "Opción C"]
                    [:option_d "Opción D"]]]
       ^{:key k}
       [latex-editor
        {:label lab
         :value (get draft k)
         :rows 2
         :on-change #(re-frame/dispatch [:admin/update-question-draft k %])}])

     [:details {:class "mt-2"}
      [:summary {:class "mb-2 cursor-pointer text-sm font-medium text-gray-600"}
       "Explicaciones de error (feedback)"]
      [:p {:class "mb-3 text-xs text-gray-500"}
       "Cada distractor tiene dos cosas distintas: la explicación —que habla de "
       "los números de este ítem— y la idea errónea, que es la misma en todos los "
       "ítems donde aparece. La explicación se escribe acá; la idea errónea se "
       "elige del catálogo y es lo que permite contar «cuántos estudiantes cometen "
       "este error»."]
      (for [[k lab mis-k] [[:error_a "Error A" :misconception_a_id]
                           [:error_b "Error B" :misconception_b_id]
                           [:error_c "Error C" :misconception_c_id]
                           [:error_d "Error D" :misconception_d_id]]]
        ^{:key k}
        [:div
         [latex-editor
          {:label lab
           :hint "Markdown + LaTeX"
           :value (get draft k)
           :rows 3
           :markdown? true
           :on-change #(re-frame/dispatch [:admin/update-question-draft k %])}]
         [misconception-select draft mis-k]])]]))

(defn- bulk-bar-inner [seleccion destino-atom]
  (let [modules @(re-frame/subscribe [:admin/modules])
        guardando? @(re-frame/subscribe [:admin/question-bulk-saving?])
        destino @destino-atom
        n (count seleccion)
        mover! (fn []
                 (when-not (str/blank? destino)
                   (re-frame/dispatch
                    [:confirm/ask
                     {:message (str "¿Mover los " n " ítems al tema «" (str/trim destino) "»?")
                      :confirm-label "Mover"
                      :on-confirm [:admin/bulk-update-questions {:topic (str/trim destino)}]}])))]
    (when (pos? n)
      [:div {:class (str "mb-3 flex flex-wrap items-center gap-3 rounded-lg border "
                         "border-gray-300 bg-gray-50 px-4 py-2")}
       [:p {:class "text-sm font-medium text-gray-800"}
        (str n (if (= 1 n) " ítem seleccionado" " ítems seleccionados"))]

       [:select {:class (str input-class " w-auto min-w-56")
                 :disabled guardando?
                 :value ""
                 :on-change (fn [e]
                              (let [v (.. e -target -value)]
                                (when (seq v)
                                  (re-frame/dispatch
                                   [:confirm/ask
                                    {:message (str "¿Asignar ese módulo a los " n " ítems seleccionados?")
                                     :confirm-label "Asignar"
                                     :on-confirm [:admin/bulk-update-questions {:module_id v}]}]))))}
        [:option {:value ""} "Asignar módulo…"]
        (for [[track ms] (editor/modules-by-track modules)]
          ^{:key track}
          [:optgroup {:label track}
           (for [m ms]
             ^{:key (:id m)}
             [:option {:value (:id m)} (editor/module-label m)])])]

       ;; Campo en línea y no un `js/prompt`: un diálogo nativo bloquea el hilo
       ;; del navegador —y con él cualquier automatización— y no se puede
       ;; corregir con Esc sin perder lo escrito.
       [:div {:class "flex items-center gap-2"}
        [:input {:class (str input-class " w-48")
                 :type "text"
                 :placeholder "Mover a otro tema…"
                 :disabled guardando?
                 :value destino
                 :on-change #(reset! destino-atom (.. % -target -value))
                 :on-key-down (fn [e]
                                (when (= "Enter" (.-key e))
                                  (.preventDefault e)
                                  (mover!)))}]
        [:button {:type "button"
                  :disabled (or guardando? (str/blank? destino))
                  :class (str "rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium "
                              "text-gray-700 hover:bg-white disabled:opacity-40")
                  :on-click mover!}
         "Mover"]]

       [:button {:type "button"
                 :class "text-sm text-gray-600 underline hover:text-gray-900"
                 :on-click #(re-frame/dispatch [:admin/clear-question-selection])}
        "Quitar selección"]

       (when guardando?
         [:span {:class "text-sm text-gray-500"} "Guardando…"])])))

(defn- bulk-bar
  "Acciones sobre los ítems seleccionados.

   Existe porque el 2026-08-18 se midió que los 84 ítems del diagnóstico y los 44
   de `paes_m1` **no tienen módulo**: sin módulo no hay banda que los alcance ni
   material que el plan o el escape puedan entregar. De a uno son cuatro clics
   por ítem.

   Componente de dos niveles: el `r/atom` del tema destino tiene que sobrevivir a
   los re-renders que provoca escribir en él."
  [_seleccion]
  (let [destino-atom (r/atom "")]
    (fn [seleccion]
      [bulk-bar-inner seleccion destino-atom])))

(defn- inline-edits-bar [dirty-count saving?]
  [:div {:class (str "mb-3 flex flex-wrap items-center justify-between gap-2 rounded-lg "
                      "border border-amber-200 bg-amber-50 px-4 py-2")}
   [:p {:class "text-sm text-amber-800"}
    (str dirty-count (if (= dirty-count 1)
                        " dificultad editada sin guardar."
                        " dificultades editadas sin guardar."))]
   [:div {:class "flex gap-2"}
    [:button {:type "button"
              :disabled saving?
              :class (str "rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 transition "
                          "hover:bg-gray-200 disabled:opacity-50 focus:outline-none "
                          "focus-visible:ring-2 focus-visible:ring-gray-400")
              :on-click #(re-frame/dispatch [:admin/discard-question-inline-edits])}
     "Descartar"]
    [:button {:type "button"
              :disabled saving?
              :class (str "rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white "
                          "transition hover:bg-indigo-700 disabled:opacity-50")
              :on-click #(re-frame/dispatch [:admin/save-question-inline-edits])}
     (if saving? "Guardando…" "Guardar cambios")]]])

(defn- difficulty-cell [q edited saving?]
  (let [dirty? (some? edited)]
    [:input {:type "number"
             :step "0.1"
             :disabled saving?
             :class (str "w-20 rounded-md border px-2 py-1 text-sm tabular-nums "
                         "focus:outline-none focus:ring-1 focus:ring-indigo-500 "
                         (if dirty?
                           "border-amber-300 bg-amber-50"
                           "border-gray-300"))
             :value (if dirty? edited (or (:difficulty q) ""))
             :on-change #(re-frame/dispatch
                          [:admin/set-question-inline-difficulty (:id q)
                           (.. % -target -value)])}]))

(defn- questions-list []
  (let [rows @(re-frame/subscribe [:admin/questions-view])
        inline-edits @(re-frame/subscribe [:admin/question-inline-edits])
        saving? @(re-frame/subscribe [:admin/question-inline-saving?])
        seleccion @(re-frame/subscribe [:admin/question-selection])
        ids-visibles (set (map :id rows))
        todos? (and (seq rows) (every? seleccion ids-visibles))
        dirty-count (count inline-edits)]
    (if-not (seq rows)
      [:div {:class "rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center"}
       [:p {:class "text-sm text-gray-500"} "Sin preguntas en este filtro."]]
      [:div
       (when (pos? dirty-count)
         [inline-edits-bar dirty-count saving?])
       [bulk-bar seleccion]
       [:div {:class "overflow-x-auto rounded-xl border border-gray-200 bg-white"}
        [:table {:class "w-full text-left text-sm"}
         [:thead {:class "bg-gray-50 text-gray-600"}
          [:tr
           [:th {:class "px-3 py-2"}
            [:input {:type "checkbox"
                     :aria-label "Seleccionar todo lo visible"
                     :checked todos?
                     :on-change #(re-frame/dispatch
                                  (if todos?
                                    [:admin/clear-question-selection]
                                    ;; Solo lo **visible**: con el filtro puesto,
                                    ;; «todo» tiene que significar lo que se está
                                    ;; mirando, no las 510 filas del banco.
                                    [:admin/select-questions ids-visibles]))}]]
           [:th {:class "px-3 py-2"} "ID"]
           [:th {:class "px-3 py-2"} "Tema"]
           [:th {:class "px-3 py-2"} "Enunciado"]
           [:th {:class "px-3 py-2"} "b (editable)"]
           [:th {:class "px-3 py-2"} "Orden"]
           [:th {:class "px-3 py-2"} ""]]]
         [:tbody {:class "divide-y divide-gray-100"}
          (for [q rows]
            (let [edited (get inline-edits (:id q))]
              ^{:key (:id q)}
              [:tr {:class (cond
                             (contains? seleccion (:id q)) "bg-gray-100"
                             edited "bg-amber-50"
                             :else "hover:bg-gray-50")}
               [:td {:class "px-3 py-2"}
                [:input {:type "checkbox"
                         :aria-label (str "Seleccionar ítem " (:id q))
                         :checked (contains? seleccion (:id q))
                         :on-change #(re-frame/dispatch
                                      [:admin/toggle-question-selection (:id q)])}]]
               [:td {:class "px-3 py-2 tabular-nums"} (:id q)]
               [:td {:class "px-3 py-2"} (:topic q)]
               [:td {:class "max-w-xs px-3 py-2"}
                [:span {:class "line-clamp-2"} (truncate (:question q) 80)]]
               [:td {:class "px-3 py-2"} [difficulty-cell q edited saving?]]
               [:td {:class "px-3 py-2 tabular-nums"} (or (:order_index q) "—")]
               [:td {:class "px-3 py-2"}
                [:button {:type "button"
                          :class "text-sm font-medium text-indigo-600 hover:text-indigo-900"
                          :on-click #(re-frame/dispatch [:admin/edit-question q])}
                 "Editar"]]]))]]]])))

(defn- fmt2 [v]
  (when (number? v) (.toFixed (double v) 2)))

(defn- bands-panel
  "Bandas de conocimiento: qué rango de dificultad le toca a cada módulo.

   **No escribe nada al pulsar «Aplicar».** Llena el mismo borrador que la
   edición en línea de la tabla, así que aparece la barra «N dificultades
   editadas sin guardar» con su botón de descartar. Proponer y guardar son dos
   pasos distintos a propósito: esto toca el activo del proyecto."
  []
  (let [abierto? @(re-frame/subscribe [:admin/bands-open?])
        filas @(re-frame/subscribe [:admin/bands-view])
        draft @(re-frame/subscribe [:admin/band-draft])]
    [:div {:class "mb-4 rounded-xl border border-gray-200 bg-white"}
     [:button {:type "button"
               :class "flex w-full items-center justify-between px-4 py-3 text-left"
               :on-click #(re-frame/dispatch
                           [(if abierto? :admin/close-bands :admin/open-bands)])}
      [:span
       [:span {:class "text-sm font-medium text-gray-900"} "Bandas de conocimiento"]
       [:span {:class "ml-2 text-xs text-gray-500"}
        "Qué dificultad le corresponde a cada módulo según su lugar en la progresión"]]
      [:span {:class "text-gray-400"} (if abierto? "▲" "▼")]]

     (when abierto?
       [:div {:class "border-t border-gray-100 px-4 py-4"}
        [:p {:class "mb-3 text-xs text-gray-600"}
         "La banda sale del orden curricular (eje y " [:code "order_index"] " del módulo). "
         "Se puede fijar a mano por módulo. "
         [:strong "Es una hipótesis editorial, no una medición: "]
         "solo calibrar con respuestas reales la vuelve psicométricamente válida."]

        (if (empty? filas)
          [:p {:class "py-4 text-center text-sm text-gray-500"} "Cargando módulos…"]
          [:<>
           [:div {:class "overflow-x-auto"}
            [:table {:class "w-full text-sm"}
             [:thead
              [:tr {:class "border-b border-gray-200 text-left text-xs text-gray-500"}
               [:th {:class "py-2 pr-3"} "Módulo"]
               [:th {:class "py-2 pr-3"} "Ítems"]
               [:th {:class "py-2 pr-3"} "Hoy"]
               [:th {:class "py-2 pr-3"} "Banda"]
               [:th {:class "py-2"}]]]
             [:tbody
              (for [{:keys [module banda n-items actual-min actual-max]} filas]
                ^{:key (:id module)}
                [:tr {:class "border-b border-gray-100"}
                 [:td {:class "py-2 pr-3"}
                  [:p {:class "font-medium text-gray-900"} (:title module)]
                  [:p {:class "font-mono text-xs text-gray-500"} (:slug module)]]
                 [:td {:class "py-2 pr-3 tabular-nums text-gray-700"}
                  n-items
                  ;; Un módulo con muchos ítems no es un contenido, es un cajón de
                  ;; sastre: aplicarle una banda aprieta decenas de ítems distintos
                  ;; en menos de un logit y destruye el rango que tuviera. Se avisa
                  ;; acá, que es donde se decide.
                  (when (> n-items 25)
                    [:p {:class "mt-0.5 text-xs font-normal text-amber-700"}
                     "cajón de sastre: convendría partirlo (T-60)"])]
                 [:td {:class "py-2 pr-3 tabular-nums text-xs text-gray-500"}
                  (if (pos? n-items)
                    (str (or (fmt2 actual-min) "—") " … " (or (fmt2 actual-max) "—"))
                    "—")]
                 [:td {:class "py-2 pr-3"}
                  [:div {:class "flex items-center gap-1"}
                   [:input {:class (str input-class " w-20")
                            :type "number" :step "0.1"
                            :value (or (get-in draft [(:id module) :band-min])
                                       (some-> (:min banda) (.toFixed 2))
                                       "")
                            :on-change #(re-frame/dispatch
                                         [:admin/update-band-draft (:id module) :band-min
                                          (.. % -target -value)])}]
                   [:span {:class "text-gray-400"} "…"]
                   [:input {:class (str input-class " w-20")
                            :type "number" :step "0.1"
                            :value (or (get-in draft [(:id module) :band-max])
                                       (some-> (:max banda) (.toFixed 2))
                                       "")
                            :on-change #(re-frame/dispatch
                                         [:admin/update-band-draft (:id module) :band-max
                                          (.. % -target -value)])}]]
                  [:p {:class "mt-0.5 text-xs text-gray-400"}
                   (if (= :explicita (:origen banda)) "fijada a mano" "derivada del orden")]]
                 [:td {:class "py-2"}
                  [:div {:class "flex gap-2"}
                   [:button {:type "button"
                             :class (str "rounded-lg border border-gray-300 px-2 py-1.5 text-xs "
                                         "font-medium text-gray-700 hover:bg-gray-50")
                             :on-click #(re-frame/dispatch [:admin/save-module-band (:id module)])}
                    "Fijar"]
                   [:button {:type "button"
                             :disabled (zero? n-items)
                             :class (str "rounded-lg bg-gray-900 px-2 py-1.5 text-xs font-medium "
                                         "text-white hover:bg-gray-800 disabled:opacity-40")
                             :on-click #(re-frame/dispatch [:admin/apply-band (:id module)])}
                    "Aplicar"]]]])]]]

           [:div {:class "mt-4 flex flex-wrap items-center justify-between gap-3"}
            [:p {:class "text-xs text-gray-500"}
             "«Aplicar» no guarda: propone las dificultades y las deja en la barra de cambios "
             "pendientes, arriba de la tabla."]
            [:button {:type "button"
                      :class (str "rounded-lg border border-gray-300 px-3 py-2 text-sm "
                                  "font-medium text-gray-700 hover:bg-gray-50")
                      :on-click #(re-frame/dispatch
                                  [:confirm/ask
                                   {:message (str "¿Proponer dificultades para TODOS los módulos? "
                                                  "No se guarda nada todavía: podrás revisar y descartar.")
                                    :confirm-label "Proponer"
                                    :on-confirm [:admin/apply-all-bands]}])}
             "Aplicar a todos los módulos"]]])])]))

(defn questions-panel []
  (let [topics @(re-frame/subscribe [:admin/question-topics])
        filter @(re-frame/subscribe [:admin/question-topic-filter])
        sort-mode @(re-frame/subscribe [:admin/question-sort])
        editing? @(re-frame/subscribe [:admin/question-editing?])
        loading? @(re-frame/subscribe [:admin/section-loading? :questions])
        error @(re-frame/subscribe [:admin/section-error :questions])]
    [:div {:class "space-y-4"}
     [:div {:class "mb-2"}
      [:h2 {:class "text-lg font-semibold text-gray-900"} "Preguntas"]
      [:p {:class "mt-0.5 text-sm text-gray-500"}
       "Banco IRT: enunciados, opciones y explicaciones con vista previa LaTeX. "
       "La dificultad (b) se edita directo en la tabla, en lote."]]

     (when error
       [:div {:class "rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"}
        error])

     (when-not editing?
       [bands-panel])

     (when-not editing?
       [:div {:class "flex flex-wrap items-end justify-between gap-3"}
        [:div {:class "flex flex-wrap items-end gap-3"}
         [:div
          [:label {:class "mb-1 block text-xs font-medium text-gray-500"} "Filtrar por tema"]
          [:select {:class (str input-class " min-w-48")
                    :value (or filter "")
                    :on-change #(re-frame/dispatch
                                 [:admin/set-question-topic-filter
                                  (let [v (.. % -target -value)]
                                    (when (pos? (count v)) v))])}
           [:option {:value ""} "Todos"]
           (for [t topics]
             ^{:key t} [:option {:value t} t])]]
         [:div
          [:label {:class "mb-1 block text-xs font-medium text-gray-500"} "Ordenar por"]
          [:select {:class (str input-class " min-w-48")
                    :value (name (or sort-mode :default))
                    :on-change #(re-frame/dispatch
                                 [:admin/set-question-sort
                                  (keyword (.. % -target -value))])}
           [:option {:value "default"} "Tema / orden"]
           [:option {:value "difficulty-asc"} "Dificultad (menor → mayor)"]
           [:option {:value "difficulty-desc"} "Dificultad (mayor → menor)"]]]]
        [:button {:type "button"
                  :class "rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                  :on-click #(re-frame/dispatch [:admin/new-question])}
         "Nueva pregunta"]])

     (cond
       (and loading? (not editing?))
       [:div {:class "flex justify-center py-10"}
        [:div {:class "h-7 w-7 animate-spin rounded-full border-2 border-gray-200 border-b-indigo-600"}]]

       editing?
       [question-editor]

       :else
       [questions-list])]))
