const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Category = require('./Category');

const Question = sequelize.define(
  'Question',
  {
    QuestionID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    CategoryID: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: 'CategoryID',
      },
      allowNull: false,
    },
    QuestionText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    AnswerText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: 'Questions',
  }
);

Question.belongsTo(Category, { foreignKey: 'CategoryID' });
Category.hasMany(Question, { foreignKey: 'CategoryID' });

module.exports = Question;
