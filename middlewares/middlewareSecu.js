const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Gestion des erreurs de validation
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

// Gestion des erreurs pour les routes non trouvées
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Gestion des erreurs internes du serveur
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Erreur interne du serveur' });
});
module.exports = app;