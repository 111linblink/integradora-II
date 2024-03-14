import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const CatalogoCapacitaciones = ({ handleClose, handleAsignarCapacitacion, capacitaciones }) => {
    const columns = [
        { field: '_id', headerName: 'ID', width: 100 }, // Cambiado de 'id' a '_id' para que coincida con el campo en tu esquema de capacitaciones
        { field: 'Nombre', headerName: 'Nombre', width: 200 }, // Utiliza el nombre de campo correcto de tu esquema de capacitaciones
        { field: 'Area', headerName: 'Área', width: 200 }, // Utiliza el nombre de campo correcto de tu esquema de capacitaciones
        { field: 'Ubicacion', headerName: 'Ubicación', width: 200 }, // Utiliza el nombre de campo correcto de tu esquema de capacitaciones
        { field: 'Actividad', headerName: 'Actividad', width: 200 }, // Utiliza el nombre de campo correcto de tu esquema de capacitaciones
    ];

    const handleAsignar = (capacitacion) => {
        handleAsignarCapacitacion(capacitacion);
        handleClose();
    };

    return (
        <div>
            <h2>Catálogo de Capacitaciones</h2>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={capacitaciones.map((capacitacion, index) => ({ ...capacitacion, id: index }))}
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
