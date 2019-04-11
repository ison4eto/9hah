const mongoose = require('mongoose');

let categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
});

mongoose.model('Category', categorySchema);

module.exports = mongoose.model('Category');