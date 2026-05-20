# PROMPT F3-CIERRE — Ronda de correcciones finales de Home

> Pegá este prompt completo en Antigravity. Es la ronda final de ajustes sobre la Home para cerrar Fase 3. No saltees secciones. Si encontrás algo no especificado, **pará y preguntá** antes de improvisar.

---

## Contexto

Estamos cerrando **Fase 3 — Rediseño de Home** del proyecto **Haddock Films 2026**. Las 5 secciones de la Home ya fueron rediseñadas en Fases 3.1 y 3.2. El PM hizo QA visual completo y trae **7 correcciones puntuales + 3 deudas técnicas** que hay que resolver para cerrar la fase.

Leé antes de tocar código: `DOCS/HANDOFF_antigravity.md`, `DOCS/MASTER_PLAN.md`, `DOCS/DESIGN_SYSTEM.md`, `DOCS/TECHNICAL_SPEC.md`, `DOCS/BITACORA_antigravity.md`.

---

## Reglas duras (no negociables)

1. **Cero `style={{...}}` en código nuevo.** Todo con clases de Tailwind o primitivos.
2. **Cero valores mágicos.** Si en el JSX aparece `text-[63px]` o `#1A1A1A`, está mal. Usar tokens.
3. **Reduce-motion respetado.** `useReducedMotion()` de framer-motion donde haya animación.
4. **Primitivos siempre.** Si necesitás una variante de primitivo que no existe, **pará y preguntá**, no inventes una nueva.
5. **TypeScript estricto.** Cero `any`. Si los tipos de Framer Motion son densos, usar los tipos correctos (`Variants`, `Transition`, etc.).
6. **Server Components por default.** `"use client"` solo si hay estado, eventos DOM, o hooks de framer-motion.

---

## Correcciones (7)

### CORRECCIÓN 1 — Hero: statement abajo y full-width

**Sección:** `src/components/home/HeroVideo.tsx`

**Estado actual:** El statement tipográfico ocupa solo 2 de 4 columnas del Hero, posicionado en algún lugar de la pantalla. Se siente angosto.

**Cambio requerido:**
- El statement debe ir en el **bottom del Hero**, ocupando el **ancho total** disponible (4/4 columnas, full container width).
- Estructura tipográfica:
  - **Meta** (arriba del statement, como `<Label>` uppercase, tracking abierto, color blanco con opacidad ~70%):
    `Buenos Aires · Argentina · 2000 · 2026`
  - **Statement principal** (`<Heading>` display más grande disponible, Playfair Display, color blanco, peso editorial):
    Línea 1: `20 años de cine argentino.`
    Línea 2: `Producciones que trascienden fronteras.`
    Las dos líneas en el mismo `<Heading>`, separadas por `<br />` o por dos `<Heading>` consecutivos — lo que se vea más editorial.
- El statement debe respirar contra el borde inferior del Hero — padding bottom generoso pero sin perder el anclaje visual a "abajo".
- Mantener overlay sutil sobre el video/poster para garantizar legibilidad.

**No hacer:**
- No achicar la tipografía para que entre — si el ancho actual del Hero no la contiene en escritorio, expandir el container hasta el ancho del contenido principal del sitio.
- No cambiar el video ni el poster — solo el bloque de texto.

---

### CORRECCIÓN 2 — Hero: indicador de scroll

**Sección:** `src/components/home/HeroVideo.tsx`

**Estado actual:** Hay un texto "scroll" en algún lugar del Hero.

**Cambio requerido:**
- **Eliminar la palabra "scroll"** del Hero.
- Reemplazar por un **ícono de mouse animado** que indique visualmente que hay que bajar:
  - Forma: ícono de mouse (rectángulo redondeado vertical) con una rueda/punto adentro que se desplaza hacia abajo en loop.
  - Color: blanco con opacidad ~70-80%.
  - Posición: centrado horizontalmente en el bottom del Hero (probablemente debajo del statement, con espacio).
  - Tamaño: pequeño y elegante, no protagónico. ~24px de ancho aprox.
  - Animación: la rueda baja sutilmente (translateY 0 → 6px → 0) en loop de ~1.5s, easing suave.
- **Reduce-motion:** si `prefers-reduced-motion: reduce`, el ícono se muestra estático sin la animación de loop.
- Implementar con SVG inline o un primitivo simple. **No** descargar un Lottie ni una librería externa para esto.

**No hacer:**
- No agregar texto al lado del ícono. El ícono es autoexplicativo.

---

### CORRECCIÓN 3 — LogrosBanner: reducir padding vertical

**Sección:** `src/components/home/LogrosBanner.tsx`

**Estado actual:** El bloque gris de logros tiene demasiado espacio vertical arriba y abajo. Respira de más.

