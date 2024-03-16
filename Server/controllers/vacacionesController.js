import Vacaciones from "../models/vacacionesModel.js";

// Crear una solicitud de vacaciones
export const crearSolicitudVacaciones = async (req, res) => {
    try {
        const { DiaIni, DiaFin } = req.body;
        const nuevaSolicitud = new Vacaciones({ DiaIni, DiaFin });
        console.log("Nueva solicitud de vacaciones:", nuevaSolicitud);
        await nuevaSolicitud.save();
        res.json({ success: true, message: "Solicitud de vacaciones guardada exitosamente", data: nuevaSolicitud });
    } catch (error) {
        console.error("Error al crear la solicitud de vacaciones:", error);
        res.status(500).json({ success: false, message: "Error del servidor al crear la solicitud de vacaciones" });
    }
};

// Obtener todas las solicitudes de vacaciones
export const obtenerTodasLasSolicitudesVacaciones = async (req, res) => {
    try {
        const data = await Vacaciones.find({});
        res.json({ success: true, data: data });
    } catch (error) {
        console.error("Error al obtener las solicitudes de vacaciones:", error);
        res.status(500).json({ success: false, message: "Error del servidor al obtener las solicitudes de vacaciones" });
    }
};

// Obtener una solicitud de vacaciones por su ID
export const obtenerSolicitudVacacionesPorId = async (req, res) => {
    const solicitudVacacionesId = req.params.id;

    try {
        const solicitudVacaciones = await Vacaciones.findById(solicitudVacacionesId);
        if (!solicitudVacaciones) {
            return res.status(404).json({ success: false, message: "Solicitud de vacaciones no encontrada" });
        }
        res.json({ success: true, data: solicitudVacaciones });
    } catch (error) {
        console.error("Error al obtener la solicitud de vacaciones:", error);
        res.status(500).json({ success: false, message: "Error del servidor al obtener la solicitud de vacaciones" });
    }
};

// Actualizar una solicitud de vacaciones por su ID
export const actualizarSolicitudVacaciones = async (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    try {
        const data = await Vacaciones.findByIdAndUpdate(id, newData, { new: true });
        res.json({ success: true, message: "Solicitud de vacaciones actualizada exitosamente", data: data });
    } catch (error) {
        console.error("Error al actualizar la solicitud de vacaciones:", error);
        res.status(500).json({ success: false, message: "Error del servidor al actualizar la solicitud de vacaciones" });
    }
};

// Eliminar una solicitud de vacaciones por su ID
export const eliminarSolicitudVacacionesPorId = async (req, res) => {
    const id = req.params.id;

    try {
        const solicitudVacaciones = await Vacaciones.findByIdAndDelete(id);
        if (!solicitudVacaciones) {
            return res.status(404).json({ success: false, message: "Solicitud de vacaciones no encontrada" });
        }
        res.json({ success: true, message: "Solicitud de vacaciones eliminada exitosamente", data: solicitudVacaciones });
    } catch (error) {
        console.error("Error al eliminar la solicitud de vacaciones:", error);
        res.status(500).json({ success: false, message: "Error del servidor al eliminar la solicitud de vacaciones" });
    }
};
