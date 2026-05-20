# BITÁCORA — Haddock Films 2026

> Registro cronológico de todo lo que pasa en el proyecto. Cada entrada incluye **fecha**, **qué se hizo**, **qué se decidió**, **qué quedó pendiente**.
>
> **Regla:** No se cierra una sesión sin agregar una entrada acá. Sin registro, no existe.

---

## 2026-05-18 — Setup inicial del proyecto migrado

### Qué se hizo

- Auditoría completa del proyecto actual en producción (`haddock-films2026.vercel.app/v1`).
- Generación del dump técnico (`DUMP_TECNICO_MIGRACION.md`) desde Antigravity.
- Diagnóstico del estado: Vite + React 19, Tailwind v4, Framer Motion. SPA pura en CSR.
- Identificación de problemas críticos: SEO ciego, imágenes sin optimizar, estilos inline, falta de metadata dinámica.
- Definición del plan maestro en 8 fases (0 a 7).
- Generación del set completo de documentación maestra:
  - `MASTER_PLAN.md`
  - `HANDOFF.md`
  - `BITACORA.md` (este archivo)
  - `DESIGN_SYSTEM.md`
  - `TECHNICAL_SPEC.md`
  - `SEO_PLAYBOOK.md`
  - `CONTENT_MODEL.md`
  - `PROMPT_LIBRARY.md`

### Qué se decidió

- Migrar de Vite a **Next.js 15 (App Router)**.
- Adoptar **TypeScript** para todo el código nuevo.
- Mantener **Tailwind v4** y **Framer Motion** (ya estaban y funcionan bien).
- Mantener **dataset en JSON local** (`filmsData.ts`) por ahora. CMS queda como decisión post-lanzamiento.
- **Tono visual definitivo: Editorial Claro** (ya aprobado por el cliente).
- **Idioma: español Argentina** (`lang="es-AR"`). i18n queda como decisión post-lanzamiento.
- **Mailing y eventual backend**: los implementa el cliente manualmente, fuera del scope del agente.
- División de roles: cliente decide producto, Antigravity ejecuta, Claude asesora y revisa.

### Qué quedó pendiente

- Conseguir 3-5 referencias visuales finales (no bloquea Fase 0 ni Fase 1).
- Ejecutar Fase 0: medición de baseline (Lighthouse, Web Vitals, bundle, axe-core).
- Confirmar URL del repositorio y branch principal.
- Confirmar dominio final (si el cliente va a cambiarlo de la URL temporal de Vercel).

### Métricas relevantes

Sin métricas todavía. Se cargan al cerrar Fase 0.

---

## 2026-05-18 — Ejecución Fase 0 (Medición y baseline)

### Qué se hizo
- Auditoría Lighthouse de performance, accesibilidad, best practices y SEO en URL de Vercel.
- Auditoría de accesibilidad con axe-core en home y ficha.
- Análisis del tamaño actual del bundle de Vite JS y CSS.
- Se documentaron los resultados en `/docs/baseline/BASELINE.md`.

### Qué se decidió
- Las oportunidades más grandes de mejora están en SEO (falta HTML lang, metadata, SSR) y en el LCP en Mobile (reducir los 3.1s).
- Hay bastantes violaciones de contraste de color y `<main>` tags faltantes que se resolverán en las próximas fases.

### Qué quedó pendiente
- Iniciar la Fase 1 (Migración a Next.js 15).
- Obtener referencias visuales (Fase 3).

### Métricas relevantes
- JS inicial: 143.38 kB gzipped.
- Lighthouse Desktop (Perf/A11y/BP/SEO): 97 / 95 / 100 / 83
- Lighthouse Mobile (Perf/A11y/BP/SEO): 87 / 95 / 100 / 83

---

## 2026-05-18 — Migración Fase 1 a Next.js (App Router)

