require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connexion MongoDB réussie !");
    mongoose.connection.close();
  })
  .catch(err => {
    console.error("❌ Échec connexion MongoDB :", err.message);
  });
