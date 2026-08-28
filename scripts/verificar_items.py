#!/usr/bin/env python3
"""Verifica una tanda de ítems antes de que llegue a `questions`.

El sexto auditor del repo, y el único que mira contenido en vez de estilo. Existe
porque el banco acumuló, sin que nadie lo viera, defectos que ningún ojo humano
detecta leyendo ítem por ítem:

  · la clave correcta en la letra A en **293 de 306** ítems, y ninguna en D
    (R-35). Se descubrió midiendo, después de meses en producción.
  · tres ítems **sin ninguna alternativa correcta** y siete con **dos**.
  · 76 ítems con `\\\\frac` en vez de `\\frac`, que KaTeX no interpreta y el
    estudiante veía en crudo (migración 047).

Los tres son mecánicos. Los tres se detectan en un segundo. Ninguno se detectó.

Uso:
    python3 scripts/verificar_items.py contenido/items/numeros.json
    python3 scripts/verificar_items.py contenido/items/*.json

Sale con código 1 si algo falla. Es un trinquete, igual que los `audit_*.py`.
"""
import json
import re
import sys
import unicodedata
from collections import Counter, defaultdict
from pathlib import Path

SLUG_RE = re.compile(r"^[a-z0-9]+([-/][a-z0-9]+)*$")   # espejo del check de 027
LETRAS = ("A", "B", "C", "D")
THETA_MIN, THETA_MAX = -3.0, 3.0

# Ninguna letra puede llevarse más de esta fracción de las claves. Con cuatro
# alternativas el ideal es 0.25; el techo deja holgura para tandas chicas sin
# permitir que vuelva a pasar lo de R-35 (95 % en la A).
MAX_FRACCION_CLAVE = 0.40
MIN_ITEMS_PARA_MEDIR_CLAVE = 8


class Informe:
    def __init__(self):
        self.errores = []
        self.avisos = []

    def error(self, donde, msg):
        self.errores.append(f"{donde}: {msg}")

    def aviso(self, donde, msg):
        self.avisos.append(f"{donde}: {msg}")


def canonico(texto):
    """Espejo de `universo.topics/normalize` y del trigger de 029."""
    base = unicodedata.normalize("NFD", str(texto).strip().lower())
    return "".join(c for c in base if unicodedata.category(c) != "Mn")


def revisar_latex(texto, donde, campo, inf):
    # `\\frac` es la trampa de la migración 047: se guarda sin error y KaTeX lo
    # muestra en crudo. Un `\\` legítimo (salto de fila en `\begin{cases}`) va
    # seguido de espacio o fin, nunca de letra.
    for m in re.finditer(r"\\\\(?=[A-Za-z%])", texto):
        inf.error(donde, f"{campo}: `\\\\` duplicado antes de letra "
                         f"(…{texto[max(0, m.start()-25):m.start()+12]}…). KaTeX no lo interpreta")
    # `$` de KaTeX sin cerrar: el resto del enunciado se renderiza como fórmula.
    #
    # No cuenta los `$` **escapados**: dentro de una fórmula, `\$` es un signo
    # peso literal, y en un banco de matemática financiera chilena aparece en
    # casi todos los enunciados de precios ($\$20.000$). Contarlos como
    # delimitadores marcaba como rotos 38 ítems correctos.
    #
    # Un `$` es delimitador si viene precedido por un número **par** de
    # backslashes (cero incluido): `\$` es literal, `\\$` es un delimitador
    # después de una barra escapada.
    delimitadores = 0
    for i, ch in enumerate(texto):
        if ch != "$":
            continue
        barras = 0
        j = i - 1
        while j >= 0 and texto[j] == "\\":
            barras += 1
            j -= 1
        if barras % 2 == 0:
            delimitadores += 1
    if delimitadores % 2 != 0:
        inf.error(donde, f"{campo}: número impar de `$` sin escapar — hay una fórmula sin cerrar")
    if "$qm$" in texto:
        inf.error(donde, f"{campo}: contiene `$qm$`, que cerraría la cadena de la migración")


