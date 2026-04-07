import React from 'react';
import { motion } from 'framer-motion';

const HeroStatement = () => {
  return (
    <section className="relative h-screen w-full flex items-center px-[6vw] overflow-hidden bg-background">
      {/* Background with Ambient Gradient */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/El-Secreto.jpg" 
          alt="El Secreto de sus Ojos background" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute inset-0 bg-background/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        {/* Meta Header */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="flex items-center gap-4 mb-4"
        >
          <span className="w-8 h-[1px] bg-primary/20" />
          <span className="text-[10px] font-sans font-normal tracking-[0.5em] text-primary/40 uppercase">
            BUENOS AIRES · MADRID · 2000 — 2026
          </span>
        </motion.div>

        {/* Huge Title */}
        <div className="flex flex-col">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="font-display text-[14.5vw] leading-[0.82] text-primary uppercase select-none pointer-events-none"
          >
            25 AÑOS <br /> DE CINE
          </motion.h1>
          
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="font-display text-[6vw] text-accent mt-2 leading-none uppercase leading-tight"
          >
            ARGENTINO QUE TRASCENDIÓ FRONTERAS
          </motion.span>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-[6vw] flex items-center gap-4"
      >
        <div className="w-px h-10 bg-primary/20" />
        <span className="text-[9px] font-sans tracking-[0.3em] uppercase opacity-40">Scroll</span>
      </motion.div>
    </section>
  );
};

export default HeroStatement;
