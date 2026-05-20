'use client';

import React, { useState } from 'react';
import Image from 'next/image';

type TrailerPlayerProps = {
  trailerUrl: string;
  posterUrl: string;
  title: string;
};

const getEmbedUrl = (url: string) => {
  if (!url) return '';
  let id = '';
  if (url.includes('v=')) {
    id = url.split('v=')[1].split('&')[0];
  } else if (url.includes('youtu.be/')) {
    id = url.split('youtu.be/')[1].split('?')[0];
  } else {
    const pop = url.split('/').pop();
    id = pop ? pop.split('?')[0] : '';
  }
  return `https://www.youtube.com/embed/${id}`;
};

export default function TrailerPlayer({ trailerUrl, posterUrl, title }: TrailerPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const embedUrl = getEmbedUrl(trailerUrl);

  if (!embedUrl) return null;

  return (
    <div className="relative aspect-video bg-neutral-900 overflow-hidden cursor-pointer group" onClick={() => setIsPlaying(true)}>
      {isPlaying ? (
        <iframe
          src={`${embedUrl}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      ) : (
        <>
          <Image
            src={posterUrl}
            alt={`Ver tráiler de ${title}`}
            fill
            className="object-cover opacity-60 group-hover:opacity-50 transition-opacity duration-300"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-accent/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="ml-1">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
            <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-white/80 group-hover:text-white transition-colors duration-300">
              Ver Tráiler
            </span>
          </div>
        </>
      )}
    </div>
  );
}
