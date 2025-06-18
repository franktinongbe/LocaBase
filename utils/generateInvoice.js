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
