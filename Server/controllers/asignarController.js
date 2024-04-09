import Asignacion from '../models/asignarModel.js';

export const obtenerCapacitacionesAsignadasPorUsuarioNombre = async (req, res) => {
  try {
    const nombreUsuario = req.params.nombreUsuario; // Cambia el nombre del parámetro a nombreUsuario
    const asignaciones = await Asignacion.find({ Nombre: nombreUsuario }).populate('Actividad');
    res.status(200).json(asignaciones);
  } catch (error) {
    console.error('Error al obtener las capacitaciones asignadas:', error);
    res.status(500).json({ message: 'Error al obtener las capacitaciones asignadas', error: error.message });
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
