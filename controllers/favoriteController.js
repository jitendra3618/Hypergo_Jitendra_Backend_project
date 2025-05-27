const Favorite = require('../models/Favorite');
const Property = require('../models/Property');

// Add property to favorites
exports.addFavorite = async (req, res) => {
  const { propertyId } = req.body;
  try {
    const exists = await Favorite.findOne({ userId: req.user._id, propertyId });
    if (exists) return res.status(400).json({ message: 'Already in favorites' });

    const favorite = await Favorite.create({ userId: req.user._id, propertyId });
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all favorite properties for logged-in user
exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.user._id }).populate('propertyId');
    res.status(200).json(favorites.map(fav => fav.propertyId));
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Remove property from favorites
exports.removeFavorite = async (req, res) => {
  const { propertyId } = req.params;
  try {
    const removed = await Favorite.findOneAndDelete({ userId: req.user._id, propertyId });
    if (!removed) return res.status(404).json({ message: 'Favorite not found' });
    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
