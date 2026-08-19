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
