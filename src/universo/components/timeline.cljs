(ns universo.components.timeline
  "La línea del tiempo del tablero (ADR-021).

   Barra fija al pie mientras el estudiante está en el tablero. Cada hito es un
   módulo ubicado en el año en que ese contenido apareció en la historia, y se
   enciende como medalla según el mejor θ que el estudiante alcanzó ahí.

   Toda la lógica —qué hito, en qué era, con qué medalla— vive en
   `universo.timeline`, que es puro y testeado. Acá solo se dibuja."
  (:require [re-frame.core :as re-frame]
            [reagent.core :as r]
            [universo.timeline :as tl]))

(defn formatear-anio
  "628 → «628» · -1850 → «1850 a. C.»

   Con espacio fino antes de «a. C.» y sin «d. C.» en los años positivos: nadie
   escribe «1748 d. C.» fuera de un libro de texto."
  [anio]
  (when (number? anio)
    (if (neg? anio)
      (str (Math/abs anio) " a. C.")
      (str anio))))

;; Los tres grados en tema claro y oscuro. El acento ámbar es el oro; la plata
;; usa la tinta clara y el bronce el ámbar oscuro. Nada de gris para el bronce:
;; un módulo intentado tiene que verse encendido, no apagado.
;;
;; Ojo con `acento-500`: NO se usa como texto sobre fondo claro (da 2.81 de
;; contraste, ver scripts/audit_contraste.py). Acá es relleno, que es su lugar.
(def ^:private estilo-medalla
  {:oro    {:punto "bg-acento-500 ring-acento-600 dark:bg-acento-400 dark:ring-acento-300"
            :texto "text-acento-700 dark:text-acento-300"}
   :plata  {:punto "bg-tinta-400 ring-tinta-500 dark:bg-tinta-300 dark:ring-tinta-200"
            :texto "text-tinta-700 dark:text-tinta-200"}
   :bronce {:punto "bg-acento-700 ring-acento-800 dark:bg-acento-600 dark:ring-acento-500"
            :texto "text-acento-800 dark:text-acento-400"}})

(def ^:private estilo-apagado
  {:punto "bg-transparent ring-tinta-300 dark:ring-tinta-600"
   :texto "text-tinta-500 dark:text-tinta-400"})

(defn- etiqueta-accesible
  "Lo que oye alguien con lector de pantalla. Dice el estado explícitamente:
   un punto de color no comunica nada por sí solo."
  [{:keys [title year figure medal discovered?]}]
  (str title ", " (formatear-anio year)
       (when figure (str ", " figure))
       ". "
       (if discovered?
         (str "Descubierto, medalla de " (get tl/medal-label medal) ".")
         "Por descubrir.")))

(defn- punto-hito
  [{:keys [slug medal discovered?] :as hito} seleccionado? on-select]
  (let [{:keys [punto]} (if discovered? (get estilo-medalla medal) estilo-apagado)]
    [:li {:role "listitem"}
     [:button
      {:type "button"
       :class (str "group flex flex-col items-center gap-1 px-2 py-1 rounded "
                   "focus:outline-none focus-visible:ring-2 focus-visible:ring-acento-500 "
                   "focus-visible:ring-offset-1 dark:focus-visible:ring-offset-tinta-950")
       :aria-label (etiqueta-accesible hito)
       :aria-pressed (boolean seleccionado?)
       :on-click #(on-select (when-not seleccionado? slug))}
      [:span {:class (str "block h-3 w-3 rounded-full ring-2 transition-transform "
                          "motion-safe:group-hover:scale-125 "
                          (when seleccionado? "scale-150 ")
                          punto)}]
      [:span {:class (str "text-[10px] tabular-nums "
                          (if discovered?
                            "text-tinta-600 dark:text-tinta-300"
                            "text-tinta-400 dark:text-tinta-500"))}
       (formatear-anio (:year hito))]]]))

(defn- bloque-era
  [{:keys [label milestones]} seleccionado on-select]
  [:div {:class "flex flex-col gap-1 shrink-0"}
   [:span {:class "text-[10px] uppercase tracking-widest text-tinta-500 dark:text-tinta-400 px-2"}
    label]
   [:ul {:role "list"
         :class (str "flex items-end gap-1 border-t border-dashed "
                     "border-tinta-300 dark:border-tinta-700 pt-2")}
    (for [hito milestones]
      ^{:key (:slug hito)}
      [punto-hito hito (= seleccionado (:slug hito)) on-select])]])

(defn- detalle-hito
  "El panel que se abre al tocar un hito. Es el único lugar de toda la app donde
   el `historical_blurb` de los módulos —escrito en 002 y guardado desde
   entonces— llega a los ojos de alguien."
  [{:keys [title year figure blurb medal discovered? theta]}]
  [:div {:class (str "border-t border-tinta-200 dark:border-tinta-800 "
                     "px-4 py-3 max-h-48 overflow-y-auto")}
   [:div {:class "flex flex-wrap items-baseline gap-x-3 gap-y-1"}
    [:h4 {:class "font-display text-base font-semibold text-tinta-800 dark:text-tinta-100"}
     title]
    [:span {:class "text-sm tabular-nums text-tinta-600 dark:text-tinta-300"}
     (formatear-anio year)]
    (when figure
      [:span {:class "text-sm italic text-tinta-600 dark:text-tinta-300"} figure])
    (if discovered?
      [:span {:class (str "text-xs font-semibold uppercase tracking-wide "
                          (:texto (get estilo-medalla medal)))}
       (str "Medalla de " (get tl/medal-label medal))]
      [:span {:class "text-xs uppercase tracking-wide text-tinta-500 dark:text-tinta-400"}
       "Por descubrir"])]
   (when blurb
     [:p {:class "mt-2 text-sm leading-relaxed text-tinta-700 dark:text-tinta-200"} blurb])
   (if discovered?
     [:p {:class "mt-2 text-xs text-tinta-500 dark:text-tinta-400"}
      (str "Tu mejor resultado acá: θ = " (.toFixed (js/Number theta) 2) ".")]
     [:button
      {:type "button"
       :class (str "mt-2 text-xs font-semibold text-tinta-700 dark:text-tinta-200 underline "
                   "underline-offset-2 hover:text-tinta-900 dark:hover:text-tinta-50")
       :on-click #(do (re-frame/dispatch [:test/open-selection])
                      (re-frame/dispatch [:navigate-to :diagnostic-test]))}
      "Rendir una evaluación para descubrirlo →"])])

