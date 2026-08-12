(ns universo.irt.fluency
  "Eje 2 — fluidez (λ). Segundo eje de la huella cognitiva de
   [[project-memory/VISION_LIBRO_PROYECTO]] §3.3.

   ── Qué problema resuelve ──────────────────────────────────────────────────
   Hoy el sistema resume a un estudiante en un solo número, θ. Con eso, dos
   personas muy distintas quedan idénticas:

     · la que resuelve bien y de inmediato — tiene la herramienta automatizada;
     · la que resuelve bien pero tras pelearla — la tiene, pero le cuesta cada
       vez, y en una prueba con tiempo eso se paga.

   El caso que motiva el eje, textual del libro del proyecto: «conocimiento
   alto y frecuencia baja indica comprensión sin automatización, y requiere un
   tipo de práctica distinto». Esa persona no necesita más teoría, necesita
   repetición. Recomendarle contenido nuevo es exactamente lo contrario de lo
   que le sirve.

   ── Qué NO es este namespace ───────────────────────────────────────────────
   **No mide estilos de aprendizaje.** El Eje 3 del libro (canal visual /
   auditivo / kinestésico) es una hipótesis que la investigación educativa
   puso a prueba muchas veces y no sostuvo: enseñar en el «canal preferente»
   no mejora el aprendizaje de forma reproducible. Este namespace mide otra
   cosa — **automatización**, que sí es un constructo con respaldo (fluidez y
   práctica hasta la automaticidad) y que además se puede medir con datos que
   ya estamos guardando. El stub muerto `:traits` de `universo.db` apuntaba al
   Eje 3; este namespace apunta al Eje 2, y son cosas distintas.

   ── La medida ──────────────────────────────────────────────────────────────
   El tiempo crudo no sirve: un enunciado de 400 caracteres tarda más que uno
   de 40 sin que eso diga nada del estudiante. Se normaliza por el **tiempo de
   lectura** que ya define `universo.irt.effort/reading-seconds`, reusando su
   constante en vez de inventar otra:

       t_rel = segundos observados / segundos de lectura del enunciado

   `t_rel = 3` significa «tardó tres veces lo que toma leerlo». Es
   adimensional, comparable entre ítems, y se explica en una frase.

   λ se define como su **recíproco** (`λ = 1 / t_rel`) solo para conservar la
   dirección del libro, donde «λ alta = más fluido». El estadístico que se usa
   internamente y el que conviene mirar al calibrar es `t_rel`.

   ── Mediana, no promedio ───────────────────────────────────────────────────
   El test es autoadministrado: alguien deja la pestaña abierta, va a buscar
   agua y vuelve. Un solo ítem de 8 minutos arrastra cualquier promedio. La
   mediana ignora ese ítem sin que haya que decidir un tope arbitrario.

   ── Solo respuestas CORRECTAS ──────────────────────────────────────────────
   Fluidez es hacerlo bien **y** rápido. Una respuesta incorrecta rápida y una
   incorrecta lenta significan lo mismo (no tiene la herramienta) y promediar
   sus tiempos produce un número sin interpretación. Además se exige que la
   respuesta haya pasado el filtro de esfuerzo de ADR-014: una respuesta
   descartada por instantánea no es evidencia de fluidez, es una moneda al
   aire que salió bien."
  (:require [universo.irt.effort :as effort]))

;; -----------------------------------------------------------------------------
;; Medida por respuesta
;; -----------------------------------------------------------------------------

(defn usable?
  "¿Esta respuesta aporta evidencia de fluidez?

   Tres condiciones, todas necesarias:
   1. **Correcta.** Ver la nota del docstring del namespace.
   2. **Con tiempo medido.** `effort/measured-ms` ya trata el 0 como centinela
      de «no medido» y no como «respondió instantáneamente».
   3. **Esforzada.** Peso 1.0 según ADR-014. Si el filtro la descartó, contarla
      acá reintroduciría por la ventana el ruido que el filtro sacó por la
      puerta."
  [response]
  (boolean
   (and (:correct? response)
        (some? (effort/measured-ms response))
        (pos? (effort/weight-of response)))))

