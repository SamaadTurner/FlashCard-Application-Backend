const Sequelize = require('sequelize');
const config = require('../config/config.json').development;

const sequelize = new Sequelize(config);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./User')(sequelize, Sequelize.DataTypes);
db.Category = require('./Category')(sequelize, Sequelize.DataTypes);
db.Question = require('./Question')(sequelize, Sequelize.DataTypes);

db.User.hasMany(db.Category, {foreignKey: 'UserID'});
db.Category.belongsTo(db.User, {foreignKey: 'UserID'});
db.Category.hasMany(db.Question, {foreignKey: 'CategoryID'});
db.Question.belongsTo(db.Category, {foreignKey: 'CategoryID'});

module.exports = db;
