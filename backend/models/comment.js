

module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    comment: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    thread_id: DataTypes.INTEGER
  }, {});
  comment.associate = function (models) {
    // associations can be defined here
    models.comment.belongsTo(models.user, {
      foreignKey: 'user_id',
      targetKey: 'id',
      foreignKeyConstraint: true
    });

    models.comment.belongsTo(models.thread, {
      foreignKey: 'thread_id',
      targetKey: 'id',
      foreignKeyConstraint: true
    });
  };
  return comment;
};
