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
      (generoSeleccionado === '' || user.Tipo === generoSeleccionado) &&
      (numeroEmpleadoBuscado === '' || (user.Numero_Empleado && user.Numero_Empleado.toString().includes(numeroEmpleadoBuscado)))
    );
  });
  
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue(params.id, 'firstName') || ''} ${
          params.getValue(params.id, 'lastName') || ''
        }`,
    },
  ];

  
const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

  return (
    <>
      <NarBar />
      
      <div className="v141_16"></div>

      <button className="v141_80 v141_81" value={generoSeleccionado} onChange={handleGeneroChange}>
      Descargar
      </button>

    
      <select className="v141_72 v141_73" value={sedeSeleccionada} onChange={handleSedeChange}>
      <option  value=''>Seleccione una Sede</option>
        <option value="Leon">Leon</option>
        <option value="Salamanca">Salamanca</option>
      </select>
           
      <select className="v141_74 v141_75" value={areaSeleccionada} onChange={handleAreaChange}>
        <option  value=''>Seleccione una Area</option>
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
      
      <select className="v141_76 v141_77" value={estadoSeleccionado} onChange={handleEstadoChange}>
      <option  value=''>Seleccione un Estado</option>
      <option value="Activo">Activo</option>
      <option value="Inactivo">Inactivo</option>
      </select>

      <select className="v141_78 v141_79" value={generoSeleccionado} onChange={handleGeneroChange}>
      <option  value=''>Seleccione un Tipo</option>
        <option value="Empleado">Empleado</option>
        <option value="Admin">Masculino</option>
      </select>
 

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



          <button className="v141_27 v141_28" onClick={() => { window.location.href = `/empleado-horario` }}>
         Ver horario
          </button>
        <button className="v141_27 v141_28" onClick={() => { window.location.href = `/sa-Modificar/${user._id}` }}>
         Subir
        </button>
        <button className="v141_27 v141_28" onClick={() => { window.location.href = `/sa-Modificar/${user._id}` }}>        
         Ver/Modificar contrato
        </button>
        <button className="v141_27 v141_28" onClick={() => { window.location.href = `/sa-Modificar/${user._id}` }}>
         Modificar/ Ver Datos
        </button>

          </div>
        </div>
      ))}
    </>
  );
};

export default SA_visualizar;
