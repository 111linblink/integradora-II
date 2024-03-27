import React, { useState } from 'react';
import axios from 'axios';

const CargaMasiva = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
      try {
          const formData = new FormData();
          formData.append('archivo', file); // Cambio aquí
  
          // Cambia la URL por la dirección de tu servidor y la ruta correcta
          const response = await axios.post('http://localhost:3000/usuarios/subirEmpleados', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });
  
          console.log('Respuesta del servidor:', response.data);
      } catch (error) {
          console.error('Error al cargar el archivo:', error);
      }
  };
  

    return (
        <div>
            <h2>Subir archivo JSON para carga masiva de empleados</h2>
            <input type="file" accept=".json" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={!file}>
                Subir Archivo
            </button>
        </div>
    );
};

export default CargaMasiva;
