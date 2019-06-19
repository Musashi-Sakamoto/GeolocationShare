

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        type: Sequelize.INTEGER
      },
      token: {
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
    await queryInterface.sequelize.query(`
      CREATE EVENT expireToken
      ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 1 DAY
      DO
      DELETE FROM tokens where createdAt < DATE_SUB(NOW(), INTERVAL 1 DAY);
    `);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tokens');
    await queryInterface.sequelize.query('DROP EVENT IF EXISTS expireToken');
  }
};