### Qué se hizo
- Se migraron los componentes de la home (`HeroStatement`, `LogrosBanner`, `FeaturedFilm`, `CatalogueScene`, `ServiciosSection`) y layouts (`Navbar`, `Footer`) a `src/components/home` y `src/components/layout`.
- Se reemplazaron todas las etiquetas `<img>` por `next/image` (`<Image />`) con la propiedad `fill` o tamaños correspondientes para optimización del LCP.
- Se tiparon los componentes y se arreglaron los errores de TypeScript (se actualizó `films.schema.ts` para cubrir discrepancias como `id` numérico vs string, y `distributor`).
- Se crearon las páginas estáticas `/peliculas/[slug]/page.tsx` usando `generateStaticParams` y `generateMetadata` para SEO.
- Se eliminó el `border-radius: 0 !important` global de `globals.css` para permitir estilos a nivel de componente.
- Se configuró `next.config.mjs` con redirecciones (de `/v1` a `/`) y headers de seguridad.
- Se crearon `sitemap.ts` y `robots.ts` dinámicos.
- Se ignoró la carpeta `src-vite/` y `EXTRAS/` en ESLint para lograr un build limpio.

### Qué se decidió
- La página de detalle de película se re-implementó directamente usando Server Components de Next.js, prescindiendo del viejo componente `FilmPageV1.jsx`/`FilmPageV2.tsx` para aprovechar SSR puro y SEO.
- `CatalogueScene` y `Navbar` fueron marcados con `"use client"` ya que manejan su propio estado de React y animaciones con `framer-motion`.

### Qué quedó pendiente
- Validar visualmente en localhost (Visual QA).
- Fase 2: Optimización profunda de imágenes (PROMPT_F1_IMAGE_OPTIMIZATION) y mejoras en el componente `FeaturedFilm` (PROMPT_F1_REFACTOR_FEATURED_FILMS).

### Métricas relevantes (si aplica)
- `npm run build` corre en ~2 segundos sin errores de TypeScript ni advertencias de ESLint (exit code 0).

---

## 2026-05-18 — Remediación de Regresión en Fase 1

### Qué se hizo
- Se detectó una regresión crítica: el sitio se veía "destruido" (sin estilos) y no coincidía con la versión de producción (V1).
- Se restauraron los componentes `FeaturedFilm`, `CatalogueScene` y `Navbar` para emular fielmente el comportamiento de `V1Home.jsx`.
- Se recuperó el video de fondo en el home (`HeroVideo`).
- Se creó `postcss.config.mjs` para habilitar el procesamiento de Tailwind v4, solucionando el problema de falta de estilos.
- Se forzó el modo `v1` agregando `data-version="v1"` en `layout.tsx`.

### Qué se decidió
- Mantener la fidelidad con la versión V1 como punto de partida para la Fase 1, antes de avanzar con optimizaciones.

### Qué quedó pendiente
- Ajustar detalles visuales menores reportados por el usuario.
- Continuar con la Fase 1 o avanzar a la siguiente según indique el usuario.

---

## 2026-05-18 — Ajustes de Proporciones y Tipografía en Footer

### Qué se hizo
- Se ajustó el footer para que coincida exactamente con el diseño de referencia del cliente.
- Se quitaron los bordes blancos haciendo que el bloque negro sea full-width.
- Se eliminó el peso `bold` de la tipografía "Historias que trascienden." y se aumentó el tamaño a `14vw` para lograr un aspecto fino y gigante.
- Se colocó la palabra "trascienden." en itálica.
- Se reubicaron los links y el copyright sobre el fondo negro.

### Qué se decidió
- Seguir estrictamente las referencias visuales del cliente en cuanto a proporciones y pesos tipográficos para evitar regresiones visuales.

### Qué quedó pendiente
- Aplicar esta misma lógica de proporciones finas y contenedores controlados al resto del sitio.

---

## 2026-05-18 — Optimización de Imágenes, Refactor y Componentes Primitivos

### Qué se hizo
- **Optimización de Imágenes:** Se procesaron todas las imágenes mayores a 500 KB en la carpeta `public/` convirtiéndolas a WebP y reduciendo su tamaño drásticamente (ej. un archivo de 14 MB pasó a 261 KB).
- **Actualización de Referencias:** Se corrió un script para actualizar las referencias en `films.ts` de `.jpg`/`.png` a `.webp` para los archivos optimizados (34 referencias actualizadas).
- **Refactor de Películas Destacadas:** Se modificó `page.tsx` para que las 3 películas destacadas se lean dinámicamente desde el JSON usando `featured: true` y alternen su layout automáticamente.
- **Componentes Primitivos:** Se crearon 8 componentes base (`Container`, `Section`, `Heading`, `Text`, `Label`, `Link`, `Button`, `Tag`) en `src/components/primitives/` siguiendo el sistema de diseño.
- **Página de QA:** Se creó la ruta `/dev/components` para visualizar todos los primitivos en sus distintas variantes.
- **Limpieza de Bugs:** Se eliminó la regla global `border-radius: 0 !important` de `globals.css` que forzaba bordes rectos en todo el sitio.

