(ns universo.tablas-md
  "Tablas de Markdown en el cuerpo de un recurso (T-62).

   `plan/resource-card` renderiza `resources.body` con `math/latex`, que
   entiende `$…$` y negritas pero no tablas: una tabla salía como filas de
   texto con barras verticales. Medido el 2026-09-23, son **10 recursos
   publicados**, 8 de ellos de `electrotecnia`, que es el track que usa un
   alumno real.

   ── Por qué un parser propio y no `math/parse-markdown-latex` ──────────────
   Cambiar de renderizador afectaría a los recursos PAES, que se escribieron
   contra `math/latex` y nadie revisó contra el otro (T-62, opción 3). Esto
   agrega **solo** tablas: un cuerpo sin tabla vuelve como un único bloque de
   texto, idéntico al de antes, y se renderiza exactamente igual. Medido: 0 de
   los 80 recursos PAES tiene siquiera una línea que empiece con `|`.

   ── Qué cuenta como tabla ──────────────────────────────────────────────────
   Una línea que empieza con `|`, seguida de una fila separadora (`|---|:--:|`),
   seguida de cero o más líneas que empiezan con `|`. Una barra suelta al
   principio de una línea no alcanza: sin la fila separadora no hay tabla.

   Las celdas se separan por `|` **fuera de `$…$`**, porque una celda puede
   traer `$|x|$` y partirla ahí rompería la fórmula."
  (:require [clojure.string :as str]))

(defn- fila? [linea]
  (str/starts-with? (str/triml linea) "|"))

(defn- separadora?
  "Solo `|`, `:`, `-` y espacios, con al menos una barra y un guion. GFM
   acepta un solo guion por celda (`|:-|`)."
  [linea]
  (boolean (and (re-matches #"[\s|:\-]+" linea)
                (str/includes? linea "|")
                (str/includes? linea "-"))))

(defn celdas
  "Las celdas de una fila de tabla, recortadas. Un `|` dentro de `$…$` no
   separa; un `\\$` es un peso literal y no abre matemática (mismo criterio
   que `math/split-by-latex-improved`)."
  [linea]
  (let [s (str/trim linea)
        s (if (str/starts-with? s "|") (subs s 1) s)
        s (if (and (str/ends-with? s "|") (not (str/ends-with? s "\\|"))) (subs s 0 (dec (count s))) s)]
    (loop [cs (seq s) en-math? false actual "" acc []]
      (if-not cs
        (mapv str/trim (conj acc actual))
        (let [c (first cs) sig (second cs)]
          (cond
            (and (= c \\) (= sig \$)) (recur (nnext cs) en-math? (str actual "\\$") acc)
            (= c \$)                  (recur (next cs) (not en-math?) (str actual c) acc)
            (and (= c \|) (not en-math?)) (recur (next cs) en-math? "" (conj acc actual))
            :else                     (recur (next cs) en-math? (str actual c) acc)))))))

(defn bloques
  "Parte un cuerpo en `{:tipo :texto :contenido s}` y
   `{:tipo :tabla :encabezado [..] :filas [[..] ..]}`, en orden.

   El texto se devuelve **tal cual**, con sus saltos de línea: el contenedor
   usa `whitespace-pre-wrap`. Solo se quita el salto que separaba el texto de
   una tabla, que si no quedaría como una línea en blanco de más."
  [texto]
  (if (str/blank? texto)
    []
    (let [lineas (str/split texto #"\n" -1)
          n (count lineas)
          texto-de (fn [ls] {:tipo :texto :contenido (str/join "\n" ls)})]
      (loop [i 0 pendiente [] acc []]
        (cond
          (>= i n)
          (cond-> acc (seq pendiente) (conj (texto-de pendiente)))

          (and (fila? (nth lineas i))
               (< (inc i) n)
               (separadora? (nth lineas (inc i))))
          (let [fin (loop [j (+ i 2)] (if (and (< j n) (fila? (nth lineas j))) (recur (inc j)) j))
                pendiente (if (and (seq pendiente) (str/blank? (peek pendiente))) (pop pendiente) pendiente)
                tabla {:tipo :tabla
                       :encabezado (celdas (nth lineas i))
                       :filas (mapv celdas (subvec (vec lineas) (+ i 2) fin))}
                ;; El salto que seguía a la tabla también sobra.
                fin' (if (and (< fin n) (str/blank? (nth lineas fin))) (inc fin) fin)]
            (recur fin' [] (cond-> acc (seq pendiente) (conj (texto-de pendiente)) true (conj tabla))))

          :else
          (recur (inc i) (conj pendiente (nth lineas i)) acc))))))
