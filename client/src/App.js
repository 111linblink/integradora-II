import React from 'react';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import SaAgregar from './Screens/Agregar/SA_Agregar';
import SAvisualizar from './Screens/Visualizar/SA_visualizar';
import SAModificar from './Screens/Modificar/SA_Modificar';
import Login from './Screens/Login/Loggin';
import Capacitacion from './Screens/Capacitar/Capacitacion';
import Sadmicapacitacion from './Screens/Capacitar/Sadmicapacitacion';
import AgregarSede from './Screens/AgregarSede/AgregarSede';
import EmpleadoVacaciones from './Screens/EmpleadoVacaciones/App';
import EmpleadoHorario from './Screens/EmpleadoHorario/App'

import NarBar from './Screens/NarBar.js/NarBar';



function App() {
  return (
    <div className=''>
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/sa-agregar" element={<SaAgregar />} />
          <Route path="/sa-visualizar" element={<SAvisualizar />} />
          <Route path="/agregarsede" element={<AgregarSede />} />
          <Route path='/sa-Modificar/:id' element={<SAModificar/>} /> 
          <Route path="/capacitacion" element={<Capacitacion/>}></Route>
          <Route path="/sadmicapacitacion" element={<Sadmicapacitacion/>}/>
          <Route path="/empleado-vacaciones" element={<EmpleadoVacaciones />} />
          <Route path="/empleado-horario" element={<EmpleadoHorario/>} />
          <Route path="/empleado-horario" element={<EmpleadoHorario/>} />
          <Route path="/narbar" element={<NarBar/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

