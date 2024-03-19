
import express from 'express';
import * as sedesController from '../controllers/sedesController.js';

const router = express.Router();

router.post('/create_sede_area', sedesController.createSede);
router.get('/sedes_areas', sedesController.getAllSedes);
router.get('/sede_area/:id', sedesController.getSedeById);
router.put('/update_sede_area/:id', sedesController.updateSede);
router.delete('/delete_sede_area/:id', sedesController.deleteSede);
router.delete('/delete_area/:id/:areaId', sedesController.deleteArea); // Nueva ruta para eliminar un área
router.post('/add_area_to_sede/:id', sedesController.addAreaToSede); // Ruta para agregar un área a una sede


export { router as routesSedes };