(defn relative-time
  "Tiempo relativo de una respuesta: segundos observados / segundos de lectura.

   nil si no se puede calcular. El caso `reading-seconds = 0` (enunciado vacío
   o ausente) devuelve nil en vez de dividir por cero: sin enunciado no hay con
   qué normalizar, y suponer un largo sería inventar el dato."
  [response]
  (when-let [ms (effort/measured-ms response)]
    (let [lectura (effort/reading-seconds (:question-text response))]
      (when (pos? lectura)
        (/ (/ ms 1000.0) lectura)))))

(defn- median
  "Mediana de una colección de números. nil si está vacía."
  [xs]
  (let [v (vec (sort xs))
        n (count v)]
    (when (pos? n)
      (if (odd? n)
        (nth v (quot n 2))
        (/ (+ (nth v (dec (quot n 2))) (nth v (quot n 2))) 2.0)))))

;; -----------------------------------------------------------------------------
;; Umbrales — AUTORALES Y SIN CALIBRAR
;; -----------------------------------------------------------------------------

;; ⚠ Estos dos números los eligió el autor, no los datos. Es exactamente la
;; situación que `028` vivió con `min_response_seconds = 3` antes de que `032`
;; lo bajara a 2 midiendo contra el histórico (ver T-59 y D-36): un número
;; razonable puesto a mano, que después resultó estar del lado equivocado.
;;
;; Se declaran como constantes con nombre, y `classify` los recibe como
;; parámetro, **para que recalibrarlos sea cambiar un argumento y no editar
;; lógica**. La función `calibration-report` de más abajo produce la evidencia
;; con la que corregirlos en cuanto haya diagnósticos rendidos con tiempo real.
;;
;; Criterio provisional: hasta 3 tiempos de lectura se siente inmediato; más de
;; 6 es claramente pelear con el ítem. El medio es el medio.
(def default-thresholds
  {:fluida 3.0      ;; t_rel ≤ 3  → automatizado
   :media  6.0})    ;; 3 < t_rel ≤ 6 → resuelve, pero le cuesta

;; Mínimo de respuestas correctas y medidas para que la mediana signifique algo.
;; Con menos, `classify` devuelve la medición pero **sin banda**: preferimos no
;; etiquetar a etiquetar mal. Cuatro es poco, y es a propósito — los bancos de
;; este proyecto tienen `max_items` entre 4 y 12, así que exigir más dejaría al
;; eje sin poder pronunciarse casi nunca.
(def min-responses 4)

(defn band
  "Banda de fluidez a partir del tiempo relativo mediano.

   `:fluida` | `:media` | `:laboriosa`, o nil si no hay medida."
  ([t-rel] (band t-rel default-thresholds))
  ([t-rel {:keys [fluida media] :as _thresholds}]
   (when (number? t-rel)
     (cond
       (<= t-rel fluida) :fluida
       (<= t-rel media)  :media
       :else             :laboriosa))))

;; -----------------------------------------------------------------------------
;; Clasificación
;; -----------------------------------------------------------------------------

(defn classify
  "Perfil de fluidez de un conjunto de respuestas.

   Devuelve siempre un mapa (nunca nil) para que quien lo consuma no tenga que
   distinguir «no hay datos» de «falló»:

     :n            cuántas respuestas aportaron evidencia
     :t-rel        tiempo relativo mediano (nil si :n = 0)
     :lambda       1 / t-rel, la dirección del libro (nil si :n = 0)
     :band         :fluida | :media | :laboriosa, o nil si :n < min-responses
     :enough?      si la muestra alcanza para pronunciarse

   `:band` nil con `:t-rel` no nil es un estado legítimo y esperado: se midió,
   pero con muy pocos ítems para etiquetar a nadie."
  ([responses] (classify responses default-thresholds))
  ([responses thresholds]
   (let [tiempos (->> (or responses [])
                      (filter usable?)
                      (keep relative-time)
                      vec)
         n (count tiempos)
         t-rel (median tiempos)
         enough? (>= n min-responses)]
     {:n n
      :t-rel t-rel
      :lambda (when (and t-rel (pos? t-rel)) (/ 1.0 t-rel))
      :band (when enough? (band t-rel thresholds))
      :enough? enough?})))

;; -----------------------------------------------------------------------------
;; El cruce con θ: los cuatro perfiles
;; -----------------------------------------------------------------------------

