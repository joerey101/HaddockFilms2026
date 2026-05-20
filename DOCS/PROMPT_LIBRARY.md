# PROMPT LIBRARY — Haddock Films 2026

> Biblioteca de prompts pre-armados para tareas concretas del proyecto. Pensados para copiar-pegar en Antigravity o Gemini cuando Claude no esté disponible.
>
> **Cómo usar:**
> 1. Identificá la tarea que querés hacer.
> 2. Buscá el prompt correspondiente acá.
> 3. Copiá el prompt completo incluyendo el bloque de "Contexto inicial".
> 4. Pegalo en Antigravity / Gemini.
> 5. Esperá el output.
> 6. Validá contra los criterios de aceptación.
> 7. Actualizá `BITACORA.md` y `HANDOFF.md`.
>
> **Regla:** Si una tarea no tiene prompt acá, **detenete y consultá a Claude antes de inventar**. Inventar prompts sobre la marcha es la principal fuente de divergencia del proyecto.

---

## 0. Bloque de contexto inicial — pegar SIEMPRE antes de cualquier prompt

```
Estás trabajando en el proyecto Haddock Films 2026. Antes de hacer cualquier cosa, leé estos archivos del repo en este orden:

1. /docs/HANDOFF.md (estado actual)
2. /docs/MASTER_PLAN.md (plan general)
3. /docs/TECHNICAL_SPEC.md (stack y convenciones)
4. /docs/DESIGN_SYSTEM.md (tokens y primitivos)
5. /docs/CONTENT_MODEL.md (estructura de datos)
6. /docs/SEO_PLAYBOOK.md (cuando la tarea toque metadata o JSON-LD)
7. /docs/BITACORA.md (qué se hizo recientemente)

Si encontrás contradicción entre estos documentos y mi pedido siguiente, DETENETE y preguntame. No inventes soluciones que diverjan del sistema documentado.

Reglas no negociables del proyecto:
- Stack: Next.js 15 (App Router) + TypeScript estricto + Tailwind v4 + Framer Motion.
- Server Components por default. "use client" solo si hace falta.
- Cero estilos inline (style={{...}}) salvo valores dinámicos calculados.
- Cero valores mágicos. Todo color/spacing/easing viene de tokens en globals.css.
- Cero violaciones de accesibilidad. prefers-reduced-motion siempre respetado.
- lang="es-AR" en HTML.
- Naming: PascalCase componentes, camelCase utilidades, kebab-case rutas y assets.
- Antes de agregar una dependencia nueva: consultar TECHNICAL_SPEC.md sección "Lo que NO se usa".

Mi pedido:
[ACÁ VA EL PROMPT ESPECÍFICO DE LA TAREA]
```

---

## 1. Prompts de Fase 0 — Medición

### `PROMPT_F0_LIGHTHOUSE_BASELINE`

**Cuándo usar:** Una vez, al iniciar el proyecto, para tener números baseline.

```
Tarea: Generar reporte Lighthouse baseline del sitio actual en producción.

Pasos:
1. Correr Lighthouse contra https://haddock-films2026.vercel.app/v1 en modo desktop.
2. Correr Lighthouse contra la misma URL en modo mobile (preset: mobile, throttling: simulated slow 4G).
3. Guardar ambos reportes como HTML en /docs/baseline/lighthouse-desktop-2026MMDD.html y /docs/baseline/lighthouse-mobile-2026MMDD.html.
4. Generar archivo /docs/baseline/BASELINE.md con los siguientes datos extraídos:

   ## Lighthouse Desktop ([fecha])
   - Performance: X
   - Accessibility: X
   - Best Practices: X
   - SEO: X
   - LCP: Xs
   - INP: Xms
   - CLS: X
   - FCP: Xs
   - TBT: Xms
   - TTFB: Xs

   ## Lighthouse Mobile ([fecha])
   [mismos campos]

   ## Top 5 oportunidades de mejora (según Lighthouse)
   [lista]

   ## Top 5 issues de accesibilidad
   [lista]

5. Si Lighthouse no se puede correr en este entorno, usá https://pagespeed.web.dev y extraé los datos manualmente del reporte.

Al terminar:
- Actualizar /docs/HANDOFF.md sección "Métricas baseline" con los números reales.
- Agregar entrada en /docs/BITACORA.md.
```

