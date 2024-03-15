import express from 'express';
import * as capacitacionesController from '../controllers/capacitacionesController.js'
const router = express.Router();

router.post('/crear_capacitacion', capacitacionesController.crearCapacitacion);
router.get('/capacitaciones', capacitacionesController.obtenerTodasLasCapacitaciones);
router.get('/capacitacion/:id', capacitacionesController.obtenerCapacitacionPorId);
router.put('/actualizar_capacitacion/:id',capacitacionesController.actualizarCapacitacion);
router.delete('/eliminar_capacitacion/:nombre',capacitacionesController.eliminarCapacitacionPorNombre);

export { router as routesCapacitaciones };