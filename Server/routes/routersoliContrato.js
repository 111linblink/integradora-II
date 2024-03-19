import express from 'express';
import * as contratoController from '../controllers/soliContratoController.js';
const router = express.Router();

router.post('/crear_contrato', contratoController.crearContrato);
router.get('/contratos', contratoController.obtenerTodosLosContratos);

export { router as routesContratos };
