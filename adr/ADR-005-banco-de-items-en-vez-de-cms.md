# ADR-005: El contenido pedagógico vive en el banco de ítems (capa 0), no en un CMS

## Estado

Aprobada

## Fecha

2026-07-24 (documentada retroactivamente el 2026-07-26)

## Contexto

> **Contexto reconstruido** desde `supabase/CONTENT.md`, cuyo primer principio enuncia esta decisión
> explícitamente: *"El valor está en el banco de ítems, no en un CMS pesado"*, y desde las migraciones
> `002` y `004`.

Una plataforma de preparación necesita contenido. La ruta habitual es construir (o integrar) un
gestor de contenidos: lecciones, videos, ejercicios, rutas de aprendizaje, editor enriquecido,
versionado, media. Eso es un producto completo por sí mismo.

Restricciones:

- **Un solo autor** (el profesor), que además es el único desarrollador. Cada hora dedicada a
  construir un CMS es una hora que no se dedica a escribir contenido — y viceversa.
- El diferencial declarado del producto **no es** tener material, es **decir al estudiante qué error
  concreto está cometiendo**. Ese diferencial no requiere un CMS: requiere buenos ítems.
- Ya existe una tabla `questions` con columnas `error_a`…`error_d` pensadas para explicar cada
  distractor.
- Sin presupuesto para storage de video ni para licenciar contenido.

## Decisión

El contenido pedagógico se organiza en **dos capas, con prioridad explícita**:

**Capa 0 — el banco de ítems (prioritaria).**
`questions.error_a` … `error_d`: por cada alternativa incorrecta, la **idea errónea nombrable** que
llevó a elegirla, más su explicación. Aparece en el feedback inmediato del diagnóstico y como primera
sección de "Mi plan".

Regla editorial (de `supabase/CONTENT.md`):
- cada distractor tiene un *misconception* nombrable, no un "incorrecto" genérico;
- la explicación cabe en 1–2 frases, con KaTeX si hace falta;
- `module_id` apunta al módulo correcto.

**Capa 1 — recursos por módulo (complementaria).**
Tabla `resources` ligada a `modules.slug`, con tipos `text`, `video_url`, `audio_url`, `exercise` y
bandera `published`. Los videos y audios son **URLs externas** (YouTube, Vimeo, Storage): no se suben
binarios hasta que sea necesario.

**No se construye un CMS.** La autoría se hace con el CRUD del panel de administración
(Admin → Preguntas / Recursos) y, cuando conviene, directamente con SQL o el Table Editor de Supabase.
Los módulos (`modules`) se siembran por migración (`002`) y se enriquecen por migración (`004`),
incluyendo un `historical_blurb` de contexto histórico por módulo.

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| CMS propio (editor enriquecido, versionado, media, rutas) | Es un producto completo. Consumiría el tiempo que debe ir a escribir contenido, y no aporta al diferencial (explicar el error concreto) |
| CMS externo (Strapi, Sanity, Contentful) | Añade un proveedor, un modelo de datos paralelo al de Postgres y un punto de sincronización. Contradice ADR-002 (un solo backend) |
| Markdown en el repositorio para las lecciones | Atractivo (versionado, diffs), pero obliga al profesor a pasar por Git para publicar contenido y exige un pipeline de render. El panel admin es más directo para quien no quiere abrir una terminal |
| Contenido de terceros licenciado | Costo, y no viene mapeado a misconceptions por distractor, que es justamente lo que el producto necesita |
| Solo capa 1 (material clásico, sin explicaciones por distractor) | Sería un preuniversitario más: pierde por completo el diferencial |
| Solo capa 0 (sin recursos) | Es el estado actual de hecho, y demuestra el problema: el estudiante entiende su error pero no tiene con qué trabajarlo (R-10) |

## Consecuencias

**Positivas**

- **El esfuerzo de autoría se concentra donde está el valor.** Escribir cuatro explicaciones de error
  para un ítem cuesta minutos y produce feedback accionable inmediato.
- La capa 0 es **reutilizable en dos lugares** sin trabajo extra: el feedback durante el test y el plan
  posterior.
- El contenido queda **estructurado y consultable**: los déficits se agregan por módulo porque los
  ítems apuntan a módulos (`module_id`), lo que permite priorizar qué escribir según los errores
  reales.
- **Nada nuevo que operar:** el contenido son filas de Postgres con RLS, administradas desde el panel
  que ya existe.
- `historical_blurb` aporta un tono distintivo (de dónde viene cada concepto) a costo casi nulo.
- Los recursos por URL externa evitan cualquier costo de storage y de transcodificación.

**Negativas / costos aceptados**

- **El producto depende de un cuello de botella humano no delegable:** escribir buenos `error_*` exige
  criterio pedagógico. Es hoy el bloqueo del go-live (T-01, T-27, R-10).
- **Sin editor enriquecido:** el contenido se escribe como texto plano con KaTeX en campos de
  formulario. Aceptable para 1–2 frases, incómodo para material largo.
- **Sin versionado de contenido:** un `error_*` sobrescrito se pierde (a diferencia del código, que
  está en Git). No hay historial ni "deshacer".
- **Sin previsualización** de cómo se verá la explicación renderizada con KaTeX antes de guardar.
- **Dependencia de terceros para media:** un video de YouTube borrado deja un recurso roto y nadie se
  enterará (no hay verificación de enlaces).
- **La calidad es heterogénea por diseño:** unos ítems tendrán explicaciones excelentes y otros
  quedarán con los cuatro campos vacíos, sin que el sistema lo señale.
- **Un módulo sin recursos publicados produce una sección vacía** en "Mi plan", sin error visible
  (L-18, R-10).

## Riesgos

| Riesgo | Mitigación | Ref. |
|--------|-----------|------|
| "Mi plan" vacío por falta de contenido publicado | T-01 (contenido mínimo) y T-24 (estado vacío honesto que al menos entregue capa 0) | R-10 |
| Ítems sin `error_*` completos | Checklist editorial en `supabase/CONTENT.md`; T-27 priorizando los topics más fallados | — |
| Pérdida de contenido por sobrescritura sin versionado | T-07 (respaldo de base de datos probado) es la única red disponible hoy | R-03 |
| Recursos con URLs rotas | Sin mitigación hoy; considerar una verificación periódica de enlaces si el volumen crece | — |
| Déficits en módulos `unknown/*` que no tienen recursos posibles | T-28 (completar el mapeo `topic → module-slug`) | L-18 |

## Seguimiento

Reconsiderar (con un ADR nuevo) si:

- El volumen de contenido crece hasta que el CRUD del panel sea insuficiente (por ejemplo, cientos de
  recursos con material extenso).
- Aparece más de un autor y se necesita revisión, versionado o flujo de aprobación.
- Se decide producir material propio extenso (guías, series de video), donde un CMS sí aportaría.

**Métrica que indicaría el momento:** si el tiempo dedicado a *administrar* contenido supera al
dedicado a *escribirlo*, la herramienta se volvió el problema.

**Revisión inmediata pendiente:** definir qué es un "módulo prioritario" con datos y no por intuición
(Q-10), para que el esfuerzo de autoría se dirija a los déficits reales.

---

Relacionado: `../supabase/CONTENT.md` · [[../project-memory/TERMINOLOGY]] §Capa 0 / Capa 1 ·
[[../project-memory/RISKS]] R-10 · [[../project-memory/BACKLOG]] E5 · [[ADR-004-irt-1pl-map-y-regla-de-parada]]
