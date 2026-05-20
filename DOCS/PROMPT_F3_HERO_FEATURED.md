# PROMPT F3.1 — Rediseño Hero + FeaturedFilm (Editorial Claro)

> Pegá este prompt completo en Antigravity. No saltees secciones. No improvises sobre el alcance: si surge una duda, pará y preguntá antes de avanzar.

---

## Contexto

Estás trabajando en el proyecto **Haddock Films 2026** (Next.js 15 + TS + Tailwind v4 + Framer Motion). El estado actual y las decisiones aprobadas están en `DOCS/HANDOFF_antigravity.md`, `DOCS/MASTER_PLAN.md`, `DOCS/DESIGN_SYSTEM.md` y `DOCS/TECHNICAL_SPEC.md`. Leelos antes de tocar código.

Estamos en **Fase 3 — Rediseño de Home**. Los primitivos de Fase 2 ya están creados y validados en `/dev/components`. **Este prompt cubre SOLO dos secciones de la Home**: `HeroVideo` (+ `HeroStatement` si están unidos) y los bloques `FeaturedFilm`. Las demás secciones (`LogrosBanner`, `CatalogueScene`, `ServiciosSection`) **no se tocan en este prompt** — ni a favor ni en contra.

---

## Norte conceptual

Tres referencias visuales aprobadas para el tono:

1. **A24 Films** (a24films.com) — tipografía display gigante, asimetría editorial, irreverencia controlada.
2. **MUBI** (mubi.com) — cómo respiran las fichas, fotografía protagonista, jerarquía limpia.
3. **Criterion Collection** (criterion.com) — autoridad cinéfila, jerarquía editorial pura, peso tipográfico.

**Principio rector tipográfico aprobado para esta fase:**
> Que los títulos tengan **peso y legibilidad**. Que se lean de un vistazo. Display XL y Display LG son las herramientas — usalas sin miedo. Playfair Display protagonista. Inter para todo lo funcional.

**No estás inventando un tono.** Estás aplicando el que ya existe (`Editorial Claro`) con tipografía más confiada.

---

## Alcance — qué tocar y qué NO tocar

### Tocar
- `src/components/home/HeroVideo.tsx` (o como se llame el bloque del video del home)
- `src/components/home/HeroStatement.tsx`
- `src/components/home/FeaturedFilm.tsx` (los 3 bloques destacados que ya leen dinámicamente del JSON)
- Los archivos de estilos asociados, si existen.
- `src/app/page.tsx` solo si hace falta reordenar imports o reagrupar bloques de las dos secciones de scope.

### NO tocar
- `LogrosBanner`, `CatalogueScene`, `ServiciosSection`, `Navbar`, `Footer`. No cambies su markup, ni sus estilos, ni su orden en `page.tsx`.
- `src/components/primitives/*` — los primitivos están validados. **Usalos tal cual**. Si necesitás una variante que no existe (ej: un `Heading size="hero"` que no esté), **pará y preguntá** antes de inventarla.
- Tokens del `globals.css` — si necesitás un valor nuevo (color, espaciado, easing), agregalo al token primero y documentalo en `DESIGN_SYSTEM.md`. Cero valores mágicos en el JSX.
- Los datos en `films.ts` — la lógica de `featured: true` y alternancia ya funciona, no la rompas.

---

## Reglas duras (no negociables)

1. **Cero `style={{...}}` en código nuevo.** Todo con clases de Tailwind o componentes primitivos.
2. **Cero valores mágicos.** Si en el JSX aparece `text-[63px]` o `#1A1A1A`, está mal. Usá tokens o utilidades de Tailwind ya definidas.
3. **Reduce-motion respetado.** Cada animación de Framer Motion tiene que respetar `prefers-reduced-motion`. Usá el helper estándar o `useReducedMotion()` de framer-motion.
4. **Usar primitivos siempre que exista uno.** `<Heading>` en vez de `<h1 className="...">`. `<Text>` en vez de `<p className="...">`. `<Section>` y `<Container>` para layout. `<Link>` y `<Button>` para CTAs.
5. **Server Components por default.** Solo marcá `"use client"` si el componente tiene estado, eventos del DOM, o usa hooks de framer-motion.
6. **Imágenes con `next/image`.** Nunca `<img>`. `priority` solo en el LCP (típicamente el poster del Hero).