### Qué se decidió
- Mantener los archivos originales JPG conviviendo con los WebP para evitar roturas y permitir que el usuario los reemplace vía Photoshop si lo prefiere.
- Avanzar con la creación de primitivos para dejarle el terreno listo a Claude para el diseño interno.

### Qué quedó pendiente
- Visual QA por parte del cliente de las imágenes optimizadas y los componentes primitivos.
- Refactor de estilos inline en la ficha de películas (`FilmPageV1.jsx`).

---

## 2026-05-18 — Cierre de Fase 1 (Verificación y Reporte)

### Qué se hizo
- **Fix de tipos en primitivos polimórficos:** `Label.tsx` y `Text.tsx` fueron corregidos para soportar refs polimórficos correctamente (unión de tipos y cast de ref).
- **Verificación de la migración:** Se completaron los 6 bloques de verificación.
- **Lighthouse:** Se obtuvo un score de 100 en SEO en la home.
- **Visual QA:** Se tomaron screenshots de la home y de la ficha de película, verificando que no hay roturas visuales.

### Qué se decidió
- **`npm run typecheck` obligatorio:** Debe ser un check obligatorio antes de cerrar cualquier tarea que cree componentes nuevos, no opcional.
- Documentar el fallo del script `"typecheck"` en `package.json` (se corrió con `npx tsc --noEmit`).

### Qué quedó pendiente
- Avanzar a la Fase 2 (Diseño con Claude).

---
## 2026-05-18 — Tareas de SEO, ESLint y Diagnóstico

### Qué se hizo
- **TAREA A — JSON-LD Organization en home:** Se inyectó el esquema de `Organization` en `src/app/layout.tsx` y se validó en `Schema.org` con 0 errores y 0 warnings.
- **TAREA B — Limpieza de warnings de ESLint:** Se limpiaron los 8 warnings de variables no usadas y expresiones en `page.tsx`, `Navbar.tsx`, `Footer.tsx` y `postcss.config.mjs`. `npm run lint` pasa limpio.
- **TAREA C — Diagnóstico de Client Components y TBT:** Se listaron los componentes con `"use client"` y se identificaron 6 componentes que usan Framer Motion. Se detectó que `HeroVideo` y `Footer` podrían ser Server Components.
- **Cierre:** `npm run build`, `npx tsc --noEmit` y `npm run lint` pasaron limpios.
- **Lighthouse Mobile (Home):** Se obtuvo un score de Performance de 82, LCP de 3.2s y TBT de 450ms.

### Qué se decidió
- No actualizar HANDOFF como "Fase 1 cerrada" todavía. Queda en "Fase 1 en cierre, esperando rediseño de fichas con Claude".
- Postergar la optimización masiva de imágenes hasta después del rediseño de fichas.

### Qué quedó pendiente
- Rediseño de fichas de películas con Claude (Fase 2).

### Métricas relevantes
- Lighthouse Mobile (Home): Perf: 82, LCP: 3.2s, TBT: 450ms.

---

## 2026-05-18 — Recuperación de Paridad Funcional en Fichas de Película

### Qué se hizo
- **TAREA 1 — Auditoría de assets:** Se verificó la existencia de assets para "El secreto de sus ojos" y se eliminó un archivo duplicado (`/public/assets/El-secreto-poster.jpg`).
- **TAREA 2 — Recuperación de bloques:** Se reimplementó `/peliculas/[slug]/page.tsx` para incluir los bloques faltantes: Tráiler (con lazy load en `TrailerPlayer.tsx`), Poster dedicado, Reconocimientos (Awards) y Navegación Anterior/Siguiente.
- **Validación:** `npm run build`, `npm run lint` y `npx tsc --noEmit` pasaron limpios.
- **Visual QA:** Se validó manualmente con el subagente de navegador en localhost:3002. Se tomaron screenshots en desktop y mobile guardados en `DOCS/audits/screenshots-paridad-v1/`.
- **TAREA 4 — Actualización de CONTENT_MODEL.md:** Se actualizaron las secciones 2 y 3 para reflejar el uso de `screenplay` y `adaptation`.

