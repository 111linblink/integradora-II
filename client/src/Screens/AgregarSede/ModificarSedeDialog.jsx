import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ModificarSedeDialog({ open, handleClose, modificarSede }) {
  const [nombreSede, setNombreSede] = useState("");
  const [ubicacionSede, setUbicacionSede] = useState("");

  const handleModificarSede = () => {
    modificarSede(nombreSede, ubicacionSede);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Modificar Sede</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Por favor, ingrese los detalles de la sede a modificar.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="nombre"
          label="Nombre de la Sede"
          type="text"
          fullWidth
          value={nombreSede}
          onChange={(e) => setNombreSede(e.target.value)}
        />
        <TextField
          margin="dense"
          id="ubicacion"
          label="Ubicación de la Sede"
          type="text"
          fullWidth
          value={ubicacionSede}
          onChange={(e) => setUbicacionSede(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleModificarSede}>Modificar</Button>
      </DialogActions>
    </Dialog>
  );
}
