import express from 'express';
import * as asignarCapacitacionesController from '../controllers/asignarCapacitacionesController.js';
import Asignacion from '../models/asignarCapacitacionesModel.js';

const router = express.Router();

// Ruta para crear una nueva asignación
router.post('/asignacion', asignarCapacitacionesController.crearAsignacion);

// Ruta para obtener todas las asignaciones
router.get('/asignaciones', async (req, res) => {
    try {
        // Consultar todas las asignaciones desde la base de datos
        const asignaciones = await Asignacion.find();

        // Enviar las asignaciones como respuesta
        res.status(200).json({ success: true, data: asignaciones });
    } catch (error) {
        console.error('Error al obtener las asignaciones:', error);
        res.status(500).json({ success: false, message: 'Error del servidor al obtener las asignaciones' });
    }
});

export default router;
