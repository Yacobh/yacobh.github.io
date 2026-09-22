(ns universo.cohorte-test
  (:require [cljs.test :refer-macros [deftest is testing]]
            [universo.cohorte :as cohorte]))

;; Las formas son las **reales**, verificadas contra producción el 2026-09-21:
;; `questions[].id` y `responses[].question-id` son ambos **números** (un
;; desajuste de tipo dejaría todas las alternativas sin texto, en silencio), las
;; alternativas viajan normalizadas como `{:value "A" :label "…"}` y
;; `selected-option` viene en **mayúscula**.

(def ^:private preguntas
  [{:id 1113
    :options [{:value "A" :label "$6 \\times 10^{6}$"}
              {:value "B" :label "$6 \\times 10^{8}$"}
              {:value "C" :label "$8 \\times 10^{6}$"}
              {:value "D" :label "$6 \\times 10^{12}$"}]}
   {:id 1120
    :options [{:value "A" :label "$2200$ ohm"}
              {:value "B" :label "$0,0022$ ohm"}
              {:value "C" :label "$2\\,200\\,000$ ohm"}
              {:value "D" :label "$22$ ohm"}]}])

(defn- respuesta
  [qid marcada correcta ok? error & [extra]]
  (merge {:question-id qid
          :selected-option marcada
          :correct-option correcta
          :correct? ok?
          :selected-error (or error "")
          :module-slug "electronica/notacion"
          :difficulty 0.2
          :question-text "Multiplica $2\\times 10^{3}$ por $3\\times 10^{3}$"
          :time-ms 24000
          :weight 1.0}
         extra))

(defn- fila
  "Una fila de `tests` como la devuelve `crud/fetch-admin-tests`."
  [{:keys [id user cuando topic theta origin respuestas]
    :or {topic "electronica_notacion" theta 0.5 origin "student"}}]
  {:id id
   :created_at cuando
   :email-user (str user "@liceo.cl")
   :user_id user
   :topic topic
   :theta theta
   :engine_version 2
   :origin origin
   :test {:responses respuestas
          :questions preguntas
          :theta theta
          :stop-reason "max-items"}})

;; ── El curso de la mañana: tres alumnos, el mismo error en dos de ellos ──────

(def ^:private manana
  [(fila {:id 1 :user "ana" :cuando "2026-09-21T14:35:00.000Z" :theta 0.4
          :respuestas [(respuesta 1113 "B" "A" false "Sumaste las mantisas.")
                       (respuesta 1120 "A" "A" true nil)]})
   (fila {:id 2 :user "beto" :cuando "2026-09-21T14:40:00.000Z" :theta -0.7
          :respuestas [(respuesta 1113 "B" "A" false "Sumaste las mantisas.")
                       (respuesta 1120 "B" "A" false "Kilo son mil, no un milesimo.")]})
   (fila {:id 3 :user "cris" :cuando "2026-09-21T14:45:00.000Z" :theta 1.6
          :respuestas [(respuesta 1113 "A" "A" true nil)
                       (respuesta 1120 "A" "A" true nil)]})])

;; ── Lo que tiene que quedar fuera ────────────────────────────────────────────

(def ^:private depuracion-del-owner
  (fila {:id 90 :user "owner" :cuando "2026-09-21T11:30:00.000Z" :origin "admin_preview"
         :respuestas [(respuesta 1113 "B" "A" false "Sumaste las mantisas.")]}))

(def ^:private curso-de-la-tarde
  (fila {:id 91 :user "dani" :cuando "2026-09-21T18:10:00.000Z"
         :respuestas [(respuesta 1113 "C" "A" false "Multiplicaste los exponentes.")]}))

(def ^:private ventana
  {:desde "2026-09-21T14:00:00.000Z" :hasta "2026-09-21T16:00:00.000Z"})

;; =============================================================================
;; La ventana
;; =============================================================================

(deftest la-ventana-es-cerrada-abajo-y-abierta-arriba
  (testing "dos ventanas que comparten el borde no cuentan el mismo intento dos veces"
    (let [justo-al-empezar (fila {:id 10 :user "x" :cuando "2026-09-21T14:00:00.000Z"
                                  :respuestas []})
          justo-al-cerrar (fila {:id 11 :user "y" :cuando "2026-09-21T16:00:00.000Z"
                                 :respuestas []})]
      (is (cohorte/en-ventana? ventana justo-al-empezar))
      (is (not (cohorte/en-ventana? ventana justo-al-cerrar))))))

