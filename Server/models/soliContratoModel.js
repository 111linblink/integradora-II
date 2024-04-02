import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const contratoSchema = new Schema({
  tipoContrato: String,
  diasTrabajo: Number,
  diasDescanso: Number,
  horasDia: Number,
  turnos: [String],

  Estado: String,
  Numero_Empleado: Number,
  Nombre: String,
  Contrato: String,
  Sede: String,
  Area: String,
  Comentarios: String
});

export default mongoose.model('Contrato', contratoSchema);
