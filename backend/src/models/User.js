const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  name: String,
  avatar: String,
  books: [
    { 
      book_id: String,
      progress: { type: Number, default: 0 },
      rating: Number,
      startDate: { type: Date, default: null },
      finishDate: { type: Date, default: null}
    }
  ]
},);

module.exports = mongoose.model('User', userSchema);