(deftest la-ventana-acepta-instantes-en-cualquier-forma
  (testing "ms, Date y texto ISO son el mismo instante"
    (let [t (fila {:id 12 :user "x" :cuando "2026-09-21T14:30:00.000Z" :respuestas []})
          ms-desde (.parse js/Date "2026-09-21T14:00:00.000Z")
          ms-hasta (.parse js/Date "2026-09-21T16:00:00.000Z")]
      (is (cohorte/en-ventana? {:desde ms-desde :hasta ms-hasta} t))
      (is (cohorte/en-ventana? {:desde (js/Date. ms-desde) :hasta (js/Date. ms-hasta)} t)))))

(deftest la-ventana-respeta-la-hora-local
  (testing "un intento de las 21:34 de Chile cae en el día siguiente en UTC"
    ;; El modo de fallo que se midió el 2026-09-21: filtrar por `date` en UTC
    ;; mete la noche anterior dentro del curso de la mañana.
    (let [anoche (fila {:id 13 :user "x" :cuando "2026-09-21T00:34:00.000Z" :respuestas []})
          clase {:desde "2026-09-21T13:30:00.000Z" :hasta "2026-09-21T16:00:00.000Z"}]
      (is (not (cohorte/en-ventana? clase anoche))))))

(deftest un-instante-ilegible-no-empieza-en-1970
  (is (nil? (cohorte/instante "no es una fecha")))
  (is (nil? (cohorte/instante nil))))

(deftest el-prefijo-de-topic-acota-el-banco
  (let [t (fila {:id 14 :user "x" :cuando "2026-09-21T14:30:00.000Z"
                 :topic "electronica_notacion" :respuestas []})]
    (is (cohorte/en-ventana? (assoc ventana :topic-prefijo "electronica") t))
    (is (not (cohorte/en-ventana? (assoc ventana :topic-prefijo "algebra") t)))
    (testing "sin prefijo entra cualquier banco"
      (is (cohorte/en-ventana? (assoc ventana :topic-prefijo "") t)))))

