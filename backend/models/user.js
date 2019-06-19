

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN
  }, {});
  user.associate = function (models) {
    // associations can be defined here
    models.user.hasMany(models.comment, {
      foreignKey: 'user_id',
      targetKey: 'id',
      foreignKeyConstraint: true
    });

    models.user.hasMany(models.location, {
      foreignKey: 'user_id',
      targetKey: 'id',
      foreignKeyConstraint: true
    });

    models.user.hasMany(models.thread, {
      foreignKey: 'user_id',
      targetKey: 'id',
      foreignKeyConstraint: true
    });

    models.user.hasOne(models.token, {
      foreignKey: 'user_id',
      foreignKeyConstraint: true
    });
  };
  return user;
};
