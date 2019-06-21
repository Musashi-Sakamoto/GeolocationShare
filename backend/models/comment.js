

module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    comment: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    to_user_id: DataTypes.INTEGER
  }, {});
  comment.associate = function (models) {
    // associations can be defined here
    models.comment.belongsTo(models.user, {
      foreignKey: 'user_id',
      targetKey: 'id',
      foreignKeyConstraint: true
    });

    models.comment.belongsTo(models.user, {
      foreignKey: 'to_user_id',
      targetKey: 'id',
      foreignKeyConstraint: true
    });
  };
  return comment;
};
