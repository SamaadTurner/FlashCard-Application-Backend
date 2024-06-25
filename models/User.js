module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      UserID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      UserName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      UserEmail: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: 'Users',
      timestamps: false,
    }
  );

  User.associate = function (models) {
    User.hasMany(models.Category, { foreignKey: 'UserID' });
  };

  return User;
};
