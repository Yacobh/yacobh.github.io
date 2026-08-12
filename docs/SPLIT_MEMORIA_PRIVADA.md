# Sacar la memoria del repositorio público

Procedimiento preparado el 2026-08-12. **No ejecutado**: los dos pasos que tocan
GitHub son tuyos, y hay una decisión de alcance que conviene tomar antes.

---

## Lo primero, porque cambia la expectativa

**Mover los archivos hoy no los despublica.** El repositorio es público desde el
principio y **51 de los 169 commits tocan `project-memory/`**. Todo eso sigue
siendo accesible en el historial, en los forks que existan y en cualquier caché
de terceros, aunque el archivo desaparezca de `main`.

Para que realmente deje de estar disponible habría que **reescribir el historial**
(`git filter-repo`) y forzar el push. Eso reescribe 51+ commits, invalida
cualquier clon existente y rompe los enlaces permanentes a commits. Es factible,
pero es una operación seria y aparte.

Conclusión honesta: **lo que este procedimiento protege es de acá en adelante.**
Si el objetivo es que nadie vea el pasado, la conversación es otra y hay que
decidir si vale reescribir el historial.

---

## La decisión de alcance: mover todo, o mover lo que importa

Medido en el repo:

| | Archivos | Referencias entrantes desde código/docs públicos |
|---|---|---|
| `project-memory/` + `adr/` + `sessions/` + `prompts/` | 79 | 44 en `CLAUDE.md`, 16 en `supabase/*.md`, 12 en migraciones |
| Solo `BUSINESS_CONTEXT` + `VISION_LIBRO_PROYECTO` | 2 | bastantes menos |

### Opción A — mover las cuatro carpetas (lo que elegiste)

Protege todo, y tiene un costo real que conviene mirar de frente: **el valor de
este repositorio es que el razonamiento está pegado al código.** Los ADRs
explican por qué `next_question` es `security definer`, por qué `topic` se
normaliza por trigger, por qué el banco de ítems no se lee desde el cliente. Si
se van a un repo privado:

- `CLAUDE.md` §12 (el orden de lectura obligatorio antes de tocar código) apunta
  a archivos que ya no están ahí.
- Las 12 referencias dentro de las migraciones SQL (`ver ADR-018`, `ver T-59`)
  quedan como punteros a un lugar que quien lea el repo no puede abrir.
- Cualquier colaborador futuro —o cualquier sesión de trabajo que arranque desde
  el repo público— pierde el contexto que hace que este proyecto sea distinto de
  un montón de CLJS suelto.

### Opción B — mover solo lo comercial

`BUSINESS_CONTEXT.md` (mercado, stakeholders, métricas) y
`VISION_LIBRO_PROYECTO.md` (la visión de negocio de largo plazo). Son los dos
archivos donde de verdad está lo que no querés que lea un competidor.

Los ADRs, en cambio, son decisiones de ingeniería. Que se lean no te quita
ventaja: **ninguna de tus decisiones técnicas es tu foso.** Tu foso son los 387
ítems calibrados con misconceptions nombradas y los 252 diagnósticos, y eso vive
en Supabase bajo RLS, no acá.

`OPEN_QUESTIONS.md` es el caso intermedio: tiene 127 referencias entrantes, así
que moverlo duele, pero también contiene preguntas de negocio abiertas.

**Recomendación:** empezá por B. Es media hora, protege lo que importa, y no te
rompe el flujo de trabajo. Si más adelante querés A, el procedimiento es el
mismo con otra lista de carpetas.

---

## Procedimiento (sirve para A y para B)

### Paso 1 — Crear el repo privado *(solo vos)*

En <https://github.com/new>: nombre `academia-memoria`, visibilidad **Private**,
sin README.

> `gh` no está instalado en esta máquina (`command not found`), y por
> [[../project-memory/DECISIONS]] D-33/D-34 los `brew install` fallan acá por las
> Command Line Tools. Si querés la CLI, se baja el binario a `~/bin` como se hizo
> con `clj-kondo` y `supabase`.

### Paso 2 — Mover, preservando el historial de esos archivos

```bash
cd ~/Documents/GitHub

# Clon de trabajo, para no tocar el repo bueno
git clone yacobh.github.io academia-memoria-tmp
cd academia-memoria-tmp

# Quedarse SOLO con la memoria, conservando su historial.
# Opción A:
git filter-repo --path project-memory/ --path adr/ --path sessions/ --path prompts/
# Opción B (en vez de la línea anterior):
# git filter-repo --path project-memory/BUSINESS_CONTEXT.md \
#                 --path project-memory/VISION_LIBRO_PROYECTO.md

git remote add origin git@github.com:Yacobh/academia-memoria.git
git push -u origin main
```

`git filter-repo` se instala con `pip3 install git-filter-repo` (no necesita
Homebrew). Si preferís no instalarlo: copiar las carpetas a mano a un repo nuevo
funciona igual, solo que perdés el historial de esos archivos.

### Paso 3 — Sacarlas del repo público

```bash
cd ~/Documents/GitHub/yacobh.github.io
git rm -r --cached project-memory adr sessions prompts   # ajustar según A o B
echo "
# Memoria del proyecto — vive en el repo privado academia-memoria
project-memory/
adr/
sessions/
prompts/" >> .gitignore
git commit -m "Mover la memoria del proyecto a un repositorio privado"
```

Los archivos **siguen en tu disco** y las sesiones de Claude Code los siguen
leyendo igual: solo dejan de subir al repo público.

### Paso 4 — Arreglar lo que queda apuntando al vacío

- `CLAUDE.md` §10, §11 y §12: reemplazar la tabla de rutas por una nota que diga
  dónde vive la memoria ahora.
- `CLAUDE.md` §1 tiene contenido comercial propio (el convenio con la UNAP, D-18,
  Q-01). Si movés por lo comercial, ese párrafo también hay que revisarlo.
- `supabase/SCHEMA.md` y `CONTENT.md`: 16 enlaces `[[../project-memory/…]]` y
  `[[../adr/…]]`.
- Las migraciones SQL: 12 menciones en comentarios. Son comentarios, no rompen
  nada, pero conviene que digan "ver el repo de memoria" en vez de una ruta que
  no existe.

Puedo hacer el paso 4 entero en cuanto los pasos 1–3 estén hechos: es mecánico y
lo verifico con un grep.

---

## Lo que NO hay que hacer

- **No borrar `CLAUDE.md` del repo público.** Es lo que hace que una sesión nueva
  sepa cómo trabajar acá. Trimear su §1 sí; borrarlo no.
- **No mover `supabase/migrations/`.** Es código de la base, no estrategia, y
  necesita estar junto al esquema que describe.
- **No dar por hecho que esto oculta el pasado.** Ver el primer bloque.
