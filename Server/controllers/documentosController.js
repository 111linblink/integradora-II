import documentosModel from "../models/documentosModel.js";

export const createDocumento = async (req, res) => {
  try {
    const documento = await documentosModel.create(req.body);
    res.json(documento);
  } catch (error) {
    console.error('Error al subir documento:', error);
    res.status(500).json({ message: 'Error al subir documento' });
  }
};




// Controlador para obtener documentos
export const getDocumentos = async (req, res) => {
  try {
    const documentos = await documentosModel.find();
    res.json(documentos);
  } catch (error) {
    console.error('Error al obtener documentos:', error);
    res.status(500).json({ message: 'Error al obtener documentos' });
  }
};

// Controlador para obtener documentos por el número de empleado
export const getDocumentosPorEmpleado = async (req, res) => {
  const { Numero_Empleado } = req.params;

  try {
    const documentos = await documentosModel.find({ Numero_Empleado });
    res.json(documentos);
  } catch (error) {
    console.error('Error al obtener documentos:', error);
    res.status(500).json({ message: 'Error al obtener documentos' });
  }
};

// Controlador para eliminar documentos
export const eliminarDocumento = async (req, res) => {
  const { id } = req.params;
  try {
    const documentoEliminado = await documentosModel.findByIdAndDelete(id);
    if (!documentoEliminado) {
      return res.status(404).json({ message: "Documento no encontrado" });
    }
    res.json({ message: "Documento eliminado correctamente" });
  } catch (error) {
    console.error('Error al eliminar documento:', error);
    res.status(500).json({ message: 'Error al eliminar documento' });
  }
};

// Controlador para descargar un documento por su ID
export const descargarDocumento = async (req, res) => {
  try {
    const documento = await documentosModel.findById(req.params.id);

    if (!documento) {
      return res.status(404).json({ message: 'Documento no encontrado' });
    }

    // Enviar el archivo como una respuesta adjunta
    res.attachment(documento.Nombre);
    res.send(documento.Documento);
  } catch (error) {
    console.error('Error al descargar documento:', error);
    res.status(500).json({ message: 'Error al descargar documento' });
  }
};
