import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const vacacionesSchema = new Schema({
  DiaIni: Date,
  DiaFin: Date,
  Estado: String,
  Numero_Empleado: Number,
  Nombre: String,
  Contrato: String,
  Sede: String,
  Area: String
});

export default mongoose.model('Vacaciones', vacacionesSchema);
