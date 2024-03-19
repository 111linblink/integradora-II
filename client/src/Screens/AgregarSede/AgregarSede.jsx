import React, { useState, useEffect } from 'react';
import NarBar from '../NarBar.js/NarBar';
import Axios from 'axios';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import { List, ListItem, ListItemText } from '@mui/material';
import FormDialog from "./sede";
import "./AgregarSede.css";

const AgregarSede = () => {
    const [sedesAreas, setSedesAreas] = useState([]);
    const [selectedSedeArea, setSelectedSedeArea] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [areaNombre, setAreaNombre] = useState("");
    const [areaTipo, setAreaTipo] = useState("");
    const [openAddAreaDialog, setOpenAddAreaDialog] = useState(false);
    const [nombreSedeBuscado, setNombreSedeBuscado] = useState("");
    const [tipoAreas, setTipoAreas] = useState([]);
    const [areasSeleccionadas, setAreasSeleccionadas] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await Axios.get("http://localhost:3000/sedes/sedes_areas");
                setSedesAreas(response.data.data);
                const tipoAreasResponse = await Axios.get("http://localhost:3000/tipoArea/ver");
                setTipoAreas(tipoAreasResponse.data.data);
               
            } catch (error) {
                console.error('Error al obtener las sedes y áreas:', error.message);
            }
        }
        fetchData();
    }, []);

    const handleRowClick = async (sedeArea) => {
        setSelectedSedeArea(sedeArea);
    };

    const handleOpenUpdateDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleUpdateSedeArea = async () => {
        try {
            await Axios.put(`http://localhost:3000/sedes/update_sede_area/${selectedSedeArea._id}`, selectedSedeArea);
            setOpenDialog(false);
            const response = await Axios.get("http://localhost:3000/sedes/sedes_areas");
            setSedesAreas(response.data.data);
            window.location.reload();
        } catch (error) {
            console.error('Error al actualizar la sede o área:', error.message);
        }
    };
    const handleAddArea = async () => {
        if (!selectedSedeArea || !selectedSedeArea._id) {
            console.error('Error: No hay una sede seleccionada.');
            return;
        }
    
        try {
            // Validar que se haya seleccionado al menos un área
            if (areasSeleccionadas.length === 0) {
                console.error('Error: Debes seleccionar al menos un área.');
                return;
            }
    
            // Validar que se haya seleccionado un tipo de área
            if (!areaTipo) {
                console.error('Error: Debes seleccionar un tipo de área.');
                return;
            }
    
            // Iterar sobre cada área seleccionada y enviarla al servidor
            for (const areaId of areasSeleccionadas) {
                const selectedArea = tipoAreas
                    .find(typeArea => typeArea.Tipo === areaTipo)
                    .Areas.find(area => area._id === areaId);
    
                const newAreaData = {
                    NombreArea: selectedArea.Nombre,
                    Tipo: areaTipo
                };
    
                // Envía una solicitud POST al servidor para agregar el área a la sede seleccionada
                const response = await Axios.post(`http://localhost:3000/sedes/add_area_to_sede/${selectedSedeArea._id}`, newAreaData);
                const updatedSedeArea = response.data.data;
    
                // Actualiza las áreas de la sede en el estado local
                const updatedSedesAreas = sedesAreas.map(sedeArea => {
                    if (sedeArea._id === selectedSedeArea._id) {
                        return updatedSedeArea;
                    }
                    return sedeArea;
                });
    
                setSedesAreas(updatedSedesAreas);
            }
    
            setOpenAddAreaDialog(false);
            window.location.reload();
        } catch (error) {
            console.error('Error al agregar el área:', error.message);
        }
    };
    
    const handleDeleteArea = async (sedeId, areaId) => {
        try {
            await Axios.delete(`http://localhost:3000/sedes/delete_area/${sedeId}/${areaId}`);
            const updatedSedesAreas = sedesAreas.map(sedeArea => {
                if (sedeArea._id === sedeId) {
                    const updatedAreas = sedeArea.Areas.filter(area => area._id !== areaId);
                    return { ...sedeArea, Areas: updatedAreas };
                }
                return sedeArea;
            });
            setSedesAreas(updatedSedesAreas);
            window.location.reload();
        } catch (error) {
            console.error('Error al eliminar el área:', error.message);
        }
    };

    const handleDeleteSede = async (sedeId) => {
        try {
            await Axios.delete(`http://localhost:3000/sedes/delete_sede_area/${sedeId}`);
            const updatedSedesAreas = sedesAreas.filter(sedeArea => sedeArea._id !== sedeId);
            setSedesAreas(updatedSedesAreas);
            window.location.reload();
        } catch (error) {
            console.error('Error al eliminar la sede:', error.message);
        }
    };

    const handleNombreSedeChange = (event) => {
        setNombreSedeBuscado(event.target.value);
    };

    const filteredSedesAreas = sedesAreas && sedesAreas.filter(sedeArea => {
        return sedeArea && sedeArea.Nombre && sedeArea.Nombre.toLowerCase().includes(nombreSedeBuscado.toLowerCase());
    });
    

    const handleAreaCheckboxChange = (event, areaId) => {
        const checked = event.target.checked;
        setAreasSeleccionadas(prevState => {
            if (checked) {
                return [...prevState, areaId];
            } else {
                return prevState.filter(id => id !== areaId);
            }
        });
    };

    return (
        <>
            <NarBar />

            <div className="Sede">
                <div className="Rectangle" />
                <input type="text" value={nombreSedeBuscado} onChange={handleNombreSedeChange} placeholder="Buscar Nombre de Sede" className='v141_18 ' style={{ left: 1050, top: 160 }} />
                <div className="Tablas" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <div></div>
                    <h1>     </h1>
                    <div>

                    </div>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Dirección</TableCell>
                                    <TableCell>Eliminar</TableCell>
                                    <TableCell>Actualizar</TableCell>
                                    <TableCell>Agregar Área</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredSedesAreas.map((sedeArea, index) => (
                                    <React.Fragment key={index}>
                                        <TableRow>
                                            <TableCell>
                                                <IconButton size="small" onClick={() => handleRowClick(sedeArea)}>
                                                    {selectedSedeArea && selectedSedeArea._id === sedeArea._id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                </IconButton>
                                            </TableCell>
                                            <TableCell>{sedeArea.Nombre}</TableCell>
                                            <TableCell>{sedeArea.Ubicacion}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => handleDeleteSede(sedeArea._id)} size="small" variant="outlined" color="error" startIcon={<DeleteIcon />}>Eliminar</Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button onClick={handleOpenUpdateDialog} size="small" variant="outlined" color="primary" startIcon={<CloudUploadIcon />}>Actualizar</Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button onClick={() => setOpenAddAreaDialog(true)} size="small" variant="outlined" color="primary" startIcon={<CloudUploadIcon />}>Agregar Area</Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                                <Collapse in={selectedSedeArea && selectedSedeArea._id === sedeArea._id} timeout="auto" unmountOnExit>
                                                    <Box sx={{ margin: 1 }}>
                                                        <Typography variant="subtitle1">Áreas:</Typography>
                                                        {sedeArea.Areas.map((area, areaIndex) => (
                                                            <div key={areaIndex}>
                                                                Tipo: {area.Tipo}, Nombre: {area.NombreArea}
                                                                <Button onClick={() => handleDeleteArea(sedeArea._id, area._id)} size="small" variant="outlined" color="error" startIcon={<DeleteIcon />}>Eliminar Área</Button>
                                                            </div>
                                                        ))}
                                                    </Box>
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Actualizar Sede o Área</DialogTitle>
                <DialogContent>
                    {selectedSedeArea && (
                        <>
                            <DialogContentText>
                                Aquí puedes actualizar los datos de la sede o área.
                            </DialogContentText>

                            <TextField
                                autoFocus
                                margin="dense"
                                id="nombre"
                                label="Nombre"
                                type="text"
                                fullWidth
                                value={selectedSedeArea.Nombre}
                                onChange={(e) => setSelectedSedeArea({ ...selectedSedeArea, Nombre: e.target.value })}
                            />
                            <TextField
                                margin="dense"
                                id="ubicacion"
                                label="Ubicación"
                                type="text"
                                fullWidth
                                value={selectedSedeArea.Ubicacion}
                                onChange={(e) => setSelectedSedeArea({ ...selectedSedeArea, Ubicacion: e.target.value })}
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleUpdateSedeArea} color="primary">
                        Actualizar
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openAddAreaDialog} onClose={() => setOpenAddAreaDialog(false)}>
                <DialogTitle>Agregar Área</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Complete los detalles del área a agregar.
                    </DialogContentText>
                    {/* Formulario para agregar un área */}
                   
                    <TextField
                        select
                        margin="dense"
                        id="tipoArea"
                        label="Tipo de Área"
                        fullWidth
                        value={areaTipo}
                        onChange={(e) => {
                            setAreaTipo(e.target.value);
                            // Actualiza las áreas basadas en el tipo de área seleccionado
                            const selectedTypeAreas = tipoAreas.find(item => item.Tipo === e.target.value);
                            if (selectedTypeAreas) {
                                setAreasSeleccionadas(selectedTypeAreas.Areas.map(area => area._id));
                            }
                        }}
                    >
                        {tipoAreas.map((tipoArea) => (
                            <MenuItem key={tipoArea._id} value={tipoArea.Tipo}>
                                {tipoArea.Tipo}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="nombreArea"
                        label="Nombre Nueva Área"
                        type="text"
                        fullWidth
                        value={areaNombre}
                        onChange={(e) => setAreaNombre(e.target.value)}
                    />
                    <List>
                        {tipoAreas
                            .filter(typeArea => typeArea.Tipo === areaTipo)
                            .flatMap(typeArea => typeArea.Areas)
                            .map((area) => (
                                <ListItem key={area._id} button>
                                    <Checkbox
                                        checked={areasSeleccionadas.includes(area._id)}
                                        onChange={(e) => handleAreaCheckboxChange(e, area._id)}
                                    />
                                    <ListItemText primary={area.Nombre} />
                                </ListItem>
                            ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddAreaDialog(false)} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleAddArea} color="primary">
                        Agregar
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

export default AgregarSede;
