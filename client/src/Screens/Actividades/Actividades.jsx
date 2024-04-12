import React, { useState, useEffect } from 'react';
import './Actividades.css';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import { Alert, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Axios from 'axios';
import NarBar from '../NarBar.js/NarBar';
import { useNavigate } from 'react-router-dom';

const Actividades = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    horaInicio: '',
    horaFinalizacion: '',
    diaInicio: '',
    diaFinalizacion: '',
    Area: '',
    Sede: '',
    Numero_Empleado: ''
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [actividades, setActividades] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedActividadId, setSelectedActividadId] = useState("");
  const [userData, setUserData] = useState(null); 

  const navigate = useNavigate();

  useEffect(() => {
    const obtenerDatosUsuario = () => {
      const userDataFromStorage = sessionStorage.getItem('userData');
      if (userDataFromStorage) {
        setUserData(JSON.parse(userDataFromStorage));
      }
    };

    obtenerDatosUsuario();
    obtenerTodasLasActividades();
  }, []);

  const obtenerTodasLasActividades = async () => {
    try {
      const data = await Axios.get(`http://localhost:3000/Actividad/actividades`);
      setActividades(data.data.data);
    } catch (error) {
      console.error('Error al obtener las actividades:', error.message);
      setActividades([]);
    }
  };

  const crearActividad = async () => {
    try {
      const response = await Axios.post("http://localhost:3000/Actividad/crear_actividad", formData);
      setFormData({
        nombre: '',
        descripcion: '',
        horaInicio: '',
        horaFinalizacion: '',
        diaInicio: '',
        diaFinalizacion: '',
        Area: '',
        Sede: '',
        Numero_Empleado: ''
      });
      obtenerTodasLasActividades();
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 2000);
    } catch (error) {
      console.error('Error al crear la actividad:', error.message);
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 2000);
    }
  };

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`http://localhost:3000/Actividad/eliminar_actividad/${id}`);
      setShowSuccessAlert(true);
      obtenerTodasLasActividades();
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 2000);
    } catch (error) {
      console.error('Error al eliminar la actividad:', error.message);
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 2000);
    }
  };

  const handleCreate = () => {
    setOpenDialog(true);
    setSelectedActividadId("");
    setFormData({
      nombre: '',
      descripcion: '',
      horaInicio: '',
      horaFinalizacion: '',
      diaInicio: '',
      diaFinalizacion: '',
      Area: '',
      Sede: '',
      Numero_Empleado: ''
    });
  };

  const handleUpdate = (id) => {
    setOpenDialog(true);
    setSelectedActividadId(id);
    const actividad = actividades.find(act => act._id === id);
    setFormData({
      nombre: actividad.nombre,
      descripcion: actividad.descripcion,
      horaInicio: actividad.horaInicio,
      horaFinalizacion: actividad.horaFinalizacion,
      diaInicio: actividad.diaInicio,
      diaFinalizacion: actividad.diaFinalizacion,
      Area: actividad.Area,
      Sede: actividad.Sede,
      Numero_Empleado: actividad.Numero_Empleado
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSaveChanges = async () => {
    try {
      await Axios.put(`http://localhost:3000/Actividad/actualizar_actividad/${selectedActividadId}`, formData);
      setShowSuccessAlert(true);
      obtenerTodasLasActividades();
      handleCloseDialog();
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 2000);
    } catch (error) {
      console.error('Error al guardar cambios:', error.message);
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 2000);
    }
  };

  const rows = actividades.map((actividad) => ({
    id: actividad._id,
    nombre: actividad.nombre,
    descripcion: actividad.descripcion,
    horaInicio: actividad.horaInicio,
    horaFinalizacion: actividad.horaFinalizacion,
    diaInicio: new Date(actividad.diaInicio).toISOString(), // Convertir a formato ISO 8601
    diaFinalizacion: new Date(actividad.diaFinalizacion).toISOString(), // Convertir a formato ISO 8601
    Area: actividad.Area || '',
    Sede: actividad.Sede || '',
    Numero_Empleado: actividad.Numero_Empleado || 0
  }));

  const columns = [
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    { field: 'descripcion', headerName: 'Descripción', width: 200 },
    { field: 'horaInicio', headerName: 'Hora de inicio', width: 150 },
    { field: 'horaFinalizacion', headerName: 'Hora de finalización', width: 180 },
    { field: 'diaInicio', headerName: 'Día de inicio', width: 150 },
    { field: 'diaFinalizacion', headerName: 'Día de finalización', width: 185 },
    { field: 'Area', headerName: 'Área', width: 150 },
    { field: 'Sede', headerName: 'Sede', width: 150 },
    { field: 'Numero_Empleado', headerName: 'Número de Empleado', width: 200 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 300,
      renderCell: (params) => (
        <div>
          <Button onClick={() => handleDelete(params.row.id)} variant="contained" color="error" startIcon={<DeleteIcon />}>Eliminar</Button>
          <Button onClick={() => handleUpdate(params.row.id)} variant="contained" color="primary">Actualizar</Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: '#0c789c',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }} className="root">
        <NarBar/>
        <div className="rectangulo2">
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <div className="textoCalendario">Actividades</div>
            <Button
              className='crearactividad'
              onClick={handleCreate}
              variant="contained"
              color="primary"
              style={{ marginTop: '20px' }}
            >
              Crear Nueva Actividad
            </Button>
          </div>
        </div>
        <div style={{ height: '55%', width: '94%', position: 'absolute', top: '35%', left: '3%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} />
        </div>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{selectedActividadId ? 'Actualizar Actividad' : 'Crear Nueva Actividad'}</DialogTitle>
          <DialogContent>
            <TextField
              id="nombre"
              label="Nombre"
              type="text"
              value={formData.nombre}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="descripcion"
              label="Descripción"
              type="text"
              value={formData.descripcion}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="horaInicio"
              label="Hora de inicio"
              type="time"
              value={formData.horaInicio}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
            <TextField
              id="horaFinalizacion"
              label="Hora de finalización"
              type="time"
              value={formData.horaFinalizacion}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
            <TextField
              id="diaInicio"
              label="Día de inicio"
              type="date"
              value={formData.diaInicio}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="diaFinalizacion"
              label="Día de finalización"
              type="date"
              value={formData.diaFinalizacion}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="Area"
              label="Área"
              type="text"
              value={formData.Area}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="Sede"
              label="Sede"
              type="text"
              value={formData.Sede}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="Numero_Empleado"
              label="Número de Empleado"
              type="number"
              value={formData.Numero_Empleado}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button onClick={selectedActividadId ? handleSaveChanges : crearActividad}>
              {selectedActividadId ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogActions>
        </Dialog>
        <div className="alert-container">
          {showSuccessAlert && <Alert variant="filled" severity="success">El cambio se ha hecho correctamente</Alert>}
          {showErrorAlert && <Alert variant="filled" severity="error">Error</Alert>}
        </div>
      </div>
    </>
  );
};

export default Actividades;
