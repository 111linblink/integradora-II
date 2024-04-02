import UsuarioModel from '../models/usuarioModel.js';
import multer from 'multer';

const multer = require("multer")
const upload = multer({ dest: 'uploads/' }); // Directorio donde se guardarán los archivos temporales

export const subirDocumento = async (res,req) => {
    console.log(req.body);
    res.send("Documento subido ")
}