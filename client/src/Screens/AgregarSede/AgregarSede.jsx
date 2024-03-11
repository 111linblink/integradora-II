import React, { useState, useEffect } from 'react';
import NarBar from '../NarBar.js/NarBar';
import Axios from 'axios';
import "./AgregarSede.css";

const AgregarSede = () => {
    const [formData, setFormData] = useState({
        Nombre: "",
        Ubicacion: "",
        Tipo: "",
        NombreArea: "",
        sedeSeleccionada: "" // Campo para almacenar la sede seleccionada
    });

    const [sedesAreas, setSedesAreas] = useState([]);

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

    const CreacionSede = async () => {
        try {
            await Axios.post("http://localhost:3000/create_sede_area", formData);
            setFormData({
                Nombre: "",
                Ubicacion: "",
                Tipo: "",
                NombreArea: "",
                sedeSeleccionada: ""
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

    return (
        <>
            <NarBar />
            <div className="SAdmin">
                <div className="Rectangle157" />
                <div className="Rectangle196" />

                <h2>Crear nueva sede</h2>
                <input className="Rectangle97" type="text" placeholder="Nombre de la sede" onChange={handleChange} name="Nombre" value={formData.Nombre} />
                <input className="Rectangle158" type="text" placeholder="Ubicación" onChange={handleChange} name="Ubicacion" value={formData.Ubicacion} />
                
                <button onClick={CreacionSede} className="Rectangle977">
                    <div className="RegistrarNuevoSedeArea">Registrar nueva sede</div>
                </button>
            </div>

            <div>
                <h2>Actualizar área existente</h2>
                <select className="Rectangle163" name="sedeSeleccionada" onChange={handleChange}>
                    <option value="" defaultValue="">Seleccione una sede</option>
                    {sedesAreas.map((sede, index) => (
                        <option key={index} value={sede._id}>{sede.Nombre}</option>
                    ))}
                </select>
                <select className="Rectangle162" onChange={handleChange} name="Tipo" value={formData.Tipo}>
                    <option value="" defaultValue="">Tipo de área</option>
                    <option value="Administrativa">Administrativa</option>
                    <option value="Operativa">Operativa</option>
                </select>
                <input className="Rectangle165" type="text" placeholder="Nombre del área" onChange={handleChange} name="NombreArea" />

                <button onClick={ActualizarArea} className="Rectangle978">
                    <div className="RegistrarNuevoSedeArea">Actualizar área</div>
                </button>
            </div>
        </>
    );
};

export default AgregarSede;
