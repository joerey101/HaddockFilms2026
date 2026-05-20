# MASTER PLAN — Haddock Films 2026

> Este documento es la **fuente única de verdad** del proyecto. Cualquier decisión que se tome y no esté acá, no existe. Si una IA (Claude, Antigravity, Gemini) o un humano va a operar sobre el proyecto, empieza leyendo este archivo.

---

## 0. Identidad del proyecto

- **Cliente:** Haddock Films
- **Producto:** Sitio institucional de la productora — catálogo de películas y series, ficha por título, sección de servicios.
- **URL producción:** https://haddock-films2026.vercel.app (actualmente sirve en `/v1`, el objetivo es que sirva en `/`).
- **Objetivo de negocio:** Llevar la presencia digital de Haddock al nivel de las grandes productoras de cine de autor (A24, Neon, MUBI, Criterion). El sitio tiene que transmitir prestigio, legado y autoría.
- **Objetivo técnico:** Lighthouse 95+ en todas las categorías, Core Web Vitals en verde, SEO técnico impecable, accesibilidad WCAG AA.

---

## 1. Decisiones aprobadas (fundacionales)

Estas decisiones están tomadas y no se reabren salvo por motivo de fuerza mayor.

| Decisión | Valor | Fecha |
|----------|-------|-------|
| Framework | **Next.js 15 (App Router)** | 2026-05-18 |
| Lenguaje | **TypeScript** | 2026-05-18 |
| Estilos | **Tailwind CSS v4** (continuamos lo existente) | 2026-05-18 |
| Animación | **Framer Motion** (continuamos lo existente) | 2026-05-18 |
| Deploy | **Vercel** | 2026-05-18 |
| Origen de datos | **JSON local** (`src/data/filmsData.ts`) — CMS queda como decisión futura | 2026-05-18 |
| Tono visual | **Editorial Claro** — Playfair Display + Inter, fondo `#f9f9f9`, acento `#C8892A` (aprobado por cliente) | 2026-05-18 |
| Idioma | **Español (Argentina)** — `lang="es-AR"`. i18n no implementado, queda como decisión futura | 2026-05-18 |
| Mailing | Implementación manual del cliente (fuera del scope del agente) | 2026-05-18 |
| Base de datos | Supabase si se necesita (decisión del cliente, fuera del scope del agente por defecto) | 2026-05-18 |

---

## 2. Decisiones pendientes (a tomar durante el proyecto)

| Tema | Cuándo se decide | Quién |
|------|------------------|-------|
| Referencias visuales finales (3-5 sitios) | Antes de Fase 3 | Cliente / dueño del proyecto |
| Cursor custom sí/no | Fase 3 | Después de prototipar |
| Página "Acerca de" / "Equipo" — alcance | Fase 4-5 | Cliente |
| Newsletter / formulario de contacto | Fase 6 | Cliente (lo hace él manualmente) |
| Migración a CMS (Sanity / Payload) | Post-lanzamiento | Cliente |
| i18n (inglés para festivales internacionales) | Post-lanzamiento | Cliente |

---

## 3. Plan por fases

Cada fase tiene **objetivo**, **entregables**, **criterios de aceptación**, y **estimado**. No se cierra una fase sin cumplir los criterios.

### Fase 0 — Medir el punto de partida
**Objetivo:** Tener números reales antes de tocar nada, para poder demostrar la mejora al final.

**Entregables:**
- Reporte Lighthouse desktop + mobile (Performance, Accessibility, Best Practices, SEO).
- Core Web Vitals reales: LCP, INP, CLS, TBT, FCP, TTFB.
- Reporte de bundle (peso JS inicial, por ruta, dependencias más pesadas).
- Reporte axe-core (accesibilidad).
- Screenshot del estado visual actual (desktop + mobile, home + ficha).
- Documento `BASELINE.md` con todos los números.

**Criterios de aceptación:**
- Todos los reportes guardados en `/docs/baseline/` del repo.
- `BASELINE.md` actualizado.

**Estimado:** 0.5 día.

---

### Fase 1 — Migración a Next.js 15 + fundación técnica ✅ (2026-05-18)
**Objetivo:** Tener el proyecto corriendo en Next.js 15 con TypeScript, sin perder nada de la funcionalidad actual y con la base SEO/performance lista.

