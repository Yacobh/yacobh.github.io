(ns universo.components.panel-docente
  "El aula: el mapa de errores de un curso, en pantalla.

   ── Qué pregunta responde ──────────────────────────────────────────────────
   *«¿Dónde se equivocaron mis alumnos?»* — no *«¿qué nota sacaron?»*. Es la
   versión en pantalla de `supabase/queries/T-130_mapa_de_errores_de_un_curso.sql`,
   que hasta hoy había que pegar en el SQL Editor de Supabase.

   El entregable es el **ranking de ideas erróneas**: *«8 de 24 estudiantes
   suman las mantisas»* es accionable el lunes siguiente; *«el curso sacó 55 %»*
   no. Y debajo, la pregunta que más falló **con su retroalimentación completa**,
   para proyectarla y corregirla con el curso adelante.

   ── Por qué es un módulo aparte ────────────────────────────────────────────
   R-07: `components/admin.cljs` ya pasa las 1400 líneas. Además esta pantalla
   **no es del admin**: es la que va a ver un profesor cuando exista el rol
   (T-79), y nace en su propio archivo para no tener que mudarla después.

   ── El color ───────────────────────────────────────────────────────────────
   ADR-033: nada de verdes ni rojos de fábrica. Las barras son superficies de
   `panel`/`senal`, el estado lo dice un diodo en su alojamiento, y `alarma`
   queda reservado para lo que de verdad está mal — acá, la alternativa
   incorrecta que más gente marcó."
  (:require [clojure.string :as str]
            [re-frame.core :as re-frame]
            [universo.cohorte :as cohorte]
            [universo.components.cuadrante-aula :as cuadrante]
            [universo.components.graficos-aula :as graficos]
            [universo.components.math-render :as math]))

;; -----------------------------------------------------------------------------
;; Piezas chicas
;; -----------------------------------------------------------------------------

(defn- num
  ([v] (num v 2))
  ([v d] (if (number? v) (.toFixed (js/Number v) d) "—")))

