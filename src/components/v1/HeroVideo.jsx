import React from 'react';

const HeroVideo = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#f9f9f9]" aria-label="Inicio">
      <h1 className="sr-only">Haddock Films — Productora Audiovisual · Buenos Aires · Madrid</h1>
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/assets/Haddock-videohome.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
    </section>
  );
};

export default HeroVideo;
