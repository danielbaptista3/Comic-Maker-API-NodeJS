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
    Author.associate = _associate;
    return Author;
};

function _associate(models) {
    models.Author.belongsToMany(models.Comic, {
        as: 'comics',
        through: 'Authors'
    });
}
