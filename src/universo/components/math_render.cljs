(ns universo.components.math-render
  (:require ["katex" :as katex]
            [clojure.string :as str]))

(defn normalize-latex [text]
  (when text
    (str/replace text "\\\\" "\\")))

;; ========================================
;; 1️⃣ CORE: Renderizado básico de KaTeX
;; ========================================

(defn render-latex-math [expr]
  (let [html (.renderToString katex expr #js {:throwOnError false})
        node (.createElement js/document "div")]
    (set! (.-innerHTML node) html)
    (let [mathml-part (.. node (querySelector ".katex-mathml"))]
      [:span {:dangerouslySetInnerHTML {:__html (.-outerHTML mathml-part)}}])))

;; ========================================
;; 2️⃣ PARSER MEJORADO: Separa $...$ y $$...$$
;; ========================================
(defn split-by-latex-improved [text]
  (if (or (nil? text) (empty? text))
    []
    (loop [remaining text
           result []
           in-display? false
           in-inline? false
           current ""]
      (if (empty? remaining)
        (if (empty? current)
          result
          ;; ✅ FIX: si quedó math sin cerrar, tratarlo como texto plano
          (conj result {:type (if (or in-display? in-inline?)
                                :text  ;; <-- era :display-math o :inline-math
                                :text)
                        :content current}))
        (let [c (first remaining)
              next-c (second remaining)
              rest-text (subs remaining 1)]
          (cond
            (and (= c \$) (= next-c \$) (not in-inline?))
            (if in-display?
              (recur (subs remaining 2)
                     (conj result {:type :display-math :content current})
                     false false "")
              (recur (subs remaining 2)
                     (if (empty? current) result
                         (conj result {:type :text :content current}))
                     true false ""))

            (and (= c \$) (not in-display?))
            (if in-inline?
              (recur rest-text
                     (conj result {:type :inline-math :content current})
                     false false "")
              (recur rest-text
                     (if (empty? current) result
                         (conj result {:type :text :content current}))
                     false true ""))

            :else
            (recur rest-text result in-display? in-inline? (str current c))))))))
#_(defn split-by-latex-improved [text]
  "Separa texto en bloques: texto plano, math inline ($...$) y display ($$...$$)"
  (if (or (nil? text) (empty? text))
    []
    (loop [remaining text
           result []
           in-display? false
           in-inline? false
           current ""]
      (if (empty? remaining)
        ;; Terminar: agregar último fragmento
        (if (empty? current)
          result
          (conj result {:type (cond in-display? :display-math
                                    in-inline? :inline-math
                                    :else :text)
                        :content current}))

        (let [c (first remaining)
              next-c (second remaining)
              rest-text (subs remaining 1)]

          (cond
            ;; Detectar $$
            (and (= c \$) (= next-c \$) (not in-inline?))
            (if in-display?
              ;; Cerrar display math
              (recur (subs remaining 2)
                     (conj result {:type :display-math :content current})
                     false
                     false
                     "")
              ;; Abrir display math (guardar texto previo)
              (recur (subs remaining 2)
                     (if (empty? current)
                       result
                       (conj result {:type :text :content current}))
                     true
                     false
                     ""))

            ;; Detectar $ (inline)
            (and (= c \$) (not in-display?))
            (if in-inline?
              ;; Cerrar inline math
              (recur rest-text
                     (conj result {:type :inline-math :content current})
                     false
                     false
                     "")
              ;; Abrir inline math (guardar texto previo)
              (recur rest-text
                     (if (empty? current)
                       result
                       (conj result {:type :text :content current}))
                     false
                     true
                     ""))

            ;; Carácter normal
            :else
            (recur rest-text result in-display? in-inline? (str current c))))))))

;; ========================================
;; 2.5️⃣ PARSER: Bold e Italic dentro de texto
;; ========================================

(defn parse-inline-markdown "Convierte **bold**, *italic* y ***bold-italic*** en hiccup" [text]
  (loop [remaining text
         result []]
    (if (empty? remaining)
      result
      (cond
        ;; ***bold-italic***
        (str/starts-with? remaining "***")
        (let [end (str/index-of remaining "***" 3)]
          (if end
            (recur (subs remaining (+ end 3))
                   (conj result [:strong [:em (subs remaining 3 end)]]))
            (conj result [:span remaining])))

        ;; **bold**
        (str/starts-with? remaining "**")
        (let [end (str/index-of remaining "**" 2)]
          (if end
            (recur (subs remaining (+ end 2))
                   (conj result [:strong (subs remaining 2 end)]))
            (conj result [:span remaining])))

        ;; *italic*
        (str/starts-with? remaining "*")
        (let [end (str/index-of remaining "*" 1)]
          (if end
            (recur (subs remaining (+ end 1))
                   (conj result [:em (subs remaining 1 end)]))
            (conj result [:span remaining])))

        ;; texto normal hasta el próximo * o fin
        :else
        (let [next-special (or (str/index-of remaining "*") (count remaining))]
          (recur (subs remaining next-special)
                 (conj result [:span (subs remaining 0 next-special)])))))))

