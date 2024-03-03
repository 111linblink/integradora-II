import React, { useEffect, useState } from 'react';
import NarBar from '../NarBar.js/NarBar';
import axios from 'axios';
import "./SA_visualizar.css";

const SA_visualizar = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/user')
      .then(response => {
        console.log(response.data);
        setData(response.data.data);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  }, []);

  return (
    <>
      <NarBar />
      
      <div className="v141_16"></div>
      <div className="v141_17"></div>

      <div className="v141_72"></div>
      <span className="v141_73">Sede </span>
      <div className="v141_74"></div>
      <span className="v141_75">Área</span>
      <div className="v141_76"></div>
      <span className="v141_77">Estado</span>

      <span className="v141_18">Numero_Empleado</span>
      {data.map((user) => (
        <div key={user._id} className="user-container">
          <div className="v141_23"></div>
          <span className="v141_24">{user.Nombre}</span>
          <div className="v141_24">Area</div>
          <span className="v141_24">{user.Sede}</span>
          <div className="button-container">
            <button className="v141_27 v141_28">
              <a href={`/sa-Modificar/${user._id}`}style={{ textDecoration: 'none', color: 'white' }}>Ver horario</a>    
            </button>
            <button className="v141_27 v141_28">
              <a href={`/sa-Modificar/${user._id}`}style={{ textDecoration: 'none', color: 'white' }}>Subir</a>    
            </button>
            <button className="v141_27 v141_28">
              <a href={`/sa-Modificar/${user._id}`}style={{ textDecoration: 'none', color: 'white' }}>Ver/Modificar contrato</a>    
            </button>
            <button className="v141_27 v141_28">
              <a href={`/sa-Modificar/${user._id}`}style={{ textDecoration: 'none', color: 'white' }}>Modificar/ Ver Datos</a>    
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default SA_visualizar;
