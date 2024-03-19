import React, { useState } from 'react';
import './navbarEmpleado.css';
import { Link } from 'react-router-dom';

const NavbarEmpleado = () => {
  const [mostrarVentanaNotificaciones, setMostrarVentanaNotificaciones] = useState(false);
  const [mostrarVentanaUsuario, setMostrarVentanaUsuario] = useState(false);

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

      {mostrarVentanaUsuario && (
        <div className="usuarioVentanaEmergente" onClick={handleCloseVentana}>
          <div className="contenido">
            <h3>Información del empleado</h3>
            <p>Nombre de empleado: John Doe</p>
            <p>Sede: Ciudad de México</p>
            <p>Área: Recursos Humanos</p>
            <p>Id: 123456</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarEmpleado;
