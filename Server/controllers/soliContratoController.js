import Contrato from "../models/soliContratoModel.js";
import mongoose from 'mongoose';

// Crear un contrato
export const crearContrato = async (req, res) => {
  try {
    const { Tipo, Turno, Estado, Numero_Empleado, Nombre, Sede, Area } = req.body;
    const nuevoContrato = new Contrato({ 
      Tipo, 
      Turno, 
      Estado, 
      Numero_Empleado, 
      Nombre, 
      Sede, 
      Area 
    });
    await nuevoContrato.save();
    res.json({ success: true, message: "Contrato creado exitosamente", data: nuevoContrato });
  } catch (error) {
    console.error("Error al crear el contrato:", error);
    res.status(500).json({ success: false, message: "Error del servidor al crear el contrato" });
  }
};

// Obtener todos los contratos
export const obtenerTodosLosContratos = async (req, res) => {
  try {
    const data = await Contrato.find({});
    res.json({ success: true, data: data });
  } catch (error) {
    console.error("Error al obtener los contratos:", error);
    res.status(500).json({ success: false, message: "Error del servidor al obtener los contratos" });
  }
};

// Obtener todas las solicitudes de contratos para un empleado específico
export const obtenerSolicitudesDeEmpleado = async (req, res) => {
  const numeroEmpleado = req.params.numeroEmpleado;

  try {
    const data = await Contrato.find({ Numero_Empleado: numeroEmpleado });
    res.json({ success: true, data: data });
  } catch (error) {
    console.error("Error al obtener las solicitudes de contratos para el empleado:", error);
    res.status(500).json({ success: false, message: "Error del servidor al obtener las solicitudes de contratos para el empleado" });
  }
};


// Obtener un contrato por su ID
export const obtenerContratoPorId = async (req, res) => {
  const contratoId = req.params.id;

  try {
    // Verificar si el contratoId es un ObjectId válido antes de realizar la búsqueda
    if (!mongoose.Types.ObjectId.isValid(contratoId)) {
      return res.status(404).json({ success: false, message: "ID de contrato no válido" });
    }

    const contrato = await Contrato.findById(contratoId);
    if (!contrato) {
      return res.status(404).json({ success: false, message: "Contrato no encontrado" });
    }
    res.json({ success: true, data: contrato });
  } catch (error) {
    console.error("Error al obtener el contrato por su ID:", error);
    res.status(500).json({ success: false, message: "Error del servidor al obtener el contrato por su ID" });
  }
};


// Actualizar un contrato por su ID
export const actualizarContratoPorId = async (req, res) => {
  try {
    const contrato = await Contrato.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contrato) {
      return res.status(404).json({ success: false, message: "Contrato no encontrado" });
    }
    res.json({ success: true, message: "Contrato actualizado exitosamente", data: contrato });
  } catch (error) {
    console.error("Error al actualizar el contrato por su ID:", error);
    res.status(500).json({ success: false, message: "Error del servidor al actualizar el contrato por su ID" });
  }
};

// Eliminar un contrato por su ID
export const eliminarContratoPorId = async (req, res) => {
  try {
    const contrato = await Contrato.findByIdAndDelete(req.params.id);
    if (!contrato) {
      return res.status(404).json({ success: false, message: "Contrato no encontrado" });
    }
    res.json({ success: true, message: "Contrato eliminado exitosamente", data: contrato });
  } catch (error) {
    console.error("Error al eliminar el contrato por su ID:", error);
    res.status(500).json({ success: false, message: "Error del servidor al eliminar el contrato por su ID" });
  }
};
