# CONTENT MODEL — Haddock Films 2026

> Estructura del contenido del sitio. Modelo de datos de películas, naming de assets, dónde va cada cosa.
>
> **Regla:** Si agregás una película o cambiás el dataset y este documento no refleja el cambio, ese cambio no existe.

---

## 1. Estado actual del dataset

Origen: `src/data/films.ts` (a migrar desde `filmsData.js` actual a TypeScript).

**Cantidad de producciones**: 28 (al 2026-05-18).

**Decisión:** Mantener JSON local tipado. Migración a CMS (Sanity, Payload, Contentful) queda como decisión post-lanzamiento, NO en este alcance.

---

## 2. Schema tipado del Film

```ts
// src/data/films.schema.ts

export type FilmType = 'pelicula' | 'serie' | 'documental' | 'cortometraje';

export type ImageAsset = {
  /** Ruta local relativa a /public, ej: "/films/el-secreto-de-sus-ojos/poster.jpg" */
  local_path: string;
  /** Texto alt para accesibilidad y SEO */
  alt: string;
  /** Ancho original en píxeles */
  width?: number;
  /** Alto original en píxeles */
  height?: number;
};

export type Award = {
  name: string;            // ej: "Oscar a Mejor Película Extranjera"
  year: number;
  category?: string;       // ej: "Mejor Película Extranjera"
  festival?: string;       // ej: "Academy Awards", "Festival de San Sebastián"
  result: 'ganadora' | 'nominada' | 'mencion';
};

export type CastMember = {
  name: string;
  character?: string;
  image?: ImageAsset;
};

export type Film = {
  /** ID numérico estable. No cambia entre versiones. */
  id: number;

  /** Slug en kebab-case, sin acentos, sin año. Único. */
  slug: string;

  /** Título oficial */
  title: string;

  /** Título original (si difiere del oficial) */
  title_original?: string;

  /** Subtítulo o tagline */
  tagline?: string;

  /** Año de estreno */
  year: number;

  /** Tipo de producción */
  type: FilmType;

  /** Si es serie: cantidad de episodios. Ej: "1 temporada, 8 episodios" */
  episodes?: string;

  /** Duración en minutos (películas) */
  duration?: number;

  /** Géneros */
  genre?: string[];

  /** Directores (uno o varios) */
  directors: string | string[];

  /** Guion */
  screenplay?: string[];

  /** Adaptación */
  adaptation?: string;

  /** Productores (de Haddock y co-producción) */
  producers?: string[];

  /** Países productores. Ej: ["Argentina"], ["Argentina", "España"] */
  countries?: string[];

  /** Idioma original */
  language?: string;

  /** Sinopsis completa (puede contener \n\n para párrafos) */
  synopsis: string;

  /** Sinopsis cortada para metadata SEO (≤ 155 chars) */
  synopsis_short?: string;

  /** Si la sinopsis se quiere renderizar como párrafos separados explícitos */
  synopsis_paragraphs?: string[];

  /** Elenco */
  cast?: CastMember[] | string[];

  /** URL del tráiler (YouTube o Vimeo) */
  trailer_url?: string;

  /** Poster oficial */
  poster: ImageAsset;

  /** Imagen hero (más grande, horizontal). Si no existe, se usa el primer still. */
  hero?: ImageAsset;

  /** Stills de la película */
  stills?: ImageAsset[];

  /** Reconocimientos y premios */
  awards?: Award[];

  /** Festivales donde participó (lista textual simple) */
  festivals?: string[];

  /** Distribuidora */
  distributor?: string;

  /** Fecha de estreno comercial. Formato ISO: "2009-08-13" */
  release_date?: string;

  /** Si está disponible para streaming, dónde */
  streaming?: { platform: string; url: string }[];

  /** Featured: si aparece destacada en la home */
  featured?: boolean;

  /** Featured order: en qué posición aparece si está destacada */
  featured_order?: number;
};
```

---

## 3. Campos obligatorios vs opcionales

### Obligatorios (no se acepta una película sin esto)

- `id`
- `slug`
- `title`
- `year`
- `type`
- `directors`
- `synopsis`
- `poster` (con `local_path` y `alt`)

### Recomendados (deberían estar siempre que sea posible)

- `synopsis_short` (para SEO)
- `cast`
- `trailer_url`
- `hero` o al menos un `stills[0]`
- `awards` si los hay
- `countries`
- `language`

### Opcionales (cuando aplique)

