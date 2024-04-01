import * as React from 'react'
import NarBar from '../NarBar.js/NarBar';
import "./DocuemntosU.css"
import { useState } from 'react';

const DocumentosU = () => {
  const [documento,setDocumento]= useState();

  const SubirDocuemnto = (e) =>{
  e.preventDefault();

  const formData =new FormData();
  formData.append("documento",documento)
  }

  
  const Documento =(e)=>{
    console.log(e.target.files[0]);
    setDocumento(e.traget.file[0]);
  };

  return (
    <>
    <NarBar/>               
    <div className="Sede">
                <div className="Rectangle">

                </div>

                <div className="AgregarNuevoEmpleado" style={{ width: 540, height: 37, left: 98, top: 210, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>
                Seleccionar Archivo
                 </div>
                <input className="Rectangle97" type="file" onChange={Documento} style={{fontSize: 17}}/>


                <input className="Rectangle158" type="number" placeholder="Folio del Documento"  name="Folio"  />

                <select className="Rectangle159" name="Tipo"  >
                    <option value="" disabled defaultValue ="">Tipo de Documento</option>
                    <option value="Personal">Personal</option>
                    <option value="Profesional">Profesional</option>
                </select>

               
                <div className="AgregarNuevoEmpleado" style={{ width: 540, height: 20, left: 100, top: 440, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>
                Fecha de Caducidad del documento
                 </div>
                <input className="Rectangle161" type="date" placeholder="Caducidad"  name="Caducidad"  />

                <div className="TablaDocumentos" style={{ maxHeight: '550px', overflowY: 'auto' }}>

                </div>
                <div className="AgregarNuevoEmpleado" style={{ width: 540, height: 37, left: 98, top: 161, position: 'absolute', color: 'black', fontSize: 30, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>
                Administracion de Documentos
                 </div>
                </div>
                
                <button  className="Rectangle977" style={{left:120}}>
                    <div className="RegistrarNuevoEmpleado">Registrar Documento</div>
                </button>
    </>
   
  )
}

export default DocumentosU