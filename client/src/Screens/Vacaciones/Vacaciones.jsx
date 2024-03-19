import React, { useState, useEffect } from 'react';
import './Vacaciones.css';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import { Alert, Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, NativeSelect } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Axios from 'axios';
import NavbarEmpleado from '../NavBar-Empleado/navbarEmpleado';

const Vacaciones = () => {
  const [formData, setFormData] = useState({
    DiaIni: "",
    DiaFin: "",
    tipoContrato: "",  
    horario: ""  
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [vacaciones, setVacaciones] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedVacationId, setSelectedVacationId] = useState("");
  const [contratos] = useState([
    { nombre: "5/2", horarios: ["7:00 – 15:00", "15:00 – 23:00", "23:00 – 7:00"] },
    { nombre: "1/2", horarios: ["7:00 – 7:00", "19:00 – 19:00"] },
    { nombre: "6/1", horarios: ["6:00 – 12:00", "12:00 – 18:00", "18:00 - 23:59", "0:00 – 6:00"] }
  ]);

  useEffect(() => {
    fetchVacaciones();
    fetchContratos();
  }, []);

  const fetchVacaciones = async () => {
    try {
      const response = await Axios.get("http://localhost:3000/Vacaciones/solicitudes_vacaciones");
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
    } catch (error) {
      console.error('Error al obtener las peticiones de vacaciones:', error.message);
      setVacaciones([]);
    }
  };

  const fetchContratos = async () => {
    try {
      const response = await Axios.get("http://localhost:3000/contratos"); 
      if (response.data && Array.isArray(response.data.data)) {
      } else {
        console.error('Error: El servidor no devolvió una matriz de contratos.');
      }
    } catch (error) {
      console.error('Error al obtener los contratos:', error.message);
    }
  };

  const SolicitarContrato = async () => {
    const requiredFields = ['tipoContrato', 'horario'];
    const fieldsAreFilled = requiredFields.every(field => formData[field] !== "");
    if (!fieldsAreFilled) {
      setShowErrorAlert(true);
      setShowSuccessAlert(false);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 2000);
      return;
    }
    try {
      await Axios.post("http://localhost:3000/Vacaciones/crear_contrato");
      setShowSuccessAlert(true);
      setShowErrorAlert(false);
      setFormData({
        ...formData,
        tipoContrato: "",
        horario: ""  
      });
      fetchContratos(); 
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 2000);
    } catch (error) {
      console.error('Error al crear la solicitud de contrato:', error.message);
      setShowErrorAlert(true);
      setShowSuccessAlert(false);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 2000);
    }
  };
  

  const SolicitarVacaciones = async () => {
    const today = new Date().toISOString().split('T')[0];
    if (formData.DiaIni < today || formData.DiaFin < today || formData.DiaFin < formData.DiaIni) {
      setShowErrorAlert(true);
      setShowSuccessAlert(false);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 2000);
      return;
    }
  
    const requiredFields = ['DiaIni', 'DiaFin'];
    const fieldsAreFilled = requiredFields.every(field => formData[field] !== "");
    if (!fieldsAreFilled) {
      setShowErrorAlert(true);
      setShowSuccessAlert(false);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 2000);
      return;
    }
    try {
      const nuevaSolicitud = { ...formData, Estado: "En proceso" };
      await Axios.post("http://localhost:3000/Vacaciones/crear_solicitud_vacaciones", nuevaSolicitud);
      setShowSuccessAlert(true);
      setShowErrorAlert(false);
      setFormData({
        ...formData,
        DiaIni: "",
        DiaFin: ""
      });
      fetchVacaciones();
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 2000);
    } catch (error) {
      console.error('Error al crear la solicitud de vacaciones:', error.message);
      setShowErrorAlert(true);
      setShowSuccessAlert(false);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 2000);
    }
  };

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`http://localhost:3000/Vacaciones/eliminar_solicitud_vacaciones/${id}`);
      setShowSuccessAlert(true);
      setShowErrorAlert(false);
      fetchVacaciones();
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
    if (estado === "Aprobada" || estado === "Rechazada") {
      return;
    }
    setOpenDialog(true);
    setSelectedVacationId(id);
    setFormData({
      ...formData,
      DiaIniDialog: diaIni,
      DiaFinDialog: diaFin
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "tipoContrato") {
      setFormData({
        ...formData,
        [id]: value,
        horario: ""  
      });
    } else if (id === "horario") {
      setFormData({
        ...formData,
        [id]: value
      });
    } else {
      setFormData({
        ...formData,
        [id]: value
      });
    }
  };

  const handleSaveChanges = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      if (formData.DiaIniDialog < today || formData.DiaFinDialog < today || formData.DiaFinDialog < formData.DiaIniDialog) {
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
      fetchVacaciones();
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

  const rows = vacaciones.map((vacacion, index) => ({
    id: vacacion._id,
    DiaIni: vacacion.DiaIni,
    DiaFin: vacacion.DiaFin,
    Estado: vacacion.Estado
  }));

  const columns = [
    { field: 'DiaIni', headerName: 'Primer Día', width: 110 },
    { field: 'DiaFin', headerName: 'Último Día', width: 110 },
    { field: 'Estado', headerName: 'Estado', width: 120 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 300,
      renderCell: (params) => (
        <div>
          {(params.row.Estado !== "Aprobada" && params.row.Estado !== "Rechazada") && (
            <>
              <Button onClick={() => handleDelete(params.row.id)} variant="outlined" color="error" startIcon={<DeleteIcon />}>Eliminar</Button>
              <Button onClick={() => handleUpdate(params.row.id, params.row.DiaIni, params.row.DiaFin, params.row.Estado)} variant="outlined" color="primary">Actualizar</Button>
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
      <NavbarEmpleado />
        <div className="rectangulo1">
          <img className="usuario" src="../assets/Usuario.png" alt="Usuario"/>
          <div className="nombreEmpleado">Nombre de empleado</div>
          <FormControl className="tipoContrato">
            <InputLabel htmlFor="tipoContrato">Tipo de contrato</InputLabel>
            <NativeSelect
              id="tipoContrato"
              value={formData.tipoContrato}
              onChange={handleChange}
            >
              <option aria-label="None" value="" />
              {contratos.map((contrato, index) => (
                <option key={index} value={contrato.nombre}>{contrato.nombre}</option>
              ))}
            </NativeSelect>
          </FormControl>
          <FormControl className="horario">
            <InputLabel htmlFor="horario">Horarios</InputLabel>
            <NativeSelect
              id="horario"
              value={formData.horario}
              onChange={handleChange}
            >
              <option aria-label="None" value="" />
              {contratos.find(contrato => contrato.nombre === formData.tipoContrato)?.horarios.map((horario, index) => (
                <option key={index} value={horario}>{horario}</option>
              ))}
            </NativeSelect>
          </FormControl>
          <button className="solicitarContrato" onClick={SolicitarContrato}>Solicitar contrato</button>
        </div>
        <div className="rectangulo2">
          <div className="textoCalendario">Solicitudes</div>
          <div className="rectanguloInterior">
            <div className="solicitarVacaciones">Solicitar vacaciones</div>
            <TextField
              id="DiaIni"
              label="Primer día"
              type="date"
              value={formData.DiaIni}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              className="primerDia"
            />
            <TextField
              id="DiaFin"
              label="Último día"
              type="date"
              value={formData.DiaFin}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              className="ultimoDia"
            />
            <button className="solicitar" onClick={SolicitarVacaciones}>Solicitar</button>
          </div>
        </div>
        <div style={{ height: '55%', 
          width: '45%', 
          position: 'absolute',
          top: '35%',
          left: '30%'
           }}>
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
            <Button onClick={handleCloseDialog} color="secondary">Cancelar</Button>
            <Button onClick={handleSaveChanges} color="primary">Guardar cambios</Button>
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

export default Vacaciones;
