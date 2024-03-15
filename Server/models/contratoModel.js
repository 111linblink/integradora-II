import mongoose from "mongoose";
const Schema = mongoose.Schema

const contratoSchema = new Schema({
    Tipo: Number,
    Turno: [{
        Numero: Number,
        Horario: String
    }]
}, {
    timestamps: true
});


export default mongoose.model("contratos", contratoSchema);
