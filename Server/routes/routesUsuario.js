import express from 'express';
import multer from 'multer';
import fs from 'fs';
import * as usuarioController from '../controllers/usuarioController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post("/login", usuarioController.login);
router.get("/user", usuarioController.getAllUsers);
router.get("/user/:id", usuarioController.getUserById);
router.post("/create", upload.single('Img'), usuarioController.createUser);
router.get("/imagen/:id", usuarioController.obtenerImagenUsuarioPorId);
router.post("/subirEmpleados", upload.single('archivo'), usuarioController.subirEmpleados);
router.put("/update/:id", usuarioController.updateUser);
router.delete("/delete/:id", usuarioController.deleteUser);

export { router as routesUsuario };
