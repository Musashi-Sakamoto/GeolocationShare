module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'isVerified');
    await queryInterface.addColumn('users', 'isVerified', {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'isVerified', {
      allowNull: false,
      type: Sequelize.BOOLEAN
    });
    await queryInterface.removeColumn('users', 'isVerified');
  }
};
