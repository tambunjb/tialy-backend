const mongoose = require('mongoose');
const { customAlphabet } = require('nanoid')
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 2)

const urlSchema = new mongoose.Schema({
  original: { type: String, required: true },
  slug: { type: String, unique: true, default: nanoid() },
});

module.exports = mongoose.model('Url', urlSchema);