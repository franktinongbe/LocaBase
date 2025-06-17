const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  address: String,
  contact: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // pro user
}, { timestamps: true });

module.exports = mongoose.model('Hotel', hotelSchema);
