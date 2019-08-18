const axios = require('axios');
const User = require('../models/User');

const booksAPI = axios.create ({
  baseURL: 'https://www.googleapis.com/books/v1/',
});

const APIkey = 'AIzaSyB8ywa_a39L5UcLUbhCCnH_gO6Bo3CkVzk';

module.exports = {
  async searchBooks(req, res) {
    const query = req.params.q;
    try {
      const response = await booksAPI.get(`volumes?q=${query}&key=${APIkey}`)
      const books = response.data.items;
      return res.json(books);
    } catch(err) {
      console.log(err.response);
      return res.status(err.response.status).send(err.response.statusText);
    }
  },

  async getUserBooks(req,res) {
    const books = req.body
    let userBooksInfo = await Promise.all(books.map(async book => {
      try { 
        let response = await booksAPI.get(`volumes/${book.book_id}?key=${APIkey}`);
        return response.data;
      } catch(err) {
        console.log(err);
      }
    }));
    return res.json(userBooksInfo);
  }
}