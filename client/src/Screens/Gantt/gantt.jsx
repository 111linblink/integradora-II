import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NarBar from '../NarBar.js/NarBar';
import './gantt.css';
import { Timeline } from 'vis-timeline/standalone';
import 'vis-timeline/styles/vis-timeline-graph2d.css';

const MyGantt = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('');
  const [usersMap, setUsersMap] = useState({});
  let timeline = null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [activitiesResponse, usersResponse, asignacionResponse, vacacionesResponse] = await Promise.all([
          axios.get('http://localhost:3000/Actividad/actividades'),
          axios.get('http://localhost:3000/usuarios/user'),
          axios.get('http://localhost:3000/asignacion/asignaciones'),
          axios.get('http://localhost:3000/vacaciones/Solicitudes_Vacaciones')
        ]);

        const usersData = usersResponse.data.data;
        const activitiesData = activitiesResponse.data.data;
        const assignmentsData = asignacionResponse.data;
        const vacationsData = vacacionesResponse.data.data;

        console.log("Users Data:", usersData);
        console.log("Activities Data:", activitiesData);
        console.log("Assignments Data:", assignmentsData);
        console.log("Vacations Data:", vacationsData);

        const usersMapData = usersData.reduce((acc, user) => {
          acc[user.Numero_Empleado] = user;
          return acc;
        }, {});

        setUsersMap(usersMapData);

        const activities = activitiesData?.map(activity => ({
          id: activity.id,
          content: activity.nombre,
          start: new Date(activity.diaInicio),
          end: new Date(activity.diaFinalizacion),
          group: activity.Numero_Empleado.toString(),
          user: usersMapData[activity.Numero_Empleado],
          className: 'activity-task' 
        })) || [];

        const assignments = assignmentsData?.map(assignment => ({
          id: assignment.id,
          content: assignment.Capacitacion.NombreCapacitacion,
          start: new Date(assignment.Capacitacion.FechaInicio),
          end: new Date(assignment.Capacitacion.FechaFin),
          group: assignment.Numero_Empleado.toString(),
          user: usersMapData[assignment.Numero_Empleado],
          className: 'assignment-task' // Asigna la clase CSS para asignaciones
        })) || [];

        const vacations = vacationsData?.filter(vacation => vacation.Estado === 'Aprobada').map(vacation => ({
          id: vacation.id,
          content: `Vacaciones del ${vacation.DiaIni} al ${vacation.DiaFin}`,
          start: new Date(vacation.DiaIni),
          end: new Date(vacation.DiaFin),
          group: vacation.Numero_Empleado.toString(),
          user: usersMapData[vacation.Numero_Empleado],
          className: 'vacation-task' // Asigna la clase CSS para vacaciones
        })) || [];

        const restDays = [];

        usersData.forEach(user => {
          const contractDays = user.Contrato.split('/');
          const workDayCount = parseInt(contractDays[0], 10);
          const restDayCount = parseInt(contractDays[1], 10);

          const today = new Date();
          const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0);
          const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59);

          let currentWorkDay = 0;

          for (let currentDate = new Date(startOfMonth); currentDate.getTime() <= endOfMonth.getTime(); currentDate.setDate(currentDate.getDate() + 1)) {
            if (currentWorkDay < workDayCount) {
              currentWorkDay++;
            } else {
              for (let i = 0; i < restDayCount; i++) {
                restDays.push({
                  id: `rest-${user.Numero_Empleado}-${currentDate.getTime()}`,
                  content: 'Descanso',
                  start: new Date(currentDate),
                  end: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59),
                  group: user.Numero_Empleado.toString(),
                  className: 'rest-task' 
                });
                currentDate.setDate(currentDate.getDate() + 1); // Avanzar al siguiente día
              }
              currentWorkDay = 1; // Reiniciar contador de días laborables
            }
          }
        });

        // Adelantar un día solo para las tareas de Actividades, Asignaciones y Vacaciones
        const updatedActivities = activities.map(activity => ({
          ...activity,
          start: new Date(activity.start.getTime() + 1 * 24 * 60 * 60 * 1000),
          end: new Date(activity.end.getTime() + 1 * 24 * 60 * 60 * 1000)
        }));

        const updatedAssignments = assignments.map(assignment => ({
          ...assignment,
          start: new Date(assignment.start.getTime() + 1 * 24 * 60 * 60 * 1000),
          end: new Date(assignment.end.getTime() + 1 * 24 * 60 * 60 * 1000)
        }));

        const updatedVacations = vacations.map(vacation => ({
          ...vacation,
          start: new Date(vacation.start.getTime() + 1 * 24 * 60 * 60 * 1000),
          end: new Date(vacation.end.getTime() + 1 * 24 * 60 * 60 * 1000)
        }));

        setTasks([...updatedActivities, ...updatedAssignments, ...updatedVacations, ...restDays]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      console.log("Tasks:", tasks);

      const container = document.getElementById('timeline-container');
      const groups = tasks.reduce((acc, task) => {
        if (!acc.find(group => group.id === task.group)) {
          const user = usersMap[task.group];
          acc.push({
            id: task.group,
            content: user ? `${user.Nombre} (${user.Numero_Empleado}) - ${user.Sede} - ${user.Area} - ${user.Contrato}` : task.group
          });
        }
        return acc;
      }, []);
      const options = {
        editable: false,
        stack: false,
        groupOrder: 'content',
        orientation: 'top',
        zoomKey: 'ctrlKey',
        start: new Date(),
        end: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
        margin: {
          item: 20,
          axis: 40
        },
        tooltip: {
          followMouse: true,
          overflowMethod: 'cap'
        }
      };

      if (timeline) {
        timeline.destroy();
      }

      timeline = new Timeline(container, tasks, groups, options);
    }

    return () => {
      if (timeline) {
        timeline.destroy();
        timeline = null;
      }
    };
  }, [tasks, usersMap]);

  const applyFilter = value => {
    const filteredTasks = tasks.filter(task => {
      return task.content.toLowerCase().includes(value.toLowerCase());
    });

    timeline.setItems(filteredTasks);
  };

  const handleFilterChange = event => {
    const { value } = event.target;
    setFilter(value);
    applyFilter(value);
  };

  return (
    <div style={{ backgroundColor: '#0c789c', width: '100%', height: '100vh', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="root">
      <NarBar />
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', width: '95%', height: '80vh', position: 'relative', top: '6%' }}>
        <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
        </div>
        <div id="timeline-container" style={{ width: '100%', height: 'calc(100% - 40px)', marginTop: '40px' }}></div>
      </div>
    </div>
  );
};

export default MyGantt;
