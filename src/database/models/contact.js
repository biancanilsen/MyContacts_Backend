module.exports = (sequelize, DataTypes) => {
  const Contacts = sequelize.define('Contacts', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefone: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    data_cadastro: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_DATE')
    },
    data_alteracao: {
      type: DataTypes.DATE,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    timestamps: false,
    tableName: 'contacts'
  });

  Contacts.associate = (models) => {
    Contacts.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId'
    });
  };

  return Contacts;
};
