(ns universo.editor-test
  (:require
   [cljs.test :refer-macros [deftest is testing]]
   [universo.editor :as editor]))

(def ^:private modulos
  [{:id "1" :slug "algebra/inecuaciones" :title "Inecuaciones" :track "algebra" :order_index 2}
   {:id "2" :slug "algebra/factorizacion" :title "Factorización" :track "algebra" :order_index 1}
   {:id "3" :slug "geometria/areas" :title "Áreas" :track "geometria" :order_index 1}
   {:id "4" :slug "suelto" :title "Sin track" :track nil :order_index 0}])

(deftest modules-by-track-agrupa-y-ordena-como-recorre-el-estudiante
  (let [grupos (editor/modules-by-track modulos)]
    (testing "un grupo por track, ordenados por nombre de track"
      (is (= ["algebra" "geometria" "otros"] (mapv first grupos))))

    (testing "dentro del track manda order_index, no el alfabeto"
      (is (= ["Factorización" "Inecuaciones"]
             (mapv :title (second (first grupos))))))

    (testing "un módulo sin track no desaparece: cae en «otros»"
      (is (= ["Sin track"] (mapv :title (second (last grupos))))))

    (testing "vacío o nil no revientan"
      (is (= [] (editor/modules-by-track [])))
      (is (= [] (editor/modules-by-track nil))))))

(deftest module-label-no-obliga-a-traducir-entre-dos-vocabularios
  (testing "título y slug juntos, porque el resto del panel muestra slugs"
    (is (= "Inecuaciones · algebra/inecuaciones"
           (editor/module-label (first modulos)))))

  (testing "si falta uno de los dos, se muestra el que haya"
    (is (= "Solo título" (editor/module-label {:title "Solo título"})))
    (is (= "solo/slug" (editor/module-label {:slug "solo/slug"}))))

  (testing "sin nada utilizable no devuelve una cadena vacía invisible"
    (is (= "(módulo sin nombre)" (editor/module-label {})))
    (is (= "(módulo sin nombre)" (editor/module-label {:title "  " :slug ""})))))

(deftest renderable?-decide-cuando-la-vista-previa-aporta
  (testing "texto plano: la previa repetiría lo escrito"
    (is (not (editor/renderable? "2" {})))
    (is (not (editor/renderable? "Sumó mal" {})))
    (is (not (editor/renderable? "" {})))
    (is (not (editor/renderable? "   " {})))
    (is (not (editor/renderable? nil {}))))

  (testing "con LaTeX sí aporta"
    (is (editor/renderable? "¿Cuánto es $1 + 1$?" {}))
    (is (editor/renderable? "$$\\frac{a}{b}$$" {})))

  (testing "el peso escapado cuenta: es justo el caso de L-34"
    (is (editor/renderable? "Vale \\$8.000 al mes" {})))

  (testing "markdown solo cuenta donde está permitido"
    (is (editor/renderable? "esto es **negrita**" {:markdown? true}))
    (is (not (editor/renderable? "esto es **negrita**" {})))
    (is (not (editor/renderable? "sin marcas" {:markdown? true})))))

(def ^:private completo
  {:question "¿Cuánto es $1+1$?"
   :option_a "2" :option_b "3" :option_c "10" :option_d "0"
   :topic "diagnostico"
   :correct_option "A"})

(deftest question-missing-fields-dice-que-falta-en-vez-de-solo-negarse
  (testing "un borrador completo no tiene faltantes"
    (is (= [] (editor/question-missing-fields completo)))
    (is (editor/question-draft-valid? completo)))

  (testing "nombra cada campo que falta, en orden de formulario"
    (is (= ["el enunciado"] (editor/question-missing-fields (assoc completo :question ""))))
    (is (= ["la opción C"] (editor/question-missing-fields (assoc completo :option_c "  "))))
    (is (= ["el tema"] (editor/question-missing-fields (dissoc completo :topic)))))

  (testing "la respuesta correcta va al final y solo acepta A–D"
    (is (= ["marcar la respuesta correcta"]
           (editor/question-missing-fields (assoc completo :correct_option "E"))))
    (is (= ["marcar la respuesta correcta"]
           (editor/question-missing-fields (dissoc completo :correct_option))))
    (is (editor/question-draft-valid? (assoc completo :correct_option " D "))
        "un espacio de más no debería invalidar una respuesta legítima"))

  (testing "un borrador vacío enumera todo lo que falta, no solo lo primero"
    (is (= ["el enunciado" "la opción A" "la opción B" "la opción C" "la opción D"
            "el tema" "marcar la respuesta correcta"]
           (editor/question-missing-fields {}))))

  (testing "el módulo NO es obligatorio: un tercio del banco no lo tiene (T-60)"
    (is (editor/question-draft-valid? (dissoc completo :module_id)))
    (is (editor/question-draft-valid? (assoc completo :module_id nil)))))

