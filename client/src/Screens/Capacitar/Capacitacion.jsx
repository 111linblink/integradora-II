import React from "react";

function Capacitacion() {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', background: '#0C789C', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '90%', maxWidth: 1200, height: '90%', background: 'white', borderRadius: 20, padding: 20, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', boxSizing: 'border-box' }}>
        <h1 style={{ textAlign: 'center', marginBottom: 20 }}>Agregar capacitación</h1>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Id del usuario</th>
                <th>Área</th>
                <th>Nombre del empleado</th>
                <th>Empleado</th>
                <th>14/02/2024</th>
                <th>15/02/2024</th>
                <th>16/02/2024</th>
                <th>17/02/2024</th>
                <th>18/02/2024</th>
              </tr>
            </thead>
            <tbody>
              {/* Add table body rows here */}
              <tr>
                <td>1</td>
                <td>Area 1</td>
                <td>Empleado 1</td>
                <td>Emp 1</td>
                <td>Capacitación</td>
                <td>Capacitación</td>
                <td>Capacitación</td>
                <td>Capacitación</td>
                <td>Capacitación</td>
              </tr>
              {/* Add more table rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Capacitacion;

