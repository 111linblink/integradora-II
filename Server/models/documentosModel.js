// Modelo del documento (documentosModel.js)
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const documentos = new Schema({
    Nombre: String,
    Tipo: String,
    Folio: Number,
    Caducidad: Date,
    Numero_Empleado: Number,
});

const Documentos = mongoose.model("Documentos", documentos);
export default Documentos;