### Qué se decidió
- Mantener la fidelidad funcional con V1 sin rediseño visual por ahora.
- Usar `TrailerPlayer` como Client Component para el lazy load del trailer.

### Qué quedó pendiente
- Avanzar a la Fase 2 (Diseño con Claude) una vez que el usuario apruebe la paridad funcional.

### Métricas relevantes
- `npm run build` exitoso en ~2.4s.
- Typecheck y Lint limpios.

## 2026-05-18 — Fix de Contraste en Fichas de Película con Tokens Semánticos

### Qué se hizo
- **Corrección de Contraste:** Se reemplazaron las clases inventadas (`brand-black`, `brand-white`, `brand-gold`) por tokens semánticos en `src/app/peliculas/[slug]/page.tsx` y `src/components/film/TrailerPlayer.tsx`.
- **Actualización de Tokens:** Se agregaron los tokens `--color-bg-dark`, `--color-fg-on-dark`, `--color-fg-on-dark-muted` y `--color-accent-hover` en `src/app/globals.css` dentro del bloque `@theme`.
- **Actualización de Documentación:** Se actualizó `DOCS/DESIGN_SYSTEM.md` sección 2 con los nuevos nombres de tokens y la regla de no usar opacidades sueltas.
- **Validación:** `npm run build`, `npm run lint` y `npx tsc --noEmit` pasaron limpios.
- **Visual QA:** Se tomaron 6 screenshots (home, secreto, elena; desktop y mobile) verificando legibilidad humana. Los archivos se guardaron en `DOCS/audits/screenshots-fix-contraste/`.

### Qué se decidió
- Usar nomenclatura semántica (`fg-on-dark`, `fg-on-dark-muted`) en lugar de nombres basados en marca (`brand-*`) para evitar duplicidad y deuda técnica.
- Prohibir el uso de opacidades sueltas (como `text-white/70`) en favor de tokens dedicados.

### Qué quedó pendiente
- Avanzar a la Fase 2 (Diseño con Claude) o lo que indique el usuario.

### Métricas relevantes
- `npm run build` exitoso en ~2.0s.
- Typecheck y Lint limpios.

---


## 2026-05-19 — Arranque de Sesión, Guía de Inicialización e Corrección de Pósters

### Qué se hizo
- **Lectura de Memoria del Proyecto:** Se leyeron y analizaron todos los archivos `.md` de documentación (`BITACORA_antigravity.md`, `HANDOFF_antigravity.md`, `MASTER_PLAN.md`, `TECHNICAL_SPEC.md`, `README.md`) para recuperar el contexto de la sesión previa.
- **Lanzamiento de Servidor:** Se inició el servidor de desarrollo local de Next.js en el puerto `3001` mediante el comando `npm run dev -- -p 3001` y se comprobó su funcionamiento correcto.
- **Documentación de Arranque:** Se generó el archivo `DOCS/ARRANQUE_SESION.md` para estandarizar el proceso de inicio de sesión y recuperación de memoria para futuros trabajos en el proyecto.
- **Corrección de Pósters en Home:** Se solucionó el problema por el cual las miniaturas de *Eva no duerme*, *Al final del túnel*, *Yanka y el espíritu del volcán*, y *Carmel: ¿Quién Mató A María Marta?* mostraban imágenes horizontales estiradas/recortadas en lugar de los pósters verticales correctos. Se actualizaron sus rutas `local_path` en `src/data/films.ts` para que apunten a los archivos WebP verticales optimizados ubicados en `/assets/` (`eva-poster-2015.webp`, `al-final-del-tunel-2016.webp`, `yanka-y-el-espritu-del-volcn-2018.webp`, y `carmel-quien-mato-a-mara-marta-2020.webp` respectivamente) y se agregaron sus imágenes horizontales al campo `hero`.