(deftest las-corridas-de-depuracion-no-entran-al-curso
  (testing "R-37: una fila admin_preview sesga el mapa hacia la facilidad"
    (let [todos (conj manana depuracion-del-owner curso-de-la-tarde)
          grupo (cohorte/de-la-cohorte ventana todos)]
      (is (= 3 (count grupo)))
      (is (= #{"ana" "beto" "cris"} (into #{} (map :user_id) grupo))))))

(deftest una-fila-sin-origin-es-anterior-a-067-y-se-acepta
  (let [vieja (dissoc (fila {:id 15 :user "vieja" :cuando "2026-09-21T14:50:00.000Z"
                             :respuestas []})
                      :origin)]
    (is (cohorte/de-estudiante? vieja))
    (is (= 1 (count (cohorte/de-la-cohorte ventana [vieja]))))))

;; =============================================================================
;; El ranking de ideas erróneas
;; =============================================================================

(deftest el-ranking-cuenta-estudiantes-no-respuestas
  (let [ranking (cohorte/ideas-erroneas manana)
        primera (first ranking)]
    (is (= "Sumaste las mantisas." (:idea-erronea primera)))
    (is (= 2 (:estudiantes primera)))
    (is (= 3 (:de-un-total-de primera)))
    (is (= 67 (:pct primera)))))

(deftest un-solo-alumno-que-repite-no-le-gana-a-medio-curso
  (testing "ordenar por veces en vez de por estudiantes pondría arriba a uno solo"
    ;; Eva sola cae **cinco veces** en un error que nadie más comete; «Sumaste
    ;; las mantisas» lo cometen dos de tres alumnos, dos veces en total. Por
    ;; frecuencia bruta ganaría el de Eva, y sería un problema de una persona
    ;; presentado como problema del curso.
    (let [obsesiva (fila {:id 20 :user "eva" :cuando "2026-09-21T14:50:00.000Z"
                          :respuestas (vec (repeat 5 (respuesta 1120 "C" "A" false
                                                                "Confundiste kilo con mega.")))})
          ranking (cohorte/ideas-erroneas (conj manana obsesiva))
          suya (first (filter #(= "Confundiste kilo con mega." (:idea-erronea %)) ranking))
          posicion (fn [idea] (count (take-while #(not= idea (:idea-erronea %)) ranking)))]
      (is (= "Sumaste las mantisas." (:idea-erronea (first ranking))))
      (is (= 2 (:estudiantes (first ranking))))
      (testing "y el error de una sola persona queda abajo pese a sus cinco veces"
        (is (= 1 (:estudiantes suya)))
        (is (= 5 (:veces suya)))
        (is (< (posicion "Sumaste las mantisas.")
               (posicion "Confundiste kilo con mega.")))))))

(deftest el-escape-no-cuenta-como-idea-erronea
  (testing "ADR-029: «no sé» no es haber creído que era B"
    (let [rendido (fila {:id 21 :user "fran" :cuando "2026-09-21T14:55:00.000Z"
                         :respuestas [(respuesta 1113 nil "A" false "Sumaste las mantisas."
                                                 {:escape "enunciado" :weight 0.0
                                                  :selected-option nil})]})
          ranking (cohorte/ideas-erroneas [rendido])]
      (is (empty? ranking)))))

(deftest una-respuesta-sin-esfuerzo-no-es-evidencia
  (testing "ADR-014: clickeada en dos segundos no dice nada"
    (let [apurado (fila {:id 22 :user "gabi" :cuando "2026-09-21T14:56:00.000Z"
                         :respuestas [(respuesta 1113 "B" "A" false "Sumaste las mantisas."
                                                 {:time-ms 800 :weight 0.0})]})]
      (is (empty? (cohorte/ideas-erroneas [apurado]))))))

(deftest las-categorias-descartadas-suman-el-total
  (testing "si no suman, algún filtro no es el que uno cree"
    (let [mezcla (conj manana
                       (fila {:id 23 :user "hugo" :cuando "2026-09-21T14:57:00.000Z"
                              :respuestas [(respuesta 1113 nil "A" false ""
                                                      {:escape "no-se" :weight 0.0})
                                           (respuesta 1120 "B" "A" false "Kilo son mil."
                                                      {:time-ms 700 :weight 0.0})
                                           (respuesta 1113 "C" "A" false "")]}))
          {:keys [respuestas correctas escapes desestimadas-por-esfuerzo
                  sin-idea-catalogada usadas-en-el-ranking]}
          (cohorte/descartadas mezcla)]
      (is (= respuestas (+ correctas escapes desestimadas-por-esfuerzo
                           sin-idea-catalogada usadas-en-el-ranking))
          "las cinco categorías son excluyentes y cubren todas las respuestas"))))

;; =============================================================================
;; Déficit por módulo
;; =============================================================================

(deftest el-modulo-con-un-solo-estudiante-no-encabeza-el-curso
  (testing "ordenar por porcentaje pone el ruido arriba — el defecto medido el 2026-09-21"
    ;; Reproduce lo que pasó de verdad: un alumno se metió en un banco ajeno y
    ;; sacó 25 %, mientras el módulo que rindió el curso entero sacó 75 %.
    ;; Ordenando por porcentaje, el banco ajeno quedaba primero.
    (let [curso (vec (for [i (range 5)]
                       (fila {:id (+ 300 i) :user (str "alumno" i)
                              :cuando "2026-09-21T14:00:00.000Z"
                              :respuestas [(respuesta 1113 "A" "A" true nil)
                                           (respuesta 1120 "A" "A" true nil)
                                           (respuesta 1121 "A" "A" true nil)
                                           (respuesta 1122 "B" "A" false "err")]})))
          intruso (fila {:id 400 :user "solitario" :cuando "2026-09-21T14:10:00.000Z"
                         :respuestas [(assoc (respuesta 900 "B" "A" false "err")
                                             :module-slug "aritmetica/fracciones")
                                      (assoc (respuesta 901 "B" "A" false "err")
                                             :module-slug "aritmetica/fracciones")]})
          modulos (cohorte/acierto-por-modulo (conj curso intruso))
          primero (first modulos)
          fracciones (first (filter #(= "aritmetica/fracciones" (:modulo %)) modulos))]
      (is (= "electronica/notacion" (:modulo primero))
          "arriba va el módulo que rindió el curso, no el que rindió una persona")
      (is (= 5 (:estudiantes primero)))
      (is (true? (:evidencia-suficiente? primero)))
      (testing "y el de una sola persona sigue estando, marcado"
        (is (some? fracciones))
        (is (= 1 (:estudiantes fracciones)))
        (is (false? (:evidencia-suficiente? fracciones)))
        (is (= 0 (:pct-acierto fracciones)))))))

(deftest el-acierto-por-modulo-ordena-por-evidencia
  (let [mixto [(fila {:id 30 :user "ana" :cuando "2026-09-21T14:35:00.000Z"
                      :respuestas [(respuesta 1113 "B" "A" false "e1")
                                   (assoc (respuesta 1120 "A" "A" true nil)
                                          :module-slug "electronica/ohm")]})
               (fila {:id 31 :user "beto" :cuando "2026-09-21T14:36:00.000Z"
                      :respuestas [(respuesta 1113 "B" "A" false "e1")
                                   (assoc (respuesta 1120 "A" "A" true nil)
                                          :module-slug "electronica/ohm")]})]
        deficit (cohorte/acierto-por-modulo mixto)]
    (is (= "electronica/notacion" (:modulo (first deficit))))
    (is (= 0 (:pct-acierto (first deficit))))
    (is (= 100 (:pct-acierto (second deficit))))))

;; =============================================================================
;; ⭐ El ítem más fallado, con su retroalimentación
;; =============================================================================

(deftest el-item-mas-fallado-trae-la-retroalimentacion-completa
  (let [item (cohorte/item-mas-fallado manana)]
    (is (= 1113 (:question-id item)))
    (is (= 2 (:estudiantes-que-fallaron item)))
    (is (= 3 (:veces item)))
    (is (= 33 (:pct-acierto item)))
    (is (= "A" (:correcta item)))
    (testing "el texto de la correcta sale de las preguntas que guardó el intento"
      (is (= "$6 \\times 10^{6}$" (:texto-correcta item))))
    (testing "y la idea errónea de cada distractor, de quien lo marcó"
      (let [b (first (filter #(= "B" (:letra %)) (:alternativas item)))]
        (is (= "Sumaste las mantisas." (:idea-erronea b)))
        (is (= 2 (:estudiantes b)))
        (is (false? (:correcta? b)))))
    (testing "la correcta no lleva idea errónea"
      (let [a (first (filter #(= "A" (:letra %)) (:alternativas item)))]
        (is (:correcta? a))
        (is (nil? (:idea-erronea a)))))))

(deftest un-item-servido-una-sola-vez-no-encabeza-el-curso
  (let [raro (fila {:id 40 :user "ivan" :cuando "2026-09-21T14:58:00.000Z"
                    :respuestas [(assoc (respuesta 9999 "D" "A" false "error raro")
                                        :question-text "ítem servido una vez")]})
        item (cohorte/item-mas-fallado (conj manana raro))]
    (is (= 1113 (:question-id item))
        "el de una sola vez no le gana al que falló medio curso")))

(deftest con-pocos-datos-muestra-el-dato-flaco-y-no-una-pantalla-vacia
  (let [raro (fila {:id 41 :user "ivan" :cuando "2026-09-21T14:58:00.000Z"
                    :respuestas [(respuesta 1113 "D" "A" false "error raro")]})
        item (cohorte/item-mas-fallado [raro])]
    (is (= 1113 (:question-id item)))
    (is (= 1 (:veces item)) "y dice cuántas veces se sirvió, para poder desconfiar")))

(deftest sin-errores-no-hay-item-mas-fallado
  (let [perfecto (fila {:id 42 :user "jose" :cuando "2026-09-21T14:59:00.000Z"
                        :respuestas [(respuesta 1113 "A" "A" true nil)]})]
    (is (nil? (cohorte/item-mas-fallado [perfecto])))))

;; =============================================================================
;; θ del curso
;; =============================================================================

(deftest el-ultimo-intento-es-por-banco-y-no-a-secas
  (testing "θ de bancos distintos no son comparables: no se mezclan"
    (let [ts [(fila {:id 50 :user "ana" :cuando "2026-09-21T14:00:00.000Z"
                     :topic "electronica_notacion" :theta 0.2 :respuestas []})
              (fila {:id 51 :user "ana" :cuando "2026-09-21T14:30:00.000Z"
                     :topic "electronica_notacion" :theta 0.9 :respuestas []})
              (fila {:id 52 :user "ana" :cuando "2026-09-21T15:00:00.000Z"
                     :topic "electronica_ohm" :theta -1.2 :respuestas []})]
          ultimos (cohorte/ultimo-por-estudiante ts)]
      (is (= 2 (count ultimos)) "un θ por banco, no uno solo por persona")
      (is (= #{0.9 -1.2} (into #{} (map :theta) ultimos))
          "y del banco repetido queda el más reciente, no el primero"))))

(deftest la-distribucion-separa-los-theta-censurados
  (testing "R-44: un θ pegado al borde del clamp no es una medición"
    (let [ts [(fila {:id 60 :user "ana" :cuando "2026-09-21T14:00:00.000Z" :theta -3.0
                     :respuestas []})
              (fila {:id 61 :user "beto" :cuando "2026-09-21T14:01:00.000Z" :theta 0.5
                     :respuestas []})
              (fila {:id 62 :user "cris" :cuando "2026-09-21T14:02:00.000Z" :theta 2.4
                     :respuestas []})]
          {:keys [intentos censurados bandas]} (cohorte/distribucion-theta ts)]
      (is (= 3 intentos))
      (is (= 1 censurados))
      (is (= 4 (count bandas)) "las cuatro bandas existen aunque estén vacías")
      (is (= 1 (:estudiantes (first (filter #(= "inicial" (:banda %)) bandas)))))
      (is (= 1 (:estudiantes (first (filter #(= "avanzado" (:banda %)) bandas))))))))

;; =============================================================================
;; Resumen
;; =============================================================================

(deftest el-resumen-cuenta-personas-y-no-intentos
  (let [dos-veces (conj manana
                        (fila {:id 70 :user "ana" :cuando "2026-09-21T15:10:00.000Z"
                               :respuestas [(respuesta 1113 "A" "A" true nil)]}))
        {:keys [intentos estudiantes bancos]} (cohorte/resumen dos-veces)]
    (is (= 4 intentos))
    (is (= 3 estudiantes))
    (is (= 1 bancos))))

(deftest por-banco-no-esconde-que-el-curso-avanzo-por-modulos
  (let [ts [(fila {:id 80 :user "ana" :cuando "2026-09-21T14:00:00.000Z"
                   :topic "electronica_notacion" :respuestas []})
            (fila {:id 81 :user "beto" :cuando "2026-09-21T14:01:00.000Z"
                   :topic "electronica_notacion" :respuestas []})
            (fila {:id 82 :user "ana" :cuando "2026-09-21T14:02:00.000Z"
                   :topic "electronica_ohm" :respuestas []})]
        bancos (cohorte/por-banco ts)]
    (is (= 2 (count bancos)))
    (is (= "electronica_notacion" (:topic (first bancos))))
    (is (= 2 (:estudiantes (first bancos))))))

;; =============================================================================
;; El ranking y los intentos
;; =============================================================================

(defn- intento-de
  "Un intento con `n` respuestas correctas de `total`, todas del mismo banco."
  [{:keys [id user cuando theta aciertos total segundos qid-base]
    :or {segundos 25 qid-base 1113}}]
  (fila {:id id :user user :cuando cuando :theta theta
         :respuestas (vec (for [i (range total)]
                            (let [ok? (< i aciertos)]
                              (respuesta (+ qid-base i)
                                         (if ok? "A" "B") "A" ok?
                                         (when-not ok? "Sumaste las mantisas.")
                                         {:time-ms (* 1000 segundos)}))))}))

(deftest se-numera-el-intento-dentro-del-par-estudiante-banco
  (testing "rendir otro banco no es reintentar: es avanzar"
    (let [ts [(fila {:id 1 :user "ana" :cuando "2026-09-21T14:00:00.000Z"
                     :topic "electronica_notacion" :respuestas []})
              (fila {:id 2 :user "ana" :cuando "2026-09-21T14:30:00.000Z"
                     :topic "electronica_notacion" :respuestas []})
              (fila {:id 3 :user "ana" :cuando "2026-09-21T15:00:00.000Z"
                     :topic "electronica_ohm" :respuestas []})]
          numerados (cohorte/con-numero-de-intento ts)
          por-id (into {} (map (juxt :id identity)) numerados)]
      (is (= 1 (:intento-n (por-id 1))))
      (is (= 2 (:intento-n (por-id 2))))
      (is (= 2 (:intentos-totales (por-id 1))))
      (is (= 1 (:intento-n (por-id 3))) "otro banco arranca en 1")
      (is (= 1 (:intentos-totales (por-id 3)))))))

(deftest el-progreso-por-intento-mira-solo-a-quien-reintento
  (testing "mezclar a quien rindió una vez aplana la primera fila"
    (let [ts [(intento-de {:id 1 :user "ana" :cuando "2026-09-21T14:00:00.000Z"
                           :theta -2.0 :aciertos 2 :total 8 :segundos 40})
              (intento-de {:id 2 :user "ana" :cuando "2026-09-21T14:30:00.000Z"
                           :theta 0.5 :aciertos 7 :total 8 :segundos 4})
              ;; Bruno rindió una sola vez y no debe entrar en la tabla.
              (intento-de {:id 3 :user "bruno" :cuando "2026-09-21T14:10:00.000Z"
                           :theta 1.0 :aciertos 8 :total 8 :segundos 30})]
          filas (cohorte/progreso-por-intento ts)]
      (is (= 2 (count filas)))
      (is (= [1 2] (map :intento filas)))
      (is (= 1 (:casos (first filas))) "solo Ana, que reintentó")
      (testing "y se ve el derrumbe del tiempo con el acierto subiendo"
        (is (= 40.0 (:seg-por-item (first filas))))
        (is (= 4.0 (:seg-por-item (second filas))))
        (is (< (:pct-acierto (first filas)) (:pct-acierto (second filas))))))))

(deftest se-mide-cuantos-items-repite-un-reintento
  (testing "R-47: es el número que dice si el reintento midió memoria"
    (let [primero (intento-de {:id 1 :user "ana" :cuando "2026-09-21T14:00:00.000Z"
                               :theta -1.0 :aciertos 2 :total 4 :qid-base 100})
          ;; El segundo comparte 3 de sus 4 ítems con el primero.
          segundo (intento-de {:id 2 :user "ana" :cuando "2026-09-21T14:30:00.000Z"
                               :theta 0.8 :aciertos 4 :total 4 :qid-base 101})
          m (cohorte/repeticion-entre-intentos [primero segundo])]
      (is (= 1 (:pares m)))
      (is (= 3.0 (:repetidos-medio m)))
      (is (= 4.0 (:items-medio m)))
      (is (= 75 (:pct m))))))

(deftest sin-reintentos-no-hay-medida-de-repeticion
  (let [solo (intento-de {:id 1 :user "ana" :cuando "2026-09-21T14:00:00.000Z"
                          :theta 0.0 :aciertos 4 :total 4})]
    (is (nil? (cohorte/repeticion-entre-intentos [solo])))))

(deftest delta-theta-solo-existe-para-quien-reintento
  (let [ts [(intento-de {:id 1 :user "ana" :cuando "2026-09-21T14:00:00.000Z"
                         :theta -2.0 :aciertos 2 :total 8})
            (intento-de {:id 2 :user "ana" :cuando "2026-09-21T14:30:00.000Z"
                         :theta 0.5 :aciertos 7 :total 8})
            (intento-de {:id 3 :user "bruno" :cuando "2026-09-21T14:10:00.000Z"
                         :theta 1.0 :aciertos 8 :total 8})]
        deltas (cohorte/delta-theta ts)]
    (is (= 1 (count deltas)))
    (is (= 2.5 (:delta (first deltas))))
    (is (= 2 (:intentos (first deltas))))))

;; ── El ranking ───────────────────────────────────────────────────────────────

(def ^:private curso-con-reintentos
  [;; Ana: floja al principio, reintenta y "mejora" respondiendo en 3 segundos.
   (intento-de {:id 1 :user "ana" :cuando "2026-09-21T14:00:00.000Z"
                :theta -2.0 :aciertos 2 :total 8 :segundos 40})
   (intento-de {:id 2 :user "ana" :cuando "2026-09-21T14:30:00.000Z"
                :theta 0.5 :aciertos 8 :total 8 :segundos 3})
   ;; Bruno: un solo intento, bueno y con tiempo de trabajo real.
   (intento-de {:id 3 :user "bruno" :cuando "2026-09-21T14:05:00.000Z"
                :theta 1.2 :aciertos 6 :total 8 :segundos 30})])

(deftest el-ranking-compara-por-defecto-el-primer-intento-de-cada-uno
  (testing "es la única base con la que dos estudiantes son comparables"
    (let [filas (cohorte/ranking curso-con-reintentos)
          por-correo (into {} (map (juxt :correo identity)) filas)
          ana (por-correo "ana@liceo.cl")]
      (is (= 25 (:pct-acierto ana)) "su primer intento: 2 de 8")
      (is (= "bruno@liceo.cl" (:correo (first filas)))
          "y arriba queda quien acertó más sin haber visto las respuestas"))))

(deftest el-numero-de-intentos-cuenta-todos-aunque-la-base-sea-el-primero
  (testing "es justo el dato que no hay que esconder al comparar a dos personas"
    (let [por-correo (into {} (map (juxt :correo identity))
                           (cohorte/ranking curso-con-reintentos))]
      (is (= 2 (:intentos (por-correo "ana@liceo.cl"))))
      (is (true? (:reintento? (por-correo "ana@liceo.cl"))))
      (is (= 1 (:intentos (por-correo "bruno@liceo.cl"))))
      (is (false? (:reintento? (por-correo "bruno@liceo.cl")))))))

(deftest sobre-todos-los-intentos-el-que-repitio-sube
  (testing "por eso `:todos` no es el default"
    (let [filas (cohorte/ranking curso-con-reintentos {:base :ultimos})
          por-correo (into {} (map (juxt :correo identity)) filas)]
      (is (= 100 (:pct-acierto (por-correo "ana@liceo.cl"))))
      (is (= "ana@liceo.cl" (:correo (first filas)))
          "con el último intento, quien repitió encabeza"))))

(deftest la-velocidad-se-mide-solo-sobre-aciertos-con-esfuerzo-valido
  (testing "cronometrar los errores premia a quien clickea sin leer"
    (let [;; Dani acierta 2 en 30 s y falla 6 en 1 s: su mediana cruda sería 1 s.
          dani (fila {:id 10 :user "dani" :cuando "2026-09-21T14:00:00.000Z" :theta 0.0
                      :respuestas (into (vec (for [i (range 2)]
                                               (respuesta (+ 200 i) "A" "A" true nil
                                                          {:time-ms 30000})))
                                        (vec (for [i (range 6)]
                                               (respuesta (+ 300 i) "B" "A" false "err"
                                                          {:time-ms 1000 :weight 0.0}))))})
          fila-dani (first (cohorte/ranking [dani]))]
      (is (= 30.0 (:seg-por-acierto fila-dani))
          "los seis clicks de 1 s no cuentan como velocidad")
      (is (= 6 (:desestimadas fila-dani)) "pero sí se informan"))))

(deftest ordenar-deja-al-final-a-quien-no-tiene-el-dato
  (testing "un nil no se puede colar arriba como si fuera cero"
    (let [filas [{:correo "a" :seg-por-acierto 10}
                 {:correo "b" :seg-por-acierto nil}
                 {:correo "c" :seg-por-acierto 4}]
          ordenadas (cohorte/ordenar filas :velocidad)]
      (is (= ["c" "a" "b"] (map :correo ordenadas))))))

(deftest los-criterios-de-orden-apuntan-en-la-direccion-correcta
  (testing "más acierto es mejor; menos tiempo es mejor"
    (let [filas [{:correo "lento" :pct-acierto 90 :seg-por-acierto 50}
                 {:correo "rapido" :pct-acierto 60 :seg-por-acierto 5}]]
      (is (= "lento" (:correo (first (cohorte/ordenar filas :acierto)))))
      (is (= "rapido" (:correo (first (cohorte/ordenar filas :velocidad))))))))

(deftest una-medicion-sin-errores-que-agota-el-banco-es-un-tope-no-un-nivel
  (testing "el caso real del 2026-09-21: 44 de 50 paradas por `exhausted` sin ningún error"
    (let [perfecto (fila {:id 500 :user "ana" :cuando "2026-09-21T14:00:00.000Z" :theta 0.0
                          :respuestas (vec (repeat 6 (respuesta 1113 "A" "A" true nil)))})
          perfecto (assoc-in perfecto [:test :stop-reason] "exhausted")
          ;; Mismo final por `exhausted`, pero con un error: el banco se acabó,
          ;; y aun así hubo evidencia de dónde falla.
          con-error (-> (fila {:id 501 :user "beto" :cuando "2026-09-21T14:01:00.000Z" :theta 0.0
                               :respuestas (conj (vec (repeat 5 (respuesta 1113 "A" "A" true nil)))
                                                 (respuesta 1120 "B" "A" false "err"))})
                        (assoc-in [:test :stop-reason] "exhausted"))
          ;; Y el que simplemente agotó `max_items`.
          normal (-> (fila {:id 502 :user "cris" :cuando "2026-09-21T14:02:00.000Z" :theta 0.5
                            :respuestas (vec (repeat 8 (respuesta 1113 "A" "A" true nil)))})
                     (assoc-in [:test :stop-reason] "max-items"))]
      (is (true? (cohorte/theta-al-tope-del-banco? perfecto)))
      (is (false? (cohorte/theta-al-tope-del-banco? con-error))
          "con un error el banco no fue el límite: hubo medición")
      (is (false? (cohorte/theta-al-tope-del-banco? normal))
          "agotar max_items no es agotar el banco")
      (testing "y la distribución lo cuenta aparte del clamp"
        (let [{:keys [al-tope-del-banco censurados]}
              (cohorte/distribucion-theta [perfecto con-error normal])]
          (is (= 1 al-tope-del-banco))
          (is (= 0 censurados)))))))

(deftest las-mediciones-traen-las-dos-marcas-que-impiden-leerlas-igual
  (let [t (-> (fila {:id 510 :user "ana" :cuando "2026-09-21T14:00:00.000Z" :theta -3.0
                     :respuestas [(respuesta 1113 "B" "A" false "err")]})
              (assoc-in [:test :stop-reason] "max-items"))
        [m] (cohorte/mediciones-de-theta [t])]
    (is (= "ana@liceo.cl" (:correo m)))
    (is (true? (:censurado? m)))
    (is (false? (:tope-del-banco? m)))))

;; =============================================================================
;; Por banco de preguntas
;; =============================================================================

(def ^:private dos-bancos
  [(fila {:id 600 :user "ana" :cuando "2026-09-21T14:00:00.000Z"
          :topic "electronica_notacion" :theta -1.0
          :respuestas [(respuesta 1113 "B" "A" false "Sumaste las mantisas.")
                       (respuesta 1114 "A" "A" true nil)]})
   (fila {:id 601 :user "beto" :cuando "2026-09-21T14:05:00.000Z"
          :topic "electronica_notacion" :theta 0.5
          :respuestas [(respuesta 1113 "A" "A" true nil)
                       (respuesta 1114 "A" "A" true nil)]})
   (fila {:id 602 :user "ana" :cuando "2026-09-21T14:30:00.000Z"
          :topic "diagnostico" :theta 1.5
          :respuestas [(respuesta 20 "A" "A" true nil)]})])

(deftest el-banco-se-elige-exacto-y-no-por-prefijo
  (testing "en una hora de clase se rinden varios diagnósticos distintos"
    (let [solo-notacion (cohorte/de-la-cohorte {:banco "electronica_notacion"} dos-bancos)]
      (is (= 2 (count solo-notacion)))
      (is (= #{"electronica_notacion"} (into #{} (map :topic) solo-notacion))))
    (testing "sin banco entran todos"
      (is (= 3 (count (cohorte/de-la-cohorte {} dos-bancos))))
      (is (= 3 (count (cohorte/de-la-cohorte {:banco ""} dos-bancos)))))
    (testing "y un banco inexistente no devuelve nada, en vez de devolver todo"
      (is (empty? (cohorte/de-la-cohorte {:banco "algebra"} dos-bancos))))))

(deftest el-banco-convive-con-el-prefijo-sin-pisarlo
  (is (= 2 (count (cohorte/de-la-cohorte {:topic-prefijo "electronica"} dos-bancos))))
  (is (= 2 (count (cohorte/de-la-cohorte {:topic-prefijo "electronica"
                                          :banco "electronica_notacion"} dos-bancos))))
  (is (empty? (cohorte/de-la-cohorte {:topic-prefijo "algebra"
                                      :banco "electronica_notacion"} dos-bancos))))

(deftest cada-banco-trae-sus-propias-metricas
  (let [bancos (cohorte/por-banco dos-bancos)
        notacion (first (filter #(= "electronica_notacion" (:topic %)) bancos))
        diagnostico (first (filter #(= "diagnostico" (:topic %)) bancos))]
    (is (= 2 (count bancos)))
    (is (= "electronica_notacion" (:topic (first bancos)))
        "ordenado por estudiantes, no alfabéticamente")
    (is (= 2 (:estudiantes notacion)))
    (is (= 4 (:respuestas notacion)))
    (is (= 3 (:aciertos notacion)))
    (is (= 75 (:pct-acierto notacion)))
    (is (= 1 (:ideas notacion)) "una idea errónea distinta")
    (testing "el θ medio es por banco, que es donde es comparable"
      (is (= -0.25 (:theta-medio notacion)))
      (is (= 1.5 (:theta-medio diagnostico))))))

(deftest el-theta-de-un-banco-usa-el-ultimo-intento-de-cada-estudiante
  (let [ts [(fila {:id 610 :user "ana" :cuando "2026-09-21T14:00:00.000Z"
                   :topic "electronica_ohm" :theta -2.0 :respuestas []})
            (fila {:id 611 :user "ana" :cuando "2026-09-21T14:30:00.000Z"
                   :topic "electronica_ohm" :theta 1.0 :respuestas []})]
        [banco] (cohorte/por-banco ts)]
    (is (= 2 (:intentos banco)))
    (is (= 1 (:estudiantes banco)))
    (is (= 1.0 (:theta-medio banco)) "el último, no el promedio de los dos")))
