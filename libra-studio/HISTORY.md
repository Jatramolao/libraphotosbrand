# Libra Photos Studio — Historial de Ajustes

> Bitácora cronológica de decisiones y cambios del proyecto.
> Para el estado actual (arquitectura, plantillas, funcionalidades), ver **`CONTEXT.md`**.

Marca: **LIBRA PHOTOS** · monograma **LP** · LIBRAPHOTOS.CL · @_libraphotos
Repo: `https://github.com/Jatramolao/libraphotosbrand` · Carpeta: `libra-studio/`

---

## Línea de tiempo

### v1 — App base (2026-05-22)
**Commit `71f78b0` · feat: Libra Photos Studio — app completa v1**
- Arranque del proyecto: Vite + React 19, sin backend ni login.
- Flujo **Proyectos → Galería → Editor → Exportar PNG**.
- Estado por pantalla con `useState` (sin react-router).
- Textos centralizados en `LPContext` (tokens editables por proyecto).
- Fotos en IndexedDB (`idb-keyval`), keyed `photo:{projectId}:{slotId}`.
- 15 plantillas iniciales (T01–T17, sin T05/T07) con estética brutalista.
- Export PNG vía `html-to-image`.

### Fix — Fuentes en el export (2026-05-22)
**Commit `78c8140` · fix: incrustar fuentes Google en export PNG**
- **Problema:** las tipografías se perdían en el PNG (caían a fuente del sistema).
- **Causa:** `skipFonts: true` en `toPng()`.
- **Solución:** `buildFontEmbedCSS()` descarga las Google Fonts, las convierte
  a base64 y las inyecta como `fontEmbedCSS`. Resultado cacheado por sesión.

### Feature — Reemplazar/eliminar foto (2026-05-23)
**Commit `40ed2e2` · feat: reemplazar/eliminar foto en slots con imagen**
- **Necesidad:** no se podía cambiar una foto ya colocada (el click se ignoraba).
- **Solución:** overlay al pasar el mouse con **↺ CAMBIAR** y **× ELIMINAR**;
  drag-over muestra "SOLTAR PARA REEMPLAZAR".

### Fix — Imagen blanca en el export (2026-05-25)
**Commit `8be1aa5` · fix: imagen no aparece en export PNG**
- **Problema:** el diseño exportaba bien (fuentes ok) pero la foto salía en blanco.
- **Causa:** `html-to-image` clona el DOM y los `<img>` del clon necesitan un
  ciclo de pintado antes de dibujarse al canvas.
- **Solución:** doble llamada a `toPng()` — la primera prima el caché de imágenes,
  la segunda captura con todo renderizado. Se separó `capturePng()` de
  `exportAsPng()` para reutilizar la captura.

### Sprint — Productividad (2026-05-29)
**Commit `5e03420` · feat: export all, renombrar proyectos, sesión unificada, tests**
- **Export All:** modal que exporta todas las plantillas en secuencia con progreso.
- **Renombrar proyectos:** edición inline con ✎ (Enter/blur/Escape).
- **Sesión unificada:** `BrandSettings` reorganizado en 3 tabs
  (Marca / Sesión Actual / Datos Técnicos), campos globales compartidos.
- **Tests:** se incorpora Vitest + jsdom (CRUD de proyectos y geometría de export).

### Docs — Contexto de sesión (2026-05-31)
**Commit `f125a01` · docs: agregar CONTEXT.md**
- Documento corto para retomar el proyecto entre conversaciones.

---

## Rediseño v2 (2026-06-11)

### Refactor — Diseño v2 + 11 plantillas nuevas
**Commit `dd8a1ef` · feat: rediseño v2 — 11 plantillas nuevas (T18–T28)**
- Se incorporó un **bundle de diseño** exportado desde Claude Design
  ("Plantillas Instagram") con la nueva curaduría.
- **11 plantillas nuevas (T18–T28):** Proceso, Sobre Mí, Top 5, Testimonio,
  Behind the Scenes, Datos de Sesión, New Drop, Polaroid Stack, Portafolio
  Editorial, Editorial Spread y Music Event / Gig Report.
- Plantillas T01–T17 actualizadas al lenguaje v2 (acentos ámbar en títulos,
  Type Poster proporcional, Booking con Lora, Highlights con textura de grilla).
