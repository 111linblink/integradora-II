const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const empleadosSchema = new mongoose.Schema({
    Nombre: String,
    Numero_Empleado: Number,
    Status: String,
    CorreoElectronico: String,
    Password: String,
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
    

mongoose.connect("mongodb://127.0.0.1:27017/intel")
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

app.post("/login", async (req, res) => {
    const { CorreoElectronico, password } = req.body;

    try {
        // Buscar el usuario en la base de datos por su correo electrónico
        const perros = await userModel.findOne({ CorreoElectronico });

        // Verificar si el usuario existe y si la contraseña es correcta
        if (!perros || perros.password !== password) {
            return res.status(401).json({ success: false, message: "Credenciales incorrectas" });
        }

        // Generar un token de autenticación con el ID del usuario
        const token = jwt.sign({ userId: user._id }, "secreto", { expiresIn: "1h" });

        // Devolver el token al cliente
        res.json({ success: true, token });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
});


mongoose.connect("mongodb://127.0.0.1:27017/tt")
    .then(() => {
        console.log("Conectado a la base de datos");
        app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
    })
    .catch((err) => console.log("Error al conectar a la base de datos:", err));