**Cambio requerido:**
- Reducir el padding/margin vertical en **aproximadamente 125px arriba y 125px abajo** (total 250px menos de espacio muerto).
- Si el bloque hoy usa una utility tipo `<Section spacing="lg">` o equivalente, cambiar a `spacing="md"` o `spacing="sm"` — usar el primitivo que ya exista, no agregar márgenes mágicos.
- Si el espaciado viene del componente interno, ajustar ahí, siempre con tokens.

**Criterio visual:** el bloque debe sentirse compacto pero respirado. No pegado a las secciones de arriba/abajo, pero tampoco con un océano de gris vacío.

---

### CORRECCIÓN 4 — FeaturedFilm: imágenes en formato apaisado + centrado vertical

**Sección:** `src/components/home/FeaturedFilm.tsx`

**Estado actual:** Las imágenes de los films destacados están en formato vertical/portrait. El cliente solicita formato **apaisado (landscape)** como tenían en el sitio original.

**Cambio requerido:**

1. **Ratio de imagen:** cambiar de portrait a **apaisado**. Usar ratio `16/9` (más cinematográfico).

2. **Proporción de columnas:** **mantener** la grilla actual de **7 cols imagen / 5 cols texto** en desktop. No cambiar la proporción del grid.

3. **Alineación vertical del texto:** el bloque de texto a la derecha (label + título + sinopsis + tags + CTA) debe estar **centrado verticalmente respecto al eje horizontal de la imagen** (no anclado arriba como ahora).
   - En Tailwind grid: usar `items-center` en el grid container o `self-center` en el bloque de texto.
   - Esto evita que el texto sobresalga mucho por debajo de la imagen apaisada y mejora el balance visual.

4. **Mantener la alternancia izq/der** entre los 3 films destacados — no romper esa lógica.

5. **Mobile (≤768px):** sigue siendo stack vertical (imagen apaisada arriba, texto abajo) sin alternancia. Reaprovechar la lógica actual.

6. **Ajustar `sizes` de `next/image`** acorde al nuevo ratio para optimizar el LCP.

**No hacer:**
- No cambiar tipografía, tags, ni microinteracciones.
- No tocar la lógica `featured: true` del JSON.

---

### CORRECCIÓN 5 — CatalogueScene: título en una sola línea

**Sección:** `src/components/home/CatalogueScene.tsx`

**Estado actual:** El título "Filmografía Completa" se está renderizando en **2 líneas**. Debe entrar en **una sola línea**.

**Cambio requerido:**
- Reducir el tamaño tipográfico del título lo necesario para que entre en una línea en desktop (≥1024px).
- Si actualmente usa `<Heading size="display-lg">`, probar `size="display-md"` o `size="lg"` — elegir el más grande que entre en una línea.
- En mobile, puede romperse en 2 líneas si hace falta — esto solo aplica a desktop/tablet.
- **No usar `white-space: nowrap`** porque rompería responsive.
- **No usar valores mágicos** tipo `text-[72px]`. Solo tokens/variantes del primitivo `<Heading>`.

---

### CORRECCIÓN 6 — CatalogueScene: cards (separación tags y cortes de título)

**Sección:** `src/components/home/CatalogueScene.tsx`

**Estado actual:** Dos problemas en las cards de la grilla:

**A) Tags debajo del título.** Hoy los tags (DRAMA, CINE, etc.) están separados del label superior.

**B) Cortes de título feos.** Algunos títulos se quiebran mal por la mitad de palabras o por dos puntos:
- "El fotógrafo y el cartero: El crimen de Cabezas" → quiebra mal.
- "Carmel: ¿Quién mató a María Marta?" → quiebra mal.

**Cambio requerido A — Reorganización de metadata en la card:**

Layout nuevo de cada card (de arriba a abajo):

```
[Imagen del film]

PELÍCULA · DRAMA · CINE              AÑO
[título del film en Playfair, peso editorial]
```

- Los tags (tipo, género, formato) van en la **misma línea** que el año, separados por un punto medio (`·`).
- Usar `<Label>` para esa fila completa, con `justify-between` para que la metadata principal vaya a la izquierda y el año a la derecha:
  - Izquierda: `PELÍCULA · DRAMA · CINE` (o lo que aplique).
  - Derecha: `2024` (el año).
- Si la card es muy angosta (4 columnas) y no entran todos los tags + año en una línea, **priorizar la legibilidad**:
  - Limitar a **2 tags máximo** en la línea superior (ej. solo `PELÍCULA · DRAMA`).
  - El resto de tags se omiten en la home (solo aparecen en la ficha completa).
- El título del film va debajo, en `<Heading as="h3" size="md">` o equivalente, Playfair, peso editorial.

**Cambio requerido B — Manejo de cortes de título:**

