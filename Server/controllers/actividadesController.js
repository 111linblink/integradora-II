import Actividad from "../models/actividadesModel.js";

// Crear una actividad
export const crearActividad = async (req, res) => {
    try {
        const { nombre, descripcion, horaInicio, horaFinalizacion, diaInicio, diaFinalizacion, Area, Sede, Numero_Empleado } = req.body;
        const nuevaActividad = new Actividad({ nombre, descripcion, horaInicio, horaFinalizacion, diaInicio, diaFinalizacion,Area, Sede, Numero_Empleado });
        console.log("Nueva actividad:", nuevaActividad);
        await nuevaActividad.save();
        res.json({ success: true, message: "Actividad creada exitosamente", data: nuevaActividad });
    } catch (error) {
        console.error("Error al crear la actividad:", error);
        res.status(500).json({ success: false, message: "Error del servidor al crear la actividad" });
    }
};

// Obtener todas las actividades
export const obtenerTodasLasActividades = async (req, res) => {
    try {
        const data = await Actividad.find({});
        res.json({ success: true, data: data });
    } catch (error) {
        console.error("Error al obtener las actividades:", error);
        res.status(500).json({ success: false, message: "Error del servidor al obtener las actividades" });
    }
};

// Obtener una actividad por su ID
export const obtenerActividadPorId = async (req, res) => {
    const actividadId = req.params.id;

    try {
        const actividad = await Actividad.findById(actividadId);
        if (!actividad) {
            return res.status(404).json({ success: false, message: "Actividad no encontrada" });
        }
        res.json({ success: true, data: actividad });
    } catch (error) {
        console.error("Error al obtener la actividad:", error);
        res.status(500).json({ success: false, message: "Error del servidor al obtener la actividad" });
    }
};

// Actualizar una actividad por su ID
export const actualizarActividad = async (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    try {
        const data = await Actividad.findByIdAndUpdate(id, newData, { new: true });
        res.json({ success: true, message: "Actividad actualizada exitosamente", data: data });
    } catch (error) {
        console.error("Error al actualizar la actividad:", error);
        res.status(500).json({ success: false, message: "Error del servidor al actualizar la actividad" });
    }
};

// Eliminar una actividad por su ID
export const eliminarActividadPorId = async (req, res) => {
    const id = req.params.id;

    try {
        const actividad = await Actividad.findByIdAndDelete(id);
        if (!actividad) {
            return res.status(404).json({ success: false, message: "Actividad no encontrada" });
        }
        res.json({ success: true, message: "Actividad eliminada exitosamente", data: actividad });
    } catch (error) {
        console.error("Error al eliminar la actividad:", error);
        res.status(500).json({ success: false, message: "Error del servidor al eliminar la actividad" });
    }
};

