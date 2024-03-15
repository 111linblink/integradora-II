import mongoose from "mongoose";
const Schema = mongoose.Schema

const sedeSchema = new Schema({
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
    ],
    Empleados:
    [
        {id:Number}
    ]
}, {
    timestamps: true
});

export default mongoose.model("sedes", sedeSchema);