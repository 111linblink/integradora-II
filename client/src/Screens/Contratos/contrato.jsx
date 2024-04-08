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
        HoraInicial: "",
        HoraFinal: ""
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
            const contratoData = {
                Nombre: formData.Nombre,
                Turno: [{
                    HoraInicial: formData.HoraInicial,
                    HoraFinal: formData.HoraFinal
                }]
            };

            await Axios.post("http://localhost:3000/contrato/create_contrato", contratoData);

            setFormData({
                Nombre: "",
                HoraInicial: "",
                HoraFinal: ""
            });
            handleClose();
            window.location.reload();
        } catch (error) {
            console.error('Error al crear el contrato:', error.message);
        }
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Agregar Contrato
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleFormSubmit,
                }}
            >
                <DialogTitle>Agregar Contrato</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor, ingresa el nombre y horario del contrato.
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
                        id="horaInicial"
                        name="HoraInicial"
                        label="Hora Inicial"
                        type="time"
                        fullWidth
                        variant="standard"
                        value={formData.HoraInicial}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="horaFinal"
                        name="HoraFinal"
                        label="Hora Final"
                        type="time"
                        fullWidth
                        variant="standard"
                        value={formData.HoraFinal}
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
