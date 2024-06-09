const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  slug: { type: String, required: true },
  info: { type: String },
  date: { type: Date, required: true, default: () => Date.now() }
});

module.exports = mongoose.model('Visitor', visitorSchema);