(defn- hora
  "La hora de la sala, no el instante ISO. Un profesor reconoce su clase por
   «10:35», no por un timestamp con zona. Recibe milisegundos, que es lo que
   `cohorte/resumen` entrega."
  [ms]
  (if (number? ms)
    (.toLocaleTimeString (js/Date. ms) "es-CL" #js {:hour "2-digit" :minute "2-digit"})
    "—"))

(defn- lectura
  "Una lectura del panel: leyenda grabada arriba, número abajo."
  [etiqueta valor & [nota]]
  [:div {:class "min-w-0"}
   [:div {:class "grabado mb-1"} etiqueta]
   [:div {:class "font-mono text-xl text-gray-900"} valor]
   (when nota [:div {:class "mt-0.5 text-xs text-gray-600"} nota])])

(defn- barra
  "Una barra de proporción. Es una superficie del panel llenándose, no un color
   semántico: el dato es el número que está al lado, la barra solo lo ordena a
   ojo."
  [pct & [alarma?]]
  [:div {:class "alojamiento h-2 w-full overflow-hidden rounded-full"}
   [:div {:class (str "h-full rounded-full "
                      (if alarma? "bg-alarma-700" "bg-senal-600"))
          :style {:width (str (max 2 (min 100 (or pct 0))) "%")}}]])

(defn- seccion
  [titulo subtitulo & cuerpo]
  [:section {:class "placa rounded-lg bg-panel-100 p-5 sm:p-6"}
   [:div {:class "mb-4"}
    [:h2 {:class "text-lg font-medium tracking-tight text-gray-900"} titulo]
    (when subtitulo
      [:p {:class "mt-1 text-sm text-gray-600"} subtitulo])]
   (into [:div] cuerpo)])

;; -----------------------------------------------------------------------------
;; El selector de cohorte
;; -----------------------------------------------------------------------------

(defn- boton-chip
  "Un control chico del panel. Hundido = seleccionado."
  [activo? etiqueta on-click]
  [:button {:type "button"
            :on-click on-click
            :aria-pressed activo?
            :class (str "rounded px-3 py-1.5 text-xs font-medium "
                        (if activo?
                          "alojamiento text-panel-50"
                          "control text-gray-900"))}
   etiqueta])


(defn- campo
  [etiqueta tipo valor on-change & [placeholder]]
  [:label {:class "block"}
   [:span {:class "grabado mb-1 block"} etiqueta]
   [:input {:type tipo
            :value (or valor "")
            :placeholder placeholder
            :on-change #(on-change (.. % -target -value))
            :class (str "visor w-full rounded px-3 py-2 font-mono text-sm "
                        "text-gray-900 focus:outline-none focus:ring-2 focus:ring-senal-600")}]])

(defn- cohortes-guardadas
  "Las cohortes del usuario. Para un profesor son **las únicas ventanas que
   puede mirar con provecho**: aunque escriba otra a mano, la policy
   `tests_select_profesor` solo le devuelve los intentos de sus cohortes."
  []
  (let [{:keys [cohortes cohorte-activa cohortes-cargando? sin-tabla?]}
        @(re-frame/subscribe [:aula/estado])
        admin? @(re-frame/subscribe [:auth/admin?])]
    (cond
      cohortes-cargando?
      [:p {:class "text-xs text-gray-600"} "Cargando cursos…"]

      sin-tabla?
      ;; R-39: el bundle puede llegar antes que la migración.
      (when admin?
        [:p {:class "text-xs text-gray-600"}
         "Los cursos guardados necesitan la migración 080. Mientras tanto, la ventana se escribe a mano."])

      (empty? cohortes)
      [:p {:class "text-xs text-gray-600"}
       (if admin?
         "Todavía no hay cursos guardados. Crea uno con la ventana de arriba."
         "Todavía no tienes cursos asignados. Pídeselos a quien administra la plataforma.")]

      :else
      [:div {:class "flex flex-wrap items-center gap-2"}
       (for [{:keys [id nombre desde hasta] :as c} cohortes]
         ^{:key id}
         [:div {:class "flex items-center gap-1"}
          [boton-chip (= cohorte-activa id)
           (str nombre " · " (hora (cohorte/instante desde)) "–" (hora (cohorte/instante hasta)))
           #(re-frame/dispatch [:aula/elegir-cohorte c])]
          (when admin?
            [:button {:type "button"
                      :title (str "Borrar «" nombre "»")
                      :on-click #(re-frame/dispatch
                                  [:confirm/ask
                                   {:message (str "¿Borrar el curso «" nombre "»? "
                                                  "Los diagnósticos no se tocan; "
                                                  "solo desaparece la ventana guardada.")
                                    :confirm-label "Borrar"
                                    :variant :danger
                                    :on-confirm [:aula/borrar-cohorte id]}])
                      :class "px-1 text-xs text-gray-600 hover:text-alarma-700"}
             "×"])])])))

(defn- crear-cohorte
  "Alta de una cohorte. **Solo admin**, y no por la UI: la policy
   `cohortes_insert_admin` es la que manda (ADR-042 · CLAUDE.md §7). Un profesor
   que definiera sus propias ventanas podría escribir una que cubra la clase de
   un colega."
  []
  (let [admin? @(re-frame/subscribe [:auth/admin?])
        {:keys [sin-tabla? nueva-cohorte]} @(re-frame/subscribe [:aula/estado])
        {:keys [nombre profesor-id topic-prefijo]} nueva-cohorte
        escribir (fn [k] #(re-frame/dispatch [:aula/nueva-cohorte k %]))]
    (when (and admin? (not sin-tabla?))
      [:details {:class "mt-4 border-t border-panel-400 pt-4"}
       [:summary {:class "grabado cursor-pointer"} "Guardar esta ventana como un curso"]
       [:div {:class "mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3"}
        [campo "Nombre" "text" nombre (escribir :nombre) "3ºB electrónica"]
        [:label {:class "block"}
         [:span {:class "grabado mb-1 block"} "Profesor"]
         [:select {:value (or profesor-id "")
                   :on-change #(re-frame/dispatch
                                [:aula/nueva-cohorte :profesor-id (.. % -target -value)])
                   :class (str "visor w-full rounded px-3 py-2 text-sm text-gray-900 "
                               "focus:outline-none focus:ring-2 focus:ring-senal-600")}
          [:option {:value ""} "Elige una cuenta…"]
          (for [{:keys [id email role]} @(re-frame/subscribe [:aula/candidatos])]
            ^{:key id}
            [:option {:value id} (str email " · " role)])]]
        [campo "Banco (prefijo, opcional)" "text" topic-prefijo (escribir :topic-prefijo)
         "electronica"]]
       [:div {:class "mt-3 flex items-center gap-3"}
        [:button {:type "button"
                  :on-click #(re-frame/dispatch [:aula/crear-cohorte])
                  :class "control rounded px-4 py-2 text-sm font-medium text-gray-900"}
         "Guardar curso"]
        [:p {:class "text-xs text-gray-600"}
         "Usa las horas escritas arriba. Asignarle un curso a una cuenta que todavía no "
         "tiene el rol de profesor es válido: no verá nada hasta que se le dé."]]])))

(defn- selector []
  (let [{:keys [desde hasta banco loading?]} @(re-frame/subscribe [:aula/estado])
        ;; `set!` es forma especial en ClojureScript: el local va con otro nombre.
        escribir (fn [k] #(re-frame/dispatch [:aula/set-campo k %]))]
    [:section {:class "placa rounded-lg bg-panel-100 p-5 sm:p-6"}
     [:div {:class "mb-4"}
      [:h2 {:class "text-lg font-medium tracking-tight text-gray-900"} "La clase"]
      [:p {:class "mt-1 text-sm text-gray-600"}
       "Un curso que rinde en la sala deja sus diagnósticos juntos en el tiempo. "
       "Escribe la hora de inicio y de término de la clase: eso es el curso."]]
     [:div {:class "grid grid-cols-1 gap-4 sm:grid-cols-2"}
      [campo "Desde" "datetime-local" desde (escribir :desde)]
      [campo "Hasta" "datetime-local" hasta (escribir :hasta)]]
     [:div {:class "mt-4 flex items-center gap-3"}
      [:button {:type "button"
                :disabled loading?
                :on-click #(re-frame/dispatch [:aula/cargar])
                :class (str "control rounded px-4 py-2 text-sm font-medium text-gray-900 "
                            (when loading? "opacity-60"))}
       (if loading? "Cargando…" "Ver el curso")]
      [:p {:class "text-xs text-gray-600"}
       "La hora es la del reloj de la sala."]]

     ;; Los bancos salen de lo que de verdad se rindió en la ventana, no de un
     ;; campo de texto: en una hora de clase se rinden varios diagnósticos, y
     ;; escribir el nombre a mano es una forma de equivocarse en silencio.
     [:div {:class "mt-5 border-t border-panel-400 pt-4"}
      [:div {:class "grabado mb-2"} "Cursos"]
      [cohortes-guardadas]]

     [crear-cohorte]

     (let [bancos @(re-frame/subscribe [:aula/bancos-disponibles])]
       (when (seq bancos)
         [:div {:class "mt-5 border-t border-panel-400 pt-4"}
          [:div {:class "grabado mb-2"} "Banco de preguntas"]
          [:div {:class "flex flex-wrap items-center gap-2"}
           [boton-chip (str/blank? (str banco))
            (str "Todos · " (reduce + (map :intentos bancos)))
            #(re-frame/dispatch [:aula/set-campo :banco nil])]
           (for [{:keys [topic estudiantes]} bancos]
             ^{:key topic}
             [boton-chip (= banco topic)
              (str topic " · " estudiantes)
              #(re-frame/dispatch [:aula/set-campo :banco topic])])]]))]))

;; -----------------------------------------------------------------------------
;; Cabecera
;; -----------------------------------------------------------------------------

(defn- cabecera []
  (let [{:keys [intentos estudiantes respuestas bancos primero ultimo]}
        @(re-frame/subscribe [:aula/resumen])
        {:keys [truncada?]} @(re-frame/subscribe [:aula/estado])]
    [:div
     [:div {:class "grid grid-cols-2 gap-4 sm:grid-cols-5"}
      [lectura "Estudiantes" estudiantes "personas distintas"]
      [lectura "Diagnósticos" intentos "incluye reintentos"]
      [lectura "Respuestas" respuestas]
      [lectura "Bancos" bancos]
      [lectura "En la sala"
       (if primero (str (hora primero) "–" (hora ultimo)) "—")
       "primero y último"]]
     (when truncada?
       [:p {:class "mt-4 border-l-2 border-l-alarma-700 pl-3 text-sm text-gray-800"}
        "La ventana trajo el máximo de filas que el servidor entrega de una vez. "
        "El curso puede estar recortado: acota la ventana."])]))

;; -----------------------------------------------------------------------------
;; ⭐ El ranking de ideas erróneas
;; -----------------------------------------------------------------------------

(defn- ranking-de-ideas []
  (let [ideas @(re-frame/subscribe [:aula/ideas-erroneas])
        {:keys [escapes desestimadas-por-esfuerzo sin-idea-catalogada]}
        @(re-frame/subscribe [:aula/descartadas])]
    [seccion "Ideas erróneas"
     "Ordenado por cuántos estudiantes distintos la cometieron."
     (if (empty? ideas)
       [:p {:class "text-sm text-gray-600"}
        "Ningún error con idea errónea catalogada en esta ventana."]
       [:ul {:class "space-y-4"}
        (for [{:keys [idea-erronea modulo estudiantes de-un-total-de pct veces]} (take 12 ideas)]
          ^{:key (str idea-erronea modulo)}
          [:li
           [:div {:class "flex items-baseline justify-between gap-4"}
            [:div {:class "min-w-0 flex-1 text-sm text-gray-900"}
             [math/latex idea-erronea]]
            [:div {:class "shrink-0 font-mono text-sm text-gray-900"}
             (str estudiantes " de " de-un-total-de)]]
           [:div {:class "mt-1.5 flex items-center gap-3"}
            [barra pct]
            [:span {:class "shrink-0 font-mono text-xs text-gray-600"} (str pct " %")]]
           [:div {:class "mt-1 text-xs text-gray-600"}
            modulo
            (when (> veces estudiantes) (str " · " veces " veces en total"))]])])
     ;; Los filtros no pueden ser invisibles: un ranking corto puede significar
     ;; «el curso anduvo bien» o «media sala clickeó sin leer».
     ;; Qué quedó fuera y bajo qué regla. Son definiciones del conteo, no una
     ;; interpretación: sin ellas no se sabe qué significa el número de al lado.
     [:p {:class "mt-5 border-t border-panel-400 pt-3 text-xs text-gray-600"}
      "No entran al conteo: " escapes " respuestas «no sé» (ADR-029), "
      desestimadas-por-esfuerzo " por debajo del umbral de tiempo (ADR-014) y "
      sin-idea-catalogada " errores sin idea errónea escrita en el banco."]]))

;; -----------------------------------------------------------------------------
;; ⭐ La pregunta que más falló, con su retroalimentación completa
;; -----------------------------------------------------------------------------

(defn- alternativa
  [{:keys [letra texto correcta? veces estudiantes idea-erronea]} mas-marcada]
  (let [favorita? (and (not correcta?) (= letra mas-marcada) (pos? veces))]
    [:li {:class (str "rounded border p-3 "
                      (cond
                        correcta? "border-panel-400 bg-panel-50"
                        favorita? "border-l-2 border-l-alarma-700 border-panel-400"
                        :else "border-panel-400"))}
     [:div {:class "flex items-start gap-3"}
      [:span {:class "alojamiento mt-1 inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full"}
       [:span {:class (str "led h-2 w-2 rounded-full "
                           (cond correcta? "led--on" favorita? "led--alarma" :else ""))}]]
      [:div {:class "min-w-0 flex-1"}
       [:div {:class "flex items-baseline gap-2"}
        [:span {:class "font-mono text-xs text-gray-500"} letra]
        [:div {:class "min-w-0 text-sm text-gray-900"} [math/latex texto]]]
       [:div {:class "mt-1 font-mono text-xs text-gray-600"}
        (if correcta?
          (str "correcta · " estudiantes (if (= 1 estudiantes) " la marcó" " la marcaron"))
          (str estudiantes (if (= 1 estudiantes) " estudiante" " estudiantes")))]
       (when idea-erronea
         [:div {:class "mt-2 text-sm text-gray-800"}
          [:div {:class "grabado mb-1"} "Qué pensó quien la marcó"]
          [math/latex idea-erronea]])]]]))

(defn- proyeccion []
  (let [item @(re-frame/subscribe [:aula/item-proyectado])
        items @(re-frame/subscribe [:aula/items])
        abierto @(re-frame/subscribe [:aula/estado])]
    (when item
      (let [{:keys [enunciado modulo veces aciertos pct-acierto estudiantes-que-fallaron
                    alternativas escapes question-id]} item
            mas-marcada (->> alternativas
                             (remove :correcta?)
                             (sort-by (comp - :veces))
                             first
                             :letra)]
        [seccion "El ítem con más errores"
         (str "Las cuatro alternativas, con cuántos estudiantes marcaron cada una "
              "y la idea errónea asociada a cada distractor.")
         [:div {:class "visor rounded p-4"}
          [:div {:class "text-base text-gray-900"} [math/latex (or enunciado "—")]]
          [:div {:class "mt-3 flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs text-gray-600"}
           [:span (str modulo)]
           [:span (str "servida " veces (if (= 1 veces) " vez" " veces"))]
           [:span (str aciertos " aciertos · " pct-acierto " %")]
           [:span (str estudiantes-que-fallaron
                       (if (= 1 estudiantes-que-fallaron) " estudiante falló" " estudiantes fallaron"))]
           (when (pos? (or escapes 0)) [:span (str escapes " se rindieron")])]]
         [:ul {:class "mt-4 space-y-3"}
          (for [a alternativas]
            ^{:key (:letra a)} [alternativa a mas-marcada])]
         ;; Dos hechos, sin conclusión: con cuatro alternativas el azar da 25 %,
         ;; y acá está la concentración real en un distractor. Qué significa lo
         ;; decide quien escribió el ítem.
         (when (and (number? pct-acierto) (<= pct-acierto 30) (>= veces 5))
           (let [favorita (->> alternativas (remove :correcta?) (sort-by (comp - :veces)) first)]
             [:p {:class "mt-4 border-l-2 border-l-alarma-700 pl-3 text-sm text-gray-800"}
              (str "Acierto " pct-acierto " %; el azar en cuatro alternativas da 25 %. "
                   (:veces favorita) " de " (- veces aciertos) " errores están en la alternativa "
                   (:letra favorita) ".")]))
         ;; Las demás candidatas, por si el profesor prefiere otra.
         (let [otras (->> items
                          (filter #(pos? (:estudiantes-que-fallaron %)))
                          (remove #(= question-id (:question-id %)))
                          (take 5))]
           (when (seq otras)
             [:div {:class "mt-5 border-t border-panel-400 pt-3"}
              [:div {:class "grabado mb-2"} "Otras que fallaron"]
              [:div {:class "flex flex-wrap gap-2"}
               (for [{:keys [question-id estudiantes-que-fallaron pct-acierto]} otras]
                 ^{:key question-id}
                 [:button {:type "button"
                           :on-click #(re-frame/dispatch [:aula/abrir-item question-id])
                           :class "control rounded px-3 py-1.5 font-mono text-xs text-gray-900"}
                  (str "#" question-id " · " estudiantes-que-fallaron " fallaron · "
                       pct-acierto " %")])]
              (when (:item-abierto abierto)
                [:button {:type "button"
                          :on-click #(re-frame/dispatch [:aula/abrir-item (:item-abierto abierto)])
                          :class "mt-3 text-xs text-gray-600 underline"}
                 "Volver a la más fallada"])]))]))))

;; -----------------------------------------------------------------------------
;; Déficit por módulo y distribución de θ
;; -----------------------------------------------------------------------------

(defn tabla-de-bancos
  "La tabla de bancos, **sin suscripciones**: recibe los datos y qué hacer al
   elegir uno. Está separada de la sección para poder renderizarla con datos
   reales fuera de la aplicación y mirarla — que es como se encontraron los
   defectos de geometría de los gráficos."
  [bancos banco al-elegir]
  (let [max-est (apply max 1 (map :estudiantes bancos))]
    [:div {:class "overflow-x-auto"}
        [:table {:class "w-full text-left text-sm"}
         [:thead
          [:tr {:class "border-b border-panel-400"}
           (for [h ["Banco" "Estudiantes" "Intentos" "Aciertos" "% acierto" "θ medio" "Al tope"]]
             ^{:key h} [:th {:class "grabado py-2 pr-4 whitespace-nowrap"} h])]]
         [:tbody
          (for [{:keys [topic estudiantes intentos respuestas aciertos pct-acierto
                        theta-medio al-tope-del-banco]} bancos]
            ^{:key topic}
            [:tr {:class (str "border-b border-panel-300 "
                              (when (= banco topic) "bg-panel-50"))}
             [:td {:class "py-2 pr-4"}
              [:button {:type "button"
                        :on-click #(al-elegir (when-not (= banco topic) topic))
                        :class "text-left font-mono text-xs text-gray-900 underline decoration-panel-400"}
               topic]]
             [:td {:class "py-2 pr-4"}
              [:div {:class "flex items-center gap-2"}
               [:span {:class "w-6 shrink-0 font-mono text-gray-900"} estudiantes]
               [:span {:class "w-16 shrink-0"}
                [barra (js/Math.round (* 100.0 (/ estudiantes max-est)))]]]]
             [:td {:class "py-2 pr-4 font-mono text-gray-700"} intentos]
             [:td {:class "py-2 pr-4 font-mono text-gray-700"} (str aciertos "/" respuestas)]
             [:td {:class "py-2 pr-4"}
              [:div {:class "flex items-center gap-2"}
               [:span {:class "w-12 shrink-0 whitespace-nowrap font-mono text-gray-900"} (str pct-acierto " %")]
               [:span {:class "w-16 shrink-0"} [barra pct-acierto (< (or pct-acierto 0) 50)]]]]
             [:td {:class "py-2 pr-4 font-mono text-gray-900"} (num theta-medio)]
             [:td {:class "py-2 pr-4 font-mono text-gray-700"}
              (str al-tope-del-banco "/" estudiantes)]])]]]))

(defn- por-banco []
  (let [bancos @(re-frame/subscribe [:aula/bancos-disponibles])
        {:keys [banco]} @(re-frame/subscribe [:aula/estado])]
    (when (seq bancos)
      [seccion "Por banco de preguntas"
       (str "Cada banco es un diagnóstico distinto. En una misma hora de clase se rinden varios, "
            "y θ de bancos distintos está en escalas distintas: dentro de un banco sí es comparable.")
       [tabla-de-bancos bancos banco
        #(re-frame/dispatch [:aula/set-campo :banco %])]
       [:p {:class "mt-3 text-xs text-gray-600"}
        "«Al tope»: mediciones sin ningún error en las que el banco se quedó sin ítems; ese θ es "
        "hasta donde llegó el test. Pulsa un banco para que el resto de la pantalla muestre solo ese."]])))

(defn- acierto-por-modulo []
  (let [modulos @(re-frame/subscribe [:aula/deficit])
        flojos (remove :evidencia-suficiente? modulos)]
    [seccion "Acierto por módulo"
     (str "Ordenado por cuántos estudiantes rindieron cada módulo, no por el porcentaje: "
          "con pocos estudiantes el porcentaje describe a esas personas, no al curso.")
     [graficos/barras-por-modulo modulos]
     ;; El gemelo en tabla del gráfico de arriba: el número nunca depende de
     ;; poder leer una barra.
     (if (empty? modulos)
       [:p {:class "mt-4 text-sm text-gray-600"} "Sin respuestas en esta ventana."]
       [:div {:class "mt-4 overflow-x-auto"}
        [:table {:class "w-full text-left text-sm"}
         [:thead
          [:tr {:class "border-b border-panel-400"}
           (for [h ["Módulo" "Estudiantes" "Aciertos" "% acierto"]]
             ^{:key h} [:th {:class "grabado py-2 pr-4 whitespace-nowrap"} h])]]
         [:tbody
          (for [{:keys [modulo estudiantes respuestas aciertos pct-acierto
                        evidencia-suficiente?]} modulos]
            ^{:key modulo}
            [:tr {:class "border-b border-panel-300"}
             [:td {:class (str "py-2 pr-4 " (if evidencia-suficiente?
                                              "text-gray-900" "text-gray-600"))}
              modulo]
             [:td {:class "py-2 pr-4 font-mono text-gray-900"} estudiantes]
             [:td {:class "py-2 pr-4 font-mono text-gray-700"} (str aciertos "/" respuestas)]
             [:td {:class "py-2 pr-4 font-mono text-gray-900"} (str pct-acierto " %")]])]]])
     (when (seq flojos)
       [:p {:class "mt-3 text-xs text-gray-600"}
        (str (count flojos) (if (= 1 (count flojos)) " módulo" " módulos")
             " con menos de " cohorte/minimo-de-estudiantes-por-modulo
             " estudiantes: en gris, porque su porcentaje sale de una o dos personas.")])]))

(defn- distribucion []
  (let [{:keys [intentos censurados al-tope-del-banco bandas]}
        @(re-frame/subscribe [:aula/distribucion])
        maximo (max 1 (apply max 1 (map :estudiantes bandas)))]
    [seccion "Distribución de θ"
     "Un punto por estudiante y banco, sobre su último intento."
     [graficos/tira-de-theta @(re-frame/subscribe [:aula/estudiantes])]
     [:ul {:class "mt-4 space-y-3"}
      ;; `:min`/`:max` se renombran para no ensombrecer a `min`/`max` de
      ;; Clojure dentro del cuerpo del `for`.
      (for [{:keys [banda etiqueta estudiantes] menor :min mayor :max} bandas]
        ^{:key banda}
        [:li
         [:div {:class "flex items-baseline justify-between gap-4"}
          [:span {:class "text-sm text-gray-900"} etiqueta]
          [:span {:class "font-mono text-sm text-gray-900"} estudiantes]]
         [:div {:class "mt-1.5"}
          [barra (js/Math.round (* 100.0 (/ estudiantes maximo)))]]
         (when (pos? estudiantes)
           [:div {:class "mt-1 font-mono text-xs text-gray-600"}
            (str "θ " (num menor) " … " (num mayor))])])]
     [:p {:class "mt-4 border-t border-panel-400 pt-3 text-xs text-gray-600"}
      (str intentos " mediciones, una por estudiante y banco. ")
      (when (pos? censurados)
        (str censurados " en el borde de la escala (−3 o +3): ahí el estimador se topó con "
             "el límite. "))
      (when (pos? (or al-tope-del-banco 0))
        (str al-tope-del-banco " sin ningún error, detenidas porque el banco se quedó sin "
             "ítems: ese θ es donde llegó el test, y el nivel real está por encima sin medir. "))
      "Con varios intentos del mismo estudiante se toma el último de cada banco; "
      "qué intento debería valer está sin decidir en el proyecto."]
     ]))

;; -----------------------------------------------------------------------------
;; La lista de estudiantes
;; -----------------------------------------------------------------------------

(def ^:private fluidez-texto
  {:fluida "fluida" :media "media" :laboriosa "laboriosa"})

(defn- ranking-de-estudiantes []
  (let [filas @(re-frame/subscribe [:aula/ranking])
        {:keys [ranking-base ranking-orden]} @(re-frame/subscribe [:aula/estado])
        base (or ranking-base :primeros)
        orden (or ranking-orden :acierto)
        elegir (fn [campo v] #(re-frame/dispatch [:aula/set-campo campo v]))
        max-seg (apply max 1 (keep :seg-por-acierto filas))]
    [seccion "Quiénes participaron"
     "Ordena por cualquiera de estos criterios."
     ;; Los controles, en una sola fila arriba de la tabla.
     [:div {:class "mb-4 space-y-3"}
      [:div {:class "flex flex-wrap items-center gap-2"}
       [:span {:class "grabado mr-1"} "Ordenar por"]
       (for [[k {:keys [etiqueta]}] cohorte/criterios]
         ^{:key k} [boton-chip (= orden k) etiqueta (elegir :ranking-orden k)])]
      [:div {:class "flex flex-wrap items-center gap-2"}
       [:span {:class "grabado mr-1"} "Comparando"]
       (for [[k etiqueta] cohorte/bases-de-comparacion]
         ^{:key k} [boton-chip (= base k) etiqueta (elegir :ranking-base k)])]]

     ;; El hecho y su número, sin la conclusión: medido el 2026-09-21, con esta
     ;; base los cinco primeros por acierto tenían 4, 4, 4, 6 y 15 intentos.
     (when (not= base :primeros)
       (let [repeticion @(re-frame/subscribe [:aula/repeticion])]
         [:p {:class "mb-4 border-l-2 border-l-alarma-700 pl-3 text-sm text-gray-800"}
          "Esta base incluye reintentos. "
          (when repeticion
            (str "Entre un intento y el siguiente se repiten " (:pct repeticion)
                 " % de los ítems, y el estudiante ya vio la explicación correcta de cada uno. "))
          "El primer intento es el único que todos rindieron en las mismas condiciones."]))

     (if (empty? filas)
       [:p {:class "text-sm text-gray-600"} "Nadie rindió en esta ventana."]
       [:div {:class "overflow-x-auto"}
        [:table {:class "w-full text-left text-sm"}
         [:thead
          [:tr {:class "border-b border-panel-400"}
           (for [h ["#" "Estudiante" "Intentos" "Ítems" "% acierto" "θ" "s/acierto" "Fluidez"]]
             ^{:key h} [:th {:class "grabado py-2 pr-4 whitespace-nowrap"} h])]]
         [:tbody
          (for [[i {:keys [correo bancos intentos reintento? items aciertos pct-acierto
                           theta-medio theta-censurado? seg-por-acierto fluidez
                           evidencia evidencia-suficiente? desestimadas escapes]}]
                (map-indexed vector filas)]
            ^{:key correo}
            [:tr {:class "border-b border-panel-300 align-top"}
             [:td {:class "py-2 pr-4 font-mono text-xs text-gray-500"} (inc i)]
             [:td {:class "py-2 pr-4"}
              [:div {:class "text-gray-900"} correo]
              [:div {:class "font-mono text-xs text-gray-600"}
               (str bancos (if (= 1 bancos) " banco" " bancos")
                    (when (pos? (or desestimadas 0))
                      (str " · " desestimadas " sin esfuerzo"))
                    (when (pos? (or escapes 0))
                      (str " · " escapes " «no sé»")))]]
             [:td {:class "py-2 pr-4"}
              [:div {:class "flex items-center gap-2"}
               [:span {:class "alojamiento inline-flex h-3.5 w-3.5 items-center justify-center rounded-full"}
                [:span {:class (str "led h-2 w-2 rounded-full " (when reintento? "led--bronce"))}]]
               [:span {:class "font-mono text-gray-900"} intentos]]]
             [:td {:class "py-2 pr-4 font-mono text-gray-900"} (str aciertos "/" items)]
             [:td {:class "py-2 pr-4"}
              [:div {:class "flex items-center gap-2"}
               [:span {:class "w-12 shrink-0 whitespace-nowrap font-mono text-gray-900"} (str pct-acierto " %")]
               [:span {:class "w-20 shrink-0"} [barra pct-acierto (< (or pct-acierto 0) 50)]]]]
             [:td {:class "py-2 pr-4 whitespace-nowrap font-mono text-gray-900"}
              (num theta-medio)
              (when theta-censurado?
                [:span {:class "ml-1 text-xs text-gray-600"} "(borde)"])]
             [:td {:class "py-2 pr-4"}
              [:div {:class "flex items-center gap-2"}
               [:span {:class "w-10 shrink-0 font-mono text-gray-900"}
                (if (number? seg-por-acierto) (str seg-por-acierto) "—")]
               (when (number? seg-por-acierto)
                 [:span {:class "w-16 shrink-0"}
                  [barra (js/Math.round (* 100.0 (/ seg-por-acierto max-seg)))]])]]
             [:td {:class "py-2 pr-4 whitespace-nowrap text-gray-700"}
              (get fluidez-texto fluidez "—")
              (when-not evidencia-suficiente?
                [:div {:class "text-xs text-gray-600"}
                 (str evidencia (if (= 1 evidencia) " acierto medido" " aciertos medidos"))])]])]]])

     ;; Definiciones de cada columna. Lo que un número **es**, no lo que dice.
     [:p {:class "mt-4 border-t border-panel-400 pt-3 text-xs text-gray-600"}
      "«s/acierto»: mediana de segundos de las respuestas correctas que superaron el umbral de "
      "tiempo (ADR-014). «Fluidez»: tiempo relativo al largo del enunciado (ADR-019); con menos de "
      "cuatro aciertos cronometrados se muestra ese número en vez de la banda. «θ»: promedio de los "
      "intentos incluidos — θ de bancos distintos están en escalas distintas."]

     [:div {:class "mt-6"}
      [:div {:class "grabado mb-2"} "Velocidad contra acierto"]
      [cuadrante/cuadrante filas]]]))

(defn- reintentos []
  (let [progreso @(re-frame/subscribe [:aula/progreso-intentos])
        repeticion @(re-frame/subscribe [:aula/repeticion])
        deltas @(re-frame/subscribe [:aula/delta-theta])
        max-seg (apply max 1 (keep :seg-por-item progreso))]
    (when (seq progreso)
      [seccion "Intentos sucesivos"
       "Sobre quienes rindieron más de una vez el mismo banco. Los dos gráficos comparten el eje horizontal y no la escala vertical."
       [graficos/intentos-sucesivos progreso]
       [:div {:class "mt-4 overflow-x-auto"}
        [:table {:class "w-full text-left text-sm"}
         [:thead
          [:tr {:class "border-b border-panel-400"}
           (for [h ["Intento" "Casos" "Segundos por ítem" "% acierto" "θ medio"]]
             ^{:key h} [:th {:class "grabado py-2 pr-4 whitespace-nowrap"} h])]]
         [:tbody
          (for [{:keys [intento casos seg-por-item pct-acierto theta-medio]} progreso]
            ^{:key intento}
            [:tr {:class "border-b border-panel-300"}
             [:td {:class "py-2 pr-4 font-mono text-gray-900"} (str intento "º")]
             [:td {:class "py-2 pr-4 font-mono text-gray-700"} casos]
             ;; Dos medidas de escalas distintas: dos rieles, nunca un eje
             ;; compartido. Es el error de gráfico más común y acá se nota
             ;; especialmente, porque las dos van en direcciones opuestas.
             [:td {:class "py-2 pr-4"}
              [:div {:class "flex items-center gap-2"}
               [:span {:class "w-10 shrink-0 font-mono text-gray-900"} (str seg-por-item)]
               [:span {:class "w-24 shrink-0"}
                [barra (js/Math.round (* 100.0 (/ (or seg-por-item 0) max-seg)))]]]]
             [:td {:class "py-2 pr-4"}
              [:div {:class "flex items-center gap-2"}
               [:span {:class "w-12 shrink-0 whitespace-nowrap font-mono text-gray-900"} (str pct-acierto " %")]
               [:span {:class "w-24 shrink-0"} [barra pct-acierto]]]]
             [:td {:class "py-2 pr-4 font-mono text-gray-900"} (num theta-medio)]])]]]

       (when repeticion
         [:div {:class "mt-5 visor rounded p-4"}
          [:div {:class "grabado mb-1"} "Ítems que se repiten entre un intento y el siguiente"]
          [:div {:class "font-mono text-2xl text-gray-900"}
           (str (:repetidos-medio repeticion) " de " (:items-medio repeticion)
                "  ·  " (:pct repeticion) " %")]
          [:p {:class "mt-2 text-sm text-gray-800"}
           "El diagnóstico excluye los ítems del intento en curso, no los de intentos anteriores."]])

       (when (seq deltas)
         [:div {:class "mt-5 border-t border-panel-400 pt-4"}
          [:div {:class "grabado mb-2"} "θ del primer intento al último"]
          [:ul {:class "space-y-1.5"}
           (for [{:keys [correo topic intentos theta-inicial theta-final delta]} (take 8 deltas)]
             ^{:key (str correo topic)}
             [:li {:class "flex flex-wrap items-baseline gap-x-3 text-sm"}
              [:span {:class "text-gray-900"} correo]
              [:span {:class "font-mono text-xs text-gray-600"} topic]
              [:span {:class "font-mono text-gray-900"}
               (str (num theta-inicial) " → " (num theta-final))]
              [:span {:class "font-mono text-gray-700"}
               (str "Δ " (if (pos? delta) "+" "") delta)]
              [:span {:class "font-mono text-xs text-gray-600"}
               (str intentos " intentos")]])]])])))

;; -----------------------------------------------------------------------------
;; La sección
;; -----------------------------------------------------------------------------

(defn panel []
  (re-frame/dispatch [:aula/init])
  (fn []
    (let [{:keys [loading? error tests consultada]} @(re-frame/subscribe [:aula/estado])
          cohorte @(re-frame/subscribe [:aula/cohorte])]
      [:div {:class "fondo-graticule min-h-screen bg-panel-200 px-4 py-8"}
       [:div {:class "mx-auto max-w-5xl"}
        [:div {:class "mb-8 border-b border-panel-400 pb-5"}
         [:h1 {:class "text-2xl font-medium tracking-tight text-gray-900"} "El aula"]
         [:p {:class "mt-1 text-sm text-gray-600"}
          "Los diagnósticos rendidos dentro de una ventana de tiempo."]]

        [:div {:class "space-y-6"}
         [selector]

         (cond
           error
           [:div {:class "placa rounded-lg bg-panel-100 p-5"}
            [:p {:class "border-l-2 border-l-alarma-700 pl-3 text-sm text-gray-900"} error]]

           loading?
           [:div {:class "placa rounded-lg bg-panel-100 p-10 text-center"}
            [:p {:class "text-sm text-gray-600"} "Leyendo los diagnósticos de la clase…"]]

           (nil? consultada)
           [:div {:class "placa rounded-lg bg-panel-100 p-10 text-center"}
            [:p {:class "text-sm text-gray-600"}
             "Elige la hora de la clase y pulsa «Ver el curso»."]]

           (empty? cohorte)
           [:div {:class "placa rounded-lg bg-panel-100 p-10"}
            [:p {:class "text-sm text-gray-900"}
             "Ningún diagnóstico de estudiante en esa ventana."]
            [:p {:class "mt-2 text-sm text-gray-600"}
             (str "Se leyeron " (count tests) " filas en el rango. "
                  "Las corridas de depuración de una cuenta de administrador no cuentan como curso, "
                  "y si escribiste un banco en el filtro, solo entran los diagnósticos de ese banco.")]]

           :else
           [:<>
            [:section {:class "placa rounded-lg bg-panel-100 p-5 sm:p-6"} [cabecera]]
            [por-banco]
            [ranking-de-ideas]
            [proyeccion]
            [ranking-de-estudiantes]
            [reintentos]
            [acierto-por-modulo]
            [distribucion]])]]])))