(def ^:private item-con-correcta-b
  {:id 7 :question "¿Cuánto es 2+3?" :correct_option "B" :topic "t" :module_id "m"
   :option_a "4" :option_b "5" :option_c "6" :option_d "23"
   :error_a "Restó" :error_b nil :error_c "Sumó de más" :error_d "Concatenó"
   :misconception_a_id "mis-1" :misconception_b_id nil
   :misconception_c_id nil :misconception_d_id nil})

(deftest distractor-rows-no-ofrece-catalogar-la-respuesta-correcta
  (let [filas (editor/distractor-rows [item-con-correcta-b])]
    (testing "tres filas, no cuatro: la correcta no es un distractor"
      (is (= 3 (count filas)))
      (is (= ["A" "C" "D"] (mapv :letra filas))))

    (testing "cada fila trae su opción, su explicación y la clave donde escribir"
      (is (= {:letra "A" :opcion "4" :error "Restó"
              :error-key :error_a :mis-key :misconception_a_id :mis-id "mis-1"}
             (select-keys (first filas)
                          [:letra :opcion :error :error-key :mis-key :mis-id]))))

    (testing "arrastra el contexto del ítem para poder decidir sin abrirlo"
      (is (= "¿Cuánto es 2+3?" (:question (first filas))))
      (is (= "m" (:module_id (first filas)))))))

(deftest distractor-rows-no-esconde-un-item-por-tener-mal-la-correcta
  (testing "sin correct_option válida se muestran las cuatro, marcadas"
    (let [filas (editor/distractor-rows [(assoc item-con-correcta-b :correct_option nil)])]
      (is (= 4 (count filas)))
      (is (every? :correcta-desconocida? filas))))

  (testing "una correcta en minúscula o con espacios sí se reconoce"
    (is (= 3 (count (editor/distractor-rows
                     [(assoc item-con-correcta-b :correct_option " b ")]))))))

(deftest catalog-progress-le-pone-fondo-a-la-lista
  (let [filas (editor/distractor-rows [item-con-correcta-b])]
    (testing "cuenta lo hecho y lo que falta"
      (is (= {:total 3 :hechos 1 :faltan 2 :fraccion (/ 1.0 3)}
             (editor/catalog-progress filas)))))

  (testing "sin filas no divide por cero"
    (is (= {:total 0 :hechos 0 :faltan 0 :fraccion 0.0}
           (editor/catalog-progress [])))))

(deftest wrap-math-solo-toca-lo-que-el-estudiante-ve-roto
  (testing "LaTeX crudo: se envuelve"
    (is (= "$\\frac{2}{1}$" (editor/wrap-math "\\frac{2}{1}")))
    (is (= "$\\sqrt{144}$" (editor/wrap-math "\\sqrt{144}")))
    (is (= "$x^2$" (editor/wrap-math "x^2")))
    (is (= "$2^5$" (editor/wrap-math "2^5"))))

  (testing "lo que ya está delimitado no se toca"
    (is (= "$\\frac{2}{1}$" (editor/wrap-math "$\\frac{2}{1}$")))
    (is (= "Vale $x$ pesos" (editor/wrap-math "Vale $x$ pesos"))))

  (testing "el peso escapado de L-34 no se toca: envolverlo lo rompería"
    (is (= "Cuesta \\$8.000" (editor/wrap-math "Cuesta \\$8.000"))))

  (testing "texto plano y números sueltos quedan igual"
    (is (= "2" (editor/wrap-math "2")))
    (is (= "Invirtió el divisor" (editor/wrap-math "Invirtió el divisor")))
    (is (= "20 % de descuento" (editor/wrap-math "20 % de descuento"))))

  (testing "vacío y nil"
    (is (= "" (editor/wrap-math "")))
    (is (= "   " (editor/wrap-math "   ")))
    (is (nil? (editor/wrap-math nil))))

  (testing "idempotente: correrla dos veces no acumula delimitadores"
    (let [una (editor/wrap-math "\\frac{1}{2}")]
      (is (= una (editor/wrap-math una))))))

