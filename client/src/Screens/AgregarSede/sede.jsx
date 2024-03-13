import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from 'axios';

export default function FormDialog() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        Nombre: "",
        Ubicacion: ""
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await Axios.post("http://localhost:3000/create_sede_area", formData);
            setFormData({
                Nombre: "",
                Ubicacion: ""
            });
            handleClose();
            window.location.reload(); // Esto probablemente debería cambiarse, ya que recargar la página no es la mejor práctica
        } catch (error) {
            console.error('Error al crear la sede:', error.message);
        }
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Agregar Sede
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleFormSubmit,
                }}
            >
                <DialogTitle>Agregar Sede</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor, ingresa el nombre y la ubicación de la sede.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="nombre"
                        name="Nombre"
                        label="Nombre"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formData.Nombre}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="ubicacion"
                        name="Ubicacion"
                        label="Ubicación"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formData.Ubicacion}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button type="submit">Agregar</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
