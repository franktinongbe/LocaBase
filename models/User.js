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
  name: { type: String, required: true },

  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (email) =>
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email),
      message: 'Email invalide'
    }
  },

  profileImageUrl: { type: String, default: null },

  memberSince: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  },

  bio: { type: String, default: '' },

  phoneNumber: { type: String, default: null },

  pays: { type: String, default: null },

  typeCount: { type: String, required: true },

  businessProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    default: null
  },

  password: { type: String, required: true },

  role: {
    type: String,
    enum: ['user', 'pro', 'admin'],
    default: undefined
  },

  abonnement: {
    type: abonnementSchema,
    default: () => ({ type: 'gratuit', actif: false })
  }

}, { timestamps: true });

userSchema.pre('save', async function (next) {
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
