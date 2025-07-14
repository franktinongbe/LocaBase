const mongoose = require('mongoose');
require('dotenv').config(); // Charge les variables d’environnement

class Database {
  constructor() {
    this.connection = null;
  }

  async connect() {
    const dbUrl = process.env.MONGO_URI;

    if (!dbUrl) {
      console.error('❌ Erreur : MONGO_URI manquant dans le fichier .env');
      process.exit(1);
    }

    try {
      this.connection = await mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('✅ Connexion à la base de données MongoDB réussie');
    } catch (error) {
      console.error('❌ Erreur de connexion MongoDB :', error.message);
      process.exit(1);
    }
  }

  async disconnect() {
    try {
      await mongoose.disconnect();
      console.log('🛑 Connexion MongoDB fermée');
    } catch (error) {
      console.error('❌ Erreur lors de la déconnexion MongoDB :', error.message);
    }
  }
}

module.exports = Database;
