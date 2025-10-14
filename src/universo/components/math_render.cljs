(ns universo.components.math-render
  (:require ["katex" :as katex]
            [clojure.string :as str]))

#_(defn latex [expr]
  (let [html (.renderToString katex expr #js {:throwOnError false})
        node (.createElement js/document "div")]
    (set! (.-innerHTML node) html)
    (let [mathml-part (.. node (querySelector ".katex-mathml"))]
      ;; devolvemos el MathML
      [:span {:dangerouslySetInnerHTML {:__html (.-outerHTML mathml-part)}}])))

;; Versión más simple si sabes que usas solo $ ... $
;; 1️⃣ Tu función original - NO LA TOCAMOS (funciona bien)
(defn render-latex-math [expr]
  (let [html (.renderToString katex expr #js {:throwOnError false})
        node (.createElement js/document "div")]
    (set! (.-innerHTML node) html)
    (let [mathml-part (.. node (querySelector ".katex-mathml"))]
      [:span {:dangerouslySetInnerHTML {:__html (.-outerHTML mathml-part)}}])))

;; 2️⃣ Función que separa texto de matemáticas
(defn split-by-latex [text]
  (if (or (nil? text) (empty? text))
    []
    (let [parts (str/split text #"\$")] ;no me termina de gustar...
      (map-indexed
       (fn [idx part]
         {:type (if (even? idx) :text :math)
          :content part})
       parts))))

;; 3️⃣ Función que combina todo
(defn latex [text]
  (if (or (nil? text) (empty? text))
    [:span ""]
    (let [parts (split-by-latex text)]
      (into [:span]
            (map (fn [{:keys [type content]}]
                   (if (= type :math)
                     (if (empty? content)
                       [:span] ;; $ vacío
                       (render-latex-math content))
                     [:span content]))
                 parts)))))
(comment

(str/split "$(-3)(-5)$ cuanto es" #"\$")

)
