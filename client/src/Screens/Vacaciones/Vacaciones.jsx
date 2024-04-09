import React, { useState, useEffect } from 'react';
import './Vacaciones.css';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import { Alert, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Axios from 'axios';
import NavbarEmpleado from '../NavBar-Empleado/navbarEmpleado';
import { useNavigate } from 'react-router-dom';

const Vacaciones = () => {
    const [formData, setFormData] = useState({
        DiaIni: "",
        DiaFin: "",
    });

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [vacaciones, setVacaciones] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedVacationId, setSelectedVacationId] = useState("");
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
        obtenerSolicitudesVacaciones();
    }, []);

    const obtenerSolicitudesVacaciones = async () => {
        try {
            const userDataFromStorage = sessionStorage.getItem('userData');
            if (userDataFromStorage) {
                const userData = JSON.parse(userDataFromStorage);
                const numeroEmpleado = userData.numero;
                const response = await Axios.get(`http://localhost:3000/Vacaciones/solicitudes_vacaciones/${numeroEmpleado}`);
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

    const SolicitarVacaciones = async () => {
        const today = new Date().toISOString().split('T')[0];
        if (formData.DiaIni <= today || formData.DiaFin <= today || formData.DiaFin < formData.DiaIni) {
            setShowErrorAlert(true);
            setShowSuccessAlert(false);
            setTimeout(() => {
                setShowErrorAlert(false);
            }, 2000);
            return;
        }

        const existingVacation = vacaciones.find(vacacion => vacacion.DiaIni === formData.DiaIni);
        if (existingVacation) {
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
            const userDataFromStorage = sessionStorage.getItem('userData');
            if (userDataFromStorage) {
                const userData = JSON.parse(userDataFromStorage);
                const nuevaSolicitud = { ...formData, Estado: "Procesando", Numero_Empleado: userData.numero, Nombre: userData.nombre, Contrato: userData.contrato, Sede: userData.sede, Area: userData.area };
                await Axios.post("http://localhost:3000/Vacaciones/crear_solicitud_vacaciones", nuevaSolicitud);
                setShowSuccessAlert(true);
                setShowErrorAlert(false);
                setFormData({
                    ...formData,
                    DiaIni: "",
                    DiaFin: ""
                });
                obtenerSolicitudesVacaciones();
                setTimeout(() => {
                    setShowSuccessAlert(false);
                }, 2000);
            } else {
                throw new Error('Error: No se pudo obtener el número de empleado del sessionStorage.');
            }
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

    const rows = vacaciones.map((vacacion) => ({
        id: vacacion._id,
        DiaIni: vacacion.DiaIni.substring(0, 10),
        DiaFin: vacacion.DiaFin.substring(0, 10),
        Estado: vacacion.Estado,
        NumeroEmpleado: vacacion.Numero_Empleado,
        Comentarios: vacacion.Comentarios
    }));

    const columns = [
        { field: 'DiaIni', headerName: 'Primer Día', width: 100 },
        { field: 'DiaFin', headerName: 'Último Día', width: 100 },
        { field: 'Estado', headerName: 'Estado', width: 100 },
        { field: 'NumeroEmpleado', headerName: 'Número de Empleado', width: 160 },
        { field: 'Comentarios', headerName: 'Comentarios', width: 300},
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 300,
            renderCell: (params) => (
                <div>
                    {(params.row.Estado !== "Aprobada" && params.row.Estado !== "Denegada") && (
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
                <div className="rectangulo2">
                    <div className="textoCalendario">Solicitudes</div>
                    <div className="rectanguloInt">
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
                <div style={{ height: '55%', width: '71%', position: 'absolute', top: '35%', left: '3%' }}>
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
                <div className="alert-container">
                    {showSuccessAlert && <Alert variant="filled" severity="success">El cambio se ha hecho correctamente</Alert>}
                    {showErrorAlert && <Alert variant="filled" severity="error">Error</Alert>}
                </div>
            </div>
        </>
    );
};

export default Vacaciones;
