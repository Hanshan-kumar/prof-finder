const Course = require('../models/Course.js');

 const getCourses = async (req, res) => {
  try {
    const { search = '', department = '', instructor = '', difficulty = '' } = req.query;

    let query = {};

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (department) {
      query.department = department;
    }
    if (instructor) {
      query.instructor = instructor;
    }
    if (difficulty) {
      query.difficulty = parseInt(difficulty);
    }

    const courses = await Course.find(query);

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { getCourses };