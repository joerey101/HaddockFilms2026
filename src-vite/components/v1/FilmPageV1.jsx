import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import { films as filmsData } from '../../data/filmsData';
import { useParams, useNavigate, Navigate } from 'react-router-dom';

const formatArray = (arr) => Array.isArray(arr) ? arr.join(', ') : arr;

const getEmbedUrl = (url) => {
  if (!url) return '';
  let id = '';
  if (url.includes('v=')) {
    id = url.split('v=')[1].split('&')[0];
  } else if (url.includes('youtu.be/')) {
    id = url.split('youtu.be/')[1].split('?')[0];
  } else {
    id = url.split('/').pop().split('?')[0];
  }
  return `https://www.youtube.com/embed/${id}`;
};

const FichaRow = ({ label, value }) => {
  if (!value) return null;
  return (
    <div style={{ borderBottom: '0.5px solid rgba(26,26,26,0.08)', padding: '0.75rem 0', display: 'flex', justifyContent: 'space-between', gap: '2rem' }}>
      <span style={{ fontSize: '11px', fontWeight: 700, opacity: 0.35, textTransform: 'uppercase', letterSpacing: '0.15em', flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: '13px', textAlign: 'right', fontWeight: 300, color: 'rgba(26,26,26,0.85)' }}>{value}</span>
    </div>
  );
};

