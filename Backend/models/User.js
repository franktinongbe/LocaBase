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
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },

  profileImageUrl: { type: String },
  memberSince: { type: String },
  bio: { type: String },
  phoneNumber: { type: String },

  role: {
    type: String,
    enum: ['user', 'pro', 'admin'],
    default: undefined
  },

  pays: {
    type: String,
    required: true
    // option : type: mongoose.Schema.Types.ObjectId, ref: 'Country'
  },

  abonnement: {
    type: abonnementSchema,
    default: () => ({ type: 'gratuit', actif: false })
  },

  businessProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BusinessProfile',
    required: function () {
      return this.role === 'pro';
    }
  },

  communities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community'
  }]
}, { timestamps: true });

// 🔐 Middleware de hash + logique de rôle/abonnement
userSchema.pre('save', async function (next) {
  if (!this.role) {
    this.role = this.email.toLowerCase().includes('pro') ? 'pro' : 'user';
  }

  if ((this.role === 'user' || this.role === 'pro') && !this.abonnement.type) {
    throw new Error('Un abonnement est requis pour les utilisateurs user ou pro.');
  }

  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

module.exports = mongoose.model('User', userSchema);
