# SEO PLAYBOOK — Haddock Films 2026

> Estrategia SEO completa. Qué se hace, dónde, cómo. Pensado para que Antigravity / Gemini puedan ejecutar sin tener que decidir cada cosa.

---

## 1. Objetivo SEO del proyecto

**No competimos por keywords genéricas de "productora de cine".** Eso es comodity y no aporta. Competimos por:

1. **Branded**: "Haddock Films", "Haddock Films productora", "Haddock Films [película]".
2. **Long-tail por título**: "El secreto de sus ojos productora", "El tiempo de las moscas Haddock".
3. **Industria especializada**: que el sitio sea citado por críticos, festivales, prensa especializada (Variety, IndieWire, Otroscines, La Nación Espectáculos, Página 12 Cultura).
4. **Rich results en Google**: que aparezcamos en knowledge panel, que los títulos tengan thumbnail de poster, que el sitio salga en búsquedas de cada película producida.

**Métrica de éxito:** Que al buscar el nombre exacto de una película producida por Haddock, el sitio de Haddock aparezca en la primera página de Google con título, descripción, y poster correctos.

---

## 2. Metadata por tipo de página

### Home (`/`)

```ts
// src/app/layout.tsx — defaults para todo el sitio
export const metadata: Metadata = {
  metadataBase: new URL('https://haddockfilms.com'),  // Cambiar al dominio final
  title: {
    default: 'Haddock Films — Productora de cine argentino',
    template: '%s · Haddock Films',
  },
  description: 'Productora de cine argentino. Películas y series con historias que trascienden. Detrás de El secreto de sus ojos, Relatos salvajes, El tiempo de las moscas, Elena sabe.',
  applicationName: 'Haddock Films',
  authors: [{ name: 'Haddock Films' }],
  generator: 'Next.js',
  keywords: ['Haddock Films', 'cine argentino', 'productora de cine', 'películas argentinas', 'series argentinas'],
  referrer: 'origin-when-cross-origin',
  creator: 'Haddock Films',
  publisher: 'Haddock Films',
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: 'https://haddockfilms.com',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://haddockfilms.com',
    siteName: 'Haddock Films',
    title: 'Haddock Films — Productora de cine argentino',
    description: 'Historias que trascienden.',
    images: [
      {
        url: '/og/default.jpg',
        width: 1200,
        height: 630,
        alt: 'Haddock Films',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Haddock Films',
    description: 'Productora de cine argentino. Historias que trascienden.',
    images: ['/og/default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
};
```

### Página de película (`/peliculas/[slug]`)

```ts
// src/app/peliculas/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const film = films.find(f => f.slug === params.slug);
  if (!film) return {};

  const title = `${film.title} (${film.year})`;
  const description = film.synopsis_short || film.synopsis.slice(0, 155);

  return {
    title,
    description,
    alternates: {
      canonical: `/peliculas/${film.slug}`,
    },
    openGraph: {
      type: 'video.movie',
      title: `${film.title} · Haddock Films`,
      description,
      url: `/peliculas/${film.slug}`,
      images: [
        {
          url: film.poster.local_path,
          width: 1200,
          height: 630,
          alt: `Poster de ${film.title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: film.title,
      description,
      images: [film.poster.local_path],
    },
  };
}
```

### Página de catálogo (`/catalogo`)

```ts
export const metadata: Metadata = {
  title: 'Catálogo',
  description: 'Todas las películas y series producidas por Haddock Films.',
  alternates: { canonical: '/catalogo' },
};
```

### Página de servicios (`/servicios`)

```ts
export const metadata: Metadata = {
  title: 'Servicios',
  description: 'Servicios de producción cinematográfica de Haddock Films.',
  alternates: { canonical: '/servicios' },
};
```

---

## 3. JSON-LD (Schema.org)

Se inyecta con `<script type="application/ld+json">` en cada página relevante.

### Organization (en `layout.tsx`)

```ts
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Haddock Films',
  url: 'https://haddockfilms.com',
  logo: 'https://haddockfilms.com/assets/logo.png',
  sameAs: [
    'https://www.instagram.com/haddockfilms',
    'https://vimeo.com/haddockfilms',
    'https://www.linkedin.com/company/haddock-films',
    // Confirmar URLs reales con el cliente
  ],
  description: 'Productora de cine argentino.',
  foundingDate: '1999',  // Confirmar con cliente
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'AR',
    addressLocality: 'Buenos Aires',
    // Confirmar con cliente
  },
};
```

### Movie (en `peliculas/[slug]/page.tsx`)

```ts
const movieSchema = {
  '@context': 'https://schema.org',
  '@type': film.type === 'serie' ? 'TVSeries' : 'Movie',
  name: film.title,
  inLanguage: 'es-AR',
  description: film.synopsis,
  image: `https://haddockfilms.com${film.poster.local_path}`,
  datePublished: `${film.year}`,
  director: (Array.isArray(film.directors) ? film.directors : [film.directors])
    .map(name => ({ '@type': 'Person', name })),
  productionCompany: {
    '@type': 'Organization',
    name: 'Haddock Films',
    url: 'https://haddockfilms.com',
  },
  ...(film.cast && {
    actor: film.cast.map(name => ({ '@type': 'Person', name })),
  }),
  ...(film.genre && {
    genre: Array.isArray(film.genre) ? film.genre : [film.genre],
  }),
  ...(film.duration && {
    duration: `PT${film.duration}M`,  // ISO 8601 duration
  }),
  ...(film.trailer_url && {
    trailer: {
      '@type': 'VideoObject',
      name: `Tráiler de ${film.title}`,
      embedUrl: film.trailer_url,
      uploadDate: `${film.year}-01-01`,
    },
  }),
  ...(film.awards && film.awards.length > 0 && {
    award: film.awards,
  }),
};
```

### BreadcrumbList (en cada página interna)

```ts
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://haddockfilms.com' },
    { '@type': 'ListItem', position: 2, name: 'Películas', item: 'https://haddockfilms.com/catalogo' },
    { '@type': 'ListItem', position: 3, name: film.title, item: `https://haddockfilms.com/peliculas/${film.slug}` },
  ],
};
```

### Validación

Antes de cerrar cualquier fase que toque JSON-LD, validar con:
- https://validator.schema.org
- https://search.google.com/test/rich-results

---

## 4. OG Images dinámicas

### Estrategia

Cada película genera su propia OG image automáticamente vía `opengraph-image.tsx` de Next 15.

```tsx
// src/app/peliculas/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og';
import { films } from '@/data/films';

