# SESSION-017

## Fecha

2026-08-10

## Participantes

- Humano: Jacobo Córdova (encargó la misión antes de irse a trabajar; no estuvo durante la ejecución)
- Agente / modelo: Claude Code CLI (Opus 5)

## Objetivo de la sesión

Ejecutar el **paso 1 de T-57**: la migración aditiva que crea el catálogo de misconceptions y el
vínculo desde cada distractor. Elegido por el owner entre cuatro opciones propuestas.

## Contexto de entrada

- Rama: `main` @ `3d86d5d`, árbol limpio.
- `clj -M:test` de partida: **46 tests / 186 assertions / 0 failures**.
- Estado del proyecto: F8 (go-live) cerrada el día anterior; primer cupo real publicado para el
  sábado 2026-08-15.

## Actividades realizadas

1. **Verificación previa al encargo (relevante, no se actuó sobre ella):** se comprobó que las dos
   afirmaciones falsas del FAQ (X-01 tiempo de respuesta, X-02 "cómo se movió tu nivel") **siguen
   publicadas en los tres lugares** (`index.html`, `public/index.html`, `landing.cljs`). Se le
   presentó al owner como misión recomendada, dado que el sitio empieza a recibir tráfico esta
   semana; **el owner eligió T-57 en su lugar**. La corrección sigue disponible y es de ~15 min.
2. **`supabase/migrations/027_misconceptions.sql`** — tabla `misconceptions` (`slug` único con check
   de formato, `name`, `description`, `module_id` opcional nullable, `created_at`), índice por
   `module_id`, RLS habilitado con las **cuatro** policies de admin en la misma migración
   ([[../CLAUDE]] §7.1), y las columnas `questions.misconception_a_id`…`_d_id` (uuid nullable,
   `on delete set null`).
3. **Validación del check del slug** contra 13 casos con `grep -E`: acepta
   `fracciones/invierte-divisor`, `mi-modulo/mi-error`, `enteros`, `signos/resta-de-negativos`;
   rechaza mayúsculas, acentos, guion bajo, espacios, separador al inicio/final y separadores
   duplicados. **Se corrigió el patrón propuesto en el ticket** (`^[a-z0-9]+(/[a-z0-9]+)*(-[a-z0-9]+)*$`),
   que obligaba a que todos los `/` fueran antes que todos los `-` y por lo tanto **rechazaba
   `mi-modulo/mi-error`**. El patrón final es `^[a-z0-9]+([-/][a-z0-9]+)*$`.
4. Documentación en `supabase/SCHEMA.md` (sección propia + entrada en la lista de orden de
   aplicación) y actualización de T-57 en el backlog.

**Hallazgo colateral — ✅ resuelto el mismo día:** se observó que `022_test_config_display_name.sql`
no tenía marca de aplicada en `SCHEMA.md` mientras `023`–`026` sí. Se registró como sospecha, sin
asumirla. **El owner verificó y la columna existe**: `022` estaba aplicada desde el 2026-08-08 y lo
que faltaba era la marca en la documentación. **Cierra T-42**, cuyo único pendiente era esa
migración. Corregido en `SCHEMA.md`, `BACKLOG.md` y `CURRENT_STATUS.md`.

Vale la pena registrar el costo: durante dos días la memoria del proyecto hizo creer que había un
fallo (`"Nombre visible" no guarda`) que nunca existió, y esa afirmación llegó a escribirse en dos
archivos. La marca de "aplicada" en `SCHEMA.md` no es cosmética — es el único registro de qué hay
realmente en la base.

## Archivos revisados

- `supabase/migrations/020_test_configs.sql` (estilo de la casa para crear tabla con RLS),
  `001_mvp_schema.sql` (tipo de `modules.id`), `supabase/SCHEMA.md`
