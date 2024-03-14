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
import CatalogoCapacitaciones from './CatalogoCapacitaciones'; // Importa la vista CatalogoCapacitaciones

const Capavisualizar = () => {
  const [data, setData] = useState([]);
  const [sedeSeleccionada, setSedeSeleccionada] = useState('');
  const [areaSeleccionada, setAreaSeleccionada] = useState('');
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('');
  const [generoSeleccionado, setGeneroSeleccionado] = useState('');
  const [numeroEmpleadoBuscado, setNumeroEmpleadoBuscado] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [deletedUserName, setDeletedUserName] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [capacitaciones, setCapacitaciones] = useState([]);

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
        setCapacitaciones(response.data.data);
      })
      .catch(error => {
        console.error('Error al obtener capacitaciones:', error);
      });
  }, []);

  const handleRowSelection = (selection) => {
    setSelectedUser(selection);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAssignCapacitaciones = (capacitacion) => {
    // Lógica para asignar capacitaciones a los usuarios seleccionados
    // Aquí puedes realizar la lógica para guardar la capacitación asignada a los usuarios seleccionados
    // Puedes usar el estado 'selectedUser' para obtener los usuarios seleccionados
    // y la capacitación pasada como argumento para asignarla a estos usuarios
    handleCloseDialog();
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
      width: 500,
      renderCell: (params) => (
        <div>
          <Button className="actions-button" variant="outlined" onClick={handleOpenDialog}>Asignar Capacitación</Button>
          <Button onClick={() => handleDelete(params.row.id, params.row.Nombre)} variant="outlined" color="error" startIcon={<DeleteIcon />}>Eliminar</Button>
        </div>
      ),
    },
  ];

  const usuariosFiltrados = data.filter(user => {
    return (
      (sedeSeleccionada === '' || user.Sede === sedeSeleccionada) &&
      (areaSeleccionada === '' || user.Area === areaSeleccionada) &&
      (estadoSeleccionado === '' || user.Status === estadoSeleccionado) &&
      (generoSeleccionado === '' || user.Tipo === generoSeleccionado) &&
      (numeroEmpleadoBuscado === '' || (user.Numero_Empleado && user.Numero_Empleado.toString().includes(numeroEmpleadoBuscado)))
    );
  });

  const usuariosConId = usuariosFiltrados.map((usuario, index) => {
    return { ...usuario, id: usuario._id || index + 1 };
  });

  return (
    <>
      <NarBar />
      <div className="v141_16">
        <div style={{ height: 400, width: '100%', marginTop: 100 }}>
          <DataGrid
            rows={usuariosConId}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
            onSelectionModelChange={handleRowSelection}
          />
        </div>
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Asignar Capacitaciones</DialogTitle>
        <DialogContent>
          <div>
            <h3>Capacitaciones Disponibles:</h3>
            <CatalogoCapacitaciones
              handleClose={handleCloseDialog}
              handleAsignarCapacitacion={handleAssignCapacitaciones}
              capacitaciones={capacitaciones} // Pasar capacitaciones como prop
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancelar</Button>
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
