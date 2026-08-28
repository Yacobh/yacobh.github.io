(ns universo.motor-test
  (:require
   [cljs.test :refer-macros [deftest is testing]]
   [universo.components.tetha :as tetha]
   [universo.motor :as motor]))

(deftest version-y-legado
  (testing "la versión que produce esta build"
    (is (= 2 motor/version))
    (is (= 1 motor/legacy-version))
    (is (> motor/version motor/legacy-version)))

  (testing "la versión es un entero: se compara y se agrupa, no se interpola"
    (is (int? motor/version))))

(deftest prior-precision-es-1-sobre-sigma-cuadrado
  (testing "σ = 2 (el default) ⇒ 0,25"
    (is (< (Math/abs (- (motor/prior-precision) 0.25)) 1e-12))
    (is (< (Math/abs (- (motor/prior-precision 2.0) 0.25)) 1e-12)))

  (testing "σ = 1 recupera la precisión del motor v1"
    (is (< (Math/abs (- (motor/prior-precision 1.0) 1.0)) 1e-12)))

  (testing "un σ más ancho encoge menos"
    (is (< (motor/prior-precision 3.0) (motor/prior-precision 1.0))))

  (testing "σ nulo, cero o negativo cae al default en vez de degenerar el prior"
    ;; Una config a medio llenar no debe producir una precisión infinita
    ;; (σ = 0 ⇒ el prior clava θ en 0) ni negativa (el posterior dejaría de
    ;; tener máximo). Cae al default, que es el comportamiento configurado.
    (is (= (motor/prior-precision) (motor/prior-precision nil)))
    (is (= (motor/prior-precision) (motor/prior-precision 0)))
    (is (= (motor/prior-precision) (motor/prior-precision -2.0)))))

(deftest guessing-c-acotado
  (testing "el default son cuatro alternativas"
    (is (= 0.25 motor/default-guessing-c))
    (is (= 0.25 (motor/guessing-c))))

  (testing "respeta un valor válido, incluido el 0 del motor v1"
    (is (= 0.0 (motor/guessing-c 0.0)))
    (is (= 0.2 (motor/guessing-c 0.2))))

  (testing "fuera de [0, 1) cae al default"
    ;; c = 1 haría que todas las respuestas fueran igual de probables y el
    ;; modelo perdería el máximo; c < 0 no es una probabilidad.
    (is (= motor/default-guessing-c (motor/guessing-c nil)))
    (is (= motor/default-guessing-c (motor/guessing-c 1.0)))
    (is (= motor/default-guessing-c (motor/guessing-c 1.5)))
    (is (= motor/default-guessing-c (motor/guessing-c -0.1)))))

;; -----------------------------------------------------------------------------
;; El sesgo, medido sobre el motor de verdad
;; -----------------------------------------------------------------------------
;; La razón de existir de ADR-034 es un número: el motor v1 le regalaba ~1 logit
;; a un estudiante débil, porque no modelaba que con cuatro alternativas se
;; acierta 1 de cada 4 por azar. Ese número salió de una simulación en Python
;; antes de escribir código; este test lo vuelve a medir **contra el motor real**
;; y lo deja clavado, para que nadie pueda revertir el prior o el azar sin que
;; la suite lo diga.
;;
;; Determinista a propósito: LCG con semilla fija en vez de Math/random. Un test
;; de simulación que no repite no sirve como trinquete.

