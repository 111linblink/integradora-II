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

import "./AgregarSede.css"

const AgregarSede = () => {
    const [formData, setFormData] = useState({
        Nombre: "",
        Ubicacion: "",
        Tipo: "",
        NombreArea: "",
        sedeSeleccionada: "",
        sedeSeleccionadaEliminar: "" 
    });

    const [sedesAreas, setSedesAreas] = useState([]);
    const [openRow, setOpenRow] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await Axios.get("http://localhost:3000/sedes_areas");
                setSedesAreas(response.data.data);
            } catch (error) {
                console.error('Error al obtener las sedes y áreas:', error.message);
            }
        }
        fetchData();
    }, []);

    const handleRowClick = (index) => {
        setOpenRow(openRow === index ? null : index);
    };

    const CreacionSede = async () => {
        try {
            await Axios.post("http://localhost:3000/create_sede_area", formData);
            setFormData({
                Nombre: "",
                Ubicacion: "",
                Tipo: "",
                NombreArea: "",
                sedeSeleccionada: "",
                sedeSeleccionadaEliminar: ""
            });
            window.location.reload();
        } catch (error) {
            console.error('Error al crear la sede:', error.message);
        }
    };

    const ActualizarArea = async () => {
        const { NombreArea, Tipo, sedeSeleccionada } = formData;

        try {
            await Axios.put(`http://localhost:3000/update_sede_area/${sedeSeleccionada}`, { $push: { Areas: { NombreArea, Tipo } } });
            setFormData({
                ...formData,
                NombreArea: "",
                Tipo: ""
            });
            window.location.reload();
        } catch (error) {
            console.error('Error al actualizar el área:', error.message);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const EliminarSedeArea = async (id) => {
        try {
            await Axios.delete(`http://localhost:3000/delete_sede_area/${id}`);
            setFormData({
                ...formData,
                sedeSeleccionadaEliminar: ""
            });
            window.location.reload();
        } catch (error) {
            console.error('Error al eliminar la sede o área:', error.message);
        }
    };

    return (
        <>
            <NarBar />
            <div className="Sede">
                <div className="Rectangle" />
                <div className="Tablas" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <h2>Tabla de sedes y áreas</h2>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Dirección</TableCell>
                                    <TableCell>Eliminar</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sedesAreas.map((sedeArea, index) => (
                                    <React.Fragment key={index}>
                                        <TableRow onClick={() => handleRowClick(index)}>
                                            <TableCell>
                                                <IconButton size="small">
                                                    {openRow === index ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                </IconButton>
                                            </TableCell>
                                            <TableCell>{sedeArea.Nombre}</TableCell>
                                            <TableCell>{sedeArea.Ubicacion}</TableCell>
                                            <TableCell>

                                                <Button onClick={() => EliminarSedeArea(sedeArea._id)} size="small" variant="outlined" color="error"startIcon={<DeleteIcon />}>Eliminar</Button>


                                            </TableCell>
                                            <TableCell>

                                             <TableCell>

                                             <Button className="actions-button"  variant="outlined"  >Modificar</Button>
                                             </TableCell>
                                            <TableCell>

                                        
                                    <Button className="actions-button"  variant="outlined"  startIcon={<CloudUploadIcon />}>Agregar Area</Button>
                                    </TableCell>


                                        </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                                                <Collapse in={openRow === index} timeout="auto" unmountOnExit>
                                                    <Box sx={{ margin: 1 }}>
                                                        <Typography variant="subtitle1">Administradores:</Typography>
                                                        {sedeArea.Administradores.map((admin, adminIndex) => (
                                                            <div key={adminIndex}>
                                                                {admin.Id_Admin}
                                                            </div>
                                                        ))}
                                                        <Typography variant="subtitle1">Áreas:</Typography>
                                                        {sedeArea.Areas.map((area, areaIndex) => (
                                                            <div key={areaIndex}>
                                                                Tipo: {area.Tipo}, Nombre: {area.NombreArea}
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

            <div>
                <h2>Crear nueva sede</h2>
                <input className="NombreSede" type="text" placeholder="Nombre de la sede" onChange={handleChange} name="Nombre" value={formData.Nombre} />
                <input className="Ubicación" type="text" placeholder="Ubicación" onChange={handleChange} name="Ubicacion" value={formData.Ubicacion} />
                
                <button onClick={CreacionSede} className="RegistrarNuevoSedeArea">
                    <div className="RegistrarNuevoSedeArea">Registrar nueva sede</div>
                </button>
            </div>

            <div>
                <h2>Actualizar área existente</h2>
                <select className="sedeSeleccionada" name="sedeSeleccionada" onChange={handleChange}>
                    <option value="" defaultValue="">Seleccione una sede</option>
                    {sedesAreas.map((sede, index) => (
                        <option key={index} value={sede._id}>{sede.Nombre}</option>
                    ))}
                </select>
                <select className="SedeTipo" onChange={handleChange} name="Tipo" value={formData.Tipo}>
                    <option value="" defaultValue="">Tipo de área</option>
                    <option value="Administrativa">Administrativa</option>
                    <option value="Operativa">Operativa</option>
                </select>
                <input className="SedeTipoArea" type="text" placeholder="Nombre del área" onChange={handleChange} name="NombreArea" />

                <button onClick={ActualizarArea} className="ActualizarArea">
                    <div className="RegistrarNuevoSedeArea">Actualizar área</div>
                </button>
            </div>
            <div className="AgregarNuevoEmpleado" style={{ width: 540, height: 37, left: 98, top: 161, position: 'absolute' ,
            color: 'black' , fontSize: 30, fontFamily: 'Roboto' , fontWeight: '400' , wordWrap: 'break-word' }}>
            Administracion de Sedes
        </div>
        </>
    );
};

export default AgregarSede;
