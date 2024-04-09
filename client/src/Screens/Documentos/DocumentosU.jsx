import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NarBar from '../NarBar.js/NarBar';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Alert, Button } from '@mui/material';

const DocumentosU = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    Nombre: '',
    Tipo: '',
    Folio: '',
    Caducidad: '',
    DocumentoFile: null,
    URL: ''
  });

  const [documentosList, setDocumentosList] = useState([]);
  const [userData, setUserData] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/usuarios/user/${id}`);
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };
    fetchData();
  }, [id]);

  const fetchDocumentos = async () => {
    try {
      if (!userData) {
        console.error('Error: userData is null');
        return;
      }
      const response = await axios.get(`http://localhost:3000/documentos/documentos/${userData.Numero_Empleado}`);
      setDocumentosList(response.data);
    } catch (error) {
      console.error('Error al obtener documentos:', error);
    }
  };

  useEffect(() => {
    if (userData) {
      fetchDocumentos();
    }
  }, [userData]);

  const handleDocumentoChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      DocumentoFile: file,
      Nombre: file.name, // Establecer el nombre del archivo
      URL: URL.createObjectURL(file) // Establecer la URL del archivo
    });
  };

  const handleDocumentoSubmit = async () => {
    try {
      if (!userData) {
        console.error('Error: userData is null');
        return;
      }

      // Aquí puedes enviar los datos del documento al servidor sin subir el archivo
      await axios.post('http://localhost:3000/documentos/subir_documentos', {
        Nombre: formData.Nombre,
        Tipo: formData.Tipo,
        Folio: formData.Folio,
        Caducidad: formData.Caducidad,
        Numero_Empleado: userData.Numero_Empleado,
        URL: formData.URL // Enviar la URL al servidor
      });

      console.log('Documento registrado correctamente');
      fetchDocumentos();
      setShowSuccessAlert(true);
    } catch (error) {
      console.error('Error al registrar documento:', error);
      setShowErrorAlert(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEliminarDocumento = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/documentos/eliminar/${id}`);
      fetchDocumentos();
      console.log('Documento eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar documento:', error);
    }
  };

  const columns = [
    { field: 'Nombre', headerName: 'Nombre', width: 200 },
    { field: 'Tipo', headerName: 'Tipo', width: 130 },
    { field: 'Folio', headerName: 'Folio', width: 130 },
    { field: 'Caducidad', headerName: 'Caducidad', width: 130 },
    {
      field: 'URL',
      headerName: 'URL del Archivo',
      width: 200,
      renderCell: (params) => (
        <Button variant="contained" color="primary" href={params.row.URL} target="_blank" rel="noopener noreferrer">Ver URL</Button>
      ),
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 130,
      renderCell: (params) => (
        <Button variant="contained" color="error" onClick={() => handleEliminarDocumento(params.row._id)}>Eliminar</Button>
      ),
    },
  ];

  return (
    <>
      <NarBar />
      <div className="Sede">
        <div className="Rectangle">
          <div className='Rectangle016' style={{ left: 470, top: 25 }}>
            <div className="TablaDocumentos" style={{ maxHeight: 'auto', overflowY: 'auto' }}>
              <div style={{ height: 480, width: '100%' }}>
                <DataGrid
                  rows={documentosList}
                  columns={columns}
                  pageSize={5}
                  getRowId={(row) => row._id}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="AgregarNuevoEmpleado" style={{ width: 540, height: 37, left: 98, top: 210, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>
          Seleccionar Archivo
        </div>
        <input className="Rectangle97" type="file" onChange={handleDocumentoChange}  />
        <input className="Rectangle158" name="Folio" type="number" placeholder="Folio del Documento" value={formData.Folio} onChange={handleInputChange} />
        <select className="Rectangle159" name="Tipo" value={formData.Tipo} onChange={handleInputChange}>
          <option value="" disabled defaultValue="">Tipo de Documento</option>
          <option value="Personal">Personal</option>
          <option value="Profesional">Profesional</option>
        </select>
        <div className="AgregarNuevoEmpleado" style={{ width: 540, height: 20, left: 100, top: 430, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>
          Fecha de Caducidad del documento
        </div>
        <input className="Rectangle161" name="Caducidad" type="date" placeholder="Caducidad" value={formData.Caducidad} onChange={handleInputChange}  />
        <div className="AgregarNuevoEmpleado" style={{ width: 540, height: 37, left: 98, top: 161, position: 'absolute', color: 'black', fontSize: 30, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>
          Administracion de Documentos
        </div>
      </div>
      <button className="Rectangle977" style={{ left: 120, top: 600 }} onClick={handleDocumentoSubmit}>
        <div className="RegistrarNuevoEmpleado">Registrar Documento</div>
      </button>
      <div className="alert-container">
        {showSuccessAlert && <Alert variant="filled" severity="success">Documento registrado correctamente</Alert>}
        {showErrorAlert && <Alert variant="filled" severity="error">Error al registrar documento</Alert>}
      </div>
    </>
  );
};

export default DocumentosU;
