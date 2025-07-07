import React, { useState } from 'react';

export default function Login({ onLogin, loading }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username,
          password,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Error en login');
      }
      const data = await res.json();
      onLogin(data.access_token);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg,#f5f7fa 0%,#c3cfe2 100%)'
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#fff',
          padding: '2.5rem 2rem',
          borderRadius: '1rem',
          boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
          display: 'flex',
          flexDirection: 'column',
          minWidth: 320,
          maxWidth: 350,
          alignItems: 'center',
        }}
      >
        <h2 style={{marginBottom: 24, color: '#2a3b4c'}}>Iniciar Sesión</h2>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          style={{
            padding: '0.75rem',
            marginBottom: 16,
            borderRadius: 8,
            border: '1px solid #c3cfe2',
            width: '100%',
            fontSize: 16,
            outline: 'none',
          }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{
            padding: '0.75rem',
            marginBottom: 20,
            borderRadius: 8,
            border: '1px solid #c3cfe2',
            width: '100%',
            fontSize: 16,
            outline: 'none',
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0.75rem',
            borderRadius: 8,
            background: '#2a3b4c',
            color: '#fff',
            border: 'none',
            width: '100%',
            fontWeight: 600,
            fontSize: 16,
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: 10,
            transition: 'background 0.2s',
          }}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        {error && <p style={{color: 'red', marginTop: 10}}>{error}</p>}
      </form>
    </div>
  );
}