Para títulos largos con dos puntos:
- Forzar quiebre **después de los dos puntos**.
- Implementación: en el JSON `films.ts`, agregar un campo opcional `titleBreak?: string` que indique dónde quebrar, o usar un helper que detecte el patrón `"X: Y"` y renderice:
  ```
  El fotógrafo y el cartero:
  El crimen de Cabezas
  ```
  ```
  Carmel:
  ¿Quién mató a María Marta?
  ```
- Como alternativa más simple: usar `text-wrap: balance` en el `<Heading>` del título de card, que ya mejora los quiebres automáticamente. **Probar esto primero**; si no resuelve, aplicar el quiebre manual.
- **No** usar `<br />` directamente en el JSX del componente — debe ser una solución sistémica.

**Si tenés dudas sobre cuál es el campo correcto en `films.ts` para el tipo (PELÍCULA/SERIE), el género (DRAMA/THRILLER/etc.) y el formato (CINE/STREAMING), pará y preguntá.** No inventes la estructura.

---

### CORRECCIÓN 7 — ServiciosSection: nuevo layout de 2 columnas

**Sección:** `src/components/home/ServiciosSection.tsx`

**Estado actual:** El layout tiene el título "SERVICIOS" arriba, después un bloque de texto largo ("Desarrollamos y producimos... España"), y debajo la lista 01-07 de servicios numerados verticalmente.

**Cambio requerido — Nuevo layout en dos bloques:**

**Bloque superior (header de la sección):**
- Grid de 2 columnas (50/50 en desktop, stack vertical en mobile).
- Columna izquierda: el título `SERVICIOS` (label uppercase como mini-eyebrow) + el título principal en `<Heading as="h2">` con peso editorial (display-md o similar).
- Columna derecha: el texto introductorio actual ("Desarrollamos y producimos... España") como `<Text size="lg" tone="secondary">`.

**Bloque inferior (servicios):**
- Los 7 servicios se distribuyen en **2 columnas** así:
  ```
  01 — Producción de Largometrajes      05 — Diseño de Proyectos Audiovisuales
  02 — Formación y Capacitación         06 — Producción de Contenidos Web
  03 — Producción Internacional         07 — Producción de Contenidos Televisivos
  04 — Realización Integral
  ```
- Es decir: items 1-4 en columna izquierda, items 5-7 en columna derecha. Si la cantidad cambia en el futuro, distribuir partiendo por la mitad y dejando el resto en la columna derecha.
- Cada servicio mantiene su estructura actual (número + nombre + descripción corta), solo cambia la distribución en grilla.
- Mobile (≤768px): stack vertical, los 7 uno debajo del otro, sin columnas.

**No hacer:**
- No agregar íconos de servicios.
- No cambiar el copy de cada servicio.

---

## Deudas técnicas (3)

### DEUDA 1 — Accessibility: subir de 93 a 95+

**Diagnóstico:** El Lighthouse mobile y desktop reportan 93 en Accessibility — debajo del target 95+. Hay que identificar y arreglar las issues que reporta.

**Acción:**
1. Correr Lighthouse en `http://localhost:3001` con foco en **Accessibility**.
2. Listar las issues reportadas (típicas: contraste insuficiente, falta de alt, missing labels, ARIA roles incorrectos, focus visible faltante, encabezados desordenados).
3. Resolver cada una documentando qué se cambió y por qué.
4. Re-correr Lighthouse hasta que Accessibility ≥ 95 en mobile **y** desktop.
5. **No degradar** las otras métricas (Performance, Best Practices, SEO) al hacer estos arreglos.

**Si la issue es de contraste** y obliga a cambiar un color del sistema (token), **pará y preguntá** antes de cambiar el token. Documentar el contraste actual vs el necesario (WCAG AA = 4.5:1 para texto normal, 3:1 para texto grande).

---

### DEUDA 2 — Limpieza de `any` en Framer Motion variants

**Sección:** `CatalogueScene.tsx` y `ServiciosSection.tsx`

**Estado actual:** En la sesión anterior se declararon `cardVariants` e `itemVariants` con tipo `any` para evitar errores de TypeScript.

**Acción:**
- Reemplazar `any` por los tipos correctos de Framer Motion:
  - `Variants` del paquete `framer-motion` para las variantes.
  - `Transition` para las transiciones si están separadas.
  - `Easing` o `easeFunctionType` si hace falta tipar el easing.
- Si el problema original era con `ease: "ease-expo"` o un custom easing, importar `cubicBezier` o el tipo correcto.
- `npx tsc --noEmit` debe pasar **sin `any` ni `@ts-ignore`**.

---

### DEUDA 3 — Confirmación del checklist pendiente

**Acción:** Verificar y reportar los siguientes 3 puntos que quedaron sin confirmar en el reporte de Fase 3.2:

