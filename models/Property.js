const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  location: String,
  state: String,
  city: String,
  areaSqFt: Number,
  bedrooms: Number,
  bathrooms: Number,
  furnished: String, 
  availability: String, 
  listedBy: String, 
  tags: [String],
  colorthen: String,
  rating: Number,
  isVerified: Boolean,
  amenities: [String],
  image: String,
  propertyType: String,
  listedDate: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
