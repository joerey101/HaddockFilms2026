"use client";
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import HeroVideo from '@/components/home/HeroVideo';
import FeaturedFilm from '@/components/home/FeaturedFilm';
import CatalogueScene from '@/components/home/CatalogueScene';
import ServiciosSection from '@/components/home/ServiciosSection';
import LogrosBanner from '@/components/home/LogrosBanner';
import Footer from '@/components/layout/Footer';
import { getFeaturedFilms } from '@/lib/films';

export default function Home() {
  const irACatalogo = () => {
    const catalogo = document.getElementById('catalogo');
    catalogo?.scrollIntoView({ behavior: 'smooth' });
  };

  const featuredFilms = getFeaturedFilms();

  return (
    <div className="bg-background relative text-primary selection:bg-primary selection:text-white no-scrollbar font-sans overflow-x-hidden min-h-screen">
      <Navbar irACatalogo={irACatalogo} />
      
      <main id="main-content">
        {/* Hero with video */}
        <HeroVideo />

        <LogrosBanner />

        {/* Main Narrative Sections */}
        <div className="relative z-20 bg-background">

          {featuredFilms.map((film, index) => (
            <FeaturedFilm
              key={film.id}
              id={film.id}
              slug={film.slug}
              title={film.title}
              year={film.year.toString()}
              director={(Array.isArray(film.directors) ? film.directors[0] : film.directors) || ''}
              description={film.synopsis}
              image={(film.stills?.[0]?.local_path || film.poster?.local_path) || ''}
              layout={index % 2 === 0 ? "left" : "right"}
              type={film.type}
            />
          ))}

          {/* Catalogue */}
          <CatalogueScene />

          {/* Servicios */}
          <ServiciosSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
