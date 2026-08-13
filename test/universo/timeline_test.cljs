(ns universo.timeline-test
  (:require [cljs.test :refer-macros [deftest is testing]]
            [universo.timeline :as tl]))

;; Módulos como llegan de Supabase: snake_case, igual que en el resto del
;; proyecto (:theta_band, :module_id…).
(def ^:private modulos
  [{:slug "geometria/volumenes" :title "Volúmenes" :historical_year -1850
    :historical_era "antiguedad" :historical_figure "Papiro de Moscú"
    :historical_blurb "Cómo medía volúmenes Egipto."}
   {:slug "geometria/angulos" :title "Ángulos y paralelismo" :historical_year -300
    :historical_era "antiguedad" :historical_figure "Euclides"}
   {:slug "aritmetica/numeros" :title "Números" :historical_year 628
    :historical_era "medieval" :historical_figure "Brahmagupta"}
   {:slug "algebra/funciones" :title "Funciones" :historical_year 1748
    :historical_era "moderna" :historical_figure "Leonhard Euler"}
   {:slug "cuantica/origenes" :title "Orígenes" :historical_year 1900
    :historical_era "contemporanea" :historical_figure "Max Planck"}])

(deftest era-of-usa-los-mismos-cortes-que-la-migracion
  (testing "los límites de cada era, incluidos los bordes exactos"
    (is (= :antiguedad (tl/era-of 500)))
    (is (= :medieval (tl/era-of 501)))
    (is (= :medieval (tl/era-of 1400)))
    (is (= :renacimiento (tl/era-of 1401)))
    (is (= :renacimiento (tl/era-of 1650)))
    (is (= :moderna (tl/era-of 1651)))
    (is (= :moderna (tl/era-of 1899))))
  (testing "1900 abre la era contemporánea: es el cuanto de Planck, no un número redondo"
    (is (= :contemporanea (tl/era-of 1900)))
    (is (= :contemporanea (tl/era-of 1964))))
  (testing "los años a.C. son negativos y caen en la antigüedad"
    (is (= :antiguedad (tl/era-of -1850))))
  (testing "sin año no hay era, en vez de inventar una"
    (is (nil? (tl/era-of nil)))
    (is (nil? (tl/era-of "1900")))))

(deftest medal-for-es-espejo-de-theta-band
  (testing "los cortes coinciden con las bandas del perfil"
    (is (= :oro (tl/medal-for 2.0)))
    (is (= :oro (tl/medal-for 3.0)))
    (is (= :plata (tl/medal-for 1.0)))
    (is (= :plata (tl/medal-for 1.99)))
    (is (= :bronce (tl/medal-for 0.0)))
    (is (= :bronce (tl/medal-for -2.5))))
  (testing "sin rendir es nil, que NO es lo mismo que bronce"
    (is (nil? (tl/medal-for nil)))
    (is (nil? (tl/medal-for "1.5")))))

(deftest best-theta-by-module-se-queda-con-el-mejor
  (testing "dos topics que caen en el mismo módulo dejan el θ más alto"
    (let [r (tl/best-theta-by-module {"enteros" 0.4 "numeros_relativos" 2.1})]
      (is (= 2.1 (get r "aritmetica/enteros")))))
  (testing "un topic sin módulo conocido se descarta sin romper nada (ADR-017)"
    (let [r (tl/best-theta-by-module {"topic_que_no_existe_en_ningun_lado" 3.0})]
      (is (empty? r))))
  (testing "sin historial devuelve un mapa vacío, no nil"
    (is (= {} (tl/best-theta-by-module nil)))))

(deftest milestones-ordena-y-marca-lo-descubierto
  (let [hitos (tl/milestones modulos [{:topic "angulos" :theta 2.4}])]
    (testing "quedan ordenados por año, con los a.C. primero"
      (is (= [-1850 -300 628 1748 1900] (mapv :year hitos))))
    (testing "el módulo rendido queda descubierto con su grado"
      (let [angulos (first (filter #(= "geometria/angulos" (:slug %)) hitos))]
        (is (:discovered? angulos))
        (is (= :oro (:medal angulos)))))
    (testing "los demás quedan apagados"
      (is (= 4 (count (remove :discovered? hitos)))))
    (testing "el contenido histórico viaja con el hito: es la razón de existir de la línea"
      (let [volumenes (first hitos)]
        (is (= "Papiro de Moscú" (:figure volumenes)))
        (is (= "Cómo medía volúmenes Egipto." (:blurb volumenes)))))))

(deftest milestones-excluye-los-modulos-sin-anio
  (testing "un módulo sin año no se ubica en un año falso: queda fuera"
    (let [con-huerfano (conj modulos {:slug "algebra/nuevo" :title "Sin ubicar"})
          hitos (tl/milestones con-huerfano [])]
      (is (= 5 (count hitos)))
      (is (not-any? #(= "algebra/nuevo" (:slug %)) hitos)))))

(deftest milestones-tolera-la-ausencia-de-datos
  (testing "sin módulos y sin historial no explota: devuelve vacío"
    (is (= [] (tl/milestones nil nil)))
    (is (= [] (tl/milestones [] [])))))

(deftest milestones-deriva-la-era-cuando-la-fila-no-la-trae
  (testing "una fila con año pero sin era se ubica igual, en vez de descartarse"
    (let [hitos (tl/milestones [{:slug "x/y" :title "Y" :historical_year 1500}] [])]
      (is (= :renacimiento (:era (first hitos)))))))

(deftest by-era-agrupa-en-orden-historico-y-omite-las-vacias
  (let [grupos (tl/by-era (tl/milestones modulos []))]
    (testing "el orden es histórico, no alfabético"
      (is (= [:antiguedad :medieval :moderna :contemporanea] (mapv :era grupos))))
    (testing "el renacimiento no aparece porque ningún hito cae ahí"
      (is (not-any? #(= :renacimiento (:era %)) grupos)))
    (testing "cada grupo trae su etiqueta legible y sus hitos ordenados"
      (is (= "Antigüedad" (:label (first grupos))))
      (is (= [-1850 -300] (mapv :year (:milestones (first grupos))))))))

(deftest progress-cuenta-una-sola-vez-y-bien
  (let [hitos (tl/milestones modulos [{:topic "angulos" :theta 2.4}
                                      {:topic "numeros" :theta 1.2}
                                      {:topic "funciones" :theta -0.5}])
        p (tl/progress hitos)]
    (is (= 5 (:total p)))
    (is (= 3 (:descubiertos p)))
    (is (= 1 (:oro p)))
    (is (= 1 (:plata p)))
    (is (= 1 (:bronce p))))
  (testing "sin hitos, todo en cero en vez de nil"
    (is (= {:total 0 :descubiertos 0 :oro 0 :plata 0 :bronce 0}
           (tl/progress [])))))