;; ========================================
;; 3️⃣ PARSER MARKDOWN: Títulos, bold, quotes
;; ========================================

(defn parse-markdown-line [line]
  "Parsea una línea y retorna tipo + contenido"
  (cond
    (str/starts-with? line "# ")      {:type :h3 :content (subs line 2)}
    (str/starts-with? line "## ")     {:type :h4 :content (subs line 3)}
    (str/starts-with? line "### ")    {:type :h5 :content (subs line 4)}
    (str/starts-with? line "> ")      {:type :quote :content (subs line 2)}
    (str/starts-with? line "- ")      {:type :list-item :content (subs line 2)}
    (str/starts-with? line "$$")      {:type :display-math
                                       :content (-> line
                                                    (subs 2)
                                                    (str/replace #"\$\$$" "")
                                                    str/trim)}
    (str/blank? line)                 {:type :blank}
    :else                             {:type :paragraph :content line}))



;; ========================================
;; 6️⃣ FUNCIÓN SIMPLE (backward compatible)
;; ========================================

(defn latex [text]
  (let [text (normalize-latex text)]
    (if (or (nil? text) (empty? text))
      [:span ""]
      (let [parts (split-by-latex-improved text)]
        (into [:span]
              (map (fn [{:keys [type content]}]
                     (case type
                       :display-math [:div.math-display
                                      {:style {:margin "0.5rem 0"
                                               :text-align "center"}}
                                      (render-latex-math content)]
                       :inline-math  (render-latex-math content)
                       :text         (into [:span] (parse-inline-markdown content))
                       [:span content]))
                   parts))))))



;; ========================================
;; 4️⃣ RENDERIZADO: Bloques Markdown → Hiccup
;; ========================================

(defn render-markdown-block [{:keys [type content]}]
  "Convierte un bloque markdown en hiccup con LaTeX embebido"
  (case type
    :h3          [:h3.explanation-title (latex content)]
    :h4          [:h4.explanation-subtitle (latex content)]
    :h5          [:h5.explanation-subsubtitle (latex content)]

    :quote       [:blockquote.explanation-note
                  {:style {:padding-left "1rem"
                           :border-left "3px solid #3b82f6"
                           :margin "0.5rem 0"
                           :color "#64748b"
                           :font-style "italic"}}
                  (latex content)]

    :list-item   [:li.explanation-item (latex content)]

    :display-math [:div.math-display
                   {:style {:margin "1rem 0"
                            :padding "1rem"
                            :background "#f8fafc"
                            :border-radius "8px"
                            :text-align "center"}}
                   (render-latex-math content)]

    :blank       [:div {:style {:height "0.75rem"}}]

    :paragraph   [:p.explanation-text
                  {:style {:margin "0.5rem 0"
                           :line-height "1.8"}}
                  (latex content)]

    ;; Default
    [:span (str content)]))



;; ========================================
;; 5️⃣ FUNCIÓN PRINCIPAL: Texto → Hiccup completo
;; ========================================

(defn parse-markdown-latex [text]
  (let [text (normalize-latex text)]
    (if (or (nil? text) (empty? text))
      [:div ""]
      (let [lines  (str/split-lines text)
            blocks (map parse-markdown-line lines)]
        (into [:div.markdown-latex-content
               {:style {:max-width "100%"
                        :line-height "1.8"}}]
              (map-indexed
               (fn [idx block]
                 ^{:key idx}
                 (render-markdown-block block))
               blocks))))))


;; ========================================
;; 7️⃣ TESTS (comment block)
;; ========================================

(comment
  ;; Test 1: Básico inline
  (latex "$(-3)(-5)$ cuanto es")
  ;; => [:span [:span ""] [math] [:span " cuanto es"]]

  ;; Test 2: Display math
  (latex "Evalúa: $$x^2 + y^2 = z^2$$")

  ;; Test 3: Markdown completo
  (parse-markdown-latex
   "# Solución correcta

$$ (2 + 3) - 4 = 5 - 4 $$

> Primero resolvemos el paréntesis

$$ = 1 $$

**Respuesta:** $1$ es correcto")

  ;; Test 4: Parser mejorado
  (split-by-latex-improved "$a$ texto $$b$$ más $c$")
  ;; => [{:type :inline-math :content "a"}
  ;;     {:type :text :content " texto "}
  ;;     {:type :display-math :content "b"}
  ;;     {:type :text :content " más "}
  ;;     {:type :inline-math :content "c"}]
  )
