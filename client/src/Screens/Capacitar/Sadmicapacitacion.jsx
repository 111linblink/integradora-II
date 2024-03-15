// Sadmicapacitacion.jsx
import React, { useState, useEffect, createContext } from 'react';
import NarBar from '../NarBar.js/NarBar';
import Axios from 'axios';
import "./Sadmicapacitacion.css";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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

export const CapacitacionesContext = createContext();

const Sadmicapacitacion = () => {
    const [formData, setFormData] = useState({
        id: "",
        Nombre: "",
        Area: "",
        Sede: "",
        Ubicacion: "",
        Descripcion:"",
        Actividad: {
            NombreActividad: "",
            FechaInicio: "",
            FechaFin: ""
        }
    });

    const [capacitaciones, setCapacitaciones] = useState([]);
    const [selectedCapacitacionIndex, setSelectedCapacitacionIndex] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await Axios.get("http://localhost:3000/capacitaciones/capacitaciones");
                setCapacitaciones(response.data.data);
            } catch (error) {
                console.error('Error al obtener las capacitaciones:', error.message);
            }
        }
        fetchData();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "FechaInicio" || name === "FechaFin") {
            setFormData({
                ...formData,
                Actividad: {
                    ...formData.Actividad,
                    [name]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleCrearCapacitacion = async () => {
        try {
            await Axios.post("http://localhost:3000/crear_capacitacion", formData);
            setFormData({
                id: "",
                Nombre: "",
                Area: "",
                Sede: "",
                Ubicacion: "",
                Descripcion: "",
                Actividad: {
                    NombreActividad: "",
                    FechaInicio: "",
                    FechaFin: ""
                }
            });
            window.location.reload();
        } catch (error) {
            console.error('Error al crear la capacitación:', error.message);
        }
    };

    const handleEliminarCapacitacion = async (id) => {
        try {
            await Axios.delete(`http://localhost:3000/eliminar_capacitacion/${id}`);
            alert(`Capacitación eliminada correctamente.`);
            const response = await Axios.get("http://localhost:3000/capacitaciones");
            setCapacitaciones(response.data.data);
        } catch (error) {
            console.error(`Error al eliminar la capacitación:`, error.message);
        }
    };
    

    const closeModal = () => {
        setOpenDialog(false);
    };

    const handleGuardarCambios = async () => {
        try {
            await Axios.put(`http://localhost:3000/actualizar_capacitacion/${formData.id}`, formData);
            alert(`Capacitación modificada correctamente.`);
            setOpenDialog(false);
            const response = await Axios.get("http://localhost:3000/capacitaciones");
            setCapacitaciones(response.data.data);
        } catch (error) {
            console.error('Error al guardar los cambios:', error.message);
        }
    };

    return (
        <>
            <NarBar />
            <div className="SupAdmin">
                <div className="Rectangle020" />
                <div className="Rectangle016" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <div>
                        <h2>Listado de capacitaciones</h2>
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell>Nombre</TableCell>
                                        <TableCell>Área</TableCell>
                                        <TableCell>Sede</TableCell>
                                        <TableCell>Ubicación</TableCell>
                                        <TableCell>Descripción</TableCell>
                                        <TableCell>Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {capacitaciones.map((capacitacion, index) => (
                                        <TableRow key={index}>
                                            <TableCell />
                                            <TableCell>{capacitacion.Nombre}</TableCell>
                                            <TableCell>{capacitacion.Area}</TableCell>
                                            <TableCell>{capacitacion.Sede}</TableCell>
                                            <TableCell>{capacitacion.Ubicacion}</TableCell>
                                            <TableCell>{capacitacion.Descripcion}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => handleEliminarCapacitacion(capacitacion.Nombre)} variant="outlined" color="secondary" startIcon={<DeleteIcon />}>Eliminar</Button>
                                                <Button onClick={() => {
                                                    setFormData({
                                                        id: capacitacion._id,
                                                        Nombre: capacitacion.Nombre,
                                                        Area: capacitacion.Area,
                                                        Sede: capacitacion.Sede,
                                                        Ubicacion: capacitacion.Ubicacion,
                                                        Descripcion: capacitacion.Descripcion,
                                                        Actividad: {
                                                            NombreActividad: capacitacion.Actividad.NombreActividad,
                                                            FechaInicio: capacitacion.Actividad.FechaInicio,
                                                            FechaFin: capacitacion.Actividad.FechaFin
                                                        }
                                                    });
                                                    setOpenDialog(true);
                                                }} variant="outlined" color="primary" startIcon={<EditIcon />}>Modificar</Button>
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
                <DialogTitle>Modificar Capacitación</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Aquí puedes actualizar los datos de la capacitación.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="nombre"
                        label="Nombre"
                        type="text"
                        fullWidth
                        value={formData.Nombre}
                        onChange={(e) => setFormData({ ...formData, Nombre: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        id="ubicacion"
                        label="Ubicación"
                        type="text"
                        fullWidth
                        value={formData.Ubicacion}
                        onChange={(e) => setFormData({ ...formData, Ubicacion: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        id="descripcion"
                        label="Descripción"
                        type="text"
                        fullWidth
                        value={formData.Descripcion}
                        onChange={(e) => setFormData({ ...formData, Descripcion: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleGuardarCambios} color="primary">
                        Guardar cambios
                    </Button>
                </DialogActions>
            </Dialog>

            <div>
                <h2>Crear nueva capacitación</h2>
                <input className="Rectangle015" type="text" placeholder="Nombre de la capacitación" onChange={handleInputChange} name="Nombre" value={formData.Nombre} />
                <input className="ubi" type="text" placeholder="Ubicación" onChange={handleInputChange} name="Ubicacion" value={formData.Ubicacion} />
                <input className="descripcion" type="text" placeholder="Descripción" onChange={handleInputChange} name="Descripcion" value={formData.Descripcion} />


                <button onClick={handleCrearCapacitacion} className="Rectangle03">
                    <div>Registrar nueva capacitación</div>
                </button>
                <Button className="actions-button" style={{ width: 200, height: 40, left: 1184, top: 2}} variant="outlined"  onClick={() => window.location.href=`/capavisualizar/`}>Asignar Capacitación</Button>

            </div>

            <div>
                <select className="tipoArea" onChange={handleInputChange} name="Area" value={formData.Area}>
                    <option value="" defaultValue="">Tipo de área</option>
                    <option value="Administrativa">Administrativa</option>
                    <option value="Operativa">Operativa</option>
                </select>

                <select className="tipoSede" onChange={handleInputChange} name="Sede" value={formData.Sede}>
                    <option value="" defaultValue="">Sede</option>
                    <option value="León">León</option>
                    <option value="Salamanca">Salamanca</option>
                    <option value="Dolores Hidalgo">Dolores Hidalgo</option>
                </select>
            </div>

            <div style={{ width: 540, height: 37, left: 98, top: 529, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>
                 Fecha Inicio
            </div>

            <div style={{ width: 540, height: 37, left: 300, top: 529, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>
                Fecha Final
            </div>

            <input type="date" className='fechaIni' placeholder="Fecha de inicio" name="FechaInicio" value={formData.Actividad.FechaInicio} onChange={handleInputChange} />
            <input type="date" className='fechaFin' placeholder="Fecha de fin" name="FechaFin" value={formData.Actividad.FechaFin} onChange={handleInputChange} />

            <div className="AgregarEmpleado" style={{ width: 540, height: 37, left: 98, top: 151, position: 'absolute', color: 'black', fontSize: 30, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>
                Capacitaciones
            </div>

            <div className="AgregarEmp" style={{ width: 540, height: 37, left: 98, top: 210, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>
                Registro de Capacitaciones
            </div>
        </>
    );
};

export default Sadmicapacitacion;
