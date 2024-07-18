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

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const flashcard = await Flashcard.findByPk(id);
    if (!flashcard) {
      return res.status(404).json({ error: 'Flashcard not found.' });
    }
    // Assuming flashcard is a Sequelize model instance, use toJSON() to get a plain object
    const flashcardData = flashcard.toJSON();
    // Adjust the response to match the expected structure
    const adjustedFlashcard = {
      FlashcardID: flashcardData.id,
      QuestionText: flashcardData.QuestionText,
      AnswerText: flashcardData.AnswerText,
      Chapter: String(flashcardData.Chapter),
    };
    res.status(200).json(adjustedFlashcard);
  } catch (error) {
    console.error('Error fetching flashcard:', error);
    res.status(500).json({
      error: 'An error occurred while fetching the flashcard.',
      details: error.message,
    });
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

    const updatedFlashcardData = updatedFlashcard[1].toJSON();
    const { FlashcardID, ...adjustedUpdatedFlashcard } = {
      FlashcardID: updatedFlashcardData.FlashcardID,
      QuestionText: updatedFlashcardData.QuestionText,
      AnswerText: updatedFlashcardData.AnswerText,
      Chapter: String(updatedFlashcardData.Chapter),
    };
    res.status(200).json(adjustedUpdatedFlashcard);
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
