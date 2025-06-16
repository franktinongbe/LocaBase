const router = require('express').Router();
const Service = require('../models/Service');
const auth = require('../middleware/auth');
const restrict = require('../middleware/roles');

router.post('/', auth, restrict(['pro-utilisateur', 'admin']), async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.json(service);
  } catch (err) {
    res.status(400).json({ error: 'Erreur création service' });
  }
});

router.get('/by-business/:id', async (req, res) => {
  const services = await Service.find({ business: req.params.id });
  res.json(services);
});

module.exports = router;