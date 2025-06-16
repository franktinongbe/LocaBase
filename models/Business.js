const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ['hôtel', 'restaurant', 'service'] },
  description: String,
  address: String,
  phone: String,
  email: String,
  website: String,
  images: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Business', businessSchema);