export const runtime = 'edge';
export const alt = 'Haddock Films';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const film = films.find(f => f.slug === params.slug);
  if (!film) return new Response('Not found', { status: 404 });

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '80px',
          backgroundImage: `url(https://haddockfilms.com${film.stills?.[0]?.local_path || film.poster.local_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', color: '#F0EDE8' }}>
          <span style={{ fontSize: 24, letterSpacing: 6, opacity: 0.7, textTransform: 'uppercase' }}>
            Haddock Films · {film.year}
          </span>
          <span style={{ fontSize: 96, fontFamily: 'Playfair Display', lineHeight: 0.95 }}>
            {film.title}
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
```

Para que `Playfair Display` funcione en el OG runtime edge, hay que cargar la fuente vía fetch:

```tsx
const playfair = await fetch(
  new URL('https://fonts.gstatic.com/s/playfairdisplay/v37/...woff2', import.meta.url)
).then(res => res.arrayBuffer());

// En ImageResponse:
{
  fonts: [{ name: 'Playfair Display', data: playfair, weight: 400 }],
}
```

### OG image default

`/public/og/default.jpg` — generada manualmente o con un componente similar. 1200×630, peso ≤ 300kb.

---

## 5. Sitemap

```ts
// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { films } from '@/data/films';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://haddockfilms.com';
  const lastModified = new Date();

  const staticRoutes = [
    { url: baseUrl, lastModified, changeFrequency: 'monthly' as const, priority: 1.0 },
    { url: `${baseUrl}/catalogo`, lastModified, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/servicios`, lastModified, changeFrequency: 'yearly' as const, priority: 0.6 },
  ];

  const filmRoutes = films.map(film => ({
    url: `${baseUrl}/peliculas/${film.slug}`,
    lastModified,
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...filmRoutes];
}
```

Resultado disponible en `https://haddockfilms.com/sitemap.xml` automáticamente.

**Después del lanzamiento:** subir a Google Search Console.

---

## 6. Robots

```ts
// src/app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/dev/', '/api/'] },
    ],
    sitemap: 'https://haddockfilms.com/sitemap.xml',
  };
}
```

---

## 7. Copy SEO por sección

### Home — H1
`Historias que trascienden.` (Ya está en el footer actual, podemos elevarlo al hero o usarlo como tagline secundario).

### Home — meta description
`Productora de cine argentino. Películas y series con historias que trascienden. Detrás de [3 títulos más reconocidos].`

### Películas — patrón

| Campo | Patrón | Ejemplo |
|-------|--------|---------|
| Title | `[Título] ([Año]) · Haddock Films` | `El secreto de sus ojos (2009) · Haddock Films` |
| Meta description | Sinopsis cortada a 155 chars, sin "..." | `Un agente jubilado investiga un crimen sin resolver que lo persigue desde hace 25 años. Dirigida por Juan José Campanella.` |
| OG title | `[Título] · Haddock Films` | — |
| OG description | Igual que meta description | — |
| H1 | `[Título]` | `El secreto de sus ojos` |
| Alt del poster | `Poster de [Título]` | `Poster de El secreto de sus ojos` |
| Alt de cada still | `[Título] — [descripción del still si el cliente la provee, sino: "still de la película"]` | — |

### Catálogo

| Campo | Valor |
|-------|-------|
| Title | `Catálogo · Haddock Films` |
| H1 | `Catálogo` o `Todas nuestras producciones` (decisión de diseño) |
| Meta description | `Todas las películas y series producidas por Haddock Films. Drama, suspenso, historia argentina.` |

---

## 8. URLs y estructura

### Convenciones

- **Slugs en kebab-case sin acentos**: `el-secreto-de-sus-ojos`, no `el-secreto-de-sus-ojos-2009` (el año va en metadata, no en URL).
- **Singular `/peliculas/` no `/films/`**: idioma del sitio es español.
- **No trailing slash**: `/peliculas/elena-sabe-2023` no `/peliculas/elena-sabe-2023/`.
- **Sin sufijos de extensión** (`.html`).

### Redirects desde URLs viejas

Configurar en `next.config.mjs`:

| Origen | Destino | Tipo |
|--------|---------|------|
| `/v1` | `/` | 301 |
| `/v1/:slug` | `/peliculas/:slug` | 301 |
| `/v1/film/:id` | `/peliculas/:id-resuelto-a-slug` | 301 |
| `/v2/*` | `/` | 301 |

---

## 9. Performance como SEO

Google premia Core Web Vitals desde 2021. Targets:

| Métrica | Bueno | Necesita mejora | Pobre |
|---------|-------|-----------------|-------|
| LCP | < 2.5s | < 4.0s | ≥ 4.0s |
| INP | < 200ms | < 500ms | ≥ 500ms |
| CLS | < 0.1 | < 0.25 | ≥ 0.25 |

**Reglas concretas:**
- Hero image siempre con `priority` en `<Image>`.
- Fuentes con `display: swap` y `preload: true`.
- Sin layout shift: reservar espacio para imágenes (`fill` con contenedor de aspect-ratio, o `width`/`height` explícitos).
- No animar `width`/`height`/`top`/`left` — sólo `transform` y `opacity`.

---

## 10. Search Console — post-lanzamiento

Una vez en producción con dominio final:

1. Crear propiedad en [Google Search Console](https://search.google.com/search-console).
2. Verificar dominio (vía DNS TXT record).
3. Enviar sitemap: `https://haddockfilms.com/sitemap.xml`.
4. Solicitar indexación de las páginas principales (home, catálogo, 3-5 películas top).
5. Configurar alertas de errores de cobertura.
6. Revisar mensualmente: errores, queries, CTR, posición media.

---

## 11. Linking interno

- **Cada película linkea a películas relacionadas** (mismo director, mismo año, mismo género) al pie de la ficha.
- **Footer del sitio**: enlaces a catálogo completo, servicios, contacto.
- **Anchor text descriptivo**: nunca `click acá`. Siempre `ver el catálogo`, `página de El secreto de sus ojos`, etc.
- **Navegación clara**: el usuario nunca debe estar a más de 3 clicks de cualquier película.

---

## 12. Linking externo (off-page) — recomendaciones para el cliente

Esto excede el scope técnico del agente, pero documentado para el cliente:

1. **Wikipedia**: cada película producida por Haddock con artículo en Wikipedia debe tener el sitio oficial en "Enlaces externos".
2. **IMDB**: claim de la página de la productora, link al sitio oficial.
3. **Festivales**: en cada catálogo de festival donde participó una película, pedir que linkeen al sitio.
4. **Prensa**: cuando den notas, pedir que linkeen al sitio (especialmente notas en La Nación, Página 12, Otroscines, Cinéfilo serial).
5. **Filmaffinity**: claim de la página de la productora.

---

## 13. Checklist SEO antes de cerrar el proyecto

```
[ ] lang="es-AR" en <html>
[ ] Title único por página
[ ] Meta description única por página (≤ 160 chars)
[ ] Canonical en cada página
[ ] OG image por página (default + custom por película)
[ ] Twitter cards configuradas
[ ] JSON-LD Organization en layout
[ ] JSON-LD Movie en cada ficha
[ ] JSON-LD BreadcrumbList en páginas internas
[ ] Sitemap dinámico funcionando
[ ] Robots.txt servido
[ ] Redirects de URLs viejas activos
[ ] Todas las imágenes con alt descriptivo
[ ] Skip link en body
[ ] Heading hierarchy correcta (1 H1 por página)
[ ] Validado en validator.schema.org
[ ] Validado en search.google.com/test/rich-results
[ ] Lighthouse SEO 100 en home y al menos 3 fichas
[ ] OG preview validado en Twitter Card Validator y Facebook Sharing Debugger
[ ] Sitemap enviado a Search Console
```

---

## 14. Versionado

| Versión | Fecha | Cambio |
|---------|-------|--------|
| 1.0 | 2026-05-18 | Playbook inicial. Metadata, JSON-LD, sitemap, OG images definidos. |