- `index.html`, `public/index.html`, `src/universo/components/landing.cljs` (verificación del FAQ)

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `supabase/migrations/027_misconceptions.sql` | **Nuevo** — catálogo + vínculo, aditivo |
| `supabase/SCHEMA.md` | Sección del catálogo, entrada en la lista de orden, aviso de migraciones pendientes |
| `project-memory/BACKLOG.md` | T-57 → `en curso`, paso 1 marcado hecho con el detalle |

**No se tocó ningún `.cljs`**, así que `public/js/app.js` no cambia y no hizo falta recompilar.

## Comandos ejecutados y resultados

```
clj -M:test  → 46 tests / 186 assertions / 0 failures (sin cambios, no había código que tocar)
grep -E (validación del regex del slug) → 13/13 casos como se esperaba
```

No se corrió `shadow-cljs release app` ni `build:css`: no hubo cambios de código ni de clases.

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| RLS **solo admin** en las cuatro operaciones del catálogo | No (aplica el criterio de ADR-015/R-16) | Cabecera de `027`, `SCHEMA.md` |
| **Sin seed automático** desde los `error_*` existentes | No | Cabecera de `027` — sembrar uno por cada texto distinto reproduciría el problema que la tabla resuelve |
| `on delete set null` en las 4 FK | No | Cabecera de `027` — borrar una misconception mal planteada no debe quedar bloqueado por los ítems que la referencian |
| Sin `updated_at` | No | No hay trigger que lo mantenga; una columna que miente es peor que no tenerla |

El **ADR de T-57 sigue pendiente**: esta migración implementa el paso reversible y sin
consecuencias. La decisión de modelo se formaliza cuando se catalogue el primer módulo (paso 2).

## Riesgos identificados

Ninguno nuevo. La migración es aditiva y no altera comportamiento existente.

## Bloqueos

Ninguno técnico. **Depende del owner:** aplicar `027` en el SQL Editor (el agente no aplica
migraciones, [[../CLAUDE]] §9).

## Preguntas abiertas nuevas

Ninguna formal. Queda por confirmar si `022` está o no aplicada (ver hallazgo colateral).

## Supuestos aplicados

Ninguno. Lo no verificable con el acceso disponible se marcó como tal.

## Próximos pasos

1. **Aplicar `027`** en el SQL Editor de Supabase. (`022` ya estaba aplicada — verificado.)
2. **Paso 2 de T-57:** medir en `tests` cuál es el módulo más fallado — requiere una consulta del
   owner contra el proyecto real — y catalogar solo ese módulo bajo ADR-016.
3. Sin relación con T-57, y sigue siendo lo que más importa: **difundir el cupo del 2026-08-15**
   (R-19 dominante) y **revisar ese cupo el viernes 14** por R-11.

## Pendientes

- `027` sin aplicar.
- La corrección del FAQ (X-01/X-02) sigue pendiente y el sitio ya recibe tráfico.

## Actualizaciones requeridas en Project Memory

- [x] `project-memory/BACKLOG.md`
- [x] `project-memory/CURRENT_STATUS.md`
- [x] `supabase/SCHEMA.md`
- [ ] `project-memory/RISKS.md` — no aplica, sin riesgo nuevo
- [ ] `project-memory/DECISIONS.md` / `adr/` — no aplica todavía; el ADR de T-57 va con el paso 2
- [ ] `project-memory/ARCHITECTURE.md` — no aplica hasta que la tabla se use
- [ ] `project-memory/graph/` — no aplica, sin cambios en `src/`

## Notas

La migración se escribió con una cabecera larga a propósito: explica por qué el texto de `error_*`
**no** se reemplaza, por qué relacional y no JSONB, y por qué 4 columnas y no una tabla normalizada.
Quien la lea dentro de seis meses va a encontrar ahí las tres decisiones sin tener que reconstruir la
conversación que las produjo.

---

Relacionado: [[../project-memory/BACKLOG]] T-57, T-54 · `../supabase/SCHEMA.md` ·
[[../adr/ADR-015-item-sin-respuesta-en-el-cliente]] · `SESSION-016.md`
