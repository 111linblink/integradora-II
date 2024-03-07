import React, { useState } from 'react';
import NarBar from '../NarBar.js/NarBar';
import { Alert } from '@mui/material'; // Importar el componente Alert de Material-UI
import "./SA_Agregar.css";
import Axios from 'axios';

const SA_Agregar = () => {
    const [formData, setFormData] = useState({
        Nombre: "",
        Numero_Empleado: "",
        CorreoElectronico: "",
        Sexo: "",
        Tipo: "",
        Contrato: ""
    });

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const Creacion = async (event) => {
        event.preventDefault();
        // Validar que los campos requeridos estén llenos
        const requiredFields = ['Nombre', 'Numero_Empleado', 'CorreoElectronico', 'Sexo', 'Tipo', 'Contrato'];
        const fieldsAreFilled = requiredFields.every(field => formData[field] !== "");
        if (!fieldsAreFilled) {
            setShowErrorAlert(true);
            setShowSuccessAlert(false); // Asegurarse de que la alerta de éxito se oculte
            return;
        }
        try {
            await Axios.post("http://localhost:3000/create", formData);
            setShowSuccessAlert(true);
            setShowErrorAlert(false); // Asegurarse de que la alerta de error se oculte
            setFormData({ // Limpiar los datos del formulario
                Nombre: "",
                Numero_Empleado: "",
                CorreoElectronico: "",
                Sexo: "",
                Tipo: "",
                Contrato: ""
            });
            window.location.reload(); // Recargar la página
        } catch (error) {
            console.error('Error al crear el usuario:', error.message);
            setShowErrorAlert(true);
            setShowSuccessAlert(false); // Asegurarse de que la alerta de éxito se oculte
        }
    };

    const CrearUsuario = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
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
                    {showErrorAlert && <Alert variant="filled" severity="error">Por favor, llene todos los campos requeridos</Alert>}
                </div>

                <input className="Rectangle97" type="text" placeholder="Nombre Apellido Paterno Apellido Materno" onChange={CrearUsuario} name="Nombre" value={formData.Nombre} />
                <input className="Rectangle158" type="number" placeholder="Número Control Empleado" onChange={CrearUsuario} name="Numero_Empleado" value={formData.Numero_Empleado} />
                <input className="Rectangle159" type="email" placeholder="Correo" onChange={CrearUsuario} name="CorreoElectronico" value={formData.CorreoElectronico} />
                <input className="Rectangle160" type="password" placeholder="Contraseña" onChange={CrearUsuario} name="Contraseña" />
                <input className="Rectangle161" type="password" placeholder="Confirmar contraseña" onChange={CrearUsuario} name="ConfirmarContraseña" />
                <select className="Rectangle162" onChange={CrearUsuario} name="Sexo">
                    <option value=""  defaultValue="">Género</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Masculino">Masculino</option>
                </select>
                <select className="Rectangle168" onChange={CrearUsuario} name="Tipo">
                    <option value=""  defaultValue="">Empleado o Admin</option>
                    <option value="Empleado">Empleado</option>
                    <option value="Admin">Admin</option>
                </select>
                <select className="Rectangle163" onChange={CrearUsuario} name="Sede">
                    <option value=""  defaultValue="">Sede</option>
                    <option value="Leon">Leon</option>
                    <option value="Salamanca">Salamanca</option>
                </select>
                <select className="Rectangle164" onChange={CrearUsuario} name="Area">
                    <option value=""  defaultValue="">Subdivisión área</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
                <input className="Rectangle165" type="date" placeholder="Fecha de Nacimiento" onChange={CrearUsuario} name="FechaNacimiento" />
                <select className="Rectangle186" onChange={CrearUsuario} name="Status">
                    <option value=""  defaultValue="">Estado</option>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                </select>
                <select className="Rectangle166" onChange={CrearUsuario} name="Contrato">
                    <option value=""  defaultValue="">Contrato</option>
                    <option value="5/8">5/8</option>
                    <option value="1/2">1/2</option>
                </select>
                
                <div className="AgregarNuevoEmpleado" style={{ width: 540, height: 37, left: 98, top: 161, position: 'absolute' ,
            color: 'black' , fontSize: 30, fontFamily: 'Roboto' , fontWeight: '400' , wordWrap: 'break-word' }}>
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
