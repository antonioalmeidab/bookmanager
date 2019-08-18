const User = require('../models/User');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
  async listUsers(req, res) {
    const users = await User.find();
    return res.json(users);
  },

  async getSpecificUser(req, res) {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    return res.json({
      name: user.name,
      avatar: user.avatar,
      books: user.books,
      totalBooks: user.books.length,
    });
  },

  async createUser(req, res) {
    const { username, name } = req.body;
    const { filename: avatar } = req.file;

    await sharp(req.file.path)
      .resize(300, 300)
      .toFile(
        path.resolve(req.file.destination, 'avatars', avatar)
      )

    fs.unlinkSync(req.file.path);

    const newUser = await User.create({
      username,
      name,
      avatar
    });

    return res.json(newUser);
  },

  async addBook(req, res) {
    const book_id = req.params.bookId;
    const userId = req.params.userId;

    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { books: {book_id: book_id}, $position: 0}},
      { new: true }
    );

    return res.json(user);
  },

  async getUsersReading(req, res) {
    const book_id = req.params.bookId;

    const usersReading = await User.find({ books: { $elemMatch: { book_id: book_id}} });

    return res.json(usersReading);
  },

  async updateBooks(req, res) {
    const userBooks = req.body;
    const userId = req.params.userId;

    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { $set: { books: userBooks } },
      { new: true }
    );

    return res.json(updatedUser);
  }
}