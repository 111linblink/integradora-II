import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NarBar from '../NarBar.js/NarBar';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.js';

const MyGantt = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [activitiesResponse, vacationsResponse, usersResponse] = await Promise.all([
          axios.get('http://localhost:3000/Actividad/actividades'),
          axios.get('http://localhost:3000/Vacaciones/solicitudes_vacaciones'),
          axios.get('http://localhost:3000/usuarios/user')
        ]);

        const activities = activitiesResponse.data.data.map(activity => ({
          id: `activity-${activity.Numero_Empleado}`,
          text: activity.nombre,
          start_date: new Date(activity.diaInicio),
          end_date: new Date(activity.diaFinalizacion),
          Numero_Empleado: activity.Numero_Empleado,
          type: 'activity'
        }));

        const vacations = vacationsResponse.data.data.filter(vacation => vacation.Estado === 'Aprobada').map((vacation, index) => ({
          id: `vacation-${vacation.Numero_Empleado}-${index}`,
          text: `Vacaciones del ${vacation.DiaIni} al ${vacation.DiaFin}`,
          start_date: new Date(vacation.DiaIni),
          end_date: new Date(vacation.DiaFin),
          Numero_Empleado: vacation.Numero_Empleado,
          type: 'vacation'
        }));

        const combinedTasks = [...activities, ...vacations];

        const users = usersResponse.data.data.reduce((acc, user) => {
          acc[user.Numero_Empleado] = user;
          return acc;
        }, {});

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

  return (
    <>
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
        <div id="gantt-container" style={{ width: '95%', height: '80%', top:'7%', border:'20pxs' }}></div>
    </div>
    </>
  );
};

export default MyGantt;
