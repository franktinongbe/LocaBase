const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    min: 0
  },
  duration: {
    type: String // Exemple : "30 min", "1h", "2 jours"
  },
  image: {
    type: String // URL ou nom de fichier
  }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
