(ns universo.resources-test
  (:require
   [cljs.test :refer-macros [deftest is testing]]
   [universo.resources :as resources]))

(def ^:private modules
  [{:id "m1" :slug "aritmetica/fracciones" :title "Fracciones" :track "aritmetica"
    :order_index 4}
   {:id "m2" :slug "algebra/ecuaciones" :title "Ecuaciones" :track "algebra"
    :order_index 9}])

(defn- fila
  [{:keys [id module_id published title order_index]
    :or {published true title "Recurso" order_index 1}}]
  {:id id :module_id module_id :published published :title title
   :type "text" :body "cuerpo" :order_index order_index})

;; -----------------------------------------------------------------------------
;; El join que el upsert no trae
;; -----------------------------------------------------------------------------

(deftest attach-module-repone-el-join
  (testing "adjunta slug, título y track del módulo que ya está en memoria"
    (is (= {:slug "algebra/ecuaciones" :title "Ecuaciones" :track "algebra"}
           (:modules (resources/attach-module (fila {:id "r1" :module_id "m2"})
                                              modules)))))

  (testing "compara ids como string: el select devuelve uuid y el <select> string"
    (is (some? (:modules (resources/attach-module {:module_id "m1"} modules)))))

  (testing "sin módulo que adjuntar deja la fila como vino, sin poner :modules nil"
    (let [r (fila {:id "r1" :module_id nil})]
      (is (= r (resources/attach-module r modules)))
      (is (not (contains? (resources/attach-module r modules) :modules)))))

  (testing "un module_id que no está en la lista tampoco borra un join previo"
    (let [r (assoc (fila {:id "r1" :module_id "inexistente"})
                   :modules {:slug "viejo/slug"})]
      (is (= {:slug "viejo/slug"} (:modules (resources/attach-module r modules)))))))

;; -----------------------------------------------------------------------------
;; Insertar o reemplazar
;; -----------------------------------------------------------------------------

(deftest upsert-row-reemplaza-en-su-posicion
  (let [rows [(fila {:id "a"}) (fila {:id "b"}) (fila {:id "c"})]
        editada (fila {:id "b" :title "Editada"})
        result (resources/upsert-row rows editada)]
    (testing "la fila editada no salta de lugar"
      (is (= ["a" "b" "c"] (mapv :id result)))
      (is (= "Editada" (:title (second result)))))

    (testing "no cambia el largo de la lista"
      (is (= 3 (count result))))))

(deftest upsert-row-inserta-al-principio
  (let [rows [(fila {:id "a"}) (fila {:id "b"})]
        result (resources/upsert-row rows (fila {:id "nueva"}))]
    (testing "arriba, que es donde la pondría el orden por created_at desc:
              la lista optimista coincide con la que traería un refresco"
      (is (= ["nueva" "a" "b"] (mapv :id result))))))

(deftest upsert-row-tolera-lista-y-fila-vacias
  (testing "sin fila la lista queda intacta: un guardado sin datos no vacía nada"
    (let [rows [(fila {:id "a"})]]
      (is (= rows (resources/upsert-row rows nil)))))

  (testing "sobre lista vacía o nil"
    (is (= ["a"] (mapv :id (resources/upsert-row [] (fila {:id "a"})))))
    (is (= ["a"] (mapv :id (resources/upsert-row nil (fila {:id "a"})))))))

(deftest remove-row-quita-por-id
  (let [rows [(fila {:id "a"}) (fila {:id "b"})]]
    (is (= ["a"] (mapv :id (resources/remove-row rows "b"))))
    (testing "un id que no está deja la lista igual"
      (is (= ["a" "b"] (mapv :id (resources/remove-row rows "z")))))
    (is (= [] (resources/remove-row nil "a")))))

;; -----------------------------------------------------------------------------
;; El toggle optimista y su reversa
;; -----------------------------------------------------------------------------

(deftest set-published-es-su-propia-inversa
  (let [rows [(fila {:id "a" :published true}) (fila {:id "b" :published true})]
        apagada (resources/set-published rows "a" false)]
    (testing "cambia solo la fila pedida"
      (is (= [false true] (mapv :published apagada))))

    (testing "volver a llamarla con el valor anterior revierte, que es cómo se
              deshace el cambio optimista si la policy lo rechaza"
      (is (= rows (resources/set-published apagada "a" true))))))

;; -----------------------------------------------------------------------------
;; Duplicar
;; -----------------------------------------------------------------------------

(deftest duplicate-draft-no-arrastra-id-ni-publica
  (let [d (resources/duplicate-draft (fila {:id "a" :module_id "m1"
                                            :published true
                                            :title "Fracciones equivalentes"}))]
    (testing "sin id: el próximo guardado crea una fila nueva, no edita el original"
      (is (nil? (:id d)))
      (is (not (contains? d :id))))

    (testing "no se publica sola: publicar algo a medio escribir es el único
              error de este editor que ve un estudiante"
      (is (false? (:published d))))

    (testing "el título queda marcado para poder distinguir las dos filas"
      (is (= "Fracciones equivalentes (copia)" (:title d))))

    (testing "conserva lo que se quiere reutilizar"
      (is (= "m1" (:module_id d)))
      (is (= "cuerpo" (:body d))))

    (testing "order_index como string, que es lo que espera el <input number>"
      (is (string? (:order_index d))))))

(deftest duplicate-draft-no-apila-sufijos
  (testing "duplicar una copia no produce «(copia) (copia)»"
    (let [d (resources/duplicate-draft {:title "Algo (copia)"})]
      (is (= "Algo (copia)" (:title d))))))
