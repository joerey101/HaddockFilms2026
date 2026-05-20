# TECHNICAL SPEC — Haddock Films 2026

> Especificación técnica del proyecto. Stack, estructura, convenciones, pipeline.
>
> **Regla:** Si una decisión técnica no está documentada acá, no se tomó. Antes de inventar, leer este documento.

---

## 1. Stack definitivo

| Capa | Tecnología | Versión | Notas |
|------|------------|---------|-------|
| Framework | Next.js | 15.x (App Router) | Server Components por default, Client cuando hace falta |
| Lenguaje | TypeScript | 5.x | `strict: true` |
| Runtime | Node.js | 20 LTS | Configurado en `.nvmrc` |
| Estilos | Tailwind CSS | 4.x | Vía `@tailwindcss/postcss` |
| Animación | Framer Motion | 12.x | Sólo en Client Components |
| Routing | Next.js App Router | Built-in | File-based |
| Iconos | Lucide React | latest | Opcional, sólo si hace falta |
| Deploy | Vercel | — | Build automático desde `main` |
| Datos | JSON local tipado | — | `src/data/films.ts` |
| Fuentes | `next/font/google` | — | Playfair Display + Inter, self-hosted automático |

### Lo que NO se usa (y por qué)

- **GSAP**: Framer Motion alcanza para este alcance. Sumar GSAP es complejidad sin retorno.
- **Lenis** (smooth scroll): Iría contra reduce-motion accessibility. El smooth scroll nativo del navegador alcanza.
- **Three.js / WebGL**: Fuera del tono editorial. Si el cliente lo pide en post-lanzamiento, se evalúa.
- **shadcn/ui**: Tenemos sistema propio. shadcn es valioso pero no para un sitio con identidad editorial fuerte.
- **Redux / Zustand**: No hay estado global complejo. React Context si surge.
- **react-helmet**: No hace falta, Next 15 tiene metadata API nativa.

---

## 2. Estructura de carpetas objetivo

```
.
├── docs/                        # Documentación del proyecto (este set de .md)
│   ├── MASTER_PLAN.md
│   ├── HANDOFF.md
│   ├── BITACORA.md
│   ├── DESIGN_SYSTEM.md
│   ├── TECHNICAL_SPEC.md
│   ├── SEO_PLAYBOOK.md
│   ├── CONTENT_MODEL.md
│   ├── PROMPT_LIBRARY.md
│   └── baseline/                # Reportes Lighthouse, etc.
├── public/
│   ├── assets/                  # Assets compartidos (logo, video home)
│   ├── films/                   # Stills por película (ver CONTENT_MODEL.md)
│   ├── favicon.svg
│   ├── icons.svg
│   ├── robots.txt
│   └── og/                      # OG images generadas
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx           # Root layout (fonts, metadata, html lang)
│   │   ├── page.tsx             # Home (/)
│   │   ├── globals.css          # Tokens CSS + Tailwind directives
│   │   ├── sitemap.ts           # Sitemap dinámico
│   │   ├── robots.ts            # Robots dinámico (alternativa a public/robots.txt)
│   │   ├── opengraph-image.tsx  # OG image default
│   │   ├── peliculas/
│   │   │   └── [slug]/
│   │   │       ├── page.tsx     # Detalle de película
│   │   │       └── opengraph-image.tsx  # OG por película
│   │   ├── catalogo/
│   │   │   └── page.tsx         # Grilla con filtros (si se decide ruta dedicada)
│   │   └── dev/
│   │       └── components/
│   │           └── page.tsx     # Inventario de primitivos (solo dev)
│   ├── components/
│   │   ├── primitives/          # Button, Link, Container, Section, Heading, Text, Label, Tag
│   │   ├── layout/              # Navbar, Footer
│   │   ├── home/                # HeroVideo, FeaturedFilm, LogrosBanner, ServiciosSection
│   │   ├── catalogue/           # CatalogueGrid, FilmCard, FilterBar
│   │   ├── film/                # FilmHero, FichaTecnica, TrailerEmbed, StillsGallery, CastList
│   │   └── motion/              # Wrappers de Framer Motion reutilizables
│   ├── data/
│   │   ├── films.ts             # Dataset tipado de películas
│   │   └── films.schema.ts      # Tipos TypeScript
│   ├── lib/
│   │   ├── seo.ts               # Helpers para metadata
│   │   ├── jsonld.ts            # Generadores de JSON-LD
│   │   ├── images.ts            # Helpers de imágenes
│   │   └── utils.ts             # Utilidades varias
│   └── styles/
│       └── tokens.css           # (Si se separa de globals.css)
├── .nvmrc                       # 20
├── next.config.mjs
├── tsconfig.json
├── tailwind.config.ts           # (Tailwind v4 usa CSS pero algunos plugins pueden requerir TS)
├── package.json
├── vercel.json
└── README.md
```

### Notas sobre la estructura

