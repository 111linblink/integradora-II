// Componente DocumentosU
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NarBar from '../NarBar.js/NarBar';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const DocumentosU = () => {
  const { Numero_Empleado } = useParams();
  const [documento, setDocumento] = useState(null);
  const [folio, setFolio] = useState('');
  const [tipo, setTipo] = useState('');
  const [caducidad, setCaducidad] = useState('');
  const [documentosList, setDocumentosList] = useState([]);
  const [documentoUrl, setDocumentoUrl] = useState('');
  const [userData, setUserData] = useState(null);

  const handleDocumentoChange = (e) => {
    setDocumento(e.target.files[0]);
  };

  const handleDocumentoSubmit = async () => {
    const formData = new FormData();
    formData.append('Documento', documento);
    formData.append('Folio', folio);
    formData.append('Tipo', tipo);
    formData.append('Caducidad', caducidad);
    formData.append('Numero_Empleado', Numero_Empleado);

    try {
      const response = await axios.post('http://localhost:3000/documentos/subir_documentos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Documento subido correctamente');
      fetchDocumentos();
      setDocumentoUrl(response.data.URL);
    } catch (error) {
      console.error('Error al subir documento:', error);
    }
  };

  const fetchDocumentos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/documentos/documentos');
      setDocumentosList(response.data);
    } catch (error) {
      console.error('Error al obtener documentos:', error);
    }
  };

  useEffect(() => {
    if (Numero_Empleado) {
      fetchUserData();
    }
  }, [Numero_Empleado]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/usuarios/user/${Numero_Empleado}`);
      setUserData(response.data.data);
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  };

  const handleEliminarDocumento = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/documentos/eliminar/${id}`);
      console.log('Documento eliminado correctamente');
      fetchDocumentos();
    } catch (error) {
      console.error('Error al eliminar documento:', error);
    }
  };

  const handleDescargarDocumento = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/documentos/descargar/${id}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'documento.pdf');
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al descargar documento:', error);
    }
  };

  const columns = [
    { field: 'Nombre', headerName: 'Nombre', width: 200 },
    { field: 'Tipo', headerName: 'Tipo', width: 130 },
    { field: 'Folio', headerName: 'Folio', width: 130 },
    { field: 'Caducidad', headerName: 'Caducidad', width: 130 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 200,
      renderCell: (params) => (
        <div>
          <button onClick={() => handleEliminarDocumento(params.row._id)}>Eliminar</button>
          <button onClick={() => handleDescargarDocumento(params.row._id)}>Descargar</button>
        </div>
      ),
    },
  ];

  return (
    <>
      <NarBar />
      <div className="Sede">
        <div className="Rectangle">
          <div className='Rectangle016' style={{left:470,top:25,}}> 
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
        <div className="AgregarNuevoEmpleado" style={{ width: 540, height: 37, left: 98, top: 410, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>
          Seleccionar Archivo
        </div>
        <input className="Rectangle97" type="file" onChange={handleDocumentoChange} style={{fontSize: 17,top:440}}/>
        <input className="Rectangle158" type="number" placeholder="Folio del Documento"  value={folio} onChange={(e) => setFolio(e.target.value)} />
        <select className="Rectangle159" value={tipo} onChange={(e) => setTipo(e.target.value)} >
          <option value="" disabled defaultValue="">Tipo de Documento</option>
          <option value="Personal">Personal</option>
          <option value="Profesional">Profesional</option>
        </select>
        <div className="AgregarNuevoEmpleado" style={{ width: 540, height: 20, left: 100, top: 500, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>
          Fecha de Caducidad del documento
        </div>
        <input className="Rectangle161" type="date" placeholder="Caducidad" value={caducidad} style={{top:530}} onChange={(e) => setCaducidad(e.target.value)}  />
        <div className="AgregarNuevoEmpleado" style={{ width: 540, height: 37, left: 98, top: 161, position: 'absolute', color: 'black', fontSize: 30, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>
          Administracion de Documentos
        </div>
      </div>
      <button className="Rectangle977" style={{left:120, top:600}} onClick={handleDocumentoSubmit}>
        <div className="RegistrarNuevoEmpleado">Registrar Documento</div>
      </button>
    </>
  );
};

export default DocumentosU;
