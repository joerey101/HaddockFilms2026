"use client";
import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Section } from '@/components/primitives/Section';
import { Container } from '@/components/primitives/Container';
import { Heading } from '@/components/primitives/Heading';
import { Text } from '@/components/primitives/Text';
import { Label } from '@/components/primitives/Label';
import { Link } from '@/components/primitives/Link';

const serviciosData = [
  { 
    id: "01", 
    title: "Diseño de Proyectos", 
    subtitle: "Desarrollo Creativo",
    desc: "Estructuración creativa y estratégica de proyectos: biblia, tratamiento, arquitectura narrativa y plan de financiamiento para cine, televisión y plataformas digitales."
  },
  { 
    id: "02", 
    title: "Servicio de Producción", 
    subtitle: "Ficción y Documentales",
    desc: "Facilitamos rodajes y producción integral: locaciones, equipos técnicos, casting y coordinación logística para proyectos de cualquier escala."
  },
  { 
    id: "03", 
    title: "Servicio de Postproducción", 
    subtitle: "Edición y Finalización",
    desc: "Desde el montaje hasta la entrega final. Postproducción gestionada por un equipo con visión creativa y ejecutiva unificada."
  }
];

const ServiciosSection = () => {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 20 
    },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: shouldReduceMotion ? 0 : custom * 0.05,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const half = Math.ceil(serviciosData.length / 2);
  const leftCol = serviciosData.slice(0, half);
  const rightCol = serviciosData.slice(half);

  return (
    <Section spacing="lg" className="w-full bg-surface border-t border-border/40" id="servicios">
      <Container>
        {/* Header Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 mb-16 md:mb-24">
          {/* Left Column: label + h2 */}
          <div className="flex flex-col gap-4">
            <Label className="text-accent tracking-[0.25em] uppercase">
              — OFICIO
            </Label>
            <Heading as="h2" size="display-md" className="uppercase leading-none tracking-normal pl-[0.04em]">
              SERVICIOS
            </Heading>
          </div>

          {/* Right Column: description + CTA */}
          <div className="flex flex-col gap-6">
            <Text size="body-lg" tone="secondary" className="font-light leading-relaxed">
              Desarrollamos y producimos contenidos audiovisuales con estándares de excelencia global, brindando una estructura integral para cine, series y coproducciones internacionales en Argentina y España.
            </Text>
            
            <div className="pt-2">
              <Link 
                href="mailto:info@haddockfilms.com" 
                variant="underlined"
                className="text-xs font-bold tracking-[0.2em] uppercase inline-flex items-center gap-1 font-sans"
              >
                Escribinos por un proyecto →
              </Link>
            </div>
          </div>
        </div>

        {/* Services List Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-24 gap-y-0 items-start">
          {/* Left Column Services (01-04) */}
          <div className="flex flex-col">
            {leftCol.map((s, idx) => (
              <motion.div
                key={s.id}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={itemVariants}
                className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 border-t border-border/40 py-8 lg:py-10 first:border-t-0 first:pt-0"
              >
                {/* Number indicator */}
                <div className="sm:col-span-2">
                  <Label className="text-accent font-bold tracking-[0.1em] text-lg block sm:text-right sm:pr-4">
                    {s.id}
                  </Label>
                </div>
                
                {/* Content */}
                <div className="sm:col-span-10 flex flex-col gap-2">
                  <Heading as="h3" size="h3" font="serif" className="text-primary leading-snug">
                    {s.title}
                  </Heading>
                  
                  <Label className="block text-primary/45 uppercase tracking-[0.2em] text-[10px] font-sans">
                    {s.subtitle}
                  </Label>
                  
                  <Text size="body" tone="secondary" className="font-light leading-relaxed mt-1">
                    {s.desc}
                  </Text>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column Services (05-08) */}
          <div className="flex flex-col">
            {rightCol.map((s, idx) => (
              <motion.div
                key={s.id}
                custom={half + idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={itemVariants}
                className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 border-t border-border/40 py-8 lg:py-10 first:border-t-0 md:first:border-t-0 md:first:pt-0 first:pt-8"
              >
                {/* Number indicator */}
                <div className="sm:col-span-2">
                  <Label className="text-accent font-bold tracking-[0.1em] text-lg block sm:text-right sm:pr-4">
                    {s.id}
                  </Label>
                </div>
                
                {/* Content */}
                <div className="sm:col-span-10 flex flex-col gap-2">
                  <Heading as="h3" size="h3" font="serif" className="text-primary leading-snug">
                    {s.title}
                  </Heading>
                  
                  <Label className="block text-primary/45 uppercase tracking-[0.2em] text-[10px] font-sans">
                    {s.subtitle}
                  </Label>
                  
                  <Text size="body" tone="secondary" className="font-light leading-relaxed mt-1">
                    {s.desc}
                  </Text>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default ServiciosSection;