### `PROMPT_F0_BUNDLE_ANALYSIS`

```
Tarea: Analizar el bundle del proyecto Vite actual para identificar dependencias pesadas.

Pasos:
1. Clonar el repo localmente.
2. npm install
3. npm run build
4. Inspeccionar el output de Vite (carpeta dist/) y reportar:
   - Tamaño total del JS inicial (gzipped).
   - Top 5 chunks más pesados.
   - Top 5 dependencias del bundle (con su peso).
5. Si vite-bundle-visualizer no está instalado, instalarlo como devDependency y correrlo para generar el reporte visual.
6. Guardar el HTML del visualizer en /docs/baseline/bundle-visualizer.html.
7. Reportar resultados en /docs/baseline/BASELINE.md sección "Bundle".

NO modificar nada del código en esta tarea, solo medir.
```

### `PROMPT_F0_AXE_AUDIT`

```
Tarea: Auditoría de accesibilidad con axe-core.

Pasos:
1. Correr axe-core (vía extensión del navegador o axe-cli) sobre:
   - Home: /v1
   - Una ficha de película: /v1/el-tiempo-de-las-moscas
2. Para cada página, reportar:
   - Cantidad total de issues.
   - Issues críticos (impacto: critical).
   - Issues serios (impacto: serious).
   - Issues menores (impacto: moderate, minor).
3. Guardar reporte en /docs/baseline/axe-audit.md con lista completa de issues.

Al terminar: actualizar BITACORA.md.
```

---

## 2. Prompts de Fase 1 — Migración

### `PROMPT_F1_MIGRACION_NEXTJS`

**Cuándo usar:** Una sola vez, al inicio de Fase 1. Es la tarea más grande del proyecto.

```
Tarea: Migrar el proyecto de Vite (React 19) a Next.js 15 con App Router y TypeScript.

CONTEXTO IMPORTANTE:
- El proyecto actual está en /Users/[usuario]/proyectos/haddock (o donde corresponda) y usa Vite + React 19 + Tailwind v4 + Framer Motion.
- Hay que crear un proyecto Next.js 15 nuevo, migrar todo el código, y descartar el setup de Vite.
- Las rutas actuales (/v1, /v1/:slug, /v1/film/:id) deben mantener compatibilidad vía redirects 301.
- El dataset filmsData.js debe migrarse a films.ts tipado fuerte.
- Los componentes existentes deben migrarse manteniendo funcionalidad, pero tipados y, donde aplique, refactoreados para ser Server Components.

ALCANCE de esta tarea (NO incluye):
- Rediseño visual (eso es Fase 3+).
- Sumar features nuevos.
- Optimización profunda de imágenes (eso es subtarea propia).

ALCANCE de esta tarea (SÍ incluye):
1. Crear proyecto Next.js 15 con: TypeScript, App Router, Tailwind v4, ESLint, src/ directory, alias @/*.
2. Migrar globals.css con tokens (siguiendo DESIGN_SYSTEM.md sección 2-7).
3. Crear app/layout.tsx con:
   - lang="es-AR"
   - next/font/google para Playfair Display e Inter (preload, display swap).
   - Metadata default según SEO_PLAYBOOK.md sección "Home".
4. Migrar componentes:
   - HeroVideo → src/components/home/HeroVideo.tsx ("use client" si usa Framer Motion).
   - FeaturedFilm → src/components/home/FeaturedFilm.tsx.
   - CatalogueScene → src/components/catalogue/CatalogueGrid.tsx (renombrado).
   - Navbar → src/components/layout/Navbar.tsx.
   - Footer → src/components/layout/Footer.tsx (extraerlo de V1Home).
   - FilmPageV1 → src/app/peliculas/[slug]/page.tsx (refactor a Server Component + Client child donde haga falta).
   - LogrosBanner → src/components/home/LogrosBanner.tsx.
   - ServiciosSection → src/components/home/ServiciosSection.tsx.
5. Crear src/data/films.schema.ts con los tipos del CONTENT_MODEL.md sección 2.
6. Migrar filmsData.js → src/data/films.ts tipado.
7. Crear app/page.tsx (home) replicando lo que hace V1Home actualmente.
8. Crear app/peliculas/[slug]/page.tsx con:
   - generateStaticParams (todos los slugs).
   - generateMetadata async (según SEO_PLAYBOOK.md sección "Página de película").
9. Configurar next.config.mjs según TECHNICAL_SPEC.md sección 8 (redirects desde /v1, headers de seguridad).
10. Crear app/sitemap.ts (según SEO_PLAYBOOK.md sección 5).
11. Crear app/robots.ts (según SEO_PLAYBOOK.md sección 6).
12. Migrar todas las imágenes a usar next/image con sizes apropiado.
13. Eliminar el "border-radius: 0 !important" global. Si se quiere ese look, aplicar a componentes específicos con rounded-none.
14. Eliminar estilos inline (style={{...}}) de FilmPageV1 — pasar a clases Tailwind.
15. La imagen Cabezas_poster_theatrical.png (11MB) — si no se usa, eliminarla; si se usa, redimensionar a max 1920px lado mayor y comprimir.

VALIDACIÓN antes de cerrar:
[ ] npm run build sin errores ni warnings.
[ ] npm run typecheck sin errores.
[ ] npm run lint sin errores.
[ ] Home renderiza igual que la versión Vite (visual QA).
[ ] Cada ficha de película renderiza igual.
[ ] Click en una película desde la home navega correctamente.
[ ] View-source de una ficha muestra HTML real (no SPA vacía).
[ ] Open Graph preview funciona (probar con Twitter Card Validator).
[ ] /sitemap.xml devuelve XML válido con todas las películas.
[ ] /robots.txt devuelve contenido.
[ ] /v1 redirige 301 a /.
[ ] /v1/el-tiempo-de-las-moscas redirige 301 a /peliculas/el-tiempo-de-las-moscas.

ENTREGABLES:
- Repo migrado y funcionando localmente con npm run dev.
- Build de producción funcionando.
- Lista de problemas encontrados durante migración (en /docs/BITACORA.md).

Si algo del setup actual no se entiende o tiene inconsistencias con el plan, PARAR y preguntar antes de inventar.
```

