(ns universo.visitantes-test
  (:require [cljs.test :refer-macros [deftest is testing]]
            [universo.visitantes :as v]))

;; Forma real de la tabla `visitor`, verificada contra `information_schema` el
;; 2026-09-14: id, created_at, pais, ciudad, timezone, idioma, email. **No hay**
;; IP, batería ni user-agent, pese a lo que sugiere CLAUDE.md §7.
(defn- fila [id fecha pais ciudad & [email]]
  {:id id :created_at fecha :pais pais :ciudad ciudad
   :timezone "America/Santiago" :idioma "es-CL" :email email})

(def ^:private filas
  [(fila 1 "2026-09-10T14:00:00+00:00" "Chile" "Iquique" "a@x.cl")
   (fila 2 "2026-09-10T15:30:00+00:00" "Chile" "Iquique")
   (fila 3 "2026-09-10T16:00:00+00:00" "Chile" "Antofagasta")
   (fila 4 "2026-09-12T10:00:00+00:00" "Perú"  "Lima")
   (fila 5 "2026-09-12T11:00:00+00:00" nil     "")])

(deftest ranking-ordena-y-nombra-los-vacios
  (let [r (v/ranking filas :pais)]
    (testing "de más a menos, y el vacío tiene nombre en vez de quedar en blanco"
      (is (= ["Chile" "(sin dato)" "Perú"] (mapv :valor r)))
      (is (= [3 1 1] (mapv :n r))))
    (testing "el porcentaje es sobre el total de filas"
      (is (= 60 (:pct (first r))))))
  (testing "los empates se desempatan alfabéticamente, para que el orden no baile entre recargas"
    (let [r (v/ranking filas :ciudad)]
      (is (= ["Iquique" "(sin dato)" "Antofagasta" "Lima"]
             (mapv :valor r))
          "Iquique va primero por n=2; los tres de n=1 quedan alfabéticos"))))

(deftest por-dia-rellena-los-huecos
  (testing "un día sin visitas vale 0 y no se salta: saltarlo dibuja actividad donde hubo silencio"
    (let [serie (v/por-dia filas)]
      (is (= 3 (count serie)))
      (is (= [3 0 2] (mapv :n serie)))
      (is (= "2026-09-11" (:dia (second serie)))))))

(deftest por-dia-acota-la-ventana
  (testing "con `dias`, la serie termina en la última fila y arranca N-1 días antes"
    (let [serie (v/por-dia filas 2)]
      (is (= 2 (count serie)))
      (is (= ["2026-09-11" "2026-09-12"] (mapv :dia serie))))))

(deftest por-dia-vacio-no-revienta
  (is (= [] (v/por-dia [])))
  (is (= [] (v/por-dia nil)))
  (is (= [] (v/por-dia [{:created_at "no es una fecha"}]))))

(deftest en-los-ultimos-cuenta-desde-ahora-no-desde-la-ultima-fila
  (testing "si nadie entra en una semana, «últimos 7 días» tiene que dar 0"
    (let [ahora (.getTime (js/Date. "2026-10-30T00:00:00+00:00"))]
      (is (= 0 (count (v/en-los-ultimos filas 7 ahora))))))
  (testing "y con `ahora` cerca de las filas, las cuenta"
    (let [ahora (.getTime (js/Date. "2026-09-13T00:00:00+00:00"))]
      (is (= 5 (count (v/en-los-ultimos filas 7 ahora)))))))

(deftest resumen-cuenta-lo-que-la-tabla-puede-sostener
  (let [ahora (.getTime (js/Date. "2026-09-13T00:00:00+00:00"))
        r (v/resumen filas ahora)]
    (is (= 5 (:total r)))
    (is (= 5 (:ultimos-7 r)))
    (is (= 1 (:con-email r)))
    (is (= 20 (:pct-con-email r)))
    (testing "los vacíos cuentan como una categoría, no se descartan"
      (is (= 3 (:paises r)))))
  (testing "sin filas no se inventa un porcentaje"
    (let [r (v/resumen [] 0)]
      (is (= 0 (:total r)))
      (is (nil? (:pct-con-email r))))))

(deftest hay-fuente-detecta-si-061-esta-aplicada
  (testing "la vista decide con esto si muestra el canal o el aviso de T-135"
    (is (not (v/hay-fuente? filas)))
    (is (v/hay-fuente? (conj filas (assoc (fila 6 "2026-09-12T12:00:00+00:00" "Chile" "Iquique")
                                          :fuente "tarjeta"))))
    (testing "una fuente nula sigue contando: la columna existe, está vacía"
      (is (v/hay-fuente? [(assoc (fila 7 "2026-09-12T12:00:00+00:00" "Chile" "Iquique")
                                 :fuente nil)])))))
