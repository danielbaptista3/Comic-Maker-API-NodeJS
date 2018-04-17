module.exports = function (sequelize, DataTypes) {
    const Subscribe = sequelize.define('Subscribe', {
        account: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
        },
        monthCount: {
            type: DataTypes.BIGINT,
            defaultValue: 1
        }
    }, {
        paranoid: false,
        freezeTableName: true
    });
    Subscribe.associate = _associate;
    return Subscribe;
};

function _associate(models) {
    /*models.Subscribe.belongsTo(models.Account, {
        as: 'subscribes',
        foreignKey: 'account'
    });*/
}