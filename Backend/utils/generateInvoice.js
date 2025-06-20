// utils/generateInvoice.js
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Fonction pour générer une facture PDF
function generateInvoice(user) {
  const doc = new PDFDocument();
  const filename = `facture_${user._id}.pdf`;

  // Création du fichier PDF dans le dossier courant
  doc.pipe(fs.createWriteStream(`./invoices/${filename}`));

  // Ajout du contenu de la facture
  doc.fontSize(18).text(`Facture d'abonnement pour ${user.name}`, { align: 'center' });
  doc.fontSize(12).text(`Email : ${user.email}`);
  doc.text(`Rôle : ${user.role}`);
  doc.text(`Type d'abonnement : ${user.abonnement.type}`);
  doc.text(`Date de début : ${user.abonnement.dateDebut}`);
  doc.text(`Date de fin : ${user.abonnement.dateFin}`);
  doc.text(`Montant payé : XXX CFA`); // Remplacer par le montant réel du paiement

  // Terminer le fichier PDF
  doc.end();
}

module.exports = generateInvoice;


/**
 * @swagger
 * /generate-invoice:
 *   get:
 *     summary: Générer la facture d'un utilisateur
 *     description: Cette route génère une facture PDF pour un utilisateur basé sur son abonnement.
 *     tags:
 *       - Factures
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Facture générée avec succès
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur lors de la génération de la facture
 */
