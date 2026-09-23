#!/usr/bin/env bash
# T-48 · Reconstruye el esquema desde el repositorio y lo compara con producción.
#
#   scripts/reconstruir_esquema.sh <puerto-de-un-postgres-desechable> [directorio-de-trabajo]
#
# Crea la base `reconstruccion` en ese servidor (la borra si existe), aplica
# stub + 000_baseline + todas las migraciones en el orden de SCHEMA.md, y
# compara una huella del catálogo contra la de producción (con claude_ro).
# Nunca escribe en producción. Sale con 1 si hay diferencias.
set -euo pipefail

puerto="${1:?uso: scripts/reconstruir_esquema.sh <puerto> [dir]}"
trabajo="${2:-$(mktemp -d)}"
raiz="$(cd "$(dirname "$0")/.." && pwd)"
m="$raiz/supabase/migrations"
mkdir -p "$trabajo"

if [ -z "${SUPABASE_DB_URL_RO:-}" ] && [ -f "$raiz/.env" ]; then
  set -a; . "$raiz/.env"; set +a
fi

p() { psql -h 127.0.0.1 -p "$puerto" -U postgres -v ON_ERROR_STOP=1 -q "$@"; }

p -d postgres -c "drop database if exists reconstruccion" -c "create database reconstruccion"

# Orden de SCHEMA.md: numérico, salvo que 026 va antes de 025, y los dos
# scripts de acceso del agente (ADR-040) se aplicaron entre 067 y 068.
orden=()
for f in "$m"/[0-9][0-9][0-9]_*.sql; do
  n=$(basename "$f" | cut -c1-3)
  case "$n" in
    025) ;;                                         # va después de 026
    026) orden+=("$m/026_"*.sql "$m/025_"*.sql) ;;
    068) orden+=("$raiz/supabase/acceso_del_agente.sql" "$raiz/supabase/acceso_correccion_tests_pii.sql" "$f") ;;
    *)   orden+=("$f") ;;
  esac
done

p -d reconstruccion -f "$raiz/supabase/baseline/stub_supabase.sql"
for f in "${orden[@]}"; do
  if ! salida=$(p -d reconstruccion -f "$f" 2>&1); then
    echo "✗ falló $(basename "$f"):"; echo "$salida" | grep -E "ERROR|LINE" | head -5
    exit 1
  fi
done
echo "✓ ${#orden[@]} archivos aplicados sobre una base vacía"

p -d reconstruccion -At -f "$raiz/supabase/queries/huella_del_esquema.sql" > "$trabajo/huella_reconstruida.txt"
psql "$SUPABASE_DB_URL_RO" -At -f "$raiz/supabase/queries/huella_del_esquema.sql" > "$trabajo/huella_produccion.txt"

if diff "$trabajo/huella_produccion.txt" "$trabajo/huella_reconstruida.txt" > "$trabajo/diferencias.txt"; then
  echo "✓ el esquema reconstruido coincide con producción ($(wc -l < "$trabajo/huella_produccion.txt" | tr -d ' ') hechos)"
else
  echo "✗ diferencias (< producción · > reconstruido):"; cat "$trabajo/diferencias.txt"
  exit 1
fi
