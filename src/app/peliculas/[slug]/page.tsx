import React from 'react';
import { films } from '@/data/films';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TrailerPlayer from '@/components/film/TrailerPlayer';

// Import Primitives
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { Heading } from '@/components/primitives/Heading';
import { Text } from '@/components/primitives/Text';
import { Label } from '@/components/primitives/Label';
import { Link } from '@/components/primitives/Link';

// Import Custom Components
import StillsGallery from '@/components/film/StillsGallery';
import LaurelIcon from '@/components/icons/LaurelIcon';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return films.filter(f => !!f.slug).map((film) => ({
    slug: film.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const film = films.find((f) => f.slug === slug);
  
  if (!film) return {};

  return {
    title: `${film.title} | Haddock Films`,
    description: film.synopsis_short || film.synopsis.slice(0, 160),
    openGraph: {
      title: `${film.title} | Haddock Films`,
      description: film.synopsis_short || film.synopsis.slice(0, 160),
      images: film.hero?.local_path ? [film.hero.local_path] : [],
      type: 'video.movie',
    },
  };
}

export default async function FilmPage({ params }: Props) {
  const { slug } = await params;
  const film = films.find((f) => f.slug === slug);

  if (!film) {
    notFound();
  }

  const filmIndex = films.findIndex((f) => f.slug === slug);
  const prevFilm = filmIndex > 0 ? films[filmIndex - 1] : null;
  const nextFilm = filmIndex < films.length - 1 ? films[filmIndex + 1] : null;

  const formatArray = (arr: unknown): string => Array.isArray(arr) ? arr.join(', ') : (arr as string);

  // SEO Schema JSON-LD
  const movieSchema = {
    '@context': 'https://schema.org',
    '@type': film.type === 'serie' ? 'TVSeries' : 'Movie',
    'name': film.title,
    'description': film.synopsis_short || film.synopsis.slice(0, 160),
    'image': film.poster?.local_path ? `https://haddockfilms.com${film.poster.local_path}` : undefined,
    'dateCreated': film.year.toString(),
    'director': film.directors
      ? (Array.isArray(film.directors) ? film.directors : [film.directors]).map(name => ({
          '@type': 'Person',
          'name': name
        }))
      : undefined,
    'actor': film.cast
      ? film.cast.map(c => ({
          '@type': 'Person',
          'name': typeof c === 'string' ? c : c.name
        }))
      : undefined,
    'trailer': film.trailer_url ? {
      '@type': 'VideoObject',
      'name': `Tráiler oficial de ${film.title}`,
      'embedUrl': film.trailer_url
    } : undefined
  };

  return (
    <div className="bg-background text-primary min-h-screen relative overflow-x-hidden selection:bg-accent selection:text-white">
      {/* Script JSON-LD para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(movieSchema) }}
      />
      
      <div className="film-grain opacity-20" />
      
      <Navbar />

      <main>
        {/* Hero Section (Cinemático Oscuro) */}
        <section className="relative w-full h-[65vh] min-h-[450px] flex items-end pb-12 px-[6vw] bg-black text-white">
          <div className="absolute inset-0 z-0">
            {film.hero?.local_path || film.poster?.local_path ? (
              <Image 
                src={film.hero?.local_path || film.poster?.local_path || ''} 
                alt={film.title} 
                fill
                className="object-cover object-top opacity-55"
                priority
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>

          <div className="relative z-10 w-full max-w-none flex flex-col gap-4">
            <Heading 
              as="h1" 
              font="serif" 
              className="!text-[clamp(2.25rem,5.5vw,5rem)] !leading-[1.1] italic text-white drop-shadow-sm font-normal"
            >
              {film.title}
            </Heading>
            
            <div className="flex flex-wrap items-center gap-4 text-[11px] font-sans tracking-[0.3em] uppercase text-accent">
              <span>{film.year}</span>
              <span className="w-4 h-[1px] bg-accent/60" />
              <span>{film.type}</span>
              {film.episodes && (
                <>
                  <span className="w-4 h-[1px] bg-accent/60" />
                  <span>{film.episodes} EPISODIOS</span>
                </>
              )}
              {film.duration && (
                <>
                  <span className="w-4 h-[1px] bg-accent/60" />
                  <span>{film.duration} MIN</span>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Content Section (Fondo Claro - Editorial) */}
        <Section spacing="sm">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-[clamp(260px,24vw,340px)_1fr] gap-16 items-start">
              
              {/* Columna Izquierda: Poster Sticky */}
              <div className="lg:sticky lg:top-28">
                <div className="relative aspect-[2/3] w-full overflow-hidden shadow-xl rounded-[2px] border border-primary/5 bg-neutral-100">
                  {film.poster?.local_path ? (
                    <Image 
                      src={film.poster.local_path} 
                      alt={`Poster de ${film.title}`} 
                      fill
                      sizes="(max-width: 1024px) 100vw, 340px"
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-primary/30 text-xs tracking-widest uppercase">
                      Sin Póster
                    </div>
                  )}
                </div>
              </div>

              {/* Columna Derecha: Sinopsis, Ficha Técnica, Stills, Premios */}
              <div className="flex flex-col gap-16">
                
                {/* Tráiler Oficial */}
                {film.trailer_url && (
                  <div className="flex flex-col gap-4">
                    <Label className="text-accent">Tráiler oficial</Label>
                    <div className="overflow-hidden rounded-[2px] shadow-lg border border-primary/5">
                      <TrailerPlayer 
                        trailerUrl={film.trailer_url} 
                        posterUrl={film.hero?.local_path || film.poster?.local_path || ''} 
                        title={film.title} 
                      />
                    </div>
                  </div>
                )}

                {/* Sinopsis */}
                <div className="flex flex-col gap-6">
                  <Label className="text-accent">Sinopsis</Label>
                  <div className="flex flex-col gap-6 max-w-3xl">
                    {film.synopsis_paragraphs && film.synopsis_paragraphs.length > 0 ? (
                      film.synopsis_paragraphs.map((p, idx) => {
                        if (idx === 0) {
                          return (
                            <p key={idx} className="font-serif italic text-[clamp(1.2rem,1.8vw,1.6rem)] leading-relaxed text-primary/90 font-light border-l border-accent/30 pl-6">
                              “{p}”
                            </p>
                          );
                        } else {
                          return (
                            <Text key={idx} size="body" className="font-light text-primary/75 pl-6 md:pl-0">
                              {p}
                            </Text>
                          );
                        }
                      })
                    ) : (
                      <p className="font-serif italic text-[clamp(1.2rem,1.8vw,1.6rem)] leading-relaxed text-primary/90 font-light border-l border-accent/30 pl-6">
                        “{film.synopsis}”
                      </p>
                    )}
                  </div>
                </div>

                <div className="w-full h-[1px] bg-primary/10" />

                {/* Ficha Técnica y Elenco (Grid Editorial de 4 Columnas) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                  
                  {/* Columna 1: Créditos Principales */}
                  <div className="flex flex-col gap-6">
                    <Label className="text-accent">Ficha Técnica</Label>
                    <div className="flex flex-col border-t border-primary/10">
                      {film.directors && <TableRow label="Dirección" value={formatArray(film.directors)} />}
                      {film.producers && <TableRow label="Producción" value={formatArray(film.producers)} />}
                      {film.executive_producers && <TableRow label="Producción Ejecutiva" value={formatArray(film.executive_producers)} />}
                      {film.screenplay && <TableRow label="Guion" value={formatArray(film.screenplay)} />}
                      {film.adaptation && <TableRow label="Adaptación" value={film.adaptation} />}
                      {film.based_on && <TableRow label="Basado en" value={film.based_on} />}
                    </div>
                  </div>

                  {/* Columna 2: Equipo Técnico */}
                  <div className="flex flex-col gap-6">
                    <Label className="text-accent">Equipo Técnico</Label>
                    <div className="flex flex-col border-t border-primary/10">
                      {film.cinematography && <TableRow label="Dirección de Fotografía" value={formatArray(film.cinematography)} />}
                      {film.art_direction && <TableRow label="Dirección de Arte" value={formatArray(film.art_direction)} />}
                      {film.sound_direction && <TableRow label="Sonido" value={formatArray(film.sound_direction)} />}
                      {film.music_original && <TableRow label="Música Original" value={formatArray(film.music_original)} />}
                      {film.editing && <TableRow label="Montaje" value={formatArray(film.editing)} />}
                      {film.costume && <TableRow label="Vestuario" value={formatArray(film.costume)} />}
                      {film.production_direction && <TableRow label="Dirección de Producción" value={formatArray(film.production_direction)} />}
                      {film.makeup && <TableRow label="Maquillaje" value={formatArray(film.makeup)} />}
                      {film.post_direction && <TableRow label="Dirección de Post" value={formatArray(film.post_direction)} />}
                      {film.other_credits && Object.entries(film.other_credits).map(([key, val]) => (
                        <TableRow key={key} label={key} value={val} />
                      ))}
                    </div>
                  </div>

                  {/* Columnas 3 y 4: Elenco */}
                  {film.cast && film.cast.length > 0 && (
                    <div className="flex flex-col gap-6 lg:col-span-2">
                      <Label className="text-accent">Elenco</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 border-t border-primary/10">
                        {film.cast.map((castItem, idx) => {
                          const name = typeof castItem === 'string' ? castItem : castItem.name;
                          const character = typeof castItem === 'string' ? undefined : castItem.character;
                          return (
                            <div key={idx} className="flex justify-between py-3.5 border-b border-primary/10 items-baseline text-[14px]">
                              <span className="font-sans font-medium text-primary">{name}</span>
                              {character && (
                                <span className="font-serif italic text-primary/60 text-[13px]">{character}</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>

                {/* Galería de Stills */}
                {film.stills && film.stills.length > 0 && (
                  <>
                    <div className="w-full h-[1px] bg-primary/10" />
                    <StillsGallery stills={film.stills} filmTitle={film.title} />
                  </>
                )}

                {/* Reconocimientos / Premios */}
                {film.awards && film.awards.length > 0 && (
                  <>
                    <div className="w-full h-[1px] bg-primary/10" />
                    <div className="flex flex-col gap-6">
                      <Label className="text-accent">Reconocimientos</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                        {film.awards.map((award, idx) => {
                          const awardName = typeof award === 'string' ? award : award.name;
                          return (
                            <div 
                              key={idx} 
                              className="flex gap-4 items-center bg-surface p-6 border border-primary/5 rounded-[2px] shadow-sm hover:shadow-md transition-all duration-300"
                            >
                              <LaurelIcon className="w-12 h-12 text-accent shrink-0" />
                              <div className="flex flex-col">
                                <span className="font-serif text-[15px] italic text-primary leading-snug">
                                  {awardName}
                                </span>
                                {typeof award !== 'string' && (award.festival || award.category) && (
                                  <span className="font-sans text-[11px] text-primary/50 uppercase tracking-wider mt-1.5">
                                    {award.festival} {award.year && `· ${award.year}`} {award.category && `· ${award.category}`}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}

              </div>
            </div>
          </Container>
        </Section>

        {/* Navigation Section */}
        <section className="py-16 border-t border-primary/10 bg-surface/30">
          <Container>
            <div className="flex justify-between items-center text-[11px] font-sans tracking-[0.2em] uppercase">
              {prevFilm ? (
                <Link href={`/peliculas/${prevFilm.slug}`} className="text-primary/70 hover:text-accent transition-colors flex items-center gap-2">
                  <span className="text-base">←</span> Anterior: {prevFilm.title}
                </Link>
              ) : (
                <span className="text-primary/20">← Anterior</span>
              )}
              
              {nextFilm ? (
                <Link href={`/peliculas/${nextFilm.slug}`} className="text-primary/70 hover:text-accent transition-colors flex items-center gap-2">
                  Siguiente: {nextFilm.title} <span className="text-base">→</span>
                </Link>
              ) : (
                <span className="text-white/20">Siguiente →</span>
              )}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function TableRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-col py-3 border-b border-primary/10 text-[14px]">
      <span className="font-sans font-bold text-primary/50 uppercase tracking-widest text-[9px] mb-1">{label}</span>
      <span className="font-sans text-primary/80 leading-normal font-light">{value}</span>
    </div>
  );
}