### `PROMPT_F1_IMAGE_OPTIMIZATION`

```
Tarea: Optimización masiva de imágenes en /public.

Pasos:
1. Listar todos los archivos en /public/assets y /public/films (y subcarpetas).
2. Para cada imagen:
   - Si pesa > 800kb: redimensionar a max 2000px lado mayor y comprimir a calidad 82.
   - Si pesa > 500kb pero es ≤ 800kb: comprimir manteniendo dimensiones.
   - Generar versión WebP de cada JPG/PNG (mantener original para fallback solo si el componente lo requiere).
3. Para el video Haddock-videohome.mp4:
   - Verificar peso. Si > 5MB, recomprimir con ffmpeg a H.264 calidad 23, máximo 5MB.
   - Generar versión WebM (VP9 calidad 31).
   - Generar poster (primer frame) como AVIF.
4. Para la imagen Cabezas_poster_theatrical.png (~11MB):
   - Si se usa en el sitio: redimensionar a 1920px lado mayor, convertir a WebP, debería pesar < 300kb.
   - Si no se usa: ELIMINAR.

Comandos de referencia:
- Resize + compress JPG: `cwebp -q 82 input.jpg -o output.webp` o con `sharp` programáticamente.
- Comprimir MP4: `ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset slow -an output.mp4`.
- Comprimir WebM: `ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 31 -b:v 0 -an output.webm`.

Al terminar:
- Reportar tabla en BITACORA.md: archivo, peso antes, peso después.
- Total de bytes ahorrados.
- Verificar que ninguna imagen del sitio quedó rota visualmente.
```

### `PROMPT_F1_REFACTOR_FEATURED_FILMS`

