import React, { useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';

const Navbar = ({ version, toggleVersion }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navLinks = [
    { name: 'PELÍCULAS', href: '#catalogo' },
    { name: 'SERIES', href: '#catalogo' },
    { name: 'DOCUMENTALES', href: '#catalogo' },
    { name: 'SERVICIOS', href: '#servicios' },
    { name: 'CONTACTO', href: '#footer' },
  ];

  const socialLinks = [
    { name: 'IG', href: 'https://instagram.com' },
    { name: 'VM', href: 'https://vimeo.com' },
    { name: 'LI', href: 'https://linkedin.com' },
  ];

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md">
      {/* Progress Bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-accent origin-left"
        style={{ scaleX }}
      />
      
      <div className="flex items-center justify-between px-[6vw] py-5">
        {/* Logo */}
        <a href="/v2" className="block z-10 relative">
          <img 
            src="/assets/LOGO-HADDOCK-black-1.svg" 
            alt="Haddock Films" 
            className="h-6 invert opacity-90 hover:opacity-100 transition-opacity"
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[10px] font-sans font-normal tracking-[0.4em] text-primary/60 hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Social & Version Toggle — Desktop */}
        <div className="hidden md:flex items-center gap-6 border-l border-primary/20 pl-8">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-sans font-normal tracking-[0.2em] text-primary/40 hover:text-accent transition-colors"
            >
              {social.name}
            </a>
          ))}
          
          <div className="w-px h-3 bg-primary/20 mx-2" />

          <button 
            onClick={toggleVersion}
            className="text-[10px] font-sans font-bold tracking-[0.2em] text-accent hover:text-primary transition-colors cursor-pointer"
          >
            {version === 'v2' ? 'VERSIÓN 1' : 'VERSIÓN 2'}
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
            className="block w-full h-px bg-primary"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            className="block w-full h-px bg-primary"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="block w-full h-px bg-primary"
          />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-t border-primary/10 px-[6vw] pb-8 pt-6 flex flex-col gap-6"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="text-[13px] font-sans tracking-[0.35em] uppercase text-primary/70 hover:text-primary transition-colors py-1"
              >
                {link.name}
              </motion.a>
            ))}

            <div className="h-px bg-primary/10 my-2" />

            <div className="flex items-center gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-sans tracking-[0.2em] text-primary/40 hover:text-accent transition-colors"
                >
                  {social.name}
                </a>
              ))}
            </div>

            <button 
              onClick={() => { toggleVersion(); setMenuOpen(false); }}
              className="text-left text-[11px] font-sans font-bold tracking-[0.35em] text-accent hover:text-primary transition-colors uppercase mt-2 cursor-pointer"
            >
              {version === 'v2' ? '→ VERSIÓN EDITORIAL' : '→ VERSIÓN INDUSTRIAL'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
