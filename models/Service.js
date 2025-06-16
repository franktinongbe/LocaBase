const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
  title: String,
  description: String,
  price: Number,
  duration: String,
  image: String
});

module.exports = mongoose.model('Service', serviceSchema);