require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const flashcardRoutes = require('./routes/flashcardRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/flashcards', flashcardRoutes);

module.exports = app;
