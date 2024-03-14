//import CapacitacionModel from "../models/capacitacionModel";
import capacitacionesModel from "../models/capacitacionesModel.js";
// Crear una capacitación
export const crearCapacitacion = async (req, res) => {
    try {
        const data = new capacitacionesModel(req.body);
        await data.save();
        res.json({ success: true, message: "Capacitación guardada exitosamente", data: data });
    } catch (error) {
        console.error("Error al crear la capacitación:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};

// Obtener todas las capacitaciones
export const obtenerTodasLasCapacitaciones = async (req, res) => {
    try {
        const data = await capacitacionesModel.find({});
        res.json({ success: true, data: data });
    } catch (error) {
        console.error("Error al obtener las capacitaciones:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};

// Obtener una capacitación por su ID
export const obtenerCapacitacionPorId = async (req, res) => {
    const capacitacionId = req.params.id;

    try {
        const capacitacion = await capacitacionesModel.findById(capacitacionId);
        if (!capacitacion) {
            return res.status(404).json({ success: false, message: "Capacitación no encontrada" });
        }
        res.json({ success: true, data: capacitacion });
    } catch (error) {
        console.error("Error al obtener la capacitación:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};

// Actualizar una capacitación por su ID
export const actualizarCapacitacion = async (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    try {
        const data = await capacitacionesModel.findByIdAndUpdate(id, newData, { new: true });
        res.json({ success: true, message: "Capacitación actualizada exitosamente", data: data });
    } catch (error) {
        console.error("Error al actualizar la capacitación:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};

// Eliminar una capacitación por su nombre
export const eliminarCapacitacionPorNombre = async (req, res) => {
    const nombre = req.params.nombre;

    try {
        const capacitacion = await capacitacionesModel.findOneAndDelete({ Nombre: nombre });
        if (!capacitacion) {
            return res.status(404).json({ success: false, message: "Capacitación no encontrada" });
        }
        res.json({ success: true, message: "Capacitación eliminada exitosamente", data: capacitacion });
    } catch (error) {
        console.error("Error al eliminar la capacitación:", error);
        res.status(500).json({ success: false, message: "Error del servidor al eliminar la capacitación" });
    }
};
