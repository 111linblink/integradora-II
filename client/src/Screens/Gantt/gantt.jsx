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

  const parseTime = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date;
  };

  const adjustToWorkHoursStart = (date, user) => {
    const workHours = user ? user.Turno.split(' - ') : ['00:00', '24:00'];
    const workStartHour = parseTime(workHours[0]).getHours();
    date.setHours(workStartHour, 0, 0, 0); 
    return date;
  };

  const adjustToWorkHoursEnd = (date, user) => {
    const workHours = user ? user.Turno.split(' - ') : ['00:00', '24:00'];
    const workEndHour = parseTime(workHours[1]).getHours();
    date.setHours(workEndHour, 0, 0, 0);
    return date;
  };

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

        const usersMapData = usersData.reduce((acc, user) => {
          acc[user.Numero_Empleado] = user;
          return acc;
        }, {});

        setUsersMap(usersMapData);

        const adjustedActivities = activitiesData?.map(activity => {
          const user = usersMapData[activity.Numero_Empleado];
          return {
            ...activity,
            start: adjustToWorkHoursStart(new Date(activity.diaInicio), user),
            end: adjustToWorkHoursEnd(new Date(activity.diaFinalizacion), user),
            group: activity.Numero_Empleado.toString(),
            user: user,
            className: 'activity-task',
            content: activity.nombre
          };
        }) || [];

        const adjustedAssignments = assignmentsData?.map(assignment => {
          const user = usersMapData[assignment.Numero_Empleado];
          return {
            ...assignment,
            start: adjustToWorkHoursStart(new Date(assignment.Capacitacion.FechaInicio), user),
            end: adjustToWorkHoursEnd(new Date(assignment.Capacitacion.FechaFin), user),
            group: assignment.Numero_Empleado.toString(),
            user: user,
            className: 'assignment-task',
            content: assignment.Capacitacion.NombreCapacitacion 
          };
        }) || [];

        const adjustedVacations = vacationsData?.filter(vacation => vacation.Estado === 'Aprobada').map(vacation => {
          const user = usersMapData[vacation.Numero_Empleado];
          return {
            ...vacation,
            start: adjustToWorkHoursStart(new Date(vacation.DiaIni), user),
            end: adjustToWorkHoursEnd(new Date(vacation.DiaFin), user),
            group: vacation.Numero_Empleado.toString(),
            user: user,
            className: 'vacation-task',
            content: `Vacaciones del ${vacation.DiaIni} al ${vacation.DiaFin}` 
          };
        }) || [];

        const restDays = [];
        const workDays = [];

        usersData.forEach(user => {
          const contractDays = user.Contrato.split('/');
          const workDayCount = parseInt(contractDays[0], 10);
          const restDayCount = parseInt(contractDays[1], 10);
          const totalDays = workDayCount + restDayCount;

          const today = new Date();
          const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 0, 0, 0, 0);
          const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59);

          let currentWorkDay = 0;

          for (let currentDate = new Date(startOfMonth); currentDate.getTime() <= endOfMonth.getTime(); currentDate.setDate(currentDate.getDate() + 1)) {
            if (currentWorkDay < workDayCount) {
              workDays.push({
                id: `work-${user.Numero_Empleado}-${currentDate.getTime()}`,
                content: 'Día de trabajo',
                start: adjustToWorkHoursStart(new Date(currentDate), user),
                end: adjustToWorkHoursEnd(new Date(currentDate), user),
                group: user.Numero_Empleado.toString(),
                className: 'work-task'
              });
              currentWorkDay++;
            } else {
              restDays.push({
                id: `rest-${user.Numero_Empleado}-${currentDate.getTime()}`,
                content: 'Descanso',
                start: adjustToWorkHoursStart(new Date(currentDate), user),
                end: adjustToWorkHoursEnd(new Date(currentDate), user),
                group: user.Numero_Empleado.toString(),
                className: 'rest-task'
              });
              currentWorkDay = (currentWorkDay + 1) % totalDays;
            }
          }
        });

        setTasks([
          ...adjustedActivities,
          ...adjustedAssignments,
          ...adjustedVacations,
          ...workDays,
          ...restDays
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      const container = document.getElementById('timeline-container');
      const groups = tasks.reduce((acc, task) => {
        if (!acc.find(group => group.id === task.group)) {
          const user = usersMap[task.group];
          acc.push({
            id: task.group,
            content: user ? `${user.Nombre} (${user.Numero_Empleado}) - ${user.Sede} - ${user.Area} - ${user.Contrato} - ${user.Turno}` : task.group
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

  useEffect(() => {
    if (tasks.length > 0) {
      const filteredTasks = tasks.filter(task => {
        if (task.className === 'work-task') {
          // Verificar si hay alguna tarea (actividad, asignación o vacación) que se superponga con la tarea de trabajo
          const overlappingTasks = tasks.some(otherTask =>
            (otherTask.className === 'activity-task' || otherTask.className === 'assignment-task' || otherTask.className === 'vacation-task') &&
            otherTask.group === task.group &&
            otherTask.start.getTime() <= task.end.getTime() &&
            otherTask.end.getTime() >= task.start.getTime()
          );
          // Si hay superposición, filtrar la tarea de trabajo
          return !overlappingTasks;
        }
        // Mantener las tareas que no son de trabajo
        return true;
      });
      timeline.setItems(filteredTasks);
    }
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
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', width: '95%', height: '80%', position: 'relative', top: '6%' }}>
        <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
        </div>
        <div id="timeline-container" style={{ width: '100%', height: 'calc(100% - 40px)', marginTop: '40px' }}></div>
      </div>
    </div>
  );
};

export default MyGantt;
