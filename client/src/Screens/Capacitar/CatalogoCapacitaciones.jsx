import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const CatalogoCapacitaciones = ({ handleClose, handleAsignarCapacitacion }) => {
  const [capacitaciones, setCapacitaciones] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/capacitaciones')
      .then(response => {
        setCapacitaciones(response.data.data);
      })
      .catch(error => {
        console.error('Error al obtener capacitaciones:', error);
      });
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'nombre', headerName: 'Nombre', width: 200 },
    { field: 'descripcion', headerName: 'Descripción', width: 400 },
    { field: 'duracion', headerName: 'Duración', width: 150 },
  ];

  const handleAsignar = (capacitacion) => {
    // Lógica para asignar la capacitación al empleado seleccionado
    handleAsignarCapacitacion(capacitacion);
    handleClose();
  };

  return (
    <div>
      <h2>Catálogo de Capacitaciones</h2>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={capacitaciones}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          disableSelectionOnClick
          onRowClick={(row) => handleAsignar(row.data)}
        />
      </div>
    </div>
  );
};

export default CatalogoCapacitaciones;
