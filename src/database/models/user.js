module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
    }, {
      tableName: 'users',
      timestamps: false,
    });
  
    User.associate = (models) => {
      User.hasMany(models.Contact, {
        as: 'contacts',
        foreignKey: 'userId',
      });
    };
  
    return User;
  };
  