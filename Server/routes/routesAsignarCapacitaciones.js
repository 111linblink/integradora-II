import express from 'express';
import * as asignarCapacitacionesController from '../controllers/asignarController.js';

const router = express.Router();

// Ruta para crear una nueva asignación
router.post('/asignacion', asignarCapacitacionesController.crearAsignacion);

// Ruta para obtener las capacitaciones asignadas por número de empleado
router.get('/capacitaciones/numeroEmpleado/:numeroEmpleado', asignarCapacitacionesController.obtenerCapacitacionesAsignadasPorNumeroEmpleado);

export default router;
