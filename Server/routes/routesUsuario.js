import express from 'express';
import * as usuarioController from '../controllers/usuarioController.js';

const router = express.Router();

router.post("/login", usuarioController.login);
router.get("/user", usuarioController.getAllUsers);
router.get("/user/:id",  usuarioController.getUserById);
router.post("/create",  usuarioController.createUser);
router.put("/update/:id",  usuarioController.updateUser);
router.delete("/delete/:id", usuarioController.deleteUser);



export { router as routesUsuario }; // Exporta las rutas de usuario
