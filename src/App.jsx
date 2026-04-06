import React from 'react';
import Navbar from './components/Navbar';
import HeroVideo from './components/HeroVideo';
import FeaturedFilm from './components/FeaturedFilm';
import CatalogueScene from './components/CatalogueScene';
import './index.css';

function App() {
  return (
    <main className="bg-background relative text-primary selection:bg-primary selection:text-white no-scrollbar font-sans overflow-x-hidden">
      <Navbar />
      
      {/* Hero with video */}
      <HeroVideo />

      {/* Main Narrative Sections: High Z-index with Fluid Tension */}
      <div className="relative z-20 bg-background">

        <FeaturedFilm
          id="moscas"
          title="El Tiempo de las Moscas"
          year="2025"
          director="Mariana Enríquez"
          image="/assets/Tiempo-Moscas-main.jpg"
          description="El estreno más reciente de Haddock Films. Un relato que habita los bordes del horror y la literatura argentina contemporánea."
          layout="left"
        />

        <FeaturedFilm
          id="atrapados"
          title="Atrapados"
          year="2025"
          director="Miguel Cohan"
          image="/assets/Atrapados-Haddock-Films-1.webp"
          description="Serie original para Netflix. Ocho presos quedan atrapados en una cárcel inundada y deben sobrevivir juntos, con sus secretos y sus diferencias."
          layout="right"
        />

        <FeaturedFilm
          id="elena"
          title="Elena Sabe"
          year="2025"
          director="Anahí Berneri"
          image="/assets/ES_ELENA_RGB_VERTICAL_main.jpg"
          description="Basada en la novela de Claudia Piñeiro. Una madre con Parkinson busca justicia por la muerte de su hija en una Argentina que no da respuestas."
          layout="left"
        />

        {/* Fluid Editorial Narrative Catalogue */}
        <CatalogueScene />
      </div>

      {/* Footer */}
      <footer className="relative z-30 overflow-hidden">

        {/* Título partido: blanco arriba / negro abajo */}
        <div className="w-full" style={{ background: 'linear-gradient(to bottom, #f9f9f9 50%, #1A1A1A 50%)' }}>
          <div className="flex flex-col items-center text-center leading-[0.85]">
            <span className="font-serif text-[clamp(2rem,10vw,22rem)] tracking-[-0.03em] text-primary block">
              Historias que
            </span>
            <span className="font-serif text-[clamp(2rem,10vw,22rem)] tracking-[-0.03em] text-white italic block">
              trascienden.
            </span>
          </div>
        </div>

        {/* Pie de página */}
        <div className="bg-primary px-[6vw] py-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div className="flex flex-col gap-2">
            <p className="text-white/40 text-[10px] font-sans uppercase tracking-[0.3em]">Haddock Films © 2026</p>
            <p className="text-white/25 text-[10px] font-sans uppercase tracking-[0.3em]">Buenos Aires · Madrid</p>
          </div>
          <div className="flex gap-10 text-[10px] font-sans uppercase tracking-[0.25em] text-white/40">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Vimeo</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>

      </footer>
    </main>
  );
}

export default App;