- **Galería reorganizada en 6 secciones** que espejan el sitio web:
  Editorial Blanco · Runway/Backstage · Ámbar Collection · Carrusel · Stories · Perfil.
- Tipografía **Lora** incorporada (bios, captions, descripciones).
- **T05 Contact Sheet y T07 Diptych descartadas** en el diseño v2.
- Ticker de T09 ahora estático (la animación marquee arrancaba fuera de cuadro
  y no salía en el PNG).
- Se conservaron los IDs de slots antiguos → no se pierden fotos ya cargadas.

### ⚠️ Corrección — Marca (mismo día)
**Commit `f9f3aef` · fix: restaurar identidad de marca LIBRA PHOTOS / LP**
- **Qué pasó:** el bundle de diseño traía dentro un **rebrand a "LIBRA FOTOS / LF"**
  (decisión del asistente de diseño en su última iteración). Se aplicó por error
  al seguir el bundle como fuente de verdad, sin validarlo.
- **Corrección:** revertidos los tokens de marca a la identidad real
  (**LIBRA PHOTOS / LP / LIBRAPHOTOS.CL**), conservando los 26 diseños v2.
- **Lección:** los bundles de diseño pueden incluir cambios de marca implícitos;
  validar identidad antes de adoptar.
- **Nota para proyectos antiguos:** un proyecto creado mientras estaba "LIBRA
  FOTOS" guardó esos textos en su `content`; se corrige en ⚙ Sesión → Marca.

### Sprint — Prioridad alta (gestión de fotos)
**Commit `d958ea9` · feat: foto de sesión, encuadre, indicadores, export selectivo**
- **A5 · Foto de sesión:** subir una foto una vez la propaga a los **10 slots
  protagonistas** (`mainSlot` en el registry). Opción de sobrescribir las que
  ya tienen foto. Excluye autorretrato (T19) y slots especiales (antes/después,
  polaroids, cliente del testimonio).
- **A6 · Encuadre por slot:** botón **✥ ENCUADRAR** en el hover — paneo
  arrastrando, zoom con rueda o botones ±, RESET y LISTO. Persiste como
  `{ url, scale, x, y }`; compatible con fotos guardadas como string (formato v1).
  Los límites de paneo se calculan según el zoom para no dejar bordes vacíos.
- **Q5 · Indicador en galería:** chip `FOTO n/m` por plantilla (ámbar al completar).
- **C2 · Export selectivo:** checkboxes agrupados por sección + atajos
  TODAS / NINGUNA / SOLO LISTAS (con foto). El progreso corre sobre la selección.
- **Infra:** `PhotoContext.setManyPhotos` (escritura masiva); `lib/photoRecord.js`
  (normalización y límites de encuadre).

---

## Decisiones de diseño persistentes
- **Sin backend / sin login:** todo vive en `localStorage` (proyectos) +
  IndexedDB (fotos). Portable y privado, pero atado al navegador/dispositivo.
- **Tokens centralizados:** cualquier texto que se repita entre plantillas vive
  como token compartido (marca, edición, diseñador…) y se edita una sola vez.
- **`mainSlot` vs slots especiales:** solo los slots "protagonistas" reciben la
  foto de sesión; los comparativos/decorativos se cargan a mano.
- **Compatibilidad de fotos:** el formato de foto evolucionó de `string` (v1) a
  `{ url, scale, x, y }` (v2); `normalizePhoto()` mantiene ambas válidas.
- **Objetivo rector:** simplificar la generación de contenido (principalmente
  imágenes) — cada mejora se prioriza por cuántos clics ahorra por publicación.

## Backlog vigente
| ID | Mejora | Prioridad |
|---|---|---|
| C1 | Export directo al portapapeles | Media |
| A1 | Duplicar proyecto | Media |
| A7 | Carga múltiple de fotos (asignar varias a slots de una vez) | Media |
| Q4 | Undo en campos de texto (Ctrl+Z) | Media |
| Q2 | Ordenar proyectos por fecha / nombre | Media |
| Q6 | Zoom en preview del editor | Media |
| — | Nuevas plantillas (carrusel secuencial) | V2 |
| — | Presets de color por sesión | V2 |
