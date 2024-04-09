import React, { useEffect, useState } from 'react';
import { Gantt, Task, EventOption, DisplayOption, StylingOption } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import Axios from 'axios';

const MyGantt = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    obtenerTodasLasActividades();
  }, []);

  const obtenerTodasLasActividades = async () => {
    try {
      const data = await Axios.get(`http://localhost:3000/Actividad/actividades`);
      const actividades = data.data.data.map((actividad, index) => {
        const start = actividad.diaInicio ? new Date(actividad.diaInicio) : new Date();
        const end = actividad.diaFinalizacion ? new Date(actividad.diaFinalizacion) : new Date();
        const progress = calcularProgreso(actividad); // Calcular el progreso aquí
        return {
          id: `Task${index + 1}`,
          name: actividad.nombre,
          type: 'task',
          start: start,
          end: end,
          progress: progress,
          dependencies: [],
          styles: {
            backgroundColor: '#4CAF50',
            progressColor: '#FF9800',
          },
        };
      });
      setTasks(actividades);
    } catch (error) {
      console.error('Error al obtener las actividades:', error.message);
      setTasks([]);
    }
  };

  const calcularProgreso = (actividad) => {
    // Implementa tu lógica para calcular el progreso de la actividad aquí
    return 0;
  };

  const eventOptions: EventOption = {};

  const displayOptions: DisplayOption = {
    viewMode: 'Week',
    viewDate: new Date(),
    preStepsCount: 1,
    locale: 'es',
  };

  const stylingOptions: StylingOption = {};

  return (
    <div>
      <h1>Mi Gráfico de Gantt</h1>
      {tasks.length > 0 && (
        <Gantt
          tasks={tasks}
          eventOption={eventOptions}
          displayOption={displayOptions}
          stylingOption={stylingOptions}
        />
      )}
    </div>
  );
  
};

export default MyGantt;
