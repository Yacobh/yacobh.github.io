(ns universo.rastro-test
  "Tests de `universo.rastro` — el rastro de un intento en curso (T-134,
   ADR-036, migración `070`).

   Dos de estos tests son **espejo de reglas que viven en SQL** y por eso dicen
   arriba cuál es la fuente de verdad: la ventana de abandono
   (`public.intento_abandonado()`) y el recorte de identidad
   (`intentos_sellar`). Mismo criterio con que la confirmación de cupo se
   testea en `universo.slots.logic` documentando que manda el trigger
   (CLAUDE.md §8)."
  (:require [cljs.test :refer-macros [deftest is testing]]
            [universo.rastro :as rastro]))

;; -----------------------------------------------------------------------------
;; Un `:test` de app-db realista, con todo lo que NO debe salir del navegador
;; -----------------------------------------------------------------------------

(def ^:private test-en-curso
  {:responses [{:question-id "q1" :selected-option "B" :correct? false
                :weight 1.0 :difficulty -1.2 :module-slug "aritmetica/enteros"}
               {:question-id "q2" :selected-option "A" :correct? true
                :weight 1.0 :difficulty -0.8 :module-slug "aritmetica/enteros"}]
   :theta -0.94
   :theta-history [-1.0 -1.3 -0.94]
   :theta-initial -1.0
   :stop-reason nil
   :topic "numeros"
   :stop-config {:min-items 8 :max-items 17 :se-threshold 0.3}
   :start-time 1758300000000

   ;; ── Lo que queda afuera ────────────────────────────────────────────────
   :email "alumna@example.com"
   :questions [{:id "q1" :question "Un enunciado larguísimo…"
                :options [{:value "A" :label "…"}]}]
   :feedback {:question {:id "q2"} :response {}}
   :current-question 2
   :prefetched-question {:id "q3"}
   :prefetching? false
   :editor nil
   :escape-resources {:loading? false :items []}
   :configs {"numeros" {:max_items 17}}
   :available-topics ["numeros" "algebra"]
   :scoring? false
   :score 0
   :traits {:logical 0.0 :visual 0.0 :verbal 0.0 :exploratory 0.0}})

;; -----------------------------------------------------------------------------
;; Qué viaja y qué no
;; -----------------------------------------------------------------------------

(deftest parcial-es-lista-blanca
  (testing "solo salen las claves de `claves-del-rastro`"
    (is (= rastro/claves-del-rastro
           (set (keys (rastro/parcial test-en-curso))))))

  (testing "y los valores llegan intactos"
    (let [p (rastro/parcial test-en-curso)]
      (is (= 2 (count (:responses p))))
      (is (= -0.94 (:theta p)))
      (is (= [-1.0 -1.3 -0.94] (:theta-history p)))
      (is (= "numeros" (:topic p)))
      (is (nil? (:stop-reason p))))))

