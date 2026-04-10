import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const Navbar = ({ irACatalogo, version, toggleVersion }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const irAServicios = () => {
    document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Cinematic Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-[70] origin-left"
        style={{ scaleX }}
      />

      <nav className="fixed top-0 left-0 w-full z-[60] flex justify-between items-center px-[6vw] py-5 pointer-events-none bg-primary">
        {/* Logo */}
        <div 
          className="pointer-events-auto cursor-pointer"
          onClick={() => irACatalogo && irACatalogo('Todos')}
        >
          <img
            src="/assets/LOGO-HADDOCK-black-1.svg"
            alt="Haddock Films"
            className="h-[28px] w-auto invert"
          />
        </div>

        {/* Prestige Navigation Links */}
        <div className="hidden md:flex gap-12 text-prestige-label pointer-events-auto text-white">
          <button onClick={() => irACatalogo('Todos')} className="hover:opacity-40 transition-opacity cursor-pointer">
            PELÍCULAS
          </button>
          <button onClick={() => irACatalogo('Serie')} className="hover:opacity-40 transition-opacity cursor-pointer">
            SERIES
          </button>
          <button onClick={() => irACatalogo('Documental')} className="hover:opacity-40 transition-opacity cursor-pointer">
            DOCUMENTALES
          </button>
          <button onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })} className="hover:opacity-40 transition-opacity cursor-pointer">
            SERVICIOS
          </button>
          <a href="#" className="hover:opacity-40 transition-opacity">CONTACTO</a>
          
          <div className="w-px h-3 bg-white/20 self-center" />
          
          <button 
            onClick={toggleVersion}
            className="hover:opacity-40 transition-opacity cursor-pointer font-bold"
          >
            {version === 'v1' ? 'V2' : 'V1'}
          </button>
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
