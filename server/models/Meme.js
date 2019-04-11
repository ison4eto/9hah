const mongoose = require('mongoose');

let memeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  ratings: { type: Number, required: true, max: 10, min: 0 },
  peopleRated: {type: Number, required: true, default: 0},
  categories: { type: [String] },
  approved: {type: Boolean, required: true},
  date: { type: Date, default: Date.now}
});

mongoose.model('Meme', memeSchema);

module.exports = mongoose.model('Meme');