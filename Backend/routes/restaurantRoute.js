const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const { authenticate, authorize } = require('../middlewares/auth');

router.post('/', authenticate, authorize('pro', 'admin'), async (req, res) => {
  try {
    const restaurant = new Restaurant({ ...req.body, createdBy: req.user.id });
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get('/', async (req, res) => {
  const restaurants = await Restaurant.find().populate('createdBy', 'name email');
  res.json(restaurants);
});

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Restaurants
 *   description: Gestion des restaurants
 */