module.exports = (sequelize, DataTypes) => {
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
          model: 'Category',
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
      tableName: 'Questions',
      timestamps: false,
    }
  );

  Question.associate = function (models) {
    Question.belongsTo(models.Category, { foreignKey: 'CategoryID' });
  };

  return Question;
};
