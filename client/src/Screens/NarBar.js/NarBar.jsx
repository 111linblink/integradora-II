import React from 'react';
import { Link } from 'react-router-dom'; 
import "./NarBar.css";
import Tooltip from '@mui/material/Tooltip';

const NarBar = () => {
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
        
        <Tooltip title="" placement="bottom">
          <div className="tooltip-container">
            <Link to="/ruta-del-componente">
              <div className="v141_11"></div>
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
        
        <Tooltip title="" placement="bottom">
          <div className="tooltip-container">
            <Link to="/ruta-del-componente">
              <div className="v141_15"></div>
            </Link>
          </div>
        </Tooltip>
      </div>
    </div>
  );
}

export default NarBar;