---

## Especificación por sección

### 1. HeroVideo + HeroStatement

**Objetivo:** Que un director europeo abra el sitio y entienda en 5 segundos quién es Haddock. La tipografía es la pieza principal, el video acompaña.

#### Desktop
- Video de fondo full-bleed (`HeroVideo` actual sigue funcionando — solo asegurate de que tenga `poster`, `muted`, `playsInline`, `autoPlay`, `loop` y un fallback en `<img>` con `priority`).
- Overlay sutil para legibilidad (no oscurecer el video, solo bajar contraste donde apoya el texto).
- **Statement tipográfico protagonista**:
  - Usar `<Heading size="display-xl">` (o equivalente) en Playfair Display.
  - Texto del statement: usar el copy actual del componente. No inventar copy nuevo.
  - Una palabra clave en *italic* (Playfair italic ya está cargada).
  - Color del texto: `--color-text-on-dark` sobre el video.
- Bajo el statement, una línea sutil de meta (`<Label>` o `<Text size="sm" tone="on-dark-secondary">`) con info contextual mínima si el copy actual la tiene.
- Sin botones en el Hero. La acción es seguir leyendo. (Si el actual tiene un CTA y lo querés conservar, dejalo con `<Button variant="ghost" tone="on-dark">`.)

#### Mobile (regla acordada: híbrido — tipografía igual de grande, layout simplificado)
- **Reemplazar el video por imagen estática** (`poster`) con animación sutil de entrada (fade + ligero scale, máx. 800ms, respeta reduce-motion).
  - La imagen debe ser un frame representativo del video — si no existe, usar el `poster` actual del `<video>`.
  - Usar `next/image` con `fill` y `priority`. Es el LCP.
- **Tipografía del statement no se achica desproporcionadamente.** Display-xl en desktop puede ser ~120px; en mobile puede ser ~64-72px (clamp). Sigue siendo gigante para mobile.
- Statement en una sola columna, centrado o alineado a la izquierda con padding lateral generoso.
- Sin overlay pesado — si el poster es oscuro, basta. Si es claro, usar un gradiente muy sutil desde abajo.

#### Criterios de aceptación Hero
- LCP en mobile < 2.5s (el poster es el LCP, debe tener `priority` y `sizes` bien seteados).
- Lighthouse Performance ≥ 90 mobile, ≥ 95 desktop **después** del cambio.
- El video de fondo NO carga en mobile (verificar con DevTools network throttling). Solo poster.
- Reduce-motion: con `prefers-reduced-motion: reduce`, el video no autoplay y la animación de entrada se reduce a fade básico sin scale.
- HTML estático contiene el texto del statement (no es renderizado solo por JS) — verificar con view-source.

---

### 2. FeaturedFilm (los 3 bloques destacados)

**Objetivo:** Que cada featured film se sienta como una doble página de revista de cine. Editorial, no e-commerce.

#### Desktop
- Layout asimétrico con alternancia automática izq/der (ya funciona — no romper la lógica).
- **Tipografía del título**: `<Heading size="display-lg">` en Playfair Display. Que pese. Si el título tiene una palabra clave para destacar, *italic*.
- **Año + tipo (Película / Serie)**: `<Label>` uppercase, tracking abierto, color muted. Va arriba o debajo del título según ritmo visual.
- **Sinopsis corta**: `<Text size="lg" tone="secondary">` máximo 3-4 líneas. No es el lugar para la sinopsis completa.
- **Tags** (género, "Destacada", etc.): `<Tag>` — usar la variante dorada solo para "Destacada" (uno por film). Resto en variante default.
- **CTA**: `<Link variant="underlined">` con texto tipo "Ver ficha →". Sin botón.
- **Imagen**: still del film (no poster con texto), con `next/image`. Ratio editorial (3:4 o 4:5). `sizes` correctamente seteado para que en desktop ocupe ~50% del viewport.
- **Espaciado entre featured films**: generoso (`<Section spacing="lg">` o equivalente). El blanco es respeto.
- **Sin sombras pesadas, sin cards con border-radius grande**. Las imágenes son el contenedor.

