module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    }, {
        timestamps: false,
        tableName: 'users',
    });

    user.associate = (models) => {
        user.hasMany(models.Contacts, {
            as: 'contacts',
            foreinKey: 'userId'
        });
    };
    return user;
}