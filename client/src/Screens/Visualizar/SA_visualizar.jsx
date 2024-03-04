import React, { useEffect, useState } from 'react';
import NarBar from '../NarBar.js/NarBar';
import axios from 'axios';
import "./SA_visualizar.css";

const SA_visualizar = () => {
  const [data, setData] = useState([]);
  const [sedeSeleccionada, setSedeSeleccionada] = useState('');
  const [areaSeleccionada, setAreaSeleccionada] = useState('');
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('');
  const [generoSeleccionado, setGeneroSeleccionado] = useState('');
  const [numeroEmpleadoBuscado, setNumeroEmpleadoBuscado] = useState('');

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

  const handleSedeChange = (event) => {
    setSedeSeleccionada(event.target.value);
  };

  const handleAreaChange = (event) => {
    setAreaSeleccionada(event.target.value);
  };

  const handleEstadoChange = (event) => {
    setEstadoSeleccionado(event.target.value);
  };

  const handleGeneroChange = (event) => {
    setGeneroSeleccionado(event.target.value);
  };

  const handleNumeroEmpleadoChange = (event) => {
    setNumeroEmpleadoBuscado(event.target.value);
  };

  const usuariosFiltrados = data.filter(user => {
    return (
      (sedeSeleccionada === '' || user.Sede === sedeSeleccionada) &&
      (areaSeleccionada === '' || user.Area === areaSeleccionada) &&
      (estadoSeleccionado === '' || user.Status === estadoSeleccionado) &&
      (generoSeleccionado === '' || user.Sexo === generoSeleccionado) &&
      (numeroEmpleadoBuscado === '' || user.Numero_Empleado.toString().includes(numeroEmpleadoBuscado))
    );
  });

  return (
    <>
      <NarBar />
      
      <div className="v141_16"></div>
     

      <select className="v141_72" value={sedeSeleccionada} onChange={handleSedeChange}>
        <option value="Leon">Leon</option>
        <option value="Salamanca">Salamanca</option>
      </select>
      <span className="v141_73">Sede</span>

      <div className="v141_74"></div>
      <select className="v141_74" value={areaSeleccionada} onChange={handleAreaChange}>
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
      <span className="v141_75">Área</span>

      <div className="v141_76"></div>
      <select className="v141_76" value={estadoSeleccionado} onChange={handleEstadoChange}>
        <option value="Activo">Activo</option>
        <option value="Inactivo">Inactivo</option>
      </select>
      <span className="v141_77">Estado</span>

      <div className="v141_78"></div>
      <select className="v141_78" value={generoSeleccionado} onChange={handleGeneroChange}>
        <option value="femenino">Femenino</option>
        <option value="masculino">Masculino</option>
      </select>
      <span className="v141_79">Género</span>

      <div className="v141_17"></div>
      <input
        type="text"
        value={numeroEmpleadoBuscado}
        onChange={handleNumeroEmpleadoChange}
        placeholder="Buscar Num.Empleado"
        className='v141_18 '
      />

      {usuariosFiltrados.map((user) => (
        <div key={user._id} className="user-container">
          <div className="v141_23"></div>
          <span className="v141_24">{user.Nombre}</span>
          <div className="v141_24">Área</div>
          <span className="v141_24">{user.Sede}</span>
          <div className="button-container">
            <button className="v141_27 v141_28">
              <a href={`/sa-Modificar/${user._id}`} style={{ textDecoration: 'none', color: 'white' }}>Ver horario</a>    
            </button>
            <button className="v141_27 v141_28">
              <a href={`/sa-Modificar/${user._id}`} style={{ textDecoration: 'none', color: 'white' }}>Subir</a>    
            </button>
            <button className="v141_27 v141_28">
              <a href={`/sa-Modificar/${user._id}`} style={{ textDecoration: 'none', color: 'white' }}>Ver/Modificar contrato</a>    
            </button>
            <button className="v141_27 v141_28">
              <a href={`/sa-Modificar/${user._id}`} style={{ textDecoration: 'none', color: 'white' }}>Modificar/ Ver Datos</a>    
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default SA_visualizar;
