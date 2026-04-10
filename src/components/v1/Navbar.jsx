import React, { useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';

const Navbar = ({ irACatalogo, version, toggleVersion }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleNavClick = (tipo) => {
    setMenuOpen(false);
    irACatalogo && irACatalogo(tipo);
  };

  const handleServiciosClick = () => {
    setMenuOpen(false);
    document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Cinematic Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-[70] origin-left"
        style={{ scaleX }}
      />

      <nav className="fixed top-0 left-0 w-full z-[60] flex justify-between items-center px-[6vw] py-5 bg-primary">
        {/* Logo */}
        <div 
          className="cursor-pointer z-10 relative"
          onClick={() => handleNavClick('Todos')}
        >
          <img
            src="/assets/LOGO-HADDOCK-black-1.svg"
            alt="Haddock Films"
            className="h-[28px] w-auto invert"
          />
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-12 text-prestige-label pointer-events-auto text-white">
          <button onClick={() => handleNavClick('Todos')} className="hover:opacity-40 transition-opacity cursor-pointer">
            PELÍCULAS
          </button>
          <button onClick={() => handleNavClick('Serie')} className="hover:opacity-40 transition-opacity cursor-pointer">
            SERIES
          </button>
          <button onClick={() => handleNavClick('Documental')} className="hover:opacity-40 transition-opacity cursor-pointer">
            DOCUMENTALES
          </button>
          <button onClick={handleServiciosClick} className="hover:opacity-40 transition-opacity cursor-pointer">
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

        {/* Hamburger — Mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-[5px] w-6 z-10 relative cursor-pointer"
          aria-label="Menú"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="block w-full h-px bg-white"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            className="block w-full h-px bg-white"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="block w-full h-px bg-white"
          />
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[60px] left-0 w-full z-[59] bg-primary/95 backdrop-blur-xl px-[6vw] pb-8 pt-6 flex flex-col gap-5"
          >
            {[
              { label: 'PELÍCULAS', action: () => handleNavClick('Todos') },
              { label: 'SERIES', action: () => handleNavClick('Serie') },
              { label: 'DOCUMENTALES', action: () => handleNavClick('Documental') },
              { label: 'SERVICIOS', action: handleServiciosClick },
            ].map(({ label, action }, i) => (
              <motion.button
                key={label}
                onClick={action}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="text-left text-[13px] font-sans tracking-[0.35em] uppercase text-white/70 hover:text-white transition-colors py-1 cursor-pointer"
              >
                {label}
              </motion.button>
            ))}

            <div className="h-px bg-white/10 my-2" />

            <button
              onClick={() => { toggleVersion(); setMenuOpen(false); }}
              className="text-left text-[11px] font-sans font-bold tracking-[0.35em] text-white/60 hover:text-white uppercase cursor-pointer transition-colors"
            >
              {version === 'v1' ? '→ VERSIÓN INDUSTRIAL' : '→ VERSIÓN EDITORIAL'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
