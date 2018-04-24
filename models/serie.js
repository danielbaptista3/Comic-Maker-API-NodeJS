module.exports = function (sequelize, DataTypes) {
    const Serie = sequelize.define('Serie', {
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
    Serie.associate = _associate;
    return Serie;
};

function _associate(models) {
    models.Serie.hasMany(models.Comic, {
        as: 'comics',
        foreignKey: 'serie'
    });
}
