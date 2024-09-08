const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const cardRoutes = require('./routes/cardRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all origins

// Routes
app.use('/api', cardRoutes);

// Simple endpoint to check if server is running
app.get('/ping', (req, res) => res.send('Server is running!'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Server error!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
