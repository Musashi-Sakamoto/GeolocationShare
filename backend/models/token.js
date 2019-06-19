

module.exports = (sequelize, DataTypes) => {
  const token = sequelize.define('token', {
    user_id: DataTypes.INTEGER,
    token: DataTypes.STRING
  }, {});
  token.associate = function (models) {
    models.token.belongsTo(models.user, {
      foreignKey: 'user_id',
      foreignKeyConstraint: true
    });
  };
  return token;
};
