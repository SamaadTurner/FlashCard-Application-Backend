const express = require('express');
const router = express.Router();
const db = require('../models');
const Flashcard = db.Flashcard;

// Get all flashcards
router.get('/', async (req, res) => {
  try {
    const flashcards = await Flashcard.findAll();
    console.log('All flashcards:', flashcards);
    res.status(200).json(flashcards);
  } catch (error) {
    console.error('Error fetching flashcards:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching flashcards.' });
  }
});

// Add a new flashcard
router.post('/', async (req, res) => {
  const { QuestionText, AnswerText, Chapter } = req.body;
  console.log('Creating flashcard:', { QuestionText, AnswerText, Chapter });

  try {
    const newFlashcard = await Flashcard.create({
      QuestionText,
      AnswerText,
      Chapter,
      GotWrong: false,
    });
    console.log('Flashcard created:', newFlashcard);
    res.status(201).json(newFlashcard);
  } catch (error) {
    console.error('Error adding flashcard:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while adding the flashcard.' });
  }
});

// Update a flashcard
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const flashcard = await Flashcard.findByPk(id);
    if (flashcard) {
      await flashcard.update(req.body);
      res.json(flashcard);
    } else {
      res.status(404).json({ error: 'Flashcard not found' });
    }
  } catch (error) {
    console.error('Error updating flashcard:', error);
    res.status(500).json({ error: 'Error updating flashcard' });
  }
});

module.exports = router;
