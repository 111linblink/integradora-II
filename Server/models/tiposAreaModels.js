import mongoose from "mongoose";
const Schema = mongoose.Schema 

const tipoAreasSchema = new Schema({
    Tipo: String,
    Areas: [
        { Nombre: String }
    ]
}, {
    timestamps: true
});

export default mongoose.model("TipoAreas", tipoAreasSchema);
