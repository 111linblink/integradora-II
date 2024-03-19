import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const contratoSchema = new Schema({
  tipoContrato: String,
  diasTrabajo: Number,
  diasDescanso: Number,
  horasDia: Number,
  turnos: [String]
});

export default mongoose.model('Contrato', contratoSchema);
