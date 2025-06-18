const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const abonnementSchema = new mongoose.Schema({
  actif: { type: Boolean, default: false },
  type: {
    type: String,
    enum: ['trimestriel', 'semestriel', 'annuel', 'gratuit'],
    default: 'gratuit'
  },
  dateDebut: { type: Date },
  dateFin: { type: Date }
});

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'pro', 'admin'],
    default: undefined
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  abonnement: {
    type: abonnementSchema,
    default: () => ({ type: 'gratuit', actif: false })
  }
}, { timestamps: true });

// Middleware : traitement avant sauvegarde
userSchema.pre('save', async function (next) {
  // Définition dynamique du rôle
  if (!this.role) {
    this.role = this.email.toLowerCase().includes('pro') ? 'pro' : 'user';
  }

  // Si le rôle est user ou pro, il doit avoir un abonnement valide
  if ((this.role === 'user' || this.role === 'pro') && !this.abonnement.type) {
    throw new Error('Un abonnement est requis pour les utilisateurs user ou pro.');
  }

  // Cryptage du mot de passe
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

module.exports = mongoose.model('User', userSchema);
