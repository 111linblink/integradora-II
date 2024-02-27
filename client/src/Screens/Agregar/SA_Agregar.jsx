import React, { useState } from 'react';

const SA_Agregar = () => { const [formData, setFormData] = useState({

});

const handleSubmit = async (event) => {
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
  } catch (error) {
      console.error('Error al crear el usuario:', error.message);
  }
};

const handleInputChange = (event) => {
  setFormData({
      ...formData,
      [event.target.name]: event.target.value,
  });
};



    return (
        <div className="SAdmin" style={{ width: 1544, height: 683, background: '#0C789C' }}>
            <div className="Rectangle157" style={{ width: 1459, height: 490, left: 32, top: 125, position: 'absolute', background: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 20 }} />
            <div className="Rectangle196" style={{ width: 296, height: 118, left: 1111, top: 384, position: 'absolute', background: '#E1F6FF', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10 }} />
            <div className="FotoDelEmpleado" style={{ width: 222, height: 19, left: 1159, top: 393, position: 'absolute', color: 'rgba(0, 0, 0, 0.70)', fontSize: 24, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>Foto del empleado</div>

            <input className="Rectangle97" style={{ width: 365, height: 37, left: 98, top: 239, position: 'absolute', background: '#E1F6FF', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10, color: 'rgba(0, 0, 0, 0.70)', fontSize: 20, fontFamily: 'Roboto', fontWeight: '400',border:'none', wordWrap: 'break-word' }} placeholder="NombreAppaternoApmaterno" onChange={handleInputChange} name="Nombre" />

            <input className="Rectangle158" style={{ width: 365, height: 37, left: 98, top: 297, position: 'absolute', background: '#E1F6FF', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10, color: 'rgba(0, 0, 0, 0.70)', fontSize: 20, fontFamily: 'Roboto', fontWeight: '400', border:'none', wordWrap: 'break-word' }} type="number" placeholder="Número Control Empleado" onChange={handleInputChange} name="Numero_Empleado" />


            <input className="Rectangle159" style={{ width: 365, height: 37, left: 98, top: 354, position: 'absolute', background: '#E1F6FF', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10,border:'none', color: 'rgba(0, 0, 0, 0.70)', fontSize: 20, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }} type="email" placeholder="Correo" onChange={handleInputChange} name="CorreoElectronico" />

            <input className="Rectangle160" style={{ width: 365, height: 37, left: 98, top: 411, position: 'absolute', background: '#E1F6FF', border:'none',boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10, color: 'rgba(0, 0, 0, 0.70)', fontSize: 20, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }} type="password" placeholder="Contraseña" onChange={handleInputChange} name="contraseña" />



            <input className="Rectangle161" style={{ width: 365, height: 38, left: 98, top: 468, position: 'absolute', background: '#E1F6FF', border:'none',boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10, color: 'rgba(0, 0, 0, 0.70)', fontSize: 20, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }} type="password" placeholder="Confirmar contraseña" onChange={handleInputChange} name="confirmarContraseña" />

            <select className="Rectangle162" style={{ width: 365, height: 37, left: 609, top: 237, position: 'absolute', background: '#E1F6FF',border:'none', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10, color: 'rgba(0, 0, 0, 0.70)', fontSize: 20, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}onChange={handleInputChange} name="Sexo" >
                <option disabled selected value="">Género</option>
                <option value="femenino">Femenino</option>
                <option value="masculino">Masculino</option>
            </select>


            <select className="Rectangle168" style={{ border:'none',width: 365, height: 37, left: 1085, top: 239, position: 'absolute', background: '#E1F6FF', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10, color: 'rgba(0, 0, 0, 0.70)', fontSize: 20, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}onChange={handleInputChange} name="Tipo">
                <option disabled selected value="">Empleado o Admin</option>
                <option value="empleado">Empleado</option>
                <option value="admin">Admin</option>
            </select>


            <select className="Rectangle163" style={{ border:'none',width: 365, height: 37, left: 609, top: 294, position: 'absolute', background: '#E1F6FF', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10, color: 'rgba(0, 0, 0, 0.70)', fontSize: 20, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}onChange={handleInputChange} name="Tipo">
                <option disabled selected value="">División</option>
                <option value="1">1</option>
                <option value="1">2</option>

            </select>

            <select className="Rectangle164" style={{  border:'none',width: 365, height: 37, left: 609, top: 352, position: 'absolute', background: '#E1F6FF', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10, color: 'rgba(0, 0, 0, 0.70)', fontSize: 20, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}onChange={handleInputChange} name="Area">
                <option disabled selected value="">Subdivisión área</option>
                <option value="1">1</option>
                <option value="1">2</option>
            </select>

            <input className="Rectangle165" style={{width: 365, height: 36, left: 609, top: 409, position: 'absolute',border:'none', background: '#E1F6FF', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10 }} type="date" placeholder="FecahaNacimiento" onChange={handleInputChange} name="FecahaNacimiento" />


            <select className="Rectangle166" style={{border:'none', width: 365, height: 37, left: 609, top: 466, position: 'absolute', background: '#E1F6FF', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10, color: 'rgba(0, 0, 0, 0.70)', fontSize: 20, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}onChange={handleInputChange} name="Status">
                <option disabled selected value="">Estado</option>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
            </select>

            <select className="Rectangle166" style={{ border:'none',width: 365, height: 37, left: 1092, top: 320, position: 'absolute', background: '#E1F6FF', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10, color: 'rgba(0, 0, 0, 0.70)', fontSize: 20, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }} onChange={handleInputChange} name="Contrato">
                <option disabled selected value="">Contrato</option>
                <option value="Contrato ">5/8</option>/
                <option value="Contrato">1/2</option>
            </select>

            <div className="AgregarNuevoEmpleado" style={{ width: 540, height: 37, left: 98, top: 161, position: 'absolute', color: 'black', fontSize: 30, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>
                Agregar nuevo empleado
            </div>
            <button onClick={handleSubmit} className="Rectangle97" style={{ width: 296, height: 36, left: 661, top: 556, position: 'absolute', background: '#047393', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 30, cursor: 'pointer' }}>
                <div className="RegistrarNuevoEmpleado" style={{ width: 235, height: 19, color: 'white', fontSize: 20, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>
                    Registrar nuevo empleado
                </div>
            </button>

        </div>
    );
};

export default SA_Agregar;
