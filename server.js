// server.js ou app.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // 👉 Import du middleware cors

const authRoutes = require('./routes/auth');
const businessRoutes = require('./routes/business');
// ... autres routes

const app = express();

// 👉 Utilisation de CORS avant les routes
app.use(cors({
  origin: ['https://locabase.onrender.com/api'], // Autoriser les requêtes provenant de cette origine
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Autoriser ces méthodes HTTP
  allowedHeaders: ['Content-Type', 'Authorization'], // Autoriser ces en-têtes
  credentials: true, // Autoriser les cookies et les informations d'authentification
}));

app.use(express.json());

// 👉 Définir les routes après les middlewares
app.use('/api/auth', authRoutes);
app.use('/api/business', businessRoutes);
// ... autres routes

// Connexion à la base de données
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connexion MongoDB réussie"))
.catch((err) => console.error("❌ Erreur MongoDB :", err));

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
