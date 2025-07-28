const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  type: {
    type: String,
    enum: ['hôtel', 'restaurant', 'service', 'boutique', 'autre'],
    required: true
  },
  description: { type: String, required: true },
  galleryImageUrls: {
    type: [String],
    default: []
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Business', businessSchema);
