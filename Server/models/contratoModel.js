import mongoose from "mongoose";
const Schema = mongoose.Schema

const contratoSchema = new Schema({
    Tipo: Number,
    Nombre:String,
    Turno: [{
        Numero: Number,
        HoraInicial: String,
        HoraFinal: String
    }]
}, {
    timestamps: true
});


export default mongoose.model("contratos", contratoSchema);
