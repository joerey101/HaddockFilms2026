import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const filmsData = [
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
  const filteredFilms = filtro === 'Todos' 
    ? filmsData 
    : filmsData.filter(f => f.tipo === filtro);

  return (
    <section id="catalogo" className="w-full bg-background pt-32 pb-64 px-[6vw]">
      {/* Header with Title + Filters */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-16">
        <h2 className="font-display text-[clamp(4rem,10vw,12rem)] leading-[0.8] text-primary uppercase select-none pointer-events-none">
          FILMOGRAFÍA
        </h2>
        
        <div className="flex flex-wrap gap-2">
          {FILTROS.map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`text-[10px] font-sans tracking-[0.3em] uppercase px-6 py-3 transition-all duration-300 ${
                filtro === f 
                  ? 'bg-accent text-black font-bold' 
                  : 'bg-transparent text-primary/40 hover:text-primary border border-primary/10'
              }`}
            >
              {f === 'Todos' ? 'Todos' : f === 'Película' ? 'Películas' : f === 'Serie' ? 'Series' : 'Documentales'}
            </button>
          ))}
        </div>
      </div>

      {/* Extreme Compact Grid */}
      <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredFilms.map((film, idx) => (
            <motion.div
              layout
              key={film.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: idx * 0.02, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[2/3] group overflow-hidden bg-surface"
            >
              <img 
                src={film.image} 
                alt={film.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Badge Series/Doc */}
              {film.tipo !== 'Película' && (
                <div className="absolute top-0 left-0 bg-accent text-black text-[8px] font-sans font-bold px-2 py-1 tracking-widest z-10">
                  {film.tipo.toUpperCase()}
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center p-6 text-center select-none">
                <h3 className="font-serif italic text-[clamp(1.2rem,1.5vw,2rem)] text-primary leading-tight mb-2">
                  {film.title}
                </h3>
                <span className="text-[10px] font-sans tracking-[0.2em] text-accent opacity-80">
                  {film.year}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default CatalogueScene;
