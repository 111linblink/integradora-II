import React, { useEffect, useState } from 'react';
import { Gantt } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import './gantt.css';
import Axios from 'axios';
import NarBar from '../NarBar.js/NarBar';

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

  const eventOptions = {};

  const displayOptions = {
    viewMode: 'Days', // Cambiar a vista por días como vista predeterminada
    viewDate: new Date(),
    preStepsCount: 1,
    locale: 'es',
  };

  const stylingOptions = {};

  // Componente personalizado para el contenido del tooltip
  const CustomTooltipContent = ({ task, fontSize, fontFamily }) => {
    return (
      <div style={{ fontSize, fontFamily }}>
        <div>{task.name}</div>
        <div>Progreso: {task.progress}%</div>
        {/* Añade aquí cualquier otra información que desees mostrar */}
      </div>
    );
  };

  return (
    <div>
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: '#0c789c',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }} className="root">
        <NarBar />
        <div className="rectangulogantt">
          <h1>Gantt de actividades</h1>
          {tasks.length > 0 && (
            <Gantt
              tasks={tasks}
              eventOption={eventOptions}
              displayOption={displayOptions}
              stylingOption={stylingOptions}
              customScale={{hours: true, days: true, weeks: true}} // Permitir escalas personalizadas
              TooltipContent={CustomTooltipContent} // Utilizar el componente personalizado para el tooltip
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyGantt;
