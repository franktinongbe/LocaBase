const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');
const { authenticate, authorize } = require('../middlewares/auth');

router.post('/', authenticate, authorize('pro', 'admin'), async (req, res) => {
  try {
    const newHotel = new Hotel({ ...req.body, createdBy: req.user.id });
    const saved = await newHotel.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get('/', async (req, res) => {
  const hotels = await Hotel.find().populate('createdBy', 'name email');
  res.json(hotels);
});

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Hotels
 *   description: Gestion des hôtels
 */