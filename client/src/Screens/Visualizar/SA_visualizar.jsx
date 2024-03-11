import React, { useEffect, useState } from 'react';
import NarBar from '../NarBar.js/NarBar';
import axios from 'axios';
import "./SA_visualizar.css";
import { DataGrid } from '@mui/x-data-grid';
//import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const SA_visualizar = () => {
  const [data, setData] = useState([]);
  const [sedeSeleccionada, setSedeSeleccionada] = useState('');
  const [areaSeleccionada, setAreaSeleccionada] = useState('');
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('');
  const [generoSeleccionado, setGeneroSeleccionado] = useState('');
  const [numeroEmpleadoBuscado, setNumeroEmpleadoBuscado] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [deletedUserName, setDeletedUserName] = useState('');
  

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  useEffect(() => {
    axios.get('http://localhost:3000/user')
      .then(response => {
        console.log(response.data);
        setData(response.data.data);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  }, []);

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

  const handleDelete = (id, userName) => {
    axios.delete(`http://localhost:3000/delete/${id}`)
      .then(res => {
        console.log(res);
        setDeletedUserName(userName);
        setOpenAlert(true);
        // Actualizar los datos después de eliminar un usuario
        const updatedData = data.filter(user => user._id !== id);
        setData(updatedData);
      })
      .catch(err => console.log(err))
  };
  const columns = [
    { field: 'Nombre', headerName: 'Nombre', width: 150,  },
    { field: 'Area', headerName: 'Área', width: 100,  },
    { field: 'Sede', headerName: 'Sede', width: 100, },
    { field: 'Status', headerName: 'Estado', width: 100,  },
    { field: 'Tipo', headerName: 'Tipo', width: 150,  },
    { field: 'Numero_Empleado', headerName: 'Num. Empleado', width: 150, },
    { field: 'Sexo', headerName: 'Sexo', width: 150,  },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 500,
      renderCell: (params) => (
        <div>

          <Button className="actions-button"  variant="outlined"  startIcon={<CloudUploadIcon />}onClick={() => window.location.href=`/sa-Modificar/${params.row.id}`}>Subir Doct</Button>
          <Button className="actions-button"  variant="outlined"  onClick={() => window.location.href=`/sa-Modificar/${params.row.id}`}>Modificar/Ver Datos</Button>
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


  const usuarios = usuariosFiltrados.map((usuario, index) => {
    return { ...usuario, id: usuario._id || index };
  });

  return (
    <>
      <NarBar />
      <div className="v141_16">
        
      <div style={{ height: 400, width: '100%',marginTop: 100 }}>
        <DataGrid
          rows={usuarios}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          
        />
      </div>

      </div>

      <select className="v141_72 v141_73" value={sedeSeleccionada} onChange={handleSedeChange}>
        <option  value=''>Seleccione una Sede</option>
        <option value="Leon">Leon</option>
        <option value="Salamanca">Salamanca</option>
      </select>
           
      <select className="v141_74 v141_75" value={areaSeleccionada} onChange={handleAreaChange}>
        <option  value=''>Seleccione una Area</option>
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
      
      <select className="v141_76 v141_77" value={estadoSeleccionado} onChange={handleEstadoChange}>
        <option  value=''>Seleccione un Estado</option>
        <option value="Activo">Activo</option>
        <option value="Inactivo">Inactivo</option>
      </select>

      <select className="v141_78 v141_79" value={generoSeleccionado} onChange={handleGeneroChange}>
        <option  value=''>Seleccione un Tipo</option>
        <option value="Empleado">Empleado</option>
        <option value="Admin">Admin</option>
      </select>

      <div className="v141_17"></div>
      <input type="text" value={numeroEmpleadoBuscado} onChange={handleNumeroEmpleadoChange} placeholder="Buscar Num.Empleado" className='v141_18 ' />

      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <MuiAlert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          Usuario {deletedUserName} eliminado con éxito
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default SA_visualizar;
