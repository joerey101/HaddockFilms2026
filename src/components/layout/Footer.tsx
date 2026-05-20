"use client";
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'INSTAGRAM', href: '#' },
    { name: 'VIMEO', href: '#' },
    { name: 'LINKEDIN', href: '#' },
  ];

  return (
    <footer id="footer" className="w-full relative">
      
      {/* Top Half - White Background */}
      <div className="w-full bg-background flex items-end justify-center h-[35vh] pb-0">
        <h1 className="font-serif text-[14vw] font-normal text-primary leading-[0.8] select-none pointer-events-none">
          Historias que
        </h1>
      </div>

      {/* Bottom Half - Black Background */}
      <div className="w-full bg-black flex flex-col justify-between h-[45vh] pt-0 pb-10 px-[6vw]">
        {/* Text sitting on the line */}
        <div className="flex justify-center">
          <h1 className="font-serif italic text-[14vw] font-normal text-white leading-[0.8] select-none pointer-events-none">
            trascienden.
          </h1>
        </div>


        {/* Bottom Bar over Black Background */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-white/10">
          {/* Left: Haddock 2026 */}
          <div className="text-[10px] font-sans tracking-[0.4em] text-white/60 uppercase">
            HADDOCK FILMS © {currentYear}
          </div>

          {/* Right: Links */}
          <div className="flex items-center gap-10">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-sans tracking-[0.4em] text-white/60 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>

  );
};

export default Footer;
