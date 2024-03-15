import React, { useEffect, useState } from 'react';
import NarBar from '../NarBar.js/NarBar';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const Capavisualizar = () => {
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [deletedUserName, setDeletedUserName] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [capacitaciones, setCapacitaciones] = useState([]);
  const [selectedCapacitacion, setSelectedCapacitacion] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/user')
      .then(response => {
        const usuariosConId = response.data.data.map((usuario, index) => ({
          ...usuario,
          id: usuario._id || index + 1, // Asigna un id único basado en el _id o en el índice
        }));
        setData(usuariosConId);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  
    // Cargar capacitaciones al montar el componente
    axios.get('http://localhost:3000/capacitaciones')
      .then(response => {
        const capacitacionesConId = response.data.data.map((capacitacion, index) => ({
          ...capacitacion,
          id: capacitacion._id || index + 1, // Asigna un id único basado en el _id o en el índice
        }));
        setCapacitaciones(capacitacionesConId);
      })
      .catch(error => {
        console.error('Error al obtener capacitaciones:', error);
      });
  }, []);
  

  const handleRowSelection = (selection) => {
    setSelectedUser(selection);
    console.log(selection);
  };
  
  const handleCapacitacionSelection = (selection) => {
    const capacitacionSeleccionada = capacitaciones.find(capacitacion => capacitacion.id === selection);
    setSelectedCapacitacion(capacitacionSeleccionada);
  };
  

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAssignCapacitaciones = () => {
    if (!selectedUser || !selectedCapacitacion || !selectedCapacitacion.Nombre) {
      console.log(selectedCapacitacion, selectedCapacitacion.Nombre)
      console.error('No se han seleccionado usuarios o capacitaciones');
      return;
    }
  
    const asignacion = {
      Nombre: selectedUser.Nombre,
      Numero_Empleado: selectedUser.Numero_Empleado,
      Area: selectedUser.Area,
      Sede: selectedUser.Sede,
      Actividad: {
        NombreCapacitacion: selectedCapacitacion.Nombre,
        FechaInicio: selectedCapacitacion.FechaInicio,
        FechaFin: selectedCapacitacion.FechaFin,
        Descripcion: selectedCapacitacion.Descripcion
      }
    };
  
    axios.post('http://localhost:3000/asignar_capacitaciones_empleado', {
      asignaciones: [asignacion]
    })
      .then(response => {
        console.log(response.data);
        handleCloseDialog();
        setOpenAlert(true);
      })
      .catch(error => {
        console.error('Error al asignar capacitaciones a empleado:', error);
      });
  };
  
  

  const handleDelete = (id, nombre) => {
    // Lógica para eliminar un usuario
    setOpenAlert(true);
    setDeletedUserName(nombre);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const columns = [
    { field: 'Nombre', headerName: 'Nombre', width: 150 },
    { field: 'Area', headerName: 'Área', width: 100 },
    { field: 'Sede', headerName: 'Sede', width: 100 },
    { field: 'Status', headerName: 'Estado', width: 100 },
    { field: 'Tipo', headerName: 'Tipo', width: 150 },
    { field: 'Numero_Empleado', headerName: 'Num. Empleado', width: 150 },
    { field: 'Sexo', headerName: 'Sexo', width: 150 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 300,
      renderCell: (params) => (
        <div>
          <Button className="actions-button" variant="outlined" onClick={handleOpenDialog}>Asignar Capacitación</Button>
          <Button onClick={() => handleDelete(params.row.id, params.row.Nombre)} variant="outlined" color="error" startIcon={<DeleteIcon />}>Eliminar</Button>
        </div>
      ),  
    },
  ];

  return (
    <>
      <NarBar />
      <div className="v141_16">
        <div style={{ height: 400, width: '100%', marginTop: 100 }}>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
            onRowClick={handleRowSelection}
          />
        </div>
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Asignar Capacitación</DialogTitle>
        <DialogContent>
          <div>
            <h3>Selecciona una capacitación:</h3>
            <select value={selectedCapacitacion ? selectedCapacitacion.id : ''} onChange={(e) => handleCapacitacionSelection(e.target.value)}>
              <option value="">Selecciona una capacitación</option>
              {capacitaciones.map(capacitacion => (
                <option key={capacitacion.id} value={capacitacion.id}>{capacitacion.Nombre}</option>
              ))}
            </select>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancelar</Button>
          <Button onClick={handleAssignCapacitaciones} color="primary">Asignar</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <MuiAlert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          Usuario {deletedUserName} eliminado con éxito
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default Capavisualizar;
