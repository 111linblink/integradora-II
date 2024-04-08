// authService.js (cliente)

import axios from 'axios';

// Función para generar un token único
const generateToken = () => {
  return Math.random().toString(36).substr(2, 6); // Ejemplo de token de 6 caracteres alfanuméricos
};

// Función para enviar el correo electrónico con el token desde el servidor
export const sendTokenByEmail = async (email) => {
  try {
    const token = generateToken(); // Genera un nuevo token único

    // Realiza una solicitud HTTP al servidor para enviar el correo electrónico con el token
    await axios.post('/send-token', { email, token });

    return token; // Devuelve el token generado
  } catch (error) {
    throw new Error('Error al enviar el correo electrónico');
  }
};

export default generateToken; // Exportar la función generateToken para usarla en otros archivos
