import Asignacion from '../models/asignarModel.js';

export const obtenerCapacitacionesAsignadasPorNumeroEmpleado = async (req, res) => {
  try {
    const numeroEmpleado = req.params.numeroEmpleado; // Cambia el nombre del parámetro a numeroEmpleado
    const asignaciones = await Asignacion.find({ Numero_Empleado: numeroEmpleado }).populate('Actividad');
    console.log('Capacitaciones asignadas:', asignaciones); // Imprime los datos en la consola del servidor
    res.status(200).json(asignaciones);
  } catch (error) {
    console.error('Error al obtener las capacitaciones asignadas:', error);
    res.status(500).json({ message: 'Error al obtener las capacitaciones asignadas', error: error.message });
  }
};


export const obtenerTodasLasAsignaciones = async (req, res) => {
  try {
    const asignaciones = await Asignacion.find();
    console.log('Todas las asignaciones:', asignaciones); // Imprime los datos en la consola del servidor
    res.status(200).json(asignaciones);
  } catch (error) {
    console.error('Error al obtener todas las asignaciones:', error);
    res.status(500).json({ message: 'Error al obtener todas las asignaciones', error: error.message });
  }
};





export const crearAsignacion = async (req, res) => {
  try {
    const { Nombre, Numero_Empleado, Area, Sede, Actividad } = req.body;

    // Extraer datos de la actividad
    const { NombreCapacitacion, FechaInicio, FechaFin, Descripcion } = Actividad;

    const nuevaAsignacion = new Asignacion({
      Nombre,
      Numero_Empleado,
      Area,
      Sede,
      Actividad: [{
        NombreCapacitacion,
        FechaInicio,
        FechaFin,
        Descripcion
      }]
    });

    const asignacionGuardada = await nuevaAsignacion.save();

    res.status(201).json(asignacionGuardada);
  } catch (error) {
    console.error('Error al guardar la asignación:', error);
    res.status(500).json({ message: 'Error al guardar la asignación', error: error.message });
  }
};
