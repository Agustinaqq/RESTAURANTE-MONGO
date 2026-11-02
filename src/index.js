require('dotenv').config(); // carga las variables del archivo .env
const express = require('express');
const conectarDB = require('./db');
const platosRoutes = require('./routes/platos.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // permite recibir datos en formato JSON

// Todas las rutas de platos empiezan con /api/platos
app.use('/api/platos', platosRoutes);

// Cualquier otra ruta responde 404
app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));

// Primero se conecta a la base y después levanta el servidor
conectarDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.error('No se pudo conectar a MongoDB:', error.message);
  });