module.exports = function (sequelize, DataTypes) {
    const Authors = sequelize.define('Authors', {
        comic: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false
        },
        author: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false
        }
    }, {
        paranoid: false,
        freezeTableName: true
    });

    return Authors;
};