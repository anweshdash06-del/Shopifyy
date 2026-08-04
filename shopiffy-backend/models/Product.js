const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // "Mobiles", "Fashion — Men", "Fashion — Women", etc.
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  desc: { type: String },
  img: { type: String }, // base64 data URL from the admin's image upload
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
