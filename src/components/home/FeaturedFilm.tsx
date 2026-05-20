"use client";
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Section } from '@/components/primitives/Section';
import { Container } from '@/components/primitives/Container';
import { Heading } from '@/components/primitives/Heading';
import { Text } from '@/components/primitives/Text';
import { Label } from '@/components/primitives/Label';
import { Tag } from '@/components/primitives/Tag';
import { Link } from '@/components/primitives/Link';

type FeaturedFilmProps = {
  id?: string | number;
  slug: string;
  image: string;
  title: string;
  year: string;
  director: string;
  description?: string;
  layout?: 'left' | 'right';
  type?: string;
};

const FeaturedFilm = ({ 
  slug, 
  image, 
  title, 
  year, 
  director, 
  description, 
  layout = 'left',
  type = 'pelicula'
}: FeaturedFilmProps) => {
  const isLeft = layout === 'left';
  const shouldReduceMotion = useReducedMotion();

  // Helper to format title with editorial italics
  const renderTitle = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes("moscas")) {
      return (
        <>
          El Tiempo de las <span className="italic text-accent">Moscas</span>
        </>
      );
    }
    if (lower.includes("atrapados")) {
      return (
        <span className="italic text-accent">Atrapados</span>
      );
    }
    if (lower.includes("elena sabe")) {
      return (
        <>
          Elena <span className="italic text-accent">sabe</span>
        </>
      );
    }
    return text;
  };

  // Helper to get genres based on movie
  const getGenres = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes("moscas")) return ["Drama", "Comedia"];
    if (lower.includes("atrapados")) return ["Suspenso", "Drama"];
    if (lower.includes("elena")) return ["Drama", "Misterio"];
    return ["Cine"];
  };

  const genres = getGenres(title);

  // Content Components
  const labelElement = (
    <Label className="block text-primary/40 uppercase tracking-[0.25em]">
      — {year} &nbsp;·&nbsp; {type === 'serie' ? 'SERIE' : 'PELÍCULA'} &nbsp;·&nbsp; {director}
    </Label>
  );

  const titleElement = (
    <Heading 
      as="h2" 
      size="h1" 
      className="text-primary group-hover:text-accent transition-colors duration-400 ease-expo"
    >
      {renderTitle(title)}
    </Heading>
  );

  const bodyElement = description && (
    <Text 
      size="body-lg" 
      tone="secondary" 
      className="line-clamp-3 md:line-clamp-4 max-w-xl"
    >
      {description}
    </Text>
  );

  const tagsElement = (
    <div className="flex flex-wrap gap-2">
      <Tag tone="accent">Destacada</Tag>
      {genres.map((g) => (
        <Tag key={g}>{g}</Tag>
      ))}
    </div>
  );

  const ctaElement = (
    <div className="pt-2">
      <Link 
        href={`/peliculas/${slug}`} 
        variant="underlined"
        className="text-xs font-bold tracking-[0.2em] uppercase inline-flex items-center gap-1 font-sans"
      >
        Ver ficha →
      </Link>
    </div>
  );

  return (
    <Section spacing="lg" className="w-full">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-80px" }}
          className="group"
        >
          {/* Mobile layout (≤768px): Stack vertical, no switching order */}
          <div className="flex flex-col gap-6 md:hidden">
            <div className="aspect-[16/9] overflow-hidden relative w-full bg-surface">
              <Image
                src={image}
                alt={`${title} (${year}) — ${director}`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
            </div>
            
            <div className="flex flex-col gap-4">
              {labelElement}
              {titleElement}
              {tagsElement}
              {bodyElement}
              {ctaElement}
            </div>
          </div>

          {/* Desktop layout (>768px): Asymmetric grid with alternating layout */}
          <div className="hidden md:grid md:grid-cols-12 gap-16 lg:gap-24 items-center">
            {/* Image Column */}
            <div className={`md:col-span-7 ${isLeft ? 'md:order-1' : 'md:order-2'}`}>
              <div className="aspect-[16/9] overflow-hidden relative w-full bg-surface">
                <Image
                  src={image}
                  alt={`${title} (${year}) — ${director}`}
                  fill
                  className={`object-cover transition-transform duration-400 ease-expo ${
                    !shouldReduceMotion ? 'group-hover:scale-editorial' : ''
                  }`}
                  sizes="(max-width: 768px) 100vw, 58vw"
                />
              </div>
            </div>

            {/* Content Column */}
            <div className={`md:col-span-5 flex flex-col gap-6 ${isLeft ? 'md:order-2' : 'md:order-1'}`}>
              {labelElement}
              {titleElement}
              {tagsElement}
              {bodyElement}
              {ctaElement}
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};

export default FeaturedFilm;
