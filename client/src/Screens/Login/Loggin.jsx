import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png'; // Importa tu logo desde la ruta correcta

function Login() {
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          CorreoElectronico: correoElectronico,
          Contrasena: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Inicio de sesión exitoso:', data);
        navigate('/sa-agregar');
      } else {
        setMensaje(data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setMensaje('Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#0C789C' }}>
      <div style={{ width: '100%', maxWidth: 330, position: 'relative', background: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25) inset', borderRadius: 20, padding: 20 }}>
        <div style={{ textAlign: 'center', marginBottom: 15 }}>
          <img src={logo} alt="Logo" style={{ width: '60%', maxWidth: 320, marginBottom: 20 }} />
          <h2 style={{ marginTop: -10, fontSize: 24, fontFamily: 'Roboto'}}>Iniciar Sesión</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label htmlFor="correoElectronico" style={{ display: 'block', marginBottom: 15, fontFamily: 'Roboto'}}>Correo Electrónico:</label>
            <input type="text" id="correoElectronico" value={correoElectronico} onChange={(e) => setCorreoElectronico(e.target.value)} style={{ width: '100%', height: 40, borderRadius: 5, border: '1px solid #ccc', padding: '0 10px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: 15, fontFamily: 'Roboto', fontSize: '14'}}>Contraseña:</label>
            <input type={showPassword ? 'text' : 'password'} id="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', height: 40, borderRadius: 5, border: '1px solid #ccc', padding: '0 10px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: 20, textAlign: 'left' }}>
            <input type="checkbox" id="showPassword" checked={showPassword} onChange={() => setShowPassword(!showPassword)} style={{ marginRight: 5 }} />
            <label htmlFor="showPassword" style={{ fontFamily: 'Roboto', fontSize: '14' }}>Mostrar contraseña</label>
          </div>
          <button type="submit" style={{ width: '100%', height: 40, background: '#047393', color: 'white', fontSize: '16', borderRadius: 9, border: 'none', cursor: 'pointer', fontFamily: 'Roboto' }}>Ingresar</button>
        </form>
        <p style={{ marginTop: 25, textAlign: 'center', fontFamily: 'Roboto', color: 'red' }}>{mensaje}</p>
      </div>
    </div>
  );
}

export default Login;