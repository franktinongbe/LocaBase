const router = require('express').Router();
const Business = require('../models/Business');
const auth = require('../middleware/auth');
const restrict = require('../middleware/roles');

// Créer un établissement (pro-utilisateur ou admin)
router.post('/', auth, restrict(['pro-utilisateur', 'admin']), async (req, res) => {
  try {
    const business = new Business({ ...req.body, createdBy: req.user.id });
    await business.save();
    res.json(business);
  } catch (err) {
    res.status(400).json({ error: 'Erreur création business' });
  }
});

// Voir tous les établissements
router.get('/', async (req, res) => {
  const businesses = await Business.find().populate('createdBy', 'fullName email');
  res.json(businesses);
});

module.exports = router;