import React, { useState } from 'react';
import { sendTokenByEmail } from '../../authService'; 

const LoginE = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envía el correo electrónico con el token
      await sendTokenByEmail(email);
      alert('Se ha enviado un correo electrónico con el token de inicio de sesión.');
    } catch (error) {
      setError('Error al enviar el correo electrónico. Por favor, verifica tu dirección de correo electrónico.');
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Correo Electrónico:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Enviar Token de Inicio de Sesión</button>
      </form>
    </div>
  );
};

export default LoginE;
