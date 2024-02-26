import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmpleadoVacaciones from './Components/EmpleadoVacaciones/App';
import EmpleadoHorario from './Components/EmpleadoHorario/App'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/empleado-vacaciones" element={<EmpleadoVacaciones />} />
          <Route path="/empleado-horario" element={<EmpleadoHorario/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
