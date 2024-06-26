const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./models/index').sequelize;

dotenv.config();

const app = express();
app.use(express.json());

// Import routes
const userRoutes = require('./routes/userRoutes');
// const questionRoutes = require('./routes/questionRoutes');
// const categoryRoutes = require('./routes/categoryRoutes');

// Use routes
app.use('/api/users', userRoutes);
// app.use('/api/questions', questionRoutes);
// app.use('/api/categories', categoryRoutes);

// Sync models and start server
sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
