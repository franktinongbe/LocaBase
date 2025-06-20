const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ['hôtel', 'restaurant', 'service'],
    required: true
  },
  description: String,
  address: String,
  ville: String,
  continent: {
    type: String,
    required: true
  },
  pays: {
    type: String,
    required: true
  },
  phone: String,
  email: String,
  website: String,
  images: [String], // liste d'URL d’images
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Business', businessSchema);
