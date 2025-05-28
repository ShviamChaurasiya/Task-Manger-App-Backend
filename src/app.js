// src/app.js
const { Sequelize } = require('sequelize');
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// A simple test route
app.get('/', (req, res) => {
  res.send('Task Manager API is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

// Initialize Sequelize using your config or connection string (from .env)
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
});

// Test DB connection
async function testDB() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
testDB();

module.exports = app;
