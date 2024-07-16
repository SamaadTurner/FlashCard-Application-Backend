require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const flashcardRoutes = require('./routes/flashcardRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/flashcards', flashcardRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);

const port = process.env.PORT || 5173;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
