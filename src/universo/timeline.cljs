(ns universo.timeline
  "Línea del tiempo del tablero: ubica cada módulo en el momento histórico que
   le corresponde y marca cuáles descubrió el estudiante.

   ── Qué problema resuelve ──────────────────────────────────────────────────
   El proyecto tiene contenido histórico escrito y guardado desde `002`:
   20 módulos PAES y 15 de cuántica con `historical_blurb`, más decenas de
   recursos con `historical_context`. **Nadie lo veía nunca.** Estaba pagado,
   auditado y muerto en la base.

   Esta línea es el lugar donde ese contenido aparece. El eje es tiempo real:
   un módulo no es «la unidad 4», es el momento en que alguien resolvió por
   primera vez ese problema.

   ── Por qué el eje NO es lineal ────────────────────────────────────────────
   Entre el papiro de Moscú (−1850) y John Bell (1964) hay 3800 años, pero
   catorce de los treinta y cinco hitos caen entre 1900 y 1964. Un eje lineal
   los apilaría en un punto y dejaría el 80 % de la línea vacía. Por eso se
   agrupa por **era** y se reparte dentro de cada una: se conserva el orden
   real y se gana legibilidad. La era vive en la base (`modules.historical_era`,
   migración 042) y no se deriva acá, para que el criterio de corte sea un dato
   y no una constante escondida en el cliente.

   ── Las medallas salen de lo que ya se registra ────────────────────────────
   No hay tabla de logros ni tracking de lectura de recursos, y no se agregó
   ninguna: el grado sale del **mejor θ alcanzado** en los tests que ya están
   en la tabla `tests`. Consecuencia buscada: los estudiantes que ya rindieron
   ven sus medallas encendidas la primera vez que abren el tablero, sin tener
   que hacer nada. Una tabla nueva habría arrancado vacía para todos."
  (:require [universo.access :as access]
            [universo.topics :as topics]))

;; -----------------------------------------------------------------------------
;; Eras
;; -----------------------------------------------------------------------------

;; Espejo del check `modules_historical_era_coherente` de la migración 042. Si
;; cambian los cortes allá, cambian acá en el mismo commit — mismo trato que
;; `irt.fluency/default-thresholds` con los umbrales de 041.
;;
;; El corte moderna/contemporánea en 1900 no es una convención más: es el año
;; del cuanto de Planck, donde arranca el track de cuántica.
(def eras
  [{:id :antiguedad    :label "Antigüedad"     :hasta 500}
   {:id :medieval      :label "Edad Media"     :hasta 1400}
   {:id :renacimiento  :label "Renacimiento"   :hasta 1650}
   {:id :moderna       :label "Era moderna"    :hasta 1899}
   {:id :contemporanea :label "Siglo XX"       :hasta nil}])

(def ^:private era-order
  (into {} (map-indexed (fn [i {:keys [id]}] [id i]) eras)))

(defn era-of
  "Era de un año, derivada de los mismos cortes que impone la base.

   Existe para el caso en que un módulo traiga año pero no era (columna vieja,
   fila cargada a mano): la línea prefiere ubicarlo a descartarlo. Cuando la
   fila trae `historical_era`, esa manda."
  [year]
  (when (number? year)
    (:id (or (first (filter (fn [{:keys [hasta]}] (and hasta (<= year hasta))) eras))
             (last eras)))))

