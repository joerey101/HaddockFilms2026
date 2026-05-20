import React from 'react';
import { motion } from 'framer-motion';

const FeaturedFilm = ({ index, title, year, director, description, image, tag, reverse, onClick }) => {
  return (
    <div className={`flex flex-col ${reverse ? 'md:items-end' : 'md:items-start'} px-[6vw] relative`}>
      {/* Index Watermark */}
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.04 }}
        transition={{ duration: 1.5 }}
        className="absolute -top-20 md:-top-32 font-display text-[20vw] leading-none pointer-events-none select-none text-primary"
      >
        {index}
      </motion.span>

      {/* Main Content Layout */}
      <div className={`flex flex-col md:flex-row gap-12 md:gap-24 items-center ${reverse ? 'md:flex-row-reverse' : ''}`}>
        
        {/* Image Display */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="w-full md:w-[60%] aspect-video overflow-hidden bg-surface group cursor-pointer"
          onClick={onClick}
        >
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-105"
          />
        </motion.div>

        {/* Text Info */}
        <div className="w-full md:w-[35%] flex flex-col gap-6 relative z-10">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-accent font-bold">
              {tag}
            </span>
            <h2 className="font-serif italic text-[clamp(2.5rem,5vw,5rem)] leading-[1.1] text-primary">
              {title}
            </h2>
            <div className="flex items-center gap-3 opacity-40">
              <span className="text-[10px] font-sans tracking-[0.2em] uppercase">{year}</span>
              <span className="w-4 h-[1px] bg-primary" />
              <span className="text-[10px] font-sans tracking-[0.2em] uppercase">{director}</span>
            </div>
          </div>

          <p className="font-sans font-light text-[14px] leading-relaxed text-primary/60 max-w-[45ch]">
            {description}
          </p>

          <motion.button
            whileHover={{ x: 10 }}
            onClick={onClick}
            className="flex items-center gap-4 text-[10px] tracking-[0.4em] uppercase text-primary/80 group mt-4 w-fit"
          >
            VER PROYECTO
            <span className="w-8 h-[1px] bg-accent group-hover:w-12 transition-all" />
          </motion.button>
        </div>

      </div>
    </div>
  );
};

export default FeaturedFilm;
