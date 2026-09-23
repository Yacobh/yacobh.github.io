(ns universo.irt.calibracion-cli
  "Punto de entrada de node para correr `universo.irt.calibracion` sobre un
   volcado de la base (T-76). No es parte del bundle: solo lo compila el build
   `:calibracion` de `shadow-cljs.edn`.

   Uso (ver `scripts/calibrar_banco.sh`, que hace los tres pasos):

     node out/calibracion.js <respuestas.json> <etiquetas.json> <salida.json> [b-prior-sd]

   - respuestas.json: filas de `supabase/queries/T-76_datos_de_calibracion.sql`
   - etiquetas.json:  `[{\"id\": 1, \"topic\": \"...\", \"difficulty\": -0.4}, ...]`
   - salida.json:     por banco, el resumen y los ítems ordenados por |delta|"
  (:require [universo.irt.calibracion :as cal]))

(def ^:private fs (js/require "fs"))

(defn- leer-json [ruta]
  (js->clj (.parse js/JSON (.readFileSync fs ruta "utf8")) :keywordize-keys true))

(defn- redondear [x] (when (number? x) (/ (Math/round (* 1000 x)) 1000)))

(defn calibrar-por-banco
  "Una calibración por banco: θ de bancos distintos no comparte escala (ADR-034).

   ⚠️ La etiqueta se busca **por id de ítem en todo el banco de preguntas**, no
   por el topic del test: las filas viejas de `numeros` sirvieron ítems que hoy
   viven en otros topics, y buscarlos por banco los dejaba en 0,0 sin aviso."
  [filas etiquetas opts]
  (let [etiq (into {} (map (fn [e] [(str (:id e)) (:difficulty e)])) etiquetas)]
    (into (sorted-map)
          (for [[topic filas-del-banco] (group-by :topic filas)
                :let [obs (cal/observaciones filas-del-banco)]
                :when (seq obs)]
            (let [c (cal/estimar obs etiq opts)]
              [topic {:resumen (cal/resumen c)
                      :items (mapv (fn [m] (into {} (map (fn [[k v]] [k (if (number? v) (redondear v) v)])) m))
                                   (cal/filas-del-reporte c))}])))))

(defn main [& [ruta-resp ruta-etiq ruta-salida b-sd max-iter]]
  (if-not (and ruta-resp ruta-etiq ruta-salida)
    (do (js/console.error "uso: node out/calibracion.js respuestas.json etiquetas.json salida.json [b-prior-sd]")
        (js/process.exit 2))
    (let [opts (cond-> {}
                 b-sd (assoc :b-prior-sd (js/parseFloat b-sd))
                 max-iter (assoc :max-iter (js/parseInt max-iter)))
          res (calibrar-por-banco (leer-json ruta-resp) (leer-json ruta-etiq) opts)]
      (.writeFileSync fs ruta-salida (.stringify js/JSON (clj->js res) nil 2))
      (doseq [[topic {:keys [resumen]}] res]
        (println topic (pr-str resumen))))))
