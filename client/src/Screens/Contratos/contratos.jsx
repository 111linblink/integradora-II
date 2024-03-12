import React, { useState, useEffect } from 'react';
import NarBar from '../NarBar.js/NarBar';
import Axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import "./contratos.css";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const Contratos = () => {
    const [formData, setFormData] = useState({
        Tipo: "",
        Turno: "",
        Horario: "",
        selectedContratoId: ""
    });

    const [contratos, setContratos] = useState([]);
    const [, ] = useState('');
    const [sedesAreas, setSedesAreas] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await Axios.get("http://localhost:3000/contratos");
                setContratos(response.data.data);
            } catch (error) {
                console.error('Error al obtener los contratos:', error.message);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchSedesAreas() {
            try {
                const response = await Axios.get("http://localhost:3000/sedes_areas");
                setSedesAreas(response.data.data);
            } catch (error) {
                console.error('Error al obtener las sedes y áreas:', error.message);
            }
        }
        fetchSedesAreas();
    }, []);

    const CreacionContrato = async () => {
        try {
            await Axios.post("http://localhost:3000/create_contrato", formData);
            setContratos([...contratos, formData]); // Actualizar contratos localmente
            setFormData({
                Tipo: "",
                Turno: "",
                Horario: ""
            });
        } catch (error) {
            console.error('Error al crear el contrato:', error.message);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDelete = async (id, nombre) => {
        try {
            await Axios.delete(`http://localhost:3000/delete_contrato/${id}`);
            setContratos(contratos.filter(contrato => contrato.id !== id));
        } catch (error) {
            console.error('Error al eliminar el contrato:', error.message);
        }
    };

    const columns = [
        { field: 'Tipo', headerName: 'Tipo', width: 130 },
        { field: 'Turno', headerName: 'Turno', width: 130 },
        { field: 'Horario', headerName: 'Horario', width: 130 },
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 200,
            renderCell: (params) => (
                <Button onClick={() => handleDelete(params.row.id, params.row.Nombre)} variant="outlined" color="error" startIcon={<DeleteIcon />}>
                    Eliminar
                </Button>
            ),
        },
    ];

    return (
        <>
            <NarBar />
            <div className="contrato">
                <div className="RectanguloBlanco" />
                <div className="RectanguloAzul" style={{ height: '400px', width: '39%' }}>
                    <h2>Tabla de contratos</h2>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={contratos}
                            columns={columns}
                            pageSize={5}
                            checkboxSelection
                        />
                    </div>
                </div>
            </div>

            <div>
                <h2>Crear nuevo contrato</h2>
                <input className="Rtipo" type="number" placeholder="Tipo" onChange={handleChange} name="Tipo" value={formData.Tipo} />
                <input className="RectaTurno" type="number" placeholder="Turno" onChange={handleChange} name="Turno" value={formData.Turno} />
                <input className="Rectanglehorario" type="text" placeholder="Horario" onChange={handleChange} name="Horario" value={formData.Horario} />
                <button onClick={CreacionContrato} className="RectangleContrato">
                    Registrar nuevo contrato
                </button>
            </div>

            <div>
                <h2>Actualizar Contrato</h2>
                <h2>Actualizar área existente</h2>
                <select className="sedeSeleccionada" name="sedeSeleccionada" onChange={handleChange}>
                    <option value="" defaultValue="">Seleccione una sede</option>
                    {sedesAreas.map((sede, index) => (
                        <option key={index} value={sede._id}>{sede.Nombre}</option>
                    ))}
                </select>
                <input className="ActualizarTipo" type="number" placeholder="Tipo" onChange={handleChange} name="Tipo" value={formData.Tipo} />
                <input className="ActualizarTurno" type="number" placeholder="Turno" onChange={handleChange} name="Turno" value={formData.Turno} />
                <input className="ActualizarHorario" type="text" placeholder="Horario" onChange={handleChange} name="Horario" value={formData.Horario} />
                
                <button onClick={CreacionContrato} className="RegistrarNuevoSedeArea">
                    Actualizar contrato
                </button>
            </div>
            <div className="AgregarNuevoEmpleado" style={{ width: 540, height: 37, left: 98, top: 161, position: 'absolute' ,
            color: 'black' , fontSize: 30, fontFamily: 'Roboto' , fontWeight: '400' , wordWrap: 'break-word' }}>
            Administracion de Contratos
        </div>
        </>
    );
};

export default Contratos;
