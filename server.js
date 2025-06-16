const express = require('express');
const { connectToDatabase } = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb+srv://franktinongbe86:CWPWULPZ2ZicULtE@cluster0.vp8mrza.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB Connected');
}).catch((err) => {
  console.log('MongoDB connection error:', err);
});


// Routes
app.get('/', (req, res) => {
    res.json({ message: 'API fonctionne !' });
});

// Exemple d'utilisation de MongoDB
app.get('/users', async (req, res) => {
    try {
        const { getDb } = require('./config/db');
        const db = getDb();
        const users = await db.collection('users').find({}).toArray();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Démarrage du serveur APRÈS connexion à MongoDB
async function startServer() {
    try {
        await connectToDatabase();
        app.listen(PORT, () => {
            console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Erreur au démarrage:', error);
    }
}

startServer();