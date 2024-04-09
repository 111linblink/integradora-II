import express from 'express';
import * as asignarCapacitacionesController from '../controllers/asignarController.js';

const router = express.Router();

// Ruta para crear una nueva asignación
router.post('/asignacion', asignarCapacitacionesController.crearAsignacion);

// Ruta para obtener las capacitaciones asignadas por usuario
router.get('/asignacion/capacitaciones/nombre/:nombreUsuario', asignarCapacitacionesController.obtenerCapacitacionesAsignadasPorUsuarioNombre);

export default router;
