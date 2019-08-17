const User = require('../models/User');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
  async listUsers(req, res) {
    const users = await User.find();
    return res.json(users);
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
    const { user_id, book_id, startDate } = req.body;

    const user = await User.findByIdAndUpdate(
      { _id: user_id },
      { $push: { books: {
          $each: [ {book_id: book_id, startDate: startDate} ],
          $position: 0
        }
      }},
      { new: true }
    );

    return res.json(user);
  },

  async getUsersReading(req, res) {
    const bookId = req.params.bookId;
    console.log(bookId);

    const usersReading = await User.find({ books: { $elemMatch: { book_id: bookId}} });

    console.log(usersReading);
  },

  async updateBooks(req, res) {
    
  }
}