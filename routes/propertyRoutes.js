
const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty
} = require('../controllers/propertyController');

router.route('/').post(protect, createProperty).get(getProperties);
router.route('/:id').get(getPropertyById).put(protect, updateProperty).delete(protect, deleteProperty);

module.exports = router;