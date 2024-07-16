module.exports = (sequelize, DataTypes) => {
  const Flashcard = sequelize.define(
    'Flashcard',
    {
      FlashcardID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      Chapter: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      GotWrong: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: 'Flashcard',
      timestamps: false,
    }
  );
  return Flashcard;
};
