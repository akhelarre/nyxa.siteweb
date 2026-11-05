# NYXA.WTF // SYS.33 ARCHIVE

Portal personal y archivo de **estudios de cine (`cinema_studies`)**, **ensayos (`essays`)** y **literatura (`literature`)** desarrollado por **N. Victoria Arenas (Nyxa NV)**.

Construido con **Astro 7**, **Content Collections**, **CSS nativo** y **WebGL vanilla** (shader 3D estilo PS2 BIOS reactivo al cursor y al tema cromático).

---

## Arquitectura del Proyecto

```text
src/
├── content.config.ts             # Configuración de las 3 Content Collections (Zod flexible para Obsidian)
├── content/
│   ├── cinema_studies/           # Archivos .md de Estudios de Cine, Cátedras y Análisis Audiovisual
│   ├── essays/                   # Archivos .md de Ensayos, Filosofía, Política y Ciberespacio
│   └── literature/               # Archivos .md de Literatura, Crónicas y Fosas Negras
├── utils/
│   └── archive.ts                # Utilidad central de indexación, extractos y rutas de colecciones
├── components/
│   ├── BlogPost.astro            # Tarjeta de entrada con badge de colección y fecha
│   ├── Footer.astro              # Pie de página con estado del sistema, redes y RSS
│   ├── Header.astro              # Cabecera reticular y navegación (/cinema_studies, /essays, /literature)
│   ├── ShaderCanvas.astro        # Lienzo WebGL 3D (estética PS2 BIOS + dithering 16-bit)
│   ├── Social.astro              # Botón de enlace a perfiles externos (GitHub, IG, YouTube)
│   └── ThemeIcon.astro           # Selector de tema cromático (Claro / Oscuro)
├── layouts/
│   ├── AboutLayout.astro         # Layout con ficha técnica del avatar (alias, disciplina, stack)
│   ├── BaseLayout.astro          # Estructura base HTML, integración de ShaderCanvas y frame principal
│   ├── BlogLayout.astro          # Contenedor de listado para el índice de artículos
│   └── MarkdownPostLayout.astro  # Marco de lectura de alto contraste y paginador de entradas
├── pages/
│   ├── index.astro               # PORTAL // 00: Declaración de oficio y soberanía digital Y2K
│   ├── about.astro               # MANIFESTO // EL IRIS: Ensayo sobre la cine-sensación
│   ├── blog.astro                # ARCHIVE: Índice general y tarjetas de acceso a las 3 colecciones
│   ├── [collection]/
│   │   ├── index.astro           # Índice por colección (/cinema_studies/, /essays/, /literature/)
│   │   └── [slug].astro          # Renderizado de cada archivo .md con navegación Anterior / Siguiente
│   ├── rss.xml.js                # Canal de sindicación RSS autogenerado
│   └── tags/
│       ├── index.astro           # TAGS // INDEX: Matriz de etiquetas y conteo de nodos
│       └── [tag].astro           # Rutas dinámicas filtradas por etiqueta
└── styles/
    └── global.css                # Variables de tema, superficie de lectura (--bg-reading) y grilla
```

> **Nota**: Todo el material exclusivo de **Ars Arka** (`wiki.astro`, las Islands `RhizomeGraph.tsx`, `CodexSearch.tsx`, `ChronicleTimeline.tsx` y los textos `post-1.md` y `post-11.md`) se encuentra resguardado en la carpeta `_arsarka_export/` listo para trasladarse al repositorio de `arsarka.xyz`.

---

## Cómo Agregar Nuevos Textos `.md`

Simplemente guarda o arrastra cualquier archivo `.md` (incluso notas directas de **Obsidian** sin frontmatter completo) dentro de cualquiera de las tres carpetas:
- `src/content/cinema_studies/`
- `src/content/essays/`
- `src/content/literature/`

El cargador automático detectará el título a partir del nombre del archivo si no tiene `title:` en el frontmatter, generará un extracto limpio de texto y creará su ruta en `/<colección>/<slug>/`.
