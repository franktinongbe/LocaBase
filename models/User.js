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
    required: true,
    validate: {
      validator: (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
      },
      message: 'Email invalide'
    }
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

userSchema.pre('save', async function(next) {
  if (!this.role) {
    this.role = this.email.toLowerCase().includes('pro') ? 'pro' : 'user';
  }

  if ((this.role === 'user' || this.role === 'pro') && !this.abonnement.type) {
    throw new Error('Un abonnement est requis pour les utilisateurs user ou pro.');
  }

  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

module.exports = mongoose.model('User', userSchema);