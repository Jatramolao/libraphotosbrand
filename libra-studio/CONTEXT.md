# Libra Photos Studio — Contexto de Proyecto

## Qué es
App web para crear contenido de Instagram de la marca **LIBRA PHOTOS** (fotografía de moda).
Flujo: **Proyectos → Galería → Editor → Exportar PNG**.
Todo local: sin backend, sin login. Datos en `localStorage` + `IndexedDB`.

## Stack
- Vite + React 19 · `idb-keyval` (fotos) · `html-to-image` (export) · Vitest (tests)
- Repo: `https://github.com/Jatramolao/libraphotosbrand`
- Carpeta del proyecto: `libra-studio/`

## Identidad visual (diseño v2 — bundle Claude Design jun-2026)
| Token | Valor |
|---|---|
| Negro | `#000000` |
| Ámbar | `#F7A810` |
| Violeta | `#4B0082` |
| Fondo | `#f0eee9` |
| Display | Archivo Black |
| Mono | IBM Plex Mono |
| Cuerpo | Lora (bios, captions, descripciones) |
| Border-radius | 0 (brutalismo) |

Marca: **LIBRA PHOTOS** · monograma **LP** · LIBRAPHOTOS.CL · @_libraphotos

## Arquitectura de archivos clave
```
src/
├── App.jsx                  # Router de pantallas (projects/gallery/editor)
├── context/
│   ├── LPContent.jsx        # Contexto de textos (tokens) por proyecto
│   └── PhotoContext.jsx     # Contexto de fotos vía IndexedDB
├── data/
│   ├── defaults.js          # ~150 tokens con valores por defecto (v2)
│   └── templates-meta.js   # Registry de 26 plantillas + campos + categorías
├── lib/
│   ├── storage.js           # CRUD proyectos (localStorage) + fotos (IDB)
│   ├── photoRecord.js       # Encuadre de foto: { url, scale, x, y } + límites
│   └── export.js            # capturePng() + exportAsPng() vía html-to-image
├── templates/
│   ├── primitives.jsx       # Frame, PhotoSlot, LFMark, TechStrip, lpLines, LF
│   ├── static1.jsx          # T01–T10
│   ├── static2.jsx          # T11–T17
│   ├── static3.jsx          # T18–T25 (nuevas v2)
│   ├── static4.jsx          # T26–T28 (nuevas v2)
│   └── index.js             # TEMPLATE_COMPONENTS map
└── components/
    ├── ProjectList.jsx      # Crear / abrir / renombrar / eliminar proyectos
    ├── Gallery.jsx          # Grid por secciones + filtros + Export All
    ├── Editor.jsx           # Preview + TextPanel + barra de export
    ├── TextPanel.jsx        # Campos de texto por plantilla (useLP)
    ├── BrandSettings.jsx    # Modal tabs: Marca / Sesión / Datos Técnicos
    ├── SessionPhotoModal.jsx# Foto de sesión → slots protagonistas (mainSlot)
    └── ExportAllModal.jsx   # Export selectivo por sección con progreso
```

## Plantillas (26 — set v2, espeja la curaduría del sitio web)
### Portafolio Editorial · Blanco (estilo Vogue, sin overlays)
| ID | Nombre | Aspecto | ¿Foto? |
|---|---|---|---|
| t26 | Portafolio Editorial | 4:5 | ✓ (marca de agua LP violeta 10%) |
| t27 | Editorial Spread | 1:1 | ✓ ×2 |
| t12 | Designer Spotlight | 4:5 | ✓ |
| t08 | Quote Pull | 1:1 | — |

### Runway / Backstage · Negro
| ID | Nombre | Aspecto | ¿Foto? |
|---|---|---|---|
| t01 | Editorial Cover | 4:5 | ✓ |
| t02 | Metadata Card | 4:5 | ✓ |
| t28 | Music Event / Gig Report | 4:5 | ✓ (banda ámbar lateral) |
| t04 | Credits Slate | 4:5 | — |
| t11 | Drop Teaser | 4:5 | ✓ |
| t13 | Event Poster | 4:5 | — |
| t14 | Booking (desc. en Lora) | 4:5 | — |
| t24 | New Drop / Lanzamiento | 4:5 | ✓ |
| t19 | Sobre Mí / Presentación | 4:5 | ✓ |
| t18 | Proceso en Pasos | 4:5 | — |
| t20 | Top 5 / Ranking | 4:5 | — |

### Ámbar Collection · Violeta
t03 Ámbar Collection · 4:5 · ✓

### Carrusel 1:1
t06 Type Poster (—) · t15 Before/After (✓×2) · t21 Testimonio (✓) · t22 Behind the Scenes (✓) · t23 Datos Sesión (—) · t25 Polaroid Stack (✓×3)

### Stories 9:16
t09 Story Ticker (✓) · t10 Story Countdown (—) · t16 Reel Cover (✓)

### Perfil
t17 Highlight Covers (—)

Nota: T05 Contact Sheet y T07 Diptych fueron **descartadas** en el diseño v2.
T06/T08/T15 escalan a 4:5 con el selector de aspecto del editor.

## Fixes aplicados
| Problema | Causa | Solución |
|---|---|---|
| Export negro | Render offscreen + CORS fonts | Export desde DOM vivo |
| Fuentes perdidas en PNG | `skipFonts: true` | `buildFontEmbedCSS()` incrusta Archivo Black + IBM Plex Mono + Lora como base64 |
| Imagen blanca en PNG | `html-to-image` clona DOM sin esperar carga de `<img>` | Doble llamada a `toPng()` (primera prima el caché) |
| No se podía reemplazar foto | Click ignorado si ya había foto | Overlay hover con botones **↺ CAMBIAR** y **× ELIMINAR** |
| Ticker T09 invisible en export | Animación marquee arrancaba fuera de cuadro | Ticker estático |

## Funcionalidades activas
- ✅ Proyectos: crear / abrir / renombrar / eliminar
- ✅ Galería con 26 plantillas + filtros por sección (blanco/negro/ámbar/carrusel/stories/perfil)
- ✅ Editor: panel de texto en tiempo real + preview escalado + selector de aspecto
- ✅ Slots de foto: agregar, reemplazar, eliminar y **encuadrar** (zoom + paneo, persiste por slot)
- ✅ **Foto de sesión**: una foto se propaga a los 10 slots protagonistas (botón + FOTO SESIÓN en galería)
- ✅ Indicador de fotos en galería (chip FOTO n/m por plantilla)
- ✅ Export PNG individual 2× (1080px) con fuentes e imágenes incrustadas
- ✅ Export selectivo: checkboxes por sección + atajo "solo listas (con foto)"
- ✅ BrandSettings: 3 tabs (Marca / Sesión Actual / Datos Técnicos)
- ✅ Tests: 36 casos (storage, export, registry, photoRecord), `npm test`

## Backlog pendiente
### Media prioridad
- **C1** — Export directo al portapapeles
- **A1** — Duplicar proyecto
- **A7** — Carga múltiple de fotos (asignar varias a slots de una vez)
- **Q4** — Undo en campos de texto (Ctrl+Z)
- **Q2** — Ordenar proyectos por fecha / nombre
- **Q6** — Zoom en preview del editor

### V2
- Nuevas plantillas (carrusel secuencial)
- Presets de color por sesión

## Comandos útiles
```bash
cd libra-studio
npm run dev        # servidor local en :5173
npm run build      # build de producción
npm test           # tests Vitest
```

## Deploy
Vercel: importar repo `Jatramolao/libraphotosbrand`, Root Directory = `libra-studio`.
