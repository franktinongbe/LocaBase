const restaurant = require('../models/Restaurant');

exports.createrestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.create({ ...req.body, createdBy: req.user.userId });
    res.status(201).json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllRestaurants = async (req, res) => {
  const restaurants = await restaurant.find();
  res.json(restaurants);
};

exports.getRestaurant = async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  res.json(restaurant);
};

exports.updaterestaurant = async (req, res) => {
  const updated = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteRestaurant = async (req, res) => {
  await Restaurant.findByIdAndDelete(req.params.id);
  res.json({ message: "Restaurant supprimé" });
};
exports.getRestaurantsByUser = async (req, res) => {
  const restaurants = await Restaurant.find({ createdBy: req.user.userId });
  res.json(restaurants);
};