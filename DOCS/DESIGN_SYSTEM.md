# DESIGN SYSTEM — Haddock Films 2026

> Sistema de diseño completo del proyecto. Tokens, primitivos, principios.
>
> **Regla:** Si un componente nuevo necesita un color, espaciado, easing o cualquier valor que no esté acá, **primero se agrega al sistema**, después se usa. Cero valores mágicos.

---

## 1. Filosofía visual

**Editorial Claro.** Tono inspirado en publicaciones de cine de autor: Criterion Collection, MUBI, Sight & Sound, The Criterion Channel. La tipografía es protagonista, la fotografía respira, el dorado aparece con discreción.

### Principios

1. **La tipografía es la mitad del diseño.** Playfair Display en cuerpos grandes, italic para acentos emocionales, Inter para todo lo funcional.
2. **El blanco no es vacío, es respeto.** Espaciado generoso. Nada apretado.
3. **El movimiento sirve a la narrativa, no decora.** Animaciones expresivas pero cortas (200-600ms). Easing siempre `cubic-bezier(0.16, 1, 0.3, 1)` salvo excepción justificada.
4. **El dorado es acento, no protagonista.** Aparece en hovers, en una palabra, en un underline. Nunca en bloques grandes.
5. **Asimetría intencional.** Layouts editoriales alternan izquierda/derecha. La simetría perfecta aburre.
6. **Detalle tipográfico sobre adorno gráfico.** Antes que un ícono, una palabra bien compuesta.

---

## 2. Tokens — Color

Variables CSS en `app/globals.css`. Tailwind v4 las expone como utilidades.

```css
:root {
  /* Fondos */
  --color-bg:           #f9f9f9;   /* Fondo principal */
  --color-surface:      #f3f3f3;   /* Superficies elevadas (cards) */
  --color-surface-alt:  #ffffff;   /* Superficies aún más altas */
  --color-bg-dark:      #1A1A1A;   /* Bloques oscuros (footer, hero overlay) */

  /* Texto */
  --color-text:           #1A1A1A;                      /* Texto principal sobre fondo claro */
  --color-text-secondary: rgba(26, 26, 26, 0.60);       /* Texto secundario */
  --color-text-muted:     rgba(26, 26, 26, 0.35);       /* Labels, metadata */
  --color-fg-on-dark:     #F0EDE8;                      /* Texto sobre fondo oscuro */
  --color-fg-on-dark-muted: rgba(240, 237, 232, 0.60);  /* Texto secundario sobre fondo oscuro */

  /* Acento */
  --color-accent:        #955F17;   /* Dorado / bronce oscuro — Haddock (ajustado para accesibilidad AA) */
  --color-accent-hover:  #7C4F13;   /* Hover sobre acento */

  /* Bordes */
  --color-border:        rgba(26, 26, 26, 0.08);
  --color-border-strong: rgba(26, 26, 26, 0.20);

  /* Estados */
  --color-focus-ring:    #955F17;   /* Ring de focus (accesibilidad) */
  --color-error:         #B23A48;
  --color-success:       #2A6B4F;
}
```

### Reglas de uso

- **Texto principal sobre fondo claro:** `--color-text`.
- **Texto secundario (sinopsis, descripciones largas):** `--color-text-secondary`.
- **Labels y metadata (uppercase, tracking ancho):** `--color-text-muted`.
- **Texto sobre fondo oscuro:** `--color-fg-on-dark`.
- **Texto secundario sobre fondo oscuro:** `--color-fg-on-dark-muted`.
- **Hovers de enlaces de navegación:** `--color-accent`.
- **Nunca usar negro puro (`#000`) para texto.** Siempre `--color-text` (`#1A1A1A`) — el negro puro vibra y se siente sintético.
- **IMPORTANTE:** Estos tokens son para CUALQUIER texto sobre fondo oscuro. NO inventar opacidades sueltas como `text-white/70`.

---

## 3. Tokens — Tipografía

### Familias

```css
--font-serif: "Playfair Display", "Times New Roman", serif;
--font-sans:  "Inter", system-ui, -apple-system, sans-serif;
```

