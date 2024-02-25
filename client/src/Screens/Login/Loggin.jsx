import React, { useState } from 'react';
import logo from './logo.png';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#0C789C' }}>
      <div style={{ width: '100%', maxWidth: 325, position: 'relative', background: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25) inset', borderRadius: 20, padding: 20 }}>
        <div style={{ textAlign: 'center', marginBottom: 15 }}>
          <img src={logo} alt="Logo" style={{ width: '70%', maxWidth: 380, marginBottom: 45 }} />
          <h2 style={{ marginTop: -70, fontSize: 22}}>Inicio Sesión</h2>
        </div>
        <div style={{ marginBottom: 20 }}>
          <label htmlFor="userId" style={{ display: 'block', marginBottom: 15 }}>Id del usuario:</label>
          <input type="text" id="userId" name="userId" value={userId} onChange={(e) => setUserId(e.target.value)} style={{ width: '100%', height: 40, borderRadius: 5, border: '1px solid #ccc', padding: '0 10px', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: 15 }}>Contraseña:</label>
          <div style={{ position: 'relative' }}>
            <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', height: 40, borderRadius: 5, border: '1px solid #ccc', padding: '0 10px', boxSizing: 'border-box' }} />
            <div style={{ marginTop: 15 }}>
              <input type="checkbox" id="showPassword" checked={showPassword} onChange={() => setShowPassword(!showPassword)} style={{ marginRight: 5 }} />
              <label htmlFor="showPassword">Mostrar contraseña</label>
            </div>
          </div>
        </div>
        <button type="submit" disabled={!userId || !password} style={{ width: '50%', height: 40, background: '#047393', color: 'white', fontSize: 18, borderRadius: 9, border: 'none', margin: 'auto', marginTop: 30, cursor: 'pointer', display: 'block' }}>Ingresar</button>
      </div>
    </div>
  );
}

export default Login;