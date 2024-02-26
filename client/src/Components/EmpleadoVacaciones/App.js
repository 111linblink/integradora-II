import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Empleado.css'; // Import del archivo CSS
import { Link } from 'react-router-dom';

const Empleado = () => {
  const [tipoContrato, setTipoContrato] = useState('');
  const [dias, setDias] = useState('');
  const [primerDia, setPrimerDia] = useState('');
  const [ultimoDia, setUltimoDia] = useState('');
  const [date, setDate] = useState(new Date());
  const [mostrarVentanaNotificaciones, setMostrarVentanaNotificaciones] = useState(false);
  const [mostrarVentanaUsuario, setMostrarVentanaUsuario] = useState(false);

  const handleTipoContratoChange = (event) => {
    setTipoContrato(event.target.value);
  };

  const handleDiasChange = (event) => {
    setDias(event.target.value);
  };

  const handlePrimerDiaChange = (event) => {
    setPrimerDia(event.target.value);
  };

  const handleUltimoDiaChange = (event) => {
    setUltimoDia(event.target.value);
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleSolicitarContrato = () => {
    console.log('Contrato solicitado');
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

      <div className="rectangulo1">
        <img className="usuario" src="../assets/Usuario.png" alt="Usuario"/>
        <div className="nombreEmpleado">Nombre de empleado</div>
        <input
          className="tipoContrato"
          type="text"
          placeholder="   Tipo de contrato"
          value={tipoContrato}
          onChange={handleTipoContratoChange}
        />
        <input
          className="dias"
          type="text"
          placeholder="   Días"
          value={dias}
          onChange={handleDiasChange}
        />
        <button className="solicitarContrato" onClick={handleSolicitarContrato}>Solicitar contrato</button>
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

      <div className="rectangulo2">
        <div className="calendarioInterior">
          <Calendar className="my-calendar" onChange={handleDateChange} value={date}/>
        </div>
        <div className="textoCalendario">Calendario</div>

        <div className="rectanguloInterior">
          <div className="solicitarVacaciones" onClick={handleSolicitarVacaciones}>Solicitar vacaciones</div>
          <input
            className="primerDia"
            type="text"
            placeholder="   Primer día"
            value={primerDia}
            onChange={handlePrimerDiaChange}
          />
          <input
            className="ultimoDia"
            type="text"
            placeholder="   Último día"
            value={ultimoDia}
            onChange={handleUltimoDiaChange}
          />
          <button className="solicitar" onClick={handleSolicitarVacaciones}>Solicitar</button>
        </div>
      </div>
    </div>
  );
};

export default Empleado;
