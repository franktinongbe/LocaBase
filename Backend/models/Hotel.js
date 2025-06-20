const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  address: { type: String },
  contact: { type: String },
  continent: {
    type: String,
    required: true
  },
  pays: {
    type: String,
    required: true
  },
  ville: {
    type: String
  },
  image: {
    type: String // URL de l'image ou nom de fichier
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Hotel', hotelSchema);
