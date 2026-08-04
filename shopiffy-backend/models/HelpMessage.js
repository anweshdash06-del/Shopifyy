const mongoose = require('mongoose');

const helpMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  message: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('HelpMessage', helpMessageSchema);
