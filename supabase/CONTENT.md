# Contenido pedagógico (capa 0 + Baldor)

## Principio

El valor está en el **banco de ítems**, no en un CMS pesado.

1. **Capa 0:** `questions.error_a`–`error_d` (idea errónea → explicación). Aparece en Mi plan tras el diagnóstico.
2. **Capa 1:** `resources` por `modules.slug` (texto Baldor, video_url, exercise).

## Cómo mejorar `error_*` (prioridad)

En Supabase Table Editor o SQL, para cada pregunta del topic más fallado:

```sql
update public.questions
set
  error_a = 'Explicación de por qué A es incorrecta (idea errónea concreta).',
  error_b = '...',
  error_c = '...',
  error_d = '...'
where id = '<uuid>';
```

Checklist por ítem:

- [ ] Cada distractor tiene un *misconception* nombrable (no solo “incorrecto”).
- [ ] La explicación cabe en 1–2 frases + KaTeX si hace falta.
- [ ] `module_id` apunta al módulo Baldor correcto.

Módulos a priorizar (según déficits reales de tus tests):

- `aritmetica/enteros`, `aritmetica/fracciones`, `aritmetica/potencias`
- `algebra/ecuaciones`, `algebra/expresiones`
- `geometria/basica`, `geometria/pitagoras`

## Recursos (Admin → Recursos)

- Publica `text` / `exercise` primero.
- `video_url` / `audio_url`: pega URL (YouTube/Vimeo/Storage); no subas binarios hasta necesitarlo.
- Usa `historical_context` del módulo (blurbs en `002` / `004`).

## Migraciones de contenido

| Archivo | Qué hace |
|---------|----------|
| `002_seed_modules.sql` | Módulos + lecturas breves |
| `004_enrich_baldor_resources.sql` | Blurbs enriquecidos + práctica guiada |
| `018_baldor_resources.sql` | 20 recursos originales (track `aritmetica`), numeración Baldor como índice bibliográfico, no transcripción -- `published = false`, requieren revisión |
| `019_baldor_algebra_resources.sql` | 19 recursos originales (track `algebra`) + cierre del hueco de enteros con signo en `aritmetica/enteros` -- mismo criterio que `018`, `published = false` |
| `033`–`040` | **Experimento, no producto**: track `cuantica` (15 módulos, 77 misconceptions, 123 ítems, 32 recursos). Ver [[SCHEMA]] §Track experimental y [[../adr/ADR-018-track-experimental-cuantica]] |

## Nota sobre el track `cuantica`

Todo lo que dice este archivo aplica al contenido **PAES**. El track `cuantica` (`033`–`040`) es un
experimento de estudio personal del autor, oculto a los estudiantes por `test_configs.active = false`,
y no debe mezclarse con las prioridades de arriba. Si estás mejorando `error_*` para el producto,
filtra siempre con `where topic not like 'mq\_%'`.

Dos cosas de ese experimento sí sirven como precedente para el contenido PAES:

- **El patrón de carga en volumen** (dollar-quoting `$qm$...$qm$` para LaTeX, CTE con `values` +
  `left join` por slug, idempotencia por `where not exists`). Ver la cabecera de
  `035_cuantica_questions_fundamentos.sql`, que lo explica entero.
- **Cómo se ve una capa 0 completa**: 123 ítems con las 4 explicaciones escritas y la misconception
  del catálogo enlazada en cada distractor. Es el estado al que apunta T-27/T-56 para PAES.
