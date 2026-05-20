import React from 'react';
import { motion } from 'framer-motion';

const FeaturedFilm = ({ id, image, title, year, director, description, layout = 'left', onClick }) => {
  const isLeft = layout === 'left';

  const label = (
    <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-secondary">
      — {year} &nbsp;·&nbsp; {director}
    </span>
  );

  const heading = (
    <h2 className="font-serif text-[clamp(2.2rem,3.5vw,4.5rem)] leading-[1.0] tracking-tight text-primary">
      {title}
    </h2>
  );

  const body = description && (
    <p className="font-sans font-light text-[clamp(0.9rem,1vw,1.1rem)] leading-relaxed text-secondary max-w-sm">
      {description}
    </p>
  );

  const cta = (
    <button 
      onClick={onClick}
      className="inline-flex items-center gap-4 group cursor-pointer border-none bg-transparent p-0"
    >
      <span className="text-[11px] font-sans uppercase tracking-[0.2em] font-bold border-b border-primary pb-0.5">
        Ver más
      </span>
    </button>
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      className="w-full py-[clamp(2rem,4vw,8rem)] px-[6vw]"
    >
      {/* Mobile layout */}
      <div className="flex flex-col gap-4 md:hidden">
        <div className="flex flex-col gap-2">
          {label}
          {heading}
        </div>
        <div className="aspect-[16/10] overflow-hidden cursor-pointer" onClick={onClick}>
          <img
            src={image}
            alt={`${title} (${year}) — ${director}`}
            loading="eager"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-2">
          {body}
          {cta}
        </div>
      </div>

      {/* Desktop layout */}
      <div className={`hidden md:grid md:grid-cols-12 gap-16 items-center ${isLeft ? '' : 'md:[direction:rtl]'}`}>
        <div className="md:col-span-7 [direction:ltr]">
          <div className="aspect-[16/10] overflow-hidden cursor-pointer" onClick={onClick}>
            <img
              src={image}
              alt={`${title} (${year}) — ${director}`}
              loading="eager"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="md:col-span-5 [direction:ltr] flex flex-col gap-6">
          {label}
          {heading}
          {body}
          <div className="pt-4">{cta}</div>
        </div>
      </div>

    </motion.section>
  );
};

export default FeaturedFilm;
