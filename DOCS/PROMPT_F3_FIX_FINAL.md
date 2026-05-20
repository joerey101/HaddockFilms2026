# PROMPT F3-FIX FINAL — Typo Filmografía + Alineación Servicios

> Pegá este prompt en Antigravity. Son 2 ajustes puntuales para cerrar Fase 3 de manera definitiva. Trabajo corto.

---

## Contexto

QA visual del PM finalizado. Hero, FeaturedFilm, LogrosBanner, CatalogueScene (cards) y Servicios (contenido) están **aprobados**. Quedan **2 cosas a corregir** antes de cerrar Fase 3.

---

## Reglas duras

1. **Cero `style={{...}}`.** Cero valores mágicos.
2. **Cero cambios fuera de los 2 puntos especificados.** Si encontrás algo más que "podría mejorarse", documentalo en la bitácora pero **no lo cambies**.
3. **TypeScript estricto.** Cero `any`.

---

## Los 2 ajustes

### AJUSTE 1 — Corregir typo "FILMÓGRAFIA" → "FILMOGRAFÍA"

**Sección:** `src/components/home/CatalogueScene.tsx`

**Estado actual:** El título de sección dice `FILMÓGRAFIA COMPLETA` con la tilde **mal puesta sobre la O**.

**Cambio requerido:**
- La ortografía correcta en español es **`FILMOGRAFÍA COMPLETA`** — tilde sobre la primera **I**, no sobre la O.
- Cambiar el string literal en el componente.
- Si hay otro lugar del proyecto que use el mismo string (buscar `"Filmografía"` y `"FILMOGRAFIA"` y variantes), corregir también.
- Si el string viene de un archivo de constantes o copy centralizado, corregir en el origen, no en el componente.

**No hacer:**
- No cambiar el tamaño tipográfico (quedó bien).
- No cambiar el layout de la sección.
- No tocar el subtítulo de bajada ("Explorá nuestra trayectoria...").

---

### AJUSTE 2 — Servicios: alinear título con el container principal del sitio

**Sección:** `src/components/home/ServiciosSection.tsx`

**Estado actual:** El título gigante `SERVICIOS` **se desborda hacia la izquierda más allá del margen del container principal** del sitio. La "S" inicial arranca antes del padding lateral que respetan el Navbar, Hero, FeaturedFilm, LogrosBanner y CatalogueScene.

**Esto rompe la grilla vertical del sitio** — todos los demás bloques alinean su contenido al borde interior del `<Container>`, pero el título de Servicios se sale por izquierda.

**Cambio requerido:**
- El **borde izquierdo de la letra "S" de SERVICIOS** debe alinear exactamente con:
  - El borde izquierdo del logo "HADDOCK FILMS" del Navbar.
  - El borde izquierdo del eyebrow "OFICIO" que ya está bien alineado.
  - El borde izquierdo del bloque de servicios numerados 01-04.
  - El borde izquierdo del título "FILMOGRAFÍA COMPLETA" de la sección anterior (CatalogueScene).
- Es decir: debe estar **dentro del `<Container>` principal del sitio**, respetando el padding lateral estándar.

**Cómo implementar:**
- Verificar que el `<Heading>` con el texto "SERVICIOS" esté **adentro** del `<Container>` y no fuera.
- Si está adentro pero la tipografía es tan grande que visualmente "se sale" (por overhang óptico tipográfico de Playfair en mayúsculas extremo grandes), **achicar levemente el tamaño tipográfico** hasta que entre dentro del container manteniendo presencia editorial.
- **No** modificar el `<Container>` principal del sitio.
- **No** agregar un `marginLeft: negative` ni hacks similares.
- **No** cambiar el tamaño del eyebrow "OFICIO" ni del texto descriptivo a la derecha.

**Criterio de éxito visual:**
- Trazá una línea vertical imaginaria desde el logo del Navbar hacia abajo. Esa línea debe pasar **exactamente por el borde izquierdo de la "S"** de SERVICIOS.
- La mitad superior de la sección (eyebrow + título + descripción + CTA) debe sentirse "encerrada" dentro del mismo container que todas las demás secciones del sitio.

**No hacer:**
- No tocar la columna derecha (texto descriptivo + CTA "Escribinos por un proyecto").
- No tocar la grilla 01-07 de servicios.
- No cambiar la palabra "SERVICIOS" ni el eyebrow "OFICIO".

---

## Validación post-ajuste

1. **Build limpio:** `npm run build` sin errores ni warnings.
2. **TypeScript:** `npx tsc --noEmit` sin errores, sin `any`.
3. **Visual desktop (≥1280px):**
   - Abrir `http://localhost:3001`.
   - Verificar AJUSTE 1: scroll hasta sección catálogo. Debe decir "FILMOGRAFÍA COMPLETA" correctamente.
   - Verificar AJUSTE 2: scroll hasta Servicios. La "S" de SERVICIOS debe alinear verticalmente con el logo del Navbar y con el "01" del primer servicio.
4. **Visual mobile (375px):** verificar que ambos ajustes no rompan responsive.
5. **Screenshots actualizados** (guardar en `docs/baseline/F3_fix_final/`):
   - CatalogueScene desktop con "FILMOGRAFÍA" correcta.
   - ServiciosSection desktop con título alineado al container.
6. **Lighthouse rápido:** confirmar que **ninguna métrica baja** del baseline del cierre de Fase 3 (5/5 en 100/100 o el target establecido).

---

## Documentación al cerrar

1. **Bitácora** (`DOCS/BITACORA_antigravity.md`):
   - Nueva entrada corta con fecha de hoy.
   - Título: "Fix final Fase 3: typo Filmografía + alineación Servicios".
   - Listar los 2 ajustes aplicados.
   - **Importante:** anotar que **Fase 3 queda CERRADA definitivamente** después de este fix.

2. **Handoff** (`DOCS/HANDOFF_antigravity.md`):
   - Actualizar "Lo último que se hizo": "Fase 3 cerrada con QA visual aprobado por PM".
   - Confirmar "Lo próximo a hacer": Fase 4 — Rediseño de ficha de película.

---

## Si te trabás

Si para el AJUSTE 2 descubrís que **el `<Container>` actual de Servicios no es el mismo que el del resto del sitio**, documentá la diferencia y preguntá antes de modificar. Lo más probable es que el problema sea **tipográfico** (overhang óptico de Playfair en gigante) y no de container, pero verificá ambas posibilidades.

---

## TL;DR

1. `FILMÓGRAFIA` → `FILMOGRAFÍA` (tilde en la primera I).
2. `SERVICIOS` debe alinear con el container del sitio (no salirse por izquierda).

Cuando termines, traé:
- 2 screenshots desktop (uno por cada ajuste).
- Lighthouse rápido confirmando que nada bajó.
- Build limpio.

Esto cierra Fase 3 de manera definitiva.
