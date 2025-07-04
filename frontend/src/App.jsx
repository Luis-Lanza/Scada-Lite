import React, { useEffect, useState } from 'react';
import SensorChart from './components/SensorChart';

// Componente principal de la app
export default function App() {
  const [sensores, setSensores] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch periódicamente los datos más recientes de sensores
  useEffect(() => {
    let interval = setInterval(() => {
      fetch('/api/sensores/')
        .then(res => res.json())
        .then(data => {
          setSensores(data);
          setLoading(false);
        });
    }, 2000); // Actualiza cada 2 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h1>SCADA-Lite - Monitoreo de Sensores</h1>
      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <SensorChart sensores={sensores} />
      )}
    </div>
  );
}
