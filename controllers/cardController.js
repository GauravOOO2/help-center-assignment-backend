const Card = require('../models/card');
const { v4: uuidv4 } = require('uuid');

// Create a new card
exports.createCard = async (req, res) => {
  const { title, description } = req.body;
  
  try {
    const newCard = new Card({
      id: uuidv4(),
      title,
      description,
    });

    const savedCard = await newCard.save();
    res.status(201).json(savedCard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all cards
exports.getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific card by title
exports.getCardByTitle = async (req, res) => {
  const { title } = req.params;
  
  try {
    const card = await Card.findOne({ title });
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
