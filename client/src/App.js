import React from 'react';
import './App.css'; // Importa el archivo CSS aquí

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import SaAgregar from './Screens/Agregar/SA_Agregar';
import SaVisualizar from './Screens/Visualizar/SA_visualizar';
import Login from './Screens/Login/Loggin';

function App() {
  return (
    <div className=''>
      <Router>
        <Routes>
          <Route path="/SA_Agregar" element={<SaAgregar />} />
          <Route path="/SA_visualizar" element={<SaVisualizar />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

