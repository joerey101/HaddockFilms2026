import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const FeaturedFilm = ({ id, image, title, year, director, description, layout = 'left' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  const isLeft = layout === 'left';

  return (
    <motion.section
      ref={ref}
      style={{ opacity }}
      className="w-full py-[clamp(4rem,6vw,8rem)] px-[6vw]"
    >
      <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center ${
        isLeft ? '' : 'md:[direction:rtl]'
      }`}>

        {/* Image — 7 of 12 columns */}
        <div className="md:col-span-7 [direction:ltr]">
          <div className="aspect-[16/10] overflow-hidden bg-surface-container">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Text — 5 of 12 columns */}
        <div className="md:col-span-5 [direction:ltr] flex flex-col gap-6">
          <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-secondary">
            — {year} &nbsp;·&nbsp; {director}
          </span>

          <h2 className="font-serif text-[clamp(2.2rem,3.5vw,4.5rem)] leading-[1.0] tracking-tight text-primary">
            {title}
          </h2>

          {description && (
            <p className="font-sans font-light text-[clamp(0.9rem,1vw,1.1rem)] leading-relaxed text-secondary max-w-sm">
              {description}
            </p>
          )}

          <div className="pt-4">
            <a
              href="#"
              className="inline-flex items-center gap-4 group"
            >
              <span className="text-[11px] font-sans uppercase tracking-[0.2em] font-bold border-b border-primary pb-0.5">
                Ver más
              </span>
            </a>
          </div>
        </div>

      </div>
    </motion.section>
  );
};

export default FeaturedFilm;
