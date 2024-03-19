import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const AsignacionesUsuario = () => {
  const { userId } = useParams();
  const [asignaciones, setAsignaciones] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/asignaciones/usuarios/${userId}`)
      .then(response => {
        console.log(response.data); // Verificar la estructura de los datos recibidos
        setAsignaciones(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las asignaciones:', error);
      });
  }, [userId]);  

  const columns = [
    { field: 'NombreCapacitacion', headerName: 'Nombre de la Capacitación', width: 300 },
    { field: 'Descripcion', headerName: 'Descripción', width: 500 },
  ];

  return (
    <div style={{ height: 400, width: '100%', marginTop: 100 }}>
      <h2>Capacitaciones Asignadas</h2>
      <DataGrid
        rows={asignaciones}
        columns={columns}
        pageSize={5}
      />
    </div>
  );
};

export default AsignacionesUsuario;
