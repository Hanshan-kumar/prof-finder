const express = require ('express');
const { getCourses } = require('../controllers/CourseController.js');

const router = express.Router();

router.get('/', getCourses);

module.exports = router;