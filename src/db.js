const mongoose = require('mongoose');

// Conecta a MongoDB Atlas usando la dirección guardada en el archivo .env
async function conectarDB() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log(`Conectado a MongoDB, base: ${mongoose.connection.name}`);
}

module.exports = conectarDB;