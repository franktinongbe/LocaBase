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
  continent: {
    type: String,
    required: true
  },
  pays: {
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

  // Vérification de l'abonnement pour les rôles user et pro
  if ((this.role === 'user' || this.role === 'pro') && !this.abonnement.type) {
    throw new Error('Un abonnement est requis pour les utilisateurs user ou pro.');
  }

  // Cryptage du mot de passe s'il a été modifié
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

module.exports = mongoose.model('User', userSchema);


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nom de l'utilisateur
 *         email:
 *           type: string
 *           description: Email de l'utilisateur
 *         role:
 *           type: string
 *           enum: ['user', 'pro', 'admin']
 *           default: 'user'
 *         abonnement:
 *           type: object
 *           properties:
 *             actif:
 *               type: boolean
 *               default: false
 *             type:
 *               type: string
 *               enum: ['trimestriel', 'semestriel', 'annuel']
 *             dateDebut:
 *               type: string
 *               format: date
 *             dateFin:
 *               type: string
 *               format: date
 *     PaymentResponse:
 *       type: object
 *       properties:
 *         transaction_id:
 *           type: string
 *           description: ID de la transaction CinetPay
 *         status:
 *           type: string
 *           enum: ['ACCEPTED', 'REJECTED', 'PENDING']
 *           description: Statut de la transaction
 *         metadata:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *             typeAbonnement:
 *               type: string
 */


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     description: Cette route permet de récupérer tous les utilisateurs enregistrés dans la base de données.
 *     tags:
 *       - Utilisateurs
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Erreur du serveur
 */


/**
 * @swagger
 * /users:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     description: Cette route permet de créer un nouvel utilisateur avec un email et un mot de passe.
 *     tags:
 *       - Utilisateurs
 *     requestBody:
 *       description: Informations sur l'utilisateur à créer
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur du serveur
 */
