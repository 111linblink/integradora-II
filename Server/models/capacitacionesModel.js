import mongoose from "mongoose";
const Schema = mongoose.Schema;

const capacitacionSchema = new Schema({
    Nombre: String,
    Area: String,
    Sede: String,
    Ubicacion: String,
    Descripcion: String,
    Actividad: [
        {
            FechaInicio: Date,
            FechaFin: Date
        }
    ]
}, { timestamps: true });

export default mongoose.model("capacitaciones", capacitacionSchema);
