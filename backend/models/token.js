'use strict';
module.exports = (sequelize, DataTypes) => {
  const token = sequelize.define('token', {
    user_id: DataTypes.INTEGER,
    token: DataTypes.STRING
  }, {});
  token.associate = function(models) {
    // associations can be defined here
  };
  return token;
};