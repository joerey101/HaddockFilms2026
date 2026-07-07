"use client";
import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Heading } from '@/components/primitives/Heading';
import { Text } from '@/components/primitives/Text';
import { Label } from '@/components/primitives/Label';

const HeroVideo = () => {
  const [isMobile, setIsMobile] = useState(true);
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.0,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.0,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section 
      className="relative w-full h-screen overflow-hidden bg-bg-dark flex items-end px-[6vw] pb-24 md:pb-28" 
      aria-label="Inicio"
    >
      <h1 className="sr-only">Haddock Films — Productora Audiovisual · Buenos Aires · Madrid</h1>
      
      {/* Background Media */}
      <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
        {/* Mobile static image or fallback during SSR */}
        {(isMobile || !mounted) ? (
          <motion.div
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src="/assets/El-Secreto.webp"
              alt="El Secreto de sus Ojos"
              fill
              priority
              className="object-cover opacity-60"
              sizes="100vw"
            />
          </motion.div>
        ) : (
          /* Desktop Video background */
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            src="/assets/Haddock-videohome.mp4"
            poster="/assets/El-Secreto.webp"
            autoPlay={!shouldReduceMotion}
            muted
            loop
            playsInline
          />
        )}
        
        {/* Subtle overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/20" />
      </div>

      {/* Statement Typography Overlaid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full text-center flex flex-col items-center"
      >
        {/* Meta Header */}
        <motion.div
          variants={lineVariants}
          className="mb-4 md:mb-6"
        >
          <Label className="text-fg-on-dark opacity-70 tracking-[0.4em] uppercase">
            Buenos Aires – Argentina
          </Label>
        </motion.div>

        {/* Headline */}
        <div className="flex flex-col gap-2 md:gap-3">
          <motion.div variants={itemVariants}>
            <Heading
              as="h2"
              size="h1"
              font="sans"
              className="text-fg-on-dark text-[clamp(2rem,3.9vw,56px)] leading-[1.0] tracking-[-0.03em] font-bold normal-case text-center"
            >
              Producciones que trascienden fronteras
            </Heading>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col items-center"
        >
          <div className="w-6 h-10 border border-fg-on-dark/30 rounded-full flex justify-center p-1.5">
            <motion.div
              animate={shouldReduceMotion ? {} : {
                y: [0, 6, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-1 h-2 bg-fg-on-dark rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroVideo;
