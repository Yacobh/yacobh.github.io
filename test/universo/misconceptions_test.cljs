(ns universo.misconceptions-test
  (:require
   [cljs.test :refer-macros [deftest is testing]]
   [universo.misconceptions :as mis]))

;; -----------------------------------------------------------------------------
;; Slug — espejo del check de la migración 027
;; -----------------------------------------------------------------------------

(deftest slug-valid?-es-espejo-del-check-de-027
  (testing "lo que 027 acepta: minúsculas, dígitos, - y / como separadores"
    (is (mis/slug-valid? "fracciones/invierte-divisor"))
    (is (mis/slug-valid? "signos/resta-de-negativos"))
    (is (mis/slug-valid? "potencias2"))
    (is (mis/slug-valid? "a")))

  (testing "los dos modos de fallo de T-51: mayúscula y acento"
    (is (not (mis/slug-valid? "Fracciones/invierte-divisor")))
    (is (not (mis/slug-valid? "factorizacion/binomio-al-cuadrado-mal-expandido2Ó")))
    (is (not (mis/slug-valid? "división/invierte"))))

  (testing "separadores mal puestos"
    (is (not (mis/slug-valid? "-fracciones")))
    (is (not (mis/slug-valid? "fracciones-")))
    (is (not (mis/slug-valid? "/fracciones")))
    (is (not (mis/slug-valid? "fracciones/")))
    (is (not (mis/slug-valid? "fracciones--invierte")))
    (is (not (mis/slug-valid? "fracciones//invierte"))))

  (testing "espacios y guion bajo no son separadores válidos en 027"
    (is (not (mis/slug-valid? "invierte el divisor")))
    (is (not (mis/slug-valid? "invierte_divisor"))))

  (testing "vacío o no-string: un slug así no pasa el check y no debe reventar"
    (is (not (mis/slug-valid? "")))
    (is (not (mis/slug-valid? nil)))
    (is (not (mis/slug-valid? 42)))))

(deftest suggest-slug-produce-algo-que-la-base-acepta
  (testing "el caso de la migración: nombre en prosa → slug tipeable"
    (is (= "invierte-el-divisor-al-dividir-fracciones"
           (mis/suggest-slug "Invierte el divisor al dividir fracciones"))))

  (testing "quita acentos y ñ en vez de dejarlos pasar al check"
    (is (= "division-de-numeros-con-signo"
           (mis/suggest-slug "División de números con signo")))
    (is (= "ano-de-ensenanza" (mis/suggest-slug "Año de enseñanza"))))

  (testing "conserva la barra, que 027 admite para namespaciar"
    (is (= "fracciones/invierte-divisor"
           (mis/suggest-slug "fracciones/invierte divisor"))))

  (testing "colapsa separadores repetidos y limpia los bordes"
    (is (= "resta-de-negativos" (mis/suggest-slug "  ¡Resta de negativos!  ")))
    (is (= "a-b" (mis/suggest-slug "a -- b")))
    (is (= "signo" (mis/suggest-slug "--signo--"))))

  (testing "nil cuando no queda nada utilizable: un slug vacío no pasa el check"
    (is (nil? (mis/suggest-slug "")))
    (is (nil? (mis/suggest-slug "   ")))
    (is (nil? (mis/suggest-slug "¿?¡!")))
    (is (nil? (mis/suggest-slug nil))))

  (testing "la sugerencia siempre es aceptable para la base (la promesa del campo)"
    (doseq [nombre ["Invierte el divisor al dividir fracciones"
                    "División de números con signo"
                    "  ¡Resta de negativos!  "
                    "fracciones/invierte divisor"
                    "Área del círculo (π r²)"]]
      (is (mis/slug-valid? (mis/suggest-slug nombre))
          (str "slug inválido sugerido para: " nombre)))))

;; -----------------------------------------------------------------------------
;; Búsqueda
;; -----------------------------------------------------------------------------

(def ^:private m-fracciones
  {:id "id-fra"
   :slug "fracciones/invierte-divisor"
   :name "Invierte el divisor al dividir fracciones"
   :description "Usar cuando multiplica por el recíproco equivocado."})

(def ^:private m-signos
  {:id "id-sig" :slug "signos/resta-de-negativos" :name "Resta de negativos"})

