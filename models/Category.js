module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      CategoryID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      CategoryName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'UserID',
        },
      },
    },
    {
      tableName: 'Category',
      timestamps: false,
    }
  );

  Category.associate = function (models) {
    Category.belongsTo(models.User, { foreignKey: 'UserID' });
    Category.hasMany(models.Question, { foreignKey: 'CategoryID' });
  };

  return Category;
};
