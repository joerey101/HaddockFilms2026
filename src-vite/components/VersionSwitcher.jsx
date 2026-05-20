import React from 'react';
import { motion } from 'framer-motion';

const VersionSwitcher = ({ version, toggleVersion }) => {
  return (
    <div className="fixed bottom-10 left-10 z-[100] flex flex-col gap-2 pointer-events-auto">
      <span className="text-[10px] font-sans tracking-[0.2em] text-primary/40 uppercase">Propuesta</span>
      <button 
        onClick={toggleVersion}
        className="group relative flex items-center gap-4 bg-primary text-background px-6 py-3 border border-primary peer hover:bg-transparent hover:text-primary transition-all duration-500 overflow-hidden"
      >
        <span className="absolute inset-0 bg-primary group-hover:translate-x-full transition-transform duration-700 ease-expo" />
        <span className="relative z-10 font-sans tracking-[0.5em] text-[11px] font-bold">
          {version === 'v2' ? 'V1 / EDITORIAL' : 'V2 / INDUSTRIAL'}
        </span>
      </button>
    </div>
  );
};

export default VersionSwitcher;