def revisar_item(item, i, slugs_declarados, inf):
    donde = f"ítem {i}"
    for campo in ("module_slug", "question", "correct"):
        if not str(item.get(campo, "")).strip():
            inf.error(donde, f"falta `{campo}`")
            return

    donde = f"ítem {i} ({item['module_slug']})"

    correcta = item["correct"]
    if correcta not in LETRAS:
        inf.error(donde, f"`correct` es {correcta!r}, debe ser A, B, C o D")
        return

    opciones = item.get("options") or {}
    errores = item.get("errors") or {}
    mis = item.get("misconceptions") or {}

    for L in LETRAS:
        if not str(opciones.get(L, "")).strip():
            inf.error(donde, f"la alternativa {L} está vacía")
        # Las cuatro explicaciones se escriben SIEMPRE: `score_answer` (024)
        # devuelve la de la alternativa elegida, y la de la correcta es el
        # «Bonus» que ve quien acierta (ADR-033).
        if not str(errores.get(L, "")).strip():
            inf.error(donde, f"falta la explicación `errors.{L}` "
                             f"({'es el Bonus de la correcta' if L == correcta else 'distractor sin explicar'})")

    textos = [str(opciones.get(L, "")).strip().lower() for L in LETRAS]
    repetidas = [t for t, n in Counter(t for t in textos if t).items() if n > 1]
    if repetidas:
        inf.error(donde, f"hay alternativas repetidas: {repetidas[0][:60]!r}")

    # La correcta no puede llevar idea errónea: no hay error que catalogar, y el
    # panel de misconceptions contaría un uso que no existe.
    if mis.get(correcta) is not None:
        inf.error(donde, f"la alternativa correcta ({correcta}) tiene misconception "
                         f"{mis[correcta]!r}; debe ser null")

    for L in LETRAS:
        slug = mis.get(L)
        if slug is None:
            continue
        if not SLUG_RE.match(str(slug)):
            inf.error(donde, f"misconception {L}: slug {slug!r} no cumple "
                             f"^[a-z0-9]+([-/][a-z0-9]+)*$ (check de 027)")
        elif slug not in slugs_declarados:
            inf.error(donde, f"misconception {L}: slug {slug!r} no está declarado "
                             f"en `misconceptions` ni marcado como preexistente. "
                             f"El `left join` lo dejaría en null en silencio")

    d = item.get("difficulty")
    if not isinstance(d, (int, float)):
        inf.error(donde, "`difficulty` falta o no es numérica")
    elif not (THETA_MIN <= d <= THETA_MAX):
        inf.error(donde, f"`difficulty` = {d} fuera de [{THETA_MIN}, {THETA_MAX}]")

    for campo in ("question",) + tuple(f"options.{L}" for L in LETRAS) + tuple(f"errors.{L}" for L in LETRAS):
        if "." in campo:
            grupo, L = campo.split(".")
            texto = str((item.get(grupo) or {}).get(L, ""))
        else:
            texto = str(item.get(campo, ""))
        if texto:
            revisar_latex(texto, donde, campo, inf)