### Qué se decidió
- Mantener el puerto `3001` para el desarrollo local actual de Next.js.
- Excluir pruebas de navegador con el subagente durante el arranque por instrucción del usuario.
- Usar los activos verticales optimizados WebP en `/assets/` para resolver la visualización recortada/errónea de las portadas del catálogo en la Home.

### Qué quedó pendiente
- Avanzar con las próximas tareas de la Fase 2 (diseño y maquetación fina con el cliente).

---

## 2026-05-19 — Fase 3.1: Rediseño Hero + FeaturedFilm (Editorial Claro)

### Qué se hizo
- **Unificación de Hero y Statement:** Se fusionó `HeroVideo.tsx` y `HeroStatement.tsx` en un único componente con superposición tipográfica. El meta-header y la frase destacada de 25 años de cine se integraron de forma semántica y accesible.
- **Optimización de Carga y Rendimiento (LCP):** Se implementó una detección responsiva que evita descargar o renderizar el elemento `<video>` en dispositivos móviles, cargando únicamente una imagen poster estática optimizada (`/assets/El-Secreto.webp`).
- **Respeto a Preferencias de Accesibilidad (Motion):** Se integró el hook `useReducedMotion` de Framer Motion para anular el autoPlay del video y desactivar los desplazamientos de animación (`y` y `x`) en las transiciones de texto.
- **Refactorización de Películas Destacadas (`FeaturedFilm`):**
  - Se reescribió `FeaturedFilm.tsx` para usar exclusivamente componentes primitivos (`<Section spacing="lg">`, `<Container>`, `<Heading>`, `<Text>`, `<Label>`, `<Tag>`, `<Link>`).
  - **Maquetación Asimétrica:** Grilla de 12 columnas alternada (imagen col-span 7, texto col-span 5) en desktop y stack vertical uniforme (imagen arriba, texto abajo) en pantallas móviles (≤768px).
  - **Énfasis Editorial:** Se agregó itálica a palabras clave de los títulos destacados ("El Tiempo de las *Moscas*", "*Atrapados*", "Elena *sabe*") y un hover sutil que cambia el color del título a acento dorado.
  - **Microinteracciones:** Hover en desktop con escala de `1.02` en stills de películas (`scale-editorial` agregada al tema de `globals.css` como token) y transición `ease-expo` (400ms). Se anula automáticamente en entornos con reducción de movimiento.
  - **Etiquetas y CTA:** Tags integrados para destacar el film ("Destacada" en dorado acento) junto con géneros dinámicos por película. El CTA se transformó en un `<Link>` semántico subrayado hacia la ficha técnica.
- **Actualización de Ruteo en Home:** Se modificó la iteración en `src/app/page.tsx` para pasar propiedades nativas como `slug` y `type` eliminando handlers de clicks en JS en favor de enlaces HTML directos.

### Qué decidió
- Declarar el componente `HeroStatement.tsx` como obsoleto (`deprecated`) y retornando `null` para preservar la estructura y evitar roturas de imports mientras se consolida la UI limpia.
- Definir un token de escala `--scale-editorial: 1.02` en el `@theme` de `globals.css` para evitar valores mágicos en JSX, manteniendo la alineación del sistema de diseño.

### Qué quedó pendiente
- Avanzar con la Fase 3.2: Rediseño del Catálogo con grilla de 12 columnas y tipografía editorial.

### Métricas relevantes
- `npx tsc --noEmit` y `npm run build` corren y compilen exitosamente en Turbopack con 0 errores y 0 warnings.
- Dev server corriendo de forma fluida en port `3001`.

---

## 2026-05-19 — Fase 3.2: Rediseño LogrosBanner + CatalogueScene + ServiciosSection (Editorial Claro)

### Qué se hizo
- **LogrosBanner Rediseñado**: Se reemplazó el ticker animado (marquee) por un grid estático y premium de 4 columnas centrado en tipografía refinada, utilizando componentes primitivos.
- **CatalogueScene Editorial e Infiltrado**: 
  - Se eliminaron todos los filtros interactivos (películas/series, años, géneros) por definición de diseño puro ("sin filtros", al estilo MUBI/A24).
  - Maquetación en grilla de 3 columnas asimétrica con stills e información jerárquica clara.
  - Integración nativa de Next.js `<Link>` para enrutamiento SEO friendly a fichas técnicas.
  - Transiciones de carga escalonadas (staggered animations) y hover micro-interactivos con escala `1.02` y cambio de color a dorado (ambos inhabilitados si `useReducedMotion` está activo).
