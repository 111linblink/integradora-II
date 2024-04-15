import React, { useState, useEffect } from 'react';
import './Actividades.css';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import { Alert, Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
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
    Numero_Empleado: []
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [actividades, setActividades] = useState([]);
  const [sedes, setSedes] = useState([]);
  const [areas, setAreas] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [empleadosFiltrados, setEmpleadosFiltrados] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedActividadId, setSelectedActividadId] = useState("");
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    obtenerTodasLasActividades();
    obtenerTodosLosEmpleados();
  }, []);

  useEffect(() => {
    filtrarEmpleados();
  }, [formData.Sede, formData.Area, formData.Numero_Empleado]);

  const obtenerTodosLosEmpleados = async () => {
    try {
      const response = await Axios.get(`http://localhost:3000/usuarios/user`);
      const allEmpleados = response.data.data;
      setEmpleados(allEmpleados);
      // Obtener las sedes y áreas únicas de los empleados
      const uniqueSedes = Array.from(new Set(allEmpleados.map(empleado => empleado.Sede)));
      const uniqueAreas = Array.from(new Set(allEmpleados.map(empleado => empleado.Area)));
      setSedes(uniqueSedes);
      setAreas(uniqueAreas);
    } catch (error) {
      console.error('Error al obtener los empleados:', error.message);
      setEmpleados([]); 
      setSedes([]);
      setAreas([]);
    }
  };

  const obtenerTodasLasActividades = async () => {
    try {
      const data = await Axios.get(`http://localhost:3000/Actividad/actividades`);
      setActividades(data.data.data);
    } catch (error) {
      console.error('Error al obtener las actividades:', error.message);
      setActividades([]);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: id === "Numero_Empleado" ? [value] : value // Mantener los valores existentes si el campo es Numero_Empleado
    }));
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
      Numero_Empleado: []
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveChanges = async () => {
    try {
      const {
        nombre,
        descripcion,
        horaInicio,
        horaFinalizacion,
        diaInicio,
        diaFinalizacion,
        Area,
        Sede,
        Numero_Empleado
      } = formData;
  
      // Verificar si algún campo está vacío
      if (!nombre || !descripcion || !horaInicio || !horaFinalizacion || !diaInicio || !diaFinalizacion || !Area || !Sede || Numero_Empleado.length === 0) {
        setShowErrorAlert(true);
        setTimeout(() => {
          setShowErrorAlert(false);
        }, 2000);
        return;
      }
  
      const actividadData = {
        nombre,
        descripcion,
        horaInicio,
        horaFinalizacion,
        diaInicio,
        diaFinalizacion,
        Area,
        Sede,
        Numero_Empleado
      };
  
      if (selectedActividadId) {
        // Actualizar la actividad existente
        const actividadToUpdate = actividades.find(a => a._id === selectedActividadId);
        actividadData.Numero_Empleado = actividadToUpdate.Numero_Empleado.map(empleado => empleado.Numero_Empleado);
        await Axios.put(`http://localhost:3000/Actividad/actualizar_actividad/${selectedActividadId}`, actividadData);
      } else {
        // Crear una nueva actividad
        await Promise.all(Numero_Empleado.map(async (numeroEmpleado) => {
          const nuevaActividadData = {
            ...actividadData,
            Numero_Empleado: numeroEmpleado
          };
          await Axios.post('http://localhost:3000/Actividad/crear_actividad', nuevaActividadData);
        }));
      }
  
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
  
  
  
  

  const handleDelete = async (actividadId) => {
    try {
      await Axios.delete(`http://localhost:3000/Actividad/eliminar_actividad/${actividadId}`);
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

  const handleUpdate = (actividadId) => {
    const actividad = actividades.find(a => a._id === actividadId);
    console.log("Empleados de la actividad:", actividad.Numero_Empleado);
    setFormData({
      nombre: actividad.nombre,
      descripcion: actividad.descripcion,
      horaInicio: actividad.horaInicio,
      horaFinalizacion: actividad.horaFinalizacion,
      diaInicio: actividad.diaInicio,
      diaFinalizacion: actividad.diaFinalizacion,
      Area: actividad.Area,
      Sede: actividad.Sede,
      Numero_Empleado: actividad.Numero_Empleado.map(empleado => empleado._id) // aquí estás obteniendo solo los IDs
    });
    setSelectedActividadId(actividadId);
    setOpenDialog(true);
  };
  
  
  

  const filtrarEmpleados = () => {
    let empleadosFiltrados = empleados;
  
    if (formData.Sede) {
      empleadosFiltrados = empleadosFiltrados.filter(
        (empleado) => empleado.Sede === formData.Sede
      );
      // Obtener las áreas únicas de los empleados filtrados por la sede seleccionada
      const uniqueAreas = Array.from(new Set(empleadosFiltrados.map(empleado => empleado.Area)));
      setAreas(uniqueAreas);
    }
  
    console.log('Empleados después del filtro por sede:', empleadosFiltrados);
  
    if (formData.Area) {
      empleadosFiltrados = empleadosFiltrados.filter(
        (empleado) => empleado.Area === formData.Area
      );
    }
  
    console.log('Empleados después del filtro por área:', empleadosFiltrados);
  
    setEmpleadosFiltrados(empleadosFiltrados);
  };
  

  const rows = actividades.map((actividad) => ({
    id: actividad._id,
    nombre: actividad.nombre,
    descripcion: actividad.descripcion,
    horaInicio: actividad.horaInicio,
    horaFinalizacion: actividad.horaFinalizacion,
    diaInicio: new Date(actividad.diaInicio).toISOString().split('T')[0],
    diaFinalizacion: new Date(actividad.diaFinalizacion).toISOString().split('T')[0],
    Area: actividad.Area || '',
    Sede: actividad.Sede || '', 
    Numero_Empleado: actividad.Numero_Empleado || []
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
    { field: 'eliminar', headerName: 'Eliminar', width: 100, renderCell: (params) => (
      <Button onClick={() => handleDelete(params.row.id)} variant="contained" color="error">Eliminar</Button>
    )},    
    { field: 'actualizar', headerName: 'Actualizar', width: 120, renderCell: (params) => (<Button onClick={() => handleUpdate(params.row.id)} variant="contained" color="primary">Actualizar</Button>) },
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
            <h2 className="h2">Registrar Actividades</h2>
            <Button onClick={handleCreate} variant="contained" color="primary">Registrar Actividad</Button>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </div>
          </div>
        </div>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{selectedActividadId ? "Actualizar Actividad" : "Crear Nueva Actividad"}</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              id="nombre"
              label="Nombre"
              type="text"
              fullWidth
              value={formData.nombre}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="descripcion"
              label="Descripción"
              type="text"
              fullWidth
              value={formData.descripcion}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="horaInicio"
              label="Hora de inicio"
              type="time"
              fullWidth
              value={formData.horaInicio}
              onChange={handleChange}
              inputProps={{
                step: 300,
              }}
            />
            <TextField
              margin="dense"
              id="horaFinalizacion"
              label="Hora de finalización"
              type="time"
              fullWidth
              value={formData.horaFinalizacion}
              onChange={handleChange}
              inputProps={{
                step: 300,
              }}
            />
            <TextField
              margin="dense"
              id="diaInicio"
              label="Día de inicio"
              type="date"
              fullWidth
              value={formData.diaInicio}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="diaFinalizacion"
              label="Día de finalización"
              type="date"
              fullWidth
              value={formData.diaFinalizacion}
              onChange={handleChange}
            />
            {!selectedActividadId && (
              <>
                <FormControl fullWidth>
                  <InputLabel id="sede-label">Sede</InputLabel>
                  <Select
                    labelId="sede-label"
                    id="sede"
                    value={formData.Sede}
                    onChange={(e) => setFormData({ ...formData, Sede: e.target.value })}
                  >
                    {sedes.map((sede) => (
                      <MenuItem key={sede} value={sede}>{sede}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="area-label">Área</InputLabel>
                  <Select
                    labelId="area-label"
                    id="Area"
                    value={formData.Area}
                    onChange={(e) => setFormData({ ...formData, Area: e.target.value })}
                  >
                    {areas.map((area) => (
                      <MenuItem key={area} value={area}>{area}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}
            {selectedActividadId ? null : (
              <FormControl fullWidth>
                <InputLabel id="empleado-label">Empleado</InputLabel>
                <Select
                  labelId="empleado-label"
                  id="Numero_Empleado"
                  multiple
                  value={formData.Numero_Empleado}
                  onChange={(e) => setFormData({ ...formData, Numero_Empleado: e.target.value })}
                >
                  {empleadosFiltrados.map((empleado) => (
                    <MenuItem key={empleado.Numero_Empleado} value={empleado.Numero_Empleado}>
                      {`${empleado.Numero_Empleado}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button onClick={handleSaveChanges}>{selectedActividadId ? "Guardar Cambios" : "Crear"}</Button>
          </DialogActions>
        </Dialog>
        {showSuccessAlert && <Alert severity="success">Cambios guardados exitosamente</Alert>}
        {showErrorAlert && <Alert severity="error">Error al guardar cambios</Alert>}
      </div>
    </>
  );
};

export default Actividades;
