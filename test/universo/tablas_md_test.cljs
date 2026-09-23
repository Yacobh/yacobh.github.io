(ns universo.tablas-md-test
  (:require [cljs.test :refer-macros [deftest is testing]]
            [universo.tablas-md :as t]))

;; Forma real de `electrotecnia/magnitudes` (recurso 459a3f77…), recortada.
(def ^:private cuerpo-real
  "Las cuatro magnitudes:\n\n| Magnitud | Símbolo | Unidad |\n|---|---|---|\n| Carga | $Q$ | coulomb (C) |\n| Corriente | $I$ | ampere (A), $I = Q/t$ |\n\nLa potencia se escribe de tres formas.")

(deftest un-cuerpo-sin-tabla-no-cambia
  ;; La garantía que hace segura la tarea: los recursos PAES vuelven como un
  ;; único bloque de texto, idéntico al original.
  (let [s "Suma $\\frac{1}{2} + \\frac{1}{3}$.\n\n**Paso 1.** Busca el común.\n- una lista\n- sigue igual"]
    (is (= [{:tipo :texto :contenido s}] (t/bloques s))))
  (is (= [] (t/bloques nil)))
  (is (= [] (t/bloques ""))))

(deftest una-barra-sin-separadora-no-es-tabla
  (let [s "| esto no es tabla |\nporque no hay fila de guiones"]
    (is (= [{:tipo :texto :contenido s}] (t/bloques s)))))

(deftest parte-texto-tabla-texto
  (let [bs (t/bloques cuerpo-real)]
    (is (= [:texto :tabla :texto] (map :tipo bs)))
    (is (= "Las cuatro magnitudes:" (:contenido (first bs)))
        "el salto que separaba el texto de la tabla no queda como línea en blanco")
    (is (= ["Magnitud" "Símbolo" "Unidad"] (:encabezado (second bs))))
    (is (= [["Carga" "$Q$" "coulomb (C)"]
            ["Corriente" "$I$" "ampere (A), $I = Q/t$"]]
           (:filas (second bs))))
    (is (= "La potencia se escribe de tres formas." (:contenido (last bs))))))

(deftest tabla-al-principio-y-al-final
  (is (= [:tabla] (map :tipo (t/bloques "| a | b |\n|:--|--:|\n| 1 | 2 |"))))
  (is (= [:texto :tabla] (map :tipo (t/bloques "x\n| a |\n|---|")))))

(deftest el-valor-absoluto-no-parte-la-celda
  (is (= ["$|x| = 3$" "dos"] (t/celdas "| $|x| = 3$ | dos |")))
  (testing "un peso escapado no abre matemática"
    (is (= ["\\$500" "b"] (t/celdas "| \\$500 | b |")))))

(deftest separadoras-validas
  (is (= [:tabla] (map :tipo (t/bloques "| a | b |\n| --- | :---: |"))))
  (is (= [:tabla] (map :tipo (t/bloques "|a|b|\n|---|---|")))))
