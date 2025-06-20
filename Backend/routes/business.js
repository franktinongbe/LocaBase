const express = require('express');
const router = express.Router();
const Business = require('../models/Business');
const { authenticate, authorize } = require('../middlewares/auth');

router.post('/', authenticate, authorize('pro', 'admin'), async (req, res) => {
  try {
    const business = new Business({ ...req.body, createdBy: req.user.id });
    await business.save();
    res.status(201).json(business);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get('/', async (req, res) => {
  const list = await Business.find().populate('createdBy', 'name email');
  res.json(list);
});

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Businesses
 *   description: Gestion des entreprises (hôtels, restaurants, services)
 */