Cargadas vía Google Fonts en `app/layout.tsx` (Next.js) usando `next/font/google` para self-hosting automático y mejor LCP.

### Pesos

- Playfair Display: 400 (regular), 400 italic
- Inter: 300 (light), 400 (regular), 700 (bold)

Cualquier peso adicional se justifica y se agrega al sistema.

### Escala tipográfica

Todas las escalas usan `clamp()` para ser fluidas entre mobile y desktop.

```css
/* Display — para hero, footer trascendente, titulares editoriales */
--text-display-xl: clamp(5rem, 14vw, 22rem);   /* line-height 0.80 */
--text-display-lg: clamp(4rem, 10vw, 16rem);   /* line-height 0.85 */
--text-display-md: clamp(2.5rem, 8vw, 7rem);   /* line-height 0.90 */

/* Headings */
--text-h1: clamp(2rem, 4vw, 3.5rem);
--text-h2: clamp(1.5rem, 3vw, 2.5rem);
--text-h3: clamp(1.25rem, 2vw, 1.75rem);

/* Cuerpo */
--text-body-lg: clamp(1.125rem, 1.4vw, 1.375rem);  /* line-height 1.7 */
--text-body:    clamp(1rem, 1.2vw, 1.25rem);       /* line-height 1.8 */
--text-body-sm: 0.875rem;                          /* line-height 1.6 */

/* UI / labels */
--text-label:   clamp(10px, 0.75vw, 14px);   /* uppercase, tracking 0.4em, bold, opacity 0.6 */
--text-caption: 11px;                        /* tracking 0.15em, bold */
--text-micro:   9px;                         /* tracking 0.3em */
```

### Tracking (letter-spacing)

- Display y H1: `-0.03em` a `-0.04em` (apretado).
- Cuerpo: `0` (normal).
- Labels y captions: `0.15em` a `0.4em` (espaciado, uppercase).

### Reglas de uso

- **Display y H1:** siempre Playfair Display.
- **H2 a H3:** Playfair Display o Inter según contexto (decide el diseñador caso por caso).
- **Cuerpo:** Inter light (300) para sinopsis y textos editoriales largos. Inter regular (400) para UI.
- **Labels:** Inter bold (700), uppercase, tracking ancho.
- **Italic:** reservado para citas y palabras enfáticas, siempre en Playfair Display.

---

## 4. Tokens — Espaciado

Sistema de espaciado fluido. Tailwind ya cubre la escala base (0.25rem a 24rem); estos son los tokens **adicionales** para espaciados editoriales grandes.

```css
/* Espaciado vertical editorial */
--space-editorial-sm: clamp(2rem, 4vw, 4rem);
--space-editorial:    clamp(4rem, 8vw, 12rem);
--space-editorial-lg: clamp(6rem, 12vw, 16rem);

/* Container padding lateral */
--container-padding:  6vw;   /* Cinematic — usado en todas las secciones principales */
--container-padding-tight: clamp(1.2rem, 5vw, 4rem);   /* Para texto editorial */
```

### Reglas de uso

- **Entre secciones principales:** `var(--space-editorial)`.
- **Entre subsecciones dentro de la misma sección:** `var(--space-editorial-sm)`.
- **Antes/después de un display hero:** `var(--space-editorial-lg)`.
- **Padding lateral de cualquier sección:** `var(--container-padding)`.

---

## 5. Tokens — Motion

```css
/* Duraciones */
--duration-instant: 100ms;
--duration-fast:    200ms;
--duration-base:    400ms;
--duration-slow:    600ms;
--duration-glacial: 900ms;   /* Sólo para entradas de página o hero */

/* Easings */
--ease-expo:    cubic-bezier(0.16, 1, 0.3, 1);    /* Default — out expo */
--ease-in-out:  cubic-bezier(0.65, 0, 0.35, 1);   /* Para loops o transiciones balanceadas */
--ease-in:      cubic-bezier(0.7, 0, 1, 0.5);     /* Para salidas */
--ease-out:     cubic-bezier(0, 0.5, 0.3, 1);     /* Para entradas suaves */
```

