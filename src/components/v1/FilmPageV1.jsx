import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import { filmsData } from '../../data/filmsData';
import { useParams, useNavigate } from 'react-router-dom';

// ─── FICHA ROW ────────────────────────────────────────────────────────────────
const FichaRow = ({ label, value }) => {
  if (!value) return null;
  return (
    <div style={{
      padding: '0.75rem 0',
      borderBottom: '0.5px solid rgba(26,26,26,0.1)',
      display: 'flex',
      gap: '1rem',
      alignItems: 'baseline',
    }}>
      <span style={{
        minWidth: '110px',
        fontSize: '10px',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        fontWeight: 500,
        opacity: 0.4,
        fontFamily: 'var(--font-sans)',
        flexShrink: 0,
      }}>
        {label}
      </span>
      <span style={{ fontSize: '13px', lineHeight: 1.5 }}>{value}</span>
    </div>
  );
};

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
const FilmPageV1 = ({ version, toggleVersion, filmId }) => {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const [trailerActivo, setTrailerActivo] = useState(false);

  const film = filmsData.find(f =>
    f.id === filmId ||
    f.slug === slug ||
    f.id === parseInt(id)
  ) || filmsData[0];

  const filmIndex = filmsData.findIndex(f => f.id === film.id);
  const anterior  = filmsData[filmIndex + 1] || null;
  const siguiente = filmsData[filmIndex - 1] || null;

  const onBack = () => navigate('/v1');

  const micro = {
    fontSize: '10px',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    fontWeight: 500,
    fontFamily: 'var(--font-sans)',
    color: 'var(--color-secondary)',
  };

  const rule = {
    height: '0.5px',
    background: 'rgba(26,26,26,0.1)',
  };

  const px = 'clamp(1.2rem,5vw,4rem)';

  return (
    <div style={{
      background: 'var(--bg)',
      color: 'var(--text)',
      fontFamily: 'var(--font-sans)',
      overflowX: 'hidden',
      minHeight: '100vh',
    }}>
      <Navbar
        irACatalogo={onBack}
        version={version}
        toggleVersion={toggleVersion}
      />

      {/* ── HERO ── */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '55vw',
          maxHeight: '90vh',
          height: 'clamp(280px, 56vw, 680px)',
          overflow: 'hidden',
        }}
      >
        <img
          src={film.heroImage}
          alt={film.title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(26,26,26,0.95) 25%, rgba(26,26,26,0.4) 65%, transparent)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,26,26,0.9) 0%, transparent 60%)' }} />

        {/* Hero text — bottom-anchored, full width on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: `clamp(1.2rem,4vw,3rem) ${px} clamp(1.5rem,4vw,3rem)`,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
          }}
        >
          <span style={{ ...micro, color: 'rgba(240,237,232,0.6)', letterSpacing: '0.3em' }}>
            — {film.year}&nbsp;&nbsp;·&nbsp;&nbsp;{film.tipo}
            {film.episodios && <>&nbsp;&nbsp;·&nbsp;&nbsp;{film.episodios}</>}
          </span>

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.8rem,8vw,8.5rem)',
            fontWeight: 700,
            color: '#F0EDE8',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            margin: 0,
            textShadow: '0 10px 30px rgba(0,0,0,0.3)',
          }}>
            {film.title}
          </h1>

          {film.basadaEn && (
            <p style={{ fontSize: '11px', color: 'rgba(240,237,232,0.45)', fontWeight: 300, lineHeight: 1.6, margin: 0 }}>
              Basada en {film.basadaEn}
            </p>
          )}

          <div style={{ display: 'flex', gap: '6px', marginTop: '4px', flexWrap: 'wrap' }}>
            {film.plataforma && (
              <span style={{
                background: film.plataformaColor || 'rgba(240,237,232,0.2)',
                color: '#fff',
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                padding: '3px 9px',
              }}>
                {film.plataforma.toUpperCase()}
              </span>
            )}
            {film.estreno && (
              <span style={{
                border: '0.5px solid rgba(240,237,232,0.3)',
                color: 'rgba(240,237,232,0.45)',
                fontSize: '10px',
                padding: '3px 9px',
              }}>
                {film.estreno.toUpperCase()}
              </span>
            )}
          </div>
        </motion.div>
      </motion.section>

      {/* ── PÓSTER + TRÁILER + SINOPSIS ── */}
      {/* Mobile: stacked column. Desktop: 2-col grid */}
      <div style={{
        padding: `clamp(1.5rem,4vw,3rem) ${px}`,
        background: 'var(--bg)',
        position: 'relative',
        zIndex: 10,
      }}>
        {/* Mobile layout */}
        <div className="block md:hidden">
          {/* Tráiler primero en mobile */}
          {film.trailer && (
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ ...micro, display: 'block', marginBottom: '0.6rem' }}>Tráiler oficial</span>
              <div style={{ ...rule, marginBottom: '0.75rem' }} />
              <div
                style={{ aspectRatio: '16/9', background: '#111', overflow: 'hidden', position: 'relative', cursor: 'pointer' }}
                onClick={() => setTrailerActivo(true)}
              >
                {trailerActivo ? (
                  <iframe
                    src={`${film.trailer}?autoplay=1&rel=0`}
                    title={`Tráiler de ${film.title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                  />
                ) : (
                  <>
                    <img
                      src={film.heroImage}
                      alt="Ver tráiler"
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }}
                    />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(229,9,20,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21" /></svg>
                      </div>
                      <span style={{ ...micro, color: 'rgba(240,237,232,0.6)' }}>Ver tráiler</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Póster + IMDb en mobile — width limitado */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div style={{ width: '38%', flexShrink: 0 }}>
              <div style={{ aspectRatio: '2/3', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
                <img
                  src={film.poster}
                  alt={`Póster de ${film.title}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              {film.imdb && (
                <a href={film.imdb} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '0.5rem', textDecoration: 'none' }}>
                  <span style={{ background: '#F5C518', color: '#000', fontSize: '9px', fontWeight: 700, padding: '2px 6px' }}>IMDb</span>
                  <span style={{ ...micro, opacity: 0.35, fontSize: '9px' }}>Ver →</span>
                </a>
              )}
            </div>
            {/* Sinopsis al lado del póster en mobile */}
            <div style={{ flex: 1 }}>
              <span style={{ ...micro, display: 'block', marginBottom: '0.5rem' }}>Sinopsis</span>
              <div style={{ ...rule, marginBottom: '0.65rem' }} />
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(0.85rem,3.5vw,1rem)',
                lineHeight: 1.75,
                fontStyle: 'italic',
                margin: 0,
                borderLeft: '2px solid rgba(26,26,26,0.12)',
                paddingLeft: '0.75rem',
              }}>
                {film.sinopsis}
              </p>
            </div>
          </div>
        </div>

        {/* Desktop layout: 2-col grid */}
        <div
          className="hidden md:grid"
          style={{
            gridTemplateColumns: 'clamp(240px,28vw,380px) 1fr',
            gap: 'clamp(2rem,4vw,4rem)',
            alignItems: 'start',
          }}
        >
          {/* PÓSTER — sale del hero en desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginTop: '-6rem' }}
          >
            <div style={{ aspectRatio: '2/3', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
              <img
                src={film.poster}
                alt={`Póster de ${film.title}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            {film.imdb && (
              <a href={film.imdb} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '0.75rem', textDecoration: 'none' }}>
                <span style={{ background: '#F5C518', color: '#000', fontSize: '10px', fontWeight: 700, padding: '2px 7px' }}>IMDb</span>
                <span style={{ ...micro, opacity: 0.35, fontSize: '9px' }}>Ver ficha →</span>
              </a>
            )}
          </motion.div>

          {/* TRÁILER + SINOPSIS en desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingTop: '0.5rem' }}
          >
            {film.trailer && (
              <div>
                <span style={{ ...micro, display: 'block', marginBottom: '0.6rem' }}>Tráiler oficial</span>
                <div style={{ ...rule, marginBottom: '0.75rem' }} />
                <div
                  style={{ aspectRatio: '16/9', background: '#111', overflow: 'hidden', position: 'relative', cursor: 'pointer' }}
                  onClick={() => setTrailerActivo(true)}
                >
                  {trailerActivo ? (
                    <iframe
                      src={`${film.trailer}?autoplay=1&rel=0`}
                      title={`Tráiler de ${film.title}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                    />
                  ) : (
                    <>
                      <img src={film.heroImage} alt="Ver tráiler"
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }} />
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(229,9,20,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21" /></svg>
                        </div>
                        <span style={{ ...micro, color: 'rgba(240,237,232,0.6)' }}>Ver tráiler</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
            <div>
              <span style={{ ...micro, display: 'block', marginBottom: '0.6rem' }}>Sinopsis</span>
              <div style={{ ...rule, marginBottom: '0.75rem' }} />
              <div style={{ borderLeft: '2px solid rgba(26,26,26,0.12)', paddingLeft: '1.25rem' }}>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(0.95rem,1.1vw,1.1rem)', lineHeight: 1.85, fontStyle: 'italic', margin: 0 }}>
                  {film.sinopsis}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── FICHA TÉCNICA ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        style={{ padding: `0 ${px}`, marginBottom: 'clamp(3rem,5vw,5rem)' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.75rem' }}>
          <span style={{ ...micro, fontSize: 'clamp(16px,4vw,22px)', fontWeight: 700, opacity: 0.8, whiteSpace: 'nowrap' }}>Ficha técnica</span>
          <div style={{ ...rule, flex: 1 }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: '0 clamp(2rem,5vw,5rem)' }}>
          <div>
            <FichaRow label="Dirección"        value={film.director} />
            <FichaRow label="Producción"       value={film.produccion} />
            <FichaRow label="Prod. ejecutivos" value={film.productoresEjecutivos} />
            <FichaRow label="Showrunner"       value={film.showrunner} />
            <FichaRow label="Guionistas"       value={film.guionistas} />
            <FichaRow label="Adaptación"       value={film.adaptacion} />
            <FichaRow label="Música original"  value={film.musicaOriginal} />
          </div>
          <div>
            <FichaRow label="Dir. fotografía"    value={film.dirFotografia} />
            <FichaRow label="Dir. arte"          value={film.dirArte} />
            <FichaRow label="Vestuario"          value={film.vestuario} />
            <FichaRow label="Edición"            value={film.edicion} />
            <FichaRow label="Dir. sonido"        value={film.dirSonido} />
            <FichaRow label="Dir. producción"    value={film.dirProduccion} />
            <FichaRow label="Dir. postproducción" value={film.dirPostproduccion} />
            <FichaRow label="Casting"            value={film.casting} />
          </div>
        </div>
      </motion.div>

      {/* ── ELENCO ── */}
      {film.protagonistas && film.protagonistas.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          style={{ marginBottom: 'clamp(4rem,6vw,8rem)' }}
        >
          <div style={{ background: 'rgba(26,26,26,0.03)', padding: `2rem ${px} 1.5rem`, marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <span style={{ ...micro, fontSize: 'clamp(16px,4vw,22px)', fontWeight: 700, opacity: 0.8 }}>Elenco</span>
              <div style={{ ...rule, flex: 1 }} />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <span style={{ ...micro, fontSize: '13px', fontWeight: 700, opacity: 0.6, display: 'block', marginBottom: '0.65rem' }}>Protagonistas</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0 2rem' }}>
                {film.protagonistas.map((p) => (
                  <div key={p.nombre} style={{ borderTop: '0.5px solid rgba(26,26,26,0.1)', padding: '0.65rem 0', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: 1.5 }}>{p.nombre}</span>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', lineHeight: 1.5, opacity: 0.5 }}>{p.rol}</span>
                  </div>
                ))}
              </div>
            </div>

            {film.participacionEspecial && film.participacionEspecial.length > 0 && (
              <div style={{ borderTop: '0.5px solid rgba(26,26,26,0.1)', padding: '0.75rem 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: 1.5 }}>
                  con {film.participacionEspecial.join(', ')}
                </span>
                <span style={{ fontSize: '11px', opacity: 0.5 }}>Participación especial</span>
              </div>
            )}
          </div>

          {film.reparto && film.reparto.length > 0 && (
            <div style={{ padding: `0 ${px}` }}>
              <div style={{ borderTop: '0.5px solid rgba(26,26,26,0.1)', paddingTop: '0.75rem', marginTop: '2rem' }}>
                <span style={{ ...micro, fontSize: '13px', fontWeight: 700, opacity: 0.6, display: 'block', marginBottom: '0.65rem' }}>Reparto</span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px,1fr))', gap: '0 2rem' }}>
                  {film.reparto.map((nombre) => (
                    <div key={nombre} style={{ borderTop: '0.5px solid rgba(26,26,26,0.1)', padding: '0.55rem 0', fontSize: '13px', fontFamily: 'var(--font-sans)', lineHeight: 1.5 }}>
                      {nombre}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div style={{ ...rule, margin: `1rem ${px} 0` }} />
        </motion.div>
      )}

      {/* ── NAVEGACIÓN ── */}
      <div style={{
        padding: `1.5rem ${px}`,
        borderTop: '0.5px solid rgba(26,26,26,0.1)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        {anterior ? (
          <motion.button
            whileHover={{ x: -4 }}
            transition={{ duration: 0.3 }}
            onClick={() => navigate(`/v1/film/${anterior.slug || anterior.id}`)}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', opacity: 0.5 }}
          >
            <span style={{ ...micro, display: 'block', marginBottom: '3px' }}>← Anterior</span>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', fontStyle: 'italic' }}>{anterior.title}</span>
          </motion.button>
        ) : <div />}

        <button
          onClick={onBack}
          style={{ ...micro, background: 'none', border: 'none', cursor: 'pointer', opacity: 0.3 }}
        >
          ← Volver al catálogo
        </button>

        {siguiente ? (
          <motion.button
            whileHover={{ x: 4 }}
            transition={{ duration: 0.3 }}
            onClick={() => navigate(`/v1/film/${siguiente.slug || siguiente.id}`)}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'right', opacity: 0.5 }}
          >
            <span style={{ ...micro, display: 'block', marginBottom: '3px' }}>Siguiente →</span>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', fontStyle: 'italic' }}>{siguiente.title}</span>
          </motion.button>
        ) : <div />}
      </div>

    </div>
  );
};

export default FilmPageV1;