const FilmPageV1 = ({ version, toggleVersion }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [trailerActivo, setTrailerActivo] = useState(false);

  const filmIndex = filmsData.findIndex(f => f.slug === slug);
  const film = filmsData[filmIndex];

  if (!film) return <Navigate to="/v1" replace />;

  const anterior = filmIndex > 0 ? filmsData[filmIndex - 1] : null;
  const siguiente = filmIndex < filmsData.length - 1 ? filmsData[filmIndex + 1] : null;

  const onBack = () => navigate('/v1');

  const micro = {
    fontSize: '9px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.25em',
  };

  const rule = {
    height: '0.5px',
    background: 'rgba(26,26,26,0.12)',
    width: '100%',
  };

  const px = 'clamp(1.2rem,5vw,4rem)';

  // Logic for multi-paragraph synopsis
  const synopsisParagraphs = film.synopsis_paragraphs || (film.synopsis ? film.synopsis.split('\n\n') : []);

  return (
    <div style={{
      background: 'var(--bg)',
      color: 'var(--text)',
      fontFamily: 'var(--font-sans)',
      overflowX: 'hidden',
      minHeight: '100vh',
    }}>
      <Navbar irACatalogo={onBack} version={version} toggleVersion={toggleVersion} />

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
          src={film.hero?.local_path || film.stills?.[0]?.local_path || film.poster.local_path}
          alt={film.title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(26,26,26,0.95) 25%, rgba(26,26,26,0.4) 65%, transparent)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,26,26,0.9) 0%, transparent 60%)' }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: `4rem ${px} clamp(2rem,6vw,5rem)`,
            color: '#F0EDE8',
            zIndex: 5,
          }}
        >
          <span style={{ ...micro, color: 'rgba(240,237,232,0.6)', letterSpacing: '0.3em' }}>
            — {film.year}&nbsp;&nbsp;·&nbsp;&nbsp;{film.type === 'pelicula' ? 'Película' : 'Serie'}
            {film.episodes && <>&nbsp;&nbsp;·&nbsp;&nbsp;{film.episodes}</>}
          </span>

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.5rem, 8vw, 7rem)',
            lineHeight: 0.9,
            margin: '0.5rem 0 1rem -0.05em',
            letterSpacing: '-0.03em',
            textShadow: '0 10px 30px rgba(0,0,0,0.3)',
          }}>
            {film.title}
          </h1>

          {film.adaptation && !film.based_on && (
            <p style={{ fontSize: '11px', color: 'rgba(240,237,232,0.45)', fontWeight: 300, lineHeight: 1.6, margin: 0 }}>
              Adaptación: {film.adaptation}
            </p>
          )}

          {film.based_on && (
            <p style={{ fontSize: '11px', color: 'rgba(240,237,232,0.45)', fontWeight: 300, lineHeight: 1.6, margin: 0 }}>
              Basado en: {film.based_on}
            </p>
          )}

          <div style={{ display: 'flex', gap: '6px', marginTop: '4px', flexWrap: 'wrap' }}>
            {film.plataforma && (
              <span style={{ background: film.plataformaColor || 'rgba(240,237,232,0.2)', color: '#fff', fontSize: '10px', fontWeight: 500, letterSpacing: '0.08em', padding: '3px 9px' }}>
                {film.plataforma.toUpperCase()}
              </span>
            )}
          </div>
        </motion.div>
      </motion.section>

      {/* ── CONTENT ── */}
      <div style={{ padding: `clamp(1.5rem,4vw,3rem) ${px}`, background: 'var(--bg)', position: 'relative', zIndex: 10 }}>
        
        {/* Mobile View */}
        <div className="block md:hidden">
          {film.trailer_url && (
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ ...micro, display: 'block', marginBottom: '0.6rem' }}>Tráiler oficial</span>
              <div style={{ ...rule, marginBottom: '0.75rem' }} />
              <div style={{ aspectRatio: '16/9', background: '#111', overflow: 'hidden', position: 'relative', cursor: 'pointer' }} onClick={() => setTrailerActivo(true)}>
                {trailerActivo ? (
                  <iframe src={`${getEmbedUrl(film.trailer_url)}?autoplay=1&rel=0`} title={film.title} allowFullScreen style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }} />
                ) : (
                  <>
                    <img src={film.hero?.local_path || film.stills?.[0]?.local_path || film.poster.local_path} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }} alt="Ver tráiler" />
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
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div style={{ width: '38%', flexShrink: 0 }}>
              <div style={{ aspectRatio: '2/3', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
                <img src={film.poster.local_path} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} alt={film.title} />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ ...micro, display: 'block', marginBottom: '0.5rem' }}>Sinopsis</span>
              <div style={{ ...rule, marginBottom: '0.65rem' }} />
              <div style={{ borderLeft: '2px solid rgba(26,26,26,0.12)', paddingLeft: '0.75rem' }}>
                {synopsisParagraphs.map((p, idx) => (
                  <p key={idx} style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(0.85rem,3.5vw,1rem)', lineHeight: 1.75, fontStyle: 'italic', marginBottom: idx === synopsisParagraphs.length - 1 ? 0 : '1rem' }}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:grid" style={{ gridTemplateColumns: 'clamp(240px,28vw,380px) 1fr', gap: 'clamp(2rem,4vw,4rem)', alignItems: 'start' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} style={{ marginTop: '-6rem' }}>
            <div style={{ aspectRatio: '2/3', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
              <img src={film.poster.local_path} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} alt={film.title} />
            </div>
            {film.imdb_url && (
              <a href={film.imdb_url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '0.75rem', textDecoration: 'none' }}>
                <span style={{ background: '#F5C518', color: '#000', fontSize: '10px', fontWeight: 700, padding: '2px 7px' }}>IMDb</span>
                <span style={{ ...micro, opacity: 0.35, fontSize: '9px' }}>Ver ficha →</span>
              </a>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingTop: '0.5rem' }}>
            {film.trailer_url && (
              <div>
                <span style={{ ...micro, display: 'block', marginBottom: '0.6rem' }}>Tráiler oficial</span>
                <div style={{ ...rule, marginBottom: '0.75rem' }} />
                <div style={{ aspectRatio: '16/9', background: '#111', overflow: 'hidden', position: 'relative', cursor: 'pointer' }} onClick={() => setTrailerActivo(true)}>
                  {trailerActivo ? (
                    <iframe src={`${getEmbedUrl(film.trailer_url)}?autoplay=1&rel=0`} title={film.title} allowFullScreen style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }} />
                  ) : (
                    <>
                      <img src={film.hero?.local_path || film.stills?.[0]?.local_path || film.poster.local_path} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }} alt="Ver tráiler" />
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
                {synopsisParagraphs.map((p, idx) => (
                  <p key={idx} style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(0.95rem,1.1vw,1.1rem)', lineHeight: 1.85, fontStyle: 'italic', marginBottom: idx === synopsisParagraphs.length - 1 ? 0 : '1.5rem' }}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── FICHA TÉCNICA ── */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} style={{ padding: `0 ${px}`, marginBottom: 'clamp(3rem,5vw,5rem)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.75rem' }}>
          <span style={{ ...micro, fontSize: 'clamp(16px,4vw,22px)', fontWeight: 700, opacity: 0.8, whiteSpace: 'nowrap' }}>Ficha técnica</span>
          <div style={{ ...rule, flex: 1 }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: '0 clamp(2rem,5vw,5rem)' }}>
          <div>
            <FichaRow label="Dirección" value={formatArray(film.directors)} />
            <FichaRow label="Producción" value={formatArray(film.producers)} />
            <FichaRow label="Prod. ejecutivos" value={formatArray(film.executive_producers)} />
            <FichaRow label="Guionistas" value={formatArray(film.screenplay)} />
            <FichaRow label="Adaptación" value={film.adaptation} />
            <FichaRow label="Basado en" value={film.based_on} />
            <FichaRow label="Música original" value={formatArray(film.music_original)} />
          </div>
          <div>
            <FichaRow label="Dir. fotografía" value={formatArray(film.cinematography)} />
            <FichaRow label="Dir. arte" value={formatArray(film.art_direction)} />
            <FichaRow label="Vestuario" value={formatArray(film.costume)} />
            <FichaRow label="Edición" value={formatArray(film.editing)} />
            <FichaRow label="Dir. sonido" value={formatArray(film.sound_direction)} />
            <FichaRow label="Dir. producción" value={formatArray(film.production_direction)} />
            <FichaRow label="Casting" value={formatArray(film.casting_direction)} />
            {film.other_credits && Object.entries(film.other_credits).map(([label, value]) => (
              <FichaRow key={label} label={label} value={value} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── RECONOCIMIENTOS ── */}
      {film.awards && film.awards.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} style={{ padding: `0 ${px}`, marginBottom: 'clamp(3rem,5vw,5rem)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.75rem' }}>
            <span style={{ ...micro, fontSize: 'clamp(16px,4vw,22px)', fontWeight: 700, opacity: 0.8, whiteSpace: 'nowrap' }}>Reconocimientos</span>
            <div style={{ ...rule, flex: 1 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
             {film.awards.map((award, idx) => (
               <div key={idx} style={{ padding: '0.85rem 0', borderBottom: '0.5px solid rgba(26,26,26,0.08)' }}>
                 <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.6, margin: 0, color: 'rgba(26,26,26,0.85)' }}>
                   {award}
                 </p>
               </div>
             ))}
          </div>
        </motion.div>
      )}

      {/* ── ELENCO ── */}
      {film.cast && film.cast.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} style={{ marginBottom: 'clamp(4rem,6vw,8rem)' }}>
          <div style={{ background: 'rgba(26,26,26,0.03)', padding: `2rem ${px} 1.5rem`, marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <span style={{ ...micro, fontSize: 'clamp(16px,4vw,22px)', fontWeight: 700, opacity: 0.8 }}>Elenco</span>
              <div style={{ ...rule, flex: 1 }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0 2rem' }}>
              {film.cast.map((p) => (
                <div key={p} style={{ borderTop: '0.5px solid rgba(26,26,26,0.1)', padding: '0.65rem 0' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: 1.5 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ ...rule, margin: `1rem ${px} 0` }} />
        </motion.div>
      )}

      {/* ── NAVEGACIÓN ── */}
      <div style={{ padding: `1.5rem ${px}`, borderTop: '0.5px solid rgba(26,26,26,0.1)', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
        {anterior ? (
          <button onClick={() => navigate(`/v1/${anterior.slug}`)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', opacity: 0.5 }}>
            <span style={{ ...micro, display: 'block', marginBottom: '3px' }}>← Anterior</span>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', fontStyle: 'italic' }}>{anterior.title}</span>
          </button>
        ) : <div />}
        <button onClick={onBack} style={{ ...micro, background: 'none', border: 'none', cursor: 'pointer', opacity: 0.3 }}>← Volver al catálogo</button>
        {siguiente ? (
          <button onClick={() => navigate(`/v1/${siguiente.slug}`)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'right', opacity: 0.5 }}>
            <span style={{ ...micro, display: 'block', marginBottom: '3px' }}>Siguiente →</span>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', fontStyle: 'italic' }}>{siguiente.title}</span>
          </button>
        ) : <div />}
      </div>
    </div>
  );
};

export default FilmPageV1;
