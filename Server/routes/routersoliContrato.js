import express from 'express';
import * as contratoController from '../controllers/soliContratoController.js';

const router = express.Router();

router.post('/crear_contratos', contratoController.crearContrato);
router.get('/obtener_contratos', contratoController.obtenerTodosLosContratos);
router.get('/obtener_contratos/:numeroEmpleado', contratoController.obtenerSolicitudesDeEmpleado);
router.get('/obtener_contratos/:id', contratoController.obtenerContratoPorId);
router.put('/actualizar_contrato/:id', contratoController.actualizarContratoPorId);
router.delete('/eliminar_contrato/:id', contratoController.eliminarContratoPorId);

export { router as routesSoliContratos };