- `title_original`
- `tagline`
- `episodes` (sólo series)
- `duration` (sólo películas)
- `genre`
- `screenplay`
- `adaptation`
- `producers`
- `distributor`
- `release_date`
- `streaming`
- `festivals`
- `featured`, `featured_order`

---

## 4. Convenciones de slug

- **kebab-case**, todo minúsculas.
- **Sin acentos** (los reemplazos: `á→a`, `é→e`, `í→i`, `ó→o`, `ú→u`, `ñ→n`).
- **Sin artículos al inicio** en casos ambiguos. Ej: "El tiempo de las moscas" → `el-tiempo-de-las-moscas` (mantenemos "el" porque es parte del título). Pero "La cara que merecemos" → `la-cara-que-merecemos` (idem).
- **Sin año** salvo desambiguación (ej: hay dos versiones de "Elena sabe", entonces `elena-sabe-2023`).
- **Únicos**: no puede haber dos slugs iguales.
- **Estables**: una vez en producción, **no se cambian** (rompe SEO y links externos).

### Ejemplos

| Título | Slug correcto | Slug incorrecto |
|--------|---------------|-----------------|
| El secreto de sus ojos | `el-secreto-de-sus-ojos` | `secreto-de-sus-ojos-2009` |
| Relatos salvajes | `relatos-salvajes` | `Relatos-Salvajes` |
| Atrapados | `atrapados` | `atrapados-serie-2024` |
| El tiempo de las moscas | `el-tiempo-de-las-moscas` | `eltiempodelasmoscas` |
| Elena sabe (2023) | `elena-sabe-2023` (si hay otra Elena sabe) | `elena-sabe` (si hay duplicado) |

---

## 5. Estructura de carpetas de assets

### `/public/films/{slug}/`

Cada película tiene su carpeta con todos sus assets.

```
/public/films/el-secreto-de-sus-ojos/
├── poster.jpg              # Poster oficial vertical (2:3 ratio)
├── hero.jpg                # Hero horizontal grande (16:9 o 2.39:1)
├── still-01.jpg            # Stills numerados
├── still-02.jpg
├── still-03.jpg
└── cast/
    ├── ricardo-darin.jpg   # Foto de cada actor (opcional)
    └── soledad-villamil.jpg
```

### Naming de archivos

- **Posters**: siempre `poster.jpg` (o `.webp`).
- **Hero**: siempre `hero.jpg` (o `.webp`).
- **Stills**: `still-01.jpg`, `still-02.jpg`, etc. (con padding de cero para orden lexicográfico).
- **Cast**: `nombre-apellido.jpg` en `cast/`.
- **Sin espacios, sin mayúsculas, sin acentos.**

### Dimensiones recomendadas

| Asset | Dimensiones | Ratio | Peso máx |
|-------|-------------|-------|----------|
| Poster | 800×1200 | 2:3 | 200kb |
| Hero | 1920×1080 o 1920×800 | 16:9 / 2.39:1 | 400kb |
| Still | 1920×1080 | 16:9 | 350kb |
| Cast | 400×400 | 1:1 (square crop) | 80kb |

### Optimización antes de subir

```
1. Resize al tamaño máximo recomendado.
2. Convertir a WebP si origen es PNG (salvo logos con transparencia).
3. Comprimir con Squoosh.app, MozJPEG q=82 o WebP q=80.
4. Verificar peso final.
5. Renombrar siguiendo la convención.
```

---

## 6. Sinopsis — guía editorial

### Largo

- **Sinopsis completa (`synopsis`)**: 100-400 palabras. Puede tener 2-4 párrafos.
- **Sinopsis corta (`synopsis_short`)**: una frase de 120-155 caracteres. Para SEO.

### Tono

- Tiempo verbal: **presente del indicativo**. Ej: "Un agente jubilado investiga..." no "Un agente jubilado investigó...".
- **No spoilers**. Punto.
- **No empezar con "La película cuenta la historia de..."**. Entrar en seco. Ej: "Buenos Aires, 1974. Benjamín Espósito..." es mejor que "La película cuenta la historia de Benjamín Espósito...".
- **No usar superlativos genéricos**: "increíble historia", "emocionante drama". Si la película es buena, lo va a transmitir el contenido, no el adjetivo.
- **Mencionar al director una vez** si tiene peso editorial: "Dirigida por Juan José Campanella". Si es debut o director menos conocido, mencionarlo igual.

### Ejemplo

