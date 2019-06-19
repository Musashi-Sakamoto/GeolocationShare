

module.exports = (sequelize, DataTypes) => {
  const location = sequelize.define('location', {
    thread_id: DataTypes.INTEGER,
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE,
    user_id: DataTypes.INTEGER
  }, {});
  location.associate = function (models) {
    // associations can be defined here
    models.location.belongsTo(models.user, {
      foreignKey: 'user_id',
      targetKey: 'id',
      foreignKeyConstraint: true
    });

    models.location.belongsTo(models.thread, {
      foreignKey: 'thread_id',
      targetKey: 'id'
    });
  };
  return location;
};
