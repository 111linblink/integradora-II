import React from 'react';
import NarBar from '../NarBar.js/NarBar';

const SA_Modificar = () => {
  return (
    <>
    <NarBar/>
    
    <div className="SAdmin" style={{ width: 1536, height: 695, background: '#0C789C' }}>
    
        <div className="Rectangle157" style={{ width: 1459, height: 490, left: 32, top: 125, position: 'absolute' ,
            background: 'white' , boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' , borderRadius: 20 }} />
    
        <div className="Rectangle196" style={{width: 296, height: 118, left: 1111, top: 384, position: 'absolute' ,
            background: '#E1F6FF' , boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' , borderRadius: 10}} />
        <div className="FotoDelEmpleado" style={{width: 222, height: 19, left: 1159, top: 393, position: 'absolute' ,
            color: 'rgba(0, 0, 0, 0.70)' , fontSize: 24, fontFamily: 'Roboto' , fontWeight: '400' , wordWrap: 'break-word'
            }}>Foto del empleado</div>
    
        <input className="Rectangle97" style={{ width: 365, height: 37, left: 98, top: 239, position: 'absolute' ,
            background: '#E1F6FF' , boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' , borderRadius: 10,
            color: 'rgba(0, 0, 0, 0.70)' , fontSize: 20, fontFamily: 'Roboto' , fontWeight: '400' , wordWrap: 'break-word'
            }} placeholder="NombreAppaternoApmaterno" />
    
        <input className="Rectangle158" style={{ width: 365, height: 37, left: 98, top: 297, position: 'absolute' ,
            background: '#E1F6FF' , boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' , borderRadius: 10,
            color: 'rgba(0, 0, 0, 0.70)' , fontSize: 20, fontFamily: 'Roboto' , fontWeight: '400' , wordWrap: 'break-word'
            }} type="number" placeholder="Número Control Empleado" />
    
    
        <input className="Rectangle159" style={{ width: 365, height: 37, left: 98, top: 354, position: 'absolute' ,
            background: '#E1F6FF' , boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' , borderRadius: 10,
            color: 'rgba(0, 0, 0, 0.70)' , fontSize: 20, fontFamily: 'Roboto' , fontWeight: '400' , wordWrap: 'break-word'
            }} type="email" placeholder="Correo" />
    
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
            }}>
            <option disabled selected value="">Género</option>
            <option value="femenino">Femenino</option>
            <option value="masculino">Masculino</option>
        </select>
    
    
        <select className="Rectangle168" style={{ width: 365, height: 37, left: 1085, top: 239, position: 'absolute' ,
            background: '#E1F6FF' , boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' , borderRadius: 10,
            color: 'rgba(0, 0, 0, 0.70)' , fontSize: 20, fontFamily: 'Roboto' , fontWeight: '400' , wordWrap: 'break-word'
            }}>
            <option disabled selected value="">Empleado o Admin</option>
            <option value="empleado">Empleado</option>
            <option value="admin">Admin</option>
        </select>
    
    
        <select className="Rectangle163" style={{ width: 365, height: 37, left: 609, top: 294, position: 'absolute' ,
            background: '#E1F6FF' , boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' , borderRadius: 10,
            color: 'rgba(0, 0, 0, 0.70)' , fontSize: 20, fontFamily: 'Roboto' , fontWeight: '400' , wordWrap: 'break-word'
            }}>
            <option disabled selected value="">División</option>
    
        </select>
    
        <select className="Rectangle164" style={{ width: 365, height: 37, left: 609, top: 352, position: 'absolute' ,
            background: '#E1F6FF' , boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' , borderRadius: 10,
            color: 'rgba(0, 0, 0, 0.70)' , fontSize: 20, fontFamily: 'Roboto' , fontWeight: '400' , wordWrap: 'break-word'
            }}>
            <option disabled selected value="">Subdivisión área</option>
            {/* Aquí puedes agregar más opciones si es necesario */}
        </select>
    
        <input className="Rectangle165" style={{ width: 365, height: 36, left: 609, top: 409, position: 'absolute' ,
            background: '#E1F6FF' , boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' , borderRadius: 10 }} type="date"
            placeholder="Fecha de cumpleaños" />
    
    
        <select className="Rectangle166" style={{ width: 365, height: 37, left: 609, top: 466, position: 'absolute' ,
            background: '#E1F6FF' , boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' , borderRadius: 10,
            color: 'rgba(0, 0, 0, 0.70)' , fontSize: 20, fontFamily: 'Roboto' , fontWeight: '400' , wordWrap: 'break-word'
            }}>
            <option disabled selected value="">Estado</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
        </select>
    
        <select className="Rectangle166" style={{ width: 365, height: 37, left: 1092, top: 320, position: 'absolute' ,
            background: '#E1F6FF' , boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' , borderRadius: 10,
            color: 'rgba(0, 0, 0, 0.70)' , fontSize: 20, fontFamily: 'Roboto' , fontWeight: '400' , wordWrap: 'break-word'
            }}>
            <option disabled selected value="">Contrato</option>
            <option value="Contrato ">5/8</option>/
            <option value="Contrato">1/2</option>
        </select>
    
        <div className="AgregarNuevoEmpleado" style={{ width: 540, height: 37, left: 98, top: 161, position: 'absolute' ,
            color: 'black' , fontSize: 30, fontFamily: 'Roboto' , fontWeight: '400' , wordWrap: 'break-word' }}>
            Modificar nuevo empleado
        </div>
        <button className="Rectangle97" style={{ width: 296, height: 36, left: 661, top: 556, position: 'absolute' ,
            background: '#047393' , boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' , borderRadius: 30, cursor: 'pointer' }}>
            <div className="RegistrarNuevoEmpleado" style={{ width: 235, height: 19, color: 'white' , fontSize: 20,
                fontFamily: 'Roboto' , fontWeight: '400' , wordWrap: 'break-word' }}>
                Guardar cambios
            </div>
        </button>
    
    </div>
    </>
  );
};

export default SA_Modificar;
