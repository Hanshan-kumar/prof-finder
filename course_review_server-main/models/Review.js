const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  },
  userName: String,
  content: String,
  rating: Number,
  difficultyRating: Number,
  workload: String,
});

module.exports = mongoose.model('Review', reviewSchema);


