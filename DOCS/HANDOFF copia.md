# HANDOFF — Estado actual del proyecto

> **Este es el documento más importante para vos.** Copiá su contenido al inicio de cada conversación nueva con cualquier IA (Claude, Antigravity, Gemini). En 30 segundos retoman el contexto sin perder nada.
>
> **Regla:** Al final de cada sesión, actualizá este archivo con el nuevo estado. Si no lo actualizás, en la próxima sesión vas a estar perdido.

---

## Snapshot del proyecto

- **Proyecto:** Haddock Films 2026 — sitio institucional de productora de cine.
- **Cliente:** Haddock Films (decisión visual ya aprobada por el cliente).
- **URL producción:** https://haddock-films2026.vercel.app
- **Última actualización de este documento:** 2026-05-18

---

## Fase actual

**Fase 2 — Optimización y Componentes**

Estado: **En progreso (Parte técnica completada).**

Próxima acción concreta: Diseño interno de las páginas con Claude usando los componentes primitivos creados en `src/components/primitives/`.

---

## Lo último que se hizo

- 2026-05-18: Generación de los documentos maestros y ejecución de Fase 0 (Baseline).
- 2026-05-18: Ejecución de Fase 1 (Migración a Next.js 15) y remediación de estilos.
- 2026-05-18: Optimización de imágenes pesadas (reducción drástica de tamaño a WebP) y actualización de referencias en `films.ts`.
- 2026-05-18: Refactor de películas destacadas para que sean dinámicas y alternen layout automáticamente.
- 2026-05-18: Creación de 8 componentes primitivos y página de QA (`/dev/components`) para validar el sistema de diseño.
- 2026-05-18: Limpieza de deuda técnica (eliminación de `border-radius: 0 !important` global).

---

## Lo próximo a hacer

1. **Trabajar con Claude** en el diseño interno de las páginas usando los componentes primitivos creados en `src/components/primitives/`.
2. **Refactor de estilos inline** en la página de detalle de película para usar Tailwind.

---

## Decisiones aprobadas (resumen rápido)

Para detalles completos ver `MASTER_PLAN.md` sección 1.

- **Stack:** Next.js 15 + TypeScript + Tailwind v4 + Framer Motion.
- **Visual:** Editorial Claro — fondo `#f9f9f9`, texto `#1A1A1A`, acento `#C8892A`, Playfair Display + Inter.
- **Idioma:** Español Argentina (`es-AR`).
- **Datos:** JSON local (no CMS por ahora).
- **Mailing:** Lo implementa el cliente manualmente, fuera del scope del agente.

---

## Bloqueos activos

Ninguno por el momento. (Las referencias visuales no bloquean hasta la Fase 3.)

---

## Bugs / deuda técnica conocida

Heredada del proyecto Vite actual:

1. Estilos inline (`style={{...}}`) en la página de detalle de película — refactor a Tailwind (pendiente).
2. Convivencia de archivos JPG y WebP en el repositorio (estrategia válida para SEO, pero a limpiar si se desea orden estricto).

*(Nota: Los bugs de idioma, border-radius global, imágenes gigantes, SEO ciego, falta de metadata dinámica y repetición de código en el home ya fueron resueltos en esta sesión).*

---

## Métricas baseline

Registradas el 2026-05-18 (antes de Fase 1).

```
Lighthouse Desktop:  [PERFORMANCE: 97] [A11Y: 95] [BP: 100] [SEO: 83]
Lighthouse Mobile:   [PERFORMANCE: 87] [A11Y: 95] [BP: 100] [SEO: 83]
LCP:                 3.1s (mobile) / 0.9s (desktop)
INP:                 3.1s (mobile) / 0.9s (desktop)
CLS:                 0
Bundle inicial (JS): 143.38 kb gzip
```

---

## Métricas objetivo (al cierre del proyecto)

```
Lighthouse Desktop:  Performance 95+ | A11y 95+ | BP 95+ | SEO 100
Lighthouse Mobile:   Performance 90+ | A11y 95+ | BP 95+ | SEO 100
LCP:                 < 2.5s mobile
INP:                 < 200ms
CLS:                 < 0.1
Bundle inicial (JS): < 150kb gzip
```

---

## Repositorio y deploy

- Repo: (pendiente de confirmar URL si es público)
- Branch principal: `main`
- Deploy automático: Vercel sobre `main`
- Branches de feature: convención `feat/fase-N-descripcion`

---

## Contactos / responsabilidades

- **Producto / decisiones:** dueño del proyecto.
- **Ejecución técnica:** Antigravity (agente).
- **Asesoría estratégica y revisión:** Claude.
- **Mailing y backend (futuro):** dueño del proyecto, manualmente.
- **Vercel:** dueño del proyecto.

---

## Cómo usar este documento

**Al iniciar una sesión:**
1. Abrir este archivo.
2. Copiar contenido completo.
3. Pegarlo en la primera línea del chat con la IA que vayas a usar.
4. La IA queda al día en 30 segundos.

**Al cerrar una sesión:**
1. Actualizar la sección "Lo último que se hizo".
2. Actualizar "Lo próximo a hacer".
3. Si cambió la fase actual, actualizar "Fase actual".
4. Si se desbloqueó o bloqueó algo, actualizar "Bloqueos activos".
5. Si se midió algo, actualizar "Métricas baseline".

**Si no estás seguro de qué hacer:**
Pegale este archivo a Claude y pedile el plan para la próxima sesión.
