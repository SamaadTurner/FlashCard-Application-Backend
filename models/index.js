const Sequelize = require('sequelize');
const config = require('../config/config.json').development;

const sequelize = new Sequelize(config);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./User')(sequelize, Sequelize.DataTypes);
db.Flashcard = require('./Flashcard')(sequelize, Sequelize.DataTypes);

module.exports = db;
