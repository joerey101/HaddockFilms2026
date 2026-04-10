import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const Navbar = ({ version, toggleVersion }) => {
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

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md">
      {/* Progress Bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-accent origin-left"
        style={{ scaleX }}
      />
      
      <div className="flex items-center justify-between px-[6vw] py-6">
        {/* Logo */}
        <a href="/v2" className="block">
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

        {/* Social & Version Toggle */}
        <div className="flex items-center gap-6 border-l border-primary/20 pl-8">
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
      </div>
    </nav>
  );
};

export default Navbar;
