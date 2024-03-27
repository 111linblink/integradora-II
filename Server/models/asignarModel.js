import mongoose from "mongoose";
const Schema = mongoose.Schema

const asignacionSchema = new Schema({
    Nombre: String,
    Area: String,
    Sede: String,
    Actividad: [
        {
            NombreCapacitacion: String,
            FechaInicio: Date,
            FechaFin: Date,
            Descripcion: String 
        }
    ]
}, {
    timestamps: true
});

export default mongoose.model("Asignacion", asignacionSchema);