1. **View-source SSR:** abrir `view-source:http://localhost:3001/` y confirmar que el HTML inicial (no inyectado por JS) contiene:
   - El texto del statement del Hero (`20 años de cine argentino...`).
   - Los nombres de los logros del LogrosBanner.
   - Los títulos de los 3 FeaturedFilm.
   - Al menos el título de cada film en CatalogueScene.
   - Los nombres de los 7 servicios.

2. **Network mobile (DevTools, throttling 3G):** confirmar que el `<video>` del Hero **NO** se carga en mobile, solo el poster estático.

3. **Cero `style={{...}}` en código de Home:** correr una búsqueda en `src/components/home/` por `style={{` y confirmar que **no aparece ninguna ocurrencia**. Si aparece, listar dónde y migrarla a Tailwind o tokens.

Reportar el resultado de los 3 puntos con un check (✓) o cruz (✗) y el detalle correspondiente.

---

## Validación post-implementación

Antes de cerrar el prompt:

1. **Build limpio:** `npm run build` sin errores ni warnings.
2. **TypeScript estricto:** `npx tsc --noEmit` sin errores, sin `any`, sin `@ts-ignore`.
3. **Dev server:** `npm run dev -- -p 3001` corre limpio.
4. **Lighthouse desktop + mobile** sobre la home completa:
   - Performance ≥ 90 mobile, ≥ 95 desktop.
   - **Accessibility ≥ 95 ambos.**
   - Best Practices ≥ 95.
   - SEO = 100 (no debería bajar).
   - Guardar reportes en `docs/baseline/F3_cierre_lighthouse/`.
5. **Screenshots actualizados** (sobreescriben los anteriores, guardar en `docs/baseline/F3_cierre_screenshots/`):
   - Hero desktop (statement abajo full-width + ícono de scroll).
   - Hero mobile (375px) (mismo statement + ícono).
   - FeaturedFilm desktop (imagen apaisada, texto centrado vertical).
   - FeaturedFilm mobile (375px).
   - LogrosBanner desktop (con padding reducido).
   - CatalogueScene desktop (título 1 línea + cards reorganizadas + 4 columnas si ya está aplicado).
   - CatalogueScene mobile (375px).
   - ServiciosSection desktop (nuevo layout 2 columnas).
   - ServiciosSection mobile (375px).
6. **Resultado del checklist de Deuda 3** (view-source, network, cero inline styles) — reportado en chat.

---

## Documentación obligatoria al cerrar

1. **Bitácora** (`DOCS/BITACORA_antigravity.md`):
   - Nueva entrada con fecha.
   - Lista de las 7 correcciones aplicadas + 3 deudas resueltas.
   - Métricas Lighthouse pre vs post (sobre todo Accessibility).

2. **Handoff** (`DOCS/HANDOFF_antigravity.md`):
   - "Lo último que se hizo": Cierre de Fase 3 — Home completa.
   - "Lo próximo a hacer": Fase 4 — Rediseño de ficha de película (incluye el refactor de estilos inline pendiente del backlog).
   - Marcar Fase 3 como **CERRADA**.

3. **Design System** (`DOCS/DESIGN_SYSTEM.md`):
   - Si se agregó algún token nuevo (ej: para el ícono de scroll del mouse, o un nuevo variant de primitivo), documentar.

---

## Si te trabás

Si encontrás algo no especificado acá (un copy ambiguo, una variante de primitivo que no existe, un campo del JSON que no sabés cuál es), **NO improvises**:

1. Dejá la sección actual sin tocar (rollback).
2. Documentá el bloqueo en chat.
3. Pedí decisión antes de continuar.

Listado de cosas que probablemente te van a hacer dudar (preguntame de antemano si querés):

- **El ícono de scroll del mouse**: si no te sale claro cómo animarlo solo con CSS, preguntame antes de meter una librería.
- **El campo de tipo/género/formato en `films.ts`**: si los campos no coinciden con lo que pide la Corrección 6, preguntame cómo mapearlos.
- **El `titleBreak` para títulos con dos puntos**: si querés agregar el campo al JSON, hacelo opcional (`titleBreak?: string`) y preguntame los valores específicos para "El fotógrafo y el cartero" y "Carmel".
- **El color exacto del meta del Hero** (`Buenos Aires · Argentina · 2000 · 2026`): si no hay un token de "blanco con 70% opacidad", usar uno existente similar y reportar.

---

## TL;DR

7 correcciones visuales + 3 deudas técnicas + validación con Lighthouse + screenshots + documentación. Cuando termines, traé:

- Resumen de qué cambió por corrección.
- Reporte del checklist de Deuda 3 (3 items).
- Los 9 screenshots actualizados.
- Lighthouse desktop + mobile.
- Resultado de `npm run build`.

Esto cierra Fase 3. La próxima sesión arranca Fase 4 (ficha de película).
