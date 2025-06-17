const Hotel = require('../models/Hotel');

exports.createHotel = async (req, res) => {
  try {
    const hotel = await Hotel.create({ ...req.body, createdBy: req.user.userId });
    res.status(201).json(hotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllHotels = async (req, res) => {
  const hotels = await Hotel.find();
  res.json(hotels);
};

exports.getHotel = async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);
  res.json(hotel);
};

exports.updateHotel = async (req, res) => {
  const updated = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteHotel = async (req, res) => {
  await Hotel.findByIdAndDelete(req.params.id);
  res.json({ message: "Hôtel supprimé" });
};
exports.getHotelsByUser = async (req, res) => {
  const hotels = await Hotel.find({ createdBy: req.user.userId });
  res.json(hotels);
};