// server.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// ✅ Importation des routes
const authRoutes = require('./routes/auth');
const businessRoutes = require('./routes/business');

const app = express();

// ✅ Configuration CORS
app.use(cors({
  origin: process.env.CLIENT_URL, // ✅ récupéré depuis .env
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ✅ Middleware pour parser le JSON
app.use(express.json());

// ✅ Déclaration des routes
app.use('/api/auth', authRoutes);
app.use('/api/business', businessRoutes);
// ... autres routes à ajouter si besoin

// ✅ Connexion à MongoDB
console.log("📦 MONGO_URI =", process.env.MONGO_URI); // DEBUG
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connexion MongoDB réussie"))
.catch((err) => console.error("❌ Erreur MongoDB :", err));

// ✅ Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
// Exportation de l'application pour les tests ou autres usages
module.exports = app;