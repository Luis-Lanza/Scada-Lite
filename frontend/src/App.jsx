import React, { useEffect, useState } from 'react';
import SensorChart from './components/SensorChart';
import Login from './components/Login';

export default function App() {
  const [token, setToken] = useState(null);
  const [sensores, setSensores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Logout handler
  const handleLogout = () => {
    setToken(null);
    setSensores([]);
  };

  // Fetch sensores solo si hay token
  useEffect(() => {
    if (!token) return;
    setLoading(true);
    setError(null);
    const fetchSensores = () => {
      fetch('/api/sensores/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => {
          if (!res.ok) throw new Error('No autorizado o error en backend');
          return res.json();
        })
        .then(data => {
          setSensores(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    };
    fetchSensores();
    const interval = setInterval(fetchSensores, 2000);
    return () => clearInterval(interval);
  }, [token]);

  if (!token) {
    return <Login onLogin={setToken} loading={loading} />;
  }

  return (
    <div className="container">
      <h1>SCADA-Lite - Monitoreo de Sensores</h1>
      <button onClick={handleLogout} style={{float:'right'}}>Cerrar sesión</button>
      {loading ? (
        <p>Cargando datos...</p>
      ) : error ? (
        <p style={{color:'red'}}>{error}</p>
      ) : (
        <SensorChart sensores={sensores} />
      )}
    </div>
  );
}
