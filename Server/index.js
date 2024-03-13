const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;


// Esquema para Sede
const sedeSchema = new mongoose.Schema({
    Nombre: String,
    Ubicacion: String,
    Administradores: [
        { Id_Admin: Number }
    ],
    Areas: [
        {
            Tipo: String,
            NombreArea: String
        }
    ]
}, {
    timestamps: true
});

const sedeModel = mongoose.model("sedes", sedeSchema);

// create sede or area data
app.post("/create_sede_area", async (req, res) => {
    try {
        const data = new sedeModel(req.body);
        await data.save();
        res.json({ success: true, message: "Sede o área guardada exitosamente", data: data });
    } catch (error) {
        console.error("Error al crear la sede o área:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
});

// read sedes and areas
app.get("/sedes_areas", async (req, res) => {
    try {
        const data = await sedeModel.find({});
        res.json({ success: true, data: data });
    } catch (error) {
        console.error("Error al obtener las sedes y áreas:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
});

// Obtener una sede o área por su ID
app.get("/sede_area/:id", async (req, res) => {
    const sedeAreaId = req.params.id;

    try {
        const sedeArea = await sedeModel.findById(sedeAreaId);
        if (!sedeArea) {
            return res.status(404).json({ success: false, message: "Sede o área no encontrada" });
        }
        res.json({ success: true, data: sedeArea });
    } catch (error) {
        console.error("Error al obtener la sede o área:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
});

// update sede or area data
app.put("/update_sede_area/:id", async (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    try {
        const data = await sedeModel.findOneAndUpdate({ _id: id }, newData, { new: true, omitUndefined: true, projection: { "Areas._id": 0 } });
        res.json({ success: true, message: "Datos de sede o área actualizados exitosamente", data: data });
    } catch (error) {
        console.error("Error al actualizar los datos de sede o área:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
});
// delete sede or area data
app.delete("/delete_sede_area/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const data = await sedeModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Sede o área eliminada exitosamente", data: data });
    } catch (error) {
        console.error("Error al eliminar la sede o área:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
});

// Esquema para Usuario

const empleadosSchema = new mongoose.Schema({
    Nombre: String,
    Numero_Empleado: Number,
    Status: String,
    CorreoElectronico: String,
    Area: String,
    Sede: String,
    FechaNacimiento: Date,
    Sexo: String,
    Contrato: String,
    Tipo: String,
    Contrasena:String
}, {
    timestamps: true
});

const userModel = mongoose.model("empleados", empleadosSchema);


app.post("/login", async (req, res) => {
    const { CorreoElectronico, Contrasena } = req.body;

    try {
        console.log('CorreoElectronico:', CorreoElectronico);
        console.log('Contrasena:', Contrasena);
        const user = await userModel.findOne({ CorreoElectronico });
        if (!user || user.Contrasena !== Contrasena) {
            return res.status(401).json({ success: false, message: "Credenciales incorrectas" });
        }
        res.json({ success: true, message: "Inicio de sesión exitoso" });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
});
    

//Login
app.post("/login", async (req, res) => {
    const { CorreoElectronico, Contrasena } = req.body;

    try {
        console.log('CorreoElectronico:', CorreoElectronico);
        console.log('Contrasena:', Contrasena);
        const user = await userModel.findOne({ CorreoElectronico });
        if (!user || user.Contrasena !== Contrasena) {
            return res.status(401).json({ success: false, message: "Credenciales incorrectas" });
        }
        res.json({ success: true, message: "Inicio de sesión exitoso" });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
});

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
// Esquema para Contrato
const contratoSchema = new mongoose.Schema({
    Tipo: Number,
    Turno: Number,
    Horario: String
}, {
    timestamps: true
});

const contratoModel = mongoose.model("contratos", contratoSchema);
// create contrato data
app.post("/create_contrato", async (req, res) => {
    try {
        const data = new contratoModel(req.body);
        await data.save();
        res.json({ success: true, message: "Contrato guardado exitosamente", data: data });
    } catch (error) {
        console.error("Error al crear el contrato:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
});

// read contratos
app.get("/contratos", async (req, res) => {
    try {
        const data = await contratoModel.find({});
        res.json({ success: true, data: data });
    } catch (error) {
        console.error("Error al obtener los contratos:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
});

// Obtener un contrato por su ID
app.get("/contrato/:id", async (req, res) => {
    const contratoId = req.params.id;

    try {
        const contrato = await contratoModel.findById(contratoId);
        if (!contrato) {
            return res.status(404).json({ success: false, message: "Contrato no encontrado" });
        }
        res.json({ success: true, data: contrato });
    } catch (error) {
        console.error("Error al obtener el contrato:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
});

// update contrato data
app.put("/update_contrato/:id", async (req, res) => {
    const id = req.params.id;
    const newData = req.body;
    try {
        const data = await contratoModel.findOneAndUpdate({ _id: id }, newData, { new: true, omitUndefined: true });
        res.json({ success: true, message: "Datos de contrato actualizados exitosamente", data: data });
    } catch (error) {
        console.error("Error al actualizar los datos de contrato:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
});

// delete contrato data
app.delete("/delete_contrato/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const data = await contratoModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Contrato eliminado exitosamente", data: data });
    } catch (error) {
        console.error("Error al eliminar el contrato:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
});

// Esquema para capacitaciones 
const capacitacionSchema = new mongoose.Schema({
    Nombre: String,
    Area: String,
    Sede: String,
    Ubicacion: String,
    Actividad: [
        {
            NombreActividad: String,
            FechaInicio: Date,
            FechaFin: Date  
        }
    ]
}, {
    timestamps: true
});

const CapacitacionModel = mongoose.model("capacitaciones", capacitacionSchema);

// CRUD para capacitaciones
// Crear capacitación
app.post("/crear_capacitacion", async (req, res) => {
    try {
        const data = new CapacitacionModel(req.body);
        await data.save();
        res.json({ success: true, message: "Capacitación guardada exitosamente", data: data });
    } catch (error) {
        console.error("Error al crear la capacitación:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
});

// Leer todas las capacitaciones
app.get("/capacitaciones", async (req, res) => {
    try {
        const data = await CapacitacionModel.find({});
        res.json({ success: true, data: data });
    } catch (error) {
        console.error("Error al obtener las capacitaciones:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
});

// Leer una capacitación por su ID
app.get("/capacitacion/:id", async (req, res) => {
    const capacitacionId = req.params.id;

    try {
        const capacitacion = await CapacitacionModel.findById(capacitacionId);
        if (!capacitacion) {
            return res.status(404).json({ success: false, message: "Capacitación no encontrada" });
        }
        res.json({ success: true, data: capacitacion });
    } catch (error) {
        console.error("Error al obtener la capacitación:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
});

// Actualizar capacitación
app.put("/actualizar_capacitacion/:id", async (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    try {
        const data = await CapacitacionModel.findByIdAndUpdate(id, newData, { new: true });
        res.json({ success: true, message: "Capacitación actualizada exitosamente", data: data });
    } catch (error) {
        console.error("Error al actualizar la capacitación:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
});

// Eliminar capacitación
app.delete("/eliminar_capacitacion/:nombre", async (req, res) => {
    const nombre = req.params.nombre;

    try {
        const capacitacion = await CapacitacionModel.findOneAndDelete({ Nombre: nombre });
        if (!capacitacion) {
            return res.status(404).json({ success: false, message: "Capacitación no encontrada" });
        }
        res.json({ success: true, message: "Capacitación eliminada exitosamente", data: capacitacion });
    } catch (error) {
        console.error("Error al eliminar la capacitación:", error);
        res.status(500).json({ success: false, message: "Error del servidor al eliminar la capacitación" });
    }
});


mongoose.connect("mongodb://127.0.0.1:27017/intel")
    .then(() => {
        console.log("Conectado a la base de datos");
        app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
    })
    .catch((err) => console.log("Error al conectar a la base de datos:", err));