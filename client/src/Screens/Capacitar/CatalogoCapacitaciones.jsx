import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const CatalogoCapacitaciones = ({ handleClose, handleAsignarCapacitacion, capacitaciones }) => {
    const columns = [
        { field: '_id', headerName: 'ID', width: 100 },
        { field: 'Nombre', headerName: 'Nombre', width: 200 },
        { field: 'Area', headerName: 'Área', width: 200 },
        { field: 'Ubicacion', headerName: 'Ubicación', width: 200 },
        { field: 'Actividad', headerName: 'Actividad', width: 200 },
    ];

    // Mapear los datos de capacitación para asegurarse de que cada fila tenga una propiedad `id` única
    const rows = capacitaciones.map((capacitacion, index) => ({
        ...capacitacion,
        id: index + 1 // Se puede usar cualquier identificador único aquí
    }));

    const handleAsignar = (capacitacion) => {
        handleAsignarCapacitacion(capacitacion);
        handleClose();
    };

    return (
        <div>
            <h2>Catálogo de Capacitaciones</h2>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
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
