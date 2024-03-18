import Asignacion from '../models/asignarCapacitacionesModel.js';

const obtenerCapacitacionesEmpleado = async (req, res) => {
  try {
    const { Numero_Empleado } = req.params; // Suponiendo que obtienes el número de empleado como parámetro en la URL
    const asignaciones = await Asignacion.find({ Numero_Empleado }); // Consulta las asignaciones del empleado en la base de datos
    res.status(200).json({ success: true, data: asignaciones });
  } catch (error) {
    console.error('Error al obtener las capacitaciones del empleado:', error);
    res.status(500).json({ success: false, message: 'Error al obtener las capacitaciones del empleado' });
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
      Actividad: {
        NombreCapacitacion,
        FechaInicio,
        FechaFin,
        Descripcion
      }
    });

    const asignacionGuardada = await nuevaAsignacion.save();

    res.status(201).json(asignacionGuardada);
  } catch (error) {
    console.error('Error al guardar la asignación:', error);
    res.status(500).json({ message: 'Error al guardar la asignación', error: error.message });
  }
};
