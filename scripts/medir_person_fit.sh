#!/usr/bin/env bash
# T-175 · Person-fit en agregado sobre los diagnósticos reales (Q-46).
#
#   scripts/medir_person_fit.sh <directorio-de-salida> [simulaciones]
#
# Vuelca con `claude_ro` (solo lectura), compila el script de node y mide. No
# escribe nada en la base. Salida: `person_fit.json` (por intento, sin
# user_id) y un resumen por topic en la terminal.
set -euo pipefail

salida="${1:?uso: scripts/medir_person_fit.sh <directorio-de-salida> [simulaciones]}"
sims="${2:-500}"
raiz="$(cd "$(dirname "$0")/.." && pwd)"
mkdir -p "$salida"

if [ -z "${SUPABASE_DB_URL_RO:-}" ] && [ -f "$raiz/.env" ]; then
  set -a; . "$raiz/.env"; set +a
fi
: "${SUPABASE_DB_URL_RO:?falta SUPABASE_DB_URL_RO (ver .env.example)}"

psql "$SUPABASE_DB_URL_RO" -At -q -v salida="$salida/intentos.json" \
  -f "$raiz/supabase/queries/T-175_datos_de_person_fit.sql"

(cd "$raiz" && npx shadow-cljs release person-fit >/dev/null)

node "$raiz/out/person_fit.js" "$salida/intentos.json" "$salida/person_fit.json" "$sims"
