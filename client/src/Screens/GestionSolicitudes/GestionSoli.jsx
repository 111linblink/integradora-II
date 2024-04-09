import React, { useState, useEffect } from 'react';
import './GestionSoli.css';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Axios from 'axios';
import NarBar from '../NarBar.js/NarBar';

const GestionSoli = () => {
  const [formData, setFormData] = useState({
    DiaIniDialog: "",
    DiaFinDialog: "",
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [vacaciones, setVacaciones] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedVacationId, setSelectedVacationId] = useState("");
  const [userData, setUserData] = useState(null);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false); // Estado para abrir/cerrar el diálogo de comentarios
  const [statusSeleccionado, setStatusSeleccionado] = useState('');


  useEffect(() => {
    const obtenerDatosUsuario = () => {
      const userDataFromStorage = sessionStorage.getItem('userData');
      if (userDataFromStorage) {
        setUserData(JSON.parse(userDataFromStorage));
      }
    };

    obtenerDatosUsuario();
    obtenerSolicitudesVacaciones();
  }, []);

  const obtenerSolicitudesVacaciones = async () => {
    try {
      const userDataFromStorage = sessionStorage.getItem('userData');
      if (userDataFromStorage) {
        const userData = JSON.parse(userDataFromStorage);
        const numeroEmpleado = userData.numero;
        const response = await Axios.get(`http://localhost:3000/Vacaciones/solicitudes_vacaciones`);
        if (response.data && Array.isArray(response.data.data)) {
          const formattedVacaciones = response.data.data.map(vacacion => ({
            ...vacacion,
            DiaIni: vacacion.DiaIni.substring(0, 10),
            DiaFin: vacacion.DiaFin.substring(0, 10)
          }));
          setVacaciones(formattedVacaciones);
        } else {
          console.error('Error: El servidor no devolvió una matriz de vacaciones.');
          setVacaciones([]);
        }
      }
    } catch (error) {
      console.error('Error al obtener las peticiones de vacaciones:', error.message);
      setVacaciones([]);
    }
  };  

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`http://localhost:3000/Vacaciones/eliminar_solicitud_vacaciones/${id}`);
      setShowSuccessAlert(true);
      setShowErrorAlert(false);
      obtenerSolicitudesVacaciones();
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 2000);
    } catch (error) {
      console.error('Error al eliminar la solicitud de vacaciones:', error.message);
      setShowErrorAlert(true);
      setShowSuccessAlert(false);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 2000);
    }
  };

  const handleUpdate = (id, diaIni, diaFin, estado) => {
    if (estado === "Aprobada" || estado === "Denegada") {
      return;
    }
    setOpenDialog(true);
    setSelectedVacationId(id);
    setFormData({
      DiaIniDialog: diaIni,
      DiaFinDialog: diaFin
    });
  };

  const handleStatusChange = (event) => {
    setStatusSeleccionado(event.target.value);
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

  const handleCommentsChange = (e) => { // Manejar el cambio en el campo de comentarios
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSaveChanges = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      if (formData.DiaIniDialog <= today || formData.DiaFinDialog <= today || formData.DiaFinDialog < formData.DiaIniDialog) {
        setShowErrorAlert(true);
        setShowSuccessAlert(false);
        setTimeout(() => {
          setShowErrorAlert(false);
        }, 2000);
        return;
      }

      const updatedVacation = { DiaIni: formData.DiaIniDialog, DiaFin: formData.DiaFinDialog };
      await Axios.put(`http://localhost:3000/Vacaciones/actualizar_solicitud_vacaciones/${selectedVacationId}`, updatedVacation);
      setShowSuccessAlert(true);
      setShowErrorAlert(false);
      handleCloseDialog();
      obtenerSolicitudesVacaciones();
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 2000);
    } catch (error) {
      console.error('Error al guardar cambios:', error.message);
      setShowErrorAlert(true);
      setShowSuccessAlert(false);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 2000);
    }
  };

  const handleAccept = async (id) => {
    try {
      await Axios.put(`http://localhost:3000/Vacaciones/actualizar_estado_solicitud/${id}`, { Estado: "Aprobada" });
      setShowSuccessAlert(true);
      setShowErrorAlert(false);
      obtenerSolicitudesVacaciones();
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 2000);
    } catch (error) {
      console.error('Error al aceptar la solicitud de vacaciones:', error.message);
      setShowErrorAlert(true);
      setShowSuccessAlert(false);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 2000);
    }
  };

  const handleReject = async (id) => {
    try {
      await Axios.put(`http://localhost:3000/Vacaciones/actualizar_estado_solicitud/${id}`, { Estado: "Denegada" });
      setShowSuccessAlert(true);
      setShowErrorAlert(false);
      obtenerSolicitudesVacaciones();
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 2000);
    } catch (error) {
      console.error('Error al rechazar la solicitud de vacaciones:', error.message);
      setShowErrorAlert(true);
      setShowSuccessAlert(false);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 2000);
    }
  };

  const handleAddComment = async () => {
    try {
      const response = await Axios.put(`http://localhost:3000/Vacaciones/agregar_comentario/${userData.numero}`, { Comentarios: formData.Comentarios });
      // Verificar si la solicitud fue exitosa antes de actualizar la lista y cerrar el diálogo
      if (response.data.success) {
        obtenerSolicitudesVacaciones(); 
        setCommentDialogOpen(false); 
        console.log('Comentario agregado exitosamente:', response.data.message);
      } else {
        console.error('Error al agregar el comentario:', response.data.message);
        // Aquí podrías mostrar alguna notificación o mensaje de error si lo deseas
      }
    } catch (error) {
      console.error('Error al agregar el comentario:', error.message);
      // Aquí podrías mostrar alguna notificación o mensaje de error si lo deseas
    }
  };
  

  const rows = vacaciones
  .filter(vacacion => {
    if (statusSeleccionado === '') {
      return true;
    }
    return vacacion.Estado === statusSeleccionado;
  })
  .map((vacacion) => ({
    id: vacacion._id,
    DiaIni: vacacion.DiaIni.substring(0, 10),
    DiaFin: vacacion.DiaFin.substring(0, 10),
    Estado: vacacion.Estado,
    NumeroEmpleado: vacacion.Numero_Empleado,
    Comentarios: vacacion.Comentarios
  }));


  const columns = [
    { field: 'DiaIni', headerName: 'Primer Día', width: 110 },
    { field: 'DiaFin', headerName: 'Último Día', width: 110 },
    { field: 'Estado', headerName: 'Estado', width: 120 },
    { field: 'NumeroEmpleado', headerName: 'Número de Empleado', width: 180 },
    { field: 'Comentarios', headerName: 'Comentarios', width: 190},
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 510,
      renderCell: (params) => (
        <div>
          {(params.row.Estado !== "Aprobada" && params.row.Estado !== "Denegada") && (
            <>
              <Button onClick={() => handleAccept(params.row.id)} variant="outlined" color="success">Aceptar</Button>
              <Button onClick={() => handleReject(params.row.id)} variant="outlined" color="error">Rechazar</Button>
              <Button onClick={() => setCommentDialogOpen(true)} variant="outlined" color="primary">Agregar Comentario</Button> 
            </>
          )}
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
        <NarBar />
        <div className="rect2">
          <div className="textoCalendario">Gestión de Solicitudes</div>
        </div>
        <select className="v141_777 v141_779" value={statusSeleccionado} onChange={handleStatusChange}>
          <option value=''>Seleccione un Estado</option>
          <option value="Aprobada">Aprobada</option>
          <option value="Denegada">Denegada</option>
          <option value="Procesando">En proceso</option>
        </select>

        <div style={{ height: '55%', width: '85%', position: 'absolute', top: '35%', left: '8%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} />
        </div>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Modificar fechas</DialogTitle>
          <DialogContent>
            <TextField
              id="DiaIniDialog"
              label="Primer día"
              type="date"
              value={formData.DiaIniDialog}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="DiaFinDialog"
              label="Último día"
              type="date"
              value={formData.DiaFinDialog}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button onClick={handleSaveChanges}>Guardar cambios</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={commentDialogOpen} onClose={() => setCommentDialogOpen(false)}>
          <DialogTitle>Agregar Comentario</DialogTitle>
          <DialogContent>
            <TextField
              id="Comentarios"
              label="Comentarios"
              multiline
              rows={4}
              value={formData.Comentarios}
              onChange={handleCommentsChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCommentDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleAddComment}>Enviar</Button>
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

export default GestionSoli;
