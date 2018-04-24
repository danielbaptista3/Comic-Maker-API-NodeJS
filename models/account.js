module.exports = function (sequelize, DataTypes) {
    const Account = sequelize.define('Account', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        mail: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        pass: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        subscribe: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        paranoid: false,
        freezeTableName: true
    });
    Account.associate = _associate;
    return Account;
};

function _associate(models) {
    models.Account.hasOne(models.Subscribe, {
        as: 'onesubscribe',
        foreignKey: 'account'
    });

    models.Account.hasMany(models.Comic, {
        as: 'comics',
        foreignKey: 'account'
    });

    models.Account.hasMany(models.Plugin, {
        as: 'plugins',
        foreignKey: 'account'
    });
}
