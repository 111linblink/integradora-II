import React from 'react';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import SaAgregar from './Screens/Agregar/SA_Agregar';
import SAvisualizar from './Screens/Visualizar/SA_visualizar';
import SAModificar from './Screens/Modificar/SA_Modificar';
import Login from './Screens/Login/Loggin';
import Capacitacion from './Screens/Capacitar/Capacitacion';
import Sadmicapacitacion from './Screens/Capacitar/Sadmicapacitacion';
import AgregarSede from './Screens/AgregarSede/AgregarSede';
import Contratos from './Screens/Contratos/contratos';
import Capavisualizar from './Screens/Capacitar/Capavisualizar';
import NarBar from './Screens/NarBar.js/NarBar';
import Vacaciones from './Screens/Vacaciones/Vacaciones';
import Horario from './Screens/Horario/Horario';
import AsignacionesUsuario from './Screens/Capacitar/AsignacionesUsuario';
import CargaMasiva from './Screens/Agregar/CargaMasiva'


function App() {
  return (
    <div className=''>
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/sa-agregar" element={<SaAgregar />} />
          <Route path="/sa-visualizar" element={<SAvisualizar />} />
          <Route path="/agregarsede" element={<AgregarSede />} />
          <Route path="/admcontrato" element={<Contratos />} />
          <Route path='/sa-Modificar/:id' element={<SAModificar/>} /> 
          <Route path="/capacitacion" element={<Capacitacion/>}/>
          <Route path="/sadmicapacitacion" element={<Sadmicapacitacion/>}/>
          <Route path="/vacaciones" element={<Vacaciones/>}/>
          <Route path="/horario" element={<Horario/>}/>
          <Route path="/capavisualizar" element={<Capavisualizar/>} />
          <Route path="/narbar" element={<NarBar/>} />
          <Route path="/cargaMasiva" element={<CargaMasiva/>} />
          <Route path="/asignaciones/:userId" element={<AsignacionesUsuario/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

