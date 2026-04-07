import React from 'react';
import { motion } from 'framer-motion';

const serviciosData = [
  { 
    id: "01", 
    title: "Producción de Largometrajes", 
    subtitle: "Ficción y Documentales",
    desc: "Desarrollamos y producimos largometrajes de ficción y documental con estándares internacionales. Más de 25 producciones con presencia en festivales y distribución en más de 40 países."
  },
  { 
    id: "02", 
    title: "Formación y Capacitación", 
    subtitle: "Talleres y Programas",
    desc: "Talleres y programas de formación para realizadores, guionistas y equipos técnicos. Transferencia directa del know-how de producciones de alto impacto narrativo y comercial."
  },
  { 
    id: "03", 
    title: "Servicios de Producción Internacional", 
    subtitle: "Argentina · España",
    desc: "Facilitamos rodajes internacionales en Argentina y España: locaciones, equipos técnicos, casting y coordinación logística integral para proyectos de cualquier escala."
  },
  { 
    id: "04", 
    title: "Realización Integral de Proyectos", 
    subtitle: "Del Concepto a la Pantalla",
    desc: "Desde el desarrollo hasta la entrega final. Producción, postproducción y estrategia de distribución gestionados por un solo equipo con visión creativa y ejecutiva unificada."
  },
  { 
    id: "05", 
    title: "Diseño de Proyectos Audiovisuales", 
    subtitle: "Desarrollo Creativo",
    desc: "Estructuración creativa y estratégica de proyectos: biblia, tratamiento, arquitectura narrativa y plan de financiamiento para cine, televisión y plataformas digitales."
  },
  { 
    id: "06", 
    title: "Producción de Contenidos Web", 
    subtitle: "Digital · Streaming · Redes",
    desc: "Contenido audiovisual nativo para plataformas digitales, YouTube, redes sociales y OTT. Branded content con identidad de marca y calidad de producción cinematográfica."
  },
  { 
    id: "07", 
    title: "Producción de Contenidos Televisivos", 
    subtitle: "Series · Unitarios · Formatos",
    desc: "Series, unitarios y formatos para cadenas nacionales e internacionales. Vasta experiencia en el ecosistema televisivo argentino y europeo, con track record en co-producciones."
  },
  { 
    id: "08", 
    title: "Producción Publicitaria", 
    subtitle: "Cine Publicitario · Branded Content",
    desc: "Spots, films publicitarios y contenido de marca con el rigor estético de la ficción cinematográfica. Para marcas que buscan diferenciarse con producción audiovisual de alto nivel."
  }
];

const ServiciosSection = () => {
  return (
    <section id="servicios" className="w-full bg-surface py-32 px-[6vw] relative overflow-hidden">
      {/* Background Watermark */}
      <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[15vw] text-primary/[0.03] select-none pointer-events-none uppercase">
        SERVICIOS
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24 relative z-10">
        {serviciosData.map((s, idx) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 border-t border-primary/5 pt-8"
          >
            <div className="flex flex-col gap-2">
              <span className="font-display text-5xl text-accent/30 leading-none">
                {s.id}
              </span>
              <h3 className="text-[14px] font-sans font-bold uppercase tracking-[0.1em] text-primary leading-tight">
                {s.title}
              </h3>
              <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-primary/40">
                {s.subtitle}
              </span>
            </div>
            
            <p className="text-[13px] font-sans font-light leading-relaxed text-primary/50">
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServiciosSection;
