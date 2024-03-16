import mongoose from "mongoose";
const Schema = mongoose.Schema 

const TipoEmpleado = new Schema({
    Tipo:String
}, {
    timestamps: true
});

export default mongoose.model("tipoEmpleado", TipoEmpleado);

