    import express from 'express';
    import * as asignarCapacitacionesController from '../controllers/asignarController.js';
  

    const router = express.Router();

    // Ruta para crear una nueva asignación
    router.post('/asignacion', asignarCapacitacionesController.crearAsignacion);

    router.get('/asignaciones/usuarios/:userId', asignarCapacitacionesController.obtenerCapacitacionesAsignadasPorUsuarioId);

    export default router;
