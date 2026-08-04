const mongoose = require('mongoose');

// Matches the sign-up form on the storefront (Name, Email, Phone, Location, Address)
const signUpSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true, lowercase: true, trim: true },
  Phone: { type: String, required: true },
  Location: { type: String, required: true },
  Address: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('SignUp', signUpSchema);
