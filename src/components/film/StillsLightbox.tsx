'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { ImageAsset } from '@/data/films.schema';

type StillsLightboxProps = {
  stills: ImageAsset[];
  initialIndex: number;
  onClose: () => void;
};

export default function StillsLightbox({ stills, initialIndex, onClose }: StillsLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const currentStill = stills[currentIndex];
  const currentUrl = currentStill?.local_path || currentStill?.remote_url || '';

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % stills.length);
  }, [stills.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + stills.length) % stills.length);
  }, [stills.length]);

  // Pre-cargar la siguiente imagen para lograr transiciones instantáneas
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % stills.length;
    const nextStill = stills[nextIndex];
    const nextUrl = nextStill?.local_path || nextStill?.remote_url || '';
    if (nextUrl) {
      const img = new window.Image();
      img.src = nextUrl;
    }
  }, [currentIndex, stills]);

  // Manejo de atajos de teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    // Bloquear scroll de la página de fondo
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, handleNext, handlePrev]);

  if (!currentUrl) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md transition-all duration-300 animate-fade-in"
      onClick={onClose}
    >
      {/* Botón Cerrar */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-2 text-white/70 hover:text-white transition-colors duration-300 hover:scale-105"
        aria-label="Cerrar galería"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Control Anterior */}
      {stills.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-4 md:left-8 z-40 p-4 text-white/50 hover:text-white transition-colors duration-300 hover:scale-105"
          aria-label="Imagen anterior"
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {/* Contenedor de la Imagen */}
      <div 
        className="relative w-full max-w-5xl h-[80vh] px-4 md:px-12 flex items-center justify-center select-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full">
          <Image
            src={currentUrl}
            alt={currentStill.alt || `Still de producción ${currentIndex + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="object-contain transition-all duration-300"
            priority
          />
        </div>
      </div>

      {/* Control Siguiente */}
      {stills.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-4 md:right-8 z-40 p-4 text-white/50 hover:text-white transition-colors duration-300 hover:scale-105"
          aria-label="Imagen siguiente"
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      {/* Contador e Información */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 text-center flex flex-col gap-1">
        <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-white/60">
          Captura {currentIndex + 1} de {stills.length}
        </span>
        {currentStill.alt && (
          <span className="text-xs text-white/80 font-sans italic">
            {currentStill.alt}
          </span>
        )}
      </div>
    </div>
  );
}
