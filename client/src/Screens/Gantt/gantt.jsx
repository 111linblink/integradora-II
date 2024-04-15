import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NarBar from '../NarBar.js/NarBar';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.js';

const MyGantt = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [activitiesResponse, vacationsResponse, usersResponse, assignmentsResponse] = await Promise.all([
          axios.get('http://localhost:3000/Actividad/actividades'),
          axios.get('http://localhost:3000/Vacaciones/solicitudes_vacaciones'),
          axios.get('http://localhost:3000/usuarios/user'),
          axios.get('http://localhost:3000/asignacion/asignaciones')
        ]);

        const activities = activitiesResponse.data.data?.map((activity, index) => ({
          id: `activity-${activity.Numero_Empleado}-${index}`,
          text: activity.nombre,
          start_date: new Date(activity.diaInicio),
          end_date: new Date(activity.diaFinalizacion),
          Numero_Empleado: activity.Numero_Empleado,
          type: 'activity'
        })) || [];

        const vacations = vacationsResponse.data.data?.filter(vacation => vacation.Estado === 'Aprobada').map((vacation, index) => ({
          id: `vacation-${vacation.Numero_Empleado}-${index}`,
          text: `Vacaciones del ${vacation.DiaIni} al ${vacation.DiaFin}`,
          start_date: new Date(vacation.DiaIni),
          end_date: new Date(vacation.DiaFin),
          Numero_Empleado: vacation.Numero_Empleado,
          type: 'vacation'
        })) || [];

        const combinedTasks = [...activities, ...vacations];

        const users = usersResponse.data.data?.reduce((acc, user) => {
          acc[user.Numero_Empleado] = user;
          return acc;
        }, {}) || {};

        const assignments = assignmentsResponse.data?.map(assignment => ({
          id: `assignment-${assignment.Numero_Empleado}`,
          text: assignment.Nombre,
          start_date: new Date(assignment.createdAt),
          end_date: new Date(assignment.updatedAt),
          Numero_Empleado: assignment.Numero_Empleado,
          type: 'assignment',
          Sede: assignment.Sede,
          Area: assignment.Area,
          Capacitacion: {
            NombreCapacitacion: assignment.Capacitacion.NombreCapacitacion,
            FechaInicio: new Date(assignment.Capacitacion.FechaInicio),
            FechaFin: new Date(assignment.Capacitacion.FechaFin),
            Descripcion: assignment.Capacitacion.Descripcion
          },
          Actividades: assignment.Actividad?.map(activity => ({
            id: `activity-${assignment.Numero_Empleado}-${activity._id}`,
            text: activity.Descripcion,
            start_date: new Date(/* Define una fecha de inicio para la actividad */),
            end_date: new Date(/* Define una fecha de finalización para la actividad */),
            type: 'activity'
          })) || []
        })) || [];
        

        combinedTasks.push(...assignments);

        const tasksWithUserData = combinedTasks.map(task => {
          const user = users[task.Numero_Empleado];
          if (user) {
            return {
              ...task,
              Sede: user.Sede,
              Area: user.Area,
              Contrato: user.Contrato
            };
          }
          return task;
        });

        setTasks(tasksWithUserData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    window.gantt.config.columns = [
      { name: "Numero_Empleado", label: "Número de empleado", width: 120, align: "center" },
      { name: "Sede", label: "Sede", width: 120, align: "center" },
      { name: "Area", label: "Área", width: 120, align: "center" },
      { name: "Contrato", label: "Contrato", width: 120, align: "center" }
    ];

    if (tasks.length > 0) {
      window.gantt.init('gantt-container');
      window.gantt.parse({ data: tasks });
    }
  }, [tasks]);

  const applyFilter = (value) => {
    const tasksCopy = [...tasks];
    const filteredTasks = tasksCopy.filter(task => {
      return task.Numero_Empleado.toString().includes(value);
    });
    window.gantt.clearAll();
    window.gantt.parse({ data: filteredTasks });
  };

  const handleFilterChange = (event) => {
    const { value } = event.target;
    setFilter(value);
    applyFilter(value);
  };

  return (
    <div style={{ backgroundColor: '#0c789c', width: '100%', height: '100vh', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="root">
      <NarBar />
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', width: '95%', height: '80vh', position: 'relative', top: '6%' }}>
        <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
          <input
            type="text"
            placeholder="Número de empleado"
            value={filter}
            onChange={handleFilterChange}
          />
        </div>
        <div id="gantt-container" style={{ width: '100%', height: 'calc(100% - 40px)', marginTop: '40px' }}></div>
      </div>
    </div>
  );
};

export default MyGantt;
