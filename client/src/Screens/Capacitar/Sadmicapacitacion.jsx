import React, { useState } from 'react';
import './Sadmicapacitacion.css'; // Import del archivo CSS
import { Link } from 'react-router-dom';

const Sadmicapacitacion = () => {
  const [UserId1, setUserId1] = useState('');
  const [Area, setArea] = useState('');
  const [primerDia, setPrimerDia] = useState('');
  const [ultimoDia, setUltimoDia] = useState('');
  const [mostrarVentanaNotificaciones, setMostrarVentanaNotificaciones] = useState(false);
  const [mostrarVentanaUsuario, setMostrarVentanaUsuario] = useState(false);

  const handleUserid1Change = (event) => {
    setUserId1(event.target.value);
  };

  const handleAreaChange = (event) => {
    setArea(event.target.value);
  };

  const handlePrimerDiaChange = (event) => {
    setPrimerDia(event.target.value);
  };

  const handleUltimoDiaChange = (event) => {
    setUltimoDia(event.target.value);
  };

  const handleSolicitarVacaciones = () => {
    console.log('Vacaciones solicitadas');
  };

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
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      backgroundColor: '#0c789c',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }} className="root">
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '100%',
        height: 100,
        backgroundColor: '#FFFFFF',
      }} className="cabecera">
        <img className="logo" src="../assets/Logo.png" alt="Logo" style={{ position: 'absolute', top: 0, left: 5, width: 100, height: 100 }} />
        <Link to="/empleado-vacaciones">
          <img className="calendario" src="../assets/Calendario.png" alt="Calendario" style={{ position: 'absolute', top: 32, left: 1180, width: 42, height: 42 }} />
        </Link>
        <Link to="/empleado-horario">
          <img className="horarioEmpleado" src="../assets/Horario-empleado.png" alt="Horario empleado" style={{ position: 'absolute', top: 32, left: 1260, width: 42, height: 42 }} />
        </Link>
        <img className="notificaciones" src="../assets/Notificaciones.png" alt="Notificaciones" onClick={handleMostrarVentanaNotificaciones} style={{ position: 'absolute', top: 32, left: 1340, cursor: 'pointer', width: 42, height: 42 }} />
        <img className="usuarioCabecera" src="../assets/Usuario.png" alt="Usuario" onClick={handleMostrarVentanaUsuario} style={{ position: 'absolute', top: 32, left: 1420, cursor: 'pointer', width: 42, height: 42 }} />
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

    <div className="Userid1">
        <input
          className="Userid1"
          type="text"
          placeholder="   Id del Empleado"
          value={UserId1}
          onChange={handleUserid1Change}
        />
    </div>

    <div className="Area">
        <input
          className="Area"
          type="text"
          placeholder="Área"
          value={Area}
          onChange={handleAreaChange}
        />
    </div>

    <div className="CuadroTabla1">
      <table className="tablaBonita">
        <thead>
          <tr>
            <th colSpan="4">Empleados</th>
          </tr>
          <tr>
            <th>Nombre</th>
            <th>Área</th>
            <th>ID</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Juan Pérez</td>
            <td>Ventas</td>
            <td>001</td>
            <td>20/02/2024</td>
          </tr>
          <tr>
            <td>Maria Rodríguez</td>
            <td>Recursos Humanos</td>
            <td>002</td>
            <td>20/02/2024</td>
          </tr>
        </tbody>
      </table>
    </div>

      <div className="agregarCap2">
          <div className="solicitarVacaciones" onClick={handleSolicitarVacaciones}>Agregar Capacitacion</div>
          <input
            className="primerDia"
            type="text"
            placeholder="   Día"
            value={primerDia}
            onChange={handlePrimerDiaChange}
          />
          <input
            className="ultimoDia"
            type="text"
            placeholder="    Hora"
            value={ultimoDia}
            onChange={handleUltimoDiaChange}
          />
          <button className="solicitar" onClick={handleSolicitarVacaciones}>Agregar</button>
        </div>
      </div>
   );
};

export default Sadmicapacitacion;