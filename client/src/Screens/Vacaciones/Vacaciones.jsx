import React, { useState, useEffect } from 'react';
import './Vacaciones.css';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import { Alert, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Axios from 'axios';
import NavbarEmpleado from '../NavBar-Empleado/navbarEmpleado';

const Vacaciones = () => {
  const [formData, setFormData] = useState({
    DiaIni: "",
    DiaFin: ""
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [vacaciones, setVacaciones] = useState([]);

  useEffect(() => {
    fetchVacaciones();
  }, []);

  const fetchVacaciones = async () => {
    try {
      const response = await Axios.get("http://localhost:3000/Vacaciones/solicitudes_vacaciones");
      if (response.data && Array.isArray(response.data.data)) {
        setVacaciones(response.data.data);
      } else {
        console.error('Error: El servidor no devolvió una matriz de vacaciones.');
        setVacaciones([]);
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
      fetchVacaciones(); // Actualiza la lista de solicitudes después de eliminar una
      setTimeout(() => {
        setShowSuccessAlert(false); // Oculta el mensaje después de 5 segundos
      }, 5000);
    } catch (error) {
      console.error('Error al eliminar la solicitud de vacaciones:', error.message);
      setShowErrorAlert(true);
      setShowSuccessAlert(false);
    }
  };

  const rows = vacaciones.map((vacacion, index) => ({
    id: vacacion._id,
    DiaIni: vacacion.DiaIni,
    DiaFin: vacacion.DiaFin,
    Estado: vacacion.Estado
  }));

  const columns = [
    { field: 'DiaIni', headerName: 'Primer Día', width: 150 },
    { field: 'DiaFin', headerName: 'Último Día', width: 150 },
    { field: 'Estado', headerName: 'Estado', width: 150 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 200,
      renderCell: (params) => (
        <div>
          <Button onClick={() => handleDelete(params.row.id)} variant="outlined" color="error" startIcon={<DeleteIcon />}>Eliminar</Button>
        </div>
      ),
    },
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const SolicitarVacaciones = async (event) => {
    event.preventDefault();
    const requiredFields = ['DiaIni', 'DiaFin'];
    const fieldsAreFilled = requiredFields.every(field => formData[field] !== "");
    if (!fieldsAreFilled) {
      setShowErrorAlert(true);
      setShowSuccessAlert(false);
      return;
    }
    try {
      await Axios.post("http://localhost:3000/Vacaciones/crear_solicitud_vacaciones", formData);
      setShowSuccessAlert(true);
      setShowErrorAlert(false);
      setFormData({
        DiaIni: "",
        DiaFin: ""
      });
      fetchVacaciones(); // Actualiza la lista de solicitudes después de crear una nueva
      setTimeout(() => {
        setShowSuccessAlert(false); // Oculta el mensaje después de 5 segundos
      }, 3000);
    } catch (error) {
      console.error('Error al crear la solicitud de vacaciones:', error.message);
      setShowErrorAlert(true);
      setShowSuccessAlert(false);
    }
  };

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
          <input
            className="tipoContrato"
            type="text"
            placeholder="   Tipo de contrato"
          />
          <input
            className="dias"
            type="text"
            placeholder="   Días"
          />
          <button className="solicitarContrato">Solicitar contrato</button>
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
              className="primerDia" // Nueva clase CSS para el primer día
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
              className="ultimoDia" // Nueva clase CSS para el último día
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
        <div className="alert-container">
          {showSuccessAlert && <Alert variant="filled" severity="success">El cambio se ha hecho correctamente</Alert>}
          {showErrorAlert && <Alert variant="filled" severity="error">Error</Alert>}
        </div>
      </div>
    </>
  );
};

export default Vacaciones;
