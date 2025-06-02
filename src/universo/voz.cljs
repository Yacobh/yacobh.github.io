(ns universo.voz
  (:require [reagent.core :as reagent]))

(defn list-voices []
  (when (exists? js/window.speechSynthesis)
    (let [voices (.getVoices js/window.speechSynthesis)]
      (filter #(re-find #"es-" (.-lang %)) voices)
      #_(filter #(re-find #"en-" (.-lang %)) voices)
      #_voices)))

(defn speak-with-voice [text voice]
  (when (exists? js/window.speechSynthesis)
    (let [synthesis js/window.speechSynthesis
          utterance (js/SpeechSynthesisUtterance. text)]

      (set! (.-voice utterance) voice)
      (set! (.-rate utterance) 2.0)     ; Velocidad de habla (0.1 a 10)
      (set! (.-pitch utterance) 0.0)    ; Tono de voz (0 a 2)
      (set! (.-volume utterance) 1.0)   ; Volumen (0 a 1)
      (set! (.-lang utterance) "es-ES") ; Idioma español de España
      (.speak synthesis utterance))))

(defn voice-selector []
  (let [voices (list-voices)
        selected-voice-index (reagent/atom 0)]
    (fn []
      (let [current-voice (get voices @selected-voice-index)]
        [:div
         [:select
          {:value @selected-voice-index
           :on-change (fn [e]
                        (let [index (-> e .-target .-value js/parseInt)]
                          (reset! selected-voice-index index)))}
          (map-indexed
           (fn [idx voice]
             ^{:key idx}
             [:option
              {:value idx}
              (str (.-name voice) " (" (.-lang voice) ")")])
           voices)]

         [:button
          {:on-click (fn []
                       (let [selected-voice (nth voices @selected-voice-index 0)]
                         (println "Voces disponibles:" voices)
                         (println "Voces 1" (.-name (nth voices @selected-voice-index 0)))
                         (println "Voces 2" (str (.-name (first voices)) " (" (.-lang (first voices)) ")"))
                         (println "Índice seleccionado:" @selected-voice-index)
                         (println "Voz seleccionada:" selected-voice)
                         (println "Nombre de la voz:" (.-name selected-voice))
                         (println "Idioma de la voz:" (.-lang selected-voice))
                         (speak-with-voice "Hola nilda Bienvenida al portal de; Jacobo Córdova. ¿en qué puedo ayudarle?" selected-voice)
                         #_(speak-with-voice "no" selected-voice)
                         ))}
          "Hablar"]]))))

(defn speak-text [text]
  (when (exists? js/window.speechSynthesis)
    (let [synthesis js/window.speechSynthesis
          utterance (js/SpeechSynthesisUtterance. text)]
      ;; Configuración predeterminada
      (set! (.-rate utterance) 1.0)     ; Velocidad de habla (0.1 a 10)
      (set! (.-pitch utterance) 1.0)    ; Tono de voz (0 a 2)
      (set! (.-volume utterance) 1.0)   ; Volumen (0 a 1)
      (set! (.-lang utterance) "es-ES") ; Idioma español de España

      ;; Opcional: Seleccionar una voz específica
      (when-let [voices (seq (.getVoices synthesis))]
        (let [spanish-voices (filter #(re-find #"es-" (.-lang %)) voices)]
          (when (seq spanish-voices)
            (set! (.-voice utterance) (first spanish-voices)))))

      ;; Reproducir el audio
      (.speak synthesis utterance))))


(defn speech-component []
  (let [text (reagent/atom "")]
    (fn []
      [:div
       [:input
        {:type "text"
         :value @text
         :on-change #(reset! text (-> % .-target .-value))}]
       [:button
        {:on-click #(speak-text @text)}
        "Hablar"]])))
