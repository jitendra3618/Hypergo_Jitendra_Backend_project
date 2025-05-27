const User = require('../models/User');
const Property = require('../models/Property');
const Recommendation = require('../models/Recommendation.js');

// Search for user by email
exports.searchUserByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await User.findOne({ email }).select('_id name email');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Recommend a property to another user
exports.recommendProperty = async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const { toUserEmail, propertyId } = req.body;

    if (!toUserEmail || !propertyId) {
      return res.status(400).json({ message: 'Recipient email and property ID are required' });
    }

    const toUser = await User.findOne({ email: toUserEmail });
    if (!toUser) return res.status(404).json({ message: 'Recipient user not found' });

    const property = await Property.findById(propertyId);
    if (!property) return res.status(404).json({ message: 'Property not found' });

    // Create recommendation document
    const recommendation = await Recommendation.create({
      fromUser: fromUserId,
      toUser: toUser._id,
      propertyId,
    });

    // Optionally, update user's recommendationsReceived array (if stored there)
    toUser.recommendationsReceived.push(propertyId);
    await toUser.save();

    res.status(201).json({ message: 'Property recommended successfully', recommendation });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all recommendations received by logged-in user
exports.getReceivedRecommendations = async (req, res) => {
  try {
    const userId = req.user._id;

    const recommendations = await Recommendation.find({ toUser: userId })
      .populate('propertyId')
      .populate('fromUser', 'name email');

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
