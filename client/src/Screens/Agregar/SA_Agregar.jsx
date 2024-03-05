import React, { useState } from 'react';
import NarBar from '../NarBar.js/NarBar';
import "./SA_Agregar.css"

const SA_Agregar = () => {
    
    const [formData, setFormData] = useState({});
    const [usuariosArchivo, setUsuariosArchivo] = useState([]);

    const Creacion = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Hubo un error al crear el usuario');
            }

            console.log('Usuario creado correctamente');
            setFormData({}); // Limpiar los datos del formulario
            window.location.reload(); // Recargar la página
        } catch (error) {
            console.error('Error al crear el usuario:', error.message);
        }
    };

    const CrearUsuario = (event) => {
        const { name, value } = event.target;

        if(name === 'contraseña' || name === 'confirmarContraseña') {
            // Realizamos una validación o cualquier procesamiento adicional si es necesario
            // En este ejemplo, solo lo agregamos al formData
            setFormData({
                ...formData,
                [name]: value,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const ManejarSubidaArchivo = (evento) => {
        const archivo = evento.target.files[0];
        const extension = archivo.name.split('.').pop().toLowerCase();

        if (extension === 'json') {
 
            const lector = new FileReader();
            lector.onload = (e) => {
                const contenidoArchivo = e.target.result;
                const usuarios = JSON.parse(contenidoArchivo);
                setUsuariosArchivo(usuarios);
                
            };
            lector.readAsText(archivo);
            console.log ("Archivo JSON")
        } else if (extension === 'xlsx' || extension === 'csv') {
  
            console.log("Archivo Excel o CSV seleccionado:", archivo);
        } else {
            console.error("Tipo de archivo no soportado");
        }
    };

    return (
        <>
            <NarBar />
            <div className="SAdmin">
                <div className="Rectangle157" />
                <div className="Rectangle196" />
                <div className="FotoDelEmpleado">Foto del empleado</div>

                <input className="Rectangle97" type="text" placeholder="Nombre Apellido Paterno Apellido Materno" onChange={CrearUsuario} name="Nombre" />

                <input className="Rectangle158" type="number" placeholder="Número Control Empleado" onChange={CrearUsuario} name="Numero_Empleado" />

                <input className="Rectangle159" type="email" placeholder="Correo" onChange={CrearUsuario} name="CorreoElectronico" />

                <input className="Rectangle160" type="password" placeholder="Contraseña" onChange={CrearUsuario} name="Contrasena" />

                <input className="Rectangle161" type="password" placeholder="Confirmar contraseña" onChange={CrearUsuario} name="contraseña" />

                <select className="Rectangle162" onChange={CrearUsuario} name="Sexo">
                    <option  defaultValue="">Género</option>
                    <option value="femenino">Femenino</option>
                    <option value="masculino">Masculino</option>
                </select>

                <select className="Rectangle168" onChange={CrearUsuario} name="Tipo" value={formData.Tipo}>
                    <option  value="Empleado o Admin">Empleado o Admin</option>
                    <option value="Empleado">Empleado</option>
                    <option value="Admin">Admin</option>
                </select>

                <select className="Rectangle163" onChange={CrearUsuario} name="Sede">
                    <option  defaultValue="">Sede</option>
                    <option value="Leon">Leon</option>
                    <option value="Salamanca">Salamanca</option>
                </select>

                <select className="Rectangle164" onChange={CrearUsuario} name="Area">
                    <option  defaultValue="">Subdivisión área</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>

                <input className="Rectangle165" type="date" placeholder="Fecha de Nacimiento" onChange={CrearUsuario} name="FechaNacimiento" />

                <select className="Rectangle186" onChange={CrearUsuario} name="Status">
                    <option  defaultValue="">Estado</option>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                </select>

                <select className="Rectangle166" onChange={CrearUsuario} name="Contrato" value={formData.Contrato}>
                    <option disabled defaultValue="">Contrato</option>
                    <option value="5/8">5/8</option>
                    <option value="1/2">1/2</option>
                </select>

                <div className="AgregarNuevoEmpleado">Agregar nuevo empleado</div>

                <button onClick={Creacion} className="Rectangle977">
                    <div className="RegistrarNuevoEmpleado">Registrar nuevo empleado</div>
                </button>

                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={ManejarSubidaArchivo}
                    accept=".json, .xlsx, .csv"
                />

                <button className="Rectangle955" onClick={() => document.getElementById('fileInput').click()}>
                    <div className="RegistrarArchivo">Subir archivo (Carga masiva)</div>
                </button>
            </div>
        </>
    );
};

export default SA_Agregar;
