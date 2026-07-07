"use client";
import React, { useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type NavbarProps = {
  irACatalogo?: (tipo: string) => void;
};

const Navbar = ({ irACatalogo }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleNavClick = (tipo: string) => {
    setMenuOpen(false);
    irACatalogo?.(tipo);
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
          className="cursor-pointer z-10 relative w-[180px] h-[28px]"
          onClick={() => handleNavClick('Todos')}
        >
          <Image
            src="/assets/LOGO-HADDOCK-black-1.svg"
            alt="Haddock Films"
            fill
            className="invert object-contain object-left"
          />
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-12 text-prestige-label pointer-events-auto text-white">
          <button onClick={() => handleNavClick('Todos')} className="hover:opacity-40 transition-opacity cursor-pointer text-[10px] font-sans tracking-[0.4em] bg-transparent border-none text-white">
            PRODUCCIONES
          </button>
          <button onClick={handleServiciosClick} className="hover:opacity-40 transition-opacity cursor-pointer text-[10px] font-sans tracking-[0.4em] bg-transparent border-none text-white">
            SERVICIOS
          </button>
          <a href="#" className="hover:opacity-40 transition-opacity text-[10px] font-sans tracking-[0.4em] text-white">CONTACTO</a>
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
              { label: 'PRODUCCIONES', action: () => handleNavClick('Todos') },
              { label: 'SERVICIOS', action: handleServiciosClick },
            ].map(({ label, action }, i) => (
              <motion.button
                key={label}
                onClick={action}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="text-left text-[13px] font-sans tracking-[0.35em] uppercase text-white/70 hover:text-white transition-colors py-1 cursor-pointer bg-transparent border-none"
              >
                {label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
