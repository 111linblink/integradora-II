import React from 'react';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import SaAgregar from './Screens/Agregar/SA_Agregar';
import SaVisualizar from './Screens/Visualizar/SA_visualizar';
import SAModificar from './Screens/Modificar/SA_Modificar';
import Login from './Screens/Login/Loggin';
import Capacitacion from './Screens/Capacitar/Capacitacion';
import Sadmicapacitacion from './Screens/Capacitar/Sadmicapacitacion';

import EmpleadoVacaciones from './Screens/EmpleadoVacaciones/App';
import EmpleadoHorario from './Screens/EmpleadoHorario/App'


function App() {
  return (
    <div className=''>
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/SA_Agregar" element={<SaAgregar />} />
          <Route path="/SA_visualizar" element={<SaVisualizar />} />
          <Route path="/SA_Modificar" element={<SAModificar />} />
          <Route path="/capacitacion" element={<Capacitacion/>}></Route>
          <Route path="/sadmicapacitacion" element={<Sadmicapacitacion/>}/>
          <Route path="/empleado-vacaciones" element={<EmpleadoVacaciones />} />
          <Route path="/empleado-horario" element={<EmpleadoHorario/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

