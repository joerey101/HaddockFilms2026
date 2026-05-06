# Haddock Films 2026

Repositorio oficial del catálogo web de Haddock Films.

## Arquitectura y Estado Actual
**Versión Activa:** `V1 (Editorial)`
El proyecto se consolidó bajo la versión V1 (fondo claro, diseño editorial). La versión V2 (Industrial) ha sido desactivada del enrutamiento por solicitud de diseño y simplicidad operativa, pero se mantiene su estructura por si se decide reutilizar en el futuro.

## Características Principales
*   **Base de datos local en crudo:** Toda la información de películas, equipo técnico y reconocimientos se encuentra almacenada en `/src/data/filmsData.js` de forma estática, garantizando tiempos de carga ultrarrápidos sin depender de un CMS externo (como WordPress).
*   **React Router:** Implementación SPA (Single Page Application) que asegura que toda la navegación fluya sin recargar la página.
*   **Mobile-First:** Las fichas de las películas y el menú de navegación están fuertemente optimizados para dispositivos móviles (menú hamburguesa nativo y tipografías responsivas vía CSS clamp).
*   **Alojamiento:** El repositorio se despliega automáticamente a través de Vercel (https://haddock-films2026.vercel.app/).

## Scripts
- `npm run dev`: Inicia el servidor de desarrollo en localhost.
- `npm run build`: Genera el empaquetado de producción estático en `/dist`.

## Organización del Proyecto
Archivos en desuso (backups de scripts, intentos de migración XML, copias duplicadas antiguas y borradores) han sido cuidadosamente movidos a un directorio ignorado llamado `/EXTRAS` para preservar un código limpio y profesional en este repositorio de GitHub.
