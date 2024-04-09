import React, { useState, useEffect } from 'react';
import './SoliContratos.css';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import { Alert, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Axios from 'axios';
import NavbarEmpleado from '../NavBar-Empleado/navbarEmpleado';
import { useNavigate } from 'react-router-dom';

const SoliContratos = () => {
  const [formData, setFormData] = useState({
    Tipo: "",
    Turno: ""
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [contratos, setContratos] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedContratoId, setSelectedContratoId] = useState("");
  const [userData, setUserData] = useState(null); 

  const navigate = useNavigate();

  useEffect(() => {
    obtenerDatosUsuario();
    obtenerSolicitudesContratos();
  }, []);

  const obtenerDatosUsuario = () => {
    const userDataFromStorage = sessionStorage.getItem('userData');
    if (userDataFromStorage) {
      setUserData(JSON.parse(userDataFromStorage));
    }
  };

  const obtenerSolicitudesContratos = async () => {
    try {
      const userDataFromStorage = sessionStorage.getItem('userData');
      if (userDataFromStorage) {
        const userData = JSON.parse(userDataFromStorage);
        const numeroEmpleado = userData.numero; // Obtener el número de empleado del usuario
        const response = await Axios.get(`http://localhost:3000/SoliContrato/obtener_contratos/${numeroEmpleado}`);
        if (response.data && Array.isArray(response.data.data)) {
          setContratos(response.data.data);
        } else {
          console.error('Error: El servidor no devolvió una matriz de contratos.');
          setContratos([]);
        }
      }
    } catch (error) {
      console.error('Error al obtener las peticiones de contratos:', error.message);
      setContratos([]);
    }
  };
  
  

  const SolicitarContrato = async () => {
    try {
      const userDataFromStorage = sessionStorage.getItem('userData');
      if (userDataFromStorage) {
        const userData = JSON.parse(userDataFromStorage);
        const nuevaSolicitud = { ...formData, Estado: "Procesando", Numero_Empleado: userData.numero, Nombre: userData.nombre, Sede: userData.sede, Area: userData.area };
        await Axios.post("http://localhost:3000/SoliContrato/crear_contratos", nuevaSolicitud);
        setShowSuccessAlert(true);
        setShowErrorAlert(false);
        setFormData({ Tipo: "", Turno: "" });
        obtenerSolicitudesContratos();
        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 2000);
      } else {
        throw new Error('Error: No se pudo obtener el número de empleado del sessionStorage.');
      }
    } catch (error) {
      console.error('Error al crear la solicitud de contrato:', error.message);
      setShowErrorAlert(true);
      setShowSuccessAlert(false);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 2000);
    }
  };

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`http://localhost:3000/SoliContrato/eliminar_contrato/${id}`);
      setShowSuccessAlert(true);
      setShowErrorAlert(false);
      obtenerSolicitudesContratos();
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 2000);
    } catch (error) {
      console.error('Error al eliminar la solicitud de contrato:', error.message);
      setShowErrorAlert(true);
      setShowSuccessAlert(false);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 2000);
    }
  };

  const handleUpdate = (id, tipo, turno, estado) => {
    if (estado === "Aprobada" || estado === "Denegada") {
      return;
    }
    setOpenDialog(true);
    setSelectedContratoId(id);
    setFormData({ Tipo: tipo, Turno: turno });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const updatedContrato = { Tipo: formData.Tipo, Turno: formData.Turno };
      await Axios.put(`http://localhost:3000/SoliContrato/actualizar_contrato/${selectedContratoId}`, updatedContrato);
      setShowSuccessAlert(true);
      setShowErrorAlert(false);
      handleCloseDialog();
      obtenerSolicitudesContratos();
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

  const rows = contratos.map((contrato) => ({
    id: contrato._id,
    Tipo: contrato.Tipo,
    Turno: contrato.Turno,
    Estado: contrato.Estado,
    NumeroEmpleado: contrato.Numero_Empleado,
    Nombre: contrato.Nombre,
    Sede: contrato.Sede,
    Area: contrato.Area
  }));

  const columns = [
    { field: 'Tipo', headerName: 'Tipo', width: 100 },
    { field: 'Turno', headerName: 'Turno', width: 100 },
    { field: 'Estado', headerName: 'Estado', width: 100 },
    { field: 'NumeroEmpleado', headerName: 'Número de Empleado', width: 160 }, // Mostrar el número de empleado
    { field: 'Nombre', headerName: 'Nombre', width: 160 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 300,
      renderCell: (params) => (
        <div>
          {(params.row.Estado !== "Aprobada" && params.row.Estado !== "Denegada") && (
            <>
              <Button onClick={() => handleDelete(params.row.id)} variant="outlined" color="error" startIcon={<DeleteIcon />}>Eliminar</Button>
              <Button onClick={() => handleUpdate(params.row.id, params.row.Tipo, params.row.Turno, params.row.Estado)} variant="outlined" color="primary">Actualizar</Button>
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
        <div className="rectangulo2">
          <div className="textoCalendario">Solicitudes</div>
          <div className="rectanguloInt">
            <div className="texContrato">Solicitar contrato</div>
            <TextField
              id="Tipo"
              label="Tipo"
              value={formData.Tipo}
              onChange={handleChange}
              className="tipocontrato"
            />
            <TextField
              id="Turno"
              label="Turno"
              value={formData.Turno}
              onChange={handleChange}
              className="turnocontrato"
            />
            <button className="solicitar" onClick={SolicitarContrato}>Solicitar</button>
          </div>
        </div>
        <div style={{ height: '55%', width: '71%', position: 'absolute', top: '35%', left: '3%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} />
        </div>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Modificar contrato</DialogTitle>
          <DialogContent>
            <TextField
              id="Tipo"
              label="Tipo"
              value={formData.Tipo}
              onChange={handleChange}
              className="tipocontratoaaa"
            />
            <TextField
              id="Turno"
              label="Turno"
              value={formData.Turno}
              onChange={handleChange}
              className="turnocontratoaaa"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button onClick={handleSaveChanges}>Guardar cambios</Button>
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

export default SoliContratos;
