import mongoose from "mongoose";
const Schema = mongoose.Schema;

const solicontratoSchema = new Schema({
  Tipo: String,
  Turno: String,
  Estado: String,
  Numero_Empleado: Number,
  Nombre: String,
  Sede: String,
  Area: String
});

export default mongoose.model("SoliContrato", solicontratoSchema);
