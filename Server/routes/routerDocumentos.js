import express from 'express';
import * as documentosController from '../controllers/documentosController.js';

const router = express.Router();

// Ruta para subir documentos
router.post('/subir_documentos', documentosController.createDocumento);

// Ruta para obtener todos los documentos
router.get('/documentos', documentosController.getDocumentos);

// Ruta para obtener documentos por el número de empleado
router.get('/documentos/:Numero_Empleado', documentosController.getDocumentosPorEmpleado);

// Ruta para eliminar documentos por su ID
router.delete('/eliminar/:id', documentosController.eliminarDocumento);

export { router as routesDocumentos };