```
Tarea: Refactor del bloque de Featured Films en la home.

CONTEXTO:
En V1Home.jsx hay 3 bloques que hacen filmsData.find() repetido para 3 películas hardcodeadas. Esto debe pasar a un map iterativo basado en una propiedad `featured` y `featured_order` del schema (ya documentada en CONTENT_MODEL.md).

Pasos:
1. En src/data/films.ts: marcar `featured: true` y `featured_order: N` en 3 películas. Por defecto:
   - El tiempo de las moscas: featured_order 1 (layout left)
   - Atrapados: featured_order 2 (layout right)
   - Elena sabe: featured_order 3 (layout left)
2. Crear helper en src/lib/films.ts:
   ```ts
   export function getFeaturedFilms(): Film[] {
     return films
       .filter(f => f.featured)
       .sort((a, b) => (a.featured_order ?? 0) - (b.featured_order ?? 0));
   }
   ```
3. En app/page.tsx: usar getFeaturedFilms() y map en lugar de los 3 bloques repetidos. Alternar layout left/right automáticamente según el índice (par = left, impar = right).
4. Mantener el comportamiento visual idéntico.

VALIDACIÓN:
[ ] La home renderiza 3 featured films, mismas que antes.
[ ] El layout alterna correctamente.
[ ] Cambiar `featured` en otra película la suma sin tocar el componente.
[ ] npm run build sin errores.
```

---

## 3. Prompts de Fase 2 — Sistema de diseño

### `PROMPT_F2_PRIMITIVES`

```
Tarea: Crear los componentes primitivos del sistema de diseño.

Crear en src/components/primitives/ los siguientes archivos según las especificaciones del DESIGN_SYSTEM.md sección 8:

1. Container.tsx — props: { children, variant?: 'default' | 'tight' }
2. Section.tsx — props: { children, spacing?: 'default' | 'sm' | 'lg' }
3. Heading.tsx — props: { children, as?: 'h1'|'h2'|'h3'|'h4', size?: keyof typeof typographyScale, font?: 'serif'|'sans' }
4. Text.tsx — props: { children, size?: 'body-lg'|'body'|'body-sm', tone?: 'primary'|'secondary'|'muted', as?: 'p'|'span' }
5. Label.tsx — props: { children, as?: 'span'|'div' }
6. Link.tsx — props: { href, children, variant?: 'default'|'underlined'|'accent', external?: boolean } — wrappea next/link, abre nueva pestaña si external.
7. Button.tsx — props: { children, variant?: 'primary'|'ghost'|'link', size?: 'sm'|'md'|'lg', onClick?, disabled? }
8. Tag.tsx — props: { children, tone?: 'default'|'accent' }

REGLAS:
- Todos TypeScript estricto, sin any.
- Todos Server Components salvo Button (que probablemente sea Client por el onClick).
- Cero estilos inline. Solo clases Tailwind con tokens.
- Cada componente exporta el tipo de props como `ComponentNameProps`.
- Cada componente tiene `forwardRef` si es razonable que reciba ref.
- Composición con clsx + tailwind-merge (instalar como `clsx` y `tailwind-merge`).

Crear src/lib/cn.ts:
```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

VALIDACIÓN:
[ ] Los 8 componentes existen y compilan.
[ ] Tipos exportados.
[ ] Ningún componente usa style={{...}} salvo casos justificados.
[ ] Crear src/app/dev/components/page.tsx que renderice TODOS los primitivos en TODAS las variantes para QA visual.
```

### `PROMPT_F2_REFACTOR_INLINE_STYLES`

```
Tarea: Eliminar todos los estilos inline (style={{...}}) del proyecto.

Archivos prioritarios:
- src/app/peliculas/[slug]/page.tsx (era FilmPageV1.jsx) — tiene muchísimos style={{}}.
- Cualquier otro componente migrado de la versión Vite que conserve inline styles.

Reemplazar cada style por:
- Clases Tailwind con tokens del sistema.
- Si el valor es dinámico (ej: backgroundImage con URL), mantener style PERO usar variables CSS donde sea posible:
  ```tsx
  <div className="bg-cover bg-center" style={{ backgroundImage: `url(${src})` }}>
  ```

VALIDACIÓN:
[ ] grep "style={{" en src/ devuelve 0 resultados, o solo casos justificados (URLs dinámicas).
[ ] Apariencia visual idéntica al estado anterior.
[ ] npm run build sin errores.
```

---

## 4. Prompts de Fase 3 — Hero y home

### `PROMPT_F3_HERO_REDESIGN`

```
Tarea: Rediseñar el Hero de la home.

