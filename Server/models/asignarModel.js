import mongoose from "mongoose";
const Schema = mongoose.Schema

const asinacionSchema = new Schema({
    Nombre: String,
    Area: String,
    Sede: String,
    Actividad: [
        {
            NombreActividad: String,
            FechaInicio: Date,
            FechaFin: Date  ,
            Descripcion: String
        }
    ]
}, {
    timestamps: true
});

export default mongoose.model("Asignacion", asinacionSchema);