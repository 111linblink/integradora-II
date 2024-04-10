import express from 'express';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import UsuarioModel from '../models/usuarioModel.js';

const router = express.Router();

export const envioCorreo = (req, resp) => {
  let body = req.body;

  // Generar un token único
  const token = jwt.sign({ correo: body.correo }, 'secreto', { expiresIn: '1h' }); // Cambia 'secreto' por una clave secreta segura

  let config = nodemailer.createTransport({
    host: 'smtp.outlook.com',
    port: 587,
    auth:{
      user: 'integrantt@outlook.com',
      pass: 'teamotaylorswift_'
    }
  });

  const opciones = {
    from: 'Integrantt <integrantt@outlook.com>',
    to: body.correo,
    subject: 'Token para inicio de sesión',
    text: `Aquí está tu token: ${token}`, // Envía el token en el cuerpo del mensaje
  }

  config.sendMail(opciones, function(error, result){
    if(error){
      // Extraer el mensaje de error del objeto error
      const errorMessage = error.message || 'Error desconocido al enviar el correo';
      return resp.json({ ok:false, msg: errorMessage });
    }
    return resp.json({
      ok: true,
      msg: 'Se ha enviado un correo con el token.'
    });
  })
}


export const iniciarSesion = async (req, res) => {
  const { correo, token } = req.body;

  try {
    // Verificar si el token recibido es válido
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, 'secreto', (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      });
    });

    // Verificar si el correo coincide con el del token
    if (decoded.correo !== correo) {
      return res.json({ ok: false, msg: 'El correo no coincide con el token' });
    }

    // Buscar al usuario en la base de datos por correo electrónico
    const user = await UsuarioModel.findOne({ CorreoElectronico: correo });

    if (!user) {
      return res.json({ ok: false, msg: 'Usuario no encontrado' });
    }

    // Si todas las validaciones son exitosas, considerar el inicio de sesión exitoso
    return res.json({ ok: true, msg: 'Inicio de sesión exitoso', userData: { nombre: user.Nombre, correo: user.CorreoElectronico, numero: user.Numero_Empleado } });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return res.status(500).json({ ok: false, msg: 'Error del servidor' });
  }
};




export default router;