PRINCIPIOS (no negociables):
- Tipografía protagonista: el título "Haddock Films" o "Historias que trascienden" debe ser el elemento más fuerte visualmente. Display tipográfico gigante (clamp(5rem, 14vw, 22rem)) en Playfair Display.
- Video de fondo (Haddock-videohome.mp4) con overlay sutil para legibilidad. Sin autoplay si reduce-motion activo (mostrar poster estático).
- Animación de entrada: fade + leve translateY (10-20px) en el título, duración 900ms, easing var(--ease-expo), delay 100ms.
- Sin scroll cue cursi tipo "scroll down ↓". Si hace falta indicar scrolleabilidad, usar un mínimo (línea fina inferior animada, sutil).
- LCP debe ser < 2.5s mobile. El video NO es LCP; el poster del video o un título sí pueden serlo.

IMPLEMENTACIÓN:
- src/components/home/HeroVideo.tsx ("use client" por Framer Motion).
- Video con poster (poster.jpg generado del primer frame del MP4).
- Si prefers-reduced-motion: replace video con la imagen poster estática.
- Layout: video full-screen detrás, contenedor de texto con max-width controlado, posicionado en la parte inferior izquierda (asimétrico).
- Texto:
  - Kicker (label pequeño uppercase): "Haddock Films · Productora"
  - Display: el tagline elegido por el cliente. Default: "Historias que trascienden."
  - Sin botones de CTA pesados (la nav y el scroll dicen lo que hay que hacer).
- Margen inferior del hero: var(--space-editorial-lg).

VALIDACIÓN:
[ ] LCP < 2.5s mobile en Lighthouse.
[ ] Animación se desactiva con reduce-motion.
[ ] Video tiene aria-hidden="true".
[ ] El kicker tiene contraste WCAG AA sobre el video (overlay si hace falta).
[ ] Mobile: el display no se corta ni rompe el layout.
```

### `PROMPT_F3_FEATURED_FILMS_EDITORIAL`

```
Tarea: Rediseñar el componente FeaturedFilm con tratamiento editorial.

PRINCIPIOS:
- Asimetría intencional: alternar imagen-izquierda / texto-derecha y viceversa.
- La imagen ocupa 55-65% del ancho en desktop; el texto, el resto.
- Tipografía del título: clamp(2.5rem, 6vw, 5rem), Playfair Display, line-height 0.95, letter-spacing -0.03em.
- Sinopsis: 3-5 líneas máximo en el card (no la sinopsis completa). Usar synopsis_short si existe; sino, primeras 200 chars de synopsis.
- Año + tipo: como label uppercase con tracking 0.4em, encima del título.
- CTA mínimo: "Ver película →" como Link primitive con underline animado en hover.
- Hover state sobre la imagen: leve scale (1.02) en 400ms.
- Click en TODO el bloque navega a la ficha.
- Scroll-linked sutilidad: opcional, leve parallax de la imagen (translateY 30px sobre el rango de scroll del bloque). Solo si no perjudica performance.

IMPLEMENTACIÓN:
- src/components/home/FeaturedFilm.tsx ("use client" si tiene parallax/Framer).
- Props tipadas: { film: Film, layout: 'left' | 'right' }.
- Usar next/image con priority=false (no es LCP) y sizes apropiado.

VALIDACIÓN:
[ ] Layout alterna left/right correctamente entre instancias.
[ ] Hover scale funciona y respeta reduce-motion.
[ ] Click en cualquier parte del bloque navega.
[ ] Mobile: layout colapsa a single column con la imagen arriba y texto abajo.
[ ] Sin layout shift al cargar imágenes.
```

---

## 5. Prompts de Fase 4 — Ficha de película

### `PROMPT_F4_FILM_PAGE_REDESIGN`

```
Tarea: Rediseñar la página de detalle de película.

ESTRUCTURA OBJETIVO (top to bottom):
1. Hero con still o poster a sangre, overlay degradado para legibilidad, título en display grande sobre el still.
2. Bloque tráiler + sinopsis editorial (split 50/50 desktop, stacked mobile).
3. Ficha técnica como tabla editorial (NO bullet list).
4. Reconocimientos con laureles + lista de premios.
5. Galería de stills (grilla asimétrica + lightbox).
6. Elenco (cards horizontales con foto + nombre + personaje).
7. Navegación anterior/siguiente (footer de la ficha).

DETALLES POR BLOQUE:

