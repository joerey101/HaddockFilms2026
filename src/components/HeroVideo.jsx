import React from 'react';

const HeroVideo = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#f9f9f9]">
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
