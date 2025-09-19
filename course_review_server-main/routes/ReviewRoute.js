const express = require ('express');
const { getCourseReviews }= require ('../controllers/ReviewController.js');

const router = express.Router();

router.get('/:id/reviews', getCourseReviews);

module.exports = router;
