// cronJob.js
const cron = require('node-cron');
const User = require('./models/User');

// Job planifié toutes les 24 heures
cron.schedule('0 0 * * *', async () => {
  try {
    const users = await User.find({ "abonnement.actif": true });
    const now = new Date();

    // On parcourt tous les utilisateurs ayant un abonnement actif
    users.forEach(async (user) => {
      const dateFin = new Date(user.abonnement.dateFin);
      
      // Si l'abonnement est expiré, on désactive l'abonnement
      if (now > dateFin) {
        user.abonnement.actif = false;
        await user.save();
        console.log(`Abonnement expiré pour ${user.email}`);
      }
    });
  } catch (error) {
    console.error("Erreur dans le cron job :", error.message);
  }
});
