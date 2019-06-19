

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('comments', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    comment: {
      allowNull: false,
      type: Sequelize.STRING
    },
    user_id: {
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      type: Sequelize.INTEGER
    },
    thread_id: {
      allowNull: false,
      references: {
        model: 'threads',
        key: 'id'
      },
      type: Sequelize.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('comments')
};