**Entregables:**
- Proyecto migrado a Next.js 15 App Router.
- TypeScript activado, dataset tipado (`films.ts` con interfaces estrictas).
- Pipeline de imágenes: `next/image` aplicado a todo, AVIF + WebP automáticos.
- Metadata dinámica por ruta (home, ficha película, servicios).
- Sitemap.xml dinámico.
- Robots.txt.
- `lang="es-AR"` en HTML.
- Eliminado el `border-radius: 0 !important` global (reemplazado por configuración limpia de Tailwind).
- Variables CSS migradas a `app/globals.css`.
- Carpeta `/public/films` organizada (ver `CONTENT_MODEL.md`).
- Imagen pesada `Cabezas_poster_theatrical.png` (11MB) optimizada o eliminada.

**Criterios de aceptación:**
- `npm run build` sin warnings.
- Todas las rutas actuales funcionan idénticas en URL y comportamiento.
- Lighthouse Performance subió mínimo 20 puntos vs baseline.
- HTML inicial (view-source) contiene contenido real (no SPA vacía).
- OG preview funciona en WhatsApp, Twitter y LinkedIn.

**Estimado:** 2-3 días.

---

### Fase 2 — Sistema de diseño endurecido ✅ (2026-05-19)
**Objetivo:** Que el sistema de diseño deje de ser "lo que está en index.css" y pase a ser un sistema completo y documentado.

**Entregables:**
- Tokens completos: color, tipografía, espaciado, motion (duraciones + easings), z-index, breakpoints.
- Componentes primitivos tipados: `Button`, `Link`, `Container`, `Section`, `Tag`, `Heading`.
- `DESIGN_SYSTEM.md` actualizado con todos los tokens reales del código.
- Refactor de `FilmPageV1` para eliminar estilos inline.
- Storybook **NO** se instala (overkill para este alcance). En su lugar, una ruta `/dev/components` accesible solo en development que muestre todos los primitivos.

**Criterios de aceptación:**
- Cero `style={{...}}` en componentes nuevos o refactoreados.
- Cero valores mágicos (px, colores hex) fuera de los tokens.
- `/dev/components` renderiza todos los primitivos.

**Estimado:** 2 días.

---

### Fase 3 — Hero y home ✅ (2026-05-19)
**Objetivo:** La home como pieza de portafolio. Que un director europeo abra el sitio y entienda en 5 segundos quién es Haddock.

**Entregables:**
- Hero rediseñado: video de fondo optimizado (poster, autoplay, muted, playsInline, formato AV1 si es viable), tipografía protagonista, transición de entrada con Framer Motion.
- Featured Films: 3 películas destacadas con layout editorial (alternancia izq/der, asimetría intencional, tipografía display gigante).
- Logros Banner: si se mantiene, rediseño para que no sea un ticker genérico — más bien una declaración tipográfica de premios.
- Transición de entrada al sitio (primera carga) cuidada.
- Microinteracciones sutiles: hover en cards, scroll-linked parallax mínimo, no Resn-style.
- Reduce-motion respetado.

**Criterios de aceptación:**
- Lighthouse Performance ≥ 90 mobile, ≥ 95 desktop.
- LCP < 2.5s en mobile (3G simulado).
- Reduce-motion del usuario respeta y deshabilita animaciones decorativas.
- Validado contra las referencias visuales aprobadas.

**Estimado:** 3-4 días.

---

### Fase 4 — Página de ficha (detalle de película)
**Objetivo:** Que la ficha sea la pieza que el cliente quiera mostrar a productores internacionales.

**Entregables:**
- Hero con still + título tipográfico grande.
- Trailer embebido con UX prolija (poster custom, play prominente, lazy load del iframe).
- Sinopsis con tipografía editorial (Playfair Display itálica para citas, Inter para cuerpo).
- Ficha técnica como tabla editorial (no como lista de bullets).
- Reconocimientos: laureles + lista de festivales/premios con jerarquía visual clara.
- Galería de stills: grid asimétrica, lightbox con teclado, prefetch del siguiente still.
- Elenco: cards con foto + nombre + personaje.
- Navegación a anterior/siguiente película.
- Schema.org `Movie` JSON-LD en cada ficha.

