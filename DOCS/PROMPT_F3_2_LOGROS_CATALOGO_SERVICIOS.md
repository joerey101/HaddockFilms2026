# PROMPT F3.2 — Rediseño LogrosBanner + CatalogueScene + ServiciosSection

> Pegá este prompt completo en Antigravity. No saltees secciones. No improvises sobre el alcance: si surge una duda, pará y preguntá antes de avanzar.

---

## Contexto

Continuamos **Fase 3 — Rediseño de Home** del proyecto **Haddock Films 2026** (Next.js 15 + TS + Tailwind v4 + Framer Motion).

**Fase 3.1 ya está cerrada**: Hero (`HeroVideo`) y `FeaturedFilm` rediseñados con el sistema Editorial Claro. Las validaciones de métricas de 3.1 se hacen al final de Fase 3 completa (decisión explícita del PM).

Este prompt cubre **las 3 secciones restantes de la Home**:
1. `LogrosBanner`
2. `CatalogueScene`
3. `ServiciosSection`

Los primitivos de Fase 2 ya están creados y validados (`src/components/primitives/`). Reusalos.

Leé antes de tocar código: `DOCS/HANDOFF_antigravity.md`, `DOCS/MASTER_PLAN.md`, `DOCS/DESIGN_SYSTEM.md`, `DOCS/TECHNICAL_SPEC.md`.

---

## Decisión de producto importante (nueva)

**SIN FILTROS.** Ni en `CatalogueScene` (Home), ni en la futura página `/catalogo` (Fase 5).

- No hay toggle Películas/Series.
- No hay filtro por año.
- No hay filtro por género.

La grilla del catálogo es una **declaración visual editorial pura**. Si querés, los géneros se muestran como `<Tag>` decorativos no clicables. El usuario navega por el catálogo entero, no lo filtra.

---

## Norte conceptual

Mismas referencias aprobadas en 3.1:
1. **A24 Films** — tipografía display gigante, asimetría editorial, irreverencia controlada.
2. **MUBI** — cómo respiran las fichas, fotografía protagonista, jerarquía limpia.
3. **Criterion Collection** — autoridad cinéfila, jerarquía editorial pura, peso tipográfico.

**Principio rector tipográfico (sigue valiendo):**
> Que los títulos tengan peso y legibilidad. Que se lean de un vistazo. Playfair Display protagonista, Inter para lo funcional.

---

## Alcance — qué tocar y qué NO tocar

### Tocar
- `src/components/home/LogrosBanner.tsx` (o el equivalente con ese nombre)
- `src/components/home/CatalogueScene.tsx`
- `src/components/home/ServiciosSection.tsx`
- Sus estilos asociados si están en archivos separados.
- `src/app/page.tsx` SOLO para verificar el orden y composición de las secciones — no cambies el orden a menos que se solicite explícitamente acá.

### NO tocar
- `HeroVideo`, `FeaturedFilm`, `Navbar`, `Footer` (ya validados en 3.1 o fuera de scope).
- `src/components/primitives/*` — usalos tal cual. Si necesitás una variante que no existe, **pará y preguntá**.
- Tokens del `globals.css` — si necesitás un valor nuevo, agregalo al token primero. Cero valores mágicos.
- `films.ts` — la data tipada queda como está.

---

## Reglas duras (no negociables)

1. **Cero `style={{...}}` en código nuevo.** Todo con clases de Tailwind o primitivos.
2. **Cero valores mágicos.** Si en el JSX aparece `text-[63px]` o `#1A1A1A`, está mal. Usá tokens.
3. **Reduce-motion respetado.** `useReducedMotion()` de framer-motion donde haya animación.
4. **Primitivos siempre que exista uno.** `<Heading>`, `<Text>`, `<Label>`, `<Tag>`, `<Section>`, `<Container>`, `<Link>`, `<Button>`.
5. **Server Components por default.** `"use client"` solo si hay estado, eventos DOM, o hooks de framer-motion.
6. **Imágenes con `next/image`.** Nunca `<img>`. `sizes` siempre seteado.
7. **Semántica HTML correcta.** Hay un solo `<h1>` en toda la página (está en el Hero). Las secciones de Home usan `<h2>` para títulos de sección. Subtítulos `<h3>`.

---

## Especificación por sección

### 1. LogrosBanner

**Objetivo:** Que deje de ser un ticker genérico que se desliza. Tiene que ser una **declaración tipográfica de premios** — una afirmación cinéfila sólida.

