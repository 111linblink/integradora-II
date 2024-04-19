import UsuarioModel from '../models/usuarioModel.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;
const upload = multer({ dest: 'uploads/' }); 

export const subirEmpleados = async (req, res) => {
    try {
       
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No se ha proporcionado ningún archivo" });
        }

        const rutaArchivo = req.file.path; 
        const datosCrudos = fs.readFileSync(rutaArchivo);
        const empleados = JSON.parse(datosCrudos);

        
        for (const empleado of empleados) {
        
            const nuevoEmpleado = {
                Nombre: empleado.Nombre || '',
                Numero_Empleado: empleado.Numero_Empleado || null,
                Estado: empleado.Estado || '',
                CorreoElectronico: empleado.CorreoElectronico || '',
                Area: empleado.Area || '',
                Sede: empleado.Sede || '',
                FechaNacimiento: empleado.FechaNacimiento || null,
                Sexo: empleado.Sexo || '',
                Contrato: empleado.Contrato || '',
                Turno: empleado.Turno || '',
                Tipo: empleado.Tipo || '',
                Contrasena: empleado.Contrasena || '',
                Img: empleado.Img || ''
            };

          
            await UsuarioModel.create(nuevoEmpleado);
        }

   
        fs.unlinkSync(rutaArchivo);

        res.json({ success: true, message: "Carga masiva de empleados completada exitosamente" });
    } catch (error) {
        console.error("Error al cargar empleados:", error);
        res.status(500).json({ success: false, message: "Error del servidor al cargar empleados" });
    }
};

// Login
export const login = async (req, res) => {
    const { CorreoElectronico, Contrasena } = req.body;

    try {
        const user = await UsuarioModel.findOne({ CorreoElectronico });

        if (!user || user.Contrasena !== Contrasena) {
            return res.status(401).json({ success: false, message: "Credenciales incorrectas" });
        }

        res.json({ 
            success: true, 
            message: "Inicio de sesión exitoso", 
            Tipo: user.Tipo,
            usuario: {
                nombre: user.Nombre,
                correo: user.CorreoElectronico,
                numero: user.Numero_Empleado,
                area: user.Area,
                sede: user.Sede,
                contrato: user.Contrato
            }
        });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};


// Mostrar todos los usuarios
export const getAllUsers = async (req, res) => {
    try {
        const users = await UsuarioModel.find({});
        res.json({ success: true, data: users });
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
}

// Obtener un usuario por su ID
export const getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await UsuarioModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado" });
        }
        res.json({ success: true, data: user });
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
}

// Crear un usuario
export const createUser = async (req, res) => {
    try {
        const { Nombre, Numero_Empleado, Status, CorreoElectronico, Area, Sede, FechaNacimiento, Sexo, Contrato, Tipo, Contrasena } = req.body;

        const img = req.file ? req.file.filename : '';

        const newUser = new UsuarioModel({
            Nombre,
            Numero_Empleado,
            Status,
            CorreoElectronico,
            Area,
            Sede,
            FechaNacimiento,
            Sexo,
            Contrato,
            Tipo,
            Contrasena,
            Img: img
        });

        await newUser.save();
        res.json({ success: true, message: "Usuario creado exitosamente", data: newUser });
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;

    try {
        const updatedUser = await UsuarioModel.findByIdAndUpdate(id, updatedData, { new: true });
        res.json({ success: true, message: "Usuario actualizado exitosamente", data: updatedUser });
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
}

// Eliminar un usuario
export const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedUser = await UsuarioModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado" });
        }
        res.json({ success: true, message: "Usuario eliminado exitosamente", data: deletedUser });
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
}
export const obtenerImagenUsuarioPorId = (req, res) => {
    const { id } = req.params;

    try {
        // Verificar si el ID proporcionado es un ObjectId válido
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'ID de usuario no válido' });
        }

        // Construir la ruta de la imagen del usuario
        const imgPath = path.join(__dirname, '..', 'uploads', `${id}.jpg`);

        // Verificar si el archivo de imagen existe
        if (!fs.existsSync(imgPath)) {
            return res.status(404).json({ error: 'Imagen no encontrada' });
        }

        // Leer la imagen del sistema de archivos y enviarla como respuesta
        const imgData = fs.readFileSync(imgPath);
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(imgData);
    } catch (error) {
        console.error('Error al obtener la imagen del usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};