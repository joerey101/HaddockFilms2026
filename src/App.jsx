import React, { useState, useEffect } from 'react';
import V1Home from './components/v1/V1Home';
import V2Home from './components/V2Home';
import VersionSwitcher from './components/VersionSwitcher';

function App() {
  const [version, setVersion] = useState('v2');
  const [filtro, setFiltro] = useState('Todos');

  useEffect(() => {
    // Sincronizar el atributo data-version con el root para activar los estilos CSS correspondientes
    document.documentElement.setAttribute('data-version', version);
  }, [version]);

  const toggleVersion = () => {
    setVersion(prev => prev === 'v1' ? 'v2' : 'v1');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <>
      {version === 'v1' ? (
        <V1Home version={version} toggleVersion={toggleVersion} />
      ) : (
        <V2Home filtro={filtro} setFiltro={setFiltro} version={version} toggleVersion={toggleVersion} />
      )}
    </>
  );
}

export default App;