;; θ tiene cuatro bandas (`inicial`/`basico`/`intermedio`/`avanzado`) y la
;; fluidez tres. Doce combinaciones son doce recomendaciones que nadie va a
;; escribir ni mantener, así que se colapsan a un 2×2:
;;
;;   θ:  inicial|basico → :bajo      ·  intermedio|avanzado → :alto
;;   λ:  fluida → :fluida            ·  media|laboriosa → :no-fluida
;;
;; La `media` cae del lado no fluido a propósito: el objetivo del eje es
;; detectar falta de automatización, y ante la duda conviene ofrecer práctica
;; de fluidez —que no le hace daño a nadie— antes que darla por automatizada.

;; Ambos lados aceptan keyword **y** string a propósito. El perfil se persiste
;; en `student_profiles.profile`, que es JSONB: `:fluida` sale como keyword al
;; construirlo y vuelve como `"fluida"` al releerlo. Sin esto, el cuadrante se
;; vería en el momento de terminar el test y desaparecería al recargar la
;; página — un fallo silencioso, dependiente de por dónde llegó el dato.
;; (Mismo patrón que `plan.cljs` ya usa con `:theta_band` / `:theta-band`.)
(defn- as-key [x]
  (cond
    (keyword? x) x
    (string? x) (keyword x)
    :else nil))

(defn- theta-side [theta-band]
  (case (as-key theta-band)
    (:intermedio :avanzado) :alto
    (:inicial :basico) :bajo
    nil))

(defn- fluency-side [fluency-band]
  (case (as-key fluency-band)
    :fluida :fluida
    (:media :laboriosa) :no-fluida
    nil))

(def profiles
  "Los cuatro perfiles del cruce θ × λ, con qué hacer en cada uno.

   `:accion` es la parte que importa: es lo que cambia entre un cuadrante y
   otro, y la razón de existir de todo este namespace."
  {[:alto :fluida]
   {:id :consolidado
    :titulo "Consolidado"
    :descripcion "Resuelve bien y sin pelearla: la herramienta está automatizada."
    :accion "Subir dificultad. Repetir lo que ya domina no le agrega nada."}

   [:alto :no-fluida]
   {:id :sabe-pero-lento
    :titulo "Sabe, pero le cuesta"
    :descripcion "Llega al resultado correcto, pero cada ítem le exige pelearlo."
    :accion "Práctica de fluidez: series cortas del mismo tipo, repetidas. NO más teoría — ya la tiene."}

   [:bajo :fluida]
   {:id :rapido-sin-base
    :titulo "Rápido, sin base"
    :descripcion "Responde muy por debajo del tiempo esperado y aun así falla."
    :accion "Revisar antes de recomendar: puede ser exceso de confianza, o adivinación que el filtro de esfuerzo no alcanzó a descartar."}

   [:bajo :no-fluida]
   {:id :en-construccion
    :titulo "En construcción"
    :descripcion "Todavía no tiene la herramienta, y eso se nota en el resultado y en el tiempo."
    :accion "Contenido, no velocidad. Acá la fluidez es una consecuencia, no un objetivo."}})

(defn profile-for
  "Perfil del cruce θ × λ, o nil si falta cualquiera de los dos ejes.

   nil es la respuesta correcta cuando no hay evidencia suficiente: es
   preferible no decir nada a etiquetar a alguien con cuatro respuestas."
  [theta-band fluency-band]
  (let [t (theta-side theta-band)
        f (fluency-side fluency-band)]
    (when (and t f)
      (get profiles [t f]))))

;; -----------------------------------------------------------------------------
;; Calibración (el reemplazo futuro de los umbrales autorales)
;; -----------------------------------------------------------------------------

(defn calibration-report
  "Distribución de tiempos relativos sobre un histórico de respuestas.

   Es la herramienta con la que reemplazar `default-thresholds` por números
   medidos, igual que `032` reemplazó el 3 autoral de `min_response_seconds`.
   No decide nada: describe.

   Devuelve `:n`, `:min`, `:max`, la mediana y los deciles, para poder elegir
   los cortes donde efectivamente estén los estudiantes y no donde el autor
   supuso que estarían."
  [responses]
  (let [tiempos (->> (or responses [])
                     (filter usable?)
                     (keep relative-time)
                     sort
                     vec)
        n (count tiempos)]
    (when (pos? n)
      {:n n
       :min (first tiempos)
       :max (peek tiempos)
       :mediana (median tiempos)
       :deciles (vec (for [d (range 1 10)]
                       (let [idx (min (dec n) (int (* n (/ d 10.0))))]
                         {:decil d :t-rel (nth tiempos idx)})))})))
