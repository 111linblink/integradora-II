import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { routesUsuario } from './routes/routesUsuario.js'; // Importa las rutas de usuario
import { routesCapacitaciones } from './routes/routerCapacitaciones.js';
import { routesContrato } from './routes/routerContrato.js';
import { routesSedes } from './routes/routesSedes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/intel', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(error => console.error('Error al conectar a MongoDB:', error));

app.use('/usuarios', routesUsuario); 
app.use('/capacitaciones', routesCapacitaciones); 
app.use('/contrato', routesContrato); 
app.use('/sedes', routesSedes); 

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