Hero:
- Imagen: film.hero || film.stills[0] || film.poster.
- Altura: clamp(280px, 56vw, 680px).
- Overlay: gradient lateral (oscuro a transparente) + gradient inferior (oscuro a transparente).
- Título: Playfair Display, clamp(2.5rem, 8vw, 7rem), line-height 0.9, color #F0EDE8.
- Kicker arriba del título: año · tipo · episodios (si serie).
- Animación de entrada: opacity + translateY 20px, 900ms, ease-expo, delay 200ms.

Tráiler + sinopsis (desktop split):
- Izquierda (40-50%): tráiler embebido. Inicialmente muestra poster custom con botón play prominente. Al click, carga iframe de YouTube (lazy). Aspect ratio 16:9.
- Derecha (50-60%): sinopsis en Playfair italic para primer párrafo (drop-cap opcional), Inter para resto. Padding generoso.

Ficha técnica:
- Tabla con border-bottom hairline (0.5px, rgba(26,26,26,0.08)) por row.
- Cada row: label (uppercase 11px tracking 0.15em opacity 0.35) a la izquierda, valor (13px font-weight 300) a la derecha.
- Campos a mostrar (si existen):
  - Director
  - Guion
  - Producción
  - Elenco principal
  - País
  - Año
  - Duración
  - Idioma
  - Distribuidora
- NO mostrar campos vacíos (return null si !value).

Reconocimientos:
- Si film.awards existe y tiene length > 0:
  - Título de bloque "Reconocimientos" como Heading h2.
  - Lista visual: por cada award, si tiene festival con laurel oficial → ícono de laurel + nombre + año + resultado.
  - Si no hay assets de laureles, lista tipográfica limpia.

Galería de stills:
- Grilla CSS asimétrica (no todos los stills del mismo tamaño).
- Click en still abre lightbox: overlay full-screen oscuro, imagen centrada, flechas izq/der, tecla ESC cierra, tecla flecha navega.
- Lightbox accesible: focus trap, role="dialog", aria-label.
- Prefetch siguiente still cuando se abre el actual.

Elenco:
- Si film.cast es array de strings: render simple en grid de pills/cards con nombre.
- Si film.cast es array de CastMember: cards con foto + nombre + personaje.

Navegación anterior/siguiente:
- Bloque al final con dos columnas: ← Anterior | Siguiente →.
- Cada lado muestra título de la película + año.
- Click navega a /peliculas/{slug}.

JSON-LD:
- Inyectar JSON-LD Movie según SEO_PLAYBOOK.md sección 3.

VALIDACIÓN:
[ ] generateMetadata genera title, description, OG image según la película.
[ ] JSON-LD válido (validator.schema.org).
[ ] Sin layout shift.
[ ] Lighthouse SEO 95+ en al menos 3 fichas distintas.
[ ] Trailer no carga iframe hasta el click (Network tab muestra no requests a YouTube en initial load).
[ ] Lightbox cierra con ESC, navega con flechas.
[ ] Mobile: toda la estructura es navegable, ningún bloque rompe.
```

---

## 6. Prompts de Fase 5 — Catálogo

### `PROMPT_F5_CATALOGUE_GRID`

```
Tarea: Implementar la grilla de catálogo con filtros y transiciones FLIP.

ESTRUCTURA:
- Header de sección con título "Catálogo" o "Todas las producciones".
- FilterBar: pills horizontales — Todas | Películas | Series | Documentales | Cortometrajes (mostrar solo categorías que tienen al menos 1 film en el dataset).
- Grilla: cards de FilmCard.
- Empty state si filtro no devuelve resultados: mensaje tipográfico limpio "No hay producciones en esta categoría".

FilterBar:
- Pills de Label primitive con variant accent cuando activo.
- Click setea filtro en URL: /catalogo?type=pelicula.
- Estado del filtro leído de useSearchParams.

Grilla:
- CSS Grid: minmax(280px, 1fr) en mobile, 3 columnas en md, 4 columnas en lg.
- Gap: clamp(1.5rem, 3vw, 3rem).
- FilmCard:
  - Poster a sangre con aspect-ratio 2:3.
  - Hover: leve scale (1.03), 400ms, ease-expo.
  - Overlay textual al hover: título + año + tipo. Sobre overlay oscuro semi-transparente.
  - Click navega a /peliculas/{slug}.

