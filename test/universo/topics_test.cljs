(ns universo.topics-test
  (:require
   [cljs.test :refer-macros [deftest is testing]]
   [clojure.string :as str]
   [universo.topics :as topics]))

(deftest normalize-canoniza-los-dos-modos-de-fallo-medidos
  (testing "acentos"
    (is (= "factorizacion" (topics/normalize "factorización")))
    (is (= "terminos_semejantes" (topics/normalize "términos_semejantes")))
    (is (= "division_algebraica" (topics/normalize "división_algebraica"))))

  (testing "mayúsculas"
    (is (= "polinomios" (topics/normalize "Polinomios")))
    (is (= "numbers_v1" (topics/normalize "numbers_V1")))
    (is (= "paes_m1" (topics/normalize "PAES_M1"))))

  (testing "acento + mayúscula a la vez"
    (is (= "algebra" (topics/normalize "Álgebra")))
    (is (= "numeros" (topics/normalize "Números")))
    (is (= "geometria" (topics/normalize "Geometría"))))

  (testing "ñ y ü"
    (is (= "ensenanza" (topics/normalize "enseñanza")))
    (is (= "arguir" (topics/normalize "argüir"))))

  (testing "bordes en blanco"
    (is (= "enteros" (topics/normalize "  enteros "))))

  (testing "vacío o no-string → nil (un topic en blanco no es un banco)"
    (is (nil? (topics/normalize nil)))
    (is (nil? (topics/normalize "")))
    (is (nil? (topics/normalize "   ")))
    (is (nil? (topics/normalize 42))))

  (testing "idempotente: normalizar dos veces no cambia nada"
    (doseq [t ["factorización" "Polinomios" "numbers_V1" "  Álgebra  "]]
      (is (= (topics/normalize t)
             (topics/normalize (topics/normalize t))))))

  (testing "NO fusiona guion bajo con guion ni con espacio (fuera del fallo medido)"
    (is (not= (topics/normalize "terminos_semejantes")
              (topics/normalize "terminos-semejantes")))
    (is (not= (topics/normalize "terminos_semejantes")
              (topics/normalize "terminos semejantes")))))

(deftest same-topic-y-duplicate-groups
  (testing "same-topic? reconoce las variantes"
    (is (topics/same-topic? "factorización" "factorizacion"))
    (is (topics/same-topic? "Polinomios" "polinomios"))
    (is (not (topics/same-topic? "polinomios" "expresiones")))
    (is (not (topics/same-topic? nil nil)) "nil no es un banco, no coincide consigo mismo"))

  (testing "duplicate-groups encuentra exactamente los pares de T-51"
    (let [medidos ["factorización" "factorizacion"
                   "términos_semejantes" "terminos_semejantes"
                   "división_algebraica" "division_algebraica"
                   "Polinomios" "polinomios"
                   "enteros" "fracciones"]
          grupos (topics/duplicate-groups medidos)]
      (is (= #{"factorizacion" "terminos_semejantes" "division_algebraica" "polinomios"}
             (set (keys grupos))))
      (is (= #{"factorización" "factorizacion"} (get grupos "factorizacion")))
      (is (not (contains? grupos "enteros")) "sin variantes, no es duplicado"))))

(deftest mapeo-a-modulo
  (testing "equivalencia explícita"
    (is (= "aritmetica/numeros" (topics/module-slug-for "numbers_V1")))
    (is (= "algebra/ecuaciones" (topics/module-slug-for "Álgebra")))
    (is (= "geometria/basica" (topics/module-slug-for "Geometría")))
    (is (= "algebra/polinomios" (topics/module-slug-for "factorización")))
    (is (= "algebra/expresiones" (topics/module-slug-for "términos_semejantes"))))

  (testing "coincidencia por sufijo, sin listarlos a mano"
    (is (= "aritmetica/enteros" (topics/module-slug-for "enteros")))
    (is (= "aritmetica/fracciones" (topics/module-slug-for "fracciones")))
    (is (= "algebra/polinomios" (topics/module-slug-for "Polinomios")))
    (is (= "geometria/triangulos" (topics/module-slug-for "triangulos")))
    (is (= "geometria/volumenes" (topics/module-slug-for "volumenes")))
    (is (= "aritmetica/porcentajes" (topics/module-slug-for "Porcentajes"))))

  (testing "bancos mezclados → nil, no un módulo inventado"
    (is (nil? (topics/module-slug-for "diagnostico")))
    (is (nil? (topics/module-slug-for "PAES_M1"))))

  (testing "topic desconocido → nil"
    (is (nil? (topics/module-slug-for "trigonometria")))
    (is (nil? (topics/module-slug-for nil)))
    (is (nil? (topics/module-slug-for "")))))

(deftest track-desde-el-topic
  (is (= "aritmetica" (topics/track-for "enteros")))
  (is (= "algebra" (topics/track-for "Álgebra")))
  (is (= "geometria" (topics/track-for "Geometría")))
  (is (nil? (topics/track-for "diagnostico"))))

(deftest unmapped-lista-el-pendiente-real
  (testing "devuelve canonizados, sin repetir, solo los que no tienen módulo"
    (is (= #{"diagnostico" "paes_m1" "trigonometria"}
           (set (topics/unmapped ["enteros" "diagnostico" "PAES_M1"
                                  "Diagnostico" "trigonometria" "Álgebra"]))))))

;; -----------------------------------------------------------------------------
;; Invariantes del propio mapeo: un slug mal escrito no falla en ninguna parte,
;; solo deja al estudiante sin recursos. Estos tests son la única red.
;; -----------------------------------------------------------------------------

(deftest el-mapeo-no-apunta-a-modulos-inexistentes
  (testing "toda equivalencia explícita existe en modules (002_seed_modules.sql)"
    (doseq [[topic slug] topics/explicit-topic->module-slug]
      (is (contains? topics/module-slugs slug)
          (str "el topic '" topic "' apunta al módulo inexistente '" slug "'"))))

  (testing "las claves del mapeo ya están en forma canónica"
    (doseq [topic (keys topics/explicit-topic->module-slug)]
      (is (= topic (topics/normalize topic))
          (str "la clave '" topic "' no está normalizada: nunca va a coincidir"))))

  (testing "los bancos mezclados también están en forma canónica"
    (doseq [topic topics/catch-all-topics]
      (is (= topic (topics/normalize topic)))))

  (testing "todo módulo tiene track y nombre, y su sufijo es único"
    (let [sufijos (map #(second (str/split % #"/")) topics/module-slugs)]
      (is (= 18 (count topics/module-slugs)))
      (is (= (count sufijos) (count (set sufijos)))
          "dos módulos con el mismo sufijo romperían la regla de coincidencia")
      (is (every? #(contains? #{"aritmetica" "algebra" "geometria"}
                              (first (str/split % #"/")))
                  topics/module-slugs)))))
