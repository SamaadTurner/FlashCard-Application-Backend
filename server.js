const app = require('./app');
const db = require('./models');
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
