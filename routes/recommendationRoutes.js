const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
  searchUserByEmail,
  recommendProperty,
  getReceivedRecommendations
} = require('../controllers/recommendationController');

router.get('/search-user', protect, searchUserByEmail);
router.post('/recommend', protect, recommendProperty);
router.get('/', protect, getReceivedRecommendations);

module.exports = router;