**Criterios de aceptación:**
- Cada ficha tiene metadata propia (title, description, OG image = poster del film).
- JSON-LD válido (validar con https://validator.schema.org).
- Lighthouse SEO ≥ 95 en fichas individuales.

**Estimado:** 2-3 días.

---

### Fase 5 — Catálogo y filtros
**Objetivo:** Que la grilla sea memorable, no un grid genérico de Bootstrap.

**Entregables:**
- Grilla del catálogo con filtros (Películas / Series / Todos, año, género opcional).
- Transiciones FLIP entre filtros (Framer Motion `layout`).
- Vista lista alternativa (toggle) — opcional, según referencia visual final.
- Hover state distintivo en cada card.
- URL refleja el filtro actual (`?type=pelicula`) para ser linkeable.

**Criterios de aceptación:**
- Filtros funcionan sin reload.
- Compartir un link con filtro aplicado reproduce el filtro.
- No hay flash de contenido sin filtrar al cargar.

**Estimado:** 1-2 días.

---

### Fase 6 — Servicios, contacto, detalles que cierran
**Objetivo:** Atar todos los cabos sueltos.

**Entregables:**
- Sección Servicios rediseñada acorde al tono.
- Página/sección de contacto (estructura preparada para que el cliente conecte su mailing).
- Footer rediseñado (manteniendo el "Historias que trascienden" pero verificando que no rompe en mobile).
- 404 cuidado con tipografía editorial.
- Loading states (skeleton o transición elegante).
- Empty states (cuando un filtro no devuelve resultados).
- Cursor custom (si se aprobó en Fase 3).
- Accesibilidad pass completo: contraste WCAG AA, navegación por teclado, focus visible, skip links, alt text en todas las imágenes, `aria-labels` donde corresponda.

**Criterios de aceptación:**
- Lighthouse Accessibility ≥ 95.
- axe-core sin issues críticos.
- Navegación completa por teclado sin trampas.

**Estimado:** 2 días.

---

### Fase 7 — Lanzamiento
**Objetivo:** Pasar el switch.

**Entregables:**
- Lighthouse 95+ en las 4 categorías, desktop y mobile.
- OG images generadas por película (vía `next/og` o assets estáticos).
- Sitemap enviado a Google Search Console.
- Redirect de la URL temporal a la URL final (cuando el cliente confirme dominio).
- Documento `LAUNCH_CHECKLIST.md` con todo lo revisado.
- Actualización de `BITACORA.md` con el lanzamiento.

**Criterios de aceptación:**
- Lighthouse 95+ todo, ambos devices.
- Search Console acepta el sitemap sin errores.
- El cliente firma la aceptación.

**Estimado:** 1 día.

---

## 4. Cómo se trabaja en este proyecto

### Reglas de oro

1. **Ningún cambio sin medir.** Antes de optimizar algo, hay número. Después de optimizar, hay número de nuevo. Si no, no se hizo.
2. **Ningún componente nuevo sin token.** Si necesitás un color, espaciado, o easing que no está en `globals.css`, se agrega al token *primero*, después se usa.
3. **Ningún PR sin actualizar `BITACORA.md`.** El registro es obligatorio.
4. **Nada se hace "porque queda lindo".** Cada decisión visual responde a la referencia aprobada o a un principio del `DESIGN_SYSTEM.md`.
5. **Reduce-motion siempre se respeta.** Es accesibilidad, no preferencia.

### Quién hace qué

- **Cliente / dueño del proyecto:** Decisiones de producto, aprobación de fases, gestión de Vercel, mailing manual.
- **Agente Antigravity:** Ejecución técnica siguiendo los prompts de `PROMPT_LIBRARY.md`.
- **Claude (vía claude.ai):** Decisiones estratégicas, diseño de fases, debugging complejo, revisión de código, actualización de docs.
- **Gemini (opcional):** Tareas acotadas con prompts de `PROMPT_LIBRARY.md` cuando Claude no esté disponible.

### Flujo de sesión típico

```
1. Abrir HANDOFF.md → leer el estado actual.
2. Identificar la próxima tarea según MASTER_PLAN.md.
3. Buscar el prompt correspondiente en PROMPT_LIBRARY.md.
4. Ejecutar con Antigravity.
5. Validar resultado contra los criterios de aceptación.
6. Actualizar BITACORA.md con lo hecho.
7. Actualizar HANDOFF.md con el nuevo estado.
```

---

## 5. Glosario de términos del proyecto

- **V1, V2:** Versiones históricas. **V1 es la activa y definitiva.** V2 (oscuro) está dormido en el código pero no se usa.
- **Editorial Claro:** El tono visual aprobado — fondo claro, tipografía serif protagonista, dorado como acento.
- **Ficha:** Página de detalle de una película o serie.
- **Catálogo:** Grilla con todas las películas y filtros.
- **Logros banner:** Sección que muestra premios/reconocimientos.

---

## 6. Versionado de este documento

| Versión | Fecha | Cambio |
|---------|-------|--------|
| 1.0 | 2026-05-18 | Creación inicial. Decisiones fundacionales tomadas, plan de fases 0-7 aprobado. |
