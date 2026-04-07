import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const films = [
  { id: 27, title: 'El Tiempo de las Moscas',          year: 2025, director: 'Mariana Enríquez',    tipo: 'Serie',      image: '/assets/Tiempo-Moscas-Poster.jpg' },
  { id: 26, title: 'Elena Sabe',                       year: 2025, director: 'Anahí Berneri',       tipo: 'Película',   image: '/assets/ES_ELENA_RGB_VERTICAL_TheatricalBUG_9x16_PRE-2.jpg' },
  { id: 25, title: 'Atrapados',                        year: 2025, director: 'Miguel Cohan',        tipo: 'Serie',      image: '/assets/Atrapados-Netflix-Haddock-Films-poster.jpg' },
  { id: 24, title: 'El Fotógrafo y el Cartero',       year: 2023, director: 'Sebastián Kohan',     tipo: 'Documental', image: '/assets/Cabezas_poster_theatrical.png' },
  { id: 23, title: 'Un Día en Movimiento',            year: 2022, director: '',                    tipo: 'Documental', image: '/assets/un-dia-en-movimiento-2022.jpg' },
  { id: 22, title: 'Bitácoras',                       year: 2021, director: '',                    tipo: 'Película',   image: '/assets/bitacoras-2021.png' },
  { id: 21, title: 'Archivo de la Memoria Trans',     year: 2021, director: '',                    tipo: 'Documental', image: '/assets/archivo-de-la-memoria-trans-2021.png' },
  { id: 20, title: 'Crónica de una Tormenta',         year: 2020, director: '',                    tipo: 'Película',   image: '/assets/cronica-de-una-tormenta-2020.jpg' },
  { id: 19, title: 'Carmel',                          year: 2020, director: '',                    tipo: 'Película',   image: '/assets/carmel-quien-mato-a-mara-marta-2020.jpeg' },
  { id: 18, title: 'Impriman la Leyenda',             year: 2019, director: '',                    tipo: 'Película',   image: '/assets/impriman-la-leyenda-2019.jpeg' },
  { id: 17, title: 'Yanka y el Espíritu del Volcán',  year: 2018, director: '',                    tipo: 'Película',   image: '/assets/yanka-y-el-espritu-del-volcn-2018.jpg' },
  { id: 16, title: 'La Noche de los 12 Años',         year: 2018, director: 'Álvaro Brechner',     tipo: 'Película',   image: '/assets/la-noche-de-los-12-aos-2018.jpg' },
  { id: 15, title: 'Happy Hour',                      year: 2018, director: '',                    tipo: 'Película',   image: '/assets/happy-hour-2018.jpg' },
  { id: 14, title: 'La Novia del Desierto',           year: 2017, director: '',                    tipo: 'Película',   image: '/assets/la-novia-del-desierto-2017.jpg' },
  { id: 13, title: 'El Último Traje',                 year: 2017, director: '',                    tipo: 'Película',   image: '/assets/el-ultimo-traje-2017.jpg' },
  { id: 12, title: 'Al Final del Túnel',              year: 2016, director: '',                    tipo: 'Película',   image: '/assets/al-final-del-tunel-2016.jpeg' },
  { id: 11, title: 'En Viaje',                        year: 2015, director: '',                    tipo: 'Película',   image: '/assets/en-viaje-2015.jpg' },
  { id: 10, title: 'Eva',                             year: 2015, director: '',                    tipo: 'Película',   image: '/assets/eva-poster-2015.jpg' },
  { id: 9,  title: 'Betibú',                          year: 2014, director: '',                    tipo: 'Película',   image: '/assets/betibu-2014.jpg' },
  { id: 8,  title: 'Tesis sobre un Homicidio',        year: 2013, director: '',                    tipo: 'Película',   image: '/assets/tesis-sobre-un-homicidio-2013.jpg' },
  { id: 7,  title: 'Todos Tenemos un Plan',           year: 2012, director: '',                    tipo: 'Película',   image: '/assets/todos-tenemos-un-plan-2012.jpg' },
  { id: 6,  title: 'Sin Retorno',                     year: 2010, director: '',                    tipo: 'Película',   image: '/assets/sin-retorno--2010.jpg' },
  { id: 5,  title: 'Las Viudas de los Jueves',        year: 2009, director: '',                    tipo: 'Película',   image: '/assets/las-viudas-de-los-jueves-2009.jpg' },
  { id: 4,  title: 'El Secreto de sus Ojos',          year: 2009, director: 'Juan J. Campanella',  tipo: 'Película',   image: '/assets/el-secreto-poster-2009.jpg' },
  { id: 3,  title: 'El Corredor Nocturno',            year: 2009, director: '',                    tipo: 'Película',   image: '/assets/el-corredor-nocturno-2009.jpg' },
  { id: 2,  title: 'Paisito',                         year: 2008, director: '',                    tipo: 'Película',   image: '/assets/paisito-2008.jpg' },
  { id: 1,  title: 'Cara de Queso',                   year: 2006, director: '',                    tipo: 'Serie',      image: '/assets/cara-de-queso-2006.jpg' },
];

const FILTROS = ['Todos', 'Película', 'Serie', 'Documental'];

const CatalogueScene = ({ filtro, setFiltro }) => {

  const filmsFiltrados = filtro === 'Todos'
    ? films
    : films.filter(f => f.tipo === filtro);

  return (
    <section id="catalogo" className="w-full py-[clamp(4rem,6vw,8rem)] px-[6vw] bg-background">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="flex flex-col gap-6 mb-12"
      >
        {/* Título + contador */}
        <div className="flex items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-secondary">
              — Archivo
            </span>
            <h2 className="font-serif text-[clamp(1.8rem,2.5vw,3rem)] leading-tight tracking-tight text-primary">
              Filmografía completa
            </h2>
          </div>

          {/* Filtros */}
          <div className="flex gap-2 flex-wrap justify-end">
            {FILTROS.map((f) => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`text-[11px] font-sans uppercase tracking-[0.2em] px-[1.1rem] py-[0.55rem] border transition-colors duration-300 cursor-pointer ${
                  filtro === f
                    ? 'bg-primary text-white border-primary'
                    : 'bg-transparent text-primary/50 border-primary/20 hover:border-primary/50 hover:text-primary'
                }`}
              >
                {f === 'Todos' ? 'Todos' : f === 'Película' ? 'Películas' : f === 'Serie' ? 'Series' : 'Documentales'}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={filtro}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8"
        >
          {filmsFiltrados.map((film, idx) => (
            <motion.div
              key={film.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: (idx % 4) * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-3 group cursor-pointer"
            >
              {/* Poster 2:3 */}
              <div className="aspect-[2/3] overflow-hidden bg-[#e8e8e8] relative">
                <img
                  src={film.image}
                  alt={`Afiche de ${film.title} (${film.year})`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
                {/* Badge tipo */}
                {film.tipo !== 'Película' && (
                  <span className="absolute top-2 left-2 text-[9px] font-sans uppercase tracking-[0.2em] bg-primary text-white px-2 py-1">
                    {film.tipo}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex flex-col gap-0.5">
                <h3 className="font-serif text-[clamp(0.85rem,1.1vw,1.1rem)] text-primary leading-snug group-hover:italic transition-all duration-400">
                  {film.title}
                </h3>
                <span className="text-[10px] font-sans uppercase tracking-[0.15em] text-secondary opacity-60">
                  {film.year}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

    </section>
  );
};

export default CatalogueScene;
