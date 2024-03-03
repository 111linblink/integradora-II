import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import "./NarBar.css";

const NarBar = () => {
  return (
    <div className="v283_4">
      <div className="v283_2">
       
        <Link to="/">
          <div className="v141_9"></div>
        </Link>
        <Link to="/">
          <div className="v141_10"></div>
        </Link>
        <Link to="/ruta-del-componente">
          <div className="v141_11"></div>
        </Link>
        <Link to="/ruta-del-componente">
          <div className="v141_12"></div>
        </Link>
        <Link to="/sa-agregar">
          <div className="v141_13"></div>
        </Link>
        <Link to="/sa-visualizar">
          <div className="v141_14"></div>
        </Link>
        <Link to="/ruta-del-componente">
          <div className="v141_15"></div>
        </Link>
      </div>
    </div>
  );
}

export default NarBar;