### Reglas de uso

- **Default para todo:** `var(--duration-base)` + `var(--ease-expo)`.
- **Hovers:** `var(--duration-fast)` + `var(--ease-expo)`.
- **Entradas de página o hero:** `var(--duration-glacial)` + `var(--ease-expo)`.
- **Salidas de elementos:** `var(--duration-base)` + `var(--ease-in)`.
- **Nada dura más de 900ms** salvo loops decorativos (parallax, video).

### Reduce-motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Esta regla va sí o sí. Es accesibilidad, no opción.

---

## 6. Tokens — Z-index

```css
--z-base:     0;
--z-content:  10;
--z-overlay:  20;
--z-sticky:   30;
--z-navbar:   40;
--z-modal:    50;
--z-toast:    60;
--z-cursor:   100;   /* Si se implementa cursor custom */
```

**Regla:** Nunca usar `z-index` con un número arbitrario. Si se necesita uno nuevo, agregarlo al sistema.

---

## 7. Tokens — Breakpoints

Usamos los breakpoints default de Tailwind (mobile-first):

```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

### Reglas de uso

- **Mobile first siempre.** Empezar el estilo sin media query (mobile), después escalar con `md:`, `lg:`, etc.
- **No usar `max-width` media queries** salvo casos justificados.
- **Romper en `md` (768px)** es el corte natural: layout pasa de single-column a multi-column.

---

## 8. Componentes primitivos

Estos son los building blocks. Todo lo demás se construye con estos.

### `<Container>`
Wrapper con padding lateral cinemático.

```tsx
<Container>{children}</Container>
// Equivale a: <div className="w-full px-[6vw]">{children}</div>
```

Variantes: `tight` (para texto editorial, padding más conservador).

### `<Section>`
Sección con espaciado vertical editorial.

```tsx
<Section spacing="default">  // var(--space-editorial)
<Section spacing="sm">       // var(--space-editorial-sm)
<Section spacing="lg">       // var(--space-editorial-lg)
```

### `<Heading>`
Heading semántico con escala tipográfica.

```tsx
<Heading as="h1" size="display-lg">Historias que trascienden</Heading>
<Heading as="h2" size="h2" font="serif">El secreto de sus ojos</Heading>
```

### `<Text>`
Cuerpo de texto.

```tsx
<Text size="body-lg" tone="secondary">Sinopsis editorial...</Text>
```

### `<Label>`
Etiqueta uppercase con tracking ancho. Para metadata, captions, kickers.

```tsx
<Label>2009 · Película</Label>
```

### `<Link>`
Link con hover acento y underline animado.

```tsx
<Link href="/peliculas/el-secreto-de-sus-ojos">Ver película</Link>
```

### `<Button>`
Botón con variantes.

```tsx
<Button variant="primary">Reproducir tráiler</Button>
<Button variant="ghost">Ver todas</Button>
<Button variant="link">Ver más</Button>
```

### `<Tag>`
Píldora pequeña para géneros, años, tipos.

```tsx
<Tag>Drama</Tag>
```

---

## 9. Componentes compuestos del proyecto

(Vivirán en `components/`, no son primitivos pero son del sistema.)

- `<Navbar>` — navegación principal.
- `<HeroVideo>` — hero con video de fondo en home.
- `<FeaturedFilm>` — bloque editorial de película destacada (alterna izquierda/derecha).
- `<FilmCard>` — card individual en la grilla del catálogo.
- `<CatalogueGrid>` — grilla con filtros.
- `<LogrosBanner>` — banner de premios y reconocimientos.
- `<ServiciosSection>` — sección de servicios.
- `<Footer>` — footer con el "Historias que trascienden".
- `<FichaTecnica>` — tabla editorial de ficha técnica en página de película.
- `<TrailerEmbed>` — embed de YouTube con UX prolija (poster custom, lazy load).
- `<StillsGallery>` — galería de stills con lightbox.

---

## 10. Iconografía

Por ahora el proyecto tiene `icons.svg` (sprite local). Si se necesitan íconos adicionales:

- **Librería preferida:** [Lucide React](https://lucide.dev/) — limpia, neutral, gratis.
- **Tamaño base:** 20x20 o 24x24, stroke 1.5px.
- **Color:** hereda de `currentColor`. Nunca hardcodear.
- **Reglas:** Iconos son funcionales, no decorativos. Si dudás si poner un ícono, no lo pongas.

---

## 11. Imágenes

### Tratamiento

- **Stills de película:** ratio 16:9 o 2.39:1 (cinemascope) — respetar el ratio original.
- **Posters:** ratio 2:3 (estándar de cine).
- **Hover sutil:** en cards del catálogo, leve scale (1.02) en 400ms.
- **Filtro:** los stills se sirven tal cual son, sin tints ni overlays salvo en hero (gradiente para legibilidad de texto).

### Formato y peso

- AVIF + WebP automáticos vía `next/image`.
- Calidad: 75 (default `next/image`) es suficiente para la mayoría. Subir a 85 sólo si se nota pérdida.
- Poster del hero video: AVIF a calidad 80, WebP fallback.
- Ningún asset en producción supera 500kb. Si lo supera, se optimiza.

---

## 12. Accesibilidad

### Contraste

- Texto principal (`#1A1A1A` sobre `#f9f9f9`): ratio 15.97:1 — AAA.
- Texto secundario (`rgba(26,26,26,0.60)` sobre `#f9f9f9`): aprox 9.5:1 — AAA.
- Acento sobre fondo claro (`#C8892A` sobre `#f9f9f9`): aprox 3.2:1 — **falla AA para texto normal, pasa para textos grandes (18pt+)**.

