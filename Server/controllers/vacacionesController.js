import Vacaciones from "../models/vacacionesModel.js";

// Crear una solicitud de vacaciones
export const crearSolicitudVacaciones = async (req, res) => {
    try {
        const { DiaIni, DiaFin, Estado, Numero_Empleado } = req.body; // Asegúrate de recibir el campo Numero_Empleado del cuerpo de la solicitud
        const nuevaSolicitud = new Vacaciones({ DiaIni, DiaFin, Estado, Numero_Empleado }); // Asegúrate de incluir el campo Numero_Empleado al crear un nuevo documento
        console.log("Nueva solicitud de vacaciones:", nuevaSolicitud);
        await nuevaSolicitud.save();
        res.json({ success: true, message: "Solicitud de vacaciones guardada exitosamente", data: nuevaSolicitud });
    } catch (error) {
        console.error("Error al crear la solicitud de vacaciones:", error);
        res.status(500).json({ success: false, message: "Error del servidor al crear la solicitud de vacaciones" });
    }
};

// Obtener todas las solicitudes de vacaciones para un empleado específico
export const obtenerSolicitudesDeEmpleado = async (req, res) => {
    const numeroEmpleado = req.params.numeroEmpleado;
  
    try {
      const data = await Vacaciones.find({ Numero_Empleado: numeroEmpleado });
      res.json({ success: true, data: data });
    } catch (error) {
      console.error("Error al obtener las solicitudes de vacaciones para el empleado:", error);
      res.status(500).json({ success: false, message: "Error del servidor al obtener las solicitudes de vacaciones para el empleado" });
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


//actualizar el estado de la solicitud
export const actualizarEstadoSolicitud = async (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    try {
        const data = await Vacaciones.findByIdAndUpdate(id, newData, { new: true });
        res.json({ success: true, message: "Estado de la solicitud de vacaciones actualizado exitosamente", data: data });
    } catch (error) {
        console.error("Error al actualizar el estado de la solicitud de vacaciones:", error);
        res.status(500).json({ success: false, message: "Error del servidor al actualizar el estado de la solicitud de vacaciones" });
    }
};


// Agregar un comentario a una solicitud de vacaciones por su ID
export const agregarComentario = async (req, res) => {
    const id = req.params.id;
    const { Comentarios } = req.body; // Extraer el campo Comentarios del cuerpo de la solicitud

    try {
        const solicitudVacaciones = await Vacaciones.findById(id); // Buscar la solicitud de vacaciones por su ID
        if (!solicitudVacaciones) {
            return res.status(404).json({ success: false, message: "Solicitud de vacaciones no encontrada" });
        }

        solicitudVacaciones.Comentarios = Comentarios; // Asignar el comentario al campo Comentarios de la solicitud
        await solicitudVacaciones.save(); // Guardar los cambios

        res.json({ success: true, message: "Comentario agregado exitosamente", data: solicitudVacaciones });
    } catch (error) {
        console.error("Error al agregar el comentario:", error);
        res.status(500).json({ success: false, message: "Error del servidor al agregar el comentario" });
    }
};
