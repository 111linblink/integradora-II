import React, { useState, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom'; 
import "./NarBar.css";
import Tooltip from '@mui/material/Tooltip';

const NarBar = () => {
  const [mostrarVentanaUsuario, setMostrarVentanaUsuario] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Función para obtener los datos del usuario desde el sessionStorage
    const obtenerDatosUsuario = () => {
      const userDataFromStorage = sessionStorage.getItem('userData');
      if (userDataFromStorage) {
        setUserData(JSON.parse(userDataFromStorage)); // Establecer los datos del usuario en el estado
      }
    };

    obtenerDatosUsuario();
  }, []);

  const handleMostrarVentanaUsuario = () => {
    setMostrarVentanaUsuario(true);
  };

  const handleCloseVentana = () => {
    setMostrarVentanaUsuario(false);
  };

  const navigate = useNavigate();

  const handleCerrarSesion=()=>{
    sessionStorage.removeItem('userData');
    navigate('/');
  };

  return (
    <div className="v283_4">
      <div className="v283_2">
        <div className="v141_9"></div>
        
        <Tooltip title="" placement="bottom">
          <div className="tooltip-container">
            <Link to="/">
              <div className="v141_10"></div>
            </Link>
          </div>
        </Tooltip>
        
        <Tooltip title="Datos del Usuario" placement="bottom">
          <div className="tooltip-container">
            <Link>
              <div onClick={handleMostrarVentanaUsuario} className="v141_11"></div>
            </Link>
          </div>
        </Tooltip>

        <Tooltip title="Adimistración de Sedes" placement="bottom">
          <div className="tooltip-container">
            <Link to="/agregarsede">
              <div className="v141_12"></div>
            </Link>
          </div>
        </Tooltip>
        
        <Tooltip title="Agregar Administrador" placement="bottom">
          <div className="tooltip-container">
            <Link to="/sa-agregar">
              <div className="v141_13"></div>
            </Link>
          </div>
        </Tooltip>
        
        <Tooltip title="Visualizar usuarios" placement="bottom">
          <div className="tooltip-container">
            <Link to="/sa-visualizar">
              <div className="v141_14"></div>
            </Link>
          </div>
        </Tooltip>
        
        <Tooltip title="Adimistración de Contratos" placement="bottom">
          <div className="tooltip-container">
            <Link to="/admcontrato">
              <div className="v141_15"></div>
            </Link>
          </div>
        </Tooltip>
      </div>

      {mostrarVentanaUsuario && userData && (
        <div className="usuarioVentanaEmergente" onClick={handleCloseVentana}>
          <div className="contenido">
            <h3>Información del usuario</h3>
            <p>Nombre: {userData.nombre}</p>
            <p>Correo electrónico: {userData.correo}</p>
            <p>Número del empleado: {userData.correo}</p>
            <button className= 'actions-button' style={{ width: 200, height: 40, left: 1255, top: 2}} variant="outlined" color="error" onClick={handleCerrarSesion} >Cerrar Sesión</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default NarBar;
