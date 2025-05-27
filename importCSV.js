const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const Property = require('./models/Property');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const results = [];

fs.createReadStream('property-data.csv') // <-- change to your filename
  .pipe(csv())
  .on('data', (data) => {
    const formatted = {
      title: data.title || '',
      description: data.description || '',
      price: parseFloat(data.price) || 0,
      location: data.location || '',
      bedrooms: parseInt(data.bedrooms) || 0,
      bathrooms: parseInt(data.bathrooms) || 0,
      size: parseInt(data.size) || 0,
      amenities: data.amenities ? data.amenities.split(',') : [],
      createdBy: null // assign later manually or via API
    };
    results.push(formatted);
  })
  .on('end', async () => {
    try {
      await Property.insertMany(results);
      console.log('Data imported successfully');
      process.exit();
    } catch (err) {
      console.error('Import failed', err);
      process.exit(1);
    }
  });
