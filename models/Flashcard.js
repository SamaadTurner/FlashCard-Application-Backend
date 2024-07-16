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
        allowNull: true, // Optional, adjust as needed
      },
      GotWrong: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      CategoryID: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Category',
          key: 'CategoryID',
        },
        allowNull: false,
      },
    },
    {
      tableName: 'Flashcard',
      timestamps: false,
    }
  );

  Flashcard.associate = function (models) {
    Flashcard.belongsTo(models.Category, { foreignKey: 'CategoryID' });
  };

  return Flashcard;
};