(deftest matches?-busca-en-los-tres-campos
  (testing "búsqueda vacía o en blanco no filtra nada"
    (is (mis/matches? "" m-fracciones))
    (is (mis/matches? "   " m-fracciones))
    (is (mis/matches? nil m-fracciones)))

  (testing "encuentra por slug, nombre y descripción"
    (is (mis/matches? "invierte-divisor" m-fracciones))
    (is (mis/matches? "dividir fracciones" m-fracciones))
    (is (mis/matches? "recíproco" m-fracciones)))

  (testing "no distingue mayúsculas ni bordes en blanco"
    (is (mis/matches? "INVIERTE" m-fracciones))
    (is (mis/matches? "  Divisor " m-fracciones)))

  (testing "descripción ausente no rompe la búsqueda"
    (is (mis/matches? "negativos" m-signos))
    (is (not (mis/matches? "recíproco" m-signos))))

  (testing "lo que no está, no coincide"
    (is (not (mis/matches? "geometria" m-fracciones)))))

;; -----------------------------------------------------------------------------
;; Uso — lo que hace auditable al catálogo
;; -----------------------------------------------------------------------------

(deftest usage-index-cuenta-distractores-no-items
  (testing "un ítem puede aportar hasta cuatro usos"
    (is (= {"a" 2 "b" 1}
           (mis/usage-index [{:misconception_a_id "a"
                              :misconception_b_id "a"
                              :misconception_c_id "b"
                              :misconception_d_id nil}]))))

  (testing "los distractores sin catalogar (null) no cuentan"
    (is (= {} (mis/usage-index [{:misconception_a_id nil}
                                {}]))))

  (testing "suma entre ítems"
    (is (= {"a" 3}
           (mis/usage-index [{:misconception_a_id "a"}
                             {:misconception_b_id "a"}
                             {:misconception_c_id "a"}]))))

  (testing "banco vacío o nil"
    (is (= {} (mis/usage-index [])))
    (is (= {} (mis/usage-index nil)))))

(deftest with-usage-ordena-por-uso-y-no-esconde-las-huerfanas
  (let [uso {"id-fra" 3}
        salida (mis/with-usage [m-signos m-fracciones] uso)]
    (testing "la más usada va primero"
      (is (= ["id-fra" "id-sig"] (mapv :id salida))))

    (testing "la de uso 0 queda al final, presente: es la que hay que revisar"
      (is (= [3 0] (mapv :usage salida))))

    (testing "empate en uso se desempata por slug, para que el orden sea estable"
      (is (= ["a/uno" "b/dos" "c/tres"]
             (mapv :slug (mis/with-usage [{:id 3 :slug "c/tres"}
                                          {:id 1 :slug "a/uno"}
                                          {:id 2 :slug "b/dos"}]
                                         {})))))

    (testing "catálogo vacío o nil"
      (is (= [] (mis/with-usage [] {})))
      (is (= [] (mis/with-usage nil {}))))))

;; -----------------------------------------------------------------------------
;; Salud del catálogo — la heurística de 027 hecha función
;; -----------------------------------------------------------------------------

(defn- banco
  "n ítems, todos con sus cuatro distractores apuntando a `ids` (ciclando)."
  [n ids]
  (mapv (fn [i]
          (let [id (nth ids (mod i (count ids)))]
            {:misconception_a_id id
             :misconception_b_id id
             :misconception_c_id id
             :misconception_d_id id}))
        (range n)))

(defn- catalogo [n]
  (mapv (fn [i] {:id (str "m" i) :slug (str "t/m" i)}) (range n)))

