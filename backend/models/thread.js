

module.exports = (sequelize, DataTypes) => {
  const thread = sequelize.define('thread', {
    title: DataTypes.STRING
  }, {});
  thread.associate = function (models) {
    // associations can be defined here
    models.user.hasMany(models.comment, {
      foreignKey: 'thread_id',
      targetKey: 'id',
      foreignKeyConstraint: true
    });

    models.user.hasMany(models.location, {
      foreignKey: 'thread_id',
      targetKey: 'id'
    });
  };
  return thread;
};
