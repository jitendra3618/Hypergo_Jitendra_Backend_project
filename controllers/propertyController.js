const Property = require('../models/Property');
const redisClient = require('../config/redis');

// CREATE operation - Create a new property and associate it with the logged-in user
exports.createProperty = async (req, res) => {
  try {
    const property = await Property.create({ ...req.body, createdBy: req.user._id });
    await redisClient.del('properties'); // Clear Redis cache after creation
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// READ operation - Get all properties, use Redis caching for optimization
exports.getProperties = async (req, res) => {
  try {
    //Caching results with Redis for faster access next time:
    const cacheKey = `properties:${JSON.stringify(req.query)}`;
    const cached = await redisClient.get(cacheKey);
    if (cached) return res.status(200).json(JSON.parse(cached));

    const filters = { ...req.query };               //implerment filtering
    const properties = await Property.find(filters); //searching
    await redisClient.set(cacheKey, JSON.stringify(properties));

    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// READ operation - Get a single property by its ID
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    res.status(200).json(property);
  } catch (error) {
    res.status(404).json({ message: 'Property not found' });
  }
};

// UPDATE operation - Update a property, only if the logged-in user is the creator
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    if (property.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    const updated = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    await redisClient.del('properties'); // Clear cache after update
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// DELETE operation - Delete a property, only if the logged-in user is the creator
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    if (property.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await property.deleteOne();
    await redisClient.del('properties'); // Clear cache after deletion
    res.json({ message: 'Property removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
