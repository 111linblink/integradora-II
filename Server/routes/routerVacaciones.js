import express from 'express';
import * as vacacionesController from '../controllers/vacacionesController.js'; // Importa los controladores de las solicitudes de vacaciones
const router = express.Router();

router.post('/crear_solicitud_vacaciones', vacacionesController.crearSolicitudVacaciones); // Ruta para crear una solicitud de vacaciones
router.get('/solicitudes_vacaciones', vacacionesController.obtenerTodasLasSolicitudesVacaciones); // Ruta para obtener todas las solicitudes de vacaciones
router.get('/solicitud_vacaciones/:id', vacacionesController.obtenerSolicitudVacacionesPorId); // Ruta para obtener una solicitud de vacaciones por su ID
router.put('/actualizar_solicitud_vacaciones/:id', vacacionesController.actualizarSolicitudVacaciones); // Ruta para actualizar una solicitud de vacaciones por su ID
router.delete('/eliminar_solicitud_vacaciones/:id', vacacionesController.eliminarSolicitudVacacionesPorId); // Ruta para eliminar una solicitud de vacaciones por su ID

export { router as routesVacaciones }; // Exporta las rutas de las solicitudes de vacaciones
