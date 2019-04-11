const mongoose = require('mongoose');

let commentSchema = new mongoose.Schema({
    memeId: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

mongoose.model('Comment', commentSchema);

module.exports = mongoose.model('Comment');