

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('threads', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      defaultValue: 4
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('threads', 'user_id');
  }
};