(deftest parcial-no-lleva-identidad
  ;; ⚠️ Fuente de verdad: el trigger `intentos_sellar` de `070`, que le saca
  ;; `email` y `email-user` al jsonb venga de donde venga. Esto es el cinturón
  ;; del cliente, no el límite (CLAUDE.md §7.4). Existe porque `tests.test` ya
  ;; guardó 348 correos por esta misma vía (L-46).
  (testing "la clave `email` del mapa :test no sale nunca"
    (is (not (contains? (rastro/parcial test-en-curso) :email))))

  (testing "tampoco si alguien la agrega a la lista blanca por error"
    (is (not (contains? (rastro/parcial (assoc test-en-curso :email-user "x@y.cl"))
                        :email-user))))

  (testing "y no queda ningún arroba en todo el rastro"
    (is (not (re-find #"@" (pr-str (rastro/parcial test-en-curso)))))))

(deftest parcial-no-lleva-los-enunciados
  ;; Es la decisión de tamaño: `:questions` se reescribiría entero en cada una
  ;; de las ~17 respuestas de un test, y lo que la calibración necesita ya viaja
  ;; dentro de cada respuesta.
  (testing "los enunciados se quedan en el navegador"
    (let [p (rastro/parcial test-en-curso)]
      (is (not (contains? p :questions)))
      (is (not (re-find #"larguísimo" (pr-str p))))))

  (testing "pero cada respuesta conserva lo que la calibración mira"
    (let [r (first (:responses (rastro/parcial test-en-curso)))]
      (is (= "q1" (:question-id r)))
      (is (= -1.2 (:difficulty r)))
      (is (= 1.0 (:weight r)))
      (is (= "aritmetica/enteros" (:module-slug r))))))

(deftest parcial-tolera-lo-vacio
  (testing "un test nulo es un intento sin respuestas, no un error"
    (is (= {} (rastro/parcial nil)))
    (is (= 0 (rastro/n-respuestas nil)))))

;; -----------------------------------------------------------------------------
;; Las tres filas
;; -----------------------------------------------------------------------------

(deftest fila-de-apertura-no-manda-lo-que-escribe-el-servidor
  (let [fila (rastro/fila-de-apertura
              {:id "aaaaaaaa-0000-0000-0000-000000000001"
               :user-id "11111111-1111-1111-1111-111111111111"
               :topic "numeros"
               :engine-version 2
               :test nil})]
    (testing "claves string = nombres exactos de columnas"
      (is (= #{"id" "user_id" "topic" "engine_version" "parcial" "n_respuestas"}
             (set (keys fila)))))

    (testing "`origin` NO se manda: lo pisa el trigger `intentos_marcar_origen`"
      (is (not (contains? fila "origin"))))

    (testing "tampoco los relojes: de `updated_at` depende la regla de abandono"
      (is (not (contains? fila "updated_at")))
      (is (not (contains? fila "iniciado_en"))))

    (testing "un intento recién abierto tiene cero respuestas"
      (is (= 0 (get fila "n_respuestas")))
      (is (= {} (get fila "parcial"))))))

(deftest fila-de-latido-manda-el-rastro-entero
  ;; Es la propiedad que hace segura la deshecha del editor en vivo (ADR-032):
  ;; no se parchea, se reescribe, así que deshacer una respuesta se refleja sin
  ;; ninguna operación de borrado.
  (let [fila (rastro/fila-de-latido test-en-curso)]
    (is (= #{"parcial" "n_respuestas"} (set (keys fila))))
    (is (= 2 (get fila "n_respuestas")))
    (is (= 2 (count (:responses (get fila "parcial"))))))

  (testing "deshacer la última deja el rastro con una respuesta menos"
    (let [deshecho (update test-en-curso :responses pop)
          fila (rastro/fila-de-latido deshecho)]
      (is (= 1 (get fila "n_respuestas")))
      (is (= ["q1"] (mapv :question-id (:responses (get fila "parcial"))))))))

(deftest fila-de-cierre-es-el-latido-mas-el-sello
  (let [fila (rastro/fila-de-cierre test-en-curso)]
    (is (= #{"parcial" "n_respuestas" "cerrado_en"} (set (keys fila))))
    (is (= (get (rastro/fila-de-latido test-en-curso) "parcial")
           (get fila "parcial")))))

(deftest el-cierre-no-lleva-la-hora-del-cliente
  ;; ⚠️ Regresión medida contra PostgREST real: con `cerrado_en` viniendo del
  ;; navegador, un reloj atrasado hace fallar el `update` entero por el check
  ;; `intentos_cierre_posterior`, el intento queda abierto para siempre y quien
  ;; terminó su diagnóstico cuenta como abandono. Ahora el cliente manda una
  ;; **intención** y el trigger `intentos_sellar` pone `now()` del servidor.
  (testing "la marca es constante, no depende de cuándo se llame"
    (is (= (get (rastro/fila-de-cierre test-en-curso) "cerrado_en")
           (get (rastro/fila-de-cierre {}) "cerrado_en")
           rastro/marca-de-cierre)))

  (testing "y sigue siendo algo que PostgREST puede convertir a timestamptz"
    (is (not (js/isNaN (.getTime (js/Date. rastro/marca-de-cierre)))))))

;; -----------------------------------------------------------------------------
;; Cuándo cuenta como abandonado
;; -----------------------------------------------------------------------------

(deftest abandonado-es-espejo-de-la-funcion-sql
  ;; ⚠️ Fuente de verdad: `public.intento_abandonado(cerrado_en, updated_at)` en
  ;; `070`. Si la ventana cambia, cambia primero en SQL.
  (let [ahora 1758312000000
        hace (fn [ms] {:cerrado-en nil :updated-at-ms (- ahora ms)})]

    (testing "un intento abierto que late hace un rato NO está abandonado"
      (is (false? (rastro/abandonado? (hace (* 10 60 1000)) ahora)))
      (is (false? (rastro/abandonado? (hace (* 119 60 1000)) ahora))))

    (testing "pasada la ventana, sí"
      (is (true? (rastro/abandonado? (hace (* 121 60 1000)) ahora)))
      (is (true? (rastro/abandonado? (hace (* 5 60 60 1000)) ahora))))

    (testing "un intento cerrado nunca está abandonado, por viejo que sea"
      (is (false? (rastro/abandonado?
                   {:cerrado-en "2026-09-19T00:00:00Z"
                    :updated-at-ms (- ahora (* 100 60 60 1000))}
                   ahora))))

    (testing "la ventana es la que dice la constante, y se puede pedir otra"
      (is (= (* 2 60 60 1000) rastro/ventana-de-abandono-ms))
      (is (true? (rastro/abandonado? (hace 60000) ahora 1000))))

    (testing "sin `updated_at` no se afirma nada (fila a medio leer)"
      (is (false? (rastro/abandonado? {:cerrado-en nil :updated-at-ms nil} ahora))))))

;; -----------------------------------------------------------------------------
;; Degradación cuando `070` no está aplicada (R-39)
;; -----------------------------------------------------------------------------

(deftest reconoce-que-la-migracion-no-esta-aplicada
  (testing "los mensajes reales de PostgREST y de Postgres"
    (is (true? (rastro/falta-la-tabla?
                "Could not find the table 'public.intentos' in the schema cache")))
    (is (true? (rastro/falta-la-tabla? "PGRST205")))
    (is (true? (rastro/falta-la-tabla?
                "Could not find the 'intento_id' column of 'tests' in the schema cache")))
    (is (true? (rastro/falta-la-tabla? "42P01: relation \"intentos\" does not exist"))))

  (testing "un fallo de red o de RLS NO apaga el rastro"
    ;; Importa: apagarlo por un corte de red dejaría el resto de la sesión sin
    ;; rastro por un problema pasajero.
    (is (false? (rastro/falta-la-tabla? "Failed to fetch")))
    (is (false? (rastro/falta-la-tabla?
                 "new row violates row-level security policy")))
    (is (false? (rastro/falta-la-tabla? nil)))
    (is (false? (rastro/falta-la-tabla? "")))))

(deftest fila-sin-intento-suelta-solo-el-enlace
  (let [row {"test" {} "topic" "numeros" "theta" -0.9
             "engine_version" 2 "user_id" "u" "intento_id" "i"}]
    (is (= (dissoc row "intento_id") (rastro/fila-sin-intento row)))
    (testing "y es inocuo sobre una fila que nunca lo tuvo"
      (is (= (dissoc row "intento_id")
             (rastro/fila-sin-intento (dissoc row "intento_id")))))))

;; -----------------------------------------------------------------------------
;; Lo que se guarda de un test terminado (T-144)
;; -----------------------------------------------------------------------------

(def ^:private test-terminado
  (assoc test-en-curso
         :questions [{:id "q1" :question "¿?" :option_a "1" :option_b "2" :option_c "3" :option_d "4"}]
         :end-time 1758300600000
         :stop-reason :max-items
         ;; Lo que `:test/complete` mandaba antes de T-144 y no lee nadie:
         :email "estudiante@liceo.cl"
         :feedback {:question {} :response {}}
         :editor {:abierto? true}
         :configs {"numeros" {:max-items 12}}
         :available-topics [{:topic "numeros"}]
         :prefetched-question nil
         :scoring? false
         :status :completed
         :question-ids ["q1"]
         :traits {:logical 0.0}
         :score 0
         :current-question 2
         :rastro {:id "uuid" :off? false}))

(deftest diagnostico-guarda-solo-lo-que-alguien-lee
  (let [d (rastro/diagnostico test-terminado)]
    (is (= #{:responses :questions :theta :theta-history :theta-initial :stop-reason
             :stop-config :topic :start-time :end-time}
           (set (keys d))))
    (testing "el correo no entra al jsonb (348 filas lo tenían)"
      (is (not (contains? d :email))))
    (testing "las alternativas vistas se conservan: sin ellas no hay T-132"
      (is (= (:questions test-terminado) (:questions d))))
    (testing "ni aunque alguien la agregue a la lista blanca"
      (is (not (contains? (rastro/diagnostico (assoc test-terminado "email" "x")) "email"))))))

(deftest diagnostico-contiene-al-rastro
  ;; Todo lo que el rastro guarda en `intentos.parcial` tiene que quedar también
  ;; en `tests.test`: si no, la fila final diría menos que el borrador.
  (is (every? rastro/claves-del-diagnostico rastro/claves-del-rastro)))

(deftest diagnostico-de-nil
  (is (= {} (rastro/diagnostico nil))))
