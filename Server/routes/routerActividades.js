import express from 'express';
import * as actividadesController from '../controllers/actividadesController.js';

const router = express.Router();

router.post('/crear_actividad', actividadesController.crearActividad);
router.get('/actividades', actividadesController.obtenerTodasLasActividades);
router.get('/actividades/:id', actividadesController.obtenerActividadPorId);
router.put('/actualizar_actividad/:id', actividadesController.actualizarActividad);
router.delete('/eliminar_actividad/:id', actividadesController.eliminarActividadPorId);

export { router as routesActividades };

