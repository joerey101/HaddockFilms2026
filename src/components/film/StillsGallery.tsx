'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ImageAsset } from '@/data/films.schema';
import StillsLightbox from './StillsLightbox';

type StillsGalleryProps = {
  stills: ImageAsset[];
  filmTitle: string;
};

export default function StillsGallery({ stills, filmTitle }: StillsGalleryProps) {
  const [activeStillIndex, setActiveStillIndex] = useState<number | null>(null);

  // Filtrar stills válidos (que tengan path local o url remota)
  const validStills = stills.filter(still => still.local_path || still.remote_url);

  // Si no hay stills válidos o solo hay el de la cabecera (en caso de que coincida), manejamos el límite
  if (validStills.length === 0) return null;

  // Clases CSS para grilla asimétrica según el índice
  const getGridSpanClass = (index: number) => {
    const mod = index % 3;
    if (mod === 0) {
      return 'md:col-span-2 aspect-video'; // Principal grande
    } else if (mod === 1) {
      return 'md:col-span-1 aspect-square md:aspect-auto md:h-full'; // Lateral cuadrado/alto
    } else {
      return 'md:col-span-1 aspect-video'; // Lateral horizontal
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <h3 className="text-prestige-label text-accent">Stills de producción</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {validStills.map((still, idx) => {
          const imgUrl = still.local_path || still.remote_url || '';
          return (
            <div
              key={idx}
              onClick={() => setActiveStillIndex(idx)}
              className={`relative overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all duration-500 ease-expo rounded-[2px] bg-neutral-200 dark:bg-neutral-800 ${getGridSpanClass(idx)}`}
            >
              {/* Overlay sutil de hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-500 z-10 flex items-center justify-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  className="opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>

              {/* Imagen */}
              <Image
                src={imgUrl}
                alt={still.alt || `Still ${idx + 1} de la película ${filmTitle}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-editorial transition-transform duration-700 ease-expo"
              />
            </div>
          );
        })}
      </div>

      {activeStillIndex !== null && (
        <StillsLightbox
          stills={validStills}
          initialIndex={activeStillIndex}
          onClose={() => setActiveStillIndex(null)}
        />
      )}
    </div>
  );
}
