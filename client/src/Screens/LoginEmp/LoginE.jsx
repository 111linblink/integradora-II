import React, { useState } from 'react';
import axios from 'axios';
import logo from './logo.png';

function LoginE() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [tokenSent, setTokenSent] = useState(false);
  const [error, setError] = useState('');

  const handleSendToken = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3000/loginE`, {
        correo: email
      });

      if (response.data && response.data.ok) {
        setTokenSent(true);
        alert('Se ha enviado un correo con el token.');
      } else {
        setError('Hubo un error al enviar el correo: ' + (response.data.msg || 'Error desconocido'));
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Hubo un error al enviar el correo.');
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3000/loginE/iniciarSesion`, {
        correo: email,
        token: token
      });

      if (response.data && response.data.ok) {
        alert('Inicio de sesión exitoso.');
        window.location.href = '/vacaciones';
      } else {
        setError('Inicio de sesión fallido. Por favor, verifique el token e inténtelo nuevamente.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Hubo un error al iniciar sesión.');
    }
  };

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#0C789C' }}>
      <div style={{ width: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', background: '#fff' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img src={logo} alt="Logo" style={{ width: '60%', maxWidth: '100%', marginBottom: '20px' }} />
          <h2 style={{ marginBottom: '0', fontFamily: 'Roboto', fontSize: '24px', color: '#000' }}>Iniciar Sesión</h2>
        </div>
        {!tokenSent ? (
          <form onSubmit={handleSendToken}>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontFamily: 'Roboto' }}>Correo Electrónico:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', height: '40px', borderRadius: '5px', border: '1px solid #ccc', padding: '0 10px', boxSizing: 'border-box' }}
              />
            </div>
            <button type="submit" style={{ width: '100%', height: '40px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontFamily: 'Roboto', fontSize: '16px' }}>Enviar Token</button>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="token" style={{ display: 'block', marginBottom: '5px', fontFamily: 'Roboto' }}>Token:</label>
              <input
                type="text"
                id="token"
                name="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                style={{ width: '100%', height: '40px', borderRadius: '5px', border: '1px solid #ccc', padding: '0 10px', boxSizing: 'border-box' }}
              />
            </div>
            <button type="submit" style={{ width: '100%', height: '40px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontFamily: 'Roboto', fontSize: '16px' }}>Iniciar Sesión</button>
          </form>
        )}
        {error && <p style={{ color: 'red', marginTop: '10px', fontFamily: 'Roboto' }}>{error}</p>}
      </div>
    </div>
  );
}

export default LoginE;
