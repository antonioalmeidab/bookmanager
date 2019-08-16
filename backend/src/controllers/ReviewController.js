const Review = require('../models/Review');

module.exports = {
  async listReviews(req, res) {
    const reviews = await Review.find().sort('-createdAt');
    return res.json(reviews)
  },

  async postReview(req, res) {
    const { user_id, book_id, content } = req.body

    const review = await Review.create({
      user_id,
      book_id,
      content
    });

    return res.send(review);
  }
}