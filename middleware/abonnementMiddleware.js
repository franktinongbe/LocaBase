// middlewares/abonnementMiddleware.js

module.exports = function verifierAbonnementActif(req, res, next) {
  const abonnement = req.user?.abonnement;

  if (!abonnement || !abonnement.actif) {
    return res.status(403).json({ message: "Aucun abonnement actif." });
  }

  const maintenant = new Date();
  const dateFin = new Date(abonnement.dateFin);

  if (maintenant > dateFin) {
    return res.status(403).json({ message: "Votre abonnement a expiré." });
  }

  next();
};
