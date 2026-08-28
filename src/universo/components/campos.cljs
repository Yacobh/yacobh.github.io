(ns universo.components.campos
  "Los campos de formulario que edita el banco de preguntas, en un solo lugar.

   Vivían dentro de `components/admin-questions` como privados. Salieron cuando
   el editor en vivo del diagnóstico (ADR-032) necesitó **los mismos** campos con
   otro `on-change`: duplicarlos habría dejado dos vistas previas de LaTeX que se
   desincronizan, que es exactamente la trampa que `universo.editor` documenta
   para las reglas de validación.

   Ninguno de estos componentes despacha nada: reciben `on-change`. El evento lo
   pone quien los usa —el panel manda a `:admin/update-question-draft`, el editor
   en vivo a `:editor-vivo/campo`— y así el mismo campo sirve a los dos sin saber
   de ninguno."
  (:require
   [clojure.string :as str]
   [re-frame.core :as re-frame]
   [universo.components.math-render :as math]
   [universo.editor :as editor]
   [universo.misconceptions :as mis]))

(def input-class
  (str "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 "
       "placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none "
       "focus:ring-1 focus:ring-indigo-500"))

(def mono-class
  (str input-class " font-mono"))

(defn field [label hint body]
  [:label {:class "block"}
   [:span {:class "mb-1 block text-xs font-medium text-gray-600"} label]
   (when hint
     [:span {:class "mb-1 block text-xs text-gray-400"} hint])
   body])

(defn latex-editor
  "Campo de texto con vista previa **solo cuando la previa dice algo**.

   El formulario del panel tiene nueve campos con previa. Cuando el contenido es
   «2» o «Sumó mal», la caja repetía el texto y duplicaba el largo del formulario
   sin aportar nada; ahora en ese caso queda una línea que explica por qué no hay
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

(defn misconception-select
  "Desplegable de idea errónea para un distractor.

   El valor es el `uuid` del catálogo; `«— sin catalogar —»` manda `\"\"` —que el
   guardado convierte en `nil`— y es lo que `027` define como «este distractor
   todavía no se estudió». Las del experimento de cuántica quedan en su propio
   grupo para que no se mezclen con las del producto sin avisar (Q-40)."
  [{:keys [value on-change]}]
  (let [rows @(re-frame/subscribe [:admin/misconceptions])
        {:keys [producto experimento]} (mis/split-experimento rows)]
    [:div {:class "-mt-2 mb-4"}
     [field "Idea errónea" "La identidad reusable del error, del catálogo"
      [:select {:class input-class
                :value (or value "")
                :on-change #(on-change (.. % -target -value))}
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