def revisar_tanda(datos, inf):
    topic = str(datos.get("topic", "")).strip()
    if not topic:
        inf.error("tanda", "falta `topic`")
    elif topic != canonico(topic):
        inf.error("tanda", f"`topic` = {topic!r} no está en forma canónica "
                           f"(sería {canonico(topic)!r}). El trigger de 029 lo cambiaría "
                           f"y el archivo dejaría de decir la verdad")

    # Catálogo declarado en esta misma tanda + los que ya existen en la base.
    declaradas = datos.get("misconceptions") or []
    slugs = set()
    for m in declaradas:
        slug = str(m.get("slug", ""))
        if not SLUG_RE.match(slug):
            inf.error("misconceptions", f"slug {slug!r} no cumple el formato de 027")
        if slug in slugs:
            inf.error("misconceptions", f"slug {slug!r} declarado dos veces")
        if not str(m.get("name", "")).strip():
            inf.error("misconceptions", f"{slug!r} no tiene `name`, que es not null en 027")
        if not str(m.get("description", "")).strip():
            inf.aviso("misconceptions", f"{slug!r} sin `description`: es el criterio editorial "
                                        f"que evita que el catálogo se llene de duplicados")
        slugs.add(slug)
    slugs |= set(datos.get("misconceptions_preexistentes") or [])

    items = datos.get("items") or []
    if not items:
        inf.error("tanda", "no hay ítems")
        return

    for i, item in enumerate(items, start=1):
        revisar_item(item, i, slugs, inf)

    # ── Ideas erróneas declaradas que ningún ítem usa ───────────────────────
    # 027 dice que el catálogo no debe llenarse de entradas que nadie ocupa: es
    # así como termina con duplicados de nombres distintos. Una entrada huérfana
    # casi siempre significa que el ítem que iba a usarla cambió y quedó el
    # residuo, que es exactamente lo que pasó al escribir la primera tanda.
    usadas = {s for it in items for L in LETRAS
              if (s := (it.get("misconceptions") or {}).get(L))}
    for m in declaradas:
        if m.get("slug") and m["slug"] not in usadas:
            inf.error("misconceptions", f"{m['slug']!r} se declara y ningún ítem la usa. "
                                        f"O falta el distractor que la expone, o sobra la entrada")

    # ── R-35: la clave no puede vivir en una sola letra ──────────────────────
    claves = Counter(it.get("correct") for it in items if it.get("correct") in LETRAS)
    n = sum(claves.values())
    if n >= MIN_ITEMS_PARA_MEDIR_CLAVE:
        for L in LETRAS:
            frac = claves.get(L, 0) / n
            if frac > MAX_FRACCION_CLAVE:
                inf.error("claves", f"la letra {L} concentra {claves[L]}/{n} ({frac:.0%}) de las "
                                    f"claves, sobre el techo de {MAX_FRACCION_CLAVE:.0%} (R-35)")
            if claves.get(L, 0) == 0:
                inf.error("claves", f"ninguna clave en la letra {L}. El banco viejo no tenía "
                                    f"ninguna en D y eso es media fórmula para adivinarlo")

    # ── Enunciados repetidos ────────────────────────────────────────────────
    # La migración es idempotente por (topic, question): dos ítems con el mismo
    # enunciado harían que el segundo nunca entre, sin avisar.
    vistos = defaultdict(list)
    for i, it in enumerate(items, start=1):
        vistos[str(it.get("question", "")).strip().lower()].append(i)
    for texto, idxs in vistos.items():
        if len(idxs) > 1 and texto:
            inf.error("enunciados", f"ítems {idxs} comparten enunciado. La migración es "
                                    f"idempotente por (topic, question): solo entraría uno")

    # ── order_index único por módulo ────────────────────────────────────────
    por_modulo = defaultdict(list)
    for i, it in enumerate(items, start=1):
        por_modulo[it.get("module_slug")].append((it.get("order_index"), i))
    for modulo, pares in por_modulo.items():
        idxs = [o for o, _ in pares if o is not None]
        dup = [o for o, c in Counter(idxs).items() if c > 1]
        if dup:
            inf.aviso("order_index", f"{modulo}: repetido {dup}")

    # ── Cobertura de dificultad ─────────────────────────────────────────────
    # El defecto que dejó a un diagnóstico agotándose en 8 preguntas: `enteros`
    # tenía 10 ítems y ninguno cerca de donde llegó el estudiante.
    objetivo = datos.get("cobertura_objetivo")
    ds = [it["difficulty"] for it in items if isinstance(it.get("difficulty"), (int, float))]
    if objetivo and ds:
        lo, hi = objetivo.get("min", -3.0), objetivo.get("max", 3.0)
        minimo = objetivo.get("min_por_tramo", 6)
        tramo = objetivo.get("ancho_tramo", 1.0)
        b = lo
        while b < hi - 1e-9:
            cuantos = sum(1 for d in ds if b <= d < b + tramo)
            if cuantos < minimo:
                inf.error("cobertura", f"el tramo [{b:.1f}, {b + tramo:.1f}) tiene {cuantos} ítems "
                                       f"y el objetivo es {minimo}. Un hueco acá es un test que se "
                                       f"agota cuando el estudiante llega ahí")
            b += tramo

    return items, claves


def main(rutas):
    total_items = 0
    fallo = False
    for ruta in rutas:
        p = Path(ruta)
        inf = Informe()
        try:
            datos = json.loads(p.read_text(encoding="utf-8"))
        except Exception as e:            # noqa: BLE001 — cualquier fallo de lectura es un fallo
            print(f"✗ {p}: no se pudo leer ({e})")
            fallo = True
            continue

        resultado = revisar_tanda(datos, inf)
        items = resultado[0] if resultado else []
        total_items += len(items)

        print(f"\n── {p} · topic {datos.get('topic', '?')} · {len(items)} ítems")
        if items:
            ds = sorted(it["difficulty"] for it in items
                        if isinstance(it.get("difficulty"), (int, float)))
            if ds:
                print(f"   dificultad: mín {ds[0]:.1f} · mediana {ds[len(ds)//2]:.1f} · máx {ds[-1]:.1f}")
                hist = Counter(int(d // 1) for d in ds)
                barras = "  ".join(f"[{b},{b+1}) {hist.get(b, 0)}" for b in range(-3, 3))
                print(f"   reparto:    {barras}")
            claves = Counter(it.get("correct") for it in items)
            print(f"   claves:     " + " · ".join(f"{L} {claves.get(L, 0)}" for L in LETRAS))

        for a in inf.avisos:
            print(f"   ⚠ {a}")
        for e in inf.errores:
            print(f"   ✗ {e}")
        if inf.errores:
            fallo = True
        else:
            print("   ✓ sin errores")

    print()
    if fallo:
        print("✗ Hay ítems que no pueden entrar al banco. Corrige y vuelve a correr.")
        return 1
    print(f"✓ {total_items} ítems listos para generar la migración.")
    return 0


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(2)
    sys.exit(main(sys.argv[1:]))
