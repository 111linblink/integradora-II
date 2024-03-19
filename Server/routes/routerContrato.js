import express from 'express';
import * as contratoController from '../controllers/contratoController.js'
const router = express.Router();

router.post('/create_contrato', contratoController.createContrato);
router.get('/contratos', contratoController.getAllContratos);
router.get('/contratos/:id', contratoController.getContratoById);
router.put('/update_contrato/:id', contratoController.updateContrato);
router.delete('/delete_contrato/:id', contratoController.deleteContrato);
router.post('/add_horario/:id', contratoController.addHorarioToContrato);

export { router as routesContrato };