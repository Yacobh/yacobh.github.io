#!/usr/bin/env python3
"""Renderiza la migración SQL de una tanda de ítems ya verificada.

Por qué existe, en vez de escribir el SQL a mano como hicieron 035–038: el
dollar-quoting, el orden de las columnas y la idempotencia son mecánicos, y
equivocarse en ellos produce fallos silenciosos (un ítem que no entra, un LaTeX
roto, un `misconception_id` en null porque el slug tenía una mayúscula). Lo que
sí es trabajo humano —el enunciado, los distractores, la idea errónea detrás de
cada uno— queda en el JSON, donde se revisa y se diffea.

Uso:
    python3 scripts/verificar_items.py contenido/items/numeros.json   # primero
    python3 scripts/generar_migracion_items.py contenido/items/numeros.json

Escribe `supabase/migrations/<numero>_<slug>.sql` con los campos `migracion_*`
del JSON. **No aplica nada**: las migraciones de este repo se aplican a mano.
"""
import json
import sys
from pathlib import Path

# Delimitador de dollar-quoting. Dentro va texto literal —backslashes de LaTeX y
# comillas incluidos— y el `$` de KaTeX no interfiere porque el cierre exige la
# secuencia exacta. Es la convención de 035, adoptada tras el desastre de `E'...'`.
DQ = "$it$"
LETRAS = ("A", "B", "C", "D")


def q(texto):
    """Cadena SQL con dollar-quoting."""
    if texto is None:
        return "null"
    t = str(texto)
    if DQ in t:
        raise SystemExit(f"ERROR: un texto contiene {DQ}, que cerraría la cadena:\n  {t[:120]}")
    return f"{DQ}{t}{DQ}"


