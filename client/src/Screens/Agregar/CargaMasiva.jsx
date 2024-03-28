import React, { useState } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogTitle, DialogActions, Snackbar } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const CargaMasiva = () => {
    const [archivo, setArchivo] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [snackbarAbierto, setSnackbarAbierto] = useState(false);
    const [mensajeSnackbar, setMensajeSnackbar] = useState('');
    const [severidadSnackbar, setSeveridadSnackbar] = useState('success');

    const manejarCambioArchivo = (evento) => {
        setArchivo(evento.target.files[0]);
    };

    const manejarSubida = async () => {
        try {
            const formData = new FormData();
            formData.append('archivo', archivo);

            // Cambia la URL por la dirección de tu servidor y la ruta correcta
            const respuesta = await axios.post('http://localhost:3000/usuarios/subirEmpleados', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Respuesta del servidor:', respuesta.data);

            // Mostrar alerta de éxito
            mostrarSnackbar('¡Archivo subido exitosamente!', 'success');
            
            // Cerrar el diálogo después de subir el archivo
            handleCloseDialog();
        } catch (error) {
            console.error('Error al cargar el archivo:', error);
            
            // Mostrar alerta de fallo
            mostrarSnackbar('Error al subir el archivo. Por favor, intenta nuevamente.', 'error');
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const mostrarSnackbar = (mensaje, severidad) => {
        setMensajeSnackbar(mensaje);
        setSeveridadSnackbar(severidad);
        setSnackbarAbierto(true);
    };

    const handleCloseSnackbar = () => {
        setSnackbarAbierto(false);
    };

    return (
        <div>
            <Button variant="contained" onClick={() => setOpenDialog(true)} startIcon={<CloudUploadIcon />}>
                Seleccionar Archivo
            </Button>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Seleccionar archivo</DialogTitle>
                <input type="file" accept=".xlsx, .json, .csv" onChange={manejarCambioArchivo} style={{ display: 'none' }} id="archivoInput" />
                <DialogActions>
                    <label htmlFor="archivoInput" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', cursor: 'pointer', borderRadius: '5px' }}>Seleccionar Archivo</label>
                    {archivo && (
                        <div>
                            <p>Archivo seleccionado: {archivo.name}</p>
                            <Button variant="contained" onClick={manejarSubida}>Subir Archivo</Button>
                        </div>
                    )}
                    <Button onClick={handleCloseDialog} color="primary">Cancelar</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbarAbierto}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={mensajeSnackbar}
                severity={severidadSnackbar}
            />
        </div>
    );
};

export default CargaMasiva;
