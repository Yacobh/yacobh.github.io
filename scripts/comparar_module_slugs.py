#!/usr/bin/env python3
"""Compara los módulos de la base con el `def module-slugs` del cliente.

Es la métrica **M11** de la skill `unidad-de-contenido`, y existe por un defecto
real: `055` creó los seis módulos de `probabilidad/*` con su banda, `056` trajo
sus 102 ítems y `059` su `test_configs` — todo verificado, todo aplicado, el
build en verde y los seis auditores en verde. Nadie agregó los seis slugs a
`universo.topics/module-slugs`, que es un `def` literal en ClojureScript.

Consecuencia, verificada en el código:

    crud/question-select-cols trae module_id, NO module_slug
      -> profile/module-slug-for cae a topics/module-slug-for
      -> el slug no está en el `def` -> nil
      -> déficit = "unknown/<topic>"
      -> plan/resources-for-deficits no cruza -> {:kind :general}

O sea: el estudiante rinde, el motor estima bien su θ, y «Mi plan» no puede
decirle qué estudiar. **Nada falla y nada avisa.**

Medido contra producción el 2026-09-18: 53 módulos en la base, 20 en el `def`,
**33 faltando**, y **5 personas reales** ya afectadas (T-152).

Uso:
    psql "$SUPABASE_DB_URL_RO" -tAc "select slug from modules order by slug;" > /tmp/slugs.txt
    python3 scripts/comparar_module_slugs.py /tmp/slugs.txt

Sale con código 1 si falta alguno. Es un trinquete, igual que los `audit_*.py`.
"""
import itertools
import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent

# Tracks que se aceptan ausentes del `def` sin que eso cuente como defecto.
# `cuantica` es un experimento personal con `test_configs.active = false` y
# destinatario el propio owner (ADR-018): que su plan salga `:general` puede ser
# aceptable. **Es una decisión, no un olvido**, y por eso está acá con su razón
# y no escondida en una condición.
TRACKS_TOLERADOS = {"cuantica"}


def slugs_del_cliente():
    """Los slugs del `def module-slugs`, leídos del código.

    Se leen, no se copian: un espejo escrito de memoria repite la suposición en
    vez de contradecirla (L-59).
    """
    ruta = RAIZ / "src" / "universo" / "topics.cljs"
    texto = ruta.read_text(encoding="utf-8")
    m = re.search(r"\(def\s+module-slugs\s*(.*?)\)\s*\n", texto, re.S)
    if not m:
        return None, ruta
    return set(re.findall(r'"([^"]+)"', m.group(1))), ruta


def main(ruta_slugs):
    base = [l.strip() for l in Path(ruta_slugs).read_text(encoding="utf-8").splitlines() if l.strip()]
    if not base:
        print(f"✗ {ruta_slugs} está vacío. ¿Corrió el psql?")
        return 2

    cliente, ruta_cljs = slugs_del_cliente()
    rel = ruta_cljs.relative_to(RAIZ)
    if cliente is None:
        print(f"✗ no se pudo leer `module-slugs` de {rel}")
        return 2

    faltan = sorted(s for s in base if s not in cliente)
    sobran = sorted(s for s in cliente if s not in base)

    print(f"base: {len(base)} módulos · {rel}: {len(cliente)} slugs")

    # Un slug del `def` que no existe en la base es peor que uno que falta: no
    # es un hueco silencioso, es un mapeo que apunta a la nada.
    for s in sobran:
        print(f"  ✗ SOBRA   {s} — está en el `def` y NO en la base: apunta a un módulo inexistente")

    graves, tolerados = [], []
    for s in faltan:
        (tolerados if s.split("/")[0] in TRACKS_TOLERADOS else graves).append(s)

    for track, grupo in itertools.groupby(graves, key=lambda s: s.split("/")[0]):
        g = list(grupo)
        print(f"  ✗ FALTAN  {track}: {len(g)} — {', '.join(x.split('/')[1] for x in g)}")

    if tolerados:
        por_track = {}
        for s in tolerados:
            por_track.setdefault(s.split("/")[0], []).append(s)
        for track, g in por_track.items():
            print(f"  · tolerado {track}: {len(g)} (fuera del producto, ver TRACKS_TOLERADOS)")

    if graves or sobran:
        print()
        print("Cada slug faltante son déficits `unknown/<topic>` y un plan que no se")
        print("puede personalizar. Arreglo: agregarlo al `def`, comprobar si además")
        print("hace falta una entrada en `explicit-topic->module-slug` (si el topic no")
        print("coincide con el sufijo), correr `npx shadow-cljs release app` y commitear")
        print("public/js/app.js — o el arreglo no llega a producción (ADR-003).")
        return 1

    print("✓ todos los módulos del producto están en el cliente")
    return 0


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(__doc__)
        sys.exit(2)
    sys.exit(main(sys.argv[1]))