(defn linea-del-tiempo
  "Barra fija al pie del tablero.

   **Si ningún módulo tiene año, no se dibuja nada.** Eso pasa mientras la
   migración 042 no esté aplicada: no hay dónde ubicar los hitos. Es una
   ausencia de despliegue, no un estado del estudiante — mostrarle una línea
   vacía con un cartel de «falta configurar» sería contarle un problema que no
   es suyo y que no puede resolver. Queda dicho acá, en el código, que es donde
   sirve saberlo."
  []
  (r/with-let [_ (re-frame/dispatch [:dashboard/cargar-modulos])
               seleccionado (r/atom nil)
               abierta? (r/atom true)]
    (let [hitos @(re-frame/subscribe [:dashboard/hitos])
          {:keys [total descubiertos]} @(re-frame/subscribe [:dashboard/hitos-progreso])
          grupos (tl/by-era hitos)
          hito-abierto (when @seleccionado
                         (first (filter #(= @seleccionado (:slug %)) hitos)))]
      (when (seq hitos)
        [:aside
         {:aria-label "Línea del tiempo de la matemática"
          :class (str "fixed bottom-0 left-0 right-0 z-40 "
                      "bg-pergamino-100/95 dark:bg-tinta-950/95 backdrop-blur "
                      "border-t border-tinta-200 dark:border-tinta-800 shadow-lg")}

         ;; Cabecera: progreso + plegar. Siempre visible, para que la línea se
         ;; pueda apartar sin perderla de vista.
         [:div {:class "flex items-center justify-between px-4 py-1.5"}
          [:div {:class "flex items-baseline gap-2 min-w-0"}
           [:span {:class "font-display text-sm font-semibold text-tinta-800 dark:text-tinta-100"}
            "Tu recorrido por la historia"]
           [:span {:class "text-xs tabular-nums text-tinta-600 dark:text-tinta-300"}
            (str descubiertos " de " total " hitos descubiertos")]]
          [:button
           {:type "button"
            :class (str "text-xs font-semibold text-tinta-700 dark:text-tinta-200 "
                        "px-2 py-1 rounded hover:bg-tinta-100 dark:hover:bg-tinta-800 "
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-acento-500")
            :aria-expanded (boolean @abierta?)
            :on-click #(swap! abierta? not)}
           (if @abierta? "Ocultar ▾" "Mostrar ▴")]]

         (when @abierta?
           [:<>
            ;; El scroll horizontal vive acá dentro y nunca en el body: una
            ;; página que se mueve de lado al llegar un hito nuevo es un defecto,
            ;; no una característica.
            [:div {:class "overflow-x-auto px-4 pb-2"}
             [:div {:class "flex items-end gap-6 min-w-max"}
              (for [grupo grupos]
                ^{:key (name (:era grupo))}
                [bloque-era grupo @seleccionado #(reset! seleccionado %)])]]

            (when hito-abierto
              [detalle-hito hito-abierto])])]))))
