require('dotenv').config(); // Charge les variables d’environnement depuis .env

const express = require('express');
const mongoose = require('mongoose');
const paymentRoutes = require('./routes/paymentRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./Swagger'); // chemin selon ton arborescence

const app = express();
app.use(express.json()); // Pour gérer le JSON dans les requêtes

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Vérifie que l’URL MongoDB est bien fournie
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI manquante dans le fichier .env');
  process.exit(1);
}

// Connexion à MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connexion à MongoDB réussie !");
  } catch (error) {
    console.error("❌ Erreur de connexion MongoDB :", error.message);
    process.exit(1);
  }
};

connectDB();

// Route de test
app.get('/', (req, res) => {
  res.json({ message: "🚀 API BaseLife fonctionne." });
});

// Routes
app.use('/payment', paymentRoutes);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

require('./cronJob'); // Lance le cron job

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur en écoute sur le port ${PORT}`);
});
