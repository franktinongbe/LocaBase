const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const { register, login } = require('../controllers/authController');

router.get('/profile', verifyToken, (req, res) => {
  res.json({ message: 'Profil sécurisé', user: req.user });
});

router.post('/register', register);

router.post('/login', login);

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
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               role:
 *                 type: string
 *                 enum: [user, pro]
 *                 example: user
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Requête invalide
 */
router.post('/register', register);

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
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Connexion réussie + token
 *       401:
 *         description: Identifiants invalides
 */
router.post('/login', login);