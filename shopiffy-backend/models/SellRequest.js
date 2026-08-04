const mongoose = require('mongoose');

const sellRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  address: { type: String, required: true },
  img: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('SellRequest', sellRequestSchema);
