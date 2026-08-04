const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },      // e.g. "SHP-12345678", shown to the customer
  customer: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  address: { type: String, required: true },
  items: { type: String, required: true },                  // comma-joined item names, e.g. "Denim Jeans x 2"
  qty: { type: Number, required: true },
  total: { type: Number, required: true },
  paymentMethod: { type: String, default: 'Cash on Delivery' },
  status: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  date: { type: String }, // display-friendly order date shown on the storefront
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