> **Sinopsis corta:** Un agente jubilado regresa a un crimen sin resolver que lo persigue desde hace 25 años. Dirigida por Juan José Campanella.
>
> **Sinopsis completa:**
> Buenos Aires, 1974. Benjamín Espósito, oficial de un juzgado de instrucción, investiga la violación y asesinato de una joven recién casada. Veinticinco años después, ya jubilado, decide escribir una novela sobre aquel caso. El acto de revisitar los archivos y a las personas que conoció entonces reabre heridas que nunca terminaron de cerrar.
>
> Dirigida por Juan José Campanella sobre la novela de Eduardo Sacheri, *El secreto de sus ojos* construye un retrato a la vez íntimo y político de un país que prefiere no recordar.

---

## 7. Alt text de imágenes — guía

Cada imagen necesita un alt **descriptivo**, no genérico.

### Reglas

- **Posters**: `Poster de [Título]`. Ej: `Poster de El secreto de sus ojos`.
- **Heroes / Stills principales**: descripción breve de la escena. Ej: `Ricardo Darín y Soledad Villamil en una escena del tribunal.` Si no hay descripción, fallback: `Still de [Título]`.
- **Decorativas**: `alt=""` (string vacío) + `aria-hidden="true"`.
- **Logos de premios** (laureles): `Laurel de [Festival]`. Ej: `Laurel del Festival de San Sebastián`.

### Lo que NO va

- ❌ `alt="imagen"`, `alt="foto"`, `alt="picture"`.
- ❌ Repetir el title que ya está en el contenedor.
- ❌ "Imagen de..." al principio (redundante).

---

## 8. Datos sensibles y derechos

### Cosas a confirmar con el cliente antes de publicar

- **Derechos de stills**: ¿están todos los stills publicables públicamente? Algunos quedan reservados a prensa.
- **Derechos de fotos de cast**: ¿se pueden usar fotos individuales de actores? En algunos casos no.
- **Logos de festivales y premios**: los laureles oficiales requieren autorización del festival. Verificar.
- **Trailers**: ¿los embeds de YouTube son del canal oficial de Haddock o de un tercero? Si es de un tercero, considerar pedir versión oficial o re-uploadear.

### Datos personales en el sitio

- **Sin emails personales**. Si hay contacto, usar `contacto@haddockfilms.com` (genérico).
- **Sin teléfonos directos**.
- **Sin direcciones físicas detalladas** salvo dirección oficial confirmada.

---

## 9. Workflow para agregar una película nueva

```
1. Crear carpeta /public/films/{slug}/
2. Subir poster, hero, stills (siguiendo convenciones de naming y peso).
3. Abrir src/data/films.ts.
4. Agregar el nuevo objeto Film al final del array (siguiendo el schema).
5. Completar campos obligatorios + recomendados.
6. Verificar que el slug es único.
7. Si la película va featured, marcarla con featured: true y featured_order: N.
8. npm run build → verificar que no hay errores de tipo.
9. Probar localmente: la ficha renderiza, el sitemap incluye la nueva URL.
10. Commit con mensaje "feat(content): add [título]".
11. Push → Vercel deploya.
12. Validar OG preview en Twitter Card Validator.
```

---

## 10. Workflow para actualizar una película existente

```
1. Localizar la película en src/data/films.ts por id o slug.
2. Editar los campos necesarios.
3. NO CAMBIAR EL SLUG si la página ya está indexada en Google (rompería SEO).
   Si hay que cambiar el slug, agregar un redirect en next.config.mjs:
     { source: '/peliculas/slug-viejo', destination: '/peliculas/slug-nuevo', permanent: true }
4. Si se cambia el poster, asegurarse que el peso es razonable.
5. npm run build → typecheck.
6. Commit con mensaje "fix(content): update [título] [campo cambiado]".
```

---

## 11. Validaciones automáticas (a implementar)

Script `scripts/validate-content.ts` que corre en pre-commit:

- Todos los films tienen los campos obligatorios.
- Todos los slugs son únicos.
- Todos los `local_path` apuntan a archivos que existen en `/public`.
- Ninguna imagen referenciada pesa más del máximo recomendado.
- `synopsis_short` ≤ 160 caracteres.
- `directors` no está vacío.

(Esta validación se construye en Fase 1 o Fase 2.)

---

## 12. Versionado

| Versión | Fecha | Cambio |
|---------|-------|--------|
| 1.0 | 2026-05-18 | Modelo inicial. Schema definido. Convenciones de assets y slug establecidas. |
