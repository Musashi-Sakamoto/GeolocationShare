'use strict';
module.exports = (sequelize, DataTypes) => {
  const location = sequelize.define('location', {
    thread_id: DataTypes.INTEGER,
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE,
    user_id: DataTypes.INTEGER
  }, {});
  location.associate = function(models) {
    // associations can be defined here
  };
  return location;
};