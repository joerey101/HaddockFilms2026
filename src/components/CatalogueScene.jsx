import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { filmsData } from '../data/filmsData';

const FILTROS = ['Todos', 'Película', 'Serie', 'Documental'];

const CatalogueScene = ({ filtro, setFiltro, onNavigate }) => {
  const filteredFilms = filtro === 'Todos' 
    ? filmsData 
    : filmsData.filter(f => f.tipo.includes(filtro));

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
          {filteredFilms.map((film, idx) => {
            const isClickable = film.id === 25;
            return (
              <motion.div
                layout
                key={film.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.02, ease: [0.16, 1, 0.3, 1] }}
                className={`relative aspect-[2/3] group overflow-hidden bg-surface ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
                onClick={() => isClickable && onNavigate && onNavigate(film.id)}
              >
                <img 
                  src={film.poster} 
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
                  
                  {isClickable && (
                    <div className="mt-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <span className="text-[9px] tracking-[0.3em] border-b border-accent pb-1">VER FICHA</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default CatalogueScene;
