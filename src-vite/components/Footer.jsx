import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'INSTAGRAM', href: '#' },
    { name: 'VIMEO', href: '#' },
    { name: 'LINKEDIN', href: '#' },
  ];

  return (
    <footer id="footer" className="w-full bg-background pt-[50px] pb-[50px] px-[6vw] relative border-t border-primary/5">
      
      {/* Massive Statement */}
      <div className="flex flex-col mb-[50px]">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.08, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[14vw] leading-[0.8] text-primary uppercase select-none pointer-events-none"
        >
          HISTORIAS QUE
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.15, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="font-display text-[14vw] leading-[0.8] text-accent uppercase select-none pointer-events-none"
        >
          TRASCIENDEN.
        </motion.span>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col gap-12 pt-12 border-t border-primary/5">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <img 
            src="/assets/LOGO-HADDOCK-black-1.svg" 
            alt="Haddock Films" 
            className="h-5 invert opacity-30"
          />

          {/* Social - Text Only */}
          <div className="flex items-center gap-10">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-sans tracking-[0.4em] text-primary/40 hover:text-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Legal Line - Centered Solo */}
        <div className="text-[9px] font-sans tracking-[0.25em] text-primary/30 uppercase text-center w-full">
          © {currentYear} HADDOCK FILMS — TODOS LOS DERECHOS RESERVADOS. &nbsp; | &nbsp; 
          <a href="mailto:info@haddockfilms.com.ar" className="hover:text-accent transition-colors">INFO@HADDOCKFILMS.COM.AR</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
