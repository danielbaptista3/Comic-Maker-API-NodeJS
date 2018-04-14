module.exports = function (sequelize, DataTypes) {
    const Comic = sequelize.define('Comic', {
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
            allowNull: false
        },
        serie: {
            type: DataTypes.BIGINT
        },
        premium: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        account: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        price: {
            type: DataTypes.DOUBLE
        },
        markSum: {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        markCount: {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        purshaseCount: {
            type: DataTypes.BIGINT,
            defaultValue: 0
        }
    }, {
        paranoid: false,
        freezeTableName: true
    });
    Comic.associate = _associate;
    return Comic;
};

function _associate(models) {
    models.Comic.belongsTo(models.Serie, {
        as: 'comics',
        foreignKey: 'serie'
    });
}