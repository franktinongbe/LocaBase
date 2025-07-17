require('dotenv').config(); // Charge les variables d’environnement depuis .env

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const businessRoutes = require('./routes/business');
const serviceRoutes = require('./routes/serviceRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./Swagger'); // ton fichier Swagger.js
const cron = require('./cronJob'); // ton cronJob si utilisé

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'], // adapte selon ton front
  credentials: true
}));
app.use(express.json()); // Pour gérer les JSON

// Configuration
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Connexion MongoDB
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI manquante dans le fichier .env');
  process.exit(1);
}

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

// Routes
app.get('/', (req, res) => {
  res.json({ message: "🚀 API BaseLife fonctionne." });
});

app.use('/api/auth', authRoutes);
app.use('/api/businesses', businessRoutes);
app.use('/api/services', serviceRoutes);
app.use('/payment', paymentRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur en écoute sur le port ${PORT}`);
});
// Si tu utilises un cron job, démarre-le ici
cron.start(); // Assure-toi que cronJob est bien configuré pour démarrer ici