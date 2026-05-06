import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate, useParams } from 'react-router-dom';
import V1Home from './components/v1/V1Home';
import FilmPageV1 from './components/v1/FilmPageV1';

import { filmsData } from './data/filmsData';

function App() {
  const [version] = useState('v1'); // Forzado a v1
  const [filtro, setFiltro] = useState('Todos');
  const navigate = useNavigate();
  const location = useLocation();

  // Sincronizar el estado interno con la URL y forzar v1
  useEffect(() => {
    document.documentElement.setAttribute('data-version', 'v1');
  }, []);

  const navigateToFilmV1 = (target) => {
    if (typeof target === 'number' || (target && typeof target === 'object' && target.id)) {
      const id = typeof target === 'number' ? target : target.id;
      const film = filmsData.find(f => f.id === id);
      if (film) navigate(`/v1/${film.slug}`);
      else navigate('/v1');
    } else {
      navigate(`/v1/${target}`);
    }
  };

  return (
    <Routes>
      {/* Default: home de V1 */}
      <Route path="/" element={<Navigate to="/v1" replace />} />

      {/* BRANCH V1: EDITORIAL - Única versión activa */}
      <Route path="/v1">
        <Route index element={
          <V1Home 
            version="v1" 
            onNavigate={navigateToFilmV1} 
          />
        } />
        {/* Slug-based routing */}
        <Route path=":slug" element={
          <FilmPageV1 
            version="v1" 
          />
        } />
        {/* Redirect legacy: /v1/film/:id → /v1/:slug */}
        <Route path="film/:id" element={<FilmPageRedirect />} />
      </Route>

      {/* V2 desactivada: cualquier acceso redirige a V1 */}
      <Route path="/v2/*" element={<Navigate to="/v1" replace />} />

      {/* 404: cualquier otra ruta → V1 home */}
      <Route path="*" element={<Navigate to="/v1" replace />} />
    </Routes>
  );
}

// Redirect helper for legacy /v1/film/:id URLs
const FilmPageRedirect = () => {
  const { id } = useParams();
  const film = filmsData.find(f => String(f.id) === id);
  if (!film) return <Navigate to="/v1" replace />;
  return <Navigate to={`/v1/${film.slug}`} replace />;
};

export default App;