- **ServiciosSection en Grilla Asimétrica**:
  - Rediseñado en grilla de 12 columnas.
  - Columna izquierda sticky (5 cols) que contiene la propuesta de valor y un botón de CTA a contacto.
  - Columna derecha (7 cols) estructurada en una lista vertical numerada de los 8 servicios con separadores sutiles y tipografía a gran escala.
- **Limpieza de Tipos y Parámetros**:
  - Se resolvió un error de tipado estricto de Framer Motion en `ease: [0.16, 1, 0.3, 1]` y las variantes declarándolas como `any`.
  - Se corrigió el uso del tamaño no soportado `display-md` por `display-lg` en los primitivos `<Heading>`.
- **Aseguramiento de Calidad y Baseline**:
  - Se tomaron 6 capturas de pantalla de validación visual de los componentes (desktop y mobile a 375px) guardados en `docs/baseline/F3_2_screenshots/`.
  - Se ejecutaron auditorías de Lighthouse de producción (levantando la app en el puerto 3002).
  - Los reportes de Lighthouse (HTML y JSON) se guardaron en `docs/baseline/F3_2_lighthouse/`.

### Qué se decidió
- La experiencia del catálogo debe ser puramente visual y editorial; los controles de filtrado se eliminan por completo para dar aire y fluidez a la navegación (paridad con las decisiones de curaduría de la marca).
- Registrar los resultados de Lighthouse basados en builds de producción optimizados (`npm run build` seguido de `next start`) para evitar penalizaciones artificiales debidas a la instrumentación de desarrollo en Next.js.

### Qué quedó pendiente
- Avanzar con la Fase 4: Rediseño de Fichas de Películas en estética Editorial Claro (integrando el layout asimétrico, la galería de stills y la ficha técnica extendida).

### Métricas relevantes
- **Lighthouse Mobile**: Performance **90**, Accessibility **93**, Best Practices **100**, SEO **100**.
- **Lighthouse Desktop**: Performance **99**, Accessibility **93**, Best Practices **100**, SEO **100**.
- Cero errores en `npx tsc --noEmit` y `npm run build` exitoso (Turbopack).

---

## 2026-05-19 — Hotfix: CatalogueScene grid 3 → 4 columnas

### Qué se hizo
- Ajustada la grilla de CatalogueScene de 3 a 4 columnas en desktop por solicitud del cliente.
- Mobile y tablet sin cambios (2 columnas).

### Qué quedó pendiente
- Ronda de QA visual completa de Home (3.1 + 3.2) ya planificada con el PM.

---

## 2026-05-19 — Fase 3: Ronda de correcciones finales de Home y Cierre de Fase

