(ns universo.supabase
  (:require ["@supabase/supabase-js" :as supabase]))

;; Reemplaza con tus datos reales
(def supabase-url "https://jmnqklhxcdccvdhuuiji.supabase.co")
(def supabase-anon-key "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptbnFrbGh4Y2RjY3ZkaHV1aWppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3NDAwNDksImV4cCI6MjA2NDMxNjA0OX0.WXchV7eoj4pzb8W_N_msmLNwRGEjWoAMRYrBApdRvOo")

(def supabase-client
  (supabase/createClient supabase-url supabase-anon-key))

(js/console.log "🔌 Cliente Supabase creado:" supabase-client)
