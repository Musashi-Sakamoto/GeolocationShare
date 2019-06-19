

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('locations', ['user_id'], {
      type: 'unique',
      name: 'user_id_unique'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('locations', ['user_id_unique']);
  }
};