(deftest health-distingue-taxonomia-de-lista-de-strings
  (testing "catálogo vacío: :vacio, y no divide por cero"
    (let [h (mis/health [] (banco 10 ["m0"]))]
      (is (= :vacio (:veredicto h)))
      (is (= 0 (:total h)))
      (is (nil? (:ratio h)))))

  (testing "el fracaso que 027 anticipó: el catálogo crece como el banco"
    ;; 20 ítems / 20 misconceptions = 1 ítem por idea errónea.
    (let [h (mis/health (catalogo 20) (banco 20 (mapv #(str "m" %) (range 20))))]
      (is (= :disperso (:veredicto h)))
      (is (= 1.0 (:ratio h)))))

  (testing "modelar de verdad: muchos ítems por idea errónea"
    ;; 40 ítems / 4 misconceptions = 10, el orden de magnitud que cita 027.
    (let [h (mis/health (catalogo 4) (banco 40 ["m0" "m1" "m2" "m3"]))]
      (is (= :sano (:veredicto h)))
      (is (= 10.0 (:ratio h)))
      (is (= 0 (:huerfanas h)))
      (is (= 0 (:singleton h)))))

  (testing "el corte está en items-por-misconception-saludable, no en un mágico"
    (let [n mis/items-por-misconception-saludable]
      (is (= :sano (:veredicto (mis/health (catalogo 1) (banco n ["m0"])))))
      (is (= :disperso (:veredicto (mis/health (catalogo 1) (banco (dec n) ["m0"])))))))

  (testing "cobertura es sobre distractores (4 por ítem), no sobre ítems"
    ;; 10 ítems = 40 distractores; solo 10 catalogados → 25 %.
    (let [preguntas (mapv (fn [_] {:misconception_a_id "m0"}) (range 10))
          h (mis/health (catalogo 1) preguntas)]
      (is (= 0.25 (:cobertura h)))))

  (testing "huérfanas y singleton son las dos señales de revisión de 027"
    (let [preguntas [{:misconception_a_id "m0" :misconception_b_id "m0"}
                     {:misconception_a_id "m1"}]
          h (mis/health (catalogo 3) preguntas)]
      (is (= 3 (:total h)))
      (is (= 1 (:huerfanas h)) "m2 no la usa nadie")
      (is (= 1 (:singleton h)) "m1 aparece en un solo distractor")))

  (testing "banco vacío: cobertura 0 sin dividir por cero"
    (let [h (mis/health (catalogo 3) [])]
      (is (= 0.0 (:cobertura h)))
      (is (= 3 (:huerfanas h)))
      (is (= :disperso (:veredicto h)))))

  (testing "nil en cualquiera de los dos no revienta"
    (is (= :vacio (:veredicto (mis/health nil nil))))
    (is (= 0.0 (:cobertura (mis/health nil nil))))))

(deftest health-from-usage-es-la-misma-verdad-con-menos-datos
  (testing "el panel calcula el veredicto sin guardar las 387 preguntas en memoria"
    (doseq [[cat preguntas] [[(catalogo 4) (banco 40 ["m0" "m1" "m2" "m3"])]
                             [(catalogo 20) (banco 20 (mapv #(str "m" %) (range 20)))]
                             [(catalogo 3) []]
                             [[] (banco 10 ["m0"])]]]
      (is (= (mis/health cat preguntas)
             (mis/health-from-usage cat (mis/usage-index preguntas) (count preguntas)))
          "health y health-from-usage no pueden divergir: una llama a la otra")))

  (testing "tolera nil en el uso y en el tamaño del banco"
    (is (= :vacio (:veredicto (mis/health-from-usage [] nil nil))))
    (is (= 0.0 (:cobertura (mis/health-from-usage (catalogo 2) nil nil))))))

(deftest split-experimento-hace-contable-la-mezcla-de-027-y-t61
  (let [rows [{:id "a" :slug "fracciones/invierte-divisor"}
              {:id "b" :slug "mq/conmutadores/asume-conmutatividad"}
              {:id "c" :slug "mq/formalismo/operador"}
              {:id "d" :slug "signos/resta-de-negativos"}]
        {:keys [producto experimento]} (mis/split-experimento rows)]
    (testing "separa por el prefijo de slug, que es lo único que las distingue"
      (is (= ["a" "d"] (mapv :id producto)))
      (is (= ["b" "c"] (mapv :id experimento))))

    (testing "un slug que solo contiene «mq» sin barra NO es del experimento"
      (is (not (mis/del-experimento? {:slug "mq-suma"})))
      (is (not (mis/del-experimento? {:slug "algebra/mq/algo"}))))

    (testing "vacío y nil"
      (is (= {:producto [] :experimento []} (mis/split-experimento [])))
      (is (= {:producto [] :experimento []} (mis/split-experimento nil)))
      (is (not (mis/del-experimento? {}))))))
