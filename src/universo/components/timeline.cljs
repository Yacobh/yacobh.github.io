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
;; Ojo con `senal-500`: NO se usa como texto sobre fondo claro (da 2.81 de
;; contraste, ver scripts/audit_contraste.py). Acá es relleno, que es su lugar.
;; ADR-023: cada hito es un LED en la regleta del panel. Los tres grados son el
;; mismo diodo con distinta corriente, no tres colores distintos: la escala se
;; lee como una sola magnitud que sube, que es lo que θ realmente es.
(def ^:private estilo-medalla
  {:oro    {:punto "led led--oro"    :texto "text-led-700 dark:text-led-400"}
   :plata  {:punto "led led--plata"  :texto "text-led-700 dark:text-led-500"}
   :bronce {:punto "led led--bronce" :texto "text-panel-600 dark:text-led-600"}})

;; Un hito por descubrir no desaparece: se ve como un diodo sin corriente. Que
;; el hueco siga ahí es lo que comunica que **podría** encenderse.
(def ^:private estilo-apagado
  {:punto "led"
   :texto "text-panel-600 dark:text-panel-400"})

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
       ;; T-73: `min-h-11` = 44px, el mínimo táctil recomendado. Antes el botón
       ;; medía ~34px de alto alrededor de un punto de 10px: la interacción
       ;; principal de esta función era la peor adaptada a un teléfono.
       :class (str "group flex min-h-11 flex-col items-center justify-center gap-1 "
                   "px-2.5 py-1.5 rounded "
                   "focus:outline-none focus-visible:ring-2 focus-visible:ring-senal-500 "
                   "focus-visible:ring-offset-1 dark:focus-visible:ring-offset-grafito-950")
       :aria-label (etiqueta-accesible hito)
       :aria-pressed (boolean seleccionado?)
       :on-click #(on-select (when-not seleccionado? slug))}
      [:span {:class (str "block h-3 w-3 rounded-full transition-transform "
                          "motion-safe:group-hover:scale-125 "
                          (when seleccionado? "scale-150 ")
                          punto)}]
      ;; El año se oculta en pantallas chicas: es lo que vuelve la regleta una
      ;; **tira compacta** en el teléfono, que es lo que ADR-021 prometía y
      ;; nunca se había implementado (T-73). El dato no se pierde — está en el
      ;; `aria-label` del botón y en el panel de detalle al tocarlo.
      [:span {:class (str "hidden sm:block text-xs tabular-nums "
                          (if discovered?
                            "text-led-300"
                            "text-panel-400"))}
       (formatear-anio (:year hito))]]]))

(defn- bloque-era
  [{:keys [label milestones]} seleccionado on-select]
  [:div {:class "flex flex-col gap-1 shrink-0"}
   [:span {:class "grabado px-1"} label]
   [:ul {:role "list"
         :class "alojamiento flex items-center gap-2 rounded px-2.5 py-2"}
    (for [hito milestones]
      ^{:key (:slug hito)}
      [punto-hito hito (= seleccionado (:slug hito)) on-select])]])

(defn- detalle-hito
  "El panel que se abre al tocar un hito. Es el único lugar de toda la app donde
   el `historical_blurb` de los módulos —escrito en 002 y guardado desde
   entonces— llega a los ojos de alguien."
  [{:keys [title year figure blurb medal discovered? theta]}]
  [:div {:class (str "border-t border-grafito-200 dark:border-grafito-800 "
                     "px-4 py-3 max-h-48 overflow-y-auto")}
   [:div {:class "flex flex-wrap items-baseline gap-x-3 gap-y-1"}
    [:h4 {:class "font-display text-base font-semibold text-grafito-800 dark:text-grafito-100"}
     title]
    [:span {:class "text-sm tabular-nums text-grafito-600 dark:text-grafito-300"}
     (formatear-anio year)]
    (when figure
      [:span {:class "text-sm italic text-grafito-600 dark:text-grafito-300"} figure])
    (if discovered?
      [:span {:class (str "text-xs font-semibold uppercase tracking-wide "
                          (:texto (get estilo-medalla medal)))}
       (str "Medalla de " (get tl/medal-label medal))]
      [:span {:class "text-xs uppercase tracking-wide text-grafito-500 dark:text-grafito-400"}
       "Por descubrir"])]
   (when blurb
     [:p {:class "mt-2 text-sm leading-relaxed text-grafito-700 dark:text-grafito-200"} blurb])
   (if discovered?
     [:p {:class "mt-2 text-xs text-grafito-500 dark:text-grafito-400"}
      (str "Tu mejor resultado acá: θ = " (.toFixed (js/Number theta) 2) ".")]
     [:button
      {:type "button"
       :class (str "mt-2 text-xs font-semibold text-grafito-700 dark:text-grafito-200 underline "
                   "underline-offset-2 hover:text-grafito-900 dark:hover:text-grafito-50")
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
                      "bg-panel-200/95 dark:bg-panel-900/95 backdrop-blur "
                      "border-t border-panel-400 dark:border-panel-950")}

         ;; Cabecera: progreso + plegar. Siempre visible, para que la línea se
         ;; pueda apartar sin perderla de vista.
         [:div {:class "flex flex-wrap items-center justify-between gap-x-3 px-4 py-1.5"}
          [:div {:class "flex flex-wrap items-baseline gap-x-2 min-w-0"}
           [:span {:class "font-display text-sm font-semibold text-grafito-800 dark:text-grafito-100"}
            "Tu recorrido por la historia"]
           [:span {:class "text-xs tabular-nums text-grafito-600 dark:text-grafito-300"}
            (str descubiertos " de " total " hitos descubiertos")]]
          [:button
           {:type "button"
            :class (str "min-h-11 text-xs font-semibold text-grafito-700 dark:text-grafito-200 "
                        "px-3 py-2 rounded hover:bg-grafito-100 dark:hover:bg-grafito-800 "
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-senal-500")
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
