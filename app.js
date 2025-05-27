const express = require('express');
const app = express();
const connectDB = require('./config/db');
const redisClient = require('./config/redis');
require('dotenv').config();

// Connect DB
connectDB();

// Middlewares
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/properties', require('./routes/propertyRoutes'));
app.use('/api/favorites', require('./routes/favoriteRoutes'));
app.use('/api/recommendations', require('./routes/recommendationRoutes'));

// Redis Connection Test
redisClient.on('connect', () => {
  console.log('Redis client connected');
});

module.exports = app;

