const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// 🔐 INSCRIPTION
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, continent, pays } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: 'Email déjà utilisé.' });

    const newUser = new User({ name, email, password, continent, pays });
    await newUser.save();

    res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err });
  }
});

// 🔐 CONNEXION
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Mot de passe incorrect.' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err });
  }
});

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentification des utilisateurs
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Inscription d’un utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, pro]
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Requête invalide
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion d’un utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie + token
 *       401:
 *         description: Identifiants invalides
 */
router.post('/login', loginUser);
