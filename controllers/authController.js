const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { name, email, password, role = 'user', bio, phoneNumber, pays, profileImageUrl, typeCount } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email déjà utilisé" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      bio: bio || '',
      phoneNumber: phoneNumber || '',
      pays: pays || '',
      profileImageUrl: profileImageUrl || '',
      typeCount: typeCount || '',
      memberSince: new Date().toISOString(),
    });

    res.status(201).json({ message: "Inscription réussie", userId: newUser._id });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).populate('businessProfile');
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '3d',
    });

    res.json({
      token,
      role: user.role,
      name: user.name,
      businessProfile: user.businessProfile || null
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

module.exports = { register, login };
