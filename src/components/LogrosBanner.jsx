import React from 'react';
import { motion } from 'framer-motion';

const LogrosBanner = () => {
  const achievements = [
    { text: "25+ AÑOS", accent: false },
    { text: "40+ PAÍSES", accent: false },
    { text: "OSCAR® MEJOR PELÍCULA EXTRANJERA", accent: true },
    { text: "CANNES · BERLÍN · SUNDANCE", accent: false },
  ];

  return (
    <section className="w-full bg-background border-y border-primary/5">
      <div className="px-[6vw] py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-4">
          {achievements.map((item, idx) => (
            <React.Fragment key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="flex-1 flex justify-center text-center"
              >
                <span className={`text-[10px] md:text-[11px] font-sans font-medium tracking-[0.4em] uppercase leading-relaxed ${item.accent ? 'text-primary opacity-100' : 'text-primary/40'}`}>
                  {item.text}
                </span>
              </motion.div>
              {idx < achievements.length - 1 && (
                <div className="hidden md:block w-px h-4 bg-primary/10" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogrosBanner;