Transición FLIP entre filtros:
- Usar layout y AnimatePresence de Framer Motion.
- Cuando cambia el filtro: animar exit (opacity 0, scale 0.95) → entrar nuevos (opacity 1, scale 1) con stagger leve (0.03s entre cards).
- Respeta reduce-motion.

VALIDACIÓN:
[ ] URL refleja filtro (?type=pelicula) y es linkeable.
[ ] Recargar página con ?type=serie aplica el filtro.
[ ] Transición FLIP funciona y respeta reduce-motion.
[ ] Empty state visible cuando no hay resultados.
[ ] Mobile: grilla colapsa a 2 columnas, hover no aplica (touch).
```

---

## 7. Prompts de Fase 6 — Detalles que cierran

### `PROMPT_F6_NOT_FOUND_PAGE`

```
Tarea: Crear página 404 con tono editorial.

Implementación:
- src/app/not-found.tsx.
- Layout: hero con tipografía gigante "404" o "Esta página no existe" en Playfair Display.
- Subtexto: "Pero el cine sigue ahí. ¿Volvemos al catálogo?"
- Link a /catalogo y a / (home).
- Sin imagen de stock cursi. Solo tipografía.
- Heredando navbar y footer del layout.

VALIDACIÓN:
[ ] Acceder a URL inexistente muestra esta página.
[ ] Status code 404 (no 200).
[ ] Links funcionan.
[ ] Accesible (heading hierarchy correcta).
```

### `PROMPT_F6_ACCESSIBILITY_PASS`

```
Tarea: Auditoría y arreglo final de accesibilidad.

Pasos:
1. Correr axe-core sobre cada ruta principal:
   - /
   - /catalogo
   - /peliculas/[slug] (3 al azar)
   - /servicios
   - /not-found
2. Generar reporte axe-final.md en /docs/.
3. Arreglar TODOS los issues críticos y serios.
4. Para issues moderados: arreglar si no implica refactor profundo. Si implica, documentar como deuda técnica.

Reglas adicionales a verificar manualmente:
[ ] Skip link presente y funcional al primer Tab.
[ ] Navegación completa por teclado (Tab, Shift+Tab, Enter, Esc en lightbox).
[ ] Focus visible en TODOS los elementos interactivos.
[ ] Lightbox con focus trap.
[ ] Todas las imágenes con alt descriptivo (no "imagen", no vacío salvo decorativas).
[ ] Video del hero con aria-hidden="true".
[ ] Heading hierarchy correcta: 1 H1 por página, H2 hijos, sin saltos.
[ ] Contraste WCAG AA en todo el texto (verificar con DevTools).
[ ] prefers-reduced-motion respetado en TODAS las animaciones.
[ ] aria-current="page" en navbar activo.
[ ] role="dialog" + aria-modal="true" en lightbox.

VALIDACIÓN:
[ ] axe-core: 0 issues críticos, 0 serios.
[ ] Lighthouse Accessibility 95+ en todas las rutas.
[ ] Test manual con teclado: completar un flujo (home → catálogo → ficha → play trailer → cerrar) sin tocar mouse.
```

---

## 8. Prompts de mantenimiento y operación

### `PROMPT_ADD_NEW_FILM`

**Cuándo usar:** Cada vez que el cliente quiere agregar una película nueva.

```
Tarea: Agregar una nueva película al catálogo.

DATOS QUE NECESITO (pedirlos al usuario antes de empezar):
- Título oficial:
- Año:
- Tipo (pelicula/serie/documental/cortometraje):
- Director(es):
- Sinopsis completa:
- Sinopsis corta (1 frase, máx 155 chars):
- Elenco principal (lista de nombres):
- Trailer URL (YouTube/Vimeo):
- Géneros:
- Países:
- Duración (minutos) o cantidad de episodios:
- Premios/reconocimientos (si los hay):
- Carpeta con assets (poster, hero, stills) — necesito tener acceso a los archivos.

