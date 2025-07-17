// const express = require('express');
// const axios = require('axios');
// const User = require('../models/User');
// const generateInvoice = require('../utils/generateInvoice');  // Importer la fonction pour générer la facture
// const nodemailer = require('nodemailer');  // Pour envoyer la facture par email
// const fs = require('fs');
// const path = require('path');
// const router = express.Router();

// const CINETPAY_API_KEY = process.env.CINETPAY_API_KEY; // API_KEY depuis l'environnement
// const CINETPAY_SITE_ID = process.env.CINETPAY_SITE_ID; // SITE_ID depuis l'environnement

// // Route de callback pour gérer le paiement
// router.post('/callback', async (req, res) => {
//   const { transaction_id } = req.body;

//   try {
//     // Vérification du paiement via l'API CinetPay
//     const check = await axios.post('https://api-checkout.cinetpay.com/v2/payment/check', {
//       apikey: CINETPAY_API_KEY,
//       site_id: CINETPAY_SITE_ID,
//       transaction_id
//     });

//     const paiement = check.data.data;
//     const { metadata, status } = paiement;

//     if (status === 'ACCEPTED') {
//       const { userId, typeAbonnement } = JSON.parse(metadata);
//       const user = await User.findById(userId);

//       if (!user) return res.status(404).send('Utilisateur introuvable');

//       // Calcul automatique de la date de fin selon l'abonnement choisi
//       const now = new Date();
//       let fin = new Date(now); // copie de la date de départ

//       switch (typeAbonnement) {
//         case 'trimestriel':
//           fin.setMonth(fin.getMonth() + 3);
//           break;
//         case 'semestriel':
//           fin.setMonth(fin.getMonth() + 6);
//           break;
//         case 'annuel':
//           fin.setFullYear(fin.getFullYear() + 1);
//           break;
//         default:
//           return res.status(400).send('Type d\'abonnement invalide');
//       }

//       // Mise à jour de l'abonnement dans la base de données
//       user.abonnement = {
//         actif: true,
//         type: typeAbonnement,
//         dateDebut: now,
//         dateFin: fin
//       };

//       await user.save();

//       // Génération de la facture PDF
//       await generateInvoice(user); // Génère la facture PDF dans le dossier ./invoices/

//       // Envoi de la facture par email
//       sendInvoice(user);

//       return res.status(200).send('Abonnement activé et facture envoyée.');
//     } else {
//       return res.status(400).send('Paiement refusé ou en attente.');
//     }
//   } catch (error) {
//     console.error(error.response?.data || error.message);
//     return res.status(500).send('Erreur lors du traitement du callback');
//   }
// });

// // Fonction pour envoyer la facture par email après génération
// async function sendInvoice(user) {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,  // Utilisation de la variable d'environnement pour l'email
//       pass: process.env.EMAIL_PASS   // Utilisation de la variable d'environnement pour le mot de passe
//     }
//   });

//   const invoicePath = `facture_${user._id}.pdf`;
//   const invoiceDir = path.join(__dirname, '../invoices', invoicePath);

//   // Vérifie si le répertoire existe sinon crée-le
//   if (!fs.existsSync(path.dirname(invoiceDir))) {
//     fs.mkdirSync(path.dirname(invoiceDir), { recursive: true });
//   }

//   // Envoi de l'email avec la facture en pièce jointe
//   const mailOptions = {
//     from: process.env.EMAIL_USER,  // Ton email
//     to: user.email,               // Email de l'utilisateur
//     subject: 'Votre facture d\'abonnement',
//     text: 'Veuillez trouver votre facture en pièce jointe.',
//     attachments: [
//       {
//         filename: invoicePath,
//         path: invoiceDir
//       }
//     ]
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log(`Facture envoyée à ${user.email}`);
//   } catch (error) {
//     console.error("Erreur lors de l'envoi de la facture :", error.message);
//   }
// }

// module.exports = router;

// /**
//  * @swagger
//  * /callback:
//  *   post:
//  *     summary: Gestion de la réponse de paiement CinetPay
//  *     description: Cette route est appelée par CinetPay pour notifier de l'état du paiement. Elle met à jour l'abonnement de l'utilisateur, génère une facture et envoie un email avec la facture.
//  *     tags:
//  *       - Paiements
//  *     requestBody:
//  *       description: Détails de la transaction de paiement
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               transaction_id:
//  *                 type: string
//  *                 description: ID de la transaction CinetPay
//  *     responses:
//  *       200:
//  *         description: Abonnement activé et facture envoyée
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/PaymentResponse'
//  *       400:
//  *         description: Paiement rejeté ou en attente
//  *       500:
//  *         description: Erreur du serveur
//  */
