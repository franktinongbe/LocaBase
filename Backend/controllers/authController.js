const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Créer un JWT
const createToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role, continent, pays } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email déjà utilisé' });

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashed,
      role,
      continent,
      pays,
      abonnement: {
        type: 'gratuit',
        actif: false
      }
    });

    await user.save();

    res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Utilisateur non trouvé' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Mot de passe incorrect' });

    const token = createToken(user);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

module.exports = { register, login };
