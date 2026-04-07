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
    <section className="w-full bg-[#1A1A1A] border-y border-primary/10">
      <div className="px-[6vw] py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
          {achievements.map((item, idx) => (
            <React.Fragment key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="flex-1 flex justify-center text-center"
              >
                <span className={`text-[10px] font-sans font-normal tracking-[0.4em] uppercase leading-relaxed ${item.accent ? 'text-accent opacity-100' : 'text-primary opacity-80'}`}>
                  {item.text}
                </span>
              </motion.div>
              {idx < achievements.length - 1 && (
                <div className="hidden md:block w-px h-4 bg-primary/20" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogrosBanner;
