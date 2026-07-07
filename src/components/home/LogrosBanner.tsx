"use client";
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Section } from '@/components/primitives/Section';
import { Container } from '@/components/primitives/Container';
import { Heading } from '@/components/primitives/Heading';
import { Label } from '@/components/primitives/Label';

const LogrosBanner = () => {
  const shouldReduceMotion = useReducedMotion();

  const achievements = [
    {
      number: "20+",
      title: "AÑOS",
      subtitle: "De trayectoria cinematográfica",
      accent: false,
    },
    {
      number: "190+",
      title: "PAÍSES",
      subtitle: "De distribución global",
      accent: false,
    },
    {
      number: "Oscar",
      title: "GANADORA",
      subtitle: "Mejor Película Extranjera",
      accent: true,
    },
    {
      number: "Festivales",
      title: "",
      subtitle: "Cannes, Venecia, Berlín, Mar del Plata, Varsovia, Locarno",
      accent: false,
    },
  ];

  return (
    <Section spacing="sm" className="bg-surface border-y border-border/40 select-none">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {achievements.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col text-left justify-start"
            >
              {/* Highlight value */}
              <Heading
                as="h2"
                size="h1"
                className={`tracking-tight leading-none mb-2 ${
                  item.accent ? 'text-accent italic font-serif' : 'text-primary font-sans font-bold'
                }`}
              >
                {item.number}
              </Heading>
              
              {/* Kicker label */}
              <Label className="block text-primary/80 tracking-[0.2em] font-sans font-bold text-xs mb-1">
                {item.title}
              </Label>
              
              {/* Details text */}
              <span className="text-xs text-primary/45 font-sans leading-relaxed">
                {item.subtitle}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default LogrosBanner;