- **`src/app/`**: Todo lo que es ruta vive acá. Una carpeta = una ruta.
- **`src/components/primitives/`**: Building blocks. Sin lógica de negocio.
- **`src/components/{home, catalogue, film}/`**: Componentes específicos de cada zona.
- **`src/data/`**: Fuente de verdad de contenido. Si crece, se migra a CMS.
- **`src/lib/`**: Lógica reutilizable, helpers. Sin JSX.
- **No usar `app/(routes)/`** ni groups raros salvo que haya razón clara.

---

## 3. Convenciones de código

### Nombrado

| Cosa | Convención | Ejemplo |
|------|------------|---------|
| Componentes | PascalCase | `FeaturedFilm.tsx` |
| Hooks | camelCase con `use` | `useReducedMotion.ts` |
| Utilidades | camelCase | `formatYear.ts` |
| Tipos | PascalCase | `type Film = {...}` |
| Constantes | UPPER_SNAKE_CASE | `MAX_FEATURED_FILMS` |
| Archivos de ruta | `page.tsx`, `layout.tsx` | (Next convention) |
| CSS classes custom | kebab-case | `cinematic-container` |
| Variables CSS | kebab-case con `--` | `--color-bg` |

### TypeScript

- `strict: true` siempre.
- Todo componente tiene tipo de props explícito (no `any` ni `unknown` salvo justificación).
- Preferir `type` sobre `interface` salvo cuando se necesite extender (regla simple: `type` por default).
- Props con valores opcionales: ordenar requeridos primero, opcionales al final.
- Exports: preferir `export default` para componentes que son una sola entidad por archivo, `export const` para utilidades múltiples.

### Componentes React

- **Server Components por default.** Sólo agregar `"use client"` cuando se necesita:
  - `useState`, `useEffect`, hooks de React.
  - Event handlers (`onClick`, etc.).
  - Framer Motion (que requiere cliente).
  - APIs del browser (`window`, `document`).
- **Un componente por archivo.** Si un sub-componente sólo se usa en un lugar, puede vivir en el mismo archivo.
- **Props desestructuradas en la firma**, no en el cuerpo:
  ```tsx
  // ✅
  export default function FeaturedFilm({ title, year, image }: FeaturedFilmProps) {}
  // ❌
  export default function FeaturedFilm(props: FeaturedFilmProps) {
    const { title, year, image } = props;
  }
  ```
- **Children tipados con `React.ReactNode`** explícitamente.

### Imports

Orden:
1. React / Next imports.
2. Librerías externas.
3. Componentes internos (`@/components/...`).
4. Utilidades, tipos, datos (`@/lib/...`, `@/data/...`).
5. Estilos.

Path alias: `@/*` apunta a `src/*` (configurado en `tsconfig.json`).

### Tailwind

- **Cero estilos inline** (`style={{...}}`) salvo:
  - Valores dinámicos calculados (ej: `style={{ backgroundImage: `url(${src})` }}`).
  - Animaciones de Framer Motion que requieren `style` prop.
- **Cero clases mágicas** tipo `text-[#C8892A]`. Usar tokens: `text-accent`.
- **Composición con `cn()` helper** (de `clsx` o `tailwind-merge`) cuando hay clases condicionales.
- **No abusar de `!important`.** Sólo en `globals.css` y sólo justificado.

---

## 4. Pipeline de assets

### Imágenes

