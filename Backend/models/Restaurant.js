const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  address: { type: String },
  ville: { type: String },
  continent: {
    type: String,
    required: true
  },
  pays: {
    type: String,
    required: true
  },
  contact: { type: String },
  image: { type: String }, // URL ou nom de fichier image
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);
