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
        height: '80px',
        backgroundColor: '#FFFFFF',
      }} className="cabecera">



        <img className="logo" src="../assets/v141_10.png" alt="Logo" style={{ position: 'absolute', top: '6px', left: '12px', width: '100px', height: '70px' }} />
        
        <Link to="/vacaciones">
          <img className="Vacaciones" src="../assets/calendario-diario.png" alt="Solicitar Vacaciones" style={{ position: 'absolute', top: '18px', left: '78%', width: '60px', height: '50px' }} />
        </Link>
        <Link to="/SoliContrato">
          <img className="Contrato" src="../assets/reserva.png" alt="Solicitar Contrato" style={{ position: 'absolute', top: '18px', left: '73%', width: '60px', height: '50px' }} />
        </Link>

        <Link to="/gantt">
          <img className="horarioEmpleado" src="../assets/calendario-reloj.png" alt="Horario empleado" style={{ position: 'absolute', top: '18px', left: '83%', width: '60px', height: '50px' }} />
        </Link>
        <img className="notificaciones" src="../assets/Notificaciones.png" alt="Notificaciones" onClick={handleMostrarVentanaNotificaciones} style={{ position: 'absolute', top: '18px', left: '88%', cursor: 'pointer', width: '60px', height: '50px' }} />
        <img className="usuarioCabecera" src="../assets/circulo-de-usuario.png" alt="Usuario" onClick={handleMostrarVentanaUsuario} style={{ position: 'absolute', top: '11px', left: '1444px', cursor: 'pointer', width: '60px', height: '60px' }} />
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
