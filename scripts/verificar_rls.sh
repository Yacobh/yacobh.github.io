#!/usr/bin/env bash
# T-11 · Verifica los invariantes de RLS sobre un esquema reconstruido.
#
#   scripts/verificar_rls.sh <puerto-de-un-postgres-desechable>
#
# Reconstruye el esquema (scripts/reconstruir_esquema.sh, T-48) y corre
# supabase/pruebas/rls.sql encima. Nunca toca producción: no hay staging
# (T-09), y esto es lo más cerca de «correr contra staging» que existe.
# Sale con 1 si se rompe cualquier invariante.
set -euo pipefail
puerto="${1:?uso: scripts/verificar_rls.sh <puerto>}"
raiz="$(cd "$(dirname "$0")/.." && pwd)"
"$raiz/scripts/reconstruir_esquema.sh" "$puerto" >/dev/null
psql -h 127.0.0.1 -p "$puerto" -U postgres -d reconstruccion -At -q -f "$raiz/supabase/pruebas/rls.sql"
