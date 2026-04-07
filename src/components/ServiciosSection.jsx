import React from 'react';
import { motion } from 'framer-motion';

const servicios = [
  {
    id: '01',
    titulo: 'Producción de Largometrajes',
    subtitulo: 'Ficción y Documentales',
    descripcion:
      'Desarrollamos y producimos largometrajes de ficción y documental con estándares internacionales. Más de 25 producciones con presencia en festivales y distribución en más de 40 países.',
  },
  {
    id: '02',
    titulo: 'Formación y Capacitación',
    subtitulo: 'Talleres y Programas',
    descripcion:
      'Talleres y programas de formación para realizadores, guionistas y equipos técnicos. Transferencia directa del know-how de producciones de alto impacto narrativo y comercial.',
  },
  {
    id: '03',
    titulo: 'Servicios de Producción Internacional',
    subtitulo: 'Argentina · España',
    descripcion:
      'Facilitamos rodajes internacionales en Argentina y España: locaciones, equipos técnicos, casting y coordinación logística integral para proyectos de cualquier escala.',
  },
  {
    id: '04',
    titulo: 'Realización Integral de Proyectos',
    subtitulo: 'Del Concepto a la Pantalla',
    descripcion:
      'Desde el desarrollo hasta la entrega final. Producción, postproducción y estrategia de distribución gestionados por un solo equipo con visión creativa y ejecutiva unificada.',
  },
  {
    id: '05',
    titulo: 'Diseño de Proyectos Audiovisuales',
    subtitulo: 'Desarrollo Creativo',
    descripcion:
      'Estructuración creativa y estratégica de proyectos: biblia, tratamiento, arquitectura narrativa y plan de financiamiento para cine, televisión y plataformas digitales.',
  },
  {
    id: '06',
    titulo: 'Producción de Contenidos Web',
    subtitulo: 'Digital · Streaming · Redes',
    descripcion:
      'Contenido audiovisual nativo para plataformas digitales, YouTube, redes sociales y OTT. Branded content con identidad de marca y calidad de producción cinematográfica.',
  },
  {
    id: '07',
    titulo: 'Producción de Contenidos Televisivos',
    subtitulo: 'Series · Unitarios · Formatos',
    descripcion:
      'Series, unitarios y formatos para cadenas nacionales e internacionales. Vasta experiencia en el ecosistema televisivo argentino y europeo, con track record en co-producciones.',
  },
  {
    id: '08',
    titulo: 'Producción Publicitaria',
    subtitulo: 'Cine Publicitario · Branded Content',
    descripcion:
      'Spots, films publicitarios y contenido de marca con el rigor estético de la ficción cinematográfica. Para marcas que buscan diferenciarse con producción audiovisual de alto nivel.',
  },
];


const ServiciosSection = () => {
  return (
    <section
      id="servicios"
      aria-label="Servicios de Haddock Films"
      style={{ background: 'linear-gradient(to bottom, #e8e8e8, #f9f9f9)' }}
      className="w-full py-[clamp(5rem,9vw,14rem)] px-[6vw]"
    >
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="mb-[clamp(3rem,6vw,8rem)]"
      >
        <span className="text-prestige-label mb-4 block">— Servicios</span>

        {/* Statement que reemplaza el párrafo mediocre — SEO-friendly */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:items-start gap-6">
          <h2 className="md:col-span-3 font-serif text-[clamp(2.4rem,4.5vw,6rem)] leading-[1.0] tracking-[-0.02em] text-primary">
            Expertise en cada formato,<br />
            <em>en cada pantalla.</em>
          </h2>
          <p className="md:col-span-1 md:-ml-8 text-editorial-body">
            El éxito de nuestras producciones en más de 40 países nos otorga un
            know-how inigualable. Ofrecemos servicios integrales para cada etapa
            del proceso audiovisual.
          </p>
        </div>
      </motion.div>

      {/* ── Grid de servicios ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {servicios.map((servicio, idx) => (
          <motion.article
            key={servicio.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: (idx % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="border-t border-primary/10 pt-8 pb-12 pr-0 lg:pr-10"
          >
            {/* Número */}
            <span className="text-prestige-label mb-6 block">
              {servicio.id}
            </span>

            {/* Título del servicio — indexable por Google */}
            <h3 className="font-serif text-[clamp(1.1rem,1.3vw,1.4rem)] leading-snug tracking-tight text-primary mb-1">
              {servicio.titulo}
            </h3>

            {/* Subtítulo */}
            <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-primary/40 mb-4">
              {servicio.subtitulo}
            </p>

            {/* Descripción — carne del SEO */}
            <p className="font-sans font-light text-[clamp(0.82rem,0.9vw,0.95rem)] leading-[1.75] text-primary/55">
              {servicio.descripcion}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default ServiciosSection;
