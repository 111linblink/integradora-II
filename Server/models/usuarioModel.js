import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
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
    Contrasena: String,
    Img: String 
}, {});

export default mongoose.model('empleados', usuarioSchema);
