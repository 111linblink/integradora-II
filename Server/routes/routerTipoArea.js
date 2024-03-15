import express from 'express';
import * as tipoAreaController from "../controllers/tipoAreaController.js"
const router = express.Router();

router.get("/ver",tipoAreaController.getAllTiposArea)
router.post("/agregar",tipoAreaController.createTipoArea)

export { router as routesTipoAreas };