- **Subir originales a `/public/films/{slug}/`** o `/public/assets/`.
- **Formatos aceptados de origen:** JPG, PNG, WEBP. Próxima IA debe optimizar antes de subir.
- **next/image hace el resto:** convierte a AVIF + WebP automáticamente, genera srcset.
- **Tamaño máximo de origen:** 2000px en su lado mayor. Más grande es desperdicio.
- **Peso máximo del archivo origen:** 800kb. Si supera, optimizar con [Squoosh](https://squoosh.app/) antes de subir.

### Antes de subir una imagen, este chequeo:

```
1. ¿Está en el formato correcto (JPG/PNG/WEBP)?
2. ¿Tiene dimensiones razonables (≤ 2000px lado mayor)?
3. ¿Pesa menos de 800kb?
4. ¿Tiene nombre kebab-case sin espacios?
5. ¿Está en la carpeta correcta según CONTENT_MODEL.md?
```

### Video

- **Video home:** ya existe `Haddock-videohome.mp4`.
- **Optimización requerida:**
  - Versión MP4 (H.264) ≤ 5MB.
  - Versión WebM (VP9 o AV1) ≤ 3MB.
  - Duración ≤ 15s en loop.
  - Sin audio (`muted`).
  - Poster JPG/AVIF como fallback de primer frame.
- **Servir con `<video>` nativo**, autoplay + muted + loop + playsInline + poster.

---

## 5. Performance — reglas

### Bundle

- **Bundle JS inicial ≤ 150kb gzipped.** Si se supera, revisar dynamic imports.
- **Framer Motion sólo en componentes que lo usan**, no en el root. Importar de `framer-motion` específicamente (no de `framer-motion/all`).
- **Lazy load del iframe del trailer** — sólo cargar YouTube cuando el usuario hace click en play.

### Imágenes

- `priority` sólo en el LCP (hero principal de home, hero de ficha).
- `loading="lazy"` por default (next/image lo hace solo si no es priority).
- `sizes` siempre explícito en `next/image`:
  ```tsx
  <Image
    src="..."
    alt="..."
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 70vw"
  />
  ```

### Fuentes

- `next/font/google` con `display: "swap"`.
- `preload: true` para Playfair Display y Inter (las que se usan above-the-fold).
- No cargar pesos que no se usan.

### Caching y revalidación

- Páginas estáticas se generan en build (`generateStaticParams` en `[slug]/page.tsx`).
- ISR no se necesita por ahora (datos no cambian frecuentemente). Si se migra a CMS, revaluar.

---

## 6. SEO técnico

(Detalles completos en `SEO_PLAYBOOK.md`. Acá lo técnico.)

- **Metadata API de Next 15** para `<title>`, `<meta>`, `<link rel="canonical">`, OG, Twitter cards.
- **`generateMetadata()`** async en cada `[slug]/page.tsx` para metadata por película.
- **`opengraph-image.tsx`** por ruta para generar OG image dinámica.
- **Sitemap dinámico** en `src/app/sitemap.ts`.
- **Robots dinámico** en `src/app/robots.ts` (o estático en `public/robots.txt`).
- **JSON-LD** inyectado vía `<script type="application/ld+json">` en cada página relevante.
- **`lang="es-AR"`** en `<html>`.
- **Canonical URLs** explícitas en cada página.

---

## 7. Accesibilidad — técnica

- `lang="es-AR"` en root.
- Skip link al inicio del body.
- Headings en orden jerárquico (H1 único por página, H2 hijos, etc.).
- Imágenes con `alt` descriptivo. Decorativas con `alt=""`.
- Videos decorativos con `aria-hidden="true"`.
- Inputs (si los hay) con `<label>` asociado.
- `aria-current="page"` en navegación activa.
- Focus visible (ver `DESIGN_SYSTEM.md` sección 12).
- `prefers-reduced-motion` respetado globalmente (ver `DESIGN_SYSTEM.md` sección 5).

---

## 8. Configuración de Vercel

### `next.config.mjs` (esqueleto)

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Sin dominios remotos por ahora — todo en /public
  },
  // Redirects de URLs viejas (de la versión Vite)
  async redirects() {
    return [
      { source: '/v1', destination: '/', permanent: true },
      { source: '/v1/:slug', destination: '/peliculas/:slug', permanent: true },
      { source: '/v1/film/:id', destination: '/peliculas/:id', permanent: true }, // si hay forma de resolver id→slug, hacerlo
      { source: '/v2/:path*', destination: '/', permanent: true },
    ];
  },
  // Headers de seguridad básicos
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
```

### `vercel.json`

Con Next.js 15 y App Router, **`vercel.json` se elimina**. Las rewrites/redirects van en `next.config.mjs`.

### Variables de entorno

(Por ahora ninguna. Si se suma Supabase o servicio externo, documentar acá los nombres — nunca los valores.)

---

## 9. Testing — alcance

Para este proyecto **no se implementan tests automatizados** salvo que el cliente lo pida. Razones:
- Es un sitio de contenido (no SaaS).
- El alcance es acotado.
- Tiempo mejor invertido en visual y performance.

**Qué sí se hace:**
- Lighthouse en cada PR significativo.
- Visual QA manual en cada cambio de UI.
- axe-core run antes de cerrar cada fase.

Si en el futuro se suma backend o lógica compleja: Vitest + React Testing Library + Playwright para E2E.

---

## 10. Comandos del proyecto

```bash
# Desarrollo local
npm run dev               # Inicia dev server en localhost:3000

# Build y producción
npm run build             # Build de producción
npm start                 # Sirve el build local (verificación previa a deploy)

# Calidad
npm run lint              # ESLint
npm run typecheck         # tsc --noEmit
npm run lighthouse        # Corre Lighthouse contra localhost (script custom)

# Deploy
git push origin main      # Vercel deploya automáticamente
```

---

## 11. ESLint y formato

- ESLint base de Next.js (`next/core-web-vitals`).
- Sumar `eslint-plugin-jsx-a11y` para accesibilidad.
- Prettier para formato:
  - `semi: true`
  - `singleQuote: false` (consistencia con JSX que usa dobles)
  - `tabWidth: 2`
  - `trailingComma: "all"`
  - `printWidth: 100`

---

## 12. Versionado

| Versión | Fecha | Cambio |
|---------|-------|--------|
| 1.0 | 2026-05-18 | Spec inicial. Stack confirmado. Estructura definida. |
