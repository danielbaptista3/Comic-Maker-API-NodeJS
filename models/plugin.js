module.exports = function (sequelize, DataTypes) {
    const Plugin = sequelize.define('Plugin', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
        account: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        version: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        markSum: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        markCount: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
        }
    }, {
        paranoid: false,
        freezeTableName: true
    });

    return Plugin;
};
