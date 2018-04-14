module.exports = function (sequelize, DataTypes) {
    const Update = sequelize.define('Update', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        version: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        paranoid: false,
        freezeTableName: true
    });

    return Update;
};
