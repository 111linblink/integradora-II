import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const actividadSchema = new Schema({
  nombre: String,
  descripcion: String,
  horaInicio: String,
  horaFinalizacion: String,
  diaInicio: Date,
  diaFinalizacion: Date
});

export default mongoose.model('Actividad', actividadSchema);
