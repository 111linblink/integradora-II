import express from 'express';
import * as vacacionesController from '../controllers/vacacionesController.js';

const router = express.Router();

router.post('/crear_solicitud_vacaciones', vacacionesController.crearSolicitudVacaciones);
router.get('/solicitudes_vacaciones', vacacionesController.obtenerTodasLasSolicitudesVacaciones);
router.get('/solicitudes_vacaciones/:numeroEmpleado', vacacionesController.obtenerSolicitudesDeEmpleado);
router.put('/actualizar_solicitud_vacaciones/:id', vacacionesController.actualizarSolicitudVacaciones);
router.put('/agregar_comentario/:id', vacacionesController.agregarComentario);
router.put('/actualizar_estado_solicitud/:id', vacacionesController.actualizarEstadoSolicitud); // Nueva ruta para actualizar el estado
router.delete('/eliminar_solicitud_vacaciones/:id', vacacionesController.eliminarSolicitudVacacionesPorId);

export { router as routesVacaciones };
