'use strict';
module.exports = (sequelize, DataTypes) => {
  const thread = sequelize.define('thread', {
    title: DataTypes.STRING
  }, {});
  thread.associate = function(models) {
    // associations can be defined here
  };
  return thread;
};