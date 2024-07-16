const express = require('express');
const router = express.Router();
const db = require('../models');
const Flashcard = db.Flashcard;

// Get all flashcards
router.get('/', async (req, res) => {
  try {
    const flashcards = await Flashcard.findAll();
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
  console.log('@request', req.body);
  const { QuestionText, AnswerText, Chapter } = req.body;

  try {
    const newFlashcard = await Flashcard.create({
      QuestionText,
      AnswerText,
      Chapter,
      GotWrong: false,
    });
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
  const updates = req.body;
  try {
    const updatedFlashcard = await Flashcard.update(updates, {
      where: { FlashcardID: id },
      returning: true,
      plain: true,
    });
    res.status(200).json(updatedFlashcard[1]);
  } catch (error) {
    console.error('Error updating flashcard:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while updating the flashcard.' });
  }
});

// Delete a flashcard
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Flashcard.destroy({ where: { FlashcardID: id } });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting flashcard:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while deleting the flashcard.' });
  }
});

module.exports = router;
