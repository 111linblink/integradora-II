import React, { useState, useEffect } from 'react';
import './navbarEmpleado.css';
import { Link, useNavigate } from 'react-router-dom';

const NavbarEmpleado = () => {
  const [mostrarVentanaNotificaciones, setMostrarVentanaNotificaciones] = useState(false);
  const [mostrarVentanaUsuario, setMostrarVentanaUsuario] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Función para obtener los datos del usuario desde el sessionStorage
    const obtenerDatosUsuario = () => {
      const userDataFromStorage = sessionStorage.getItem('userData');
      if (userDataFromStorage) {
        setUserData(JSON.parse(userDataFromStorage)); //establece datos del usuario
      }
    };

    obtenerDatosUsuario();
  }, []);

  const handleMostrarVentanaNotificaciones = () => {
    setMostrarVentanaNotificaciones(true);
  };

  const handleMostrarVentanaUsuario = () => {
    setMostrarVentanaUsuario(true);
  };

  const handleCloseVentana = () => {
    setMostrarVentanaNotificaciones(false);
    setMostrarVentanaUsuario(false);
  };

  const navigate = useNavigate();

  const handleCerrarSesion=()=>{
    sessionStorage.removeItem('userData');
    navigate('/');
  };

  return (
    <div>
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '100%',
        height: '14%',
        backgroundColor: '#FFFFFF',
      }} className="cabecera">
        <img className="logo" src="../assets/Logo.png" alt="Logo" style={{ position: 'absolute', top: '0%', left: '1%', width: '8%', height: '100%' }} />
        <Link to="/empleado-vacaciones">
          <img className="calendario" src="../assets/Calendario.png" alt="Calendario" style={{ position: 'absolute', top: '30%', left: '78%', width: '3%', height: '42%' }} />
        </Link>
        <Link to="/empleado-horario">
          <img className="horarioEmpleado" src="../assets/Horario-empleado.png" alt="Horario empleado" style={{ position: 'absolute', top: '30%', left: '83%', width: '3%', height: '42%' }} />
        </Link>
        <img className="notificaciones" src="../assets/Notificaciones.png" alt="Notificaciones" onClick={handleMostrarVentanaNotificaciones} style={{ position: 'absolute', top: '30%', left: '88%', cursor: 'pointer', width: '3%', height: '42%' }} />
        <img className="usuarioCabecera" src="../assets/Usuario.png" alt="Usuario" onClick={handleMostrarVentanaUsuario} style={{ position: 'absolute', top: '30%', left: '93%', cursor: 'pointer', width: '3%', height: '42%' }} />
      </div>

      {mostrarVentanaNotificaciones && (
        <div className="ventanaEmergente" onClick={handleCloseVentana}>
          <div className="contenido">
            <h3>Vacaciones aprobadas</h3>
            <p>Día(s): 16/02/2024 - 18/02/2024</p>
            <p>Comentario: Disfruta tus vacaciones</p>
          </div>
        </div>
      )}

      {mostrarVentanaUsuario && userData && (
        <div className="usuarioVentanaEmergente" onClick={handleCloseVentana}>
          <div className="contenido">
            <h3>Información del usuario</h3>
            <p>Nombre: {userData.nombre}</p>
            <p>Correo electrónico: {userData.correo}</p>
            <p>Numero de empleado: {userData.numero}</p>
            <button className= 'actions-button' style={{ width: 200, height: 40, left: 1355, top: 2}} variant="outlined" color="error" onClick={handleCerrarSesion} >Cerrar Sesión</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarEmpleado;