(defn era-label
  [era-id]
  (:label (first (filter #(= (:id %) era-id) eras))))

;; -----------------------------------------------------------------------------
;; Medallas
;; -----------------------------------------------------------------------------

;; Espejo deliberado de `universo.profile/theta-band`: oro donde la banda dice
;; `avanzado`, plata donde dice `intermedio`. Si allá cambian los cortes, acá
;; también — si no, un estudiante vería "Avanzado" en su perfil y una medalla
;; de plata en la línea, por el mismo test.
(def ^:private umbral-oro 2.0)
(def ^:private umbral-plata 1.0)

(defn medal-for
  "Grado de la medalla según el mejor θ alcanzado en el módulo.

   `nil` significa **sin rendir**, que es distinto de bronce: el bronce es
   haberlo intentado, y se muestra encendido. Un módulo sin dato queda apagado
   y es lo que hay que descubrir."
  [theta]
  (cond
    (not (number? theta)) nil
    (>= theta umbral-oro) :oro
    (>= theta umbral-plata) :plata
    :else :bronce))

(def medal-label
  {:oro "oro" :plata "plata" :bronce "bronce"})

;; -----------------------------------------------------------------------------
;; Del historial de tests a los módulos
;; -----------------------------------------------------------------------------

(defn best-theta-by-module
  "{topic → mejor θ}  →  {module-slug → mejor θ}.

   Varios topics pueden caer en el mismo módulo (los bancos `diagnostico` y
   `paes_m1` mezclan contenido, T-60), así que se queda el mejor de ellos: si
   alguien demostró nivel avanzado en enteros por cualquier vía, el hito está
   descubierto.

   Los topics que `universo.topics` no sabe mapear se descartan en silencio a
   propósito — es la degradación que ya define ADR-017: un topic sin módulo no
   rompe nada, simplemente no enciende ninguna medalla."
  [achieved]
  (reduce-kv (fn [acc topic theta]
               (if-let [slug (topics/module-slug-for topic)]
                 (update acc slug (fn [previo] (if previo (max previo theta) theta)))
                 acc))
             {}
             (or achieved {})))

(defn- milestone-of
  [module theta]
  (let [year (:historical_year module)
        era (or (some-> (:historical_era module) keyword)
                (era-of year))
        medal (medal-for theta)]
    {:slug (:slug module)
     :title (:title module)
     :year year
     :era era
     :figure (:historical_figure module)
     :blurb (:historical_blurb module)
     :theta theta
     :medal medal
     :discovered? (some? medal)}))

(defn milestones
  "Hitos de la línea, ordenados cronológicamente.

   `modules`: filas de `modules` tal como llegan de Supabase (snake_case, la
   convención ya usada en el proyecto). `test-rows`: filas `{:topic :theta}` del
   historial del estudiante — las mismas que consume `universo.access`.

   Un módulo **sin año queda fuera**: la migración 042 deja `historical_year`
   nullable justamente para no tener que inventarle una fecha a un módulo nuevo,
   y ubicar un hito en un año falso sería peor que no mostrarlo."
  [modules test-rows]
  (let [por-modulo (best-theta-by-module (access/best-theta-by-topic (or test-rows [])))]
    (->> (or modules [])
         (filter #(number? (:historical_year %)))
         (map #(milestone-of % (get por-modulo (:slug %))))
         (sort-by (juxt :year :slug))
         vec)))

(defn by-era
  "Agrupa los hitos por era, en orden histórico, para que la línea pueda
   repartir el espacio por bloque en vez de por año (ver el docstring del ns).

   Las eras sin ningún hito no aparecen: una franja vacía en la línea solo
   ocuparía lugar."
  [milestones']
  (->> (group-by :era milestones')
       (map (fn [[era hitos]]
              {:era era
               :label (era-label era)
               :milestones (vec (sort-by (juxt :year :slug) hitos))}))
       (sort-by #(get era-order (:era %) 99))
       vec))

(defn progress
  "Resumen para la cabecera de la línea: cuántos hitos hay, cuántos descubiertos
   y cuántos de cada grado. Se calcula acá y no en el componente para que sea
   testeable y no haya dos formas de contar lo mismo."
  [milestones']
  (let [hitos (or milestones' [])
        por-grado (frequencies (keep :medal hitos))]
    {:total (count hitos)
     :descubiertos (count (filter :discovered? hitos))
     :oro (get por-grado :oro 0)
     :plata (get por-grado :plata 0)
     :bronce (get por-grado :bronce 0)}))
