import Contrato from "../models/soliContratoModel.js";

// Crear un contrato
export const crearContrato = async (req, res) => {
  try {
    const { tipoContrato, horario } = req.body;
    const nuevoContrato = new Contrato({ tipoContrato, horario });
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
