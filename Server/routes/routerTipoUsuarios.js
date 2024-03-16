import express from 'express';
import *  as tipoEmpleadosController from "../controllers/tipoEmpleadosController.js"
const router = express.Router();

router.get("/ver",tipoEmpleadosController.getAllTiposEmpleado)
router.post("/agregar",tipoEmpleadosController.createTipoEmpleado)

export { router as routesTipoUsuario };