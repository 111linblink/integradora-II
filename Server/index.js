const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const perrosSchema = new mongoose.Schema({
    Nombre: String,
    Numero_Empleado: Number,
    Status: String,
    CorreoElectronico: String,
    Area: String,
    Sede: String,
    FechaNacimiento: Date,
    Sexo: String,
    Contrato: String,
    Tipo: String
}, {
    timestamps: true
});

const userModel = mongoose.model("perros", perrosSchema);

// read
app.get("/user", async (req, res) => {
    try {
        const data = await userModel.find({});
        res.json({ success: true, data: data });
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
});

// Obtener un usuario por su ID
app.get("/user/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado" });
        }
        res.json({ success: true, data: user });
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
});

// create data || save data in mongo
app.post("/create", async (req, res) => {
    try {
        const data = new userModel(req.body);
        await data.save();
        res.json({ success: true, message: "Data guardada exitosamente", data: data });
    } catch (error) {
        console.error("Error al crear los datos:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
});

// update data
app.put("/update/:id", async (req, res) => {
    const id = req.params.id;
    const rest = req.body;

    try {
        const data = await userModel.findByIdAndUpdate(id, rest, { new: true });
        res.json({ success: true, message: "Datos actualizados exitosamente", data: data });
    } catch (error) {
        console.error("Error al actualizar los datos:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
});

// delete api
app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const data = await userModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Datos eliminados exitosamente", data: data });
    } catch (error) {
        console.error("Error al eliminar los datos:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
});

mongoose.connect("mongodb://127.0.0.1:27017/tt")
    .then(() => {
        console.log("Conectado a la base de datos");
        app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
    })
    .catch((err) => console.log("Error al conectar a la base de datos:", err));
