import React from 'react';
import Navbar from './Navbar';
import HeroStatement from './HeroStatement';
import LogrosBanner from './LogrosBanner';
import FeaturedFilm from './FeaturedFilm';
import CatalogueScene from './CatalogueScene';
import ServiciosSection from './ServiciosSection';
import Footer from './Footer';

const V2Home = ({ filtro, setFiltro, version, toggleVersion, onNavigate }) => {
  return (
    <div className="bg-background text-primary selection:bg-accent selection:text-black min-h-screen relative overflow-x-hidden">
      {/* Film Grain Global Overlay */}
      <div className="film-grain" />

      <Navbar version={version} toggleVersion={toggleVersion} />

      <main>
        <HeroStatement />
        <LogrosBanner />

        {/* Featured Sections */}
        <section className="py-24 space-y-64 bg-background">
          <FeaturedFilm 
            index="01"
            title="El Tiempo de las Moscas"
            year="2025"
            director="Mariana Enríquez"
            description="Desarrollamos y producimos largometrajes de ficción y documental con estándares internacionales. Una apuesta radical a la narrativa contemporánea."
            image="/assets/Tiempo-Moscas-main.jpg"
            tag="Serie Netflix"
          />
          <FeaturedFilm 
            index="02"
            title="Atrapados"
            year="2025"
            director="Miguel Cohan"
            description="Una serie cargada de tensión y misterio que redefine el thriller psicológico en el ecosistema del streaming latinoamericano."
            image="/assets/Atrapados-Haddock-Films-1.webp"
            tag="Serie Netflix"
            reverse
            onClick={() => onNavigate(25)}
          />
          <FeaturedFilm 
            index="03"
            title="Elena Sabe"
            year="2023"
            director="Anahí Berneri"
            description="La adaptación cruda y necesaria de una de las voces más potentes de la literatura argentina actual. Una pieza de prestigio global."
            image="/assets/ES_ELENA_RGB_VERTICAL_main.jpg"
            tag="Película Netflix"
          />
        </section>

        <CatalogueScene filtro={filtro} setFiltro={setFiltro} onNavigate={onNavigate} />
        <ServiciosSection />
      </main>

      <Footer />
    </div>
  );
};

export default V2Home;
