import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { filmsData } from '../../data/filmsData';

const FILTROS = ['Todos', 'Película', 'Serie', 'Documental'];

const CatalogueScene = ({ filtro, setFiltro, onNavigate }) => {

  const filmsFiltrados = filtro === 'Todos'
    ? filmsData
    : filmsData.filter(f => f.tipo.includes(filtro));

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
          {filmsFiltrados.map((film, idx) => {
            const isClickable = film.id === 25;
            return (
              <motion.div
                key={film.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: (idx % 4) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col gap-3 group ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
                onClick={() => isClickable && onNavigate && onNavigate(film.id)}
              >
                {/* Poster 2:3 */}
                <div className="aspect-[2/3] overflow-hidden bg-[#e8e8e8] relative">
                  <img
                    src={film.poster}
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
                  {isClickable && (
                    <span className="text-[9px] font-sans uppercase tracking-[0.25em] text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                      VER FICHA
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

    </section>
  );
};

export default CatalogueScene;