**Referencia conceptual:** Cómo Criterion lista los reconocimientos en sus fichas, o cómo MUBI muestra premios en su footer de festivales. Estático, monumental, con jerarquía.

#### Desktop
- **Eliminar la animación de ticker/marquee horizontal**. No más scroll automático.
- Layout estático: los logros se muestran como una declaración visual.
- **Opción de layout (elegir la mejor según el copy actual)**:
  - **A) Grilla editorial**: 3-4 columnas, cada premio es una unidad tipográfica con el nombre del premio en `<Heading size="display-sm">` o `<Heading size="lg">` (según el peso visual que necesite), y la cantidad/categoría como `<Label>` arriba o debajo.
  - **B) Lista vertical declarativa**: cada logro en una línea editorial larga, alineada a la izquierda, con separadores sutiles. Tipografía display, monumental.
  - **C) Statement único**: si los logros son pocos, una sola frase tipográfica gigante que los englobe ("Más de 40 premios internacionales. 12 selecciones en festivales clase A. 3 candidaturas al Óscar.") usando `<Heading size="display-lg">`.
- Elegí la opción que mejor se adapte al copy actual. Si el copy es 4-6 items, **A**. Si son más, **B**. Si son menos de 4, **C**.
- Fondo: puede ser `--color-bg` o `--color-surface`. **NO** fondo oscuro acá — eso lo guardamos para el Footer.
- Sin íconos. Sin emojis. Sin gráficos decorativos. Solo tipografía y espacio.

#### Mobile (regla: híbrido — tipografía mantiene peso, layout simplificado)
- Si elegiste A (grilla), en mobile pasa a 1 columna, stack vertical.
- Si elegiste B (lista), se mantiene casi igual, ajustando el tamaño tipográfico con clamp.
- Si elegiste C (statement único), el statement se mantiene grande, ajustado con clamp (no se achica desproporcionadamente).
- Padding lateral generoso (`<Container>` ya lo provee).

#### Microinteracciones
- **Animación de entrada por scroll**: fade-in + slight Y translate (15-20px) cuando entra al viewport. Easing del sistema. Duración 600-800ms.
- Reduce-motion: solo opacity, sin translate.
- Sin hover (es contenido informativo, no clickable).

#### Criterios de aceptación LogrosBanner
- No hay marquee/ticker. Solo movimiento de entrada por scroll.
- Tipografía con peso visible (mínimo `<Heading>` o `<Text size="xl">`).
- Cero `style={{...}}`.
- HTML estático contiene el texto de los premios (verificable en view-source).
- Pasa por axe-core sin issues críticos.

---

### 2. CatalogueScene (sección en Home — NO la página dedicada)

**Objetivo:** Que la grilla del catálogo en la Home sea memorable. No un grid de Bootstrap. Una pieza editorial que dé ganas de explorar.

**Importante:** Esta es la sección de "preview del catálogo" que aparece en la Home, no la página `/catalogo` completa (esa va en Fase 5). Acá probablemente se muestren **todas las películas/series, o un subset relevante** — verificá el comportamiento actual y mantenelo.

#### Estructura general
- **Título de sección**: `<Heading as="h2" size="display-md">` con peso editorial. Algo tipo "Catálogo" o "Todo el cine de Haddock" — usar el copy actual, no inventar.
- **Sin filtros**. (Decisión de PM: ver sección "Decisión de producto" arriba.)
- **Bajada opcional**: si existe en el copy actual, `<Text size="lg" tone="secondary">`.
- **Grilla de películas/series**.

#### Grilla — Desktop
- **3 columnas** en desktop ancho (≥1024px). 2 columnas en tablet (≥768px).
- **Ratio de cards**: vertical/portrait (2:3 o 3:4). Las imágenes son posters/stills verticales.
- **Card structure** (cada una):
  - Imagen del film (poster o still, lo que use hoy) con `next/image`, `sizes` correcto.
  - Bajo la imagen:
    - `<Label>` con tipo ("PELÍCULA" / "SERIE") en uppercase, color muted.
    - `<Heading as="h3" size="md">` con el título del film — Playfair, peso visible.
    - `<Label>` o `<Text size="sm" tone="muted">` con año.
    - Tags opcionales con `<Tag>` para géneros — máximo 2 por card, sin "Destacada" acá (eso es exclusivo de FeaturedFilm).
