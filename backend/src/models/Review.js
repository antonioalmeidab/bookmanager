const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  author_id: String,
  book_id: String,
  content: String
});

module.exports = mongoose.model('review', reviewSchema);