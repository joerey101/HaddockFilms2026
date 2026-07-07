"use client";
import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { films as filmsData } from '@/data/films';
import type { Film } from '@/data/films.schema';
import Image from 'next/image';
import { Section } from '@/components/primitives/Section';
import { Container } from '@/components/primitives/Container';
import { Heading } from '@/components/primitives/Heading';
import { Text } from '@/components/primitives/Text';
import { Label } from '@/components/primitives/Label';
import { Link } from '@/components/primitives/Link';

const CatalogueScene = () => {
  const shouldReduceMotion = useReducedMotion();

  // Sort: featured first, then year descending
  const sortedFilms = [...filmsData].sort((a, b) => {
    const aFeat = a.featured ? 1 : 0;
    const bFeat = b.featured ? 1 : 0;
    if (aFeat !== bFeat) {
      return bFeat - aFeat; // featured first
    }
    return b.year - a.year; // then year descending
  });

  const getFilmMeta = (f: Film) => {
    let typeLabel = 'Película';
    if (f.type === 'serie') typeLabel = 'Serie';
    
    let genre = 'Ficción';
    if (f.type === 'documental' || (f.genre && f.genre.some(g => g.toLowerCase().includes('documental')))) {
      genre = 'Documental';
    }
    
    return `${typeLabel} - ${genre}`;
  };

  const renderCardTitle = (title: string) => {
    if (title.includes(':')) {
      const parts = title.split(':');
      const first = parts[0].trim();
      const rest = parts.slice(1).join(':').trim();
      return (
        <>
          {first}:
          <span className="block">{rest}</span>
        </>
      );
    }
    return title;
  };

  const cardVariants: Variants = {
    hidden: (index: number) => ({
      opacity: 0,
      y: !shouldReduceMotion && index < 6 ? 24 : 0,
    }),
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: !shouldReduceMotion && index < 6 ? index * 0.06 : 0,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <Section spacing="lg" className="w-full bg-background border-t border-border/40" id="catalogo">
      <Container>
        
        {/* Header */}
        <div className="flex flex-col gap-6 mb-16 max-w-none">
          <Label className="text-secondary tracking-[0.25em] uppercase">— ARCHIVO</Label>
          <Heading as="h2" className="uppercase leading-none tracking-tight text-[clamp(2.5rem,5.3vw,5.3rem)]">
            FILMOGRAFÍA COMPLETA
          </Heading>
          <Text size="body-lg" tone="secondary" className="font-light max-w-none">
            Explorá nuestra trayectoria completa de películas y series que han marcado la historia del cine nacional e internacional.
          </Text>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {sortedFilms.map((film: Film, idx: number) => {
            return (
              <motion.div
                key={film.id}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={cardVariants}
                className="flex"
              >
                <Link
                  href={`/peliculas/${film.slug}`}
                  className="group flex flex-col gap-4 w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 rounded-sm"
                >
                  {/* Poster 2:3 container */}
                  <div className="aspect-[2/3] overflow-hidden bg-surface-alt relative border border-border/10">
                    {film.poster?.local_path && (
                       <Image
                         src={film.poster.local_path}
                         alt={`Afiche de ${film.title} (${film.year})`}
                         fill
                         sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 50vw"
                         className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[var(--scale-editorial)]"
                       />
                    )}
                  </div>

                  {/* Card Info */}
                  <div className="flex flex-col gap-2 flex-grow mt-2">
                    {/* Media Type & Year */}
                    <div className="flex items-center justify-between text-xs text-primary/45 tracking-[0.05em] font-sans font-medium">
                      <Label className="text-primary/80 uppercase tracking-[0.1em] font-sans font-medium text-[10px]">
                        {getFilmMeta(film)}
                      </Label>
                      <Label className="text-primary/80 font-sans font-medium text-[10px]">
                        {film.year}
                      </Label>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </Container>
    </Section>
  );
};

export default CatalogueScene;
