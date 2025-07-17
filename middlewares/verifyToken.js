const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Vérifie si le header Authorization est présent
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Accès refusé. Token manquant ou mal formaté.' });
  }

  const token = authHeader.split(' ')[1]; // Extrait le token après "Bearer"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // On attache les infos du token à req.user
    next(); // Passe au contrôleur suivant
  } catch (error) {
    return res.status(403).json({ message: 'Token invalide ou expiré.' });
  }
};

module.exports = verifyToken;
