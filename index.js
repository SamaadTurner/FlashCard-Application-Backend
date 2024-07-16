require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const flashcardRoutes = require('./routes/flashcardRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('sequelize');
const db = require('./models');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/flashcards', flashcardRoutes);

const port = process.env.PORT || 5173;

app.listen(port, async () => {
  try {
    await db.sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.');
    console.log(`Server running on http://localhost:${port}`);
  } catch (error) {
    console.error('Error synchronizing models:', error);
  }
});
