import express from 'express';
import * as contratoController from '../controllers/contratoController.js'
const router = express.Router();

router.post('/subir_documentos', contratoController.createContrato);


export { router as routesDocumentos };