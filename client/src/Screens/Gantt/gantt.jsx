import React from 'react';
import { Gantt, Task, EventOption, DisplayOption, StylingOption } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";

const MyGantt = () => {
  const tasks: Task[] = [
    {
      id: 'Task1',
      name: 'Task 1',
      type: 'task',
      start: new Date(2024, 3, 1),
      end: new Date(2024, 3, 5),
      progress: 50,
      dependencies: [],
      styles: {
        backgroundColor: '#4CAF50',
        progressColor: '#FF9800',
      },
    },
    {
      id: 'Task2',
      name: 'Task 2',
      type: 'task',
      start: new Date(2024, 3, 6),
      end: new Date(2024, 3, 10),
      progress: 30,
      dependencies: ['Task1'],
      styles: {
        backgroundColor: '#FFEB3B',
        progressColor: '#FF9800',
      },
    },
    // Añade más tareas según sea necesario
  ];

  const eventOptions: EventOption = {
    onSelect: (task, isSelected) => console.log('Task selected:', task),
    onDoubleClick: (task) => console.log('Task double clicked:', task),
    onClick: (task) => console.log('Task clicked:', task),
    onDelete: (task) => console.log('Task deleted:', task),
    onDateChange: (task, children) => console.log('Task date changed:', task, children),
    onProgressChange: (task, children) => console.log('Task progress changed:', task, children),
    onExpanderClick: (task) => console.log('Expander clicked:', task),
  };

  const displayOptions: DisplayOption = {
    viewMode: 'Week', // Puedes cambiar esto según tus necesidades
    viewDate: new Date(),
    preStepsCount: 1,
    locale: 'es', // Configura el idioma de la interfaz según sea necesario
  };

  const stylingOptions: StylingOption = {
    // Aquí puedes configurar el estilo del Gantt según tus preferencias
  };

  return (
    <div>
      <h1>My Gantt Chart</h1>
      <Gantt
        tasks={tasks}
        eventOption={eventOptions}
        displayOption={displayOptions}
        stylingOption={stylingOptions}
      />
    </div>
  );
};

export default MyGantt;
