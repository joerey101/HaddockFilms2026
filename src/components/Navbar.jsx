import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const Navbar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Cinematic Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-[70] origin-left" 
        style={{ scaleX }} 
      />
      
      <nav className="fixed top-0 left-0 w-full z-[60] flex justify-between items-center px-[6vw] py-5 pointer-events-none bg-primary">
        {/* Logo — oculto en hero (el logo ya está en el hero), visible al hacer scroll */}
        <div className="pointer-events-auto cursor-pointer">
          <img
            src="/assets/LOGO-HADDOCK-black-1.svg"
            alt="Haddock Films"
            className="h-[28px] w-auto invert"
          />
        </div>

        {/* Prestige Navigation Links */}
        <div className="hidden md:flex gap-12 text-prestige-label pointer-events-auto text-white">
          <a href="#" className="hover:opacity-40 transition-opacity">PELÍCULAS</a>
          <a href="#" className="hover:opacity-40 transition-opacity">SERIES</a>
          <a href="#" className="hover:opacity-40 transition-opacity">CONTACTO</a>
        </div>

        {/* Minimal Mobile Trigger */}
        <div className="md:hidden pointer-events-auto text-white">
          <button className="text-prestige-label">MENU</button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
