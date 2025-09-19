const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: String,
  code: String,
  department: String,
  instructor: String,
  difficulty: Number,
  averageRating: Number,
  totalReviews: Number,
  description: String,
  prerequisites: [String],
  credits: Number,
  topics: [String],
  image: String,
});

module.exports = mongoose.model('Course', courseSchema);

