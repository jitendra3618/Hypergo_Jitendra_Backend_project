const mongoose = require('mongoose');
const csv = require('csv-parser');
const fs = require('fs');
const https = require('https');
const Property = require('../models/Property');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

// CSV URL
const csvUrl = 'https://cdn2.gro.care/db424fd9fb74_1748258398689.csv';

// Connect to MongoDB
async function connectDB() {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to MongoDB');
}

// Download CSV to local file
function downloadCSV(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function importCSV() {
  await connectDB();

  const csvFilePath = './temp.csv';
  await downloadCSV(csvUrl, csvFilePath);
  console.log('CSV downloaded');

  const properties = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      // Map CSV columns to your Property schema fields
      properties.push({
        title: row.title || row.Title || 'No title',
        description: row.description || row.Description || '',
        price: Number(row.price) || 0,
        location: row.location || row.Location || '',
        bedrooms: Number(row.bedrooms) || 0,
        bathrooms: Number(row.bathrooms) || 0,
        size: Number(row.size) || 0,
        amenities: row.amenities ? row.amenities.split(',').map(a => a.trim()) : [],
        // Note: createdBy is not present in CSV; will be null here or you can assign a default user id
        createdBy: null,
      });
    })
    .on('end', async () => {
      try {
        await Property.deleteMany({}); // Optional: clear existing properties
        await Property.insertMany(properties);
        console.log('CSV data imported successfully!');
        mongoose.connection.close();
        fs.unlinkSync(csvFilePath); // delete temp file
      } catch (error) {
        console.error('Error importing data:', error);
      }
    });
}

importCSV();
