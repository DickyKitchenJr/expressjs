const mongoose = require('mongoose');

const BooksSchema = new mongoose.Schema({
  book: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model('books', BooksSchema);