(defn- lcg
  "Generador congruencial lineal (Numerical Recipes). Devuelve [u siguiente]."
  [s]
  (let [s' (mod (+ (* 1664525 s) 1013904223) 4294967296)]
    [(/ s' 4294967296.0) s']))

(def ^:private banco-real
  "Histograma medido de `numbers_v1` (306 ítems activos, consulta del
   2026-08-28): 55 ítems en [-3,-2], 95 en (-2,-1], 4 en (-1,0], 11 en (0,1],
   2 en (1,2] y 11 en (2,3]. Se usa el banco real y no uno uniforme porque el
   uniforme es el mejor caso posible y aquí interesa el caso que existe."
  (vec (for [[lo hi n] [[-3 -2 55] [-2 -1 95] [-1 0 4] [0 1 11] [1 2 2] [2 3 11]]
             i (range n)]
         (+ lo (* (- hi lo) (/ (+ i 0.5) n))))))

(defn- simula
  "Rinde un diagnóstico de 12 ítems para un estudiante en `theta-real` que
   adivina con probabilidad 0,25, y devuelve el θ estimado con `config`.
   Réplica de la selección del motor: ventana ±1 sobre θ, argmin |b − θ|."
  [theta-real config semilla]
  (loop [usados #{} respuestas [] th -1.0 s semilla n 0]
    (if (>= n 12)
      th
      (let [ventana (or (seq (remove #(or (usados %) (> (Math/abs (- (banco-real %) th)) 1.0))
                                     (range (count banco-real))))
                        (seq (remove #(or (usados %) (> (Math/abs (- (banco-real %) th)) 2.0))
                                     (range (count banco-real)))))]
        (if-not ventana
          th
          (let [i (apply min-key #(Math/abs (- (banco-real %) th)) ventana)
                b (banco-real i)
                p (+ 0.25 (* 0.75 (tetha/probability-1pl theta-real b)))
                [u s'] (lcg s)
                rs (conj respuestas {:difficulty b :correct? (< u p)})]
            (recur (conj usados i) rs
                   (tetha/calculate-theta {:responses rs :theta th} config)
                   s' (inc n))))))))

(defn- sesgo-medio [theta-real config reps]
  (let [suma (reduce (fn [acc k] (+ acc (simula theta-real config (+ 7 (* 977 k)))))
                     0.0 (range reps))]
    (- (/ suma reps) theta-real)))

(deftest v2-corrige-el-sesgo-del-estudiante-debil
  (let [v1 {:guessing-c 0.0 :prior-sd 1.0}   ; el motor hasta 2026-08-28
        v2 nil                                ; los defaults de este namespace
        reps 150]

    (testing "v1 sobreestima a un estudiante débil en cerca de un logit"
      ;; Es el defecto que motiva ADR-034, y le pega justo a quien el producto
      ;; existe para ayudar: el que se está quedando atrás en números.
      (is (> (sesgo-medio -1.5 v1 reps) 0.6)))

    (testing "v2 lo reduce a menos de la mitad"
      (let [s1 (sesgo-medio -1.5 v1 reps)
            s2 (sesgo-medio -1.5 v2 reps)]
        (is (< s2 (* 0.5 s1)))
        (is (< (Math/abs s2) 0.6))))

    (testing "v1 subestima al estudiante fuerte y v2 también lo mejora"
      (let [s1 (sesgo-medio 2.0 v1 reps)
            s2 (sesgo-medio 2.0 v2 reps)]
        (is (neg? s1))
        (is (< (Math/abs s2) (Math/abs s1)))))

    (testing "modelar el azar SIN soltar el prior es una regresión"
      ;; La razón por la que las dos mitades de ADR-034 van en el mismo commit:
      ;; el azar y el prior se cancelaban por accidente, y quitar uno solo
      ;; destapa al otro. Medido en θ = 2,0, donde el prior encoge más.
      (let [solo-azar (sesgo-medio 2.0 {:guessing-c 0.25 :prior-sd 1.0} reps)
            completo  (sesgo-medio 2.0 v2 reps)]
        (is (< (Math/abs completo) (Math/abs solo-azar)))))))

(deftest detecta-la-migracion-sin-aplicar
  ;; Sin esto, desplegar el bundle antes de aplicar `048` haría que cada
  ;; diagnóstico terminado se perdiera al guardar. El reintento sin la columna
  ;; es la red; este test cuida que la red se active.
  (testing "reconoce los dos mensajes con que PostgREST rechaza la columna"
    (is (motor/falta-la-columna-de-version?
         "Could not find the 'engine_version' column of 'tests' in the schema cache"))
    (is (motor/falta-la-columna-de-version?
         "column \"engine_version\" of relation \"tests\" does not exist")))

  (testing "no confunde otros errores: un fallo de RLS no se reintenta"
    (is (not (motor/falta-la-columna-de-version?
              "new row violates row-level security policy for table \"tests\"")))
    (is (not (motor/falta-la-columna-de-version? "")))
    (is (not (motor/falta-la-columna-de-version? nil)))))

(deftest prior-mean-sigue-en-cero
  ;; No se movió a propósito: nadie midió la distribución real de θ de la
  ;; población. `initial_theta` —dónde abre el banco— es otra cosa y vive en
  ;; `test_configs`.
  (is (= 0.0 motor/prior-mean)))
