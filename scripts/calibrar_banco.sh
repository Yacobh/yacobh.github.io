#!/usr/bin/env bash
# T-76 · Calibra `difficulty` de todos los bancos con las respuestas reales.
#
#   scripts/calibrar_banco.sh <directorio-de-salida> [b-prior-sd]
#
# Tres pasos: volcar con `claude_ro` (solo lectura, ADR-040), compilar el
# script de node y estimar. No escribe nada en la base: el resultado es un
# JSON para leer, y mover una `difficulty` sigue siendo una migración aparte.
set -euo pipefail

salida="${1:?uso: scripts/calibrar_banco.sh <directorio-de-salida> [b-prior-sd]}"
b_sd="${2:-1.0}"
raiz="$(cd "$(dirname "$0")/.." && pwd)"
mkdir -p "$salida"

if [ -z "${SUPABASE_DB_URL_RO:-}" ] && [ -f "$raiz/.env" ]; then
  set -a; . "$raiz/.env"; set +a
fi
: "${SUPABASE_DB_URL_RO:?falta SUPABASE_DB_URL_RO (ver .env.example)}"

psql "$SUPABASE_DB_URL_RO" -At -q \
  -v respuestas="$salida/respuestas.json" \
  -v etiquetas="$salida/etiquetas.json" \
  -f "$raiz/supabase/queries/T-76_datos_de_calibracion.sql"

(cd "$raiz" && npx shadow-cljs release calibracion >/dev/null)

node "$raiz/out/calibracion.js" \
  "$salida/respuestas.json" "$salida/etiquetas.json" "$salida/calibracion.json" "$b_sd"
