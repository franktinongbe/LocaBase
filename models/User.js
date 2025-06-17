const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'pro', 'admin'],
    default: 'user' // rôle par défaut
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
  }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  // Si le rôle n'est pas défini, le définir en fonction d'une logique
  if (!this.role) {
    // Ici tu pourrais mettre une logique pour définir si 'pro' ou 'user'
    // Par exemple, si un utilisateur est inscrit via un formulaire spécial, tu pourrais lui donner le rôle 'pro'
    // Exemple simple : si l'email contient 'pro', alors attribuer le rôle 'pro', sinon 'user'
    if (this.email.includes('pro')) {
      this.role = 'pro';
    } else {
      this.role = 'user';
    }
  }

  // Cryptage du mot de passe si nécessaire
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  
  next();
});

module.exports = mongoose.model('User', userSchema);