- **Sin botón "Ver más" en cada card.** La card entera es el link (`<Link>` envolvente, con focus visible).
- **Espaciado entre cards**: generoso (gap-8 a gap-12 según ritmo visual).

#### Grilla — Mobile
- **2 columnas en mobile ≥480px, 1 columna en mobile estrecho (<480px)**.
- O si preferís: **2 columnas siempre en mobile**, con cards más compactas. Elegí lo que respete mejor la legibilidad de los títulos (que sigan teniendo peso).
- Padding lateral del `<Container>`.
- Stack vertical de información dentro de cada card (imagen → label → título → año → tags).

#### Microinteracciones
- **Hover en desktop**:
  - Imagen con scale 1.02 (usar el token `--scale-editorial` que ya existe en `globals.css`, no inventar otro).
  - Título cambia sutilmente a color acento dorado.
  - Easing del sistema, duración 400ms.
- **Mobile**: sin hover, solo focus visible para teclado.
- **Animación de entrada por scroll**: cards entran con fade + Y translate, staggered (cada card con un delay incremental de 50-80ms). Solo las primeras 6-9 cards animan; las que están fuera del viewport inicial aparecen directo.
- **Reduce-motion**: deshabilitar scale, deshabilitar stagger, solo fade básico.

#### Orden de las cards
- Sin filtros, pero el orden importa. Sugerencia:
  - **Primero los films con `featured: true`** (los mismos 3 del FeaturedFilm de arriba — verificar si esto se siente redundante o no en la práctica).
  - **Después por año descendente** (más recientes primero).
- Si el comportamiento actual ya es bueno, mantenelo. Solo asegurate de que el orden sea **determinístico** (no aleatorio).

#### Criterios de aceptación CatalogueScene
- Grid responsive: 3 cols desktop / 2 cols tablet / 1-2 cols mobile.
- Cada card es un link al detalle del film (`/peliculas/[slug]` o equivalente).
- Cero filtros visibles.
- Cero `style={{...}}`.
- Imágenes con `next/image` y `sizes` correcto.
- Focus visible al navegar por teclado.
- Cero issues críticos de axe-core.

---

### 3. ServiciosSection

**Objetivo:** Que la sección de servicios deje de ser un bloque funcional de "qué hacemos" y pase a ser una declaración editorial sobre el oficio.

**Referencia conceptual:** Cómo A24 o Neon presentan su trabajo en bloques tipográficos densos pero respirados. No es una página de agencia con íconos de Lottie.

#### Estructura
- **Título de sección**: `<Heading as="h2" size="display-md">` — usar copy actual, posiblemente "Servicios" o algo similar.
- **Bajada/intro**: `<Text size="lg" tone="secondary">` con la descripción general de los servicios — usar copy actual.
- **Lista de servicios**:
  - Layout editorial — **NO grid de cards iguales con íconos**.
  - **Opción A**: lista vertical, cada servicio con `<Heading size="lg">` para el nombre + `<Text>` para la descripción. Numeración opcional como `<Label>` ("01", "02", "03").
  - **Opción B**: 2 columnas asimétricas — cada servicio ocupa una mitad, alternando posición vertical (uno arriba, el siguiente más abajo, scrollytelling editorial).
  - Elegí A si los servicios son 4+. Elegí B si son 2-3.
- **Sin íconos genéricos** (cámara, claqueta, etc.). Si querés un acento visual, usá tipografía o un separador editorial.

#### Desktop
- Layout según opción elegida arriba.
- Espaciado entre servicios: generoso (40-60px vertical).

#### Mobile
- **Stack vertical** sin excepciones.
- Tipografía de nombres de servicio mantiene peso (`<Heading size="lg">` se traduce a ~32-40px en mobile con clamp).
- Padding lateral del `<Container>`.

#### CTA al final
- Si la sección tiene un CTA (tipo "Contactanos para tu próximo proyecto"), usar `<Link variant="underlined">` o `<Button variant="primary">`. Decidir según peso visual deseado.

#### Microinteracciones
- Animación de entrada por scroll en cada servicio (fade + Y translate, staggered).
- Sin hover decorativo en los servicios (no son clickables salvo el CTA final).
- Reduce-motion: solo fade.