def render(datos):
    topic = datos["topic"]
    items = datos["items"]
    declaradas = datos.get("misconceptions") or []
    titulo = datos.get("migracion_titulo", f"Banco de ítems · {topic}")
    notas = datos.get("migracion_notas", "").rstrip()

    L = []
    a = L.append

    a(f"-- {titulo}")
    a(f"-- {len(items)} ítems · topic `{topic}`"
      + (f" · {len(declaradas)} ideas erróneas nuevas" if declaradas else ""))
    a("--")
    a("-- GENERADA por scripts/generar_migracion_items.py desde el JSON de la tanda.")
    a("-- No editar a mano: corregir el JSON, volver a verificar y regenerar. Un cambio")
    a("-- hecho acá se pierde en la siguiente regeneración y deja de estar verificado.")
    a("--")
    a("-- Verificada con scripts/verificar_items.py, que comprueba lo que este banco")
    a("-- aprendió a golpes: clave repartida entre las cuatro letras (R-35), una sola")
    a("-- alternativa correcta, las cuatro explicaciones escritas, la correcta sin idea")
    a("-- errónea, LaTeX con escape simple (047) y cobertura de dificultad sin huecos.")
    if notas:
        a("--")
        for linea in notas.split("\n"):
            a(f"-- {linea}".rstrip())
    a("")

    # ── 1. Catálogo de ideas erróneas ───────────────────────────────────────
    if declaradas:
        a("-- " + "-" * 77)
        a("-- 1. Ideas erróneas nuevas")
        a("-- " + "-" * 77)
        a("-- Van ANTES de los ítems y en el mismo archivo: el `left join` de abajo")
        a("-- resuelve por slug, así que si no existen todavía los ítems entrarían con")
        a("-- `misconception_*_id` en null y en silencio.")
        a("--")
        a("-- `on conflict (slug) do nothing`: si una ya está catalogada, se respeta la")
        a("-- que hay. Reaplicar contenido no pisa una corrección hecha en el panel.")
        a("")
        a("insert into public.misconceptions (slug, name, description, module_id)")
        a("select v.slug, v.name, v.description, m.id")
        a("  from (values")
        filas = []
        for i, mc in enumerate(declaradas):
            coma = "," if i < len(declaradas) - 1 else ""
            filas.append(f"    ({q(mc['slug'])}, {q(mc['name'])}, {q(mc.get('description'))}, "
                         f"{q(mc.get('module_slug'))}){coma}")
        L.extend(filas)
        a("  ) as v(slug, name, description, module_slug)")
        a("  left join public.modules m on m.slug = v.module_slug")
        a("on conflict (slug) do nothing;")
        a("")

    # ── 2. Ítems ────────────────────────────────────────────────────────────
    a("-- " + "-" * 77)
    a(f"-- {'2' if declaradas else '1'}. Ítems")
    a("-- " + "-" * 77)
    a("")
    a("with items (topic, module_slug, difficulty, order_index,")
    a("            question, option_a, option_b, option_c, option_d, correct_option,")
    a("            error_a, error_b, error_c, error_d,")
    a("            mis_a, mis_b, mis_c, mis_d) as (")
    a("  values")
    a("")

    modulo_actual = None
    for i, it in enumerate(items):
        if it["module_slug"] != modulo_actual:
            modulo_actual = it["module_slug"]
            if i:
                a("")
            a(f"  -- {'=' * 75}")
            a(f"  -- {modulo_actual}")
            a(f"  -- {'=' * 75}")
        op, er, mi = it["options"], it["errors"], it.get("misconceptions") or {}
        # El primer tuple lleva los casts: PostgreSQL infiere el tipo de toda la
        # columna del primero, y sin ellos `values` con un null arriba falla.
        cast = "::text" if i == 0 else ""
        castd = "::double precision" if i == 0 else ""
        casti = "::int" if i == 0 else ""
        a(f"  ({q(topic)}{cast}, {q(it['module_slug'])}{cast},")
        a(f"   ({it['difficulty']}){castd}, {it.get('order_index', (i + 1) * 10)}{casti},")
        a(f"   {q(it['question'])}{cast},")
        for letra in LETRAS:
            a(f"   {q(op[letra])}{cast},")
        a(f"   {q(it['correct'])}{cast},")
        for letra in LETRAS:
            a(f"   {q(er[letra])}{cast},")
        mis_txt = ", ".join(f"{q(mi.get(letra))}{cast}" for letra in LETRAS)
        coma = "," if i < len(items) - 1 else ""
        a(f"   {mis_txt}){coma}")

    a("")
    a(")")
    a("insert into public.questions")
    a("  (topic, module_id, difficulty, order_index,")
    a("   question, option_a, option_b, option_c, option_d, correct_option,")
    a("   error_a, error_b, error_c, error_d,")
    a("   misconception_a_id, misconception_b_id, misconception_c_id, misconception_d_id)")
    a("select i.topic, m.id, i.difficulty, i.order_index,")
    a("       i.question, i.option_a, i.option_b, i.option_c, i.option_d, i.correct_option,")
    a("       i.error_a, i.error_b, i.error_c, i.error_d,")
    a("       xa.id, xb.id, xc.id, xd.id")
    a("from items i")
    a("left join public.modules m        on m.slug  = i.module_slug")
    a("left join public.misconceptions xa on xa.slug = i.mis_a")
    a("left join public.misconceptions xb on xb.slug = i.mis_b")
    a("left join public.misconceptions xc on xc.slug = i.mis_c")
    a("left join public.misconceptions xd on xd.slug = i.mis_d")
    a("-- Idempotente por (topic, question). Reaplicar NO actualiza un ítem ya")
    a("-- cargado: para corregirlo, editarlo en Admin → Preguntas o borrarlo primero.")
    a("where not exists (")
    a("  select 1 from public.questions q")
    a("   where q.topic = i.topic and q.question = i.question")
    a(");")
    a("")

    # ── Verificación ────────────────────────────────────────────────────────
    a("-- " + "-" * 77)
    a("-- Verificación (correr después de aplicar)")
    a("-- " + "-" * 77)
    a(f"--   select count(*) from public.questions where topic = '{topic}';")
    a(f"--   -- esperado: {len(items)} (más lo que ya hubiera)")
    a("--")
    a("--   -- Ningún ítem sin módulo: delataría un module_slug mal escrito.")
    a(f"--   select id from public.questions where topic = '{topic}' and module_id is null;")
    a("--   -- 0 filas")
    a("--")
    a("--   -- Ningún distractor perdió su idea errónea en el join.")
    a("--   select id, question from public.questions q")
    a(f"--    where topic = '{topic}'")
    a("--      and misconception_a_id is null and misconception_b_id is null")
    a("--      and misconception_c_id is null and misconception_d_id is null;")
    a("--   -- revisar: un ítem sin ninguna catalogada puede ser legítimo, varios no")
    a("--")
    a("--   -- La clave repartida (R-35): ninguna letra debe pasar del 40 %.")
    a("--   select correct_option, count(*) from public.questions")
    a(f"--    where topic = '{topic}' group by 1 order by 1;")
    a("--")
    a(f"-- Reversión: delete from public.questions where topic = '{topic}';")
    if declaradas:
        slugs = ", ".join(f"'{m['slug']}'" for m in declaradas[:3])
        a(f"--            delete from public.misconceptions where slug in ({slugs}, …);")
    a("")
    return "\n".join(L)


def main(ruta):
    datos = json.loads(Path(ruta).read_text(encoding="utf-8"))
    destino = Path("supabase/migrations") / datos["migracion_archivo"]
    if destino.exists():
        print(f"⚠ {destino} ya existe y se va a sobrescribir.")
    destino.write_text(render(datos), encoding="utf-8")
    print(f"✓ {destino}  ({len(datos['items'])} ítems, "
          f"{len(datos.get('misconceptions') or [])} ideas erróneas nuevas)")
    print("\nSiguiente paso: revisarla, aplicarla a mano en el SQL Editor y anotarla")
    print("en supabase/SCHEMA.md con la fecha de aplicación.")
    return 0


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(__doc__)
        sys.exit(2)
    sys.exit(main(sys.argv[1]))
