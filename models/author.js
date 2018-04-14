module.exports = function (sequelize, DataTypes) {
    const Author = sequelize.define('Author', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        }
    }, {
        paranoid: false,
        freezeTableName: true
    });

    return Author;
};