### Qué se hizo
- **CORRECCIÓN 1 — Hero: statement abajo y full-width**: Se modificó `HeroVideo.tsx` para colocar el statement en la parte inferior ocupando el ancho total disponible, con un meta-header elegante y tipografía Playfair Display de gran tamaño.
- **CORRECCIÓN 2 — Hero: indicador de scroll**: Se removió el texto "scroll" del Hero y se reemplazó por un ícono de mouse SVG animado en loop, el cual se renderiza estático si se detecta reducción de movimiento (`useReducedMotion()`).
- **CORRECCIÓN 3 — LogrosBanner: reducir padding vertical**: Se redujo el padding vertical de `LogrosBanner.tsx` cambiando la propiedad `spacing` del componente `Section` de `lg` a `md` para quitar espacio muerto innecesario.
- **CORRECCIÓN 4 — FeaturedFilm: imágenes en formato apaisado + centrado vertical**: Se cambió la relación de aspecto de las imágenes de portrait a landscape (`16/9`) en `FeaturedFilm.tsx`. Se centró verticalmente la columna de detalles respecto a la imagen usando la propiedad `items-center` de Tailwind.
- **CORRECCIÓN 5 — CatalogueScene: título en una sola línea**: Se cambió el tamaño del título "Filmografía Completa" en `CatalogueScene.tsx` de `display-lg` a `h1` para evitar que quiebre en dos líneas en desktop.
- **CORRECCIÓN 6 — CatalogueScene: cards (separación tags y cortes de título)**: Se reestructuraron las tarjetas del catálogo. La línea superior (etiquetas y año) ahora se presenta de forma unificada utilizando `<Label>` con `justify-between`, limitando a 2 etiquetas como máximo. El título se muestra debajo en un elemento de mayor tamaño. Se implementó una separación limpia en títulos largos buscando el carácter de dos puntos (`":"`).
- **CORRECCIÓN 7 — ServiciosSection: nuevo layout de 2 columnas**: Se reorganizó `ServiciosSection.tsx` con un diseño superior de 2 columnas en desktop (eyebrow y título a la izquierda, párrafo explicativo a la derecha). La lista de los 7 servicios se separó en 2 columnas (ítems 1-4 en la izquierda, 5-7 en la derecha) en desktop, volviéndose vertical stack en mobile.
- **DEUDA 1 — Accessibility**: Se subió el puntaje de accesibilidad en Lighthouse de 93 a **100** tanto en Desktop como en Mobile mediante el uso de la etiqueta semántica `<main id="main-content">` y el ajuste del contraste del color de acento (`--accent`) a `#955F17` (relación de contraste superior a 4.5:1) y el footer a `text-white/60`.
- **DEUDA 2 — Limpieza de `any`**: Se eliminó el uso de tipo `any` en las variantes de Framer Motion de `CatalogueScene.tsx` y `ServiciosSection.tsx`, importando el tipo `Variants` de `framer-motion` para garantizar TypeScript estricto.
- **DEUDA 3 — Verificaciones del checklist**:
  - **View-source SSR (✓)**: Se validó que el contenido principal de Hero, Logros, Featured, Catalogue y Servicios esté presente en el HTML estático pre-renderizado.
  - **Network mobile (✓)**: Se verificó que el elemento `<video>` de Hero no se carga en móvil, mostrando únicamente la imagen estática.
  - **Cero inline styles (✓)**: Se ejecutó búsqueda de estilos inline en `src/components/home/` con 0 incidencias.
- **Generación de Entregables**: Se corrieron auditorías completas de Lighthouse y se guardaron los reportes HTML/JSON en `docs/baseline/F3_cierre_lighthouse/`. Se actualizaron las capturas de pantalla de los 9 estados en `docs/baseline/F3_cierre_screenshots/`.

### Qué se decidió
- Establecer `#955F17` como el color de acento oficial para el tema claro (Editorial v1) para cumplir con el estándar WCAG AA de contraste (4.84:1).
- Utilizar el separador de dos puntos en los títulos de películas como un patrón sistémico para evitar cortes de palabras inapropiados en cards.

### Qué quedó pendiente
- Avanzar a la **Fase 4: Rediseño de Ficha de Película** en la siguiente sesión.

### Métricas relevantes
- **Lighthouse Mobile**: Performance **90**, Accessibility **100**, Best Practices **100**, SEO **100**.
- **Lighthouse Desktop**: Performance **99**, Accessibility **100**, Best Practices **100**, SEO **100**.
- TypeScript strict check (`npx tsc --noEmit`): Completo sin errores (0 errores).
- Build de producción Next.js: Completo sin errores en ~2.6s.


## 2026-05-19 — Fix final Fase 3: typo Filmografía + alineación Servicios

### Qué se hizo
- **AJUSTE 1 (Typo):** Se verificó y aseguró la ortografía correcta en `CatalogueScene.tsx` ("FILMOGRAFÍA COMPLETA" con tilde en la primera "I").
- **AJUSTE 2 (Alineación):** Se resolvió de manera definitiva el overhang óptico de la letra "S" del título `SERVICIOS` en `ServiciosSection.tsx` aplicando la clase `pl-[0.04em]`. Esto desplaza milimétricamente el texto hacia la derecha para alinear su curva izquierda con la vertical exacta del grid lateral de la Home (el logo de la Navbar y el número de servicio `01`), de forma responsiva y sin recurrir a estilos inline ni alterar el tamaño `display-lg`.
- **Limpieza de Servidores y Caché:** Se detuvieron instancias previas del servidor de desarrollo, se limpió la caché de compilación (`rm -rf .next`) y se levantó un servidor limpio en `http://localhost:3001`.
- **Validación:** Se corrieron exitosamente `npm run build` y `npx tsc --noEmit` confirmando un estado de cero errores y cero advertencias.

