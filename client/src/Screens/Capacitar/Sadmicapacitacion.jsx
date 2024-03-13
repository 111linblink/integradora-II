import React, { useState, useEffect } from 'react';
import NarBar from '../NarBar.js/NarBar';
import Axios from 'axios';
import "./Sadmicapacitacion.css";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Sadmicapacitacion = () => {
    const [formData, setFormData] = useState({
        Nombre: "",
        Area: "",
        Sede: "",
        Ubicacion: "",
        Actividad: [
            {
                NombreActividad: "",
                FechaInicio: "",
                FechaFin: ""
            }
        ]
    });

    const [capacitaciones, setCapacitaciones] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await Axios.get("http://localhost:3000/capacitaciones");
                setCapacitaciones(response.data.data);
            } catch (error) {
                console.error('Error al obtener las capacitaciones:', error.message);
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

    const handleCrearCapacitacion = async () => {
        try {
            await Axios.post("http://localhost:3000/crear_capacitacion", formData);
            setFormData({
                Nombre: "",
                Area: "",
                Sede: "",
                Ubicacion: "",
                Actividad: [
                    {
                        NombreActividad: "",
                        FechaInicio: "",
                        FechaFin: ""
                    }
                ]
            });
            window.location.reload();
        } catch (error) {
            console.error('Error al crear la capacitación:', error.message);
        }
    };

    const handleEliminarCapacitacion = async (id, nombre) => {
        try {
            await Axios.delete(`http://localhost:3000/eliminar_capacitacion/${id}`);
            alert(`Capacitación "${nombre}" eliminada correctamente.`);
            window.location.reload();
        } catch (error) {
            console.error(`Error al eliminar la capacitación "${nombre}":`, error.message);
        }
    };

    const handleModificarCapacitacion = (id) => {
        // Redirigir a la página de modificación con el ID de la capacitación
        window.location.href = `/sa-Modificar/${id}`;
    };  

    return (
        <>
            <NarBar />
            <div className="SupAdmin">
                <div className="Rectangle020" />
                <div className="Rectangle016" style={{ maxHeight: '400px', overflowY: 'auto'}}>
                <div>
                <h2>Listado de capacitaciones</h2>
                <ul>
                    {capacitaciones.map((capacitacion, index) => (
                        <li key={index}>
                            <p>Nombre: {capacitacion.Nombre}</p>
                            <p>Área: {capacitacion.Area}</p>
                            <p>Sede: {capacitacion.Sede}</p>
                            <p>Ubicación: {capacitacion.Ubicacion}</p>
                            <p>Actividad: {capacitacion.Actividad.map((actividad, i) => (
                                <span key={i}>
                                    <p>Nombre: {actividad.NombreActividad}</p>
                                    <p>Fecha de inicio: {actividad.FechaInicio}</p>
                                    <p>Fecha de fin: {actividad.FechaFin}</p>
                                </span>
                            ))}</p>
                            <button onClick={() => handleEliminarCapacitacion(capacitacion.id, capacitacion.Nombre)}><DeleteIcon />Eliminar</button>
                            <button onClick={() => handleModificarCapacitacion(capacitacion.id)}><EditIcon />Modificar</button>
                        </li>
                    ))}
                </ul>
            </div>
                </div>
            </div>

            <div>
                <h2>Crear nueva sede</h2>
                <input className="Rectangle015" type="text" placeholder="Nombre de la capacitación" onChange={handleInputChange} name="Nombre" value={formData.Nombre} />
                <input className="ubi" type="text" placeholder="Ubicación" onChange={handleInputChange} name="Ubicacion" value={formData.Ubicacion} />
                
                <button onClick={handleCrearCapacitacion} className="Rectangle03">
                    <div>Registrar nueva sede</div>
                </button>
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


                <div style={{ width: 540, height: 37, left: 98, top: 485, position: 'absolute' ,
                 color: 'black' , fontSize: 20, fontFamily: 'Roboto' , fontWeight: '400' , wordWrap: 'break-word' }}>
                  Fechas
                </div>

                <div style={{ width: 540, height: 37, left: 98, top: 529, position: 'absolute' ,
                 color: 'black' , fontSize: 20, fontFamily: 'Roboto' , fontWeight: '400' , wordWrap: 'break-word' }}>
                  Inicio
                </div>

                <div style={{ width: 540, height: 37, left: 300, top: 529, position: 'absolute' ,
                 color: 'black' , fontSize: 20, fontFamily: 'Roboto' , fontWeight: '400' , wordWrap: 'break-word' }}>
                  Fin
                </div>

                <input type="date" className='fechaIni' placeholder="Fecha de inicio" name="FechaInicio" value={formData.Actividad[0].FechaInicio} onChange={(e) => setFormData({ ...formData, Actividad: [{ ...formData.Actividad[0], FechaInicio: e.target.value }] })} />
                <input type="date" className='fechaFin' placeholder="Fecha de fin" name="FechaFinal" value={formData.Actividad[0].FechaFin} onChange={(e) => setFormData({ ...formData, Actividad: [{ ...formData.Actividad[0], FechaFin: e.target.value }] })} />      
            <div className="AgregarEmpleado" style={{ width: 540, height: 37, left: 98, top: 151, position: 'absolute' ,
            color: 'black' , fontSize: 30, fontFamily: 'Roboto' , fontWeight: '400' , wordWrap: 'break-word' }}>
            Capacitaciones
        </div>

        <div className="AgregarEmp" style={{ width: 540, height: 37, left: 98, top: 210, position: 'absolute' ,
            color: 'black' , fontSize: 20, fontFamily: 'Roboto' , fontWeight: '400' , wordWrap: 'break-word' }}>
            Registro de Capacitaciones
        </div>
        </>
    );
};

export default Sadmicapacitacion;