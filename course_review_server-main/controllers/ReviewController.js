const Review = require('../models/Review.js');

 const getCourseReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await Review.find({ courseId: id });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCourseReviews };