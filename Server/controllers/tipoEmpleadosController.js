import tipoEmpleadosModel from "../models/tipoEmpleadosModel.js";

// Crear un tipo de área
export const createTipoEmpleado = async (req, res) => {
    try {
        const data = new tipoEmpleadosModel(req.body);
        await data.save();
        res.json({ success: true, message: "Tipo de empleado guardado exitosamente", data: data });
    } catch (error) {
        console.error("Error al crear el tipo de empleado:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};

// Obtener todos los tipos de área
export const getAllTiposEmpleado = async (req, res) => {
    try {
        const data = await tipoEmpleadosModel.find({});
        res.json({ success: true, data: data });
    } catch (error) {
        console.error("Error al obtener los tipos de empleado:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};

// Obtener un tipo de área por su ID
export const getTipoEmpleadoById = async (req, res) => {
    const tipoEmpleadoId = req.params.id;

    try {
        const tipoEmpleado = await tipoEmpleadosModel.findById(tipoEmpleadoId);
        if (!tipoEmpleado) {
            return res.status(404).json({ success: false, message: "Tipo de empleado no encontrado" });
        }
        res.json({ success: true, data: tipoEmpleado });
    } catch (error) {
        console.error("Error al obtener el tipo de empleado:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};

// Actualizar un tipo de área por su ID
export const updateTipoEmpleado = async (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    try {
        const data = await tipoEmpleadosModel.findByIdAndUpdate(id, newData, { new: true });
        res.json({ success: true, message: "Datos del tipo de empleado actualizados exitosamente", data: data });
    } catch (error) {
        console.error("Error al actualizar los datos del tipo de empleado:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};

// Eliminar un tipo de área por su ID
export const deleteTipoEmpleado = async (req, res) => {
    const id = req.params.id;

    try {
        const data = await tipoEmpleadosModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Tipo de empleado eliminado exitosamente", data: data });
    } catch (error) {
        console.error("Error al eliminar el tipo de empleado:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};
