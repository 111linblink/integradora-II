import React, { useState, useEffect } from 'react';
import NarBar from '../NarBar.js/NarBar';
import { Alert } from '@mui/material';
import "./agregar.css";
import Axios from 'axios';

const SA_Agregar = () => {
    const [formData, setFormData] = useState({
        Nombre: "",
        Numero_Empleado: "",
        CorreoElectronico: "",
        Sexo: "",
        Tipo: "",
        Contrato: "",
        Contrasena: "",
        ConfirmarContraseña: "",
        Sede: "", 
        Area: ""  
    });

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [sedes, setSedes] = useState([]);
    const [tiposDeUsuario, setTiposDeUsuario] = useState([]);
    const [contratos, setContratos] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3000/sedes/sedes_areas')
            .then(response => {
                setSedes(response.data.data.map(sede => ({
                    nombre: sede.Nombre,
                    areas: sede.Areas.map(area => area.NombreArea)
                })));
            })
            .catch(error => {
                console.error('Error al obtener las sedes:', error);
            });

        Axios.get('http://localhost:3000/tipoUsuario/ver')
            .then(response => {
                setTiposDeUsuario(response.data.data.map(tipo => tipo.Tipo));
            })
            .catch(error => {
                console.error('Error al obtener los tipos de usuario:', error);
            });

        Axios.get('http://localhost:3000/contrato/contratos')
            .then(response => {
                setContratos(response.data.data.map(contrato => contrato.Nombre));
            })
            .catch(error => {
                console.error('Error al obtener los contratos:', error);
            });
    }, []);

    const Creacion = async (event) => {
        event.preventDefault();
    
        const requiredFields = ['Nombre', 'Numero_Empleado', 'CorreoElectronico', 'Sexo', 'Tipo', 'Contrato', 'Contrasena', 'Sede', 'Area'];
        const fieldsAreFilled = requiredFields.every(field => formData[field] !== "");
        if (!fieldsAreFilled) {
            setShowErrorAlert(true);
            setShowSuccessAlert(false);
            return;
        }
    
        if (formData.Contrasena !== formData.ConfirmarContraseña) {
            setShowErrorAlert(true);
            setShowSuccessAlert(false);
            return;
        }
    
        try {
            if (!isValidEmail(formData.CorreoElectronico)) {
                setShowErrorAlert(true);
                setShowSuccessAlert(false);
                return;
            }
    
            // Enviar la solicitud para crear el usuario
            const response = await Axios.post("http://localhost:3000/usuarios/create", formData);
            const usuarioCreado = response.data.data;
            console.log('Usuario creado:', usuarioCreado);
    
            // Obtener la lista de sedes con sus IDs
            const sedesResponse = await Axios.get("http://localhost:3000/sedes/sedes_areas");
            const sedes = sedesResponse.data.data;
    
            // Buscar el ID de la sede seleccionada
            let sedeId;
            sedes.forEach(sede => {
                if (sede.Nombre === formData.Sede) {
                    sedeId = sede._id;
                }
            });
    
            // Verificar si la sede fue encontrada
            if (!sedeId) {
                console.error('La sede seleccionada no se encontró en la lista de sedes:', formData.Sede);
                setShowErrorAlert(true);
                setShowSuccessAlert(false);
                return;
            }
    
            console.log('ID de la sede seleccionada:', sedeId);
    
            // Agregar al nuevo usuario a la sede correspondiente
            const addEmployeeResponse = await Axios.post(`http://localhost:3000/sedes/add_empleado_to_sede/${sedeId}`, { numeroControl: formData.Numero_Empleado });

            console.log('Respuesta de agregar empleado a la sede:', addEmployeeResponse.data);
    
            setShowSuccessAlert(true);
            setShowErrorAlert(false);
            setFormData({
                Nombre: "",
                Numero_Empleado: "",
                CorreoElectronico: "",
                Sexo: "",
                Tipo: "",
                Contrato: "",
                Contrasena: "",
                ConfirmarContraseña: "",
                Sede: "",
                Area: ""
            });
        } catch (error) {
            console.error('Error al crear el usuario:', error.message);
            setShowErrorAlert(true);
            setShowSuccessAlert(false);
        }
    };
    
    const CrearUsuario = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <>
            <NarBar />
            <div className="SAdmin">
                <div className="Rectangle157" />
                <div className="Rectangle196" />
                <div className="FotoDelEmpleado">Foto del empleado</div>

                <div className="alert-container">
                    {showSuccessAlert && <Alert variant="filled" severity="success">Usuario creado correctamente</Alert>}
                    {showErrorAlert && <Alert variant="filled" severity="error">Por favor, llene todos los campos requeridos correctamente</Alert>}
                </div>

                <input className="Rectangle97" type="text" placeholder="Nombre Apellido Paterno Apellido Materno" onChange={CrearUsuario} name="Nombre" value={formData.Nombre} />
                <input className="Rectangle158" type="number" placeholder="Número Control Empleado" onChange={CrearUsuario} name="Numero_Empleado" value={formData.Numero_Empleado} />
                <input className="Rectangle159" type="email" placeholder="Correo" onChange={CrearUsuario} name="CorreoElectronico" value={formData.CorreoElectronico} />
                <input className="Rectangle160" type="password" placeholder="Contraseña" onChange={CrearUsuario} name="Contrasena" value={formData.Contrasena} />
                <input className="Rectangle161" type="password" placeholder="Confirmar contraseña" onChange={CrearUsuario} name="ConfirmarContraseña" value={formData.ConfirmarContraseña} />
                <select className="Rectangle162" onChange={CrearUsuario} name="Sexo">
                    <option value="" defaultValue="">Género</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Masculino">Masculino</option>
                </select>
                <select className="Rectangle168" onChange={CrearUsuario} name="Tipo" value={formData.Tipo}>
                    <option value="" defaultValue="">Empleado o Admin</option>
                    {tiposDeUsuario.map((tipo, index) => (
                        <option key={index} value={tipo}>{tipo}</option>
                    ))}
                </select>

                <select className="Rectangle163" onChange={CrearUsuario} name="Sede" value={formData.Sede}>
                    <option value="" defaultValue="">Sede</option>
                    {sedes.map((sede, index) => (
                        <option key={index} value={sede.nombre}>{sede.nombre}</option>
                    ))}
                </select>
                
                <select className="Rectangle164" onChange={CrearUsuario} name="Area" value={formData.Area}>
                    <option value="" defaultValue="">Area</option>
                    {formData.Sede && sedes.find(sede => sede.nombre === formData.Sede)?.areas.map((area, index) => (
                        <option key={index} value={area}>{area}</option>
                    ))}
                </select>
                <input className="Rectangle165" type="date" placeholder="Fecha de Nacimiento" onChange={CrearUsuario} name="FechaNacimiento" />
                <select className="Rectangle186" onChange={CrearUsuario} name="Status">
                    <option value="" defaultValue="">Estado</option>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                </select>
                <select className="Rectangle166" onChange={CrearUsuario} name="Contrato" value={formData.Contrato}>
                    <option value="" defaultValue="">Contrato</option>
                    {contratos.map((contrato, index) => (
                        <option key={index} value={contrato}>{contrato}</option>
                    ))}
                </select>

                <div className="AgregarNuevoEmpleado" style={{ width: 540, height: 37, left: 98, top: 161, position: 'absolute', color: 'black', fontSize: 30, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>
                    Agregar Empleado
                </div>
                <button onClick={Creacion} className="Rectangle977">
                    <div className="RegistrarNuevoEmpleado">Registrar nuevo empleado</div>
                </button>
            </div>
        </>
    );
};

export default SA_Agregar;

