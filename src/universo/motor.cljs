(ns universo.motor
  "Versión del motor de estimación de θ y sus constantes por defecto.

   ── Por qué existe este namespace ──────────────────────────────────────────
   Un θ guardado en `tests` no significa nada por sí solo: significa «lo que
   estas reglas calcularon con estas respuestas». Cuando las reglas cambian, el
   número cambia sin que cambie el estudiante, y dos θ de versiones distintas
   **no son comparables**. Eso importa especialmente para G-4, que promete
   entregar Δθ —progreso medido— al estudiante: un Δθ que mezcle versiones mide
   el cambio del motor, no el del estudiante.

   Por eso cada fila de `tests` guarda con qué versión se calculó su θ, y por
   eso este número **se sube en el mismo commit** que cambia el modelo, la
   regla de parada o el prior. Si cambias cualquiera de esas tres cosas y no
   subes la versión, la deriva vuelve a ser silenciosa — que es exactamente lo
   que pasó entre ADR-004 y el código (X-10).

   ── Historial ──────────────────────────────────────────────────────────────
   | Versión | Desde | Qué la define |
   |---|---|---|
   | 1 (implícita) | 2025-05 | 1PL sin azar, prior N(0,1), θ = MAP con |Δθ| ≤ 0,4 |
   | 2 | 2026-08-28 | Azar fijo c = 0,25 y prior N(0, 2²) — ADR-034 |

   `tests.engine_version` nulo significa **versión 1**: son las filas anteriores
   a la migración `048`, no filas sin motor.")

;; La versión que produce esta build. Se estampa en cada fila de `tests`.
(def version 2)

;; Valor de `engine_version` que hay que suponerle a una fila que no lo trae.
(def legacy-version 1)

;; ── Azar (c) ────────────────────────────────────────────────────────────────
;; Todos los ítems del banco tienen cuatro alternativas, así que quien responde
;; al azar acierta 1 de cada 4. Sin este término, un acierto por adivinanza
;; cuenta como evidencia plena de habilidad, y el efecto **no es pequeño ni
;; simétrico**: medido en simulación sobre la distribución real de
;; `numbers_v1`, el motor v1 le regalaba **+1,0 logits a un estudiante en
;; θ = −1,5** y le quitaba 0,4 a uno en θ = 2,0.
;;
;; Es una **constante, no un parámetro**: estimar `c` por ítem (3PL) exige del
;; orden de 1.000 respuestas por ítem y hoy hay 0 ítems con 30 (R-17, G-2). Una
;; constante fijada por el número de alternativas es defendible sin datos; un
;; parámetro estimado con este banco sería ruido con apariencia de rigor.
(def default-guessing-c 0.25)

;; ── Prior ───────────────────────────────────────────────────────────────────
;; N(0, σ²) con σ = 2: débilmente informativo sobre la escala [-3, 3] que usa el
;; sistema. El σ = 1 anterior encogía tanto que un estudiante en θ = 2,0 caía en
;; la banda correcta el 20 % de las veces; con σ = 2 sube a 36 % y con σ = 3 a
;; 44 %.
;;
;; **Se eligió 2 y no 3 a propósito.** σ = 3 pone el 95 % de la masa en [-6, 6],
;; más ancho que la escala misma: deja de regularizar. Y lo que se regulariza
;; acá no es solo el θ del estudiante — es un banco cuya `difficulty` es autoral
;; (R-17): con `b` sin medir, algo de encogimiento protege contra un ítem mal
;; etiquetado. Cuando el banco esté calibrado, este número se vuelve a discutir
;; con datos, y por eso es configurable por evaluación (`test_configs.prior_sd`).
(def default-prior-sd 2.0)

;; Media del prior. Sigue en 0,0: nadie ha medido la distribución real de θ de
;; la población, así que centrar en otro punto sería inventar el dato. **No se
;; confunde con `test_configs.initial_theta`**, que es dónde abre el banco —
;; una decisión de selección de ítems, no del prior.
(def prior-mean 0.0)

(defn prior-precision
  "Precisión del prior = 1/σ². Un σ nulo o no positivo cae al valor por defecto:
   una config a medio llenar no debe convertirse en un prior degenerado."
  ([] (prior-precision default-prior-sd))
  ([sd]
   (let [s (double (or sd default-prior-sd))]
     (if (pos? s)
       (/ 1.0 (* s s))
       (/ 1.0 (* default-prior-sd default-prior-sd))))))

(def column-name
  "Nombre de la columna en `tests`. Vive acá para que el cliente y el mensaje
   de error hablen del mismo string."
  "engine_version")

(defn falta-la-columna-de-version?
  "true si un error de PostgREST se debe a que `tests.engine_version` no existe
   todavía — o sea, a que la migración `048` no está aplicada.

   Existe porque las migraciones de este proyecto se aplican a mano y el bundle
   puede adelantarse. PostgREST responde `PGRST204` («Could not find the
   'engine_version' column … in the schema cache») o `42703`; en los dos casos
   el nombre de la columna aparece en el mensaje, así que se busca eso y no un
   código, que cambia entre versiones de PostgREST."
  [error]
  (let [msg (str error)]
    (and (seq msg)
         (not= -1 (.indexOf msg column-name)))))

(defn guessing-c
  "Azar efectivo. Fuera de [0, 1) cae al valor por defecto: un `c` de 1 haría
   que todas las respuestas fueran igual de probables y el modelo dejaría de
   tener máximo."
  ([] default-guessing-c)
  ([c]
   (let [x (double (or c default-guessing-c))]
     (if (and (>= x 0.0) (< x 1.0)) x default-guessing-c))))