(deftest option-wraps-devuelve-solo-lo-que-cambia
  (testing "solo las alternativas que hoy se ven rotas"
    (is (= {:option_a "$\\frac{2}{1}$" :option_c "$\\sqrt{9}$"}
           (editor/option-wraps {:option_a "\\frac{2}{1}"
                                 :option_b "2"
                                 :option_c "\\sqrt{9}"
                                 :option_d "$x$"}))))

  (testing "un ítem sano no genera ninguna escritura"
    (is (= {} (editor/option-wraps {:option_a "2" :option_b "3"
                                    :option_c "$x^2$" :option_d "ninguna"})))))

;; ---------------------------------------------------------------------------
;; Edición en vivo durante el diagnóstico
;; ---------------------------------------------------------------------------

(def ^:private fila
  {:id 42
   :question "¿Cuánto es $2+2$?"
   :difficulty -0.8
   :module_id "mod-1"
   :error_a "Sumaste mal"
   :error_b nil
   :error_c "Restaste"
   :error_d nil
   :misconception_a_id "mis-1"
   :misconception_b_id nil
   :misconception_c_id nil
   :misconception_d_id nil})

(defn- borrador
  "El borrador tal como lo arma el editor en vivo: nunca `nil`, siempre string."
  [row]
  (reduce (fn [m k] (assoc m k (let [v (get row k)] (if (nil? v) "" v))))
          {}
          editor/campos-en-vivo))

(deftest campos-editados-manda-solo-lo-que-cambio
  (testing "abrir y cerrar sin tocar nada no escribe una sola columna"
    (is (= {} (editor/campos-editados fila (borrador fila)))))

  (testing "un campo cambiado viaja solo"
    (is (= {:error_a "Sumaste los denominadores"}
           (editor/campos-editados
            fila
            (assoc (borrador fila) :error_a "Sumaste los denominadores")))))

  (testing "los `nil` que el formulario volvió \"\" no se guardan como vacíos"
    (is (= {} (editor/campos-editados fila (assoc (borrador fila) :error_b ""))))
    (is (= {} (editor/campos-editados fila (assoc (borrador fila) :misconception_b_id "")))))

  (testing "borrar de verdad un valor sí viaja, y como nil"
    (let [cambios (editor/campos-editados fila (assoc (borrador fila) :error_a ""))]
      (is (= [:error_a] (keys cambios)))
      (is (nil? (:error_a cambios)))))

  (testing "una clave que el formulario no conoce nunca se manda"
    (is (= {} (editor/campos-editados fila (dissoc (borrador fila) :question))))
    (is (= {} (editor/campos-editados (assoc fila :correct_option "A")
                                      (assoc (borrador fila) :correct_option "D"))))))

(deftest campos-editados-coerciona-a-lo-que-espera-postgres
  (testing "la dificultad del <input type=number> llega como número, no como texto"
    (is (= {:difficulty -0.4}
           (editor/campos-editados fila (assoc (borrador fila) :difficulty "-0.4")))))

  (testing "el mismo valor escrito como texto no cuenta como cambio"
    (is (= {} (editor/campos-editados fila (assoc (borrador fila) :difficulty "-0.8")))))

  (testing "dificultad vacía es borrarla, no un 0 que movería el ítem servido"
    (is (= {:difficulty nil}
           (editor/campos-editados fila (assoc (borrador fila) :difficulty "")))))

  (testing "«null» de un <select> es nil y no el string, que rechaza la fila entera"
    (is (= {:module_id nil}
           (editor/campos-editados fila (assoc (borrador fila) :module_id "null"))))
    (is (= {:module_id "mod-2"}
           (editor/campos-editados fila (assoc (borrador fila) :module_id " mod-2 "))))))
