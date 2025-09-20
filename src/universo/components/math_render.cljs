(ns universo.components.math-render
  (:require [clojure.string :as str]
            ["katex" :as katex]
            [reagent.core :as r]))




(defn katex-html
  "Renderiza LaTeX a HTML usando KaTeX. No lanza error si hay sintaxis inválida."
  [latex opts]
  (try
    (katex/renderToString latex (clj->js (merge {:throwOnError false} opts)))
    (catch :default e
      (js/console.error "KaTeX error:" e)
      (str "$" latex "$"))))

(defn inline-math
  "Devuelve un fragmento Reagent donde:
   - $$...$$ se renderiza en modo display
   - $...$ se renderiza en modo inline
   - El resto del texto se deja tal cual"
  [s]
  (let [; Prioriza $$...$$ antes que $...$
        matches (re-seq #"\$\$([^$]+)\$\$|\$([^$]+)\$|[^$]+" s)]
    (into
     [:<>]
     (map-indexed
      (fn [i m]
        (let [[full g-display g-inline] m]
          (cond
            g-display
            [:span.katex-display
             {:key i
              :dangerouslySetInnerHTML
              {:__html (katex-html g-display {:displayMode true})}}]

            g-inline
            [:span.katex-inline
             {:key i
              :dangerouslySetInnerHTML
              {:__html (katex-html g-inline {:displayMode false})}}]

            :else
            [:span {:key i} full]))))
     matches)))