#### Criterios de aceptación ServiciosSection
- Cero íconos genéricos (Lottie, SVG decorativo de cámara, etc.).
- Tipografía editorial con peso real en los nombres de servicios.
- Cero `style={{...}}`.
- Si hay CTA, usa primitivo `<Link>` o `<Button>`.
- HTML estático contiene los nombres y descripciones de los servicios.

---

## Composición de la Home — verificación final

Una vez rediseñadas las 3 secciones, abrí `src/app/page.tsx` y verificá que el orden de la Home sea coherente. Orden esperado:

1. `<HeroVideo />` (con statement integrado, ya rediseñado en 3.1)
2. `<FeaturedFilm />` × 3 (con alternancia, ya rediseñado en 3.1)
3. `<LogrosBanner />` (rediseñado en este prompt)
4. `<CatalogueScene />` (rediseñado en este prompt)
5. `<ServiciosSection />` (rediseñado en este prompt)
6. `<Footer />` (intocable en este prompt)

Si el orden actual es diferente y tiene sentido, mantenelo y documentá la diferencia en la bitácora. Si no tiene sentido, ajustá al orden sugerido.

---

## Validación post-implementación

Antes de cerrar el prompt y avisar que está listo:

1. **Build limpio**: `npm run build` sin errores ni warnings.
2. **TypeScript**: `npx tsc --noEmit` sin errores.
3. **Dev server**: `npm run dev -- -p 3001` corre limpio.
4. **View-source manual**: confirmar que el HTML inicial contiene:
   - El texto de los logros (al menos uno).
   - Al menos el título de cada film en la grilla del catálogo.
   - Los nombres de los servicios.
5. **Screenshots** (guardar en `docs/baseline/F3_2_screenshots/`):
   - LogrosBanner desktop
   - LogrosBanner mobile (375px)
   - CatalogueScene desktop (vista de la grilla completa)
   - CatalogueScene mobile (375px)
   - ServiciosSection desktop
   - ServiciosSection mobile (375px)
6. **Lighthouse desktop + mobile** sobre la home completa después del cambio:
   - Performance ≥ 90 mobile, ≥ 95 desktop
   - Accessibility ≥ 95
   - Best Practices ≥ 95
   - SEO ≥ 85 (no debería bajar del baseline de 83)
   - Guardar reportes en `docs/baseline/F3_2_lighthouse/`
7. **Network mobile (DevTools, throttling 3G)**: confirmar que el video del Hero sigue sin cargar en mobile (verificar que F3.1 no rompió con estos cambios).

---

## Documentación obligatoria al cerrar

1. **Bitácora** (`DOCS/BITACORA_antigravity.md`):
   - Nueva entrada con fecha de hoy.
   - Qué se hizo, qué se decidió, qué quedó pendiente.
   - Métricas Lighthouse post-cambio.
2. **Handoff** (`DOCS/HANDOFF_antigravity.md`):
   - "Lo último que se hizo": rediseño 3 secciones restantes de Home.
   - "Lo próximo a hacer": **Validación visual completa de Home con el PM** + Refactor de estilos inline de la ficha de película (tarea pendiente del backlog).
   - Si la fase cambió, anotarlo (Fase 3 completa = listo para Fase 4).
3. **Design System** (`DOCS/DESIGN_SYSTEM.md`): si agregaste algún token nuevo o variante de primitivo, documentarlo en la sección correspondiente.

---

## Si te trabás

Si encontrás algo no especificado acá (un copy ambiguo, una variante de primitivo que no existe, decisión visual con varias opciones válidas y no estás seguro), **NO improvises**:

1. Dejá la sección actual sin tocar (rollback).
2. Documentá el bloqueo en chat.
3. Pedí decisión antes de continuar.

Lo mismo si descubrís que alguna sección actual tiene lógica que no se ve a simple vista (ej: data fetching, side effects). Documentá y preguntá.

---

## Resumen ejecutivo (TL;DR)

- Rediseñar `LogrosBanner` (sin ticker, declaración tipográfica), `CatalogueScene` (sin filtros, grilla editorial) y `ServiciosSection` (sin íconos genéricos, layout editorial).
- Usar primitivos. Cero estilos inline. Cero valores mágicos. Reduce-motion siempre.
- 6 screenshots + Lighthouse desktop/mobile + view-source check.
- Documentar todo al cerrar.

Cuando termines, traé:
- Resumen de qué cambió por sección.
- Los 6 screenshots.
- Reporte Lighthouse desktop + mobile.
- Resultado de `npm run build`.
