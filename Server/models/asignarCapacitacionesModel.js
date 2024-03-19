import mongoose from 'mongoose';

const asignacionSchema = new mongoose.Schema({
  Nombre: String,
  Numero_Empleado: Number,
  Area: String,
  Sede: String,
  Actividad: {
    NombreCapacitacion: String,
    FechaInicio: Date,
    FechaFin: Date,
    Descripcion: String
  }
});

export default mongoose.model('Asignacion', asignacionSchema);
