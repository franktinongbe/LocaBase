const Business = require('../models/Business');

// Créer un business
exports.createBusiness = async (req, res) => {
  try {
    const business = new Business({
      ...req.body,
      proprietaire: req.user.id  // Nécessite un middleware d'authentification
    });
    const saved = await business.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir tous les business
exports.getAllBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir un business par ID
exports.getBusinessById = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) return res.status(404).json({ message: "Non trouvé" });
    res.json(business);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un business
exports.updateBusiness = async (req, res) => {
  try {
    const updated = await Business.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un business
exports.deleteBusiness = async (req, res) => {
  try {
    await Business.findByIdAndDelete(req.params.id);
    res.json({ message: "Supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
