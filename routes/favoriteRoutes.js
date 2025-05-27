const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
  addFavorite,
  getFavorites,
  removeFavorite
} = require('../controllers/favoriteController');

router.route('/')
  .get(protect, getFavorites)
  .post(protect, addFavorite);

router.route('/:propertyId')
  .delete(protect, removeFavorite);

module.exports = router;
