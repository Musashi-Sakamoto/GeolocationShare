
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('threads', [1, 2, 3].map(num => ({
      title: `thread${num}`,
      createdAt: '9999-12-31 23:59:59',
      updatedAt: '9999-12-31 23:59:59'
    })), {});
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('threads', null, {})
};
