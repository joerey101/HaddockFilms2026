import React from 'react';
import { motion } from 'framer-motion';

const films = [
  { id: 24, title: 'El Fotógrafo y el Cartero',       year: 2023, director: 'Sebastián Kohan',     image: '/assets/Cabezas_poster_theatrical.png' },
  { id: 23, title: 'Un Día en Movimiento',            year: 2022, director: '',                    image: '/assets/un-dia-en-movimiento-2022.jpg' },
  { id: 22, title: 'Bitácoras',                       year: 2021, director: '',                    image: '/assets/bitacoras-2021.png' },
  { id: 21, title: 'Archivo de la Memoria Trans',     year: 2021, director: '',                    image: '/assets/archivo-de-la-memoria-trans-2021.png' },
  { id: 20, title: 'Crónica de una Tormenta',         year: 2020, director: '',                    image: '/assets/cronica-de-una-tormenta-2020.jpg' },
  { id: 19, title: 'Carmel',                          year: 2020, director: '',                    image: '/assets/carmel-quien-mato-a-mara-marta-2020.jpeg' },
  { id: 18, title: 'Impriman la Leyenda',             year: 2019, director: '',                    image: '/assets/impriman-la-leyenda-2019.jpeg' },
  { id: 17, title: 'Yanka y el Espíritu del Volcán',  year: 2018, director: '',                    image: '/assets/yanka-y-el-espritu-del-volcn-2018.jpg' },
  { id: 16, title: 'La Noche de los 12 Años',         year: 2018, director: 'Álvaro Brechner',     image: '/assets/la-noche-de-los-12-aos-2018.jpg' },
  { id: 15, title: 'Happy Hour',                      year: 2018, director: '',                    image: '/assets/happy-hour-2018.jpg' },
  { id: 14, title: 'La Novia del Desierto',           year: 2017, director: '',                    image: '/assets/la-novia-del-desierto-2017.jpg' },
  { id: 13, title: 'El Último Traje',                 year: 2017, director: '',                    image: '/assets/el-ultimo-traje-2017.jpg' },
  { id: 12, title: 'Al Final del Túnel',              year: 2016, director: '',                    image: '/assets/al-final-del-tunel-2016.jpeg' },
  { id: 11, title: 'En Viaje',                        year: 2015, director: '',                    image: '/assets/en-viaje-2015.jpg' },
  { id: 10, title: 'Eva',                             year: 2015, director: '',                    image: '/assets/eva-poster-2015.jpg' },
  { id: 9,  title: 'Betibú',                          year: 2014, director: '',                    image: '/assets/betibu-2014.jpg' },
  { id: 8,  title: 'Tesis sobre un Homicidio',        year: 2013, director: '',                    image: '/assets/tesis-sobre-un-homicidio-2013.jpg' },
  { id: 7,  title: 'Todos Tenemos un Plan',           year: 2012, director: '',                    image: '/assets/todos-tenemos-un-plan-2012.jpg' },
  { id: 6,  title: 'Sin Retorno',                     year: 2010, director: '',                    image: '/assets/sin-retorno--2010.jpg' },
  { id: 5,  title: 'Las Viudas de los Jueves',        year: 2009, director: '',                    image: '/assets/las-viudas-de-los-jueves-2009.jpg' },
  { id: 4,  title: 'El Secreto de sus Ojos',          year: 2009, director: 'Juan J. Campanella',  image: '/assets/el-secreto-poster-2009.jpg' },
  { id: 3,  title: 'El Corredor Nocturno',            year: 2009, director: '',                    image: '/assets/el-corredor-nocturno-2009.jpg' },
  { id: 2,  title: 'Paisito',                         year: 2008, director: '',                    image: '/assets/paisito-2008.jpg' },
  { id: 1,  title: 'Cara de Queso',                   year: 2006, director: '',                    image: '/assets/cara-de-queso-2006.jpg' },
];

const CatalogueScene = () => {
  return (
    <section className="w-full py-[clamp(4rem,6vw,8rem)] px-[6vw] bg-background">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="flex items-end justify-between mb-12"
      >
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-secondary">
            — Archivo
          </span>
          <h2 className="font-serif text-[clamp(1.8rem,2.5vw,3rem)] leading-tight tracking-tight text-primary">
            Filmografía completa
          </h2>
        </div>
        <span className="text-[11px] font-sans text-secondary hidden md:block">
          {films.length} películas
        </span>
      </motion.div>

      {/* Grid 4 columnas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
        {films.map((film, idx) => (
          <motion.div
            key={film.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: (idx % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col gap-3 group cursor-pointer"
          >
            {/* Poster 2:3 */}
            <div className="aspect-[2/3] overflow-hidden bg-[#e8e8e8]">
              <img
                src={film.image}
                alt={film.title}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
              />
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
      </div>

    </section>
  );
};

export default CatalogueScene;