#### Mobile (regla acordada: stack vertical limpio)
- Cada FeaturedFilm se apila vertical: imagen arriba, texto debajo. **Siempre en ese orden**, sin alternancia.
- La imagen ocupa el ancho completo del container con padding lateral del `<Container>`.
- Tipografía del título sigue siendo grande — display-lg desktop puede ser ~96px; en mobile ~48-56px con clamp. Que se lea fuerte.
- Sinopsis: 2-3 líneas máximo. Si el copy actual es más largo, truncá con line-clamp.
- Tags y label se mantienen visibles.
- CTA del mismo tamaño que en desktop — es la acción principal del bloque.

#### Microinteracciones
- Hover en desktop: imagen con leve scale (1.02 máx, 400ms, easing del sistema). Título con cambio sutil de color al acento dorado.
- Mobile: sin hover. Solo focus visible para teclado.
- Reduce-motion: deshabilitar scale, solo fade de focus.

#### Criterios de aceptación FeaturedFilm
- Los 3 featured films del JSON renderizan correctamente.
- La alternancia izq/der sigue funcionando en desktop (films 1 y 3 igual lado, film 2 al revés — o como esté hoy).
- En mobile (≤768px) los 3 se ven en stack vertical idéntico, sin alternancia.
- Cero `style={{...}}`.
- Todos los textos usan primitivos `<Heading>`, `<Text>`, `<Label>`, `<Tag>`, `<Link>`.
- Lighthouse SEO no baja del baseline actual (83 mobile / 83 desktop).
- Cada `<Heading>` con `as="h2"` (semántica: hay un h1 en el Hero, los films son h2).

---

## Validación post-implementación

Antes de cerrar el prompt y avisar que está listo:

1. Correr `npm run build` — debe completar sin errores ni warnings.
2. Correr `npm run dev -- -p 3001` y abrir `http://localhost:3001`.
3. Verificar en DevTools:
   - View-source contiene el texto del statement y los títulos de los 3 featured films.
   - Network mobile: el `<video>` del hero NO se carga, solo el poster.
   - Mobile responsive (375px, 414px, 768px): tipografía sigue siendo grande y legible. No hay overflow horizontal.
4. Tomar 4 screenshots:
   - Hero desktop, Hero mobile (375px), FeaturedFilm desktop (uno solo basta), FeaturedFilm mobile (375px).
5. Guardar los screenshots en `docs/baseline/F3_screenshots/` para comparación posterior.

---

## Documentación obligatoria al cerrar

1. Agregar entrada en `DOCS/BITACORA_antigravity.md` con fecha de hoy, qué se hizo, qué se decidió, qué quedó pendiente.
2. Actualizar `DOCS/HANDOFF_antigravity.md`:
   - Cambiar "Lo último que se hizo".
   - Cambiar "Lo próximo a hacer" — debería quedar: "Continuar Fase 3 con LogrosBanner + CatalogueScene + ServiciosSection".
   - Si la fase cambió internamente, anotarlo.
3. Si agregaste algún token nuevo a `globals.css`, documentarlo en `DOCS/DESIGN_SYSTEM.md` sección correspondiente.

---

## Si te trabás

Si encontrás algo no especificado acá (un copy ambiguo, una variante de primitivo que no existe, un asset que falta), **NO improvises**. Hacé estas tres cosas en orden:

1. Dejá la sección actual sin tocar (rollback al estado pre-prompt).
2. Documentá el bloqueo en un comentario al final del prompt en chat.
3. Pedí decisión antes de continuar.

---

## Resumen ejecutivo (TL;DR)

- Rediseñar `HeroVideo+HeroStatement` y `FeaturedFilm` usando primitivos.
- Tipografía grande, con peso, legible. Playfair display protagonista.
- Mobile: tipografía sigue grande, layout simplificado, video reemplazado por poster.
- No tocar otras secciones. No tocar primitivos. Cero estilos inline. Cero valores mágicos.
- Documentar todo al cerrar.

Cuando termines, avisame con un resumen de qué cambió, los 4 screenshots, y el resultado de `npm run build`.
