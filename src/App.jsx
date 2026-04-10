import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate, useParams } from 'react-router-dom';
import V1Home from './components/v1/V1Home';
import V2Home from './components/V2Home';
import FilmPageV1 from './components/v1/FilmPageV1';
import FilmPageV2 from './components/FilmPageV2';

function App() {
  const [version, setVersion] = useState('v2');
  const [filtro, setFiltro] = useState('Todos');
  const navigate = useNavigate();
  const location = useLocation();

  // Sincronizar el estado interno con la URL
  useEffect(() => {
    const pathVersion = location.pathname.split('/')[1];
    if (pathVersion === 'v1' || pathVersion === 'v2') {
      setVersion(pathVersion);
      document.documentElement.setAttribute('data-version', pathVersion);
    }
  }, [location.pathname]);

  const toggleVersion = () => {
    const newVersion = version === 'v1' ? 'v2' : 'v1';
    const currentPath = location.pathname;
    
    // Si estamos en una ruta de versión, cambiamos el prefijo
    if (currentPath.startsWith('/v1') || currentPath.startsWith('/v2')) {
      const newPath = currentPath.replace(/^\/(v1|v2)/, `/${newVersion}`);
      navigate(newPath);
    } else {
      navigate(`/${newVersion}`);
    }
  };

  const navigateToFilmV1 = (filmId) => {
    if (filmId === 25) navigate('/v1/atrapados');
    else navigate(`/v1/film/${filmId}`);
  };

  const navigateToFilmV2 = (filmId) => {
    if (filmId === 25) navigate('/v2/atrapados');
    else navigate(`/v2/film/${filmId}`);
  };

  return (
    <Routes>
      {/* Redirect root to v2 */}
      <Route path="/" element={<Navigate to="/v2" replace />} />

      {/* BRANCH V1: EDITORIAL */}
      <Route path="/v1">
        <Route index element={
          <V1Home 
            version="v1" 
            toggleVersion={toggleVersion} 
            onNavigate={navigateToFilmV1} 
          />
        } />
        <Route path="atrapados" element={
          <FilmPageV1 
            filmId={25}
            version="v1" 
            toggleVersion={toggleVersion}
          />
        } />
        <Route path="film/:id" element={
          <FilmPageV1 
            version="v1" 
            toggleVersion={toggleVersion}
          />
        } />
      </Route>

      {/* BRANCH V2: INDUSTRIAL */}
      <Route path="/v2">
        <Route index element={
          <V2Home 
            filtro={filtro} 
            setFiltro={setFiltro} 
            version="v2" 
            toggleVersion={toggleVersion} 
            onNavigate={navigateToFilmV2}
          />
        } />
        <Route path="atrapados" element={
          <FilmPageV2 
            filmId={25} 
            onBack={() => navigate('/v2')} 
            version="v2" 
            toggleVersion={toggleVersion}
          />
        } />
        <Route path="film/:id" element={
          <FilmPageV2Container 
            onBack={() => navigate('/v2')} 
            version="v2" 
            toggleVersion={toggleVersion}
          />
        } />
      </Route>

      {/* Fallback for legacy paths */}
      <Route path="/atrapados" element={<Navigate to="/v2/atrapados" replace />} />
    </Routes>
  );
}

// Wrapper for V2 FilmPage to extract ID
const FilmPageV2Container = ({ onBack, version, toggleVersion }) => {
  const { id } = useParams();
  return (
    <FilmPageV2 
      filmId={parseInt(id)} 
      onBack={onBack} 
      version={version} 
      toggleVersion={toggleVersion}
    />
  );
};

export default App;
