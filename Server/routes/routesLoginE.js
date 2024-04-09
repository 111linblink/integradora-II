import express from 'express';
import * as loginEController from '../controllers/loginEController.js';

const router = express.Router();


router.post('/', loginEController.envioCorreo);
router.post('/iniciarSesion', loginEController.iniciarSesion);

export {router as routesLoginE};