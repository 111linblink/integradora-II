import UsuarioModel from '../models/usuarioModel.js';
import multer from 'multer';
import fs from 'fs';

export const subirEmpleados = async (req, res) => {
    try {
        // Verificar si se cargó un archivo
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No se ha proporcionado ningún archivo" });
        }

        const filePath = req.file.path; // Ruta del archivo temporal
        const rawData = fs.readFileSync(filePath);
        const empleados = JSON.parse(rawData);

        // Iterar sobre los empleados y guardarlos en la base de datos
        for (const empleado of empleados) {
            // Crear un nuevo objeto de usuario con campos vacíos si faltan datos
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
                Tipo: empleado.Tipo || '',
                Contrasena: empleado.Contrasena || '',
                Img: empleado.Img || ''
            };

            // Guardar el empleado en la base de datos
            await UsuarioModel.create(nuevoEmpleado);
        }

        // Eliminar el archivo temporal después de procesarlo
        fs.unlinkSync(filePath);

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
        console.log('CorreoElectronico:', CorreoElectronico);
        console.log('Contrasena:', Contrasena);
        const user = await UsuarioModel.findOne({ CorreoElectronico });
        if (!user || user.Contrasena !== Contrasena) {
            return res.status(401).json({ success: false, message: "Credenciales incorrectas" });
        }
        res.json({ success: true, message: "Inicio de sesión exitoso" });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
}

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
        const newUser = new UsuarioModel(req.body);
        await newUser.save();
        res.json({ success: true, message: "Usuario creado exitosamente", data: newUser });
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
}

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


