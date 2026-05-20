# GUÍA DE ARRANQUE DE SESIÓN — Haddock Films 2026

Este documento sirve como protocolo estándar de inicio de jornada o sesión de desarrollo. Seguir estos pasos garantiza que no haya regresiones y que el contexto del proyecto se mantenga unificado entre sesiones.

---

## 📋 Pasos para Iniciar la Sesión

### Paso 1: Recuperación de Contexto (Lectura de Documentación)
Antes de escribir cualquier línea de código o ejecutar comandos, se deben leer los archivos `.md` clave en la carpeta `/DOCS` para recuperar la memoria del proyecto:
1. **`HANDOFF_antigravity.md`**: Muestra la fase actual, el último estado y las tareas inmediatas.
2. **`BITACORA_antigravity.md`**: Detalla cronológicamente lo que se hizo, lo que se decidió y las métricas de la última sesión.
3. **`MASTER_PLAN.md`**: Contiene la visión general del proyecto, el stack definitivo y la planificación de fases.
4. **`TECHNICAL_SPEC.md`**: Define las convenciones de código, la estructura de carpetas, reglas de TypeScript y Tailwind v4.

### Paso 2: Levantar el Entorno de Desarrollo (Port 3001)
El proyecto de Next.js se debe levantar localmente en el puerto **3001** para evitar colisiones con otros servicios y asegurar que corra bajo la configuración del entorno actual.

Ejecutar el comando:
```bash
npm run dev -- -p 3001
```

O alternativamente si se requiere de forma directa:
```bash
npx next dev -p 3001
```

**Verificación:**
- Validar que en la consola se muestre: `▲ Next.js 16.2.6 (Turbopack)` y `Ready in ...ms`.
- Local URL: `http://localhost:3001`

### Paso 3: Validar que el Servidor Corra de Forma Limpia
- El dev server no debe arrojar errores críticos en consola al compilar las páginas.
- Nota: *Por directiva explícita, no se deben realizar tests automáticos con el browser subagent en cada arranque a menos que se solicite formalmente.*

---

## 🛠️ Flujo de Cierre de Sesión

Al terminar el trabajo del día o de la sesión actual:
1. **Actualizar la Bitácora (`DOCS/BITACORA_antigravity.md`)**:
   - Crear una nueva entrada bajo la plantilla de fecha `YYYY-MM-DD`.
   - Detallar: Qué se hizo, Qué se decidió, Qué quedó pendiente y Métricas relevantes.
2. **Actualizar el Handoff (`DOCS/HANDOFF_antigravity.md`)**:
   - Actualizar el snapshot y la sección "Lo último que se hizo" y "Lo próximo a hacer".
   - Cambiar la Fase actual si corresponde.
