

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('comments', 'thread_id');
    await queryInterface.removeColumn('locations', 'thread_id');
    await queryInterface.dropTable('threads');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('comments', 'thread_id', {
      allowNull: false,
      references: {
        model: 'threads',
        key: 'id'
      },
      type: Sequelize.INTEGER
    });
    await queryInterface.addColumn('locations', 'thread_id', {
      references: {
        model: 'threads',
        key: 'id'
      },
      type: Sequelize.INTEGER
    });
    await queryInterface.createTable('threads', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  }
};
