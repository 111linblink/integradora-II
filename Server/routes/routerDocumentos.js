// Rutas de la API (documentosRoutes.js)
import express from 'express';
import * as documentosController from '../controllers/documentosController.js';

const router = express.Router();
router.post('/subir_documentos', documentosController.createDocumento);
router.get('/documentos', documentosController.getDocumentos);
router.delete('/eliminar/:id', documentosController.eliminarDocumento);
router.get('/descargar/:id', documentosController.descargarDocumento);
export { router as routesDocumentos };
