// Importa el modelo de usuario desde el archivo usuarioModel.js
import UsuarioModel from '../models/usuarioModel.js'; // Importa el modelo de usuario

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


