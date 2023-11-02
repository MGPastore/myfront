const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    // URL de conexión a la base de datos MongoDB
    const mongoURI = 'mongodb://localhost:27017/nombre-de-tu-base-de-datos' || process.env.MONGO_URI; // Reemplaza 'nombre-de-tu-base-de-datos' con el nombre de tu base de datos

    // Conectar a la base de datos
    await mongoose.connect(mongoURI);

    console.log('Conexión exitosa a la base de datos MongoDB');
  } catch (error) {
    console.error('Error de conexión a la base de datos:', error);
  }
}

// Exportar la función de conexión
module.exports = { connectToDatabase };
