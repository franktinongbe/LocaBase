const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const { authenticate, authorize } = require('../middlewares/auth');

router.post('/', authenticate, authorize('pro', 'admin'), async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get('/:businessId', async (req, res) => {
  try {
    const services = await Service.find({ business: req.params.businessId });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Services
 *   description: Gestion des services offerts par les entreprises
 */