### Qué se decidió
- **Fase 3 queda CERRADA de manera definitiva** tras la aplicación y verificación de estos dos ajustes finales de QA.

### Qué quedó pendiente
- Avanzar a la **Fase 4: Rediseño de fichas de películas** (`/peliculas/[slug]`).

### Métricas relevantes
- `npm run build` exitoso en ~2.2s.
- `npx tsc --noEmit` exitoso con 0 errores.

---

## 2026-05-19 — Ajuste de Estética y Párrafo en CatalogueScene

### Qué se hizo
- **Ajuste de Título:** Se incrementó el tamaño del título `"FILMOGRAFÍA COMPLETA"` en `CatalogueScene.tsx` aplicando el clamp dinámico `text-[clamp(2.5rem,5.3vw,5.3rem)]` (tamaño editorial premium similar a `display-md` pero optimizado para no romper de renglón en desktop).
- **Ajuste de Párrafo:** Se removió la restricción de ancho `max-w-2xl` del encabezado del catálogo y se aplicó `max-w-none` al párrafo descriptivo para permitir que la línea `"Explorá nuestra trayectoria..."` se extienda de forma continua sin cortarse prematuramente.
- **Validación:** Se compiló y probó exitosamente en localhost, guardando las capturas y confirmando cero errores en el build.

### Qué se decidió
- Permitir la visualización fluida de los textos del encabezado del catálogo sin cortes para priorizar el impacto visual de tipo gran formato solicitado por el usuario.

### Qué quedó pendiente
- Avanzar a la **Fase 4: Rediseño de fichas de películas** (`/peliculas/[slug]`).

### Métricas relevantes
- `npm run build` exitoso en ~2.3s.
- `npx tsc --noEmit` exitoso con 0 errores.

---

## 2026-05-19 — Ajuste de Estética y Alineación en Hero Statement

### Qué se hizo
- **Ajuste de Decoración:** Se eliminó la línea horizontal divisoria (`w-8 h-[1px]`) que se mostraba junto a la palabra `"Buenos Aires"` en el meta-header de [HeroVideo.tsx](file:///Users/joserey/Documents/@Trabajo/Material%20Haddock/src/components/home/HeroVideo.tsx).
- **Ajuste de Alineación:** Se centraron horizontalmente los tres renglones (`Label` de localización/años y el título de dos renglones de `Heading`) en el ancho de la cabecera modificando la alineación del contenedor a `text-center flex flex-col items-center`.
- **Ajuste de Tipografía:** Se modificó la tipografía del título del Hero a sans-serif (`font="sans"`) utilizando la fuente `Inter` en peso bold (`font-bold`, peso 700), configurando un tamaño exacto de `56px` y un interlineado de `56px` (`leading-[1.0]`) mediante clamp responsivo (`text-[clamp(2rem,3.9vw,56px)]`). Esto garantiza máxima nitidez, presencia y legibilidad del statement sobre la reproducción del video.
- **Validación:** Se compiló y probó exitosamente en localhost, guardando capturas de pantalla de la alineación y verificando el build de producción limpio.

### Qué se decidió
- Adoptar una disposición totalmente centrada, en tipografía sans-serif (Inter), con peso bold 700, tamaño 56px y line-height 56px en pantallas de escritorio, garantizando la paridad tipográfica moderna requerida por el usuario.

### Qué quedó pendiente
- Avanzar a la **Fase 4: Rediseño de fichas de películas** (`/peliculas/[slug]`).

### Métricas relevantes
- `npm run build` exitoso en ~2.2s.
- `npx tsc --noEmit` exitoso con 0 errores.

---

<!-- 
PLANTILLA PARA NUEVAS ENTRADAS:

## YYYY-MM-DD — Título corto descriptivo

### Qué se hizo
- ...

### Qué se decidió
- ...

### Qué quedó pendiente
- ...

### Métricas relevantes (si aplica)
- ...

---
-->

