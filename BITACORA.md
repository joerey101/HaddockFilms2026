# BITÁCORA DE TRABAJO — Haddock Films 2026
**Repositorio:** [github.com/joerey101/HaddockFilms2026](https://github.com/joerey101/HaddockFilms2026)  
**Producción:** [haddock-films2026.vercel.app](https://haddock-films2026.vercel.app)  
**Stack:** Vite + React + TailwindCSS v4 + Framer Motion + React Router DOM

---

## 10 de Abril, 2026

---

### 🔴 Sesión 1 — Fix de Build en Producción
**Commit:** `f525d03`

#### Problema
El build de Vercel fallaba con el siguiente error:
```
[builtin:vite-transform] Error: Unexpected token.
Did you mean `{'}'}` or `&rbrace;`?
src/components/v1/FilmPageV1.jsx:258:12
```

#### Diagnóstico
1. **`FilmPageV1.jsx`**: Faltaba un `</div>` de cierre en el bloque condicional del tráiler. El JSX quedaba mal balanceado y el parser de Rolldown/Vite lo marcaba como error fatal.
2. **`index.css`**: La regla `@import url('https://fonts.googleapis.com/...')` estaba ubicada *dentro* de un `@layer base {}`, lo cual no es CSS estándar válido y generaba un warning durante la optimización.

#### Solución
- Añadido `</div>` faltante en `FilmPageV1.jsx` línea ~258.
- Movido `@import` de Google Fonts al **tope del archivo** `index.css`, antes de cualquier `@layer`.

#### Archivos modificados
- `src/components/v1/FilmPageV1.jsx`
- `src/index.css`

---

### 🟡 Sesión 2 — SPA Routing + Navbar Mobile
**Commit:** `18e97e8`

#### Problema
El sitio funcionaba en desktop pero **fallaba en mobile**. Cualquier URL directa devolvía un **404 Not Found** en Vercel.

#### Diagnóstico
- **Sin `vercel.json`**: Vercel trata cada ruta como un archivo estático. En una SPA con React Router, todas las rutas deben resolverse desde `index.html`. En mobile, al pegar una URL directa o refrescar, el servidor devuelve 404.
- **`Navbar.jsx` (V2)**: Menú con `hidden md:flex` sin alternativa mobile — navbar vacío en móvil.
- **`v1/Navbar.jsx` (V1)**: Botón "MENU" sin acción — no abría ningún drawer.

#### Solución

**1. Creado `vercel.json`:**
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**2. Navbar V2** reescrito con hamburguesa animada + drawer framer-motion con links, redes y toggle de versión.

**3. Navbar V1** reescrito con la misma hamburguesa animada y drawer funcional.

#### Archivos modificados
- `vercel.json` ← nuevo
- `src/components/Navbar.jsx`
- `src/components/v1/Navbar.jsx`

---

### 🟢 Sesión 3 — Responsive Mobile: FilmPage V1 y V2
**Commit:** `146b518`

#### Problema
Las páginas `/v1/atrapados` y `/v2/atrapados` no tenían diseño mobile — el layout se rompía visualmente.

#### Diagnóstico FilmPageV1

| Issue | Detalle |
|---|---|
| Grid hardcodeado | `clamp(280px,32vw,420px) 1fr` nunca colapsaba a 1 columna |
| Hero text | `bottom: 9rem` fijo cortaba el título en pantallas pequeñas |
| `maxWidth: 65%` en hero | Texto demasiado estrecho en mobile |
| Aspect ratio hero | `21/9` muy achatado en mobile |
| Ficha técnica | `minmax(300px,1fr)` no colapsaba a 1 columna en 375px |

#### Diagnóstico FilmPageV2

| Issue | Detalle |
|---|---|
| Hero `h-[90vh]` rígido | Problema con barra de dirección iOS |
| Bug sinopsis | Literal `"{film.sinopsis}"` — comillas hardcodeadas fuera del JSX |
| "VOLVER AL CATÁLOGO" | `text-8xl` desbordaba en mobile |
| Poster sin límite | Ocupaba 100% de ancho en mobile |
| Spacing `py-32 mt-32` | 8rem de padding en mobile — excesivo |

#### Solución FilmPageV1 — Layout dual
- **Mobile**: Tráiler primero → poster (38% ancho) + sinopsis lateral → ficha → elenco
- **Desktop**: Grid editorial original con poster saliendo del hero
- Hero anclado al borde inferior con padding `clamp`
- `padding` global con variable `px = 'clamp(1.2rem,5vw,4rem)'`
- Ficha con `auto-fill / minmax(260px, 1fr)`

#### Solución FilmPageV2 — Mobile-first
- Hero: `height: clamp(380px, 70vw, 90vh)`
- Título: `clamp(3rem, 10vw, 15rem)`
- Poster: `w-3/5 sm:w-1/2 lg:w-full`
- Secciones: `py-12 md:py-24 lg:py-32`
- "VOLVER": `text-2xl md:text-5xl lg:text-8xl`
- Bug sinopsis corregido: `{film.sinopsis}`

#### Archivos modificados
- `src/components/v1/FilmPageV1.jsx`
- `src/components/FilmPageV2.jsx`

---

## Resumen de Commits

| Commit | Descripción | Archivos clave |
|---|---|---|
| `f525d03` | fix: build failure + CSS @import warning | `FilmPageV1.jsx`, `index.css` |
| `18e97e8` | fix(mobile): SPA routing + hamburger menu V1 y V2 | `vercel.json`, ambos `Navbar.jsx` |
| `146b518` | fix(mobile): responsive layouts FilmPage V1 y V2 | `FilmPageV1.jsx`, `FilmPageV2.jsx` |

---

## Estado actual del proyecto

### ✅ Funcionando
- Build pasa sin errores en Vercel
- Todas las rutas resuelven correctamente en mobile y desktop
- Navbar V1 y V2 con hamburguesa mobile funcional y animada
- FilmPage V1 — layout dual mobile/desktop
- FilmPage V2 — responsive-first

### 📌 Pendiente sugerido
- [ ] Responsive general de `V1Home` y `V2Home` (hero video, featured films en mobile)
- [ ] Verificar `LogrosBanner`, `ServiciosSection` y `Footer` en mobile
- [ ] Meta tags OG por película (para compartir en redes)
- [ ] Rutas para el resto del catálogo (actualmente solo Atrapados tiene ficha completa)
- [ ] Lazy loading de imágenes pesadas (pósters, heroes)

---

*Bitácora generada el 10/04/2026 — Haddock Films 2026*
