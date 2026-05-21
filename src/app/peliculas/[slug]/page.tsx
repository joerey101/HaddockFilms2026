import React from 'react';
import { films } from '@/data/films';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TrailerPlayer from '@/components/film/TrailerPlayer';
import { Link } from '@/components/primitives/Link';
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
    <div className="bg-bg-dark text-fg-on-dark min-h-screen relative overflow-x-hidden selection:bg-accent selection:text-white">
      {/* Script JSON-LD para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(movieSchema) }}
      />

      <div className="film-grain opacity-30" />
      
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative w-full h-[70vh] min-h-[500px] flex items-end pb-12 px-[6vw]">
          <div className="absolute inset-0 z-0">
            {film.hero?.local_path || film.poster?.local_path ? (
              <Image 
                src={film.hero?.local_path || film.poster?.local_path || ''} 
                alt={film.title} 
                fill
                className="object-cover object-top opacity-50"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/50 to-transparent" />
          </div>

          <div className="relative z-10 w-full max-w-none flex flex-col gap-4">
            <h1 className="font-editorial italic text-[clamp(3rem,8vw,8rem)] leading-[0.9] text-white">
              {film.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-[11px] font-sans tracking-[0.3em] uppercase text-accent">
              <span>{film.year}</span>
              <span className="w-4 h-[1px] bg-accent" />
              <span>{film.type}</span>
              {film.duration && (
                <>
                  <span className="w-4 h-[1px] bg-accent" />
                  <span>{film.duration} MIN</span>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Content Section (Poster, Trailer, Synopsis) */}
        <section className="py-12 px-[6vw] bg-bg-dark">
          <div className="grid grid-cols-1 md:grid-cols-[clamp(240px,28vw,380px)_1fr] gap-12 md:gap-16 items-start">
            {/* Left Column: Poster */}
            <div className="relative aspect-[2/3] overflow-hidden shadow-2xl">
              {film.poster?.local_path ? (
                <Image 
                  src={film.poster.local_path} 
                  alt={`Poster de ${film.title}`} 
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-white/30">
                  Sin Poster
                </div>
              )}
            </div>

            {/* Right Column: Trailer and Synopsis */}
            <div className="flex flex-col gap-12">
              {film.trailer_url && (
                <div>
                  <h3 className="text-[10px] font-sans tracking-[0.2em] text-accent uppercase mb-4">Tráiler oficial</h3>
                  <TrailerPlayer 
                    trailerUrl={film.trailer_url} 
                    posterUrl={film.hero?.local_path || film.poster?.local_path || ''} 
                    title={film.title} 
                  />
                </div>
              )}

              <div>
                <h3 className="text-[10px] font-sans tracking-[0.2em] text-accent uppercase mb-4">Sinopsis</h3>
                <div className="border-l-2 border-white/10 pl-6">
                  {film.synopsis_paragraphs ? (
                    film.synopsis_paragraphs.map((p, idx) => (
                      <p key={idx} className="font-sans text-[15px] md:text-[16px] leading-relaxed text-fg-on-dark-muted mb-4 last:mb-0 font-light">
                        {p}
                      </p>
                    ))
                  ) : (
                    <p className="font-sans text-[15px] md:text-[16px] leading-relaxed text-fg-on-dark-muted font-light">
                      {film.synopsis}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Data Section */}
        <section className="py-24 px-[6vw] bg-bg-dark border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
            {/* Column 1 */}
            <div className="flex flex-col gap-8">
              {film.directors && <TechItem label="Dirección" value={formatArray(film.directors)} />}
              {film.producers && <TechItem label="Producción" value={formatArray(film.producers)} />}
              {film.executive_producers && <TechItem label="Producción Ejecutiva" value={formatArray(film.executive_producers)} />}
              {film.screenplay && <TechItem label="Guion" value={formatArray(film.screenplay)} />}
              {film.adaptation && <TechItem label="Adaptación" value={film.adaptation} />}
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-8">
              {film.cinematography && <TechItem label="Dirección de Fotografía" value={formatArray(film.cinematography)} />}
              {film.art_direction && <TechItem label="Dirección de Arte" value={formatArray(film.art_direction)} />}
              {film.sound_direction && <TechItem label="Sonido" value={formatArray(film.sound_direction)} />}
              {film.music_original && <TechItem label="Música Original" value={formatArray(film.music_original)} />}
              {film.editing && <TechItem label="Montaje" value={formatArray(film.editing)} />}
            </div>

            {/* Column 3 (Cast) */}
            {film.cast && film.cast.length > 0 && (
              <div className="flex flex-col gap-8 lg:col-span-2">
                <div>
                  <h4 className="text-[10px] font-sans tracking-[0.2em] text-accent uppercase mb-3">Elenco</h4>
                  <p className="font-sans text-sm text-fg-on-dark-muted leading-relaxed max-w-xl">
                    {film.cast.map((p) => typeof p === 'string' ? p : p.name).join(', ')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Awards Section (Light Theme Design) */}
        {film.awards && film.awards.length > 0 && (
          <section className="py-24 px-[6vw] bg-bg-dark border-t border-white/10">
            <h3 className="font-sans text-[18px] text-accent mb-10 font-normal">Reconocimientos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {film.awards.map((award, idx) => {
                const awardName = typeof award === 'string' ? award : award.name;
                return (
                  <div 
                    key={idx} 
                    className="flex flex-row items-center gap-6 bg-[#f3f3f3] p-8 border border-black/5 rounded-[2px]"
                  >
                    <LaurelIcon className="w-14 h-14 md:w-16 md:h-16 text-accent shrink-0" />
                    <div className="flex flex-col">
                      <p className="font-editorial text-[17px] md:text-[19px] italic text-[#1a1a1a] leading-snug">
                        {awardName}
                      </p>
                      {typeof award !== 'string' && (award.festival || award.category) && (
                        <span className="font-sans text-[11px] text-[#1a1a1a]/60 uppercase tracking-widest mt-2">
                          {award.festival} {award.year && `· ${award.year}`} {award.category && `· ${award.category}`}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Navigation Section */}
        <section className="py-12 px-[6vw] bg-bg-dark border-t border-white/10">
          <div className="flex justify-between items-center text-[11px] font-sans tracking-[0.2em] uppercase">
            {prevFilm ? (
              <Link href={`/peliculas/${prevFilm.slug}`} className="text-fg-on-dark-muted hover:text-accent-hover transition-colors">
                ← Anterior: {prevFilm.title}
              </Link>
            ) : (
              <span className="text-white/20">← Anterior</span>
            )}
            
            {nextFilm ? (
              <Link href={`/peliculas/${nextFilm.slug}`} className="text-fg-on-dark-muted hover:text-accent-hover transition-colors">
                Siguiente: {nextFilm.title} →
              </Link>
            ) : (
              <span className="text-white/20">Siguiente →</span>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function TechItem({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div>
      <h4 className="text-[10px] font-sans tracking-[0.2em] text-accent uppercase mb-2">{label}</h4>
      <p className="font-sans text-[13px] text-fg-on-dark-muted leading-relaxed uppercase">{value}</p>
    </div>
  );
}
