import mongoose from "mongoose";
const Schema = mongoose.Schema;

const documentosSchema = new Schema({
    Nombre: String,
    URL: String, 
    Tipo: String,
    Folio: Number,
    Caducidad: Date,
    Numero_Empleado: Number,
},
{
    timestamps: true
});

const Documentos = mongoose.model("Documentos", documentosSchema);
export default Documentos;
