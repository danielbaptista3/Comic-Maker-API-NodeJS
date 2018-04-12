module.exports = function (sequelize, DataTypes) {
    const Project = sequelize.define('Account', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        mail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        pass: {
            type: DataTypes.STRING,
            allowNull: false
        },
        subscribe: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        paranoid: true,
        freezeTableName: true
    });

    return Project;
};
