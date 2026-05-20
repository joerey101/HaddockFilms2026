# BASELINE — Haddock Films 2026

Este documento contiene las métricas originales del sitio en producción (Vite + SPA), antes de iniciar la Fase 1 de la migración a Next.js 15.

**Fecha de la auditoría:** 2026-05-18
**URL auditada:** https://haddock-films2026.vercel.app/v1

---

## Lighthouse Desktop

- **Performance:** 97
- **Accessibility:** 95
- **Best Practices:** 100
- **SEO:** 83
- **LCP:** 0.9 s
- **INP:** 0.9 s (aprox. Time to Interactive)
- **CLS:** 0
- **FCP:** 0.9 s
- **TBT:** 0 ms
- **TTFB:** 30 ms

## Lighthouse Mobile (Simulated slow 4G)

- **Performance:** 87
- **Accessibility:** 95
- **Best Practices:** 100
- **SEO:** 83
- **LCP:** 3.1 s
- **INP:** 3.1 s (aprox. Time to Interactive)
- **CLS:** 0
- **FCP:** 3.1 s
- **TBT:** 0 ms
- **TTFB:** 40 ms

## Bundle Size (JS inicial)

- **JS inicial (gzipped):** 143.38 kB
- **CSS inicial (gzipped):** 8.00 kB
- **Notas:** El tamaño es excelente (< 150kb). Mantener bajo en Next.js.

## Auditoría Axe-Core (Accesibilidad)

### Home (`/v1`)
- **Total issues detectados:** 61
- **Tipos de issues:**
  - 46 violaciones de `color-contrast` (contraste insuficiente entre texto y fondo).
  - 15 violaciones de `region` (contenido fuera de landmarks semánticos).

### Ficha de Película (`/v1/el-tiempo-de-las-moscas`)
- **Total issues detectados:** 7
- **Tipos de issues:**
  - 3 violaciones de `color-contrast`.
  - 4 violaciones de `region`.

## Top Oportunidades de Mejora (Baseline -> Objetivo)

1. **SEO (83 -> 100):** Solucionar falta de `<html lang>`, meta tags, y hacer que el contenido sea accesible en source view (SSR).
2. **Lighthouse Mobile Perf (87 -> 90+):** Reducir LCP en mobile (actual: 3.1s, objetivo: < 2.5s) mediante optimización de imágenes (AVIF/WebP) nativa de Next.js y pre-cargas correctas.
3. **Axe-Core / Accesibilidad:** Eliminar todas las violaciones de contraste y envolver el contenido en landmarks HTML5 correctos (`<main>`, `<nav>`, `<header>`, `<footer>`).