Pasos:
1. Generar slug en kebab-case sin acentos.
2. Verificar que el slug no exista en src/data/films.ts. Si existe, agregar año al final.
3. Crear carpeta /public/films/{slug}/.
4. Procesar assets siguiendo CONTENT_MODEL.md sección 5:
   - poster.webp (800×1200, <200kb).
   - hero.webp (1920×1080, <400kb) si fue provisto.
   - still-01.webp, still-02.webp, etc. (1920×1080, <350kb cada uno).
5. Agregar objeto Film al final del array films en src/data/films.ts, siguiendo el schema completo.
6. Si la película va a aparecer destacada en home, marcar featured: true y featured_order: N (y desmarcar uno existente si ya hay 3).
7. npm run typecheck → sin errores.
8. npm run build → verificar que el sitemap incluye la nueva URL.
9. npm run dev → verificar visualmente:
   - La ficha /peliculas/{slug} renderiza correctamente.
   - El catálogo la muestra.
   - OG preview generada correctamente.
10. Commit: "feat(content): add [Título] ([Año])".

VALIDACIÓN:
[ ] Ficha renderiza sin warnings.
[ ] JSON-LD válido para la nueva película.
[ ] Sitemap incluye la nueva URL.
[ ] Alt text presente en todas las imágenes.
```

### `PROMPT_PERFORMANCE_AUDIT`

```
Tarea: Auditoría de performance regular.

Pasos:
1. Correr Lighthouse mobile sobre:
   - / (home)
   - /catalogo
   - /peliculas/[slug-mas-pesada] (la que tenga más stills).
2. Para cada uno, registrar Performance score, LCP, INP, CLS.
3. Comparar contra los objetivos (HANDOFF.md sección "Métricas objetivo").
4. Si alguno regresionó vs la última auditoría:
   - Identificar la causa (usualmente: imagen nueva pesada, dependencia nueva, animación mal escrita).
   - Proponer fix concreto.
5. Documentar resultados en /docs/audits/audit-YYYYMMDD.md.

Si todo verde: actualizar BITACORA.md confirmando que la auditoría pasó.
```

### `PROMPT_NEW_COMPONENT_CHECKLIST`

```
Tarea: Crear un componente nuevo siguiendo el sistema.

Antes de escribir código:
[ ] ¿Existe un primitivo o componente similar que puedo reutilizar o componer? Si sí, usalo.
[ ] ¿Necesito tokens nuevos? Si sí, agregarlos primero a globals.css y actualizar DESIGN_SYSTEM.md.
[ ] ¿Server o Client Component? Default Server. Solo Client si necesito interactividad / hooks / Framer Motion.
[ ] ¿Dónde va el archivo? Ver TECHNICAL_SPEC.md sección 2 (estructura de carpetas).

Reglas al escribir:
- TypeScript estricto, props tipadas y exportadas.
- Cero estilos inline.
- Solo tokens del sistema (sin colores hex random, sin px mágicos).
- forwardRef si tiene sentido.
- Default export para el componente principal, named exports para tipos.

Antes de commitear:
[ ] npm run typecheck pasa.
[ ] npm run lint pasa.
[ ] Visual QA en mobile y desktop.
[ ] Accesibilidad mínima: labels en interactivos, alt en imágenes, role si custom.
[ ] Si tiene animación: respeta reduce-motion.
[ ] Componente agregado a /dev/components si es un primitivo o widget reutilizable.
[ ] BITACORA.md actualizado.
```

---

## 9. Cuándo NO usar estos prompts

**Detenete y consultá a Claude (o a un humano experimentado) si:**

- El pedido del cliente es ambiguo o contradice lo documentado.
- Necesitás agregar una dependencia que no está en TECHNICAL_SPEC.md.
- Vas a tocar archivos de configuración core (next.config, tsconfig, package.json) más allá de lo que el prompt indica.
- Encontrás un trade-off entre performance, accesibilidad y diseño que no está cubierto.
- Algo "no compila" después de seguir el prompt al pie de la letra.
- El cliente pide cambiar una decisión fundacional (stack, tono visual, idioma).

**Regla general:** Si dudás, **no inventes**. Es preferible una pausa de 15 minutos para consultar que dos días corrigiendo un camino equivocado.

---

## 10. Versionado de esta biblioteca

| Versión | Fecha | Cambio |
|---------|-------|--------|
| 1.0 | 2026-05-18 | Biblioteca inicial. Prompts para Fases 0-6 + operación y mantenimiento. |
