const mongoose = require('mongoose');

const business = new mongoose.Schema({
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  type: {
    type: String,
    enum: ['hôtel', 'restaurant', 'service', 'boutique', 'autre'],
    required: true
  },
  description: { type: String },
  phone: { type: String },
  email: { type: String },
  website: { type: String },
  galleryImageUrls: [String],

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true // chaque business doit être lié à un pro
  }
}, { timestamps: true });

module.exports = mongoose.model('Business', business);
