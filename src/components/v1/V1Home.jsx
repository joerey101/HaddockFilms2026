import React, { useState } from 'react';
import Navbar from './Navbar';
import HeroVideo from './HeroVideo';
import FeaturedFilm from './FeaturedFilm';
import CatalogueScene from './CatalogueScene';
import ServiciosSection from './ServiciosSection';
import LogrosBanner from '../LogrosBanner';
import { films as filmsData } from '../../data/filmsData';

const V1Home = ({ version, onNavigate }) => {
  const [filtro, setFiltro] = useState('Todos');

  const irACatalogo = (tipo) => {
    setFiltro(tipo);
    setTimeout(() => {
      const catalogo = document.getElementById('catalogo');
      catalogo?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const irAServicios = () => {
    document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-background relative text-primary selection:bg-primary selection:text-white no-scrollbar font-sans overflow-x-hidden min-h-screen">
      <Navbar irACatalogo={irACatalogo} version={version} />
      
      {/* Hero with video */}
      <HeroVideo />

      <LogrosBanner />

      {/* Main Narrative Sections: High Z-index with Fluid Tension */}
      <div className="relative z-20 bg-background">

        {filmsData.find(f => f.slug === 'el-tiempo-de-las-moscas') && (
          <FeaturedFilm
            {...filmsData.find(f => f.slug === 'el-tiempo-de-las-moscas')}
            image={filmsData.find(f => f.slug === 'el-tiempo-de-las-moscas').stills?.[0]?.local_path || filmsData.find(f => f.slug === 'el-tiempo-de-las-moscas').poster.local_path}
            director={Array.isArray(filmsData.find(f => f.slug === 'el-tiempo-de-las-moscas').directors) ? filmsData.find(f => f.slug === 'el-tiempo-de-las-moscas').directors[0] : filmsData.find(f => f.slug === 'el-tiempo-de-las-moscas').directors}
            description={filmsData.find(f => f.slug === 'el-tiempo-de-las-moscas').synopsis}
            layout="left"
            onClick={() => onNavigate('el-tiempo-de-las-moscas')}
          />
        )}

        {filmsData.find(f => f.slug === 'atrapados') && (
          <FeaturedFilm
            {...filmsData.find(f => f.slug === 'atrapados')}
            image={filmsData.find(f => f.slug === 'atrapados').stills?.[0]?.local_path || filmsData.find(f => f.slug === 'atrapados').poster.local_path}
            director={Array.isArray(filmsData.find(f => f.slug === 'atrapados').directors) ? filmsData.find(f => f.slug === 'atrapados').directors[0] : filmsData.find(f => f.slug === 'atrapados').directors}
            description={filmsData.find(f => f.slug === 'atrapados').synopsis}
            layout="right"
            onClick={() => onNavigate('atrapados')}
          />
        )}

        {filmsData.find(f => f.slug === 'elena-sabe-2023') && (
          <FeaturedFilm
            {...filmsData.find(f => f.slug === 'elena-sabe-2023')}
            image={filmsData.find(f => f.slug === 'elena-sabe-2023').stills?.[0]?.local_path || filmsData.find(f => f.slug === 'elena-sabe-2023').poster.local_path}
            director={Array.isArray(filmsData.find(f => f.slug === 'elena-sabe-2023').directors) ? filmsData.find(f => f.slug === 'elena-sabe-2023').directors[0] : filmsData.find(f => f.slug === 'elena-sabe-2023').directors}
            description={filmsData.find(f => f.slug === 'elena-sabe-2023').synopsis}
            layout="left"
            onClick={() => onNavigate('elena-sabe-2023')}
          />
        )}

        {/* Fluid Editorial Narrative Catalogue */}
        <CatalogueScene filtro={filtro} setFiltro={setFiltro} onNavigate={onNavigate} />

        {/* Servicios */}
        <ServiciosSection />
      </div>

      {/* Footer V1 */}
      <footer className="relative z-30 overflow-hidden">
        <div className="w-full" style={{ background: 'linear-gradient(to bottom, #f9f9f9 50%, #1A1A1A 50%)' }}>
          <div className="flex flex-col items-center text-center leading-[0.85]">
            <span className="font-serif text-[clamp(2rem,15vw,22rem)] tracking-[-0.03em] text-primary block">
              Historias que
            </span>
            <span className="font-serif text-[clamp(2rem,15vw,22rem)] tracking-[-0.03em] text-white italic block">
              trascienden.
            </span>
          </div>
        </div>

        <div className="bg-primary px-[6vw] py-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div className="flex flex-col gap-2">
            <p className="text-white/40 text-[10px] font-sans uppercase tracking-[0.3em]">Haddock Films © 2026</p>
          </div>
          <div className="flex gap-10 text-[10px] font-sans uppercase tracking-[0.25em] text-white/40">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Vimeo</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default V1Home;
