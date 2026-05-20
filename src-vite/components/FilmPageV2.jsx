import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import { films as filmsData } from '../data/filmsData';

const formatArray = (arr) => Array.isArray(arr) ? arr.join(', ') : arr;

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

const TechItem = ({ label, value }) => {
  if (!value) return null;
  return (
    <div className="border-b border-primary/10 py-4 flex flex-col gap-1 group">
      <span className="text-[10px] font-display tracking-[0.2em] uppercase text-accent group-hover:text-primary transition-colors">
        {label}
      </span>
      <span className="text-[13px] font-sans font-light tracking-wide text-primary/80">
        {value}
      </span>
    </div>
  );
};

const FilmPageV2 = ({ filmId, onBack, version, toggleVersion }) => {
  const [trailerOpen, setTrailerOpen] = useState(false);
  const film = filmsData.find(f => f.slug === filmId || f.id === filmId) || filmsData[0];

  return (
    <div className="bg-background text-primary min-h-screen selection:bg-accent selection:text-black">
      {/* Film Grain Global Overlay */}
      <div className="film-grain" />

      <Navbar version={version} toggleVersion={toggleVersion} />

      <main>
        {/* HERO SECTION */}
        <section className="relative w-full overflow-hidden flex items-end" style={{ height: 'clamp(380px, 70vw, 90vh)', maxHeight: '90vh' }}>
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <img
              src={film.stills?.[0]?.local_path || film.poster.local_path}
              alt={film.title}
              className="w-full h-full object-cover grayscale opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent opacity-80" />
          </motion.div>

          <div className="relative z-10 px-[6vw] pb-10 md:pb-24 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="space-y-3 md:space-y-4 max-w-4xl"
            >
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-accent font-bold">
                  {film.type === 'pelicula' ? 'Película' : 'Serie'} / {film.year}
                </span>
                {film.plataforma && (
                  <>
                    <span className="w-6 h-px bg-primary/20 hidden sm:block" />
                    <span className="text-[10px] font-sans tracking-[0.4em] uppercase opacity-60">
                      {film.plataforma}
                    </span>
                  </>
                )}
              </div>

              <h1 className="font-display leading-[0.85] uppercase tracking-tight" style={{ fontSize: 'clamp(3rem, 10vw, 15rem)' }}>
                {film.title}
              </h1>

              {film.adaptation && (
                <p className="text-[11px] font-sans tracking-[0.2em] uppercase text-primary/40 font-light">
                  Adaptación: {film.adaptation}
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex items-center gap-6 md:gap-12 mt-4 md:mt-8"
            >
              {film.trailer && (
                <button
                  onClick={() => setTrailerOpen(true)}
                  className="flex items-center gap-3 md:gap-4 group"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-accent flex items-center justify-center group-hover:bg-accent transition-all duration-500">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="group-hover:text-black transition-colors ml-1">
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-sans tracking-[0.4em] uppercase group-hover:text-accent transition-colors">
                    VER TRAILER
                  </span>
                </button>
              )}

              {film.imdb_url && (
                <a href={film.imdb_url} target="_blank" rel="noreferrer" className="text-[10px] font-sans tracking-[0.4em] uppercase text-primary/40 hover:text-primary transition-colors border-b border-primary/20 pb-1">
                  IMDB →
                </a>
              )}
            </motion.div>
          </div>

          {/* Side Title (Industrial Decoration — desktop only) */}
          <div className="absolute right-0 top-1/2 -rotate-90 origin-right translate-x-full pr-24 hidden lg:block">
            <span className="text-[10vw] font-display text-primary/5 select-none uppercase tracking-tighter">
              {film.title}
            </span>
          </div>
        </section>

        {/* CONTENT GRID */}
        <section className="px-[6vw] py-12 md:py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-20 gap-8 md:gap-16 items-start">

          {/* Poster Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-8 md:space-y-12"
          >
            {/* Poster — max 60% width on mobile so it doesn't dominate */}
            <div className="w-3/5 sm:w-1/2 lg:w-full mx-auto lg:mx-0">
              <div className="aspect-[2/3] bg-surface relative overflow-hidden group">
                <img
                  src={film.poster.local_path}
                  alt={film.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
            </div>

            <div className="space-y-4 md:space-y-6">
              <span className="text-prestige text-accent block">SINOPSIS</span>
              <p className="font-serif italic text-base md:text-xl leading-relaxed text-primary/90 border-l-2 border-accent/30 pl-6 md:pl-8">
                {film.synopsis}
              </p>
            </div>
          </motion.div>

          {/* Technical Sheet Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-start-9 lg:col-span-12"
          >
            <div className="mb-10 md:mb-16">
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl uppercase tracking-tight mb-6 md:mb-8">FICHA TÉCNICA</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-16">
                <div>
                  <TechItem label="Dirección" value={formatArray(film.directors)} />
                  <TechItem label="Producción" value={formatArray(film.producers)} />
                  <TechItem label="Prod. Ejecutivos" value={formatArray(film.executive_producers)} />
                  <TechItem label="Guionistas" value={formatArray(film.screenplay)} />
                </div>
                <div>
                  <TechItem label="Dir. Fotografía" value={formatArray(film.cinematography)} />
                  <TechItem label="Dir. Arte" value={formatArray(film.art_direction)} />
                  <TechItem label="Música Original" value={formatArray(film.music_original)} />
                  <TechItem label="Edición" value={formatArray(film.editing)} />
                  <TechItem label="Casting" value={formatArray(film.casting_direction)} />
                </div>
              </div>
            </div>

            {/* CAST SECTION */}
            {film.cast && film.cast.length > 0 && (
              <div className="mt-10 md:mt-20 lg:mt-32">
                <h2 className="font-display text-3xl md:text-5xl lg:text-6xl uppercase tracking-tight mb-6 md:mb-8">ELENCO</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                  {film.cast.map((p, i) => (
                    <div key={i} className="bg-surface/50 p-4 md:p-6 flex justify-between items-end border-l-2 border-accent">
                      <div className="space-y-1">
                        <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-accent block">PROTAGONISTA</span>
                        <span className="text-xl md:text-2xl font-display uppercase tracking-[0.1em]">{p}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </section>

        {/* BACK NAVIGATION */}
        <section className="px-[6vw] py-12 md:py-24 border-t border-primary/10">
          <button
            onClick={onBack}
            className="group flex items-center gap-4 md:gap-8 w-fit"
          >
            <span className="font-display text-2xl md:text-5xl lg:text-8xl uppercase tracking-tighter text-primary/20 group-hover:text-accent transition-colors duration-500">
              VOLVER AL CATÁLOGO
            </span>
            <div className="w-8 md:w-16 h-px bg-accent group-hover:w-16 md:group-hover:w-32 transition-all duration-500" />
          </button>
        </section>
      </main>

      <Footer />

      {/* MODAL TRAILER */}
      {trailerOpen && (
        <div
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          onClick={() => setTrailerOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-6xl aspect-video bg-black shadow-2xl relative"
            onClick={e => e.stopPropagation()}
          >
            <iframe
              src={`${film.trailer}?autoplay=1&rel=0`}
              title={`Tráiler de ${film.title}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
            <button
              onClick={() => setTrailerOpen(false)}
              className="absolute -top-10 right-0 text-[10px] tracking-[0.4em] uppercase text-accent hover:text-primary transition-colors font-sans"
            >
              CERRAR [X]
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default FilmPageV2;
