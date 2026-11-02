require('dotenv').config(); // carga las variables del archivo .env
const express = require('express');
const conectarDB = require('./db');
const Plato = require('./models/Plato');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // permite recibir datos en formato JSON

// Ruta de prueba: devuelve todos los platos
app.get('/api/platos', async (req, res) => {
  const platos = await Plato.find();
  res.json(platos);
});

// Primero se conecta a la base y después levanta el servidor
conectarDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.error('No se pudo conectar a MongoDB:', error.message);
  });