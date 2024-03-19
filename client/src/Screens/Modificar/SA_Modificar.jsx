import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import NarBar from '../NarBar.js/NarBar';
import { Alert } from '@mui/material';

const SA_Modificar = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        Nombre: '',
        Numero_Empleado: '',
        Status: '',
        CorreoElectronico: '',
        Area: '',
        Sede: '',
        FechaNacimiento: '',
        Sexo: '',
        Contrato: '',
        Tipo: ''
    });

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [sedes, setSedes] = useState([]); // Estado para almacenar las sedes y sus áreas disponibles
    const [tiposDeUsuario, setTiposDeUsuario] = useState([]); // Estado para almacenar los tipos de usuario disponibles
    const [contratos, setContratos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/usuarios/user/${id}`);
                setFormData(response.data.data);

              
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        // Obtener la lista de sedes disponibles al cargar el componente
        axios.get('http://localhost:3000/sedes/sedes_areas')
            .then(response => {
                console.log(response.data);
                setSedes(response.data.data.map(sede => ({
                    nombre: sede.Nombre,
                    areas: sede.Areas.map(area => area.NombreArea) // Almacenar solo los nombres de las áreas
                })));
            })
            .catch(error => {
                console.error('Error al obtener las sedes:', error);
            });

        // Obtener la lista de tipos de usuario disponibles al cargar el componente
        axios.get('http://localhost:3000/tipoUsuario/ver')
            .then(response => {
                console.log(response.data);
                setTiposDeUsuario(response.data.data.map(tipo => tipo.Tipo));
            })
            .catch(error => {
                console.error('Error al obtener los tipos de usuario:', error);
            });

        // Obtener la lista de contratos disponibles al cargar el componente
        axios.get('http://localhost:3000/contrato/contratos')
            .then(response => {
                console.log(response.data);
                setContratos(response.data.data.map(contrato => contrato.Tipo));
            })
            .catch(error => {
                console.error('Error al obtener los contratos:', error);
            });
    }, []);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/usuarios/update/${id}`, formData);
            setShowSuccessAlert(true);
            navigate('/sa-visualizar');
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
            setShowErrorAlert(true);
        }
    };

    
  return (
    <>
    <NarBar/>
    
    <div className="SAdmin" style={{ width: 153, height: 69, background: '#0C789C' }}>
    
        <div className="Rectangle157" style={{ width: 1459, height: 490, left: 32, top: 125, position: 'absolute' ,
            background: 'white' , boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' , borderRadius: 20 }} />
    
        <div className="Rectangle196" style={{width: 296, height: 118, left: 1111, top: 384, position: 'absolute' ,
            background: '#E1F6FF' , boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' , borderRadius: 10}} />
        <div className="FotoDelEmpleado" style={{width: 222, height: 19, left: 1159, top: 393, position: 'absolute' ,
            color: 'rgba(0, 0, 0, 0.70)' , fontSize: 24, fontFamily: 'Roboto' , fontWeight: '400' , wordWrap: 'break-word'
            }}>Foto del empleado</div>

            
    <input className="Rectangle97" style={{ width: 365, height: 37, left: 98, top: 239, position: 'absolute',
                    background: '#E1F6FF', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10, color: 'rgba(0, 0, 0, 0.70)', 
                    fontSize: 20, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }} 
                    placeholder={formData.Nombre} name="Nombre" value={formData.Nombre } onChange={handleInputChange} />

        <input className="Rectangle158" style={{ width: 365, height: 37, left: 98, top: 297, position: 'absolute' ,
            background: '#E1F6FF' , boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' , borderRadius: 10,
            color: 'rgba(0, 0, 0, 0.70)' , fontSize: 20, fontFamily: 'Roboto' , fontWeight: '400' , wordWrap: 'break-word'
            }} type="number" placeholder={formData.Numero_Empleado} name="Numero_Empleado" value={formData.Numero_Empleado } onChange={handleInputChange} />
    
    
        <input className="Rectangle159" style={{ width: 365, height: 37, left: 98, top: 354, position: 'absolute' ,
            background: '#E1F6FF' , boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' , borderRadius: 10,
            color: 'rgba(0, 0, 0, 0.70)' , fontSize: 20, fontFamily: 'Roboto' , fontWeight: '400' , wordWrap: 'break-word'
            }} type="email" placeholder={formData.CorreoElectronico} name="CorreoElectronico" value={formData.CorreoElectronico } onChange={handleInputChange}/>
    
        <input className="Rectangle160" style={{ width: 365, height: 37, left: 98, top: 411, position: 'absolute' ,
            background: '#E1F6FF' , boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' , borderRadius: 10,
            color: 'rgba(0, 0, 0, 0.70)' , fontSize: 20, fontFamily: 'Roboto' , fontWeight: '400' , wordWrap: 'break-word'
            }} type="password" placeholder="Contraseña" /> 
    
        <input className="Rectangle161" style={{ width: 365, height: 38, left: 98, top: 468, position: 'absolute' ,
            background: '#E1F6FF' , boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' , borderRadius: 10,
            color: 'rgba(0, 0, 0, 0.70)' , fontSize: 20, fontFamily: 'Roboto' , fontWeight: '400' , wordWrap: 'break-word'
            }} type="password" placeholder="Confirmar contraseña" />
    
        <select className="Rectangle162" style={{ width: 365, height: 37, left: 609, top: 237, position: 'absolute' ,
            background: '#E1F6FF' , boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' , borderRadius: 10,
            color: 'rgba(0, 0, 0, 0.70)' , fontSize: 20, fontFamily: 'Roboto' , fontWeight: '400' , wordWrap: 'break-word'
            }} name="Sexo" value={formData.Sexo} onChange={handleInputChange}>
            <option value="Femenino">Femenino</option>
            <option value="Masculino">Masculino</option>
        </select>
    
    
        <select className="Rectangle168" style={{ width: 365, height: 37, left: 1085, top: 239, position: 'absolute', background: '#E1F6FF', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10, color: 'rgba(0, 0, 0, 0.70)', fontSize: 20, fontFamily: 'Roboto', fontWeight: '400' }} 
        value={formData.Tipo} name="Tipo" onChange={handleInputChange}>
                    <option value={formData.Tipo} disabled >{formData.Tipo}</option>
                    {tiposDeUsuario.map((tipo, index) => (
                        <option key={index} value={tipo}>{tipo}</option>
                    ))}
                </select>
    
    
        <select className="Rectangle163" style={{ width: 365, height: 37, left: 609, top: 294, position: 'absolute' ,
            background: '#E1F6FF' , boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' , borderRadius: 10,
            color: 'rgba(0, 0, 0, 0.70)' , fontSize: 20, fontFamily: 'Roboto' , fontWeight: '400' , wordWrap: 'break-word'
            }} name="Sede" value={formData.Sede} onChange={handleInputChange}>
                 <option value={formData.Sede} disabled >{formData.Sede}</option>
            {sedes.map((sede, index) => (
                        <option key={index} value={sede.nombre}>{sede.nombre}</option>
                    ))}
        </select>
    
        <select className="Rectangle164" style={{ width: 365, height: 37, left: 609, top: 352, position: 'absolute' ,
            background: '#E1F6FF' , boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' , borderRadius: 10,
            color: 'rgba(0, 0, 0, 0.70)' , fontSize: 20, fontFamily: 'Roboto' , fontWeight: '400' , wordWrap: 'break-word'
            }} name="Area" value={formData.Area} onChange={handleInputChange}>
                 <option value={formData.Area} disabled >{formData.Area}</option>
                 {formData.Sede && sedes.find(sede => sede.nombre === formData.Sede)?.areas.map((area, index) => (
                        <option key={index} value={area}>{area}</option>
                    ))}
        </select>
    
        <input className="Rectangle165" style={{ width: 365, height: 36, left: 609, top: 409, position: 'absolute' ,
            background: '#E1F6FF' , boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' , borderRadius: 10 }} type="date" placeholder={formData.FechaNacimiento} name="FechaNacimiento" value={formData.FechaNacimiento} onChange={handleInputChange}/>
    
    
        <select className="Rectangle166" style={{ width: 365, height: 37, left: 609, top: 466, position: 'absolute' ,
            background: '#E1F6FF' , boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' , borderRadius: 10,
            color: 'rgba(0, 0, 0, 0.70)' , fontSize: 20, fontFamily: 'Roboto' , fontWeight: '400' , wordWrap: 'break-word'
            }} name="Status" value={formData.Status} onChange={handleInputChange} >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
        </select>
    
        <select className="Rectangle166" style={{ width: 365, height: 37, left: 1092, top: 320, position: 'absolute' ,
            background: '#E1F6FF' , boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' , borderRadius: 10,
            color: 'rgba(0, 0, 0, 0.70)' , fontSize: 20, fontFamily: 'Roboto' , fontWeight: '400' , wordWrap: 'break-word'
            }} name="Contrato" value={formData.Contrato} onChange={handleInputChange} placeholder={formData.Contrato} >
                <option value={formData.Contrato} disabled>{formData.Contrato}</option>
            {contratos.map((contrato, index) => (
                        <option key={index} value={contrato}>{contrato}</option>
                    ))}
        </select>
    
        <div className="AgregarNuevoEmpleado" style={{ width: 540, height: 37, left: 98, top: 161, position: 'absolute' ,
            color: 'black' , fontSize: 30, fontFamily: 'Roboto' , fontWeight: '400' , wordWrap: 'break-word' }}>
            Modificar nuevo empleado
        </div>
        <button className="Rectangle97" style={{ width: 296, height: 36, left: 661, top: 556, position: 'absolute', background: '#047393', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 30, cursor: 'pointer' }} onClick={handleUpdate}>
                    <div className="RegistrarNuevoEmpleado" style={{ width: 235, height: 19, color: 'white', fontSize: 20, fontFamily: 'Roboto', fontWeight: '400' }}>
                        Guardar cambios
                    </div>
                </button>

                <div className="alert-container">
                    {showSuccessAlert && <Alert variant="filled" severity="success">Usuario actualizado correctamente</Alert>}
                    {showErrorAlert && <Alert variant="filled" severity="error">Error al actualizar el usuario</Alert>}
                </div>
    </div>
    </>
  );
};

export default SA_Modificar;
