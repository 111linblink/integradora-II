import React, { useState, useEffect } from 'react';
import NarBar from '../NarBar.js/NarBar';
import Axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import FormDialog from './contrato';

const Contrato = () => {
    const [formData, setFormData] = useState({
        Nombre: "",
        Tipo: ""
    });

    const [contratos, setContratos] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [openAgregarHorarioDialog, setOpenAgregarHorarioDialog] = useState(false);
    const [openAgregarContratoDialog, setOpenAgregarContratoDialog] = useState(false);
    const [horariosDialog, setHorariosDialog] = useState([]);
    const [horarioNuevo, setHorarioNuevo] = useState({ HoraInicial: "", HoraFinal: "" });
    const [contratoId, setContratoId] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await Axios.get("http://localhost:3000/contrato/contratos");
                setContratos(response.data.data);
            } catch (error) {
                console.error('Error al obtener los contratos:', error.message);
            }
        }
        fetchData();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCrearContrato = async () => {
        try {
            await Axios.put(`http://localhost:3000/contrato/update_contrato/${contratoId}`, formData);
            alert(`Contrato actualizado exitosamente.`);
            setFormData({
                Nombre: "",
                Tipo: ""
            });
            window.location.reload();
        } catch (error) {
            console.error('Error al actualizar el contrato:', error.message);
        }
    };

    const handleEliminarContrato = async (id) => {
        try {
            await Axios.delete(`http://localhost:3000/contrato/delete_contrato/${id}`);
            alert(`Contrato eliminado correctamente.`);
            const response = await Axios.get("http://localhost:3000/contrato/contratos");
            setContratos(response.data.data);
        } catch (error) {
            console.error(`Error al eliminar el contrato:`, error.message);
        }
    };

    const closeModal = () => {
        setOpenDialog(false);
        setOpenAgregarHorarioDialog(false);
        setOpenAgregarContratoDialog(false);
    };

    const handleVerHorarios = (horarios) => {
        setHorariosDialog(horarios);
        setOpenDialog(true);
    };

    const handleAgregarHorario = async (id) => {
        try {
            const datosHorario = {
                Numero: 1, // Reemplaza con el número de turno apropiado
                HoraInicial: horarioNuevo.HoraInicial,
                HoraFinal: horarioNuevo.HoraFinal
            };
            await Axios.post(`http://localhost:3000/contrato/add_horario/${id}`, datosHorario);
            alert(`Horario agregado al contrato exitosamente.`);
            setOpenAgregarHorarioDialog(false);
        } catch (error) {
            console.error('Error al agregar el horario al contrato:', error.message);
        }
    };

    const handleEliminarHorario = (index) => {
        const updatedHorarios = horariosDialog.filter((_, i) => i !== index);
        setHorariosDialog(updatedHorarios);
    };

    const handleModificarContrato = (contrato) => {
        setFormData({
            Nombre: contrato.Nombre,
            Tipo: contrato.Tipo
        });
        setContratoId(contrato._id);
        setOpenAgregarContratoDialog(true);
    };

    const handleAgregarContrato = () => {
        setOpenAgregarContratoDialog(true);
    };

    const handleGuardarCambiosContrato = async () => {
        try {
            const contratoData = {
                Nombre: formData.Nombre,
                Tipo: formData.Tipo,
                Turno: horariosDialog.map((horario, index) => ({
                    Numero: index + 1,
                    HoraInicial: horario.HoraInicial,
                    HoraFinal: horario.HoraFinal
                }))
            };

            await Axios.put(`http://localhost:3000/contrato/update_contrato/${contratoId}`, contratoData);
            alert(`Contrato actualizado exitosamente.`);
            setFormData({
                Nombre: "",
                Tipo: ""
            });
            setHorariosDialog([]);
            setOpenAgregarContratoDialog(false);
            window.location.reload();
        } catch (error) {
            console.error('Error al actualizar el contrato:', error.message);
        }
    };

    return (
        <>
            <NarBar />

            <div className="Sede">
                <div className="Rectangle" />
                <div className="Tablas" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <div>
                        <h2>Listado de contratos</h2>
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Tipo</TableCell>
                                        <TableCell>Nombre</TableCell>
                                        <TableCell>Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {contratos.map((contrato, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{contrato.Tipo}</TableCell>
                                            <TableCell>{contrato.Nombre}</TableCell>
                                            
                                            <TableCell>
                                                <Button onClick={() => handleEliminarContrato(contrato._id)} variant="outlined" color="secondary" startIcon={<DeleteIcon />}>Eliminar</Button>
                                                <Button onClick={() => handleVerHorarios(contrato.Turno)} variant="outlined" color="primary" startIcon={<EditIcon />}>Ver Horarios</Button>
                                                <Button onClick={() => setOpenAgregarHorarioDialog(true)} variant="outlined" color="primary" startIcon={<AddIcon />}>Agregar Horario</Button>
                                                <Button onClick={() => handleModificarContrato(contrato)} variant="outlined" color="primary" startIcon={<EditIcon />}>Modificar Contrato</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>

            <Dialog open={openDialog} onClose={closeModal}>
                <DialogTitle>Horarios del Contrato</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Aquí puedes ver los horarios asociados al contrato.
                    </DialogContentText>
                    {horariosDialog.map((horario, index) => (
                        <div key={index}>
                            <TextField
                                margin="dense"
                                label={`Hora Inicial`}
                                type="time"
                                fullWidth
                                value={horario.HoraInicial}
                                disabled
                            />
                            <TextField
                                margin="dense"
                                label={`Hora Final`}
                                type="time"
                                fullWidth
                                value={horario.HoraFinal}
                                disabled
                            />
                            <Button onClick={() => handleEliminarHorario(index)} variant="outlined" color="secondary" startIcon={<DeleteIcon />}>Eliminar Horario</Button>
                        </div>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openAgregarHorarioDialog} onClose={closeModal}>
                <DialogTitle>Agregar Horario</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Aquí puedes agregar un nuevo horario al contrato.
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="horaInicial"
                        label="Hora Inicial"
                        type="time"
                        fullWidth
                        value={horarioNuevo.HoraInicial}
                        onChange={(e) => setHorarioNuevo({ ...horarioNuevo, HoraInicial: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        id="horaFinal"
                        label="Hora Final"
                        type="time"
                        fullWidth
                        value={horarioNuevo.HoraFinal}
                        onChange={(e) => setHorarioNuevo({ ...horarioNuevo, HoraFinal: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleAgregarHorario(contratoId)} color="primary">
                        Agregar Horario
                    </Button>
                    <Button onClick={closeModal} color="primary">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openAgregarContratoDialog} onClose={closeModal}>
                <DialogTitle>Modificar Contrato</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Aquí puedes modificar el contrato seleccionado.
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="nombreContrato"
                        label="Nombre"
                        type="text"
                        fullWidth
                        value={formData.Nombre}
                        onChange={handleInputChange}
                        name="Nombre"
                    />
                    <TextField
                        margin="dense"
                        id="tipoNuevo"
                        label="Tipo"
                        type="text"
                        fullWidth
                        value={formData.Tipo}
                        onChange={handleInputChange}
                        name="Tipo"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleGuardarCambiosContrato} color="primary">
                        Guardar Cambios
                    </Button>
                    <Button onClick={closeModal} color="primary">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
            <div className="AgregarNuevoEmpleado" style={{ width: 540, height: 37, left: 98, top: 161, position: 'absolute', color: 'black', fontSize: 30, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>
                Administracion de Sedes
            </div>
            <Button color="primary" style={{ left: 1305, top: 87 }}><FormDialog /> </Button>
        </>
    );
};

export default Contrato;
