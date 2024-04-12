import React, { useEffect, useState } from 'react';
import NarBar from '../NarBar.js/NarBar';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
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
  const [assignedCapacitaciones, setAssignedCapacitaciones] = useState([]);
  const [assignmentAlert, setAssignmentAlert] = useState(false);
  const [assignedCapacitacionName, setAssignedCapacitacionName] = useState('');
  const [nombreSedeBuscado, setNombreSedeBuscado] = useState("");
  const [sedesAreas, setSedesAreas] = useState([]);
  const [areasSeleccionadas, setAreasSeleccionadas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/usuarios/user')
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
    axios.get('http://localhost:3000/capacitaciones/capacitaciones')
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
    
    // Cargar sedes y áreas
    axios.get('http://localhost:3000/sedesAreas')
      .then(response => {
        setSedesAreas(response.data);
      })
      .catch(error => {
        console.error('Error al obtener sedes y áreas:', error);
      });
  }, []);

  useEffect(() => {
    // Lógica para cargar las capacitaciones asignadas al usuario seleccionado
    if (selectedUser) {
      axios.get(`http://localhost:3000/asignacion/capacitaciones/nombre/${selectedUser.Nombre}`) // Cambia la ruta para buscar por nombre de usuario
        .then(response => {
          setAssignedCapacitaciones(response.data.data);
        })
        .catch(error => {
          console.error('Error al obtener las capacitaciones asignadas:', error);
        });
    }
  }, [selectedUser]);

  const handleRowSelection = (selection) => {
    setSelectedUser(selection);
    console.log(selection);
  };
  
  const handleCapacitacionSelection = (selection) => {
    const capacitacionSeleccionada = capacitaciones.find(capacitacion => capacitacion.id === selection);
    setSelectedCapacitacion(capacitacionSeleccionada);
  };

  const handleNombreSedeChange = (event) => {
    const nombreSede = event.target.value;
    setNombreSedeBuscado(nombreSede);
  };  

  const filteredData = data.filter(usuario => {
    return usuario.Sede.toLowerCase().includes(nombreSedeBuscado.toLowerCase());
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAssignCapacitaciones = () => {
    if (!selectedUser || !selectedCapacitacion) {
      console.error('No se han seleccionado usuarios o capacitaciones');
      return;
    }

    const asignacionData = {
      Nombre: selectedUser.Nombre,
      Area: selectedUser.Area,
      Sede: selectedUser.Sede,
      Numero_Empleado: selectedUser.Numero_Empleado,
      Actividad: {
        NombreActividad: selectedCapacitacion.NombreCapacitacion,
        FechaInicio: selectedCapacitacion.FechaInicio,
        FechaFin: selectedCapacitacion.FechaFin,
        Descripcion: selectedCapacitacion.Descripcion
      }
    };

    axios.post('http://localhost:3000/asignacion/asignacion', asignacionData)
      .then(response => {
        console.log('Asignación guardada:', response.data);
        setAssignedCapacitacionName(selectedCapacitacion.Nombre);
        setAssignmentAlert(true);
        // Aquí puedes manejar la lógica después de guardar la asignación
      })
      .catch(error => {
        console.error('Error al guardar la asignación:', error);
      });
  };
  
  const handleViewAssignedCapacitaciones = () => {
    // Lógica para obtener y visualizar las capacitaciones asignadas al usuario seleccionado
    if (!selectedUser) {
      console.error('No se ha seleccionado un usuario');
      return;
    }

    axios.get(`http://localhost:3000/asignacion/capacitaciones/nombre/${selectedUser.Nombre}`) // Cambia la ruta para buscar por nombre de usuario
      .then(response => {
        console.log('Capacitaciones asignadas:', response.data);
        // Aquí puedes manejar la visualización de las capacitaciones asignadas
      })
      .catch(error => {
        console.error('Error al obtener las capacitaciones asignadas:', error);
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
      width: 340,
      renderCell: (params) => (
        <div>
          <Button className="actions-button" variant="outlined" onClick={() => handleRowSelection(params.row)}>Seleccionar</Button>
        </div>
      ),  
    },
  ];

  return (
    <>
      <NarBar />
      <div className="v141_16">
        <div style={{ height: 400, width: '100%', marginTop: 100 }}>
          <input type="text" value={nombreSedeBuscado} onChange={handleNombreSedeChange} placeholder="Buscar Nombre de Sede" className='v141_18 ' style={{ left: 940, top: -67 }} />
          <DataGrid
            rows={filteredData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            onCellClick={(params) => handleRowSelection(params.row)}
          />
        </div>
        <Button className="actions-button" variant="outlined" style={{left: 1200, top: -465}} onClick={handleOpenDialog} disabled={!selectedUser}>Asignar Capacitación</Button>
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

      <Snackbar open={assignmentAlert} autoHideDuration={6000} onClose={() => setAssignmentAlert(false)}>
        <MuiAlert onClose={() => setAssignmentAlert(false)} severity="success" sx={{ width: '100%' }}>
          Se le ha asignado la capacitación "{assignedCapacitacionName}" al empleado seleccionado.
        </MuiAlert>
      </Snackbar>
      

      {/* Lista o tabla de capacitaciones asignadas */}
      {assignedCapacitaciones.length > 0 && (
        <div>
          <h2>Capacitaciones Asignadas</h2>
          <ul>
            {assignedCapacitaciones.map(capacitacion => (
              <li key={capacitacion._id}>{capacitacion.Nombre}</li>
            ))}
          </ul>
        </div>
      )}
        <div className="AgregarNuevoEmpleado" style={{ width: 540, height: 37, left: 60, top: 176, position: 'absolute', color: 'black', fontSize: 30, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>
          Asignación de capacitaciones
        </div>
    </>
  );
};

export default Capavisualizar;