**Regla:** El dorado **no se usa para texto chico**. Si se necesita un link en dorado en tamaño pequeño, se usa una variante más oscura: `#9A6B1F` (ratio ~5:1).

### Focus visible

```css
:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 4px;
  border-radius: 2px;  /* Excepción al "no border-radius" — accesibilidad gana */
}
```

### Otras reglas

- Todas las imágenes tienen `alt` descriptivo (no "imagen" o "foto").
- Todos los videos decorativos tienen `aria-hidden="true"`.
- Skip link `<a href="#main">Saltar al contenido</a>` al inicio del body.
- Navegación completa por teclado, sin trampas.
- `aria-label` en botones que sólo tienen ícono.
- `aria-current="page"` en el item activo de la navegación.

---

## 13. Do's & Don'ts visuales

| ✅ Hacer | ❌ Evitar |
|---------|----------|
| Tipografía protagonista, gigante en hero | Iconitos decorativos al lado de cada titular |
| Asimetría intencional, layouts alternados | Grids perfectamente simétricos en todo el sitio |
| Dorado como acento, sutil | Dorado en bloques grandes o backgrounds |
| Espaciado generoso, blanco respira | Densidad de información tipo dashboard |
| Animaciones cortas (200-600ms) | Animaciones largas (>1s) decorativas |
| Italic Playfair para emoción | Italic en cuerpos largos (se vuelve ilegible) |
| Stills en grande, respiran | Crops cuadrados de Instagram |
| `clamp()` para escalas fluidas | Breakpoints rígidos con múltiples redefiniciones |
| Letter-spacing apretado en display (-0.03em) | Tracking neutral en display (se ve débil) |
| Reduce-motion siempre respetado | Animaciones obligatorias |

---

## 14. Referencias visuales

(Pendiente: 3-5 sitios aprobados por el cliente.)

Mientras tanto, referencias de trabajo internas:

- **Criterion Collection** ([criterion.com](https://www.criterion.com/)) — tipografía editorial, fotografía respira, sobriedad.
- **MUBI** ([mubi.com](https://mubi.com/)) — modernidad serif, layouts editoriales.
- **Sight and Sound** ([bfi.org.uk/sight-and-sound](https://www.bfi.org.uk/sight-and-sound)) — peso editorial de revista de cine.

---

## 15. Versionado

| Versión | Fecha | Cambio |
|---------|-------|--------|
| 1.0 | 2026-05-18 | Sistema inicial. Tokens definidos. Primitivos descritos. Referencias visuales pendientes. |
