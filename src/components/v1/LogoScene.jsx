import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const LogoScene = () => {
  const { scrollYProgress } = useScroll();
  
  // High-fidelity transforms for a truly cinematic entrance
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.7]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.4], [1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.4], [0, -50]);
  const blur = useTransform(scrollYProgress, [0, 0.2], ["0px", "4px"]);

  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.section 
      className="sticky top-0 h-screen w-full flex items-center justify-center bg-background overflow-hidden z-10"
    >
      <motion.div 
        style={{ scale: smoothScale, opacity, y: smoothY, filter: `blur(${blur})` }}
        className="flex flex-col items-center gap-12"
      >
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
           className="relative"
        >
          {/* Logo scales purely with viewport width (vw) for absolute parity */}
          <img 
            src="/assets/LOGO-HADDOCK-black-1.svg" 
            alt="Haddock Films" 
            className="w-[22vw] h-auto pointer-events-none"
          />
        </motion.div>
        
        <motion.div 
          className="flex flex-col items-center gap-4"
        >
          <p className="text-prestige-label opacity-40">
            EST. MMVI · BUENOS AIRES
          </p>
          <div className="h-[40px] w-[1px] bg-primary opacity-10" />
        </motion.div>
      </motion.div>

      {/* Decorative Atmospheric Labels */}
      <div className="absolute top-[6vh] right-[6vw] text-prestige-label opacity-20 hidden md:block">
        CURATING VISION
      </div>
      <div className="absolute bottom-[6vh] left-[6vw] text-prestige-label opacity-20 hidden md:block">
        ARCHIVE // 2026
      </div>
    </motion.section>
  );
};

export default LogoScene;
